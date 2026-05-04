from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

def create_vector_store(text_chunks):
    embeddings = HuggingFaceEmbeddings()
    db = FAISS.from_texts(text_chunks, embeddings)
    return db