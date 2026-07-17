import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  Clock,
  AlertCircle,
  Plus,
  FolderOpen,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import CreateWorkspaceModal from './CreateWorkspaceModal';

const Workspaces = () => {
  // Dummy data for overview cards
  const overviewStats = [
    { label: 'Workspaces Joined',             value: '12', icon: Briefcase,  color: 'bg-indigo-50  text-indigo-500  dark:bg-indigo-500/10  dark:text-indigo-400'  },
    { label: 'Active Projects',                value: '27', icon: FolderOpen, color: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400' },
    { label: 'Pending Invitations',             value: '3',  icon: AlertCircle, color: 'bg-amber-50   text-amber-500   dark:bg-amber-500/10   dark:text-amber-400'   },
    { label: 'Members Across Workspaces',       value: '84', icon: Users,      color: 'bg-violet-50  text-violet-500  dark:bg-violet-500/10  dark:text-violet-400'  },
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

  const MEMBER_COLORS = [
    'bg-indigo-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500',
    'bg-rose-500', 'bg-cyan-500', 'bg-orange-500',
  ];

  const [hoveredCard, setHoveredCard] = useState(null);

  // Role badge styling
  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'Owner':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400';
      case 'Admin':
        return 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400';
      case 'Member':
        return 'bg-zinc-100 text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-400';
      default:
        return 'bg-zinc-100 text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-400';
    }
  };

  // Status indicator styling (dot + text — kept for parity with the
  // original component even though its usage block below is commented out)
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return { dot: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400' };
      case 'Busy':
        return { dot: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-400' };
      case 'Needs Attention':
        return { dot: 'bg-red-500', text: 'text-red-700 dark:text-red-400' };
      default:
        return { dot: 'bg-zinc-400 dark:bg-zinc-600', text: 'text-zinc-600 dark:text-zinc-400' };
    }
  };

  // Overview card component — static info card, no hover lift (matches the
  // non-interactive summary cards used everywhere else in the app)
  const OverviewCard = ({ label, value, icon: Icon, color }) => (
    <div className="relative flex items-start gap-3.5 overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-4 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
        <p className="mt-0.5 text-[22px] font-bold leading-none tracking-tight text-zinc-900 dark:text-zinc-50">{value}</p>
      </div>
    </div>
  );

  const [showModal, setShowModal] = useState(false);

  // Workspace card component
  const WorkspaceCard = ({ workspace, isHovered }) => (
    <NavLink
      to={":workspaceId"}
      className={`group relative block cursor-pointer overflow-hidden rounded-2xl border bg-white/70 backdrop-blur-sm transition-all duration-200 dark:bg-white/[0.025] ${
        isHovered
          ? '-translate-y-0.5 border-zinc-300/80 shadow-[0_8px_30px_-12px_rgba(24,24,27,0.1)] dark:border-white/[0.1] dark:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)]'
          : 'border-zinc-200/70 dark:border-white/[0.06]'
      }`}
      onMouseEnter={() => setHoveredCard(workspace.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      {/* Header with name and role badge */}
      <div className="border-b border-zinc-100 p-5 dark:border-white/[0.05]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-[14px] font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
              {workspace.name}
            </h3>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              {workspace.description}
            </p>
          </div>
          <span className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium ${getRoleBadgeStyle(workspace.role)}`}>
            {workspace.role}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="space-y-3.5 p-5">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="rounded-xl bg-zinc-50/80 p-2.5 text-center dark:bg-white/[0.03]">
            <p className="mb-0.5 text-[10.5px] font-medium text-zinc-500 dark:text-zinc-400">Members</p>
            <p className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">{workspace.members}</p>
          </div>
          <div className="rounded-xl bg-zinc-50/80 p-2.5 text-center dark:bg-white/[0.03]">
            <p className="mb-0.5 text-[10.5px] font-medium text-zinc-500 dark:text-zinc-400">Projects</p>
            <p className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">{workspace.projects}</p>
          </div>
          <div className="rounded-xl bg-zinc-50/80 p-2.5 text-center dark:bg-white/[0.03]">
            <p className="mb-0.5 text-[10.5px] font-medium text-zinc-500 dark:text-zinc-400">Channels</p>
            <p className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">{workspace.channels}</p>
          </div>
        </div>

        {/* Health indicator */}
        {/* <div className={`flex items-center gap-2 rounded-xl p-3 text-[13px] font-medium ${getStatusStyle(workspace.status).text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${getStatusStyle(workspace.status).dot}`} />
          {workspace.health}
        </div> */}

        {/* Activity preview */}
        <div className="border-t border-zinc-100 pt-3 dark:border-white/[0.05]">
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Recent Activity</p>
          <p className="mt-0.5 truncate text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
            {workspace.activitySnippet}
          </p>
          <p className="mt-0.5 text-[11px] text-zinc-400 dark:text-zinc-500">{workspace.lastActivity}</p>
        </div>

        {/* Member avatars */}
        <div className="flex items-center gap-2 border-t border-zinc-100 pt-3 dark:border-white/[0.05]">
          <div className="flex -space-x-1.5">
            {workspace.avatars.slice(0, 3).map((avatar, idx) => (
              <div
                key={idx}
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold text-white dark:border-[#0B0C10] ${MEMBER_COLORS[idx % MEMBER_COLORS.length]}`}
              >
                {avatar}
              </div>
            ))}
            {workspace.avatars.length > 3 && (
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-zinc-200 text-[9px] font-bold text-zinc-600 dark:border-[#0B0C10] dark:bg-white/[0.1] dark:text-zinc-300">
                {workspace.avatars[3]}
              </div>
            )}
          </div>
          <span className="ml-1 text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
            Workspace
          </span>
        </div>
      </div>
    </NavLink>
  );

  return (
    <>
      {/* Header section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[24px]">
            Workspaces
          </h1>
          <p className="mt-1 text-[13.5px] text-zinc-500 dark:text-zinc-400">
            Manage your teams, projects, conversations, and collaboration spaces.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)} 
          className="group/btn relative shrink-0 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500">
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
          <span className="relative flex items-center gap-1.5">
            <Plus size={14} />
            Create Workspace
          </span>
        </button>

        {showModal && (
          <CreateWorkspaceModal onClose={() => setShowModal(false)} />
        )}
      </div>

      {/* Overview cards section */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {overviewStats.map((stat, idx) => (
          <OverviewCard key={idx} {...stat} />
        ))}
      </div>

      {/* Workspaces grid */}
      <div className="grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3">
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
