from fastapi import FastAPI
from firebase_config import db, auth_client
from fastapi.middleware.cors import CORSMiddleware
from . import user_routes

app = FastAPI()

# Allow requests from your React Native frontend
origins = ["*"]  # Change "*" to your actual frontend domain in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your user routes (e.g., /register, /login)
app.include_router(user_routes.router)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


@app.get("/users")
def get_users():
    # Example: Fetching users from Firestore
    users_ref = db.collection("users")
    users = [doc.to_dict() for doc in users_ref.stream()]
    return {"users": users}
