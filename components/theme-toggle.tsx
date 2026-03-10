"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const current = stored === "dark" || stored === "light" ? stored : preferred;
    document.documentElement.dataset.theme = current;
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme">
      {theme === "light" ? "Dark" : "Light"} mode
    </button>
  );
}
