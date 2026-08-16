import { useState } from "react";
import { Code2, Play, Terminal } from "lucide-react";
import { Button, Card } from "../components/ui";
import { codingProblems } from "../data/codingProblems";

const starterCode = `function solve(input) {
  // Write your solution here
  return input;
}`;

export function CodingPracticePage({
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
  const [selectedId, setSelectedId] = useState(codingProblems[0].id);
  const selected =
    codingProblems.find((problem) => problem.id === selectedId) ??
    codingProblems[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Practice
            </p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Coding Practice
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

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-4">
            <div className="mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
              <Code2 size={18} className="text-sky-500" /> Problem list
            </div>
            <div className="space-y-3">
              {codingProblems.map((problem) => (
                <button
                  key={problem.id}
                  onClick={() => setSelectedId(problem.id)}
                  className={`w-full rounded-2xl border p-3 text-left transition ${selected.id === problem.id ? "border-sky-500 bg-sky-50 dark:border-sky-400 dark:bg-sky-950/30" : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {problem.title}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {problem.difficulty}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {problem.category}
                  </p>
                </button>
              ))}
            </div>
          </Card>

          <Card className="overflow-hidden p-0">
            <div className="border-b border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/80">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {selected.category}
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selected.title}
                  </h2>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                  {selected.difficulty}
                </span>
              </div>
            </div>

            <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
              <div className="border-r border-slate-200 p-5 dark:border-slate-800">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Description
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  {selected.description}
                </p>

                <div className="mt-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Examples
                  </p>
                  {selected.examples.map((example) => (
                    <div
                      key={example.input}
                      className="mt-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/40"
                    >
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Input: {example.input}
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Output: {example.output}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Constraints
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                    {selected.constraints.map((constraint) => (
                      <li key={constraint}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-2">
                    <Terminal size={16} /> Solution
                  </span>
                  <span>JavaScript</span>
                </div>
                <pre className="rounded-2xl bg-slate-950 p-4 text-sm text-slate-200">
                  {starterCode}
                </pre>
                <div className="mt-4 flex gap-3">
                  <Button className="gap-2">
                    <Play size={16} /> Run test
                  </Button>
                  <Button variant="secondary">Submit</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
