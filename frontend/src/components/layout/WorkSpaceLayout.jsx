import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  UserPlus,
  MoreHorizontal,
  ChevronRight,
  Edit3,
  Link2,
  Settings as SettingsIcon,
  LogOut,
} from 'lucide-react';
import InviteWorkspaceMemberModal from '../../pages/Workspaces/InviteWorkspaceMemberModal';
import { localWS, leaveWorkspaceWS } from '../../api/workspace.api';
import Avatar from '../common/Avatar';





// const workspace = {
//   name: 'Product Engineering',
//   description: 'Core product development workspace.',
//   role: 'Owner',
//   members: 12,
//   projects: 8,
//   totalTasks: 86,
//   avatar: 'PE',
// };

const WORKSPACE_TABS = [
  { id: 'overview', label: 'Overview', path: "" },
  { id: 'projects', label: 'Projects', path: "projects" },
  { id: 'members', label: 'Members', path: "members" },
  { id: 'chat', label: 'Chat', path: "chat" },
  { id: 'files', label: 'Files', path: "files" },
  { id: 'settings', label: 'Settings', path: "settings" },
];

const OVERFLOW_MENU_ITEMS = [
  // { id: 'edit', label: 'Edit Workspace', icon: Edit3 },
  { id: 'copy', label: 'Copy Invite Link', icon: Link2 },
  // { id: 'settings', label: 'Workspace Settings', icon: SettingsIcon },
];

// ─── MAIN LAYOUT ────────────────────────────────────────────────────────────

export default function WorkspaceLayout() {

  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    const fetchWS = async () => {
      try {
        const resp = await localWS(workspaceId);

        // console.log(resp.data);
        setWorkspace(resp.data);
      }
      catch (error) {
        console.log(error);
      }
    }

    fetchWS();
  }, [workspaceId]);


  return (
    <div className="mx-auto max-w-[1200px] px-6 py-6 lg:px-8">
      <Breadcrumb workspace={workspace}/>
      <WorkspaceHeader workspace={workspace}/>
      <WorkspaceTabs />

      <div className="mt-8 pb-10">
        <Outlet />
      </div>
    </div>
  );
}

// ─── BREADCRUMB ────────────────────────────────────────────────────────────

function Breadcrumb({workspace}) {
  return (
    <div className="mb-4 flex items-center gap-1.5 text-[12.5px]">
      <span className="cursor-pointer font-medium text-zinc-400 transition-colors hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300">
        Workspaces
      </span>
      <ChevronRight size={13} className="text-zinc-300 dark:text-zinc-600" />
      <span className="font-medium text-zinc-600 dark:text-zinc-300">
        {workspace?.name}
      </span>
    </div>
  );
}

// ─── workspace HEADER ───────────────────────────────────────────────────────

function WorkspaceHeader({workspace}) {

  const { workspaceId } = useParams();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      {/* Identity */}
      <div className="flex items-start gap-4">
        <Avatar
          src={workspace?.logo}
          initials={workspace?.initials}
          name={workspace?.name}
          size="lg"
        />
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[24px]">
              {workspace?.name}
            </h1>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
              {workspace?.role}
            </span>
          </div>
          <p className="mt-1 text-[13.5px] text-zinc-500 dark:text-zinc-400">
            {workspace?.description}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[12.5px] text-zinc-500 dark:text-zinc-400">
            <span>{workspace?.members} members</span>
            <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
            <span>{workspace?.projects} active projects</span>
            <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
            <span>{workspace?.totalTasks} total tasks</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className="flex items-center gap-1.5 rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
        >
          <UserPlus size={15} />
          Invite Members
        </button>

        {showModal && (
          <InviteWorkspaceMemberModal
            workspaceId={workspaceId}
            onClose={() => setShowModal(false)}
          />
        )}

        <OverflowMenu workspaceId={workspaceId} />
      </div>
    </div>
  );
}

// ─── OVERFLOW MENU (⋮) ──────────────────────────────────────────────────────
// Minimal open/close interaction only — mirrors the ProfileMenu / NotificationMenu
// convention already used elsewhere in the app. No business logic wired up.

function OverflowMenu({ workspaceId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleLeave = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to leave this workspace? You will lose access to its projects, tasks, and files.'
    );
    if (!confirmed) return;

    setIsLeaving(true);
    try {
      await leaveWorkspaceWS(workspaceId);
      setIsOpen(false);
      navigate('/workspaces');
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        'Failed to leave workspace. Please try again.';
      window.alert(typeof message === 'string' ? message : 'Failed to leave workspace. Please try again.');
    } finally {
      setIsLeaving(false);
    }
  };

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
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Workspace options"
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${isOpen
            ? 'border-zinc-300 bg-zinc-100 text-zinc-700 dark:border-white/[0.14] dark:bg-white/[0.08] dark:text-zinc-200'
            : 'border-zinc-200/70 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:border-white/[0.08] dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-zinc-200'
          }`}
      >
        <MoreHorizontal size={17} />
      </button>

      <div
        role="menu"
        aria-label="Workspace options"
        className={`absolute right-0 top-[calc(100%+8px)] z-30 w-56 origin-top-right overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/95 shadow-[0_8px_30px_-8px_rgba(24,24,27,0.14)] backdrop-blur-xl transition-all duration-150 ease-out dark:border-white/[0.06] dark:bg-[#111218]/95 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] ${isOpen
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-1 scale-[0.98] opacity-0'
          }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />

        <div className="py-1.5">
          {OVERFLOW_MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50/80 dark:text-zinc-300 dark:hover:bg-white/[0.04]"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-500 dark:text-zinc-400">
                <item.icon size={15} />
              </span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="h-px bg-zinc-100 dark:bg-white/[0.05]" />

        <div className="py-1.5">
          <button
            type="button"
            role="menuitem"
            disabled={isLeaving}
            onClick={handleLeave}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60 dark:text-zinc-300 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
              <LogOut size={15} />
            </span>
            {isLeaving ? 'Leaving…' : 'Leave Workspace'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── workspace TABS ─────────────────────────────────────────────────────────
// Static UI only, exactly as before — the active tab is not yet derived from
// the current route. Wiring this to useLocation/NavLink is business logic
// left for a follow-up pass, not part of this reorganization.

function WorkspaceTabs() {
  return (
    <div className="mt-6 border-b border-zinc-200/70 dark:border-white/[0.06]">
      <nav className="-mb-px flex gap-5 overflow-x-auto">
        {WORKSPACE_TABS.map((tab) => (
          <NavLink
            to={tab.path}
            end={tab.path === ""}
            key={tab.id}
            className={({ isActive }) => `shrink-0 cursor-pointer whitespace-nowrap border-b-2 px-1 pb-3 text-[13.5px] font-medium transition-colors ${isActive
                ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
