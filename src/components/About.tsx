import React from 'react';
import { Award, Users, TrendingUp, Cpu, Brain, Zap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  const [aboutRef, isAboutVisible] = useScrollAnimation(0.1);
  const [contentRef, isContentVisible] = useScrollAnimation(0.2);
  const [featuresRef, isFeaturesVisible] = useScrollAnimation(0.3);

  return (
    <section 
      id="about" 
      ref={aboutRef}
      className="py-20 bg-slate-800 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 px-4">
            From C-Suite to
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"> AI Operations Expert</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Two decades of operational leadership combined with cutting-edge AI expertise 
            to help businesses transform their operations and achieve exponential growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            ref={contentRef}
            className="space-y-6 sm:space-y-8">
            <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-4 sm:p-8 rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">My Journey to AI Ops Expert</h3>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
                My path to becoming an AI Ops Expert was forged in 20+ years of real business operations, 
                solving the exact problems that AI now addresses at scale. Every breakthrough came from 
                bridging operations and technology execution. The AI revolution is the culmination of 
                everything I've been working toward for two decades.
              </p>
              
              <div className="mb-6">
                <h4 className="text-base sm:text-lg font-semibold text-cyan-400 mb-3">Key Operational Milestones</h4>
                <div className="space-y-2 text-xs sm:text-sm text-gray-300">
                  <div className="flex items-start space-x-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong>Align Networks:</strong> Scaled start-up from $0 to $265M revenue in 5 years</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong>Executive Coach Professionals:</strong> 40% revenue increase, 12X EBITDA exit to General Atlantic</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong>One Call Care Management:</strong> Scaled revenue from $15M to $75M in under a year</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong>GO T&T:</strong> Enhanced efficiency 50%, achieved 96% YoY revenue increase</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong>Lux Community Living:</strong> Managed $40M portfolio, boosted NOI by 28%</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong>The Klotz Group:</strong> Developed strategies for $1B real estate portfolio</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-4 sm:p-8 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">The AI Transformation</h3>
              <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                In 20+ years of business operations, I've never witnessed anything like this. What once took 
                months of resources and complex implementations now happens in days with minimal overhead. 
                This isn't just another technology trend—it's a historical explosion of business optimization 
                that's redefining what's possible.
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm sm:text-base">Recognized AI as the ultimate operational amplification tool</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm sm:text-base">Achieved 30% cost reductions for clients</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm sm:text-base">Drove 25% profit margin increases</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm sm:text-base">Founded AI Ops Expert to be part of this transformational moment</span>
                </div>
              </div>
              
              <p className="text-cyan-400 font-medium italic text-sm sm:text-base">
                "The speed of transformation is unprecedented. I'm passionate about this historical moment 
                because I believe we're only seeing 10% of what AI will ultimately deliver for business optimization."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-slate-700 rounded-xl hover:bg-slate-600 transition-all duration-300 hover:scale-105">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">$1B+</div>
                <div className="text-gray-300 text-sm sm:text-base">Portfolio Managed</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-slate-700 rounded-xl hover:bg-slate-600 transition-all duration-300 hover:scale-105">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">200%</div>
                <div className="text-gray-300 text-sm sm:text-base">YoY Growth Record</div>
              </div>
            </div>
          </div>

          <div 
            ref={featuresRef}
            className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-4 sm:p-6 rounded-xl mb-6">
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-4">What Sets Me Apart</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-cyan-400 font-semibold text-sm sm:text-base">Operations-First:</span>
                  <span className="text-gray-300 ml-2 text-sm sm:text-base">20+ years solving AI-addressable problems before AI existed</span>
                </div>
                <div>
                  <span className="text-purple-400 font-semibold text-sm sm:text-base">Proven Results:</span>
                  <span className="text-gray-300 ml-2 text-sm sm:text-base">Track record of 100-200% YoY growth across industries</span>
                </div>
                <div>
                  <span className="text-green-400 font-semibold text-sm sm:text-base">Executive Credibility:</span>
                  <span className="text-gray-300 ml-2 text-sm sm:text-base">Managed portfolios from start-up to $1B+ valuations</span>
                </div>
                <div>
                  <span className="text-yellow-400 font-semibold text-sm sm:text-base">ROI Focus:</span>
                  <span className="text-gray-300 ml-2 text-sm sm:text-base">Every solution measured against 90-day ROI and scalability</span>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-slate-700 rounded-xl hover:bg-slate-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full flex-shrink-0">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Historical AI Transformation Moment</h4>
                <p className="text-gray-300 text-sm sm:text-base">Leveraging 20 years of operational excellence to make AI genuinely transformational for your business at unprecedented speed.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-slate-700 rounded-xl hover:bg-slate-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full flex-shrink-0">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Operations-First AI Implementation</h4>
                <p className="text-gray-300 text-sm sm:text-base">I don't just understand AI technology—I know exactly which processes benefit from automation and how to implement solutions that scale.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-slate-700 rounded-xl hover:bg-slate-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full flex-shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Proven Scale & Growth Results</h4>
                <p className="text-gray-300 text-sm sm:text-base">From $0 to $265M revenue scaling, 12X EBITDA exits, and $1B+ portfolio management—results that translate to AI success.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-slate-700 rounded-xl hover:bg-slate-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full flex-shrink-0">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">90-Day ROI Guarantee</h4>
                <p className="text-gray-300 text-sm sm:text-base">Every AI solution measured against 90-day ROI and scalability—because I've spent 20 years delivering measurable operational results.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;