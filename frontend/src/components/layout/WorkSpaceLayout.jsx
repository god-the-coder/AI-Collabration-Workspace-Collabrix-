import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  UserPlus,
  MoreHorizontal,
  ChevronRight,
  Edit3,
  Link2,
  Settings as SettingsIcon,
  LogOut,
} from 'lucide-react';

/* ======================================================================
   WorkspaceLayout.jsx
   Shared layout for every /workspaces/:workspaceId/* route.

   Renders everything common across workspace pages:
     - Breadcrumb
     - Workspace header (logo, name, role, stats, actions)
     - Overflow menu (⋮)
     - Workspace navigation tabs
     - <Outlet /> for the active tab's page-specific content

   Page-specific content (Overview widgets, Project lists, etc.) lives in
   the routed page components, not here. UI only — no data fetching.
====================================================================== */

// ─── DUMMY DATA ────────────────────────────────────────────────────────────
// In the real app this would come from the route param / API call for
// :workspaceId. Kept as static dummy data here, unchanged from before.

const WORKSPACE = {
  name: 'Product Engineering',
  description: 'Core product development workspace.',
  role: 'Owner',
  members: 12,
  projects: 8,
  totalTasks: 86,
  avatar: 'PE',
};

const WORKSPACE_TABS = [
  { id: 'overview', label: 'Overview', active: true },
  { id: 'projects', label: 'Projects', active: false },
  { id: 'members', label: 'Members', active: false },
  { id: 'chat', label: 'Chat', active: false },
  { id: 'settings', label: 'Settings', active: false },
];

const OVERFLOW_MENU_ITEMS = [
  { id: 'edit', label: 'Edit Workspace', icon: Edit3 },
  { id: 'copy', label: 'Copy Invite Link', icon: Link2 },
  { id: 'settings', label: 'Workspace Settings', icon: SettingsIcon },
];

// ─── MAIN LAYOUT ────────────────────────────────────────────────────────────

export default function WorkspaceLayout() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-6 lg:px-8">
      <Breadcrumb />
      <WorkspaceHeader />
      <WorkspaceTabs />

      <div className="mt-8 pb-10">
        <Outlet />
      </div>
    </div>
  );
}

// ─── BREADCRUMB ────────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <div className="mb-4 flex items-center gap-1.5 text-[12.5px]">
      <span className="cursor-pointer font-medium text-zinc-400 transition-colors hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300">
        Workspaces
      </span>
      <ChevronRight size={13} className="text-zinc-300 dark:text-zinc-600" />
      <span className="font-medium text-zinc-600 dark:text-zinc-300">
        {WORKSPACE.name}
      </span>
    </div>
  );
}

// ─── WORKSPACE HEADER ───────────────────────────────────────────────────────

function WorkspaceHeader() {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      {/* Identity */}
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-[18px] font-bold text-white sm:h-16 sm:w-16 sm:text-[20px]">
          {WORKSPACE.avatar}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[24px]">
              {WORKSPACE.name}
            </h1>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
              {WORKSPACE.role}
            </span>
          </div>
          <p className="mt-1 text-[13.5px] text-zinc-500 dark:text-zinc-400">
            {WORKSPACE.description}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[12.5px] text-zinc-500 dark:text-zinc-400">
            <span>{WORKSPACE.members} members</span>
            <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
            <span>{WORKSPACE.projects} active projects</span>
            <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
            <span>{WORKSPACE.totalTasks} total tasks</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
        >
          <UserPlus size={15} />
          Invite Members
        </button>

        <OverflowMenu />
      </div>
    </div>
  );
}

// ─── OVERFLOW MENU (⋮) ──────────────────────────────────────────────────────
// Minimal open/close interaction only — mirrors the ProfileMenu / NotificationMenu
// convention already used elsewhere in the app. No business logic wired up.

function OverflowMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handlePointerDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Workspace options"
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
          isOpen
            ? 'border-zinc-300 bg-zinc-100 text-zinc-700 dark:border-white/[0.14] dark:bg-white/[0.08] dark:text-zinc-200'
            : 'border-zinc-200/70 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:border-white/[0.08] dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-zinc-200'
        }`}
      >
        <MoreHorizontal size={17} />
      </button>

      <div
        role="menu"
        aria-label="Workspace options"
        className={`absolute right-0 top-[calc(100%+8px)] z-30 w-56 origin-top-right overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/95 shadow-[0_8px_30px_-8px_rgba(24,24,27,0.14)] backdrop-blur-xl transition-all duration-150 ease-out dark:border-white/[0.06] dark:bg-[#111218]/95 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] ${
          isOpen
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-1 scale-[0.98] opacity-0'
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />

        <div className="py-1.5">
          {OVERFLOW_MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50/80 dark:text-zinc-300 dark:hover:bg-white/[0.04]"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-500 dark:text-zinc-400">
                <item.icon size={15} />
              </span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="h-px bg-zinc-100 dark:bg-white/[0.05]" />

        <div className="py-1.5">
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-zinc-300 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
              <LogOut size={15} />
            </span>
            Leave Workspace
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── WORKSPACE TABS ─────────────────────────────────────────────────────────
// Static UI only, exactly as before — the active tab is not yet derived from
// the current route. Wiring this to useLocation/NavLink is business logic
// left for a follow-up pass, not part of this reorganization.

function WorkspaceTabs() {
  return (
    <div className="mt-6 border-b border-zinc-200/70 dark:border-white/[0.06]">
      <nav className="-mb-px flex gap-5 overflow-x-auto">
        {WORKSPACE_TABS.map((tab) => (
          <div
            key={tab.id}
            className={`shrink-0 cursor-pointer whitespace-nowrap border-b-2 px-1 pb-3 text-[13.5px] font-medium transition-colors ${
              tab.active
                ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            {tab.label}
          </div>
        ))}
      </nav>
    </div>
  );
}
