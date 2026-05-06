import { useState } from 'react';
import './App.css';
import Home from './pages/Home'; // Added Home import
import Upload from './pages/Upload';
import Quiz from './pages/Quiz';
import Flashcards from './components/Flashcards';
import ChatBox from './components/ChatBox';
import StudyPlan from './components/StudyPlan';

function App() {
  // Set 'home' as the default starting tab
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'upload': return <Upload />;
      case 'plan': return <StudyPlan />;
      case 'flashcards': return <Flashcards />;
      case 'quiz': return <Quiz />;
      case 'chat': return <ChatBox />;
      default: return <Home />;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Professional Sidebar */}
      <nav className="sidebar">
        {/* Clickable title to return home */}
        <h1 
          onClick={() => setActiveTab('home')} 
          style={{ cursor: 'pointer' }}
        >
          🎓 StudyAI Pro
        </h1>
        
        {/* Navigation Links */}
        <div 
          className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} 
          onClick={() => setActiveTab('home')}
        >
          🏠 Home
        </div>
        
        <div 
          className={`nav-link ${activeTab === 'upload' ? 'active' : ''}`} 
          onClick={() => setActiveTab('upload')}
        >
          📁 Documents
        </div>

        <hr style={{ opacity: 0.1, margin: '1rem 0' }} />

        <div 
          className={`nav-link ${activeTab === 'plan' ? 'active' : ''}`} 
          onClick={() => setActiveTab('plan')}
        >
          📅 Study Plan
        </div>
        
        <div 
          className={`nav-link ${activeTab === 'flashcards' ? 'active' : ''}`} 
          onClick={() => setActiveTab('flashcards')}
        >
          ⚡ Flashcards
        </div>
        
        <div 
          className={`nav-link ${activeTab === 'quiz' ? 'active' : ''}`} 
          onClick={() => setActiveTab('quiz')}
        >
          📝 Quiz Mode
        </div>
        
        <div 
          className={`nav-link ${activeTab === 'chat' ? 'active' : ''}`} 
          onClick={() => setActiveTab('chat')}
        >
          💬 AI Chat
        </div>
      </nav>

      {/* Main Workspace */}
      <main className="main-content">
        <div className="glass-card">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;