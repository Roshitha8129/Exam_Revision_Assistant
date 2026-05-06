# Exam Revision Assistant

A full-stack AI-powered study assistant that turns documents into study plans, flashcards, quizzes, and contextual answers.

## What it does

This app lets a user upload a document (`.pdf`, `.docx`, or `.txt`), extracts the text, builds a semantic vector index, and uses an LLM to generate:

- Personalized study plans
- Flashcards
- Multiple-choice quizzes
- Document-based Q&A

## Project Structure

```
Exam_Revision_Assistant/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes.py
│   │   ├── agents/
│   │   │   ├── planner_agent.py
│   │   │   ├── flashcard_agent.py
│   │   │   ├── quiz_agent.py
│   │   │   └── chat_agent.py
│   │   ├── services/
│   │   │   ├── document_parser.py
│   │   │   ├── text_splitter.py
│   │   │   ├── vector_store.py
│   │   │   └── llm.py
│   │   └── main.py
│   ├── requirements.txt
│   └── .env  # not committed
├── frontend/
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── ChatBox.jsx
│       │   │   ├── Flashcards.jsx
│       │   │   └── StudyPlan.jsx
│       │   ├── pages/
│       │   │   ├── Home.jsx
│       │   │   ├── Quiz.jsx
│       │   │   └── Upload.jsx
│       │   ├── App.css
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── package.json
│       ├── vite.config.js
│       └── public/
└── Readme.md
```

## Backend details

### `backend/app/main.py`

- Creates the FastAPI app
- Loads environment variables with `dotenv`
- Enables CORS for frontend access
- Includes the API router from `app.api.routes`

### `backend/app/api/routes.py`

Defines endpoints for:

- `POST /upload` — upload a document and build the vector index
- `POST /plan` — generate a study plan
- `POST /flashcards` — generate flashcards
- `POST /quiz` — generate a quiz
- `POST /chat` — ask a question using document context

The uploaded document is parsed, chunked, embedded, and stored in an in-memory FAISS index (`db_store`).

### `backend/app/services`

- `document_parser.py` — extracts text from `.pdf`, `.docx`, and `.txt`
- `text_splitter.py` — splits text into overlapping chunks
- `vector_store.py` — creates a FAISS vector store using `HuggingFaceEmbeddings`
- `llm.py` — calls Groq API with `llama-3.1-8b-instant`

### `backend/app/agents`

Each agent creates a prompt and requests text generation:

- `planner_agent.py` — study plan generation
- `flashcard_agent.py` — flashcard generation
- `quiz_agent.py` — multiple-choice quiz generation
- `chat_agent.py` — answer questions from the document

## Frontend details

The frontend is a React app built with Vite located in `frontend/frontend`.

### Main UI flow

- Sidebar navigation in `App.jsx`
- `Home.jsx` shows instructions and onboarding
- `Upload.jsx` uploads documents to the backend
- `StudyPlan.jsx` requests a plan by topic and optional days
- `Flashcards.jsx` fetches flashcards and supports card flipping
- `Quiz.jsx` generates a quiz from the current document
- `ChatBox.jsx` asks questions against uploaded document context

### Backend URLs used by the frontend

- `http://127.0.0.1:8000/upload`
- `http://127.0.0.1:8000/plan`
- `http://127.0.0.1:8000/flashcards`
- `http://127.0.0.1:8000/quiz`
- `http://127.0.0.1:8000/chat`

## Dependencies

### Backend

- `fastapi`
- `uvicorn`
- `langchain`
- `langchain-community`
- `langchain-text-splitters`
- `sentence-transformers`
- `faiss-cpu`
- `pypdf`
- `python-multipart`
- `groq`
- `python-dotenv`
- `python-docx`

### Frontend

- `react`
- `react-dom`
- `axios`
- `vite`
- `@vitejs/plugin-react`

## Setup

### 1. Backend

```powershell
cd backend
.\venv\Scripts\activate
pip install -r requirements.txt
```

Create `backend/.env` with:

```dotenv
GROQ_API_KEY=your_api_key_here
```

Run the backend:

```powershell
uvicorn app.main:app --reload
```

### 2. Frontend

```powershell
cd frontend/frontend
npm install
npm run dev
```

Open the URL shown by Vite (usually `http://127.0.0.1:5173`).

## How it works

1. Upload a document in the frontend.
2. Backend parses and extracts text.
3. Text is split into chunks and embedded.
4. FAISS stores document embeddings.
5. When the user requests a plan, flashcards, quiz, or chat answer, similar chunks are retrieved.
6. The app sends context and a prompt to the Groq LLM.
7. The generated output is returned to the frontend.

## Notes

- The vector store is stored in memory and resets when the backend restarts.
- The project currently uses the Groq API, not the OpenAI API.
- This project is intended as a study/demo app and not a production-grade service.

## API Endpoints

- `POST /upload`
- `POST /plan?topic=<topic>&days=<n>&source=<document|custom>`
- `POST /flashcards?source=<document|custom>&topic=<topic>`
- `POST /quiz`
- `POST /chat?query=<question>`

## Author

Built by Roshitha G.
