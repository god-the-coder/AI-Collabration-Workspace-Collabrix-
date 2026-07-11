import React, { useEffect, useRef, useState } from 'react';

/* ======================================================================
   pages/Workspaces/WorkspaceMembers.jsx
   Rendered by React Router at /workspaces/:workspaceId/members, inside
   WorkspaceLayout's <Outlet />. WorkspaceLayout already renders the
   breadcrumb, workspace header, and tabs — this file is the tab content only.

   Purpose: "Who is in this workspace, and what can they do?"
   UI only — no routing, no API calls, no backend integration.
   Local useState is used only to demonstrate the row menus and the
   Invite Member modal opening/closing — no business logic is wired up.
====================================================================== */

// ─── CONFIG ────────────────────────────────────────────────────────────────

const ROLE_CONFIG = {
  owner:  { label: 'Owner',  bg: 'bg-indigo-50 dark:bg-indigo-500/10', text: 'text-indigo-700 dark:text-indigo-400' },
  admin:  { label: 'Admin',  bg: 'bg-violet-50 dark:bg-violet-500/10', text: 'text-violet-700 dark:text-violet-400' },
  member: { label: 'Member', bg: 'bg-zinc-100  dark:bg-white/[0.06]',  text: 'text-zinc-600  dark:text-zinc-400'  },
  guest:  { label: 'Guest',  bg: 'bg-cyan-50   dark:bg-cyan-500/10',   text: 'text-cyan-700   dark:text-cyan-400'   },
};

const STATUS_CONFIG = {
  online:  { label: 'Online',  dot: 'bg-emerald-500' },
  away:    { label: 'Away',    dot: 'bg-amber-500'   },
  offline: { label: 'Offline', dot: 'bg-zinc-400 dark:bg-zinc-600' },
};

const FILTERS = ['All', 'Owners', 'Admins', 'Members', 'Guests', 'Pending'];

const ROW_MENU_ITEMS = ['View Profile', 'Change Role'];

// ─── DUMMY DATA ────────────────────────────────────────────────────────────

const MEMBERS = [
  { id: 'm1', name: 'Sarah Chen',       email: 'sarah.chen@collabrix.io',   role: 'owner',  status: 'online',  joined: 'Jan 12, 2024', lastActive: 'Active now',    initials: 'SC', color: 'bg-indigo-500'  },
  { id: 'm2', name: 'Arjun Patel',      email: 'arjun.patel@collabrix.io',  role: 'admin',  status: 'online',  joined: 'Feb 3, 2024',  lastActive: 'Active now',    initials: 'AR', color: 'bg-violet-500'  },
  { id: 'm3', name: 'Elena Rodriguez',  email: 'elena.r@collabrix.io',      role: 'admin',  status: 'away',    joined: 'Mar 18, 2024', lastActive: '20 min ago',    initials: 'ER', color: 'bg-emerald-500' },
  { id: 'm4', name: 'Marcus Johnson',   email: 'marcus.j@collabrix.io',     role: 'member', status: 'online',  joined: 'Apr 22, 2024', lastActive: 'Active now',    initials: 'MJ', color: 'bg-amber-500'   },
  { id: 'm5', name: 'Priya Sharma',     email: 'priya.sharma@collabrix.io', role: 'member', status: 'offline', joined: 'May 9, 2024',  lastActive: '3 hours ago',   initials: 'PS', color: 'bg-rose-500'    },
  { id: 'm6', name: 'Jamie Thompson',   email: 'jamie.t@collabrix.io',      role: 'member', status: 'online',  joined: 'Jun 14, 2024', lastActive: 'Active now',    initials: 'JT', color: 'bg-cyan-500'    },
  { id: 'm7', name: 'Raj Verma',        email: 'raj.verma@collabrix.io',    role: 'member', status: 'away',    joined: 'Jul 2, 2024',  lastActive: '1 hour ago',    initials: 'RV', color: 'bg-orange-500'  },
  { id: 'm8', name: 'Nina Patel',       email: 'nina.patel@collabrix.io',   role: 'guest',  status: 'offline', joined: 'Aug 30, 2024', lastActive: '2 days ago',    initials: 'NP', color: 'bg-indigo-500'  },
  { id: 'm9', name: 'Tom Park',         email: 'tom.park@collabrix.io',     role: 'guest',  status: 'offline', joined: 'Sep 15, 2024', lastActive: '5 days ago',    initials: 'TP', color: 'bg-violet-500'  },
];

const PENDING_INVITES = [
  { id: 'i1', email: 'david.kim@example.com',     invited: 'Invited 2 days ago', role: 'member' },
  { id: 'i2', email: 'lisa.wong@example.com',     invited: 'Invited 5 days ago', role: 'admin'  },
  { id: 'i3', email: 'carlos.mendez@example.com', invited: 'Invited 1 week ago', role: 'guest'  },
];

const STATS = [
  { id: 'st1', label: 'Total Members',   value: MEMBERS.length, iconBg: 'bg-indigo-50 dark:bg-indigo-500/10',  iconCl: 'text-indigo-500 dark:text-indigo-400',  icon: <UsersIcon />  },
  { id: 'st2', label: 'Online Members',  value: MEMBERS.filter((m) => m.status === 'online').length, iconBg: 'bg-emerald-50 dark:bg-emerald-500/10', iconCl: 'text-emerald-500 dark:text-emerald-400', icon: <DotIcon /> },
  { id: 'st3', label: 'Admins',          value: MEMBERS.filter((m) => m.role === 'admin' || m.role === 'owner').length, iconBg: 'bg-violet-50 dark:bg-violet-500/10', iconCl: 'text-violet-500 dark:text-violet-400', icon: <ShieldIcon /> },
  { id: 'st4', label: 'Pending Invites', value: PENDING_INVITES.length, iconBg: 'bg-amber-50 dark:bg-amber-500/10', iconCl: 'text-amber-500 dark:text-amber-400', icon: <MailIcon /> },
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function WorkspaceMembers() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader onInviteClick={() => setIsInviteOpen(true)} />
      <StatsCards />

      <section>
        <Toolbar />
        <div className="mt-4">
          <MembersTable />
        </div>
      </section>

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

function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {STATS.map((stat) => (
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
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── TOOLBAR: search + filter pills ────────────────────────────────────────

function Toolbar() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative sm:w-72">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon />
        </div>
        <input
          type="text"
          readOnly
          placeholder="Search members..."
          className="h-9 w-full rounded-xl border border-zinc-200 bg-zinc-100/60 pl-9 pr-4 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        {FILTERS.map((filter, idx) => {
          const isActive = idx === 0; // "All" active by default
          return (
            <button
              key={filter}
              type="button"
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

function MembersTable() {
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
            {MEMBERS.map((member, idx) => (
              <MemberRow key={member.id} member={member} isLast={idx === MEMBERS.length - 1} />
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
  const role = ROLE_CONFIG[member.role] || ROLE_CONFIG.member;
  const status = STATUS_CONFIG[member.status] || STATUS_CONFIG.offline;

  return (
    <tr
      className={`group transition-colors hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] ${
        isLast ? '' : 'border-b border-zinc-100 dark:border-white/[0.04]'
      }`}
    >
      {/* Name + avatar */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${member.color}`}>
            {member.initials}
          </div>
          <span className="whitespace-nowrap text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
            {member.name}
          </span>
        </div>
      </td>

      {/* Email */}
      <td className="px-4 py-3.5">
        <span className="whitespace-nowrap text-[12.5px] text-zinc-500 dark:text-zinc-400">
          {member.email}
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
          {member.joined}
        </span>
      </td>

      {/* Last active */}
      <td className="px-4 py-3.5">
        <span className="whitespace-nowrap text-[12.5px] text-zinc-500 dark:text-zinc-400">
          {member.lastActive}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3.5 text-right">
        <RowMenu memberName={member.name} />
      </td>
    </tr>
  );
}

// ─── ROW ACTIONS MENU (⋮) ───────────────────────────────────────────────────
// Minimal open/close interaction only — mirrors the ProfileMenu / OverflowMenu
// convention already used elsewhere in the app. No business logic wired up.

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

function PendingInvitations() {
  return (
    <section>
      <h2 className="mb-4 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        Pending Invitations
      </h2>

      <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

        {PENDING_INVITES.map((invite, idx) => {
          const role = ROLE_CONFIG[invite.role] || ROLE_CONFIG.member;
          return (
            <div
              key={invite.id}
              className={`flex flex-col gap-3 px-4 py-3.5 transition-colors hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between ${
                idx < PENDING_INVITES.length - 1 ? 'border-b border-zinc-100 dark:border-white/[0.04]' : ''
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-white/[0.06] dark:text-zinc-500">
                  <MailIcon />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                    {invite.email}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="text-[11.5px] text-zinc-400 dark:text-zinc-500">{invite.invited}</span>
                    <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${role.bg} ${role.text}`}>
                      {role.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 pl-11 sm:pl-0">
                <button
                  type="button"
                  className="rounded-lg border border-zinc-200/70 px-3 py-1.5 text-[12px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/[0.08] dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
                >
                  Resend
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-zinc-200/70 px-3 py-1.5 text-[12px] font-medium text-zinc-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-white/[0.08] dark:text-zinc-400 dark:hover:border-red-500/20 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── INVITE MEMBER MODAL ────────────────────────────────────────────────────
// Minimal open/close interaction only, driven by parent state. No submission
// logic — Send Invite simply closes the modal, same as Cancel.

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