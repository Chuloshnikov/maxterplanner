"use client"
import { useTheme } from './theme-context';
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
          onClick={toggleTheme}
          className="p-1 text-sm bg-gray-200 dark:bg-gray-800 rounded-md border-2 border-gray-200 cursor-pointer hover:opacity-90 duration-200"
        >
          {theme === 'light' ? <Moon className="w-6 h-6"/> : <Sun className="w-6 h-6"/>}
        </button>
      );
}

export default ThemeToggle;