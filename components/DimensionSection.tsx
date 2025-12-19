import { Dimension } from "@/lib/types";
import QuestionRow from "./QuestionRow";

type DimensionSectionProps = {
  dimension: Dimension;
  answers: Record<string, number | undefined>;
  onAnswer: (questionId: string, value: number) => void;
  answeredCount: number;
};

export default function DimensionSection({
  dimension,
  answers,
  onAnswer,
  answeredCount
}: DimensionSectionProps) {
  const answeredInDimension = dimension.questions.filter(
    (question) => answers[question.id] !== undefined
  ).length;

  return (
    <details className="rounded-2xl border border-slate-200 bg-slate-50 p-5" open>
      <summary className="cursor-pointer list-none">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{dimension.title}</h3>
            <p className="text-sm text-slate-600">
              {answeredInDimension}/{dimension.questions.length} réponses
            </p>
          </div>
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            {answeredCount} / 30 complétées
          </span>
        </div>
      </summary>
      <div className="mt-4 space-y-4">
        {dimension.questions.map((question) => (
          <QuestionRow
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={(value) => onAnswer(question.id, value)}
          />
        ))}
      </div>
    </details>
  );
}
