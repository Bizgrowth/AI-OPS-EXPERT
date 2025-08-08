import React from 'react';
import HomePage from './pages/HomePage';
import ChatbotToggle from './components/ChatbotToggle';
import TestForm from './components/TestForm';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <HomePage />
      <ChatbotToggle />
      <TestForm />
    </div>
  );
}

export default App;