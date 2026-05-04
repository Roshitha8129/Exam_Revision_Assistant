from fastapi import APIRouter, UploadFile, File
from app.services.pdf_parser import extract_text
from app.services.vector_store import create_vector_store
from app.agents.planner_agent import generate_plan
from app.agents.flashcard_agent import generate_flashcards
from app.agents.quiz_agent import generate_quiz
from app.agents.chat_agent import ask_question
from app.services.text_splitter import split_text

router = APIRouter()

db_store = None  # global (for now)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    global db_store

    file_location = f"temp_{file.filename}"

    with open(file_location, "wb") as f:
        f.write(await file.read())

    text = extract_text(file_location)

    chunks = split_text(text)
    db_store = create_vector_store(chunks)

    return {"message": "PDF processed successfully"}


@router.post("/plan")
def get_plan(topic: str):
    return {"plan": generate_plan(topic)}


@router.post("/flashcards")
def flashcards():
    global db_store

    if not db_store:
        return {"flashcards": "Please upload a PDF first."}

    docs = db_store.similarity_search("important concepts", k=3)
    content = " ".join([d.page_content for d in docs])

    return {"flashcards": generate_flashcards(content)}


@router.post("/quiz")
def quiz():
    global db_store

    if not db_store:
        return {"quiz": "Please upload a PDF first."}

    docs = db_store.similarity_search("important concepts", k=3)
    content = " ".join([d.page_content for d in docs])

    return {"quiz": generate_quiz(content)}


@router.post("/chat")
def chat(query: str):
    global db_store

    if not db_store:
        return {"answer": generate_plan(query)}  # fallback

    # ✅ FIX: retrieve relevant context
    docs = db_store.similarity_search(query, k=5)
    context = "\n\n".join([
    d.page_content.strip()[:300]   # limit chunk size
    for d in docs
    ])

    # ✅ FIX: correct argument order
    answer = ask_question(context, query)

    return {"answer": answer}