import React from 'react';

/* ======================================================================
   components/QuickActions.jsx
   Compact row of quick action buttons at the top of the Project Overview.
   UI only — no event handlers, no navigation.
====================================================================== */

const ACTIONS = [
  { id: 'new-task',    label: 'New Task',    icon: PlusIcon,     primary: true },
  { id: 'add-member',  label: 'Add Member',  icon: UserPlusIcon, primary: false },
  { id: 'open-chat',   label: 'Open Chat',   icon: ChatIcon,     primary: false },
];

export default function QuickActions() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3.5 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      <div className="flex flex-wrap items-center gap-2">
        {ACTIONS.map((action) => (
          <ActionButton key={action.id} action={action} />
        ))}
      </div>
    </div>
  );
}

function ActionButton({ action }) {
  const Icon = action.icon;

  if (action.primary) {
    return (
      <button
        type="button"
        className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3.5 py-2 text-[12.5px] font-semibold text-white shadow-[0_2px_10px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_4px_16px_-4px_rgba(79,70,229,0.45)] active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        <span className="relative flex items-center gap-1.5">
          <Icon />
          {action.label}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className="flex items-center gap-1.5 rounded-xl border border-zinc-200/70 px-3.5 py-2 text-[12.5px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
    >
      <Icon />
      {action.label}
    </button>
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
