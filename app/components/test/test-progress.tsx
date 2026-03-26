import { CATEGORIES } from '@/lib/questions';
import { cn } from '@/lib/utils';

type Props = {
  currentStep: number;
};

export function TestProgress({ currentStep }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          Category <span className="text-foreground font-medium">{currentStep + 1}</span> of{' '}
          {CATEGORIES.length}
        </span>
        <span>{Math.round(((currentStep + 1) / CATEGORIES.length) * 100)}%</span>
      </div>

      <div className="flex gap-1">
        {CATEGORIES.map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 h-1.5 rounded-full transition-all',
              i < currentStep
                ? 'bg-primary'
                : i === currentStep
                  ? 'bg-primary/60'
                  : 'bg-border',
            )}
          />
        ))}
      </div>
    </div>
  );
}
