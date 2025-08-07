import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './Header';
import ChatbotToggle from './ChatbotToggle';
import HomePage from '../pages/HomePage';
import NewsletterAdmin from './NewsletterAdmin';

const Router = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-900">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/newsletter-admin" element={<NewsletterAdmin />} />
          </Routes>
          <ChatbotToggle />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default Router;