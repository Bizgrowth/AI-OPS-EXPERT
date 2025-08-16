import React from 'react';
import CustomerPortal from '../components/CustomerPortal';
import SEOHead from '../components/SEOHead';

const PortalPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Client Portal"
        description="Access your AI transformation projects, documents, and communicate directly with Daniel Schley about your implementation progress."
        keywords="Client Portal, Project Management, AI Implementation, Customer Dashboard"
        canonicalUrl="/portal"
      />
      <CustomerPortal />
    </>
  );
};

export default PortalPage;