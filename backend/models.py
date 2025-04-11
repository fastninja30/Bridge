from pydantic import BaseModel, EmailStr, Field

class UserSignUp(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)  # Enforce a minimum password length
