import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  read_time: number;
  tags: string[];
  featured: boolean;
  published: boolean;
}

const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
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
    featured: false,
    published: false
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
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

  const handleSave = async () => {
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
        featured: false,
        published: false
      });
      fetchPosts();
      alert('Blog post saved successfully!');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save blog post. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
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

  const handleEdit = (post: BlogPost) => {
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

  const handleCancel = () => {
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
      featured: false,
      published: false
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          <p className="text-gray-400 mt-4">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Blog Management</h1>
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
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
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

                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentPost.featured}
                      onChange={(e) => setCurrentPost({ ...currentPost, featured: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-gray-300">Featured Post</span>
                  </label>

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
                        {post.featured && (
                          <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-2 py-1 rounded text-xs font-semibold">
                            FEATURED
                          </span>
                        )}
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
                        onClick={() => handleEdit(post)}
                        className="p-2 bg-slate-700 text-cyan-400 rounded-lg hover:bg-slate-600 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => post.id && handleDelete(post.id)}
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
    </div>
  );
};

export default BlogAdmin;
