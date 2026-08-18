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
  onLogout,
  theme,
  toggleTheme,
}: {
  user: any;
  onLogout: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Account
            </p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Profile
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="rounded-full border border-slate-200 px-3 py-2 text-xs dark:border-slate-700"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <button
              onClick={onLogout}
              className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-6 text-center">
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
              <img
                src="/logo.svg"
                alt="InterviewHub"
                className="h-24 w-24 rounded-full object-cover shadow-lg shadow-sky-500/20"
              />
              <button className="absolute -bottom-1 -right-1 rounded-full bg-white p-2 text-slate-700 shadow dark:bg-slate-800 dark:text-slate-200">
                <Camera size={14} />
              </button>
            </div>
            <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
              {user?.name || "Learner"}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {user?.role || "Interview Candidate"}
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-amber-500">
              <Star size={16} fill="currentColor" />{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                New user
              </span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Personal information
              </h2>
              <Button variant="secondary" className="gap-2">
                <Pencil size={14} /> Edit
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/40">
                <UserRound className="text-sky-500" size={18} />
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Full name
                  </div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    {user?.name || "—"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/40">
                <Mail className="text-sky-500" size={18} />
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Email
                  </div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    {user?.email || "—"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/40">
                <ShieldCheck className="text-sky-500" size={18} />
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Preparation
                  </div>
                  <div className="font-medium text-slate-900 dark:text-white">
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
