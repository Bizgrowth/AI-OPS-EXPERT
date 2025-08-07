import React from 'react';
import Hero from '../components/Hero';
import NewsletterSection from '../components/NewsletterSection';
import SEOHead from '../components/SEOHead';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <SEOHead 
        title="Transform Operations with AI"
        description="AI Operations Expert specializing in intelligent automation, operational optimization, and AI-powered business transformation. Former COO helping companies scale through strategic AI implementation."
        keywords="AI Operations, Business Automation, AI Strategy, Intelligent Automation, Daniel Schley, AI Expert"
        canonicalUrl="/"
      />
      <Hero />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;