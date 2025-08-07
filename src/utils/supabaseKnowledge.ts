import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kenofrqgfchujhjdinmg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export interface KnowledgeDocument {
  id: string;
  filename: string;
  content: string;
  category: string;
  keywords: string[];
  is_private: boolean;
  file_size: number;
  created_at: string;
  updated_at: string;
}

export interface ChatbotConversation {
  id: string;
  session_id: string;
  user_message: string;
  bot_response: string;
  knowledge_used: any;
  created_at: string;
}

export class SupabaseKnowledgeManager {
  // Upload a document to the database
  static async uploadDocument(
    filename: string,
    content: string,
    category: string,
    isPrivate: boolean = true
  ): Promise<KnowledgeDocument | null> {
    try {
      if (!supabase) {
        console.error('Supabase not configured');
        return null;
      }
      
      const keywords = this.extractKeywords(content);
      const fileSize = new Blob([content]).size;

      const { data, error } = await supabase
        .from('knowledge_documents')
        .insert({
          filename,
          content,
          category,
          keywords,
          is_private: isPrivate,
          file_size: fileSize
        })
        .select()
        .single();

      if (error) {
        console.error('Error uploading document:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    }
  }

  // Get all documents (respects privacy settings)
  static async getAllDocuments(includePrivate: boolean = false): Promise<KnowledgeDocument[]> {
    try {
      let query = supabase.from('knowledge_documents').select('*');
      
      if (!includePrivate) {
        query = query.eq('is_private', false);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching documents:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Fetch failed:', error);
      return [];
    }
  }

  // Search documents by query
  static async searchDocuments(query: string, includePrivate: boolean = true): Promise<KnowledgeDocument[]> {
    try {
      const searchTerms = query.toLowerCase().split(' ');
      
      let dbQuery = supabase.from('knowledge_documents').select('*');
      
      if (!includePrivate) {
        dbQuery = dbQuery.eq('is_private', false);
      }

      const { data, error } = await dbQuery;

      if (error) {
        console.error('Error searching documents:', error);
        return [];
      }

      // Filter results based on content and keywords
      const filteredResults = (data || []).filter(doc => {
        const searchableText = `${doc.filename} ${doc.content} ${doc.keywords.join(' ')}`.toLowerCase();
        return searchTerms.some(term => searchableText.includes(term));
      });

      return filteredResults;
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  }

  // Delete a document
  static async deleteDocument(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('knowledge_documents')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting document:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Delete failed:', error);
      return false;
    }
  }

  // Get documents by category
  static async getDocumentsByCategory(category: string, includePrivate: boolean = true): Promise<KnowledgeDocument[]> {
    try {
      let query = supabase
        .from('knowledge_documents')
        .select('*')
        .eq('category', category);
      
      if (!includePrivate) {
        query = query.eq('is_private', false);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching documents by category:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Category fetch failed:', error);
      return [];
    }
  }

  // Log chatbot conversation
  static async logConversation(
    sessionId: string,
    userMessage: string,
    botResponse: string,
    knowledgeUsed: any = {}
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('chatbot_conversations')
        .insert({
          session_id: sessionId,
          user_message: userMessage,
          bot_response: botResponse,
          knowledge_used: knowledgeUsed
        });

      if (error) {
        console.error('Error logging conversation:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Conversation logging failed:', error);
      return false;
    }
  }

  // Extract keywords from content
  private static extractKeywords(content: string): string[] {
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    // Get unique words and return top 20 most common
    const wordCount = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .map(([word]) => word);
  }
}

// Enhanced search with private knowledge for chatbot
export const searchKnowledgeDatabase = async (query: string): Promise<{
  documents: KnowledgeDocument[];
  response: string;
}> => {
  try {
    // Search both public and private documents for chatbot
    const documents = await SupabaseKnowledgeManager.searchDocuments(query, true);
    
    if (documents.length > 0) {
      const relevantDoc = documents[0];
      const snippet = relevantDoc.content.substring(0, 300);
      
      return {
        documents,
        response: `Based on my knowledge base: ${snippet}...`
      };
    }
    
    return {
      documents: [],
      response: ''
    };
  } catch (error) {
    console.error('Knowledge search failed:', error);
    return {
      documents: [],
      response: ''
    };
  }
};