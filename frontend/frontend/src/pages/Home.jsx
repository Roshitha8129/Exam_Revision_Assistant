export default function Home() {
  return (
    <>
      <div className="tool-header">
        <h2>Welcome to StudyAI Pro 🎓</h2>
        <p>Your intelligent companion for exam revision and document analysis.</p>
      </div>

      <div className="result-area" style={{ backgroundColor: '#ffffff', borderLeftColor: '#3b82f6' }}>
        <h3 style={{ marginTop: 0, color: '#1e293b' }}>Getting Started</h3>
        <ul style={{ lineHeight: '2', color: '#64748b' }}>
          <li><strong>Step 1:</strong> Head over to the <strong>Documents</strong> tab and upload your PDF.</li>
          <li><strong>Step 2:</strong> Once processed, use the <strong>Study Plan</strong> to map out your week.</li>
          <li><strong>Step 3:</strong> Test yourself with <strong>Quizzes</strong> and <strong>Flashcards</strong>.</li>
          <li><strong>Step 4:</strong> Have questions? Use the <strong>AI Chat</strong> for instant answers.</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>⚡ Quick Tip</h4>
          <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
            Uploading clear, high-quality PDFs ensures the AI generates more accurate questions and plans.
          </p>
        </div>
        <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>🤖 Powered by Groq</h4>
          <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
            Experience lightning-fast inference and intelligent document grounding.
          </p>
        </div>
      </div>
    </>
  );
}