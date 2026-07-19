import React from 'react';

/* ======================================================================
   WorkspaceSettings.jsx
   Rendered inside <DashboardLayout><Outlet /></DashboardLayout>.
   DashboardLayout already renders Navbar and Sidebar — this file is the
   Outlet content only.

   UI only — no state, no event handlers, no save/delete/upload logic,
   no dirty-state detection. The sticky save bar is shown unconditionally
   (as if changes already exist) purely as a visual demonstration.

   Toggle switches are rendered at fixed visual positions (ON/OFF) via
   plain props, same pattern as Settings.jsx and CreateWorkspaceModal.jsx.
====================================================================== */

export default function WorkspaceSettings() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-6 lg:px-8">
      {/* Page header */}
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[24px]">
          Workspace Settings
        </h1>
        <p className="mt-1 text-[14px] text-zinc-500 dark:text-zinc-400">
          Manage your workspace information and preferences.
        </p>
      </div>

      {/* Sections */}
      <div className="mt-6 space-y-6 pb-28">
        <GeneralSection />
        <PreferencesSection />
        <DangerZoneSection />
      </div>

      <StickySaveBar />
    </div>
  );
}

// ─── SHARED CARD WRAPPER ────────────────────────────────────────────────────

function SettingsCard({ children, className = '' }) {
  return (
    <div
      className={`relative animate-[wsFadeIn_250ms_ease-out] overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-5 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025] sm:p-6 ${className}`}
    >
      <style>{`
        @keyframes wsFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />
      {children}
    </div>
  );
}

function SectionHeading({ title }) {
  return (
    <h2 className="mb-5 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
      {title}
    </h2>
  );
}

// ─── SECTION 1: GENERAL ─────────────────────────────────────────────────────

function GeneralSection() {
  return (
    <SettingsCard>
      <SectionHeading title="General" />

      {/* Logo */}
      <div className="flex flex-col items-center gap-4 border-b border-zinc-100 pb-6 dark:border-white/[0.05] sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-[22px] font-bold text-white">
          PE
        </div>
        <div className="text-center sm:text-left">
          <button
            type="button"
            className="rounded-xl border border-zinc-200/70 px-3.5 py-2 text-[12.5px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100 dark:focus-visible:ring-indigo-400/40"
          >
            Upload New Logo
          </button>
          <p className="mt-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
            PNG or JPG &middot; Maximum 2MB
          </p>
        </div>
      </div>

      {/* Fields */}
      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="ws-name" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
            Workspace Name
          </label>
          <input
            id="ws-name"
            type="text"
            placeholder="Product Engineering"
            defaultValue="Product Engineering"
            className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
          />
        </div>

        <div>
          <label htmlFor="ws-description" className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
            Description
          </label>
          <textarea
            id="ws-description"
            rows={3}
            placeholder="Core product development workspace..."
            defaultValue="Core product development and engineering workspace."
            className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
          />
        </div>

        <div>
          <p className="mb-1.5 text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
            Workspace URL
          </p>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200/60 bg-zinc-50/80 px-3.5 py-2.5 dark:border-white/[0.05] dark:bg-white/[0.02]">
            <p className="truncate text-[13px]">
              <span className="text-zinc-400 dark:text-zinc-500">collabrix.app/</span>
              <span className="font-medium text-zinc-700 dark:text-zinc-300">product-engineering</span>
            </p>
            <button
              type="button"
              className="shrink-0 text-[12px] font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}

// ─── SECTION 2: WORKSPACE PREFERENCES ──────────────────────────────────────

function PreferencesSection() {
  return (
    <SettingsCard>
      <SectionHeading title="Workspace Preferences" />

      <div className="overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-white/[0.05]">
        <ToggleRow
          label="Enable AI Assistant"
          description="Allow AI features throughout this workspace."
          enabled
        />
        <ToggleRow
          label="Allow AI File Access"
          description="Allow AI to access workspace documents to provide better assistance."
          enabled
        />
        <ToggleRow
          label="Allow Members to Invite Others"
          description="Members can invite new users without administrator approval."
          enabled={false}
        />
        <SelectRow
          label="Default Member Role"
          description="Role automatically assigned to newly invited members."
          options={['Member', 'Admin']}
          defaultValue="Member"
        />
      </div>
    </SettingsCard>
  );
}

function ToggleRow({ label, description, enabled }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-4 py-4 last:border-b-0 dark:border-white/[0.05]">
      <div className="min-w-0 pr-2">
        <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">{label}</p>
        <p className="mt-0.5 text-[11.5px] leading-relaxed text-zinc-400 dark:text-zinc-500">{description}</p>
      </div>
      <span
        role="switch"
        aria-checked={enabled}
        aria-label={label}
        className={`relative mt-0.5 inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
          enabled ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-zinc-200 dark:bg-white/[0.12]'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
            enabled ? 'translate-x-[18px]' : 'translate-x-[3px]'
          }`}
        />
      </span>
    </div>
  );
}

function SelectRow({ label, description, options, defaultValue }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-4 py-4 last:border-b-0 dark:border-white/[0.05]">
      <div className="min-w-0 pr-2">
        <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">{label}</p>
        <p className="mt-0.5 text-[11.5px] leading-relaxed text-zinc-400 dark:text-zinc-500">{description}</p>
      </div>
      <div className="relative shrink-0">
        <select
          defaultValue={defaultValue}
          aria-label={label}
          className="h-8 w-[110px] appearance-none rounded-lg border border-zinc-200 bg-white pl-2.5 pr-7 text-[12.5px] font-medium text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-300 dark:focus-visible:ring-indigo-400/30"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
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

// ─── SECTION 3: DANGER ZONE ─────────────────────────────────────────────────

function DangerZoneSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-red-200/70 bg-red-50/40 p-5 dark:border-red-500/20 dark:bg-red-500/[0.04] sm:p-6">
      <p className="text-[15px] font-semibold text-red-700 dark:text-red-400">
        Danger Zone
      </p>
      <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-red-600/80 dark:text-red-400/70">
        Deleting this workspace permanently removes all associated projects, tasks, files, conversations and members.
      </p>
      <button
        type="button"
        className="mt-4 rounded-xl border border-red-300 bg-white px-4 py-2.5 text-[13px] font-semibold text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40 dark:border-red-500/30 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-500/10"
      >
        Delete Workspace
      </button>
    </div>
  );
}

// ─── STICKY SAVE BAR ────────────────────────────────────────────────────────
// Shown unconditionally, as if changes already exist — no dirty-state
// detection is implemented.

function StickySaveBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200/70 bg-white/90 px-6 py-3.5 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111218]/90 lg:px-8">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
          You have unsaved changes.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100 dark:focus-visible:ring-indigo-400/40"
          >
            Discard
          </button>
          <button
            type="button"
            className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500 dark:focus-visible:ring-indigo-400/40"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            <span className="relative">Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ICONS ─────────────────────────────────────────────────────────────────

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-500">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
