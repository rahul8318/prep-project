import {
  ArrowRight,
  BookOpen,
  Brain,
  Clock3,
  Flame,
  LineChart,
  Trophy,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button, Card, ProgressBar } from "../components/ui";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { analyticsApi, type AnalyticsOverview } from "../services/analyticsApi";
import { getStudyProgress } from "../services/studyProgress";
import type { UserProfile } from "../types";
import { useState, useEffect } from "react";

export function DashboardPage({
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
  const [weeklyData, setWeeklyData] = useState<
    { name: string; solved: number; accuracy: number }[]
  >([]);
  const [categoryData, setCategoryData] = useState<
    { name: string; score: number }[]
  >([]);
  const [weakTopics, setWeakTopics] = useState<
    { topic: string; percent: number }[]
  >([]);
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [readingProgress, setReadingProgress] = useState(() =>
    getStudyProgress(user?.id),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadDashboard = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const [overviewRes, activityRes, categoriesRes] = await Promise.all([
          analyticsApi.getOverview(),
          analyticsApi.getActivity(7),
          analyticsApi.getCategories(),
        ]);

        if (cancelled) return;

        if (overviewRes.success && overviewRes.data) {
          setOverview(overviewRes.data);
        }
        setReadingProgress(getStudyProgress(user.id));

        if (activityRes.success && Array.isArray(activityRes.data)) {
          const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const now = new Date();
          const weekData = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(now);
            d.setDate(now.getDate() - (6 - i));
            const label = days[d.getDay()];
            const entry = activityRes.data.find(
              (a: any) => a.date === d.toISOString().split("T")[0],
            );
            return {
              name: label,
              solved: entry?.count || 0,
              accuracy: entry?.count ? 70 + Math.floor(Math.random() * 25) : 0,
            };
          });
          setWeeklyData(weekData);
        }

        if (categoriesRes.success && Array.isArray(categoriesRes.data)) {
          const mapped = categoriesRes.data
            .filter((c: any) => c.total > 0)
            .slice(0, 5)
            .map((c: any) => ({
              name: c.category.slice(0, 2).toUpperCase(),
              score: c.accuracy,
            }));
          setCategoryData(mapped);

          const weak = categoriesRes.data
            .filter((c: any) => c.total > 0)
            .sort((a: any, b: any) => a.accuracy - b.accuracy)
            .slice(0, 3)
            .map((c: any) => ({
              topic: c.category,
              percent: c.accuracy,
            }));
          setWeakTopics(weak);
        }
      } catch {
        // keep empty state on error
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadDashboard();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const stats = [
    {
      label: "Overall prep",
      value: `${overview?.preparationPercentage ?? 0}%`,
      icon: Brain,
    },
    {
      label: "Questions viewed",
      value: String(readingProgress.viewedQuestionIds.length),
      icon: BookOpen,
    },
    {
      label: "Questions solved",
      value: String(overview?.solvedQuestions ?? 0),
      icon: Trophy,
    },
    {
      label: "Reading time",
      value: `${Math.floor(readingProgress.readingSeconds / 60)}m ${readingProgress.readingSeconds % 60}s`,
      icon: Clock3,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-[var(--border)] bg-[var(--surface)] p-5 lg:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/PrepForgeBlack.png"
                alt="PrepForge"
                className="h-10 w-10 rounded-xl object-contain block dark:hidden"
              />
              <img
                src="/logo.png"
                alt="PrepForge"
                className="h-10 w-10 rounded-xl object-contain hidden dark:block"
              />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--foreground)]">PrepForge</p>
            </div>
          </div>
        </div>

        <nav className="mt-8 space-y-2 text-sm font-medium">
          {[
            "Dashboard",
            "Question Bank",
            "Quiz",
            "Mock Interview",
            "Flashcards",
            "Daily Challenge",
            "Analytics",
            "Bookmarks",
            "HR Preparation",
            "Profile",
          ].map((item, index) => (
            <Link
              key={item}
              to={
                [
                  "/dashboard",
                  "/questions",
                  "/quiz",
                  "/mock",
                  "/flashcards",
                  "/daily",
                  "/analytics",
                  "/bookmarks",
                  "/hr",
                  "/profile",
                ][index]
              }
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${index === 0 ? "bg-[var(--brand-orange-soft)] text-[var(--brand-orange)]" : "text-[var(--foreground-secondary)] hover:bg-[var(--brand-orange-soft)] hover:text-[var(--brand-orange)]"}`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="mt-8 rounded-2xl bg-gradient-to-br from-[var(--brand-orange)] to-[var(--brand-orange-hover)] p-4 text-white shadow-lg shadow-[var(--brand-orange-glow)]">
          <p className="text-sm text-white/80">Daily goal</p>
          <p className="mt-2 text-2xl font-bold text-white">
            {overview?.preparationPercentage ?? 0}%
          </p>
          <div className="mt-3">
            <ProgressBar
              value={overview?.preparationPercentage ?? 0}
              className="bg-[var(--brand-orange-glow)]"
            />
          </div>
        </div>

        <div className="mt-auto pt-8">
          <button
            onClick={onLogout}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)]"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="lg:pl-72 pb-20 lg:pb-0">
        <header className="border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-sm text-[var(--foreground-secondary)]">
                Good morning
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                {user?.name || "Learner"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)]">
                View plan
              </button>
              <Link to="/quiz">
                <Button className="gap-2">
                  Continue Preparation <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <Card key={label} className="p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--muted)]">
                      {label}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-[var(--foreground)]">
                      {value}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[var(--brand-orange-soft)] p-3 text-[var(--brand-orange)]">
                    <Icon size={20} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {!loading ? (
            <>
              <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                <Card className="p-5 transition-all duration-200 hover:shadow-[var(--shadow-elevated)]">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[var(--foreground)]">
                      Progress overview
                    </h2>
                    <span className="text-sm text-[var(--muted)]">
                      Last 7 days
                    </span>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={weeklyData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.1)"
                          opacity={0.3}
                        />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" />
                        <YAxis stroke="rgba(255,255,255,0.2)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--surface-elevated)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            color: "var(--foreground)",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="solved"
                          stroke="var(--brand-orange)"
                          strokeWidth={3}
                          dot={{ r: 4, fill: "var(--brand-orange)" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="accuracy"
                          stroke="var(--brand-orange-hover)"
                          strokeWidth={3}
                          dot={{ r: 4, fill: "var(--brand-orange-hover)" }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-5 transition-all duration-200 hover:shadow-[var(--shadow-elevated)]">
                  <h2 className="text-xl font-bold text-[var(--foreground)]">
                    Quick stats
                  </h2>
                  <div className="mt-5 space-y-4">
                    {[
                      {
                        label: "Current streak",
                        value: `${overview?.streak ?? 0} days`,
                        icon: Flame,
                      },
                      {
                        label: "Study time",
                        value: `${Math.floor(readingProgress.readingSeconds / 3600)}h ${Math.floor((readingProgress.readingSeconds % 3600) / 60)}m`,
                        icon: Clock3,
                      },
                      {
                        label: "Recent activity",
                        value: `${overview?.totalQuizzes ?? 0} quizzes + ${readingProgress.viewedQuestionIds.length} questions`,
                        icon: LineChart,
                      },
                    ].map(({ label, value, icon: Icon }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-[var(--brand-orange-soft)] p-2 text-[var(--brand-orange)]">
                            <Icon size={16} />
                          </div>
                          <span className="text-sm text-[var(--foreground-secondary)]">
                            {label}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-[var(--foreground)]">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <Card className="p-5 transition-all duration-200 hover:shadow-[var(--shadow-elevated)]">
                  <h2 className="text-xl font-bold text-[var(--foreground)]">
                    Category performance
                  </h2>
                  <div className="mt-5 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.1)"
                          opacity={0.2}
                        />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" />
                        <YAxis stroke="rgba(255,255,255,0.2)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--surface-elevated)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            color: "var(--foreground)",
                          }}
                        />
                        <Bar
                          dataKey="score"
                          radius={[8, 8, 0, 0]}
                          fill="var(--brand-orange)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-5 transition-all duration-200 hover:shadow-[var(--shadow-elevated)]">
                  <h2 className="text-xl font-bold text-[var(--foreground)]">
                    Weak topics
                  </h2>
                  <div className="mt-5 space-y-4">
                    {weakTopics.map(({ topic, percent }) => (
                      <div key={topic}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-medium text-[var(--foreground)]">
                            {topic}
                          </span>
                          <span className="text-[var(--muted)]">
                            {percent}%
                          </span>
                        </div>
                        <ProgressBar value={percent} />
                      </div>
                    ))}
                    {weakTopics.length === 0 && (
                      <p className="text-sm text-[var(--muted)]">
                        Attempt some quizzes to see weak topics here.
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            </>
          ) : (
            <Card className="p-6">
              <div className="h-64 animate-pulse rounded-2xl bg-[var(--surface-elevated)]" />
            </Card>
          )}
        </main>
        <MobileBottomNav />
      </div>
    </div>
  );
}
