// Private Knowledge Base for AI Chatbot
// This file contains detailed information not visible to users but accessible to the chatbot

export interface KnowledgeItem {
  category: string;
  topic: string;
  content: string;
  keywords: string[];
  confidential?: boolean;
}

export const privateKnowledge: KnowledgeItem[] = [
  {
    category: "Business Background",
    topic: "Detailed Experience",
    content: `Daniel Schley has extensive experience across multiple industries:
    
    - Align Networks: Led operations from startup to $265M revenue in 5 years
    - Executive Coach Professionals: Achieved 40% revenue increase, 12X EBITDA exit
    - One Call Care Management: Scaled from $15M to $75M in under a year
    - GO T&T: Enhanced efficiency 50%, achieved 96% YoY revenue increase
    - Lux Community Living: Managed $40M portfolio, boosted NOI by 28%
    - The Klotz Group: Developed strategies for $1B real estate portfolio
    
    Key strengths: Operational scaling, AI implementation, process optimization`,
    keywords: ["experience", "background", "companies", "results", "track record"]
  },
  {
    category: "AI Solutions",
    topic: "Implementation Process",
    content: `Standard AI Implementation Process:
    
    Phase 1: Discovery & Assessment (1-2 weeks)
    - Business process audit
    - AI readiness evaluation
    - Opportunity identification
    - ROI projections
    
    Phase 2: Strategy Development (1 week)
    - Custom AI roadmap
    - Technology selection
    - Implementation timeline
    - Success metrics definition
    
    Phase 3: Development & Integration (2-8 weeks)
    - Solution development
    - System integration
    - Testing and optimization
    - User training
    
    Phase 4: Deployment & Support (Ongoing)
    - Go-live support
    - Performance monitoring
    - Continuous optimization
    - Regular check-ins`,
    keywords: ["process", "implementation", "phases", "timeline", "methodology"]
  },
  {
    category: "Pricing",
    topic: "Detailed Pricing Structure",
    content: `AI Solution Pricing (2025):
    
    AI Strategy & Implementation: $2,500-$15,000
    - Includes: Assessment, roadmap, 90-day plan
    - Timeline: 2-4 weeks
    - ROI: 300-500% within 12 months
    
    Process Automation: $1,500-$8,000
    - Includes: Workflow analysis, automation setup
    - Timeline: 1-3 weeks
    - ROI: 200-400% within 6 months
    
    Custom AI Development: $5,000-$25,000
    - Includes: Bespoke solution, integration, training
    - Timeline: 4-12 weeks
    - ROI: 400-600% within 18 months
    
    AI Analytics & Insights: $3,000-$12,000
    - Includes: Dashboard, reporting, predictive models
    - Timeline: 2-6 weeks
    - ROI: 250-450% within 9 months
    
    AI Customer Experience: $2,000-$8,000
    - Includes: Chatbot, automation, CRM integration
    - Timeline: 1-4 weeks
    - ROI: 300-500% within 6 months
    
    AI-Enhanced Web Solutions: $1,500-$10,000
    - Includes: Website AI features, optimization
    - Timeline: 1-5 weeks
    - ROI: 200-400% within 8 months
    
    All projects include:
    - Initial consultation
    - Implementation support
    - 30-day post-launch support
    - Training materials
    - Performance monitoring`,
    keywords: ["pricing", "cost", "investment", "roi", "timeline", "includes"]
  },
  {
    category: "Client Success",
    topic: "Detailed Case Studies",
    content: `Detailed Client Results:
    
    Manufacturing Company (Inventory AI):
    - Challenge: $55K tied up in overstock, frequent stockouts
    - Solution: AI demand forecasting and inventory optimization
    - Results: $50K saved in 6 months, 95% forecast accuracy
    - Timeline: 4 weeks implementation
    - ROI: 525% in first year
    
    SaaS Company (Customer Service AI):
    - Challenge: 40+ daily interruptions, missed opportunities
    - Solution: AI chatbot with lead qualification
    - Results: 80% reduction in interruptions, 25% booking increase
    - Timeline: 2 weeks implementation
    - ROI: 400% in 8 months
    
    Marketing Agency (Content AI):
    - Challenge: 15 hours/week on content creation
    - Solution: AI content generation and scheduling
    - Results: 12 hours saved weekly, 34% revenue increase
    - Timeline: 1 week implementation
    - ROI: 350% in 6 months
    
    E-commerce Store (Personalization AI):
    - Challenge: 2% email open rates, low conversions
    - Solution: AI-powered personalization engine
    - Results: 15% cart recovery, 30% repeat purchase increase
    - Timeline: 3 weeks implementation
    - ROI: 450% in 10 months`,
    keywords: ["case studies", "results", "clients", "success stories", "examples"]
  },
  {
    category: "Technical Expertise",
    topic: "AI Technologies",
    content: `Technical Capabilities:
    
    AI/ML Technologies:
    - Natural Language Processing (NLP)
    - Machine Learning algorithms
    - Predictive analytics
    - Computer vision
    - Deep learning models
    - Reinforcement learning
    
    Integration Platforms:
    - CRM systems (Salesforce, HubSpot, Pipedrive)
    - E-commerce (Shopify, WooCommerce, Magento)
    - Marketing automation (Mailchimp, ActiveCampaign)
    - Business intelligence (Tableau, Power BI)
    - Communication (Slack, Microsoft Teams)
    - Project management (Asana, Monday.com)
    
    Development Stack:
    - Python, JavaScript, React
    - APIs and webhooks
    - Cloud platforms (AWS, Azure, GCP)
    - Database management
    - Security and compliance
    - Mobile-responsive design`,
    keywords: ["technical", "technologies", "integration", "platforms", "development"]
  },
  {
    category: "Consultation Process",
    topic: "What to Expect",
    content: `Free AI Strategy Session Details:
    
    Pre-Session Preparation:
    - Business assessment questionnaire
    - Current process documentation
    - Goal and challenge identification
    - Technology audit
    
    During the 60-Minute Session:
    - Business process review (15 minutes)
    - AI opportunity identification (20 minutes)
    - Solution recommendations (15 minutes)
    - Implementation roadmap (10 minutes)
    
    Post-Session Deliverables:
    - Custom AI strategy document
    - ROI projections and timeline
    - Technology recommendations
    - Next steps action plan
    - No-obligation proposal
    
    Follow-up Process:
    - 24-hour summary email
    - Detailed proposal within 48 hours
    - Implementation timeline
    - Pricing and payment options
    - Support and maintenance plans`,
    keywords: ["consultation", "session", "expect", "process", "deliverables"]
  }
];

// Function to search knowledge base
export const searchKnowledge = (query: string): KnowledgeItem[] => {
  const searchTerms = query.toLowerCase().split(' ');
  
  return privateKnowledge.filter(item => {
    const searchableText = `${item.topic} ${item.content} ${item.keywords.join(' ')}`.toLowerCase();
    return searchTerms.some(term => searchableText.includes(term));
  });
};

// Function to get knowledge by category
export const getKnowledgeByCategory = (category: string): KnowledgeItem[] => {
  return privateKnowledge.filter(item => 
    item.category.toLowerCase() === category.toLowerCase()
  );
};