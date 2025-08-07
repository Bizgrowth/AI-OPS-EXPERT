import React, { useState } from 'react';
import { Mail, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const NewsletterSection = () => {
  const [newsletterRef, isNewsletterVisible] = useScrollAnimation(0.1);
  const [formRef, isFormVisible] = useScrollAnimation(0.2);

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');
    
    try {
      // Kit.com API call - using subscribers endpoint instead of forms
      const response = await fetch('https://api.convertkit.com/v3/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: '9mUAej9R5G1uvFakzhpLKGViOYJWkr4H0lVOoVlSHgY',
          email: email,
          tags: ['ai-operations-newsletter'],
          fields: {
            source: 'AI Operations Website'
          }
        })
      });

      const data = await response.json();
      
      if (response.ok && data.subscription) {
        setIsSubscribed(true);
        setEmail('');
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubscribed(false), 5000);
      } else {
        if (response.status === 409 || data.error?.includes('already') || data.message?.includes('already')) {
          // Already subscribed
          setError('You\'re already subscribed! Check your email for the latest newsletter.');
        } else {
          console.error('Kit API Error:', data);
          setError(data.message || 'Unable to subscribe right now. Please try again or contact us directly.');
        }
      }
    } catch (err) {
      console.error('Network Error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      id="newsletter" 
      ref={newsletterRef}
      className="py-20 bg-slate-800 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Newsletter Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  AI Operations Newsletter
                </h2>
                <p className="text-cyan-400 font-medium text-sm sm:text-base">Weekly insights that drive results</p>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              Get exclusive AI operations strategies, real case studies, and actionable insights 
              delivered to your inbox. Join 1,200+ business leaders transforming their operations with AI.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <div className="text-xl sm:text-2xl font-bold text-cyan-400 mb-1">1,200+</div>
                <div className="text-gray-400 text-xs sm:text-sm">Subscribers</div>
              </div>
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <div className="text-xl sm:text-2xl font-bold text-green-400 mb-1">68%</div>
                <div className="text-gray-400 text-xs sm:text-sm">Open Rate</div>
              </div>
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <div className="text-xl sm:text-2xl font-bold text-purple-400 mb-1">Weekly</div>
                <div className="text-gray-400 text-xs sm:text-sm">Delivery</div>
              </div>
            </div>

            {/* What You'll Get */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4">What you'll get:</h3>
              {[
                'Real AI implementation case studies',
                'Proven automation strategies',
                'Industry insights and trends',
                'Exclusive tools and templates'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300 text-sm sm:text-base">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe Form */}
          <div 
            ref={formRef}
            className="bg-gradient-to-br from-slate-700 to-slate-600 p-4 sm:p-8 rounded-2xl border border-slate-500 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Latest AI Insights</h3>
              <p className="text-gray-300 text-sm sm:text-base">Get exclusive AI operations strategies, case studies, and industry insights delivered to your inbox.</p>
              
              {/* Featured Newsletter Preview */}
              <div className="mt-6 p-3 sm:p-4 bg-slate-700 rounded-lg border border-slate-600 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
                <h4 className="text-base sm:text-lg font-semibold text-cyan-400 mb-2">Latest Issue:</h4>
                <p className="text-white font-medium text-sm sm:text-base">"AI will make my business feel impersonal"</p>
                <p className="text-gray-300 text-xs sm:text-sm mt-1">The #1 objection from small business owners - and why it's completely wrong. Real example: 34% revenue increase.</p>
              </div>
            </div>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-4">
                {error && (
                  <div className="p-2 sm:p-3 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg">
                    <p className="text-red-300 text-xs sm:text-sm">{error}</p>
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="your@email.com"
                    disabled={isLoading}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    'Subscribe to AI Operations Newsletter'
                  )}
                </button>
                
                <p className="text-center text-xs sm:text-sm text-gray-400">
                  Join 1,200+ business leaders. No spam, unsubscribe anytime.
                </p>
              </form>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">🎉 You're In!</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Welcome to the AI Operations Newsletter! You'll receive a confirmation email shortly, 
                  and your first newsletter within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-gray-400 mb-6 text-sm sm:text-base">Trusted by business leaders at:</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-60">
            <span className="text-gray-500 font-semibold text-sm sm:text-base">TechFlow SaaS</span>
            <span className="text-gray-500 font-semibold text-sm sm:text-base">GrowthLab</span>
            <span className="text-gray-500 font-semibold text-sm sm:text-base">ScaleUp Inc</span>
            <span className="text-gray-500 font-semibold text-sm sm:text-base">InnovateCorp</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;