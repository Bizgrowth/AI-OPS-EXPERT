import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './Header';
import ChatbotToggle from './ChatbotToggle';
import HomePage from '../pages/HomePage';

const Router = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-900">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <ChatbotToggle />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default Router;