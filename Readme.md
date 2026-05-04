| Package                  | Purpose                     |
| ------------------------ | --------------------------- |
| fastapi, uvicorn         | Backend server              |
| langchain                | RAG pipeline                |
| langchain-community      | FAISS + integrations        |
| langchain-text-splitters | Chunking PDF                |
| sentence-transformers    | Embeddings (VERY IMPORTANT) |
| faiss-cpu                | Vector database             |
| pypdf                    | PDF reading                 |
| python-multipart         | File upload                 |
| openai                   | LLM API                     |
| python-dotenv            | API key management          |



You are using React with Vite (I can see vite.config.js, main.jsx, and the .jsx file extensions).

React + Vite is the absolute best frontend pairing for a FastAPI backend.

FastAPI is incredibly fast at serving data.

Vite is incredibly fast at building and updating your React UI.

They work together seamlessly.




AI Study Assistant
A full-stack AI-powered platform designed to help students and professionals turn documents into actionable study material. Upload a PDF, and the assistant will generate study plans, flashcards, quizzes, and answer your specific questions using the Groq LPU Inference Engine.

🚀 Features
PDF Upload & Processing: Seamlessly extracts text from resumes, textbooks, or notes.

5-Day Study Planner: Generates a structured daily schedule based on document content.

Instant Flashcards: Extracts key terms and definitions for quick revision.

Interactive Quizzes: Generates Multiple Choice Questions (MCQs) to test your knowledge.

AI Document Chat: Ask specific questions and get answers grounded strictly in your uploaded PDF.

🛠️ Tech Stack
Backend
Framework: FastAPI (Python)

AI Engine: Groq Cloud API (Llama 3.1 8B)

Library: OpenAI Python SDK (for API interaction)

Environment: Python dotenv for secure secret management

Frontend
Library: React.js

Build Tool: Vite (for ultra-fast development)

Styling: Custom CSS (Responsive Dashboard)

HTTP Client: Native Fetch API

📂 Project Structure
Plaintext
exam-revision-assistant/
├── backend/
│   ├── app/
│   │   ├── api/          # FastAPI Routes
│   │   ├── agents/       # AI Logic for Quiz, Plan, etc.
│   │   └── services/     # Groq/LLM service configuration
│   ├── venv/             # Python Virtual Environment
│   └── .env              # API Keys (Excluded from Git)
├── frontend/
│   └── frontend/         # React Source Code
│       ├── src/
│       │   ├── components/ # Flashcards, ChatBox, StudyPlan
│       │   └── pages/      # Upload, Quiz
│       └── App.jsx         # Main Dashboard Layout
└── .gitignore            # Git exclusion rules
⚙️ Setup & Installation
1. Backend Setup
Navigate to the backend folder:

Bash
cd backend
Activate your virtual environment:

Bash
   .\venv\Scripts\activate
Install dependencies:

Bash
   pip install fastapi uvicorn groq python-dotenv openai
Create a .env file and add your Groq key:

Plaintext
   GROQ_API_KEY=your_api_key_here
Run the server:

Bash
   uvicorn app.main:app --reload
2. Frontend Setup
Open a new terminal and navigate to the frontend:

Bash
   cd frontend/frontend
Install dependencies:

Bash
npm install
Start the React development server:

Bash
   npm run dev














   AI Exam Revision Assistant

An intelligent AI-powered study assistant that helps students learn efficiently from PDFs by generating study plans, flashcards, quizzes, and contextual answers.

🚀 Project Overview

The AI Exam Revision Assistant is a Retrieval-Augmented Generation (RAG) based application that allows users to:

📄 Upload study materials (PDFs)
🧠 Extract and understand content
📅 Generate personalized study plans
🃏 Create flashcards
📝 Generate quizzes
💬 Ask questions from the document

This system combines Natural Language Processing (NLP), vector databases, and LLMs (Large Language Models) to deliver smart learning assistance.

🧠 How It Works (Architecture)
User → Upload PDF → Text Extraction → Chunking → Embeddings
→ FAISS Vector Store → Query → LLM (Qwen/OpenAI)
→ Response (Plan / Flashcards / Quiz / Chat)
🛠️ Tech Stack
🔹 Backend
FastAPI (API framework)
LangChain (RAG pipeline)
FAISS (Vector database)
Sentence Transformers (Embeddings)
PyPDF (PDF parsing)
OpenAI / OpenRouter API (LLM)
🔹 Frontend
HTML, CSS, JavaScript
Chart.js (for visualization if used)
📁 Project Structure
backend/
│
├── app/
│   ├── api/
│   │   └── routes.py
│   ├── agents/
│   │   ├── planner_agent.py
│   │   ├── flashcard_agent.py
│   │   ├── quiz_agent.py
│   │   └── chat_agent.py
│   ├── services/
│   │   ├── pdf_parser.py
│   │   ├── text_splitter.py
│   │   ├── vector_store.py
│   │   └── llm.py
│   └── main.py
│
├── requirements.txt
├── .env
└── venv/

frontend/
│
├── index.html
├── styles.css
├── script.js
⚙️ Installation & Setup
🔹 1. Clone the Repository
git clone <your-repo-link>
cd exam-revision-assistant
🔹 2. Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt
🔹 3. Add API Key

Create .env file inside backend:

API_KEY=your_api_key_here
🔹 4. Run Backend
uvicorn app.main:app --reload

👉 Open in browser:

http://127.0.0.1:8000/docs
🔹 5. Frontend Setup

Just open:

frontend/index.html

(or use Live Server in VS Code)

📡 API Endpoints
📄 Upload PDF
POST /upload
📅 Generate Study Plan
POST /plan?topic=Artificial Intelligence
🃏 Generate Flashcards
POST /flashcards
📝 Generate Quiz
POST /quiz
💬 Ask Questions
POST /chat?query=Your question
✨ Features
📄 PDF-based learning
🧠 AI-powered summarization
🎯 Context-aware Q&A (RAG)
🃏 Flashcard generation
📝 Auto quiz generation
📅 Study planning
⚡ Fast API responses
🔍 Semantic search using FAISS
🧪 Example Use Case
Upload a resume or textbook PDF
Generate flashcards for revision
Ask:
“What is this document about?”
“Explain key concepts”
Get instant answers
⚠️ Limitations
Depends on quality of uploaded PDF
API-based LLM requires internet
Large PDFs may take time to process
Free API tiers may have rate limits
🔮 Future Improvements
🎨 React-based frontend UI
📊 Progress tracking dashboard
🧠 Better LLM (GPT-4 / advanced models)
📱 Mobile app version
🌐 Multi-language support
👩‍💻 Author

Roshitha G
AI/ML Enthusiast | Full Stack Developer

📜 License

This project is for educational purposes.

💡 Final Note

This project demonstrates a real-world AI system using RAG architecture, combining:

NLP
Vector databases
LLMs

👉 It is suitable for:

Final year project
Portfolio project
AI application demo