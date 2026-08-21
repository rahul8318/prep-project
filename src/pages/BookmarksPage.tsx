import { Bookmark, BookMarked } from "lucide-react";
import { Card } from "../components/ui";
import { bookmarkApi } from "../services/bookmarkApi";
import { useState, useEffect } from "react";

export function BookmarksPage({
  user,
}: {
  user: any;
}) {
  const [items, setItems] = useState<
    Array<{ _id: string; question: string; category: string; createdAt: string }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadBookmarks = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await bookmarkApi.getBookmarks({ page: 1, limit: 50 });
        if (cancelled) return;
        if (res.success && res.data && Array.isArray(res.data.data)) {
          const mapped = res.data.data.map((b: any) => ({
            _id: b._id || b.questionId?._id,
            question: b.questionId?.question || "Untitled question",
            category: b.questionId?.category || "General",
            createdAt: b.createdAt,
          }));
          setItems(mapped);
        }
      } catch {
        // keep empty state on error
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadBookmarks();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div>
            <p className="text-sm text-[var(--muted)]">
              Saved for later
            </p>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Bookmarks
            </h1>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <Card className="p-6">
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 animate-pulse rounded-2xl bg-[var(--surface-elevated)]"
                  />
                ))}
              </div>
            </Card>
          ) : items.length === 0 ? (
            <Card className="p-6 text-center text-sm text-[var(--muted)]">
              No bookmarks yet. Browse questions and save your favorites.
            </Card>
          ) : (
            items.map((item) => (
              <Card key={item._id} className="p-4 transition-all duration-200 hover:shadow-[var(--shadow-elevated)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-[var(--brand-orange-soft)] p-2 text-[var(--brand-orange)]">
                      <Bookmark size={16} />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[var(--foreground)]">
                        {item.question}
                      </p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <BookMarked size={18} className="text-[var(--brand-orange)]" />
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
