import { CATEGORIES } from '@/lib/questions';
import { getScoreColor } from '@/lib/scoring';

type Props = {
  categoryScores: Record<string, number>;
};

export function CategoryBreakdown({ categoryScores }: Props) {
  const maxAbs = Math.max(
    ...Object.values(categoryScores).map(Math.abs),
    1,
  );

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Category Breakdown</h3>
      <p className="text-xs text-muted-foreground">
        Positive = dopamine spike (bad). Negative = restorative (good).
      </p>
      <div className="grid gap-3">
        {CATEGORIES.map((cat) => {
          const score = categoryScores[cat.id] ?? 0;
          const color = getScoreColor(score);
          const isPositive = score > 0;
          const isNegative = score < 0;
          const barPct = Math.max(4, (Math.abs(score) / maxAbs) * 100);
          const sign = score > 0 ? '+' : '';

          return (
            <div key={cat.id} className="bg-card border rounded-lg px-4 py-3">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl w-8 shrink-0">{cat.emoji}</span>
                <span className="text-sm font-medium truncate flex-1">{cat.title}</span>
                <span className="text-sm font-bold tabular-nums ml-2" style={{ color }}>
                  {sign}{score}
                </span>
              </div>

              {/* Bar: two halves separated by a center line */}
              <div className="flex items-center gap-0 h-4">
                {/* Left half — restore bars grow right-to-left */}
                <div className="w-1/2 h-full flex justify-end rounded-l-sm overflow-hidden bg-border/20">
                  {isNegative && (
                    <div
                      className="h-full rounded-l-sm"
                      style={{
                        width: `${barPct}%`,
                        backgroundColor: color,
                        boxShadow: `0 0 8px ${color}50`,
                      }}
                    />
                  )}
                </div>
                {/* Center divider */}
                <div className="w-0.5 h-5 bg-muted-foreground/50 shrink-0 rounded-full" />
                {/* Right half — spike bars grow left-to-right */}
                <div className="w-1/2 h-full rounded-r-sm overflow-hidden bg-border/20">
                  {isPositive && (
                    <div
                      className="h-full rounded-r-sm"
                      style={{
                        width: `${barPct}%`,
                        backgroundColor: color,
                        boxShadow: `0 0 8px ${color}50`,
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-between text-[10px] text-muted-foreground mt-1 px-0.5">
                <span>Restore</span>
                <span>Spike</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
