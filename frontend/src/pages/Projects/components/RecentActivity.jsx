import React from 'react';

/* ======================================================================
   components/RecentActivity.jsx
   Recent project activity — icon, short description, timestamp. Nothing more.
====================================================================== */

const ACTIVITY_CONFIG = {
  completed: { iconBg: 'bg-emerald-50 dark:bg-emerald-500/10', iconCl: 'text-emerald-500 dark:text-emerald-400', icon: <CheckIcon /> },
  created:   { iconBg: 'bg-indigo-50  dark:bg-indigo-500/10',  iconCl: 'text-indigo-500  dark:text-indigo-400',  icon: <FolderIcon /> },
  updated:   { iconBg: 'bg-violet-50  dark:bg-violet-500/10',  iconCl: 'text-violet-500  dark:text-violet-400',  icon: <FileIcon /> },
  commented: { iconBg: 'bg-blue-50    dark:bg-blue-500/10',    iconCl: 'text-blue-500    dark:text-blue-400',    icon: <MessageIcon /> },
};

const ACTIVITY = [
  { id: 'a1', type: 'completed', text: 'Sarah completed Authentication API',        time: '2 hours ago' },
  { id: 'a2', type: 'created',   text: 'Arjun created Payment Service',              time: 'Yesterday'   },
  { id: 'a3', type: 'updated',   text: 'Documentation updated',                      time: 'Yesterday'   },
  { id: 'a4', type: 'commented', text: 'Priya commented on API rate limiting',       time: '2 days ago'  },
  { id: 'a5', type: 'completed', text: 'Marcus completed Database schema review',    time: '3 days ago'  },
];

export default function RecentActivity() {
  return (
    <section>
      <h2 className="mb-4 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        Recent Activity
      </h2>

      <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

        {ACTIVITY.map((item, idx) => {
          const cfg = ACTIVITY_CONFIG[item.type] || ACTIVITY_CONFIG.updated;
          return (
            <div
              key={item.id}
              className={`flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] ${
                idx < ACTIVITY.length - 1 ? 'border-b border-zinc-100 dark:border-white/[0.04]' : ''
              }`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cfg.iconBg} ${cfg.iconCl}`}>
                {cfg.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] text-zinc-700 dark:text-zinc-300">
                  {item.text}
                </p>
              </div>
              <span className="shrink-0 text-[11.5px] text-zinc-400 dark:text-zinc-500">
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── ICONS ─────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11Z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
    </svg>
  );
}
