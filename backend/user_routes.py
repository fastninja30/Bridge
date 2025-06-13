from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from firebase_admin import firestore
from firebase_config import db, auth_client
from email_sender import sendEmail

router = APIRouter()

# Define a Pydantic model for the signup request
class UserSignUp(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class ForgotPasswordRequest(BaseModel):
    email: str

@router.post("/signup")
def sign_up(user: UserSignUp):
    try:
        # Create a new user using Firebase Authentication.
        firebase_user = auth_client.create_user(
            email=user.email,
            password=user.password,
        )
        # Optionally, create a corresponding Firestore document with additional user details.
        db.collection("users").document(firebase_user.uid).set({
            "email": user.email,
            "password": user.password,
            # Add additional fields if needed.
        })
        return {"message": "User created successfully", "uid": firebase_user.uid}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Similarly, you can add a login endpoint if needed.
@router.post("/login")
def login(user: UserLogin):
    users_ref = db.collection("users")
    query = users_ref.where("email", "==", user.email).limit(1).get()
    if not query:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    doc = query[0]
    data = doc.to_dict()

    # 2. Check password
    if data.get("password") != user.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # 3. (Optional) Issue a Firebase custom auth token
    try:
        custom_token = auth_client.create_custom_token(doc.id)
        return {
            "message": "Login successful",
            "uid": doc.id,
            "token": custom_token.decode('utf-8')  # client can use this to authenticate
        }
    except Exception:
        # Fallback if you just want to return a success flag
        return {"message": "Login successful", "uid": doc.id}

@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordRequest):
    try:
        users_ref = db.collection("users")
        query = users_ref.where("email", "==", payload.email).limit(1).get()
        if not query:
            raise HTTPException(status_code=401, detail="Invalid email")
        
        # Generate the reset link
        reset_link = auth_client.generate_password_reset_link(payload.email)

        # Optionally, log it or store a record in Firestore
        db.collection("password_resets").add({
            "email": payload.email,
            "link": reset_link,
            "timestamp": firestore.SERVER_TIMESTAMP,
        })

        sendEmail(payload.email, reset_link)

        # In production, you'd send the link by email and not return it in the JSON.
        return {
            "message": "Password reset link generated successfully",
            "reset_link": reset_link
        }

    except auth_client.UserNotFoundError:
        raise HTTPException(status_code=404, detail="No user found with that email")
    except Exception as e:
        # e.g. invalid email format, quota exceeded, etc.
        raise HTTPException(status_code=400, detail=str(e))