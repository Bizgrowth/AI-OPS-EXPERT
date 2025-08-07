import React, { useState, useRef } from 'react';
import { Upload, File, Trash2, Eye, EyeOff, Plus, X } from 'lucide-react';
import { SupabaseKnowledgeManager, KnowledgeDocument, supabase } from '../utils/supabaseKnowledge';

interface KnowledgeUploaderProps {
  isOpen: boolean;
  onClose: () => void;
}

const KnowledgeUploaderComponent: React.FC<KnowledgeUploaderProps> = ({ isOpen, onClose }) => {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [isPrivate, setIsPrivate] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'General',
    'Business Background',
    'AI Solutions',
    'Pricing',
    'Client Success',
    'Technical Expertise',
    'Consultation Process',
    'Case Studies',
    'Implementation',
    'Other'
  ];

  // Load documents on component mount
  React.useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      if (!supabase) {
        console.warn('Supabase not configured. Please add your Supabase credentials.');
        return;
      }
      if (!supabase) {
        console.warn('Supabase not configured. Please add your Supabase credentials.');
        return;
      }
      const docs = await SupabaseKnowledgeManager.getAllDocuments(true); // Include private docs for admin
      setDocuments(docs);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Validate file types
    const allowedTypes = ['.txt', '.md'];
    const invalidFiles = Array.from(files).filter(file => {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      return !allowedTypes.includes(extension);
    });

    if (invalidFiles.length > 0) {
      alert(`Only text files (.txt, .md) are supported. Invalid files: ${invalidFiles.map(f => f.name).join(', ')}`);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }
    setIsUploading(true);
    
    try {
      for (const file of Array.from(files)) {
        // Read file content
        const content = await readFileContent(file);
        
        if (content) {
          await SupabaseKnowledgeManager.uploadDocument(
            file.name,
            content,
            selectedCategory,
            isPrivate
          );
        }
      }
      
      // Refresh the documents list
      await loadDocuments();
      
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const handleDeleteDocument = async (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      const success = await SupabaseKnowledgeManager.deleteDocument(id);
      if (success) {
        await loadDocuments();
      } else {
        alert('Failed to delete document. Please try again.');
      }
    }
  };

  const formatFileSize = (content: string): string => {
    const bytes = new Blob([content]).size;
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
    return Math.round(bytes / (1024 * 1024)) + ' MB';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-600">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Chatbot Knowledge Base</h2>
              <p className="text-white/90">Upload documents to enhance AI responses</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Upload Section */}
          <div className="bg-slate-700 rounded-xl p-6 mb-6 border border-slate-600">
            <h3 className="text-xl font-semibold text-white mb-4">Upload New Documents</h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="rounded border-slate-500 bg-slate-600 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span className="text-sm">Private (not visible to users)</span>
                </label>
              </div>
            </div>

            <div className="border-2 border-dashed border-slate-500 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".txt,.md"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              
              <p className="text-gray-300 mb-4">
                Drop files here or click to upload
              </p>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Select Files'}
              </button>
              
              <p className="text-sm text-gray-400 mt-2">
                Supported: .txt, .md (text files only)
              </p>
            </div>
          </div>

          {/* Documents List */}
          <div className="bg-slate-700 rounded-xl p-6 border border-slate-600">
            <h3 className="text-xl font-semibold text-white mb-4">
              Knowledge Base Documents ({documents.length})
            </h3>
            
            {isLoading ? (
              <div className="text-center py-8 text-gray-400">
                <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p>Loading documents...</p>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <File className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No documents uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="bg-slate-600 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <File className="w-5 h-5 text-cyan-400" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">{doc.filename}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{doc.category}</span>
                          <span>{(doc.file_size / 1024).toFixed(1)} KB</span>
                          <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {doc.isPrivate ? (
                        <EyeOff className="w-4 h-4 text-gray-400" title="Private" />
                      ) : (
                        <Eye className="w-4 h-4 text-green-400" title="Public" />
                      )}
                      
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-slate-500 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-blue-900/30 border border-blue-700 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-2">How it works:</h4>
            <ul className="text-sm text-blue-300 space-y-1">
              <li>• 🔒 Upload private documents stored securely in the database</li>
              <li>• 🤖 Visitors never see these documents, but the chatbot becomes much smarter</li>
              <li>• 📚 The AI automatically searches and uses this knowledge to answer questions</li>
              <li>• 🎯 Perfect for detailed pricing, processes, case studies, and internal info</li>
              <li>• 🔐 All documents stored securely in your Supabase database</li>
              <li>• 🌐 Access from anywhere - not tied to a single device</li>
            </ul>
            
            <div className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded-lg">
              <p className="text-green-300 text-sm font-medium">
                💡 <strong>Database Storage:</strong> All documents are now stored in your Supabase database, 
                making them accessible from anywhere while keeping them completely private from website visitors. 
                and FAQ documents. Your chatbot will become incredibly knowledgeable while keeping 
                sensitive information completely private!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeUploaderComponent;