import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import Chatbot from './Chatbot';

const ChatbotToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Single Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleChatbot}
          className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center hover:scale-110"
          title="Chat with ARIA - AI Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Chatbot Component */}
      <Chatbot isOpen={isOpen} onToggle={toggleChatbot} />
    </>
  );
};

export default ChatbotToggle;