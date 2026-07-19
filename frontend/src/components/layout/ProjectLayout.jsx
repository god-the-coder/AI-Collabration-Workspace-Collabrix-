import React, { useEffect, useRef, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import CreateTaskModal from '../../pages/Tasks/CreateTaskModal';
import AddProjectMembersModal from '../../pages/Projects/AddProjectMembersModal';


const PROJECT = {
  name: 'API Gateway Migration',
  description: 'Authentication & Infrastructure improvements.',
  workspace: 'Product Engineering',
  members: 8,
  tasks: 62,
  progress: 68,
  status: 'active',
  priority: 'high',
  avatar: 'AG',
};

const STATUS_CONFIG = {
  planning:  { label: 'Planning',  bg: 'bg-zinc-100  dark:bg-white/[0.06]',  text: 'text-zinc-600  dark:text-zinc-400'  },
  active:    { label: 'Active',    bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-400' },
  completed: { label: 'Completed', bg: 'bg-indigo-50  dark:bg-indigo-500/10', text: 'text-indigo-700  dark:text-indigo-400' },
};

const PRIORITY_CONFIG = {
  low:      { label: 'Low',      bg: 'bg-zinc-100  dark:bg-white/[0.06]',  text: 'text-zinc-600  dark:text-zinc-400'  },
  medium:   { label: 'Medium',   bg: 'bg-indigo-50  dark:bg-indigo-500/10', text: 'text-indigo-700  dark:text-indigo-400' },
  high:     { label: 'High',     bg: 'bg-amber-50   dark:bg-amber-500/10',  text: 'text-amber-700   dark:text-amber-400'  },
  critical: { label: 'Critical', bg: 'bg-red-50     dark:bg-red-500/10',    text: 'text-red-700     dark:text-red-400'    },
};

const PROJECT_TABS = [
  { id: 'overview', label: 'Overview', path:""},
  { id: 'tasks',    label: 'Tasks',    path:"tasks" },
  { id: 'members',  label: 'Members',  path:"members" },
  { id: 'chat',     label: 'Chat',     path:"chats" },
];

const OVERFLOW_MENU_ITEMS = ['Edit Project', 'Archive Project', 'Project Settings'];

// ─── MAIN LAYOUT ────────────────────────────────────────────────────────────

export default function ProjectLayout() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-6 lg:px-8">
      <ProjectHeader />
      <ProjectTabs />

      <div className="mt-8 pb-10">
        <Outlet />
      </div>
    </div>
  );
}

// ─── PROJECT HEADER ─────────────────────────────────────────────────────────

function ProjectHeader() {
  const status = STATUS_CONFIG[PROJECT.status] || STATUS_CONFIG.planning;
  const priority = PRIORITY_CONFIG[PROJECT.priority] || PRIORITY_CONFIG.medium;
  const [showModal, setShowModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      {/* Identity */}
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-[18px] font-bold text-white sm:h-16 sm:w-16 sm:text-[20px]">
          {PROJECT.avatar}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[24px]">
              {PROJECT.name}
            </h1>
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${status.bg} ${status.text}`}>
              {status.label}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${priority.bg} ${priority.text}`}>
              {priority.label}
            </span>
          </div>
          <p className="mt-1 text-[13.5px] text-zinc-500 dark:text-zinc-400">
            {PROJECT.description}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[12.5px] text-zinc-500 dark:text-zinc-400">
            <span>{PROJECT.workspace}</span>
            <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
            <span>{PROJECT.members} Members</span>
            <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
            <span>{PROJECT.tasks} Tasks</span>
            <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
            <span>{PROJECT.progress}% Complete</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {/* <button
          onClick={() => setShowModal(true)}
          type="button"
          className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
          <span className="relative flex items-center gap-1.5">
            <PlusIcon />
            New Task
          </span>
        </button> */}

        <button
         onClick={() => setShowMemberModal(true)}
          type="button"
          className="flex items-center gap-1.5 rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
        >
          <UserPlusIcon />
          Add Member
        </button>

        {showMemberModal && (
          <AddProjectMembersModal onClose={() => setShowMemberModal(false)} />
        )}

        {/* <button
          type="button"
          className="flex items-center gap-1.5 rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
        >
          <ChatIcon />
          Open Chat
        </button> */}

        <OverflowMenu />
      </div>

       {/* {showModal && (

        <CreateTaskModal onClose={() => setShowModal(false)}/>
       )} */}


    </div>
  );
}

// ─── OVERFLOW MENU (⋮) ──────────────────────────────────────────────────────
// Minimal open/close interaction only — mirrors the ProfileMenu / OverflowMenu
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
        aria-label="Project options"
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
          isOpen
            ? 'border-zinc-300 bg-zinc-100 text-zinc-700 dark:border-white/[0.14] dark:bg-white/[0.08] dark:text-zinc-200'
            : 'border-zinc-200/70 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:border-white/[0.08] dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-zinc-200'
        }`}
      >
        <MoreHorizontalIcon />
      </button>

      <div
        role="menu"
        aria-label="Project options"
        className={`absolute right-0 top-[calc(100%+8px)] z-30 w-52 origin-top-right overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/95 shadow-[0_8px_30px_-8px_rgba(24,24,27,0.14)] backdrop-blur-xl transition-all duration-150 ease-out dark:border-white/[0.06] dark:bg-[#111218]/95 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] ${
          isOpen
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-1 scale-[0.98] opacity-0'
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />

        <div className="py-1.5">
          {OVERFLOW_MENU_ITEMS.map((label) => (
            <button
              key={label}
              type="button"
              role="menuitem"
              className="flex w-full items-center px-4 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50/80 dark:text-zinc-300 dark:hover:bg-white/[0.04]"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT TABS ───────────────────────────────────────────────────────────
// Static UI only — the active tab is not yet derived from the current route.
// Wiring this to useLocation/NavLink is left for a follow-up pass.

function ProjectTabs() {
  return (
    <div className="mt-6 border-b border-zinc-200/70 dark:border-white/[0.06]">
      <nav className="-mb-px flex gap-5 overflow-x-auto">
        {PROJECT_TABS.map((tab) => (
          <NavLink
            to={tab.path}
            end={" "}
            key={tab.id}
            className={({isActive}) => `shrink-0 cursor-pointer whitespace-nowrap border-b-2 px-1 pb-3 text-[13.5px] font-medium transition-colors ${
              isActive
                ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
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

function UserPlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
    </svg>
  );
}

function MoreHorizontalIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
