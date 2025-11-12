import React from 'react';
import { Mail, Phone, MapPin, Clock, ExternalLink, Linkedin, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Contact = () => {
  const [contactRef, isContactVisible] = useScrollAnimation(0.1);
  const [formRef, isFormVisible] = useScrollAnimation(0.2);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Check if we're in development mode
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isDevelopment) {
      // Simulate form submission in development
      console.log('Development mode: Simulating form submission with data:', formData);
      setTimeout(() => {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          service: '',
          message: '',
        });
        setIsSubmitting(false);
      }, 1000);
      return;
    }

    try {
      // Create form data object for Netlify
      const submitData = {
        'form-name': 'ai-consultation',
        'bot-field': '', // Honeypot field (should be empty)
        ...formData
      };

      console.log('Submitting form data:', submitData);
      console.log('URL-encoded body:', new URLSearchParams(submitData).toString());
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(submitData).toString(),
      });

      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);
      if (!res.ok) {
        const responseText = await res.text();
        console.error('Form submission failed:', res.status, res.statusText, responseText);
        setSubmitStatus('error');
        return;
      }

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        service: '',
        message: '',
      });
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section 
      id="contact" 
      ref={contactRef}
      className="py-20 bg-slate-900 border-t border-slate-800 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-500/5 to-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-600/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 px-4">
            Let's Discuss Your
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"> AI Transformation</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Ready to revolutionize your operations with AI? I respond to every inquiry personally 
            within 24 hours. Let's discuss how intelligent automation can accelerate your growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 px-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-4 sm:p-8 rounded-2xl border border-slate-600 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4 hover:scale-105 transition-transform duration-300">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">Email</div>
                    <div className="text-gray-300 text-sm sm:text-base">dschley@aiopsexpert.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4 hover:scale-105 transition-transform duration-300">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">Phone</div>
                    <div className="text-gray-300 text-sm sm:text-base">904-955-3905</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4 hover:scale-105 transition-transform duration-300">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">Location</div>
                    <div className="text-gray-300 text-sm sm:text-base">Remote AI Operations Worldwide</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4 hover:scale-105 transition-transform duration-300">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">Response Time</div>
                    <div className="text-gray-300 text-sm sm:text-base">Within 24 hours</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-600">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Follow My AI Journey</h4>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <a href="https://x.com/AIOpsExpert" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 bg-blue-500 rounded-full hover:bg-slate-600 transition-all duration-300 group hover:scale-110 cursor-pointer z-10 relative" title="Follow on X/Twitter" style={{ pointerEvents: 'auto' }}>
                    <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-gray-300" />
                  </a>
                  <a href="https://www.linkedin.com/in/danielschley/" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 bg-blue-600 rounded-full hover:bg-slate-600 transition-all duration-300 group hover:scale-110 cursor-pointer form-element-z10-relative form-element-pointer-auto" title="Connect on LinkedIn">
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-gray-300" />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61578737542703" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 bg-blue-600 rounded-full hover:bg-slate-600 transition-all duration-300 group hover:scale-110 cursor-pointer form-element-z10-relative form-element-pointer-auto" title="Follow on Facebook">
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-gray-300" />
                  </a>
                  <a href="https://www.instagram.com/aiopsexpert?igsh=cG52emNqaTVxYmpn" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 bg-pink-500 rounded-full hover:bg-slate-600 transition-all duration-300 group hover:scale-110 cursor-pointer form-element-z10-relative form-element-pointer-auto" title="Follow on Instagram">
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-gray-300" />
                  </a>
                  <a href="https://www.youtube.com/@AIOPSEXPERT" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 bg-red-500 rounded-full hover:bg-slate-600 transition-all duration-300 group hover:scale-110 cursor-pointer form-element-z10-relative form-element-pointer-auto" title="Subscribe on YouTube">
                    <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-gray-300" />
                  </a>
                  <a href="https://aiopsexpert.com" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 bg-green-500 rounded-full hover:bg-slate-600 transition-all duration-300 group hover:scale-110 cursor-pointer form-element-z10-relative form-element-pointer-auto" title="Visit Website">
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-gray-300" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/30 p-4 sm:p-6 rounded-xl hover:border-green-500/50 transition-all duration-300 hover:scale-105">
              <h4 className="text-base sm:text-lg font-semibold text-green-400 mb-2">AI Expert Response Promise</h4>
              <p className="text-gray-300 text-sm sm:text-base">
                I personally review and respond to every AI consultation request. Expect a detailed response 
                within 24 hours, often much sooner.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            ref={formRef}
            className="bg-gradient-to-br from-slate-800 to-slate-700 p-4 sm:p-8 rounded-2xl border border-slate-600 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 mx-4 relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Start Your AI Transformation</h3>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-3 sm:p-4 bg-green-900/30 border border-green-700 rounded-lg">
                <p className="text-green-300 font-semibold text-sm sm:text-base">✅ Message sent successfully!</p>
                <p className="text-green-400 text-xs sm:text-sm mt-1">I'll respond within 24 hours to discuss your AI transformation.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-3 sm:p-4 bg-red-900/30 border border-red-700 rounded-lg">
                <p className="text-red-300 font-semibold text-sm sm:text-base">❌ Error sending message</p>
                <p className="text-red-400 text-xs sm:text-sm mt-1">Please try again or email me directly at dschley@aiopsexpert.com</p>
              </div>
            )}

            <form 
              name="ai-consultation"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              data-netlify-recaptcha="true"
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              {/* Hidden fields for Netlify form handling */}
              <input type="hidden" name="form-name" value="ai-consultation" />
              <div style={{ display: 'none' }}>
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all hover:border-cyan-500/50 text-sm sm:text-base form-element-pointer-auto form-element-z10-relative"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all hover:border-cyan-500/50 text-sm sm:text-base form-element-pointer-auto form-element-z10-relative"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all hover:border-cyan-500/50 text-sm sm:text-base form-element-pointer-auto form-element-z10-relative"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all hover:border-cyan-500/50 text-sm sm:text-base form-element-pointer-auto form-element-z10-relative"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  AI Solution Interest
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-600 border border-slate-500 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all hover:border-cyan-500/50 text-sm sm:text-base form-element-pointer-auto form-element-z10-relative"
                >
                  <option value="">Select an AI solution...</option>
                  <option value="ai-strategy">AI Strategy & Implementation</option>
                  <option value="intelligent-automation">Intelligent Process Automation</option>
                  <option value="ai-analytics">AI Analytics & Insights</option>
                  <option value="custom-ai">Custom AI Development</option>
                  <option value="ai-consultation">General AI Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Tell me about your AI goals *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none hover:border-cyan-500/50 text-sm sm:text-base form-element-pointer-auto form-element-z10-relative"
                  placeholder="Describe your current operational challenges and how you envision AI helping your business..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.email || !formData.message}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send AI Consultation Request'
                )}
              </button>
              
              {/* reCAPTCHA will be automatically inserted here by Netlify */}
              <div data-netlify-recaptcha="true"></div>
            </form>

            <div className="mt-6 text-center text-xs sm:text-sm text-gray-400">
              By submitting this form, you agree to receive AI consultation communications from Daniel Schley. 
              Your information is secure and will never be shared.
            </div>
          </div>
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${
          isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full border border-slate-600 shadow-lg mx-4">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-cyan-400">24h</div>
                <div className="text-gray-400 text-xs sm:text-sm">Response</div>
              </div>
              <div className="w-px h-6 sm:h-8 bg-slate-600"></div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-purple-400">100%</div>
                <div className="text-gray-400 text-xs sm:text-sm">Confidential</div>
              </div>
              <div className="w-px h-6 sm:h-8 bg-slate-600"></div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-green-400">Free</div>
                <div className="text-gray-400 text-xs sm:text-sm">AI Consultation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
