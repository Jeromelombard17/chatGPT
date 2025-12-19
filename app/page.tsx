"use client";

import { useEffect, useMemo, useState } from "react";
import DimensionSection from "@/components/DimensionSection";
import RadarChartCard from "@/components/RadarChartCard";
import ScoreCard from "@/components/ScoreCard";
import { dimensions, openQuestions } from "@/lib/questions";
import { calculateScores } from "@/lib/scoring";
import { Answers, ExportPayload, OpenAnswers } from "@/lib/types";

const STORAGE_KEY = "sapbp-assessment";

const introScale = [
  "1 = Pas du tout vrai / jamais",
  "2 = Plutôt faux",
  "3 = Plutôt vrai",
  "4 = Souvent vrai",
  "5 = Totalement vrai / systématiquement"
];

const initialOpenAnswers: OpenAnswers = {
  O1: "",
  O2: "",
  O3: ""
};

export default function HomePage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [openAnswers, setOpenAnswers] = useState<OpenAnswers>(initialOpenAnswers);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as {
        answers?: Answers;
        openAnswers?: OpenAnswers;
      };
      setAnswers(parsed.answers ?? {});
      setOpenAnswers(parsed.openAnswers ?? initialOpenAnswers);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    const payload = JSON.stringify({ answers, openAnswers });
    localStorage.setItem(STORAGE_KEY, payload);
  }, [answers, openAnswers, isHydrated]);

  const answeredCount = useMemo(
    () => Object.values(answers).filter((value) => value !== undefined).length,
    [answers]
  );

  const allAnswered = answeredCount === 30;

  const scores = useMemo(() => {
    if (!allAnswered) return null;
    const numericAnswers = Object.fromEntries(
      Object.entries(answers).map(([key, value]) => [key, value ?? 0])
    ) as Record<string, number>;
    return calculateScores(dimensions, numericAnswers);
  }, [answers, allAnswered]);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleOpenAnswerChange = (id: string, value: string) => {
    setOpenAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    setAnswers({});
    setOpenAnswers(initialOpenAnswers);
    localStorage.removeItem(STORAGE_KEY);
  };

  const buildExportPayload = (): ExportPayload | null => {
    if (!scores) return null;
    const numericAnswers = Object.fromEntries(
      Object.entries(answers).map(([key, value]) => [key, value ?? 0])
    ) as Record<string, number>;

    return {
      timestamp: new Date().toISOString(),
      answers: numericAnswers,
      openAnswers,
      scores: {
        totalScore: scores.totalScore,
        totalAverage: scores.totalAverage,
        dimensions: scores.dimensions
      },
      maturityLevel: scores.maturityLevel,
      topStrength: scores.topStrength,
      improvementPriority: scores.improvementPriority
    };
  };

  const downloadFile = (content: string, fileName: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  };

  const handleExportJson = () => {
    const payload = buildExportPayload();
    if (!payload) return;
    downloadFile(JSON.stringify(payload, null, 2), "self-assessment.json", "application/json");
  };

  const handleExportCsv = () => {
    const payload = buildExportPayload();
    if (!payload) return;

    const rows: string[] = [];
    rows.push("Section,Identifiant,Question,Réponse");
    dimensions.forEach((dimension) => {
      dimension.questions.forEach((question) => {
        const value = payload.answers[question.id] ?? "";
        rows.push(
          [dimension.title, question.id, question.text, String(value)].map((cell) =>
            `"${cell.replace(/"/g, '""')}"`
          )
            .join(",")
        );
      });
    });
    openQuestions.forEach((question) => {
      const value = payload.openAnswers[question.id] ?? "";
      rows.push(
        ["Questions ouvertes", question.id, question.text, value].map((cell) =>
          `"${cell.replace(/"/g, '""')}"`
        )
          .join(",")
      );
    });
    rows.push(`"Scores","Total","Score total","${payload.scores.totalScore}"`);
    rows.push(`"Scores","Total","Moyenne globale","${payload.scores.totalAverage}"`);
    payload.scores.dimensions.forEach((dimension) => {
      rows.push(
        ["Scores", dimension.title, "Score dimension", String(dimension.total)]
          .map((cell) => `"${cell.replace(/"/g, '""')}"`)
          .join(",")
      );
      rows.push(
        ["Scores", dimension.title, "Moyenne dimension", String(dimension.average)]
          .map((cell) => `"${cell.replace(/"/g, '""')}"`)
          .join(",")
      );
    });
    rows.push(`"Synthèse","Niveau","${payload.maturityLevel}",""`);
    rows.push(
      `"Synthèse","Top force","${payload.topStrength.title}","${payload.topStrength.average}"`
    );
    rows.push(
      `"Synthèse","Priorité","${payload.improvementPriority.title}","${payload.improvementPriority.average}"`
    );

    downloadFile(rows.join("\n"), "self-assessment.csv", "text/csv;charset=utf-8");
  };

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Self-Assessment Procurement Business Partner
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Évaluez votre maturité achats en 15-20 minutes
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Répondez aux 30 questions fermées sur une échelle de 1 à 5. Vos réponses sont
            stockées localement pour éviter toute perte de progression.
          </p>
          <div className="mt-4 grid gap-2 rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-700">
            {introScale.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Progression : <strong>{answeredCount}/30</strong> réponses complétées.
          </p>
        </div>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">Questionnaire</h2>
        {dimensions.map((dimension) => (
          <DimensionSection
            key={dimension.id}
            dimension={dimension}
            answers={answers}
            onAnswer={handleAnswerChange}
            answeredCount={answeredCount}
          />
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Questions ouvertes</h2>
        <div className="grid gap-4">
          {openQuestions.map((question) => (
            <label
              key={question.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <span className="text-sm font-medium text-slate-800">{question.text}</span>
              <textarea
                className="mt-3 min-h-[96px] w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                value={openAnswers[question.id]}
                onChange={(event) => handleOpenAnswerChange(question.id, event.target.value)}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">Résultats</h2>
        {!allAnswered ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
            Le bloc Résultats apparaîtra dès que les 30 questions fermées seront complétées.
          </div>
        ) : (
          scores && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <ScoreCard
                  label="Score total"
                  value={`${scores.totalScore} / 150`}
                  helper={`Moyenne globale : ${scores.totalAverage} / 5`}
                />
                <ScoreCard label="Niveau de maturité" value={scores.maturityLevel} />
                <ScoreCard
                  label="Top force"
                  value={scores.topStrength.title}
                  helper={`Moyenne : ${scores.topStrength.average} / 5`}
                />
                <ScoreCard
                  label="Priorité de progrès"
                  value={scores.improvementPriority.title}
                  helper={`Moyenne : ${scores.improvementPriority.average} / 5`}
                />
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
                <RadarChartCard data={scores.dimensions} />
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h3 className="text-base font-semibold text-slate-900">Scores par dimension</h3>
                  <div className="mt-4 space-y-3">
                    {scores.dimensions.map((dimension) => (
                      <div
                        key={dimension.id}
                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm"
                      >
                        <div>
                          <p className="font-medium text-slate-800">{dimension.title}</p>
                          <p className="text-xs text-slate-500">
                            {dimension.total} / 30 • Moyenne {dimension.average} / 5
                          </p>
                        </div>
                        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                          {dimension.average}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Export & actions</h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">
            Exportez vos résultats ou réinitialisez le questionnaire à tout moment.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleExportJson}
              disabled={!scores}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Export JSON
            </button>
            <button
              type="button"
              onClick={handleExportCsv}
              disabled={!scores}
              className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:border-brand-400 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              Imprimer / PDF
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-400"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <footer className="text-center text-xs text-slate-500">
        Données stockées localement dans votre navigateur. Aucun backend requis.
      </footer>
    </main>
  );
}
