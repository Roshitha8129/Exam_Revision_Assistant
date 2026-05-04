from app.services.llm import generate_text

def generate_quiz(content):
   prompt = f"""
   Instruction: Generate 5 multiple-choice questions based on the text below. 
   Each question must have 4 options (A, B, C, D) and a labeled answer.
   Text:
   {content}
   Output Format:
   Q1: [Question]
   A) [Option]
   B) [Option]
   C) [Option]
   D) [Option]
   Answer: [Option Letter]
   """
   return generate_text(prompt)