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
    <div className="min-h-screen">
      <SEOHead 
        title="Transform Operations with AI"
        description="AI Operations Expert specializing in intelligent automation, operational optimization, and AI-powered business transformation. Former COO helping companies scale through strategic AI implementation."
        keywords="AI Operations, Business Automation, AI Strategy, Intelligent Automation, Daniel Schley, AI Expert"
        canonicalUrl="/"
      />
      
      {/* Tech accent dots overlay */}
      <div className="tech-accent-dots fixed inset-0 z-0"></div>
      
      {/* Main content wrapper with proper mobile padding */}
      <div className="px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section id="home" className="relative z-10">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="tech-section-overlay relative z-10">
        <About />
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10">
        <Services />
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="tech-section-overlay relative z-10">
        <AIPortfolio />
      </section>

      {/* Results Section */}
      <section id="results" className="relative z-10">
        <Results />
      </section>

      {/* Blog Section */}
      <section id="blog" className="tech-section-overlay relative z-10">
        <BlogSection />
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative z-10">
        <CTA />
      </section>

      {/* Contact Section */}
      <section id="contact" className="tech-section-overlay relative z-10">
        <Contact />
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="relative z-10">
        <NewsletterSection />
      </section>
      </div>
    </div>
  );
};

export default HomePage;