import { AnimatePresence, m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import {
  AttentionMap,
  CoinStream,
  CommitGraph,
  GlobeArcs,
  Handshake,
  MerkleTree,
  PeerMesh,
  PriceChart,
  RagPipeline,
  type ShapeKind,
  SignalWaves,
  SmallShape,
  WalletFlow,
} from '@/components/brand/backdrop-motifs'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/* Shapes                                                              */
/* ------------------------------------------------------------------ */

/** Neural network: layered nodes + edges, some nodes pulse. */
function NeuralNet({ className }: { className?: string }) {
  const layers = [3, 5, 5, 3]
  const W = 520
  const H = 360
  const nodes = layers.flatMap((count, li) =>
    Array.from({ length: count }, (_, ni) => ({
      x: 40 + (li * (W - 80)) / (layers.length - 1),
      y: H / 2 + (ni - (count - 1) / 2) * 62,
      li,
      key: `${li}-${ni}`,
    })),
  )
  const edges = nodes.flatMap((a) => nodes.filter((b) => b.li === a.li + 1).map((b) => [a, b] as const))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} fill="none" aria-hidden>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke="#B6F23C"
          strokeWidth="0.8"
          strokeOpacity="0.5"
          className="hx-edge"
          style={{ animationDelay: `${(i % 9) * 0.45}s` }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={n.key}>
          <circle cx={n.x} cy={n.y} r="9" stroke="#B6F23C" strokeWidth="1.2" fill="#06070A" />
          <circle cx={n.x} cy={n.y} r="3.5" fill="#B6F23C" className="hx-node" style={{ animationDelay: `${(i % 6) * 0.6}s` }} />
        </g>
      ))}
    </svg>
  )
}

/** Isometric blocks linked into a chain. */
function BlockChain({ className }: { className?: string }) {
  const cube = (x: number, y: number, key: number) => (
    <g key={key} transform={`translate(${x} ${y})`}>
      <path d="M0 -34 L30 -17 L30 17 L0 34 L-30 17 L-30 -17 Z" stroke="#F2C14E" strokeWidth="1.3" />
      <path d="M-30 -17 L0 0 L30 -17 M0 0 V34" stroke="#F2C14E" strokeWidth="1.1" strokeOpacity="0.7" />
      <text x="0" y="56" textAnchor="middle" fill="#F2C14E" fontSize="9" fontFamily="JetBrains Mono, monospace" opacity="0.8">
        #{18400 + key}
      </text>
    </g>
  )
  const positions = [
    [50, 60],
    [150, 120],
    [250, 60],
    [350, 120],
    [450, 60],
  ]
  return (
    <svg viewBox="0 0 500 190" className={className} fill="none" aria-hidden>
      {positions.slice(0, -1).map(([x, y], i) => {
        const [nx, ny] = positions[i + 1]
        return (
          <line
            key={i}
            x1={x + 30}
            y1={y}
            x2={nx - 30}
            y2={ny}
            stroke="#F2C14E"
            strokeWidth="1.2"
            strokeDasharray="4 5"
            className="hx-dash"
          />
        )
      })}
      {positions.map(([x, y], i) => cube(x, y, i))}
    </svg>
  )
}

export function HexOutline({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" aria-hidden>
      <path d="M50 3 L91 26.5 V73.5 L50 97 L9 73.5 V26.5 Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M50 18 L78 34 V66 L50 82 L22 66 V34 Z" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
    </svg>
  )
}

type Tone = 'lime' | 'gold'
type Token = { t: string; pos: string; tone: Tone }
type Shape = { pos: string; size: string; tone: Tone; dur: number }

type BackdropTheme = {
  /** Stable id, used to cross-fade between themes on navigation. */
  id: string
  /** Outline words scrolling up the left / down the right edge. */
  edgeLeft: { text: string; tone: Tone }
  edgeRight: { text: string; tone: Tone }
  /** Large motif, upper right (drifts up on scroll). */
  primary: React.ReactNode
  /** Secondary motif, lower left (drifts down on scroll). */
  secondary: React.ReactNode
  shapeKind: ShapeKind
  shapes: readonly Shape[]
  tokens: readonly Token[]
}

const DEFAULT_SHAPES: readonly Shape[] = [
  { pos: 'left-[6%] top-[12%]', size: 'w-24', tone: 'gold', dur: 26 },
  { pos: 'right-[18%] top-[6%]', size: 'w-14', tone: 'lime', dur: 18 },
  { pos: 'left-[46%] top-[44%]', size: 'w-10', tone: 'gold', dur: 22 },
  { pos: 'right-[6%] top-[58%]', size: 'w-32', tone: 'lime', dur: 34 },
  { pos: 'left-[28%] top-[66%]', size: 'w-16', tone: 'lime', dur: 24 },
  { pos: 'right-[36%] top-[80%]', size: 'w-20', tone: 'gold', dur: 30 },
]

/** Same positions as DEFAULT_SHAPES with a different colour balance. */
function shapesWithTones(tones: readonly Tone[]): readonly Shape[] {
  return DEFAULT_SHAPES.map((shape, i) => ({ ...shape, tone: tones[i % tones.length] }))
}

const TOKEN_POSITIONS = [
  'left-[12%] top-[22%]',
  'left-[34%] top-[9%]',
  'right-[30%] top-[38%]',
  'left-[8%] top-[58%]',
  'right-[12%] top-[70%]',
  'left-[40%] top-[84%]',
  'right-[42%] top-[16%]',
  'right-[8%] top-[48%]',
  'left-[22%] top-[76%]',
  'right-[24%] top-[90%]',
] as const

/** Each entry is [text, tone] or [text, tone, custom position] (to avoid overlapping a motif). */
function tokens(list: readonly (readonly [string, Tone, string?])[]): readonly Token[] {
  return list.map(([t, tone, pos], i) => ({ t, tone, pos: pos ?? TOKEN_POSITIONS[i % TOKEN_POSITIONS.length] }))
}

/* Home: the original AI x blockchain mix. */
const HOME_THEME: BackdropTheme = {
  id: 'home',
  edgeLeft: { text: 'Artificial Intelligence · AI · Artificial Intelligence', tone: 'lime' },
  edgeRight: { text: 'Blockchain · Web3 · Blockchain · Crypto', tone: 'gold' },
  primary: <NeuralNet className="h-auto w-full" />,
  secondary: <BlockChain className="h-auto w-full" />,
  shapeKind: 'hex',
  shapes: DEFAULT_SHAPES,
  tokens: tokens([
    ['0x7f3a…c91e', 'gold'], ['LLM', 'lime'], ['hash(block)', 'gold'], ['{ agent.run() }', 'lime'],
    ['tx ✓ confirmed', 'gold'], ['RAG · top_k=8', 'lime'], ['block #18402', 'gold'],
    ['embeddings[1536]', 'lime'], ['ERC-20', 'gold'], ['model.route()', 'lime'],
  ]),
}

/* AI, "Intelligence, engineered.": attention, retrieval, agents, evals. */
const AI_THEME: BackdropTheme = {
  id: 'ai',
  edgeLeft: { text: 'Intelligence, Engineered · Intelligence, Engineered', tone: 'lime' },
  edgeRight: { text: 'Agents · RAG · Evals · Guardrails · Automation', tone: 'lime' },
  primary: <AttentionMap className="h-auto w-full" />,
  secondary: <RagPipeline className="h-auto w-full" />,
  shapeKind: 'chip',
  shapes: shapesWithTones(['lime', 'lime', 'gold']),
  tokens: tokens([
    ['tool_call: search()', 'lime'], ['temperature: 0.2', 'gold'], ['cosine(q, d) = 0.91', 'lime', 'left-[56%] top-[30%]'],
    ['memory.recall()', 'lime'], ['eval score 0.97', 'gold'], ['guardrail ✓', 'lime'], ['context: 128k', 'gold'],
    ['p95 latency 320ms', 'lime'], ['chunk → embed → index', 'gold', 'left-[44%] top-[66%]'], ['agent.plan()', 'lime'],
  ]),
}

/* Blockchain, "Trust, engineered.": hashes, Merkle proofs, audited contracts. */
const BLOCKCHAIN_THEME: BackdropTheme = {
  id: 'blockchain',
  edgeLeft: { text: 'Trust · Immutable · Consensus · Trust', tone: 'gold' },
  edgeRight: { text: 'Smart Contracts · Ledger · Audited · On-chain', tone: 'gold' },
  primary: <MerkleTree className="h-auto w-full" />,
  secondary: <BlockChain className="h-auto w-full" />,
  shapeKind: 'cube',
  shapes: shapesWithTones(['gold', 'gold', 'lime']),
  tokens: tokens([
    ['keccak256(data)', 'gold'], ['merkleRoot', 'gold'], ['require(msg.sender == owner)', 'lime'],
    ['nonce: 0x2f', 'gold'], ['finality ✓', 'lime'], ['audit: passed', 'gold'], ['block #18402', 'gold'],
    ['gas: 21,000', 'lime'], ['ERC-3643', 'gold'], ['verify(proof)', 'lime'],
  ]),
}

/* Web3, "Web3, made human.": peers, wallets, identity, governance. */
const WEB3_THEME: BackdropTheme = {
  id: 'web3',
  edgeLeft: { text: 'Decentralized · Made Human · Own Your Data', tone: 'lime' },
  edgeRight: { text: 'dApps · Wallets · DAO · Multi-chain', tone: 'gold' },
  primary: <PeerMesh className="h-auto w-full" />,
  secondary: <WalletFlow className="h-auto w-full" />,
  shapeKind: 'ring',
  shapes: shapesWithTones(['lime', 'gold']),
  tokens: tokens([
    ['connectWallet()', 'lime'], ['you.eth', 'gold'], ['Sign-In with Ethereum', 'lime'], ['chainId: 8453', 'gold'],
    ['DAO vote ✓', 'lime'], ['gasless tx', 'gold'], ['passkey ✓', 'lime'], ['indexer: 42ms', 'gold'],
    ['switchChain()', 'lime'], ['0xA1…9F', 'gold'],
  ]),
}

/* Crypto, "Money, programmable.": tokens, payments, settlement. */
const CRYPTO_THEME: BackdropTheme = {
  id: 'crypto',
  edgeLeft: { text: 'Money, Programmable · Money, Programmable', tone: 'gold' },
  edgeRight: { text: 'Tokens · Payments · Settlement · Custody', tone: 'lime' },
  primary: <PriceChart className="h-auto w-full" />,
  secondary: <CoinStream className="h-auto w-full" />,
  shapeKind: 'coin',
  shapes: shapesWithTones(['gold', 'lime', 'gold']),
  tokens: tokens([
    ['USDC 1,000.00', 'gold'], ['settled in 2.1s', 'lime'], ['MPC 2-of-3', 'gold'], ['vesting: 24 mo', 'lime'],
    ['mint(1e18)', 'gold'], ['price feed ✓', 'lime'], ['off-ramp → USD', 'gold'], ['webhook: paid', 'lime'],
    ['ERC-20 · SPL', 'gold'], ['transfer()', 'lime'],
  ]),
}

/* Careers: a remote-first, global team that owns and ships. */
const CAREERS_THEME: BackdropTheme = {
  id: 'careers',
  edgeLeft: { text: 'Build the Future · Build the Future', tone: 'lime' },
  edgeRight: { text: 'Ownership · Craft · Remote-first · Global', tone: 'gold' },
  primary: <GlobeArcs className="h-auto w-full" />,
  secondary: <CommitGraph className="h-auto w-full" />,
  shapeKind: 'plus',
  shapes: shapesWithTones(['lime', 'gold']),
  tokens: tokens([
    ["git commit -m 'ship it'", 'lime'], ['UTC−8 · UTC+1 · UTC+8', 'gold'], ['PR #482 merged', 'lime'],
    ["{ team: 'global' }", 'gold'], ['hiring: true', 'lime'], ['code review ✓', 'gold'], ['remote-first', 'lime'],
    ['ownership++', 'gold'], ['deploy → prod', 'lime'], ['learn() → grow()', 'gold'],
  ]),
}

/* Contact: start a conversation, from idea to launch. */
const CONTACT_THEME: BackdropTheme = {
  id: 'contact',
  edgeLeft: { text: 'Let’s Build Together · Let’s Build Together', tone: 'lime' },
  edgeRight: { text: 'Get in Touch · Start a Project · Say Hello', tone: 'gold' },
  primary: <SignalWaves className="h-auto w-full" />,
  secondary: <Handshake className="h-auto w-full" />,
  shapeKind: 'bubble',
  shapes: shapesWithTones(['lime', 'gold']),
  tokens: tokens([
    ['ping hamilix', 'lime'], ['reply < 24h', 'gold'], ['status: listening', 'lime'], ['new Project()', 'gold'],
    ['idea → launch', 'lime'], ['hello()', 'gold'], ['scope · plan · build', 'lime'], ['NDA ready', 'gold'],
    ['await reply()', 'lime'], ['200 OK', 'gold'],
  ]),
}

function themeForPath(pathname: string): BackdropTheme {
  if (pathname.startsWith('/ai')) return AI_THEME
  if (pathname.startsWith('/blockchain')) return BLOCKCHAIN_THEME
  if (pathname.startsWith('/web3')) return WEB3_THEME
  if (pathname.startsWith('/crypto')) return CRYPTO_THEME
  if (pathname.startsWith('/careers')) return CAREERS_THEME
  if (pathname.startsWith('/contact')) return CONTACT_THEME
  return HOME_THEME
}

const outlineClass = (tone: Tone) => (tone === 'gold' ? 'hx-outline-gold' : 'hx-outline-lime')
const textToneClass = (tone: Tone) => (tone === 'gold' ? 'text-gold' : 'text-accent')

/* ------------------------------------------------------------------ */
/* Site-wide backdrop (theme follows the current page)                 */
/* ------------------------------------------------------------------ */

export function BrandBackdrop() {
  const reduced = useReducedMotion()
  const { pathname } = useLocation()
  const theme = themeForPath(pathname)
  const { scrollYProgress } = useScroll()
  const upY = useTransform(scrollYProgress, [0, 1], ['0%', '-45%'])
  const downY = useTransform(scrollYProgress, [0, 1], ['-45%', '0%'])
  const netY = useTransform(scrollYProgress, [0, 1], ['0vh', '-30vh'])
  const chainY = useTransform(scrollYProgress, [0, 1], ['0vh', '25vh'])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={theme.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.45 }}
        >
          {/* Vertical edge words */}
          <m.div
            style={reduced ? undefined : { y: upY }}
            className="absolute -left-6 top-0 hidden h-[200vh] items-start md:flex"
          >
            <span
              className={cn(
                outlineClass(theme.edgeLeft.tone),
                'whitespace-nowrap font-display text-[9rem] font-bold uppercase leading-none tracking-tight opacity-[0.07] [writing-mode:vertical-rl] rotate-180',
              )}
            >
              {theme.edgeLeft.text}
            </span>
          </m.div>
          <m.div
            style={reduced ? undefined : { y: downY }}
            className="absolute -right-6 top-0 hidden h-[200vh] items-start md:flex"
          >
            <span
              className={cn(
                outlineClass(theme.edgeRight.tone),
                'whitespace-nowrap font-display text-[9rem] font-bold uppercase leading-none tracking-tight opacity-[0.07] [writing-mode:vertical-rl]',
              )}
            >
              {theme.edgeRight.text}
            </span>
          </m.div>

          {/* Primary motif */}
          <m.div style={reduced ? undefined : { y: netY }} className="absolute right-[6%] top-[14%] w-[22rem] opacity-[0.13] md:w-[30rem]">
            {theme.primary}
          </m.div>

          {/* Secondary motif */}
          <m.div style={reduced ? undefined : { y: chainY }} className="absolute bottom-[18%] left-[6%] w-[20rem] opacity-[0.13] md:w-[28rem]">
            {theme.secondary}
          </m.div>

          {/* Floating shapes */}
          {theme.shapes.map((h, i) => (
            <div
              key={i}
              className={cn('absolute opacity-[0.12]', h.pos, h.size, textToneClass(h.tone), i > 3 && 'hidden md:block')}
              style={{ animation: `hx-drift ${h.dur}s ease-in-out ${i * -3}s infinite` }}
            >
              <SmallShape kind={theme.shapeKind} className="h-auto w-full" />
            </div>
          ))}

          {/* Code tokens */}
          {theme.tokens.map((tok, i) => (
            <span
              key={tok.t}
              className={cn(
                'absolute whitespace-nowrap font-mono text-[0.7rem] tracking-wider opacity-[0.22]',
                tok.pos,
                textToneClass(tok.tone),
                i > 5 && 'hidden lg:block',
              )}
              style={{ animation: `hx-blink 6s ease-in-out ${i * 0.7}s infinite` }}
            >
              {tok.t}
            </span>
          ))}
        </m.div>
      </AnimatePresence>

      {/* Vignette keeps the center readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(6,7,10,0.55),transparent_75%)]" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Section watermark: a giant faint word behind content                */
/* ------------------------------------------------------------------ */

export function Watermark({
  word,
  tone = 'lime',
  className,
}: {
  word: string
  tone?: 'lime' | 'gold'
  className?: string
}) {
  return (
    <span
      className={cn(
        'pointer-events-none absolute select-none whitespace-nowrap font-display font-bold uppercase leading-none tracking-[-0.05em] opacity-[0.09]',
        tone === 'gold' ? 'hx-outline-gold' : 'hx-outline-lime',
        className,
      )}
      style={{ fontSize: 'clamp(7rem, 22vw, 22rem)' }}
      aria-hidden
    >
      {word}
    </span>
  )
}
