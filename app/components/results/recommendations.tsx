import type { TierLabel } from '@/lib/scoring';
import { TIER_DATA } from '@/lib/roasts';

type Props = {
  tier: TierLabel;
};

export function Recommendations({ tier }: Props) {
  const data = TIER_DATA[tier];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">What to do about it</h3>
      <ul className="space-y-2">
        {data.recommendations.map((rec, i) => (
          <li key={i} className="flex gap-3 text-sm bg-card border rounded-lg px-4 py-3">
            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
            <span className="text-foreground/80">{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
