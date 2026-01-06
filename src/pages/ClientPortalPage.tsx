import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, CheckCircle, Clock, TrendingUp, FileText, MessageSquare, Settings, Menu, Sun, Moon, Home, LogOut } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ProjectCard } from '@/components/client-portal/ProjectCard';
import { MetricCard } from '@/components/client-portal/MetricCard';
import { ActivityFeed } from '@/components/client-portal/ActivityFeed';
import { Project, Activity } from '@/types/client-portal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

interface ClientProfile {
  full_name: string;
  company_name?: string;
  phone?: string;
  industry?: string;
  avatar_url?: string;
}

interface ClientProject {
  id: string;
  name: string;
  status: string;
  progress: number;
  created_at: string;
  updated_at: string;
}

interface ProjectUpdate {
  id: string;
  project_id: string;
  update_type: string;
  title: string;
  description: string;
  created_at: string;
}

export default function ClientPortalPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    loadClientData();
  }, []);

  const loadClientData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/client-login');
        return;
      }

      setUserEmail(user.email || '');

      const { data: profileData } = await supabase
        .from('clients_profile')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
      }

      const { data: projectsData } = await supabase
        .from('client_projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (projectsData) {
        setProjects(projectsData);
      }

      if (projectsData && projectsData.length > 0) {
        const projectIds = projectsData.map(p => p.id);
        const { data: updatesData } = await supabase
          .from('project_updates')
          .select('*')
          .in('project_id', projectIds)
          .order('created_at', { ascending: false })
          .limit(10);

        if (updatesData) {
          setUpdates(updatesData);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading client data:', error);
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/client-login');
  };

  const getInitials = () => {
    if (!profile?.full_name) return 'CL';
    return profile.full_name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const activities: Activity[] = updates.map(update => ({
    id: update.id,
    projectId: update.project_id,
    type: update.update_type,
    title: update.title,
    description: update.description,
    timestamp: update.created_at,
    userId: 'admin',
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          <p className="text-gray-400 mt-4">Loading your portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static w-64 min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-white'} border-r ${darkMode ? 'border-slate-800' : 'border-gray-200'} p-6 transition-transform duration-300 z-50 flex flex-col`}>
          <Link to="/" className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">⚡</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">AI Ops Expert</h1>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Client Portal</p>
            </div>
          </Link>

          <nav className="space-y-2 flex-1">
            <h3 className={`text-xs font-semibold uppercase mb-3 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Navigation</h3>

            <Button
              variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('dashboard');
                setSidebarOpen(false);
              }}
            >
              <BarChart3 className="w-5 h-5 mr-3" />
              Dashboard
            </Button>

            <Button
              variant={activeTab === 'form' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('form');
                setSidebarOpen(false);
              }}
            >
              <FileText className="w-5 h-5 mr-3" />
              Client Form
            </Button>

            <Button
              variant={activeTab === 'projects' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('projects');
                setSidebarOpen(false);
              }}
            >
              <Menu className="w-5 h-5 mr-3" />
              Projects
            </Button>

            <Button
              variant={activeTab === 'messages' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('messages');
                setSidebarOpen(false);
              }}
            >
              <MessageSquare className="w-5 h-5 mr-3" />
              Messages
            </Button>

            <Button
              variant={activeTab === 'settings' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('settings');
                setSidebarOpen(false);
              }}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Button>
          </nav>

          <Link to="/">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="w-5 h-5 mr-3" />
              Back to Home
            </Button>
          </Link>

          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>

          <Separator className="my-4" />

          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{profile?.full_name || 'Client User'}</p>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'} truncate`}>{userEmail}</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 w-full lg:w-auto p-4 md:p-6 lg:p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
              <h2 className="text-2xl font-bold capitalize">
                {activeTab === 'form' ? 'Client Form' : activeTab}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="dashboard" className="space-y-8">
              <div>
                <p className={`text-base ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Here's an overview of your projects and recent activity.
                </p>
                <p className={`text-sm mt-2 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                  Monday, January 6, 2026
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  icon={BarChart3}
                  title="Active Projects"
                  value={projects.length}
                  change={projects.length === 0 ? "No projects yet" : `${projects.filter(p => p.status === 'in-progress').length} in progress`}
                  changeType={projects.length > 0 ? "positive" : "neutral"}
                />
                <MetricCard
                  icon={CheckCircle}
                  title="Completed Projects"
                  value={projects.filter(p => p.status === 'completed').length}
                  change={`${projects.length} total projects`}
                  changeType="neutral"
                />
                <MetricCard
                  icon={Clock}
                  title="Recent Updates"
                  value={updates.length}
                  change={updates.length > 0 ? "View all below" : "No updates yet"}
                  changeType="neutral"
                />
                <MetricCard
                  icon={TrendingUp}
                  title="Avg Progress"
                  value={projects.length > 0 ? `${Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%` : "0%"}
                  change={projects.length > 0 ? "Across all projects" : "No data"}
                  changeType="neutral"
                />
              </div>

              <ActivityFeed activities={activities} />
            </TabsContent>

            <TabsContent value="form">
              <Card className="p-8 bg-slate-800/50 border-slate-700 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Assessment Forms</h3>
                <p className="text-gray-400">
                  Assessment forms are available on the main website. Please visit our services page to submit assessments.
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={{
                        id: project.id,
                        name: project.name,
                        description: '',
                        status: project.status as any,
                        progress: project.progress,
                        startDate: project.created_at,
                        clientId: '',
                        createdAt: project.created_at,
                        updatedAt: project.updated_at,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <Card className="p-8 bg-slate-800/50 border-slate-700 text-center">
                  <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
                  <p className="text-gray-400">
                    Your projects will appear here once they're set up by our team.
                  </p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="messages">
              <Card className="p-6">
                <p className={`text-base ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  No messages yet. Check back later for updates from your project team.
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Account Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userEmail}
                          disabled
                          className="mt-2 bg-slate-700 border-slate-600 text-gray-400"
                        />
                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                      </div>
                      <div>
                        <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          value={profile?.full_name || ''}
                          disabled
                          className="mt-2 bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company" className="text-gray-300">Company</Label>
                        <Input
                          id="company"
                          type="text"
                          value={profile?.company_name || ''}
                          disabled
                          className="mt-2 bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <p className="text-sm text-gray-400">
                        To update your account information, please contact our team.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
