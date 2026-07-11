// import React, { useState } from 'react';
// import {
//   FolderOpen,
//   CheckCircle,
//   Clock,
//   AlertCircle,
//   TrendingUp,
//   Star,
//   ArrowRight,
//   Calendar,
//   Users,
//   MessageSquare,
//   Eye,
//   Plus,
// } from 'lucide-react';

// const Dashboard = () => {
//   const [hoveredProject, setHoveredProject] = useState(null);

//   // Welcome hero data
//   const userGreeting = {
//     name: 'Alex',
//     timeOfDay: 'morning',
//     completedToday: 5,
//     tasksRemaining: 12,
//   };

//   // Projects data
//   const projectsData = [
//     {
//       id: 1,
//       name: 'AI Collaboration Workspace',
//       description: 'Real-time collaboration platform with AI assistance',
//       progress: 75,
//       status: 'In Progress',
//       members: 8,
//       dueDate: '2024-08-15',
//       priority: 'High',
//       avatar: 'collabrix-logo',
//     },
//     {
//       id: 2,
//       name: 'Mobile App Redesign',
//       description: 'Complete UI/UX overhaul for mobile experience',
//       progress: 45,
//       status: 'In Progress',
//       members: 5,
//       dueDate: '2024-09-01',
//       priority: 'Medium',
//       avatar: 'mobile-icon',
//     },
//     {
//       id: 3,
//       name: 'Backend API Optimization',
//       description: 'Improve response times and database queries',
//       progress: 60,
//       status: 'In Progress',
//       members: 6,
//       dueDate: '2024-07-30',
//       priority: 'High',
//       avatar: 'api-icon',
//     },
//     {
//       id: 4,
//       name: 'Analytics Dashboard',
//       description: 'Advanced metrics and real-time data visualization',
//       progress: 30,
//       status: 'Planning',
//       members: 3,
//       dueDate: '2024-10-15',
//       priority: 'Low',
//       avatar: 'analytics-icon',
//     },
//   ];

//   // My Focus data
//   const focusItems = [
//     {
//       id: 1,
//       title: 'Complete API Documentation',
//       project: 'Backend API Optimization',
//       dueToday: true,
//       priority: 'High',
//       completed: false,
//     },
//     {
//       id: 2,
//       title: 'Review Design Mockups',
//       project: 'Mobile App Redesign',
//       dueToday: false,
//       priority: 'Medium',
//       completed: false,
//     },
//     {
//       id: 3,
//       title: 'Team Standup Meeting',
//       project: 'AI Collaboration Workspace',
//       dueToday: true,
//       priority: 'Medium',
//       completed: true,
//     },
//     {
//       id: 4,
//       title: 'Database Query Optimization',
//       project: 'Backend API Optimization',
//       dueToday: false,
//       priority: 'High',
//       completed: false,
//     },
//   ];

//   // Recent Work data
//   const recentWorkItems = [
//     {
//       id: 1,
//       type: 'comment',
//       user: 'Sarah Chen',
//       action: 'commented on',
//       target: 'API Response Handling',
//       time: '2 hours ago',
//       avatar: 'SC',
//     },
//     {
//       id: 2,
//       type: 'update',
//       user: 'Marcus Johnson',
//       action: 'updated',
//       target: 'UI Component Library',
//       time: '4 hours ago',
//       avatar: 'MJ',
//     },
//     {
//       id: 3,
//       type: 'completion',
//       user: 'You',
//       action: 'completed',
//       target: 'Authentication System',
//       time: '6 hours ago',
//       avatar: 'AB',
//     },
//     {
//       id: 4,
//       type: 'mention',
//       user: 'Elena Rodriguez',
//       action: 'mentioned you in',
//       target: 'Mobile App Discussion',
//       time: '1 day ago',
//       avatar: 'ER',
//     },
//     {
//       id: 5,
//       type: 'review',
//       user: 'Priya Patel',
//       action: 'requested review for',
//       target: 'Database Schema Update',
//       time: '1 day ago',
//       avatar: 'PP',
//     },
//   ];

//   // Important Updates data
//   const updatesData = [
//     {
//       id: 1,
//       type: 'announcement',
//       title: 'New Collaboration Features Released',
//       description: 'Real-time cursor tracking and live commenting are now available in all workspaces.',
//       timestamp: '2024-06-20',
//       icon: MessageSquare,
//       color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
//     },
//     {
//       id: 2,
//       type: 'deadline',
//       title: 'Project Deadline Approaching',
//       description: 'Mobile App Redesign is due in 10 days. Current progress: 45%',
//       timestamp: '2024-06-19',
//       icon: Clock,
//       color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
//     },
//     {
//       id: 3,
//       type: 'achievement',
//       title: 'Team Milestone Reached',
//       description: 'Product Engineering team has closed 100 issues this month!',
//       timestamp: '2024-06-18',
//       icon: Star,
//       color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
//     },
//     {
//       id: 4,
//       type: 'task',
//       title: 'New Team Member Joined',
//       description: 'Welcome Jamie Thompson to the Design Studio team.',
//       timestamp: '2024-06-17',
//       icon: Users,
//       color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
//     },
//   ];

//   // Hero section
//   const HeroSection = () => (
//     <div className="mb-10">
//       <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
//         Good {userGreeting.timeOfDay}, {userGreeting.name}! 👋
//       </h1>
//       <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
//         Welcome back. You've completed <span className="font-semibold text-green-600 dark:text-green-400">{userGreeting.completedToday} tasks</span> today, with <span className="font-semibold text-blue-600 dark:text-blue-400">{userGreeting.tasksRemaining} remaining</span>.
//       </p>

//       {/* Quick stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {[
//           { label: 'Active Projects', value: '4', icon: FolderOpen, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
//           { label: 'Tasks Completed', value: '24/36', icon: CheckCircle, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
//           { label: 'In Progress', value: '12', icon: Clock, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
//           { label: 'Team Members', value: '18', icon: Users, color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
//         ].map((stat, idx) => {
//           const Icon = stat.icon;
//           return (
//             <div key={idx} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow">
//               <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
//                 <Icon size={20} />
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
//               <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );

//   // Projects section
//   const ProjectsSection = () => (
//     <div className="mb-10">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Active Projects</h2>
//         <button className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg font-medium transition-colors">
//           <ArrowRight size={18} />
//           View All
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {projectsData.map((project) => (
//           <div
//             key={project.id}
//             className="border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg transition-all duration-300"
//             onMouseEnter={() => setHoveredProject(project.id)}
//             onMouseLeave={() => setHoveredProject(null)}
//           >
//             {/* Project header */}
//             <div className="p-6 border-b border-gray-200 dark:border-gray-800">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center gap-3 flex-1">
//                   <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
//                     {project.avatar.charAt(0)}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
//                       {project.name}
//                     </h3>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
//                       {project.description}
//                     </p>
//                   </div>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
//                   project.priority === 'High'
//                     ? 'bg-red-500/10 text-red-700 dark:text-red-400'
//                     : project.priority === 'Medium'
//                     ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
//                     : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
//                 }`}>
//                   {project.priority}
//                 </span>
//               </div>

//               {/* Progress bar */}
//               <div className="mb-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Progress</span>
//                   <span className="text-xs font-semibold text-gray-900 dark:text-white">{project.progress}%</span>
//                 </div>
//                 <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
//                     style={{ width: `${project.progress}%` }}
//                   />
//                 </div>
//               </div>

//               {/* Status badge */}
//               <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
//                 project.status === 'In Progress'
//                   ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
//                   : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
//               }`}>
//                 {project.status}
//               </span>
//             </div>

//             {/* Project footer */}
//             <div className="px-6 py-4 flex items-center justify-between">
//               <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
//                 <div className="flex items-center gap-1">
//                   <Users size={16} />
//                   <span>{project.members} members</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Calendar size={16} />
//                   <span>{new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
//                 </div>
//               </div>
//               <button className={`p-2 rounded-lg transition-colors ${
//                 hoveredProject === project.id
//                   ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
//                   : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
//               }`}>
//                 <Eye size={18} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   // My Focus section
//   const MyFocusSection = () => (
//     <div className="mb-10">
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Focus</h2>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {focusItems.map((item) => (
//           <div
//             key={item.id}
//             className={`p-4 rounded-lg border-2 transition-all duration-200 ${
//               item.completed
//                 ? 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 opacity-70'
//                 : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800'
//             }`}
//           >
//             <div className="flex items-start gap-4">
//               <input
//                 type="checkbox"
//                 checked={item.completed}
//                 className="w-5 h-5 rounded mt-0.5 border-gray-300 dark:border-gray-700 cursor-pointer accent-blue-600"
//                 readOnly
//               />
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-start justify-between gap-2 mb-1">
//                   <h3 className={`font-medium ${
//                     item.completed
//                       ? 'line-through text-gray-500 dark:text-gray-500'
//                       : 'text-gray-900 dark:text-white'
//                   }`}>
//                     {item.title}
//                   </h3>
//                   <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap flex-shrink-0 ${
//                     item.priority === 'High'
//                       ? 'bg-red-500/10 text-red-700 dark:text-red-400'
//                       : 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
//                   }`}>
//                     {item.priority}
//                   </span>
//                 </div>
//                 <p className={`text-sm ${item.completed ? 'text-gray-500 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'}`}>
//                   {item.project}
//                 </p>
//                 {item.dueToday && (
//                   <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-2">
//                     ⏰ Due today
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   // Recent Work section
//   const RecentWorkSection = () => (
//     <div className="mb-10">
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Work</h2>

//       <div className="space-y-3">
//         {recentWorkItems.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//           >
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//               {item.avatar}
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm text-gray-900 dark:text-white">
//                 <span className="font-semibold">{item.user}</span>
//                 {' '}
//                 <span className="text-gray-600 dark:text-gray-400">{item.action}</span>
//                 {' '}
//                 <span className="font-medium text-blue-600 dark:text-blue-400">{item.target}</span>
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{item.time}</p>
//             </div>
//             <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0">
//               <ArrowRight size={16} className="text-gray-400 dark:text-gray-600" />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   // Important Updates section
//   const UpdatesSection = () => (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Important Updates</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {updatesData.map((update) => {
//           const Icon = update.icon;
//           return (
//             <div
//               key={update.id}
//               className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-start gap-4 mb-4">
//                 <div className={`p-3 rounded-lg ${update.color} flex-shrink-0`}>
//                   <Icon size={20} />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h3 className="font-semibold text-gray-900 dark:text-white">
//                     {update.title}
//                   </h3>
//                   <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
//                     {new Date(update.timestamp).toLocaleDateString('en-US', {
//                       month: 'short',
//                       day: 'numeric',
//                       year: 'numeric',
//                     })}
//                   </p>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
//                 {update.description}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <HeroSection />
//       <ProjectsSection />
//       <MyFocusSection />
//       <RecentWorkSection />
//       <UpdatesSection />
//     </>
//   );
// };

// export default Dashboard;






























// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

/* =====================================================================
   PAGE-LEVEL DATA
====================================================================== */

const CURRENT_USER = {
  name: "God Ninja",
  initials: "GN",
  email: "godninja@gmail.com",
  role: "Developer",
};

const PROJECTS = [
  {
    id: "p1",
    name: "Collabrix v2.0 Launch",
    workspace: "Product Engineering",
    progress: 68,
    status: "on-track",
    lastUpdated: "12 min ago",
    attention: 3,
    members: [
      { initials: "NJ", color: "bg-indigo-500" },
      { initials: "SK", color: "bg-violet-500" },
      { initials: "AR", color: "bg-emerald-500" },
      { initials: "PM", color: "bg-amber-500" },
    ],
  },
  {
    id: "p2",
    name: "User Onboarding Redesign",
    workspace: "Design Studio",
    progress: 42,
    status: "at-risk",
    lastUpdated: "2 hours ago",
    attention: 5,
    members: [
      { initials: "LM", color: "bg-rose-500" },
      { initials: "NJ", color: "bg-indigo-500" },
      { initials: "DK", color: "bg-cyan-500" },
    ],
  },
  {
    id: "p3",
    name: "API Gateway Migration",
    workspace: "Infrastructure",
    progress: 91,
    status: "on-track",
    lastUpdated: "1 day ago",
    attention: 0,
    members: [
      { initials: "RV", color: "bg-orange-500" },
      { initials: "SK", color: "bg-violet-500" },
    ],
  },
  {
    id: "p4",
    name: "Q3 Analytics Dashboard",
    workspace: "Data Platform",
    progress: 15,
    status: "just-started",
    lastUpdated: "3 days ago",
    attention: 2,
    members: [
      { initials: "AR", color: "bg-emerald-500" },
      { initials: "PM", color: "bg-amber-500" },
      { initials: "NJ", color: "bg-indigo-500" },
    ],
  },
];

const FOCUS_ITEMS = [
  {
    id: "f1",
    type: "mention",
    title: "Sarah mentioned you in API review notes",
    project: "Collabrix v2.0 Launch",
    time: "8 min ago",
    priority: "medium",
  },
  {
    id: "f2",
    type: "due",
    title: "Finalize onboarding copy — due today",
    project: "User Onboarding Redesign",
    time: "Due in 4 hours",
    priority: "high",
  },
  {
    id: "f3",
    type: "approval",
    title: "Design spec awaiting your approval",
    project: "Design Studio",
    time: "1 hour ago",
    priority: "high",
  },
  {
    id: "f4",
    type: "review",
    title: "Code review assigned: auth middleware",
    project: "API Gateway Migration",
    time: "3 hours ago",
    priority: "medium",
  },
  {
    id: "f5",
    type: "blocked",
    title: "CI pipeline blocked — waiting on credentials",
    project: "Infrastructure",
    time: "Yesterday",
    priority: "critical",
  },
];

const RECENT_WORK = [
  {
    id: "r1",
    type: "document",
    title: "Onboarding Flow — v3 Spec",
    lastAccessed: "10 min ago",
  },
  {
    id: "r2",
    type: "project",
    title: "Collabrix v2.0 Launch",
    lastAccessed: "25 min ago",
  },
  {
    id: "r3",
    type: "chat",
    title: "Design sync — sidebar discussion",
    lastAccessed: "1 hour ago",
  },
  {
    id: "r4",
    type: "document",
    title: "Q3 Product Roadmap",
    lastAccessed: "3 hours ago",
  },
];

const UPDATES = [
  {
    id: "u1",
    type: "approved",
    title: "Mobile navigation design approved by Sarah",
    time: "15 min ago",
  },
  {
    id: "u2",
    type: "ai",
    title: "Meeting summary generated for Product Sync",
    time: "1 hour ago",
  },
  {
    id: "u3",
    type: "mention",
    title: "Arjun mentioned you in Deployment Checklist",
    time: "2 hours ago",
  },
  {
    id: "u4",
    type: "assigned",
    title: "New task assigned: Review auth error handling",
    time: "4 hours ago",
  },
  {
    id: "u5",
    type: "blocker",
    title: "Release blocker identified in payment module",
    time: "Yesterday",
  },
];

/* =====================================================================
   DASHBOARD  — default export
====================================================================== */
export default function Dashboard() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-6 lg:px-8">
      <WelcomeBanner />

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ProjectsSection />
        </div>

        <div className="lg:col-span-2">
          <FocusSection />
        </div>
      </div>

      <div className="mt-6 grid gap-6 pb-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RecentWorkSection />
        </div>

        <div className="lg:col-span-2">
          <UpdatesSection />
        </div>
      </div>
    </div>
  );
}
/* =====================================================================
   WELCOME BANNER
====================================================================== */

function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-6 py-6 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025] sm:px-8 sm:py-7">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-indigo-100/20 via-transparent to-transparent dark:from-indigo-500/[0.03]" />

      <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[24px]">
            Welcome back, {CURRENT_USER.name}{" "}
            <span className="inline-block" role="img" aria-label="wave">👋</span>
          </h1>
          <p className="mt-1.5 max-w-lg text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            Your workspace is ready. Track projects, stay on top of priorities, and collaborate effortlessly.
          </p>
        </div>
        <button
          type="button"
          className="group/btn relative shrink-0 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
          <span className="relative">Get Started</span>
        </button>
      </div>
    </div>
  );
}

/* =====================================================================
   PROJECTS SECTION
====================================================================== */

function ProjectsSection() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">Projects</h2>
        <a href="#" className="text-[13px] font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
          View All →
        </a>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const statusConfig = {
    "on-track":    { label: "On Track",     dot: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-400" },
    "at-risk":     { label: "At Risk",      dot: "bg-amber-500",   text: "text-amber-700 dark:text-amber-400"   },
    "just-started":{ label: "Just Started", dot: "bg-indigo-500",  text: "text-indigo-700 dark:text-indigo-400" },
  };
  const status = statusConfig[project.status] || statusConfig["on-track"];

  return (
    <div className="group cursor-pointer overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300/80 hover:shadow-[0_8px_30px_-12px_rgba(24,24,27,0.1)] dark:border-white/[0.06] dark:bg-white/[0.025] dark:hover:border-white/[0.1] dark:hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
            {project.name}
          </h3>
          <p className="mt-0.5 text-[12px] text-zinc-400 dark:text-zinc-500">{project.workspace}</p>
        </div>
        {project.attention > 0 && (
          <span className="ml-2 flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-red-50 px-1.5 text-[10px] font-bold text-red-600 dark:bg-red-500/10 dark:text-red-400">
            {project.attention}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-medium text-zinc-500 dark:text-zinc-400">Progress</span>
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">{project.progress}%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex -space-x-1.5">
          {project.members.slice(0, 4).map((m, i) => (
            <div
              key={i}
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[8px] font-bold text-white dark:border-[#0B0C10] ${m.color}`}
            >
              {m.initials}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className={`flex items-center gap-1 text-[11px] font-medium ${status.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
          <span className="text-[11px] text-zinc-300 dark:text-zinc-600">·</span>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500">{project.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   MY FOCUS SECTION
====================================================================== */

function FocusSection() {
  const typeConfig = {
    mention:  { icon: <AtIcon />,          accent: "bg-blue-50   text-blue-600   dark:bg-blue-500/10   dark:text-blue-400"   },
    due:      { icon: <ClockIcon />,        accent: "bg-amber-50  text-amber-600  dark:bg-amber-500/10  dark:text-amber-400"  },
    approval: { icon: <CheckCircleIcon />,  accent: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400" },
    review:   { icon: <EyeIcon />,          accent: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" },
    blocked:  { icon: <AlertIcon />,        accent: "bg-red-50    text-red-600    dark:bg-red-500/10    dark:text-red-400"    },
  };
  const priorityDot = {
    critical: "bg-red-500",
    high:     "bg-amber-500",
    medium:   "bg-indigo-500",
    low:      "bg-zinc-400",
  };

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">My Focus</h2>
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-indigo-50 px-2 text-[11px] font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          {FOCUS_ITEMS.length}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />
        {FOCUS_ITEMS.map((item, idx) => {
          const cfg = typeConfig[item.type] || typeConfig.mention;
          return (
            <div
              key={item.id}
              className={`group flex cursor-pointer items-start gap-3 px-4 py-3.5 transition-colors hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] ${
                idx < FOCUS_ITEMS.length - 1 ? "border-b border-zinc-100 dark:border-white/[0.04]" : ""
              }`}
            >
              <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${cfg.accent}`}>
                {cfg.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium leading-snug text-zinc-800 dark:text-zinc-200">
                  {item.title}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="truncate text-[11.5px] text-zinc-400 dark:text-zinc-500">{item.project}</span>
                  <span className="text-[11px] text-zinc-300 dark:text-zinc-600">·</span>
                  <span className="shrink-0 text-[11.5px] text-zinc-400 dark:text-zinc-500">{item.time}</span>
                </div>
              </div>
              <span
                className={`mt-2 h-2 w-2 shrink-0 rounded-full ${priorityDot[item.priority] || priorityDot.medium}`}
                title={item.priority}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =====================================================================
   RECENT WORK SECTION
====================================================================== */

function RecentWorkSection() {
  const typeConfig = {
    document: { icon: <FileTextIcon />, label: "Document", accent: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" },
    project:  { icon: <FolderIcon />,   label: "Project",  accent: "bg-indigo-50  text-indigo-600  dark:bg-indigo-500/10  dark:text-indigo-400"  },
    chat:     { icon: <MessageIcon />,  label: "Chat",     accent: "bg-violet-50  text-violet-600  dark:bg-violet-500/10  dark:text-violet-400"  },
  };

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">Recent Work</h2>
        <a href="#" className="text-[13px] font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
          View All →
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
        {RECENT_WORK.map((item, idx) => {
          const cfg = typeConfig[item.type] || typeConfig.document;
          return (
            <div
              key={item.id}
              className={`group flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] ${
                idx < RECENT_WORK.length - 1 ? "border-b border-zinc-100 dark:border-white/[0.04]" : ""
              }`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cfg.accent}`}>
                {cfg.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-medium text-zinc-800 dark:text-zinc-200">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[11.5px] text-zinc-400 dark:text-zinc-500">{cfg.label}</p>
              </div>
              <span className="shrink-0 text-[11.5px] text-zinc-400 dark:text-zinc-500">
                {item.lastAccessed}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =====================================================================
   IMPORTANT UPDATES SECTION
====================================================================== */

function UpdatesSection() {
  const typeConfig = {
    approved: { icon: <CheckCircleIcon />, accent: "bg-emerald-500" },
    ai:       { icon: <SparkleIcon />,     accent: "bg-indigo-500"  },
    mention:  { icon: <AtIcon />,          accent: "bg-blue-500"    },
    assigned: { icon: <UserPlusIcon />,    accent: "bg-violet-500"  },
    blocker:  { icon: <AlertIcon />,       accent: "bg-red-500"     },
  };

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">Important Updates</h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
        <div className="relative px-4 py-2">
          {/* Timeline line */}
          <div className="absolute bottom-0 left-[29px] top-0 w-px bg-zinc-100 dark:bg-white/[0.05]" />

          {UPDATES.map((item) => {
            const cfg = typeConfig[item.type] || typeConfig.mention;
            return (
              <div key={item.id} className="relative flex items-start gap-3 py-3">
                <div className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${cfg.accent} text-white`}>
                  <span className="scale-[0.6]">{cfg.icon}</span>
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-[13px] leading-snug text-zinc-700 dark:text-zinc-300">{item.title}</p>
                  <p className="mt-0.5 text-[11.5px] text-zinc-400 dark:text-zinc-500">{item.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   ICONS  — used in the dashboard content sections only
====================================================================== */

function AtIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9"  x2="12"    y2="13"   />
      <line x1="12" y1="17" x2="12.01" y2="17"   />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11Z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8"  x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}
