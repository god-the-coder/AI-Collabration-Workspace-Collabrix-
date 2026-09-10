import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSettingsStore from "../../store/settingsStore";
import useAuthStore from "../../store/authStore";
import { extractApiError } from "../../utils/apiError";
import Avatar from "../../components/common/Avatar";

const EMAIL_NOTIFICATIONS = [
  { field: "email_task_assigned",         label: "Task Assigned",        description: "Get notified when a task is assigned to you." },
  { field: "email_mentions",              label: "Mentions",             description: "Get notified when someone mentions you." },
  { field: "email_workspace_invitations", label: "Workspace Invitations",description: "Get notified when you're invited to a workspace." },
  { field: "email_marketing",             label: "Marketing Emails",     description: "Occasional product updates and announcements." },
];

const INAPP_NOTIFICATIONS = [
  { field: "inapp_mentions",   label: "Mentions",   description: "Show in-app alerts when you're mentioned." },
  { field: "inapp_tasks",      label: "Tasks",      description: "Show in-app alerts for task assignments and updates." },
  { field: "inapp_projects",   label: "Projects",   description: "Show in-app alerts for project activity." },
  { field: "inapp_workspaces", label: "Workspaces", description: "Show in-app alerts for workspace activity." },
];

const THEME_OPTIONS = [
  { id: "SYSTEM", label: "System", description: "Match your device setting", icon: "system" },
  { id: "LIGHT",  label: "Light",  description: "Bright background",          icon: "light"  },
  { id: "DARK",   label: "Dark",   description: "Easy on the eyes",           icon: "dark"   },
];

const SETTINGS_NAV = [
  { id: "profile",       label: "Profile",       icon: "user",    danger: false },
  { id: "appearance",    label: "Appearance",    icon: "palette", danger: false },
  { id: "notifications", label: "Notifications", icon: "bell",    danger: false },
  { id: "security",      label: "Security",      icon: "lock",    danger: false },
  { id: "danger",        label: "Danger Zone",   icon: "alert",   danger: true  },
];

const formatMemberSince = (isoString) => {
  if (!isoString) return "—";
  try {
    return new Date(isoString).toLocaleDateString(undefined, { month: "long", year: "numeric" });
  } catch {
    return "—";
  }
};

const formatLastActive = (isoString) => {
  if (!isoString) return "—";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "—";
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function Settings() {
  const {
    profile,
    appearance,
    notifications,
    security,
    activeSessions,
    isLoading,
    isLoaded,
    error,
    fetchSettings,
  } = useSettingsStore();

  const [activeNav, setActiveNav] = useState("profile");

  useEffect(() => {
    if (!isLoaded) {
      fetchSettings().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavClick = (id) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (isLoading && !isLoaded) {
    return (
      <div className="mx-auto max-w-[1100px] px-6 py-6 lg:px-8">
        <p className="text-[13.5px] text-zinc-500 dark:text-zinc-400">Loading settings…</p>
      </div>
    );
  }

  if (error && !isLoaded) {
    return (
      <div className="mx-auto max-w-[1100px] px-6 py-6 lg:px-8">
        <p className="text-[13.5px] text-red-500 dark:text-red-400">
          {extractApiError(error, "Failed to load settings.")}
        </p>
      </div>
    );
  }

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
        <SettingsNav activeNav={activeNav} onNavClick={handleNavClick} />

        <div className="min-w-0 flex-1 space-y-8">
          <ProfileSection profile={profile} />
          <AppearanceSection appearance={appearance} />
          <NotificationsSection notifications={notifications} />
          <SecuritySection security={security} activeSessions={activeSessions} />
          <DangerZoneSection />
        </div>
      </div>
    </div>
  );
}

// ─── LEFT NAV ──────────────────────────────────────────────────────────────

function SettingsNav({ activeNav, onNavClick }) {
  return (
    <aside className="shrink-0 lg:sticky lg:top-[88px] lg:w-56">
      <nav className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-2 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

        <div className="space-y-0.5">
          {SETTINGS_NAV.map((item) => {
            const isActive = item.id === activeNav;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavClick(item.id)}
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

function ProfileSection({ profile }) {
  const updateProfile = useSettingsStore((state) => state.updateProfile);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const savedFullName = profile ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim() : "";

  useEffect(() => {
    if (profile) {
      setFullName(savedFullName);
      setEmail(profile.email || "");
      setAvatarFile(null);
      setAvatarPreview(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  if (!profile) return null;

  const isDirty = fullName !== savedFullName || email !== (profile.email || "") || !!avatarFile;

  const handleAvatarSelect = (file) => {
    if (!file) return;
    setAvatarFile(file);
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!isDirty) return;

    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {};

      if (fullName !== savedFullName) {
        const [first, ...rest] = fullName.trim().split(/\s+/);
        payload.first_name = first || "";
        payload.last_name = rest.join(" ");
      }

      if (email !== profile.email) payload.email = email;
      if (avatarFile) payload.avatar = avatarFile;

      await updateProfile(payload);
      setSuccess(true);
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (err) {
      setError(extractApiError(err, "Failed to update profile."));
    } finally {
      setIsSaving(false);
    }
  };

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
            <Avatar
              src={avatarPreview || profile.avatar}
              initials={profile.initials}
              name={savedFullName || profile.username}
              size="lg"
              rounded="rounded-full"
            />
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => handleAvatarSelect(e.target.files?.[0] || null)}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
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
            <FieldText label="Full Name" value={fullName} onChange={setFullName} />
            <FieldText label="Email Address" value={email} onChange={setEmail} type="email" />
            <FieldReadOnly label="Username" value={profile.username} />
            <FieldReadOnly label="Member Since" value={formatMemberSince(profile.date_joined)} />
          </div>

          {error && (
            <p className="mt-4 text-[12.5px] text-red-500 dark:text-red-400">{error}</p>
          )}
          {success && !isDirty && (
            <p className="mt-4 text-[12.5px] text-emerald-600 dark:text-emerald-400">Profile updated.</p>
          )}

          {/* Save */}
          <div className="mt-6 flex justify-end border-t border-zinc-100 pt-5 dark:border-white/[0.05]">
            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty || isSaving}
              className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] active:translate-y-0 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60 dark:from-indigo-500 dark:to-violet-500"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
              <span className="relative">{isSaving ? "Saving…" : "Save Changes"}</span>
            </button>
          </div>
        </SettingsCard>
      </div>
    </section>
  );
}

function FieldText({ label, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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

function AppearanceSection({ appearance }) {
  const updateAppearance = useSettingsStore((state) => state.updateAppearance);
  const [isSaving, setIsSaving] = useState(false);

  if (!appearance) return null;

  const handleSelect = async (themeId) => {
    if (themeId === appearance.theme || isSaving) return;
    setIsSaving(true);
    try {
      await updateAppearance(themeId);
    } catch {
      // updateAppearance already rolls back optimistic state on failure
    } finally {
      setIsSaving(false);
    }
  };

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
            {THEME_OPTIONS.map((opt) => {
              const isSelected = opt.id === appearance.theme;
              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleSelect(opt.id)}
                  className={`relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-colors disabled:cursor-not-allowed ${
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

function NotificationsSection({ notifications }) {
  const updateNotifications = useSettingsStore((state) => state.updateNotifications);

  if (!notifications) return null;

  const handleToggle = (field) => {
    updateNotifications(field, !notifications[field]).catch(() => {});
  };

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
              <ToggleRow
                key={item.field}
                item={item}
                enabled={!!notifications[item.field]}
                onToggle={() => handleToggle(item.field)}
              />
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
              <ToggleRow
                key={item.field}
                item={item}
                enabled={!!notifications[item.field]}
                onToggle={() => handleToggle(item.field)}
              />
            ))}
          </div>
        </SettingsCard>
      </div>
    </section>
  );
}

function ToggleRow({ item, enabled, onToggle }) {
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
      <ToggleSwitch enabled={enabled} onToggle={onToggle} label={item.label} />
    </div>
  );
}

function ToggleSwitch({ enabled, onToggle, label }) {
  return (
    <span
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
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

function SecuritySection({ security, activeSessions }) {
  return (
    <section id="security">
      <SectionHeader
        title="Security"
        subtitle="Manage your password, connected accounts and active sessions."
      />

      <div className="mt-4 space-y-4">
        <ChangePasswordCard />
        <ConnectedAccountsCard security={security} />
        <ActiveSessionsCard activeSessions={activeSessions} />
      </div>
    </section>
  );
}

function ChangePasswordCard() {
  const updatePassword = useSettingsStore((state) => state.updatePassword);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setError(null);
    setSuccess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setIsSaving(true);
    try {
      await updatePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess(true);
    } catch (err) {
      setError(extractApiError(err, "Failed to update password."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsCard>
      <p className="mb-4 text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
        Change Password
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldText label="Current Password" type="password" value={currentPassword} onChange={setCurrentPassword} />
        <div className="hidden sm:block" />
        <FieldText label="New Password" type="password" value={newPassword} onChange={setNewPassword} />
        <FieldText label="Confirm Password" type="password" value={confirmPassword} onChange={setConfirmPassword} />
      </div>

      {error && <p className="mt-4 text-[12.5px] text-red-500 dark:text-red-400">{error}</p>}
      {success && <p className="mt-4 text-[12.5px] text-emerald-600 dark:text-emerald-400">Password updated successfully.</p>}

      <div className="mt-6 flex justify-end border-t border-zinc-100 pt-5 dark:border-white/[0.05]">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
        >
          {isSaving ? "Saving…" : "Save Password"}
        </button>
      </div>
    </SettingsCard>
  );
}

function ConnectedAccountsCard({ security }) {
  const accounts = security?.connected_accounts || [];

  return (
    <SettingsCard>
      <p className="mb-4 text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
        Connected Accounts
      </p>
      <div className="divide-y divide-zinc-100 dark:divide-white/[0.05]">
        {accounts.map((acc) => {
          const label = acc.provider === "GOOGLE" ? "Google" : acc.provider === "GITHUB" ? "GitHub" : acc.provider;
          return (
            <div key={acc.provider} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400">
                  <ProviderIcon name={label} />
                </span>
                <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">{label}</p>
              </div>
              {acc.connected ? (
                <span className="flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-[11.5px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Connected
                </span>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Coming soon"
                  className="cursor-not-allowed rounded-lg border border-zinc-200/70 px-3 py-1.5 text-[12px] font-medium text-zinc-400 dark:border-white/[0.08] dark:text-zinc-500"
                >
                  Connect
                </button>
              )}
            </div>
          );
        })}
      </div>
    </SettingsCard>
  );
}

function ActiveSessionsCard({ activeSessions }) {
  const revokeAllOtherSessions = useSettingsStore((state) => state.revokeAllOtherSessions);
  const [isRevoking, setIsRevoking] = useState(false);
  const [error, setError] = useState(null);

  const sessions = activeSessions || [];
  const hasOtherSessions = sessions.some((s) => !s.current_device);

  const handleRevokeAll = async () => {
    setError(null);
    setIsRevoking(true);
    try {
      await revokeAllOtherSessions();
    } catch (err) {
      setError(extractApiError(err, "Failed to sign out other devices."));
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <SettingsCard>
      <p className="mb-4 text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
        Active Sessions
      </p>
      <div className="divide-y divide-zinc-100 dark:divide-white/[0.05]">
        {sessions.map((s) => (
          <div key={s.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400">
                <DeviceIcon device={s.device_name || ""} />
              </span>
              <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                {s.device_name} • {s.browser}
              </p>
            </div>
            {s.current_device ? (
              <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-[11.5px] font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                Current Device
              </span>
            ) : (
              <span className="text-[11.5px] text-zinc-400 dark:text-zinc-500">
                {formatLastActive(s.last_active_at)}
              </span>
            )}
          </div>
        ))}
        {sessions.length === 0 && (
          <p className="py-3 text-[12.5px] text-zinc-400 dark:text-zinc-500">No active sessions.</p>
        )}
      </div>

      {error && <p className="mt-4 text-[12.5px] text-red-500 dark:text-red-400">{error}</p>}

      <div className="mt-5 border-t border-zinc-100 pt-5 dark:border-white/[0.05]">
        <button
          type="button"
          onClick={handleRevokeAll}
          disabled={isRevoking || !hasOtherSessions}
          className="rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
        >
          {isRevoking ? "Signing out…" : "Sign Out All Other Devices"}
        </button>
      </div>
    </SettingsCard>
  );
}

// ─── DANGER ZONE SECTION ────────────────────────────────────────────────────

function DangerZoneSection() {
  const deleteAccount = useSettingsStore((state) => state.deleteAccount);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!password) {
      setError("Please enter your password to confirm.");
      return;
    }

    setError(null);
    setIsDeleting(true);

    try {
      await deleteAccount(password);
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      setError(extractApiError(err, "Failed to delete account."));
      setIsDeleting(false);
    }
  };

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
              onClick={() => setShowConfirm(true)}
              className="shrink-0 rounded-xl border border-red-300 bg-white px-4 py-2.5 text-[13px] font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-500/30 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-500/10"
            >
              Delete Account
            </button>
          </div>

          {showConfirm && (
            <div className="mt-5 border-t border-red-200/70 pt-5 dark:border-red-500/20">
              <p className="mb-3 text-[12.5px] text-red-700 dark:text-red-400">
                Enter your password to permanently delete your account.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="h-10 w-full rounded-xl border border-red-200 bg-white px-3.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-400/30 dark:border-red-500/20 dark:bg-white/[0.03] dark:text-zinc-100 sm:max-w-xs"
                />
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowConfirm(false);
                      setPassword("");
                      setError(null);
                    }}
                    disabled={isDeleting}
                    className="rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="rounded-xl bg-red-600 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isDeleting ? "Deleting…" : "Confirm Delete"}
                  </button>
                </div>
              </div>
              {error && <p className="mt-2 text-[12px] text-red-600 dark:text-red-400">{error}</p>}
            </div>
          )}
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
  if (device.includes("iOS") || device.includes("iPhone")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </svg>
    );
  }
  if (device.includes("Mac")) {
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
