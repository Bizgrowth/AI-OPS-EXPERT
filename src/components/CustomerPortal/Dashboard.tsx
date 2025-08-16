import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
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
  AlertCircle
} from 'lucide-react';
import ProjectDocuments from './ProjectDocuments';
import LiveChat from './LiveChat';

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

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, isDemo = false }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'chat'>('overview');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-white">
                Client Portal {isDemo && <span className="text-green-400 text-sm">(Demo Mode)</span>}
              </h1>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">{isDemo ? 'demo@aiopsexpert.com' : user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Overview</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'documents'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Documents</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'chat'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Project Chat</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-2xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome back!</h2>
              {isDemo && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mb-4">
                  <p className="text-green-400 text-sm font-semibold">
                    🎯 Demo Mode Active - This shows how your clients will experience the portal
                  </p>
                </div>
              )}
              <p className="text-gray-300">
                Track your AI transformation projects and communicate directly with Daniel about your implementation progress.
              </p>
            </div>

            {/* Projects Grid */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Your Projects</h3>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : projects.length === 0 ? (
                <div className="bg-slate-800 rounded-xl p-8 text-center border border-slate-600">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">No Projects Yet</h4>
                  <p className="text-gray-400">
                    Your AI transformation projects will appear here once Daniel sets them up for you.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-slate-800 rounded-xl p-6 border border-slate-600 hover:border-cyan-500/50 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white">{project.name}</h4>
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {getStatusIcon(project.status)}
                          <span className="capitalize">{project.status.replace('-', ' ')}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-cyan-400 to-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="text-sm text-gray-400">
                        <p>Created: {new Date(project.created_at).toLocaleDateString()}</p>
                        <p>Updated: {new Date(project.updated_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setActiveTab('documents')}
                className="bg-slate-800 p-6 rounded-xl border border-slate-600 hover:border-cyan-500/50 transition-all text-left group"
              >
                <FileText className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-white mb-2">View Documents</h4>
                <p className="text-gray-400 text-sm">Access your MVPs, PRDs, and project plans</p>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className="bg-slate-800 p-6 rounded-xl border border-slate-600 hover:border-purple-500/50 transition-all text-left group"
              >
                <MessageSquare className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-white mb-2">Project Chat</h4>
                <p className="text-gray-400 text-sm">Communicate directly with Daniel</p>
              </button>

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-600">
                <Calendar className="w-8 h-8 text-green-400 mb-3" />
                <h4 className="text-lg font-semibold text-white mb-2">Next Meeting</h4>
                <p className="text-gray-400 text-sm">Schedule your next check-in</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && <ProjectDocuments userEmail={user.email!} />}
        {activeTab === 'documents' && <ProjectDocuments userEmail={isDemo ? 'demo@aiopsexpert.com' : user.email!} isDemo={isDemo} />}
        {activeTab === 'chat' && <LiveChat userEmail={isDemo ? 'demo@aiopsexpert.com' : user.email!} userName={isDemo ? 'Demo Client' : user.email!} isDemo={isDemo} />}
      </main>
    </div>
  );
};

export default Dashboard;