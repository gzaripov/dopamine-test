import { cn } from '@/lib/utils';
import type { SliderQuestion } from '@/lib/questions';

type Props = {
  question: SliderQuestion;
  value: number | undefined;
  onChange: (value: number) => void;
};

export function QuestionSlider({ question, value, onChange }: Props) {
  const current = value ?? 0;

  return (
    <div className="space-y-4">
      <p className="text-base font-medium leading-relaxed">{question.text}</p>

      <div className="space-y-3">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{question.lowLabel}</span>
          <span>{question.highLabel}</span>
        </div>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => onChange(v)}
              className={cn(
                'flex-1 h-12 rounded-lg border-2 font-semibold text-sm transition-all',
                current === v
                  ? 'border-primary bg-primary/20 text-primary'
                  : 'border-border bg-secondary/30 text-muted-foreground hover:border-primary/50 hover:text-foreground',
              )}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex justify-between text-xs text-muted-foreground px-1">
          <span>Better</span>
          <span>Worse</span>
        </div>
      </div>
    </div>
  );
}
