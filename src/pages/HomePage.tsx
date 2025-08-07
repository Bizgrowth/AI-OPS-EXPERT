import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import AIPortfolio from '../components/AIPortfolio';
import BlogSection from '../components/BlogSection';
import Results from '../components/Results';
import Contact from '../components/Contact';
import CTA from '../components/CTA';
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
      
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Services Section */}
      <section id="services">
        <Services />
      </section>

      {/* Portfolio Section */}
      <section id="portfolio">
        <AIPortfolio />
      </section>

      {/* Results Section */}
      <section id="results">
        <Results />
      </section>

      {/* Blog Section */}
      <section id="blog">
        <BlogSection />
      </section>

      {/* CTA Section */}
      <section id="cta">
        <CTA />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>

      {/* Newsletter Section */}
      <section id="newsletter">
        <NewsletterSection />
      </section>
    </div>
  );
};

export default HomePage;