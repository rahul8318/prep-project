import { useEffect, useMemo, useState } from "react";
import {
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import {
  Button,
  Card,
  CategoryBadge,
  DifficultyBadge,
  EmptyState,
  SearchBar,
} from "../components/ui";
import {
  allQuestions as localQuestions,
  categories as questionCategories,
} from "../data/questions";
import {
  addReadingSeconds,
  markQuestionViewed,
} from "../services/studyProgress";
import type { Question } from "../types";

export function QuestionBankPage({
  user,
}: {
  user: any;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [solved, setSolved] = useState<Record<string, boolean>>({});
  const [index, setIndex] = useState(0);
  const [questions] = useState<Question[]>(localQuestions);

  const categories = useMemo(() => {
    const loadedCategories = questions.map((question) => question.category);
    return [
      "All",
      ...Array.from(new Set([...questionCategories, ...loadedCategories])),
    ];
  }, [questions]);

  const filtered = useMemo(() => {
    const items = Array.isArray(questions) ? questions : [];
    return items.filter((question) => {
      const matchesCategory =
        category === "All" || question.category === category;
      const matchesDifficulty =
        difficulty === "All" || question.difficulty === difficulty;
      const matchesSearch =
        search.trim() === "" ||
        `${question.question} ${question.topic} ${(question.tags || []).join(" ")}`
          .toLowerCase()
          .includes(search.toLowerCase());
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [category, difficulty, search, questions]);

  const current = filtered[index] ?? null;
  const currentId = current?.id ?? current?._id ?? "";

  useEffect(() => {
    const userId = user?.id;
    if (!userId || !currentId) return;

    markQuestionViewed(userId, currentId);
    const timer = window.setInterval(() => {
      addReadingSeconds(userId, 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [currentId, user?.id]);

  const toggleBookmark = (id: string) =>
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSolved = (id: string) =>
    setSolved((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  src="/PrepForgeBlack.png"
                  alt="PrepForge"
                  className="h-6 w-6 rounded-lg object-contain block dark:hidden"
                />
                <img
                  src="/logo.png"
                  alt="PrepForge"
                  className="h-6 w-6 rounded-lg object-contain hidden dark:block"
                />
              </div>
              <p className="text-sm text-[var(--muted)]">
                PrepForge
              </p>
            </div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Question Bank
            </h1>
          </div>
        </div>

        <div className="mb-6 grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search topic, question, tag..."
          />
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setIndex(0);
            }}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--foreground)]"
          >
            <option value="All">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value);
              setIndex(0);
            }}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--foreground)]"
          >
            <option value="All">All levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {current ? (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <CategoryBadge category={current.category} />
                  <DifficultyBadge difficulty={current.difficulty} />
                </div>
                <div className="text-sm text-[var(--muted)]">
                  {index + 1} / {filtered.length}
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[var(--foreground)]">
                {current.question}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--surface-elevated)] px-2.5 py-1"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border-l-4 border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] p-5">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-orange)]">
                  <CheckCircle2 size={16} /> Answer
                </div>
                <p className="text-base leading-7 font-medium text-[var(--foreground)]">
                  {current.answer || current.correctAnswer}
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                  Explanation
                </p>
                <p className="text-sm leading-7 text-[var(--foreground-secondary)]">
                  {current.explanation}
                </p>
              </div>

              {current.codeExample && (
                <div className="mt-6 rounded-2xl bg-[var(--background)] p-4 text-sm text-[var(--foreground-secondary)]">
                  <pre className="overflow-x-auto whitespace-pre-wrap">
                    {current.codeExample}
                  </pre>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={() => toggleSolved(currentId)}
                >
                  {solved[currentId] ? "Solved" : "Mark as solved"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => toggleBookmark(currentId)}
                >
                  {bookmarked[currentId] ? "Bookmarked" : "Bookmark"}
                </Button>
                <Button variant="secondary">Show answer</Button>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() =>
                    setIndex((prev) =>
                      prev === 0 ? filtered.length - 1 : prev - 1,
                    )
                  }
                  className="gap-2"
                >
                  <ChevronLeft size={16} /> Previous
                </Button>
                <Button
                  onClick={() =>
                    setIndex((prev) => (prev + 1) % filtered.length)
                  }
                  className="gap-2"
                >
                  Next <ChevronRight size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[26px] border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="flex items-center gap-2 text-[var(--foreground)]">
                  <Sparkles size={18} className="text-[var(--brand-orange)]" /> Recommended
                  focus
                </div>
                <p className="mt-3 text-sm text-[var(--foreground-secondary)]">
                  {current.topic} • {current.category}
                </p>
              </div>

              <div className="rounded-[26px] border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="flex items-center gap-2 text-[var(--foreground)]">
                  <Filter size={18} className="text-[var(--brand-orange)]" /> Filters
                </div>
                <div className="mt-4 space-y-3 text-sm text-[var(--foreground-secondary)]">
                  <label className="flex items-center justify-between">
                    <span>Bookmarked only</span>
                    <input type="checkbox" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span>Solved only</span>
                    <input type="checkbox" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            title="No questions match this filter"
            description="Try a different category, adjust the difficulty, or broaden the search query."
          />
        )}
      </div>
    </div>
  );
}
