import firebase_admin
from firebase_admin import credentials, firestore, auth

# Path to your Firebase service account key JSON file.
SERVICE_ACCOUNT_PATH = "../../bridge-eab76-firebase-adminsdk-fbsvc-e9e9601f33.json"

def initialize_firebase():
    """
    Initialize the Firebase Admin SDK with the provided service account credentials.
    Returns:
        A tuple containing the Firestore client and auth module for further usage.
    """
    try:
        # Create a credential object from the service account key.
        cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
        
        # Initialize the Firebase app. This call is idempotent.
        firebase_admin.initialize_app(cred)
        print("Firebase initialized successfully.")
    except Exception as e:
        print("Error initializing Firebase:", e)
        raise e

    # Get a Firestore client.
    db = firestore.client()

    # Return the Firestore client and auth module (if needed)
    return db, auth

# Initialize Firebase as soon as the module is imported.
db, auth_client = initialize_firebase()
