import { useState } from 'react';
import { Check, ArrowRight, DollarSign, FileText, Zap, Headphones } from 'lucide-react';
import Header from '../components/Header';
import SocialFooter from '../components/SocialFooter';
import SchedulingModal from '../components/SchedulingModal';

interface Service {
  id: string;
  name: string;
  price: number | null;
  priceLabel?: string;
  description: string;
  features: string[];
  stripePriceId?: string;
  buttonText: string;
  buttonAction: 'payment' | 'schedule' | 'contact';
  icon: React.ReactNode;
  popular?: boolean;
}

const SERVICES: Service[] = [
  {
    id: 'discovery',
    name: 'Discovery Call',
    price: 0,
    priceLabel: 'Free',
    description: 'Strategic AI consultation to assess your needs and opportunities',
    stripePriceId: 'https://buy.stripe.com/9B63cv27tbpScBie6F0Ny01',
    buttonText: 'Book Free Call',
    buttonAction: 'payment',
    icon: <Headphones className="w-8 h-8" />,
    features: [
      '60-minute consultation',
      'AI readiness assessment',
      'Strategic recommendations',
      'ROI analysis',
      'Implementation roadmap',
    ],
  },
  {
    id: 'audit',
    name: 'AI Audit',
    price: 99,
    description: 'Comprehensive analysis of your AI infrastructure and opportunities',
    stripePriceId: 'https://buy.stripe.com/00w4gz7rNgKc44Me6F0Ny00',
    buttonText: 'Purchase Now',
    buttonAction: 'payment',
    icon: <FileText className="w-8 h-8" />,
    popular: true,
    features: [
      'Complete system audit',
      'Technical assessment',
      'Cost-benefit analysis',
      'Detailed written report',
      'Implementation priorities',
      '30-day follow-up call',
    ],
  },
  {
    id: 'retainer',
    name: 'Monthly Retainer',
    price: null,
    priceLabel: 'Contact for Pricing',
    description: 'Ongoing AI operations support and strategic guidance',
    buttonText: 'Request Quote',
    buttonAction: 'contact',
    icon: <Zap className="w-8 h-8" />,
    features: [
      'Dedicated monthly hours',
      'Priority support',
      'Strategic planning sessions',
      'Implementation oversight',
      'Performance optimization',
      'Regular progress reviews',
      'Direct access to expertise',
    ],
  },
];

export default function ServicesPaymentPage() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showScheduling, setShowScheduling] = useState(false);

  const handleServiceAction = (service: Service) => {
    if (service.buttonAction === 'payment' && service.stripePriceId) {
      window.location.href = service.stripePriceId;
    } else if (service.buttonAction === 'schedule') {
      setShowScheduling(true);
    } else if (service.buttonAction === 'contact') {
      setShowQuoteForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI Services & Pricing
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the service that fits your needs or request a custom quote for larger projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className={`relative bg-slate-800 rounded-2xl border-2 ${
                  service.popular ? 'border-cyan-500' : 'border-slate-700'
                } p-8 transition-transform hover:scale-105`}
              >
                {service.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-xl">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl mb-4">
                    <div className="text-white">{service.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <div className="flex items-baseline min-h-[4rem]">
                    {service.price === null ? (
                      <span className="text-3xl font-bold text-white">{service.priceLabel}</span>
                    ) : service.price === 0 ? (
                      <span className="text-5xl font-bold text-cyan-400">{service.priceLabel}</span>
                    ) : (
                      <>
                        <span className="text-5xl font-bold text-white">${service.price.toLocaleString()}</span>
                        <span className="text-gray-400 ml-2">one-time</span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleServiceAction(service)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all mb-6 flex items-center justify-center ${
                    service.popular
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  {service.buttonText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>

                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {!showQuoteForm ? (
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/30 rounded-2xl p-8 text-center">
              <DollarSign className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Solution?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Large projects, ongoing engagements, or specialized AI implementations? Request a custom quote tailored to your specific needs.
              </p>
              <button
                onClick={() => setShowQuoteForm(true)}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all inline-flex items-center"
              >
                Request Custom Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          ) : (
            <CustomQuoteForm onClose={() => setShowQuoteForm(false)} />
          )}

          <div className="mt-16 bg-slate-800 rounded-2xl border border-slate-700 p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FileText className="w-6 h-6 text-cyan-400 mr-3" />
              Enterprise & Custom Projects
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                For enterprise clients and large-scale custom projects, we use <strong className="text-white">Stripe Invoicing</strong> to provide flexible payment terms:
              </p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>Milestone-based payments for phased implementations</li>
                <li>Net 30/60/90 payment terms available</li>
                <li>Detailed line-item invoicing</li>
                <li>Purchase order support</li>
                <li>Multiple payment methods accepted</li>
              </ul>
              <p className="text-gray-300">
                After discussing your project, you'll receive a detailed proposal and custom invoice sent securely through Stripe. All major credit cards, ACH transfers, and wire transfers accepted.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">All payments are secured by Stripe</p>
            <p className="text-gray-500 text-sm">
              Questions about pricing or services? <a href="/#contact" className="text-cyan-400 hover:text-cyan-300">Contact us</a>
            </p>
          </div>
        </div>
      </div>
      <SocialFooter />
      <SchedulingModal
        isOpen={showScheduling}
        onClose={() => setShowScheduling(false)}
      />
    </div>
  );
}

function CustomQuoteForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-quote-request`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send quote request');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: '',
      });

      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting quote request:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Request Custom Quote</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      {submitStatus === 'success' ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Quote Request Sent!</h3>
          <p className="text-gray-300">We'll get back to you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Acme Corp"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                Project Type *
              </label>
              <select
                id="projectType"
                required
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Select...</option>
                <option value="ai-strategy">AI Strategy Development</option>
                <option value="implementation">AI Implementation</option>
                <option value="mlops">MLOps Infrastructure</option>
                <option value="custom-solution">Custom AI Solution</option>
                <option value="training">Training & Consultation</option>
                <option value="ongoing-support">Ongoing Support</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                Budget Range
              </label>
              <select
                id="budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Select...</option>
                <option value="under-10k">Under $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="over-100k">Over $100,000</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
              Timeline *
            </label>
            <select
              id="timeline"
              required
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select...</option>
              <option value="urgent">Urgent (ASAP)</option>
              <option value="1-2-months">1-2 months</option>
              <option value="3-6-months">3-6 months</option>
              <option value="6-12-months">6-12 months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Project Description *
            </label>
            <textarea
              id="description"
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Tell us about your project, goals, and specific requirements..."
            />
          </div>

          {submitStatus === 'error' && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
              Failed to send quote request. Please try again or contact us directly.
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Submit Request'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
