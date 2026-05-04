# from fastapi import FastAPI
# from app.api.routes import router

# app = FastAPI()
# app.include_router(router)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# 1. Load the .env file at the very beginning of your app
load_dotenv()

# We import the router AFTER loading dotenv to ensure llm.py gets the API keys
from app.api.routes import router

# 2. Add some metadata for your Swagger UI documentation
app = FastAPI(
    title="AI Study Assistant API",
    description="API to upload PDFs, generate quizzes, and chat with your documents.",
    version="1.0.0"
)

# 3. Add CORS Middleware (Crucial if you are building a frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins. Change to your frontend URL in production (e.g., ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (POST, GET, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include your endpoints
app.include_router(router)