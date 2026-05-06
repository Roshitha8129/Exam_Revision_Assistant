from fastapi import APIRouter, UploadFile, File, Query
from typing import Optional
from app.services.document_parser import extract_text
from app.services.vector_store import create_vector_store
from app.agents.planner_agent import generate_plan
from app.agents.flashcard_agent import generate_flashcards
from app.agents.quiz_agent import generate_quiz
from app.agents.chat_agent import ask_question
from app.services.text_splitter import split_text

router = APIRouter()

db_store = None 

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    global db_store
    file_location = f"temp_{file.filename}"
    with open(file_location, "wb") as f:
        f.write(await file.read())

    text = extract_text(file_location)
    chunks = split_text(text)
    db_store = create_vector_store(chunks)
    return {"message": "Document processed successfully"}

@router.post("/plan")
def get_plan(
    topic: str, 
    days: Optional[int] = Query(None), 
    source: str = Query("document")
):
    global db_store
    context = ""

    if source == "document":
        if not db_store:
            return {"plan": "Please upload a document first to use it as a source."}
        docs = db_store.similarity_search(topic, k=3)
        context = "\n\n".join([d.page_content for d in docs])
    
    plan = generate_plan(topic, days=days, context=context)
    return {"plan": plan}

@router.post("/flashcards")
def flashcards(
    topic: Optional[str] = Query(None), 
    source: str = Query("document")
):
    global db_store
    content = ""

    # 1. Logic for Document Source
    if source == "document":
        if not db_store:
            return {"flashcards": "Error: Please upload a document first."}
        
        # If no specific topic is passed, search for general concepts
        search_query = topic if topic else "key concepts and definitions"
        docs = db_store.similarity_search(search_query, k=3)
        content = "\n\n".join([d.page_content for d in docs])
    
    # 2. Call agent with either document content or the custom topic name
    # If source is 'custom', content will be empty and the agent uses 'topic'
    cards = generate_flashcards(content=content, topic=topic)
    
    return {"flashcards": cards}

@router.post("/quiz")
def quiz():
    global db_store
    if not db_store:
        return {"quiz": "Please upload a document first."}
    docs = db_store.similarity_search("important concepts", k=3)
    content = " ".join([d.page_content for d in docs])
    return {"quiz": generate_quiz(content)}

@router.post("/chat")
def chat(query: str):
    global db_store
    if not db_store:
        return {"answer": "Please upload a document first."}
    docs = db_store.similarity_search(query, k=5)
    context = "\n\n".join([d.page_content.strip()[:300] for d in docs])
    answer = ask_question(context, query)
    return {"answer": answer}