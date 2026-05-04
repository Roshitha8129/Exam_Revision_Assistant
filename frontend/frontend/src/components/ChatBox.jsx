import { useState } from 'react';

export default function ChatBox() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!query) return;
    setLoading(true);
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/chat?query=${encodeURIComponent(query)}`, {
        method: 'POST',
      });
      const data = await response.json();
      setAnswer(data.answer);
    } 
    catch (error) {
  console.error(error); // <-- Add this line
  setAnswer("Error connecting to server.");
}
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>🤖 Chat with Document</h2>
      <p style={{ color: 'var(--text-light)' }}>Ask specific questions about the uploaded PDF.</p>
      
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="E.g., What is the name on the resume?"
        onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
      />
      
      <button onClick={askQuestion} disabled={loading || !query}>
        {loading ? 'Thinking...' : 'Ask Question'}
      </button>

      {answer && <div className="result-box" style={{ backgroundColor: '#e0f2fe' }}>
        <strong>Answer:</strong><br/><br/>{answer}
      </div>}
    </div>
  );
}