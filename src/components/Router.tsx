import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './Header';
import ChatbotToggle from './ChatbotToggle';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ServicesPage from '../pages/ServicesPage';
import PortfolioPage from '../pages/PortfolioPage';
import BlogPage from '../pages/BlogPage';
import ResultsPage from '../pages/ResultsPage';
import ContactPage from '../pages/ContactPage';
import ServiceDetail from './ServiceDetail';
import NewsletterAdmin from './NewsletterAdmin';

const Router = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-900">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/service/:serviceId" element={<ServiceDetail />} />
            <Route path="/newsletter-admin" element={<NewsletterAdmin />} />
          </Routes>
          <ChatbotToggle />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default Router;