import { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    // Updated alert to be more general
    if (!file) return alert('Please select a document first!');
    
    setLoading(true);
    setStatus('');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Updated success message for any document type
        setStatus('Document processed successfully! 🎉 You can now generate study materials.');
      } else {
        setStatus('Failed to upload document.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="tool-header">
        <h2>📁 Document Management</h2>
        <p>Upload your syllabus, notes, or resume (PDF, DOCX, or TXT) to train the AI.</p>
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <input 
          type="file" 
          /* Updated: Now allows PDF, Word, and Text files in the picker */
          accept=".pdf, .docx, .txt" 
          onChange={(e) => setFile(e.target.files[0])} 
          className="file-input"
        />
      </div>
      
      <button onClick={handleUpload} disabled={loading || !file}>
        {loading ? 'Processing Document...' : 'Upload & Analyze'}
      </button>

      {status && (
        <div className="result-area" style={{ borderLeftColor: '#10b981', color: '#065f46' }}>
          {status}
        </div>
      )}
    </>
  );
}