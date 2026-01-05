import React, { useState } from 'react';
import { BarChart3, CheckCircle, Clock, TrendingUp, FileText, MessageSquare, Settings, Menu, Sun, Moon } from 'lucide-react';

const ClientPortalPage = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-white'} border-r ${darkMode ? 'border-slate-800' : 'border-gray-200'} p-6`}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">⚡</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">AI Ops Expert</h1>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Client Portal</p>
            </div>
          </div>

          <nav className="space-y-2">
            <h3 className={`text-xs font-semibold uppercase mb-3 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Navigation</h3>
            <button className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-600'}`}>
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'}`}>
              <FileText className="w-5 h-5" />
              <span>Client Form</span>
            </button>
            <button className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Menu className="w-5 h-5" />
              <span>Projects</span>
            </button>
            <button className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'}`}>
              <MessageSquare className="w-5 h-5" />
              <span>Messages</span>
            </button>
            <button className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>

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
            <div className="flex items-center gap-4">
              <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}>
                <Menu className="w-6 h-6" />
              </button>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
            <p className={darkMode ? 'text-slate-400' : 'text-gray-600'}>
              Here's an overview of your projects and recent activity.
            </p>
            <p className={`text-sm mt-2 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
              Monday, January 5, 2026
            </p>
          </div>

          {/* Stats Grid */}
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

          {/* Recent Activity and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`lg:col-span-2 p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-1">Recent Activity</h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Latest updates across your projects</p>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                  View all
                  <span>→</span>
                </button>
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

            <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} border ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
              <h3 className="text-xl font-bold mb-1">Quick Actions</h3>
              <p className={`text-sm mb-6 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Common tasks at your fingertips</p>

              <button className={`w-full flex items-center gap-3 p-4 rounded-lg ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
                <FileText className="w-5 h-5" />
                <div className="flex-1 text-left">
                  <p className="font-medium">Complete Client Form</p>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Submit your project information</p>
                </div>
                <span>→</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientPortalPage;
