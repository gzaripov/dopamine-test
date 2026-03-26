import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

import { db } from '@/lib/db';
import { calculateScore } from '@/lib/scoring';

const SubmitAssessmentSchema = z.object({
  answers: z.record(z.string(), z.number().int().min(1).max(5)),
});

const GetAssessmentSchema = z.object({ shareToken: z.string() });

export const submitAssessmentFn = createServerFn({ method: 'POST' })
  .inputValidator(SubmitAssessmentSchema)
  .handler(async ({ data }) => {
    const { totalScore, tier, categoryScores } = calculateScore(data.answers);

    const assessment = await db.assessment.create({
      data: {
        score: totalScore,
        tier,
        categoryScores,
        answers: {
          create: Object.entries(data.answers).map(([questionId, value]) => ({
            questionId,
            categoryId: questionId.split('-').slice(0, -1).join('-'),
            value: value as number,
            scoredValue: 6 - (value as number),
          })),
        },
      },
    });

    return { shareToken: assessment.shareToken, score: totalScore, tier };
  });

export const getAssessmentFn = createServerFn({ method: 'GET' })
  .inputValidator(GetAssessmentSchema)
  .handler(async ({ data }) => {
    const assessment = await db.assessment.findUnique({
      where: { shareToken: data.shareToken },
    });

    if (!assessment) {
      throw new Error('Assessment not found');
    }

    return assessment;
  });
