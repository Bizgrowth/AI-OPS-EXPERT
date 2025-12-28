import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Edit, Trash2, Save, X, Search, CheckCircle } from 'lucide-react';

interface KnowledgeItem {
  id: string;
  category: string;
  topic: string;
  content: string;
  keywords: string[];
  is_active: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
}

const KnowledgeBaseManager = () => {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const categories = [
    'Business Background',
    'AI Solutions',
    'Pricing',
    'Client Success',
    'Technical Expertise',
    'Consultation Process'
  ];

  useEffect(() => {
    fetchKnowledgeItems();
  }, []);

  const fetchKnowledgeItems = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('chatbot_knowledge')
      .select('*')
      .order('priority', { ascending: false });

    if (error) {
      showMessage('error', 'Failed to fetch knowledge items');
      console.error('Error fetching knowledge:', error);
    } else {
      setKnowledgeItems(data || []);
    }
    setIsLoading(false);
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSave = async (item: Partial<KnowledgeItem>) => {
    if (!item.category || !item.topic || !item.content) {
      showMessage('error', 'Please fill in all required fields');
      return;
    }

    if (editingItem?.id) {
      const { error } = await supabase
        .from('chatbot_knowledge')
        .update({
          category: item.category,
          topic: item.topic,
          content: item.content,
          keywords: item.keywords || [],
          is_active: item.is_active ?? true,
          priority: item.priority ?? 0
        })
        .eq('id', editingItem.id);

      if (error) {
        showMessage('error', 'Failed to update knowledge item');
        console.error('Error updating:', error);
      } else {
        showMessage('success', 'Knowledge item updated successfully');
        setEditingItem(null);
        fetchKnowledgeItems();
      }
    } else {
      const { error } = await supabase
        .from('chatbot_knowledge')
        .insert([{
          category: item.category,
          topic: item.topic,
          content: item.content,
          keywords: item.keywords || [],
          is_active: item.is_active ?? true,
          priority: item.priority ?? 0
        }]);

      if (error) {
        showMessage('error', 'Failed to add knowledge item');
        console.error('Error inserting:', error);
      } else {
        showMessage('success', 'Knowledge item added successfully');
        setIsAddingNew(false);
        setEditingItem(null);
        fetchKnowledgeItems();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this knowledge item?')) return;

    const { error } = await supabase
      .from('chatbot_knowledge')
      .delete()
      .eq('id', id);

    if (error) {
      showMessage('error', 'Failed to delete knowledge item');
      console.error('Error deleting:', error);
    } else {
      showMessage('success', 'Knowledge item deleted successfully');
      fetchKnowledgeItems();
    }
  };

  const handleToggleActive = async (item: KnowledgeItem) => {
    const { error } = await supabase
      .from('chatbot_knowledge')
      .update({ is_active: !item.is_active })
      .eq('id', item.id);

    if (error) {
      showMessage('error', 'Failed to update status');
      console.error('Error updating status:', error);
    } else {
      showMessage('success', `Knowledge item ${!item.is_active ? 'activated' : 'deactivated'}`);
      fetchKnowledgeItems();
    }
  };

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = searchTerm === '' ||
      item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const KnowledgeForm = ({ item, onSave, onCancel }: {
    item: Partial<KnowledgeItem>,
    onSave: (item: Partial<KnowledgeItem>) => void,
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState(item);

    return (
      <div className="bg-slate-700 p-6 rounded-lg mb-4 border border-slate-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category *
            </label>
            <select
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500 focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Topic *
            </label>
            <input
              type="text"
              value={formData.topic || ''}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500 focus:ring-2 focus:ring-cyan-400"
              placeholder="e.g., Implementation Process"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Content *
          </label>
          <textarea
            value={formData.content || ''}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500 focus:ring-2 focus:ring-cyan-400 min-h-[200px]"
            placeholder="Enter detailed content here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={formData.keywords?.join(', ') || ''}
              onChange={(e) => setFormData({
                ...formData,
                keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
              })}
              className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500 focus:ring-2 focus:ring-cyan-400"
              placeholder="pricing, cost, investment"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Priority (0-20)
            </label>
            <input
              type="number"
              min="0"
              max="20"
              value={formData.priority || 0}
              onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
              className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500 focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active ?? true}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-5 h-5 rounded border-slate-500"
              />
              <span className="text-sm text-gray-300">Active</span>
            </label>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => onSave(formData)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex items-center px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-all"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {message && (
        <div className={`mb-4 p-4 rounded-lg flex items-center ${
          message.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/50' : 'bg-red-500/20 text-red-300 border border-red-500/50'
        }`}>
          <CheckCircle className="w-5 h-5 mr-2" />
          {message.text}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Chatbot Knowledge Base</h2>
        <button
          onClick={() => {
            setIsAddingNew(true);
            setEditingItem({
              id: '',
              category: '',
              topic: '',
              content: '',
              keywords: [],
              is_active: true,
              priority: 0,
              created_at: '',
              updated_at: ''
            });
          }}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search knowledge base..."
            className="w-full bg-slate-700 text-white pl-10 pr-4 py-2 rounded border border-slate-600 focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:ring-2 focus:ring-cyan-400"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {isAddingNew && editingItem && (
        <KnowledgeForm
          item={editingItem}
          onSave={handleSave}
          onCancel={() => {
            setIsAddingNew(false);
            setEditingItem(null);
          }}
        />
      )}

      {isLoading ? (
        <div className="text-center py-12 text-gray-400">Loading knowledge base...</div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-slate-700 p-6 rounded-lg border border-slate-600">
              {editingItem?.id === item.id ? (
                <KnowledgeForm
                  item={editingItem}
                  onSave={handleSave}
                  onCancel={() => setEditingItem(null)}
                />
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full border border-cyan-500/30">
                          {item.category}
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full border border-purple-500/30">
                          Priority: {item.priority}
                        </span>
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          item.is_active
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {item.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.topic}</h3>
                      <p className="text-gray-300 whitespace-pre-line mb-3">{item.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.keywords.map((keyword, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-600 text-gray-300 text-xs rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleToggleActive(item)}
                        className={`p-2 rounded transition-all ${
                          item.is_active
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        }`}
                        title={item.is_active ? 'Deactivate' : 'Activate'}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 transition-all"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No knowledge items found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KnowledgeBaseManager;
