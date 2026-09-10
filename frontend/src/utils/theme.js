const STORAGE_KEY = "collabrix_theme";

let mediaQuery = null;
let mediaListener = null;

const setDarkClass = (isDark) => {
  document.documentElement.classList.toggle("dark", isDark);
};

// Applies a theme ("LIGHT" | "DARK" | "SYSTEM") to the document and caches it
// in localStorage so the correct theme can render before the backend responds.
export function applyTheme(theme) {
  if (mediaQuery && mediaListener) {
    mediaQuery.removeEventListener("change", mediaListener);
    mediaQuery = null;
    mediaListener = null;
  }

  if (theme === "DARK") {
    setDarkClass(true);
  } else if (theme === "LIGHT") {
    setDarkClass(false);
  } else {
    mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkClass(mediaQuery.matches);
    mediaListener = (e) => setDarkClass(e.matches);
    mediaQuery.addEventListener("change", mediaListener);
  }

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore (private browsing / blocked storage)
  }
}

// Applies the last-known cached theme immediately (call at app bootstrap,
// before the authoritative value has loaded from the backend).
export function initTheme() {
  let stored = "SYSTEM";

  try {
    stored = localStorage.getItem(STORAGE_KEY) || "SYSTEM";
  } catch {
    // ignore
  }

  applyTheme(stored);
}
