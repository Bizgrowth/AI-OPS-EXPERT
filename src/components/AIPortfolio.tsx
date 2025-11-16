import React, { useState } from 'react';
import {
  MessageSquare,
  Share2,
  FileText,
  UserCheck,
  Calendar,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  ExternalLink,
  Search,
  DollarSign,
  Rocket
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SchedulingModal from './SchedulingModal';
import AssessmentForm from './AssessmentForm';

interface DemoCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  demoUrl?: string;
  gradient: string;
  duration?: string;
  price?: string;
  isAssessment?: boolean;
}

interface DemoCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  iconBg: string;
  demos: DemoCard[];
}

const AIPortfolio: React.FC = () => {
  const [portfolioRef, isPortfolioVisible] = useScrollAnimation(0.1);
  const [showScheduling, setShowScheduling] = useState(false);
  const [showAssessment, setShowAssessment] = useState<'business_readiness' | 'roi_viability' | 'implementation_readiness' | null>(null);

  const demoCategories: DemoCategory[] = [
    {
      id: 'assessment',
      title: 'AI Assessment',
      subtitle: 'Strategic Planning & Readiness Analysis',
      icon: Search,
      gradient: 'from-cyan-500 to-blue-600',
      iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      demos: [
        {
          id: 'business_readiness',
          title: 'Business Readiness Assessment',
          description: 'Evaluate processes, data, and integration feasibility before building anything',
          icon: Search,
          gradient: 'from-cyan-500 to-blue-600',
          duration: '60-90 minutes',
          price: '$150',
          isAssessment: true
        },
        {
          id: 'roi_viability',
          title: 'ROI Viability Analysis',
          description: 'Calculate real costs vs. savings to ensure your automation investment makes sense',
          icon: DollarSign,
          gradient: 'from-emerald-500 to-teal-600',
          duration: '45 minutes',
          price: '$99',
          isAssessment: true
        },
        {
          id: 'implementation_readiness',
          title: 'Implementation Readiness Check',
          description: 'Assess team adoption readiness and create deployment strategy for successful rollout',
          icon: Rocket,
          gradient: 'from-orange-500 to-red-600',
          duration: '45 minutes',
          price: '$99',
          isAssessment: true
        }
      ]
    },
    {
      id: 'automation',
      title: 'AI Automation',
      subtitle: 'Intelligent System Development & Implementation',
      icon: Zap,
      gradient: 'from-pink-500 to-purple-600',
      iconBg: 'bg-gradient-to-br from-pink-500 to-purple-600',
      demos: [
        {
          id: 'customer-support',
          title: 'Smart Customer Support Chatbot',
          description: 'Intelligent 24/7 customer service that handles inquiries, resolves issues, and escalates complex cases',
          icon: MessageSquare,
          demoUrl: 'https://smartchatbot.aiopsexpert.com/',
          gradient: 'from-blue-500 to-blue-700'
        },
        {
          id: 'social-media',
          title: 'AI Social Media Content Creator',
          description: 'Automated content generation for social platforms with brand-consistent messaging and scheduling',
          icon: Share2,
          demoUrl: 'https://contentcreator.aiopsexpert.com/',
          gradient: 'from-purple-500 to-purple-700'
        },
        {
          id: 'social-media-pro',
          title: 'Social Media Pro - AI Content Manager',
          description: 'Advanced social media management platform with AI-powered content creation, scheduling, and analytics',
          icon: TrendingUp,
          demoUrl: 'https://socialmediapro.aiopsexpert.com/',
          gradient: 'from-pink-500 to-purple-600'
        },
        {
          id: 'invoice-processing',
          title: 'AI Invoice Processing Assistant',
          description: 'Intelligent document processing that extracts, validates, and organizes invoice data automatically',
          icon: FileText,
          demoUrl: 'https://invoiceprocessing.aiopsexpert.com/',
          gradient: 'from-green-500 to-green-700'
        },
        {
          id: 'lead-qualification',
          title: 'AI Lead Qualification Bot',
          description: 'Smart lead scoring and qualification system that identifies high-value prospects automatically',
          icon: UserCheck,
          demoUrl: 'https://aileadqualification.aiopsexpert.com/',
          gradient: 'from-orange-500 to-red-600'
        },
        {
          id: 'appointment-scheduling',
          title: 'Smart Appointment Scheduling Assistant',
          description: 'Intelligent scheduling system that manages calendars, handles bookings, and sends automated reminders',
          icon: Calendar,
          demoUrl: 'https://dreamy-swan-db3e7b.netlify.app/',
          gradient: 'from-pink-500 to-rose-600'
        }
      ]
    },
    {
      id: 'performance',
      title: 'AI Performance',
      subtitle: 'Real-time Optimization & Scaling Solutions',
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-600',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
      demos: [
        {
          id: 'kpi-dashboard',
          title: 'AI-Powered KPI Dashboard',
          description: 'Real-time performance metrics with AI-generated insights',
          icon: BarChart3,
          demoUrl: 'https://aikpidashboard.aiopsexpert.com/',
          gradient: 'from-blue-500 to-cyan-600'
        },
        {
          id: 'executive-assistant',
          title: 'AI Executive Assistant (Ops Agent)',
          description: 'Daily performance summaries, task automation, and alerting',
          icon: Users,
          demoUrl: 'https://aiexecutiveassistant.aiopsexpert.com/',
          gradient: 'from-purple-500 to-indigo-600'
        },
        {
          id: 'team-ops-portal',
          title: 'Remote Team Ops Portal',
          description: 'Central hub for async execution, check-ins, and team communication',
          icon: Users,
          demoUrl: 'https://remoteperformance.aiopsexpert.com/',
          gradient: 'from-green-500 to-teal-600'
        },
        {
          id: 'feedback-loop',
          title: 'Optimization & Automation Feedback Loop',
          description: 'AI loop identifies inefficiencies and auto-suggests or implements fixes',
          icon: Zap,
          demoUrl: 'https://resilient-sorbet-d14680.netlify.app/',
          gradient: 'from-orange-500 to-amber-600'
        }
      ]
    }
  ];

  const openDemo = (demoUrl: string): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.open(demoUrl, '_blank');
    }, 300);
  };

  return (
    <section
      id="ai-portfolio"
      ref={portfolioRef}
      className="py-20 bg-slate-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Virtual AI Demo Centers
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto">
            Experience our AI solutions through interactive demo environments. Each center showcases real capabilities you can implement in your business.
          </p>
        </div>

        <div className="space-y-16">
          {demoCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <div key={category.id} className="space-y-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className={`w-16 h-16 ${category.iconBg} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <CategoryIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">{category.title}</h3>
                    <p className="text-cyan-400 text-lg">{category.subtitle}</p>
                  </div>
                </div>

                <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-slate-700">
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-white mb-2">Virtual Demo Center</h4>
                    <p className="text-gray-400">Interactive demonstrations of our AI solutions</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {category.demos.map((demo) => {
                      const DemoIcon = demo.icon;
                      return (
                        <div
                          key={demo.id}
                          className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-600 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105 perspective-card"
                        >
                          <div className="flex items-start space-x-3 mb-4">
                            <div className={`w-10 h-10 bg-gradient-to-r ${demo.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <DemoIcon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-white font-semibold text-sm sm:text-base leading-tight mb-2">
                                {demo.title}
                              </h5>
                              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                                {demo.description}
                              </p>
                            </div>
                          </div>

                          {demo.isAssessment ? (
                            <>
                              <div className="flex items-center justify-between text-gray-400 text-xs sm:text-sm mb-4 pt-2 border-t border-slate-700">
                                <span>{demo.duration}</span>
                                <span className="text-cyan-400 font-semibold">{demo.price}</span>
                              </div>
                              <button
                                onClick={() => setShowAssessment(demo.id as 'business_readiness' | 'roi_viability' | 'implementation_readiness')}
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2.5 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center justify-center space-x-2 text-sm font-medium group hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 hover-shine relative overflow-hidden"
                              >
                                <span>Start Assessment</span>
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => demo.demoUrl && openDemo(demo.demoUrl)}
                              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2.5 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center justify-center space-x-2 text-sm font-medium group mt-4 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 hover-shine relative overflow-hidden"
                            >
                              <span>Launch Live Demo</span>
                              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-green-400 text-sm flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span>All demos are fully interactive and showcase real AI capabilities</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-sm rounded-2xl p-8 text-center border border-slate-600 mt-16 hover-lift">
          <h3 className="text-2xl font-semibold text-white mb-4">
            <span className="inline-block hover:scale-110 transition-transform duration-300">Ready to Transform Your Business with AI?</span>
          </h3>
          <p className="text-gray-300 mb-6 text-lg">
            Each solution is custom-implemented for your specific business needs with ongoing support and optimization.
          </p>
          <button
            onClick={() => setShowScheduling(true)}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-purple-700 transition-all hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/50 animate-gradient-shift hover-shine relative overflow-hidden">
            Schedule Free AI Consultation
          </button>
        </div>
      </div>

      <SchedulingModal
        isOpen={showScheduling}
        onClose={() => setShowScheduling(false)}
      />

      {showAssessment && (
        <AssessmentForm
          assessmentType={showAssessment}
          onClose={() => setShowAssessment(null)}
        />
      )}
    </section>
  );
};

export default AIPortfolio;
