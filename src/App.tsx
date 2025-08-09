import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServiceDetail from './components/ServiceDetail';
import ChatbotToggle from './components/ChatbotToggle';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/service/:serviceId" element={<ServiceDetail />} />
        </Routes>
        <ChatbotToggle />
      </div>
    </Router>
  );
}

export default App;