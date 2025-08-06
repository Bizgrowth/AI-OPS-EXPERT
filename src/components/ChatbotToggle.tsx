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
      {/* Floating Chat Button */}
      <button
        onClick={toggleChatbot}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 hover:scale-110 ${
          isOpen ? 'rotate-180' : ''
        }`}
        title="Chat with AI Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chatbot Component */}
      <Chatbot isOpen={isOpen} onToggle={toggleChatbot} />

      {/* Notification Badge (optional) */}
      {!isOpen && (
        <div className="fixed bottom-16 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse z-30">
          Ask me anything!
        </div>
      )}
    </>
  );
};

export default ChatbotToggle;