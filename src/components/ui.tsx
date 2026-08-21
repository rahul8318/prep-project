import type { ReactNode } from "react";
import {
  CheckCircle2,
  CircleAlert,
  LoaderCircle,
  Moon,
  SunMedium,
} from "lucide-react";

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const variants = {
    primary:
      "bg-[var(--brand-orange)] text-white shadow-lg shadow-[var(--brand-orange-glow)] hover:bg-[var(--brand-orange-hover)] hover:shadow-xl hover:shadow-[var(--brand-orange-glow)] focus:ring-[var(--brand-orange)]",
    secondary:
      "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] focus:ring-[var(--brand-orange)]",
    ghost:
      "bg-transparent text-[var(--foreground-secondary)] hover:bg-[var(--brand-orange-soft)] hover:text-[var(--brand-orange)]",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] hover:border-[var(--brand-orange)] ${className}`}
    >
      {children}
    </div>
  );
}

export function ProgressBar({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  return (
    <div
      className={`h-2.5 w-full overflow-hidden rounded-full bg-[var(--surface-elevated)] ${className}`}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-hover)]"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colorMap: Record<string, string> = {
    Beginner:
      "bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] border border-[var(--brand-orange)]/20",
    Intermediate:
      "bg-[var(--surface-elevated)] text-[var(--foreground-secondary)] border border-[var(--border)]",
    Advanced:
      "bg-[var(--foreground)] text-[var(--background)] border border-transparent",
    Easy: "bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] border border-[var(--brand-orange)]/20",
    "Need Review":
      "bg-[var(--surface-elevated)] text-[var(--foreground-secondary)] border border-[var(--border)]",
    Difficult:
      "bg-[var(--foreground)] text-[var(--background)] border border-transparent",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${colorMap[difficulty] || "bg-[var(--surface-elevated)] text-[var(--muted)] border border-[var(--border)]"}`}
    >
      {difficulty}
    </span>
  );
}

export function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="rounded-full border border-[var(--brand-orange)]/20 bg-[var(--brand-orange-soft)] px-2.5 py-1 text-xs font-medium text-[var(--brand-orange)]">
      {category}
    </span>
  );
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 pl-10 text-sm text-[var(--foreground)] outline-none ring-0 transition focus:border-[var(--brand-orange)] focus:shadow-[0_0_0_3px_var(--brand-orange-soft)]"
      />
      <span className="pointer-events-none absolute left-3 top-3 text-[var(--muted)]">
        ⌕
      </span>
    </div>
  );
}

export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex min-h-[180px] items-center justify-center gap-3 text-[var(--foreground-secondary)]">
      <LoaderCircle className="animate-spin text-[var(--brand-orange)]" size={18} />{" "}
      {message}
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center">
      <CircleAlert className="mb-3 text-[var(--muted)]" size={24} />
      <h3 className="text-lg font-semibold text-[var(--foreground)]">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-sm text-[var(--foreground-secondary)]">
        {description}
      </p>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-200">
      <CheckCircle2 className="mr-2 inline-block" size={16} /> {message}
    </div>
  );
}

export function ThemeToggle({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)]"
      aria-label="Toggle theme"
    >
      {dark ? <SunMedium size={16} /> : <Moon size={16} />}
      {dark ? "Light" : "Dark"}
    </button>
  );
}
