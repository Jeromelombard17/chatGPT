import { Question } from "@/lib/types";

type QuestionRowProps = {
  question: Question;
  value?: number;
  onChange: (value: number) => void;
};

const scaleLabels = [
  "1 - Pas du tout vrai / jamais",
  "2",
  "3",
  "4",
  "5 - Totalement vrai / systématiquement"
];

export default function QuestionRow({ question, value, onChange }: QuestionRowProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-slate-800">{question.text}</p>
      <fieldset className="mt-3">
        <legend className="sr-only">Réponse pour {question.id}</legend>
        <div className="grid gap-2 sm:grid-cols-5">
          {scaleLabels.map((label, index) => {
            const score = index + 1;
            const inputId = `${question.id}-${score}`;
            return (
              <label
                key={inputId}
                htmlFor={inputId}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition focus-within:ring-2 focus-within:ring-brand-500 sm:text-sm ${
                  value === score
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-slate-200 text-slate-600 hover:border-brand-300"
                }`}
              >
                <input
                  id={inputId}
                  name={question.id}
                  type="radio"
                  value={score}
                  checked={value === score}
                  onChange={() => onChange(score)}
                  className="h-4 w-4 accent-brand-500"
                />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
