import React, { useState } from 'react';
import {
  Search,
  Zap,
  Bell,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';

const Navbar = () => {
  const [notificationCount] = useState(3);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        
        {/* Left section - Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Collabrix</span>
        </div>

        {/* Center section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600" size={18} />
            <input
              type="text"
              placeholder="Search workspaces, projects..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Right section - Actions & Profile */}
        <div className="flex items-center gap-4">
          
          {/* AI Assistant button */}
          <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Zap size={18} className="text-amber-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ask AI</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
            <Bell size={20} className="text-gray-600 dark:text-gray-400" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Messages */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
            <MessageCircle size={20} className="text-gray-600 dark:text-gray-400" />
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                AB
              </div>
              <ChevronDown size={16} className="text-gray-600 dark:text-gray-400" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg py-2">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Alex Bennett</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">alex@collabrix.com</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  Profile Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  Preferences
                </button>
                <div className="border-t border-gray-200 dark:border-gray-800 mt-2 pt-2">
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;