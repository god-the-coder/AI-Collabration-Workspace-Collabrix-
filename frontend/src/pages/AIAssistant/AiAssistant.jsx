/* ======================================================================
   AIAssistant.jsx
   Rendered inside <DashboardLayout> — content area only.
   Do NOT import or recreate Navbar / Sidebar.

   Layout: Right panel (chat) only - full width.
   Height: calc(100vh - 3.5rem) = full viewport minus navbar (h-14).
====================================================================== */

// ─── DATA ──────────────────────────────────────────────────────────────────

const SUGGESTED_PROMPTS = [
  { id: "p1", label: "Summarize my tasks",          icon: "check-square" },
  { id: "p2", label: "Show overdue tasks",           icon: "alert"        },
  { id: "p3", label: "Summarize a workspace",        icon: "layers"       },
  { id: "p4", label: "Find a project",               icon: "folder"       },
  { id: "p5", label: "Find a document",              icon: "file"         },
  { id: "p6", label: "Show unread notifications",    icon: "bell"         },
];

const MESSAGES = [
  {
    id: "m1",
    role: "user",
    content: "Can you summarize the current status of the API Gateway Migration project?",
    time: "10:42 AM",
  },
  {
    id: "m2",
    role: "ai",
    intro: "The API Gateway Migration is your most advanced active project and is running smoothly. Here's a quick overview:",
    projectCards: [
      {
        id: "pc1",
        name: "API Gateway Migration",
        workspace: "Infrastructure",
        progress: 91,
        statusLabel: "On Track",
        statusCls: "text-emerald-700 dark:text-emerald-400",
        memberInitials: ["RV", "SK"],
        memberColors: ["bg-orange-500", "bg-violet-500"],
      },
    ],
    taskCards: [],
    followup:
      "Progress is at 91% with no active blockers flagged. Raj and Sarah are the active contributors. The last update was 1 day ago — it's your cleanest running project right now.",
    sources: ["Infrastructure", "API Gateway Migration", "Raj V.", "Sarah K."],
    time: "10:42 AM",
  },
  {
    id: "m3",
    role: "user",
    content: "Which of my tasks are due today or overdue? Show me the most urgent ones.",
    time: "10:44 AM",
  },
  {
    id: "m4",
    role: "ai",
    intro:
      "You have 3 tasks due today and 3 that are overdue. Here are the most urgent items needing your attention:",
    projectCards: [],
    taskCards: [
      {
        id: "tc1",
        name: "Authentication API",
        project: "API Gateway Migration",
        statusLabel: "In Review",
        statusCls:
          "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
        priorityLabel: "High",
        priorityCls: "text-amber-700 dark:text-amber-400",
        priorityDot: "bg-amber-500",
        due: "Due Today",
        dueCls: "text-amber-700 dark:text-amber-400",
      },
      {
        id: "tc2",
        name: "Payment Gateway Integration",
        project: "Collabrix v2.0 Launch",
        statusLabel: "Blocked",
        statusCls:
          "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
        priorityLabel: "Critical",
        priorityCls: "text-red-700 dark:text-red-400",
        priorityDot: "bg-red-500",
        due: "2 days overdue",
        dueCls: "text-red-700 dark:text-red-400",
      },
    ],
    followup:
      "The Payment Gateway Integration is most critical — it's blocked and 2 days overdue in Collabrix v2.0 Launch. I'd recommend clearing that blocker before your due-today tasks.",
    sources: [
      "Product Engineering",
      "API Gateway Migration",
      "Tasks",
      "Collabrix v2.0 Launch",
    ],
    time: "10:44 AM",
  },
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function AIAssistant() {
  const hasMessages = MESSAGES.length > 0;

  return (
    <div className="flex overflow-hidden bg-[#F5F5F4] dark:bg-[#0B0C10]" style={{ height: "calc(100vh - 3.5rem)" }}>
      {/* ── Right panel: Chat (Full width) ───────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <ChatHeader />

        {/* Scrollable message area or empty/welcome state */}
        <div className="flex-1 overflow-y-scroll scrollbar-hide">
          {hasMessages ? <MessagesList /> : <EmptyState />}
        </div>

        <ChatInput />
      </div>
    </div>
  );
}

// ─── CHAT HEADER ───────────────────────────────────────────────────────────

function ChatHeader() {
  return (
    <div className="shrink-0 border-b border-zinc-200/70 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111218]/80 sm:px-5">
      <div className="flex items-center justify-between gap-3">
        {/* Title + subtitle */}
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
            <SparkleIconSm />
          </div>
          <div className="min-w-0">
            <h1 className="text-[14.5px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              AI Assistant
            </h1>
            <p className="hidden truncate text-[11.5px] text-zinc-500 dark:text-zinc-400 sm:block">
              Ask questions about your workspaces, projects, tasks and documents.
            </p>
          </div>
        </div>

        {/* New chat action */}
        <button
          type="button"
          className="shrink-0 rounded-lg border border-zinc-200/70 px-3 py-1.5 text-[12px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:border-white/[0.06] dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-zinc-200"
        >
          New chat
        </button>
      </div>
    </div>
  );
}

// ─── EMPTY / WELCOME STATE ─────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-10">
      {/* Greeting */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-[0_4px_20px_-4px_rgba(79,70,229,0.4)]">
          <SparkleIconLg />
        </div>
        <h2 className="text-[20px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Good Morning, Ninja.
        </h2>
        <p className="mt-1.5 max-w-sm text-[14px] text-zinc-500 dark:text-zinc-400">
          I can help you understand and manage everything inside your workspace.
        </p>
        <p className="mt-1 text-[13px] text-zinc-400 dark:text-zinc-500">
          Choose a suggestion below or ask your own question.
        </p>
      </div>

      {/* Prompt cards */}
      <div className="w-full max-w-[680px]">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROMPT CARD ───────────────────────────────────────────────────────────

function PromptCard({ prompt }) {
  return (
    <button
      type="button"
      className="group relative flex flex-col gap-2.5 overflow-hidden rounded-xl border border-zinc-200/70 bg-white/70 px-4 py-3.5 text-left backdrop-blur-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-zinc-300/80 hover:shadow-[0_4px_20px_-4px_rgba(24,24,27,0.1)] dark:border-white/[0.06] dark:bg-white/[0.025] dark:hover:border-white/[0.1] dark:hover:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.3)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
        <PromptIcon name={prompt.icon} />
      </span>
      <span className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
        {prompt.label}
      </span>
    </button>
  );
}

// ─── MESSAGES LIST ─────────────────────────────────────────────────────────

function MessagesList() {
  return (
    <div className="mx-auto w-full max-w-[780px] px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-5">
        {MESSAGES.map((msg) =>
          msg.role === "user" ? (
            <UserMessage key={msg.id} message={msg} />
          ) : (
            <AIMessage key={msg.id} message={msg} />
          ),
        )}
      </div>
    </div>
  );
}

// ─── USER MESSAGE ──────────────────────────────────────────────────────────

function UserMessage({ message }) {
  return (
    <div className="flex items-end justify-end gap-2.5">
      <div className="max-w-[72%]">
        <div className="rounded-2xl rounded-br-sm bg-indigo-600 px-4 py-3 dark:bg-indigo-500">
          <p className="text-[13.5px] leading-relaxed text-white">
            {message.content}
          </p>
        </div>
        <p className="mt-1 text-right text-[11px] text-zinc-400 dark:text-zinc-500">
          {message.time}
        </p>
      </div>
      {/* User avatar */}
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-[10px] font-bold text-white">
        NJ
      </div>
    </div>
  );
}

// ─── AI MESSAGE ────────────────────────────────────────────────────────────

function AIMessage({ message }) {
  return (
    <div className="flex items-start gap-2.5">
      {/* AI avatar */}
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
        <SparkleIconSm />
      </div>

      <div className="min-w-0 flex-1">
        {/* Message card */}
        <div className="relative overflow-hidden rounded-2xl rounded-tl-sm border border-zinc-200/70 bg-white/80 px-4 py-4 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.04]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

          {/* Intro */}
          <p className="text-[13.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            {message.intro}
          </p>

          {/* Project cards */}
          {message.projectCards?.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {message.projectCards.map((card) => (
                <ProjectMiniCard key={card.id} card={card} />
              ))}
            </div>
          )}

          {/* Task cards */}
          {message.taskCards?.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {message.taskCards.map((card) => (
                <TaskMiniCard key={card.id} card={card} />
              ))}
            </div>
          )}

          {/* Follow-up */}
          {message.followup && (
            <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              {message.followup}
            </p>
          )}

          {/* Sources */}
          {message.sources?.length > 0 && (
            <SourcesList sources={message.sources} />
          )}
        </div>

        <p className="mt-1 text-[11px] text-zinc-400 dark:text-zinc-500">
          {message.time}
        </p>
      </div>
    </div>
  );
}

// ─── PROJECT MINI CARD ─────────────────────────────────────────────────────

function ProjectMiniCard({ card }) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/80 p-3.5 dark:border-white/[0.05] dark:bg-white/[0.025]">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Project
          </p>
          <p className="mt-0.5 text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
            {card.name}
          </p>
          <p className="text-[12px] text-zinc-500 dark:text-zinc-400">
            {card.workspace}
          </p>
        </div>
        <span className={`shrink-0 text-[11.5px] font-medium ${card.statusCls}`}>
          {card.statusLabel}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="mb-1.5 flex items-center justify-between text-[11px]">
          <span className="text-zinc-500 dark:text-zinc-400">Progress</span>
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            {card.progress}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
            style={{ width: `${card.progress}%` }}
          />
        </div>
      </div>

      {/* Members + open link */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-1.5">
          {card.memberInitials.map((m, i) => (
            <div
              key={i}
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 border-white text-[7px] font-bold text-white dark:border-[#0e0f13] ${card.memberColors[i]}`}
            >
              {m}
            </div>
          ))}
        </div>
        <button
          type="button"
          className="text-[12px] font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Open Project →
        </button>
      </div>
    </div>
  );
}

// ─── TASK MINI CARD ────────────────────────────────────────────────────────

function TaskMiniCard({ card }) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/80 p-3.5 dark:border-white/[0.05] dark:bg-white/[0.025]">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Task
          </p>
          <p className="mt-0.5 text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
            {card.name}
          </p>
          <p className="text-[12px] text-zinc-500 dark:text-zinc-400">
            {card.project}
          </p>
        </div>
        <span className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ${card.statusCls}`}>
          {card.statusLabel}
        </span>
      </div>

      {/* Priority + Due + Open */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`flex items-center gap-1 text-[11.5px] font-medium ${card.priorityCls}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${card.priorityDot}`} />
            {card.priorityLabel}
          </span>
          <span className="text-zinc-300 dark:text-zinc-600">·</span>
          <span className={`text-[11.5px] font-medium ${card.dueCls}`}>
            {card.due}
          </span>
        </div>
        <button
          type="button"
          className="text-[12px] font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Open Task →
        </button>
      </div>
    </div>
  );
}

// ─── SOURCES LIST ──────────────────────────────────────────────────────────

function SourcesList({ sources }) {
  return (
    <div className="mt-3.5 border-t border-zinc-100 pt-3 dark:border-white/[0.05]">
      <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        Sources
      </p>
      <div className="flex flex-wrap gap-1.5">
        {sources.map((src, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-md bg-zinc-100/80 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-white/[0.05] dark:text-zinc-400"
          >
            <span className="h-1 w-1 rounded-full bg-indigo-400 dark:bg-indigo-500" />
            {src}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── CHAT INPUT ────────────────────────────────────────────────────────────

function ChatInput() {
  return (
    <div className="shrink-0 border-t border-zinc-200/70 bg-white/80 px-4 py-3.5 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111218]/80 sm:px-6">
      <div className="mx-auto max-w-[780px]">
        <div className="flex items-center gap-2">
          {/* Attachment */}
          <button
            type="button"
            aria-label="Attach file"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300"
          >
            <PaperclipIcon />
          </button>

          {/* Text input */}
          <div className="relative flex-1">
            <input
              type="text"
              readOnly
              placeholder="Ask anything about your workspace..."
              className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-100/60 px-4 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-zinc-100 dark:placeholder:text-zinc-500"
            />
          </div>

          {/* Send */}
          <button
            type="button"
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-[0_2px_8px_-2px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-px hover:shadow-[0_4px_14px_-2px_rgba(79,70,229,0.5)] active:translate-y-0 dark:from-indigo-500 dark:to-violet-500"
          >
            <SendIcon />
          </button>
        </div>

        <p className="mt-2 text-center text-[11px] text-zinc-400 dark:text-zinc-500">
          Responses are generated from your workspace data. Verify critical information independently.
        </p>
      </div>
    </div>
  );
}

// ─── ICONS ─────────────────────────────────────────────────────────────────

function SparkleIconSm() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}

function SparkleIconLg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5"  x2="12" y2="19" />
      <line x1="5"  y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
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

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2"  x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function PromptIcon({ name }) {
  const icons = {
    "check-square": (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    alert: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        <line x1="12" y1="9"  x2="12"    y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    layers: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    folder: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11Z" />
      </svg>
    ),
    file: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    bell: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  };

  return icons[name] || null;
}