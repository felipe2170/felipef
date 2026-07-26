"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getCurrentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  function toggleTheme() {
    const next = getCurrentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    localStorage.setItem("felipef-theme", next);
    setTheme(next);
  }

  const dark = theme === "dark";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Use light theme" : "Use dark theme"}
      aria-pressed={dark}
      title={dark ? "Use light theme" : "Use dark theme"}
    >
      <span className="theme-toggle__symbol" aria-hidden="true">
        {dark ? "☼" : "◐"}
      </span>
      <span className="sr-only">{dark ? "Light theme" : "Dark theme"}</span>
    </button>
  );
}
