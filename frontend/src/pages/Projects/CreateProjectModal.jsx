import React from 'react';
import { useEffect } from 'react';

/* ======================================================================
   CreateProjectModal.jsx

   Presentational only — no React state, no event handlers, no open/close
   logic. The parent that mounts this component decides when it appears
   and will wire up submission, loading, and validation later.

   Context awareness:
   Pass a `workspace` string when this is opened from inside a workspace
   (Workspace → Projects page) to render it as already-known, read-only
   context. Omit the prop (or pass nothing) when opened from the Global
   Projects page, and a Workspace selector renders instead. This is a
   plain prop check at render time — not state management.

     <CreateProjectModal />                          → Global Projects mode
     <CreateProjectModal workspace="Product Engineering" /> → Workspace mode

   Allowed fields only: Workspace (context dependent), Project Name,
   Description, Start Date, Due Date, Status. Owner / Members / Milestones /
   Archived / Deleted / Progress / Settings / AI Settings / Permissions are
   all backend-handled and intentionally do not appear here.
====================================================================== */

const WORKSPACE_OPTIONS = [
  'Product Engineering',
  'Design Studio',
  'AI Research Lab',
  'Marketing Team',
  'Startup Operations',
  'Data Platform',
];

const STATUS_OPTIONS = ['Planning', 'Active'];

export default function CreateProjectModal({ workspace, onClose }) {
  const isWorkspaceKnown = Boolean(workspace);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Local keyframes for the subtle entrance animation — no JS involved,
          this plays automatically whenever the component is mounted. */}

      <style>{`
        @keyframes cpmOverlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cpmModalScaleIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-[cpmOverlayFadeIn_200ms_ease-out]"
      />

      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-project-title"
        className="relative w-[95%] overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] animate-[cpmModalScaleIn_200ms_ease-out] dark:border-white/[0.08] dark:bg-[#111218] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] sm:w-[90%] md:w-full md:max-w-[560px]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-100 px-5 py-4 dark:border-white/[0.05] sm:px-6">
          <div>
            <p id="create-project-title" className="text-[17px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Create Project
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">
              Create a new project inside your workspace.
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

        {/* Form */}
        <div className="max-h-[70vh] space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
          {/* Workspace — context dependent */}
          <div>
            <label htmlFor="project-workspace" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
              Workspace {!isWorkspaceKnown && <span className="text-red-500 dark:text-red-400">*</span>}
            </label>

            {isWorkspaceKnown ? (
              <div className="flex items-center gap-2.5 rounded-xl border border-zinc-200/60 bg-zinc-50/80 px-3.5 py-2.5 dark:border-white/[0.05] dark:bg-white/[0.02]">
                <span className="text-[15px] leading-none">🏢</span>
                <span className="text-[13.5px] font-medium text-zinc-700 dark:text-zinc-300">
                  {workspace}
                </span>
              </div>
            ) : (
              <SelectField id="project-workspace" placeholder="Select workspace" options={WORKSPACE_OPTIONS} />
            )}

            {/*
              Validation message slot — rendered conditionally once form
              logic is wired up (Global Projects mode only). Example:

              <p className="mt-1.5 text-[11.5px] text-red-500 dark:text-red-400">
                Workspace is required.
              </p>
            */}
          </div>

          {/* Project Name */}
          <div>
            <label htmlFor="project-name" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
              Project Name <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              id="project-name"
              type="text"
              placeholder="Enter project name..."
              className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
            />
            {/*
              <p className="mt-1.5 text-[11.5px] text-red-500 dark:text-red-400">
                Project Name is required.
              </p>
            */}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="project-description" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
              Description <span className="font-normal text-zinc-400 dark:text-zinc-500">(optional)</span>
            </label>
            <textarea
              id="project-description"
              rows={3}
              placeholder="Briefly describe this project..."
              className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
            />
          </div>

          {/* Row: Start Date + Due Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="project-start-date" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
                Start Date <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <input
                id="project-start-date"
                type="date"
                className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[13.5px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:[color-scheme:dark] dark:focus:ring-indigo-400/30"
              />
            </div>

            <div>
              <label htmlFor="project-due-date" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
                Due Date <span className="font-normal text-zinc-400 dark:text-zinc-500">(optional)</span>
              </label>
              <input
                id="project-due-date"
                type="date"
                className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[13.5px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:[color-scheme:dark] dark:focus:ring-indigo-400/30"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="project-status" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
              Status
            </label>
            <SelectField id="project-status" options={STATUS_OPTIONS} defaultValue="Planning" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-zinc-100 px-5 py-4 dark:border-white/[0.05] sm:px-6">
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
              <Spinner /> Creating Project...
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
            <span className="relative">Create Project</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SELECT FIELD (shared shape for the Workspace/Status dropdowns) ───────

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

// Defined for later use in the button's loading state — not rendered by
// default. See the comment above the "Create Project" button.
function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
