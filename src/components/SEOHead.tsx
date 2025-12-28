import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ 
  title, 
  description, 
  keywords = "AI Operations, Business Automation, AI Strategy, Daniel Schley",
  canonicalUrl,
  ogImage = "/image copy copy copy copy copy copy copy copy copy copy copy copy copy copy.png"
}) => {
  const fullTitle = `${title} | Daniel Schley - AI Operations Expert`;
  const baseUrl = "https://aiopsexpert.com";
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Daniel Schley - AI Operations Expert" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      
      {/* Additional SEO Tags */}
      <meta name="author" content="Daniel Schley" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Daniel Schley",
          "jobTitle": "AI Operations Expert",
          "description": "AI Operations Expert specializing in intelligent automation, operational optimization, and AI-powered business transformation.",
          "url": baseUrl,
          "image": `${baseUrl}${ogImage}`,
          "sameAs": [
            "https://www.linkedin.com/in/danielschley/",
            "https://x.com/AIOpsExpert"
          ],
          "knowsAbout": [
            "Artificial Intelligence",
            "Business Operations",
            "Process Automation",
            "AI Strategy",
            "Business Transformation"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;