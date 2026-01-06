import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, CheckCircle, Clock, TrendingUp, FileText, MessageSquare, Settings, Menu, Sun, Moon, Home } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ProjectCard } from '@/components/client-portal/ProjectCard';
import { MetricCard } from '@/components/client-portal/MetricCard';
import { ActivityFeed } from '@/components/client-portal/ActivityFeed';
import { Project, Activity } from '@/types/client-portal';
import AssessmentForm from '@/components/AssessmentForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of company website with modern UI/UX',
    status: 'in_progress',
    progress: 75,
    startDate: '2026-01-01',
    clientId: 'client-1',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z',
  },
  {
    id: '2',
    name: 'AI Integration',
    description: 'Implementation of AI-powered features and automation',
    status: 'planning',
    progress: 30,
    startDate: '2026-01-10',
    clientId: 'client-1',
    createdAt: '2026-01-02T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z',
  },
  {
    id: '3',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android',
    status: 'planning',
    progress: 10,
    startDate: '2026-02-01',
    clientId: 'client-1',
    createdAt: '2026-01-03T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z',
  },
];

const mockActivities: Activity[] = [
  {
    id: '1',
    projectId: '1',
    type: 'milestone',
    title: 'Project milestone completed',
    description: 'Website Redesign',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    userId: 'user-1',
  },
  {
    id: '2',
    projectId: '2',
    type: 'task',
    title: 'New task assigned',
    description: 'AI Integration',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    userId: 'user-1',
  },
];

export default function ClientPortalPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

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

          <Separator className="my-4" />

          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>CL</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">Client User</p>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'} truncate`}>client@example.com</p>
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
                  value={3}
                  change="+1 this month"
                  changeType="positive"
                />
                <MetricCard
                  icon={CheckCircle}
                  title="Tasks Completed"
                  value={24}
                  change="85% completion rate"
                  changeType="neutral"
                />
                <MetricCard
                  icon={Clock}
                  title="Upcoming Deadlines"
                  value={5}
                  change="Next: Dec 15"
                  changeType="neutral"
                />
                <MetricCard
                  icon={TrendingUp}
                  title="Engagement Score"
                  value="92%"
                  change="+5% from last month"
                  changeType="positive"
                />
              </div>

              <ActivityFeed activities={mockActivities} />
            </TabsContent>

            <TabsContent value="form">
              <AssessmentForm />
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <Card className="p-6">
                <p className={`text-base ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  No messages yet. Check back later for updates from your project team.
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="client@example.com"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          defaultValue="Client User"
                          className="mt-2"
                        />
                      </div>
                      <Button>Save Changes</Button>
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
