import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FolderOpen,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  Calendar,
  Users,
  Eye,
  Lightbulb,
  Activity,
  Zap,
} from 'lucide-react';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [featuredProjectId] = useState(1);

  // Overview cards data
  const overviewStats = [
    { label: 'Total Projects', value: '18', icon: FolderOpen, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    { label: 'Active Projects', value: '12', icon: TrendingUp, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    { label: 'Completed Projects', value: '5', icon: CheckCircle, color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
    { label: 'Projects At Risk', value: '1', icon: AlertCircle, color: 'bg-red-500/10 text-red-600 dark:text-red-400' },
  ];

  // Projects data
  const projectsData = [
    {
      id: 1,
      name: 'API Gateway Migration',
      description: 'Migrate legacy gateway to modern microservices architecture',
      workspace: 'Product Engineering',
      workspaceColor: 'from-blue-400 to-purple-500',
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
      workspaceColor: 'from-pink-400 to-rose-500',
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
      workspaceColor: 'from-blue-400 to-purple-500',
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
      workspaceColor: 'from-cyan-400 to-blue-500',
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
      workspaceColor: 'from-blue-400 to-purple-500',
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
      workspaceColor: 'from-orange-400 to-red-500',
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
      workspaceColor: 'from-green-400 to-emerald-500',
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
      workspaceColor: 'from-indigo-400 to-purple-500',
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

  // Helper functions for styling
  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
      case 'At Risk':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400';
      case 'Delayed':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      case 'Completed':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400';
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      case 'High':
        return 'bg-orange-500/10 text-orange-700 dark:text-orange-400';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400';
      case 'Low':
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
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
    return 'text-gray-600 dark:text-gray-400';
  };

  // Header section
  const HeaderSection = () => (
    <div className="mb-10">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage and monitor every project across all your workspaces.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm hover:shadow-md whitespace-nowrap flex-shrink-0">
          <Plus size={18} />
          Create Project
        </button>
      </div>
    </div>
  );

  // Overview cards section
  const OverviewSection = () => (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
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
      <div className="mb-10">
        <div className="border border-gray-200 dark:border-gray-800 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 overflow-hidden p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
              <Lightbulb size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Project Insight</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Featured project analysis</p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
              {featured?.name}
            </h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                • {featured?.name} is progressing well at {featured?.progress}% completion.
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                • {featured?.health}
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                • Expected to finish on schedule before {new Date(featured?.dueDate || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.
              </p>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-4">
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
      className={`border-2 rounded-xl bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 ${
        isFeatured
          ? 'border-blue-300 dark:border-blue-700 shadow-lg ring-1 ring-blue-200 dark:ring-blue-800'
          : isHovered
          ? 'border-gray-300 dark:border-gray-700 shadow-lg'
          : 'border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md'
      }`}
      onMouseEnter={() => setHoveredProject(project.id)}
      onMouseLeave={() => setHoveredProject(null)}
    >
      {/* Project header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-800/50 dark:to-transparent">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
              {project.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
              {project.description}
            </p>
          </div>
        </div>

        {/* Workspace badge and priority */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.workspaceColor} text-white shadow-sm`}>
            {project.workspace}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
            {project.priority}
          </span>
        </div>
      </div>

      {/* Project content */}
      <div className="p-6 space-y-4">
        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Progress</span>
            <span className="text-xs font-semibold text-gray-900 dark:text-white">{project.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Status and health */}
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <span className={`text-xs font-medium ${getHealthColor(project.health)}`}>
            {project.health}
          </span>
        </div>

        {/* Activity preview */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Recent Activity</p>
          <p className="text-sm text-gray-900 dark:text-gray-100 font-medium truncate">
            {project.lastActivity}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{project.activityTime}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {project.avatars.slice(0, 3).map((avatar, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold border border-white dark:border-gray-900 shadow-sm"
                >
                  {avatar}
                </div>
              ))}
              {project.avatars.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 text-xs font-bold border border-white dark:border-gray-900 shadow-sm">
                  +{project.avatars.length - 3}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{project.members} members</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
            <Calendar size={14} />
            {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>
    </NavLink>
  );

  // Projects grid section
  const ProjectsGridSection = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Projects</h2>
        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {projectsData.length} projects
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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