import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Daniel's AI assistant. I can help answer questions about AI operations, services, pricing, and implementation. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Pricing questions
    if (message.includes('price') || message.includes('cost') || message.includes('pricing') || message.includes('how much')) {
      return "Great question! My AI solutions are priced based on complexity and value delivered:\n\n• AI Strategy & Implementation: $2,500-$15,000\n• Process Automation: $1,500-$8,000\n• Custom AI Development: $5,000-$25,000\n\nMost clients see 300-500% ROI within 90 days. Would you like to schedule a free consultation to get a personalized quote?";
    }
    
    // Services questions
    if (message.includes('service') || message.includes('what do you do') || message.includes('help')) {
      return "I specialize in 8 core AI solution areas:\n\n1. AI Strategy & Implementation\n2. Intelligent Process Automation\n3. AI Analytics & Insights\n4. AI Customer Experience Systems\n5. AI-Enhanced Web Solutions\n6. Custom AI Development\n7. AI Performance Optimization\n8. AI-Powered Workflow Optimization\n\nWhich area interests you most?";
    }
    
    // Timeline questions
    if (message.includes('time') || message.includes('long') || message.includes('timeline') || message.includes('when')) {
      return "Implementation timelines vary by solution:\n\n• Simple AI tools: 1-3 days\n• Process automation: 1-2 weeks\n• Custom AI systems: 2-8 weeks\n• Full AI transformation: 2-3 months\n\nMost clients start seeing results within the first week! What type of solution are you considering?";
    }
    
    // ROI questions
    if (message.includes('roi') || message.includes('return') || message.includes('results') || message.includes('benefit')) {
      return "My clients typically see impressive results:\n\n• 70% average process automation\n• 35+ hours saved weekly\n• 90% error reduction\n• 300-500% ROI within 90 days\n\nReal example: One client saved $50K in 6 months through AI inventory optimization. What's your biggest operational challenge?";
    }
    
    // Industry questions
    if (message.includes('industry') || message.includes('business') || message.includes('company')) {
      return "I work with businesses across all industries:\n\n• Manufacturing & Supply Chain\n• Professional Services\n• E-commerce & Retail\n• Healthcare & Medical\n• Real Estate & Property\n• Technology & SaaS\n\nEvery solution is customized for your specific industry needs. What industry are you in?";
    }
    
    // Getting started questions
    if (message.includes('start') || message.includes('begin') || message.includes('first step') || message.includes('consultation')) {
      return "Getting started is easy! Here's the process:\n\n1. **Free 60-minute AI Strategy Session** - We'll assess your needs\n2. **Custom AI Roadmap** - I'll create your implementation plan\n3. **Solution Development** - Build and deploy your AI systems\n4. **Training & Support** - Ensure your team is ready\n\nReady to schedule your free consultation? Just say 'book consultation' or email dschley@aiopsexpert.com";
    }
    
    // Contact/booking
    if (message.includes('book') || message.includes('schedule') || message.includes('consultation') || message.includes('call') || message.includes('meeting')) {
      return "Perfect! I'd love to discuss your AI transformation. Here's how to book:\n\n📧 **Email:** dschley@aiopsexpert.com\n📞 **Phone:** 904-955-3905\n\n**What to expect:**\n• 60-minute strategy session\n• Custom AI assessment\n• Personalized roadmap\n• No-obligation consultation\n\nI personally respond within 24 hours. What's the best way to reach you?";
    }
    
    // About Daniel
    if (message.includes('daniel') || message.includes('about you') || message.includes('experience') || message.includes('background')) {
      return "Daniel Schley is an AI Operations Expert with 20+ years of business operations experience:\n\n• Former COO with proven scale results\n• Managed $1B+ portfolios\n• 100+ successful AI implementations\n• Specialized in 90-day ROI delivery\n\nHe's helped companies achieve 200% YoY growth and $50M+ in value creation. His unique combination of operations expertise and AI knowledge delivers real results, not just technology.";
    }
    
    // AI concerns
    if (message.includes('impersonal') || message.includes('human') || message.includes('personal') || message.includes('cold')) {
      return "That's the #1 concern I hear! Here's the truth:\n\nAI doesn't make businesses impersonal - it creates MORE time for personal relationships.\n\n**Real Example:** Jennifer's agency gained 12 hours weekly through AI automation, allowing 34% revenue growth by focusing on client strategy instead of admin work.\n\n**The key:** AI handles the mundane, humans handle the relationships. Would you like to see how this works for your business?";
    }
    
    // Default responses
    const defaultResponses = [
      "That's a great question! I specialize in AI operations and can help with strategy, implementation, automation, and custom solutions. What specific challenge are you facing?",
      "I'd be happy to help! My expertise covers AI strategy, process automation, and custom development. What aspect of AI operations interests you most?",
      "Interesting question! With 20+ years of operations experience and 100+ AI implementations, I can provide detailed insights. Could you be more specific about what you'd like to know?",
      "Thanks for asking! I help businesses transform their operations with AI. Whether it's automation, analytics, or custom solutions, I'd love to discuss your needs. What's your biggest operational challenge?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // 1-3 seconds delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What are your AI services?",
    "How much does it cost?",
    "How long does implementation take?",
    "What ROI can I expect?",
    "Book a consultation"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-slate-800 rounded-2xl shadow-2xl border border-slate-600 flex flex-col z-50 animate-scale-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Operations Assistant</h3>
            <p className="text-white/80 text-sm">Ask me anything about AI services</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-cyan-500' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700 text-gray-100'
              }`}>
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-700 p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-gray-400 text-xs mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs bg-slate-700 text-gray-300 px-3 py-1 rounded-full hover:bg-slate-600 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-slate-600">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about AI services, pricing, ROI..."
            className="flex-1 bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-2 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;