from fastapi import FastAPI
from firebase_config import db, auth_client

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


@app.get("/users")
def get_users():
    # Example: Fetching users from Firestore
    users_ref = db.collection("users")
    users = [doc.to_dict() for doc in users_ref.stream()]
    return {"users": users}
