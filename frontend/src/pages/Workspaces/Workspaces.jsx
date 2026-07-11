import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  Clock,
  AlertCircle,
  Plus,
  MessageSquare,
  FolderOpen,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Workspaces = () => {
  // Dummy data for overview cards
  const overviewStats = [
    { label: 'Workspaces Joined', value: '12', icon: Briefcase, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    { label: 'Active Projects', value: '27', icon: FolderOpen, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    { label: 'Pending Invitations', value: '3', icon: AlertCircle, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
    { label: 'Members Across Workspaces', value: '84', icon: Users, color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
  ];

  // Dummy workspace data
  const workspacesData = [
    {
      id: 1,
      name: 'Product Engineering',
      description: 'Core product development and feature engineering',
      role: 'Owner',
      members: 12,
      projects: 8,
      channels: 24,
      lastActivity: '2 hours ago',
      status: 'Active',
      avatars: ['AB', 'SK', 'NJ', '+9'],
      health: '2 approvals pending',
      activitySnippet: 'Sarah commented on API Review',
    },
    {
      id: 2,
      name: 'AI Research Lab',
      description: 'Advanced AI model research and experimentation',
      role: 'Admin',
      members: 8,
      projects: 5,
      channels: 18,
      lastActivity: '15 minutes ago',
      status: 'Active',
      avatars: ['MC', 'RP', 'TK', '+5'],
      health: '5 active discussions',
      activitySnippet: 'Meeting summary generated',
    },
    {
      id: 3,
      name: 'Startup Operations',
      description: 'Business operations and strategic planning',
      role: 'Member',
      members: 6,
      projects: 3,
      channels: 12,
      lastActivity: '4 hours ago',
      status: 'Busy',
      avatars: ['JD', 'EM', 'LW', '+3'],
      health: 'Everything is up to date',
      activitySnippet: 'New member joined',
    },
    {
      id: 4,
      name: 'Marketing Team',
      description: 'Marketing campaigns and brand strategy',
      role: 'Member',
      members: 5,
      projects: 6,
      channels: 14,
      lastActivity: '1 day ago',
      status: 'Needs Attention',
      avatars: ['CJ', 'PS', '+3'],
      health: '3 pending reviews',
      activitySnippet: 'Campaign launch scheduled',
    },
    {
      id: 5,
      name: 'Design Studio',
      description: 'UI/UX design and brand guidelines',
      role: 'Admin',
      members: 4,
      projects: 7,
      channels: 10,
      lastActivity: '30 minutes ago',
      status: 'Active',
      avatars: ['AS', 'MK', '+2'],
      health: 'Design review in progress',
      activitySnippet: 'New mockups uploaded',
    },
    {
      id: 6,
      name: 'Personal Workspace',
      description: 'Personal projects and experiments',
      role: 'Owner',
      members: 1,
      projects: 2,
      channels: 3,
      lastActivity: '3 days ago',
      status: 'Active',
      avatars: ['You'],
      health: 'Everything is up to date',
      activitySnippet: 'Last updated 3 days ago',
    },
  ];

  const [hoveredCard, setHoveredCard] = useState(null);

  // Role badge styling
  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'Owner':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900';
      case 'Admin':
        return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-900';
      case 'Member':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900';
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-900';
    }
  };

  // Status indicator styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-l-4 border-emerald-500';
      case 'Busy':
        return 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border-l-4 border-amber-500';
      case 'Needs Attention':
        return 'bg-red-500/20 text-red-700 dark:text-red-400 border-l-4 border-red-500';
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-l-4 border-gray-500';
    }
  };

  // Overview card component
  const OverviewCard = ({ label, value, icon: Icon, color }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-200 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700">
      <div className={`p-2.5 rounded-lg ${color}`}>
        <Icon size={20} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );

  // Workspace card component
  const WorkspaceCard = ({ workspace, isHovered }) => (
    <NavLink
      to={":workspaceId"}
      className={`relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300 cursor-pointer
        ${isHovered ? 'shadow-lg border-gray-300 dark:border-gray-700 -translate-y-1' : 'shadow-sm hover:shadow-md'}`}
      onMouseEnter={() => setHoveredCard(workspace.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Header with name and role badge */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-800/50 dark:to-transparent p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
              {workspace.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {workspace.description}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getRoleBadgeStyle(workspace.role)}`}>
            {workspace.role}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4 space-y-4">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-1">Members</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{workspace.members}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-1">Projects</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{workspace.projects}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-1">Channels</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{workspace.channels}</p>
          </div>
        </div>

        {/* Health indicator */}
        {/* <div className={`rounded-lg p-3 text-sm font-medium flex items-center gap-2 ${getStatusStyle(workspace.status)}`}>
          <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
          {workspace.health}
        </div> */}

        {/* Activity preview */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Recent Activity</p>
          <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
            {workspace.activitySnippet}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{workspace.lastActivity}</p>
        </div>

        {/* Member avatars */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
          <div className="flex -space-x-2">
            {workspace.avatars.slice(0, 3).map((avatar, idx) => (
              <div
                key={idx}
                className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white border border-white dark:border-gray-900 shadow-sm"
              >
                {avatar}
              </div>
            ))}
            {workspace.avatars.length > 3 && (
              <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300 border border-white dark:border-gray-900 shadow-sm">
                {workspace.avatars[3]}
              </div>
            )}
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium ml-1">
            Workspace
          </span>
        </div>
      </div>
    </NavLink>
  );

  return (
    <>
      {/* Header section */}
      <div className="flex items-start justify-between gap-6 mb-10">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Workspaces
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your teams, projects, conversations, and collaboration spaces.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap">
          <Plus size={18} />
          Create Workspace
        </button>
      </div>

      {/* Overview cards section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {overviewStats.map((stat, idx) => (
          <OverviewCard key={idx} {...stat} />
        ))}
      </div>

      {/* Workspaces grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspacesData.map((workspace) => (
          <WorkspaceCard
            key={workspace.id}
            workspace={workspace}
            isHovered={hoveredCard === workspace.id}
          />
        ))}
      </div>
    </>
  );
};

export default Workspaces;