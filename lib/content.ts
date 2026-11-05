export const SITE = {
  name: 'Hamilix',
  logo: '/images/hamilix-logo.png',
  headerImage: '/images/hamilix-logo.png',
  pageHeroImage: '/images/page-hero-background.png',
  email: 'hello@hamilix.com',
  phone: '+1 747 304 3406',
  phoneHref: 'tel:+17473043406',
} as const

export const SITE_TAGLINE = 'AI & Blockchain Engineering'

export const FOOTER = {
  addresses: [
    '841 Broadway, New York, NY 10003, US',
    '7 Pancras Square, London, England N1C 4AG, GB',
  ],
  blurb: 'Excellent AI & blockchain products — engineered for the real world.',
  columns: [
    {
      heading: 'Build',
      links: [
        { label: 'AI Engineering', href: '/ai' },
        { label: 'Blockchain', href: '/blockchain' },
        { label: 'Web3 Products', href: '/web3' },
        { label: 'Crypto Platforms', href: '/crypto' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com/company/hamilix', icon: 'linkedin' as const },
    { label: 'Email', href: `mailto:${SITE.email}`, icon: 'email' as const },
    { label: 'Telegram', href: 'https://t.me/hamilix', icon: 'telegram' as const },
  ],
} as const

export const NAV_LINKS = [
  { label: 'AI', href: '/ai' },
  { label: 'Blockchain', href: '/blockchain' },
  { label: 'Web3', href: '/web3' },
  { label: 'Crypto', href: '/crypto' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
] as const

export type ServiceTone = 'lime' | 'gold'

export type ServiceItem = {
  title: string
  line: string
  icon: string
  image?: string
  featured?: boolean
  tags?: readonly string[]
}

export type ServiceContent = {
  slug: string
  verb: string
  tone: ServiceTone
  eyebrow: string
  title: string
  sub: string
  keywords: readonly string[]
  problems: { kicker: string; items: readonly string[] }
  capabilities: { title: string; items: readonly ServiceItem[] }
  highlight: { kicker: string; title: string; items: readonly { big: string; label: string }[]; note?: string }
  cta: { title: string; accent: string }
}

export const AI_PAGE: ServiceContent = {
  slug: 'ai',
  verb: 'THINK.',
  tone: 'lime',
  eyebrow: 'AI Engineering',
  title: 'Intelligence, engineered.',
  sub: 'Agents, RAG, and copilots — built for production, not demos.',
  keywords: ['LLM Agents', 'RAG', 'Embeddings', 'Vector Search', 'Model Routing', 'Evals', 'Guardrails', 'Copilots', 'Automation', 'MLOps'],
  problems: {
    kicker: 'What we eliminate',
    items: ['Knowledge silos', 'Failed LLM pilots', 'Hallucinations', 'Manual busywork', 'Ungoverned agents'],
  },
  capabilities: {
    title: 'What we build',
    items: [
      { title: 'RAG & Retrieval', line: 'Answers grounded in your data.', icon: 'search', image: '/images/ai-capabilities/rag-vector-retrieval.jpg', featured: true, tags: ['Vector search', 'Re-ranking', 'Citations'] },
      { title: 'AI Agents', line: 'Multi-step agents with tools & memory.', icon: 'sparkles', image: '/images/ai-capabilities/agent-orchestration.jpg', featured: true, tags: ['Tool use', 'Memory', 'Fallbacks'] },
      { title: 'Model Routing', line: 'Right model. Right cost. Every call.', icon: 'route' },
      { title: 'Evals & Guardrails', line: 'Tested before users see it.', icon: 'shield' },
      { title: 'Observability', line: 'Latency, drift, errors — live.', icon: 'gauge' },
      { title: 'Embedding Pipelines', line: 'Ingest, chunk, embed — always fresh.', icon: 'layers' },
      { title: 'Workflow Automation', line: 'From insight to action, automatically.', icon: 'bolt' },
      { title: 'Enterprise Integration', line: 'Plugged into your CRM, data & tools.', icon: 'plug' },
    ],
  },
  highlight: {
    kicker: 'Outcomes',
    title: 'What changes.',
    items: [
      { big: 'Weeks', label: 'not months, to production' },
      { big: 'Lower', label: 'model spend via smart routing' },
      { big: 'Safer', label: 'evals & guardrails built in' },
      { big: 'Yours', label: 'code, models & IP' },
    ],
  },
  cta: { title: 'Ready to make your product', accent: 'think?' },
}

export const BLOCKCHAIN_PAGE: ServiceContent = {
  slug: 'blockchain',
  verb: 'PROVE.',
  tone: 'gold',
  eyebrow: 'Blockchain Engineering',
  title: 'Trust, engineered.',
  sub: 'Smart contracts, chains, and tokens — secure enough to hold real value.',
  keywords: ['Smart Contracts', 'Solidity', 'Rust', 'EVM', 'Permissioned Chains', 'Tokenization', 'DID', 'Bridges', 'Oracles', 'Audits'],
  problems: {
    kicker: 'What we replace',
    items: ['Paper trails', 'Reconciliation hell', 'Settlement delays', 'Middlemen', 'Single points of failure'],
  },
  capabilities: {
    title: 'What we build on‑chain',
    items: [
      { title: 'Smart Contracts', line: 'Audited. Gas-optimized. Battle-ready.', icon: 'code', featured: true, tags: ['Solidity', 'Rust', 'Upgradeable'] },
      { title: 'Tokenization', line: 'Any asset, on-chain — full lifecycle.', icon: 'layers', featured: true, tags: ['ERC-20', 'ERC-721', 'ERC-3643'] },
      { title: 'Enterprise Networks', line: 'Permissioned chains for B2B settlement.', icon: 'network' },
      { title: 'On-Chain Identity', line: 'Verifiable credentials & DID.', icon: 'users' },
      { title: 'Provenance', line: 'Trace every hop of your supply chain.', icon: 'route' },
      { title: 'Cross-Chain', line: 'Bridges & messaging across networks.', icon: 'link' },
      { title: 'Security Reviews', line: 'Threat-modeled before mainnet.', icon: 'shield' },
      { title: 'Architecture', line: 'Chain, tokenomics & governance.', icon: 'cube' },
    ],
  },
  highlight: {
    kicker: 'Security pipeline',
    title: 'Every contract earns mainnet.',
    items: [
      { big: 'Model', label: 'threats & attack surface' },
      { big: 'Test', label: 'unit, fuzz & invariants' },
      { big: 'Review', label: 'senior peer review' },
      { big: 'Audit', label: 'third-party ready' },
      { big: 'Deploy', label: 'staged & monitored' },
    ],
  },
  cta: { title: 'Ready to put it', accent: 'on‑chain?' },
}

export const WEB3_PAGE: ServiceContent = {
  slug: 'web3',
  verb: 'CONNECT.',
  tone: 'lime',
  eyebrow: 'Web3 Products',
  title: 'Web3, made human.',
  sub: 'dApps and wallets that feel as smooth as the best apps you use.',
  keywords: ['dApps', 'WalletConnect', 'SIWE', 'Account Abstraction', 'Gasless', 'Indexers', 'GraphQL', 'DAOs', 'Multi-chain', 'SDKs'],
  problems: {
    kicker: 'What we fix',
    items: ['Wallet drop-off', 'Wrong-network errors', 'Re-sign loops', 'Slow chain reads'],
  },
  capabilities: {
    title: 'What we ship',
    items: [
      { title: 'dApps', line: 'Full-stack, production-grade UX.', icon: 'code', featured: true, tags: ['React', 'Next.js', 'Mobile'] },
      { title: 'Wallet Integration', line: 'Connect, sign, switch — no dead ends.', icon: 'wallet', featured: true, tags: ['WalletConnect', 'Embedded', 'AA'] },
      { title: 'Web3 Auth', line: 'SIWE & passkeys that feel like login.', icon: 'shield' },
      { title: 'On-Chain Indexing', line: 'Chain data in milliseconds.', icon: 'chart' },
      { title: 'DAO Systems', line: 'Proposals, voting & treasury.', icon: 'users' },
      { title: 'Gasless Onboarding', line: 'First transaction, no gas tokens.', icon: 'bolt' },
      { title: 'Multi-Chain', line: 'One interface. Many networks.', icon: 'network' },
      { title: 'Developer SDKs', line: 'Typed bindings & integration kits.', icon: 'plug' },
    ],
  },
  highlight: {
    kicker: 'Performance targets',
    title: 'Fast by design.',
    note: 'Targets we engineer toward from day one.',
    items: [
      { big: '<2s', label: 'wallet connect' },
      { big: '99.95%', label: 'auth availability' },
      { big: '<500ms', label: 'indexed events' },
      { big: '<1s', label: 'session recovery' },
    ],
  },
  cta: { title: 'Ready to ship', accent: 'Web3?' },
}

export const CRYPTO_PAGE: ServiceContent = {
  slug: 'crypto',
  verb: 'TRANSACT.',
  tone: 'gold',
  eyebrow: 'Crypto Platforms',
  title: 'Money, programmable.',
  sub: 'Tokens, wallets, and payment gateways — launched right.',
  keywords: ['ERC-20', 'SPL', 'MPC', 'Multi-sig', 'USDC', 'USDT', 'Checkout API', 'Webhooks', 'Custody', 'Treasury'],
  problems: {
    kicker: 'What we replace',
    items: ['Card-only checkout', 'Slow payouts', 'Manual treasury', 'Keys on a laptop'],
  },
  capabilities: {
    title: 'What we launch',
    items: [
      { title: 'Token Development', line: 'Your token — vesting & controls included.', icon: 'coin', featured: true, tags: ['ERC-20', 'SPL', 'BEP-20'] },
      { title: 'Payment Gateway', line: 'Accept crypto. Settle fast.', icon: 'card', featured: true, tags: ['USDC', 'Webhooks', 'Off-ramp'] },
      { title: 'Wallet Systems', line: 'MPC, multi-sig & embedded wallets.', icon: 'wallet' },
      { title: 'Custody', line: 'Institutional key management.', icon: 'vault' },
      { title: 'Exchange Infra', line: 'Matching, liquidity & risk.', icon: 'exchange' },
      { title: 'Treasury', line: 'Digital-asset books, automated.', icon: 'chart' },
    ],
  },
  highlight: {
    kicker: 'What you receive',
    title: 'Real assets. Not slides.',
    items: [
      { big: 'Code', label: 'verified smart contracts' },
      { big: 'APIs', label: 'wallet & payment endpoints' },
      { big: 'Console', label: 'operator dashboard' },
      { big: 'Docs', label: 'full handover' },
    ],
  },
  cta: { title: 'Ready to launch your', accent: 'token?' },
}

export const CULTURE_VALUES = [
  { title: 'Ownership', description: 'Engineers own outcomes end-to-end — from design through production.' },
  { title: 'Innovation', description: 'We push the boundary of AI + Web3 without sacrificing reliability.' },
  { title: 'Engineering excellence', description: 'Code review, testing, and architecture discipline are non-negotiable.' },
  { title: 'Global collaboration', description: 'Remote-first teams aligned across regions and time zones.' },
] as const

export const CAREERS_CULTURE = {
  backgroundImage: '/images/careers/culture-background.png',
} as const

export const CAREERS_POSITIONS_SECTION = {
  eyebrow: 'Open roles',
  title: 'Current positions',
  description:
    'Every role is an opportunity to work on infrastructure problems at the frontier of AI and Web3.',
} as const

export const CAREERS_FALLBACK_CTA = {
  title: "Don't see your role?",
  description: "We're always open to exceptional people. Tell us how you'd contribute.",
  cta: { label: 'Get in Touch', href: '/contact' },
} as const

export const OPEN_POSITIONS = [
  {
    id: 'Technical-Advisor',
    title: 'Technical Advisor',
    team: 'Engineering',
    location: 'Remote / Global',
    type: 'Part-time',
    compensation: '$180 ~ $250/hr',
    summary:
      "We're looking for a Technical Advisor with strong expertise in blockchain and Web3 to provide strategic technical guidance across our products and engineering initiatives.",
    about:
      "We're looking for a Technical Advisor with strong expertise in blockchain and Web3 to provide strategic technical guidance across our products and engineering initiatives. This is a part-time advisory role for a senior technical professional who can help our engineering teams make better architectural decisions, identify technical risks, and solve complex blockchain development challenges. You'll work closely with technical leadership and engineering teams, providing expert guidance on architecture, smart contracts, scalability, security, infrastructure, and development practices. While this is primarily an advisory position, you may also participate in technical reviews, architecture sessions, and critical implementation discussions when your expertise is needed.",
    responsibilities: [
      "Provide strategic technical guidance for blockchain and Web3 product development.",
      "Review and advise on system architecture, smart contracts, backend services, APIs, and decentralized applications.",
      "Identify technical risks, scalability challenges, security concerns, and potential architectural issues.",
      "Advise engineering teams on blockchain development best practices and technical decisions.",
      "Review existing systems and recommend improvements to architecture, performance, security, and maintainability.",
      "Participate in architecture reviews and technical planning sessions.",
      "Help evaluate blockchain protocols, infrastructure, tools, and emerging technologies.",
      "Advise on technical roadmaps and long-term technology strategy.",
          ],
    requirements: [
      "Significant experience designing and building blockchain or Web3 products.",
      "Strong understanding of blockchain architecture, smart contracts, and decentralized applications.",
      "Professional experience with Solidity and Ethereum or EVM-compatible ecosystems.",
      "Strong system design and software architecture expertise.",
      "Experience reviewing production blockchain systems and identifying technical risks.",
      "Ability to evaluate complex technical problems and provide practical, actionable solutions.",
      "Strong understanding of blockchain security and smart contract development practices.",
      "Excellent communication skills and the ability to explain complex technical concepts clearly.",
      "Ability to work independently and provide high-level technical guidance with limited supervision.",
    ],
  },
  {
    id: 'senior-engineering-manager',
    title: 'Senior Engineering Manager',
    team: 'Engineering',
    location: 'Remote / Global',
    type: 'Full-time / Part-time',
    compensation: '$220k – $320k',
    summary:
      "We're looking for a Senior Engineering Manager to lead the delivery of blockchain products and help scale our engineering organization.",
    about:
      "This role combines technical leadership, people management, and execution. You'll work closely with engineering, product, and business stakeholders to guide teams building smart contracts, decentralized applications, blockchain infrastructure, and supporting platforms. You won't be expected to write production code every day, but you'll be deeply involved in technical decision-making, architecture discussions, hiring, mentoring, and ensuring engineering teams deliver high-quality products.",
    responsibilities: [
      "Lead and grow high-performing engineering teams building blockchain and Web3 products.",
      "Partner with product and business leaders to define technical strategy and execution plans.",
      "Support engineers through mentoring, coaching, performance management, and career development.",
      "Drive technical excellence, engineering quality, and operational reliability across projects.",
      "Help teams make sound architectural decisions and manage technical tradeoffs.",
      "Establish scalable engineering processes that enable teams to move quickly without sacrificing quality.",
      "Manage project priorities, resource planning, and delivery expectations.",
      "Foster a culture of ownership, accountability, and continuous improvement.",
      "Participate in hiring and help build a world-class engineering organization.",
    ],
    requirements: [
      "Experience leading engineering teams and delivering complex software products.",
      "Strong background in software engineering and system design.",
      "Proven experience working on blockchain, cryptocurrency, or Web3 products.",
      "Ability to lead both technical discussions and people-related decisions.",
      "Experience building and scaling engineering teams in fast-moving environments.",
      "Strong communication skills and the ability to work across technical and non-technical stakeholders.",
      "A pragmatic approach to problem-solving and decision-making.",
    ],
  },
  {
    id: 'senior-blockchain-developer',
    title: 'Senior Blockchain Developer',
    team: 'Engineering',
    location: 'Remote / Global',
    type: 'Full-time',
    compensation: '$180k – $260k',
    summary:
      "We're looking for a Senior Blockchain Developer to help architect and build the blockchain products that power our clients' and partners' ecosystems.",
    about:
      "You'll work closely with product leaders, designers, and engineers to develop smart contracts, decentralized applications, and blockchain infrastructure that are secure, scalable, and ready for production. This is a hands-on engineering role for someone who enjoys writing code, making architectural decisions, and taking ownership of products from concept to deployment.",
    responsibilities: [
      "Design and develop smart contracts and blockchain-based applications.",
      "Build backend services and integrations that interact with blockchain networks.",
      "Participate in architecture discussions and help shape technical direction.",
      "Review code, improve engineering standards, and contribute to security best practices.",
      "Work closely with product and design teams to turn ideas into working products.",
      "Identify performance, scalability, and reliability improvements across the stack.",
      "Mentor other engineers and contribute to a strong engineering culture.",
      "Stay current with developments across blockchain, Web3, and decentralized infrastructure.",
    ],
    requirements: [
      "Strong software engineering fundamentals and experience building production systems.",
      "Professional experience developing blockchain applications or smart contracts.",
      "Deep understanding of Ethereum, EVM-based networks, or similar blockchain ecosystems.",
      "Experience with Solidity and modern Web3 development tools.",
      "Ability to make sound technical decisions and work independently.",
      "A practical approach to building secure, maintainable software.",
      "Strong communication skills and a collaborative mindset.",
    ],
  },


   {
    id: 'lead-full-stack-engineer',
    title: 'Lead Full Stack Engineer',
    team: 'Engineering',
    location: 'Remote / Global',
    type: 'Full-time / Part-Time',
    compensation: '$190k – $270k',
    summary:
      'Build end-to-end features across AI agents, APIs, and Web3 integrations for production workloads.',
    about:
      "You'll work across the stack, from designing backend services and APIs to building intuitive user experiences and integrating blockchain functionality into customer-facing products. This role is ideal for an engineer who enjoys owning features end-to-end, collaborating closely with product teams, and shipping software that people actually use.",
    responsibilities: [
      'Design, build, and maintain production-grade web applications.',
      "Develop scalable backend services, APIs, and data systems.",
      "Create responsive, high-quality user experiences using modern frontend technologies.",
      "Work closely with blockchain engineers to integrate smart contracts, wallets, and Web3 functionality into applications.",
      "Participate in architecture discussions and contribute to long-term technical direction.",
      "Review code, improve engineering standards, and help maintain a high-quality codebase.",
      "Collaborate with product, design, and engineering teams to deliver features from concept to launch.",
      "Troubleshoot performance, scalability, and reliability challenges across the application stack.",
      "Mentor engineers and contribute to a strong culture of technical excellence.",
    ],
    requirements: [
      "Significant experience building and shipping production web applications.",
      "Strong understanding of modern frontend and backend development.",
      "Experience owning projects and making technical decisions in a collaborative environment.",
      "Experience working on blockchain or Web3 products in a professional setting.",
      "Understanding of smart contracts, blockchain networks, and how decentralized systems integrate with traditional applications.",
      "Strong software engineering fundamentals and a practical approach to solving problems.",
      "Excellent communication skills and the ability to work effectively in a remote environment.",
    ],
  },
  {
    id: 'frontend-engineer',
    title: 'Frontend Engineer',
    team: 'Engineering',
    location: 'Remote / Global',
    type: 'Full-time',
    compensation: '$130k – $190k',
    summary:
      'Craft infrastructure-grade interfaces for dashboards, wallets, and developer tools.',
    about:
      'You will shape how engineers and operators interact with complex AI and Web3 systems — turning dense infrastructure into clear, responsive interfaces. Expect work on data-heavy dashboards, wallet flows, and design-system-driven product UI.',
    responsibilities: [
      'Build accessible, performant React interfaces for dashboards, onboarding, and admin tools.',
      'Integrate wallet providers, real-time data streams, and API-driven workflows into cohesive UX.',
      'Collaborate with design and backend teams to refine information architecture and interaction patterns.',
      'Maintain frontend quality through component tests, profiling, and design-system consistency.',
    ],
    requirements: [
      '4+ years of professional frontend development with React and TypeScript.',
      'Strong command of CSS layout, responsive design, and component-driven architecture.',
      'Experience consuming REST or GraphQL APIs and handling async, error, and loading states.',
      'Bonus: Web3 wallet integration, data visualization, or motion-driven interface work.',
    ],
  },


   {
    id: 'lead-mobile-engineer',
    title: 'Lead Mobile Engineer',
    team: 'Engineering',
    location: 'Remote / Global',
    type: 'Full-time',
    compensation: '$180k – $240k',
    summary:
      "We're looking for a Lead Mobile Engineer to own the architecture and development of mobile applications across our blockchain and Web3 product portfolio.",
    about:
      "You'll be responsible for shaping the mobile experience for products that interact with digital assets, wallets, smart contracts, and decentralized networks. This is a hands-on leadership role where you'll work closely with product, design, blockchain, and backend teams while helping establish engineering standards across our mobile stack. We're looking for someone who enjoys building products from the ground up, making thoughtful technical decisions, and leading by example.",
    responsibilities: [
      "Lead the development of mobile applications from concept to production.",
      "Define mobile architecture, engineering standards, and development practices.",
      "Work closely with blockchain, backend, and product teams to build seamless Web3 experiences.",
      "Design and implement secure integrations with wallets, digital assets, and blockchain networks.",
      "Drive performance, reliability, and usability improvements across mobile products.",
      "Review code, mentor engineers, and contribute to a strong engineering culture.",
      "Help identify technical risks and make pragmatic decisions that balance speed and quality.",
      "Take ownership of mobile releases, monitoring, and long-term product stability.",

    ],
    requirements: [
      "Significant experience building and shipping production mobile applications.",
      "Strong experience with Flutter, React Native, iOS, Android, or a combination of modern mobile technologies.",
      "Experience leading technical projects and making architectural decisions.",
      "Experience working on blockchain, cryptocurrency, digital asset, or Web3 products.",
      "Understanding of wallet integrations, transaction flows, or blockchain-based user experiences.",
      "Excellent communication skills and the ability to work across multiple disciplines.",
      "A track record of taking ownership and delivering high-quality products.",
    ],
  },
  {
    id: 'Senior-Product-Manager',
    title: 'Senior Product Manager',
    team: 'Product Management',
    location: 'Remote / Global',
    type: 'Full-time',
    compensation: '$190k – $260k',
    summary:
      "We're looking for a Senior Product Manager to lead the strategy, execution, and growth of blockchain-based products.",
    about:
      "You'll work closely with clients, stakeholders, designers, and engineering teams to define product direction, prioritize opportunities, and deliver solutions that create value for users and businesses. This role is ideal for someone who understands both product management and the unique challenges of building products in the blockchain and Web3 ecosystem.",
    responsibilities: [
      "Define product vision, strategy, and roadmap for blockchain and Web3 initiatives.",
      "Translate customer needs, business goals, and market opportunities into actionable product requirements.",
      "Partner closely with engineering, design, and business teams throughout the product lifecycle.",
      "Prioritize features and initiatives based on user impact, technical feasibility, and business value.",
      "Lead product discovery efforts, customer research, and stakeholder alignment.",
      "Drive successful product launches and monitor performance after release.",
      "Analyze user feedback, market trends, and competitive developments to identify growth opportunities.",
      "Communicate product direction clearly across internal teams and external stakeholders.",
      "Help shape the long-term product strategy for Hamilix and its clients.",

    ],
    requirements: [
      "Proven experience managing and delivering software products from concept to launch.",
      "Experience working on blockchain, cryptocurrency, Web3, DeFi, digital asset, or related blockchain-based products.",
      "Strong product thinking with the ability to balance customer needs, business objectives, and technical constraints.",
      "Experience working closely with engineering teams in fast-paced development environments.",
      "Excellent communication and stakeholder management skills.",
      "Ability to make informed decisions with incomplete information and evolving requirements.",
      "Strong analytical and problem-solving abilities.",
    ],
  },


] as const

export type OpenPosition = (typeof OPEN_POSITIONS)[number]

export function getOpenPositionById(id: string): OpenPosition | undefined {
  return OPEN_POSITIONS.find((position) => position.id === id)
}

export const CAREERS_APPLY = {
  email: 'careers@hamilix.com',
  prompt: 'Send us your CV and a short note on why this role excites you.',
  buttonLabel: 'Apply Now',
  modalEyebrow: 'Apply for',
  submitLabel: 'Submit Application',
  successTitle: 'Application Submitted!',
  successMessageBefore: 'Thanks for applying to',
  successMessageAfter:
    'Our team will review your application and reach out within 5–7 business days.',
  doneLabel: 'Done',
  resumeHint: 'Click to upload PDF, DOC, DOCX',
  linkedinHint: 'Must start with https://www.linkedin.com/in/',
  maxResumeSizeMb: 5,
} as const

export const CAREERS_INTERVIEW_PROCESS = [
  { step: '1', title: 'Intro call', description: '30-minute conversation with our recruiting team.' },
  { step: '2', title: 'Technical screen', description: '60-minute session with an engineering lead.' },
  { step: '3', title: 'Panel interview', description: '90-minute deep dive with senior engineers.' },
  { step: '4', title: 'Offer', description: 'Reference checks and final offer discussion.' },
] as const

export const CONTACT_PAGE = {
  hero: {
    eyebrow: 'Contact',
    title: 'Get in touch with Hamilix',
    description:
      'Discuss your AI, blockchain, Web3, or crypto infrastructure requirements with our engineering team.',
  },
  panel: {
    badge: 'Have questions?',
    title: 'Send us a Message',
    submitLabel: 'Get In Touch',
    submitSuccessTitle: 'Message sent',
    submitSuccessMessage:
      'Thanks for reaching out. Our team has received your message and will get back to you shortly.',
  },
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com/company/hamilix', icon: 'linkedin' as const },
    { label: 'Email', href: `mailto:${SITE.email}`, icon: 'email' as const },
    { label: 'Telegram', href: 'https://t.me/hamilix', icon: 'telegram' as const },
  ],
} as const
