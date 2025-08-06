import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import AIPortfolio from './AIPortfolio';
import Results from './Results';
import CTA from './CTA';
import Contact from './Contact';
import ServiceDetail from './ServiceDetail';
import BlogSection from './BlogSection';
import NewsletterAdmin from './NewsletterAdmin';

const Router = () => {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [serviceId, setServiceId] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      
      if (hash.startsWith('service/')) {
        const id = hash.split('/')[1];
        setServiceId(id);
        setCurrentRoute('service-detail');
        // Scroll to top when navigating to service detail
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'newsletter-admin') {
        setCurrentRoute('newsletter-admin');
        setServiceId('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentRoute('home');
        setServiceId('');
        
        // Handle section navigation on home page
        if (hash) {
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              const headerHeight = 64; // Height of fixed header
              const elementPosition = element.offsetTop - headerHeight;
              window.scrollTo({ 
                top: elementPosition, 
                behavior: 'smooth' 
              });
            }
          }, 100);
        }
      }
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Check initial hash
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleBackToHome = () => {
    window.location.hash = '';
    setCurrentRoute('home');
    setServiceId('');
    // Scroll to top when going back to home
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentRoute === 'newsletter-admin') {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="pt-16">
          <NewsletterAdmin onBack={handleBackToHome} />
        </div>
      </div>
    );
  }
  if (currentRoute === 'service-detail') {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="pt-16">
          <ServiceDetail serviceId={serviceId} onBack={handleBackToHome} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Hero />
      <About />
      <Services />
      <AIPortfolio />
      <BlogSection />
      <Results />
      <CTA />
      <Contact />
    </div>
  );
};

export default Router;