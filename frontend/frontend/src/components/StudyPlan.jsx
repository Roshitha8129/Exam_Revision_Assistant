import { useState } from 'react';

export default function StudyPlan() {
  const [topic, setTopic] = useState('');
  const [plan, setPlan] = useState('');
  const [days, setDays] = useState(''); // Empty string for "Auto-decide"
  const [source, setSource] = useState('document'); // Default to document
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!topic) return alert("Please enter a topic!");
    setLoading(true);
    
    try {
      // Sending days and source as query parameters
      const url = `http://127.0.0.1:8000/plan?topic=${encodeURIComponent(topic)}&source=${source}${days ? `&days=${days}` : ''}`;
      const response = await fetch(url, { method: 'POST' });
      const data = await response.json();
      setPlan(data.plan);
    } catch (error) {
      console.error(error);
      setPlan('Error generating study plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="tool-header">
        <h2>📅 Intelligent Study Planner</h2>
        <p>Custom-built roadmaps based on your needs.</p>
      </div>

      <div className="settings-grid" style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Step 1: Choose Source */}
        <div>
          <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Source Material:</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setSource('document')}
              style={{ flex: 1, background: source === 'document' ? '#3b82f6' : '#e2e8f0', color: source === 'document' ? 'white' : '#475569' }}
            >
              📄 From My Document
            </button>
            <button 
              onClick={() => setSource('custom')}
              style={{ flex: 1, background: source === 'custom' ? '#3b82f6' : '#e2e8f0', color: source === 'custom' ? 'white' : '#475569' }}
            >
              🌐 Custom AI Topic
            </button>
          </div>
        </div>

        {/* Step 2: Input Topic */}
        <input 
          type="text" 
          value={topic} 
          onChange={(e) => setTopic(e.target.value)} 
          placeholder={source === 'document' ? "Enter a topic found in your PDF..." : "Enter any topic (e.g. Quantum Physics)"}
          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
        />

        {/* Step 3: Optional Days */}
        <div>
          <label style={{ fontSize: '0.9rem', color: '#64748b' }}>Number of Days (Leave blank for AI to decide):</label>
          <input 
            type="number" 
            value={days} 
            onChange={(e) => setDays(e.target.value)} 
            placeholder="e.g. 5"
            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '0.5rem' }}
          />
        </div>
      </div>
      
      <button onClick={generatePlan} disabled={loading} style={{ width: '100%' }}>
        {loading ? 'Analyzing & Designing Plan...' : 'Generate Personalized Plan'}
      </button>

      {plan && (
        <div className="result-area" style={{ borderLeftColor: '#8b5cf6', marginTop: '2rem' }}>
          <div style={{ fontWeight: '600', marginBottom: '1rem', color: '#6d28d9' }}>
            {days ? `${days}-Day Roadmap:` : 'Optimized Learning Roadmap:'}
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }}>{plan}</div>
        </div>
      )}
    </>
  );
}