/* ======================================================================
   Settings.jsx
   Rendered inside <DashboardLayout> — content area only.
   Do NOT import or recreate Navbar / Sidebar.

   Layout: Left panel (settings nav, sticky) + Right panel (active section).
   Personal account settings only — no workspace settings.
   UI only — no routing, no state, no persistence.
====================================================================== */

// ─── DUMMY DATA ────────────────────────────────────────────────────────────

const CURRENT_USER = {
  name: "Ninja",
  initials: "NJ",
  email: "ninja@collabrix.io",
  role: "Product Lead",
  memberSince: "March 2024",
};

const EMAIL_NOTIFICATIONS = [
  { id: "en1", label: "Task Assigned",          description: "Get notified when a task is assigned to you.",        enabled: true  },
  { id: "en2", label: "Mentions",                description: "Get notified when someone mentions you.",             enabled: true  },
  { id: "en3", label: "Workspace Invitations",   description: "Get notified when you're invited to a workspace.",    enabled: true  },
  { id: "en4", label: "Marketing Emails",        description: "Occasional product updates and announcements.",       enabled: false },
];

const INAPP_NOTIFICATIONS = [
  { id: "in1", label: "Mentions",   description: "Show in-app alerts when you're mentioned.",            enabled: true },
  { id: "in2", label: "Tasks",      description: "Show in-app alerts for task assignments and updates.", enabled: true },
  { id: "in3", label: "Projects",   description: "Show in-app alerts for project activity.",             enabled: true },
  { id: "in4", label: "Workspaces", description: "Show in-app alerts for workspace activity.",            enabled: false },
];

const CONNECTED_ACCOUNTS = [
  { id: "acc1", name: "Google", connected: true,  detail: "ninja@gmail.com" },
  { id: "acc2", name: "GitHub", connected: false, detail: null },
];

const ACTIVE_SESSIONS = [
  { id: "sess1", device: "Windows • Chrome", detail: "Current Device", current: true  },
  { id: "sess2", device: "MacBook • Safari", detail: "2 Days Ago",     current: false },
  { id: "sess3", device: "iPhone • Safari",  detail: "Yesterday",      current: false },
];

const SETTINGS_NAV = [
  { id: "profile",       label: "Profile",       icon: "user",    danger: false },
  { id: "appearance",    label: "Appearance",    icon: "palette", danger: false },
  { id: "notifications", label: "Notifications", icon: "bell",    danger: false },
  { id: "security",      label: "Security",      icon: "lock",    danger: false },
  { id: "danger",        label: "Danger Zone",   icon: "alert",   danger: true  },
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function Settings() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-6 lg:px-8">

      {/* Page header */}
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[24px]">
          Settings
        </h1>
        <p className="mt-1 text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          Manage your personal account preferences.
        </p>
      </div>

      {/* Two-panel layout */}
      <div className="mt-6 flex flex-col gap-6 pb-10 lg:flex-row lg:items-start">
        <SettingsNav />

        <div className="min-w-0 flex-1 space-y-8">
          <ProfileSection />
          <AppearanceSection />
          <NotificationsSection />
          <SecuritySection />
          <DangerZoneSection />
        </div>
      </div>
    </div>
  );
}

// ─── LEFT NAV ──────────────────────────────────────────────────────────────

function SettingsNav() {
  return (
    <aside className="shrink-0 lg:sticky lg:top-[88px] lg:w-56">
      <nav className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-2 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

        <div className="space-y-0.5">
          {SETTINGS_NAV.map((item) => {
            const isActive = item.id === "profile"; // Profile shown by default
            return (
              <button
                key={item.id}
                type="button"
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[13.5px] font-medium transition-colors ${
                  item.danger
                    ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                    : isActive
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/[0.08] dark:text-indigo-300"
                      : "text-zinc-500 hover:bg-zinc-100/80 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-zinc-200"
                }`}
              >
                <span
                  className={
                    item.danger
                      ? "text-red-500 dark:text-red-400"
                      : isActive
                        ? "text-indigo-500 dark:text-indigo-400"
                        : ""
                  }
                >
                  <NavIcon name={item.icon} />
                </span>
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

// ─── SECTION HEADER (shared pattern) ───────────────────────────────────────

function SectionHeader({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-[17px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      <p className="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">
        {subtitle}
      </p>
    </div>
  );
}

// ─── CARD WRAPPER (shared pattern) ──────────────────────────────────────────

function SettingsCard({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-5 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025] sm:p-6 ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />
      {children}
    </div>
  );
}

// ─── PROFILE SECTION ────────────────────────────────────────────────────────

function ProfileSection() {
  return (
    <section id="profile">
      <SectionHeader
        title="Profile"
        subtitle="Update your personal information and how others see you."
      />

      <div className="mt-4">
        <SettingsCard>
          {/* Avatar row */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-[20px] font-bold text-white">
              {CURRENT_USER.initials}
            </div>
            <div>
              <button
                type="button"
                className="rounded-xl border border-zinc-200/70 px-3.5 py-2 text-[12.5px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
              >
                Change Photo
              </button>
              <p className="mt-1.5 text-[11.5px] text-zinc-400 dark:text-zinc-500">
                JPG, PNG. Max 2MB.
              </p>
            </div>
          </div>

          {/* Fields */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <FieldText label="Full Name" defaultValue={CURRENT_USER.name} />
            <FieldText label="Email Address" defaultValue={CURRENT_USER.email} type="email" />
            <FieldReadOnly label="Role" value={CURRENT_USER.role} />
            <FieldReadOnly label="Member Since" value={CURRENT_USER.memberSince} />
          </div>

          {/* Save */}
          <div className="mt-6 flex justify-end border-t border-zinc-100 pt-5 dark:border-white/[0.05]">
            <button
              type="button"
              className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
              <span className="relative">Save Changes</span>
            </button>
          </div>
        </SettingsCard>
      </div>
    </section>
  );
}

function FieldText({ label, defaultValue, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
      />
    </label>
  );
}

function FieldReadOnly({ label, value }) {
  return (
    <div>
      <span className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      <div className="flex h-10 w-full items-center rounded-xl border border-zinc-200/60 bg-zinc-50/80 px-3.5 text-[13.5px] text-zinc-500 dark:border-white/[0.05] dark:bg-white/[0.02] dark:text-zinc-400">
        {value}
      </div>
    </div>
  );
}

// ─── APPEARANCE SECTION ─────────────────────────────────────────────────────

const THEME_OPTIONS = [
  { id: "system", label: "System", description: "Match your device setting", icon: "system" },
  { id: "light",  label: "Light",  description: "Bright background",          icon: "light"  },
  { id: "dark",   label: "Dark",   description: "Easy on the eyes",           icon: "dark"   },
];

function AppearanceSection() {
  return (
    <section id="appearance">
      <SectionHeader
        title="Appearance"
        subtitle="Choose how Collabrix looks on this device."
      />

      <div className="mt-4">
        <SettingsCard>
          <p className="mb-4 text-[12.5px] font-medium text-zinc-600 dark:text-zinc-400">
            Theme
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {THEME_OPTIONS.map((opt, idx) => {
              const isSelected = idx === 0; // System selected by default
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                    isSelected
                      ? "border-indigo-400 bg-indigo-50/60 dark:border-indigo-500/40 dark:bg-indigo-500/[0.06]"
                      : "border-zinc-200/70 hover:bg-zinc-50 dark:border-white/[0.07] dark:hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400">
                      <ThemeIcon name={opt.icon} />
                    </span>
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                        isSelected
                          ? "border-indigo-500 bg-indigo-500"
                          : "border-zinc-300 dark:border-zinc-600"
                      }`}
                    >
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
                      {opt.label}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-zinc-500 dark:text-zinc-400">
                      {opt.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </SettingsCard>
      </div>
    </section>
  );
}

// ─── NOTIFICATIONS SECTION ─────────────────────────────────────────────────

function NotificationsSection() {
  return (
    <section id="notifications">
      <SectionHeader
        title="Notifications"
        subtitle="Control how and when Collabrix notifies you."
      />

      <div className="mt-4 space-y-4">
        <SettingsCard>
          <p className="mb-1 text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
            Email Notifications
          </p>
          <p className="mb-4 text-[12px] text-zinc-500 dark:text-zinc-400">
            Choose what you'd like to be emailed about.
          </p>
          <div className="divide-y divide-zinc-100 dark:divide-white/[0.05]">
            {EMAIL_NOTIFICATIONS.map((item) => (
              <ToggleRow key={item.id} item={item} />
            ))}
          </div>
        </SettingsCard>

        <SettingsCard>
          <p className="mb-1 text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
            In-App Notifications
          </p>
          <p className="mb-4 text-[12px] text-zinc-500 dark:text-zinc-400">
            Choose what shows up in your notification bell.
          </p>
          <div className="divide-y divide-zinc-100 dark:divide-white/[0.05]">
            {INAPP_NOTIFICATIONS.map((item) => (
              <ToggleRow key={item.id} item={item} />
            ))}
          </div>
        </SettingsCard>
      </div>
    </section>
  );
}

function ToggleRow({ item }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
          {item.label}
        </p>
        <p className="mt-0.5 text-[11.5px] text-zinc-400 dark:text-zinc-500">
          {item.description}
        </p>
      </div>
      <ToggleSwitch enabled={item.enabled} />
    </div>
  );
}

function ToggleSwitch({ enabled }) {
  return (
    <span
      role="switch"
      aria-checked={enabled}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
        enabled ? "bg-indigo-600 dark:bg-indigo-500" : "bg-zinc-200 dark:bg-white/[0.12]"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-[18px]" : "translate-x-[3px]"
        }`}
      />
    </span>
  );
}

// ─── SECURITY SECTION ───────────────────────────────────────────────────────

function SecuritySection() {
  return (
    <section id="security">
      <SectionHeader
        title="Security"
        subtitle="Manage your password, connected accounts and active sessions."
      />

      <div className="mt-4 space-y-4">
        {/* Change Password */}
        <SettingsCard>
          <p className="mb-4 text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
            Change Password
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldText label="Current Password" type="password" defaultValue="" />
            <div className="hidden sm:block" />
            <FieldText label="New Password" type="password" defaultValue="" />
            <FieldText label="Confirm Password" type="password" defaultValue="" />
          </div>
          <div className="mt-6 flex justify-end border-t border-zinc-100 pt-5 dark:border-white/[0.05]">
            <button
              type="button"
              className="rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
            >
              Save Password
            </button>
          </div>
        </SettingsCard>

        {/* Connected Accounts */}
        <SettingsCard>
          <p className="mb-4 text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
            Connected Accounts
          </p>
          <div className="divide-y divide-zinc-100 dark:divide-white/[0.05]">
            {CONNECTED_ACCOUNTS.map((acc) => (
              <div key={acc.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400">
                    <ProviderIcon name={acc.name} />
                  </span>
                  <div>
                    <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                      {acc.name}
                    </p>
                    {acc.detail && (
                      <p className="text-[11.5px] text-zinc-400 dark:text-zinc-500">{acc.detail}</p>
                    )}
                  </div>
                </div>
                {acc.connected ? (
                  <span className="flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-[11.5px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Connected
                  </span>
                ) : (
                  <button
                    type="button"
                    className="rounded-lg border border-zinc-200/70 px-3 py-1.5 text-[12px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/[0.08] dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
                  >
                    Connect
                  </button>
                )}
              </div>
            ))}
          </div>
        </SettingsCard>

        {/* Active Sessions */}
        <SettingsCard>
          <p className="mb-4 text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
            Active Sessions
          </p>
          <div className="divide-y divide-zinc-100 dark:divide-white/[0.05]">
            {ACTIVE_SESSIONS.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400">
                    <DeviceIcon device={s.device} />
                  </span>
                  <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                    {s.device}
                  </p>
                </div>
                {s.current ? (
                  <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-[11.5px] font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                    {s.detail}
                  </span>
                ) : (
                  <span className="text-[11.5px] text-zinc-400 dark:text-zinc-500">{s.detail}</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-zinc-100 pt-5 dark:border-white/[0.05]">
            <button
              type="button"
              className="rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
            >
              Sign Out All Other Devices
            </button>
          </div>
        </SettingsCard>
      </div>
    </section>
  );
}

// ─── DANGER ZONE SECTION ────────────────────────────────────────────────────

function DangerZoneSection() {
  return (
    <section id="danger">
      <SectionHeader
        title="Danger Zone"
        subtitle="Irreversible and destructive actions."
      />

      <div className="mt-4">
        <div className="relative overflow-hidden rounded-2xl border border-red-200/70 bg-red-50/50 p-5 dark:border-red-500/20 dark:bg-red-500/[0.04] sm:p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-[13.5px] font-semibold text-red-700 dark:text-red-400">
                Delete Account
              </p>
              <p className="mt-1 text-[12.5px] text-red-600/80 dark:text-red-400/70">
                This action cannot be undone.
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-xl border border-red-300 bg-white px-4 py-2.5 text-[13px] font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-500/30 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-500/10"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ICONS ─────────────────────────────────────────────────────────────────

function NavIcon({ name }) {
  const icons = {
    user: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    palette: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5"  r="0.6" fill="currentColor" stroke="none" />
        <circle cx="17.5" cy="10.5" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="8.5"  cy="7.5"  r="0.6" fill="currentColor" stroke="none" />
        <circle cx="6.5"  cy="12.5" r="0.6" fill="currentColor" stroke="none" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.65-.75 1.65-1.69 0-.43-.18-.83-.44-1.12-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.66h1.99c3.05 0 5.55-2.5 5.55-5.55C22 6.01 17.46 2 12 2Z" />
      </svg>
    ),
    bell: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    lock: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    alert: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        <line x1="12" y1="9"  x2="12"    y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  };
  return icons[name] || null;
}

function ThemeIcon({ name }) {
  if (name === "system") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="14" rx="2" />
        <line x1="8" y1="22" x2="16" y2="22" />
        <line x1="12" y1="18" x2="12" y2="22" />
      </svg>
    );
  }
  if (name === "light") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

function ProviderIcon({ name }) {
  if (name === "Google") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18Z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function DeviceIcon({ device }) {
  if (device.includes("iPhone")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </svg>
    );
  }
  if (device.includes("MacBook")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="12" rx="1" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}