"use client"
import { useTheme } from './theme-context';
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
          onClick={toggleTheme}
          className="p-2 text-sm bg-gray-200 dark:bg-gray-800 rounded-full border-2 border-gray-200"
        >
          {theme === 'light' ? <Moon className="w-6 h-6"/> : <Sun className="w-6 h-6"/>}
        </button>
      );
}

export default ThemeToggle;