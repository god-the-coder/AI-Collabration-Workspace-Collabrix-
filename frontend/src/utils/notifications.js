import { timeAgo } from "./formatDate";
import { env } from "../config";

export const AVATAR_COLORS = [
  "bg-violet-500",
  "bg-rose-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-indigo-500",
  "bg-sky-500",
];

export function colorForId(id = "") {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function initialsFor(actor) {
  if (!actor) return "";
  const first = actor.first_name?.[0] || "";
  const last = actor.last_name?.[0] || "";
  return `${first}${last}`.toUpperCase() || "?";
}

export const NOTIF_TYPE_MAP = {
  TASK_ASSIGNED: "assigned",
  TASK_COMMENT: "mention",
  TASK_DUE: "blocker",
  TASK_OVERDUE: "blocker",
  PROJECT_ADDED: "approval",
  PROJECT_INVITATION: "approval",
  WORKSPACE_INVITATION: "approval",
  MENTION: "mention",
  OWNERSHIP_TRANSFER: "assigned",
};

export function mapNotification(n) {
  return {
    id: n.id,
    type: NOTIF_TYPE_MAP[n.notification_type] || "ai",
    unread: !n.is_read,
    title: n.title,
    body: n.message,
    time: timeAgo(n.created_at),
    createdAt: n.created_at,
    avatar: n.actor
      ? {
          initials: initialsFor(n.actor),
          color: colorForId(n.actor.id),
          imageUrl: n.actor.avatar ? `${env.MEDIA_URL}${n.actor.avatar}` : null,
        }
      : null,
  };
}
