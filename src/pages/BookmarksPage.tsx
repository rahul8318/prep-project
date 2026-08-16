import { Bookmark, BookMarked } from "lucide-react";
import { Card } from "../components/ui";

const savedItems = [
  {
    title: "Explain closures and their usage in React state",
    category: "JavaScript",
  },
  {
    title: "What is the difference between useMemo and useCallback?",
    category: "React",
  },
  {
    title: "How do you handle N+1 query problems in backend systems?",
    category: "DBMS",
  },
];

export function BookmarksPage({
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
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Saved for later
            </p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Bookmarks
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

        <div className="space-y-4">
          {savedItems.map((item) => (
            <Card key={item.title} className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-sky-100 p-2 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300">
                    <Bookmark size={16} />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {item.category}
                    </p>
                  </div>
                </div>
                <BookMarked size={18} className="text-sky-600" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
