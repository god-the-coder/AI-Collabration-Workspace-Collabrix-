// import React, { useState } from 'react';
// import {
//   Search,
//   Zap,
//   Bell,
//   MessageCircle,
//   ChevronDown,
// } from 'lucide-react';

// const Navbar = () => {
//   const [notificationCount] = useState(3);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 z-50">
//       <div className="h-full px-6 flex items-center justify-between">
        
//         {/* Left section - Logo */}
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
//             <span className="text-white font-bold text-sm">C</span>
//           </div>
//           <span className="text-lg font-semibold text-gray-900 dark:text-white">Collabrix</span>
//         </div>

//         {/* Center section - Search */}
//         <div className="hidden md:flex flex-1 max-w-md mx-8">
//           <div className="w-full relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600" size={18} />
//             <input
//               type="text"
//               placeholder="Search workspaces, projects..."
//               className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
//             />
//           </div>
//         </div>

//         {/* Right section - Actions & Profile */}
//         <div className="flex items-center gap-4">
          
//           {/* AI Assistant button */}
//           <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
//             <Zap size={18} className="text-amber-500" />
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ask AI</span>
//           </button>

//           {/* Notifications */}
//           <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
//             <Bell size={20} className="text-gray-600 dark:text-gray-400" />
//             {notificationCount > 0 && (
//               <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
//                 {notificationCount}
//               </span>
//             )}
//           </button>

//           {/* Messages */}
//           <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
//             <MessageCircle size={20} className="text-gray-600 dark:text-gray-400" />
//           </button>

//           {/* Profile dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setIsProfileOpen(!isProfileOpen)}
//               className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
//             >
//               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
//                 AB
//               </div>
//               <ChevronDown size={16} className="text-gray-600 dark:text-gray-400" />
//             </button>

//             {isProfileOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg py-2">
//                 <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
//                   <p className="text-sm font-medium text-gray-900 dark:text-white">Alex Bennett</p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">alex@collabrix.com</p>
//                 </div>
//                 <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
//                   Profile Settings
//                 </button>
//                 <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
//                   Preferences
//                 </button>
//                 <div className="border-t border-gray-200 dark:border-gray-800 mt-2 pt-2">
//                   <button className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;









import { useEffect, useRef, useState } from "react";

/* =====================================================================
   NOTIFICATIONS DATA
   Owns its own data — does not depend on Dashboard constants.
====================================================================== */

const CURRENT_USER = {
  name: "God Ninja",
  initials: "GN",
  email: "godninja@gmail.com",
  role: "Developer",
};

const NOTIFICATIONS = [
  {
    id: "n1",
    type: "mention",
    unread: true,
    title: "Sarah mentioned you",
    body: "Left a comment in API review notes — 'Ninja, can you check this endpoint?'",
    time: "8 min ago",
    avatar: { initials: "SK", color: "bg-violet-500" },
  },
  {
    id: "n2",
    type: "approval",
    unread: true,
    title: "Design spec needs approval",
    body: "Onboarding redesign v4 is ready for your sign-off in Design Studio.",
    time: "1 hour ago",
    avatar: { initials: "LM", color: "bg-rose-500" },
  },
  {
    id: "n3",
    type: "assigned",
    unread: true,
    title: "Task assigned to you",
    body: "Review auth error handling was assigned by Arjun in API Gateway Migration.",
    time: "3 hours ago",
    avatar: { initials: "AR", color: "bg-emerald-500" },
  },
  {
    id: "n4",
    type: "blocker",
    unread: true,
    title: "Release blocker identified",
    body: "Critical issue found in the payment module. Blocking v2.0 release.",
    time: "5 hours ago",
    avatar: { initials: "PM", color: "bg-amber-500" },
  },
  {
    id: "n5",
    type: "ai",
    unread: false,
    title: "AI meeting summary ready",
    body: "Your Product Sync notes have been summarised and saved to Documents.",
    time: "Yesterday",
    avatar: null,
  },
];

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

/* =====================================================================
   NAVBAR  — default export
   Props:
     user  { name, initials, email, role }
====================================================================== */

export default function Navbar({ user }) {
  return (
    <nav className="sticky top-0 z-50 flex h-14 shrink-0 items-center border-b border-zinc-200/70 bg-white/80 px-4 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111218]/80 lg:px-6">
      {/* Left — Logo */}
      <div className="flex items-center gap-2.5">
        <CollabrixMark />
        <span className="text-[16px] font-semibold tracking-tight">Collabrix</span>
      </div>

      {/* Center — Search */}
      <div className="ml-8 hidden flex-1 justify-center md:flex">
        <div className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </div>
          <input
            type="text"
            readOnly
            placeholder="Search projects, tasks, chats, documents..."
            className="h-9 w-full rounded-xl border border-zinc-200 bg-zinc-100/60 pl-9 pr-4 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <kbd className="hidden rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-500 sm:inline-block">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right — Actions */}
      <div className="ml-auto flex items-center gap-1">
        <NavbarButton aria-label="AI Assistant">
          <SparkleIcon />
        </NavbarButton>

        <NotificationMenu />

        <NavbarButton aria-label="Settings">
          <SettingsIcon />
        </NavbarButton>

        <ProfileMenu user={CURRENT_USER} />
      </div>
    </nav>
  );
}

/* =====================================================================
   NAVBAR BUTTON  — generic icon button used in the navbar right cluster
====================================================================== */

function NavbarButton({ children, badge }) {
  return (
    <button
      type="button"
      className="relative flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-200"
    >
      {children}
      {badge > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}

/* =====================================================================
   PROFILE MENU
====================================================================== */

function ProfileMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handlePointerDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const menuItems = [
    { label: "View Profile",          icon: <UserIcon /> },
    { label: "Appearance",            icon: <PaletteIcon /> },
    { label: "Notification Settings", icon: <BellIcon /> },
    { label: "Security",              icon: <LockIcon /> },
  ];

  return (
    <div ref={containerRef} className="relative ml-2">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Open profile menu"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-[12px] font-bold text-white transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:focus-visible:ring-indigo-400/50"
      >
        {user.initials}
      </button>

      {/* Mobile scrim */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[55] bg-zinc-900/30 backdrop-blur-[2px] transition-opacity duration-150 sm:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel — desktop dropdown / mobile bottom sheet */}
      <div
        role="menu"
        aria-label="Profile menu"
        className={`fixed inset-x-0 bottom-0 z-[60] w-full origin-bottom overflow-hidden rounded-t-2xl border-t border-zinc-200/70 bg-white/95 shadow-[0_-8px_30px_-8px_rgba(24,24,27,0.12)] backdrop-blur-xl transition-all duration-150 ease-out dark:border-white/[0.06] dark:bg-[#111218]/95 dark:shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.55)] sm:absolute sm:inset-x-auto sm:bottom-auto sm:right-0 sm:top-[calc(100%+10px)] sm:w-72 sm:origin-top-right sm:rounded-2xl sm:border sm:shadow-[0_8px_30px_-8px_rgba(24,24,27,0.12)] dark:sm:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-[0.98] opacity-0 sm:translate-y-0"
        }`}
      >
        {/* Top hairline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />

        {/* User header */}
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-indigo-500 to-violet-500 text-[15px] font-bold text-white dark:border-[#111218]">
            {user.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
              {user.name}
            </p>
            <p className="truncate text-[12px] text-zinc-500 dark:text-zinc-400">
              {user.role}
            </p>
            <p className="mt-0.5 truncate text-[11.5px] text-zinc-400 dark:text-zinc-500">
              {user.email}
            </p>
          </div>
        </div>

        <div className="h-px bg-zinc-100 dark:bg-white/[0.05]" />

        {/* Menu items */}
        <div className="py-1.5">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50/80 dark:text-zinc-300 dark:hover:bg-white/[0.04]"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-500 dark:text-zinc-400">
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="h-px bg-zinc-100 dark:bg-white/[0.05]" />

        {/* Logout — red accent on hover only */}
        <div className="py-1.5">
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] font-medium text-zinc-700 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-zinc-300 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
              <LogOutIcon />
            </span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   NOTIFICATION MENU
====================================================================== */

function NotificationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(NOTIFICATIONS);
  const containerRef = useRef(null);

  const unreadCount = items.filter((n) => n.unread).length;

  useEffect(() => {
    function handlePointerDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  function markOneRead(id) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Open notifications"
        className={`relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:focus-visible:ring-indigo-400/50 ${
          isOpen
            ? "bg-zinc-100 text-zinc-700 dark:bg-white/[0.08] dark:text-zinc-200"
            : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-200"
        }`}
      >
        <BellIcon />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Mobile scrim */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[55] bg-zinc-900/30 backdrop-blur-[2px] transition-opacity duration-150 sm:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel — desktop dropdown / mobile bottom sheet */}
      <div
        role="menu"
        aria-label="Notifications"
        className={`fixed inset-x-0 bottom-0 z-[60] w-full origin-bottom overflow-hidden rounded-t-2xl border-t border-zinc-200/70 bg-white/95 shadow-[0_-8px_30px_-8px_rgba(24,24,27,0.12)] backdrop-blur-xl transition-all duration-150 ease-out dark:border-white/[0.06] dark:bg-[#111218]/95 dark:shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.55)] sm:absolute sm:inset-x-auto sm:bottom-auto sm:right-0 sm:top-[calc(100%+10px)] sm:w-[360px] sm:origin-top-right sm:rounded-2xl sm:border sm:shadow-[0_8px_30px_-8px_rgba(24,24,27,0.12)] dark:sm:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-[0.98] opacity-0 sm:translate-y-0"
        }`}
      >
        {/* Top hairline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
              Notifications
            </span>
            {unreadCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-indigo-50 px-1.5 text-[11px] font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllRead}
              className="text-[12px] font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Mark all read
            </button>
          )}
        </div>

        <div className="h-px bg-zinc-100 dark:bg-white/[0.05]" />

        {/* Notification rows */}
        <div className="max-h-[420px] overflow-y-auto sm:max-h-[360px]">
          {items.map((notif, idx) => {
            const cfg = NOTIF_TYPE_CONFIG[notif.type] || NOTIF_TYPE_CONFIG.mention;
            return (
              <button
                key={notif.id}
                type="button"
                role="menuitem"
                onClick={() => markOneRead(notif.id)}
                className={`group flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-zinc-50/80 dark:hover:bg-white/[0.03] ${
                  idx < items.length - 1 ? "border-b border-zinc-100 dark:border-white/[0.04]" : ""
                }`}
              >
                {/* Avatar + type badge */}
                <div className="relative mt-0.5 shrink-0">
                  {notif.avatar ? (
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white ${notif.avatar.color}`}>
                      {notif.avatar.initials}
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
                  <p className={`text-[13px] leading-snug ${
                    notif.unread
                      ? "font-semibold text-zinc-900 dark:text-zinc-100"
                      : "font-medium text-zinc-600 dark:text-zinc-400"
                  }`}>
                    {notif.title}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[11.5px] leading-relaxed text-zinc-500 dark:text-zinc-500">
                    {notif.body}
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-400 dark:text-zinc-600">
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
          })}
        </div>

        <div className="h-px bg-zinc-100 dark:bg-white/[0.05]" />

        {/* Footer */}
        <div className="px-4 py-3">
          <button
            type="button"
            className="w-full rounded-xl border border-zinc-200/70 py-2 text-center text-[12.5px] font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-800 dark:border-white/[0.06] dark:text-zinc-400 dark:hover:border-white/[0.1] dark:hover:bg-white/[0.03] dark:hover:text-zinc-200"
          >
            View all notifications
          </button>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   ICONS  — all icons used inside Navbar, ProfileMenu, NotificationMenu
====================================================================== */

function CollabrixMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
      <circle cx="10" cy="13" r="7" className="fill-indigo-500/80 dark:fill-indigo-400/80" />
      <circle cx="17" cy="10" r="7" className="fill-violet-400/65 dark:fill-violet-300/65" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-500">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5"  r="0.6" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="10.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="8.5"  cy="7.5"  r="0.6" fill="currentColor" stroke="none" />
      <circle cx="6.5"  cy="12.5" r="0.6" fill="currentColor" stroke="none" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.65-.75 1.65-1.69 0-.43-.18-.83-.44-1.12-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.66h1.99c3.05 0 5.55-2.5 5.55-5.55C22 6.01 17.46 2 12 2Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
