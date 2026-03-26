import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { BarChart2, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { TIER_DATA } from '@/lib/roasts';
import { getScoreColor } from '@/lib/scoring';
import type { TierLabel } from '@/lib/scoring';
import { getSessionFn, getUserHistoryFn } from '@/server/assessment';

export const Route = createFileRoute('/history')({
  beforeLoad: async () => {
    const session = await getSessionFn();
    if (!session?.user) {
      throw redirect({ to: '/auth/login' });
    }
    return { user: session.user };
  },
  loader: async () => getUserHistoryFn(),
  component: HistoryPage,
});

type HistoryItem = Awaited<ReturnType<typeof getUserHistoryFn>>[number];

function HistoryPage() {
  const history = Route.useLoaderData();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your History</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {history.length} assessment{history.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Button asChild>
          <Link to="/test">
            <Plus className="size-4" />
            New test
          </Link>
        </Button>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <BarChart2 className="size-12 mx-auto text-muted-foreground opacity-40" />
          <p className="text-muted-foreground">No assessments yet.</p>
          <Button asChild>
            <Link to="/test">Take your first test</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item: HistoryItem) => {
            const tierData = TIER_DATA[item.tier as TierLabel];
            const color = getScoreColor(item.score);

            return (
              <Link
                key={item.id}
                to="/results/$shareToken"
                params={{ shareToken: item.shareToken }}
                className="block bg-card border rounded-xl px-5 py-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className={`font-semibold text-sm ${tierData.color}`}>{item.tier}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(item.completedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                  <div className="text-3xl font-bold tabular-nums" style={{ color }}>
                    {item.score}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
