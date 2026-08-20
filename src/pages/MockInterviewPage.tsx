import { useMemo, useState, useEffect, useCallback } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  PlayCircle,
  Star,
  TimerReset,
  XCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button, Card, ProgressBar } from "../components/ui";
import { interviewApi } from "../services/interviewApi";

const interviewModes = ["Frontend", "Backend", "Full Stack", "System Design"];
const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];
const TOTAL_TIME = 15 * 60;

type CurrentQuestion = {
  id: string;
  question: string;
  topic: string;
  difficulty: string;
  options: string[];
  currentIndex: number;
  totalQuestions: number;
};

export function MockInterviewPage({
  user,
}: {
  user: any;
}) {
  const [mode, setMode] = useState("Frontend");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  const progress = useMemo(
    () => ((TOTAL_TIME - timeLeft) / TOTAL_TIME) * 100,
    [timeLeft],
  );

  useEffect(() => {
    if (!started || submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, submitted, timeLeft]);

  const startSession = async () => {
    if (!user) {
      setError("Please log in to start an interview.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await interviewApi.startInterview({
        category: mode,
        difficulty,
        count: 5,
      });

      if (res.success && res.data) {
        setSessionId(res.data.sessionId);
        setCurrentQuestion(res.data.currentQuestion);
        setStarted(true);
        setTimeLeft(TOTAL_TIME);
        setSubmitted(false);
        setResult(null);
        setAnswers({});
      } else {
        setError("Failed to start interview. Please try again.");
      }
    } catch {
      setError("Failed to start interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!sessionId || !currentQuestion) return;
    const answer = answers[currentQuestion.id] || "";
    setLoading(true);
    setError("");
    try {
      await interviewApi.submitAnswer(sessionId, {
        questionId: currentQuestion.id,
        answer,
      });

      const nextRes = await interviewApi.nextQuestion(sessionId);
      if (nextRes.success && nextRes.data) {
        if (nextRes.data.done) {
          await finishInterview();
        } else if (nextRes.data.currentQuestion) {
          setCurrentQuestion(nextRes.data.currentQuestion);
        }
      }
    } catch {
      setError("Failed to submit answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const finishInterview = async () => {
    if (!sessionId) return;
    setLoading(true);
    setError("");
    try {
      const res = await interviewApi.completeInterview(sessionId);
      if (res.success && res.data) {
        setResult(res.data);
        setSubmitted(true);
        setStarted(false);
      } else {
        setError("Failed to complete interview. Please try again.");
      }
    } catch {
      setError("Failed to complete interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

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
        </div>

        {loading ? (
          <Card className="p-6">
            <div className="h-64 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
          </Card>
        ) : error ? (
          <Card className="p-6 text-center text-sm text-rose-600 dark:text-rose-400">
            {error}
          </Card>
        ) : !started && !submitted ? (
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

              <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Format
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                  {mode} Interview — {difficulty}
                </h2>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  5 MCQ questions • {TOTAL_TIME / 60} minutes • One question at a time
                </p>
              </div>

              <div className="mt-6">
                <Button onClick={startSession} className="gap-2" disabled={loading}>
                  <PlayCircle size={16} /> Start interview
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Session overview
              </h2>
              <div className="mt-5 space-y-4">
                {[
                  { label: "Duration", value: `${TOTAL_TIME / 60} min` },
                  { label: "Questions", value: "5 rounds" },
                  { label: "Evaluation", value: "Instant scoring" },
                  { label: "Focus", value: "Technical accuracy" },
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
        ) : submitted && result ? (
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white">
              <CheckCircle2 className="text-emerald-500" /> Interview completed
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Overall score
                </p>
                <p className="mt-2 text-3xl font-bold">{result.score}%</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Technical
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {result.technicalScore}%
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Communication
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {result.communicationScore}%
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Strengths
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {result.strengths?.map((item: string) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 text-emerald-500"
                      />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Weaknesses
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {result.weaknesses?.map((item: string) => (
                    <li key={item} className="flex items-start gap-2">
                      <XCircle size={16} className="mt-0.5 text-rose-500" />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Recommendations
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {result.recommendations?.map((item: string) => (
                  <li key={item} className="flex items-start gap-2">
                    <Star size={16} className="mt-0.5 text-amber-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Your answers
              </h3>
              <div className="mt-4 space-y-4">
                {result.questions?.map((q: any, idx: number) => (
                  <div
                    key={q.questionId}
                    className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {idx + 1}. {q.question}
                    </p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      Your answer:{" "}
                      <span className="text-slate-900 dark:text-white">
                        {q.userAnswer || "No answer provided"}
                      </span>
                    </p>
                    {q.userAnswer !== q.correctAnswer && (
                      <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
                        Correct: {q.correctAnswer}
                      </p>
                    )}
                    {q.explanation && (
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button onClick={() => window.location.reload()}>
                Retry Interview
              </Button>
            </div>
          </Card>
        ) : started && currentQuestion ? (
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <TimerReset size={18} /> {minutes}:{String(seconds).padStart(2, "0")} left
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Question {currentQuestion.currentIndex + 1} / {currentQuestion.totalQuestions}
              </div>
            </div>
            <ProgressBar
              value={(currentQuestion.currentIndex / currentQuestion.totalQuestions) * 100}
              className="mb-6"
            />

            <div className="mb-2 text-sm text-slate-500 dark:text-slate-400">
              {currentQuestion.topic} • {currentQuestion.difficulty}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {currentQuestion.question}
            </h2>
            <div className="mt-6 space-y-3">
              {currentQuestion.options.map((option: string) => (
                <button
                  key={option}
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id]: option,
                    }))
                  }
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                    answers[currentQuestion.id] === option
                      ? "border-sky-500 bg-sky-50 text-sky-700 dark:border-sky-400 dark:bg-sky-950/30 dark:text-sky-200"
                      : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  }`}
                >
                  <span>{option}</span>
                  {answers[currentQuestion.id] === option && (
                    <CheckCircle2 size={18} />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <Button
                variant="secondary"
                onClick={() => setCurrentQuestion(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitAnswer}
                disabled={loading || !answers[currentQuestion.id]}
              >
                {currentQuestion.currentIndex < currentQuestion.totalQuestions - 1 ? (
                  <>
                    Next <ArrowRight size={16} />
                  </>
                ) : (
                  "Finish interview"
                )}
              </Button>
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
