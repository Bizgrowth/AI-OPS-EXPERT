import React from 'react';
import { useState } from 'react';
import { 
  Brain, 
  Cpu, 
  Zap, 
  Target, 
  MessageSquare, 
  Globe, 
  Bot, 
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SchedulingModal from './SchedulingModal';

const Services = () => {
  const [servicesRef, isServicesVisible] = useScrollAnimation(0.1);
  const [gridRef, isGridVisible] = useScrollAnimation(0.2);
  const [showScheduling, setShowScheduling] = useState(false);

  const services = [
    {
      id: 'ai-strategy',
      icon: Brain,
      title: "AI Strategy & Implementation",
      description: "Comprehensive AI roadmaps and strategic implementation plans tailored to your business",
      color: "from-blue-500 to-cyan-600",
      number: "1"
    },
    {
      id: 'operational-workflow',
      icon: Cpu,
      title: "AI-Powered Workflow Optimization",
      description: "Intelligent automation solutions that eliminate bottlenecks and maximize efficiency",
      color: "from-purple-500 to-violet-600",
      number: "2"
    },
    {
      id: 'intelligent-automation',
      icon: Zap,
      title: "Intelligent Process Automation",
      description: "AI-driven automation systems that handle complex decision-making and workflows",
      color: "from-yellow-500 to-orange-600",
      number: "3"
    },
    {
      id: 'ai-analytics',
      icon: BarChart3,
      title: "AI Analytics & Insights",
      description: "Advanced AI analytics platforms that provide actionable business intelligence",
      color: "from-green-500 to-emerald-600",
      number: "4"
    },
    {
      id: 'ai-customer-systems',
      icon: MessageSquare,
      title: "AI Customer Experience Systems",
      description: "Intelligent customer service and engagement solutions powered by AI",
      color: "from-pink-500 to-rose-600",
      number: "5"
    },
    {
      id: 'ai-web-solutions',
      icon: Globe,
      title: "AI-Enhanced Web Solutions",
      description: "Intelligent websites and applications with built-in AI capabilities",
      color: "from-indigo-500 to-blue-600",
      number: "6"
    },
    {
      id: 'custom-ai-development',
      icon: Bot,
      title: "Custom AI Solution Development",
      description: "Bespoke AI applications and tools designed specifically for your business needs",
      color: "from-cyan-500 to-teal-600",
      number: "7"
    },
    {
      id: 'ai-performance-optimization',
      icon: Target,
      title: "AI Performance Optimization",
      description: "Continuous optimization of AI systems for maximum ROI and operational impact",
      color: "from-red-500 to-pink-600",
      number: "8"
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    // Navigate to detail page using React Router
    window.location.href = `/service/${serviceId}`;
  };

  return (
    <section 
      id="services" 
      ref={servicesRef}
      className="py-20 bg-slate-900 relative overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent transform -skew-y-12"></div>
        <div className="absolute top-40 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 px-4">
            Comprehensive
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"> AI Operations Solutions</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Everything you need to transform your operations with intelligent AI solutions in 2025. 
            Click any service to explore detailed case studies, AI methodologies, and measurable results.
          </p>
        </div>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              onClick={() => handleServiceClick(service.id)}
              className="group relative p-4 sm:p-6 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 cursor-pointer mx-4 sm:mx-0"
            >
              <div className={`p-3 sm:p-4 bg-gradient-to-r ${service.color} rounded-xl w-fit mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed mb-3 sm:mb-4 group-hover:text-gray-300 transition-colors duration-300 text-sm sm:text-base">
                {service.description}
              </p>

              {/* Click indicator */}
              <div className="flex items-center text-cyan-400 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0">
                <span className="text-xs sm:text-sm font-medium">View AI Solutions</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16 px-4">
          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            Each AI solution includes detailed case studies, proven methodologies, and measurable ROI results
          </p>
          <button 
            onClick={() => setShowScheduling(true)}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Schedule AI Consultation
          </button>
        </div>
      </div>
      
      <SchedulingModal 
        isOpen={showScheduling} 
        onClose={() => setShowScheduling(false)} 
      />
    </section>
  );
};

export default Services;