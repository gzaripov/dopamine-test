import { cn } from '@/lib/utils';
import type { TierLabel } from '@/lib/scoring';
import { TIER_DATA } from '@/lib/roasts';

type Props = {
  tier: TierLabel;
};

export function TierBadge({ tier }: Props) {
  const data = TIER_DATA[tier];

  return (
    <div className={cn('rounded-xl border p-6 space-y-4', data.bgColor, data.borderColor)}>
      <div>
        <h2 className={cn('text-2xl font-bold', data.color)}>
          {data.emoji} {tier}
        </h2>
        <p className={cn('text-sm italic mt-1', data.color, 'opacity-70')}>{data.meme}</p>
      </div>
      <p className="text-sm leading-relaxed text-foreground/80">{data.roast}</p>
    </div>
  );
}
