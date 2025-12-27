import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServiceDetail from './components/ServiceDetail';
import PortalPage from './pages/PortalPage';
import BlogAdmin from './components/BlogAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import ChatbotToggle from './components/ChatbotToggle';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/service/:serviceId" element={<ServiceDetail />} />
          <Route path="/portal" element={<PortalPage />} />
          <Route
            path="/blog-admin"
            element={
              <ProtectedRoute>
                <BlogAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ChatbotToggle />
      </div>
    </Router>
  );
}

export default App;