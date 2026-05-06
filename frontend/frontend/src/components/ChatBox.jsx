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
      console.error(error);
      setAnswer("Error connecting to server.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="tool-header">
        <h2>🤖 AI Document Chat</h2>
        <p>Ask specific questions and get answers grounded strictly in your uploaded PDF.</p>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="E.g., What are the core competencies mentioned?"
          onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
          disabled={loading}
          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
        />
      </div>
      
      <button onClick={askQuestion} disabled={loading || !query}>
        {loading ? 'Consulting Document...' : 'Ask AI'}
      </button>

      {answer && (
        <div className="result-area" style={{ backgroundColor: '#f0f9ff', borderLeftColor: '#0ea5e9' }}>
          <strong>AI Response:</strong>
          <p style={{ marginTop: '0.5rem', color: '#0369a1' }}>{answer}</p>
        </div>
      )}
    </>
  );
}