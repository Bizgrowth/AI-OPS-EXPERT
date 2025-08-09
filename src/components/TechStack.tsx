import React from 'react';
import { Brain, BarChart3, Link, Palette, Cloud, Briefcase } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const TechStack = () => {
  const [techStackRef, isTechStackVisible] = useScrollAnimation(0.1);
  const [benefitsRef, isBenefitsVisible] = useScrollAnimation(0.2);
  const [categoriesRef, isCategoriesVisible] = useScrollAnimation(0.3);

  const benefits = [
    {
      icon: "📈",
      title: "Scalable Growth",
      description: "From startup to enterprise"
    },
    {
      icon: "🔒",
      title: "Secure & Compliant",
      description: "Enterprise-grade security"
    },
    {
      icon: "⚡",
      title: "Quick Deployment",
      description: "Fast to deploy and iterate"
    },
    {
      icon: "💰",
      title: "Cost-Effective",
      description: "Affordable to maintain"
    }
  ];

  const techCategories = [
    {
      id: 'ai-intelligence',
      icon: Brain,
      title: 'AI & Intelligence Layer',
      description: 'Powers intelligent decision-making and automation',
      gradient: 'bg-gradient-ai',
      technologies: [
        { name: 'OpenAI', logo: 'GPT' },
        { name: 'Claude', logo: 'CLD' },
        { name: 'Google AI', logo: 'GGL' },
        { name: 'Bedrock', logo: 'AWS' },
        { name: 'Hugging Face', logo: 'HF' },
        { name: 'Azure AI', logo: 'AZ' }
      ]
    },
    {
      id: 'data-analytics',
      icon: BarChart3,
      title: 'Data & Analytics Foundation',
      description: 'Secure, scalable data management with AI insights',
      gradient: 'bg-gradient-data',
      technologies: [
        { name: 'Supabase', logo: 'SB' },
        { name: 'MongoDB', logo: 'MG' },
        { name: 'Pinecone', logo: 'PC' },
        { name: 'Firebase', logo: 'FB' },
        { name: 'PlanetScale', logo: 'PS' },
        { name: 'Weaviate', logo: 'WV' }
      ]
    },
    {
      id: 'integration-hub',
      icon: Link,
      title: 'Integration & Automation Hub',
      description: 'Connects your existing tools and workflows',
      gradient: 'bg-gradient-integration',
      technologies: [
        { name: 'Zapier', logo: 'ZP' },
        { name: 'Make', logo: 'MK' },
        { name: 'n8n', logo: 'N8' },
        { name: 'Power Automate', logo: 'PA' },
        { name: 'Pabbly', logo: 'PB' },
        { name: 'Retool', logo: 'RT' }
      ]
    },
    {
      id: 'user-experience',
      icon: Palette,
      title: 'User Experience Platform',
      description: 'Beautiful, functional interfaces your team will love',
      gradient: 'bg-gradient-ux',
      technologies: [
        { name: 'Framer', logo: 'FR' },
        { name: 'Bubble', logo: 'BB' },
        { name: 'FlutterFlow', logo: 'FF' },
        { name: 'Webflow', logo: 'WF' },
        { name: 'Figma', logo: 'FG' },
        { name: 'Canva', logo: 'CV' }
      ]
    },
    {
      id: 'cloud-infrastructure',
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description: 'Reliable, scalable hosting and deployment',
      gradient: 'bg-gradient-cloud',
      technologies: [
        { name: 'Vercel', logo: 'VR' },
        { name: 'Netlify', logo: 'NT' },
        { name: 'AWS', logo: 'AWS' },
        { name: 'Google Cloud', logo: 'GCP' },
        { name: 'Cloudflare', logo: 'CF' },
        { name: 'Railway', logo: 'RW' }
      ]
    },
    {
      id: 'business-tools',
      icon: Briefcase,
      title: 'Business Integration Tools',
      description: 'CRM, payments, and productivity platforms',
      gradient: 'bg-gradient-business',
      technologies: [
        { name: 'HubSpot', logo: 'HS' },
        { name: 'Stripe', logo: 'ST' },
        { name: 'Notion', logo: 'NT' },
        { name: 'Airtable', logo: 'AT' },
        { name: 'Twilio', logo: 'TW' },
        { name: 'Intercom', logo: 'IC' }
      ]
    }
  ];

  const partners = [
    'OpenAI', 'Google', 'AWS', 'Microsoft', 'Stripe', 'Supabase', 'Vercel', 'Zapier'
  ];

  return (
    <section 
      id="tech-stack"
      ref={techStackRef}
      className="py-12 md:py-16 bg-slate-900 relative overflow-hidden pt-px"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 px-4">
            🔧 Technology
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"> Stack</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Built on Enterprise-Grade Technology for Maximum Performance and Scalability
          </p>
        </div>

        {/* Benefits Grid */}
        <div 
          ref={benefitsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4"
        >
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 text-center hover:bg-slate-700/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 ${
                isBenefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Technology Categories */}
        <div 
          ref={categoriesRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4"
        >
          {techCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.id}
                className={`bg-slate-800 rounded-2xl p-8 border border-slate-600 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10 transform hover:-translate-y-1 ${
                  isCategoriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 ${category.gradient} rounded-2xl flex items-center justify-center mr-5 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{category.title}</h3>
                    <p className="text-gray-400 text-sm">{category.description}</p>
                  </div>
                </div>

                {/* Technology Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {category.technologies.map((tech, techIndex) => (
                    <div 
                      key={techIndex}
                      className="bg-slate-700 rounded-xl p-4 text-center hover:bg-slate-600 transition-all duration-300 hover:scale-105 border border-slate-600 hover:border-cyan-500/30"
                    >
                      <div className="w-10 h-10 bg-slate-600 rounded-lg mx-auto mb-3 flex items-center justify-center text-white font-bold text-xs border border-slate-500">
                        {tech.logo}
                      </div>
                      <div className="text-white text-sm font-medium">{tech.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trusted Partners */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-600 mx-4">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Trusted Technology Partners</h3>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="bg-slate-700 px-6 py-3 rounded-xl text-gray-300 font-semibold hover:bg-slate-600 hover:text-white transition-all duration-300 hover:scale-110 border border-slate-600 hover:border-cyan-500/30"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center px-4">
          <a 
            href="#contact" 
            className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            Ready to see what's possible for your business?
          </a>
        </div>
      </div>
    </section>
  );
};

export default TechStack;