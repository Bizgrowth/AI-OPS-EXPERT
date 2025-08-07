import React from 'react';
import AIPortfolio from '../components/AIPortfolio';
import SEOHead from '../components/SEOHead';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <SEOHead 
        title="AI Solutions Portfolio"
        description="Explore custom-built AI applications for small businesses. Interactive demos, proven ROI, and detailed case studies showing real-world AI implementation results."
        keywords="AI Portfolio, AI Applications, AI Demos, AI Case Studies, Business AI Solutions, AI ROI"
        canonicalUrl="/portfolio"
      />
      <AIPortfolio />
    </div>
  );
};

export default PortfolioPage;