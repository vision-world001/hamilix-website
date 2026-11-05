import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
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

const TOKENS = [
  { t: '0x7f3a…c91e', pos: 'left-[12%] top-[22%]', tone: 'gold' },
  { t: 'LLM', pos: 'left-[34%] top-[9%]', tone: 'lime' },
  { t: 'hash(block)', pos: 'right-[30%] top-[38%]', tone: 'gold' },
  { t: '{ agent.run() }', pos: 'left-[8%] top-[58%]', tone: 'lime' },
  { t: 'tx ✓ confirmed', pos: 'right-[12%] top-[70%]', tone: 'gold' },
  { t: 'RAG · top_k=8', pos: 'left-[40%] top-[84%]', tone: 'lime' },
  { t: 'block #18402', pos: 'right-[42%] top-[16%]', tone: 'gold' },
  { t: 'embeddings[1536]', pos: 'right-[8%] top-[48%]', tone: 'lime' },
  { t: 'ERC-20', pos: 'left-[22%] top-[76%]', tone: 'gold' },
  { t: 'model.route()', pos: 'right-[24%] top-[90%]', tone: 'lime' },
] as const

const HEXES = [
  { pos: 'left-[6%] top-[12%]', size: 'w-24', tone: 'text-gold', dur: 26 },
  { pos: 'right-[18%] top-[6%]', size: 'w-14', tone: 'text-accent', dur: 18 },
  { pos: 'left-[46%] top-[44%]', size: 'w-10', tone: 'text-gold', dur: 22 },
  { pos: 'right-[6%] top-[58%]', size: 'w-32', tone: 'text-accent', dur: 34 },
  { pos: 'left-[28%] top-[66%]', size: 'w-16', tone: 'text-accent', dur: 24 },
  { pos: 'right-[36%] top-[80%]', size: 'w-20', tone: 'text-gold', dur: 30 },
] as const

/* ------------------------------------------------------------------ */
/* Site-wide backdrop                                                  */
/* ------------------------------------------------------------------ */

export function BrandBackdrop() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const upY = useTransform(scrollYProgress, [0, 1], ['0%', '-45%'])
  const downY = useTransform(scrollYProgress, [0, 1], ['-45%', '0%'])
  const netY = useTransform(scrollYProgress, [0, 1], ['0vh', '-30vh'])
  const chainY = useTransform(scrollYProgress, [0, 1], ['0vh', '25vh'])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Vertical edge words */}
      <m.div
        style={reduced ? undefined : { y: upY }}
        className="absolute -left-6 top-0 hidden h-[200vh] items-start md:flex"
      >
        <span
          className="hx-outline-lime whitespace-nowrap font-display text-[9rem] font-bold uppercase leading-none tracking-tight opacity-[0.07] [writing-mode:vertical-rl] rotate-180"
        >
          Artificial Intelligence · AI · Artificial Intelligence
        </span>
      </m.div>
      <m.div
        style={reduced ? undefined : { y: downY }}
        className="absolute -right-6 top-0 hidden h-[200vh] items-start md:flex"
      >
        <span className="hx-outline-gold whitespace-nowrap font-display text-[9rem] font-bold uppercase leading-none tracking-tight opacity-[0.07] [writing-mode:vertical-rl]">
          Blockchain · Web3 · Blockchain · Crypto
        </span>
      </m.div>

      {/* Neural net (AI) */}
      <m.div style={reduced ? undefined : { y: netY }} className="absolute right-[6%] top-[14%] w-[22rem] opacity-[0.13] md:w-[30rem]">
        <NeuralNet className="h-auto w-full" />
      </m.div>

      {/* Block chain (blockchain) */}
      <m.div style={reduced ? undefined : { y: chainY }} className="absolute bottom-[18%] left-[6%] w-[20rem] opacity-[0.13] md:w-[28rem]">
        <BlockChain className="h-auto w-full" />
      </m.div>

      {/* Floating hexagons */}
      {HEXES.map((h, i) => (
        <div
          key={i}
          className={cn('absolute opacity-[0.12]', h.pos, h.size, h.tone, i > 3 && 'hidden md:block')}
          style={{ animation: `hx-drift ${h.dur}s ease-in-out ${i * -3}s infinite` }}
        >
          <HexOutline className="h-auto w-full" />
        </div>
      ))}

      {/* Code tokens */}
      {TOKENS.map((tok, i) => (
        <span
          key={tok.t}
          className={cn(
            'absolute whitespace-nowrap font-mono text-[0.7rem] tracking-wider opacity-[0.22]',
            tok.pos,
            tok.tone === 'gold' ? 'text-gold' : 'text-accent',
            i > 5 && 'hidden lg:block',
          )}
          style={{ animation: `hx-blink 6s ease-in-out ${i * 0.7}s infinite` }}
        >
          {tok.t}
        </span>
      ))}

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
