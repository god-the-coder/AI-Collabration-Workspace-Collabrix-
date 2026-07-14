import React from 'react';

/* ======================================================================
   ProjectMembers.jsx
   Rendered inside <ProjectLayout><Outlet /></ProjectLayout> as the
   "Members" tab. ProjectLayout already renders DashboardLayout, Navbar,
   Sidebar, the Project Header, and the Project Navigation Tabs — this
   file is the Outlet content only.

   Purpose: every member belonging to THIS project (not the workspace).
   UI only — no state, no event handlers, no search/filter/modal logic.

   Note on the three-dot menu: this brief explicitly forbids event
   handlers, so the row menu below uses a native <details>/<summary>
   element rather than React state to demonstrate the menu items —
   the browser handles the open/close toggle natively, no JS involved.
====================================================================== */

// Flip this during visual QA to preview the empty state. Not wired to any
// real data source — purely a manual toggle for reviewing both states.
const SHOW_EMPTY_STATE = false;

// ─── CONFIG ────────────────────────────────────────────────────────────────

const ROLE_CONFIG = {
  admin:  { label: 'Admin',  bg: 'bg-violet-50 dark:bg-violet-500/10', text: 'text-violet-700 dark:text-violet-400' },
  member: { label: 'Member', bg: 'bg-zinc-100  dark:bg-white/[0.06]',  text: 'text-zinc-600  dark:text-zinc-400'  },
};

const ROW_MENU_ITEMS = ['View Profile', 'Change Role'];

// ─── DUMMY DATA ────────────────────────────────────────────────────────────

const MEMBERS = [
  { id: 'pm1', name: 'Ninja',          username: 'ninja',  role: 'admin',  joined: 'Joined 6 months ago', assignedTasks: 9,  initials: 'NJ', color: 'bg-indigo-500'  },
  { id: 'pm2', name: 'Sarah Chen',     username: 'sarah',  role: 'admin',  joined: 'Joined 4 months ago', assignedTasks: 14, initials: 'SC', color: 'bg-violet-500'  },
  { id: 'pm3', name: 'Arjun Patel',    username: 'arjun',  role: 'member', joined: 'Joined 3 months ago', assignedTasks: 11, initials: 'AR', color: 'bg-emerald-500' },
  { id: 'pm4', name: 'Priya Sharma',   username: 'priya',  role: 'member', joined: 'Joined 2 months ago', assignedTasks: 6,  initials: 'PS', color: 'bg-rose-500'    },
  { id: 'pm5', name: 'Marcus Johnson', username: 'marcus', role: 'member', joined: 'Joined 6 weeks ago',  assignedTasks: 8,  initials: 'MJ', color: 'bg-amber-500'   },
  { id: 'pm6', name: 'Jamie Thompson', username: 'jamie',  role: 'member', joined: 'Joined 3 weeks ago',  assignedTasks: 4,  initials: 'JT', color: 'bg-cyan-500'    },
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function ProjectMembers() {
  return (
    <div>
      <Toolbar />
      <div className="mt-6 pb-8">
        {SHOW_EMPTY_STATE ? <EmptyState /> : <MembersGrid />}
      </div>
    </div>
  );
}

// ─── TOOLBAR ───────────────────────────────────────────────────────────────

function Toolbar() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative sm:w-64">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </div>
          <input
            type="text"
            readOnly
            placeholder="Search members..."
            aria-label="Search members"
            className="h-9 w-full rounded-xl border border-zinc-200 bg-zinc-100/60 pl-9 pr-4 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
        </div>

        {/* Role filter — native select, no handler needed */}
        <div className="relative sm:w-40">
          <select
            defaultValue="All Roles"
            aria-label="Filter by role"
            className="h-9 w-full appearance-none rounded-xl border border-zinc-200 bg-white pl-3.5 pr-8 text-[12.5px] font-medium text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 dark:border-white/[0.07] dark:bg-white/[0.03] dark:text-zinc-300 dark:focus-visible:ring-indigo-400/30"
          >
            <option>All Roles</option>
            <option>Admin</option>
            <option>Member</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <ChevronDownIcon />
          </div>
        </div>
      </div>

      {/* Add Member — will later open AddMemberModal */}
      <button
        type="button"
        className="group/btn relative shrink-0 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500 dark:focus-visible:ring-indigo-400/40"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        <span className="relative flex items-center gap-1.5">
          <PlusIcon />
          Add Member
        </span>
      </button>
    </div>
  );
}

// ─── MEMBERS GRID ───────────────────────────────────────────────────────────

function MembersGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {MEMBERS.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}

function MemberCard({ member }) {
  const role = ROLE_CONFIG[member.role] || ROLE_CONFIG.member;

  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300/80 hover:shadow-[0_8px_30px_-12px_rgba(24,24,27,0.1)] dark:border-white/[0.06] dark:bg-white/[0.025] dark:hover:border-white/[0.1] dark:hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      {/* Row menu — top right */}
      <div className="absolute right-3 top-3">
        <RowMenu memberName={member.name} />
      </div>

      {/* Identity */}
      <div className="flex flex-col items-center pt-1 text-center">
        <div className={`flex h-16 w-16 items-center justify-center rounded-full text-[18px] font-bold text-white ${member.color}`}>
          {member.initials}
        </div>
        <p className="mt-3 text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
          {member.name}
        </p>
        <p className="text-[12px] text-zinc-400 dark:text-zinc-500">
          @{member.username}
        </p>
        <span className={`mt-2 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${role.bg} ${role.text}`}>
          {role.label}
        </span>
      </div>

      {/* Stats footer */}
      <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-zinc-100 pt-4 dark:border-white/[0.05]">
        <div className="rounded-xl bg-zinc-50/80 p-2.5 text-center dark:bg-white/[0.03]">
          <p className="mb-0.5 text-[10.5px] font-medium text-zinc-500 dark:text-zinc-400">Joined</p>
          <p className="text-[12px] font-semibold leading-tight text-zinc-800 dark:text-zinc-200">
            {member.joined.replace('Joined ', '')}
          </p>
        </div>
        <div className="rounded-xl bg-zinc-50/80 p-2.5 text-center dark:bg-white/[0.03]">
          <p className="mb-0.5 text-[10.5px] font-medium text-zinc-500 dark:text-zinc-400">Assigned Tasks</p>
          <p className="text-[15px] font-semibold leading-tight text-zinc-900 dark:text-zinc-100">
            {member.assignedTasks}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── ROW MENU (⋮) ───────────────────────────────────────────────────────────
// Native <details>/<summary> disclosure — no React state, no event
// handlers. The browser handles opening and closing this natively.

function RowMenu({ memberName }) {
  return (
    <details className="group/menu relative">
      <summary
        aria-label={`Actions for ${memberName}`}
        className="flex h-8 w-8 list-none items-center justify-center rounded-lg text-zinc-400 transition-colors marker:content-none hover:bg-zinc-100 hover:text-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300 dark:focus-visible:ring-indigo-400/40 [&::-webkit-details-marker]:hidden"
      >
        <MoreVerticalIcon />
      </summary>

      <div
        role="menu"
        aria-label={`Actions for ${memberName}`}
        className="absolute right-0 top-[calc(100%+6px)] z-30 w-48 overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/95 shadow-[0_8px_30px_-8px_rgba(24,24,27,0.14)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111218]/95 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />

        <div className="py-1.5">
          {ROW_MENU_ITEMS.map((label) => (
            <div
              key={label}
              role="menuitem"
              className="flex w-full items-center px-4 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50/80 dark:text-zinc-300 dark:hover:bg-white/[0.04]"
            >
              {label}
            </div>
          ))}
        </div>

        <div className="h-px bg-zinc-100 dark:bg-white/[0.05]" />

        <div className="py-1.5">
          <div
            role="menuitem"
            className="flex w-full items-center px-4 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-zinc-300 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            Remove Member
          </div>
        </div>
      </div>
    </details>
  );
}

// ─── EMPTY STATE ───────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-6 py-14 text-center backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-white/[0.05] dark:text-zinc-500">
        <UsersIcon />
      </div>

      <p className="text-[14px] font-semibold text-zinc-700 dark:text-zinc-300">No Members Yet</p>
      <p className="mx-auto mt-1 max-w-xs text-[13px] text-zinc-400 dark:text-zinc-500">
        Invite teammates to start collaborating on this project.
      </p>

      <button
        type="button"
        className="group/btn relative mt-5 inline-flex items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500 dark:focus-visible:ring-indigo-400/40"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        <span className="relative flex items-center gap-1.5">
          <PlusIcon />
          Add Member
        </span>
      </button>
    </div>
  );
}

// ─── ICONS ─────────────────────────────────────────────────────────────────

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

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MoreVerticalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
