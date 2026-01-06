import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import AIPortfolio from '../components/AIPortfolio';
import Results from '../components/Results';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';
import TechStack from '../components/TechStack';
import Header from '../components/Header';
import SEOHead from '../components/SEOHead';
import SocialFooter from '../components/SocialFooter';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        const headerHeight = 64;
        const elementPosition = element.offsetTop - headerHeight;
        setTimeout(() => {
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [location]);

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
      <TechStack />
      <BlogSection />
      <Contact />
      <SocialFooter />
    </>
  );
};

export default HomePage;