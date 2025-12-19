export type Question = {
  id: string;
  text: string;
};

export type Dimension = {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
};

export type Answers = Record<string, number | undefined>;
export type OpenAnswers = Record<string, string>;

export type DimensionScore = {
  id: string;
  title: string;
  total: number;
  average: number;
};

export type ScoreSummary = {
  totalScore: number;
  totalAverage: number;
  dimensions: DimensionScore[];
  maturityLevel: string;
  topStrength: DimensionScore;
  improvementPriority: DimensionScore;
};

export type ExportPayload = {
  timestamp: string;
  answers: Record<string, number>;
  openAnswers: OpenAnswers;
  scores: {
    totalScore: number;
    totalAverage: number;
    dimensions: DimensionScore[];
  };
  maturityLevel: string;
  topStrength: DimensionScore;
  improvementPriority: DimensionScore;
};
