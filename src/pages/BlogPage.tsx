import React from 'react';
import BlogSection from '../components/BlogSection';
import SEOHead from '../components/SEOHead';

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <SEOHead 
        title="AI Operations Blog & Insights"
        description="Real-world AI strategies, case studies, and actionable insights to transform your business operations. Learn from proven implementations and measurable results."
        keywords="AI Blog, AI Insights, AI Strategy, Business Automation, AI Case Studies, AI Implementation"
        canonicalUrl="/blog"
      />
      <BlogSection />
    </div>
  );
};

export default BlogPage;