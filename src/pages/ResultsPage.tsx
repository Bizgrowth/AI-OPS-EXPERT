import React from 'react';
import Results from '../components/Results';
import SEOHead from '../components/SEOHead';

const ResultsPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <SEOHead 
        title="Proven AI Results & Client Success Stories"
        description="Real client results from AI implementations: 70% process automation, 35+ hours saved weekly, 90% error reduction, and 300-500% ROI within 90 days."
        keywords="AI Results, Client Success Stories, AI ROI, Process Automation Results, AI Implementation Success"
        canonicalUrl="/results"
      />
      <Results />
    </div>
  );
};

export default ResultsPage;