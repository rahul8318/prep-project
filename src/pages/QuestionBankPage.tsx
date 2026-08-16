import { useMemo, useState } from "react";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import {
  Button,
  CategoryBadge,
  DifficultyBadge,
  EmptyState,
  SearchBar,
} from "../components/ui";
import { allQuestions, categories } from "../data/questions";
import type { Question } from "../types";

export function QuestionBankPage({
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
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [solved, setSolved] = useState<Record<string, boolean>>({});
  const [index, setIndex] = useState(0);

  const filtered = useMemo(() => {
    return allQuestions.filter((question) => {
      const matchesCategory =
        category === "All" || question.category === category;
      const matchesDifficulty =
        difficulty === "All" || question.difficulty === difficulty;
      const matchesSearch =
        search.trim() === "" ||
        `${question.question} ${question.topic} ${question.tags.join(" ")}`
          .toLowerCase()
          .includes(search.toLowerCase());
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [category, difficulty, search]);

  const current = filtered[index] ?? null;

  const toggleBookmark = (id: string) =>
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSolved = (id: string) =>
    setSolved((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              InterviewHub
            </p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Question Bank
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
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

        <div className="mb-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
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
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"
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
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"
          >
            <option value="All">All levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {current ? (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <CategoryBadge category={current.category} />
                  <DifficultyBadge difficulty={current.difficulty} />
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {index + 1} / {filtered.length}
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                {current.question}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Answer
                </p>
                <p className="text-base leading-7 text-slate-700 dark:text-slate-200">
                  {current.answer}
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950/40">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Explanation
                </p>
                <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
                  {current.explanation}
                </p>
              </div>

              {current.codeExample && (
                <div className="mt-6 rounded-2xl bg-slate-950 p-4 text-sm text-slate-200">
                  <pre className="overflow-x-auto whitespace-pre-wrap">
                    {current.codeExample}
                  </pre>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={() => toggleSolved(current.id)}
                >
                  {solved[current.id] ? "Solved" : "Mark as solved"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => toggleBookmark(current.id)}
                >
                  {bookmarked[current.id] ? "Bookmarked" : "Bookmark"}
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
              <div className="rounded-[26px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <Sparkles size={18} className="text-sky-500" /> Recommended
                  focus
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  {current.topic} • {current.category}
                </p>
              </div>

              <div className="rounded-[26px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <Filter size={18} className="text-sky-500" /> Filters
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
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
