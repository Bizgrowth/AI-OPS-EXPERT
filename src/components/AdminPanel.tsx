import React, { useState, useEffect } from 'react';
import { Mail, FileText, Eye, Archive, Plus, Edit2, Trash2, Save, X, EyeOff, LogOut, Brain } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import KnowledgeBaseManager from './KnowledgeBaseManager';

interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  status: 'new' | 'reviewing' | 'responded' | 'archived';
  created_at: string;
}

interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  read_time: number;
  tags: string[];
  published: boolean;
}

type Tab = 'contacts' | 'blog' | 'knowledge';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('contacts');
  const [loading, setLoading] = useState(true);

  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost>({
    title: '',
    excerpt: '',
    content: '',
    author: 'Daniel Schley',
    published_at: new Date().toISOString().slice(0, 16),
    read_time: 5,
    tags: [],
    published: false
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (activeTab === 'contacts') {
      fetchContacts();
    } else {
      fetchPosts();
    }
  }, [activeTab]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id: string, status: ContactSubmission['status']) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      fetchContacts();
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, status });
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Failed to update status');
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePost = async () => {
    try {
      if (!currentPost.title || !currentPost.excerpt || !currentPost.content) {
        alert('Please fill in all required fields (title, excerpt, content)');
        return;
      }

      if (currentPost.id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(currentPost)
          .eq('id', currentPost.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([currentPost]);

        if (error) throw error;
      }

      setIsEditing(false);
      setCurrentPost({
        title: '',
        excerpt: '',
        content: '',
        author: 'Daniel Schley',
        published_at: new Date().toISOString().slice(0, 16),
        read_time: 5,
        tags: [],
        published: false
      });
      fetchPosts();
      alert('Blog post saved successfully!');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save blog post. Please try again.');
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchPosts();
      alert('Blog post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete blog post. Please try again.');
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost({
      ...post,
      published_at: new Date(post.published_at).toISOString().slice(0, 16)
    });
    setIsEditing(true);
    setShowPreview(false);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !currentPost.tags.includes(tagInput.trim())) {
      setCurrentPost({
        ...currentPost,
        tags: [...currentPost.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setCurrentPost({
      ...currentPost,
      tags: currentPost.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleCancelPost = () => {
    setIsEditing(false);
    setShowPreview(false);
    setCurrentPost({
      title: '',
      excerpt: '',
      content: '',
      author: 'Daniel Schley',
      published_at: new Date().toISOString().slice(0, 16),
      read_time: 5,
      tags: [],
      published: false
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const getStatusColor = (status: ContactSubmission['status']) => {
    switch (status) {
      case 'new': return 'bg-cyan-500';
      case 'reviewing': return 'bg-yellow-500';
      case 'responded': return 'bg-green-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 bg-slate-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'contacts'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                  : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
              }`}
            >
              <Mail className="w-5 h-5" />
              <span>Contact Submissions</span>
              {contacts.filter(c => c.status === 'new').length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {contacts.filter(c => c.status === 'new').length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'blog'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                  : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Blog Posts</span>
            </button>
            <button
              onClick={() => setActiveTab('knowledge')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'knowledge'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                  : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
              }`}
            >
              <Brain className="w-5 h-5" />
              <span>Chatbot Knowledge</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'contacts' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Submissions</h2>
              <div className="space-y-3">
                {contacts.length === 0 ? (
                  <div className="bg-slate-800 rounded-lg p-6 text-center text-gray-400">
                    No contact submissions yet
                  </div>
                ) : (
                  contacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className={`bg-slate-800 rounded-lg p-4 cursor-pointer border-2 transition-all ${
                        selectedContact?.id === contact.id
                          ? 'border-cyan-500'
                          : 'border-transparent hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-white font-semibold">
                              {contact.first_name} {contact.last_name}
                            </h3>
                            <span className={`${getStatusColor(contact.status)} text-white text-xs px-2 py-0.5 rounded-full`}>
                              {contact.status}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">{contact.email}</p>
                          {contact.company && (
                            <p className="text-gray-500 text-sm">{contact.company}</p>
                          )}
                          <p className="text-gray-500 text-xs mt-1">
                            {new Date(contact.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              {selectedContact ? (
                <div className="bg-slate-800 rounded-lg p-6 sticky top-4">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-white">Details</h2>
                    <button
                      onClick={() => setSelectedContact(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm">Name</label>
                      <p className="text-white font-semibold">
                        {selectedContact.first_name} {selectedContact.last_name}
                      </p>
                    </div>

                    <div>
                      <label className="text-gray-400 text-sm">Email</label>
                      <p className="text-white">{selectedContact.email}</p>
                    </div>

                    {selectedContact.company && (
                      <div>
                        <label className="text-gray-400 text-sm">Company</label>
                        <p className="text-white">{selectedContact.company}</p>
                      </div>
                    )}

                    {selectedContact.service && (
                      <div>
                        <label className="text-gray-400 text-sm">Service Interest</label>
                        <p className="text-white">{selectedContact.service}</p>
                      </div>
                    )}

                    <div>
                      <label className="text-gray-400 text-sm">Message</label>
                      <p className="text-white whitespace-pre-wrap bg-slate-700 rounded p-3 mt-1">
                        {selectedContact.message}
                      </p>
                    </div>

                    <div>
                      <label className="text-gray-400 text-sm">Submitted</label>
                      <p className="text-white">
                        {new Date(selectedContact.created_at).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <label className="text-gray-400 text-sm block mb-2">Update Status</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => updateContactStatus(selectedContact.id, 'reviewing')}
                          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                        >
                          Mark Reviewing
                        </button>
                        <button
                          onClick={() => updateContactStatus(selectedContact.id, 'responded')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Mark Responded
                        </button>
                        <button
                          onClick={() => updateContactStatus(selectedContact.id, 'new')}
                          className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
                        >
                          Mark New
                        </button>
                        <button
                          onClick={() => updateContactStatus(selectedContact.id, 'archived')}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Archive
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-800 rounded-lg p-12 text-center">
                  <Eye className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Select a submission to view details</p>
                </div>
              )}
            </div>
          </div>
        ) : activeTab === 'blog' ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Blog Management</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>New Post</span>
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">
                    {currentPost.id ? 'Edit Post' : 'Create New Post'}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="flex items-center space-x-2 bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span>{showPreview ? 'Edit' : 'Preview'}</span>
                    </button>
                    <button
                      onClick={handleSavePost}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancelPost}
                      className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>

                {showPreview ? (
                  <div className="prose prose-invert max-w-none">
                    <h1>{currentPost.title}</h1>
                    <p className="text-lg text-gray-400">{currentPost.excerpt}</p>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {currentPost.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={currentPost.title}
                        onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                        className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                        placeholder="Enter post title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Excerpt *
                      </label>
                      <textarea
                        value={currentPost.excerpt}
                        onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                        className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                        rows={3}
                        placeholder="Short summary/preview of the post"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Content * (Markdown supported)
                      </label>
                      <textarea
                        value={currentPost.content}
                        onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                        className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none font-mono text-sm"
                        rows={15}
                        placeholder="Write your post content in Markdown..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Author
                        </label>
                        <input
                          type="text"
                          value={currentPost.author}
                          onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                          className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Publish Date & Time
                        </label>
                        <input
                          type="datetime-local"
                          value={currentPost.published_at}
                          onChange={(e) => setCurrentPost({ ...currentPost, published_at: e.target.value })}
                          className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Read Time (minutes)
                        </label>
                        <input
                          type="number"
                          value={currentPost.read_time}
                          onChange={(e) => setCurrentPost({ ...currentPost, read_time: parseInt(e.target.value) || 5 })}
                          className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                          min="1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Tags
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                            className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                            placeholder="Add tag and press Enter"
                          />
                          <button
                            onClick={handleAddTag}
                            className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {currentPost.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="flex items-center space-x-1 bg-slate-600 text-gray-300 px-3 py-1 rounded-full text-sm"
                            >
                              <span>{tag}</span>
                              <button
                                onClick={() => handleRemoveTag(tag)}
                                className="hover:text-red-400 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentPost.published}
                        onChange={(e) => setCurrentPost({ ...currentPost, published: e.target.checked })}
                        className="w-5 h-5 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span className="text-gray-300">Published (visible on website)</span>
                    </label>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {posts.length === 0 ? (
                  <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
                    <p className="text-gray-400 text-lg">No blog posts yet. Create your first post!</p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-cyan-500/50 transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-bold text-white">{post.title}</h3>
                            {!post.published && (
                              <span className="bg-slate-600 text-gray-300 px-2 py-1 rounded text-xs font-semibold">
                                DRAFT
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 mb-4">{post.excerpt}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{post.author}</span>
                            <span>{new Date(post.published_at).toLocaleDateString()}</span>
                            <span>{post.read_time} min read</span>
                            <span>{post.tags.length} tags</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleEditPost(post)}
                            className="p-2 bg-slate-700 text-cyan-400 rounded-lg hover:bg-slate-600 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => post.id && handleDeletePost(post.id)}
                            className="p-2 bg-slate-700 text-red-400 rounded-lg hover:bg-slate-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ) : (
          <KnowledgeBaseManager />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
