import { useState } from 'react';

export default function StudyPlan() {
  const [topic, setTopic] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!topic) return;
    setLoading(true);
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/plan?topic=${encodeURIComponent(topic)}`, {
        method: 'POST',
      });
      const data = await response.json();
      setPlan(data.plan);
    } catch {
      setPlan('Error generating study plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>📅 5-Day Study Plan</h2>
      <p style={{ color: 'var(--text-light)' }}>Get a structured schedule for any topic in your document.</p>
      
      <input 
        type="text" 
        value={topic} 
        onChange={(e) => setTopic(e.target.value)} 
        placeholder="Enter topic (e.g., Operating Systems)"
        onKeyDown={(e) => e.key === 'Enter' && generatePlan()}
      />
      
      <button onClick={generatePlan} disabled={loading || !topic}>
        {loading ? 'Drafting Plan...' : 'Generate Plan'}
      </button>

      {plan && <div className="result-box">{plan}</div>}
    </div>
  );
}