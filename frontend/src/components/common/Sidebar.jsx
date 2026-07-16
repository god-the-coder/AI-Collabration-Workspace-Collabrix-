


/* =====================================================================
   SIDEBAR DATA
====================================================================== */

import { NavLink } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { label: "Dashboard",    icon: "grid",        path:"dashboard"},
  { label: "Workspaces",   icon: "layers",      path:"workspaces"},
  { label: "Projects",     icon: "folder",      path:"projects"},
  { label: "Tasks",        icon: "check-square", path:"tasks"},
  { label: "Chats",        icon: "message"    , path:"chats"},
  // { label: "Documents",    icon: "file-text"  , path:"documents" },
  { label: "AI Assistant", icon: "sparkle"     , path:"ai-assistant"},
  // { label: "Team",         icon: "users"     , path:"team"},
];

/* =====================================================================
   SIDEBAR  — default export
====================================================================== */

export default function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-zinc-200/70 bg-white/50 backdrop-blur-sm dark:border-white/[0.06] dark:bg-[#111218]/50 md:block lg:w-60">
      <div className="flex h-full flex-col px-3 py-4">
        {/* Nav items */}
        <div className="space-y-0.5">
          {SIDEBAR_ITEMS.map((item) => (
            <NavLink
              to={item.path}
              key={item.label}
              className={({isActive}) => `flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-[13.5px] font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/[0.08] dark:text-indigo-300"
                  : "text-zinc-500 hover:bg-zinc-100/80 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-zinc-200"
              }`}
            >
              <span className={item.active ? "text-indigo-500 dark:text-indigo-400" : ""}>
                <SidebarIcon name={item.icon} />
              </span>
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Bottom — Workspace card */}
        <div className="mt-auto">
          <div className="rounded-xl border border-zinc-200/60 bg-zinc-50/80 px-3 py-3 dark:border-white/[0.05] dark:bg-white/[0.02]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Workspace
            </p>
            <p className="mt-1 text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
              Product Engineering
            </p>
            <p className="text-[11.5px] text-zinc-400 dark:text-zinc-500">
              8 members
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* =====================================================================
   SIDEBAR ICON RESOLVER
====================================================================== */

function SidebarIcon({ name }) {
  const icons = {
    grid: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3"  y="3"  width="7" height="7" rx="1.5" />
        <rect x="14" y="3"  width="7" height="7" rx="1.5" />
        <rect x="3"  y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    layers: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    folder: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11Z" />
      </svg>
    ),
    "check-square": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    message: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
      </svg>
    ),
    "file-text": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    sparkle: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    ),
    users: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  };

  return icons[name] || null;
}
