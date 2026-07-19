import { NavLink } from "react-router-dom";


export default function Landing() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FAFAF9] text-zinc-900 transition-colors dark:bg-[#0E0F13] dark:text-zinc-100">
      {/* ---------- Ambient background (shared with auth pages) ---------- */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-indigo-200/30 blur-[120px] dark:bg-indigo-500/[0.08]" />
        <div className="absolute bottom-[-10rem] right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-violet-200/25 blur-[120px] dark:bg-violet-500/[0.07]" />
        <div className="absolute left-[14%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-indigo-300/[0.10] blur-[100px] dark:bg-indigo-400/[0.05]" />
        <div className="absolute right-[10%] top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-violet-300/[0.08] blur-[110px] dark:bg-violet-400/[0.045]" />
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

      {/* All content sits above the fixed background */}
      <div className="relative z-10">
        {/* ================================================================
            NAVIGATION
        ================================================================= */}
        <nav className="sticky top-0 z-50 border-b border-zinc-200/60 bg-[#FAFAF9]/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#0E0F13]/80">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <CollabrixMark />
              <span className="text-[17px] font-semibold tracking-tight">
                Collabrix
              </span>
            </div>

            {/* Center links — hidden on mobile */}
            <div className="hidden items-center gap-8 md:flex">
              {["Product", "Features", "Pricing", "Resources"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[14px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <NavLink
                to={"login"}
                className="hidden text-[14px] font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 sm:block"
              >
                Sign In
              </NavLink>
              <NavLink
                
                to={"register"}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-[13.5px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.4)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.5)] active:translate-y-0 dark:from-indigo-500 dark:to-violet-500 dark:shadow-[0_2px_12px_-3px_rgba(129,140,248,0.35)]"
              >
                Get Started
              </NavLink>
            </div>
          </div>
        </nav>

        {/* ================================================================
            HERO SECTION
        ================================================================= */}
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:gap-12">
            {/* Left — Copy */}
            <div className="flex-1 text-center lg:pt-4 lg:text-left">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/60 px-3.5 py-1.5 text-[12.5px] font-medium text-zinc-500 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Now in public beta
              </div>

              <h1 className="text-[40px] font-semibold leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[52px] lg:text-[56px]">
                The workspace that
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
                  thinks with your team.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-lg text-[16px] leading-relaxed text-zinc-500 dark:text-zinc-400 lg:mx-0 lg:text-[17px]">
                Collabrix understands your projects, conversations, tasks, and
                context — so your team spends less time repeating themselves and
                more time building what matters.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <NavLink
                  to={"register"}
                  className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-[14px] font-semibold text-white shadow-[0_4px_20px_-4px_rgba(79,70,229,0.4)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_10px_30px_-6px_rgba(79,70,229,0.55)] active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500 dark:shadow-[0_4px_20px_-4px_rgba(129,140,248,0.4)] dark:hover:shadow-[0_10px_30px_-6px_rgba(129,140,248,0.55)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                  <span className="relative">Get Started</span>
                </NavLink>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/60 px-6 py-3 text-[14px] font-semibold text-zinc-700 backdrop-blur-sm transition-all duration-200 hover:-translate-y-px hover:border-zinc-300 hover:shadow-[0_6px_16px_-6px_rgba(24,24,27,0.12)] active:translate-y-0 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-white/[0.14] dark:hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.4)]"
                >
                  <PlayIcon />
                  Watch Demo
                </a>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex flex-col items-center gap-3 lg:items-start">
                <div className="flex -space-x-2">
                  {[
                    "bg-indigo-500",
                    "bg-violet-500",
                    "bg-emerald-500",
                    "bg-amber-500",
                    "bg-rose-500",
                  ].map((bg, i) => (
                    <div
                      key={i}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#FAFAF9] text-[11px] font-bold text-white dark:border-[#0E0F13] ${bg}`}
                    >
                      {["S", "M", "A", "R", "K"][i]}
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-zinc-400 dark:text-zinc-500">
                  Trusted by <span className="font-medium text-zinc-600 dark:text-zinc-300">2,400+</span> teams worldwide
                </p>
              </div>
            </div>

            {/* Right — Product Preview */}
            <div className="w-full max-w-xl flex-1 lg:max-w-none">
              <WorkspacePreview />
            </div>
          </div>
        </section>

        {/* ================================================================
            EVERYTHING CONNECTED
        ================================================================= */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="text-center">
            <p className="text-[13px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Unified workspace
            </p>
            <h2 className="mt-3 text-[32px] font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[40px]">
              Everything connected.{" "}
              <span className="text-zinc-400 dark:text-zinc-500">Nothing lost.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              In Collabrix, your conversations become tasks, tasks connect to
              projects, documents retain context, and AI understands how
              everything relates.
            </p>
          </div>

          {/* Connection cards */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <ChatIcon />,
                title: "Conversations → Tasks",
                desc: "Decisions made in chat automatically surface as actionable items.",
              },
              {
                icon: <LinkIcon />,
                title: "Tasks → Projects",
                desc: "Every task is tied to a project with full traceability.",
              },
              {
                icon: <DocIcon />,
                title: "Documents → Context",
                desc: "Docs remember where they came from and who referenced them.",
              },
              {
                icon: <BrainIcon />,
                title: "AI → Relationships",
                desc: "The assistant maps connections across your entire workspace.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300/80 hover:shadow-[0_8px_30px_-12px_rgba(24,24,27,0.12)] dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12] dark:hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  {card.icon}
                </div>
                <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                  {card.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
            FEATURE SECTION — Three Core Features
        ================================================================= */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="text-center">
            <p className="text-[13px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Core capabilities
            </p>
            <h2 className="mt-3 text-[32px] font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[40px]">
              Built for how teams actually work
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              Three pillars that transform how your team communicates, organizes,
              and ships.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <EyeIcon />,
                label: "Understand",
                title: "Context-aware intelligence",
                desc: "AI understands the context behind every conversation, task, and document — not just keywords, but meaning.",
                accent: "from-indigo-600 to-indigo-400",
                accentBg: "bg-indigo-50 dark:bg-indigo-500/10",
                accentText: "text-indigo-600 dark:text-indigo-400",
              },
              {
                icon: <LayersIcon />,
                label: "Organize",
                title: "Structure from conversation",
                desc: "Turn scattered discussions into organized tasks, linked documents, and clear project timelines — automatically.",
                accent: "from-violet-600 to-violet-400",
                accentBg: "bg-violet-50 dark:bg-violet-500/10",
                accentText: "text-violet-600 dark:text-violet-400",
              },
              {
                icon: <ZapIcon />,
                label: "Execute",
                title: "Intelligent acceleration",
                desc: "AI assists with drafting, summarizing, prioritizing, and connecting — helping your team move faster with less friction.",
                accent: "from-emerald-600 to-emerald-400",
                accentBg: "bg-emerald-50 dark:bg-emerald-500/10",
                accentText: "text-emerald-600 dark:text-emerald-400",
              },
            ].map((feature) => (
              <div
                key={feature.label}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/60 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_rgba(24,24,27,0.12)] dark:border-white/[0.06] dark:bg-white/[0.025] dark:hover:border-white/[0.1] dark:hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />
                <div
                  className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${feature.accentBg} ${feature.accentText}`}
                >
                  {feature.icon}
                </div>
                <p
                  className={`text-[12px] font-bold uppercase tracking-widest ${feature.accentText}`}
                >
                  {feature.label}
                </p>
                <h3 className="mt-2 text-[18px] font-semibold text-zinc-900 dark:text-zinc-100">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
            AI DEMO SECTION
        ================================================================= */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="text-center">
            <p className="text-[13px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              AI in action
            </p>
            <h2 className="mt-3 text-[32px] font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[40px]">
              Your workspace remembers everything
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              Ask questions in natural language. Collabrix connects the dots
              across conversations, tasks, and documents.
            </p>
          </div>

          {/* AI Chat Interface Mock */}
          <div className="mx-auto mt-14 max-w-2xl">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 shadow-[0_8px_40px_-12px_rgba(24,24,27,0.10)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/10 to-transparent dark:via-white/20" />

              {/* Header */}
              <div className="flex items-center gap-3 border-b border-zinc-200/60 px-6 py-4 dark:border-white/[0.06]">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500">
                  <SparkleIcon />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                    Collabrix AI
                  </p>
                  <p className="text-[12px] text-zinc-400 dark:text-zinc-500">
                    Workspace assistant
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[12px] text-emerald-600 dark:text-emerald-400">
                    Online
                  </span>
                </div>
              </div>

              {/* Chat body */}
              <div className="space-y-5 px-6 py-6">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-sm rounded-2xl rounded-br-md bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-[14px] leading-relaxed text-white dark:from-indigo-500 dark:to-violet-500">
                    What did we decide in yesterday&apos;s meeting?
                  </div>
                </div>

                {/* AI response */}
                <div className="flex gap-3">
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-500/10">
                    <SparkleIconSmall />
                  </div>
                  <div className="max-w-md space-y-3 rounded-2xl rounded-bl-md border border-zinc-200/60 bg-zinc-50/60 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
                    <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                      In yesterday&apos;s product sync, the team agreed to:
                    </p>
                    <ul className="space-y-1.5 text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60 dark:bg-indigo-400/60" />
                        Launch user onboarding flow by next Tuesday
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60 dark:bg-indigo-400/60" />
                        Assign the API documentation to Sarah
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60 dark:bg-indigo-400/60" />
                        Defer analytics dashboard to v2.1
                      </li>
                    </ul>
                    {/* Linked items */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        { label: "3 tasks linked", icon: <CheckSquareIconTiny /> },
                        { label: "2 docs referenced", icon: <DocIconTiny /> },
                      ].map((tag) => (
                        <span
                          key={tag.label}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/60 bg-white/80 px-2.5 py-1 text-[12px] font-medium text-zinc-500 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-zinc-400"
                        >
                          {tag.icon}
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Input bar */}
              <div className="border-t border-zinc-200/60 px-6 py-4 dark:border-white/[0.06]">
                <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-2.5 dark:border-white/[0.07] dark:bg-white/[0.03]">
                  <span className="flex-1 text-[14px] text-zinc-400 dark:text-zinc-500">
                    Ask anything about your workspace…
                  </span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-500 dark:to-violet-500">
                    <ArrowUpIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            FINAL CTA
        ================================================================= */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/50 px-8 py-16 text-center backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.02] sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />
            {/* Ambient glow inside CTA */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-60 w-96 -translate-x-1/2 rounded-full bg-indigo-200/20 blur-[100px] dark:bg-indigo-500/[0.06]" />

            <div className="relative">
              <h2 className="text-[32px] font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[40px]">
                Ready to stop repeating yourself?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                Let your workspace understand the context. Your team will thank
                you.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#"
                  className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_4px_20px_-4px_rgba(79,70,229,0.4)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_10px_30px_-6px_rgba(79,70,229,0.55)] active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500 dark:shadow-[0_4px_20px_-4px_rgba(129,140,248,0.4)] dark:hover:shadow-[0_10px_30px_-6px_rgba(129,140,248,0.55)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                  <span className="relative">Start Free</span>
                </a>
                <a
                  href="#"
                  className="rounded-xl border border-zinc-200 bg-white/60 px-7 py-3.5 text-[14.5px] font-semibold text-zinc-700 backdrop-blur-sm transition-all duration-200 hover:-translate-y-px hover:border-zinc-300 hover:shadow-[0_6px_16px_-6px_rgba(24,24,27,0.12)] active:translate-y-0 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-white/[0.14] dark:hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.4)]"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            FOOTER
        ================================================================= */}
        <footer className="border-t border-zinc-200/60 dark:border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
              {/* Brand column */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2.5">
                  <CollabrixMark />
                  <span className="text-[17px] font-semibold tracking-tight">
                    Collabrix
                  </span>
                </div>
                <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                  The AI-powered workspace that understands how your team works. 
                  Built for modern teams who value clarity and speed.
                </p>
              </div>

              {/* Link columns */}
              {[
                {
                  heading: "Product",
                  links: ["Features", "Pricing", "Integrations", "Changelog"],
                },
                {
                  heading: "Company",
                  links: ["About", "Blog", "Careers", "Contact"],
                },
                {
                  heading: "Legal",
                  links: ["Privacy", "Terms", "Security", "Status"],
                },
              ].map((col) => (
                <div key={col.heading}>
                  <p className="text-[13px] font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
                    {col.heading}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-[14px] text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/60 pt-8 dark:border-white/[0.06] sm:flex-row">
              <p className="text-[13px] text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Collabrix. All rights reserved.
              </p>
              <div className="flex items-center gap-5">
                {["Twitter", "GitHub", "LinkedIn"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-[13px] text-zinc-400 transition-colors hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* =====================================================
   Sub-components
====================================================== */

/* ---- Workspace Preview ---- */
/* A mock dashboard that resembles an actual product UI with tasks,
   conversations, documents, AI assistant, and project overview. */
function WorkspacePreview() {
  return (
    <div className="relative">
      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-b from-indigo-200/20 via-transparent to-violet-200/10 blur-2xl dark:from-indigo-500/[0.06] dark:to-violet-500/[0.03]" />

      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/80 shadow-[0_20px_60px_-15px_rgba(24,24,27,0.15)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#12131A]/90 dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/10 to-transparent dark:via-white/20" />

        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-zinc-200/60 px-5 py-3 dark:border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
            <span className="text-[12px] font-medium text-zinc-400 dark:text-zinc-500">
              Collabrix — Product Launch
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {["bg-indigo-500", "bg-emerald-500", "bg-amber-500"].map((c, i) => (
                <div
                  key={i}
                  className={`h-5 w-5 rounded-full border border-white text-[8px] font-bold text-white flex items-center justify-center dark:border-[#12131A] ${c}`}
                >
                  {["A", "S", "M"][i]}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="flex">
          {/* Sidebar */}
          <div className="hidden w-44 shrink-0 border-r border-zinc-200/60 px-3 py-4 dark:border-white/[0.06] sm:block">
            {[
              { label: "Overview", active: true },
              { label: "Tasks", active: false },
              { label: "Chat", active: false },
              { label: "Documents", active: false },
              { label: "AI Assistant", active: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`mb-0.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium ${
                  item.active
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                    : "text-zinc-500 dark:text-zinc-500"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-4">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: "Tasks", value: "24", sub: "6 due today", color: "text-indigo-600 dark:text-indigo-400" },
                { label: "Threads", value: "12", sub: "3 unread", color: "text-violet-600 dark:text-violet-400" },
                { label: "Docs", value: "18", sub: "2 updated", color: "text-emerald-600 dark:text-emerald-400" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-zinc-200/60 bg-zinc-50/50 px-3 py-2.5 dark:border-white/[0.05] dark:bg-white/[0.02]"
                >
                  <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    {stat.label}
                  </p>
                  <p className={`text-[20px] font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Task list */}
            <div className="mt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Recent tasks
              </p>
              {[
                { task: "Design onboarding flow", status: "In Progress", statusColor: "bg-amber-500" },
                { task: "Write API documentation", status: "Review", statusColor: "bg-indigo-500" },
                { task: "Set up CI/CD pipeline", status: "Done", statusColor: "bg-emerald-500" },
              ].map((item) => (
                <div
                  key={item.task}
                  className="flex items-center justify-between border-b border-zinc-100 py-2 last:border-0 dark:border-white/[0.04]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2 w-2 rounded-full ${item.statusColor}`} />
                    <span className="text-[12.5px] text-zinc-700 dark:text-zinc-300">
                      {item.task}
                    </span>
                  </div>
                  <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-white/[0.05] dark:text-zinc-400">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            {/* AI suggestion bar */}
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-indigo-200/60 bg-indigo-50/50 px-3 py-2 dark:border-indigo-500/10 dark:bg-indigo-500/[0.04]">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 dark:bg-indigo-500/20">
                <SparkleIconTiny />
              </div>
              <p className="text-[11.5px] text-indigo-700 dark:text-indigo-300">
                <span className="font-medium">AI:</span> Sarah&apos;s doc
                references 3 tasks from the meeting. Want me to link them?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Brand Mark ---- */
function CollabrixMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="10" cy="13" r="7" className="fill-indigo-500/80 dark:fill-indigo-400/80" />
      <circle cx="17" cy="10" r="7" className="fill-violet-400/65 dark:fill-violet-300/65" />
    </svg>
  );
}

/* ---- Icon Set ---- */

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="6 3 20 12 6 21 6 3" fill="currentColor" opacity="0.15" stroke="currentColor" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0-4 4 4 4 0 0 0 3 3.87V18a4 4 0 0 0 8 0h0a4 4 0 0 0 4-4 4 4 0 0 0-4-4V6a4 4 0 0 0-3-3.87" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}

function SparkleIconSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-indigo-500 dark:text-indigo-400">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}

function SparkleIconTiny() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-500 dark:text-indigo-400">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

function CheckSquareIconTiny() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function DocIconTiny() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
