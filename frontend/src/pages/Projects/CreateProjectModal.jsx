import React, { useEffect, useState } from "react";
import { globalWS } from "../../api/workspace.api";
import { createProject } from "../../api/project.api";

const STATUS_OPTIONS = [
  { label: "Planning", value: "PLANNING" },
  { label: "Active", value: "ACTIVE" },
];

export default function CreateProjectModal({
  workspace = null,
  onClose,
  onCreated,
}) {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(
    workspace?.id || ""
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("PLANNING");

  const [isLoadingWorkspaces, setIsLoadingWorkspaces] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  const isWorkspaceKnown = Boolean(workspace);

  // ---------------------------------------------------------
  // Load workspaces when this is opened from global Projects
  // ---------------------------------------------------------

  useEffect(() => {
    if (workspace) {
      setSelectedWorkspace(workspace.id);
      return;
    }

    const fetchWorkspaces = async () => {
      try {
        setIsLoadingWorkspaces(true);

        const response = await globalWS();

        setWorkspaces(response.data.workspaces || []);
      } catch (error) {
        console.error(error);
        setError("Unable to load workspaces.");
      } finally {
        setIsLoadingWorkspaces(false);
      }
    };

    fetchWorkspaces();
  }, [workspace]);

  // ---------------------------------------------------------
  // Escape key
  // ---------------------------------------------------------

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !isCreating) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, isCreating]);

  // ---------------------------------------------------------
  // Submit
  // ---------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    if (!selectedWorkspace) {
      setError("Please select a workspace.");
      return;
    }

    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }

    try {
      setIsCreating(true);

      const data = {
        workspace_id: selectedWorkspace,
        name: name.trim(),
        description: description.trim(),
        start_date: new Date().toISOString().split("T")[0],
        status,
      };

      if (dueDate) {
        data.due_date = dueDate;
      }

      console.log("PROJECT PAYLOAD:", data);

      const response = await createProject(data);

      console.log("Project created:", response.data);

      if (onCreated) {
        await onCreated(response.data);
      }

      onClose();

    } catch (error) {
      console.error("Create project error:", error);

      console.log(
        "Backend error:",
        error.response?.data
      );

      const backendError = error.response?.data;

      if (backendError) {
        if (typeof backendError === "string") {
          setError(backendError);
        } else {
          setError(
            Object.values(backendError)
              .flat()
              .join(" ")
          );
        }
      } else {
        setError("Failed to create project.");
      }

    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <style>{`
        @keyframes cpmOverlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes cpmModalScaleIn {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-[cpmOverlayFadeIn_200ms_ease-out]"
      />

      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-project-title"
        className="relative w-[95%] overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] animate-[cpmModalScaleIn_200ms_ease-out] dark:border-white/[0.08] dark:bg-[#111218] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] sm:w-[90%] md:w-full md:max-w-[560px]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-100 px-5 py-4 dark:border-white/[0.05] sm:px-6">
          <div>
            <p
              id="create-project-title"
              className="text-[17px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              Create Project
            </p>

            <p className="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">
              Create a new project inside your workspace.
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            disabled={isCreating}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] space-y-4 overflow-y-auto px-5 py-5 sm:px-6">

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-[12.5px] text-red-500 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Workspace */}
            <div>
              <label
                htmlFor="project-workspace"
                className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400"
              >
                Workspace{" "}
                <span className="text-red-500 dark:text-red-400">*</span>
              </label>

              {isWorkspaceKnown ? (
                <div className="flex items-center gap-2.5 rounded-xl border border-zinc-200/60 bg-zinc-50/80 px-3.5 py-2.5 dark:border-white/[0.05] dark:bg-white/[0.02]">
                  <span className="text-[15px] leading-none">🏢</span>

                  <span className="text-[13.5px] font-medium text-zinc-700 dark:text-zinc-300">
                    {workspace.name}
                  </span>
                </div>
              ) : (
                <SelectField
                  id="project-workspace"
                  placeholder={
                    isLoadingWorkspaces
                      ? "Loading workspaces..."
                      : "Select workspace"
                  }
                  options={workspaces.map((ws) => ({
                    label: ws.name,
                    value: ws.id,
                  }))}
                  value={selectedWorkspace}
                  onChange={(e) =>
                    setSelectedWorkspace(e.target.value)
                  }
                  disabled={isLoadingWorkspaces}
                />
              )}
            </div>

            {/* Project Name */}
            <div>
              <label
                htmlFor="project-name"
                className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400"
              >
                Project Name{" "}
                <span className="text-red-500 dark:text-red-400">*</span>
              </label>

              <input
                id="project-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name..."
                disabled={isCreating}
                className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="project-description"
                className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400"
              >
                Description{" "}
                <span className="font-normal text-zinc-400 dark:text-zinc-500">
                  (optional)
                </span>
              </label>

              <textarea
                id="project-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe this project..."
                disabled={isCreating}
                className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Start Date */}
              <div>
                <label
                  htmlFor="project-start-date"
                  className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400"
                >
                  Start Date
                </label>

                <div className="flex h-10 w-full items-center rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 text-[13.5px] text-zinc-500 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400">
                  Automatically set
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label
                  htmlFor="project-due-date"
                  className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400"
                >
                  Due Date{" "}
                  <span className="font-normal text-zinc-400 dark:text-zinc-500">
                    (optional)
                  </span>
                </label>

                <input
                  id="project-due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  disabled={isCreating}
                  className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[13.5px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:[color-scheme:dark] dark:focus:ring-indigo-400/30"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="project-status"
                className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400"
              >
                Status
              </label>

              <SelectField
                id="project-status"
                options={STATUS_OPTIONS}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={isCreating}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-zinc-100 px-5 py-4 dark:border-white/[0.05] sm:px-6">

            <button
              onClick={onClose}
              type="button"
              disabled={isCreating}
              className="rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isCreating}
              className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(79,70,229,0.45)] disabled:cursor-not-allowed disabled:opacity-60 dark:from-indigo-500 dark:to-violet-500"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />

              <span className="relative flex items-center gap-2">
                {isCreating && <Spinner />}
                {isCreating ? "Creating Project..." : "Create Project"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Select
// ---------------------------------------------------------

function SelectField({
  id,
  placeholder,
  options,
  value,
  onChange,
  disabled,
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="h-10 w-full appearance-none rounded-xl border border-zinc-200 bg-white px-3.5 pr-9 text-[13.5px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:focus:ring-indigo-400/30"
      >
        {placeholder && !value && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <ChevronDownIcon />
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Icons
// ---------------------------------------------------------

function CloseIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-zinc-400 dark:text-zinc-500"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeOpacity="0.25"
      />

      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
