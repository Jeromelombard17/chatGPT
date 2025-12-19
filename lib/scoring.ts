import { Dimension, DimensionScore, ScoreSummary } from "./types";

const maturityLevels = [
  { min: 1, max: 1.99, label: "Niveau 0 — Exécutant achats" },
  { min: 2, max: 2.49, label: "Niveau 1 — Expert achats" },
  { min: 2.5, max: 2.99, label: "Niveau 2 — Partenaire fonctionnel" },
  { min: 3, max: 3.49, label: "Niveau 3 — Business contributor" },
  { min: 3.5, max: 4.24, label: "Niveau 4 — Business partner" },
  { min: 4.25, max: 5, label: "Niveau 5 — Trusted advisor" }
];

export const calculateScores = (
  dimensions: Dimension[],
  answers: Record<string, number>
): ScoreSummary => {
  const dimensionScores: DimensionScore[] = dimensions.map((dimension) => {
    const total = dimension.questions.reduce(
      (sum, question) => sum + (answers[question.id] ?? 0),
      0
    );
    const average = Number((total / dimension.questions.length).toFixed(2));
    return {
      id: dimension.id,
      title: dimension.title,
      total,
      average
    };
  });

  const totalScore = dimensionScores.reduce((sum, dimension) => sum + dimension.total, 0);
  const totalAverage = Number((totalScore / 30).toFixed(2));

  const maturityLevel =
    maturityLevels.find((level) => totalAverage >= level.min && totalAverage <= level.max)
      ?.label ?? maturityLevels[0].label;

  const sortedByAverage = [...dimensionScores].sort((a, b) => b.average - a.average);
  const topStrength = sortedByAverage[0];
  const improvementPriority = sortedByAverage[sortedByAverage.length - 1];

  return {
    totalScore,
    totalAverage,
    dimensions: dimensionScores,
    maturityLevel,
    topStrength,
    improvementPriority
  };
};
