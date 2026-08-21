import { useState, useEffect } from "react";
import { BookOpen, RotateCcw, Sparkles } from "lucide-react";
import { Button, Card } from "../components/ui";
import { flashcardApi } from "../services/flashcardApi";

export function FlashcardsPage({
  user,
}: {
  user: any;
}) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cards, setCards] = useState<
    Array<{
      _id: string;
      question: string;
      category: string;
      answer?: string;
      explanation?: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadFlashcards = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await flashcardApi.getFlashcards();
        if (cancelled) return;
        if (res.success && Array.isArray(res.data)) {
          setCards(
            res.data.map((f: any) => ({
              _id: f._id,
              question: f.question,
              category: f.category,
              answer: f.correctAnswer,
              explanation: f.explanation,
            })),
          );
        }
      } catch {
        // keep empty state on error
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadFlashcards();
    return () => {
      cancelled = true;
    };
  }, []);

  const current = cards[index % cards.length];

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % cards.length);
    setFlipped(false);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div>
            <p className="text-sm text-[var(--muted)]">
              Memory mode
            </p>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Flashcards
            </h1>
          </div>
        </div>

        <Card className="p-6">
          {loading ? (
            <div className="h-64 animate-pulse rounded-2xl bg-[var(--surface-elevated)]" />
          ) : current ? (
            <>
              <div className="flex items-center justify-between text-sm text-[var(--foreground-secondary)]">
                <span className="inline-flex items-center gap-2">
                  <BookOpen size={16} /> {index + 1} / {cards.length}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Sparkles size={16} /> {current.category}
                </span>
              </div>

              <button
                onClick={() => setFlipped((prev) => !prev)}
                className="mt-6 block w-full rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-8 text-left shadow-[var(--shadow)] transition hover:shadow-[var(--shadow-elevated)] hover:border-[var(--brand-orange)]"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  {flipped ? "Answer" : "Question"}
                </div>
                <h2 className="mt-4 text-2xl font-bold text-[var(--foreground)]">
                  {flipped ? current.answer : current.question}
                </h2>
                {flipped && current.explanation && (
                  <p className="mt-4 text-sm leading-7 text-[var(--foreground-secondary)]">
                    {current.explanation}
                  </p>
                )}
              </button>
            </>
          ) : (
            <div className="py-20 text-center text-sm text-[var(--muted)]">
              No flashcards available yet.
            </div>
          )}
        </Card>

        <div className="mt-6 flex justify-between gap-3">
          <Button
            variant="secondary"
            onClick={() => setFlipped((prev) => !prev)}
            className="gap-2"
          >
            <RotateCcw size={16} /> Flip
          </Button>
          <Button onClick={nextCard} disabled={cards.length === 0}>
            Next card
          </Button>
        </div>
      </div>
    </div>
  );
}
