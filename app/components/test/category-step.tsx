import type { Category } from '@/lib/questions';
import { QuestionSlider } from './question-slider';
import { QuestionChoice } from './question-choice';

type Props = {
  category: Category;
  answers: Record<string, number>;
  onAnswer: (questionId: string, value: number) => void;
};

export function CategoryStep({ category, answers, onAnswer }: Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{category.emoji}</span>
          <h2 className="text-2xl font-bold">{category.title}</h2>
        </div>
        <p className="text-muted-foreground">{category.description}</p>
        <p className="text-xs text-muted-foreground/70 italic border-l-2 border-primary/30 pl-3">
          {category.scienceNote}
        </p>
      </div>

      <div className="space-y-8">
        {category.questions.map((question) =>
          question.type === 'slider' ? (
            <QuestionSlider
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={(v) => onAnswer(question.id, v)}
            />
          ) : (
            <QuestionChoice
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={(v) => onAnswer(question.id, v)}
            />
          ),
        )}
      </div>
    </div>
  );
}
