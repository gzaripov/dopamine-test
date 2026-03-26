import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect } from 'react';

import { CategoryBreakdown } from '@/components/results/category-breakdown';
import { Recommendations } from '@/components/results/recommendations';
import { ScoreGauge } from '@/components/results/score-gauge';
import { ShareButton } from '@/components/results/share-button';
import { TierBadge } from '@/components/results/tier-badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSession } from '@/lib/auth-client';
import type { TierLabel } from '@/lib/scoring';
import { claimAssessmentFn, getAssessmentFn } from '@/server/assessment';

export const Route = createFileRoute('/results/$shareToken')({
  loader: async ({ params }) => {
    return getAssessmentFn({ data: { shareToken: params.shareToken } });
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.score > 0 ? '+' : ''}${loaderData.score} — ${loaderData.tier} | DopamineTest` }]
      : [],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const assessment = Route.useLoaderData();
  const { data: session } = useSession();
  const { shareToken } = Route.useParams();

  // Claim this assessment if user just signed in
  useEffect(() => {
    if (session?.user && !assessment.userId) {
      claimAssessmentFn({ data: { shareToken } }).catch(() => {});
    }
  }, [session?.user, assessment.userId, shareToken]);

  const categoryScores = assessment.categoryScores as Record<string, number>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      {/* Score header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold">Your Dopamine Baseline</h1>
        <p className="text-muted-foreground text-sm">
          {new Date(assessment.completedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="flex justify-center">
        <ScoreGauge score={assessment.score} />
      </div>

      <TierBadge tier={assessment.tier as TierLabel} />

      <Separator />

      <CategoryBreakdown categoryScores={categoryScores} />

      <Separator />

      <Recommendations tier={assessment.tier as TierLabel} />

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center pt-4">
        <ShareButton />
        <Button variant="outline" asChild>
          <Link to="/test">Retake test</Link>
        </Button>
        {!session?.user && (
          <Button asChild>
            <Link to="/auth/signup" search={{ returnTo: `/results/${shareToken}` }}>
              Save results
            </Link>
          </Button>
        )}
        {session?.user && (
          <Button variant="secondary" asChild>
            <Link to="/history">View history</Link>
          </Button>
        )}
      </div>

      {!session?.user && (
        <p className="text-center text-xs text-muted-foreground">
          Sign up to save your results and track your dopamine health over time.
        </p>
      )}
    </div>
  );
}
