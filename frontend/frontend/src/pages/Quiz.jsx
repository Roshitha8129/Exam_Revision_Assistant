import { useState } from 'react';

export default function Quiz() {
  const [quiz, setQuiz] = useState('');
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/quiz', { method: 'POST' });
      const data = await response.json();
      setQuiz(data.quiz);
    } catch (error) {
        console.error(error);
      setQuiz('Error generating quiz.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>📝 Practice Quiz</h2>
      <p style={{ color: 'var(--text-light)' }}>Test your knowledge with AI-generated MCQs.</p>
      
      <button onClick={generateQuiz} disabled={loading}>
        {loading ? 'Generating 5 Questions...' : 'Generate Quiz'}
      </button>

      {quiz && <div className="result-box">{quiz}</div>}
    </div>
  );
}