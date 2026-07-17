import React from 'react';
import { useEffect } from 'react';

/* ======================================================================
   CreateWorkspaceModal.jsx

   Presentational only — no React state, no event handlers, no open/close
   logic. The parent that mounts this component decides when it appears
   and will wire up submission, loading, and validation later.

   Allowed fields only: Workspace Name, Description, Workspace Logo.
   Owner / Slug / Workspace Settings / Allow Member Invites / AI Enabled /
   Default Member Role / Invitations are all backend-handled and
   intentionally do not appear here.
====================================================================== */

export default function CreateWorkspaceModal({ onClose }) {

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
        @keyframes cwmOverlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cwmModalScaleIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

            {/* Overlay */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-[cwmOverlayFadeIn_200ms_ease-out]"
            />

            {/* Panel */}
            <div
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-workspace-title"
                className="relative w-[95%] overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] animate-[cwmModalScaleIn_200ms_ease-out] dark:border-white/[0.08] dark:bg-[#111218] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] sm:w-[90%] md:w-full md:max-w-[560px]"
            >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />

                {/* Header */}
                <div className="flex items-start justify-between border-b border-zinc-100 px-5 py-4 dark:border-white/[0.05] sm:px-6">
                    <div>
                        <p id="create-workspace-title" className="text-[17px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                            Create Workspace
                        </p>
                        <p className="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">
                            Create a workspace to collaborate with your team.
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
                <div className="max-h-[70vh] space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
                    {/* Workspace Name */}
                    <div>
                        <label htmlFor="workspace-name" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
                            Workspace Name <span className="text-red-500 dark:text-red-400">*</span>
                        </label>
                        <input
                            id="workspace-name"
                            type="text"
                            placeholder="Enter workspace name..."
                            className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
                        />
                        {/*
              Validation message slot — rendered conditionally once form
              logic is wired up. Example markup for later:

              <p className="mt-1.5 text-[11.5px] text-red-500 dark:text-red-400">
                Workspace Name is required.
              </p>
            */}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="workspace-description" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
                            Description <span className="font-normal text-zinc-400 dark:text-zinc-500">(optional)</span>
                        </label>
                        <textarea
                            id="workspace-description"
                            rows={3}
                            placeholder="Briefly describe this workspace..."
                            className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
                        />
                    </div>

                    {/* Workspace Logo */}
                    <div>
                        <label htmlFor="workspace-logo" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
                            Workspace Logo <span className="font-normal text-zinc-400 dark:text-zinc-500">(optional)</span>
                        </label>

                        {/*
              Default (empty) state shown below. Once a file is selected,
              swap this card for a preview: a thumbnail of the uploaded
              image alongside the file name and a "Remove" action, using
              the same card shell (rounded-2xl border, same padding).
            */}
                        <label
                            htmlFor="workspace-logo"
                            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/60 px-6 py-7 text-center transition-colors hover:border-indigo-300 hover:bg-indigo-50/40 dark:border-white/[0.12] dark:bg-white/[0.02] dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/[0.04]"
                        >
                            <input id="workspace-logo" type="file" accept=".png,.jpg,.jpeg,.svg" className="hidden" />

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400 dark:bg-white/[0.05] dark:text-zinc-500">
                                <UploadIcon />
                            </div>

                            <div>
                                <p className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                                    Upload Logo
                                </p>
                                <p className="mt-0.5 text-[12px] text-zinc-400 dark:text-zinc-500">
                                    or drag &amp; drop your logo here
                                </p>
                            </div>

                            <p className="text-[11px] text-zinc-400 dark:text-zinc-600">
                                PNG, JPG, SVG
                            </p>
                        </label>
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
              <Spinner /> Creating Workspace...
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
                        <span className="relative">Create Workspace</span>
                    </button>
                </div>
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

function UploadIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
    );
}

// Defined for later use in the button's loading state — not rendered by
// default. See the comment above the "Create Workspace" button.
function Spinner() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
}