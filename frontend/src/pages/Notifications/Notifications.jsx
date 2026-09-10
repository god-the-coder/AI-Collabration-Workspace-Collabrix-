import { useEffect, useState } from "react";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../api/notification.api";
import { mapNotification } from "../../utils/notifications";

const NOTIF_TYPE_CONFIG = {
  mention: {
    dot: "bg-blue-500",
    icon: (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
      </svg>
    ),
  },
  approval: {
    dot: "bg-violet-500",
    icon: (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  assigned: {
    dot: "bg-indigo-500",
    icon: (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
  },
  blocker: {
    dot: "bg-red-500",
    icon: (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  ai: {
    dot: "bg-emerald-500",
    icon: (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    ),
  },
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
];

export default function Notifications() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      setIsLoading(true);
      setError(null);
      const res = await getNotifications();
      setItems((res.data?.notifications || []).map(mapNotification));
    } catch (err) {
      console.error("Failed to load notifications", err);
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Failed to load notifications."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function markOneRead(id) {
    const target = items.find((n) => n.id === id);
    if (!target || !target.unread) return;

    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
    try {
      await markNotificationRead(id);
    } catch (err) {
      console.error("Failed to mark notification read", err);
      setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: true } : n)));
    }
  }

  async function markAllRead() {
    const previous = items;
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
    try {
      await markAllNotificationsRead();
    } catch (err) {
      console.error("Failed to mark all notifications read", err);
      setItems(previous);
    }
  }

  const unreadCount = items.filter((n) => n.unread).length;
  const visibleItems = filter === "unread" ? items.filter((n) => n.unread) : items;

  return (
    <div className="mx-auto max-w-[800px] px-6 py-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[24px]">
            Notifications
          </h1>
          <p className="mt-1 text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            Stay up to date with mentions, task updates, and workspace activity.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="shrink-0 rounded-xl border border-zinc-200/70 px-4 py-2 text-[13px] font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-800 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.04] dark:hover:text-zinc-100"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="mt-6 flex items-center gap-1.5 border-b border-zinc-200/70 dark:border-white/[0.06]">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`relative px-3 py-2.5 text-[13px] font-medium transition-colors ${
              filter === f.id
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            {f.label}
            {f.id === "unread" && unreadCount > 0 && (
              <span className="ml-1.5 rounded-full bg-indigo-50 px-1.5 py-0.5 text-[10.5px] font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                {unreadCount}
              </span>
            )}
            {filter === f.id && (
              <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-indigo-500" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
              Loading notifications...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <p className="text-[13px] text-red-500">{error}</p>
            <button
              type="button"
              onClick={fetchNotifications}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-[13px] font-medium text-white hover:bg-indigo-700"
            >
              Retry
            </button>
          </div>
        ) : visibleItems.length === 0 ? (
          <EmptyState unreadOnly={filter === "unread"} />
        ) : (
          <div className="flex flex-col gap-2.5">
            {visibleItems.map((notif) => (
              <NotificationRow key={notif.id} notif={notif} onRead={markOneRead} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationRow({ notif, onRead }) {
  const cfg = NOTIF_TYPE_CONFIG[notif.type] || NOTIF_TYPE_CONFIG.mention;

  return (
    <button
      type="button"
      onClick={() => onRead(notif.id)}
      className={`group relative flex w-full items-start gap-3.5 overflow-hidden rounded-2xl border p-4 text-left backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-12px_rgba(24,24,27,0.12)] dark:hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)] ${
        notif.unread
          ? "border-indigo-200/70 bg-indigo-50/40 dark:border-indigo-400/20 dark:bg-indigo-500/[0.04]"
          : "border-zinc-200/70 bg-white/70 dark:border-white/[0.06] dark:bg-white/[0.025]"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      {/* Avatar + type badge */}
      <div className="relative mt-0.5 shrink-0">
        {notif.avatar ? (
          notif.avatar.imageUrl ? (
            <img src={notif.avatar.imageUrl} alt="" className="h-9 w-9 rounded-full object-cover" />
          ) : (
            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold text-white ${notif.avatar.color}`}>
              {notif.avatar.initials}
            </div>
          )
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
        )}
        <span className={`absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-white ${cfg.dot}`}>
          {cfg.icon}
        </span>
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className={`text-[13.5px] leading-snug ${
          notif.unread
            ? "font-semibold text-zinc-900 dark:text-zinc-100"
            : "font-medium text-zinc-600 dark:text-zinc-400"
        }`}>
          {notif.title}
        </p>
        <p className="mt-0.5 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-500">
          {notif.body}
        </p>
        <p className="mt-1.5 text-[11.5px] text-zinc-400 dark:text-zinc-600">
          {notif.time}
        </p>
      </div>

      {/* Unread indicator */}
      <div className="mt-2 shrink-0">
        {notif.unread
          ? <span className="block h-2 w-2 rounded-full bg-indigo-500" />
          : <span className="block h-2 w-2" />
        }
      </div>
    </button>
  );
}

function EmptyState({ unreadOnly }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-6 py-16 text-center backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-white/[0.05] dark:text-zinc-500">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </div>

      <p className="text-[14px] font-semibold text-zinc-700 dark:text-zinc-300">
        {unreadOnly ? "No Unread Notifications" : "No Notifications Yet"}
      </p>
      <p className="mt-1 text-[13px] text-zinc-400 dark:text-zinc-500">
        {unreadOnly
          ? "You're all caught up."
          : "You'll see mentions, task and workspace updates here."}
      </p>
    </div>
  );
}
