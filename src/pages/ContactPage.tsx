import React from 'react';
import Contact from '../components/Contact';
import SEOHead from '../components/SEOHead';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <SEOHead 
        title="Contact AI Operations Expert"
        description="Ready to transform your operations with AI? Contact Daniel Schley for a free AI strategy session. Personal response within 24 hours guaranteed."
        keywords="Contact AI Expert, AI Consultation, AI Strategy Session, Daniel Schley Contact, AI Operations Consultation"
        canonicalUrl="/contact"
      />
      <Contact />
    </div>
  );
};

export default ContactPage;