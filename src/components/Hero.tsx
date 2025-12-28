import React from 'react';
import { useState } from 'react';
import { ChevronRight, Download, Calendar, Cpu, Brain, Zap } from 'lucide-react';
import { generateComprehensivePortfolio } from '../utils/downloadUtils';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SchedulingModal from './SchedulingModal';

const Hero = () => {
  const [heroRef, isHeroVisible] = useScrollAnimation(0.1);
  const [statsRef, isStatsVisible] = useScrollAnimation(0.2);
  const [showVideo, setShowVideo] = useState(false);

  const handlePortfolioClick = () => {
    // Scroll to AI Portfolio section
    const element = document.getElementById('ai-portfolio');
    if (element) {
      const headerHeight = 64; // Height of fixed header
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({ 
        top: elementPosition, 
        behavior: 'smooth' 
      });
    }
  };

  const handleBookConsultation = () => {
    setShowScheduling(true);
  };

  const [showScheduling, setShowScheduling] = useState(false);

  const handleDownloadPortfolio = () => {
    generateComprehensivePortfolio();
  };

  return (
    <section
      id="top" // Added ID for anchor link
      ref={heroRef}
      className="pt-20 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center transition-all duration-1000 ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-8">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500/10 to-purple-600/10 text-cyan-400 border border-cyan-500/20 transition-all duration-700 delay-300 ${
              isHeroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <Cpu className="w-4 h-4 mr-2" />
              AI Operations Expert
            </span>
          </div>
          
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-500 ${
            isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="block sm:inline">Transform Your Operations with</span>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent block sm:inline"> Intelligent AI </span>
            <span className="block sm:inline">Solutions</span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${
            isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="block sm:inline">Powering Small Business Growth with AI:</span>
            <span className="block sm:inline"> Rapid, Affordable, Expert Solutions</span>
          </p>

          {/* Personal Video Section */}
          <div className={`mb-8 transition-all duration-1000 delay-800 ${
            isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {!showVideo ? (
              <div className="max-w-lg mx-auto px-4">
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-3xl p-4 sm:p-8 border border-slate-600/50 hover:border-cyan-500/50 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20">
                  <div className="text-center space-y-6">
                    {/* Photo with Play Button */}
                    <div className="relative inline-block">
                      <div 
                        className="relative cursor-pointer group w-32 h-32 sm:w-48 sm:h-48"
                        onClick={() => setShowVideo(true)}
                      >
                        {/* Gradient Border Container */}
                        <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 p-1 shadow-2xl group-hover:scale-105 transition-all duration-300">
                          <img
                            src="/image copy copy copy copy copy copy copy copy copy copy copy copy copy copy.png"
                            alt="Daniel Schley - AI Operations Expert"
                            className="w-full h-full object-cover rounded-full cursor-pointer"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          {/* Fallback content if image doesn't load */}
                          <div className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center text-white text-lg font-semibold" style={{display: 'none'}}>
                            DS
                          </div>
                        </div>
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                          <div className="w-12 h-12 sm:w-20 sm:h-20 bg-white/95 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6 sm:w-10 sm:h-10 text-slate-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Text Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl sm:text-3xl font-bold text-white">Personal Message from Daniel</h3>
                      <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        Watch my 1-minute introduction to AI Operations
                      </p>
                      <button 
                        onClick={() => setShowVideo(true)}
                        className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full border border-cyan-500/40 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer hover:scale-105"
                      >
                        <svg className="w-5 h-5 text-cyan-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        <span className="text-cyan-400 font-semibold text-sm sm:text-base">Click to Play Video</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto px-4">
                <div className="relative bg-slate-800/95 backdrop-blur-sm rounded-2xl p-3 sm:p-6 border border-slate-600/50 shadow-2xl">
                  <button
                    onClick={() => setShowVideo(false)}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-slate-700/80 hover:bg-slate-600 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="relative aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-slate-900">
                    <video
                      className="w-full h-full object-contain"
                      controls
                      autoPlay
                      muted
                      playsInline
                      preload="metadata"
                      poster="/image copy copy copy copy copy copy copy copy copy copy copy copy copy copy.png"
                    >
                      <source src="/ai_message_-.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-900 ${
            isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <button
              onClick={handleBookConsultation}
              className="group bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/50 w-full sm:w-auto hover-shine relative overflow-hidden"
            >
              <Calendar className="inline-block w-5 h-5 mr-2" />
              Book AI Consultation
              <ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </button>

            <button
              onClick={handlePortfolioClick}
              className="group border-2 border-gray-600 text-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/30 w-full sm:w-auto hover-border-glow"
            >
              <ChevronRight className="inline-block w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              AI Solutions Portfolio
            </button>
          </div>

          <div 
            ref={statsRef}
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4 transition-all duration-1000 delay-1100 ${
              isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="text-center hover-lift cursor-pointer p-4 rounded-xl">
              <div className={`flex justify-center mb-4 transition-all duration-700 delay-1200 ${
                isStatsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full animate-float">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                </div>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold text-white mb-2 transition-all duration-700 delay-1300 ${
                isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                <span className="inline-block hover:scale-110 transition-transform duration-300">AI Strategy</span>
              </h3>
              <p className={`text-gray-400 text-sm sm:text-base transition-all duration-700 delay-1400 ${
                isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>Provide AI Readiness Assessment and AI Roadmap  tailored to your business objectives</p>
            </div>

            <div className="text-center hover-lift cursor-pointer p-4 rounded-xl">
              <div className={`flex justify-center mb-4 transition-all duration-700 delay-1300 ${
                isStatsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}>
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                </div>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold text-white mb-2 transition-all duration-700 delay-1400 ${
                isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                <span className="inline-block hover:scale-110 transition-transform duration-300">AI Automation</span>
              </h3>
              <p className={`text-gray-400 text-sm sm:text-base transition-all duration-700 delay-1500 ${
                isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>AI-powered solutions that eliminate manual work and optimize workflows</p>
            </div>

            <div className="text-center hover-lift cursor-pointer p-4 rounded-xl">
              <div className={`flex justify-center mb-4 transition-all duration-700 delay-1400 ${
                isStatsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full animate-float" style={{ animationDelay: '1s' }}>
                  <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                </div>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold text-white mb-2 transition-all duration-700 delay-1500 ${
                isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                <span className="inline-block hover:scale-110 transition-transform duration-300">AI Performance</span>
              </h3>
              <p className={`text-gray-400 text-sm sm:text-base transition-all duration-700 delay-1600 ${
                isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>Data-driven optimization that scales operations and drives measurable results</p>
            </div>
          </div>
        </div>
      </div>
      
      <SchedulingModal 
        isOpen={showScheduling} 
        onClose={() => setShowScheduling(false)} 
      />
    </section>
  );
};

export default Hero;