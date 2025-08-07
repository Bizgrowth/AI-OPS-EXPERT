import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Tag, User } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SchedulingModal from './SchedulingModal';

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

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'AI will make my business feel impersonal',
      excerpt: 'The #1 objection from small business owners about AI - and why it\'s completely wrong. Real example: How Jennifer\'s agency gained 12 hours weekly and increased revenue 34%.',
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
AI Operations Expert`,
      author: 'Daniel Schley',
      publishedAt: new Date('2025-01-11T10:00:00Z'),
      readTime: 4,
      tags: ['AI Strategy', 'Customer Experience', 'Business Growth'],
      featured: true
    },
    {
      id: '2',
      title: 'The 5 AI Tools Every Small Business Needs in 2025',
      excerpt: 'Stop wasting time on manual tasks. These 5 AI tools will transform your operations and give you back 20+ hours per week.',
      content: `# The 5 AI Tools Every Small Business Needs in 2025

Stop wasting time on manual tasks. Here are the 5 AI tools that will transform your operations:

## 1. AI Customer Service Chatbot
- **What it does:** Handles 80% of customer inquiries automatically
- **Time saved:** 15+ hours/week
- **ROI:** 300% within 90 days

## 2. AI Content Generator
- **What it does:** Creates blog posts, social media, emails
- **Time saved:** 10+ hours/week
- **ROI:** 250% within 60 days

## 3. AI Scheduling Assistant
- **What it does:** Manages appointments and follow-ups
- **Time saved:** 5+ hours/week
- **ROI:** 200% within 30 days

## 4. AI Financial Forecasting
- **What it does:** Predicts cash flow and identifies trends
- **Time saved:** 8+ hours/week
- **ROI:** 400% within 120 days

## 5. AI Inventory Management
- **What it does:** Optimizes stock levels and prevents shortages
- **Time saved:** 6+ hours/week
- **ROI:** 350% within 90 days

---

**Ready to implement these AI tools in your business?**

Book a free consultation: [dschley@aiopsexpert.com](mailto:dschley@aiopsexpert.com)`,
      author: 'Daniel Schley',
      publishedAt: new Date('2025-01-10T14:00:00Z'),
      readTime: 6,
      tags: ['AI Tools', 'Productivity', 'Small Business'],
      featured: false
    },
    {
      id: '3',
      title: 'How AI Saved My Client $50K in 6 Months',
      excerpt: 'Real case study: How intelligent automation transformed a manufacturing company\'s operations and delivered massive cost savings.',
      content: `# How AI Saved My Client $50K in 6 Months

**Client:** Mid-size manufacturing company  
**Challenge:** Manual inventory tracking causing overstock and stockouts  
**Solution:** AI-powered inventory optimization system  
**Result:** $50K saved in 6 months

## The Problem

My client was losing money on two fronts:
- **Overstock:** $30K tied up in slow-moving inventory
- **Stockouts:** $25K in lost sales from popular items being out of stock

## The AI Solution

I implemented an intelligent inventory system that:
- Analyzes 3 years of sales data
- Predicts seasonal demand patterns
- Automatically adjusts reorder points
- Sends alerts for unusual trends

## The Results (6 Months Later)

- **$30K recovered** from reduced overstock
- **$20K additional revenue** from preventing stockouts
- **15 hours/week saved** on manual inventory management
- **95% accuracy** in demand forecasting

## The ROI

- **Investment:** $8K for AI system setup
- **Savings:** $50K in 6 months
- **ROI:** 525% return on investment

---

**Want similar results for your business?**

Book your free AI assessment: [dschley@aiopsexpert.com](mailto:dschley@aiopsexpert.com)`,
      author: 'Daniel Schley',
      publishedAt: new Date('2025-01-09T16:00:00Z'),
      readTime: 5,
      tags: ['Case Study', 'ROI', 'Manufacturing', 'Inventory'],
      featured: false
    }
  ];

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
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:from-cyan-600 hover:to-purple-700 transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                Subscribe to Newsletter
              </button>
              <button 
                onClick={() => setShowScheduling(true)}
                className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all hover:scale-105 w-full sm:w-auto">
                Book AI Consultation
              </button>
            </div>
          </div>
        </div>
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
              
              <div className="mt-8 pt-8 border-t border-slate-600">
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