import { useState } from "react";
import { ArrowLeft, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui";
import type { FormState, UserProfile } from "../types";

const demoUser: UserProfile = {
  id: "user-1",
  name: "Rahul Sharma",
  email: "rahul@example.com",
  password: "demo123",
  role: "Frontend Developer",
  skills: ["React", "TypeScript", "Node.js", "CSS"],
  preparationLevel: "Intermediate",
  avatar: "RS",
};

export function AuthPage({
  onLogin,
}: {
  onLogin: (user: UserProfile) => void;
}) {
  const [mode, setMode] = useState<"login" | "register" | "forgot" | "reset">(
    "login",
  );
  const [form, setForm] = useState<FormState>({
    email: demoUser.email,
    password: demoUser.password,
    name: demoUser.name,
  });
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      if (
        form.email === demoUser.email &&
        form.password === demoUser.password
      ) {
        setMessage("Login successful. Redirecting to your dashboard...");
        onLogin(demoUser);
        window.location.href = "/dashboard";
      } else {
        setMessage(
          "Invalid credentials. Use the demo account or create a new one.",
        );
      }
      return;
    }
    if (mode === "register") {
      const createdUser: UserProfile = {
        ...demoUser,
        id: `user-${Date.now()}`,
        name: form.name || demoUser.name,
        email: form.email || demoUser.email,
        password: form.password || demoUser.password,
      };
      onLogin(createdUser);
      setMessage("Registration successful. Welcome to InterviewHub!");
      window.location.href = "/dashboard";
      return;
    }
    setMessage("Password reset link has been prepared for this demo flow.");
  };

  const isRegister = mode === "register";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-violet-50 px-4 py-10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-sky-600 dark:text-slate-300"
        >
          <ArrowLeft size={16} /> Back home
        </Link>

        <div className="mb-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 font-bold text-white">
            I
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
            {mode === "login"
              ? "Welcome back"
              : mode === "register"
                ? "Create account"
                : mode === "forgot"
                  ? "Reset password"
                  : "Choose a new password"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Full name
              </span>
              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-slate-400"
                  size={18}
                />
                <input
                  value={form.name || ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950"
                  placeholder="Enter your name"
                />
              </div>
            </label>
          )}

          {(mode === "login" || mode === "register" || mode === "forgot") && (
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Email
              </span>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-slate-400"
                  size={18}
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950"
                  placeholder="you@example.com"
                />
              </div>
            </label>
          )}

          {(mode === "login" || mode === "register" || mode === "reset") && (
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Password
              </span>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-slate-400"
                  size={18}
                />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, password: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950"
                  placeholder="••••••••"
                />
              </div>
            </label>
          )}

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-300">
            {mode === "login" ? (
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="font-medium text-sky-600 hover:text-sky-500"
              >
                Forgot password?
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-medium text-sky-600 hover:text-sky-500"
              >
                Back to login
              </button>
            )}
          </div>

          <Button type="submit" className="w-full">
            {mode === "login"
              ? "Sign in"
              : mode === "register"
                ? "Create account"
                : mode === "forgot"
                  ? "Send reset link"
                  : "Update password"}
          </Button>

          {message && (
            <div className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-200">
              {message}
            </div>
          )}

          {mode !== "forgot" && mode !== "reset" && (
            <div className="pt-2 text-center text-sm text-slate-500 dark:text-slate-300">
              {mode === "login" ? "New here?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="font-semibold text-sky-600 hover:text-sky-500"
              >
                {mode === "login" ? "Create account" : "Sign in"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
