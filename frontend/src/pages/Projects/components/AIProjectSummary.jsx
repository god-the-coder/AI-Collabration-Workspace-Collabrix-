import React from 'react';

/* ======================================================================
   components/AIProjectSummary.jsx
   Short AI-generated insights about this project. Normal dashboard card
   styling — no gradients, no fancy analytics.
====================================================================== */

const INSIGHTS = [
  'Authentication API is currently blocked.',
  'Three code reviews are pending.',
  'Payment Gateway is progressing well.',
];

export default function AIProjectSummary() {
  return (
    <section>
      <h2 className="mb-4 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        AI Project Summary
      </h2>

      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-5 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025] sm:p-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
            <SparkleIcon />
          </div>
          <div>
            <p className="text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
              Project Insights
            </p>
            <p className="text-[11.5px] text-zinc-400 dark:text-zinc-500">
              Generated from current project activity
            </p>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-4 space-y-2.5">
          {INSIGHTS.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400 dark:bg-indigo-500" />
              <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {insight}
              </p>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-4 border-t border-zinc-100 pt-3.5 dark:border-white/[0.05]">
          <a
            href="#"
            className="text-[12.5px] font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Open AI Assistant &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}
