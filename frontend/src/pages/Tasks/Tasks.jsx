/* ======================================================================
   Tasks.jsx
   Rendered inside <DashboardLayout> — content area only.
   Do NOT import or recreate Navbar / Sidebar.
====================================================================== */

// ─── CONFIG ────────────────────────────────────────────────────────────────

const PRIORITY = {
  critical: {
    label: "Critical",
    dot:   "bg-red-500",
    text:  "text-red-700    dark:text-red-400",
    bg:    "bg-red-50       dark:bg-red-500/10",
  },
  high: {
    label: "High",
    dot:   "bg-amber-500",
    text:  "text-amber-700  dark:text-amber-400",
    bg:    "bg-amber-50     dark:bg-amber-500/10",
  },
  medium: {
    label: "Medium",
    dot:   "bg-indigo-500",
    text:  "text-indigo-700 dark:text-indigo-400",
    bg:    "bg-indigo-50    dark:bg-indigo-500/10",
  },
  low: {
    label: "Low",
    dot:   "bg-zinc-400",
    text:  "text-zinc-600   dark:text-zinc-400",
    bg:    "bg-zinc-100     dark:bg-white/[0.06]",
  },
};

const STATUS = {
  "in-review": {
    label: "In Review",
    text:  "text-violet-700  dark:text-violet-400",
    bg:    "bg-violet-50     dark:bg-violet-500/10",
  },
  "in-progress": {
    label: "In Progress",
    text:  "text-indigo-700  dark:text-indigo-400",
    bg:    "bg-indigo-50     dark:bg-indigo-500/10",
  },
  blocked: {
    label: "Blocked",
    text:  "text-red-700     dark:text-red-400",
    bg:    "bg-red-50        dark:bg-red-500/10",
  },
  "to-do": {
    label: "To Do",
    text:  "text-zinc-600    dark:text-zinc-400",
    bg:    "bg-zinc-100      dark:bg-white/[0.06]",
  },
  done: {
    label: "Done",
    text:  "text-emerald-700 dark:text-emerald-400",
    bg:    "bg-emerald-50    dark:bg-emerald-500/10",
  },
};

const WS_BADGE = {
  "Product Engineering": "bg-indigo-50  text-indigo-700  dark:bg-indigo-500/10  dark:text-indigo-300",
  "Design Studio":       "bg-violet-50  text-violet-700  dark:bg-violet-500/10  dark:text-violet-300",
  "Infrastructure":      "bg-cyan-50    text-cyan-700    dark:bg-cyan-500/10    dark:text-cyan-300",
  "Data Platform":       "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  "Marketing":           "bg-rose-50    text-rose-700    dark:bg-rose-500/10    dark:text-rose-300",
};

// ─── DUMMY DATA ────────────────────────────────────────────────────────────

const OVERVIEW_STATS = [
  {
    id:    "s1",
    label: "Assigned To Me",
    value: 46,
    numCls: "text-zinc-900 dark:text-zinc-50",
    icon: <AssignedIcon />,
    iconBg: "bg-indigo-50 dark:bg-indigo-500/10",
    iconCl: "text-indigo-500 dark:text-indigo-400",
  },
  {
    id:    "s2",
    label: "Due Today",
    value: 8,
    numCls: "text-amber-600 dark:text-amber-400",
    icon: <CalendarIcon />,
    iconBg: "bg-amber-50 dark:bg-amber-500/10",
    iconCl: "text-amber-500 dark:text-amber-400",
  },
  {
    id:    "s3",
    label: "Overdue",
    value: 3,
    numCls: "text-red-600 dark:text-red-400",
    icon: <AlertIcon />,
    iconBg: "bg-red-50 dark:bg-red-500/10",
    iconCl: "text-red-500 dark:text-red-400",
  },
  {
    id:    "s4",
    label: "Completed This Week",
    value: 27,
    numCls: "text-emerald-600 dark:text-emerald-400",
    icon: <CheckIcon />,
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconCl: "text-emerald-500 dark:text-emerald-400",
  },
];

const DUE_TODAY_TASKS = [
  {
    id: "t1",
    name: "Authentication API",
    description: "Implement secure JWT-based authentication endpoints and refresh token flow for the v2 release.",
    workspace: "Product Engineering",
    project: "API Gateway Migration",
    priority: "high",
    status: "in-review",
    due: "Today",
    assignedBy: "Sarah K.",
    assignedInitials: "SK",
    assignedColor: "bg-violet-500",
    updatedAt: "2 hours ago",
  },
  {
    id: "t2",
    name: "Dashboard UI Polish",
    description: "Fix responsive layout issues and refine mobile breakpoints across the main dashboard view.",
    workspace: "Design Studio",
    project: "User Onboarding Redesign",
    priority: "high",
    status: "in-progress",
    due: "Today",
    assignedBy: "Arjun R.",
    assignedInitials: "AR",
    assignedColor: "bg-emerald-500",
    updatedAt: "45 min ago",
  },
  {
    id: "t3",
    name: "Landing Page Copy Review",
    description: "Review final marketing copy and approve hero section content before dev handoff.",
    workspace: "Marketing",
    project: "Q3 Campaign",
    priority: "medium",
    status: "to-do",
    due: "Today",
    assignedBy: "Priya M.",
    assignedInitials: "PM",
    assignedColor: "bg-rose-500",
    updatedAt: "1 hour ago",
  },
];

const OVERDUE_TASKS = [
  {
    id: "t4",
    name: "Payment Gateway Integration",
    description: "Connect Stripe checkout to the order service and implement webhook event handlers end-to-end.",
    workspace: "Product Engineering",
    project: "Collabrix v2.0 Launch",
    priority: "critical",
    status: "blocked",
    due: "2 days ago",
    assignedBy: "Raj V.",
    assignedInitials: "RV",
    assignedColor: "bg-orange-500",
    updatedAt: "Yesterday",
  },
  {
    id: "t5",
    name: "Sprint Planning Documentation",
    description: "Finalize Q3 sprint goals, story point estimates, and team capacity notes for stakeholder review.",
    workspace: "Product Engineering",
    project: "Collabrix v2.0 Launch",
    priority: "high",
    status: "in-progress",
    due: "3 days ago",
    assignedBy: "Sarah K.",
    assignedInitials: "SK",
    assignedColor: "bg-violet-500",
    updatedAt: "3 days ago",
  },
  {
    id: "t6",
    name: "Marketing Campaign Assets",
    description: "Deliver final social media graphics and email header templates for the Q3 campaign push.",
    workspace: "Design Studio",
    project: "Q3 Campaign",
    priority: "medium",
    status: "in-progress",
    due: "Yesterday",
    assignedBy: "Priya M.",
    assignedInitials: "PM",
    assignedColor: "bg-rose-500",
    updatedAt: "2 days ago",
  },
];

const UPCOMING_TASKS = [
  {
    id: "t7",
    name: "Analytics Dashboard Metrics",
    description: "Define KPI widget specs including DAU, retention rate, and MRR tiles for the Q3 analytics view.",
    workspace: "Data Platform",
    project: "Q3 Analytics Dashboard",
    priority: "medium",
    status: "to-do",
    due: "Tomorrow",
    assignedBy: "Arjun R.",
    assignedInitials: "AR",
    assignedColor: "bg-emerald-500",
    updatedAt: "5 hours ago",
  },
  {
    id: "t8",
    name: "API Load Testing",
    description: "Run k6 performance tests on auth and payments endpoints under simulated peak load conditions.",
    workspace: "Infrastructure",
    project: "API Gateway Migration",
    priority: "high",
    status: "to-do",
    due: "In 3 days",
    assignedBy: "Raj V.",
    assignedInitials: "RV",
    assignedColor: "bg-orange-500",
    updatedAt: "1 day ago",
  },
  {
    id: "t9",
    name: "Onboarding Copy Review",
    description: "Proofread and approve all tooltip text, empty state copy, and help labels in the onboarding flow.",
    workspace: "Design Studio",
    project: "User Onboarding Redesign",
    priority: "medium",
    status: "to-do",
    due: "In 4 days",
    assignedBy: "Sarah K.",
    assignedInitials: "SK",
    assignedColor: "bg-violet-500",
    updatedAt: "6 hours ago",
  },
  {
    id: "t10",
    name: "Team Retrospective Prep",
    description: "Prepare retrospective agenda, collect anonymous feedback entries, and format action items for the session.",
    workspace: "Product Engineering",
    project: "Collabrix v2.0 Launch",
    priority: "low",
    status: "to-do",
    due: "In 5 days",
    assignedBy: "Priya M.",
    assignedInitials: "PM",
    assignedColor: "bg-rose-500",
    updatedAt: "2 days ago",
  },
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function Tasks() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-6 lg:px-8">

      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[24px]">
            Tasks
          </h1>
          <p className="mt-1 text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            Manage every task assigned to you across all workspaces and projects.
          </p>
        </div>

        {/* Create Task — identical shimmer-sweep button pattern to Dashboard */}
        <button
          type="button"
          className="group/btn relative shrink-0 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
          <span className="relative flex items-center gap-1.5">
            <PlusIcon />
            Create Task
          </span>
        </button>
      </div>

      {/* ── Overview Stats ────────────────────────────────────────── */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {OVERVIEW_STATS.map((stat) => (
          <OverviewCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* ── Task Sections ─────────────────────────────────────────── */}
      <div className="mt-8 flex flex-col gap-8 pb-8">
        <TaskSection
          emoji="🔥"
          title="Due Today"
          tasks={DUE_TODAY_TASKS}
          badgeCls="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
        />
        <TaskSection
          emoji="⚠️"
          title="Overdue"
          tasks={OVERDUE_TASKS}
          badgeCls="bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
        />
        <TaskSection
          emoji="📅"
          title="Upcoming"
          tasks={UPCOMING_TASKS}
          badgeCls="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
        />
      </div>
    </div>
  );
}

// ─── OVERVIEW CARD ─────────────────────────────────────────────────────────

function OverviewCard({ stat }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-5 py-4 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
      {/* Hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 truncate">
            {stat.label}
          </p>
          <p className={`mt-1.5 text-[28px] font-bold leading-none tracking-tight ${stat.numCls}`}>
            {stat.value}
          </p>
        </div>
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconCl}`}>
          {stat.icon}
        </div>
      </div>
    </div>
  );
}

// ─── TASK SECTION ──────────────────────────────────────────────────────────

function TaskSection({ emoji, title, tasks, badgeCls }) {
  return (
    <section>
      {/* Section header */}
      <div className="mb-4 flex items-center gap-2.5">
        <span className="text-[16px] leading-none" role="img" aria-hidden="true">
          {emoji}
        </span>
        <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        <span className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${badgeCls}`}>
          {tasks.length}
        </span>
      </div>

      {/* Cards or empty state */}
      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── TASK CARD ─────────────────────────────────────────────────────────────

function TaskCard({ task }) {
  const priority = PRIORITY[task.priority] || PRIORITY.medium;
  const status   = STATUS[task.status]     || STATUS["to-do"];
  const wsBadge  = WS_BADGE[task.workspace]
    ?? "bg-zinc-100 text-zinc-700 dark:bg-white/[0.06] dark:text-zinc-300";

  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300/80 hover:shadow-[0_8px_30px_-12px_rgba(24,24,27,0.12)] dark:border-white/[0.06] dark:bg-white/[0.025] dark:hover:border-white/[0.1] dark:hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)]">

      {/* Hairline top highlight — matches all other Collabrix cards */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      {/* ── Row 1: Task name + Status badge ── */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[14px] font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
          {task.name}
        </h3>
        <span className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ${status.bg} ${status.text}`}>
          {status.label}
        </span>
      </div>

      {/* ── Row 2: Description ── */}
      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400">
        {task.description}
      </p>

      {/* ── Row 3: Workspace → Project · Priority ── */}
      <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
        {/* Workspace */}
        <span className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${wsBadge}`}>
          {task.workspace}
        </span>

        {/* Chevron separator */}
        <svg
          width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className="text-zinc-300 dark:text-zinc-600"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>

        {/* Project */}
        <span className="rounded-md bg-zinc-100/80 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-400">
          {task.project}
        </span>

        <span className="text-zinc-300 dark:text-zinc-600">·</span>

        {/* Priority */}
        <span className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${priority.bg} ${priority.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${priority.dot}`} />
          {priority.label}
        </span>
      </div>

      {/* ── Row 4: Due · Assigned By · Updated ── */}
      <div className="mt-3.5 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-zinc-500 dark:text-zinc-400">
          {/* Due date */}
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8"  y1="2" x2="8"  y2="6" />
              <line x1="3"  y1="10" x2="21" y2="10" />
            </svg>
            {task.due}
          </span>

          <span className="text-zinc-200 dark:text-zinc-600">·</span>

          {/* Assigned by */}
          <span className="flex items-center gap-1.5">
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white ${task.assignedColor}`}>
              {task.assignedInitials}
            </span>
            {task.assignedBy}
          </span>
        </div>

        {/* Last updated */}
        <span className="shrink-0 text-[11px] text-zinc-400 dark:text-zinc-500">
          {task.updatedAt}
        </span>
      </div>
    </div>
  );
}

// ─── EMPTY STATE ───────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-6 py-12 text-center backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      {/* Icon container */}
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-white/[0.05] dark:text-zinc-500">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>

      <p className="text-[14px] font-semibold text-zinc-700 dark:text-zinc-300">
        No Tasks Assigned
      </p>
      <p className="mt-1 text-[13px] text-zinc-400 dark:text-zinc-500">
        You're all caught up. Enjoy your day.
      </p>

      <button
        type="button"
        className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.06] dark:hover:text-zinc-100"
      >
        <PlusIcon />
        Create Task
      </button>
    </div>
  );
}

// ─── ICONS ─────────────────────────────────────────────────────────────────

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5"  y1="12" x2="19" y2="12" />
    </svg>
  );
}

function AssignedIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9"  x2="12"    y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}