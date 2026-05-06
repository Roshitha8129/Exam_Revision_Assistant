from app.services.llm import generate_text

def generate_flashcards(content: str = "", topic: str = ""):
    """
    Generates flashcards based on either provided document content 
    or a custom topic using general knowledge.
    """
    
    # logic to decide the source of information
    if content and content.strip():
        source_instruction = f"Base these flashcards strictly on the following text extracted from a document:\n{content}"
    elif topic:
        source_instruction = f"The user wants to study the custom topic: '{topic}'. Use your general knowledge to create high-quality flashcards for this subject."
    else:
        return "Error: No content or topic provided for flashcard generation."

    prompt = f"""
Create 5 clear, high-quality flashcards.

{source_instruction}

Format each flashcard on a SINGLE line like this:
Question text | Answer text

Example:
What is photosynthesis? | The process by which plants use sunlight to synthesize foods.
Who discovered gravity? | Isaac Newton.

Rules:
1. Each flashcard must be on its own line.
2. Use the "|" character to separate the question and the answer.
3. Do not include "Q:" or "A:" prefixes.
4. Keep the question concise and the answer informative.
"""
    return generate_text(prompt)