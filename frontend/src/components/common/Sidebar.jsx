import React, { useState } from 'react';
import {
  LayoutGrid,
  Briefcase,
  FolderOpen,
  CheckSquare,
  MessageSquare,
  FileText,
  Zap,
  Users,
  ChevronRight,
  Plus,
  MoreHorizontal,
} from 'lucide-react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedSection, setExpandedSection] = useState('workspaces');

  const mainMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'workspaces', label: 'Workspaces', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'chats', label: 'Chats', icon: MessageSquare },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  const secondaryMenuItems = [
    { id: 'ai-assistant', label: 'AI Assistant', icon: Zap },
    { id: 'team', label: 'Team', icon: Users },
  ];

  const workspacesData = [
    { id: 'prod-eng', label: 'Product Eng', initial: 'PE' },
    { id: 'ai-lab', label: 'AI Lab', initial: 'AL' },
    { id: 'startup-ops', label: 'Startup Ops', initial: 'SO' },
  ];

  const MenuItem = ({ item, isActive, onClick }) => {
    const Icon = item.icon;
    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
          isActive
            ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
            : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'
        }`}
      >
        <Icon size={18} />
        <span>{item.label}</span>
        {isActive && <ChevronRight size={16} className="ml-auto" />}
      </button>
    );
  };

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
      <div className="p-4 space-y-6">
        
        {/* Main Menu */}
        <div className="space-y-1">
          {mainMenuItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-800" />

        {/* Workspaces Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-4">
            <button
              onClick={() => setExpandedSection(expandedSection === 'workspaces' ? null : 'workspaces')}
              className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-400 transition-colors"
            >
              <span>Your Workspaces</span>
              <ChevronRight
                size={14}
                className={`transition-transform duration-200 ${
                  expandedSection === 'workspaces' ? 'rotate-90' : ''
                }`}
              />
            </button>
            <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
              <Plus size={14} className="text-gray-500 dark:text-gray-500" />
            </button>
          </div>

          {expandedSection === 'workspaces' && (
            <div className="space-y-1">
              {workspacesData.map((workspace) => (
                <button
                  key={workspace.id}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-sm"
                >
                  <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {workspace.initial}
                  </div>
                  <span className="flex-1 text-left truncate">{workspace.label}</span>
                  <MoreHorizontal size={14} className="text-gray-400 dark:text-gray-600 opacity-0 hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-800" />

        {/* Secondary Menu */}
        <div className="space-y-1">
          {secondaryMenuItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;