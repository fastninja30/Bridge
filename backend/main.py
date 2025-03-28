from fastapi import FastAPI
from firebase_config import db, auth_client

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
    users_ref = db.collection("users")
    users = [doc.to_dict() for doc in users_ref.stream()]
    return {"users": users}

@app.post("/signup")
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
            # You can add other default fields here if needed.
        })
        return {"message": "User created successfully", "uid": firebase_user.uid}
    except Exception as e:
        # You might want to log the error or handle specific exceptions.
        raise HTTPException(status_code=400, detail=str(e))
