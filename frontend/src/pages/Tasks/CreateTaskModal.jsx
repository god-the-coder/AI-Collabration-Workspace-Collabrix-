import React from 'react';

/* ======================================================================
   CreateTaskModal.jsx

   Presentational only. Opened from inside /projects/:projectId, so the
   workspace and project are already known context — neither is asked
   for here. No React state, no event handlers, no open/close logic:
   the parent that mounts this component is responsible for deciding
   when it appears and for wiring up submission later.

   Allowed fields only: Title, Description, Assignee, Priority, Due Date,
   Milestone. Workspace / Project / Status / Created By / Completed At /
   Parent Task are handled by backend or project context and intentionally
   do not appear in this form.
====================================================================== */

const ASSIGNEES = ['Ninja', 'Sarah', 'Arjun', 'Priya'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const MILESTONES = ['Authentication', 'Deployment', 'Release v2'];

export default function CreateTaskModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div aria-hidden="true" className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] dark:border-white/[0.08] dark:bg-[#111218] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] sm:max-w-xl"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-100 px-5 py-4 dark:border-white/[0.05]">
          <div>
            <p id="create-task-title" className="text-[14.5px] font-semibold text-zinc-900 dark:text-zinc-100">
              Create Task
            </p>
            <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">
              Create a new task for this project.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300 dark:focus-visible:ring-indigo-400/40"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Form */}
        <div className="max-h-[70vh] space-y-4 overflow-y-auto px-5 py-5">
          {/* Task Title */}
          <div>
            <label htmlFor="task-title" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
              Task Title <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              placeholder="Enter task title..."
              className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="task-description" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
              Description
            </label>
            <textarea
              id="task-description"
              rows={3}
              placeholder="Describe the task..."
              className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
            />
          </div>

          {/* Row: Assignee + Priority */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="task-assignee" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
                Assignee
              </label>
              <SelectField id="task-assignee" placeholder="Select assignee" options={ASSIGNEES} />
            </div>

            <div>
              <label htmlFor="task-priority" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
                Priority
              </label>
              <SelectField id="task-priority" options={PRIORITIES} defaultValue="Medium" />
            </div>
          </div>

          {/* Row: Due Date + Milestone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="task-due-date" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
                Due Date
              </label>
              <input
                id="task-due-date"
                type="date"
                className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[13.5px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:[color-scheme:dark] dark:focus:ring-indigo-400/30"
              />
            </div>

            <div>
              <label htmlFor="task-milestone" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
                Milestone
              </label>
              {MILESTONES.length > 0 ? (
                <SelectField id="task-milestone" placeholder="Select milestone" options={MILESTONES} />
              ) : (
                <div className="flex h-10 w-full items-center rounded-xl border border-zinc-200/60 bg-zinc-50/80 px-3.5 text-[13px] text-zinc-400 dark:border-white/[0.05] dark:bg-white/[0.02] dark:text-zinc-500">
                  No milestones available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-zinc-100 px-5 py-4 dark:border-white/[0.05]">
          <button
            type="button"
            className="rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100 dark:focus-visible:ring-indigo-400/40"
          >
            Cancel
          </button>
          <button
            type="button"
            className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500 dark:focus-visible:ring-indigo-400/40"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            <span className="relative">Create Task</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SELECT FIELD (shared shape for the four dropdowns above) ─────────────

function SelectField({ id, placeholder, options, defaultValue }) {
  return (
    <div className="relative">
      <select
        id={id}
        defaultValue={defaultValue ?? ''}
        className="h-10 w-full appearance-none rounded-xl border border-zinc-200 bg-white px-3.5 pr-9 text-[13.5px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <ChevronDownIcon />
      </div>
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

function ChevronDownIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-500">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
