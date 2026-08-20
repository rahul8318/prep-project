import { CheckCircle2, Lightbulb, MessageSquareQuote } from "lucide-react";
import { Card } from "../components/ui";
import { hrQuestions } from "../data/hrQuestions";

export function HrPreparationPage({
  user,
}: {
  user: any;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Human resources
            </p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              HR Preparation
            </h1>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {hrQuestions.map((question) => (
            <Card key={question.id} className="p-5">
              <div className="flex items-center gap-2 text-sky-600">
                <MessageSquareQuote size={18} /> {question.title}
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
                {question.sampleAnswer}
              </p>

              <div className="mt-5">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Answer structure
                </p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {question.answerStructure.map((item) => (
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

              <div className="mt-5 rounded-2xl bg-amber-50 p-3 dark:bg-amber-950/20">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                  <Lightbulb size={16} /> Tips
                </div>
                <ul className="mt-2 space-y-1 text-sm text-amber-800 dark:text-amber-200">
                  {question.tips.map((tip) => (
                    <li key={tip}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
