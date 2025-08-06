import React from 'react';
import { Calendar, Download, ChevronRight, Clock, CheckCircle } from 'lucide-react';
import { generateComprehensivePortfolio } from '../utils/downloadUtils';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const CTA = () => {
  const [ctaRef, isCtaVisible] = useScrollAnimation(0.1);
  const [cardsRef, isCardsVisible] = useScrollAnimation(0.2);

  const handleDownloadPortfolio = () => {
    generateComprehensivePortfolio();
  };

  return (
    <section 
      ref={ctaRef}
      className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 px-4">
            Ready to Transform Your Operations with
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"> AI?</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Stop struggling with manual processes and start building intelligent systems 
            that will revolutionize your operations and accelerate your growth.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 px-4">
          {/* AI Strategy Call CTA */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-4 sm:p-8 rounded-2xl border border-slate-600 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:scale-105">
            <div className="text-center mb-8">
              <div className="p-3 sm:p-4 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full w-fit mx-auto mb-6 hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Free AI Strategy Session</h3>
              <p className="text-gray-300 mb-6 text-sm sm:text-base">
                Get a personalized AI transformation roadmap for your business. We'll identify your biggest 
                automation opportunities and create a 90-day AI implementation plan.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300 text-sm sm:text-base">60-minute AI assessment session</span>
              </div>
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300 text-sm sm:text-base">Custom AI implementation strategy</span>
              </div>
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300 text-sm sm:text-base">Intelligent automation opportunities</span>
              </div>
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300 text-sm sm:text-base">No-obligation consultation</span>
              </div>
            </div>

            <button className="group w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
              Book Your Free AI Session
              <ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center mt-4 text-xs sm:text-sm text-gray-400">
              <Clock className="w-4 h-4 mr-2" />
              Usually booked 2-3 weeks out
            </div>
          </div>

          {/* AI Portfolio Download CTA */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-4 sm:p-8 rounded-2xl border border-slate-600 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105">
            <div className="text-center mb-8">
              <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-full w-fit mx-auto mb-6 hover:scale-110 transition-transform duration-300">
                <Download className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Download AI Solutions Portfolio</h3>
              <p className="text-gray-300 mb-6 text-sm sm:text-base">
                Get detailed AI case studies, implementation results, and my proven frameworks 
                for transforming operations through intelligent automation.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300 text-sm sm:text-base">20+ detailed AI case studies</span>
              </div>
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300 text-sm sm:text-base">AI implementation playbook</span>
              </div>
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300 text-sm sm:text-base">Intelligent automation framework</span>
              </div>
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300 text-sm sm:text-base">Bonus AI tools & templates</span>
              </div>
            </div>

            <button 
              onClick={handleDownloadPortfolio}
              className="group w-full border-2 border-purple-500 text-purple-400 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-purple-500 hover:text-white transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Download Now (Free)
              <Download className="inline-block w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
            </button>

            <div className="text-center mt-4 text-xs sm:text-sm text-gray-400">
              No email required • Instant download
            </div>
          </div>
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${
          isCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        <div className="text-center mt-16">
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            <strong className="text-white">Still have questions about AI implementation?</strong> Feel free to reach out directly. 
            I personally respond to every inquiry within 24 hours.
          </p>
        </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;