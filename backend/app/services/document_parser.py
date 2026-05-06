import pypdf
from docx import Document  # pip install python-docx
import os

def extract_text(file_path):
    # Get the file extension
    ext = os.path.splitext(file_path)[1].lower()

    try:
        # 1. Handle PDFs
        if ext == '.pdf':
            reader = pypdf.PdfReader(file_path)
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
            return text

        # 2. Handle Word Documents (.docx)
        elif ext == '.docx':
            doc = Document(file_path)
            # Joins all paragraphs with a newline
            return "\n".join([para.text for para in doc.paragraphs])

        # 3. Handle Plain Text (.txt)
        elif ext == '.txt':
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()

        else:
            return f"Error: Unsupported file format ({ext})"

    except Exception as e:
        print(f"Error parsing {ext} file: {e}")
        return "Error: Could not extract text from the document."