import { useState, useEffect } from "react";
import { CheckCircle2, Flame, Rocket } from "lucide-react";
import { Button, Card } from "../components/ui";
import { dailyChallengeApi } from "../services/dailyChallengeApi";

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
  const [challenge, setChallenge] = useState<{
    _id: string;
    date: string;
    questions: Array<{
      _id: string;
      question: string;
      category: string;
      topic: string;
      difficulty: string;
      type: string;
      options?: string[];
      tags: string[];
      codeExample?: string;
    }>;
    totalQuestions: number;
  } | null>(null);
  const [progress, setProgress] = useState<{
    completedQuestions: string[];
    completed: boolean;
    totalQuestions: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadChallenge = async () => {
      setLoading(true);
      try {
        const [challengeRes, progressRes] = await Promise.all([
          dailyChallengeApi.getDailyChallenge(),
          dailyChallengeApi.getDailyProgress(),
        ]);

        if (cancelled) return;
        if (challengeRes.success && challengeRes.data) {
          setChallenge(challengeRes.data);
        }
        if (progressRes.success && progressRes.data) {
          setProgress({
            completedQuestions: progressRes.data.completedQuestions || [],
            completed: progressRes.data.completed || false,
            totalQuestions: progressRes.data.totalQuestions || 0,
          });
        }
      } catch {
        // keep empty state on error
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadChallenge();
    return () => {
      cancelled = true;
    };
  });

  const toggleDone = async (questionId: string) => {
    if (!user) {
      return;
    }
    if (completing) return;
    setCompleting(questionId);
    try {
      const res = await dailyChallengeApi.completeQuestion(questionId);
      if (res.success && res.data) {
        setProgress({
          completedQuestions: res.data.completedQuestions || [],
          completed: res.data.completed || false,
          totalQuestions: res.data.totalQuestions || 0,
        });
        setChallenge((prev) =>
          prev
            ? {
                ...prev,
                totalQuestions: res.data.totalQuestions || prev.totalQuestions,
              }
            : prev,
        );
      }
    } catch {
      // ignore
    } finally {
      setCompleting(null);
    }
  };

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
          {loading ? (
            <Card className="p-6">
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800"
                  />
                ))}
              </div>
            </Card>
          ) : challenge ? (
            challenge.questions.map((item) => {
              const isCompleted = progress?.completedQuestions.includes(item._id);
              return (
                <Card key={item._id} className="p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">
                        {item.question}
                      </p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        {item.topic}
                      </p>
                      <span className="mt-2 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant={isCompleted ? "secondary" : "primary"}
                        onClick={() => toggleDone(item._id)}
                        disabled={completing === item._id}
                        className="gap-2"
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          <Rocket size={16} />
                        )}{" "}
                        {isCompleted ? "Done" : "Mark done"}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            <Card className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
              No daily challenge available yet.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
