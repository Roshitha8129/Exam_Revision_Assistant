import './App.css';
import Upload from './pages/Upload';
import Quiz from './pages/Quiz';
import Flashcards from './components/Flashcards';
import ChatBox from './components/ChatBox';
import StudyPlan from './components/StudyPlan'; 

function App() {
  return (
    <div className="app-container">
      <div className="header">
        <h1>AI Study Assistant</h1>
        <p>Upload a document and let AI create your study materials instantly.</p>
      </div>

      {/* The Upload section spans the top */}
      <div style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
        <Upload />
      </div>

      {/* The rest of the tools in a grid */}
      <div className="dashboard-grid">
        <StudyPlan /> {/* <-- Added StudyPlan right here! */}
        <Flashcards />
        <Quiz />
        <ChatBox />
      </div>
    </div>
  );
}

export default App;