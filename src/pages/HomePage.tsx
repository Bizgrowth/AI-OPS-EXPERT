import React from 'react';
import Hero from '../components/Hero';
import SEOHead from '../components/SEOHead';
import About from '../components/About';
import Services from '../components/Services';
import AIPortfolio from '../components/AIPortfolio';
import Results from '../components/Results';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';

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
      <About />
      <Services />
      <AIPortfolio />
      <Results />
      <BlogSection />
      <Contact />
    </div>
  );
};

export default HomePage;