import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FolderOpen,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Plus,
  Calendar,
  Lightbulb,
} from 'lucide-react';
import CreateProjectModal from './CreateProjectModal';
import { globalProjects } from '../../api/project.api';



const getMediaUrl = (url) => {
  if (!url) return null;
  const apiUrl = import.meta.env.VITE_API_URL;
  const baseUrl = apiUrl.replace(/\/api\/?$/, '');
  return `${baseUrl}${url}`;
};

// ─── CONSTANTS ──────────────────────────────────────────────────────────────

const MEMBER_COLORS = [
  'bg-indigo-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500',
  'bg-rose-500', 'bg-cyan-500', 'bg-orange-500',
];



const getStatusColor = (status) => {
  switch (status) {
    case 'On Track':
    case 'ACTIVE':
      return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400';
    case 'At Risk':
      return 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
    case 'Delayed':
      return 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400';
    case 'Completed':
    case 'COMPLETED':
      return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400';
    case 'PLANNING':
      return 'bg-zinc-100 text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-400';
    case 'CANCELLED':
      return 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400';
    default:
      return 'bg-zinc-100 text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-400';
  }
};

// Format a date string (YYYY-MM-DD or ISO) into "MMM D"
const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '—';
  }
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ── API state ────────────────────────────────────────────────────────────
  const [summary, setSummary] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch ────────────────────────────────────────────────────────────────
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await globalProjects();
      setSummary(response.data.summary);
      setProjects(response.data.projects || []);
    } catch (err) {
      console.error('Global projects fetch error:', err);
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Failed to load projects. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ── Derived stats ────────────────────────────────────────────────────────
  // All four values come from summary if available; otherwise 0.
  const overviewStats = [
    {
      label: 'Total Projects',
      value: isLoading ? '—' : (summary?.total_projects ?? 0),
      icon: FolderOpen,
      color: 'bg-indigo-50  text-indigo-500  dark:bg-indigo-500/10  dark:text-indigo-400',
    },
    {
      label: 'Active Projects',
      value: isLoading ? '—' : (summary?.active_projects ?? 0),
      icon: TrendingUp,
      color: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400',
    },
    {
      label: 'Completed Projects',
      value: isLoading ? '—' : (summary?.completed_projects ?? 0),
      icon: CheckCircle,
      color: 'bg-violet-50  text-violet-500  dark:bg-violet-500/10  dark:text-violet-400',
    },
    {
      label: 'Projects At Risk',
      value: isLoading ? '—' : (summary?.projects_at_risk ?? 0),
      icon: AlertCircle,
      color: 'bg-red-50     text-red-500     dark:bg-red-500/10     dark:text-red-400',
    },
  ];

  // ── Page header ──────────────────────────────────────────────────────────
  const HeaderSection = () => (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[24px]">
            Projects
          </h1>
          <p className="mt-1 text-[13.5px] text-zinc-500 dark:text-zinc-400">
            Manage and monitor every project across all your workspaces.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="group/btn relative shrink-0 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] active:translate-y-0 active:scale-[0.985] dark:from-indigo-500 dark:to-violet-500"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
          <span className="relative flex items-center gap-1.5">
            <Plus size={14} />
            Create Project
          </span>
        </button>
      </div>

      {showModal && (
        <CreateProjectModal
          onClose={() => setShowModal(false)}
          onCreated={() => {
            // Wait 500ms before fetching to give the database time to sync
            setTimeout(() => {
              fetchProjects();
            }, 500);
          }}
        />
      )}
    </div>
  );

  // ── Overview stats cards ─────────────────────────────────────────────────
  const OverviewSection = () => (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {overviewStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 px-5 py-4 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.color}`}>
                <Icon size={18} />
              </div>
              <p className="mt-3 text-[12px] font-medium text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </p>
              <p className="mt-0.5 text-[24px] font-bold leading-none tracking-tight text-zinc-900 dark:text-zinc-50">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── AI Insight card ──────────────────────────────────────────────────────
  // The backend /projects/list/ endpoint does NOT return progress, health,
  // lastActivity, or AI-generated insights per project.
  // The card is preserved visually but shows the first real project's name
  // and due date where available; insight text is kept as static presentation
  // copy (not fabricated project-specific data).
  const AIInsightCard = () => {
    const featured = projects[0] ?? null;
    return (
      <div className="mb-8">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-5 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025] sm:p-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
              <Lightbulb size={14} />
            </div>
            <div>
              <p className="text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
                AI Project Insight
              </p>
              <p className="text-[11.5px] text-zinc-400 dark:text-zinc-500">
                Featured project analysis
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
              {featured?.name ?? '—'}
            </h4>
            <div className="mt-2.5 space-y-2">
              <div className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400 dark:bg-indigo-500" />
                <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {featured
                    ? `${featured.name} is your most recently active project with ${featured.members_count ?? 0} member${(featured.members_count ?? 0) !== 1 ? 's' : ''}.`
                    : 'No projects found in this workspace.'}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400 dark:bg-indigo-500" />
                <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {featured?.workspace?.name
                    ? `Part of the ${featured.workspace.name} workspace.`
                    : 'Workspace information unavailable.'}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400 dark:bg-indigo-500" />
                <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {featured?.due_date
                    ? `Due on ${formatDate(featured.due_date)}.`
                    : 'No due date set.'}
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-zinc-100 pt-3.5 dark:border-white/[0.05]">
              <p className="text-[12.5px] font-medium text-indigo-600 dark:text-indigo-400">
                Recommendation: Keep projects on track by reviewing deadlines and team workload regularly.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Project card ─────────────────────────────────────────────────────────
  // Fields from backend: id, name, description, workspace{id,name},
  //   members (up to 3: {username, avatar, initials}), members_count,
  //   remaining_members_count, due_date
  //
  // Fields NOT from backend (not in ProjectListSerializer):
  //   status      → not in list response → display "—"
  //   progress    → not in list response → progress bar hidden / shows 0
  //   priority    → not provided → omitted
  //   health      → not provided → omitted
  //   lastActivity / activityTime → not provided → show "—"

  const ProjectCard = ({ project, isFeatured, isHovered }) => {
    const membersSlice = project.members ?? [];
    const extraCount = project.remaining_members_count ?? 0;
    const workspaceName = project.workspace?.name ?? '—';
    const dueDateStr = project.due_date;

    return (
      <NavLink
        to={`/projects/${project.id}`}
        className={`group relative block overflow-hidden rounded-2xl border bg-white/70 backdrop-blur-sm transition-all duration-200 dark:bg-white/[0.025] ${isFeatured
            ? 'border-indigo-300/70 shadow-[0_8px_30px_-12px_rgba(79,70,229,0.25)] dark:border-indigo-500/30'
            : isHovered
              ? '-translate-y-0.5 border-zinc-300/80 shadow-[0_8px_30px_-12px_rgba(24,24,27,0.1)] dark:border-white/[0.1] dark:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)]'
              : 'border-zinc-200/70 dark:border-white/[0.06]'
          }`}
        onMouseEnter={() => setHoveredProject(project.id)}
        onMouseLeave={() => setHoveredProject(null)}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.04] to-transparent dark:via-white/[0.06]" />

        {/* Project header */}
        <div className="border-b border-zinc-100 p-5 dark:border-white/[0.05]">
          <h3 className="text-[14px] font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
            {project.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            {project.description || '—'}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {/* Workspace badge */}
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
              {workspaceName}
            </span>
          </div>
        </div>

        {/* Project content */}
        <div className="space-y-3.5 p-5">
          {/* Progress bar — progress is not in the list API response.
              The bar is shown at 0% with a "—" label so the layout is
              preserved. To show real progress, a per-project API call is
              needed (not part of this integration task). */}
          <div>
            <div className="mb-1.5 flex items-center justify-between text-[11px]">
              <span className="font-medium text-zinc-500 dark:text-zinc-400">Progress</span>
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">—</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                style={{ width: '0%' }}
              />
            </div>
          </div>

          {/* Status — not in list API response → show "—" */}
          <div className="flex items-center justify-between gap-2">
            <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-400">
              —
            </span>
          </div>

          {/* Activity preview — not in list API response */}
          <div className="border-t border-zinc-100 pt-3 dark:border-white/[0.05]">
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Recent Activity</p>
            <p className="mt-0.5 truncate text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
              —
            </p>
            <p className="mt-0.5 text-[11px] text-zinc-400 dark:text-zinc-500">—</p>
          </div>

          {/* Footer: member avatars + due date */}
          <div className="flex items-center justify-between border-t border-zinc-100 pt-3.5 dark:border-white/[0.05]">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {membersSlice.map((member, idx) => {
                  const avatarUrl = getMediaUrl(member.avatar);
                  return (
                    <div
                      key={idx}
                      className={`flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border-2 border-white text-[8px] font-bold text-white dark:border-[#0B0C10] ${MEMBER_COLORS[idx % MEMBER_COLORS.length]}`}
                    >
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
                  );
                })}
                {extraCount > 0 && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-zinc-200 text-[8px] font-bold text-zinc-600 dark:border-[#0B0C10] dark:bg-white/[0.1] dark:text-zinc-300">
                    +{extraCount}
                  </div>
                )}
              </div>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                {project.members_count ?? 0} member{(project.members_count ?? 0) !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500">
              <Calendar size={12} />
              {formatDate(dueDateStr)}
            </div>
          </div>
        </div>
      </NavLink>
    );
  };

  // ── Projects grid ────────────────────────────────────────────────────────
  const ProjectsGridSection = () => {
    if (isLoading) {
      return (
        <div className="pb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
              All Projects
            </h2>
            <span className="text-[12.5px] font-medium text-zinc-400 dark:text-zinc-500">
              Loading…
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-64 animate-pulse rounded-2xl border border-zinc-200/70 bg-zinc-100/60 dark:border-white/[0.06] dark:bg-white/[0.04]"
              />
            ))}
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="pb-8">
          <div className="flex items-center justify-center rounded-2xl border border-red-200/70 bg-red-50/50 py-16 dark:border-red-500/10 dark:bg-red-500/5">
            <p className="text-[13px] text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      );
    }

    if (projects.length === 0) {
      return (
        <div className="pb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
              All Projects
            </h2>
            <span className="text-[12.5px] font-medium text-zinc-400 dark:text-zinc-500">
              0 projects
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-200/70 bg-white/70 py-16 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.025]">
            <FolderOpen size={28} className="text-zinc-300 dark:text-zinc-600" />
            <p className="text-[13px] font-medium text-zinc-400 dark:text-zinc-500">
              No projects yet. Create your first project!
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="pb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
            All Projects
          </h2>
          <span className="text-[12.5px] font-medium text-zinc-400 dark:text-zinc-500">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              isFeatured={idx === 0}
              isHovered={hoveredProject === project.id}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <HeaderSection />
      <OverviewSection />
      <AIInsightCard />
      <ProjectsGridSection />
    </>
  );
};

export default Projects;
