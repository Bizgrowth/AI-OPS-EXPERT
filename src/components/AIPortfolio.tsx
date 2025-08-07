// src/components/AIPortfolio.tsx - Professional SaaS Style
import React, { useState } from 'react';
import { 
  MessageSquare, 
  Mail, 
  TrendingUp, 
  PenTool, 
  Target,
  Package,
  Play,
  ExternalLink,
  CheckCircle,
  Download,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SchedulingModal from './SchedulingModal';

interface AISolution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  demoUrl: string;
  category: string;
  results: {
    [key: string]: string;
  };
  clientImpact: string;
  technologies: string[];
  features: string[];
  pricing: {
    monthly: string;
    setup: string;
    roi: string;
  };
  implementation: string;
  caseStudy: {
    company: string;
    problem: string;
    solution: string;
    result: string;
  };
}

const AIPortfolio: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<AISolution | null>(null);
  const [portfolioRef, isPortfolioVisible] = useScrollAnimation(0.1);
  const [statsRef, isStatsVisible] = useScrollAnimation(0.2);
  const [gridRef, isGridVisible] = useScrollAnimation(0.3);
  const [showScheduling, setShowScheduling] = useState(false);

  const aiSolutions: AISolution[] = [
    {
      id: 'conversabot',
      title: 'ConversaBot - AI Customer Service',
      subtitle: 'Intelligent 24/7 Customer Support Agent',
      description: 'AI-powered customer service that handles routine inquiries, captures leads, and reduces owner interruptions by 80% while maintaining personal touch.',
      icon: MessageSquare,
      gradient: 'from-blue-500 to-blue-700',
      demoUrl: 'https://chic-cheesecake-4515b2.netlify.app',
      category: 'AI Customer Experience Systems',
      results: {
        interruptions: '80% Reduced',
        bookings: '25% Increase',
        availability: '24/7 Service',
        response: '<5 Seconds'
      },
      clientImpact: 'The Corner Grind Coffee Shop increased catering bookings by 25% and reduced daily interruptions by 80%',
      technologies: ['Natural Language Processing', 'CRM Integration', 'Lead Capture', 'Multi-Channel'],
      features: [
        '24/7 customer support automation',
        'Lead capture and qualification', 
        'Appointment scheduling integration',
        'Multi-platform deployment',
        'Human handoff capabilities',
        'Business knowledge integration'
      ],
      pricing: {
        monthly: '$97/month',
        setup: '$497',
        roi: '30 days'
      },
      implementation: '2-3 days',
      caseStudy: {
        company: 'The Corner Grind Coffee Shop',
        problem: 'Owner interrupted 40+ times daily with routine questions, missing catering opportunities.',
        solution: 'AI handles 90% of routine inquiries, auto-schedules follow-ups.',
        result: '25% increase in catering bookings, 80% reduction in interruptions.'
      }
    },
    {
      id: 'personagen',
      title: 'PersonaGen - Smart Marketing',
      subtitle: 'Personalized Customer Journey Automation',
      description: 'AI-driven marketing personalization that tracks customer behavior and delivers targeted content, increasing cart recovery and repeat purchases.',
      icon: Mail,
      gradient: 'from-orange-500 to-orange-700',
      demoUrl: 'https://effortless-lollipop-4fd86e.netlify.app',
      category: 'AI-Powered Workflow Optimization',
      results: {
        cartRecovery: '15% Recovery',
        repeatCustomers: '30% Increase',
        emailRevenue: '3x Revenue',
        openRates: '45% Higher'
      },
      clientImpact: 'Artisan Threads Boutique achieved 15% cart recovery rate and 30% increase in repeat purchases',
      technologies: ['Behavioral Analytics', 'Email Automation', 'Personalization Engine', 'A/B Testing'],
      features: [
        'Behavioral customer tracking',
        'Personalized email campaigns',
        'Cart abandonment recovery',
        'Customer segmentation',
        'Dynamic content generation',
        'Performance analytics'
      ],
      pricing: {
        monthly: '$147/month',
        setup: '$697',
        roi: '45 days'
      },
      implementation: '3-5 days',
      caseStudy: {
        company: 'Artisan Threads Boutique',
        problem: 'Generic newsletters with 2% open rates and minimal conversions.',
        solution: 'AI tracks behavior and personalizes content for each customer.',
        result: '15% cart recovery rate, 30% increase in repeat purchases.'
      }
    },
    {
      id: 'finsight',
      title: 'FinSight - Cash Flow Predictor',
      subtitle: 'AI-Powered Financial Forecasting',
      description: 'Intelligent financial analysis that predicts cash flow patterns, prevents crises, and automates bookkeeping with 90-day forecasting accuracy.',
      icon: TrendingUp,
      gradient: 'from-green-500 to-green-700',
      demoUrl: 'https://lucent-salamander-76034a.netlify.app',
      category: 'AI Analytics & Insights',
      results: {
        timeSaved: '87% Saved',
        forecastRange: '90 Days',
        crisisAvoidance: '$15K Saved',
        accuracy: '92% Accurate'
      },
      clientImpact: 'ByteCrafters Development Agency avoided $15K cash crunch and reduced bookkeeping to 1 hour/month',
      technologies: ['Predictive Analytics', 'Financial Modeling', 'OCR Processing', 'QuickBooks API'],
      features: [
        'Automated expense categorization',
        '90-day cash flow forecasting',
        'Crisis early warning system',
        'Financial trend analysis',
        'QuickBooks integration',
        'Custom reporting dashboards'
      ],
      pricing: {
        monthly: '$197/month',
        setup: '$897',
        roi: '60 days'
      },
      implementation: '5-7 days',
      caseStudy: {
        company: 'ByteCrafters Development Agency',
        problem: '8 hours monthly on bookkeeping, uncertain cash flow planning.',
        solution: 'Automated categorization with 90-day cash flow forecasting.',
        result: 'Avoided $15K cash crunch, reduced bookkeeping to 1 hour/month.'
      }
    },
    {
      id: 'creatorspark',
      title: 'CreatorSpark - AI Content Engine',
      subtitle: 'Automated Content Generation & Publishing',
      description: 'AI content creation system that generates blog posts, social media content, and marketing copy in minutes, increasing traffic and engagement.',
      icon: PenTool,
      gradient: 'from-purple-500 to-purple-700',
      demoUrl: 'https://delicate-frangollo-0feb83.netlify.app/',
      category: 'AI-Enhanced Web Solutions',
      results: {
        trafficIncrease: '200% Traffic',
        timePerPost: '15 Minutes',
        postingFrequency: '3x Frequency',
        engagement: '150% Higher'
      },
      clientImpact: 'FitForward Personal Training achieved 200% website traffic increase and gained 5 new clients from content marketing',
      technologies: ['GPT Integration', 'Content Optimization', 'SEO Analysis', 'Social Media APIs'],
      features: [
        'Multi-format content generation',
        'SEO-optimized blog posts',
        'Social media scheduling',
        'Brand voice consistency',
        'Content performance tracking',
        'Automated publishing'
      ],
      pricing: {
        monthly: '$77/month',
        setup: '$297',
        roi: '30 days'
      },
      implementation: '1-2 days',
      caseStudy: {
        company: 'FitForward Personal Training',
        problem: 'Struggled to create consistent, engaging content for blog and social media.',
        solution: 'AI generates drafts for blog posts and social captions in minutes.',
        result: '200% website traffic increase, 5 new clients from content marketing.'
      }
    },
    {
      id: 'adoptimo',
      title: 'AdOptimo - Smart Ad Manager',
      subtitle: 'AI-Powered Advertising Optimization',
      description: 'Intelligent ad campaign management that automatically optimizes budgets, tests variations, and maximizes ROAS across all platforms.',
      icon: Target,
      gradient: 'from-red-500 to-red-700',
      demoUrl: 'https://dreamy-swan-db3e7b.netlify.app/',
      category: 'AI Analytics & Insights',
      results: {
        roas: '4.0x ROAS',
        costReduction: '60% Savings',
        optimization: '24/7 Active',
        conversion: '180% Better'
      },
      clientImpact: 'Glow Pet LED Collars increased ROAS from 1.5x to 4.0x within two months using AI optimization',
      technologies: ['Machine Learning', 'Facebook API', 'Google Ads API', 'Performance Analytics'],
      features: [
        'Automated budget allocation',
        'Real-time bid optimization',
        'A/B test management',
        'Cross-platform campaigns',
        'Performance forecasting',
        'ROI tracking and reporting'
      ],
      pricing: {
        monthly: '$247/month',
        setup: '$997',
        roi: '30 days'
      },
      implementation: '3-5 days',
      caseStudy: {
        company: 'Glow Pet LED Collars',
        problem: 'Low ROAS of 1.5x on Facebook and Google ads, manual optimization struggles.',
        solution: 'AI automatically shifts budget to high-performing campaigns and tests ad variations.',
        result: 'ROAS increased from 1.5x to 4.0x within two months.'
      }
    },
    {
      id: 'stockwise',
      title: 'StockWise - Inventory Predictor',
      subtitle: 'AI-Driven Inventory Management',
      description: 'Smart inventory system that predicts demand patterns, prevents stockouts, and reduces overstock using historical data and trend analysis.',
      icon: Package,
      gradient: 'from-cyan-500 to-cyan-700',
      demoUrl: 'https://chic-cheesecake-4515b2.netlify.app',
      category: 'Intelligent Process Automation',
      results: {
        overstockReduction: '40% Reduction',
        stockoutPrevention: '95% Prevention',
        monthlySavings: '$8K Saved',
        accuracy: '88% Accurate'
      },
      clientImpact: 'The Page Turner Bookstore achieved 40% reduction in overstock and 95% fewer stockouts on top sellers',
      technologies: ['Demand Forecasting', 'Inventory APIs', 'Seasonal Analysis', 'Trend Prediction'],
      features: [
        'Demand pattern recognition',
        'Seasonal trend analysis',
        'Automated reorder points',
        'Supplier integration',
        'Stock level optimization',
        'Performance dashboards'
      ],
      pricing: {
        monthly: '$127/month',
        setup: '$597',
        roi: '45 days'
      },
      implementation: '3-4 days',
      caseStudy: {
        company: 'The Page Turner Bookstore',
        problem: 'Constant overstocking of slow movers and understocking of popular titles.',
        solution: 'AI analyzes 3 years of sales data to predict seasonal patterns and trends.',
        result: '40% reduction in overstock, 95% fewer stockouts on top sellers.'
      }
    }
  ];

  const openDemo = (demoUrl: string): void => {
    window.open(demoUrl, '_blank');
  };

  const downloadCaseStudy = (solution: AISolution): void => {
    // Generate case study download
    const caseStudyContent = `
# ${solution.title} - Case Study

## Executive Summary
${solution.description}

## Client Success Story: ${solution.caseStudy.company}

**Challenge:** ${solution.caseStudy.problem}

**Solution:** ${solution.caseStudy.solution}

**Results:** ${solution.caseStudy.result}

## Key Metrics
${Object.entries(solution.results).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

## Implementation Details
- **Timeline:** ${solution.implementation}
- **Investment:** ${solution.pricing.monthly} + ${solution.pricing.setup} setup
- **ROI Timeline:** ${solution.pricing.roi}

## Technologies Used
${solution.technologies.map(tech => `- ${tech}`).join('\n')}

## Features Included
${solution.features.map(feature => `- ${feature}`).join('\n')}

---
Contact Daniel Schley for implementation: dschley@aiopsexpert.com
    `;

    const blob = new Blob([caseStudyContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${solution.title.replace(/\s+/g, '_')}_Case_Study.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section 
      id="ai-portfolio"
      ref={portfolioRef}
      className="py-20 bg-slate-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 px-4">
            Professional AI Solutions Portfolio
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto mb-8 px-4">
            Explore my custom-built AI applications designed for small businesses. Each solution demonstrates 
            real-world implementation with interactive demos, proven ROI, and detailed case studies.
          </p>
          
          {/* Portfolio Stats */}
          <div 
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto px-4">
            <div className="text-center bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-700">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">6</div>
              <div className="text-sm text-gray-400">AI Solutions</div>
            </div>
            <div className="text-center bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-700">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">$50K+</div>
              <div className="text-sm text-gray-400">Client Savings</div>
            </div>
            <div className="text-center bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-700">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">30-60</div>
              <div className="text-sm text-gray-400">Days ROI</div>
            </div>
            <div className="text-center bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-700">
              <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-1">1-7</div>
              <div className="text-sm text-gray-400">Days Setup</div>
            </div>
          </div>
        </div>

        {/* AI Solutions Grid */}
        <div 
          ref={gridRef}
          className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-16 px-4">
          {aiSolutions.map((solution) => {
            const IconComponent = solution.icon;
            return (
              <div
                key={solution.id}
                className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-600 hover:border-cyan-500/50 transform hover:-translate-y-1"
              >
                {/* Solution Header */}
                <div className={`bg-gradient-to-r ${solution.gradient} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                  <div className="relative z-10 p-3 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg flex-shrink-0">
                          <IconComponent className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">{solution.title}</h3>
                          <p className="text-white text-opacity-90 text-sm sm:text-base font-medium mt-1">{solution.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 flex-shrink-0 ml-2">
                        <button
                          onClick={() => openDemo(solution.demoUrl)}
                          className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 sm:p-3 rounded-xl transition-all backdrop-blur-sm shadow-lg border border-white border-opacity-20 hover:scale-110"
                          title="Try Live Demo"
                        >
                          <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-white text-opacity-90 text-sm sm:text-base leading-relaxed mb-4">
                      {solution.description}
                    </p>
                    
                    <div className="bg-white bg-opacity-15 rounded-xl p-3 sm:p-4 backdrop-blur-sm border border-white border-opacity-20">
                      <p className="text-xs sm:text-sm text-white font-semibold mb-2">Client Success:</p>
                      <p className="text-sm sm:text-base text-white font-medium">{solution.clientImpact}</p>
                    </div>
                  </div>
                </div>

                {/* Solution Content */}
                <div className="p-4 sm:p-6 bg-slate-800/50 backdrop-blur-sm">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="bg-slate-700/80 text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-slate-600">
                      {solution.category}
                    </span>
                  </div>

                  {/* Key Results */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                    {Object.entries(solution.results).map(([key, value]) => (
                      <div key={key} className="text-center p-2 sm:p-3 bg-slate-700/60 rounded-lg border border-slate-600/50">
                        <div className="text-base sm:text-lg font-bold text-white">{value}</div>
                        <div className="text-xs sm:text-xs text-gray-300 capitalize mt-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Info */}
                  <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-xl p-3 sm:p-4 mb-4 border border-orange-500/30">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-orange-400 mb-1">{solution.pricing.monthly}</div>
                      <div className="text-xs sm:text-sm text-gray-300">Setup: {solution.pricing.setup} | ROI in {solution.pricing.roi}</div>
                      <div className="inline-block bg-green-500/20 text-green-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-2 border border-green-500/30">
                        ⚡ {solution.implementation} implementation
                      </div>
                    </div>
                  </div>

                  {/* Case Study Preview */}
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-3 sm:p-4 mb-6 border border-blue-500/30">
                    <h4 className="font-semibold text-blue-400 mb-2 text-sm sm:text-base">Case Study: {solution.caseStudy.company}</h4>
                    <p className="text-xs sm:text-sm text-gray-300 mb-2">
                      <strong>Problem:</strong> {solution.caseStudy.problem}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-300">
                      <strong>Result:</strong> {solution.caseStudy.result}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => openDemo(solution.demoUrl)}
                      className={`w-full bg-gradient-to-r ${solution.gradient} text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2 font-medium text-xs sm:text-sm hover:scale-105`}
                    >
                      <Play className="w-4 h-4" />
                      <span>Try Interactive Demo</span>
                    </button>
                    <button
                      onClick={() => downloadCaseStudy(solution)}
                      className="w-full border-2 border-slate-600 text-gray-300 py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-slate-700 hover:border-slate-500 transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm hover:scale-105"
                    >
                      <Download className="w-4 h-4" />
                      <span>Case Study</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-sm rounded-2xl p-4 sm:p-8 text-center border border-slate-600 mx-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Ready to Transform Your Business with AI?</h3>
          <p className="text-gray-300 mb-6 text-base sm:text-lg">
            Each solution is custom-implemented for your specific business needs with ongoing support and optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowScheduling(true)}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:from-cyan-600 hover:to-purple-700 transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
              Schedule Free AI Consultation
            </button>
            <button className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all hover:scale-105 w-full sm:w-auto">
              Download Complete Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Demo Modal */}
      {selectedDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-2 sm:p-4 z-50 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-slate-600">
            <div className={`bg-gradient-to-r ${selectedDemo.gradient} p-6 text-white relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative z-10 p-3 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg flex-shrink-0">
                      <selectedDemo.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl sm:text-3xl font-bold text-white leading-tight">{selectedDemo.title}</h3>
                      <p className="text-white text-opacity-90 text-sm sm:text-lg font-medium mt-1">{selectedDemo.subtitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDemo(null)}
                    className="text-white hover:bg-white hover:bg-opacity-20 p-2 sm:p-3 rounded-xl transition-all backdrop-blur-sm shadow-lg border border-white border-opacity-20 flex-shrink-0 ml-2"
                  >
                    <span className="text-xl sm:text-2xl font-bold">✕</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-8 bg-slate-800">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">Complete Feature Set:</h4>
                  <div className="space-y-2 mb-6">
                    {selectedDemo.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300 text-xs sm:text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">Investment & ROI:</h4>
                  <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3 sm:p-4 mb-6">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-orange-400">{selectedDemo.pricing.monthly}</div>
                      <div className="text-xs sm:text-sm text-gray-300 mt-1">Setup: {selectedDemo.pricing.setup}</div>
                      <div className="text-xs sm:text-sm text-green-400 font-medium mt-2">ROI in {selectedDemo.pricing.roi}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedDemo.technologies.map((tech, index) => (
                      <span key={index} className="bg-blue-500/20 text-blue-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border border-blue-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">Measurable Results:</h4>
                  <div className="space-y-3 mb-6">
                    {Object.entries(selectedDemo.results).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-2 sm:p-3 bg-slate-700/60 rounded-lg border border-slate-600/50">
                        <span className="text-gray-300 capitalize text-xs sm:text-sm">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-semibold text-white text-xs sm:text-sm">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3 pt-6 border-t border-slate-600">
                <button
                  onClick={() => openDemo(selectedDemo.demoUrl)}
                  className={`w-full bg-gradient-to-r ${selectedDemo.gradient} text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:shadow-lg transition-all text-sm sm:text-base`}
                >
                  Try Interactive Demo
                </button>
                <button 
                  onClick={() => downloadCaseStudy(selectedDemo)}
                  className="w-full border-2 border-slate-600 text-gray-300 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-slate-700 hover:border-slate-500 transition-all text-sm sm:text-base"
                >
                  Download Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <SchedulingModal 
        isOpen={showScheduling} 
        onClose={() => setShowScheduling(false)} 
      />
    </section>
  );
};

export default AIPortfolio;