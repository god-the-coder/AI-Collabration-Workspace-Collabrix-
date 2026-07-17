import React from 'react';
import CreateProjectModal from './CreateProjectModal';
import { useState } from 'react';
import CreateTaskModal from '../Tasks/CreateTaskModal';

const SHOW_EMPTY_PROJECT_STATE = false;

// ─── CONFIG ────────────────────────────────────────────────────────────────

const PRIORITY_CONFIG = {
  low:      { label: 'Low',      dot: 'bg-zinc-400 dark:bg-zinc-600', text: 'text-zinc-600   dark:text-zinc-400'   },
  medium:   { label: 'Medium',   dot: 'bg-indigo-500',                text: 'text-indigo-700  dark:text-indigo-400' },
  high:     { label: 'High',     dot: 'bg-amber-500',                 text: 'text-amber-700   dark:text-amber-400'  },
  critical: { label: 'Critical', dot: 'bg-red-500',                   text: 'text-red-700     dark:text-red-400'    },
};

const COLUMNS = [
  {
    id: 'todo',
    title: 'To Do',
    subtitle: 'Tasks waiting to be started.',
    total: 12,
    tasks: [
      {
        id: 't1', title: 'JWT Refresh Token', priority: 'high',
        assignee: { name: 'Sarah Chen', initials: 'SC', color: 'bg-indigo-500' },
        due: 'Jul 18', comments: 3, attachments: 1,
      },
      {
        id: 't2', title: 'Database Migration', priority: 'critical',
        assignee: { name: 'Raj Verma', initials: 'RV', color: 'bg-orange-500' },
        due: 'Jul 16',
      },
      {
        id: 't3', title: 'Sprint Planning', priority: 'medium',
        assignee: { name: 'Priya Sharma', initials: 'PS', color: 'bg-rose-500' },
        due: 'Jul 20', comments: 5,
      },
      {
        id: 't4', title: 'User Permission Module', priority: 'medium',
        assignee: { name: 'Arjun Patel', initials: 'AR', color: 'bg-violet-500' },
        due: 'Jul 22',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    subtitle: 'Currently being worked on.',
    total: 5,
    tasks: [
      {
        id: 't5', title: 'Authentication API', priority: 'high',
        assignee: { name: 'Sarah Chen', initials: 'SC', color: 'bg-indigo-500' },
        due: 'Today', comments: 8, attachments: 2,
      },
      {
        id: 't6', title: 'Notification Service', priority: 'medium',
        assignee: { name: 'Jamie Thompson', initials: 'JT', color: 'bg-cyan-500' },
        due: 'Jul 17',
      },
      {
        id: 't7', title: 'Dashboard Polish', priority: 'low',
        assignee: { name: 'Elena Rodriguez', initials: 'ER', color: 'bg-emerald-500' },
        due: 'Jul 19', comments: 2,
      },
    ],
  },
  {
    id: 'in-review',
    title: 'In Review',
    subtitle: 'Waiting for review.',
    total: 3,
    tasks: [
      {
        id: 't8', title: 'AI Workspace Summary', priority: 'medium',
        assignee: { name: 'Marcus Johnson', initials: 'MJ', color: 'bg-amber-500' },
        due: 'Jul 15', comments: 4, attachments: 1,
      },
      {
        id: 't9', title: 'Payment Webhook Handler', priority: 'critical',
        assignee: { name: 'Raj Verma', initials: 'RV', color: 'bg-orange-500' },
        due: 'Jul 14', comments: 1,
      },
    ],
  },
  {
    id: 'completed',
    title: 'Completed',
    subtitle: 'Finished tasks.',
    total: 42,
    tasks: [
      {
        id: 't10', title: 'Onboarding Flow', priority: 'low',
        assignee: { name: 'Elena Rodriguez', initials: 'ER', color: 'bg-emerald-500' },
        due: 'Jul 10',
      },
      {
        id: 't11', title: 'Auth Middleware Tests', priority: 'medium',
        assignee: { name: 'Jamie Thompson', initials: 'JT', color: 'bg-cyan-500' },
        due: 'Jul 9',
      },
      {
        id: 't12', title: 'Landing Page Copy', priority: 'low',
        assignee: { name: 'Priya Sharma', initials: 'PS', color: 'bg-rose-500' },
        due: 'Jul 8',
      },
      {
        id: 't13', title: 'API Rate Limiting', priority: 'high',
        assignee: { name: 'Arjun Patel', initials: 'AR', color: 'bg-violet-500' },
        due: 'Jul 6', comments: 6,
      },
    ],
  },
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function ProjectTasks() {
  if (SHOW_EMPTY_PROJECT_STATE) {
    return (
      <div>
        <Toolbar />
        <div className="mt-6">
          <EmptyProjectState />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toolbar />
      <div className="mt-6">
        <KanbanBoard />
      </div>
    </div>
  );
}

// ─── TOOLBAR ───────────────────────────────────────────────────────────────

function Toolbar() {

  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
        {/* Search */}
        <div className="relative sm:w-56">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </div>
          <input
            type="text"
            readOnly
            placeholder="Search tasks..."
            aria-label="Search tasks"
            className="h-9 w-full rounded-xl border border-zinc-200 bg-zinc-100/60 pl-9 pr-4 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
        </div>

        <ToolbarDropdown label="Status" value="All Statuses" />
        <ToolbarDropdown label="Priority" value="All Priorities" />
        <ToolbarDropdown label="Assignee" value="All Members" />
      </div>

      {/* New Task — will later open CreateTaskModal */}
      <button
        onClick={() => setShowModal(true)}
        type="button"
        className="group/btn relative shrink-0 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500 dark:focus-visible:ring-indigo-400/40"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        <span className="relative flex items-center gap-1.5">
          <PlusIcon />
          New Task
        </span>
      </button>

      {showModal && (
        <CreateTaskModal onClose={() => setShowModal(false)}/>
      )}
    </div>
  );
}

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

// ─── KANBAN BOARD ───────────────────────────────────────────────────────────

function KanbanBoard() {
  return (
    <div className="flex flex-col gap-4 pb-8 sm:flex-row sm:gap-4 sm:overflow-x-auto sm:pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden">
      {COLUMNS.map((column) => (
        <KanbanColumn key={column.id} column={column} />
      ))}
    </div>
  );
}

function KanbanColumn({ column }) {
  return (
    <div className="w-full shrink-0 sm:w-[290px]">
      {/* Column header */}
      <div className="mb-3 flex items-start justify-between gap-2 px-0.5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
              {column.title}
            </h2>
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-zinc-100 px-1.5 text-[11px] font-bold text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400">
              {column.total}
            </span>
          </div>
          <p className="mt-0.5 text-[11.5px] text-zinc-400 dark:text-zinc-500">
            {column.subtitle}
          </p>
        </div>
      </div>

      {/* Cards */}
      {column.tasks.length === 0 ? (
        <EmptyColumnState />
      ) : (
        <div className="flex flex-col gap-2.5 sm:max-h-[calc(100vh-320px)] sm:overflow-y-auto sm:pr-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden">
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── TASK CARD ──────────────────────────────────────────────────────────────

function TaskCard({ task }) {
  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;

  return (
    <div
      tabIndex={0}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-3.5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300/80 hover:shadow-[0_8px_30px_-12px_rgba(24,24,27,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 dark:border-white/[0.06] dark:bg-white/[0.025] dark:hover:border-white/[0.1] dark:hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)] dark:focus-visible:ring-indigo-400/30"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      {/* Title */}
      <h3 className="text-[13px] font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
        {task.title}
      </h3>

      {/* Priority */}
      <div className="mt-2 flex items-center gap-1.5">
        <span className={`h-1.5 w-1.5 rounded-full ${priority.dot}`} />
        <span className={`text-[11px] font-medium ${priority.text}`}>
          {priority.label}
        </span>
      </div>

      {/* Footer: assignee + due date */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white ${task.assignee.color}`}>
            {task.assignee.initials}
          </span>
          <span className="truncate text-[11.5px] text-zinc-500 dark:text-zinc-400">
            {task.assignee.name}
          </span>
        </div>
        <span className="shrink-0 text-[11px] text-zinc-400 dark:text-zinc-500">
          {task.due}
        </span>
      </div>

      {/* Comments / attachments — optional indicators */}
      {(task.comments || task.attachments) && (
        <div className="mt-2.5 flex items-center gap-3 border-t border-zinc-100 pt-2.5 dark:border-white/[0.05]">
          {task.comments ? (
            <span className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500">
              <CommentIcon />
              {task.comments}
            </span>
          ) : null}
          {task.attachments ? (
            <span className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500">
              <AttachmentIcon />
              {task.attachments}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}

// ─── EMPTY COLUMN STATE ─────────────────────────────────────────────────────

function EmptyColumnState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 px-4 py-8 text-center dark:border-white/[0.08]">
      <p className="text-[12.5px] font-medium text-zinc-500 dark:text-zinc-400">No tasks</p>
      <p className="mt-0.5 text-[11.5px] text-zinc-400 dark:text-zinc-500">Everything looks good.</p>
    </div>
  );
}

// ─── EMPTY PROJECT STATE ────────────────────────────────────────────────────

function EmptyProjectState() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-6 py-14 text-center backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-white/[0.05] dark:text-zinc-500">
        <CheckSquareIcon />
      </div>

      <p className="text-[14px] font-semibold text-zinc-700 dark:text-zinc-300">No Tasks Yet</p>
      <p className="mx-auto mt-1 max-w-xs text-[13px] text-zinc-400 dark:text-zinc-500">
        Create your first project task to start collaborating.
      </p>

      <button
        type="button"
        className="group/btn relative mt-5 inline-flex items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500 dark:focus-visible:ring-indigo-400/40"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        <span className="relative flex items-center gap-1.5">
          <PlusIcon />
          Create Task
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

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
    </svg>
  );
}

function AttachmentIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function CheckSquareIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}
