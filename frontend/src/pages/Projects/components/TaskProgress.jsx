import React from 'react';

/* ======================================================================
   components/TaskProgress.jsx
   Task status distribution — simple backend counts shown as horizontal
   progress rows. No charts, no graphs.
====================================================================== */

const STATUS_BREAKDOWN = [
  { id: 'todo',        label: 'Todo',        count: 12, barCl: 'bg-zinc-400 dark:bg-zinc-600' },
  { id: 'in-progress', label: 'In Progress', count: 5,  barCl: 'bg-indigo-500' },
  { id: 'review',      label: 'Review',      count: 3,  barCl: 'bg-violet-500' },
  { id: 'done',        label: 'Done',        count: 42, barCl: 'bg-emerald-500' },
];

const TOTAL = STATUS_BREAKDOWN.reduce((sum, s) => sum + s.count, 0);

export default function TaskProgress() {
  return (
    <section>
      <h2 className="mb-4 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        Task Progress
      </h2>

      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-5 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025] sm:p-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

        <div className="space-y-4">
          {STATUS_BREAKDOWN.map((status) => {
            const pct = TOTAL > 0 ? Math.round((status.count / TOTAL) * 100) : 0;
            return (
              <div key={status.id}>
                <div className="mb-1.5 flex items-center justify-between text-[13px]">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    {status.label}
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {status.count}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.06]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${status.barCl}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
