from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from firebase_admin import firestore
from firebase_config import db, auth_client
from email_sender import sendPasswordResetEmail, sendVerificationEmail
from text_sender import send_verification_sms
import random
import string

router = APIRouter()

# Define a Pydantic model for the signup request
class EmailUserVerification(BaseModel):
    email: str
    code: str

class PhoneUserVerification(BaseModel):
    phone: str
    code: str

class UserSignUp(BaseModel):
    phone: str
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
            phone=user.phone,
            email=user.email,
            password=user.password,
        )

        email_verification_code = ''.join(random.choices(string.digits, k=6))
        phone_verification_code = ''.join(random.choices(string.digits, k=6))

        # Store data
        db.collection("users").document(firebase_user.uid).set({
            "phone": user.phone,
            "email": user.email,
            "password": user.password,
            "email_verified": False,
            "email_verification_code": email_verification_code,
            "phone_verified": False,
            "phone_verification_code": phone_verification_code
        })
        # for testing purposes can only send email to acc owner's email
        sendVerificationEmail(user.email, email_verification_code)
        send_verification_sms(user.phone, phone_verification_code)

        return {"message": "User created. Seperate verification codes sent via email & text", "uid": firebase_user.uid}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Similarly, you can add a login endpoint if needed.
@router.post("/login")
def login(user: UserLogin):
    users_ref = db.collection("users")
    query = users_ref.where("email", "==", user.email).limit(1).get()
    if not query:
        raise HTTPException(status_code=401, detail="Invalid email")

    doc = query[0]
    data = doc.to_dict()

    # 2. Check password
    if data.get("password") != user.password:
        raise HTTPException(status_code=402, detail="Invalid password")

    if data.get("email_verified") == False:
        raise HTTPException(status_code=410, detail="Email not verified")
    
    if data.get("phone_verified") == False:
        raise HTTPException(status_code=411, detail="Phone not verified")

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

        sendPasswordResetEmail(payload.email, reset_link)

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
    
@router.post("/email-valid")
def verify_email(verification: EmailUserVerification):
    try:
        users_ref = db.collection("users")
        query = users_ref.where("email", "==", verification.email).limit(1).get()
        if not query:
            raise HTTPException(status_code=404, detail="User not found")

        doc = query[0]
        user_data = doc.to_dict()

        if user_data.get("email_verified"):
            return {"message": "Email already verified"}

        if user_data.get("email_verification_code") != verification.code:
            raise HTTPException(status_code=400, detail="Incorrect verification code")

        # Update user as verified
        users_ref.document(doc.id).update({
            "email_verified": True,
            "email_verification_code": firestore.DELETE_FIELD  
        })

        return {"message": "Email verified successfully"}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    
@router.post("/phone-valid")
def verify_email(verification: PhoneUserVerification):
    try:
        users_ref = db.collection("users")
        query = users_ref.where("phone", "==", verification.phone).limit(1).get()
        if not query:
            raise HTTPException(status_code=404, detail="User not found")

        doc = query[0]
        user_data = doc.to_dict()

        if user_data.get("phone_verified"):
            return {"message": "Phone already verified"}

        if user_data.get("phone_verification_code") != verification.code:
            raise HTTPException(status_code=400, detail="Incorrect verification code")

        # Update user as verified
        users_ref.document(doc.id).update({
            "phone_verified": True,
            "phone_verification_code": firestore.DELETE_FIELD  
        })

        return {"message": "Phone verified successfully"}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))