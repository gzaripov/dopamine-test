import { useMemo } from 'react';

import { CATEGORIES, type Question } from '@/lib/questions';
import { getScoreColor, getTier } from '@/lib/scoring';
import { TIER_DATA } from '@/lib/roasts';

type Props = {
  answers: Record<string, number>;
};

function getQuestionPoints(question: Question, value: number): number {
  if (question.type === 'choice') {
    const option = question.options.find((o) => o.value === value);
    return option?.points ?? 0;
  }
  const idx = Math.max(0, Math.min(4, value - 1));
  return question.points[idx];
}

export function LiveThermostat({ answers }: Props) {
  const { totalScore, categoryScores } = useMemo(() => {
    let total = 0;
    const cats: Record<string, number> = {};

    for (const category of CATEGORIES) {
      let catScore = 0;
      for (const question of category.questions) {
        const raw = answers[question.id];
        if (raw != null) {
          catScore += getQuestionPoints(question, raw);
        }
      }
      cats[category.id] = catScore;
      total += catScore;
    }

    return { totalScore: total, categoryScores: cats };
  }, [answers]);

  const color = getScoreColor(totalScore);
  const tier = getTier(totalScore);
  const tierData = TIER_DATA[tier];
  const sign = totalScore > 0 ? '+' : '';
  const answeredCount = Object.keys(answers).length;

  // Thermostat bar: map score to position on a vertical bar
  // Range roughly -400 to +500
  // Center (0) is at 55% from bottom
  const zeroPos = 55;
  const pxPerPoint = 0.06;
  const fillPct = Math.max(2, Math.min(98, zeroPos - totalScore * pxPerPoint));

  return (
    <div className="w-56 shrink-0 space-y-4">
      <div className="sticky top-20 space-y-4">
        {/* Score display */}
        <div className="bg-card border rounded-xl p-4 space-y-3">
          <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            Live Score
          </div>
          <div className="text-3xl font-bold tabular-nums" style={{ color }}>
            {sign}{totalScore}
          </div>
          <div className={`text-xs font-medium ${tierData.color}`}>
            {tierData.emoji} {tier}
          </div>

          {/* Thermostat */}
          <div className="relative h-48 w-6 mx-auto rounded-full bg-muted/30 overflow-hidden border border-border">
            {/* Fill from bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-500"
              style={{
                height: `${fillPct}%`,
                background: `linear-gradient(to top, ${getScoreColor(-200)}, ${color})`,
                boxShadow: `0 0 10px ${color}30`,
              }}
            />
            {/* Zero line marker */}
            <div
              className="absolute left-0 right-0 border-t border-dashed border-muted-foreground/50"
              style={{ bottom: `${zeroPos}%` }}
            />
            <div
              className="absolute -right-6 text-[9px] text-muted-foreground"
              style={{ bottom: `${zeroPos - 1}%` }}
            >
              0
            </div>
          </div>

          <div className="flex justify-between text-[9px] text-muted-foreground">
            <span>Spike</span>
            <span>Restore</span>
          </div>
        </div>

        {/* Per-category mini breakdown */}
        <div className="bg-card border rounded-xl p-4 space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            By Category
          </div>
          {CATEGORIES.map((cat) => {
            const score = categoryScores[cat.id] ?? 0;
            if (score === 0) return null;
            const catColor = getScoreColor(score);
            const catSign = score > 0 ? '+' : '';
            return (
              <div key={cat.id} className="flex items-center justify-between gap-2">
                <span className="text-sm truncate">{cat.emoji}</span>
                <span className="text-xs tabular-nums font-medium" style={{ color: catColor }}>
                  {catSign}{score}
                </span>
              </div>
            );
          })}
          {answeredCount === 0 && (
            <p className="text-xs text-muted-foreground italic">Answer questions to see your score</p>
          )}
        </div>
      </div>
    </div>
  );
}
