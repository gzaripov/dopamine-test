import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, Brain, Zap, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { TIER_DATA } from '@/lib/roasts';
import type { TierLabel } from '@/lib/scoring';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

const TIER_PREVIEWS: Array<{ tier: TierLabel; score: string }> = [
  { tier: 'Crisis Zone', score: '+300 and above' },
  { tier: 'Dopamine Debt', score: '+150 to +300' },
  { tier: 'Overstimulated', score: '+50 to +150' },
  { tier: 'Mild Overstimulation', score: '+1 to +50' },
  { tier: 'Healthy Balance', score: '0 to -50' },
  { tier: 'Strong Rebalance', score: '-50 to -100' },
  { tier: 'Deep Reset Mode', score: 'Below -100' },
];

function LandingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-20">
      {/* Hero */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-sm px-4 py-2 rounded-full">
          <Brain className="size-4" />
          Based on <em>Dopamine Nation</em> by Anna Lembke
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight">
          Are your dopamine
          <br />
          <span className="text-primary">receptors still alive?</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Probably not. But let's find out exactly how cooked you are.
          6 categories. Your daily habits scored. One brutally honest number.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="gap-2 text-base px-8" asChild>
            <Link to="/test">
              Take the test
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          ~5 minutes · anonymous by default · brutally honest
        </p>
      </div>

      {/* What is this */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">The pain/pleasure thermostat</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: <Zap className="size-5" />,
              title: 'Dopamine spike',
              desc: 'Every notification, sugar hit, and binge session spikes your dopamine.',
            },
            {
              icon: <AlertTriangle className="size-5" />,
              title: 'Baseline drops',
              desc: 'After the spike, your baseline drops below normal. You need more to feel the same.',
            },
            {
              icon: <Brain className="size-5" />,
              title: 'Anhedonia sets in',
              desc: "Simple pleasures stop working. You're bored, restless, and always reaching for more.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-card border rounded-xl p-5 space-y-2">
              <div className="text-primary">{item.icon}</div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tiers preview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Where do you fall?</h2>
        <div className="space-y-2">
          {TIER_PREVIEWS.map(({ tier, score }) => {
            const data = TIER_DATA[tier];
            return (
              <div
                key={tier}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 ${data.bgColor} ${data.borderColor}`}
              >
                <span className={`font-semibold text-sm ${data.color}`}>{tier}</span>
                <span className="text-xs text-muted-foreground tabular-nums">{score}</span>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <Button size="lg" className="gap-2 text-base px-8" asChild>
            <Link to="/test">
              Find out yours
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
