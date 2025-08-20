import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { 
  FileText, 
  MessageSquare, 
  Calendar, 
  Target, 
  LogOut, 
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Bell,
  Search,
  Menu,
  X,
  Home,
  Settings,
  HelpCircle,
  ChevronRight,
  BarChart3,
  Zap,
  Award,
  BookOpen
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ProjectDocuments from './ProjectDocuments';
import LiveChat from './LiveChat';
import { documentTemplates, DocumentTemplate } from './DocumentTemplates';

interface Project {
  id: string;
  name: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  progress: number;
  created_at: string;
  updated_at: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
  isDemo?: boolean;
}

const EnhancedDashboard: React.FC<DashboardProps> = ({ user, onLogout, isDemo = false }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'chat' | 'document-detail'>('overview');
  const [selectedDocument, setSelectedDocument] = useState<DocumentTemplate | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isDemo) {
      // Load demo data
      setProjects([
        {
          id: '1',
          name: 'AI Customer Service Chatbot',
          status: 'in-progress',
          progress: 75,
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-20T14:30:00Z'
        },
        {
          id: '2',
          name: 'Inventory Management AI',
          status: 'completed',
          progress: 100,
          created_at: '2024-01-01T09:00:00Z',
          updated_at: '2024-01-10T16:45:00Z'
        },
        {
          id: '3',
          name: 'Financial Forecasting System',
          status: 'planning',
          progress: 25,
          created_at: '2024-01-25T11:00:00Z',
          updated_at: '2024-01-25T11:00:00Z'
        }
      ]);
      setLoading(false);
    } else {
      fetchProjects();
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('client_projects')
        .select('*')
        .eq('client_email', user.email)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'text-yellow-400 bg-yellow-400/20';
      case 'in-progress': return 'text-blue-400 bg-blue-400/20';
      case 'review': return 'text-purple-400 bg-purple-400/20';
      case 'completed': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4" />;
      case 'review': return <Eye className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const handleDocumentClick = (document: DocumentTemplate) => {
    setSelectedDocument(document);
    setActiveTab('document-detail');
  };

  const filteredDocuments = documentTemplates.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard', icon: Home },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'chat', label: 'Project Chat', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">AI Portal</h1>
              {isDemo && <span className="text-green-400 text-xs">Demo Mode</span>}
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'overview' || item.id === 'documents' || item.id === 'chat') {
                    setActiveTab(item.id as any);
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {isDemo ? 'D' : user.email?.[0]?.toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {isDemo ? 'Demo Client' : user.email}
                </p>
                <p className="text-gray-400 text-xs">Client Account</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 text-gray-300 hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 h-16 flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-300 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-xl font-semibold text-white">
                {activeTab === 'overview' && 'Project Dashboard'}
                {activeTab === 'documents' && 'Project Documents'}
                {activeTab === 'chat' && 'Project Communication'}
                {activeTab === 'document-detail' && selectedDocument?.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent w-64"
              />
            </div>
            <button className="relative p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Project Progress</p>
                      <p className="text-2xl font-bold text-white">75%</p>
                      <p className="text-green-400 text-sm">+5% this week</p>
                    </div>
                    <div className="p-3 bg-green-500/20 rounded-full">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Days Remaining</p>
                      <p className="text-2xl font-bold text-white">23</p>
                      <p className="text-blue-400 text-sm">On schedule</p>
                    </div>
                    <div className="p-3 bg-blue-500/20 rounded-full">
                      <Calendar className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Budget Utilized</p>
                      <p className="text-2xl font-bold text-white">$12.5K</p>
                      <p className="text-purple-400 text-sm">75% of budget</p>
                    </div>
                    <div className="p-3 bg-purple-500/20 rounded-full">
                      <DollarSign className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Team Members</p>
                      <p className="text-2xl font-bold text-white">5</p>
                      <p className="text-cyan-400 text-sm">All active</p>
                    </div>
                    <div className="p-3 bg-cyan-500/20 rounded-full">
                      <Users className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
                <h3 className="text-lg font-semibold text-white mb-6">Project Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">Discovery & Planning</p>
                      <p className="text-gray-400 text-sm">Completed Jan 15, 2024</p>
                    </div>
                    <div className="text-green-400 text-sm font-medium">100%</div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Activity className="w-4 h-4 text-white animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">Development & Integration</p>
                      <p className="text-gray-400 text-sm">In progress - Due Feb 10, 2024</p>
                    </div>
                    <div className="text-blue-400 text-sm font-medium">75%</div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300 font-medium">Testing & Deployment</p>
                      <p className="text-gray-400 text-sm">Scheduled for Feb 15, 2024</p>
                    </div>
                    <div className="text-gray-400 text-sm font-medium">0%</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveTab('documents')}
                      className="w-full flex items-center justify-between p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-cyan-400" />
                        <span className="text-white">View Project Documents</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('chat')}
                      className="w-full flex items-center justify-between p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="w-5 h-5 text-purple-400" />
                        <span className="text-white">Send Message to Team</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-green-400" />
                        <span className="text-white">Schedule Meeting</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white text-sm">AI model training completed</p>
                        <p className="text-gray-400 text-xs">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white text-sm">New document uploaded: Technical Specs</p>
                        <p className="text-gray-400 text-xs">5 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white text-sm">Team meeting scheduled for tomorrow</p>
                        <p className="text-gray-400 text-xs">1 day ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white text-sm">Integration testing phase started</p>
                        <p className="text-gray-400 text-xs">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Quick Access */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Core Project Documents</h3>
                  <button
                    onClick={() => setActiveTab('documents')}
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                  >
                    View All Documents →
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documentTemplates.slice(0, 6).map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => handleDocumentClick(doc)}
                      className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg text-left transition-colors group"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{doc.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm truncate group-hover:text-cyan-400 transition-colors">
                            {doc.title}
                          </p>
                          <p className="text-gray-400 text-xs">{doc.category}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">All Project Documents</h3>
                  <div className="text-sm text-gray-400">
                    {filteredDocuments.length} documents available
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDocuments.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => handleDocumentClick(doc)}
                      className="p-6 bg-slate-700 hover:bg-slate-600 rounded-lg text-left transition-all hover:scale-105 group border border-slate-600 hover:border-cyan-500/50"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-3xl">{doc.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors">
                            {doc.title}
                          </p>
                          <p className="text-gray-400 text-sm">{doc.category}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-3">
                        {doc.content.substring(0, 150)}...
                      </p>
                      <div className="mt-4 flex items-center text-cyan-400 text-sm">
                        <span>View Document</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'document-detail' && selectedDocument && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <button
                  onClick={() => setActiveTab('documents')}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  <span>Back to Documents</span>
                </button>
              </div>

              <div className="bg-slate-800 rounded-xl border border-slate-600 overflow-hidden">
                <div className="p-6 border-b border-slate-600 bg-gradient-to-r from-slate-700 to-slate-600">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{selectedDocument.icon}</span>
                    <div>
                      <h1 className="text-2xl font-bold text-white">{selectedDocument.title}</h1>
                      <p className="text-gray-300">{selectedDocument.category}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {selectedDocument.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <LiveChat 
              userEmail={isDemo ? 'demo@aiopsexpert.com' : user.email!} 
              userName={isDemo ? 'Demo Client' : user.email!} 
              isDemo={isDemo} 
            />
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default EnhancedDashboard;