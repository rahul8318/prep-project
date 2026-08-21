import {
  Camera,
  Mail,
  MapPin,
  Pencil,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";
import { Button, Card } from "../components/ui";

export function ProfilePage({
  user,
}: {
  user: any;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] dark:bg-[var(--background)]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 dark:border-[var(--border)] dark:bg-[var(--surface)]">
          <div>
            <p className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">
              Account
            </p>
            <h1 className="text-2xl font-bold text-[var(--foreground)] dark:text-[var(--foreground)]">
              Profile
            </h1>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-6 text-center">
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
            <div className="relative">
              <img
                src="/PrepForgeBlack.png"
                alt="PrepForge"
                className="h-24 w-24 rounded-full object-contain shadow-lg shadow-[var(--brand-orange-glow)] block dark:hidden"
              />
              <img
                src="/logo.png"
                alt="PrepForge"
                className="h-24 w-24 rounded-full object-contain shadow-lg shadow-[var(--brand-orange-glow)] hidden dark:block"
              />
            </div>
              <button className="absolute -bottom-1 -right-1 rounded-full bg-[var(--surface-elevated)] p-2 text-[var(--foreground)] shadow dark:bg-[var(--surface-elevated)] dark:text-[var(--foreground)]">
                <Camera size={14} />
              </button>
            </div>
            <h2 className="mt-5 text-2xl font-bold text-[var(--foreground)] dark:text-[var(--foreground)]">
              {user?.name || "Learner"}
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)] dark:text-[var(--muted)]">
              {user?.role || "Interview Candidate"}
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-[var(--brand-orange)]">
              <Star size={16} fill="currentColor" />{" "}
              <span className="font-semibold text-[var(--foreground)] dark:text-[var(--foreground)]">
                New user
              </span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[var(--foreground)] dark:text-[var(--foreground)]">
                Personal information
              </h2>
              <Button variant="secondary" className="gap-2">
                <Pencil size={14} /> Edit
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-elevated)] p-3 dark:bg-[var(--surface-elevated)]">
                <UserRound className="text-[var(--brand-orange)]" size={18} />
                <div>
                  <div className="text-xs text-[var(--muted)] dark:text-[var(--muted)]">
                    Full name
                  </div>
                  <div className="font-medium text-[var(--foreground)] dark:text-[var(--foreground)]">
                    {user?.name || "—"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-elevated)] p-3 dark:bg-[var(--surface-elevated)]">
                <Mail className="text-[var(--brand-orange)]" size={18} />
                <div>
                  <div className="text-xs text-[var(--muted)] dark:text-[var(--muted)]">
                    Email
                  </div>
                  <div className="font-medium text-[var(--foreground)] dark:text-[var(--foreground)]">
                    {user?.email || "—"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-elevated)] p-3 dark:bg-[var(--surface-elevated)]">
                <ShieldCheck className="text-[var(--brand-orange)]" size={18} />
                <div>
                  <div className="text-xs text-[var(--muted)] dark:text-[var(--muted)]">
                    Preparation
                  </div>
                  <div className="font-medium text-[var(--foreground)] dark:text-[var(--foreground)]">
                    {user?.preparationLevel || "Beginner"}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
