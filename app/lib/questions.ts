export type SliderQuestion = {
  id: string;
  type: 'slider';
  text: string;
  lowLabel: string;
  highLabel: string;
  // Points per answer level (1=low, 5=high). Positive = spike, negative = restore.
  points: [number, number, number, number, number];
};

export type ChoiceOption = { label: string; value: number; points: number };

export type ChoiceQuestion = {
  id: string;
  type: 'choice';
  text: string;
  options: ChoiceOption[];
};

export type Question = SliderQuestion | ChoiceQuestion;

export type Category = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  scienceNote: string;
  questions: Question[];
};

export const CATEGORIES: Category[] = [
  {
    id: 'screen-time',
    title: 'Screen Time & Digital',
    emoji: '📱',
    description: 'Your relationship with the glowing rectangle that owns you',
    scienceNote:
      'The smartphone is a portable slot machine. Algorithmic content produces variable rewards — the same mechanism that makes gambling addictive. Each scroll is a pull of the lever.',
    questions: [
      {
        id: 'screen-time-1',
        type: 'choice',
        text: 'How much time do you spend on social media daily (TikTok, Insta, X)?',
        options: [
          { label: 'Almost none', value: 1, points: 0 },
          { label: '< 30 minutes', value: 2, points: 30 },
          { label: '~1 hour', value: 3, points: 75 },
          { label: '~2 hours', value: 4, points: 120 },
          { label: '3+ hours', value: 5, points: 150 },
        ],
      },
      {
        id: 'screen-time-2',
        type: 'choice',
        text: 'YouTube / TikTok / short-form video rabbit holes?',
        options: [
          { label: 'Never fall in', value: 1, points: 0 },
          { label: 'Occasionally, < 30 min', value: 2, points: 35 },
          { label: '~1 hour sessions', value: 3, points: 80 },
          { label: '2+ hour sessions weekly', value: 4, points: 140 },
          { label: 'Multiple times a week, hours gone', value: 5, points: 200 },
        ],
      },
      {
        id: 'screen-time-3',
        type: 'choice',
        text: 'Video games — how much per day?',
        options: [
          { label: "Don't play", value: 1, points: 0 },
          { label: 'Casual, < 30 min', value: 2, points: 20 },
          { label: '~1 hour', value: 3, points: 50 },
          { label: '~2 hours (competitive/FPS)', value: 4, points: 100 },
          { label: '3+ hours or lootbox/gambling games', value: 5, points: 180 },
        ],
      },
      {
        id: 'screen-time-4',
        type: 'choice',
        text: 'Pornography consumption?',
        options: [
          { label: 'Never', value: 1, points: 0 },
          { label: 'Rarely', value: 2, points: 30 },
          { label: 'Weekly sessions', value: 3, points: 60 },
          { label: 'Daily', value: 4, points: 120 },
          { label: 'Multiple times daily / escalating', value: 5, points: 200 },
        ],
      },
      {
        id: 'screen-time-5',
        type: 'choice',
        text: 'Compulsive phone checking / doom-scrolling news?',
        options: [
          { label: 'Phone stays in pocket', value: 1, points: 0 },
          { label: 'Check a few times/day', value: 2, points: 10 },
          { label: 'Check every hour', value: 3, points: 40 },
          { label: 'Check every 15 minutes', value: 4, points: 80 },
          { label: 'Phone is an extension of my hand', value: 5, points: 120 },
        ],
      },
    ],
  },
  {
    id: 'substances',
    title: 'Substances & Consumption',
    emoji: '🍺',
    description: 'The legal (and less legal) mood management department',
    scienceNote:
      'Substances hijack the reward circuit directly. Every spike is followed by a compensatory dip below baseline — the "pleasure debt." Repeated use = neuroadaptation: you need more for the same effect while baseline happiness drops.',
    questions: [
      {
        id: 'substances-1',
        type: 'choice',
        text: 'Caffeine intake (coffee, energy drinks)?',
        options: [
          { label: 'None', value: 1, points: 0 },
          { label: '1 cup of coffee', value: 2, points: 15 },
          { label: '2-3 cups', value: 3, points: 30 },
          { label: '4+ cups or energy drinks', value: 4, points: 60 },
          { label: 'Multiple energy drinks daily', value: 5, points: 100 },
        ],
      },
      {
        id: 'substances-2',
        type: 'choice',
        text: 'Alcohol consumption on a typical day you drink?',
        options: [
          { label: "Don't drink", value: 1, points: 0 },
          { label: '1-2 drinks occasionally', value: 2, points: 40 },
          { label: '3-4 drinks', value: 3, points: 90 },
          { label: '5+ drinks', value: 4, points: 175 },
          { label: 'Heavy drinking, spirits', value: 5, points: 200 },
        ],
      },
      {
        id: 'substances-3',
        type: 'choice',
        text: 'Nicotine use (cigarettes, vaping)?',
        options: [
          { label: 'None', value: 1, points: 0 },
          { label: 'Occasional vaping', value: 2, points: 40 },
          { label: 'Regular vaping', value: 3, points: 90 },
          { label: 'Half pack/day', value: 4, points: 130 },
          { label: 'Full pack or chain vaping', value: 5, points: 175 },
        ],
      },
      {
        id: 'substances-4',
        type: 'choice',
        text: 'Cannabis / THC use?',
        options: [
          { label: 'None', value: 1, points: 0 },
          { label: 'Rarely (monthly)', value: 2, points: 30 },
          { label: 'Weekly', value: 3, points: 60 },
          { label: 'Daily', value: 4, points: 120 },
          { label: 'Multiple times daily', value: 5, points: 200 },
        ],
      },
      {
        id: 'substances-5',
        type: 'choice',
        text: 'Junk food / ultra-processed food / sugar binges?',
        options: [
          { label: 'Clean diet, rare treats', value: 1, points: 0 },
          { label: 'Occasional sweets/snacks', value: 2, points: 25 },
          { label: 'Daily junk food meals', value: 3, points: 65 },
          { label: 'Multiple junk meals + snacking', value: 4, points: 110 },
          { label: 'Constant processed food + sugar binges', value: 5, points: 150 },
        ],
      },
    ],
  },
  {
    id: 'exercise',
    title: 'Physical Activity & Exercise',
    emoji: '🏋️',
    description: 'Voluntary discomfort — your strongest rebalancing tool',
    scienceNote:
      'Exercise upregulates D2 receptors over time, raising your baseline capacity for pleasure. The harder and more uncomfortable the activity, the greater the rebalancing effect. Cold exposure is specifically highlighted by Lembke as a potent reset.',
    questions: [
      {
        id: 'exercise-1',
        type: 'choice',
        text: 'Structured exercise (gym, running, sports)?',
        options: [
          { label: 'None', value: 1, points: 0 },
          { label: '1-2x per week, light', value: 2, points: -35 },
          { label: '3-4x per week, moderate', value: 3, points: -70 },
          { label: '5x per week, intense', value: 4, points: -120 },
          { label: 'Daily, heavy training', value: 5, points: -150 },
        ],
      },
      {
        id: 'exercise-2',
        type: 'choice',
        text: 'Walking / outdoor time (without phone)?',
        options: [
          { label: 'Almost none', value: 1, points: 0 },
          { label: '15 min walks', value: 2, points: -15 },
          { label: '30 min walks in nature', value: 3, points: -35 },
          { label: '1 hour walks daily', value: 4, points: -60 },
          { label: 'Extended hiking / outdoor time', value: 5, points: -90 },
        ],
      },
      {
        id: 'exercise-3',
        type: 'choice',
        text: 'Cold exposure (cold showers, ice baths)?',
        options: [
          { label: 'Never', value: 1, points: 0 },
          { label: 'Occasional cold showers', value: 2, points: -30 },
          { label: 'Regular cold showers (5 min)', value: 3, points: -60 },
          { label: 'Daily cold showers + occasional ice baths', value: 4, points: -80 },
          { label: 'Daily ice baths / extended cold exposure', value: 5, points: -100 },
        ],
      },
      {
        id: 'exercise-4',
        type: 'choice',
        text: 'Yoga, stretching, or active recovery?',
        options: [
          { label: 'None', value: 1, points: 0 },
          { label: 'Occasional stretching', value: 2, points: -15 },
          { label: '2-3x per week yoga', value: 3, points: -35 },
          { label: '4-5x per week sessions', value: 4, points: -55 },
          { label: 'Daily practice, 45+ min', value: 5, points: -75 },
        ],
      },
    ],
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness & Mental Practices',
    emoji: '🧘',
    description: "Strengthening your brain's ability to say no",
    scienceNote:
      'The "M" in Lembke\'s DOPAMINE framework: the ability to observe cravings without acting on them. These practices strengthen the prefrontal cortex\'s override of impulsive reward-seeking. Digital detox removes the most accessible dopamine source.',
    questions: [
      {
        id: 'mindfulness-1',
        type: 'choice',
        text: 'Meditation or breathwork practice?',
        options: [
          { label: 'Never', value: 1, points: 0 },
          { label: '5 min guided, occasionally', value: 2, points: -15 },
          { label: '15 min most days', value: 3, points: -35 },
          { label: '20-30 min daily', value: 4, points: -60 },
          { label: '30+ min daily, unguided', value: 5, points: -75 },
        ],
      },
      {
        id: 'mindfulness-2',
        type: 'choice',
        text: 'Journaling or reflective writing?',
        options: [
          { label: 'Never', value: 1, points: 0 },
          { label: 'Occasionally', value: 2, points: -10 },
          { label: 'Weekly', value: 3, points: -20 },
          { label: 'Most days, 15-20 min', value: 4, points: -35 },
          { label: 'Daily deep practice', value: 5, points: -50 },
        ],
      },
      {
        id: 'mindfulness-3',
        type: 'choice',
        text: 'Reading physical books (not screens)?',
        options: [
          { label: 'Never', value: 1, points: 0 },
          { label: '20 min occasionally', value: 2, points: -10 },
          { label: '30-45 min most days', value: 3, points: -20 },
          { label: '1+ hour daily', value: 4, points: -35 },
          { label: 'Several hours, deep reader', value: 5, points: -45 },
        ],
      },
      {
        id: 'mindfulness-4',
        type: 'choice',
        text: 'Intentional digital detox periods?',
        options: [
          { label: 'Phone is always on', value: 1, points: 0 },
          { label: 'Occasional 1-hour breaks', value: 2, points: -10 },
          { label: 'Regular evening phone-off', value: 3, points: -30 },
          { label: 'Half-day detox weekly', value: 4, points: -45 },
          { label: 'Full day+ detox regularly', value: 5, points: -60 },
        ],
      },
    ],
  },
  {
    id: 'social',
    title: 'Social & Lifestyle',
    emoji: '🤝',
    description: 'The original dopamine sources — human connection and purpose',
    scienceNote:
      'Honest human connection is one of the most powerful rebalancing tools. Quality relationships produce oxytocin and serotonin, which support long-term wellbeing rather than short-term spikes. Prosocial behavior is a core recovery principle.',
    questions: [
      {
        id: 'social-1',
        type: 'choice',
        text: 'Deep, in-person conversations with people you care about?',
        options: [
          { label: 'Rarely', value: 1, points: 0 },
          { label: 'Weekly, brief', value: 2, points: -20 },
          { label: 'Several times/week, 30+ min', value: 3, points: -45 },
          { label: 'Daily quality time', value: 4, points: -60 },
          { label: 'Deep daily connection + helping others', value: 5, points: -75 },
        ],
      },
      {
        id: 'social-2',
        type: 'choice',
        text: 'Creative hobbies or learning new skills (non-screen)?',
        options: [
          { label: 'None', value: 1, points: 0 },
          { label: 'Occasional dabbling', value: 2, points: -10 },
          { label: 'Weekly practice', value: 3, points: -25 },
          { label: 'Regular deliberate practice', value: 4, points: -40 },
          { label: 'Daily creative / skill-building practice', value: 5, points: -55 },
        ],
      },
      {
        id: 'social-3',
        type: 'choice',
        text: 'Cooking meals from scratch?',
        options: [
          { label: 'Never cook', value: 1, points: 0 },
          { label: 'Simple meals occasionally', value: 2, points: -10 },
          { label: 'Cook most meals', value: 3, points: -20 },
          { label: 'Elaborate cooking regularly', value: 4, points: -30 },
          { label: 'Daily from-scratch cooking, enjoy the process', value: 5, points: -40 },
        ],
      },
      {
        id: 'social-4',
        type: 'choice',
        text: 'Time in nature (sitting, no phone)?',
        options: [
          { label: 'Never', value: 1, points: 0 },
          { label: 'Occasionally, 15 min', value: 2, points: -15 },
          { label: 'Weekly, 30+ min', value: 3, points: -30 },
          { label: 'Multiple times/week', value: 4, points: -45 },
          { label: 'Daily, extended time', value: 5, points: -60 },
        ],
      },
    ],
  },
  {
    id: 'sleep',
    title: 'Sleep & Daily Routines',
    emoji: '😴',
    description: 'The foundation your dopamine system runs on',
    scienceNote:
      'Sleep deprivation reduces D2 receptor availability, making you more vulnerable to seeking high-dopamine stimulation. Morning sunlight, consistent schedules, and screens-off before bed are the highest-ROI habits.',
    questions: [
      {
        id: 'sleep-1',
        type: 'choice',
        text: 'Sleep quality and consistency (7-9 hrs)?',
        options: [
          { label: 'Consistent 7-9 hrs every night', value: 1, points: -30 },
          { label: 'Mostly consistent, occasional off nights', value: 2, points: -15 },
          { label: 'Inconsistent, averaging 6-7 hrs', value: 3, points: 0 },
          { label: 'Frequently < 6 hrs', value: 4, points: 40 },
          { label: 'Chronic sleep deprivation', value: 5, points: 80 },
        ],
      },
      {
        id: 'sleep-2',
        type: 'choice',
        text: 'Screen use in the last hour before bed?',
        options: [
          { label: 'Screens off 1+ hr before bed', value: 1, points: 0 },
          { label: 'Some screen use, limited', value: 2, points: 10 },
          { label: '30 min of scrolling', value: 3, points: 20 },
          { label: '1 hour in bed on phone', value: 4, points: 40 },
          { label: 'Fall asleep with phone in hand', value: 5, points: 70 },
        ],
      },
      {
        id: 'sleep-3',
        type: 'choice',
        text: 'Morning routine?',
        options: [
          { label: 'Cold shower + sunlight + no phone 1st hour', value: 1, points: -35 },
          { label: 'Structured morning, some screen', value: 2, points: -15 },
          { label: 'Basic routine, check phone early', value: 3, points: 0 },
          { label: 'Phone first, then scramble', value: 4, points: 20 },
          { label: 'Doomscroll before getting out of bed', value: 5, points: 40 },
        ],
      },
      {
        id: 'sleep-4',
        type: 'choice',
        text: 'Morning sunlight exposure (10+ min)?',
        options: [
          { label: 'Daily morning sun', value: 1, points: -15 },
          { label: 'Most days', value: 2, points: -10 },
          { label: 'Sometimes', value: 3, points: 0 },
          { label: 'Rarely', value: 4, points: 5 },
          { label: 'Never, straight to screens', value: 5, points: 10 },
        ],
      },
    ],
  },
];

export const TOTAL_STEPS = CATEGORIES.length;
export const ALL_QUESTIONS = CATEGORIES.flatMap((c) => c.questions);
