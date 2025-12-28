import { supabase } from '../lib/supabase';

export interface KnowledgeItem {
  id: string;
  category: string;
  topic: string;
  content: string;
  keywords: string[];
  is_active: boolean;
  priority: number;
}

export const searchKnowledgeBase = async (query: string): Promise<KnowledgeItem[]> => {
  try {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);

    const { data, error } = await supabase
      .from('chatbot_knowledge')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: false });

    if (error) {
      console.error('Error fetching knowledge:', error);
      return [];
    }

    if (!data) return [];

    const scoredResults = data.map(item => {
      let score = 0;
      const searchableText = `${item.topic} ${item.content} ${item.category} ${item.keywords.join(' ')}`.toLowerCase();

      searchTerms.forEach(term => {
        if (item.category.toLowerCase().includes(term)) score += 10;
        if (item.topic.toLowerCase().includes(term)) score += 8;
        if (item.keywords.some((k: string) => k.toLowerCase().includes(term))) score += 6;
        if (item.content.toLowerCase().includes(term)) score += 2;
      });

      return { ...item, score };
    });

    return scoredResults
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score || b.priority - a.priority);
  } catch (error) {
    console.error('Error in searchKnowledgeBase:', error);
    return [];
  }
};

export const logConversation = async (
  sessionId: string,
  userMessage: string,
  botResponse: string,
  knowledgeUsed: string | null = null
) => {
  try {
    const { error } = await supabase
      .from('chatbot_conversations')
      .insert([{
        session_id: sessionId,
        user_message: userMessage,
        bot_response: botResponse,
        knowledge_used: knowledgeUsed ? { id: knowledgeUsed } : null,
        response_time_ms: 0
      }]);

    if (error) {
      console.error('Error logging conversation:', error);
    }
  } catch (error) {
    console.error('Error in logConversation:', error);
  }
};

export const getCategoryKnowledge = async (category: string): Promise<KnowledgeItem | null> => {
  try {
    const { data, error } = await supabase
      .from('chatbot_knowledge')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('priority', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching category knowledge:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getCategoryKnowledge:', error);
    return null;
  }
};
