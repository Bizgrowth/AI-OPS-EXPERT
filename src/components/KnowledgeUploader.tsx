import React, { useState, useRef } from 'react';
import { Upload, File, Trash2, Eye, EyeOff, Plus, X } from 'lucide-react';
import { KnowledgeUploader, DocumentUpload } from '../utils/knowledgeUploader';

interface KnowledgeUploaderProps {
  isOpen: boolean;
  onClose: () => void;
}

const KnowledgeUploaderComponent: React.FC<KnowledgeUploaderProps> = ({ isOpen, onClose }) => {
  const [documents, setDocuments] = useState<DocumentUpload[]>(KnowledgeUploader.getAllDocuments());
  const [isUploading, setIsUploading] = useState(false);
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    try {
      for (const file of Array.from(files)) {
        // Only allow text files, PDFs, and documents
        if (file.type.startsWith('text/') || 
            file.type === 'application/pdf' || 
            file.type.includes('document')) {
          
          await KnowledgeUploader.uploadDocument(file, selectedCategory, isPrivate);
        }
      }
      
      // Refresh the documents list
      setDocuments(KnowledgeUploader.getAllDocuments());
      
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

  const handleDeleteDocument = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      KnowledgeUploader.deleteDocument(id);
      setDocuments(KnowledgeUploader.getAllDocuments());
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
                accept=".txt,.pdf,.doc,.docx,.md"
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
                Supported: .txt, .pdf, .doc, .docx, .md
              </p>
            </div>
          </div>

          {/* Documents List */}
          <div className="bg-slate-700 rounded-xl p-6 border border-slate-600">
            <h3 className="text-xl font-semibold text-white mb-4">
              Uploaded Documents ({documents.length})
            </h3>
            
            {documents.length === 0 ? (
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
                          <span>{formatFileSize(doc.content)}</span>
                          <span>{doc.uploadDate.toLocaleDateString()}</span>
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
              <li>• Upload documents with information you want the chatbot to know</li>
              <li>• Private documents are only used by the AI, not visible to users</li>
              <li>• The chatbot will automatically reference this information in responses</li>
              <li>• Supported formats: Text files, PDFs, Word documents, Markdown</li>
              <li>• Documents are stored locally and securely</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeUploaderComponent;