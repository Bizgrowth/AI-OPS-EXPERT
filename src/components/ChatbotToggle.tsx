import React, { useState } from 'react';
import { X, Settings } from 'lucide-react';
import Chatbot from './Chatbot';
import KnowledgeUploaderComponent from './KnowledgeUploader';

const ChatbotToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showKnowledgeUploader, setShowKnowledgeUploader] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Robot SVG Component based on the provided design
  const RobotIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" className="w-12 h-12">
      {/* Robot Body */}
      <ellipse cx="24" cy="32" rx="16" ry="12" fill="#E8F4FD" stroke="#B3D9F2" strokeWidth="1"/>
      
      {/* Robot Head */}
      <circle cx="24" cy="18" r="12" fill="#E8F4FD" stroke="#B3D9F2" strokeWidth="1"/>
      
      {/* Robot Face Screen */}
      <ellipse cx="24" cy="18" rx="8" ry="7" fill="#2C3E50"/>
      
      {/* Robot Eyes */}
      <circle cx="20" cy="16" r="2" fill="#F1C40F"/>
      <circle cx="28" cy="16" r="2" fill="#F1C40F"/>
      
      {/* Robot Smile */}
      <path d="M 19 21 Q 24 24 29 21" stroke="#F1C40F" strokeWidth="2" fill="none" strokeLinecap="round"/>
      
      {/* Robot Ears/Antennas */}
      <rect x="8" y="12" width="4" height="8" rx="2" fill="#3498DB"/>
      <rect x="36" y="12" width="4" height="8" rx="2" fill="#3498DB"/>
      
      {/* Robot Arms */}
      <ellipse cx="8" cy="28" rx="3" ry="8" fill="#E8F4FD" stroke="#B3D9F2" strokeWidth="1"/>
      <ellipse cx="40" cy="28" rx="3" ry="8" fill="#E8F4FD" stroke="#B3D9F2" strokeWidth="1"/>
      
      {/* Robot Chest Button */}
      <circle cx="24" cy="30" r="2" fill="#3498DB"/>
      
      {/* Robot Head Top */}
      <rect x="20" y="8" width="8" height="4" rx="2" fill="#3498DB"/>
    </svg>
  );

  return (
    <>
      {/* Single Robot Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Knowledge Upload Button (Admin) */}
        <button
          onClick={() => setShowKnowledgeUploader(true)}
          className="absolute -top-16 right-0 bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-slate-600"
          title="Upload Knowledge Base Documents"
        >
          <Settings className="w-5 h-5" />
        </button>
        
        <button
          onClick={toggleChatbot}
          className="relative bg-white rounded-full shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center hover:scale-110 p-2 border-2 border-blue-100"
          title="Chat with ARIA - AI Assistant"
        >
          {isOpen ? (
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <X className="w-6 h-6 text-white" />
            </div>
          ) : (
            <div className="relative">
              <RobotIcon />
              {/* Floating "Hello!" bubble */}
              <div className="absolute -top-8 -left-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-medium animate-bounce">
                Hello!
              </div>
            </div>
          )}
        </button>
      </div>

      {/* Chatbot Component */}
      <Chatbot isOpen={isOpen} onToggle={toggleChatbot} />
      
      {/* Knowledge Uploader */}
      <KnowledgeUploaderComponent 
        isOpen={showKnowledgeUploader} 
        onClose={() => setShowKnowledgeUploader(false)} 
      />
    </>
  );
};

export default ChatbotToggle;