import React, { useState } from 'react';
import { BarChart3, CheckCircle, Clock, TrendingUp, FileText, MessageSquare, Settings, Menu, Sun, Moon, Home, Folder } from 'lucide-react';
import { Link } from 'react-router-dom';
import AssessmentForm from '../components/AssessmentForm';

type View = 'dashboard' | 'form' | 'projects' | 'messages' | 'settings';

const ClientPortalPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static w-64 min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-white'} border-r ${darkMode ? 'border-slate-800' : 'border-gray-200'} p-4 md:p-6 transition-transform duration-300 z-50 flex flex-col`}>
          <Link to="/" className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm md:text-base">⚡</span>
            </div>
            <div>
              <h1 className="font-bold text-base md:text-lg">AI Ops Expert</h1>
              <p className={`text-xs md:text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Client Portal</p>
            </div>
          </Link>

          <nav className="space-y-1.5 md:space-y-2 flex-1">
            <h3 className={`text-xs font-semibold uppercase mb-2 md:mb-3 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Navigation</h3>
            <button
              onClick={() => {
                setActiveView('dashboard');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                activeView === 'dashboard'
                  ? darkMode ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-600'
                  : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => {
                setActiveView('form');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                activeView === 'form'
                  ? darkMode ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-600'
                  : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span>Client Form</span>
            </button>
            <button
              onClick={() => {
                setActiveView('projects');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                activeView === 'projects'
                  ? darkMode ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-600'
                  : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Menu className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span>Projects</span>
            </button>
            <button
              onClick={() => {
                setActiveView('messages');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                activeView === 'messages'
                  ? darkMode ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-600'
                  : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span>Messages</span>
            </button>
            <button
              onClick={() => {
                setActiveView('settings');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                activeView === 'settings'
                  ? darkMode ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-600'
                  : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span>Settings</span>
            </button>
          </nav>

          <Link
            to="/"
            className={`w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-lg mt-3 md:mt-4 transition-colors text-sm md:text-base ${
              darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Home className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span>Back to Home</span>
          </Link>

          <div className={`mt-auto pt-4 md:pt-8 border-t ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2 md:gap-3">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-gray-200'} flex items-center justify-center flex-shrink-0`}>
                <span className="text-xs md:text-sm font-semibold">CL</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm font-medium truncate">Client User</p>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'} truncate`}>client@example.com</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full lg:w-auto p-4 md:p-6 lg:p-8">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden p-2 rounded-lg ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-xl md:text-2xl font-bold">
                {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
              </h2>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
            >
              {darkMode ? <Sun className="w-5 h-5 md:w-6 md:h-6" /> : <Moon className="w-5 h-5 md:w-6 md:h-6" />}
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
    <div className="mb-6 md:mb-8">
      <p className={`text-sm md:text-base ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
        Here's an overview of your projects and recent activity.
      </p>
      <p className={`text-xs md:text-sm mt-2 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
        Monday, January 5, 2026
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      <div className={`p-4 md:p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <div className="p-2 bg-blue-600/10 rounded-lg">
            <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-1">3</h3>
        <p className={`text-sm md:text-base ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Active Projects</p>
        <p className="text-xs md:text-sm text-green-500 mt-2">+1 this month</p>
      </div>

      <div className={`p-4 md:p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <div className="p-2 bg-blue-600/10 rounded-lg">
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-1">24</h3>
        <p className={`text-sm md:text-base ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Tasks Completed</p>
        <p className={`text-xs md:text-sm mt-2 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>85% completion rate</p>
      </div>

      <div className={`p-4 md:p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <div className="p-2 bg-blue-600/10 rounded-lg">
            <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-1">5</h3>
        <p className={`text-sm md:text-base ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Upcoming Deadlines</p>
        <p className={`text-xs md:text-sm mt-2 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Next: Dec 15</p>
      </div>

      <div className={`p-4 md:p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <div className="p-2 bg-blue-600/10 rounded-lg">
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-1">92%</h3>
        <p className={`text-sm md:text-base ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Engagement Score</p>
        <p className="text-xs md:text-sm text-green-500 mt-2">+5% from last month</p>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4 md:gap-6">
      <div className={`p-4 md:p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-1">Recent Activity</h3>
            <p className={`text-xs md:text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Latest updates across your projects</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3 md:gap-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium mb-1 text-sm md:text-base">Project milestone completed</h4>
              <p className={`text-xs md:text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Website Redesign</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>2 hours ago</p>
            </div>
          </div>

          <div className="flex gap-3 md:gap-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium mb-1 text-sm md:text-base">New task assigned</h4>
              <p className={`text-xs md:text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>AI Integration</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectsView = ({ darkMode }: { darkMode: boolean }) => (
  <div className="space-y-4 md:space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {['Website Redesign', 'AI Integration', 'Mobile App'].map((project, idx) => (
        <div
          key={idx}
          className={`p-4 md:p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'} hover:border-blue-600 transition-colors cursor-pointer`}
        >
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <div className="p-2 bg-blue-600/10 rounded-lg">
              <Folder className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            </div>
            <h3 className="text-base md:text-lg font-semibold">{project}</h3>
          </div>
          <p className={`text-xs md:text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-3 md:mb-4`}>
            {idx === 0 && 'Complete redesign of company website with modern UI'}
            {idx === 1 && 'Implementation of AI-powered features'}
            {idx === 2 && 'Native mobile application development'}
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className={`text-xs px-2 md:px-3 py-1 rounded-full whitespace-nowrap ${
              idx === 0 ? 'bg-green-500/10 text-green-500' :
              idx === 1 ? 'bg-yellow-500/10 text-yellow-500' :
              'bg-blue-500/10 text-blue-500'
            }`}>
              {idx === 0 && 'In Progress'}
              {idx === 1 && 'Planning'}
              {idx === 2 && 'Starting Soon'}
            </span>
            <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-500'} whitespace-nowrap`}>
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
  <div className={`p-4 md:p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
    <p className={`text-sm md:text-base ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
      No messages yet. Check back later for updates from your project team.
    </p>
  </div>
);

const SettingsView = ({ darkMode }: { darkMode: boolean }) => (
  <div className={`p-4 md:p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
    <div className="space-y-4 md:space-y-6">
      <div>
        <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Account Settings</h3>
        <div className="space-y-3 md:space-y-4">
          <div>
            <label className={`block text-xs md:text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              defaultValue="client@example.com"
              className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>
          <div>
            <label className={`block text-xs md:text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Client User"
              className={`w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>
          <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 text-sm md:text-base rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ClientPortalPage;
