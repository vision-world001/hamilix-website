export const HERO = {
  kicker: 'AI × Blockchain Engineering',
  lead: 'We build',
  rotating: ['AI agents', 'blockchains', 'smart contracts', 'crypto rails', 'AI copilots', 'tokens'],
  tail: 'that ship.',
  sub: 'Excellent AI & blockchain products — engineered for the real world.',
  primaryCta: { label: 'Start a project', href: '/contact' },
  secondaryCta: { label: 'See what we build', href: '#build' },
} as const

export const TAPE_WORDS = {
  lime: ['Artificial Intelligence', 'LLM Agents', 'RAG', 'Copilots', 'Automation'],
  gold: ['Blockchain', 'Smart Contracts', 'Tokenization', 'DeFi', 'Crypto Payments'],
} as const

export const MANIFESTO = {
  text: 'Most teams pick AI or blockchain. We master both — and build products that think, prove, and scale.',
  highlights: ['AI', 'blockchain', 'both', 'think', 'prove', 'scale'],
} as const

/** The Hamilix Labs verb system — one verb per discipline. */
export const VERBS = [
  {
    verb: 'Think.',
    title: 'AI Engineering',
    href: '/ai',
    tone: 'lime',
    icon: 'brain',
    keys: ['Agents', 'RAG', 'LLMs', 'Copilots'],
  },
  {
    verb: 'Prove.',
    title: 'Blockchain Engineering',
    href: '/blockchain',
    tone: 'gold',
    icon: 'cube',
    keys: ['Smart contracts', 'Chains', 'Tokens', 'Audits'],
  },
  {
    verb: 'Connect.',
    title: 'Web3 Products',
    href: '/web3',
    tone: 'lime',
    icon: 'globe',
    keys: ['dApps', 'Wallets', 'Indexing'],
  },
  {
    verb: 'Transact.',
    title: 'Crypto Platforms',
    href: '/crypto',
    tone: 'gold',
    icon: 'coin',
    keys: ['Payments', 'Custody', 'Treasury'],
  },
] as const

export const EQUATION = {
  kicker: 'Our edge',
  items: [
    { title: 'Verifiable AI', line: 'Every AI decision, provable on-chain.', icon: 'shield' },
    { title: 'Agents that pay', line: 'AI agents with wallets — and limits.', icon: 'wallet' },
    { title: 'On-chain intelligence', line: 'ML that spots fraud & risk live.', icon: 'chart' },
  ],
} as const

export const BUILD = {
  kicker: 'What we build',
  title: 'Products,',
  titleAccent: 'not prototypes.',
  items: [
    { title: 'AI Agents', line: 'Autonomous work, with guardrails.', track: 'AI', icon: 'sparkles', size: 'lg' },
    { title: 'Payment Gateways', line: 'Accept crypto. Settle fast.', track: 'Blockchain', icon: 'card', size: 'sm' },
    { title: 'Knowledge AI', line: 'Your data, answering questions.', track: 'AI', icon: 'search', size: 'sm' },
    { title: 'DeFi & Tokens', line: 'Issue, stake, tokenize.', track: 'Blockchain', icon: 'layers', size: 'sm' },
    { title: 'Wallets & Custody', line: 'Keys secured. Approvals enforced.', track: 'Blockchain', icon: 'vault', size: 'sm' },
    { title: 'AI Copilots', line: 'Automate the busywork.', track: 'AI', icon: 'bolt', size: 'lg' },
  ],
} as const

export const PRINCIPLES = {
  kicker: 'Why Hamilix Labs',
  items: [
    { word: 'Ship.', line: 'Production, not prototypes.' },
    { word: 'Secure.', line: 'Security is feature #1.' },
    { word: 'Senior.', line: 'Experienced engineers, end-to-end.' },
    { word: 'Yours.', line: 'You own all code & IP.' },
  ],
} as const

export const PROCESS = {
  kicker: 'How we work',
  items: [
    { word: 'Discover', line: 'Goals, users, data.' },
    { word: 'Design', line: 'Architecture & security.' },
    { word: 'Build', line: 'Demo-driven sprints.' },
    { word: 'Launch', line: 'Deploy, monitor, scale.' },
  ],
} as const

export const TESTIMONIALS = {
  kicker: 'Client voices',
  items: [
    {
      id: 'chen',
      quote: 'Hamilix Labs cut integration latency with agent routing, retrieval, and observability — our engineering team had confidence before go-live.',
      name: 'Marcus Chen',
      role: 'CTO, FinLedger',
      image: '/images/testimonials/marcus-chen.jpg',
    },
    {
      id: 'okonkwo',
      quote: 'Hamilix Labs deployed a private blockchain with instant finality and smart contracts our auditors approved without hesitation.',
      name: 'Amara Okonkwo',
      role: 'CTO, ChainBridge Capital',
      image: '/images/testimonials/amara-okonkwo.jpg',
    },
    {
      id: 'clubb',
      quote: 'Hamilix Labs built secure AI pipelines and data orchestration that scaled with us from day one.',
      name: 'Susan Clubb',
      role: 'CEO, Veridian Health',
      image: '/images/testimonials/susan-clubb.jpg',
    },
    {
      id: 'walsh',
      quote: 'It felt like an embedded product team, not a vendor.',
      name: 'Elena Walsh',
      role: 'CEO, NovaPay',
      image: '/images/testimonials/elena-walsh.jpg',
    },
    {
      id: 'singh',
      quote: 'Custody and payment rails with treasury workflows — live on schedule.',
      name: 'Raj Singh',
      role: 'CEO, Meridian Digital',
      image: '/images/testimonials/raj-singh.jpg',
    },
  ],
} as const
