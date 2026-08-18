import { useState } from "react";
import { ArrowLeft, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui";
import { authApi } from "../services/authApi";
import { apiClient } from "../services/api";
import type { FormState, UserProfile } from "../types";

export function AuthPage({
  onLogin,
}: {
  onLogin: (user: UserProfile, token?: string) => void;
}) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register" | "forgot" | "reset">(
    "login",
  );
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    name: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (mode === "register") {
      const name = form.name.trim();
      if (!name) newErrors.name = "Name is required";
      else if (name.length < 2)
        newErrors.name = "Name must be at least 2 characters";
      else if (name.length > 50)
        newErrors.name = "Name must be 50 characters or fewer";
    }
    if (form.password.length > 100)
      newErrors.password = "Password must be 100 characters or fewer";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setMessage("");

    try {
      if (mode === "login") {
        const res = await authApi.login({
          email: form.email.trim(),
          password: form.password,
        });
        if (res.success && res.data) {
          apiClient.setToken(res.data.accessToken);
          const userProfile: UserProfile = {
            id: res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
            password: "",
            role: res.data.user.role || "user",
            skills: res.data.user.skills || [],
            preparationLevel: res.data.user.preparationLevel || "Beginner",
            avatar: res.data.user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase(),
          };
          setMessage("Login successful. Redirecting to your dashboard...");
          onLogin(userProfile, res.data.accessToken);
          navigate("/dashboard", { replace: true });
        } else {
          setMessage("Invalid credentials. Please try again.");
        }
        return;
      }

      if (mode === "register") {
        const res = await authApi.register({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        });
        if (res.success && res.data) {
          apiClient.setToken(res.data.accessToken);
          const userProfile: UserProfile = {
            id: res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
            password: "",
            role: res.data.user.role || "user",
            skills: res.data.user.skills || [],
            preparationLevel: res.data.user.preparationLevel || "Beginner",
            avatar: res.data.user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase(),
          };
          setMessage("Registration successful. Welcome to InterviewHub!");
          onLogin(userProfile, res.data.accessToken);
          navigate("/dashboard", { replace: true });
        } else {
          setMessage("Registration failed. Please try again.");
        }
        return;
      }

      setMessage("Password reset link has been sent to your email.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRegister = mode === "register";

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      avatar: "SC",
      quote: "Landed my dream role in 2 weeks!",
    },
    {
      name: "Priya Verma",
      role: "Software Engineer",
      company: "StartUp Inc",
      avatar: "PV",
      quote: "Best interview prep tool ever",
    },
    {
      name: "Amit Patel",
      role: "Design Lead",
      company: "Creative Co",
      avatar: "AP",
      quote: "Structured learning path was key",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-violet-50 px-4 py-10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Panel: Sign-In Form */}
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-sky-600 dark:text-slate-300"
            >
              <ArrowLeft size={16} /> Back home
            </Link>

            <div className="mb-8">
              <img
                src="/logo.svg"
                alt="InterviewHub"
                className="h-10 w-10 rounded-2xl object-cover"
              />
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {mode === "login"
                  ? "Welcome back"
                  : mode === "register"
                    ? "Create account"
                    : mode === "forgot"
                      ? "Reset password"
                      : "Choose a new password"}
              </h1>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                {mode === "login"
                  ? "Sign in to continue your interview prep"
                  : mode === "register"
                    ? "Join thousands preparing for success"
                    : "Get back into your account"}
              </p>
            </div>

            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Or continue with email
              </span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
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
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose-600">{errors.name}</p>
                  )}
                </label>
              )}

              {(mode === "login" ||
                mode === "register" ||
                mode === "forgot") && (
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
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-600">{errors.email}</p>
                  )}
                </label>
              )}

              {(mode === "login" ||
                mode === "register" ||
                mode === "reset") && (
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
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-rose-600">
                      {errors.password}
                    </p>
                  )}
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

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? "Please wait..."
                  : mode === "login"
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
                <div className="text-center text-sm text-slate-500 dark:text-slate-300">
                  {mode === "login" ? "New here?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() =>
                      setMode(mode === "login" ? "register" : "login")
                    }
                    className="font-semibold text-sky-600 hover:text-sky-500"
                  >
                    {mode === "login" ? "Create account" : "Sign in"}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Right Panel: Trust Ring & Testimonials */}
          <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
            {/* Orbital Trust Ring */}
            <div className="relative h-80 w-80">
              {/* Center circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full border-2 border-dashed border-sky-200 p-8 dark:border-slate-700">
                  <img
                    src="/logo.svg"
                    alt="InterviewHub"
                    className="h-20 w-20 rounded-full object-cover shadow-lg shadow-sky-500/20"
                  />
                </div>
              </div>

              {/* Orbital testimonials */}
              {testimonials.map((testimonial, index) => {
                const angle = (index * 360) / testimonials.length;
                const radius = 140;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <div
                    key={testimonial.name}
                    className="absolute left-1/2 top-1/2 w-32 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-slate-900"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-600 dark:bg-sky-900/40 dark:text-sky-400">
                      {testimonial.avatar}
                    </div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </p>
                    <p className="mt-2 text-xs italic text-slate-600 dark:text-slate-300">
                      "{testimonial.quote}"
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Trusted by 10,000+ professionals
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Join our community of successful candidates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
