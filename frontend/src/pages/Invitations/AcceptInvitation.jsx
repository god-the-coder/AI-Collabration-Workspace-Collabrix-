import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { acceptInvitationWS } from "../../api/workspace.api";

const STATE = {
  LOADING: "loading",
  SUCCESS: "success",
  UNAUTHENTICATED: "unauthenticated",
  ERROR: "error",
};

export default function AcceptInvitation() {
  const { token } = useParams();
  const [state, setState] = useState(STATE.LOADING);
  const [workspace, setWorkspace] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function accept() {
      try {
        const res = await acceptInvitationWS(token);
        if (!isMounted) return;
        setWorkspace(res.data?.workspace || null);
        setState(STATE.SUCCESS);
      } catch (err) {
        if (!isMounted) return;

        if (err.response?.status === 401) {
          setState(STATE.UNAUTHENTICATED);
          return;
        }

        const data = err.response?.data;
        const errors = data?.errors;
        let message = null;

        if (typeof errors === "string") message = errors;
        else if (Array.isArray(errors)) message = errors[0];
        else if (errors && typeof errors === "object") {
          const first = Object.values(errors)[0];
          message = Array.isArray(first) ? first[0] : first;
        }

        setError(message || data?.message || "This invitation could not be accepted.");
        setState(STATE.ERROR);
      }
    }

    accept();
    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FAFAF9] px-4 dark:bg-[#0E0F13]">
      <div className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-zinc-200/70 bg-white p-7 text-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] dark:border-white/[0.08] dark:bg-[#14151D] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)]">
        {state === STATE.LOADING && (
          <>
            <Spinner />
            <p className="mt-4 text-[14px] font-medium text-zinc-600 dark:text-zinc-300">
              Accepting invitation...
            </p>
          </>
        )}

        {state === STATE.SUCCESS && (
          <>
            <IconCircle tone="success">
              <CheckIcon />
            </IconCircle>
            <h1 className="mt-4 text-[18px] font-semibold text-zinc-900 dark:text-zinc-100">
              You've joined {workspace?.name || "the workspace"}
            </h1>
            <p className="mt-1.5 text-[13.5px] text-zinc-500 dark:text-zinc-400">
              You now have access to this workspace's projects and tasks.
            </p>
            <Link
              to={workspace?.id ? `/workspaces/${workspace.id}` : "/workspaces"}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px dark:from-indigo-500 dark:to-violet-500"
            >
              Go to Workspace
            </Link>
          </>
        )}

        {state === STATE.UNAUTHENTICATED && (
          <>
            <IconCircle tone="neutral">
              <LockIcon />
            </IconCircle>
            <h1 className="mt-4 text-[18px] font-semibold text-zinc-900 dark:text-zinc-100">
              Sign in to accept this invitation
            </h1>
            <p className="mt-1.5 text-[13.5px] text-zinc-500 dark:text-zinc-400">
              You need to be signed in with the invited email address to join this workspace.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_2px_12px_-3px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-px dark:from-indigo-500 dark:to-violet-500"
            >
              Go to Login
            </Link>
            <p className="mt-3 text-[12px] text-zinc-400 dark:text-zinc-500">
              After signing in, open this invitation link again to finish joining.
            </p>
          </>
        )}

        {state === STATE.ERROR && (
          <>
            <IconCircle tone="error">
              <AlertIcon />
            </IconCircle>
            <h1 className="mt-4 text-[18px] font-semibold text-zinc-900 dark:text-zinc-100">
              Couldn't accept invitation
            </h1>
            <p className="mt-1.5 text-[13.5px] text-zinc-500 dark:text-zinc-400">
              {error}
            </p>
            <Link
              to="/dashboard"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-zinc-200/70 px-4 py-2.5 text-[13.5px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
            >
              Go to Dashboard
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

function IconCircle({ tone, children }) {
  const toneMap = {
    success: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    error: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    neutral: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
  };

  return (
    <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${toneMap[tone]}`}>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="mx-auto animate-spin text-indigo-500 dark:text-indigo-400">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.2" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
