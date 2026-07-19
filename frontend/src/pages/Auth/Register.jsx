// Register.jsx
// Collabrix — presentational registration screen. UI only: no auth,
// validation, state, routing, or event handling.
//
// Theme: styled entirely with Tailwind's `dark:` variant. This assumes the
// host app toggles a `dark` class on a parent element (e.g. <html>) based on
// the user's system preference — this component does not manage that class
// itself, and includes no theme-toggle UI.
//
// Shares its visual language byte-for-byte with Login.jsx (background,
// constellation, glass card shell, inputs, button) — only the card's
// content differs.

import { NavLink } from "react-router-dom";

export default function Register() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FAFAF9] text-zinc-900 transition-colors dark:bg-[#0E0F13] dark:text-zinc-100">
      {/* ---------- Ambient background ---------- */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-indigo-200/30 blur-[120px] dark:bg-indigo-500/[0.08]" />
        <div className="absolute bottom-[-10rem] right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-violet-200/25 blur-[120px] dark:bg-violet-500/[0.07]" />
        {/* extremely subtle depth glows — sit specifically behind the constellation and the card */}
        <div className="absolute left-[14%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-indigo-300/[0.10] blur-[100px] dark:bg-indigo-400/[0.05]" />
        <div className="absolute right-[10%] top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-violet-300/[0.08] blur-[110px] dark:bg-violet-400/[0.045]" />
        {/* dotted grid — uses currentColor so it adapts automatically per theme */}
        <div
          className="absolute inset-0 text-zinc-900/[0.05] dark:text-zinc-100/[0.05]"
          style={{
            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 90%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1280px] flex-col md:flex-row">
        {/* =====================================================
            LEFT — Quiet brand statement (hidden on mobile)
        ====================================================== */}
        <section className="relative hidden w-1/2 flex-col px-16 py-14 md:flex">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <CollabrixMark />
            <span className="text-[17px] font-semibold tracking-tight">
              Collabrix
            </span>
          </div>

          {/* Centered punchline + minimal AI visual */}
          <div className="flex flex-1 flex-col items-start justify-center">
            <p className="max-w-sm text-[34px] font-semibold leading-[1.15] tracking-tight text-zinc-800 dark:text-zinc-50">
              Where ideas
              <br />
              think together.
            </p>

            {/* Minimal AI-inspired visual — contained, gentle, low-noise */}
            <div className="relative mt-9 h-44 w-full max-w-sm">
              <AmbientMesh />
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT — Authentication card (primary focus)
        ====================================================== */}
        <section className="flex w-full flex-1 items-center justify-center px-6 py-12 md:w-1/2 md:px-12">
          <div className="w-full max-w-[368px]">
            {/* Mobile-only compact brand */}
            <div className="mb-8 flex items-center gap-2.5 md:hidden">
              <CollabrixMark />
              <span className="text-[17px] font-semibold tracking-tight">
                Collabrix
              </span>
            </div>

            {/* Glass card */}
            <div className="relative">
              <div className="absolute -inset-px rounded-[18px] bg-gradient-to-b from-zinc-900/[0.04] via-transparent to-transparent dark:from-white/[0.08] dark:via-white/[0.02]" />

              <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-7 shadow-[0_8px_30px_-12px_rgba(24,24,27,0.12)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_10px_36px_-12px_rgba(24,24,27,0.16)] dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.55)] dark:hover:shadow-[0_24px_70px_-15px_rgba(0,0,0,0.6)] sm:p-8">
                {/* premium top highlight catching the light */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/10 to-transparent dark:via-white/20" />

                {/* Welcome heading — clear second step in the visual hierarchy */}
                <h1 className="text-[24px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Create your account
                </h1>
                <p className="mt-1.5 text-[13.5px] text-zinc-500 dark:text-zinc-400">
                  Start collaborating with your team in minutes.
                </p>

                {/* Form (presentational only — no submit/validation logic) */}
                <div className="mt-5 space-y-2.5">
                  <Field
                    label="Full Name"
                    type="text"
                    placeholder="Ada Lovelace"
                    icon={<UserIcon />}
                  />
                  <Field
                    label="Email Address"
                    type="email"
                    placeholder="you@company.com"
                    icon={<MailIcon />}
                  />
                  <Field
                    label="Password"
                    type="password"
                    placeholder="••••••••••"
                    icon={<LockIcon />}
                  />
                  <Field
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••••"
                    icon={<LockIcon />}
                  />

                  <button
                    type="button"
                    className="group/btn relative mt-1 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-[14px] font-semibold text-white shadow-[0_4px_20px_-4px_rgba(79,70,229,0.4)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_10px_30px_-6px_rgba(79,70,229,0.55)] active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500 dark:shadow-[0_4px_20px_-4px_rgba(129,140,248,0.4)] dark:hover:shadow-[0_10px_30px_-6px_rgba(129,140,248,0.55)]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                    <span className="relative">Create Account</span>
                  </button>
                </div>

                {/* Divider — labeled, leads into social auth */}
                <div className="mt-5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-zinc-200/80 dark:bg-white/10" />
                  <span className="text-[12px] text-zinc-400 dark:text-zinc-500">
                    Or continue with
                  </span>
                  <span className="h-px flex-1 bg-zinc-200/80 dark:bg-white/10" />
                </div>

                {/* Social auth — visual only, no OAuth wiring */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <OAuthButton icon={<GoogleIcon />} label="Google" />
                  <OAuthButton icon={<GithubIcon />} label="GitHub" />
                </div>

                {/* Footer */}
                <p className="mt-5 text-center text-[13.5px] text-zinc-500 dark:text-zinc-400">
                  Already have an account?{" "}
                  <NavLink
                    to={"/login"}
                    className="font-medium text-zinc-900 transition-colors hover:text-indigo-600 dark:text-zinc-100 dark:hover:text-indigo-400"
                  >
                    Sign in
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* =====================================================
   Sub-components
====================================================== */

/* Social auth buttons — sized to match the form inputs, styled from the
   same neutral surface system so they sit quietly alongside the form
   rather than competing with the primary action. */
function OAuthButton({ icon, label }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-100/60 py-2.5 text-[13.5px] font-medium text-zinc-700 transition-all duration-200 hover:-translate-y-px hover:border-zinc-300 hover:bg-zinc-100 hover:shadow-[0_6px_16px_-8px_rgba(24,24,27,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/30 active:translate-y-0 active:scale-[0.985] dark:border-white/[0.07] dark:bg-[#14151D]/60 dark:text-zinc-300 dark:hover:border-white/[0.14] dark:hover:bg-[#14151D]/90 dark:hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.55)] dark:focus-visible:ring-indigo-400/25"
    >
      <span className="text-zinc-500 dark:text-zinc-400">{icon}</span>
      {label}
    </button>
  );
}

function Field({ label, type, placeholder, icon }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-zinc-600 dark:text-zinc-300">
        {label}
      </span>
      <span className="group flex items-center gap-2.5 rounded-2xl border border-zinc-200 bg-zinc-100/60 px-3.5 py-2.5 transition-all duration-200 focus-within:border-indigo-400/60 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(99,102,241,0.10)] dark:border-white/[0.07] dark:bg-[#14151D]/60 dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] dark:focus-within:border-indigo-400/50 dark:focus-within:bg-[#14151D]/80 dark:focus-within:shadow-[inset_0_1px_2px_rgba(0,0,0,0.25),0_0_0_4px_rgba(129,140,248,0.16)]">
        <span className="text-zinc-400 transition-colors group-focus-within:text-indigo-500 dark:text-zinc-500 dark:group-focus-within:text-indigo-400">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-500/70"
        />
      </span>
    </label>
  );
}

/* Minimal AI-inspired visual — a hub-and-spoke node network. The center
   node reads as a quiet "intelligence" connecting the surrounding nodes
   (collaborators), with one very slow orbit ring for a touch of life.
   Colors ride on `currentColor` via Tailwind text classes so the same
   markup adapts to both themes. */
function AmbientMesh() {
  const hub = { x: 150, y: 75 };
  const nodes = [
    { x: 35, y: 35 }, { x: 30, y: 110 }, { x: 95, y: 140 },
    { x: 205, y: 140 }, { x: 270, y: 110 }, { x: 265, y: 35 },
  ];

  return (
    <>
      {/* soft halo behind the hub */}
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/[0.12] blur-2xl dark:bg-indigo-300/[0.08]" />

      <svg viewBox="0 0 300 150" className="relative h-full w-full" fill="none">
        {/* very slow orbit ring around the hub — barely perceptible motion */}
        <g
          className="origin-center text-indigo-400/25 dark:text-indigo-300/15 animate-[spin_180s_linear_infinite]"
          style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}
        >
          <circle cx={hub.x} cy={hub.y} r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="1 8" />
        </g>

        {/* spokes connecting the hub to each node */}
        <g className="text-indigo-400/35 dark:text-indigo-300/20">
          {nodes.map((n, i) => (
            <line key={i} x1={hub.x} y1={hub.y} x2={n.x} y2={n.y} stroke="currentColor" strokeWidth="1" />
          ))}
        </g>

        {/* hub node */}
        <circle
          cx={hub.x}
          cy={hub.y}
          r="4.5"
          className="animate-pulse fill-indigo-500/80 dark:fill-indigo-300/70"
          style={{ animationDuration: "5s" }}
        />

        {/* peripheral nodes */}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={2.5}
            className={
              "animate-pulse " +
              (i % 2 === 0
                ? "fill-violet-400/70 dark:fill-violet-300/50"
                : "fill-indigo-400/70 dark:fill-indigo-300/50")
            }
            style={{ animationDuration: `${4 + (i % 4)}s`, animationDelay: `${i * 0.35}s` }}
          />
        ))}
      </svg>
    </>
  );
}

function CollabrixMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="10" cy="13" r="7" className="fill-indigo-500/80 dark:fill-indigo-400/80" />
      <circle cx="17" cy="10" r="7" className="fill-violet-400/65 dark:fill-violet-300/65" />
    </svg>
  );
}

/* ---------- Inline icon set (lightweight, no external deps) ---------- */

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.7-3.6 3.6-6 7-6s6.3 2.4 7 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4.5" y="11" width="15" height="9.5" rx="2.2" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" strokeLinecap="round" />
    </svg>
  );
}


function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.35 4.68-4.58 4.93.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}