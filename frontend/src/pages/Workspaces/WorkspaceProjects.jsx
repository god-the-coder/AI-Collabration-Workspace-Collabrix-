/* ======================================================================
   pages/Workspaces/WorkspaceProjects.jsx
   Rendered by React Router at /workspaces/:workspaceId/projects, inside
   WorkspaceLayout's <Outlet />. WorkspaceLayout already renders the
   breadcrumb, workspace header, and tabs — this file is the tab content only.

   Purpose: "What projects belong to this workspace?" — nothing else.
   UI only — no routing, no API calls, no business logic.
====================================================================== */

// Flip this during visual QA to preview the empty state. Not wired to any
// real data source — purely a manual toggle for reviewing both states.
const SHOW_EMPTY_STATE = false;

// ─── CONFIG ────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  planning: {
    label: "Planning",
    bg: "bg-zinc-100 dark:bg-white/[0.06]",
    text: "text-zinc-600 dark:text-zinc-400",
  },
  "in-progress": {
    label: "In Progress",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    text: "text-indigo-700 dark:text-indigo-400",
  },
  completed: {
    label: "Completed",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  archived: {
    label: "Archived",
    bg: "bg-zinc-100 dark:bg-white/[0.04]",
    text: "text-zinc-500 dark:text-zinc-500",
  },
};

const MEMBER_COLORS = [
  "bg-indigo-500", "bg-violet-500", "bg-emerald-500", "bg-amber-500",
  "bg-rose-500", "bg-cyan-500", "bg-orange-500",
];

// ─── DUMMY DATA ────────────────────────────────────────────────────────────

const SUMMARY_STATS = [
  {
    id: "s1",
    label: "Active Projects",
    value: 4,
    iconBg: "bg-indigo-50 dark:bg-indigo-500/10",
    iconCl: "text-indigo-500 dark:text-indigo-400",
    icon: <FolderIcon />,
  },
  {
    id: "s2",
    label: "Completed Projects",
    value: 2,
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconCl: "text-emerald-500 dark:text-emerald-400",
    icon: <CheckIcon />,
  },
  {
    id: "s3",
    label: "At Risk",
    value: 1,
    iconBg: "bg-amber-50 dark:bg-amber-500/10",
    iconCl: "text-amber-500 dark:text-amber-400",
    icon: <AlertIcon />,
  },
  {
    id: "s4",
    label: "Archived Projects",
    value: 2,
    iconBg: "bg-zinc-100 dark:bg-white/[0.06]",
    iconCl: "text-zinc-500 dark:text-zinc-400",
    icon: <ArchiveIcon />,
  },
];

const PROJECTS = [
  {
    id: "p1",
    name: "API Gateway Migration",
    description: "Backend infrastructure improvements and service consolidation.",
    status: "in-progress",
    progress: 68,
    members: [
      { initials: "SC", color: MEMBER_COLORS[0] },
      { initials: "MJ", color: MEMBER_COLORS[1] },
      { initials: "AR", color: MEMBER_COLORS[2] },
      { initials: "TP", color: MEMBER_COLORS[3] },
    ],
    memberCount: 5,
    updatedAt: "30 minutes ago",
  },
  {
    id: "p2",
    name: "Dashboard Redesign",
    description: "Refreshed UI components and improved information hierarchy.",
    status: "in-progress",
    progress: 45,
    members: [
      { initials: "ER", color: MEMBER_COLORS[2] },
      { initials: "CJ", color: MEMBER_COLORS[4] },
      { initials: "NP", color: MEMBER_COLORS[5] },
    ],
    memberCount: 4,
    updatedAt: "1 hour ago",
  },
  {
    id: "p3",
    name: "Authentication Service",
    description: "Secure login, session handling and token refresh flows.",
    status: "in-progress",
    progress: 82,
    members: [
      { initials: "JT", color: MEMBER_COLORS[5] },
      { initials: "PP", color: MEMBER_COLORS[6] },
    ],
    memberCount: 3,
    updatedAt: "45 minutes ago",
  },
  {
    id: "p4",
    name: "Mobile Application",
    description: "Native iOS and Android companion app for Collabrix.",
    status: "planning",
    progress: 12,
    members: [
      { initials: "SK", color: MEMBER_COLORS[0] },
      { initials: "MC", color: MEMBER_COLORS[1] },
      { initials: "RK", color: MEMBER_COLORS[3] },
      { initials: "AS", color: MEMBER_COLORS[4] },
    ],
    memberCount: 6,
    updatedAt: "2 hours ago",
  },
  {
    id: "p5",
    name: "Payment Gateway Integration",
    description: "Stripe checkout integration and webhook event handling.",
    status: "in-progress",
    progress: 54,
    members: [
      { initials: "RV", color: MEMBER_COLORS[6] },
      { initials: "SC", color: MEMBER_COLORS[0] },
      { initials: "NJ", color: MEMBER_COLORS[1] },
    ],
    memberCount: 4,
    updatedAt: "3 hours ago",
  },
  {
    id: "p6",
    name: "Onboarding Flow Redesign",
    description: "Simplified signup and first-run experience for new users.",
    status: "completed",
    progress: 100,
    members: [
      { initials: "LM", color: MEMBER_COLORS[4] },
      { initials: "ER", color: MEMBER_COLORS[2] },
    ],
    memberCount: 3,
    updatedAt: "2 days ago",
  },
  {
    id: "p7",
    name: "Internal Design System",
    description: "Shared component library and design tokens for all product teams.",
    status: "completed",
    progress: 100,
    members: [
      { initials: "AR", color: MEMBER_COLORS[2] },
      { initials: "JT", color: MEMBER_COLORS[5] },
      { initials: "PM", color: MEMBER_COLORS[3] },
    ],
    memberCount: 5,
    updatedAt: "5 days ago",
  },
  {
    id: "p8",
    name: "Legacy Reporting Tool",
    description: "Deprecated in favor of the new analytics dashboard.",
    status: "archived",
    progress: 100,
    members: [
      { initials: "MJ", color: MEMBER_COLORS[1] },
    ],
    memberCount: 2,
    updatedAt: "3 weeks ago",
  },
  {
    id: "p9",
    name: "Q2 Marketing Site Revamp",
    description: "Paused after Q2 roadmap changes.",
    status: "archived",
    progress: 76,
    members: [
      { initials: "PM", color: MEMBER_COLORS[3] },
    ],
    memberCount: 2,
    updatedAt: "1 month ago",
  },
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function WorkspaceProjects() {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[19px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Projects
          </h1>
          <p className="mt-1 text-[13.5px] text-zinc-500 dark:text-zinc-400">
            Manage all projects inside this workspace.
          </p>
        </div>

        <button
          type="button"
          className="group/btn relative shrink-0 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
          <span className="relative flex items-center gap-1.5">
            <PlusIcon />
            Create Project
          </span>
        </button>
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {SUMMARY_STATS.map((stat) => (
          <div
            key={stat.id}
            className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-5 py-4 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconCl}`}>
              {stat.icon}
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

      {/* Toolbar: search + filters */}
      <Toolbar />

      {/* Project grid or empty state */}
      <div className="mt-5 pb-8">
        {SHOW_EMPTY_STATE ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TOOLBAR ───────────────────────────────────────────────────────────────

function Toolbar() {
  return (
    <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon />
        </div>
        <input
          type="text"
          readOnly
          placeholder="Search projects..."
          className="h-9 w-full rounded-xl border border-zinc-200 bg-zinc-100/60 pl-9 pr-4 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />
      </div>

      {/* Status filter */}
      <ToolbarDropdown label="Status" value="All" />

      {/* Sort */}
      <ToolbarDropdown label="Sort" value="Recently Updated" />
    </div>
  );
}

function ToolbarDropdown({ label, value }) {
  return (
    <button
      type="button"
      className="flex h-9 shrink-0 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 text-[12.5px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/[0.07] dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
    >
      <span className="text-zinc-400 dark:text-zinc-500">{label}:</span>
      <span>{value}</span>
      <ChevronDownIcon />
    </button>
  );
}

// ─── PROJECT CARD ──────────────────────────────────────────────────────────

function ProjectCard({ project }) {
  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.planning;
  const extraMembers = project.memberCount - project.members.length;

  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300/80 hover:shadow-[0_8px_30px_-12px_rgba(24,24,27,0.1)] dark:border-white/[0.06] dark:bg-white/[0.025] dark:hover:border-white/[0.1] dark:hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      {/* Name + status */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[14px] font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
          {project.name}
        </h3>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${status.bg} ${status.text}`}>
          {status.label}
        </span>
      </div>

      {/* Description */}
      <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
        {project.description}
      </p>

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

      {/* Footer: members + updated */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {project.members.slice(0, 3).map((m, i) => (
              <div
                key={i}
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[8px] font-bold text-white dark:border-[#0B0C10] ${m.color}`}
              >
                {m.initials}
              </div>
            ))}
            {extraMembers > 0 && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-zinc-200 text-[8px] font-bold text-zinc-600 dark:border-[#0B0C10] dark:bg-white/[0.1] dark:text-zinc-300">
                +{extraMembers}
              </div>
            )}
          </div>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
            {project.memberCount} members
          </span>
        </div>

        <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
          Updated {project.updatedAt}
        </span>
      </div>
    </div>
  );
}

// ─── EMPTY STATE ───────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-6 py-14 text-center backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-white/[0.05] dark:text-zinc-500">
        <FolderIcon size={22} />
      </div>

      <p className="text-[14px] font-semibold text-zinc-700 dark:text-zinc-300">
        No Projects Yet
      </p>
      <p className="mx-auto mt-1 max-w-xs text-[13px] text-zinc-400 dark:text-zinc-500">
        Create your first project to start organizing your team's work.
      </p>

      <button
        type="button"
        className="group/btn relative mt-5 inline-flex items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        <span className="relative flex items-center gap-1.5">
          <PlusIcon />
          Create Project
        </span>
      </button>
    </div>
  );
}

// ─── ICONS ─────────────────────────────────────────────────────────────────

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-500">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-500">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function FolderIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" rx="1" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  );
}
