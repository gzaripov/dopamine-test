import { cn } from '@/lib/utils';
import type { ChoiceQuestion } from '@/lib/questions';

type Props = {
  question: ChoiceQuestion;
  value: number | undefined;
  onChange: (value: number) => void;
};

export function QuestionChoice({ question, value, onChange }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-base font-medium leading-relaxed">{question.text}</p>

      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition-all',
              value === option.value
                ? 'border-primary bg-primary/20 text-foreground font-medium'
                : 'border-border bg-secondary/20 text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-secondary/40',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
