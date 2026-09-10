export function extractApiError(err, fallback = "Something went wrong. Please try again.") {
  // Some callers (e.g. authStore) already unwrap `error.response.data`
  // before rethrowing, so accept either a raw axios error or the
  // already-unwrapped API payload.
  const data = err?.response?.data ?? err;
  const errors = data?.errors;

  if (typeof errors === "string") return errors;

  if (Array.isArray(errors)) return errors[0];

  if (errors && typeof errors === "object") {
    const first = Object.values(errors)[0];
    return Array.isArray(first) ? first[0] : first || fallback;
  }

  return data?.message || data?.detail || fallback;
}
