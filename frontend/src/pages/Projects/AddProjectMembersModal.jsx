import React from 'react';
import { useEffect } from 'react';



const AVAILABLE_MEMBERS = [
  { id: 'a1', name: 'Sarah Johnson', username: 'sarah', email: 'sarah@example.com', workspaceRole: 'Workspace Admin', initials: 'SJ', color: 'bg-indigo-500', selected: true },
  { id: 'a2', name: 'Marcus Lee', username: 'marcus', email: 'marcus@example.com', workspaceRole: 'Workspace Member', initials: 'ML', color: 'bg-amber-500', selected: true },
  { id: 'a3', name: 'David Chen', username: 'david', email: 'david@example.com', workspaceRole: 'Workspace Member', initials: 'DC', color: 'bg-emerald-500', selected: true },
  { id: 'a4', name: 'Priya Sharma', username: 'priya', email: 'priya@example.com', workspaceRole: 'Workspace Member', initials: 'PS', color: 'bg-rose-500', selected: false },
  { id: 'a5', name: 'Jamie Thompson', username: 'jamie', email: 'jamie@example.com', workspaceRole: 'Workspace Admin', initials: 'JT', color: 'bg-violet-500', selected: false },
];

const ALREADY_IN_PROJECT = [
  { id: 'p1', name: 'Emma Wilson', workspaceRole: 'Workspace Member', initials: 'EW', color: 'bg-cyan-500' },
  { id: 'p2', name: 'Raj Verma', workspaceRole: 'Workspace Admin', initials: 'RV', color: 'bg-orange-500' },
];

const PROJECT_ROLE_OPTIONS = ['Member', 'Admin'];

// Flip this during visual QA to preview the empty state. Not wired to any
// real search/data source — purely a manual toggle for reviewing both states.
const SHOW_EMPTY_STATE = false;

export default function AddProjectMembersModal({onClose}) {
  const selectedCount = AVAILABLE_MEMBERS.filter((m) => m.selected).length;
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose} 
      className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Local keyframes for the subtle entrance animation — no JS involved,
          this plays automatically whenever the component is mounted. */}
      <style>{`
        @keyframes apmOverlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes apmModalScaleIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-[apmOverlayFadeIn_200ms_ease-out]"
      />

      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-project-members-title"
        className="relative flex max-h-[85vh] w-[95%] flex-col overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] animate-[apmModalScaleIn_200ms_ease-out] dark:border-white/[0.08] dark:bg-[#111218] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] sm:w-[90%] md:w-full md:max-w-[700px]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />

        {/* Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-zinc-100 px-5 py-4 dark:border-white/[0.05] sm:px-6">
          <div>
            <p id="add-project-members-title" className="text-[17px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Add Project Members
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">
              Select workspace members to add to this project.
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300 dark:focus-visible:ring-indigo-400/40"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Search */}
        <div className="shrink-0 border-b border-zinc-100 px-5 py-3.5 dark:border-white/[0.05] sm:px-6">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search workspace members..."
              aria-label="Search workspace members"
              className="h-9 w-full rounded-xl border border-zinc-200 bg-zinc-100/60 pl-9 pr-4 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-indigo-400/30"
            />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
          {SHOW_EMPTY_STATE ? (
            <EmptyState />
          ) : (
            <>
              {/* Available Members */}
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Available Members
                </p>
                <div className="space-y-2.5">
                  {AVAILABLE_MEMBERS.map((member) => (
                    <AvailableMemberRow key={member.id} member={member} />
                  ))}
                </div>
              </div>

              {/* Already in Project */}
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Already in Project
                </p>
                <div className="space-y-2.5">
                  {ALREADY_IN_PROJECT.map((member) => (
                    <AlreadyAddedRow key={member.id} member={member} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-end gap-2 border-t border-zinc-100 px-5 py-4 dark:border-white/[0.05] sm:px-6">
          <button
            onClick={onClose}            
            type="button"
            className="rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100 dark:focus-visible:ring-indigo-400/40"
          >
            Cancel
          </button>

          {/*
            Idle state shown below. Once submission is wired up, swap the
            inner <span> for a loading variant, e.g.:

            <span className="relative flex items-center gap-2">
              <Spinner /> Adding Members...
            </span>

            and add `disabled` + reduced opacity/cursor-not-allowed to the
            button while in that state. The Spinner icon is defined at the
            bottom of this file, ready to use.
          */}
          <button
            type="button"
            className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500 dark:focus-visible:ring-indigo-400/40"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            <span className="relative">Add Members ({selectedCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── AVAILABLE MEMBER ROW ───────────────────────────────────────────────────

function AvailableMemberRow({ member }) {
  return (
    <div className="group flex flex-col gap-3 rounded-xl border border-zinc-200/70 bg-white/70 p-3.5 backdrop-blur-sm transition-all duration-200 hover:border-zinc-300/80 hover:shadow-[0_4px_16px_-6px_rgba(24,24,27,0.1)] dark:border-white/[0.06] dark:bg-white/[0.025] dark:hover:border-white/[0.1] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        {/* Custom presentational checkbox — visual only */}
        <span
          role="checkbox"
          aria-checked={member.selected}
          aria-label={`Select ${member.name}`}
          className={`mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border-2 transition-colors ${member.selected
              ? 'border-indigo-600 bg-indigo-600'
              : 'border-zinc-300 dark:border-white/20'
            }`}
        >
          {member.selected && <CheckIcon />}
        </span>

        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${member.color}`}>
          {member.initials}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
              {member.name}
            </span>
            <span className="text-[12px] text-zinc-400 dark:text-zinc-500">@{member.username}</span>
          </div>
          <span className="mt-1 inline-block rounded-full bg-zinc-100 px-2 py-0.5 text-[10.5px] font-medium text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-400">
            {member.workspaceRole}
          </span>
          <p className="mt-1 truncate text-[12px] text-zinc-400 dark:text-zinc-500">{member.email}</p>
        </div>
      </div>

      {/* Project Role dropdown — available members only */}
      <div className="relative shrink-0 pl-[30px] sm:pl-0">
        <select
          defaultValue="Member"
          aria-label={`Project role for ${member.name}`}
          className="h-8 w-[120px] appearance-none rounded-lg border border-zinc-200 bg-white pl-2.5 pr-7 text-[12px] font-medium text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-300 dark:focus-visible:ring-indigo-400/30"
        >
          {PROJECT_ROLE_OPTIONS.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
}

// ─── ALREADY-ADDED ROW ──────────────────────────────────────────────────────

function AlreadyAddedRow({ member }) {
  return (
    <div className="flex cursor-not-allowed items-center justify-between gap-3 rounded-xl border border-zinc-100 bg-zinc-50/60 p-3.5 opacity-70 dark:border-white/[0.04] dark:bg-white/[0.015]">
      <div className="flex min-w-0 items-center gap-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white opacity-80 ${member.color}`}>
          {member.initials}
        </div>
        <div className="min-w-0">
          <span className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
            {member.name}
          </span>
          <p className="mt-0.5 text-[11.5px] text-zinc-400 dark:text-zinc-500">{member.workspaceRole}</p>
        </div>
      </div>

      <span className="flex shrink-0 items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-500 dark:bg-white/[0.05] dark:text-zinc-500">
        <CheckIcon />
        Already Added
      </span>
    </div>
  );
}

// ─── EMPTY STATE ───────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-white/[0.05] dark:text-zinc-500">
        <UsersIcon />
      </div>
      <p className="text-[14px] font-semibold text-zinc-700 dark:text-zinc-300">
        No workspace members available.
      </p>
      <p className="mx-auto mt-1 max-w-xs text-[13px] text-zinc-400 dark:text-zinc-500">
        Invite teammates to your workspace before adding them to this project.
      </p>
    </div>
  );
}

// ─── ICONS ─────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
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

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
      <polyline points="20 6 9 17 4 12" />
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

// Defined for later use in the button's loading state — not rendered by
// default. See the comment above the "Add Members" button.
function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
