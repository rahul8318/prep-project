import { useEffect, useState, useCallback } from "react";
import { CheckCircle2, Clock3, XCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Button, Card, ProgressBar } from "../components/ui";
import { quizApi } from "../services/quizApi";

const CATEGORIES = [
  "JavaScript",
  "React",
  "TypeScript",
  "CSS",
  "HTML",
  "DSA",
  "HR",
];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
const QUESTION_COUNTS = [5, 10, 15];
const DEFAULT_TIME = 180;

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  category: string;
  difficulty: string;
  topic: string;
};

type QuizResultData = {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  timeTaken: number;
  result: {
    questions: Array<{
      questionId: string;
      question: string;
      options: string[];
      correctAnswer: string;
      explanation: string;
      userAnswer: string;
    }>;
  };
};

export function QuizPage({
  user,
}: {
  user: any;
}) {
  const [category, setCategory] = useState("JavaScript");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quizResult, setQuizResult] = useState<QuizResultData | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length
    ? ((currentIndex + 1) / questions.length) * 100
    : 0;

  useEffect(() => {
    if (!submitted && questions.length > 0 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            void handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [submitted, questions.length, timeLeft]);

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
      console.log("Quiz start response:", res);

      if (res.success && res.data) {
        if (!res.data.questions || res.data.questions.length === 0) {
          setError("No questions available for the selected filters. Try a different category or difficulty.");
          return;
        }
        setQuestions(res.data.questions);
        setSessionId(res.data.sessionId);
        setCurrentIndex(0);
        setSubmitted(false);
        setSelectedAnswers({});
        setTimeLeft(DEFAULT_TIME);
        setQuizResult(null);
      } else {
        setError("Failed to start quiz. Please try again.");
      }
    } catch (err) {
      console.error("Quiz start error:", err);
      setError("Failed to start quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuiz = useCallback(async () => {
    if (!questions.length || !sessionId) return;
    setLoading(true);
    setError("");
    try {
      const answers: Record<string, string> = {};
      for (const q of questions) {
        answers[q.id] = selectedAnswers[q.id] || "";
      }

      const res = await quizApi.submitQuiz({
        sessionId,
        answers,
        timeTaken: DEFAULT_TIME - timeLeft,
      });

      if (res.success && res.data) {
        setQuizResult({
          ...res.data,
          totalQuestions: res.data.result.questions.length,
        });
        setSubmitted(true);
      } else {
        setError("Failed to submit quiz. Please try again.");
      }
    } catch {
      setError("Failed to submit quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [questions, sessionId, selectedAnswers, timeLeft]);

  const confirmSubmit = () => {
    const unanswered = questions.filter(
      (q) => !selectedAnswers[q.id]
    ).length;
    const msg =
      unanswered > 0
        ? `You have ${unanswered} unanswered question(s). Submit anyway?`
        : "Submit your quiz?";
    if (window.confirm(msg)) {
      void handleSubmitQuiz();
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setTimeLeft(DEFAULT_TIME);
    setQuizResult(null);
    setSessionId(null);
    setError("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Card className="p-6">
            <div className="h-64 animate-pulse rounded-2xl bg-[var(--surface-elevated)]" />
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Card className="p-6 text-center text-sm text-rose-600 dark:text-rose-400">
            {error}
            <Button className="mt-4" onClick={() => setError("")}>
              Dismiss
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <div>
              <p className="text-sm text-[var(--muted)]">
                Quiz mode
              </p>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">
                Technical Quiz
              </h1>
            </div>
          </div>

          <Card className="p-6">
            <div className="grid gap-5 md:grid-cols-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--foreground)]"
              >
                {CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--foreground)]"
              >
                {DIFFICULTIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--foreground)]"
              >
                {QUESTION_COUNTS.map((item) => (
                  <option key={item} value={item}>
                    {item} questions
                  </option>
                ))}
              </select>
              <Button onClick={startQuiz}>Start quiz</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (submitted && quizResult) {
    const correctSet = new Set(
      quizResult.result.questions
        .filter((q) => q.userAnswer === q.correctAnswer)
        .map((q) => q.questionId)
    );

    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <div>
              <p className="text-sm text-[var(--muted)]">
                Quiz mode
              </p>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">
                Quiz Result
              </h1>
            </div>
          </div>

          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3 text-2xl font-bold text-[var(--foreground)]">
              <CheckCircle2 className="text-[var(--brand-orange)]" /> Quiz completed
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl bg-[var(--surface-elevated)] p-4">
                <p className="text-sm text-[var(--muted)]">
                  Final score
                </p>
                <p className="mt-2 text-3xl font-bold text-[var(--brand-orange)]">
                  {quizResult.score}/{quizResult.totalQuestions}
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--surface-elevated)] p-4">
                <p className="text-sm text-[var(--muted)]">
                  Accuracy
                </p>
                <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">
                  {quizResult.accuracy.toFixed(1)}%
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--surface-elevated)] p-4">
                <p className="text-sm text-[var(--muted)]">
                  Correct
                </p>
                <p className="mt-2 text-3xl font-bold text-[var(--brand-orange)]">
                  {quizResult.correctAnswers}
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--surface-elevated)] p-4">
                <p className="text-sm text-[var(--muted)]">
                  Wrong
                </p>
                <p className="mt-2 text-3xl font-bold text-rose-600 dark:text-rose-400">
                  {quizResult.incorrectAnswers}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {quizResult.result.questions.map((q, idx) => {
                const isCorrect = correctSet.has(q.questionId);
                return (
                  <Card key={q.questionId} className="p-4 transition-all duration-200 hover:shadow-[var(--shadow-elevated)]">
                    <p className="font-semibold text-[var(--foreground)]">
                      {idx + 1}. {q.question}
                    </p>
                    <div className="mt-3 space-y-1">
                      {q.options.map((opt) => {
                        const isSelected = q.userAnswer === opt;
                        const isRight = q.correctAnswer === opt;
                        let color = "text-[var(--foreground-secondary)]";
                        if (isRight) color = "text-[var(--brand-orange)] font-semibold";
                        if (isSelected && !isRight) color = "text-rose-600 dark:text-rose-400";
                        return (
                          <div key={opt} className={`text-sm ${color}`}>
                            {isSelected && !isRight && <XCircle size={14} className="mr-1 inline" />}
                            {isRight && <CheckCircle2 size={14} className="mr-1 inline" />}
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                    {!isCorrect && q.explanation && (
                      <p className="mt-2 text-xs text-[var(--muted)]">
                        Explanation: {q.explanation}
                      </p>
                    )}
                  </Card>
                );
              })}
            </div>

            <div className="mt-8 flex gap-3">
              <Button onClick={resetQuiz}>Start New Quiz</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div>
            <p className="text-sm text-[var(--muted)]">
              Quiz mode
            </p>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Technical Quiz
            </h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
            <Clock3 size={18} /> {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>
        </div>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="text-sm text-[var(--muted)]">
              Question {currentIndex + 1} / {questions.length}
            </div>
            <div className="text-sm text-[var(--muted)]">
              {currentQuestion.category} • {currentQuestion.difficulty}
            </div>
          </div>
          <ProgressBar value={progress} className="mb-6" />
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            {currentQuestion.question}
          </h2>
          <div className="mt-6 space-y-3">
            {currentQuestion.options.map((option: string) => (
              <button
                key={option}
                onClick={() =>
                  setSelectedAnswers((prev) => ({
                    ...prev,
                    [currentQuestion.id]: option,
                  }))
                }
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                  selectedAnswers[currentQuestion.id] === option
                    ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] text-[var(--brand-orange)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground-secondary)] hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)]"
                }`}
              >
                <span>{option}</span>
                {selectedAnswers[currentQuestion.id] === option && (
                  <CheckCircle2 size={18} />
                )}
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button
              variant="secondary"
              onClick={() =>
                setCurrentIndex((prev) => Math.max(0, prev - 1))
              }
              disabled={currentIndex === 0}
            >
              <ArrowLeft size={16} /> Previous
            </Button>
            {currentIndex < questions.length - 1 ? (
              <Button onClick={() => setCurrentIndex((prev) => prev + 1)}>
                Next <ArrowRight size={16} />
              </Button>
            ) : (
              <Button onClick={confirmSubmit}>Submit quiz</Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
