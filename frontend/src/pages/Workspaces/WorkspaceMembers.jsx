import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { membersWS } from '../../api/workspace.api';



const ROLE_CONFIG = {
  OWNER:  { label: 'Owner',  bg: 'bg-indigo-50 dark:bg-indigo-500/10', text: 'text-indigo-700 dark:text-indigo-400' },
  ADMIN:  { label: 'Admin',  bg: 'bg-violet-50 dark:bg-violet-500/10', text: 'text-violet-700 dark:text-violet-400' },
  MEMBER: { label: 'Member', bg: 'bg-zinc-100  dark:bg-white/[0.06]',  text: 'text-zinc-600  dark:text-zinc-400'  },
  GUEST:  { label: 'Guest',  bg: 'bg-cyan-50   dark:bg-cyan-500/10',   text: 'text-cyan-700   dark:text-cyan-400'   },
};
// Backend status is always "OFFLINE" currently; uppercase from serializer
const STATUS_CONFIG = {
  ONLINE:  { label: 'Online',  dot: 'bg-emerald-500' },
  AWAY:    { label: 'Away',    dot: 'bg-amber-500'   },
  OFFLINE: { label: 'Offline', dot: 'bg-zinc-400 dark:bg-zinc-600' },
};
const FILTERS = ['All', 'Owners', 'Admins', 'Members', 'Guests', 'Pending'];
const ROW_MENU_ITEMS = ['View Profile', 'Change Role'];
// Maps filter pill label → backend role value for filtering
const FILTER_ROLE_MAP = {
  Owners:  'OWNER',
  Admins:  'ADMIN',
  Members: 'MEMBER',
  Guests:  'GUEST',
};
// Normalize role to uppercase for consistent lookups
const normalizeRole = (role) => (role ? role.toUpperCase() : 'MEMBER');
// Construct media URL from a relative backend path (e.g. /uploads/avatar.jpg)
// VITE_API_URL is http://localhost:8000/api — strip /api suffix for media
const getMediaUrl = (url) => {
  if (!url) return null;
  const apiUrl = import.meta.env.VITE_API_URL;
  const baseUrl = apiUrl.replace(/\/api\/?$/, '');
  return `${baseUrl}${url}`;
};
// Format an ISO date string to a human-readable short date
const formatDate = (isoString) => {
  if (!isoString) return '—';
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
};
// Consistent avatar background colors for initials fallback
const AVATAR_COLORS = [
  'bg-indigo-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500',
  'bg-rose-500', 'bg-cyan-500', 'bg-orange-500',
];
const getAvatarColor = (id) => {
  // Derive a stable color from the member id string
  let hash = 0;
  for (let i = 0; i < (id || '').length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};
// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function WorkspaceMembers() {
  const { workspaceId } = useParams();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [summary, setSummary]           = useState(null);
  const [members, setMembers]           = useState([]);
  const [isLoading, setIsLoading]       = useState(true);
  const [error, setError]               = useState(null);
  const [search, setSearch]             = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await membersWS(workspaceId);
        setSummary(response.data.summary);
        setMembers(response.data.members);
      } catch (err) {
        console.error('WorkspaceMembers fetch error:', err);
        setError(
          err.response?.data?.detail ||
          err.response?.data?.message ||
          'Failed to load members. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (workspaceId) {
      fetchMembers();
    }
  }, [workspaceId]);
  // ── Client-side filtering ──────────────────────────────────────────────
  const filteredMembers = members.filter((member) => {
    const q = search.trim().toLowerCase();
    // Role filter
    if (activeFilter === 'Pending') {
      // Backend members endpoint doesn't return pending invites —
      // "Pending" filter shows nothing (no fabricated data)
      return false;
    }
    if (activeFilter !== 'All') {
      const expectedRole = FILTER_ROLE_MAP[activeFilter];
      if (normalizeRole(member.role) !== expectedRole) return false;
    }
    // Search filter
    if (q) {
      const nameMatch  = (member.username || '').toLowerCase().includes(q);
      const emailMatch = (member.email    || '').toLowerCase().includes(q);
      return nameMatch || emailMatch;
    }
    return true;
  });
  // ── Derived stats ─────────────────────────────────────────────────────
  const STATS = [
    {
      id: 'st1',
      label: 'Total Members',
      value: summary?.total_members ?? '—',
      iconBg: 'bg-indigo-50 dark:bg-indigo-500/10',
      iconCl: 'text-indigo-500 dark:text-indigo-400',
      icon: <UsersIcon />,
    },
    {
      id: 'st2',
      label: 'Online Members',
      value: summary?.online_members ?? '—',
      iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
      iconCl: 'text-emerald-500 dark:text-emerald-400',
      icon: <DotIcon />,
    },
    {
      id: 'st3',
      label: 'Admins',
      value: summary?.admins ?? '—',
      iconBg: 'bg-violet-50 dark:bg-violet-500/10',
      iconCl: 'text-violet-500 dark:text-violet-400',
      icon: <ShieldIcon />,
    },
    {
      id: 'st4',
      label: 'Pending Invites',
      value: summary?.pending_invites ?? '—',
      iconBg: 'bg-amber-50 dark:bg-amber-500/10',
      iconCl: 'text-amber-500 dark:text-amber-400',
      icon: <MailIcon />,
    },
  ];
  return (
    <div className="flex flex-col gap-8">
      <PageHeader onInviteClick={() => setIsInviteOpen(true)} />
      {/* Stats Cards — use real summary values */}
      <StatsCards stats={STATS} isLoading={isLoading} />
      <section>
        <Toolbar
          search={search}
          onSearchChange={setSearch}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <div className="mt-4">
          <MembersTable
            members={filteredMembers}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </section>
      {/* Pending Invitations section — backend members endpoint does not
          return pending invites, so we show an informational empty state
          rather than fabricated data. */}
      <PendingInvitations />
      <InviteMemberModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
    </div>
  );
}
// ─── PAGE HEADER ────────────────────────────────────────────────────────────
function PageHeader({ onInviteClick }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-[19px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Members
        </h1>
        <p className="mt-1 text-[13.5px] text-zinc-500 dark:text-zinc-400">
          Manage workspace members and permissions.
        </p>
      </div>
      <button
        type="button"
        onClick={onInviteClick}
        className="group/btn relative shrink-0 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        <span className="relative flex items-center gap-1.5">
          <UserPlusIcon />
          Invite Member
        </span>
      </button>
    </div>
  );
}
// ─── STATS CARDS ────────────────────────────────────────────────────────────
function StatsCards({ stats, isLoading }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-5 py-4 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconCl}`}>
            {stat.icon}
          </div>
          <p className="mt-3 text-[12px] font-medium text-zinc-500 dark:text-zinc-400">
            {stat.label}
          </p>
          <p className="mt-0.5 text-[24px] font-bold leading-none tracking-tight text-zinc-900 dark:text-zinc-50">
            {isLoading ? '—' : stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
// ─── TOOLBAR: search + filter pills ────────────────────────────────────────
function Toolbar({ search, onSearchChange, activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative sm:w-72">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search members..."
          className="h-9 w-full rounded-xl border border-zinc-200 bg-zinc-100/60 pl-9 pr-4 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />
      </div>
      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        {FILTERS.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => onFilterChange(filter)}
              className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400'
                  : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-zinc-200'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
// ─── MEMBERS TABLE ──────────────────────────────────────────────────────────
function MembersTable({ members, isLoading, error }) {
  // Loading skeleton rows
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-white/[0.05]">
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Status</Th>
                <Th>Joined</Th>
                <Th>Last Active</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((n) => (
                <tr key={n} className="border-b border-zinc-100 dark:border-white/[0.04]">
                  {[1, 2, 3, 4, 5, 6, 7].map((c) => (
                    <td key={c} className="px-4 py-3.5">
                      <div className="h-4 w-full max-w-[120px] animate-pulse rounded bg-zinc-100 dark:bg-white/[0.06]" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-red-200/70 bg-red-50/50 py-12 dark:border-red-500/10 dark:bg-red-500/5">
        <p className="text-[13px] text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }
  // Empty state
  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-200/70 bg-white/70 py-14 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
        <UsersIcon />
        <p className="mt-1 text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
          No members found.
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-white/[0.05]">
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Joined</Th>
              <Th>Last Active</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, idx) => (
              <MemberRow
                key={member.id}
                member={member}
                isLast={idx === members.length - 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function Th({ children, className = '' }) {
  return (
    <th className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ${className}`}>
      {children}
    </th>
  );
}
function MemberRow({ member, isLast }) {
  // Backend role is uppercase (OWNER/ADMIN/MEMBER)
  const roleKey  = normalizeRole(member.role);
  const role     = ROLE_CONFIG[roleKey] || ROLE_CONFIG.MEMBER;
  // Backend status is uppercase (ONLINE/AWAY/OFFLINE)
  const statusKey = (member.status || 'OFFLINE').toUpperCase();
  const status    = STATUS_CONFIG[statusKey] || STATUS_CONFIG.OFFLINE;
  const avatarUrl  = getMediaUrl(member.avatar);
  const avatarColor = getAvatarColor(member.id);
  return (
    <tr
      className={`group transition-colors hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] ${
        isLast ? '' : 'border-b border-zinc-100 dark:border-white/[0.04]'
      }`}
    >
      {/* Name + avatar */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full text-[10px] font-bold text-white ${avatarColor}`}>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={member.username}
                className="h-full w-full object-cover"
              />
            ) : (
              member.initials || '??'
            )}
          </div>
          <span className="whitespace-nowrap text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
            {member.username || '—'}
            {member.is_current_user && (
              <span className="ml-1.5 rounded-full bg-indigo-50 px-1.5 py-0.5 text-[10px] font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                You
              </span>
            )}
          </span>
        </div>
      </td>
      {/* Email */}
      <td className="px-4 py-3.5">
        <span className="whitespace-nowrap text-[12.5px] text-zinc-500 dark:text-zinc-400">
          {member.email || '—'}
        </span>
      </td>
      {/* Role */}
      <td className="px-4 py-3.5">
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${role.bg} ${role.text}`}>
          {role.label}
        </span>
      </td>
      {/* Status */}
      <td className="px-4 py-3.5">
        <span className="flex items-center gap-1.5 whitespace-nowrap text-[12.5px] text-zinc-600 dark:text-zinc-400">
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </td>
      {/* Joined */}
      <td className="px-4 py-3.5">
        <span className="whitespace-nowrap text-[12.5px] text-zinc-500 dark:text-zinc-400">
          {formatDate(member.joined_at)}
        </span>
      </td>
      {/* Last active */}
      <td className="px-4 py-3.5">
        <span className="whitespace-nowrap text-[12.5px] text-zinc-500 dark:text-zinc-400">
          {formatDate(member.last_active_at)}
        </span>
      </td>
      {/* Actions */}
      <td className="px-4 py-3.5 text-right">
        <RowMenu memberName={member.username} />
      </td>
    </tr>
  );
}
// ─── ROW ACTIONS MENU (⋮) ───────────────────────────────────────────────────
function RowMenu({ memberName }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    function handlePointerDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Actions for ${memberName}`}
        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
          isOpen
            ? 'bg-zinc-100 text-zinc-700 dark:bg-white/[0.08] dark:text-zinc-200'
            : 'text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-white/[0.05] dark:hover:text-zinc-300'
        }`}
      >
        <MoreVerticalIcon />
      </button>
      <div
        role="menu"
        aria-label={`Actions for ${memberName}`}
        className={`absolute right-0 top-[calc(100%+6px)] z-30 w-48 origin-top-right overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/95 shadow-[0_8px_30px_-8px_rgba(24,24,27,0.14)] backdrop-blur-xl transition-all duration-150 ease-out dark:border-white/[0.06] dark:bg-[#111218]/95 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] ${
          isOpen
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-1 scale-[0.98] opacity-0'
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />
        <div className="py-1.5">
          {ROW_MENU_ITEMS.map((label) => (
            <button
              key={label}
              type="button"
              role="menuitem"
              className="flex w-full items-center px-4 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50/80 dark:text-zinc-300 dark:hover:bg-white/[0.04]"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="h-px bg-zinc-100 dark:bg-white/[0.05]" />
        <div className="py-1.5">
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center px-4 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-zinc-300 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            Remove Member
          </button>
        </div>
      </div>
    </div>
  );
}
// ─── PENDING INVITATIONS ────────────────────────────────────────────────────
// The GET /api/v1/workspaces/<id>/members/ endpoint does not return pending
// invites. The summary.pending_invites count is shown in the stats card.
// The list section shows an informational empty state instead of fabricated data.
function PendingInvitations() {
  return (
    <section>
      <h2 className="mb-4 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        Pending Invitations
      </h2>
      <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />
        <div className="flex flex-col items-center justify-center gap-2 py-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-white/[0.06] dark:text-zinc-500">
            <MailIcon />
          </div>
          <p className="text-[13px] text-zinc-400 dark:text-zinc-500">
            Pending invitation details are not available here.
          </p>
        </div>
      </div>
    </section>
  );
}
// ─── INVITE MEMBER MODAL ────────────────────────────────────────────────────
function InviteMemberModal({ isOpen, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
      />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Invite Member"
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] dark:border-white/[0.08] dark:bg-[#111218] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 dark:border-white/[0.05]">
          <div>
            <p className="text-[14.5px] font-semibold text-zinc-900 dark:text-zinc-100">
              Invite Member
            </p>
            <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">
              Send an invitation to join this workspace.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300"
          >
            <CloseIcon />
          </button>
        </div>
        {/* Form */}
        <div className="space-y-4 px-5 py-5">
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
              Email Address
            </span>
            <input
              type="email"
              placeholder="name@company.com"
              className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
              Role
            </span>
            <div className="relative">
              <select
                defaultValue="member"
                className="h-10 w-full appearance-none rounded-xl border border-zinc-200 bg-white px-3.5 pr-9 text-[13.5px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="guest">Guest</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <ChevronDownIcon />
              </div>
            </div>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
              Message <span className="font-normal text-zinc-400 dark:text-zinc-500">(optional)</span>
            </span>
            <textarea
              rows={3}
              placeholder="Add a personal note to your invitation..."
              className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
            />
          </label>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-zinc-100 px-5 py-4 dark:border-white/[0.05]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            <span className="relative">Send Invite</span>
          </button>
        </div>
      </div>
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
function UserPlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function DotIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <circle cx="12" cy="12" r="6" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
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



