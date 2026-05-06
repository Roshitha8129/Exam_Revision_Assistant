from app.services.llm import generate_text
def generate_plan(topic):
    prompt = f"""
Create a 5-day study plan for: {topic}

Format:
Day 1: topic + short explanation
Day 2: topic + short explanation
Day 3: topic + short explanation
Day 4: topic + short explanation
Day 5: topic + short explanation
"""
    return generate_text(prompt)