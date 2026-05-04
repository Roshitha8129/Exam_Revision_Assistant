import { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert('Please select a PDF first!');
    
    setLoading(true);
    setStatus('');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: formData, // No headers needed for FormData, browser sets it
      });

      if (response.ok) {
        setStatus('PDF processed successfully! 🎉 You can now generate study materials.');
      } else {
        setStatus('Failed to upload PDF.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>📁 Step 1: Upload Document</h2>
      <p style={{ color: 'var(--text-light)' }}>Upload your syllabus or resume to get started.</p>
      
      <input 
        type="file" 
        accept="application/pdf" 
        onChange={(e) => setFile(e.target.files[0])} 
      />
      
      <button onClick={handleUpload} disabled={loading || !file}>
        {loading ? 'Uploading & Reading...' : 'Upload PDF'}
      </button>

      {status && <p className="status-msg">{status}</p>}
    </div>
  );
}