import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FolderOpen,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Plus,
  Calendar,
  Lightbulb,
} from 'lucide-react';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [featuredProjectId] = useState(1);

  // Overview cards data
  const overviewStats = [
    { label: 'Total Projects',      value: '18', icon: FolderOpen,  color: 'bg-indigo-50  text-indigo-500  dark:bg-indigo-500/10  dark:text-indigo-400'  },
    { label: 'Active Projects',     value: '12', icon: TrendingUp,  color: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400' },
    { label: 'Completed Projects',  value: '5',  icon: CheckCircle, color: 'bg-violet-50  text-violet-500  dark:bg-violet-500/10  dark:text-violet-400'  },
    { label: 'Projects At Risk',    value: '1',  icon: AlertCircle, color: 'bg-red-50     text-red-500     dark:bg-red-500/10     dark:text-red-400'     },
  ];

  // Projects data
  const projectsData = [
    {
      id: 1,
      name: 'API Gateway Migration',
      description: 'Migrate legacy gateway to modern microservices architecture',
      workspace: 'Product Engineering',
      workspaceColor: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300',
      progress: 68,
      status: 'On Track',
      priority: 'High',
      dueDate: '2024-07-20',
      members: 5,
      avatars: ['SC', 'MJ', 'AR', 'TP'],
      health: '2 Reviews Pending',
      lastActivity: 'Sarah merged Authentication PR',
      activityTime: '2 hours ago',
    },
    {
      id: 2,
      name: 'Dashboard Redesign',
      description: 'Complete UI/UX overhaul of the main dashboard interface',
      workspace: 'Design Studio',
      workspaceColor: 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300',
      progress: 45,
      status: 'At Risk',
      priority: 'High',
      dueDate: '2024-08-10',
      members: 4,
      avatars: ['ER', 'CJ', 'NP'],
      health: '3 Tasks Due Today',
      lastActivity: 'Design review scheduled',
      activityTime: '1 hour ago',
    },
    {
      id: 3,
      name: 'Authentication Service',
      description: 'Implement OAuth 2.0 and JWT-based authentication system',
      workspace: 'Product Engineering',
      workspaceColor: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300',
      progress: 82,
      status: 'On Track',
      priority: 'Critical',
      dueDate: '2024-06-30',
      members: 3,
      avatars: ['JT', 'PP'],
      health: 'Everything On Schedule',
      lastActivity: 'Deployment completed',
      activityTime: 'Today',
    },
    {
      id: 4,
      name: 'AI Workspace Assistant',
      description: 'Develop AI-powered assistant for workspace management',
      workspace: 'AI Research Lab',
      workspaceColor: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300',
      progress: 55,
      status: 'On Track',
      priority: 'High',
      dueDate: '2024-08-25',
      members: 6,
      avatars: ['MC', 'RP', 'TK', 'SK'],
      health: '1 Deployment Blocked',
      lastActivity: 'Meeting summary generated',
      activityTime: 'Today',
    },
    {
      id: 5,
      name: 'Mobile Application',
      description: 'Native iOS and Android app for Collabrix platform',
      workspace: 'Product Engineering',
      workspaceColor: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300',
      progress: 35,
      status: 'Delayed',
      priority: 'Medium',
      dueDate: '2024-09-15',
      members: 6,
      avatars: ['SK', 'MC', 'RK', 'AS'],
      health: '5 Tasks Overdue',
      lastActivity: 'Sprint planning scheduled',
      activityTime: 'Yesterday',
    },
    {
      id: 6,
      name: 'Marketing Website',
      description: 'Redesign and optimize company marketing website',
      workspace: 'Marketing Team',
      workspaceColor: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
      progress: 78,
      status: 'On Track',
      priority: 'Medium',
      dueDate: '2024-07-15',
      members: 4,
      avatars: ['CJ', 'PS', 'AB'],
      health: 'Ready for Review',
      lastActivity: 'Content updated',
      activityTime: '2 days ago',
    },
    {
      id: 7,
      name: 'HR Management Portal',
      description: 'Build internal HR system for employee management',
      workspace: 'Startup Operations',
      workspaceColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
      progress: 42,
      status: 'On Track',
      priority: 'Medium',
      dueDate: '2024-09-01',
      members: 3,
      avatars: ['JD', 'EM', 'LW'],
      health: '2 Approvals Pending',
      lastActivity: 'Database schema updated',
      activityTime: '3 days ago',
    },
    {
      id: 8,
      name: 'Analytics Platform',
      description: 'Real-time analytics and reporting dashboard',
      workspace: 'Data Platform',
      workspaceColor: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
      progress: 25,
      status: 'On Track',
      priority: 'Low',
      dueDate: '2024-10-15',
      members: 5,
      avatars: ['AG', 'FG', 'MH', 'RI'],
      health: 'Planning Phase',
      lastActivity: 'Requirements finalized',
      activityTime: '1 week ago',
    },
  ];

  const MEMBER_COLORS = [
    'bg-indigo-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500',
    'bg-rose-500', 'bg-cyan-500', 'bg-orange-500',
  ];

  // Helper functions for styling
  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400';
      case 'At Risk':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
      case 'Delayed':
        return 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      case 'Completed':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400';
      default:
        return 'bg-zinc-100 text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      case 'High':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
      case 'Medium':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400';
      case 'Low':
        return 'bg-zinc-100 text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-400';
      default:
        return 'bg-zinc-100 text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-400';
    }
  };

  const getHealthColor = (health) => {
    if (health.includes('On Schedule') || health.includes('Ready')) {
      return 'text-emerald-600 dark:text-emerald-400';
    } else if (health.includes('Pending') || health.includes('Review')) {
      return 'text-blue-600 dark:text-blue-400';
    } else if (health.includes('Blocked') || health.includes('Overdue')) {
      return 'text-red-600 dark:text-red-400';
    }
    return 'text-zinc-500 dark:text-zinc-400';
  };

  // Header section
  const HeaderSection = () => (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[24px]">
            Projects
          </h1>
          <p className="mt-1 text-[13.5px] text-zinc-500 dark:text-zinc-400">
            Manage and monitor every project across all your workspaces.
          </p>
        </div>
        <button className="group/btn relative shrink-0 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500">
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
          <span className="relative flex items-center gap-1.5">
            <Plus size={14} />
            Create Project
          </span>
        </button>
      </div>
    </div>
  );

  // Overview cards section
  const OverviewSection = () => (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {overviewStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-5 py-4 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.color}`}>
                <Icon size={18} />
              </div>
              <p className="mt-3 text-[12px] font-medium text-zinc-500 dark:text-zinc-400">{stat.label}</p>
              <p className="mt-0.5 text-[24px] font-bold leading-none tracking-tight text-zinc-900 dark:text-zinc-50">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Featured AI Insight card
  const AIInsightCard = () => {
    const featured = projectsData.find((p) => p.id === featuredProjectId);
    return (
      <div className="mb-8">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-5 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025] sm:p-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
              <Lightbulb size={14} />
            </div>
            <div>
              <p className="text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">AI Project Insight</p>
              <p className="text-[11.5px] text-zinc-400 dark:text-zinc-500">Featured project analysis</p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
              {featured?.name}
            </h4>
            <div className="mt-2.5 space-y-2">
              <div className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400 dark:bg-indigo-500" />
                <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {featured?.name} is progressing well at {featured?.progress}% completion.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400 dark:bg-indigo-500" />
                <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {featured?.health}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400 dark:bg-indigo-500" />
                <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Expected to finish on schedule before {new Date(featured?.dueDate || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-zinc-100 pt-3.5 dark:border-white/[0.05]">
              <p className="text-[12.5px] font-medium text-indigo-600 dark:text-indigo-400">
                Recommendation: Focus on completing pending reviews to unblock deployment.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Project card component
  const ProjectCard = ({ project, isFeatured, isHovered }) => (
    <NavLink
      to={"projectId"}
      className={`group relative block overflow-hidden rounded-2xl border bg-white/70 backdrop-blur-sm transition-all duration-200 dark:bg-white/[0.025] ${
        isFeatured
          ? 'border-indigo-300/70 shadow-[0_8px_30px_-12px_rgba(79,70,229,0.25)] dark:border-indigo-500/30'
          : isHovered
          ? '-translate-y-0.5 border-zinc-300/80 shadow-[0_8px_30px_-12px_rgba(24,24,27,0.1)] dark:border-white/[0.1] dark:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)]'
          : 'border-zinc-200/70 dark:border-white/[0.06]'
      }`}
      onMouseEnter={() => setHoveredProject(project.id)}
      onMouseLeave={() => setHoveredProject(null)}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      {/* Project header */}
      <div className="border-b border-zinc-100 p-5 dark:border-white/[0.05]">
        <h3 className="text-[14px] font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
          {project.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${project.workspaceColor}`}>
            {project.workspace}
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${getPriorityColor(project.priority)}`}>
            {project.priority}
          </span>
        </div>
      </div>

      {/* Project content */}
      <div className="space-y-3.5 p-5">
        {/* Progress bar */}
        <div>
          <div className="mb-1.5 flex items-center justify-between text-[11px]">
            <span className="font-medium text-zinc-500 dark:text-zinc-400">Progress</span>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">{project.progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Status and health */}
        <div className="flex items-center justify-between gap-2">
          <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <span className={`truncate text-[11.5px] font-medium ${getHealthColor(project.health)}`}>
            {project.health}
          </span>
        </div>

        {/* Activity preview */}
        <div className="border-t border-zinc-100 pt-3 dark:border-white/[0.05]">
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Recent Activity</p>
          <p className="mt-0.5 truncate text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
            {project.lastActivity}
          </p>
          <p className="mt-0.5 text-[11px] text-zinc-400 dark:text-zinc-500">{project.activityTime}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-100 pt-3.5 dark:border-white/[0.05]">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {project.avatars.slice(0, 3).map((avatar, idx) => (
                <div
                  key={idx}
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[8px] font-bold text-white dark:border-[#0B0C10] ${MEMBER_COLORS[idx % MEMBER_COLORS.length]}`}
                >
                  {avatar}
                </div>
              ))}
              {project.avatars.length > 3 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-zinc-200 text-[8px] font-bold text-zinc-600 dark:border-[#0B0C10] dark:bg-white/[0.1] dark:text-zinc-300">
                  +{project.avatars.length - 3}
                </div>
              )}
            </div>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500">{project.members} members</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500">
            <Calendar size={12} />
            {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>
    </NavLink>
  );

  // Projects grid section
  const ProjectsGridSection = () => (
    <div className="pb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">All Projects</h2>
        <span className="text-[12.5px] font-medium text-zinc-400 dark:text-zinc-500">
          {projectsData.length} projects
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isFeatured={project.id === featuredProjectId}
            isHovered={hoveredProject === project.id}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <HeaderSection />
      <OverviewSection />
      <AIInsightCard />
      <ProjectsGridSection />
    </>
  );
};

export default Projects;
