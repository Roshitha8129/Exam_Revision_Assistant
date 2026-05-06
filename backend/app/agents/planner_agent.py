from app.services.llm import generate_text

def generate_plan(topic, days=None, context=""):
    # 1. Determine the duration instruction
    if days:
        duration_info = f"This must be a strictly {days}-day study plan."
    else:
        duration_info = "Determine the number of days automatically based on the complexity of the topic (e.g., 3 days for simple topics, up to 10 for complex ones)."

    # 2. Determine the source instruction
    if context:
        source_info = f"Base this plan specifically on the following content extracted from the user's document:\n{context}"
    else:
        source_info = "The user has not provided a document for this topic. Use your general knowledge to create a comprehensive plan."

    # 3. Construct the dynamic prompt
    prompt = f"""
You are an expert Academic Coordinator. Create a structured study plan for the topic: "{topic}".

{duration_info}

{source_info}

Format Requirements:
- Provide a clear title for the plan.
- For each day, provide:
  * Day X: [Specific Sub-topic Name]
  * Objectives: What the user should achieve today.
  * Tasks: 2-3 specific action items or explanations.

Please ensure the tone is encouraging and the progression is logical (from basics to advanced).
"""
    return generate_text(prompt)