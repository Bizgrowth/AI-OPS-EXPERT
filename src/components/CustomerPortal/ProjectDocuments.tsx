import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  User,
  Tag
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Document {
  id: string;
  title: string;
  type: 'mvp' | 'prd' | 'project-plan' | 'business-doc' | 'other';
  content: string;
  file_url?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

interface ProjectDocumentsProps {
  userEmail: string;
  isDemo?: boolean;
}

const ProjectDocuments: React.FC<ProjectDocumentsProps> = ({ userEmail, isDemo = false }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const documentTypes = [
    { value: 'all', label: 'All Documents' },
    { value: 'mvp', label: 'MVPs' },
    { value: 'prd', label: 'PRDs' },
    { value: 'project-plan', label: 'Project Plans' },
    { value: 'business-doc', label: 'Business Docs' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    if (isDemo) {
      // Load demo documents
      const demoDocuments: Document[] = [
        {
          id: '1',
          title: 'AI Chatbot MVP - Customer Service Automation',
          type: 'mvp',
          content: `# AI Chatbot MVP - Customer Service Automation

## Executive Summary
This MVP outlines the development of an AI-powered customer service chatbot that will handle 80% of routine customer inquiries, reducing response time from hours to seconds.

## Key Features
- Natural language processing for customer queries
- Integration with existing CRM system
- 24/7 availability
- Escalation to human agents when needed
- Multi-language support

## Success Metrics
- 80% reduction in customer service tickets
- <5 second average response time
- 90%+ customer satisfaction rating
- 24/7 availability

## Implementation Timeline
- Week 1-2: Requirements gathering and design
- Week 3-4: Core chatbot development
- Week 5-6: CRM integration and testing
- Week 7-8: Deployment and training

## Investment
- Development: $5,000
- Monthly hosting: $97
- Expected ROI: 400% within 6 months`,
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-20T14:30:00Z',
          created_by: 'Daniel Schley'
        },
        {
          id: '2',
          title: 'Inventory Management System - PRD',
          type: 'prd',
          content: `# Product Requirements Document - AI Inventory Management

## Product Overview
An intelligent inventory management system that predicts demand patterns and optimizes stock levels to prevent both overstock and stockouts.

## User Stories
### As a Store Manager
- I want to see real-time inventory levels
- I want to receive alerts for low stock items
- I want to view demand forecasts

### As a Business Owner
- I want to reduce inventory costs
- I want to prevent lost sales from stockouts
- I want automated reorder suggestions

## Technical Requirements
- Integration with existing POS system
- Machine learning for demand forecasting
- Real-time dashboard
- Mobile-responsive design
- Automated email alerts

## Success Criteria
- 40% reduction in overstock
- 95% prevention of stockouts
- 88% forecast accuracy
- $8K monthly savings`,
          created_at: '2024-01-10T09:00:00Z',
          updated_at: '2024-01-15T16:45:00Z',
          created_by: 'Daniel Schley'
        },
        {
          id: '3',
          title: 'Q1 2024 AI Implementation Project Plan',
          type: 'project-plan',
          content: `# Q1 2024 AI Implementation Project Plan

## Project Overview
Comprehensive AI transformation plan for Q1 2024, focusing on customer service automation and inventory optimization.

## Phase 1: Foundation (Weeks 1-4)
### Week 1-2: Discovery & Analysis
- Current process audit
- Data collection and analysis
- Stakeholder interviews
- Technical requirements gathering

### Week 3-4: Architecture & Design
- System architecture design
- UI/UX mockups
- Integration planning
- Security assessment

## Phase 2: Development (Weeks 5-10)
### Week 5-6: Core Development
- AI model training
- Backend API development
- Database setup
- Initial testing

### Week 7-8: Integration
- CRM integration
- POS system connection
- Third-party API setup
- End-to-end testing

### Week 9-10: Refinement
- Performance optimization
- User acceptance testing
- Bug fixes and improvements
- Documentation

## Phase 3: Deployment (Weeks 11-12)
### Week 11: Staging Deployment
- Staging environment setup
- Final testing
- Staff training
- Go-live preparation

### Week 12: Production Launch
- Production deployment
- Monitoring setup
- Support documentation
- Success metrics tracking

## Resources Required
- Development team: 2 developers
- Project manager: Daniel Schley
- Client stakeholders: 3-4 people
- Testing environment access

## Budget Allocation
- Development: $15,000
- Infrastructure: $2,000
- Training: $1,000
- Contingency: $2,000
- **Total: $20,000**

## Risk Mitigation
- Weekly progress reviews
- Agile development methodology
- Continuous testing
- Regular stakeholder communication`,
          created_at: '2024-01-05T08:00:00Z',
          updated_at: '2024-01-25T12:00:00Z',
          created_by: 'Daniel Schley'
        },
        {
          id: '4',
          title: 'AI Strategy & Business Case',
          type: 'business-doc',
          content: `# AI Strategy & Business Case

## Executive Summary
This document outlines the strategic approach for implementing AI solutions across your organization, with focus on immediate ROI and long-term competitive advantage.

## Current State Analysis
### Pain Points Identified
- Manual customer service consuming 40+ hours/week
- Inventory management inefficiencies costing $50K annually
- Lack of predictive insights for business planning
- Repetitive tasks reducing team productivity

### Opportunities
- 80% of customer inquiries can be automated
- Demand forecasting can reduce inventory costs by 40%
- Process automation can save 35+ hours weekly
- AI insights can improve decision-making speed by 60%

## Proposed AI Solutions
### 1. Customer Service Automation
**Investment:** $5,000 setup + $97/month
**ROI:** 400% within 6 months
**Impact:** 80% ticket reduction, 24/7 availability

### 2. Inventory Optimization
**Investment:** $8,000 setup + $127/month  
**ROI:** 350% within 9 months
**Impact:** 40% overstock reduction, 95% stockout prevention

### 3. Financial Forecasting
**Investment:** $6,000 setup + $197/month
**ROI:** 450% within 12 months
**Impact:** 92% forecast accuracy, crisis prevention

## Implementation Roadmap
### Phase 1 (Months 1-3): Foundation
- Customer service chatbot deployment
- Basic automation setup
- Team training and adoption

### Phase 2 (Months 4-6): Expansion  
- Inventory management system
- Advanced analytics implementation
- Process optimization

### Phase 3 (Months 7-12): Optimization
- Financial forecasting system
- Advanced AI features
- Continuous improvement

## Expected Outcomes
### Year 1 Results
- **Cost Savings:** $75,000
- **Revenue Increase:** $125,000
- **Time Savings:** 1,800+ hours
- **ROI:** 425% average across all solutions

### Long-term Benefits
- Competitive advantage through AI adoption
- Scalable operations without proportional staff increase
- Data-driven decision making
- Improved customer satisfaction and retention

## Success Metrics
- Customer service response time: <5 seconds
- Inventory accuracy: >95%
- Forecast accuracy: >90%
- Overall productivity increase: >60%
- Customer satisfaction: >92%

## Next Steps
1. Approve AI strategy and budget allocation
2. Begin Phase 1 implementation
3. Establish success metrics tracking
4. Schedule monthly progress reviews`,
          created_at: '2024-01-01T10:00:00Z',
          updated_at: '2024-01-20T15:30:00Z',
          created_by: 'Daniel Schley'
        }
      ];
      setDocuments(demoDocuments);
      setLoading(false);
    } else {
      fetchDocuments();
    }
  }, [userEmail]);

  useEffect(() => {
    filterDocuments();
  }, [documents, searchTerm, selectedType]);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('client_documents')
        .select('*')
        .eq('client_email', userEmail)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDocuments = () => {
    let filtered = documents;

    if (selectedType !== 'all') {
      filtered = filtered.filter(doc => doc.type === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDocuments(filtered);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mvp': return 'text-green-400 bg-green-400/20';
      case 'prd': return 'text-blue-400 bg-blue-400/20';
      case 'project-plan': return 'text-purple-400 bg-purple-400/20';
      case 'business-doc': return 'text-orange-400 bg-orange-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTypeLabel = (type: string) => {
    const typeObj = documentTypes.find(t => t.value === type);
    return typeObj ? typeObj.label : type;
  };

  const downloadDocument = async (document: Document) => {
    if (document.file_url) {
      window.open(document.file_url, '_blank');
    } else {
      // Create a downloadable text file from content
      const blob = new Blob([document.content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${document.title.replace(/\s+/g, '_')}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Project Documents</h2>
        {isDemo && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-3 py-1">
            <span className="text-green-400 text-sm font-semibold">Demo Data</span>
          </div>
        )}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          >
            {documentTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <div className="bg-slate-800 rounded-xl p-8 text-center border border-slate-600">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Documents Found</h3>
          <p className="text-gray-400">
            {searchTerm || selectedType !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Your project documents will appear here once Daniel shares them with you.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <div key={document.id} className="bg-slate-800 rounded-xl border border-slate-600 hover:border-cyan-500/50 transition-all overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white line-clamp-2">{document.title}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(document.type)}`}>
                    {getTypeLabel(document.type)}
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {document.content.substring(0, 150)}...
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(document.updated_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>Daniel</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedDocument(document)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => downloadDocument(document)}
                    className="flex items-center justify-center space-x-2 border border-slate-600 hover:border-slate-500 text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-600">
            <div className="flex items-center justify-between p-6 border-b border-slate-600">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedDocument.title}</h2>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedDocument.type)}`}>
                      {getTypeLabel(selectedDocument.type)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Updated {new Date(selectedDocument.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => downloadDocument(selectedDocument)}
                  className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <span className="text-xl font-bold">✕</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {selectedDocument.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDocuments;