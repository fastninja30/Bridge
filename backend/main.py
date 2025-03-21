from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


"""
1. Cd to backend folder
2. docker run -p 8000:8000 bridge-backend
3. http://127.0.0.1:8000/
4. http://127.0.0.1:8000/docs
"""