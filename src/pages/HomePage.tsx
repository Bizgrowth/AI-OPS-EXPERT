import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import AIPortfolio from '../components/AIPortfolio';
import Results from '../components/Results';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';
import Header from '../components/Header';
import SEOHead from '../components/SEOHead';

const HomePage = () => {
  return (
    <>
      <SEOHead 
        title="Transform Operations with AI"
        description="AI Operations Expert specializing in intelligent automation, operational optimization, and AI-powered business transformation. Former COO helping companies scale through strategic AI implementation."
        keywords="AI Operations, Business Automation, AI Strategy, Intelligent Automation, Daniel Schley, AI Expert"
        canonicalUrl="/"
      />
      <Header />
      <Hero />
      <About />
      <Services />
      <AIPortfolio />
      <Results />
      <BlogSection />
      <Contact />
    </>
  );
};

export default HomePage;