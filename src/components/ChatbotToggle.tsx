import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import Chatbot from './Chatbot';

const ChatbotToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Pulsing ring animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full animate-ping opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full animate-pulse opacity-30 pointer-events-none"></div>
        
        <button
          onClick={toggleChatbot}
          className={`relative w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 flex items-center justify-center hover:scale-125 group ${
            isOpen ? 'rotate-180 scale-110' : 'animate-bounce'
          }`}
          title="Chat with ARIA - AI Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          )}
        </button>
      </div>

      {/* Chatbot Component */}
      <Chatbot isOpen={isOpen} onToggle={toggleChatbot} />

      {/* Animated Notification Badge */}
      {!isOpen && (
        <div className="fixed bottom-16 right-2 z-30">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-3 py-2 rounded-full animate-bounce shadow-lg border-2 border-white/20 backdrop-blur-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="font-medium">Hi! I'm ARIA 🤖</span>
            </div>
          </div>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-1 right-4 w-3 h-3 bg-gradient-to-br from-pink-500 to-rose-500 rotate-45 border-r border-b border-white/20"></div>
        </div>
      )}
    </>
  );
};

export default ChatbotToggle;