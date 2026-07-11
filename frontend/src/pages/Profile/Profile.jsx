/* ======================================================================
   Profile.jsx
   Rendered inside <DashboardLayout> — content area only.
   Do NOT import or recreate Navbar / Sidebar.
====================================================================== */

// ─── DUMMY DATA ────────────────────────────────────────────────────────────

const USER = {
  name: "God Ninja",
  initials: "GN",
  email: "godninja@gmail.com",
  role: "Backend Developer",
  memberSince: "January 2026",
};

const OVERVIEW_STATS = [
  {
    id: "s1",
    label: "Workspaces",
    value: 3,
    icon: <LayersIcon />,
    iconBg: "bg-indigo-50 dark:bg-indigo-500/10",
    iconCl: "text-indigo-500 dark:text-indigo-400",
  },
  {
    id: "s2",
    label: "Projects",
    value: 12,
    icon: <FolderIcon />,
    iconBg: "bg-violet-50 dark:bg-violet-500/10",
    iconCl: "text-violet-500 dark:text-violet-400",
  },
  {
    id: "s3",
    label: "Assigned Tasks",
    value: 18,
    icon: <ClipboardIcon />,
    iconBg: "bg-amber-50 dark:bg-amber-500/10",
    iconCl: "text-amber-500 dark:text-amber-400",
  },
  {
    id: "s4",
    label: "Completed Tasks",
    value: 146,
    icon: <CheckCircleIcon />,
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconCl: "text-emerald-500 dark:text-emerald-400",
  },
];

const WORKSPACES = [
  { id: "w1", name: "Product Engineering", role: "Owner" },
  { id: "w2", name: "AI Research", role: "Admin" },
  { id: "w3", name: "Startup Operations", role: "Member" },
];

const ACTIVE_PROJECTS = [
  {
    id: "p1",
    name: "Collabrix v2.0 Launch",
    workspace: "Product Engineering",
    progress: 68,
    status: "on-track",
  },
  {
    id: "p2",
    name: "User Onboarding Redesign",
    workspace: "AI Research",
    progress: 42,
    status: "at-risk",
  },
  {
    id: "p3",
    name: "API Gateway Migration",
    workspace: "Product Engineering",
    progress: 91,
    status: "on-track",
  },
  {
    id: "p4",
    name: "Q3 Analytics Dashboard",
    workspace: "Startup Operations",
    progress: 15,
    status: "just-started",
  },
];

const RECENT_ACTIVITY = [
  {
    id: "a1",
    type: "completed",
    description: "Completed Authentication API",
    time: "2 hours ago",
  },
  {
    id: "a2",
    type: "comment",
    description: "Commented on API Review",
    time: "Yesterday",
  },
  {
    id: "a3",
    type: "created",
    description: "Created Sprint Planning Document",
    time: "2 days ago",
  },
  {
    id: "a4",
    type: "updated",
    description: "Updated Deployment Checklist",
    time: "3 days ago",
  },
  {
    id: "a5",
    type: "completed",
    description: "Completed Database Schema Migration",
    time: "4 days ago",
  },
];

// ─── CONFIG ────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  "on-track": {
    label: "On Track",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  "at-risk": {
    label: "At Risk",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  },
  "just-started": {
    label: "Just Started",
    dot: "bg-indigo-500",
    text: "text-indigo-700 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
  },
};

const ROLE_STYLE = {
  Owner: "text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10",
  Admin: "text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10",
  Member: "text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/[0.06]",
};

const ACTIVITY_CONFIG = {
  completed: {
    icon: <CheckSmallIcon />,
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconCl: "text-emerald-500 dark:text-emerald-400",
  },
  comment: {
    icon: <MessageSmallIcon />,
    iconBg: "bg-indigo-50 dark:bg-indigo-500/10",
    iconCl: "text-indigo-500 dark:text-indigo-400",
  },
  created: {
    icon: <PlusSmallIcon />,
    iconBg: "bg-violet-50 dark:bg-violet-500/10",
    iconCl: "text-violet-500 dark:text-violet-400",
  },
  updated: {
    icon: <EditSmallIcon />,
    iconBg: "bg-amber-50 dark:bg-amber-500/10",
    iconCl: "text-amber-500 dark:text-amber-400",
  },
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function Profile() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-6 lg:px-8">
      {/* ── Profile Header ─────────────────────────────────────────── */}
      <ProfileHeader />

      {/* ── Overview Stats ─────────────────────────────────────────── */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {OVERVIEW_STATS.map((stat) => (
          <OverviewCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* ── Two-column layout ──────────────────────────────────────── */}
      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* Left column */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          <AboutSection />
          <WorkspacesSection />
          <ActiveProjectsSection />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <RecentActivitySection />
          <ContactSection />
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="pb-8" />
    </div>
  );
}

// ─── PROFILE HEADER ────────────────────────────────────────────────────────

function ProfileHeader() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-6 py-6 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025] sm:px-8 sm:py-7">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Left — Avatar + Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-[18px] font-bold text-white sm:h-16 sm:w-16 sm:text-[20px]">
            {USER.initials}
          </div>

          {/* Info */}
          <div className="min-w-0">
            <h1 className="text-[20px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[22px]">
              {USER.name}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-zinc-500 dark:text-zinc-400">
              <span>{USER.role}</span>
              <span className="text-zinc-200 dark:text-zinc-600">·</span>
              <span>{USER.email}</span>
              <span className="text-zinc-200 dark:text-zinc-600">·</span>
              <span>Member since {USER.memberSince}</span>
            </div>
          </div>
        </div>

        {/* Right — Settings button */}
        {/* <button
          type="button"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.06] dark:hover:text-zinc-100"
        >
          <SettingsIcon />
          Settings
        </button> */}
      </div>
    </div>
  );
}

// ─── OVERVIEW CARD ─────────────────────────────────────────────────────────

function OverviewCard({ stat }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-5 py-4 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[12px] font-medium text-zinc-500 dark:text-zinc-400">
            {stat.label}
          </p>
          <p className="mt-1.5 text-[28px] font-bold leading-none tracking-tight text-zinc-900 dark:text-zinc-50">
            {stat.value}
          </p>
        </div>
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconCl}`}
        >
          {stat.icon}
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT SECTION ─────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section>
      <h2 className="mb-4 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        About
      </h2>

      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

        <div className="divide-y divide-zinc-100 dark:divide-white/[0.04]">
          {[
            { label: "Role", value: USER.role },
            { label: "Email", value: USER.email },
            { label: "Member Since", value: USER.memberSince },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-5 py-3.5"
            >
              <span className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
                {row.label}
              </span>
              <span className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WORKSPACES SECTION ────────────────────────────────────────────────────

function WorkspacesSection() {
  return (
    <section>
      <h2 className="mb-4 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        Workspaces
      </h2>

      {WORKSPACES.length === 0 ? (
        <EmptyState
          icon={<LayersIcon />}
          title="No Workspaces"
          description="You are not a member of any workspace yet."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {WORKSPACES.map((ws) => (
            <div
              key={ws.id}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-5 py-4 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300/80 hover:shadow-[0_8px_30px_-12px_rgba(24,24,27,0.12)] dark:border-white/[0.06] dark:bg-white/[0.025] dark:hover:border-white/[0.1] dark:hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <LayersSmallIcon />
                  </div>
                  <span className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                    {ws.name}
                  </span>
                </div>

                <span
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${
                    ROLE_STYLE[ws.role] || ROLE_STYLE.Member
                  }`}
                >
                  {ws.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── ACTIVE PROJECTS SECTION ───────────────────────────────────────────────

function ActiveProjectsSection() {
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
          View All →
        </a>
      </div>

      {ACTIVE_PROJECTS.length === 0 ? (
        <EmptyState
          icon={<FolderIcon />}
          title="No Projects"
          description="You are not assigned to any active projects."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {ACTIVE_PROJECTS.map((project) => {
            const status =
              STATUS_CONFIG[project.status] || STATUS_CONFIG["on-track"];

            return (
              <div
                key={project.id}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300/80 hover:shadow-[0_8px_30px_-12px_rgba(24,24,27,0.12)] dark:border-white/[0.06] dark:bg-white/[0.025] dark:hover:border-white/[0.1] dark:hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

                {/* Name + Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                      {project.name}
                    </h3>
                    <p className="mt-0.5 text-[12px] text-zinc-400 dark:text-zinc-500">
                      {project.workspace}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ${status.bg} ${status.text}`}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-zinc-500 dark:text-zinc-400">
                      Progress
                    </span>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

// ─── RECENT ACTIVITY SECTION ───────────────────────────────────────────────

function RecentActivitySection() {
  return (
    <section>
      <h2 className="mb-4 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        Recent Activity
      </h2>

      {RECENT_ACTIVITY.length === 0 ? (
        <EmptyState
          icon={<ClockIcon />}
          title="No Recent Activity"
          description="Your activity will appear here once you start working."
        />
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

          {/* Timeline */}
          <div className="relative px-5 py-2">
            {/* Vertical line */}
            <div className="absolute bottom-0 left-[31px] top-0 w-px bg-zinc-100 dark:bg-white/[0.05]" />

            {RECENT_ACTIVITY.map((item) => {
              const cfg = ACTIVITY_CONFIG[item.type] || ACTIVITY_CONFIG.updated;

              return (
                <div
                  key={item.id}
                  className="relative flex items-start gap-3 py-3.5"
                >
                  {/* Dot */}
                  <div
                    className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${cfg.iconBg} ${cfg.iconCl}`}
                  >
                    {cfg.icon}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-[13px] leading-snug text-zinc-700 dark:text-zinc-300">
                      {item.description}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-zinc-400 dark:text-zinc-500">
                      {item.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

// ─── CONTACT SECTION ───────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section>
      <h2 className="mb-4 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        Contact
      </h2>

      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

        <div className="divide-y divide-zinc-100 dark:divide-white/[0.04]">
          <div className="flex items-center gap-3 px-5 py-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400">
              <MailIcon />
            </div>
            <div className="min-w-0">
              <p className="text-[11.5px] font-medium text-zinc-400 dark:text-zinc-500">
                Email
              </p>
              <p className="truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                {USER.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-500 dark:bg-violet-500/10 dark:text-violet-400">
              <BriefcaseIcon />
            </div>
            <div className="min-w-0">
              <p className="text-[11.5px] font-medium text-zinc-400 dark:text-zinc-500">
                Role
              </p>
              <p className="truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                {USER.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EMPTY STATE ───────────────────────────────────────────────────────────

function EmptyState({ icon, title, description }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-6 py-12 text-center backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-white/[0.05] dark:text-zinc-500">
        {icon}
      </div>

      <p className="text-[14px] font-semibold text-zinc-700 dark:text-zinc-300">
        {title}
      </p>
      <p className="mt-1 text-[13px] text-zinc-400 dark:text-zinc-500">
        {description}
      </p>
    </div>
  );
}

// ─── ICONS ─────────────────────────────────────────────────────────────────

function SettingsIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function LayersSmallIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11Z" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// ─── SMALL TIMELINE ICONS ──────────────────────────────────────────────────

function CheckSmallIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function MessageSmallIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
    </svg>
  );
}

function PlusSmallIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function EditSmallIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
    </svg>
  );
}
