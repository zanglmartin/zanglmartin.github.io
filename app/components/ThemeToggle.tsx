import { useEffect, useSyncExternalStore } from "react";

type Theme = "dark" | "light";
const themeEvent = "martin-portfolio-theme-change";

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(themeEvent, onStoreChange);
  return () => window.removeEventListener(themeEvent, onStoreChange);
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.dispatchEvent(new Event(themeEvent));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => "dark");

  useEffect(() => {
    window.dispatchEvent(new Event(themeEvent));
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("martin-portfolio-theme", next);
    applyTheme(next);
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
      <span aria-hidden="true">{theme === "dark" ? "☼" : "☾"}</span>
      <span className="theme-label">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
