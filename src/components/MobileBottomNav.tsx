import { Link } from "react-router-dom";
import { LayoutDashboard, BookOpen, Brain, Flame, BarChart3 } from "lucide-react";

const items = [
  { label: "Home", to: "/dashboard", icon: LayoutDashboard },
  { label: "Questions", to: "/questions", icon: BookOpen },
  { label: "Quiz", to: "/quiz", icon: Brain },
  { label: "Mock", to: "/mock", icon: Flame },
  { label: "Stats", to: "/analytics", icon: BarChart3 },
];

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-between px-2 pb-safe pt-1">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[var(--muted)] transition-colors hover:text-[var(--brand-orange)]"
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
