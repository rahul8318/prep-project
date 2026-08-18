import { useMemo, useState } from "react";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { Button, Card, ProgressBar } from "../components/ui";
import { quizApi } from "../services/quizApi";
import type { QuizResult } from "../types";

const choices = ["Option A", "Option B", "Option C", "Option D"];

export function QuizPage({
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
  const [category, setCategory] = useState("JavaScript");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState<
    Array<{
      id: string;
      question: string;
      options: string[];
      category: string;
      difficulty: string;
      topic: string;
      answer?: string;
      correctAnswer?: string;
      explanation?: string;
    }>
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quizResult, setQuizResult] = useState<any>(null);

  const startQuiz = async () => {
    if (!user) {
      setError("Please log in to start a quiz.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await quizApi.startQuiz({
        category,
        difficulty,
        count: questionCount,
      });

      if (res.success && res.data) {
        setQuestions(
          res.data.questions.map((q: any) => ({
            ...q,
            options: q.options.length > 0 ? q.options : choices,
          })),
        );
        setCurrentIndex(0);
        setSubmitted(false);
        setSelectedAnswers({});
        setTimeLeft(180);
      } else {
        setError("Failed to start quiz. Please try again.");
      }
    } catch {
      setError("Failed to start quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentIndex];
  const progress = questions.length
    ? ((currentIndex + 1) / questions.length) * 100
    : 0;

  const submitQuiz = async () => {
    setLoading(true);
    setError("");
    try {
      const answers: Record<string, string> = {};
      for (const q of questions) {
        answers[q.id] = selectedAnswers[q.id] || "";
      }

      const res = await quizApi.submitQuiz({
        sessionId: currentQuestion?.id || Date.now().toString(),
        answers,
        timeTaken: 180 - timeLeft,
      });

      if (res.success && res.data) {
        setQuizResult(res.data);
        setSubmitted(true);
      } else {
        setError("Failed to submit quiz. Please try again.");
      }
    } catch {
      setError("Failed to submit quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const answer = (option: string) =>
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));

  const score = questions.reduce(
    (acc, question) =>
      acc + (selectedAnswers[question.id] === question.answer ? 1 : 0),
    0,
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Quiz mode
            </p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Technical Quiz
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
              className="rounded-x1 bg-slate-900 px-3 py-2 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900"
            >
              Logout
            </button>
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
        ) : !questions.length ? (
          <Card className="p-6">
            <div className="grid gap-5 md:grid-cols-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"
              >
                {["JavaScript", "React", "TypeScript", "CSS", "DSA", "HR"].map(
                  (item) => (
                    <option key={item}>{item}</option>
                  ),
                )}
              </select>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"
              >
                {["Beginner", "Intermediate", "Advanced"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"
              >
                {[5, 10, 15].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <Button onClick={startQuiz}>Start quiz</Button>
            </div>
          </Card>
        ) : submitted && quizResult ? (
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white">
              <CheckCircle2 className="text-emerald-500" /> Quiz completed
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Final score
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {quizResult.score}/{quizResult.totalQuestions}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Accuracy
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {quizResult.accuracy}%
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Correct
                </p>
                <p className="mt-2 text-3xl font-bold text-emerald-600">
                  {quizResult.correctAnswers}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Wrong
                </p>
                <p className="mt-2 text-3xl font-bold text-rose-600">
                  {quizResult.incorrectAnswers}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {questions.map((question, idx) => {
                const selected = selectedAnswers[question.id];
                const correctAnswer =
                  question.options?.[0] || question.correctAnswer;
                const isCorrect = selected === correctAnswer;
                return (
                  <div
                    key={question.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {idx + 1}. {question.question}
                    </p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      Your answer:{" "}
                      <span
                        className={
                          isCorrect ? "text-emerald-600" : "text-rose-600"
                        }
                      >
                        {selected || "No answer"}
                      </span>
                    </p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      Correct answer: {correctAnswer}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
        ) : currentQuestion ? (
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Clock3 size={18} /> {timeLeft}s left
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Question {currentIndex + 1} / {questions.length}
              </div>
            </div>
            <ProgressBar value={progress} className="mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {currentQuestion.question}
            </h2>
            <div className="mt-6 space-y-3">
              {currentQuestion.options.map((option: string) => (
                <button
                  key={option}
                  onClick={() => answer(option)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${selectedAnswers[currentQuestion.id] === option ? "border-sky-500 bg-sky-50 text-sky-700 dark:border-sky-400 dark:bg-sky-950/30 dark:text-sky-200" : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"}`}
                >
                  <span>{option}</span>
                  {selectedAnswers[currentQuestion.id] === option ? (
                    <CheckCircle2 size={18} />
                  ) : null}
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <Button
                variant="secondary"
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
              >
                Previous
              </Button>
              {currentIndex < questions.length - 1 ? (
                <Button onClick={() => setCurrentIndex((prev) => prev + 1)}>
                  Next
                </Button>
              ) : (
                <Button onClick={submitQuiz}>Submit quiz</Button>
              )}
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
