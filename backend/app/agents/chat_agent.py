from app.services.llm import generate_text

def ask_question(context, query):
    prompt = f"""
Answer the following question based on the provided context.

Context: 
{context}

Question: 
{query}

Constraint: Answer in 2 to 4 clear sentences.

Answer:
"""
    return generate_text(prompt)