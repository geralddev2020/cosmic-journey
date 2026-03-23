import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => localStorage.theme === "dark");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkMode]);

  return (
    <Button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 rounded-xl border transition-colors bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
    >
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </Button>
  );
}
