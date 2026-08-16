import { useState } from "react";
import { CheckCircle2, Flame, Rocket } from "lucide-react";
import { Button, Card } from "../components/ui";

const challengeItems = [
  {
    id: "1",
    title: "Solve 3 JavaScript questions",
    description: "Focus on closures and async patterns.",
    category: "JavaScript",
    completed: false,
  },
  {
    id: "2",
    title: "Practice CSS Grid layout",
    description: "Build one layout challenge and write the explanation.",
    category: "CSS",
    completed: true,
  },
  {
    id: "3",
    title: "Answer one HR question",
    description: "Use the STAR structure for a strong answer.",
    category: "HR",
    completed: false,
  },
  {
    id: "4",
    title: "Review algorithm patterns",
    description: "Study binary search and sliding window.",
    category: "DSA",
    completed: false,
  },
];

export function DailyChallengePage({
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
  const [items, setItems] = useState(challengeItems);

  const toggleDone = (id: string) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Consistency streak
            </p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Daily Challenge
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

        <Card className="mb-6 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Today's streak
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                12 days
              </p>
            </div>
            <div className="rounded-2xl bg-orange-100 p-3 text-orange-600 dark:bg-orange-950/40 dark:text-orange-300">
              <Flame size={22} />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant={item.completed ? "secondary" : "primary"}
                    onClick={() => toggleDone(item.id)}
                    className="gap-2"
                  >
                    {item.completed ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Rocket size={16} />
                    )}{" "}
                    {item.completed ? "Done" : "Mark done"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
