import { useState } from 'react';

export default function Flashcards({ customTopic }) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('document'); // State to handle the source choice

  const generateFlashcards = async () => {
    setLoading(true);
    // Use the custom topic from the Study Plan if 'custom' is selected
    const topicToUse = source === 'custom' ? customTopic : '';
    
    try {
      const url = `http://127.0.0.1:8000/flashcards?source=${source}&topic=${encodeURIComponent(topicToUse)}`;
      const response = await fetch(url, { method: 'POST' });
      const data = await response.json();
      
      const lines = data.flashcards.split('\n').filter(line => line.includes('|'));
      const parsedCards = lines.map(line => {
        const [question, answer] = line.split('|'); 
        return { 
          q: question?.trim() || "No Question", 
          a: answer?.trim() || "No Answer" 
        };
      });

      setCards(parsedCards);
      setCurrentIndex(0);
      setIsFlipped(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <>
      <div className="tool-header">
        <h2>⚡ Interactive Flashcards</h2>
        <p>Master {source === 'custom' ? `your topic: ${customTopic}` : 'your document'} through active recall.</p>
      </div>

      {/* Source Selection Toggles */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => setSource('document')}
          style={{ 
            flex: 1, 
            background: source === 'document' ? '#f59e0b' : '#e2e8f0', 
            color: source === 'document' ? 'white' : '#475569',
            border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer'
          }}
        >
          📄 From Document
        </button>
        <button 
          onClick={() => setSource('custom')}
          disabled={!customTopic}
          style={{ 
            flex: 1, 
            background: source === 'custom' ? '#f59e0b' : '#e2e8f0', 
            color: source === 'custom' ? 'white' : '#475569',
            opacity: !customTopic ? 0.5 : 1,
            border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer'
          }}
        >
          🌐 From Study Plan Topic
        </button>
      </div>
      
      {!cards.length ? (
        <button onClick={generateFlashcards} disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Creating Deck...' : 'Generate Flashcards'}
        </button>
      ) : (
        <div className="flashcard-deck">
          <div 
            className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <p>{cards[currentIndex].q}</p>
              </div>
              <div className="flashcard-back">
                <p>{cards[currentIndex].a}</p>
              </div>
            </div>
          </div>

          <div className="deck-controls">
            <button onClick={prevCard} className="nav-btn">← Previous</button>
            <span className="deck-counter">{currentIndex + 1} / {cards.length}</span>
            <button onClick={nextCard} className="nav-btn">Next →</button>
          </div>
          
          <button 
            onClick={() => {setCards([]); setIsFlipped(false);}} 
            style={{ marginTop: '1rem', background: 'none', color: '#64748b', textDecoration: 'underline', fontSize: '0.8rem', border: 'none', cursor: 'pointer' }}
          >
            Reset Deck
          </button>
        </div>
      )}
    </>
  );
}