import { create } from 'zustand';

import { CATEGORIES } from '@/lib/questions';

type TestStore = {
  currentStep: number;
  answers: Record<string, number>;
  setAnswer: (questionId: string, value: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  isStepComplete: (step: number) => boolean;
  isComplete: () => boolean;
};

export const useTestStore = create<TestStore>((set, get) => ({
  currentStep: 0,
  answers: {},

  setAnswer: (questionId, value) =>
    set((s) => ({ answers: { ...s.answers, [questionId]: value } })),

  nextStep: () =>
    set((s) => ({ currentStep: Math.min(s.currentStep + 1, CATEGORIES.length - 1) })),

  prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 0) })),

  reset: () => set({ currentStep: 0, answers: {} }),

  isStepComplete: (step: number) => {
    const { answers } = get();
    const category = CATEGORIES[step];
    if (!category) return false;
    return category.questions.every((q) => answers[q.id] != null);
  },

  isComplete: () => {
    const { answers } = get();
    return CATEGORIES.every((cat) => cat.questions.every((q) => answers[q.id] != null));
  },
}));
