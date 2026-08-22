import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img
            src="/PrepForgeBlack.png"
            alt="PrepForge"
            className="h-6 w-6 rounded-lg object-contain block dark:hidden"
          />
          <img
            src="/logo.png"
            alt="PrepForge"
            className="h-6 w-6 rounded-lg object-contain hidden dark:block"
          />
          <span className="text-sm font-semibold text-[var(--foreground)]">
            PrepForge
          </span>
        </Link>
        <p className="text-sm text-[var(--muted)]">
          © {new Date().getFullYear()} PrepForge. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
