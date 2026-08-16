import { useState } from "react";
import { BookOpen, RotateCcw, Sparkles } from "lucide-react";
import { Button, Card } from "../components/ui";
import { flashcards } from "../data/flashcards";

export function FlashcardsPage({
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
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const current = flashcards[index % flashcards.length];

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % flashcards.length);
    setFlipped(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Memory mode
            </p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Flashcards
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

        <Card className="p-6">
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2">
              <BookOpen size={16} /> {index + 1} / {flashcards.length}
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles size={16} /> {current.category}
            </span>
          </div>

          <button
            onClick={() => setFlipped((prev) => !prev)}
            className="mt-6 block w-full rounded-[28px] border border-slate-200 bg-gradient-to-br from-sky-50 to-violet-50 p-8 text-left shadow-sm transition hover:shadow-md dark:border-slate-700 dark:from-slate-900 dark:to-slate-800"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {flipped ? "Answer" : "Question"}
            </div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
              {flipped ? current.back : current.front}
            </h2>
            {flipped && (
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {current.explanation}
              </p>
            )}
          </button>

          <div className="mt-8 flex justify-between gap-3">
            <Button
              variant="secondary"
              onClick={() => setFlipped((prev) => !prev)}
              className="gap-2"
            >
              <RotateCcw size={16} /> Flip
            </Button>
            <Button onClick={nextCard}>Next card</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
