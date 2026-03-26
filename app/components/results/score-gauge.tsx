import { useEffect, useRef, useState } from 'react';
import { getScoreColor, scoreToHealth } from '@/lib/scoring';

type Props = {
  score: number; // net dopamine points (can be negative)
};

export function ScoreGauge({ score }: Props) {
  const [displayScore, setDisplayScore] = useState(0);
  const rafRef = useRef<number | null>(null);
  const health = scoreToHealth(score);

  useEffect(() => {
    const start = performance.now();
    const duration = 1200;

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [score]);

  const color = getScoreColor(score);
  const radius = 80;
  const strokeWidth = 10;
  const cx = 100;
  const cy = 100;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const dashOffset = arcLength - (health / 100) * arcLength;

  const sign = displayScore > 0 ? '+' : '';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            className="text-border"
            style={{ transform: 'rotate(135deg)', transformOrigin: '100px 100px' }}
          />
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{
              transform: 'rotate(135deg)',
              transformOrigin: '100px 100px',
              transition: 'stroke 0.5s',
              filter: `drop-shadow(0 0 8px ${color}60)`,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold tabular-nums" style={{ color }}>
            {sign}{displayScore}
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
            net points
          </span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center max-w-48">
        {score <= 0
          ? 'Negative = restorative. Your habits are rebuilding your reward system.'
          : 'Positive = overstimulated. You\'re spending more dopamine than you\'re restoring.'}
      </p>
    </div>
  );
}
