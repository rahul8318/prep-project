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
  onLogin: (user: UserProfile, token?: string, refreshToken?: string) => void;
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
          apiClient.setTokens(res.data.accessToken, res.data.refreshToken);
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
          onLogin(userProfile, res.data.accessToken, res.data.refreshToken);
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
          apiClient.setTokens(res.data.accessToken, res.data.refreshToken);
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
          onLogin(userProfile, res.data.accessToken, res.data.refreshToken);
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
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-10 transition-colors duration-200">
      <div className="w-full max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Panel: Sign-In Form */}
          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--foreground-secondary)] hover:text-[var(--brand-orange)] transition-colors"
            >
              <ArrowLeft size={16} /> Back home
            </Link>

            <div className="mb-8">
              <div className="relative mb-6">
                <img
                  src="/PrepForgeBlack.png"
                  alt="PrepForge"
                  className="h-10 w-10 rounded-2xl object-contain block dark:hidden"
                />
                <img
                  src="/logo.png"
                  alt="PrepForge"
                  className="h-10 w-10 rounded-2xl object-contain hidden dark:block"
                />
              </div>
              <h1 className="text-3xl font-bold text-[var(--foreground)]">
                {mode === "login"
                  ? "Welcome back"
                  : mode === "register"
                    ? "Create account"
                    : mode === "forgot"
                      ? "Reset password"
                      : "Choose a new password"}
              </h1>
              <p className="mt-2 text-[var(--foreground-secondary)]">
                {mode === "login"
                  ? "Sign in to continue your interview prep"
                  : mode === "register"
                    ? "Join thousands preparing for success"
                    : "Get back into your account"}
              </p>
            </div>

            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[var(--border)]" />
              <span className="text-xs text-[var(--muted)]">
                Or continue with email
              </span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[var(--foreground-secondary)]">
                    Full name
                  </span>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-3 text-[var(--muted)]"
                      size={18}
                    />
                    <input
                      value={form.name || ""}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--brand-orange)] focus:shadow-[var(--brand-orange-soft)]"
                      placeholder="Enter your name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">{errors.name}</p>
                  )}
                </label>
              )}

              {(mode === "login" ||
                mode === "register" ||
                mode === "forgot") && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[var(--foreground-secondary)]">
                    Email
                  </span>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-3 text-[var(--muted)]"
                      size={18}
                    />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--brand-orange)] focus:shadow-[var(--brand-orange-soft)]"
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">{errors.email}</p>
                  )}
                </label>
              )}

              {(mode === "login" ||
                mode === "register" ||
                mode === "reset") && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[var(--foreground-secondary)]">
                    Password
                  </span>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-3 text-[var(--muted)]"
                      size={18}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      autoComplete="off"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-10 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--brand-orange)] focus:shadow-[var(--brand-orange-soft)]"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                      {errors.password}
                    </p>
                  )}
                </label>
              )}

              <div className="flex items-center justify-between text-xs text-[var(--foreground-secondary)]">
                {mode === "login" ? (
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="font-medium text-[var(--brand-orange)] hover:text-[var(--brand-orange-hover)] transition-colors"
                  >
                    Forgot password?
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="font-medium text-[var(--brand-orange)] hover:text-[var(--brand-orange-hover)] transition-colors"
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
                <div className="rounded-xl border border-[var(--brand-orange)]/20 bg-[var(--brand-orange-soft)] px-3 py-2 text-sm text-[var(--brand-orange)]">
                  {message}
                </div>
              )}

              {mode !== "forgot" && mode !== "reset" && (
                <div className="text-center text-sm text-[var(--foreground-secondary)]">
                  {mode === "login" ? "New here?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() =>
                      setMode(mode === "login" ? "register" : "login")
                    }
                    className="font-semibold text-[var(--brand-orange)] hover:text-[var(--brand-orange-hover)] transition-colors"
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
                <div className="rounded-full border-2 border-dashed border-[var(--border)] p-8">
                  <div className="relative">
                    <img
                      src="/PrepForgeBlack.png"
                      alt="PrepForge"
                      className="h-20 w-20 rounded-full object-contain shadow-lg shadow-[var(--brand-orange-glow)] block dark:hidden"
                    />
                    <img
                      src="/logo.png"
                      alt="PrepForge"
                      className="h-20 w-20 rounded-full object-contain shadow-lg shadow-[var(--brand-orange-glow)] hidden dark:block"
                    />
                  </div>
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
                    className="absolute left-1/2 top-1/2 w-32 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow)]"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-orange-soft)] text-xs font-bold text-[var(--brand-orange)]">
                      {testimonial.avatar}
                    </div>
                    <p className="text-xs font-semibold text-[var(--foreground)]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      {testimonial.role}
                    </p>
                    <p className="mt-2 text-xs italic text-[var(--foreground-secondary)]">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Trusted by 10,000+ professionals
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Join our community of successful candidates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
