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
      accent: "sky",
    },
    {
      label: "Questions viewed",
      value: String(readingProgress.viewedQuestionIds.length),
      icon: BookOpen,
      accent: "violet",
    },
    {
      label: "Questions solved",
      value: String(overview?.solvedQuestions ?? 0),
      icon: Trophy,
      accent: "emerald",
    },
    {
      label: "Reading time",
      value: `${Math.floor(readingProgress.readingSeconds / 60)}m ${readingProgress.readingSeconds % 60}s`,
      icon: Clock3,
      accent: "amber",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="InterviewHub"
              className="h-10 w-10 rounded-xl object-cover"
            />
            <div>
              <p className="text-lg font-bold">InterviewHub</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 px-2 py-1 text-xs dark:border-slate-700"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
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
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${index === 0 ? "bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="mt-8 rounded-2xl bg-gradient-to-br from-sky-600 to-violet-600 p-4 text-white">
          <p className="text-sm text-sky-100">Daily goal</p>
          <p className="mt-2 text-2xl font-bold">
            {overview?.preparationPercentage ?? 0}%
          </p>
          <div className="mt-3">
            <ProgressBar
              value={overview?.preparationPercentage ?? 0}
              className="bg-white/20"
            />
          </div>
        </div>

        <button
          onClick={onLogout}
          className="mt-8 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
        >
          Logout
        </button>
      </aside>

      <div className="lg:pl-72">
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Good morning
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {user?.name || "Learner"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium dark:border-slate-700 dark:bg-slate-950">
                View plan
              </button>
              <Link to="/quiz">
                <Button>
                  Continue Preparation <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ label, value, icon: Icon, accent }) => (
              <Card key={label} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {label}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                      {value}
                    </p>
                  </div>
                  <div
                    className={`rounded-xl bg-${accent}-100 p-3 text-${accent}-600 dark:bg-${accent}-950/40 dark:text-${accent}-300`}
                  >
                    <Icon size={20} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {!loading ? (
            <>
              <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                <Card className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Progress overview
                    </h2>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Last 7 days
                    </span>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={weeklyData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#94a3b8"
                          opacity={0.3}
                        />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="solved"
                          stroke="#38bdf8"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="accuracy"
                          stroke="#a78bfa"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-5">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
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
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-sky-100 p-2 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
                            <Icon size={16} />
                          </div>
                          <span className="text-sm text-slate-600 dark:text-slate-300">
                            {label}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <Card className="p-5">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Category performance
                  </h2>
                  <div className="mt-5 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#94a3b8"
                          opacity={0.2}
                        />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Bar
                          dataKey="score"
                          radius={[8, 8, 0, 0]}
                          fill="#38bdf8"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-5">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Weak topics
                  </h2>
                  <div className="mt-5 space-y-4">
                    {weakTopics.map(({ topic, percent }) => (
                      <div key={topic}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700 dark:text-slate-200">
                            {topic}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {percent}%
                          </span>
                        </div>
                        <ProgressBar value={percent} />
                      </div>
                    ))}
                    {weakTopics.length === 0 && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Attempt some quizzes to see weak topics here.
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            </>
          ) : (
            <Card className="p-6">
              <div className="h-64 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
