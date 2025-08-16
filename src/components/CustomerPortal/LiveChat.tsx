import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { Send, Paperclip, Image, FileText, User, Bot } from 'lucide-react';

interface ChatMessage {
  id: string;
  message: string;
  sender_email: string;
  sender_name: string;
  is_admin: boolean;
  attachment_url?: string;
  attachment_type?: string;
  created_at: string;
}

interface LiveChatProps {
  userEmail: string;
  userName: string;
}

const LiveChat: React.FC<LiveChatProps> = ({ userEmail, userName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMessages();
    subscribeToMessages();
  }, [userEmail]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('project_chat_messages')
        .select('*')
        .eq('client_email', userEmail)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToMessages = () => {
    const subscription = supabase
      .channel('project_chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'project_chat_messages',
          filter: `client_email=eq.${userEmail}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as ChatMessage]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from('project_chat_messages')
        .insert({
          client_email: userEmail,
          sender_email: userEmail,
          sender_name: userName,
          message: newMessage.trim(),
          is_admin: false
        });

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `chat-attachments/${userEmail}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('project-files')
        .getPublicUrl(filePath);

      // Send message with attachment
      const { error } = await supabase
        .from('project_chat_messages')
        .insert({
          client_email: userEmail,
          sender_email: userEmail,
          sender_name: userName,
          message: `Shared a file: ${file.name}`,
          is_admin: false,
          attachment_url: publicUrl,
          attachment_type: file.type
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderAttachment = (message: ChatMessage) => {
    if (!message.attachment_url) return null;

    const isImage = message.attachment_type?.startsWith('image/');
    
    return (
      <div className="mt-2">
        {isImage ? (
          <img 
            src={message.attachment_url} 
            alt="Attachment" 
            className="max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => window.open(message.attachment_url, '_blank')}
          />
        ) : (
          <a 
            href={message.attachment_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-500 px-3 py-2 rounded-lg transition-colors max-w-xs"
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm truncate">View Attachment</span>
          </a>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-600 h-[600px] flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-600">
        <h3 className="text-lg font-semibold text-white">Project Communication</h3>
        <p className="text-sm text-gray-400">Direct line to Daniel for project updates and questions</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">Start a conversation about your project</p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => {
              const showDate = index === 0 || 
                formatDate(message.created_at) !== formatDate(messages[index - 1].created_at);
              
              return (
                <div key={message.id}>
                  {showDate && (
                    <div className="text-center py-2">
                      <span className="bg-slate-700 text-gray-400 px-3 py-1 rounded-full text-xs">
                        {formatDate(message.created_at)}
                      </span>
                    </div>
                  )}
                  
                  <div className={`flex ${message.is_admin ? 'justify-start' : 'justify-end'}`}>
                    <div className={`flex items-start space-x-2 max-w-[70%] ${message.is_admin ? '' : 'flex-row-reverse space-x-reverse'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.is_admin 
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600' 
                          : 'bg-slate-600'
                      }`}>
                        {message.is_admin ? (
                          <Bot className="w-4 h-4 text-white" />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>
                      
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.is_admin 
                          ? 'bg-slate-700 text-white' 
                          : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                        {renderAttachment(message)}
                        <p className={`text-xs mt-1 ${
                          message.is_admin ? 'text-gray-400' : 'text-white/70'
                        }`}>
                          {formatTime(message.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-slate-600">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || sending}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-3 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;