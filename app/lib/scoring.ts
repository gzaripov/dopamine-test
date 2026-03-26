import { CATEGORIES, type Question } from './questions';

export type TierLabel =
  | 'Crisis Zone'
  | 'Dopamine Debt'
  | 'Overstimulated'
  | 'Mild Overstimulation'
  | 'Healthy Balance'
  | 'Strong Rebalance'
  | 'Deep Reset Mode';

export type ScoringResult = {
  totalScore: number; // net daily dopamine points (can be negative)
  tier: TierLabel;
  categoryScores: Record<string, number>;
};

function getQuestionPoints(question: Question, value: number): number {
  if (question.type === 'choice') {
    const option = question.options.find((o) => o.value === value);
    return option?.points ?? 0;
  }
  // Slider: interpolate between the 5 point values
  const idx = Math.max(0, Math.min(4, value - 1));
  return question.points[idx];
}

export function calculateScore(answers: Record<string, number>): ScoringResult {
  const categoryScores: Record<string, number> = {};
  let totalPoints = 0;

  for (const category of CATEGORIES) {
    let categoryPoints = 0;

    for (const question of category.questions) {
      const raw = answers[question.id];
      if (raw == null) continue;
      categoryPoints += getQuestionPoints(question, raw);
    }

    categoryScores[category.id] = categoryPoints;
    totalPoints += categoryPoints;
  }

  return {
    totalScore: totalPoints,
    tier: getTier(totalPoints),
    categoryScores,
  };
}

export function getTier(score: number): TierLabel {
  if (score > 300) return 'Crisis Zone';
  if (score > 150) return 'Dopamine Debt';
  if (score > 50) return 'Overstimulated';
  if (score > 0) return 'Mild Overstimulation';
  if (score > -50) return 'Healthy Balance';
  if (score > -100) return 'Strong Rebalance';
  return 'Deep Reset Mode';
}

export function getScoreColor(score: number): string {
  if (score > 300) return '#dc2626'; // red-600
  if (score > 150) return '#ef4444'; // red-500
  if (score > 50) return '#f97316'; // orange-500
  if (score > 0) return '#eab308'; // yellow-500
  if (score > -50) return '#22c55e'; // green-500
  if (score > -100) return '#10b981'; // emerald-500
  return '#06b6d4'; // cyan-500
}

// Convert net score to 0-100 "health" scale for the gauge display
// +500 → 0, -300 → 100, 0 → ~60
export function scoreToHealth(score: number): number {
  const health = Math.round(((500 - score) / 800) * 100);
  return Math.max(0, Math.min(100, health));
}
