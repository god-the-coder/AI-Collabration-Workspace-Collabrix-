// Builds an absolute media URL from a relative backend path (e.g. /uploads/logo.jpg).
// VITE_API_URL points at .../api — strip that suffix since media is served from the root.
export const getMediaUrl = (url) => {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;

  const apiUrl = import.meta.env.VITE_API_URL || "";
  const baseUrl = apiUrl.replace(/\/api\/?$/, "");
  return `${baseUrl}${url}`;
};
