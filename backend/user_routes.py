from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from firebase_config import db, auth_client

router = APIRouter()

# Define a Pydantic model for the signup request
class UserSignUp(BaseModel):
    email: str
    password: str

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
            # Add additional fields if needed.
        })
        return {"message": "User created successfully", "uid": firebase_user.uid}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Similarly, you can add a login endpoint if needed.
@router.post("/login")
def login():
    # Add your login logic here.
    return {"message": "Login endpoint"}
