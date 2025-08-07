import React from 'react';
import HomePage from './pages/HomePage';
import ChatbotToggle from './components/ChatbotToggle';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <HomePage />
      <ChatbotToggle />
    </div>
  );
}

export default App;