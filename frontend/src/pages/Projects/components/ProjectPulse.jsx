import React from 'react';

/* ======================================================================
   components/ProjectPulse.jsx
   Four compact summary cards — simple counts only, no charts.
====================================================================== */

const PULSE_STATS = [
  {
    id: 'pp1',
    label: 'Total Tasks',
    value: 62,
    iconBg: 'bg-indigo-50 dark:bg-indigo-500/10',
    iconCl: 'text-indigo-500 dark:text-indigo-400',
    icon: <ListIcon />,
  },
  {
    id: 'pp2',
    label: 'Completed Tasks',
    value: 42,
    iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    iconCl: 'text-emerald-500 dark:text-emerald-400',
    icon: <CheckIcon />,
  },
  {
    id: 'pp3',
    label: 'Overdue Tasks',
    value: 4,
    iconBg: 'bg-red-50 dark:bg-red-500/10',
    iconCl: 'text-red-500 dark:text-red-400',
    icon: <AlertIcon />,
  },
  {
    id: 'pp4',
    label: 'Project Members',
    value: 5,
    iconBg: 'bg-violet-50 dark:bg-violet-500/10',
    iconCl: 'text-violet-500 dark:text-violet-400',
    icon: <UsersIcon />,
  },
];

export default function ProjectPulse() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {PULSE_STATS.map((stat) => (
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
  );
}

// ─── ICONS ─────────────────────────────────────────────────────────────────

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
