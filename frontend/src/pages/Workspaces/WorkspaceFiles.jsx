import React from 'react';

/* ======================================================================
   WorkspaceFiles.jsx
   Rendered inside <DashboardLayout><Outlet /></DashboardLayout>.
   DashboardLayout already renders Navbar and Sidebar — this file is the
   Outlet content only.

   Purpose: a premium enterprise asset center for files shared across
   this workspace — not a cloud-storage clone. UI only — no state, no
   event handlers, no upload/search/filter/sort/pagination/download logic.

   The row overflow menu uses a native <details>/<summary> disclosure
   (no JS) for the same reason established elsewhere in this app: menu
   contents need to be visible for review without wiring a click handler.
====================================================================== */

// Flip this during visual QA to preview the empty state. Not wired to any
// real data source — purely a manual toggle for reviewing both states.
const SHOW_EMPTY_STATE = false;

// ─── CONFIG ────────────────────────────────────────────────────────────────

const FILE_TYPE_CONFIG = {
  document: { label: 'Documents', bg: 'bg-indigo-50 dark:bg-indigo-500/10', text: 'text-indigo-500 dark:text-indigo-400', icon: <FileTextIcon /> },
  image:    { label: 'Images',    bg: 'bg-violet-50 dark:bg-violet-500/10', text: 'text-violet-500 dark:text-violet-400', icon: <ImageIcon /> },
  video:    { label: 'Videos',    bg: 'bg-rose-50   dark:bg-rose-500/10',   text: 'text-rose-500   dark:text-rose-400',   icon: <VideoIcon /> },
  audio:    { label: 'Audio',     bg: 'bg-amber-50  dark:bg-amber-500/10',  text: 'text-amber-500  dark:text-amber-400',  icon: <MusicIcon /> },
  archive:  { label: 'Archives',  bg: 'bg-cyan-50   dark:bg-cyan-500/10',   text: 'text-cyan-500   dark:text-cyan-400',   icon: <ArchiveIcon /> },
  other:    { label: 'Other',    bg: 'bg-zinc-100  dark:bg-white/[0.06]',  text: 'text-zinc-500   dark:text-zinc-400',   icon: <FileIcon /> },
};

const RESOURCE_TYPE_CONFIG = {
  Task:         { bg: 'bg-indigo-50 dark:bg-indigo-500/10', text: 'text-indigo-700 dark:text-indigo-400' },
  Message:      { bg: 'bg-blue-50   dark:bg-blue-500/10',   text: 'text-blue-700   dark:text-blue-400'   },
  'Task Comment': { bg: 'bg-violet-50 dark:bg-violet-500/10', text: 'text-violet-700 dark:text-violet-400' },
};

const FILE_TYPE_FILTERS = ['All Types', 'Documents', 'Images', 'Videos', 'Audio', 'Archives', 'Other'];
const ATTACHED_TO_FILTERS = ['All Resources', 'Tasks', 'Messages', 'Task Comments'];
const SORT_OPTIONS = ['Newest', 'Oldest', 'Largest', 'Smallest', 'A-Z'];

const OVERFLOW_MENU_ITEMS = ['Rename', 'Copy Link', 'View Details'];

// ─── DUMMY DATA ────────────────────────────────────────────────────────────

const FILES = [
  {
    id: 'f1', name: 'API_Documentation.pdf', type: 'document', ext: 'PDF', size: '2.8 MB',
    uploader: { name: 'Arjun Sharma', initials: 'AS', color: 'bg-emerald-500' }, uploadedAt: 'Today',
    resource: { type: 'Task', name: 'Implement Authentication' },
  },
  {
    id: 'f2', name: 'Dashboard_UI.fig', type: 'other', ext: 'FIG', size: '14.2 MB',
    uploader: { name: 'Sarah Chen', initials: 'SC', color: 'bg-indigo-500' }, uploadedAt: 'Yesterday',
    resource: { type: 'Message', name: 'General Chat' },
  },
  {
    id: 'f3', name: 'Sprint_Recording.mp4', type: 'video', ext: 'MP4', size: '128 MB',
    uploader: { name: 'Priya Sharma', initials: 'PS', color: 'bg-rose-500' }, uploadedAt: '2 days ago',
    resource: { type: 'Task Comment', name: 'API Review Discussion' },
  },
  {
    id: 'f4', name: 'Meeting_Notes.docx', type: 'document', ext: 'DOCX', size: '340 KB',
    uploader: { name: 'Marcus Johnson', initials: 'MJ', color: 'bg-amber-500' }, uploadedAt: '2 days ago',
    resource: { type: 'Task', name: 'Sprint Planning' },
  },
  {
    id: 'f5', name: 'Architecture.png', type: 'image', ext: 'PNG', size: '1.4 MB',
    uploader: { name: 'Jamie Thompson', initials: 'JT', color: 'bg-cyan-500' }, uploadedAt: '3 days ago',
    resource: { type: 'Message', name: 'General Chat' },
  },
  {
    id: 'f6', name: 'Release_v1.zip', type: 'archive', ext: 'ZIP', size: '45.6 MB',
    uploader: { name: 'Raj Verma', initials: 'RV', color: 'bg-orange-500' }, uploadedAt: '1 week ago',
    resource: { type: 'Task', name: 'Deployment Checklist' },
  },
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function WorkspaceFiles() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[24px]">
            Workspace Files
          </h1>
          <p className="mt-1 text-[13.5px] text-zinc-500 dark:text-zinc-400">
            Access and manage files shared across this workspace.
          </p>
        </div>

        <button
          type="button"
          className="group/btn relative shrink-0 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500 dark:focus-visible:ring-indigo-400/40"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
          <span className="relative flex items-center gap-1.5">
            <UploadIcon />
            Upload Files
          </span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative sm:w-56">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </div>
          <input
            type="text"
            readOnly
            placeholder="Search files..."
            aria-label="Search files"
            className="h-9 w-full rounded-xl border border-zinc-200 bg-zinc-100/60 pl-9 pr-4 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
        </div>

        <ToolbarDropdown label="Type" value={FILE_TYPE_FILTERS[0]} />
        <ToolbarDropdown label="Attached To" value={ATTACHED_TO_FILTERS[0]} />
        <ToolbarDropdown label="Uploaded By" value="Anyone" />
        <ToolbarDropdown label="Sort" value={SORT_OPTIONS[0]} />
      </div>

      {/* Files list or empty state */}
      <div className="mt-6 pb-8">
        {SHOW_EMPTY_STATE ? <EmptyState /> : <FilesList />}
      </div>
    </div>
  );
}

// ─── TOOLBAR DROPDOWN (static, non-functional) ─────────────────────────────

function ToolbarDropdown({ label, value }) {
  return (
    <button
      type="button"
      className="flex h-9 shrink-0 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 text-[12.5px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 dark:border-white/[0.07] dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.06] dark:focus-visible:ring-indigo-400/30"
    >
      <span className="text-zinc-400 dark:text-zinc-500">{label}:</span>
      <span>{value}</span>
      <ChevronDownIcon />
    </button>
  );
}

// ─── FILES LIST ─────────────────────────────────────────────────────────────

function FilesList() {
  return (
    <div className="flex flex-col gap-2.5">
      {FILES.map((file) => (
        <FileRow key={file.id} file={file} />
      ))}
    </div>
  );
}

function FileRow({ file }) {
  const type = FILE_TYPE_CONFIG[file.type] || FILE_TYPE_CONFIG.other;
  const resourceTint = RESOURCE_TYPE_CONFIG[file.resource.type] || RESOURCE_TYPE_CONFIG.Task;

  return (
    <div className="group flex flex-col gap-3 rounded-2xl border border-zinc-200/70 bg-white/70 p-4 backdrop-blur-sm transition-colors duration-200 hover:border-zinc-300/80 hover:bg-zinc-50/60 dark:border-white/[0.06] dark:bg-white/[0.025] dark:hover:border-white/[0.1] dark:hover:bg-white/[0.035] sm:grid sm:grid-cols-[minmax(0,1fr)_150px_100px_190px_100px] sm:items-center sm:gap-4">
      {/* File info */}
      <div className="flex min-w-0 items-center gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${type.bg} ${type.text}`}>
          {type.icon}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-medium text-zinc-900 dark:text-zinc-100">
            {file.name}
          </p>
          <p className="mt-0.5 text-[11.5px] text-zinc-400 dark:text-zinc-500">
            {file.ext} &middot; {file.size}
          </p>
        </div>
      </div>

      {/* Uploaded by */}
      <div className="flex items-center gap-2 pl-[52px] sm:pl-0">
        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500 sm:hidden">
          Uploaded by
        </span>
        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ${file.uploader.color}`}>
          {file.uploader.initials}
        </span>
        <span className="truncate text-[12.5px] text-zinc-600 dark:text-zinc-400">{file.uploader.name}</span>
      </div>

      {/* Uploaded date */}
      <div className="flex items-center gap-2 pl-[52px] sm:pl-0">
        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500 sm:hidden">
          Uploaded
        </span>
        <span className="text-[12.5px] text-zinc-500 dark:text-zinc-400">{file.uploadedAt}</span>
      </div>

      {/* Attached resource */}
      <div className="flex min-w-0 items-center gap-2 pl-[52px] sm:pl-0">
        <span className="shrink-0 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500 sm:hidden">
          Attached to
        </span>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-medium ${resourceTint.bg} ${resourceTint.text}`}>
          {file.resource.type}
        </span>
        <a
          href="#"
          className="truncate text-[12.5px] font-medium text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
        >
          {file.resource.name}
        </a>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-1 pl-[52px] opacity-80 transition-opacity group-hover:opacity-100 sm:pl-0">
        <button
          type="button"
          aria-label={`View ${file.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300"
        >
          <EyeIcon />
        </button>
        <button
          type="button"
          aria-label={`Download ${file.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300"
        >
          <DownloadIcon />
        </button>

        {/* Overflow menu — native disclosure, no event handlers */}
        <details className="relative">
          <summary
            aria-label={`More actions for ${file.name}`}
            className="flex h-8 w-8 list-none items-center justify-center rounded-lg text-zinc-400 transition-colors marker:content-none hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300 [&::-webkit-details-marker]:hidden"
          >
            <MoreVerticalIcon />
          </summary>
          <div className="absolute right-0 top-[calc(100%+6px)] z-30 w-44 overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/95 shadow-[0_8px_30px_-8px_rgba(24,24,27,0.14)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111218]/95 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />
            <div className="py-1.5">
              {OVERFLOW_MENU_ITEMS.map((label) => (
                <div
                  key={label}
                  className="flex items-center px-4 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50/80 dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="h-px bg-zinc-100 dark:bg-white/[0.05]" />
            <div className="py-1.5">
              <div className="flex items-center px-4 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-zinc-300 dark:hover:bg-red-500/10 dark:hover:text-red-400">
                Delete
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

// ─── EMPTY STATE ───────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-6 py-16 text-center backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-white/[0.05] dark:text-zinc-500">
        <FolderOpenIcon />
      </div>

      <p className="text-[15px] font-semibold text-zinc-700 dark:text-zinc-300">
        No files uploaded yet
      </p>
      <p className="mx-auto mt-1.5 max-w-sm text-[13px] leading-relaxed text-zinc-400 dark:text-zinc-500">
        Upload documents, images and other files to collaborate with your team.
      </p>

      <button
        type="button"
        className="group/btn relative mt-6 inline-flex items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500 dark:focus-visible:ring-indigo-400/40"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        <span className="relative flex items-center gap-1.5">
          <UploadIcon />
          Upload Files
        </span>
      </button>
    </div>
  );
}

// ─── ICONS ─────────────────────────────────────────────────────────────────

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

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function MoreVerticalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" rx="1" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function FolderOpenIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v2" />
      <path d="M2 13l2.5-5h15l2.5 5" />
    </svg>
  );
}
