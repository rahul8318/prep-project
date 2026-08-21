import { CheckCircle2, Lightbulb, MessageSquareQuote } from "lucide-react";
import { Card } from "../components/ui";
import { hrQuestions } from "../data/hrQuestions";

export function HrPreparationPage({
  user,
}: {
  user: any;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div>
            <p className="text-sm text-[var(--muted)]">
              Human resources
            </p>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              HR Preparation
            </h1>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {hrQuestions.map((question) => (
            <Card key={question.id} className="p-5 transition-all duration-200 hover:shadow-[var(--shadow-elevated)]">
              <div className="flex items-center gap-2 text-[var(--brand-orange)]">
                <MessageSquareQuote size={18} /> {question.title}
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--foreground-secondary)]">
                {question.sampleAnswer}
              </p>

              <div className="mt-5">
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  Answer structure
                </p>
                <ul className="mt-2 space-y-2 text-sm text-[var(--foreground-secondary)]">
                  {question.answerStructure.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 text-[var(--brand-orange)]"
                      />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 rounded-2xl bg-[var(--brand-orange-soft)] p-3">
                <div className="flex items-center gap-2 text-[var(--brand-orange)]">
                  <Lightbulb size={16} /> Tips
                </div>
                <ul className="mt-2 space-y-1 text-sm text-[var(--foreground-secondary)]">
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
