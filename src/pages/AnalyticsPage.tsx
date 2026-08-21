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
import { Card } from "../components/ui";
import { analyticsApi } from "../services/analyticsApi";
import { useState, useEffect } from "react";

export function AnalyticsPage({
  user,
}: {
  user: any;
}) {
  const [overview, setOverview] = useState<any>(null);
  const [lineData, setLineData] = useState<
    { name: string; solved: number }[]
  >([]);
  const [chartData, setChartData] = useState<
    { name: string; score: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadAnalytics = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const [overviewRes, activityRes, categoriesRes] =
          await Promise.all([
            analyticsApi.getOverview(),
            analyticsApi.getActivity(7),
            analyticsApi.getCategories(),
          ]);

        if (cancelled) return;

        if (overviewRes.success && overviewRes.data) {
          setOverview(overviewRes.data);
        }

        if (activityRes.success && Array.isArray(activityRes.data)) {
          const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const mapped = activityRes.data.map((a: any) => {
            const d = new Date(a.date);
            return {
              name: days[d.getDay()],
              solved: a.count || 0,
            };
          });
          setLineData(mapped);
        }

        if (categoriesRes.success && Array.isArray(categoriesRes.data)) {
          const mapped = categoriesRes.data
            .filter((c: any) => c.total > 0)
            .slice(0, 6)
            .map((c: any) => ({
              name: c.category.slice(0, 2).toUpperCase(),
              score: c.accuracy,
            }));
          setChartData(mapped);
        }
      } catch {
        // keep empty state on error
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadAnalytics();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div>
            <p className="text-sm text-[var(--muted)]">
              Performance
            </p>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Analytics
            </h1>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              label: "Current score",
              value: overview?.avgInterviewScore
                ? `${overview.avgInterviewScore}%`
                : "—",
            },
            {
              label: "Avg. accuracy",
              value: overview?.accuracy ? `${overview.accuracy}%` : "—",
            },
            {
              label: "Weekly streak",
              value: overview?.streak ? `${overview.streak} days` : "—",
            },
          ].map((item) => (
            <Card key={item.label} className="p-4 transition-all duration-200 hover:shadow-[var(--shadow-elevated)]">
              <p className="text-sm text-[var(--muted)]">
                {item.label}
              </p>
              <p className="mt-3 text-3xl font-bold text-[var(--brand-orange)]">
                {item.value}
              </p>
            </Card>
          ))}
        </div>

        {!loading ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card className="p-5 transition-all duration-200 hover:shadow-[var(--shadow-elevated)]">
              <h2 className="text-xl font-bold text-[var(--foreground)]">
                Progress trend
              </h2>
              <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={lineData}>
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
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-5 transition-all duration-200 hover:shadow-[var(--shadow-elevated)]">
              <h2 className="text-xl font-bold text-[var(--foreground)]">
                Category progress
              </h2>
              <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
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
                    <Bar dataKey="score" radius={[8, 8, 0, 0]} fill="var(--brand-orange)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card className="p-5">
              <div className="h-72 animate-pulse rounded-2xl bg-[var(--surface-elevated)]" />
            </Card>
            <Card className="p-5">
              <div className="h-72 animate-pulse rounded-2xl bg-[var(--surface-elevated)]" />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
