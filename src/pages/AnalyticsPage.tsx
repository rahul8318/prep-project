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

const chartData = [
  { name: "Jan", score: 64 },
  { name: "Feb", score: 72 },
  { name: "Mar", score: 78 },
  { name: "Apr", score: 85 },
  { name: "May", score: 80 },
  { name: "Jun", score: 90 },
];

const lineData = [
  { name: "Mon", solved: 3 },
  { name: "Tue", solved: 5 },
  { name: "Wed", solved: 4 },
  { name: "Thu", solved: 8 },
  { name: "Fri", solved: 6 },
  { name: "Sat", solved: 9 },
  { name: "Sun", solved: 10 },
];

export function AnalyticsPage({
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
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Performance
            </p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Analytics
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

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: "Current score", value: "89%" },
            { label: "Avg. accuracy", value: "86%" },
            { label: "Weekly streak", value: "12 days" },
          ].map((item) => (
            <Card key={item.label} className="p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                {item.value}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Progress trend
            </h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={lineData}>
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
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Category progress
            </h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#94a3b8"
                    opacity={0.2}
                  />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]} fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
