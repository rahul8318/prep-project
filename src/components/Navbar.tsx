import { Link } from "react-router-dom";
import {
  BookOpen,
  Brain,
  Flame,
  LayoutDashboard,
  LogOut,
  BarChart3,
  Bookmark,
  Flashlight,
  Star,
  User,
  Menu,
  X,
} from "lucide-react";
import { Button, ThemeToggle } from "./ui";
import type { UserProfile } from "../types";
import { useState } from "react";

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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/PrepForgeBlack.png"
                alt="PrepForge"
                className="h-9 w-9 rounded-xl object-contain block dark:hidden"
              />
              <img
                src="/logo.png"
                alt="PrepForge"
                className="h-9 w-9 rounded-xl object-contain hidden dark:block"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">
              PrepForge
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle dark={theme === "dark"} onToggle={toggleTheme} />

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--foreground)] transition-colors hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] lg:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="text-sm text-[var(--foreground-secondary)]">
              {user?.name}
            </span>
            <Button variant="secondary" onClick={onLogout} className="gap-2">
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-[var(--border)] px-4 pb-4 lg:hidden">
          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-medium text-[var(--foreground)]">
              {user?.name}
            </span>
            <Button variant="secondary" onClick={onLogout} className="gap-2">
              <LogOut size={16} />
              Logout
            </Button>
          </div>
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--foreground-secondary)] transition-colors hover:bg-[var(--brand-orange-soft)] hover:text-[var(--brand-orange)]"
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
