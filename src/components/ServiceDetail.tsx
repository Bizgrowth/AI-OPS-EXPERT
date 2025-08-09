import React from 'react';
import { ArrowLeft, CheckCircle, Download, Calendar, Clock, DollarSign, Target, Users, Zap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SchedulingModal from './SchedulingModal';
import { useState } from 'react';

interface ServiceDetailProps {
  serviceId: string;
  onBack: () => void;
}

interface ServiceData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  features: string[];
  benefits: string[];
  process: string[];
  pricing: {
    range: string;
    timeline: string;
    roi: string;
  };
  caseStudy: {
    client: string;
    challenge: string;
    solution: string;
    results: string[];
  };
  deliverables: string[];
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId, onBack }) => {
  const [detailRef, isDetailVisible] = useScrollAnimation(0.1);
  const [showScheduling, setShowScheduling] = useState(false);

  const serviceData: Record<string, ServiceData> = {
    'ai-strategy': {
      id: 'ai-strategy',
      title: 'AI Strategy & Implementation',
      subtitle: 'Comprehensive AI roadmaps and strategic implementation plans',
      description: 'Transform your business with a custom AI strategy designed specifically for your industry and operational needs. Get a complete roadmap from assessment to implementation with measurable ROI targets.',
      icon: ({ className }) => <Target className={className} />,
      color: 'from-blue-500 to-cyan-600',
      features: [
        'Comprehensive AI readiness assessment',
        'Custom AI implementation roadmap',
        'Technology stack recommendations',
        'ROI projections and success metrics',
        '90-day quick-win identification',
        'Risk assessment and mitigation strategies',
        'Change management planning',
        'Ongoing optimization framework'
      ],
      benefits: [
        'Clear path to AI transformation',
        '300-500% ROI within 12 months',
        'Reduced implementation risks',
        'Faster time to market',
        'Competitive advantage through AI',
        'Scalable growth foundation'
      ],
      process: [
        'Business Process Audit & AI Readiness Assessment',
        'Opportunity Identification & Prioritization',
        'Custom AI Strategy Development',
        'Technology Selection & Architecture Design',
        'Implementation Roadmap Creation',
        'Success Metrics & KPI Definition',
        'Change Management Planning',
        'Ongoing Support & Optimization Strategy'
      ],
      pricing: {
        range: '$2,500 - $15,000',
        timeline: '2-4 weeks',
        roi: '300-500% within 12 months'
      },
      caseStudy: {
        client: 'TechFlow Manufacturing',
        challenge: 'Manual processes causing 40% operational inefficiency and inability to scale operations.',
        solution: 'Developed comprehensive AI strategy focusing on process automation and predictive analytics.',
        results: [
          '60% reduction in manual processing time',
          '$200K annual cost savings identified',
          '90% improvement in demand forecasting accuracy',
          'Successful implementation of 5 AI solutions in 6 months'
        ]
      },
      deliverables: [
        'AI Readiness Assessment Report',
        'Custom AI Implementation Roadmap',
        'Technology Recommendations Document',
        'ROI Projections & Business Case',
        'Risk Assessment & Mitigation Plan',
        'Change Management Strategy',
        '90-Day Quick Wins Action Plan',
        'Ongoing Support Framework'
      ]
    },
    'operational-workflow': {
      id: 'operational-workflow',
      title: 'AI-Powered Workflow Optimization',
      subtitle: 'Intelligent automation solutions that eliminate bottlenecks',
      description: 'Streamline your operations with AI-powered workflow optimization that identifies bottlenecks, automates repetitive tasks, and maximizes efficiency across all business processes.',
      icon: ({ className }) => <Zap className={className} />,
      color: 'from-purple-500 to-violet-600',
      features: [
        'Workflow analysis and mapping',
        'Bottleneck identification and resolution',
        'Intelligent task automation',
        'Process optimization algorithms',
        'Real-time performance monitoring',
        'Automated reporting and alerts',
        'Integration with existing systems',
        'Continuous improvement loops'
      ],
      benefits: [
        '40% improvement in operational efficiency',
        '25+ hours saved per week',
        '90% reduction in manual errors',
        'Faster decision-making processes',
        'Improved team productivity',
        'Better resource allocation'
      ],
      process: [
        'Current Workflow Analysis & Documentation',
        'Bottleneck & Inefficiency Identification',
        'AI Solution Design & Architecture',
        'Automation Implementation & Testing',
        'System Integration & Deployment',
        'Team Training & Change Management',
        'Performance Monitoring Setup',
        'Continuous Optimization & Support'
      ],
      pricing: {
        range: '$3,000 - $12,000',
        timeline: '3-6 weeks',
        roi: '250-400% within 9 months'
      },
      caseStudy: {
        client: 'ScaleUp Marketing Agency',
        challenge: 'Complex client onboarding process taking 15+ hours per client with frequent errors.',
        solution: 'Implemented AI-powered workflow automation for client onboarding and project management.',
        results: [
          '80% reduction in onboarding time (15 hours to 3 hours)',
          '95% elimination of onboarding errors',
          '$50K annual savings in operational costs',
          '300% increase in client satisfaction scores'
        ]
      },
      deliverables: [
        'Current State Workflow Analysis',
        'Optimized Workflow Design',
        'AI Automation Implementation',
        'System Integration Setup',
        'Performance Monitoring Dashboard',
        'Team Training Materials',
        'Standard Operating Procedures',
        'Ongoing Optimization Plan'
      ]
    },
    'intelligent-automation': {
      id: 'intelligent-automation',
      title: 'Intelligent Process Automation',
      subtitle: 'AI-driven automation systems for complex decision-making',
      description: 'Deploy intelligent automation that goes beyond simple task automation to handle complex decision-making, pattern recognition, and adaptive workflows that learn and improve over time.',
      icon: ({ className }) => <Users className={className} />,
      color: 'from-yellow-500 to-orange-600',
      features: [
        'Complex decision automation',
        'Pattern recognition and learning',
        'Adaptive workflow management',
        'Intelligent document processing',
        'Predictive task scheduling',
        'Exception handling automation',
        'Multi-system orchestration',
        'Self-improving algorithms'
      ],
      benefits: [
        '80% automation of complex tasks',
        '200-400% ROI within 6 months',
        '90% reduction in processing errors',
        '24/7 automated operations',
        'Improved compliance and accuracy',
        'Scalable business processes'
      ],
      process: [
        'Process Complexity Assessment',
        'Decision Logic Mapping',
        'AI Model Development & Training',
        'Automation Framework Implementation',
        'Integration & Testing Phase',
        'Deployment & Monitoring Setup',
        'Performance Optimization',
        'Continuous Learning Implementation'
      ],
      pricing: {
        range: '$1,500 - $8,000',
        timeline: '1-3 weeks',
        roi: '200-400% within 6 months'
      },
      caseStudy: {
        client: 'FinanceFlow Solutions',
        challenge: 'Manual invoice processing taking 40+ hours weekly with 15% error rate.',
        solution: 'Deployed intelligent automation for invoice processing, approval workflows, and payment scheduling.',
        results: [
          '95% automation of invoice processing',
          '38 hours saved weekly (95% time reduction)',
          '99.5% accuracy rate (from 85%)',
          '$75K annual cost savings'
        ]
      },
      deliverables: [
        'Process Automation Assessment',
        'Custom AI Automation Solution',
        'Decision Logic Implementation',
        'System Integration & APIs',
        'Monitoring & Analytics Dashboard',
        'Error Handling & Recovery Systems',
        'User Training & Documentation',
        'Maintenance & Support Plan'
      ]
    },
    'ai-analytics': {
      id: 'ai-analytics',
      title: 'AI Analytics & Insights',
      subtitle: 'Advanced AI analytics platforms for actionable intelligence',
      description: 'Transform your data into actionable insights with AI-powered analytics that provide predictive intelligence, trend analysis, and automated reporting for data-driven decision making.',
      icon: ({ className }) => <Target className={className} />,
      color: 'from-green-500 to-emerald-600',
      features: [
        'Predictive analytics and forecasting',
        'Real-time data processing',
        'Automated insight generation',
        'Custom dashboard creation',
        'Trend analysis and pattern detection',
        'Anomaly detection and alerts',
        'Multi-source data integration',
        'Natural language reporting'
      ],
      benefits: [
        '85% improvement in forecast accuracy',
        '60% faster decision-making',
        '250-450% ROI within 9 months',
        'Proactive issue identification',
        'Data-driven strategic planning',
        'Competitive market insights'
      ],
      process: [
        'Data Audit & Source Identification',
        'Analytics Requirements Gathering',
        'AI Model Development & Training',
        'Dashboard & Visualization Design',
        'Data Pipeline Implementation',
        'Testing & Validation Phase',
        'Deployment & User Training',
        'Ongoing Model Optimization'
      ],
      pricing: {
        range: '$3,000 - $12,000',
        timeline: '2-6 weeks',
        roi: '250-450% within 9 months'
      },
      caseStudy: {
        client: 'RetailMax Chain',
        challenge: 'Inventory decisions based on gut feeling, leading to $100K in overstock and stockouts.',
        solution: 'Implemented AI analytics for demand forecasting, inventory optimization, and sales prediction.',
        results: [
          '92% accuracy in demand forecasting',
          '$120K reduction in inventory costs',
          '40% improvement in stock turnover',
          '25% increase in profit margins'
        ]
      },
      deliverables: [
        'Data Analytics Strategy',
        'Custom AI Analytics Platform',
        'Predictive Models & Algorithms',
        'Interactive Dashboards',
        'Automated Reporting System',
        'Data Integration Pipelines',
        'User Training & Documentation',
        'Performance Monitoring Setup'
      ]
    },
    'ai-customer-systems': {
      id: 'ai-customer-systems',
      title: 'AI Customer Experience Systems',
      subtitle: 'Intelligent customer service and engagement solutions',
      description: 'Enhance customer experience with AI-powered systems that provide 24/7 support, personalized interactions, and intelligent routing while maintaining the human touch your customers expect.',
      icon: ({ className }) => <Users className={className} />,
      color: 'from-pink-500 to-rose-600',
      features: [
        '24/7 AI customer support',
        'Intelligent conversation routing',
        'Personalized customer interactions',
        'Multi-channel support integration',
        'Sentiment analysis and response',
        'Automated ticket classification',
        'Customer journey optimization',
        'Seamless human handoff'
      ],
      benefits: [
        '80% reduction in response time',
        '92% customer satisfaction rate',
        '300-500% ROI within 6 months',
        '24/7 availability',
        'Consistent service quality',
        'Reduced support costs'
      ],
      process: [
        'Customer Journey Analysis',
        'Support Process Mapping',
        'AI Chatbot Development',
        'Integration with Existing Systems',
        'Training Data Preparation',
        'Testing & Quality Assurance',
        'Deployment & Monitoring',
        'Continuous Improvement'
      ],
      pricing: {
        range: '$2,000 - $8,000',
        timeline: '1-4 weeks',
        roi: '300-500% within 6 months'
      },
      caseStudy: {
        client: 'ServicePro Solutions',
        challenge: 'Customer support team overwhelmed with 200+ daily inquiries, 4-hour average response time.',
        solution: 'Deployed AI customer service system with intelligent routing and automated responses.',
        results: [
          '75% of inquiries handled automatically',
          '15-minute average response time',
          '40% reduction in support costs',
          '95% customer satisfaction score'
        ]
      },
      deliverables: [
        'Customer Experience Strategy',
        'AI Chatbot Implementation',
        'Multi-channel Integration',
        'Knowledge Base Development',
        'Analytics & Reporting Dashboard',
        'Staff Training Program',
        'Quality Assurance Framework',
        'Ongoing Support & Updates'
      ]
    },
    'ai-web-solutions': {
      id: 'ai-web-solutions',
      title: 'AI-Enhanced Web Solutions',
      subtitle: 'Intelligent websites with built-in AI capabilities',
      description: 'Create intelligent web experiences with AI-powered personalization, dynamic content generation, and smart user interactions that adapt to visitor behavior and preferences.',
      icon: ({ className }) => <Zap className={className} />,
      color: 'from-indigo-500 to-blue-600',
      features: [
        'AI-powered personalization',
        'Dynamic content generation',
        'Intelligent user behavior tracking',
        'Automated A/B testing',
        'Smart recommendation engines',
        'Conversational AI interfaces',
        'Predictive user experience',
        'Real-time optimization'
      ],
      benefits: [
        '120% increase in conversion rates',
        '70% improvement in user engagement',
        '200-400% ROI within 8 months',
        'Personalized user experiences',
        'Automated content optimization',
        'Improved SEO performance'
      ],
      process: [
        'Website Analysis & Requirements',
        'AI Feature Planning & Design',
        'Development & Integration',
        'AI Model Training & Testing',
        'User Experience Optimization',
        'Performance Testing & QA',
        'Deployment & Launch',
        'Monitoring & Continuous Improvement'
      ],
      pricing: {
        range: '$1,500 - $10,000',
        timeline: '1-5 weeks',
        roi: '200-400% within 8 months'
      },
      caseStudy: {
        client: 'EcommerceMax Store',
        challenge: 'Generic website with 2% conversion rate and high bounce rate.',
        solution: 'Implemented AI-powered personalization, smart recommendations, and dynamic content.',
        results: [
          '350% increase in conversion rate (2% to 7%)',
          '60% reduction in bounce rate',
          '$300K additional annual revenue',
          '45% increase in average order value'
        ]
      },
      deliverables: [
        'AI-Enhanced Website',
        'Personalization Engine',
        'Smart Recommendation System',
        'Analytics & Tracking Setup',
        'Content Management System',
        'Performance Optimization',
        'SEO Enhancement',
        'Maintenance & Support Plan'
      ]
    },
    'custom-ai-development': {
      id: 'custom-ai-development',
      title: 'Custom AI Solution Development',
      subtitle: 'Bespoke AI applications designed for your specific needs',
      description: 'Get custom-built AI solutions tailored to your unique business challenges. From concept to deployment, we create bespoke AI applications that solve your specific operational problems.',
      icon: ({ className }) => <Target className={className} />,
      color: 'from-cyan-500 to-teal-600',
      features: [
        'Custom AI model development',
        'Bespoke application architecture',
        'Industry-specific solutions',
        'Advanced machine learning algorithms',
        'Custom data processing pipelines',
        'Scalable cloud infrastructure',
        'API development and integration',
        'Ongoing model optimization'
      ],
      benefits: [
        '90% better performance than generic solutions',
        '400-600% ROI within 18 months',
        'Competitive advantage through unique AI',
        'Perfect fit for business needs',
        'Scalable and future-proof',
        'Full ownership and control'
      ],
      process: [
        'Requirements Analysis & Feasibility Study',
        'Custom Solution Architecture Design',
        'AI Model Development & Training',
        'Application Development & Testing',
        'Integration & Deployment',
        'User Training & Documentation',
        'Performance Monitoring Setup',
        'Ongoing Support & Optimization'
      ],
      pricing: {
        range: '$5,000 - $25,000',
        timeline: '4-12 weeks',
        roi: '400-600% within 18 months'
      },
      caseStudy: {
        client: 'MedTech Innovations',
        challenge: 'Needed custom AI for medical image analysis with 99%+ accuracy requirements.',
        solution: 'Developed custom deep learning model for medical image classification and diagnosis assistance.',
        results: [
          '99.7% accuracy in image analysis',
          '80% reduction in diagnosis time',
          '$500K annual cost savings',
          'FDA compliance achieved'
        ]
      },
      deliverables: [
        'Custom AI Solution',
        'Proprietary Algorithms & Models',
        'Complete Application Suite',
        'API Documentation & SDKs',
        'Deployment & Infrastructure Setup',
        'Comprehensive Training Program',
        'Technical Documentation',
        'Long-term Support Agreement'
      ]
    },
    'ai-performance-optimization': {
      id: 'ai-performance-optimization',
      title: 'AI Performance Optimization',
      subtitle: 'Continuous optimization for maximum ROI and impact',
      description: 'Maximize the performance and ROI of your existing AI systems through continuous optimization, monitoring, and enhancement to ensure sustained operational impact.',
      icon: ({ className }) => <Target className={className} />,
      color: 'from-red-500 to-pink-600',
      features: [
        'Performance monitoring and analysis',
        'Model accuracy optimization',
        'System efficiency improvements',
        'Cost optimization strategies',
        'Automated performance tuning',
        'Predictive maintenance',
        'Scalability enhancements',
        'ROI maximization'
      ],
      benefits: [
        '40% improvement in AI accuracy',
        '60% reduction in operational costs',
        'Sustained high performance',
        'Maximized ROI',
        'Future-proof AI systems',
        'Continuous competitive advantage'
      ],
      process: [
        'Current System Performance Audit',
        'Optimization Opportunity Identification',
        'Performance Enhancement Implementation',
        'Model Retraining & Fine-tuning',
        'System Architecture Optimization',
        'Monitoring & Analytics Setup',
        'Continuous Improvement Framework',
        'Ongoing Performance Management'
      ],
      pricing: {
        range: '$2,000 - $10,000',
        timeline: '2-6 weeks',
        roi: '300-500% improvement in existing ROI'
      },
      caseStudy: {
        client: 'DataDriven Corp',
        challenge: 'Existing AI system performance degrading over time, accuracy dropped from 95% to 78%.',
        solution: 'Comprehensive AI performance optimization including model retraining and system enhancement.',
        results: [
          '97% accuracy achieved (19% improvement)',
          '50% faster processing speed',
          '$80K annual cost savings',
          '99.9% system uptime'
        ]
      },
      deliverables: [
        'Performance Optimization Report',
        'Enhanced AI Models',
        'System Architecture Improvements',
        'Monitoring & Analytics Dashboard',
        'Automated Optimization Tools',
        'Performance Maintenance Plan',
        'Best Practices Documentation',
        'Ongoing Support Framework'
      ]
    }
  };

  const service = serviceData[serviceId];

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Service Not Found</h2>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const IconComponent = service.icon;

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-300 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to AI Solutions</span>
        </button>

        {/* Service Header */}
        <div 
          ref={detailRef}
          className="text-center mb-16"
        >
          <div className={`inline-flex p-4 bg-gradient-to-r ${service.color} rounded-2xl mb-6`}>
            <IconComponent className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {service.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {service.subtitle}
          </p>
          <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Pricing & Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-600 text-center">
            <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Investment</h3>
            <p className="text-2xl font-bold text-green-400">{service.pricing.range}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-600 text-center">
            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Timeline</h3>
            <p className="text-2xl font-bold text-blue-400">{service.pricing.timeline}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-600 text-center">
            <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">ROI</h3>
            <p className="text-2xl font-bold text-purple-400">{service.pricing.roi}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Features */}
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-600">
            <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
            <div className="space-y-3">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-600">
            <h2 className="text-2xl font-bold text-white mb-6">Business Benefits</h2>
            <div className="space-y-3">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Implementation Process */}
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-600 mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Implementation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {index + 1}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Success Story</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Client: {service.caseStudy.client}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Challenge:</h4>
                  <p className="text-gray-300">{service.caseStudy.challenge}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Solution:</h4>
                  <p className="text-gray-300">{service.caseStudy.solution}</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Results Achieved:</h4>
              <div className="space-y-3">
                {service.caseStudy.results.map((result, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-600 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">What You Receive</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.deliverables.map((deliverable, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Download className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{deliverable}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 p-8 rounded-2xl border border-cyan-500/30 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Schedule your free AI strategy session to discuss how {service.title.toLowerCase()} can transform your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowScheduling(true)}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-purple-700 transition-all hover:scale-105 shadow-lg"
            >
              <Calendar className="inline-block w-5 h-5 mr-2" />
              Schedule Free Consultation
            </button>
            <button className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105">
              <Download className="inline-block w-5 h-5 mr-2" />
              Download Case Study
            </button>
          </div>
        </div>
      </div>

      <SchedulingModal 
        isOpen={showScheduling} 
        onClose={() => setShowScheduling(false)} 
      />
    </div>
  );
};

export default ServiceDetail;