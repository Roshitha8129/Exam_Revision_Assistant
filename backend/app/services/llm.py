import os
from groq import Groq
from dotenv import load_dotenv

# 1. Load the environment variables from the .env file
load_dotenv()

# 2. Safely grab the API key
api_key = os.environ.get("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is missing! Please check your .env file.")

# 3. Initialize the Groq client
client = Groq(api_key=api_key)

# We'll use Llama 3.1 8B (Super fast and reliable on Groq)
MODEL_NAME = "llama-3.1-8b-instant"

def generate_text(prompt, max_tokens=900, temp=0.7):
    """Core generation function using Groq API."""
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": "You are a helpful, factual AI study assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=temp,
        max_tokens=max_tokens
    )
    return response.choices[0].message.content