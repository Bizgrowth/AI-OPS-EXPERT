import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Users, TrendingUp, Mail, Calendar } from 'lucide-react';

interface Newsletter {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  stats: {
    opens: number;
    clicks: number;
    shares: number;
  };
}

interface NewsletterAdminProps {
  onBack: () => void;
}

const NewsletterAdmin: React.FC<NewsletterAdminProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'newsletters' | 'subscribers'>('overview');
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingNewsletter, setEditingNewsletter] = useState<Newsletter | null>(null);
  const [newNewsletter, setNewNewsletter] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    status: 'draft' as const
  });

  useEffect(() => {
    // Load newsletters from localStorage
    const savedNewsletters = localStorage.getItem('newsletters');
    if (savedNewsletters) {
      const parsed = JSON.parse(savedNewsletters).map((n: any) => ({
        ...n,
        createdAt: new Date(n.createdAt),
        updatedAt: new Date(n.updatedAt),
        publishedAt: n.publishedAt ? new Date(n.publishedAt) : undefined
      }));
      setNewsletters(parsed);
    } else {
      // Initialize with sample data
      const sampleNewsletter: Newsletter = {
        id: '1',
        title: 'AI will make my business feel impersonal',
        content: `# AI will make my business feel impersonal

This is the #1 objection I hear from small business owners.

**Here's the truth:**

AI doesn't replace personal relationships. It creates MORE time for them.

## Real Example: Jennifer's Marketing Agency

**Before AI:** 15 hrs/week on admin = stressed, overwhelmed

**After AI:** 12 hrs saved = 12 MORE hours for client strategy

**Result:** 34% revenue increase (took on 3 new clients)

---

## The Bottom Line

Your customers don't care HOW you deliver great service. They care THAT you deliver it.

**AI handles the mundane. You handle the relationships.**

That's the winning formula.

---

## Your Turn

**What administrative task is stealing time from your customers?**

Hit reply and tell me. I personally respond to every email within 24 hours.

---

💡 **Ready to implement AI without losing the human touch?**

Book your free AI strategy session: [dschley@aiopsexpert.com](mailto:dschley@aiopsexpert.com)

Best regards,  
Daniel Schley  
AI Operations Expert

#AIMyths #CustomerExperience #SmallBusiness #Productivity`,
        excerpt: 'The #1 objection from small business owners about AI - and why it\'s completely wrong. Real example: How Jennifer\'s agency gained 12 hours weekly and increased revenue 34%.',
        status: 'published',
        publishedAt: new Date('2025-01-11T10:00:00Z'),
        createdAt: new Date('2025-01-11T09:00:00Z'),
        updatedAt: new Date('2025-01-11T09:30:00Z'),
        tags: ['AI Strategy', 'Customer Experience', 'Business Growth'],
        stats: {
          opens: 847,
          clicks: 156,
          shares: 23
        }
      };
      setNewsletters([sampleNewsletter]);
      localStorage.setItem('newsletters', JSON.stringify([sampleNewsletter]));
    }
  }, []);

  const saveNewsletter = (newsletter: Newsletter) => {
    const updatedNewsletters = newsletters.some(n => n.id === newsletter.id)
      ? newsletters.map(n => n.id === newsletter.id ? newsletter : n)
      : [...newsletters, newsletter];
    
    setNewsletters(updatedNewsletters);
    localStorage.setItem('newsletters', JSON.stringify(updatedNewsletters));
  };

  const deleteNewsletter = (id: string) => {
    if (confirm('Are you sure you want to delete this newsletter?')) {
      const updatedNewsletters = newsletters.filter(n => n.id !== id);
      setNewsletters(updatedNewsletters);
      localStorage.setItem('newsletters', JSON.stringify(updatedNewsletters));
    }
  };

  const handleCreateNewsletter = () => {
    if (!newNewsletter.title || !newNewsletter.content) {
      alert('Please fill in title and content');
      return;
    }

    const newsletter: Newsletter = {
      id: Date.now().toString(),
      title: newNewsletter.title,
      content: newNewsletter.content,
      excerpt: newNewsletter.excerpt || newNewsletter.content.substring(0, 150) + '...',
      status: newNewsletter.status,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: newNewsletter.status === 'published' ? new Date() : undefined,
      tags: newNewsletter.tags.split(',').map(t => t.trim()).filter(t => t),
      stats: { opens: 0, clicks: 0, shares: 0 }
    };

    saveNewsletter(newsletter);
    setNewNewsletter({ title: '', content: '', excerpt: '', tags: '', status: 'draft' });
    setIsCreating(false);
  };

  const handleUpdateNewsletter = () => {
    if (!editingNewsletter) return;

    const updatedNewsletter: Newsletter = {
      ...editingNewsletter,
      updatedAt: new Date(),
      publishedAt: editingNewsletter.status === 'published' && !editingNewsletter.publishedAt 
        ? new Date() 
        : editingNewsletter.publishedAt
    };

    saveNewsletter(updatedNewsletter);
    setEditingNewsletter(null);
  };

  const totalSubscribers = 1247;
  const totalOpens = newsletters.reduce((sum, n) => sum + n.stats.opens, 0);
  const totalClicks = newsletters.reduce((sum, n) => sum + n.stats.clicks, 0);

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Site</span>
            </button>
            <div className="w-px h-6 bg-gray-600"></div>
            <h1 className="text-3xl font-bold text-white">Newsletter Admin</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'newsletters', label: 'Newsletters', icon: Mail },
            { id: 'subscribers', label: 'Subscribers', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Subscribers</p>
                    <p className="text-2xl font-bold text-white">{totalSubscribers.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Opens</p>
                    <p className="text-2xl font-bold text-white">{totalOpens.toLocaleString()}</p>
                  </div>
                  <Eye className="w-8 h-8 text-green-400" />
                </div>
              </div>
              
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Clicks</p>
                    <p className="text-2xl font-bold text-white">{totalClicks.toLocaleString()}</p>
                  </div>
                  <Mail className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Newsletters</p>
                    <p className="text-2xl font-bold text-white">{newsletters.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Newsletters</h3>
              <div className="space-y-4">
                {newsletters.slice(0, 3).map(newsletter => (
                  <div key={newsletter.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">{newsletter.title}</h4>
                      <p className="text-sm text-gray-400">
                        {newsletter.status === 'published' ? 'Published' : 'Draft'} • 
                        {newsletter.publishedAt?.toLocaleDateString() || newsletter.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{newsletter.stats.opens} opens</span>
                      <span>{newsletter.stats.clicks} clicks</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Newsletters Tab */}
        {activeTab === 'newsletters' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Manage Newsletters</h2>
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center space-x-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Newsletter</span>
              </button>
            </div>

            {/* Create/Edit Form */}
            {(isCreating || editingNewsletter) && (
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {isCreating ? 'Create New Newsletter' : 'Edit Newsletter'}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <input
                      type="text"
                      value={isCreating ? newNewsletter.title : editingNewsletter?.title || ''}
                      onChange={(e) => isCreating 
                        ? setNewNewsletter({...newNewsletter, title: e.target.value})
                        : setEditingNewsletter(editingNewsletter ? {...editingNewsletter, title: e.target.value} : null)
                      }
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      placeholder="Newsletter title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
                    <input
                      type="text"
                      value={isCreating ? newNewsletter.excerpt : editingNewsletter?.excerpt || ''}
                      onChange={(e) => isCreating 
                        ? setNewNewsletter({...newNewsletter, excerpt: e.target.value})
                        : setEditingNewsletter(editingNewsletter ? {...editingNewsletter, excerpt: e.target.value} : null)
                      }
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      placeholder="Brief description..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Content (Markdown)</label>
                    <textarea
                      rows={12}
                      value={isCreating ? newNewsletter.content : editingNewsletter?.content || ''}
                      onChange={(e) => isCreating 
                        ? setNewNewsletter({...newNewsletter, content: e.target.value})
                        : setEditingNewsletter(editingNewsletter ? {...editingNewsletter, content: e.target.value} : null)
                      }
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent font-mono text-sm"
                      placeholder="Write your newsletter content in markdown..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={isCreating ? newNewsletter.tags : editingNewsletter?.tags.join(', ') || ''}
                        onChange={(e) => isCreating 
                          ? setNewNewsletter({...newNewsletter, tags: e.target.value})
                          : setEditingNewsletter(editingNewsletter ? {...editingNewsletter, tags: e.target.value.split(',').map(t => t.trim())} : null)
                        }
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                        placeholder="AI Strategy, Business Growth..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                      <select
                        value={isCreating ? newNewsletter.status : editingNewsletter?.status || 'draft'}
                        onChange={(e) => isCreating 
                          ? setNewNewsletter({...newNewsletter, status: e.target.value as 'draft' | 'published'})
                          : setEditingNewsletter(editingNewsletter ? {...editingNewsletter, status: e.target.value as 'draft' | 'published'} : null)
                        }
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={isCreating ? handleCreateNewsletter : handleUpdateNewsletter}
                      className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
                    >
                      {isCreating ? 'Create Newsletter' : 'Update Newsletter'}
                    </button>
                    <button
                      onClick={() => {
                        setIsCreating(false);
                        setEditingNewsletter(null);
                        setNewNewsletter({ title: '', content: '', excerpt: '', tags: '', status: 'draft' });
                      }}
                      className="border border-gray-600 text-gray-300 px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Newsletters List */}
            <div className="space-y-4">
              {newsletters.map(newsletter => (
                <div key={newsletter.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{newsletter.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          newsletter.status === 'published' 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-yellow-900 text-yellow-300'
                        }`}>
                          {newsletter.status}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-3">{newsletter.excerpt}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-400">
                        <span>{newsletter.stats.opens} opens</span>
                        <span>{newsletter.stats.clicks} clicks</span>
                        <span>{newsletter.stats.shares} shares</span>
                        <span>
                          {newsletter.publishedAt?.toLocaleDateString() || newsletter.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingNewsletter(newsletter)}
                        className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteNewsletter(newsletter.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Subscriber Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Total Subscribers</h3>
                <p className="text-3xl font-bold text-cyan-400">{totalSubscribers.toLocaleString()}</p>
                <p className="text-sm text-gray-400 mt-1">+127 this month</p>
              </div>
              
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Open Rate</h3>
                <p className="text-3xl font-bold text-green-400">68.4%</p>
                <p className="text-sm text-gray-400 mt-1">Above industry average</p>
              </div>
              
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Click Rate</h3>
                <p className="text-3xl font-bold text-purple-400">18.7%</p>
                <p className="text-sm text-gray-400 mt-1">Excellent engagement</p>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Growth Trends</h3>
              <p className="text-gray-300">
                Your newsletter is performing exceptionally well with consistent growth and high engagement rates. 
                The AI operations content is resonating strongly with your audience.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterAdmin;