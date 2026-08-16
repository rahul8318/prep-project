import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Mic,
  PlayCircle,
  Star,
  TimerReset,
} from "lucide-react";
import { Button, Card, ProgressBar } from "../components/ui";
import type { InterviewResult } from "../types";

const interviewModes = ["Frontend", "Backend", "Full Stack", "System Design"];
const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

export function MockInterviewPage({
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
  const [mode, setMode] = useState("Frontend");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [score, setScore] = useState(86);

  const progress = useMemo(
    () => ((15 * 60 - timeLeft) / (15 * 60)) * 100,
    [timeLeft],
  );

  const startSession = () => {
    setStarted(true);
    setTimeLeft(15 * 60);
  };

  const finishInterview = () => {
    const result: InterviewResult = {
      id: `mock-${Date.now()}`,
      technology: mode,
      difficulty,
      score,
      technicalKnowledge: 89,
      accuracy: 90,
      timeManagement: 82,
      strongAreas: ["JS fundamentals", "Problem solving", "Communication"],
      weakAreas: ["System design depth", "Backend tradeoffs"],
      recommendedTopics: ["React rendering", "REST APIs", "Async patterns"],
      suggestedQuestions: [
        "Explain hydration and SSR tradeoffs",
        "Design a scalable chat API",
      ],
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "interviewhub-mock-results",
      JSON.stringify([
        ...JSON.parse(
          localStorage.getItem("interviewhub-mock-results") || "[]",
        ),
        result,
      ]),
    );
    setStarted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Interview simulator
            </p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Mock Interview
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

        {!started ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
            <Card className="p-6">
              <div className="flex items-center gap-3 text-sky-600">
                <BriefcaseBusiness size={20} /> Interview round setup
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-600 dark:text-slate-300">
                    Track
                  </label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"
                  >
                    {interviewModes.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-600 dark:text-slate-300">
                    Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"
                  >
                    {difficultyLevels.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Prompt
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                  Explain how React re-renders and what causes unnecessary
                  re-renders.
                </h2>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  Practice answering with clear structure, examples, and
                  reasoning. Focus on trade-offs and optimization.
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <Button onClick={startSession} className="gap-2">
                  <PlayCircle size={16} /> Start interview
                </Button>
                <Button variant="secondary">View rubric</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Session overview
              </h2>
              <div className="mt-5 space-y-4">
                {[
                  { label: "Duration", value: "15 min" },
                  { label: "Questions", value: "5 rounds" },
                  { label: "Evaluation", value: "Live score" },
                  { label: "Focus", value: "Communication + depth" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/40"
                  >
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ) : (
          <Card className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                <Mic size={18} className="text-sky-500" /> Live mock interview
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <TimerReset size={16} /> {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar value={progress} />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/40">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Current prompt
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                Can you walk me through a recent project and the technical
                decisions you made?
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { label: "Technical depth", value: "88%" },
                { label: "Communication", value: "92%" },
                { label: "Confidence", value: "84%" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <Button onClick={finishInterview} className="gap-2">
                <CheckCircle2 size={16} /> Finish and review
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
