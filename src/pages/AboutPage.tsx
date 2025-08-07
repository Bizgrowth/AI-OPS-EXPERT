import React from 'react';
import About from '../components/About';
import SEOHead from '../components/SEOHead';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <SEOHead 
        title="About Daniel Schley - AI Operations Expert"
        description="20+ years of operational leadership combined with cutting-edge AI expertise. Former COO with proven scale results helping businesses transform operations and achieve exponential growth."
        keywords="Daniel Schley, AI Operations Expert, Business Operations, COO, AI Strategy, Business Transformation"
        canonicalUrl="/about"
      />
      <About />
    </div>
  );
};

export default AboutPage;