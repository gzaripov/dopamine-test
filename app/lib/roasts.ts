import type { TierLabel } from './scoring';

export type TierData = {
  color: string;
  bgColor: string;
  borderColor: string;
  emoji: string;
  roast: string;
  meme: string;
  recommendations: string[];
};

export const TIER_DATA: Record<TierLabel, TierData> = {
  'Crisis Zone': {
    color: 'text-red-600',
    bgColor: 'bg-red-600/10',
    borderColor: 'border-red-600/30',
    emoji: '⛔',
    roast:
      "Your dopamine system isn't just overclocked — it's on fire. You're running a compulsive overconsumption pattern that would make a lab rat feel sorry for you. Your brain's pleasure-pain seesaw is permanently tilted and your baseline is somewhere underground. The good news: Anna Lembke says a 30-day dopamine fast can reset this. The bad news: you'd have to stop doing literally everything you currently do.",
    meme: 'This is not a drill. This is a cry for help from your prefrontal cortex.',
    recommendations: [
      'Seriously consider Lembke\'s 30-day dopamine fast: complete abstinence from your primary dopamine source.',
      'The first 2 weeks are brutal. By week 3-4, everyday pleasures become enjoyable again.',
      'Use "self-binding strategies": delete apps, give someone else your passwords, create physical barriers.',
      'Find an accountability partner or support group. Radical honesty accelerates recovery.',
    ],
  },
  'Dopamine Debt': {
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    emoji: '🔴',
    roast:
      "You're accumulating serious pleasure debt. Every spike you chase is followed by a deeper dip below baseline — that's why nothing feels good anymore and you need more and more stimulation just to feel normal. Lembke calls this neuroadaptation. Your brain is literally rewiring to need the chaos.",
    meme: 'Your dopamine receptors filed for bankruptcy but you keep spending.',
    recommendations: [
      'Your net score means you\'re burning through dopamine faster than you\'re rebuilding it.',
      'Cut your highest-scoring category by 50%. That one category is probably driving most of the debt.',
      'Add cold showers (-60 points) and 30-min daily walks in nature (-35 points) as emergency rebalancers.',
      'Track your daily score for a week. Seeing the numbers makes the pattern undeniable.',
    ],
  },
  'Overstimulated': {
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    emoji: '🟠',
    roast:
      "Your pleasure-pain balance is tipping. You can still enjoy things, but you're noticing it takes more to get the same hit. Sunsets used to work. Now you need 4K HDR with a lo-fi playlist. Your brain's reward system is like a blender that's been running on high for way too long.",
    meme: "This is fine 🔥 (narrator: it was not fine)",
    recommendations: [
      'Your restorative activities aren\'t offsetting your consumption. Time to rebalance.',
      'Pick ONE high-spike habit and reduce it. The algorithm will survive without you.',
      'Add 2-3 restorative activities: exercise, meditation, real human contact.',
      'A healthy day targets a net score of 0 or below. You\'re not there yet.',
    ],
  },
  'Mild Overstimulation': {
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    emoji: '🟡',
    roast:
      "You're slightly in the positive, which means your daily dopamine diet has a bit too much junk food. Not alarming, but watch for the pattern creeping upward. Today's 'just one more episode' is tomorrow's 'where did 4 hours go.' You're basically the average person in 2025, which is... not the flex you think it is.",
    meme: "Could be worse. Could be better. It's mid.",
    recommendations: [
      'You\'re close to balance. Small changes will flip your score negative (that\'s the goal).',
      'Audit your evening routine — screen time before bed is often the sneaky culprit.',
      'One extra walk or one fewer hour of scrolling would tip the scale.',
      'Sleep consistency is the highest-ROI single change: -30 points/night.',
    ],
  },
  'Healthy Balance': {
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    emoji: '🟢',
    roast:
      "Net zero or slightly negative — this is what balance looks like. You're consuming some dopamine-spiking stuff (you're human) but offsetting it with enough restorative practices to stay calibrated. You can enjoy simple pleasures. You can sit with boredom. Honestly suspicious that you're this well-adjusted in 2025.",
    meme: 'NPC behavior detected (the healthy kind)',
    recommendations: [
      'You\'re in the sustainable zone. Keep doing what you\'re doing.',
      'Push toward -50 to -100 range if you want to actively rebuild receptor sensitivity.',
      'Maintain your exercise and social practices — they\'re carrying your score.',
      'Monitor for drift. It\'s easy to slowly creep back into overstimulation territory.',
    ],
  },
  'Strong Rebalance': {
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    emoji: '🟢',
    roast:
      "Excellent. You're actively rebuilding your dopamine receptor sensitivity. Your daily habits are more restorative than stimulating, which means your brain is literally growing new D2 receptors. Simple pleasures hit different when your baseline is properly calibrated. A sunset might actually move you.",
    meme: 'Your dopamine receptors are sending a thank-you card.',
    recommendations: [
      'This is the ideal daily target for most people. You\'re doing it right.',
      'Consider adding one more challenge: a harder workout, longer meditation, or a full digital detox day.',
      'Share your approach with someone who\'s struggling. Prosocial behavior is itself restorative.',
      'Your brain is recalibrating. Protect this state.',
    ],
  },
  'Deep Reset Mode': {
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    emoji: '💚',
    roast:
      "Either you've achieved genuine dopamine enlightenment through disciplined intentional living... or you live in a monastery. Your score suggests you're in deep reset territory — heavy exercise, meditation, nature, minimal screens. This is ideal for recovery periods or dopamine fasting days. If this is your everyday, you might be the main character.",
    meme: '☯️ The algorithm cannot reach you here.',
    recommendations: [
      'This is ideal for recovery periods. If doing a 30-day reset, this is the target.',
      'If this is your daily life, congratulations — you\'re an outlier.',
      'Make sure you\'re not avoiding all pleasure as a form of control. Some stimulation is healthy.',
      'After reset periods, mindfully reintroduce activities with strict limits.',
    ],
  },
};
