import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { CategoryStep } from '@/components/test/category-step';
import { LiveThermostat } from '@/components/test/live-thermostat';
import { TestProgress } from '@/components/test/test-progress';
import { Button } from '@/components/ui/button';
import { useTestStore } from '@/hooks/use-test-store';
import { CATEGORIES } from '@/lib/questions';
import { submitAssessmentFn } from '@/server/assessment';

export const Route = createFileRoute('/test')({
  component: TestPage,
});

function TestPage() {
  const navigate = useNavigate();
  const { currentStep, answers, setAnswer, nextStep, prevStep, isStepComplete, reset } =
    useTestStore();
  const [submitting, setSubmitting] = useState(false);

  const category = CATEGORIES[currentStep];
  const isLast = currentStep === CATEGORIES.length - 1;
  const canProceed = isStepComplete(currentStep);

  const handleNext = async () => {
    if (isLast) {
      setSubmitting(true);
      try {
        const result = await submitAssessmentFn({ data: { answers } });
        reset();
        await navigate({ to: '/results/$shareToken', params: { shareToken: result.shareToken } });
      } catch (e) {
        console.error(e);
        setSubmitting(false);
      }
    } else {
      nextStep();
    }
  };

  if (!category) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
      {/* Main test area */}
      <div className="flex-1 min-w-0 space-y-8">
        <TestProgress currentStep={currentStep} />

        <div className="min-h-96">
          <CategoryStep
            key={category.id}
            category={category}
            answers={answers}
            onAnswer={setAnswer}
          />
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0 || submitting}
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          <Button onClick={handleNext} disabled={!canProceed || submitting} className="gap-2">
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Calculating...
              </>
            ) : isLast ? (
              'See my results'
            ) : (
              <>
                Next
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Floating thermostat sidebar — hidden on small screens */}
      <div className="hidden lg:block">
        <LiveThermostat answers={answers} />
      </div>
    </div>
  );
}
