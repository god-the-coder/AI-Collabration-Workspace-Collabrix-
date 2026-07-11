import React, { useState } from 'react';
import {
  Users,
  FolderOpen,
  CheckSquare,
  AlertCircle,
  MessageSquare,
  Zap,
  ArrowRight,
  Calendar,
  Clock,
  FileText,
  Activity,
  Lightbulb,
  TrendingUp,
  UserPlus,
  MoreHorizontal,
  Play,
  Eye,
} from 'lucide-react';

const WorkspaceDetailed = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  // Workspace header data
  const workspaceHeader = {
    name: 'Product Engineering',
    description: 'Core product development workspace.',
    role: 'Owner',
    members: 12,
    projects: 8,
    channels: 24,
    avatar: 'PE',
  };

  // Workspace Pulse stats
  const pulseStats = [
    { label: 'Active Projects', value: '8', icon: FolderOpen, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    { label: 'Tasks Due Today', value: '14', icon: CheckSquare, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    { label: 'Pending Reviews', value: '5', icon: AlertCircle, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
    { label: 'Blocked Items', value: '2', icon: Clock, color: 'bg-red-500/10 text-red-600 dark:text-red-400' },
  ];

  // Active projects data
  const projectsData = [
    {
      id: 1,
      name: 'API Gateway Migration',
      progress: 68,
      status: 'In Progress',
      dueDate: '2024-07-20',
      members: 5,
      lastActivity: '30 minutes ago',
      avatars: ['SC', 'MJ', 'AR', 'TP'],
    },
    {
      id: 2,
      name: 'Dashboard Redesign',
      progress: 45,
      status: 'In Progress',
      dueDate: '2024-08-10',
      members: 4,
      lastActivity: '1 hour ago',
      avatars: ['ER', 'CJ', 'NP'],
    },
    {
      id: 3,
      name: 'Authentication Service',
      progress: 82,
      status: 'In Progress',
      dueDate: '2024-06-30',
      members: 3,
      lastActivity: '45 minutes ago',
      avatars: ['JT', 'PP'],
    },
    {
      id: 4,
      name: 'Mobile Application',
      progress: 35,
      status: 'Planning',
      dueDate: '2024-09-15',
      members: 6,
      lastActivity: '2 hours ago',
      avatars: ['SK', 'MC', 'RK', 'AS'],
    },
  ];

  // Chat messages data
  const chatMessages = [
    { id: 1, user: 'Sarah', message: 'Morning everyone. API review scheduled for 2 PM.' },
    { id: 2, user: 'Arjun', message: 'Authentication module deployed successfully 🚀' },
    { id: 3, user: 'Meeting Bot', message: 'Sprint summary generated - 94% velocity.' },
  ];

  // Recent activity data
  const recentActivity = [
    { id: 1, icon: FolderOpen, text: 'Sarah created a new project', time: '2 hours ago' },
    { id: 2, icon: FileText, text: 'API Review document updated', time: '4 hours ago' },
    { id: 3, icon: CheckSquare, text: 'Sprint planning completed', time: '6 hours ago' },
    { id: 4, icon: UserPlus, text: 'Jamie Thompson joined the team', time: '1 day ago' },
    { id: 5, icon: Play, text: 'Deployment to production completed', time: '1 day ago' },
  ];

  // Team members data
  const teamMembers = [
    { id: 1, name: 'Sarah Chen', role: 'Backend Engineer', status: 'Online', avatar: 'SC' },
    { id: 2, name: 'Arjun Patel', role: 'Frontend Engineer', status: 'In Meeting', avatar: 'AR' },
    { id: 3, name: 'Elena Rodriguez', role: 'Product Owner', status: 'Available', avatar: 'ER' },
    { id: 4, name: 'Marcus Johnson', role: 'DevOps Engineer', status: 'Online', avatar: 'MJ' },
    { id: 5, name: 'Priya Sharma', role: 'QA Engineer', status: 'Available', avatar: 'PS' },
    { id: 6, name: 'Jamie Thompson', role: 'Designer', status: 'Online', avatar: 'JT' },
  ];

  // Shared documents data
  const sharedDocuments = [
    { id: 1, title: 'API Documentation', updated: '30 minutes ago' },
    { id: 2, title: 'Sprint Planning Notes', updated: 'Yesterday' },
    { id: 3, title: 'Architecture Diagram', updated: '2 days ago' },
    { id: 4, title: 'Performance Metrics', updated: '3 days ago' },
  ];

  // Upcoming events data
  const upcomingEvents = [
    { id: 1, title: 'Sprint Planning', date: 'Tomorrow' },
    { id: 2, title: 'Release v2.1', date: 'Friday' },
    { id: 3, title: 'Team Meeting', date: 'Monday' },
    { id: 4, title: 'Architecture Review', date: 'Wednesday' },
  ];

  // AI insights data
  const aiInsights = [
    'API Gateway requires attention before Friday deadline.',
    'Team productivity increased 12% this week.',
    'Three pending code reviews blocking deployment.',
    'Deployment pipeline completed successfully.',
    'Recommendation: Prioritize authentication review before next sprint.',
  ];

  // Helper function for status badge color
  const getStatusColor = (status) => {
    if (status === 'In Progress') {
      return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
    }
    return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
  };

  // Helper function for status dot color
  const getStatusDotColor = (status) => {
    switch (status) {
      case 'Online':
        return 'bg-emerald-500';
      case 'In Meeting':
        return 'bg-amber-500';
      case 'Available':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Workspace Header
  const WorkspaceHeader = () => (
    <div className="mb-10">
      <div className="flex items-start justify-between gap-6 mb-6">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            {workspaceHeader.avatar}
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {workspaceHeader.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              {workspaceHeader.description}
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                {workspaceHeader.role}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {workspaceHeader.members} members
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {workspaceHeader.projects} active projects
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {workspaceHeader.channels} channels
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm">
            <UserPlus size={18} />
            Invite Members
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm">
            <MessageSquare size={18} />
            Chat
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium text-sm">
            <Zap size={18} />
            AI Summary
          </button>
        </div>
      </div>
    </div>
  );

  // Workspace Pulse section
  const WorkspacePulse = () => (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Workspace Pulse</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pulseStats.map((stat, idx) => {
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

  // Active Projects section
  const ActiveProjects = () => (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Active Projects</h2>
        <button className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg font-medium transition-colors">
          <ArrowRight size={18} />
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg transition-all duration-300"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Updated {project.lastActivity}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
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

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex -space-x-2">
                    {project.avatars.slice(0, 3).map((avatar, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold border border-white dark:border-gray-900"
                      >
                        {avatar}
                      </div>
                    ))}
                    {project.avatars.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 text-xs font-bold border border-white dark:border-gray-900">
                        +{project.avatars.length - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">{project.members} members</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={16} />
                  {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Workspace Chat Preview section
  const ChatPreview = () => (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Workspace Chat</h2>
      <div className="border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 overflow-hidden">
        <div className="p-6 space-y-4 bg-gray-50 dark:bg-gray-950">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {msg.user.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{msg.user}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full px-6 py-4 flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-900 font-medium transition-colors border-t border-gray-200 dark:border-gray-800">
          <MessageSquare size={18} />
          Open Workspace Chat
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );

  // Recent Activity section
  const RecentActivitySection = () => (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
      <div className="space-y-3">
        {recentActivity.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.text}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // AI Workspace Summary section
  const AISummary = () => (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">AI Workspace Summary</h2>
      <div className="border border-gray-200 dark:border-gray-800 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 overflow-hidden p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Lightbulb size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Workspace Insights</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Generated by AI based on workspace activity</p>
          </div>
        </div>

        <div className="space-y-3">
          {aiInsights.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xs text-white font-bold">•</span>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-200">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Team Members section
  const TeamMembers = () => (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                {member.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{member.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{member.role}</p>
              </div>
              <div className={`w-2.5 h-2.5 rounded-full ${getStatusDotColor(member.status)} flex-shrink-0 mt-1`} />
            </div>
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // Shared Documents section
  const SharedDocuments = () => (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Shared Documents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sharedDocuments.map((doc) => (
          <div
            key={doc.id}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                <FileText size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{doc.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{doc.updated}</p>
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0">
              <Eye size={16} className="text-gray-400 dark:text-gray-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Upcoming Schedule section
  const UpcomingSchedule = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Schedule</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{event.date}</p>
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0">
              <ArrowRight size={16} className="text-gray-400 dark:text-gray-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <WorkspaceHeader />
      <WorkspacePulse />
      <ActiveProjects />
      <ChatPreview />
      <RecentActivitySection />
      <AISummary />
      <TeamMembers />
      <SharedDocuments />
      <UpcomingSchedule />
    </>
  );
};

export default WorkspaceDetailed;