import { useState } from 'react';

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState('');
  const [loading, setLoading] = useState(false);

  const generateFlashcards = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/flashcards', { method: 'POST' });
      const data = await response.json();
      setFlashcards(data.flashcards);
    } catch (error) {
        console.error(error);
      setFlashcards('Error generating flashcards.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>⚡ Study Flashcards</h2>
      <p style={{ color: 'var(--text-light)' }}>Get quick summary cards for revision.</p>
      
      <button onClick={generateFlashcards} disabled={loading}>
        {loading ? 'Creating Flashcards...' : 'Generate Flashcards'}
      </button>

      {flashcards && <div className="result-box">{flashcards}</div>}
    </div>
  );
}