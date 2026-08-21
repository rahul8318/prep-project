import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Code2,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, ThemeToggle } from "../components/ui";
import { analyticsApi } from "../services/analyticsApi";
import type { AnalyticsOverview, CategoryPerformance } from "../services/analyticsApi";

const features = [
  {
    icon: BrainCircuit,
    title: "Adaptive Practice",
    description:
      "Prepare for real interviews with topic-based drills and guided recommendations.",
  },
  {
    icon: Code2,
    title: "Coding & CS Topics",
    description:
      "Cover DSA, OS, DBMS, networking, and frontend domain-specific problem solving.",
  },
  {
    icon: Trophy,
    title: "Mock Interviews",
    description:
      "Simulate recruiter and technical rounds with live scoring and feedback.",
  },
  {
    icon: ShieldCheck,
    title: "Weakness Insights",
    description:
      "Identify your weak areas and follow targeted improvement plans every week.",
  },
];

const stats = [
  { label: "Active learners", value: "24k+" },
  { label: "Interview scores", value: "4.9/5" },
  { label: "Questions solved", value: "180k+" },
  { label: "Success rate", value: "92%" },
];

const technologies = [
  "JavaScript",
  "React",
  "TypeScript",
  "Node.js",
  "DSA",
  "System Design",
  "DBMS",
  "HTML/CSS",
];

const faqs = [
  {
    q: "Does PrepForge help with both coding and HR prep?",
    a: "Yes. The platform combines technical question banks, quizzes, mock interviews, coding practice, and HR round preparation.",
  },
  {
    q: "Can I track my progress?",
    a: "Absolutely. We record solved questions, quiz scores, streaks, weak topics, and daily challenges in the dashboard.",
  },
  {
    q: "Is it suitable for beginners?",
    a: "Yes. The question bank includes difficulty filters and adaptive recommendations for all levels.",
  },
  {
    q: "Are the answers and explanations included?",
    a: "Each question includes a structured answer and explanation to help users learn from each attempt.",
  },
];

const testimonials = [
  {
    name: "Aisha Khan",
    role: "Frontend Engineer",
    quote:
      "The practice questions and mock interviews gave me the confidence to clear my round at a top startup.",
  },
  {
    name: "Rohit Verma",
    role: "SDE Intern",
    quote:
      "The dashboard and recommendations were incredibly helpful. I knew exactly what to practice next.",
  },
  {
    name: "Priya Nair",
    role: "Full Stack Developer",
    quote:
      "The platform feels premium, and the daily challenge mode kept me consistent for weeks.",
  },
];

export function HomePage({
  theme,
  toggleTheme,
  isAuthenticated = false,
  user,
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
  isAuthenticated?: boolean;
  user: any;
}) {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [categories, setCategories] = useState<CategoryPerformance[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setOverview(null);
      setCategories([]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const loadPreview = async () => {
      try {
        const [overviewRes, categoriesRes] = await Promise.all([
          analyticsApi.getOverview(),
          analyticsApi.getCategories(),
        ]);

        if (cancelled) return;

        if (overviewRes.success && overviewRes.data) {
          setOverview(overviewRes.data);
        }
        if (categoriesRes.success && Array.isArray(categoriesRes.data)) {
          setCategories(categoriesRes.data);
        }
      } catch {
        // keep empty state on error
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadPreview();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, user]);

  const preparationPercent = overview?.preparationPercentage ?? 0;
  const streak = overview?.streak ?? 0;
  const topCategories = categories
    .filter((c) => c.score > 0)
    .slice(0, 2);
  const weakCategories = categories
    .filter((c) => c.score > 0)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/PrepForgeBlack.png"
                alt="PrepForge"
                className="h-10 w-10 rounded-xl object-contain shadow-lg shadow-[var(--brand-orange-glow)] block dark:hidden"
              />
              <img
                src="/logo.png"
                alt="PrepForge"
                className="h-10 w-10 rounded-xl object-contain shadow-lg shadow-[var(--brand-orange-glow)] hidden dark:block"
              />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">PrepForge</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--foreground-secondary)] md:flex">
            <a
              href="#home"
              className="hover:text-[var(--brand-orange)] transition-colors"
            >
              Home
            </a>
            <a
              href="#features"
              className="hover:text-[var(--brand-orange)] transition-colors"
            >
              Features
            </a>
            <a
              href="#practice"
              className="hover:text-[var(--brand-orange)] transition-colors"
            >
              Practice
            </a>
            <a
              href="#mock"
              className="hover:text-[var(--brand-orange)] transition-colors"
            >
              Mock Interview
            </a>
            <a
              href="#pricing"
              className="hover:text-[var(--brand-orange)] transition-colors"
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle dark={theme === "dark"} onToggle={toggleTheme} />
            {isAuthenticated && user ? (
              <>
                <span className="hidden text-sm font-medium text-[var(--foreground-secondary)] sm:inline-flex">
                  {user.name}
                </span>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-orange)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[var(--brand-orange-glow)] hover:bg-[var(--brand-orange-hover)] transition-all"
                >
                  Dashboard <ArrowRight size={16} />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="hidden rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition-all sm:inline-flex"
                >
                  Login
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-orange)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[var(--brand-orange-glow)] hover:bg-[var(--brand-orange-hover)] transition-all"
                >
                  Get Started <ArrowRight size={16} />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main id="home">
        <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--brand-orange-soft)] via-[var(--background)] to-[var(--background)] dark:from-[var(--brand-orange-soft)] dark:via-[var(--background)] dark:to-[var(--background-secondary)]" />
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h1 className="max-w-xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="text-[var(--foreground)]">Forge Your</span>
                  <br />
                  <span className="text-[var(--brand-orange)]">Future in Tech</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg text-[var(--foreground-secondary)]">
                  PrepForge helps students and developers sharpen technical
                  and HR interview skills with personalized practice, real-world
                  questions, mock interviews, and progress analytics.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/dashboard">
                    <Button className="gap-2">
                      Start practicing <ArrowRight size={16} />
                    </Button>
                  </Link>
                  <a href="#features">
                    <Button variant="secondary">Explore features</Button>
                  </a>
                </div>
                <div className="mt-10 flex flex-wrap gap-8">
                  {stats.map((item) => (
                    <div key={item.label}>
                      <div className="text-2xl font-bold text-[var(--brand-orange)]">
                        {item.value}
                      </div>
                      <div className="text-sm text-[var(--foreground-secondary)]">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-8 top-6 h-24 w-24 rounded-full bg-[var(--brand-orange-glow)] blur-3xl" />
                <div className="absolute -right-6 bottom-10 h-24 w-24 rounded-full bg-[var(--brand-orange-glow)] blur-3xl" />
                <div className="relative rounded-[28px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-[var(--shadow-elevated)]">
                  <div className="rounded-[20px] bg-[var(--background)] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="h-3 w-3 rounded-full bg-[var(--brand-orange)]" />
                        <span className="h-3 w-3 rounded-full bg-[var(--foreground-secondary)]" />
                        <span className="h-3 w-3 rounded-full bg-[var(--muted)]" />
                      </div>
                      <span className="rounded-full bg-[var(--brand-orange-soft)] px-2 py-1 text-xs text-[var(--brand-orange)]">
                        Live Prep
                      </span>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl bg-[var(--surface-elevated)] p-4">
                        <div className="text-sm text-[var(--foreground-secondary)]">
                          Preparation
                        </div>
                        <div className="mt-3 text-3xl font-bold text-[var(--foreground)]">
                          {isAuthenticated ? `${preparationPercent}%` : "—"}
                        </div>
                        <div className="mt-4 h-2 rounded-full bg-[var(--surface)]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-hover)]"
                            style={{
                              width: isAuthenticated
                                ? `${Math.min(100, preparationPercent)}%`
                                : "0%",
                            }}
                          />
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs text-[var(--muted)]">
                          <span>
                            {topCategories[0]?.name || "JavaScript"}
                          </span>
                          <span>
                            {isAuthenticated
                              ? `${topCategories[0]?.score ?? 0}%`
                              : "—"}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-[var(--muted)]">
                          <span>
                            {topCategories[1]?.name || "React"}
                          </span>
                          <span>
                            {isAuthenticated
                              ? `${topCategories[1]?.score ?? 0}%`
                              : "—"}
                          </span>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-gradient-to-br from-[var(--brand-orange)] to-[var(--brand-orange-hover)] p-4 text-white">
                        <div className="text-sm text-white/80">Daily streak</div>
                        <div className="mt-3 text-3xl font-bold">
                          {isAuthenticated ? `${streak} days` : "—"}
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-sm">
                          <CheckCircle2 size={16} /> Consistent practice
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl bg-[var(--surface-elevated)] p-4">
                      <div className="mb-2 flex items-center justify-between text-sm text-[var(--foreground-secondary)]">
                        <span>Weak topics</span>
                        <span>
                          {isAuthenticated && weakCategories.length > 0
                            ? "Needs Review"
                            : "—"}
                        </span>
                      </div>
                      <div className="space-y-2 text-xs text-[var(--muted)]">
                        {weakCategories.length > 0 ? (
                          weakCategories.map((topic) => (
                            <div
                              key={topic.name}
                              className="flex items-center justify-between"
                            >
                              <span>{topic.name}</span>
                              <span>{topic.score}%</span>
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="flex items-center justify-between">
                              <span>TypeScript</span>
                              <span>—</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>DSA</span>
                              <span>—</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>React Hooks</span>
                              <span>—</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-orange)]">
                Features
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)]">
                Everything you need to ace your next interview
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map(({ icon: Icon, title, description }) => (
                <Card
                  key={title}
                  className="transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-[var(--brand-orange-soft)] p-3 text-[var(--brand-orange)]">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--foreground-secondary)]">
                    {description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="practice"
          className="bg-[var(--background-secondary)] px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-orange)]">
                  How it works
                </p>
                <h2 className="mt-4 text-3xl font-bold text-[var(--foreground)]">
                  Build your interview confidence in 3 steps
                </h2>
                <div className="mt-8 space-y-6">
                  {[
                    [
                      "01",
                      "Choose your focus area",
                      "Pick React, JavaScript, DSA, DBMS, or HR interview preparation based on your current needs.",
                    ],
                    [
                      "02",
                      "Practice and test yourself",
                      "Answer questions, attempt timed quizzes, and solve coding problems with guided explanations.",
                    ],
                    [
                      "03",
                      "Track improvement",
                      "Review analytics, weak topics, and streak performance to refine your study plan.",
                    ],
                  ].map(([step, title, desc]) => (
                    <Card key={step} className="transition-all duration-200 hover:-translate-y-1">
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-orange-soft)] font-bold text-[var(--brand-orange)]">
                          {step}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--foreground)]">{title}</h3>
                          <p className="mt-1 text-sm text-[var(--foreground-secondary)]">{desc}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              <Card className="transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--foreground-secondary)]">
                      Technology categories
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-[var(--foreground)]">
                      Practice by stack
                    </h3>
                  </div>
                  <div className="rounded-full bg-[var(--brand-orange-soft)] px-3 py-1 text-sm font-semibold text-[var(--brand-orange)]">
                    12 tracks
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[var(--surface)] p-4">
                    <p className="text-sm text-[var(--muted)]">Current goal</p>
                    <p className="mt-2 text-xl font-bold text-[var(--foreground)]">
                      React interview prep
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-[var(--brand-orange)]">
                      <CheckCircle2 size={16} /> 7/10 tasks completed
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[var(--surface)] p-4">
                    <p className="text-sm text-[var(--muted)]">Next milestone</p>
                    <p className="mt-2 text-xl font-bold text-[var(--foreground)]">Mock interview</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-[var(--brand-orange)]">
                      <PlayCircle size={16} /> Ready to start
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="mock" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-orange)]">
                Testimonials
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)]">
                Learners who got hired with PrepForge
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((story) => (
                <Card key={story.name} className="transition-all duration-200 hover:-translate-y-1">
                  <div className="mb-4 flex gap-1 text-[var(--brand-orange)]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-base text-[var(--foreground-secondary)]">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-orange)] to-[var(--brand-orange-hover)] text-sm font-bold text-white">
                      {story.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--foreground)]">{story.name}</div>
                      <div className="text-sm text-[var(--muted)]">{story.role}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--background-secondary)] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-orange)]">
                FAQ
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)]">
                Frequently asked questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map(({ q, a }, index) => (
                <Card key={`${q}-${index}`} className="transition-all duration-200 hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-[var(--foreground)]">
                        {q}
                      </p>
                      <p className="mt-2 text-sm text-[var(--foreground-secondary)]">
                        {a}
                      </p>
                    </div>
                    <ChevronDown className="mt-1 text-[var(--muted)]" size={18} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[28px] border border-[var(--border)] bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-hover)] p-8 text-white shadow-xl shadow-[var(--brand-orange-glow)]">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                  Free plan
                </p>
                <h2 className="mt-4 text-3xl font-bold text-white">
                  Start for free. Upgrade when you are ready.
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  Free forever
                </div>
                <Link to="/auth">
                  <Button
                    variant="secondary"
                    className="bg-white text-[#0A0A0A] hover:bg-white/90 border-0"
                  >
                    Try now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/PrepForgeBlack.png"
                  alt="PrepForge"
                  className="h-9 w-9 rounded-lg object-contain block dark:hidden"
                />
                <img
                  src="/logo.png"
                  alt="PrepForge"
                  className="h-9 w-9 rounded-lg object-contain hidden dark:block"
                />
              </div>
              <div className="font-bold text-[var(--foreground)]">PrepForge</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-[var(--foreground-secondary)]">
            <a href="#features">Features</a>
            <a href="#practice">Practice</a>
            <a href="#mock">Mock Interview</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Users size={16} /> 24k+ users
          </div>
        </div>
      </footer>
    </div>
  );
}
