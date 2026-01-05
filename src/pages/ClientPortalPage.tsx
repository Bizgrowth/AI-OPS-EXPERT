import React, { useState } from 'react';
import { BarChart3, CheckCircle, Clock, TrendingUp, FileText, MessageSquare, Settings, Menu, Sun, Moon, Home, Folder } from 'lucide-react';
import { Link } from 'react-router-dom';
import AssessmentForm from '../components/AssessmentForm';

type View = 'dashboard' | 'form' | 'projects' | 'messages' | 'settings';

const ClientPortalPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeView, setActiveView] = useState<View>('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView darkMode={darkMode} />;
      case 'form':
        return <AssessmentForm />;
      case 'projects':
        return <ProjectsView darkMode={darkMode} />;
      case 'messages':
        return <MessagesView darkMode={darkMode} />;
      case 'settings':
        return <SettingsView darkMode={darkMode} />;
      default:
        return <DashboardView darkMode={darkMode} />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-white'} border-r ${darkMode ? 'border-slate-800' : 'border-gray-200'} p-6`}>
          <Link to="/" className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">⚡</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">AI Ops Expert</h1>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Client Portal</p>
            </div>
          </Link>

          <nav className="space-y-2">
            <h3 className={`text-xs font-semibold uppercase mb-3 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Navigation</h3>
            <button
              onClick={() => setActiveView('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeView === 'dashboard'
                  ? darkMode ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-600'
                  : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveView('form')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeView === 'form'
                  ? darkMode ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-600'
                  : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Client Form</span>
            </button>
            <button
              onClick={() => setActiveView('projects')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeView === 'projects'
                  ? darkMode ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-600'
                  : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Menu className="w-5 h-5" />
              <span>Projects</span>
            </button>
            <button
              onClick={() => setActiveView('messages')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeView === 'messages'
                  ? darkMode ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-600'
                  : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Messages</span>
            </button>
            <button
              onClick={() => setActiveView('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeView === 'settings'
                  ? darkMode ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-600'
                  : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>

          <Link
            to="/"
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg mt-4 transition-colors ${
              darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <div className={`mt-auto pt-8 border-t ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-gray-200'} flex items-center justify-center`}>
                <span className="text-sm font-semibold">CL</span>
              </div>
              <div>
                <p className="text-sm font-medium">Client User</p>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>client@example.com</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
            </h2>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const DashboardView = ({ darkMode }: { darkMode: boolean }) => (
  <div>
    <div className="mb-8">
      <p className={darkMode ? 'text-slate-400' : 'text-gray-600'}>
        Here's an overview of your projects and recent activity.
      </p>
      <p className={`text-sm mt-2 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
        Monday, January 5, 2026
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-600/10 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-1">3</h3>
        <p className={darkMode ? 'text-slate-400' : 'text-gray-600'}>Active Projects</p>
        <p className="text-sm text-green-500 mt-2">+1 this month</p>
      </div>

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-600/10 rounded-lg">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-1">24</h3>
        <p className={darkMode ? 'text-slate-400' : 'text-gray-600'}>Tasks Completed</p>
        <p className={`text-sm mt-2 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>85% completion rate</p>
      </div>

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-600/10 rounded-lg">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-1">5</h3>
        <p className={darkMode ? 'text-slate-400' : 'text-gray-600'}>Upcoming Deadlines</p>
        <p className={`text-sm mt-2 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Next: Dec 15</p>
      </div>

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-600/10 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-1">92%</h3>
        <p className={darkMode ? 'text-slate-400' : 'text-gray-600'}>Engagement Score</p>
        <p className="text-sm text-green-500 mt-2">+5% from last month</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`lg:col-span-2 p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Recent Activity</h3>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Latest updates across your projects</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <div className="flex-1">
              <h4 className="font-medium mb-1">Project milestone completed</h4>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Website Redesign</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>2 hours ago</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <div className="flex-1">
              <h4 className="font-medium mb-1">New task assigned</h4>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>AI Integration</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectsView = ({ darkMode }: { darkMode: boolean }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {['Website Redesign', 'AI Integration', 'Mobile App'].map((project, idx) => (
        <div
          key={idx}
          className={`p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'} hover:border-blue-600 transition-colors cursor-pointer`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-600/10 rounded-lg">
              <Folder className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">{project}</h3>
          </div>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-4`}>
            {idx === 0 && 'Complete redesign of company website with modern UI'}
            {idx === 1 && 'Implementation of AI-powered features'}
            {idx === 2 && 'Native mobile application development'}
          </p>
          <div className="flex items-center justify-between">
            <span className={`text-xs px-3 py-1 rounded-full ${
              idx === 0 ? 'bg-green-500/10 text-green-500' :
              idx === 1 ? 'bg-yellow-500/10 text-yellow-500' :
              'bg-blue-500/10 text-blue-500'
            }`}>
              {idx === 0 && 'In Progress'}
              {idx === 1 && 'Planning'}
              {idx === 2 && 'Starting Soon'}
            </span>
            <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
              {idx === 0 && '75% complete'}
              {idx === 1 && '30% complete'}
              {idx === 2 && '10% complete'}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MessagesView = ({ darkMode }: { darkMode: boolean }) => (
  <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
    <p className={darkMode ? 'text-slate-400' : 'text-gray-600'}>
      No messages yet. Check back later for updates from your project team.
    </p>
  </div>
);

const SettingsView = ({ darkMode }: { darkMode: boolean }) => (
  <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              defaultValue="client@example.com"
              className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Client User"
              className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ClientPortalPage;
