import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Zap, Heart, Star } from 'lucide-react';
import { searchKnowledge, privateKnowledge } from '../data/privateKnowledge';
import { searchKnowledgeDatabase, SupabaseKnowledgeManager } from '../utils/supabaseKnowledge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  emotion?: 'happy' | 'thinking' | 'excited' | 'helpful';
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm ARIA, Daniel's AI Operations Assistant! 🤖✨ I'm here to help you discover how AI can transform your business. What would you like to explore today?",
      sender: 'bot',
      timestamp: new Date(),
      emotion: 'happy'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [robotEmotion, setRobotEmotion] = useState<'idle' | 'happy' | 'thinking' | 'excited' | 'talking'>('happy');
  const [showParticles, setShowParticles] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Robot animation cycle
  useEffect(() => {
    if (!isTyping && robotEmotion !== 'thinking') {
      const emotions: Array<'idle' | 'happy' | 'excited'> = ['idle', 'happy', 'excited'];
      const interval = setInterval(() => {
        setRobotEmotion(emotions[Math.floor(Math.random() * emotions.length)]);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isTyping, robotEmotion]);

  const triggerParticles = () => {
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 2000);
  };

  const getAIResponse = (userMessage: string): { text: string; emotion: 'happy' | 'thinking' | 'excited' | 'helpful' } => {
    const message = userMessage.toLowerCase();
    
    // Search built-in knowledge first
    const knowledgeResults = searchKnowledge(userMessage);
    
    if (knowledgeResults.length > 0) {
      const relevantKnowledge = knowledgeResults[0]; // Use most relevant result
      
      // Extract key information from the knowledge base
      if (relevantKnowledge.category === 'Pricing' && (message.includes('price') || message.includes('cost'))) {
        return {
          text: `💰 Here's detailed pricing information:\n\n${relevantKnowledge.content}\n\n✨ **All solutions include 90-day ROI guarantee!** Ready for a personalized quote? Let's schedule your free consultation! 🚀`,
          emotion: 'excited'
        };
      }
      
      if (relevantKnowledge.category === 'Client Success' && (message.includes('results') || message.includes('case') || message.includes('success'))) {
        return {
          text: `📊 Here are detailed client success stories:\n\n${relevantKnowledge.content}\n\n🎯 **Want similar results for your business?** Book your free AI assessment! 🚀`,
          emotion: 'excited'
        };
      }
      
      if (relevantKnowledge.category === 'Consultation Process' && (message.includes('consultation') || message.includes('session') || message.includes('expect'))) {
        return {
          text: `🎯 Here's what to expect from your AI strategy session:\n\n${relevantKnowledge.content}\n\n📧 Ready to get started? Email: dschley@aiopsexpert.com\n📞 Call: 904-955-3905 ✨`,
          emotion: 'helpful'
        };
      }
      
      if (relevantKnowledge.category === 'AI Solutions' && (message.includes('process') || message.includes('implementation') || message.includes('how'))) {
        return {
          text: `⚡ Here's Daniel's proven AI implementation process:\n\n${relevantKnowledge.content}\n\n🚀 Ready to start your AI transformation? Let's schedule your strategy session! ✨`,
          emotion: 'excited'
        };
      }
    }
    
    // Pricing questions
    if (message.includes('price') || message.includes('cost') || message.includes('pricing') || message.includes('how much')) {
      return {
        text: "💰 Excellent question! Daniel's AI solutions are investment-focused with guaranteed ROI:\n\n🎯 **AI Strategy & Implementation:** $2,500-$15,000\n🤖 **Process Automation:** $1,500-$8,000\n🔧 **Custom AI Development:** $5,000-$25,000\n📊 **AI Analytics & Insights:** $3,000-$12,000\n💬 **AI Customer Experience:** $2,000-$8,000\n🌐 **AI-Enhanced Web Solutions:** $1,500-$10,000\n\n✨ **Most clients see 300-500% ROI within 90 days!** Ready for a personalized quote? Let's schedule your free consultation! 🚀",
        emotion: 'excited'
      };
    }
    
    // Services questions
    if (message.includes('service') || message.includes('what do you do') || message.includes('help')) {
      return {
        text: "🎉 Daniel specializes in 8 powerful AI solution areas:\n\n1. 🧠 **AI Strategy & Implementation** - Comprehensive roadmaps\n2. ⚡ **Intelligent Process Automation** - Smart automation systems\n3. 📈 **AI Analytics & Insights** - Advanced business intelligence\n4. 💬 **AI Customer Experience Systems** - Intelligent support\n5. 🌐 **AI-Enhanced Web Solutions** - Smart websites with AI\n6. 🔧 **Custom AI Development** - Bespoke applications\n7. 🎯 **AI Performance Optimization** - Continuous improvement\n8. 🔄 **AI-Powered Workflow Optimization** - Eliminate bottlenecks\n\n✨ Each solution is custom-built with ongoing support! Which area excites you most? 🤔",
        emotion: 'helpful'
      };
    }
    
    // Timeline questions
    if (message.includes('time') || message.includes('long') || message.includes('timeline') || message.includes('when')) {
      return {
        text: "⏰ Great question! Implementation timelines vary by complexity:\n\n🚀 **Simple AI tools:** 1-3 days\n⚙️ **Process automation:** 1-2 weeks\n🔧 **Custom AI systems:** 2-8 weeks\n🏢 **Full AI transformation:** 2-3 months\n📋 **AI Strategy & Planning:** 1-2 weeks\n\n🎯 **Most clients start seeing results within the first week!** Daniel personally manages every implementation. What type of solution are you considering? 🤖✨",
        emotion: 'excited'
      };
    }
    
    // ROI questions
    if (message.includes('roi') || message.includes('return') || message.includes('results') || message.includes('benefit')) {
      return {
        text: "📊 Daniel's clients achieve incredible results:\n\n🎯 **70% average process automation**\n⏰ **35+ hours saved weekly**\n✅ **90% error reduction**\n💰 **300-500% ROI within 90 days**\n💎 **$50K+ in cost savings** (average client)\n\n🏆 **Real Success Stories:**\n• Manufacturing client: $50K saved in 6 months\n• SaaS company: 70% automation, 60% efficiency boost\n• Marketing agency: 34% revenue increase, 12 hours saved weekly\n\n🤔 What's your biggest operational challenge? Let's solve it with AI! 🚀",
        emotion: 'excited'
      };
    }
    
    // Getting started questions
    if (message.includes('start') || message.includes('begin') || message.includes('first step') || message.includes('consultation')) {
      return {
        text: "🚀 Getting started with Daniel is super easy! Here's the proven process:\n\n1. 🎯 **Free 60-minute AI Strategy Session** - Comprehensive assessment\n2. 📋 **Custom AI Roadmap** - Detailed plan with ROI projections\n3. 🔧 **Solution Development** - Build and deploy your AI systems\n4. 🎓 **Training & Support** - Ensure your team is ready\n5. 📈 **Ongoing Optimization** - Continuous improvement\n\n✨ **Your free consultation includes:**\n• AI readiness assessment\n• Custom strategy roadmap\n• ROI projections\n• Implementation timeline\n• No-obligation discussion\n\n📧 Ready to transform your business? Email: dschley@aiopsexpert.com\n📞 Call: 904-955-3905 🎉",
        emotion: 'helpful'
      };
    }
    
    // About Daniel
    if (message.includes('daniel') || message.includes('about') || message.includes('experience') || message.includes('background')) {
      return {
        text: "👨‍💼 Daniel Schley is an AI Operations Expert with an amazing track record:\n\n🏆 **Experience:**\n• 20+ years business operations leadership\n• Former COO with proven scale results\n• Managed $1B+ portfolios across industries\n• 100+ successful AI implementations\n\n🎯 **Notable Achievements:**\n• Scaled Align Networks: $0 to $265M revenue in 5 years\n• Achieved 12X EBITDA exit to General Atlantic\n• Grew One Call Care: $15M to $75M in under a year\n• Enhanced GO T&T: 50% efficiency, 96% YoY revenue increase\n\n🤖 **AI Expertise:**\n• 90-day ROI delivery specialist\n• $50M+ in client value creation\n• Operations-first AI approach\n• Real results, not just technology! ✨",
        emotion: 'happy'
      };
    }
    
    // Contact/booking
    if (message.includes('book') || message.includes('schedule') || message.includes('consultation') || message.includes('call') || message.includes('meeting')) {
      return {
        text: "🎉 Perfect! Daniel would love to discuss your AI transformation:\n\n📧 **Email:** dschley@aiopsexpert.com\n📞 **Phone:** 904-955-3905\n🌐 **Website:** aiopsexpert.com\n\n✨ **Your free consultation includes:**\n• 60-minute AI strategy session\n• Comprehensive business assessment\n• Custom AI roadmap with ROI projections\n• Implementation timeline\n• Personalized recommendations\n• No-obligation, pressure-free discussion\n\n⏰ **Response time:** Daniel responds within 24 hours\n📅 **Availability:** Usually booked 2-3 weeks out\n\n🚀 What's the best way to reach you? Let's make AI magic happen! ✨",
        emotion: 'excited'
      };
    }
    
    // Default responses with personality
    const defaultResponses = [
      {
        text: "🤖 That's a fantastic question! I specialize in AI operations and love helping with strategy, implementation, and automation. What specific challenge can we solve together? ✨",
        emotion: 'happy' as const
      },
      {
        text: "✨ I'd be thrilled to help! With expertise in AI strategy, process automation, and custom development, there's so much we can explore. What aspect of AI operations interests you most? 🚀",
        emotion: 'excited' as const
      },
      {
        text: "🎯 Interesting question! With 20+ years of operations experience and 100+ AI implementations, I have lots of insights to share. Could you be more specific about what you'd like to know? 🤔",
        emotion: 'helpful' as const
      },
      {
        text: "🌟 Thanks for asking! I help businesses transform with AI - whether it's automation, analytics, or custom solutions. What's your biggest operational challenge? Let's solve it together! 💪",
        emotion: 'happy' as const
      }
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const currentInput = inputText;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentInput,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setRobotEmotion('thinking');

    // Simulate AI thinking time
    setTimeout(() => {
      handleAIResponse(currentInput);
    }, 1500 + Math.random() * 2000);
  };

  const handleAIResponse = async (userInput: string) => {
    try {
      // First try database search for enhanced knowledge
      const dbSearch = await searchKnowledgeDatabase(userInput);
      
      let response;
      if (dbSearch.documents.length > 0) {
        // Use database knowledge for enhanced response
        const relevantDoc = dbSearch.documents[0];
        const snippet = relevantDoc.content.substring(0, 300);
        
        response = {
          text: `📚 Based on my comprehensive knowledge base:\n\n${snippet}...\n\n✨ This information comes from Daniel's private documentation. I have detailed information that can help answer your specific questions! Would you like me to elaborate on any aspect? 🚀`,
          emotion: 'helpful' as const
        };
        
        // Log the conversation with knowledge used
        await SupabaseKnowledgeManager.logConversation(
          'web-session-' + Date.now(),
          userInput,
          response.text,
          { documentUsed: relevantDoc.filename, category: relevantDoc.category }
        );
      } else {
        // Fall back to built-in knowledge
        response = getAIResponse(userInput);
        
        // Log the conversation
        await SupabaseKnowledgeManager.logConversation(
          'web-session-' + Date.now(),
          userInput,
          response.text,
          { source: 'built-in-knowledge' }
        );
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        emotion: response.emotion
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      setRobotEmotion(response.emotion === 'excited' ? 'excited' : 'happy');
      
      if (response.emotion === 'excited') {
        triggerParticles();
      }
    } catch (error) {
      console.error('AI response error:', error);
      
      // Fallback to built-in response
      const response = getAIResponse(userInput);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        emotion: response.emotion
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      setRobotEmotion(response.emotion === 'excited' ? 'excited' : 'happy');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What are your AI services? 🤖",
    "How much does it cost? 💰",
    "How long does it take? ⏰",
    "What ROI can I expect? 📈",
    "Book a consultation 📅"
  ];

  const handleQuickQuestion = (question: string) => {
    const cleanQuestion = question.replace(/[🤖💰⏰📈📅]/g, '').trim();
    setInputText(cleanQuestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  // Robot Avatar Component
  const RobotAvatar = ({ emotion, size = 'normal' }: { emotion: string; size?: 'small' | 'normal' | 'large' }) => {
    const sizeClasses = {
      small: 'w-8 h-8',
      normal: 'w-12 h-12',
      large: 'w-16 h-16'
    };

    return (
      <div className={`${sizeClasses[size]} relative`}>
        {/* Robot Body */}
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
          emotion === 'excited' ? 'animate-bounce' : emotion === 'thinking' ? 'animate-pulse' : ''
        }`}>
          
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/30 to-purple-400/30 animate-pulse"></div>
          
          {/* Robot Face */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Eyes */}
            <div className="flex space-x-1 mb-1">
              <div className={`w-1.5 h-1.5 bg-white rounded-full transition-all duration-300 ${
                emotion === 'thinking' ? 'animate-ping' : emotion === 'excited' ? 'bg-yellow-300' : ''
              }`}></div>
              <div className={`w-1.5 h-1.5 bg-white rounded-full transition-all duration-300 ${
                emotion === 'thinking' ? 'animate-ping delay-100' : emotion === 'excited' ? 'bg-yellow-300' : ''
              }`}></div>
            </div>
            
            {/* Mouth */}
            <div className={`w-2 h-1 rounded-full transition-all duration-300 ${
              emotion === 'happy' || emotion === 'excited' ? 'bg-white' : 
              emotion === 'thinking' ? 'bg-gray-300' : 'bg-white'
            }`}></div>
          </div>
          
          {/* Sparkles for excited state */}
          {emotion === 'excited' && (
            <>
              <Star className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-spin" />
              <Zap className="absolute -bottom-1 -left-1 w-3 h-3 text-yellow-300 animate-bounce" />
            </>
          )}
        </div>
        
        {/* Particles */}
        {showParticles && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-slate-800 rounded-2xl shadow-2xl border border-slate-600 flex flex-col z-50 animate-scale-in overflow-hidden">
      {/* Header with animated robot */}
      <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-t-2xl flex items-center justify-between relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 animate-pulse"></div>
        
        <div className="flex items-center space-x-3 relative z-10">
          <RobotAvatar emotion={robotEmotion} size="normal" />
          <div>
            <h3 className="text-white font-bold text-lg">ARIA 🤖</h3>
            <p className="text-white/90 text-sm font-medium">AI Operations Assistant</p>
            <div className="flex items-center space-x-1 mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-xs">Online & Ready to Help!</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={onToggle}
          className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110 relative z-10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-800 to-slate-900">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
          >
            <div className={`flex items-start space-x-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`flex-shrink-0 ${message.sender === 'user' ? '' : 'animate-bounce'}`}>
                {message.sender === 'user' ? (
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <RobotAvatar emotion={message.emotion || 'happy'} size="small" />
                )}
              </div>
              
              <div className={`p-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'bg-gradient-to-r from-slate-700 to-slate-600 text-gray-100 border border-slate-500 shadow-lg'
              }`}>
                <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                <p className="text-xs opacity-70 mt-2 flex items-center space-x-1">
                  <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {message.sender === 'bot' && message.emotion === 'excited' && (
                    <Heart className="w-3 h-3 text-red-400 animate-pulse" />
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in-up">
            <div className="flex items-start space-x-2">
              <RobotAvatar emotion="thinking" size="small" />
              <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-3 rounded-2xl border border-slate-500 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <span className="text-xs text-gray-400">ARIA is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 bg-slate-900">
          <p className="text-gray-400 text-xs mb-2 font-medium">✨ Quick questions to get started:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs bg-gradient-to-r from-slate-700 to-slate-600 text-gray-300 px-3 py-2 rounded-full hover:from-cyan-500 hover:to-purple-500 hover:text-white transition-all duration-300 border border-slate-600 hover:border-transparent hover:scale-105 shadow-sm"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-slate-600 bg-slate-900">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask ARIA anything about AI services... ✨"
            className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm transition-all duration-300 hover:border-cyan-500/50"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-3 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 shadow-lg"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center justify-center mt-2 space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">Powered by AI • Instant responses</span>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;