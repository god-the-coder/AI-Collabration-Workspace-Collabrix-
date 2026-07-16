import React from 'react';

/* ======================================================================
   Chats.jsx
   Rendered inside <DashboardLayout><Outlet /></DashboardLayout> as the
   global Chats page. DashboardLayout already renders Navbar and
   Sidebar — this file is the Outlet content only.

   Purpose: every conversation the current user belongs to, across all
   workspaces and projects. NOT a workspace or project chat — those will
   later reuse this same chat window.

   UI only — no state, no event handlers, no WebSocket/API logic, no
   search/filter logic, no typing indicators, no online status.

   "Selection" and mobile view-switching are both derived from static
   data read at render time (ACTIVE_CONVERSATION_ID below), the same way
   Sidebar.jsx and WorkspaceTabs use a hardcoded `active` flag instead of
   a click handler. Hover reveals on messages use plain CSS (Tailwind
   `group-hover`), not JS.
====================================================================== */

// Change this to a conversation id below to preview a different selection,
// or to something invalid (e.g. null) to preview the "No Conversation
// Selected" empty state. Not wired to any real interaction.
const ACTIVE_CONVERSATION_ID = 'c2';

// ─── CONFIG ────────────────────────────────────────────────────────────────

const TYPE_CONFIG = {
  workspace: { label: 'Workspace', bg: 'bg-indigo-50 dark:bg-indigo-500/10', text: 'text-indigo-700 dark:text-indigo-400', icon: <BuildingIcon /> },
  project:   { label: 'Project',   bg: 'bg-violet-50 dark:bg-violet-500/10', text: 'text-violet-700 dark:text-violet-400', icon: <FolderIcon /> },
};

const FILTERS = ['All', 'Workspace', 'Project'];

// ─── DUMMY DATA ────────────────────────────────────────────────────────────

const CONVERSATIONS = [
  {
    id: 'c1', name: 'Product Engineering', type: 'workspace',
    latestSender: 'Sarah', latestMessage: 'Sprint planning at 4 PM.', time: '2m', unread: 3,
  },
  {
    id: 'c2', name: 'API Gateway Migration', type: 'project', members: 8,
    latestSender: 'Ninja', latestMessage: 'Authentication completed.', time: '15m', unread: 0,
  },
  {
    id: 'c3', name: 'AI Research Lab', type: 'workspace',
    latestSender: 'Marcus', latestMessage: 'Model training finished.', time: 'Yesterday', unread: 0,
  },
  {
    id: 'c4', name: 'Dashboard Redesign', type: 'project', members: 4,
    latestSender: 'Arjun', latestMessage: 'Ready for review.', time: '1h', unread: 1,
  },
  {
    id: 'c5', name: 'Design Studio', type: 'workspace',
    latestSender: 'Elena', latestMessage: 'New mockups uploaded.', time: '3h', unread: 0,
  },
  {
    id: 'c6', name: 'Marketing Website', type: 'project', members: 4,
    latestSender: 'Priya', latestMessage: 'Content approved.', time: '2d', unread: 0,
  },
];

const PINNED_MESSAGE = {
  c2: 'Sprint Planning Meeting today at 4 PM',
};

const MESSAGES_BY_CONVERSATION = {
  c2: [
    {
      id: 'm1', sender: 'Sarah', initials: 'SC', color: 'bg-violet-500',
      content: 'API deployment completed successfully 🚀', time: '10:45 AM',
      reactions: [{ emoji: '👍', count: 2 }, { emoji: '❤️', count: 1 }],
    },
    {
      id: 'm2', sender: 'Ninja', initials: 'NJ', color: 'bg-indigo-500',
      content: "Great work. I'll review authentication next.", time: '10:47 AM',
      reactions: [{ emoji: '👀', count: 1 }],
    },
    {
      id: 'm3', sender: 'Arjun', initials: 'AR', color: 'bg-emerald-500',
      content: 'Frontend is now connected.', time: '10:52 AM',
    },
    {
      id: 'm4', sender: 'Sarah', initials: 'SC', color: 'bg-violet-500',
      content: "Let's sync at 3 PM instead of 4.", time: '11:02 AM', edited: true,
    },
    {
      id: 'm5', sender: 'Marcus', initials: 'MJ', color: 'bg-amber-500',
      time: '11:05 AM', deleted: true,
    },
  ],
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function Chats() {
  const activeConversation = CONVERSATIONS.find((c) => c.id === ACTIVE_CONVERSATION_ID) || null;

  const sidebarClasses = `w-full shrink-0 flex-col border-r border-zinc-200/70 dark:border-white/[0.06] md:flex md:w-80 ${
    activeConversation ? 'hidden md:flex' : 'flex'
  }`;
  const chatClasses = `flex-1 flex-col ${activeConversation ? 'flex' : 'hidden md:flex'}`;

  return (
    <div className="flex overflow-hidden bg-[#F5F5F4] dark:bg-[#0B0C10]" style={{ height: 'calc(100vh - 3.5rem)' }}>
      <div className={sidebarClasses}>
        <ConversationSidebar activeId={activeConversation?.id} />
      </div>
      <div className={chatClasses}>
        {activeConversation ? (
          <ChatWindow conversation={activeConversation} />
        ) : (
          <NoConversationSelected />
        )}
      </div>
    </div>
  );
}

// ─── LEFT PANEL: CONVERSATION SIDEBAR ───────────────────────────────────────

function ConversationSidebar({ activeId }) {
  return (
    <div className="flex h-full flex-col bg-white/50 backdrop-blur-sm dark:bg-[#111218]/50">
      {/* Header */}
      <div className="shrink-0 border-b border-zinc-200/70 px-4 py-4 dark:border-white/[0.06]">
        <h1 className="text-[17px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Chats
        </h1>
        <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">
          Collaborate across all workspaces and projects.
        </p>

        {/* Search */}
        <div className="relative mt-3">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </div>
          <input
            type="text"
            readOnly
            placeholder="Search conversations..."
            aria-label="Search conversations"
            className="h-9 w-full rounded-xl border border-zinc-200 bg-zinc-100/60 pl-9 pr-4 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
        </div>

        {/* Filter chips */}
        <div className="mt-3 flex items-center gap-1.5">
          {FILTERS.map((filter, idx) => (
            <span
              key={filter}
              className={`rounded-full px-3 py-1 text-[12px] font-medium ${
                idx === 0
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {filter}
            </span>
          ))}
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto p-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CONVERSATIONS.map((conv) => (
          <ConversationListItem key={conv.id} conversation={conv} isActive={conv.id === activeId} />
        ))}
      </div>
    </div>
  );
}

function ConversationListItem({ conversation, isActive }) {
  const type = TYPE_CONFIG[conversation.type] || TYPE_CONFIG.workspace;

  return (
    <div
      className={`mb-0.5 flex cursor-pointer items-start gap-2.5 rounded-xl px-2.5 py-2.5 transition-colors ${
        isActive
          ? 'bg-indigo-50 dark:bg-indigo-500/[0.08]'
          : 'hover:bg-zinc-100/80 dark:hover:bg-white/[0.04]'
      }`}
    >
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${type.bg} ${type.text}`}>
        {type.icon}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className={`truncate text-[13px] font-medium ${isActive ? 'text-indigo-700 dark:text-indigo-300' : 'text-zinc-800 dark:text-zinc-200'}`}>
              {conversation.name}
            </span>
          </div>
          <span className="shrink-0 text-[11px] text-zinc-400 dark:text-zinc-500">{conversation.time}</span>
        </div>

        <span className={`mt-0.5 inline-block rounded-full px-1.5 py-px text-[10px] font-medium ${type.bg} ${type.text}`}>
          {type.label}
        </span>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-[12px] text-zinc-500 dark:text-zinc-400">
            <span className="font-medium text-zinc-600 dark:text-zinc-300">{conversation.latestSender}: </span>
            {conversation.latestMessage}
          </p>
          {conversation.unread > 0 && (
            <span className="flex h-4.5 min-w-[18px] shrink-0 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── RIGHT PANEL: CHAT WINDOW ────────────────────────────────────────────────

function ChatWindow({ conversation }) {
  const type = TYPE_CONFIG[conversation.type] || TYPE_CONFIG.workspace;
  const messages = MESSAGES_BY_CONVERSATION[conversation.id] || [];
  const pinned = PINNED_MESSAGE[conversation.id];

  return (
    <div className="flex h-full flex-col">
      <ChatHeader conversation={conversation} type={type} />
      {pinned && <PinnedBanner text={pinned} />}

      <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {messages.length === 0 ? (
          <EmptyMessagesState />
        ) : (
          <div className="mx-auto flex max-w-[760px] flex-col gap-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </div>
        )}
      </div>

      <Composer />
    </div>
  );
}

function ChatHeader({ conversation, type }) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-200/70 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111218]/80 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile back button — static, ready to be wired to real navigation later */}
        <button
          type="button"
          aria-label="Back to conversations"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-200 md:hidden"
        >
          <BackIcon />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-[14.5px] font-semibold text-zinc-900 dark:text-zinc-100">
              {conversation.name}
            </h2>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-medium ${type.bg} ${type.text}`}>
              {type.label}
            </span>
          </div>
          {conversation.members && (
            <p className="text-[11.5px] text-zinc-400 dark:text-zinc-500">{conversation.members} Members</p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          aria-label="Search in conversation"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-200"
        >
          <SearchIcon />
        </button>

        {/* Three-dot menu — native disclosure, no event handlers */}
        <details className="relative">
          <summary
            aria-label="Conversation options"
            className="flex h-8 w-8 list-none items-center justify-center rounded-lg text-zinc-500 transition-colors marker:content-none hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-200 [&::-webkit-details-marker]:hidden"
          >
            <MoreVerticalIcon />
          </summary>
          <div className="absolute right-0 top-[calc(100%+6px)] z-30 w-52 overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/95 shadow-[0_8px_30px_-8px_rgba(24,24,27,0.14)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111218]/95 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />
            <div className="py-1.5">
              <div className="flex items-center px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50/80 dark:text-zinc-300 dark:hover:bg-white/[0.04]">
                View Details
              </div>
              <div className="flex items-center px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50/80 dark:text-zinc-300 dark:hover:bg-white/[0.04]">
                Mute Notifications
              </div>
            </div>
            <div className="h-px bg-zinc-100 dark:bg-white/[0.05]" />
            <div className="py-1.5">
              <div className="flex items-center px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-zinc-300 dark:hover:bg-red-500/10 dark:hover:text-red-400">
                Leave Conversation
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

function PinnedBanner({ text }) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-100 bg-zinc-50/80 px-4 py-2.5 dark:border-white/[0.05] dark:bg-white/[0.02] sm:px-6">
      <p className="truncate text-[12.5px] text-zinc-600 dark:text-zinc-400">
        <span className="mr-1">📌</span>
        {text}
      </p>
      <a
        href="#"
        className="shrink-0 text-[12px] font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        View Pinned &rarr;
      </a>
    </div>
  );
}

// ─── MESSAGE BUBBLE ─────────────────────────────────────────────────────────

function MessageBubble({ message }) {
  if (message.deleted) {
    return (
      <div className="flex items-start gap-3">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${message.color}`}>
          {message.initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">{message.sender}</span>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500">{message.time}</span>
          </div>
          <p className="mt-0.5 text-[13px] italic text-zinc-400 dark:text-zinc-500">
            This message was deleted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex items-start gap-3">
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${message.color}`}>
        {message.initials}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">{message.sender}</span>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500">{message.time}</span>
          {message.edited && (
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500">(edited)</span>
          )}

          {/* Hover-revealed actions — pure CSS, no JS */}
          <div className="ml-auto flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
            <MessageActionButton label="React"><ReactIcon /></MessageActionButton>
            <MessageActionButton label="Edit"><EditIcon /></MessageActionButton>
            <MessageActionButton label="Pin"><PinIcon /></MessageActionButton>
            <MessageActionButton label="Delete"><TrashIcon /></MessageActionButton>
          </div>
        </div>

        <p className="mt-0.5 text-[13.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          {message.content}
        </p>

        {message.reactions && message.reactions.length > 0 && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {message.reactions.map((r, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1 rounded-full border border-zinc-200/70 bg-zinc-50/80 px-2 py-0.5 text-[11.5px] text-zinc-600 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-zinc-400"
              >
                <span>{r.emoji}</span>
                <span className="font-medium">{r.count}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MessageActionButton({ label, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-white/[0.08] dark:hover:text-zinc-300"
    >
      {children}
    </button>
  );
}

// ─── COMPOSER ───────────────────────────────────────────────────────────────

function Composer() {
  return (
    <div className="shrink-0 border-t border-zinc-200/70 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111218]/80 sm:px-6">
      <div className="mx-auto flex max-w-[760px] items-center gap-2">
        <button
          type="button"
          aria-label="Mention someone"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300"
        >
          <AtIcon />
        </button>

        {/* Plain text input — a mention dropdown can anchor below this
            later without changing the shell. */}
        <input
          type="text"
          placeholder="Type a message..."
          aria-label="Type a message"
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
          aria-label="Send message"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-[0_2px_8px_-2px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-px hover:shadow-[0_4px_14px_-2px_rgba(79,70,229,0.5)] dark:from-indigo-500 dark:to-violet-500"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

// ─── EMPTY STATES ───────────────────────────────────────────────────────────

function EmptyMessagesState() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-white/[0.05] dark:text-zinc-500">
        <ChatBubbleIcon />
      </div>
      <p className="text-[13.5px] font-semibold text-zinc-700 dark:text-zinc-300">No messages yet</p>
      <p className="mt-0.5 text-[12.5px] text-zinc-400 dark:text-zinc-500">
        Start the discussion with your teammates.
      </p>
    </div>
  );
}

function NoConversationSelected() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-white/[0.05] dark:text-zinc-500">
        <ChatBubbleIcon size={26} />
      </div>
      <p className="text-[15px] font-semibold text-zinc-800 dark:text-zinc-200">Select a conversation</p>
      <p className="mt-1 max-w-xs text-[13px] text-zinc-400 dark:text-zinc-500">
        Choose a workspace or project conversation to begin chatting.
      </p>
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

function BuildingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <line x1="9" y1="6" x2="9" y2="6.01" />
      <line x1="15" y1="6" x2="15" y2="6.01" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" />
      <line x1="9" y1="14" x2="9" y2="14.01" />
      <line x1="15" y1="14" x2="15" y2="14.01" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11Z" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
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

function ReactIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="17" x2="12" y2="22" />
      <path d="M5 17h14v-1.5c0-1-.7-1.5-1.5-2L16 12V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v7l-1.5 1.5c-.8.5-1.5 1-1.5 2V17Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function AtIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
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

function ChatBubbleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
    </svg>
  );
}