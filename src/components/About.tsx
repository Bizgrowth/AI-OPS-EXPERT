import React from 'react';
import { Award, Cpu, Target } from 'lucide-react';
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
            AI Ops Expert — 20+ Years of
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"> Scaling, Optimizing & Transforming</span> Businesses
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            From C-Suite to AI innovator, I combine two decades of proven operational leadership 
            with cutting-edge AI solutions to deliver measurable growth in 90 days or less.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            ref={contentRef}
            className="space-y-6 sm:space-y-8 px-4">
            <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-4 sm:p-8 rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">The AI Transformation</h3>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
                In 20+ years of business operations, I've never witnessed anything like this. What once took
                months of resources and complex implementations now happens in days with minimal overhead.
                This isn't just another technology trend—it's a historical explosion of business optimization
                that's redefining what's possible.
              </p>
            </div>

            <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-6 sm:p-8 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">What Sets Me Apart</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full flex-shrink-0 mt-1">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-cyan-400 font-semibold text-sm sm:text-base">Operations-first AI approach:</span>
                    <span className="text-gray-300 ml-2 text-sm sm:text-base">solving AI-addressable problems before AI existed</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-full flex-shrink-0 mt-1">
                    <Award className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-purple-400 font-semibold text-sm sm:text-base">Executive-level execution:</span>
                    <span className="text-gray-300 ml-2 text-sm sm:text-base">across healthcare, real estate, hospitality, and tech</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-full flex-shrink-0 mt-1">
                    <Target className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <span className="text-green-400 font-semibold text-sm sm:text-base">ROI-focused solutions:</span>
                    <span className="text-gray-300 ml-2 text-sm sm:text-base">every implementation measured against 90-day results</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6">
                <div className="text-center p-4 sm:p-6 bg-slate-600/50 rounded-xl hover:bg-slate-600/70 transition-all duration-300">
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">$1B+</div>
                  <div className="text-gray-300 text-sm sm:text-base">Portfolio Managed</div>
                </div>
                <div className="text-center p-4 sm:p-6 bg-slate-600/50 rounded-xl hover:bg-slate-600/70 transition-all duration-300">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">200%</div>
                  <div className="text-gray-300 text-sm sm:text-base">YoY Growth Record</div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={featuresRef}
            className="space-y-4 sm:space-y-6 px-4">
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;