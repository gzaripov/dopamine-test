import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { z } from 'zod';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { calculateScore } from '@/lib/scoring';
import { optionalAuthMiddleware, requireAuthMiddleware } from './middleware';

const SubmitAssessmentSchema = z.object({
  answers: z.record(z.string(), z.number().int().min(1).max(5)),
});

const GetAssessmentSchema = z.object({ shareToken: z.string() });

const ClaimAssessmentSchema = z.object({ shareToken: z.string() });

export const submitAssessmentFn = createServerFn({ method: 'POST' })
  .middleware([optionalAuthMiddleware])
  .inputValidator(SubmitAssessmentSchema)
  .handler(async ({ data, context }) => {
    const { totalScore, tier, categoryScores } = calculateScore(data.answers);

    const assessment = await db.assessment.create({
      data: {
        score: totalScore,
        tier,
        categoryScores,
        userId: context.user?.id ?? null,
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

export const claimAssessmentFn = createServerFn({ method: 'POST' })
  .middleware([requireAuthMiddleware])
  .inputValidator(ClaimAssessmentSchema)
  .handler(async ({ data, context }) => {
    await db.assessment.updateMany({
      where: { shareToken: data.shareToken, userId: null },
      data: { userId: context.user.id },
    });
    return { success: true };
  });

export const getUserHistoryFn = createServerFn({ method: 'GET' })
  .middleware([requireAuthMiddleware])
  .handler(async ({ context }) => {
    return db.assessment.findMany({
      where: { userId: context.user.id },
      orderBy: { completedAt: 'desc' },
      select: {
        id: true,
        shareToken: true,
        score: true,
        tier: true,
        completedAt: true,
        categoryScores: true,
      },
    });
  });

// Server function for auth check (can't import server-only modules in route files)
export const getSessionFn = createServerFn({ method: 'GET' }).handler(async () => {
  const req = getRequest();
  const session = await auth.api.getSession({ headers: req.headers });
  return session;
});
