import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServiceDetail from './components/ServiceDetail';
import ServicesPaymentPage from './pages/ServicesPaymentPage';
import BillingPage from './pages/BillingPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ClientPortalPage from './pages/ClientPortalPage';
import ClientLoginPage from './pages/ClientLoginPage';
import ClientRegisterPage from './pages/ClientRegisterPage';
import AdminPanel from './components/AdminPanel';
import AdminSignup from './components/AdminSignup';
import ProtectedRoute from './components/ProtectedRoute';
import ClientProtectedRoute from './components/ClientProtectedRoute';
import ChatbotToggle from './components/ChatbotToggle';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/service/:serviceId" element={<ServiceDetail />} />
          <Route path="/services" element={<ServicesPaymentPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/client-login" element={<ClientLoginPage />} />
          <Route path="/client-register" element={<ClientRegisterPage />} />
          <Route
            path="/client-portal"
            element={
              <ClientProtectedRoute>
                <ClientPortalPage />
              </ClientProtectedRoute>
            }
          />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
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