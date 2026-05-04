from app.services.llm import generate_text

def generate_flashcards(content):
    prompt = f"""
Create 5 clear flashcards from the following text:

{content}

Format:
Q:
A:
"""
    return generate_text(prompt)