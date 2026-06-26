import React, { useState } from 'react';
import {
  FolderOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Star,
  ArrowRight,
  Calendar,
  Users,
  MessageSquare,
  Eye,
  Plus,
} from 'lucide-react';

const Dashboard = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  // Welcome hero data
  const userGreeting = {
    name: 'Alex',
    timeOfDay: 'morning',
    completedToday: 5,
    tasksRemaining: 12,
  };

  // Projects data
  const projectsData = [
    {
      id: 1,
      name: 'AI Collaboration Workspace',
      description: 'Real-time collaboration platform with AI assistance',
      progress: 75,
      status: 'In Progress',
      members: 8,
      dueDate: '2024-08-15',
      priority: 'High',
      avatar: 'collabrix-logo',
    },
    {
      id: 2,
      name: 'Mobile App Redesign',
      description: 'Complete UI/UX overhaul for mobile experience',
      progress: 45,
      status: 'In Progress',
      members: 5,
      dueDate: '2024-09-01',
      priority: 'Medium',
      avatar: 'mobile-icon',
    },
    {
      id: 3,
      name: 'Backend API Optimization',
      description: 'Improve response times and database queries',
      progress: 60,
      status: 'In Progress',
      members: 6,
      dueDate: '2024-07-30',
      priority: 'High',
      avatar: 'api-icon',
    },
    {
      id: 4,
      name: 'Analytics Dashboard',
      description: 'Advanced metrics and real-time data visualization',
      progress: 30,
      status: 'Planning',
      members: 3,
      dueDate: '2024-10-15',
      priority: 'Low',
      avatar: 'analytics-icon',
    },
  ];

  // My Focus data
  const focusItems = [
    {
      id: 1,
      title: 'Complete API Documentation',
      project: 'Backend API Optimization',
      dueToday: true,
      priority: 'High',
      completed: false,
    },
    {
      id: 2,
      title: 'Review Design Mockups',
      project: 'Mobile App Redesign',
      dueToday: false,
      priority: 'Medium',
      completed: false,
    },
    {
      id: 3,
      title: 'Team Standup Meeting',
      project: 'AI Collaboration Workspace',
      dueToday: true,
      priority: 'Medium',
      completed: true,
    },
    {
      id: 4,
      title: 'Database Query Optimization',
      project: 'Backend API Optimization',
      dueToday: false,
      priority: 'High',
      completed: false,
    },
  ];

  // Recent Work data
  const recentWorkItems = [
    {
      id: 1,
      type: 'comment',
      user: 'Sarah Chen',
      action: 'commented on',
      target: 'API Response Handling',
      time: '2 hours ago',
      avatar: 'SC',
    },
    {
      id: 2,
      type: 'update',
      user: 'Marcus Johnson',
      action: 'updated',
      target: 'UI Component Library',
      time: '4 hours ago',
      avatar: 'MJ',
    },
    {
      id: 3,
      type: 'completion',
      user: 'You',
      action: 'completed',
      target: 'Authentication System',
      time: '6 hours ago',
      avatar: 'AB',
    },
    {
      id: 4,
      type: 'mention',
      user: 'Elena Rodriguez',
      action: 'mentioned you in',
      target: 'Mobile App Discussion',
      time: '1 day ago',
      avatar: 'ER',
    },
    {
      id: 5,
      type: 'review',
      user: 'Priya Patel',
      action: 'requested review for',
      target: 'Database Schema Update',
      time: '1 day ago',
      avatar: 'PP',
    },
  ];

  // Important Updates data
  const updatesData = [
    {
      id: 1,
      type: 'announcement',
      title: 'New Collaboration Features Released',
      description: 'Real-time cursor tracking and live commenting are now available in all workspaces.',
      timestamp: '2024-06-20',
      icon: MessageSquare,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      id: 2,
      type: 'deadline',
      title: 'Project Deadline Approaching',
      description: 'Mobile App Redesign is due in 10 days. Current progress: 45%',
      timestamp: '2024-06-19',
      icon: Clock,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Team Milestone Reached',
      description: 'Product Engineering team has closed 100 issues this month!',
      timestamp: '2024-06-18',
      icon: Star,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      id: 4,
      type: 'task',
      title: 'New Team Member Joined',
      description: 'Welcome Jamie Thompson to the Design Studio team.',
      timestamp: '2024-06-17',
      icon: Users,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
  ];

  // Hero section
  const HeroSection = () => (
    <div className="mb-10">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
        Good {userGreeting.timeOfDay}, {userGreeting.name}! 👋
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        Welcome back. You've completed <span className="font-semibold text-green-600 dark:text-green-400">{userGreeting.completedToday} tasks</span> today, with <span className="font-semibold text-blue-600 dark:text-blue-400">{userGreeting.tasksRemaining} remaining</span>.
      </p>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Projects', value: '4', icon: FolderOpen, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
          { label: 'Tasks Completed', value: '24/36', icon: CheckCircle, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
          { label: 'In Progress', value: '12', icon: Clock, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
          { label: 'Team Members', value: '18', icon: Users, color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
        ].map((stat, idx) => {
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

  // Projects section
  const ProjectsSection = () => (
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
            {/* Project header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {project.avatar.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  project.priority === 'High'
                    ? 'bg-red-500/10 text-red-700 dark:text-red-400'
                    : project.priority === 'Medium'
                    ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                    : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
                }`}>
                  {project.priority}
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

              {/* Status badge */}
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                project.status === 'In Progress'
                  ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
                  : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
              }`}>
                {project.status}
              </span>
            </div>

            {/* Project footer */}
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{project.members} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
              <button className={`p-2 rounded-lg transition-colors ${
                hoveredProject === project.id
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}>
                <Eye size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // My Focus section
  const MyFocusSection = () => (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Focus</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {focusItems.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              item.completed
                ? 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 opacity-70'
                : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800'
            }`}
          >
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={item.completed}
                className="w-5 h-5 rounded mt-0.5 border-gray-300 dark:border-gray-700 cursor-pointer accent-blue-600"
                readOnly
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className={`font-medium ${
                    item.completed
                      ? 'line-through text-gray-500 dark:text-gray-500'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {item.title}
                  </h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap flex-shrink-0 ${
                    item.priority === 'High'
                      ? 'bg-red-500/10 text-red-700 dark:text-red-400'
                      : 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <p className={`text-sm ${item.completed ? 'text-gray-500 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'}`}>
                  {item.project}
                </p>
                {item.dueToday && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-2">
                    ⏰ Due today
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Recent Work section
  const RecentWorkSection = () => (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Work</h2>

      <div className="space-y-3">
        {recentWorkItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {item.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-semibold">{item.user}</span>
                {' '}
                <span className="text-gray-600 dark:text-gray-400">{item.action}</span>
                {' '}
                <span className="font-medium text-blue-600 dark:text-blue-400">{item.target}</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{item.time}</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0">
              <ArrowRight size={16} className="text-gray-400 dark:text-gray-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Important Updates section
  const UpdatesSection = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Important Updates</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {updatesData.map((update) => {
          const Icon = update.icon;
          return (
            <div
              key={update.id}
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg ${update.color} flex-shrink-0`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {update.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {new Date(update.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {update.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <MyFocusSection />
      <RecentWorkSection />
      <UpdatesSection />
    </>
  );
};

export default Dashboard;
