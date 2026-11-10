import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("mat-theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const active = savedTheme || (prefersDark ? "dark" : "light");

    setTheme(active);
    document.documentElement.setAttribute("data-theme", active);
    if (active === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("mat-theme", next);
    document.documentElement.setAttribute("data-theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full border border-surface-border" />;
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center border border-surface-border bg-surface hover:border-brand-primary text-content transition-all duration-200",
        className
      )}
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 text-brand-primary" />
      ) : (
        <Sun className="w-4 h-4 text-brand-primary" />
      )}
    </button>
  );
}

