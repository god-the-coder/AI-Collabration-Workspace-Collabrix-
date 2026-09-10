import { useEffect, useState } from "react";
import { createTask } from "../../api/task.api";

const PRIORITIES = [
  {
    label: "Low",
    value: "LOW",
  },
  {
    label: "Medium",
    value: "MEDIUM",
  },
  {
    label: "High",
    value: "HIGH",
  },
  {
    label: "Critical",
    value: "CRITICAL",
  },
];

export default function CreateTaskModal({
  onClose,
  workspaceId,
  projectId,
  assignees = [],
  milestones = [],
  onTaskCreated,
}) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "MEDIUM",
    due_date: "",
    milestone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  }, [onClose]);


  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const handleSubmit = async () => {

    if (!formData.title.trim()) {
      setError("Task title is required.");
      return;
    }

    if (!workspaceId) {
      setError("Missing workspace. Please close and retry.");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const payload = {
        title: formData.title.trim(),
        priority: formData.priority,
      };

      if (projectId) {
        payload.project_id = projectId;
      }

      if (formData.description.trim()) {
        payload.description =
          formData.description.trim();
      }

      if (formData.assignee) {
        payload.assignee_id =
          formData.assignee;
      }

      if (formData.due_date) {
        payload.due_date =
          formData.due_date;
      }

      if (formData.milestone) {
        payload.milestone_id =
          formData.milestone;
      }

      const response = await createTask(
        workspaceId,
        payload
      );

      if (onTaskCreated) {
        onTaskCreated(response.data);
      }

      onClose();

    } catch (err) {

      console.error(
        "Failed to create task:",
        err
      );

      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Failed to create task. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >

      {/* Backdrop */}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
      />


      {/* Panel */}

      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] dark:border-white/[0.08] dark:bg-[#111218] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] sm:max-w-xl"
      >

        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-900/[0.06] to-transparent dark:via-white/[0.1]" />


        {/* Header */}

        <div className="flex items-start justify-between border-b border-zinc-100 px-5 py-4 dark:border-white/[0.05]">

          <div>

            <p
              id="create-task-title"
              className="text-[14.5px] font-semibold text-zinc-900 dark:text-zinc-100"
            >
              Create Task
            </p>

            <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">
              Create a new task for this project.
            </p>

          </div>


          <button
            onClick={onClose}
            type="button"
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
          >
            <CloseIcon />
          </button>

        </div>


        {/* Form */}

        <div className="max-h-[70vh] space-y-4 overflow-y-auto px-5 py-5">


          {/* Error */}

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-[12px] text-red-500">
              {error}
            </div>
          )}


          {/* Task Title */}

          <div>

            <label
              htmlFor="task-title"
              className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400"
            >
              Task Title{" "}
              <span className="text-red-500">
                *
              </span>
            </label>


            <input
              id="task-title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title..."
              disabled={loading}
              className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100"
            />

          </div>


          {/* Description */}

          <div>

            <label
              htmlFor="task-description"
              className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400"
            >
              Description
            </label>


            <textarea
              id="task-description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
              placeholder="Describe the task..."
              className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100"
            />

          </div>


          {/* Assignee + Priority */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">


            {/* Assignee */}

            <div>

              <label
                htmlFor="task-assignee"
                className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400"
              >
                Assignee
              </label>


              <SelectField
                id="task-assignee"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                disabled={loading}
                placeholder="Select assignee"
                options={assignees.map(
                  (member) => ({
                    label: member.username,
                    value: member.id,
                  })
                )}
              />

            </div>


            {/* Priority */}

            <div>

              <label
                htmlFor="task-priority"
                className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400"
              >
                Priority
              </label>


              <SelectField
                id="task-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                disabled={loading}
                options={PRIORITIES}
              />

            </div>

          </div>


          {/* Due Date + Milestone */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">


            {/* Due Date */}

            <div>

              <label
                htmlFor="task-due-date"
                className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400"
              >
                Due Date
              </label>


              <input
                id="task-due-date"
                name="due_date"
                type="date"
                value={formData.due_date}
                onChange={handleChange}
                disabled={loading}
                className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[13.5px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100 dark:[color-scheme:dark]"
              />

            </div>


            {/* Milestone */}

            <div>

              <label
                htmlFor="task-milestone"
                className="mb-1.5 block text-[12px] font-medium text-zinc-600 dark:text-zinc-400"
              >
                Milestone
              </label>


              <SelectField
                id="task-milestone"
                name="milestone"
                value={formData.milestone}
                onChange={handleChange}
                disabled={
                  loading ||
                  milestones.length === 0
                }
                placeholder={
                  milestones.length > 0
                    ? "Select milestone"
                    : "No milestones available"
                }
                options={milestones.map(
                  (milestone) => ({
                    label: milestone.name,
                    value: milestone.id,
                  })
                )}
              />

            </div>

          </div>

        </div>


        {/* Footer */}

        <div className="flex items-center justify-end gap-2 border-t border-zinc-100 px-5 py-4 dark:border-white/[0.05]">


          <button
            onClick={onClose}
            type="button"
            disabled={loading}
            className="rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-50 dark:border-white/[0.08] dark:text-zinc-300"
          >
            Cancel
          </button>


          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60 dark:from-indigo-500 dark:to-violet-500"
          >

            <span className="relative">
              {loading
                ? "Creating..."
                : "Create Task"}
            </span>

          </button>

        </div>

      </div>

    </div>
  );
}


function SelectField({
  id,
  name,
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
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="h-10 w-full appearance-none rounded-xl border border-zinc-200 bg-white px-3.5 pr-9 text-[13.5px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100"
      >

        {placeholder && (
          <option
            value=""
            disabled
          >
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

// ─── ICONS ─────────────────────────────────────────────────────────────────

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
