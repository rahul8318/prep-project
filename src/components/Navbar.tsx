import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { Button, ThemeToggle } from "./ui";
import type { UserProfile } from "../types";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
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
        <Link to="/dashboard" className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <img
              src="/PrepForgeBlack.png"
              alt="PrepForge"
              className="h-8 w-8 rounded-lg object-contain block dark:hidden"
            />
            <img
              src="/logo.png"
              alt="PrepForge"
              className="h-8 w-8 rounded-lg object-contain hidden dark:block"
            />
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-[var(--foreground)]">
            PrepForge
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle dark={theme === "dark"} onToggle={toggleTheme} />

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[var(--foreground-secondary)] transition-colors hover:bg-[var(--brand-orange-soft)] hover:text-[var(--brand-orange)]"
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <span className="text-sm text-[var(--foreground-secondary)]">
              {user?.name}
            </span>
            <Button variant="secondary" onClick={onLogout} className="gap-2">
              <LogOut size={16} />
              Logout
            </Button>
          </div>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5 text-[var(--foreground)] transition-colors hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] lg:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-72 border-l border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-[var(--foreground)]">
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-lg p-1.5 text-[var(--foreground-secondary)] transition hover:text-[var(--foreground)]"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[var(--foreground-secondary)] transition-colors hover:bg-[var(--brand-orange-soft)] hover:text-[var(--brand-orange)]"
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 border-t border-[var(--border)] pt-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-orange-soft)] text-sm font-bold text-[var(--brand-orange)]">
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-[var(--foreground)]">
                    {user?.name}
                  </p>
                  <p className="truncate text-xs text-[var(--muted)]">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  onLogout();
                  setMenuOpen(false);
                }}
                className="mt-4 w-full justify-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
