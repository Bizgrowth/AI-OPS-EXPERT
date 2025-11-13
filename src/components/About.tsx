import React from 'react';
import { Award, Cpu, Target, TrendingUp, Clock } from 'lucide-react';
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
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4 leading-relaxed">
            From operational strategist to AI innovator, I combine two decades of proven operational leadership with cutting-edge AI solutions to deliver measurable growth in 90 days or less. In 20+ years of business operations, I've never witnessed anything like this—what once took months of resources and complex implementations now happens in days with minimal overhead. This isn't just another technology trend, it's a historical explosion of business optimization that's redefining what's possible.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div
            ref={contentRef}
            className="space-y-8 sm:space-y-10">

            <div className="space-y-8">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-12">What Sets Me Apart</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 backdrop-blur-sm p-8 rounded-2xl border border-blue-700/50 hover:border-blue-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Cpu className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white">Operations-First AI Approach</h4>
                  </div>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    I don't sell AI. I sell operational excellence powered by AI. We start with your business challenges, not with the technology.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 backdrop-blur-sm p-8 rounded-2xl border border-blue-700/50 hover:border-blue-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white">Executive-Level Execution</h4>
                  </div>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    With C-level experience across healthcare, real estate, hospitality, and tech, I implement solutions that align with your strategic vision.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 backdrop-blur-sm p-8 rounded-2xl border border-blue-700/50 hover:border-blue-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white">ROI-Focused with a 90-Day Guarantee</h4>
                  </div>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    Every solution is designed for measurable ROI. If you're not satisfied with the results in 90 days, you get a full refund. Period.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 backdrop-blur-sm p-8 rounded-2xl border border-blue-700/50 hover:border-blue-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white">The AI Transformation Moment</h4>
                  </div>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    This is a pivotal moment in business history. I provide the expertise to ensure you're a leader in this transformation, not a follower.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;