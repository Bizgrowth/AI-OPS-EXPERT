import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  sender_name: string;
  sender_role: 'client' | 'team' | 'admin';
  message: string;
  created_at: string;
  is_admin: boolean;
}

export default function ClientChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadUserAndMessages();
    subscribeToMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadUserAndMessages = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setUserEmail(user.email || '');
    setUserId(user.id);

    const { data: profile } = await supabase
      .from('clients_profile')
      .select('full_name')
      .eq('user_id', user.id)
      .maybeSingle();

    if (profile) {
      setUserName(profile.full_name);
    }

    const { data: messagesData } = await supabase
      .from('project_chat_messages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (messagesData) {
      setMessages(messagesData.map(msg => ({
        id: msg.id,
        sender_name: msg.sender_name,
        sender_role: msg.is_admin ? 'admin' : 'client',
        message: msg.message,
        created_at: msg.created_at,
        is_admin: msg.is_admin,
      })));
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'project_chat_messages',
        },
        (payload) => {
          const newMsg = payload.new as any;
          setMessages((prev) => [
            ...prev,
            {
              id: newMsg.id,
              sender_name: newMsg.sender_name,
              sender_role: newMsg.is_admin ? 'admin' : 'client',
              message: newMsg.message,
              created_at: newMsg.created_at,
              is_admin: newMsg.is_admin,
            },
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);

    try {
      const { error } = await supabase
        .from('project_chat_messages')
        .insert({
          user_id: userId,
          client_email: userEmail,
          sender_email: userEmail,
          sender_name: userName || 'Client',
          message: newMessage.trim(),
          is_admin: false,
        });

      if (error) throw error;

      try {
        const emailApiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-chat-notification`;
        await fetch(emailApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            senderName: userName || 'Client',
            senderEmail: userEmail,
            message: newMessage.trim(),
          }),
        });
      } catch (emailErr) {
        console.error('Chat notification email failed (non-blocking):', emailErr);
      }

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } else if (days === 1) {
      return 'Yesterday ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } else if (days < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' }) + ' ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-slate-800/50 border border-slate-700 rounded-lg">
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">Project Communication</h3>
        <p className="text-sm text-gray-400">Chat directly with the AI Ops Expert team</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-cyan-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">No messages yet</h4>
            <p className="text-gray-400 text-sm max-w-xs">
              Start a conversation with our team. We typically respond within a few hours.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.is_admin ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  msg.is_admin
                    ? 'bg-slate-700 text-white'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold">
                    {msg.sender_name}
                  </span>
                  {msg.is_admin && (
                    <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded">
                      Team
                    </span>
                  )}
                </div>
                <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                <p className="text-xs opacity-70 mt-1">{formatTime(msg.created_at)}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700">
        <div className="flex gap-2">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={sending}
            className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
          />
          <Button
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          >
            {sending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Messages are monitored during business hours. We'll respond as soon as possible.
        </p>
      </form>
    </div>
  );
}
