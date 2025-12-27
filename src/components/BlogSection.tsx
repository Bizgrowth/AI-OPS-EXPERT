import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Tag, User } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SchedulingModal from './SchedulingModal';
import SocialShareButtons from './SocialShareButtons';
import { supabase } from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  readTime: number;
  tags: string[];
  featured: boolean;
}

const BlogSection = () => {
  const [blogRef, isBlogVisible] = useScrollAnimation(0.1);
  const [postsRef, isPostsVisible] = useScrollAnimation(0.2);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showScheduling, setShowScheduling] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;

      const posts: BlogPost[] = (data || []).map((post: any) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        publishedAt: new Date(post.published_at),
        readTime: post.read_time,
        tags: post.tags || [],
        featured: post.featured
      }));

      setBlogPosts(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };


  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openPost = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  return (
    <section 
      id="blog" 
      ref={blogRef}
      className="py-20 bg-slate-800 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 px-4">
            AI Operations
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"> Insights Blog</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Real-world AI strategies, case studies, and actionable insights to transform your business operations.
            Learn from proven implementations and measurable results.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            <p className="text-gray-400 mt-4">Loading blog posts...</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-gray-400 text-lg">No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <>
        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map(post => (
          <div key={post.id} className="mb-12 px-4">
            <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl overflow-hidden border border-slate-500 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="p-6 sm:p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    FEATURED
                  </span>
                  <span className="text-gray-400 text-sm">Latest Post</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => openPost(post)}>
                  {post.title}
                </h3>
                
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openPost(post)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all hover:scale-105"
                  >
                    <span>Read Full Post</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Blog Posts Grid */}
        <div 
          ref={postsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-4"
        >
          {blogPosts.filter(post => !post.featured).map((post) => (
            <div
              key={post.id}
              className="bg-slate-700 rounded-xl overflow-hidden border border-slate-600 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => openPost(post)}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="flex items-center space-x-1 bg-slate-600 text-gray-300 px-2 py-1 rounded-full text-xs">
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>
                  
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center px-4">
          <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-2xl p-6 sm:p-8 border border-slate-500">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Want AI Insights Delivered to Your Inbox?
            </h3>
            <p className="text-gray-300 mb-6 text-base sm:text-lg">
              Get exclusive AI strategies, case studies, and implementation guides delivered weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowScheduling(true)}
                className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all hover:scale-105 w-full sm:w-auto">
                Book AI Consultation
              </button>
            </div>
          </div>
        </div>
        </>
        )}
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-600">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-600 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedPost.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{selectedPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(selectedPost.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedPost.readTime} min read</span>
                  </div>
                </div>
              </div>
              <button
                onClick={closePost}
                className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <span className="text-2xl font-bold">✕</span>
              </button>
            </div>
            
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag, index) => (
                  <span key={index} className="flex items-center space-x-1 bg-slate-600 text-gray-300 px-3 py-1 rounded-full text-sm">
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
              
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {selectedPost.content}
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-600 space-y-6">
                <div>
                  <p className="text-gray-300 mb-4 font-medium">Share this article:</p>
                  <SocialShareButtons
                    title={selectedPost.title}
                    description={selectedPost.excerpt}
                  />
                </div>

                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl p-6 border border-cyan-500/30">
                  <h4 className="text-lg font-semibold text-white mb-3">Ready to Transform Your Business with AI?</h4>
                  <p className="text-gray-300 mb-4">
                    Get personalized AI strategies and implementation guidance tailored to your specific business needs.
                  </p>
                  <button
                    onClick={() => setShowScheduling(true)}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all hover:scale-105">
                    Schedule Free AI Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <SchedulingModal 
        isOpen={showScheduling} 
        onClose={() => setShowScheduling(false)} 
      />
    </section>
  );
};

export default BlogSection;