import { useState, useEffect } from "react";
import { Monitor, Sun, Moon } from "lucide-react";

type Theme = "system" | "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen for system theme changes if "system" is selected
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <div className="flex items-center gap-1 bg-[#1a1a1a] rounded-full p-1 border border-white/10 shadow-inner">
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-full transition-all duration-200 ${
          theme === "system"
            ? "bg-[#e5e7eb] text-[#1a1a1a] shadow-sm"
            : "text-[#9ca3af] hover:text-[#d1d5db]"
        }`}
        aria-label="System Theme"
      >
        <Monitor size={16} strokeWidth={2.5} />
      </button>
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-full transition-all duration-200 ${
          theme === "light"
            ? "bg-[#e5e7eb] text-[#1a1a1a] shadow-sm"
            : "text-[#9ca3af] hover:text-[#d1d5db]"
        }`}
        aria-label="Light Theme"
      >
        <Sun size={16} strokeWidth={2.5} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-full transition-all duration-200 ${
          theme === "dark"
            ? "bg-[#e5e7eb] text-[#1a1a1a] shadow-sm"
            : "text-[#9ca3af] hover:text-[#d1d5db]"
        }`}
        aria-label="Dark Theme"
      >
        <Moon size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}
