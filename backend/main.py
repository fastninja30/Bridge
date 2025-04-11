from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from firebase_config import db, auth_client
from user_routes import router as user_router  # Import the router you defined

app = FastAPI()

# Configure CORS (for your React Native frontend)
origins = ["*"]  # Update this in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the user routes (signup, login, etc.)
app.include_router(user_router)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.get("/users")
def get_users():
    users_ref = db.collection("users")
    users = [doc.to_dict() for doc in users_ref.stream()]
    return {"users": users}
