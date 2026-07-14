import React from 'react';
import {
  FolderOpen,
  CheckSquare,
  AlertCircle,
  Clock,
  Calendar,
  FileText,
  UserPlus,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

/* ======================================================================
   pages/Workspaces/WorkspaceOverview.jsx
   Rendered by React Router as the index route inside WorkspaceLayout's
   <Outlet />. WorkspaceLayout already renders the breadcrumb, workspace
   header, and tabs — this file contains ONLY the Overview tab's content.

   Responsibility: "Give a quick overview of the current workspace."
   Everything else (Projects, Members, Chat, Settings) lives in its own
   route/tab. UI only — no routing, no API calls, no business logic.
====================================================================== */

// ─── DUMMY DATA ────────────────────────────────────────────────────────────

const PULSE_STATS = [
  {
    id: 'ps1',
    label: 'Active Projects',
    value: '8',
    icon: FolderOpen,
    iconBg: 'bg-indigo-50 dark:bg-indigo-500/10',
    iconCl: 'text-indigo-500 dark:text-indigo-400',
  },
  {
    id: 'ps2',
    label: 'Tasks Due Today',
    value: '14',
    icon: CheckSquare,
    iconBg: 'bg-amber-50 dark:bg-amber-500/10',
    iconCl: 'text-amber-500 dark:text-amber-400',
  },
  {
    id: 'ps3',
    label: 'Pending Reviews',
    value: '5',
    icon: AlertCircle,
    iconBg: 'bg-violet-50 dark:bg-violet-500/10',
    iconCl: 'text-violet-500 dark:text-violet-400',
  },
  {
    id: 'ps4',
    label: 'Overdue Tasks',
    value: '2',
    icon: Clock,
    iconBg: 'bg-red-50 dark:bg-red-500/10',
    iconCl: 'text-red-500 dark:text-red-400',
  },
];

const MEMBER_COLORS = [
  'bg-indigo-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500',
  'bg-rose-500', 'bg-cyan-500', 'bg-orange-500',
];

const ACTIVE_PROJECTS = [
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

const RECENT_ACTIVITY = [
  { id: 1, type: 'created',   text: 'Sarah created a new project: Mobile Application', time: '2 hours ago' },
  { id: 2, type: 'completed', text: 'Arjun completed Authentication middleware review', time: '4 hours ago' },
  { id: 3, type: 'updated',   text: 'API Documentation was updated',                    time: '6 hours ago' },
  { id: 4, type: 'joined',    text: 'Jamie Thompson joined the workspace',               time: '1 day ago' },
  { id: 5, type: 'commented', text: 'Priya commented on Dashboard Redesign',             time: '1 day ago' },
];

const ACTIVITY_CONFIG = {
  created:   { icon: FolderOpen,    iconBg: 'bg-indigo-50  dark:bg-indigo-500/10',  iconCl: 'text-indigo-500  dark:text-indigo-400'  },
  completed: { icon: CheckSquare,   iconBg: 'bg-emerald-50 dark:bg-emerald-500/10', iconCl: 'text-emerald-500 dark:text-emerald-400' },
  updated:   { icon: FileText,      iconBg: 'bg-violet-50  dark:bg-violet-500/10',  iconCl: 'text-violet-500  dark:text-violet-400'  },
  joined:    { icon: UserPlus,      iconBg: 'bg-amber-50   dark:bg-amber-500/10',   iconCl: 'text-amber-500   dark:text-amber-400'   },
  commented: { icon: MessageSquare, iconBg: 'bg-blue-50    dark:bg-blue-500/10',    iconCl: 'text-blue-500    dark:text-blue-400'    },
};

const AI_INSIGHTS = [
  'Authentication API requires review before Friday\u2019s deadline.',
  'Two tasks are currently overdue and need attention.',
  'API Gateway Migration is currently blocked pending review.',
  'Three code reviews are pending approval.',
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function WorkspaceOverview() {
  return (
    <div className="flex flex-col gap-8">
      <WorkspacePulse />
      <ActiveProjects />
      <RecentActivitySection />
      <AISummary />
    </div>
  );
}

// ─── WORKSPACE PULSE ─────────────────────────────────────────────────────────

function WorkspacePulse() {
  return (
    <section>
      <h2 className="mb-4 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        Workspace Pulse
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {PULSE_STATS.map((stat) => (
          <div
            key={stat.id}
            className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-5 py-4 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconCl}`}>
              <stat.icon size={18} />
            </div>
            <p className="mt-3 text-[12px] font-medium text-zinc-500 dark:text-zinc-400">
              {stat.label}
            </p>
            <p className="mt-0.5 text-[24px] font-bold leading-none tracking-tight text-zinc-900 dark:text-zinc-50">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── ACTIVE PROJECTS ─────────────────────────────────────────────────────────

function ActiveProjects() {
  const topFour = ACTIVE_PROJECTS.slice(0, 4);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
          Active Projects
        </h2>
        <a
          href="#"
          className="text-[13px] font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          View All &rarr;
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {topFour.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const isInProgress = project.status === 'In Progress';
  const statusCls = isInProgress
    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400'
    : 'bg-zinc-100 text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-400';

  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300/80 hover:shadow-[0_8px_30px_-12px_rgba(24,24,27,0.1)] dark:border-white/[0.06] dark:bg-white/[0.025] dark:hover:border-white/[0.1] dark:hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
            {project.name}
          </h3>
          <p className="mt-0.5 text-[12px] text-zinc-400 dark:text-zinc-500">
            Updated {project.lastActivity}
          </p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusCls}`}>
          {project.status}
        </span>
      </div>

      {/* Progress */}
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
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {project.avatars.slice(0, 3).map((initials, i) => (
              <div
                key={i}
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[8px] font-bold text-white dark:border-[#0B0C10] ${
                  MEMBER_COLORS[i % MEMBER_COLORS.length]
                }`}
              >
                {initials}
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

        <span className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500">
          <Calendar size={12} />
          {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>
    </div>
  );
}

// ─── RECENT ACTIVITY ─────────────────────────────────────────────────────────

function RecentActivitySection() {
  return (
    <section>
      <h2 className="mb-4 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        Recent Activity
      </h2>

      <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

        {RECENT_ACTIVITY.map((activity, idx) => {
          const cfg = ACTIVITY_CONFIG[activity.type] || ACTIVITY_CONFIG.updated;
          return (
            <div
              key={activity.id}
              className={`flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] ${
                idx < RECENT_ACTIVITY.length - 1
                  ? 'border-b border-zinc-100 dark:border-white/[0.04]'
                  : ''
              }`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cfg.iconBg} ${cfg.iconCl}`}>
                <cfg.icon size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] text-zinc-700 dark:text-zinc-300">
                  {activity.text}
                </p>
              </div>
              <span className="shrink-0 text-[11.5px] text-zinc-400 dark:text-zinc-500">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── AI WORKSPACE SUMMARY ────────────────────────────────────────────────────

function AISummary() {
  return (
    <section>
      <h2 className="mb-4 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        AI Workspace Summary
      </h2>

      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-5 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025] sm:p-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
            <Sparkles size={14} />
          </div>
          <div>
            <p className="text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
              Workspace Insights
            </p>
            <p className="text-[11.5px] text-zinc-400 dark:text-zinc-500">
              Generated from current workspace activity
            </p>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-4 space-y-2.5">
          {AI_INSIGHTS.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400 dark:bg-indigo-500" />
              <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {insight}
              </p>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-4 border-t border-zinc-100 pt-3.5 dark:border-white/[0.05]">
          <a
            href="#"
            className="text-[12.5px] font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Open AI Assistant &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
