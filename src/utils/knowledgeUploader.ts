// Knowledge Base Upload Utility
// This allows you to upload documents that will enhance the chatbot's knowledge

export interface DocumentUpload {
  id: string;
  filename: string;
  content: string;
  category: string;
  uploadDate: Date;
  keywords: string[];
  isPrivate: boolean;
}

export class KnowledgeUploader {
  private static readonly STORAGE_KEY = 'chatbot_knowledge_base';
  
  // Upload a document to the knowledge base
  static uploadDocument(file: File, category: string, isPrivate: boolean = true): Promise<DocumentUpload> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const document: DocumentUpload = {
            id: Date.now().toString(),
            filename: file.name,
            content: content,
            category: category,
            uploadDate: new Date(),
            keywords: this.extractKeywords(content),
            isPrivate: isPrivate
          };
          
          this.saveDocument(document);
          resolve(document);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
  
  // Extract keywords from document content
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
  
  // Save document to local storage
  private static saveDocument(document: DocumentUpload): void {
    const existing = this.getAllDocuments();
    existing.push(document);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existing));
  }
  
  // Get all uploaded documents
  static getAllDocuments(): DocumentUpload[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];
    
    try {
      return JSON.parse(stored).map((doc: any) => ({
        ...doc,
        uploadDate: new Date(doc.uploadDate)
      }));
    } catch {
      return [];
    }
  }
  
  // Search through uploaded documents
  static searchDocuments(query: string): DocumentUpload[] {
    const documents = this.getAllDocuments();
    const searchTerms = query.toLowerCase().split(' ');
    
    return documents.filter(doc => {
      const searchableText = `${doc.filename} ${doc.content} ${doc.keywords.join(' ')}`.toLowerCase();
      return searchTerms.some(term => searchableText.includes(term));
    });
  }
  
  // Delete a document
  static deleteDocument(id: string): void {
    const documents = this.getAllDocuments().filter(doc => doc.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(documents));
  }
  
  // Get documents by category
  static getDocumentsByCategory(category: string): DocumentUpload[] {
    return this.getAllDocuments().filter(doc => 
      doc.category.toLowerCase() === category.toLowerCase()
    );
  }
}

// Integration with chatbot
export const enhanceChatbotResponse = (userMessage: string, baseResponse: string): string => {
  const relevantDocs = KnowledgeUploader.searchDocuments(userMessage);
  
  if (relevantDocs.length > 0) {
    const doc = relevantDocs[0];
    
    // Only add if it's truly relevant and adds value
    if (doc.content.length > 100) {
      const additionalInfo = doc.content.substring(0, 250) + '...';
      return `${baseResponse}\n\n📚 **From Daniel's Knowledge Base:**\n${additionalInfo}\n\n💡 *This comes from private documentation to give you the most accurate information!*`;
    }
  }
  
  return baseResponse;
};