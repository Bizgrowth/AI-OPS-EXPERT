import React from 'react';
import { Calendar, X, ExternalLink } from 'lucide-react';

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SchedulingModal: React.FC<SchedulingModalProps> = ({ isOpen, onClose }) => {
  const openCalendly = () => {
    window.open('https://calendly.com/dschley-aiopsexpert/30min', '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full border border-slate-600 my-8">
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-4 sm:p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg flex-shrink-0">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-2xl font-bold text-white truncate">Schedule AI Strategy Session</h2>
              <p className="text-white/90 text-xs sm:text-base hidden sm:block">Book your free 30-minute consultation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all flex-shrink-0 ml-2"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-8">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 px-2">Let's Transform Your Business with AI</h3>

            <p className="text-gray-300 mb-4 sm:mb-6 max-w-lg mx-auto text-sm sm:text-base px-2">
              Schedule a free 30-minute consultation to discuss your AI strategy, automation opportunities,
              and how we can help drive measurable results for your organization.
            </p>

            <div className="bg-slate-700/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 text-left max-w-md mx-auto">
              <h4 className="text-cyan-400 font-semibold mb-3 text-sm sm:text-base">What to Expect:</h4>
              <ul className="space-y-2 text-gray-300 text-xs sm:text-sm">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">✓</span>
                  <span>30-minute one-on-one video call</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">✓</span>
                  <span>Discussion of your specific business challenges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">✓</span>
                  <span>Personalized AI strategy recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">✓</span>
                  <span>Q&A with Daniel Schley, AI Solutions Expert</span>
                </li>
              </ul>
            </div>

            <button
              onClick={openCalendly}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all inline-flex items-center space-x-2 text-base sm:text-lg"
            >
              <span>Choose Your Time</span>
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <p className="text-gray-400 text-xs sm:text-sm mt-3 sm:mt-4 px-2">
              You'll be able to select a time that works best for you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulingModal;