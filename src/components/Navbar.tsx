import { Link } from "react-router-dom";
import {
  BookOpen,
  Brain,
  Flame,
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
  BarChart3,
  Bookmark,
  Flashlight,
  Star,
  User,
} from "lucide-react";
import { Button } from "./ui";
import type { UserProfile } from "../types";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Questions", to: "/questions", icon: BookOpen },
  { label: "Quiz", to: "/quiz", icon: Brain },
  { label: "Mock Interview", to: "/mock", icon: Flame },
  { label: "Flashcards", to: "/flashcards", icon: Flashlight },
  { label: "Daily", to: "/daily", icon: Star },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Bookmarks", to: "/bookmarks", icon: Bookmark },
  { label: "HR Prep", to: "/hr", icon: User },
  { label: "Profile", to: "/profile", icon: User },
];

export function Navbar({
  user,
  onLogout,
  theme,
  toggleTheme,
}: {
  user: UserProfile | null;
  onLogout: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="InterviewHub"
              className="h-9 w-9 rounded-lg object-cover"
            />
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              InterviewHub
            </span>
          </Link>

          <nav className="hidden items-center gap-1 text-sm font-medium lg:flex">
            {navItems.slice(0, 8).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <div className="hidden items-center gap-3 md:flex">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {user?.name}
            </span>
            <Button variant="secondary" onClick={onLogout} className="gap-2">
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 pb-2 dark:border-slate-800 lg:hidden">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {user?.name}
          </span>
          <Button variant="secondary" onClick={onLogout} className="gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
        <nav className="mt-2 flex items-center gap-1 overflow-x-auto text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap rounded-xl px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
