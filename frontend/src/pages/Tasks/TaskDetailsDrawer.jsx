import React from 'react';

/* ======================================================================
   TaskDetailsDrawer.jsx

   A right-side slide-over drawer, NOT a page — the background page stays
   visible and partially dimmed behind it. Opened from task cards across
   Global Tasks, Project Tasks, Workspace Recent Tasks, and Notifications.

   Presentational only — no React state, no event handlers, no drawer
   open/close logic, no tab-switching logic. The parent that mounts this
   component decides when it appears.

   Change ACTIVE_TAB below to 'overview' | 'comments' | 'files' to preview
   each tab body — the same static-constant pattern used for Chats.jsx's
   selected conversation, not real switching logic. The three tab header
   buttons are plain divs with a hardcoded highlight, matching the
   WorkspaceTabs / ProjectTabs convention already used elsewhere in the app.

   Allowed fields only: Title, Description, Status, Priority, Workspace,
   Project, Assignee, Parent Task, Milestone, Due Date, Created By,
   Created At, Updated At, Completed At, Comments (author/timestamp),
   Attached Files. Watchers / Labels / Story Points / Time Tracking /
   Activity Timeline / AI Summary are all backend-unsupported and
   intentionally do not appear here.
====================================================================== */

const ACTIVE_TAB = 'overview'; // 'overview' | 'comments' | 'files'

// ─── DUMMY DATA ────────────────────────────────────────────────────────────

const TASK = {
  title: 'Implement Authentication API',
  priority: 'High',
  status: 'In Progress',
  description:
    'Implement JWT authentication, refresh token rotation and permission middleware for the API. This covers the login endpoint, token refresh flow, and role-based route guards used across the platform.',
  workspace: 'Product Engineering',
  project: 'API Gateway',
  assignee: { name: 'Arjun Sharma', initials: 'AR', color: 'bg-violet-500' },
  dueDate: '25 Jul 2026',
  milestone: 'Sprint 2',
  parentTask: 'Authentication Module',
  createdBy: { name: 'Sarah Johnson', initials: 'SJ', color: 'bg-indigo-500' },
  createdAt: 'Jul 10, 2026',
  updatedAt: '2 hours ago',
  completedAt: null,
};

const SUBTASKS = [
  { id: 's1', label: 'Database Schema', done: true },
  { id: 's2', label: 'JWT Middleware', done: false },
  { id: 's3', label: 'Refresh Token Rotation', done: false },
];

const COMMENTS = [
  {
    id: 'c1', author: 'Sarah Johnson', initials: 'SJ', color: 'bg-indigo-500', time: '3 hours ago',
    content: 'Looks good. Please update the middleware before merging.',
  },
  {
    id: 'c2', author: 'Marcus Lee', initials: 'ML', color: 'bg-amber-500', time: '2 hours ago',
    content: 'Refresh token support still needs testing.',
  },
  {
    id: 'c3', author: 'Arjun Sharma', initials: 'AR', color: 'bg-violet-500', time: '45 minutes ago',
    content: "On it — I'll add coverage for the rotation flow and push an update this afternoon.",
  },
];

const FILES = [
  { id: 'f1', name: 'API_Documentation.pdf', type: 'document', size: '2.8 MB', uploader: 'Sarah Johnson', date: '2 days ago' },
  { id: 'f2', name: 'Dashboard_UI.fig', type: 'other', size: '14.2 MB', uploader: 'Sarah Johnson', date: '3 days ago' },
  { id: 'f3', name: 'Architecture.png', type: 'image', size: '1.4 MB', uploader: 'Arjun Sharma', date: 'Yesterday' },
  { id: 'f4', name: 'Release_Notes.docx', type: 'document', size: '340 KB', uploader: 'Marcus Lee', date: 'Today' },
];

const FILE_TYPE_CONFIG = {
  document: { bg: 'bg-indigo-50 dark:bg-indigo-500/10', text: 'text-indigo-500 dark:text-indigo-400', icon: <FileTextIcon /> },
  image:    { bg: 'bg-violet-50 dark:bg-violet-500/10', text: 'text-violet-500 dark:text-violet-400', icon: <ImageIcon /> },
  other:    { bg: 'bg-zinc-100  dark:bg-white/[0.06]',  text: 'text-zinc-500   dark:text-zinc-400',   icon: <FileIcon /> },
};

const OVERFLOW_MENU_ITEMS = ['Duplicate Task', 'Copy Task Link'];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function TaskDetailsDrawer({onClose}) {
  return (
    <div 
      
      className="fixed inset-0 z-50">
      <style>{`
        @keyframes tddOverlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes tddDrawerSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>

      {/* Overlay — subtle; the board/list behind stays visible */}
      <div onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 bg-zinc-900/20 animate-[tddOverlayFadeIn_200ms_ease-out] dark:bg-black/30"
      />

      {/* Drawer */}
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-drawer-title"
        className="absolute right-0 top-0 flex h-full w-full flex-col border-l border-zinc-200/70 bg-white shadow-[-20px_0_50px_-12px_rgba(0,0,0,0.15)] animate-[tddDrawerSlideIn_280ms_cubic-bezier(0.32,0.72,0,1)] dark:border-white/[0.08] dark:bg-[#111218] dark:shadow-[-24px_0_60px_-12px_rgba(0,0,0,0.6)] sm:w-[80%] md:w-[620px]"
      >
        <DrawerHeader onClose={onClose}/>

        <div className="flex-1 overflow-y-auto">
          <QuickProperties />
          <DrawerTabs />

          <div className="px-5 py-5 sm:px-6">
            {ACTIVE_TAB === 'overview' && <OverviewTabContent />}
            {ACTIVE_TAB === 'comments' && <CommentsTabContent />}
            {ACTIVE_TAB === 'files' && <FilesTabContent />}
          </div>
        </div>

        {ACTIVE_TAB === 'comments' && <CommentComposer />}
      </div>
    </div>
  );
}

// ─── HEADER (sticky) ─────────────────────────────────────────────────────────

function DrawerHeader({onClose}) {
  return (
    <div className="shrink-0 border-b border-zinc-200/70 bg-white/95 px-5 py-4 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111218]/95 sm:px-6">
      <div className="flex items-start justify-between gap-3">
        <h1 id="task-drawer-title" className="text-[17px] font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
          {TASK.title}
        </h1>

        <div className="flex shrink-0 items-center gap-1">
          {/* More Actions — native disclosure, no event handlers */}
          <details className="relative">
            <summary
              aria-label="More actions"
              className="flex h-8 w-8 list-none items-center justify-center rounded-lg text-zinc-400 transition-colors marker:content-none hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300 [&::-webkit-details-marker]:hidden"
            >
              <MoreHorizontalIcon />
            </summary>
            <div className="absolute right-0 top-[calc(100%+6px)] z-30 w-48 overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/95 shadow-[0_8px_30px_-8px_rgba(24,24,27,0.14)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111218]/95 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)]">
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
                  Delete Task
                </div>
              </div>
            </div>
          </details>

          <button
            onClick={onClose}
            type="button"
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300 dark:focus-visible:ring-indigo-400/40"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5">
        <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
          {TASK.priority} Priority
        </span>
        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
          {TASK.status}
        </span>
      </div>
    </div>
  );
}

// ─── QUICK PROPERTIES (Notion-style rows) ──────────────────────────────────

function QuickProperties() {
  return (
    <div className="border-b border-zinc-100 px-3 py-3 dark:border-white/[0.05] sm:px-4">
      <PropertyRow icon={<BuildingIcon />} label="Workspace">
        <span className="text-[13px] text-zinc-700 dark:text-zinc-300">{TASK.workspace}</span>
      </PropertyRow>
      <PropertyRow icon={<FolderIcon />} label="Project">
        <span className="text-[13px] text-zinc-700 dark:text-zinc-300">{TASK.project}</span>
      </PropertyRow>
      <PropertyRow icon={<UserIcon />} label="Assignee">
        <span className="flex items-center gap-1.5">
          <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold text-white ${TASK.assignee.color}`}>
            {TASK.assignee.initials}
          </span>
          <span className="text-[13px] text-zinc-700 dark:text-zinc-300">{TASK.assignee.name}</span>
        </span>
      </PropertyRow>
      <PropertyRow icon={<CalendarIcon />} label="Due Date">
        <span className="text-[13px] text-zinc-700 dark:text-zinc-300">{TASK.dueDate}</span>
      </PropertyRow>
      <PropertyRow icon={<FlagIcon />} label="Milestone">
        <span className="text-[13px] text-zinc-700 dark:text-zinc-300">{TASK.milestone}</span>
      </PropertyRow>
      <PropertyRow icon={<LinkIcon />} label="Parent Task">
        <a href="#" className="text-[13px] font-medium text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">
          {TASK.parentTask}
        </a>
      </PropertyRow>
      <PropertyRow icon={<UserIcon />} label="Created By" isLast>
        <span className="flex items-center gap-1.5">
          <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold text-white ${TASK.createdBy.color}`}>
            {TASK.createdBy.initials}
          </span>
          <span className="text-[13px] text-zinc-700 dark:text-zinc-300">{TASK.createdBy.name}</span>
        </span>
      </PropertyRow>
    </div>
  );
}

function PropertyRow({ icon, label, children }) {
  return (
    <div className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.03]">
      <span className="flex w-[110px] shrink-0 items-center gap-2 text-[12.5px] text-zinc-400 dark:text-zinc-500">
        <span className="text-zinc-400 dark:text-zinc-500">{icon}</span>
        {label}
      </span>
      <span className="min-w-0 flex-1">{children}</span>
    </div>
  );
}

// ─── TABS ───────────────────────────────────────────────────────────────────

function DrawerTabs() {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'comments', label: 'Comments' },
    { id: 'files', label: 'Files' },
  ];

  return (
    <div className="border-b border-zinc-200/70 px-5 dark:border-white/[0.06] sm:px-6">
      <nav className="-mb-px flex gap-5">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`shrink-0 cursor-pointer whitespace-nowrap border-b-2 px-1 pb-3 pt-3 text-[13.5px] font-medium transition-colors ${
              ACTIVE_TAB === tab.id
                ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            {tab.label}
          </div>
        ))}
      </nav>
    </div>
  );
}

// ─── OVERVIEW TAB ───────────────────────────────────────────────────────────

function OverviewTabContent() {
  return (
    <div className="space-y-6">
      {/* Description */}
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Description
        </p>
        <div className="rounded-xl bg-zinc-50/70 p-4 dark:bg-white/[0.02]">
          <p className="text-[13.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            {TASK.description}
          </p>
        </div>
      </div>

      {/* Subtasks */}
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Subtasks
        </p>
        <div className="space-y-1.5">
          {SUBTASKS.map((sub) => (
            <div key={sub.id} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.03]">
              {sub.done ? (
                <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <CheckIcon />
                </span>
              ) : (
                <span className="h-4.5 w-4.5 shrink-0 rounded-full border-2 border-zinc-300 dark:border-white/20" />
              )}
              <span className={`text-[13px] ${sub.done ? 'text-zinc-400 line-through dark:text-zinc-500' : 'text-zinc-700 dark:text-zinc-300'}`}>
                {sub.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Metadata */}
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Metadata
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200/60 dark:border-white/[0.05]">
          <MetaRow label="Created" value={`${TASK.createdAt} by ${TASK.createdBy.name}`} />
          <MetaRow label="Updated" value={TASK.updatedAt} />
          <MetaRow label="Completed" value={TASK.completedAt || 'Not yet completed'} isLast />
        </div>
      </div>
    </div>
  );
}

function MetaRow({ label, value, isLast }) {
  return (
    <div className={`flex items-center justify-between gap-3 px-3.5 py-2.5 ${isLast ? '' : 'border-b border-zinc-100 dark:border-white/[0.05]'}`}>
      <span className="text-[12px] text-zinc-400 dark:text-zinc-500">{label}</span>
      <span className="text-[12.5px] text-zinc-600 dark:text-zinc-400">{value}</span>
    </div>
  );
}

// ─── COMMENTS TAB ───────────────────────────────────────────────────────────

function CommentsTabContent() {
  return (
    <div className="space-y-5">
      {COMMENTS.map((comment) => (
        <div key={comment.id} className="flex items-start gap-3">
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${comment.color}`}>
            {comment.initials}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">{comment.author}</span>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">{comment.time}</span>
            </div>
            <p className="mt-0.5 text-[13.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CommentComposer() {
  return (
    <div className="shrink-0 border-t border-zinc-200/70 bg-white/95 px-5 py-3.5 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111218]/95 sm:px-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Attach file"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300"
        >
          <PaperclipIcon />
        </button>

        <input
          type="text"
          placeholder="Write a comment..."
          aria-label="Write a comment"
          className="h-10 flex-1 rounded-xl border border-zinc-200 bg-zinc-100/60 px-3.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-indigo-400/30"
        />

        <button
          type="button"
          aria-label="Add emoji"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300"
        >
          <SmileIcon />
        </button>

        <button
          type="button"
          aria-label="Send comment"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-[0_2px_8px_-2px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-px hover:shadow-[0_4px_14px_-2px_rgba(79,70,229,0.5)] dark:from-indigo-500 dark:to-violet-500"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

// ─── FILES TAB ──────────────────────────────────────────────────────────────

function FilesTabContent() {
  return (
    <div className="space-y-2.5">
      {FILES.map((file) => {
        const type = FILE_TYPE_CONFIG[file.type] || FILE_TYPE_CONFIG.other;
        return (
          <div
            key={file.id}
            className="flex items-center gap-3 rounded-xl border border-zinc-200/70 bg-white/70 p-3 backdrop-blur-sm transition-colors hover:border-zinc-300/80 hover:bg-zinc-50/60 dark:border-white/[0.06] dark:bg-white/[0.025] dark:hover:border-white/[0.1] dark:hover:bg-white/[0.035]"
          >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${type.bg} ${type.text}`}>
              {type.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{file.name}</p>
              <p className="mt-0.5 truncate text-[11.5px] text-zinc-400 dark:text-zinc-500">
                {file.size} &middot; {file.uploader} &middot; {file.date}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-0.5">
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
              <details className="relative">
                <summary
                  aria-label={`More actions for ${file.name}`}
                  className="flex h-8 w-8 list-none items-center justify-center rounded-lg text-zinc-400 transition-colors marker:content-none hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300 [&::-webkit-details-marker]:hidden"
                >
                  <MoreVerticalIcon />
                </summary>
                <div className="absolute right-0 top-[calc(100%+6px)] z-30 w-40 overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/95 shadow-[0_8px_30px_-8px_rgba(24,24,27,0.14)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111218]/95 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)]">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />
                  <div className="py-1.5">
                    <div className="flex items-center px-4 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50/80 dark:text-zinc-300 dark:hover:bg-white/[0.04]">
                      Rename
                    </div>
                    <div className="flex items-center px-4 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50/80 dark:text-zinc-300 dark:hover:bg-white/[0.04]">
                      Copy Link
                    </div>
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
      })}
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

function MoreHorizontalIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
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

function BuildingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <line x1="9" y1="6" x2="9" y2="6.01" />
      <line x1="15" y1="6" x2="15" y2="6.01" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function SmileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
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

function FileTextIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}