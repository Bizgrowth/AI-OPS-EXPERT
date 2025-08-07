import React from 'react';
import Services from '../components/Services';
import SEOHead from '../components/SEOHead';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <SEOHead 
        title="AI Solutions & Services"
        description="Comprehensive AI operations solutions including strategy & implementation, workflow optimization, intelligent automation, analytics & insights, and custom AI development."
        keywords="AI Services, AI Strategy, Process Automation, AI Analytics, Custom AI Development, Intelligent Automation"
        canonicalUrl="/services"
      />
      <Services />
    </div>
  );
};

export default ServicesPage;