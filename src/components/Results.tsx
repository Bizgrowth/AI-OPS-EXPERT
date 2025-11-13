import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Results = () => {
  const [resultsRef, isResultsVisible] = useScrollAnimation(0.1);
  const [statsRef, isStatsVisible] = useScrollAnimation(0.2);
  const [testimonialsRef, isTestimonialsVisible] = useScrollAnimation(0.3);

  const testimonials = [
    {
      name: "Sarah Chen",
      title: "CEO, TechFlow SaaS",
      content: "Daniel's AI operations transformation was incredible. We automated 70% of our manual processes and saw a 60% increase in operational efficiency within 4 months. His AI solutions are game-changing.",
      rating: 5,
      result: "70% process automation"
    },
    {
      name: "Marcus Rodriguez",
      title: "Founder, GrowthLab",
      content: "The intelligent automation Daniel implemented saved us 35+ hours per week and reduced errors by 90%. His AI strategy helped us scale from $100K to $1M ARR with the same team size.",
      rating: 5,
      result: "10x revenue growth"
    },
    {
      name: "Jennifer Park",
      title: "COO, ScaleUp Inc",
      content: "Daniel's AI-powered operational systems allowed us to scale our team from 15 to 75 people without losing efficiency. The intelligent workflows he built are absolutely revolutionary.",
      rating: 5,
      result: "5x team growth"
    }
  ];

  const stats = [
    { number: "70%", label: "Average Process Automation" },
    { number: "35+", label: "Hours Saved Weekly" },
    { number: "90%", label: "Error Reduction Rate" },
    { number: "12", label: "Month Average ROI" }
  ];

  return (
    <section 
      id="results" 
      ref={resultsRef}
      className="py-20 bg-slate-800 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 px-4">
            Tech
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"> Stack</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Don't just take my word for it. Here's what my clients have achieved
            through strategic AI operations and intelligent automation implementation.
          </p>
        </div>

        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-16 px-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 sm:p-6 bg-slate-700 rounded-xl hover:bg-slate-600 transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/30 perspective-card cursor-pointer"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2 hover:scale-125 transition-transform duration-300 animate-text-glow">
                {stat.number}
              </div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>

        <div 
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-700 p-4 sm:p-8 rounded-2xl hover:bg-slate-600 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/40 perspective-card hover-border-glow cursor-pointer"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current hover:scale-110 transition-transform duration-200" />
                ))}
              </div>
              
              <div className="mb-6">
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 mb-4 hover:scale-110 transition-transform duration-300" />
                <p className="text-gray-300 leading-relaxed italic text-sm sm:text-base">
                  "{testimonial.content}"
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white text-sm sm:text-base">{testimonial.name}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">{testimonial.title}</div>
                </div>
                <div className="text-right">
                  <div className="text-cyan-400 font-bold text-xs sm:text-sm hover:scale-105 transition-transform duration-300">{testimonial.result}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
          isTestimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-full border border-green-500/30 mb-8">
            <span className="text-green-400 font-semibold text-sm sm:text-base">100% AI Implementation Success Guarantee</span>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base px-4">
            I'm so confident in my AI operations expertise that I offer a complete satisfaction guarantee. 
            If you're not seeing measurable AI-driven improvements within 90 days, I'll refund your investment.
          </p>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Results;