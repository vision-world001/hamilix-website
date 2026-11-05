/**
 * Large decorative SVG motifs for the page-specific backdrops (see backdrop.tsx).
 * Each one illustrates a page's mission; all are outline-style and very low contrast.
 */

const LIME = '#B6F23C'
const GOLD = '#F2C14E'
const MONO = 'JetBrains Mono, monospace'

/* AI — "Intelligence, engineered.": a transformer attention map over a prompt. */
export function AttentionMap({ className }: { className?: string }) {
  const words = ['build', 'agents', 'that', 'think']
  const n = words.length
  const cell = 52
  const ox = 130
  const oy = 70
  // deterministic "attention weights" (rows sum roughly to 1, diagonal-heavy)
  const weight = (r: number, c: number) => {
    if (c > r) return 0.04
    const base = r === c ? 0.75 : 0.2 + ((r * 7 + c * 3) % 5) * 0.08
    return Math.min(0.9, base)
  }
  return (
    <svg viewBox="0 0 520 360" className={className} fill="none" aria-hidden>
      {words.map((w, i) => (
        <g key={w}>
          <text x={ox + i * cell + cell / 2} y={oy - 14} textAnchor="middle" fill={LIME} fontSize="11" fontFamily={MONO} opacity="0.9">
            {w}
          </text>
          <text x={ox - 12} y={oy + i * cell + cell / 2 + 4} textAnchor="end" fill={LIME} fontSize="11" fontFamily={MONO} opacity="0.9">
            {w}
          </text>
        </g>
      ))}
      {Array.from({ length: n * n }, (_, k) => {
        const r = Math.floor(k / n)
        const c = k % n
        const wgt = weight(r, c)
        return (
          <rect
            key={k}
            x={ox + c * cell + 3}
            y={oy + r * cell + 3}
            width={cell - 6}
            height={cell - 6}
            rx="6"
            stroke={LIME}
            strokeWidth="1"
            fill={r === c ? GOLD : LIME}
            fillOpacity={wgt * 0.55}
            className={r === c ? 'hx-edge' : undefined}
            style={r === c ? { animationDelay: `${r * 0.6}s` } : undefined}
          />
        )
      })}
      <text x={ox + (n * cell) / 2} y={oy + n * cell + 34} textAnchor="middle" fill={GOLD} fontSize="10" fontFamily={MONO} opacity="0.85">
        softmax(QKᵀ / √d) · V
      </text>
    </svg>
  )
}

/* AI — retrieval-augmented generation: query → embed → vector DB → LLM → answer. */
export function RagPipeline({ className }: { className?: string }) {
  const steps = [
    { x: 40, label: 'query', tone: LIME },
    { x: 145, label: 'embed', tone: LIME },
    { x: 250, label: 'vector', tone: GOLD },
    { x: 355, label: 'LLM', tone: LIME },
    { x: 460, label: 'answer', tone: GOLD },
  ]
  return (
    <svg viewBox="0 0 500 190" className={className} fill="none" aria-hidden>
      <path d="M62 95 H438" stroke={LIME} strokeWidth="1.2" strokeDasharray="4 5" className="hx-dash" />
      {steps.map((s, i) => (
        <g key={s.label}>
          {s.label === 'vector' ? (
            // database cylinder
            <g>
              <ellipse cx={s.x} cy="72" rx="26" ry="8" stroke={s.tone} strokeWidth="1.2" fill="#06070A" />
              <path d={`M${s.x - 26} 72 V118 a26 8 0 0 0 52 0 V72`} stroke={s.tone} strokeWidth="1.2" fill="#06070A" />
              <path d={`M${s.x - 26} 95 a26 8 0 0 0 52 0`} stroke={s.tone} strokeWidth="0.8" strokeOpacity="0.6" />
            </g>
          ) : (
            <circle cx={s.x} cy="95" r="22" stroke={s.tone} strokeWidth="1.2" fill="#06070A" />
          )}
          <circle cx={s.x} cy="95" r="3.5" fill={s.tone} className="hx-node" style={{ animationDelay: `${i * 0.5}s` }} />
          <text x={s.x} y="150" textAnchor="middle" fill={s.tone} fontSize="10" fontFamily={MONO} opacity="0.85">
            {s.label}
          </text>
        </g>
      ))}
      <text x="250" y="30" textAnchor="middle" fill={GOLD} fontSize="9" fontFamily={MONO} opacity="0.8">
        retrieve · ground · generate
      </text>
    </svg>
  )
}

/* Blockchain — "Trust, engineered.": a Merkle hash tree rolling up to a root. */
export function MerkleTree({ className }: { className?: string }) {
  const levels = [1, 2, 4, 8]
  const W = 520
  const H = 360
  const nodes = levels.flatMap((count, li) =>
    Array.from({ length: count }, (_, ni) => ({
      x: ((ni + 0.5) * W) / count,
      y: 40 + li * 100,
      li,
      ni,
    })),
  )
  const parent = (n: (typeof nodes)[number]) =>
    nodes.find((p) => p.li === n.li - 1 && p.ni === Math.floor(n.ni / 2))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} fill="none" aria-hidden>
      {nodes.map((n, i) => {
        const p = parent(n)
        return p ? (
          <path
            key={`e${i}`}
            d={`M${n.x} ${n.y - 14} C ${n.x} ${n.y - 55}, ${p.x} ${p.y + 55}, ${p.x} ${p.y + 14}`}
            stroke={GOLD}
            strokeWidth="1"
            strokeDasharray="4 5"
            className="hx-dash"
          />
        ) : null
      })}
      {nodes.map((n, i) => (
        <g key={`n${i}`}>
          <rect x={n.x - 24} y={n.y - 14} width="48" height="28" rx="5" stroke={GOLD} strokeWidth="1.2" fill="#06070A" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill={GOLD} fontSize="9" fontFamily={MONO} opacity="0.85">
            {n.li === 0 ? 'root' : `${(0x3a + i * 17).toString(16)}…`}
          </text>
        </g>
      ))}
    </svg>
  )
}

/* Web3 — "Web3, made human.": a decentralized peer mesh with people at the edges. */
export function PeerMesh({ className }: { className?: string }) {
  const peers = [
    [80, 70], [230, 40], [380, 90], [470, 210], [400, 320],
    [250, 290], [110, 300], [40, 190], [170, 170], [320, 190],
  ] as const
  const links: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
    [8, 0], [8, 1], [8, 5], [8, 7], [8, 9], [9, 2], [9, 3], [9, 4], [9, 5], [1, 9], [6, 8],
  ]
  return (
    <svg viewBox="0 0 520 360" className={className} fill="none" aria-hidden>
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={peers[a][0]}
          y1={peers[a][1]}
          x2={peers[b][0]}
          y2={peers[b][1]}
          stroke={i % 3 === 0 ? GOLD : LIME}
          strokeWidth="0.9"
          className="hx-edge"
          style={{ animationDelay: `${(i % 7) * 0.5}s` }}
        />
      ))}
      {peers.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i >= 8 ? 14 : 11} stroke={i >= 8 ? GOLD : LIME} strokeWidth="1.2" fill="#06070A" />
          {/* a tiny "person" glyph: Web3 for humans */}
          <circle cx={x} cy={y - 3} r="2.6" stroke={i >= 8 ? GOLD : LIME} strokeWidth="1" />
          <path d={`M${x - 5} ${y + 6} a5 4 0 0 1 10 0`} stroke={i >= 8 ? GOLD : LIME} strokeWidth="1" />
        </g>
      ))}
    </svg>
  )
}

/* Web3 — wallet connect flow: dApp ⇄ wallet ⇄ chain. */
export function WalletFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 190" className={className} fill="none" aria-hidden>
      {[
        { x: 20, label: 'dApp' },
        { x: 190, label: 'wallet' },
        { x: 360, label: 'chain' },
      ].map((b) => (
        <g key={b.label}>
          <rect x={b.x} y="55" width="120" height="80" rx="14" stroke={LIME} strokeWidth="1.2" />
          <text x={b.x + 60} y="101" textAnchor="middle" fill={LIME} fontSize="13" fontFamily={MONO} opacity="0.85">
            {b.label}
          </text>
        </g>
      ))}
      <path d="M140 85 H190 M310 85 H360" stroke={GOLD} strokeWidth="1.2" strokeDasharray="4 5" className="hx-dash" />
      <path d="M190 108 H140 M360 108 H310" stroke={LIME} strokeWidth="1.2" strokeDasharray="4 5" className="hx-dash" />
      <text x="250" y="168" textAnchor="middle" fill={GOLD} fontSize="9" fontFamily={MONO} opacity="0.8">
        sign · connect · switch
      </text>
    </svg>
  )
}

/* Crypto — "Money, programmable.": a price line with candlesticks. */
export function PriceChart({ className }: { className?: string }) {
  const candles = [
    [40, 220, 250, 200, 262], [80, 236, 210, 196, 248], [120, 210, 222, 198, 236],
    [160, 222, 180, 170, 230], [200, 180, 192, 168, 204], [240, 192, 150, 140, 200],
    [280, 150, 166, 140, 178], [320, 166, 128, 116, 172], [360, 128, 100, 90, 140],
    [400, 100, 116, 92, 126], [440, 116, 76, 64, 122], [480, 76, 58, 48, 88],
  ] as const
  return (
    <svg viewBox="0 0 520 300" className={className} fill="none" aria-hidden>
      {[60, 120, 180, 240].map((y) => (
        <line key={y} x1="20" x2="500" y1={y} y2={y} stroke={GOLD} strokeOpacity="0.25" strokeWidth="0.6" strokeDasharray="2 6" />
      ))}
      {candles.map(([x, open, close, high, low], i) => {
        const up = close < open
        const color = up ? LIME : GOLD
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={high} y2={low} stroke={color} strokeWidth="1" />
            <rect x={x - 7} y={Math.min(open, close)} width="14" height={Math.max(4, Math.abs(open - close))} stroke={color} strokeWidth="1.1" fill="#06070A" />
          </g>
        )
      })}
      <path
        d={`M${candles.map(([x, , close]) => `${x} ${close - 22}`).join(' L')}`}
        stroke={LIME}
        strokeWidth="1.4"
        strokeDasharray="5 6"
        className="hx-dash"
      />
    </svg>
  )
}

/* Crypto — a stack of tokens/coins moving between wallets. */
export function CoinStream({ className }: { className?: string }) {
  const coins = [60, 160, 260, 360, 460]
  return (
    <svg viewBox="0 0 520 190" className={className} fill="none" aria-hidden>
      <path d="M60 95 H460" stroke={GOLD} strokeWidth="1.1" strokeDasharray="4 5" className="hx-dash" />
      {coins.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="95" r="34" stroke={GOLD} strokeWidth="1.3" fill="#06070A" />
          <circle cx={x} cy="95" r="26" stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.6" />
          <text x={x} y="101" textAnchor="middle" fill={i % 2 ? LIME : GOLD} fontSize="16" fontFamily={MONO} opacity="0.9">
            {['$', '◎', 'Ξ', '₿', '$'][i]}
          </text>
        </g>
      ))}
      <text x="260" y="168" textAnchor="middle" fill={LIME} fontSize="9" fontFamily={MONO} opacity="0.8">
        mint · transfer · settle
      </text>
    </svg>
  )
}

/* Careers — remote-first, global team: a wireframe globe with arcs between time zones. */
export function GlobeArcs({ className }: { className?: string }) {
  const cx = 260
  const cy = 180
  const r = 150
  const cities = [
    [175, 120, 'SF'], [245, 105, 'NYC'], [300, 95, 'LDN'], [330, 140, 'BER'], [360, 205, 'SG'], [215, 235, 'SAO'],
  ] as const
  const arcs: [number, number][] = [[0, 2], [1, 3], [2, 4], [5, 1], [3, 4], [0, 5]]
  return (
    <svg viewBox="0 0 520 360" className={className} fill="none" aria-hidden>
      <circle cx={cx} cy={cy} r={r} stroke={LIME} strokeWidth="1.1" />
      {[0.35, 0.7].map((k) => (
        <ellipse key={`m${k}`} cx={cx} cy={cy} rx={r * k} ry={r} stroke={LIME} strokeWidth="0.7" strokeOpacity="0.6" />
      ))}
      {[-0.6, -0.2, 0.2, 0.6].map((k) => {
        const y = cy + r * k
        const half = Math.sqrt(r * r - (r * k) ** 2)
        return <line key={`p${k}`} x1={cx - half} x2={cx + half} y1={y} y2={y} stroke={LIME} strokeWidth="0.7" strokeOpacity="0.6" />
      })}
      {arcs.map(([a, b], i) => {
        const [x1, y1] = cities[a]
        const [x2, y2] = cities[b]
        const mx = (x1 + x2) / 2
        const my = Math.min(y1, y2) - 45
        return (
          <path key={i} d={`M${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} stroke={GOLD} strokeWidth="1.1" strokeDasharray="4 5" className="hx-dash" />
        )
      })}
      {cities.map(([x, y, label], i) => (
        <g key={label}>
          <circle cx={x} cy={y} r="4" fill={GOLD} className="hx-node" style={{ animationDelay: `${i * 0.5}s` }} />
          <text x={x + 8} y={y - 6} fill={GOLD} fontSize="9" fontFamily={MONO} opacity="0.85">
            {label}
          </text>
        </g>
      ))}
    </svg>
  )
}

/* Careers — ownership & shipping: a git commit graph with branches merging back. */
export function CommitGraph({ className }: { className?: string }) {
  const main = [40, 120, 200, 280, 360, 440]
  return (
    <svg viewBox="0 0 500 190" className={className} fill="none" aria-hidden>
      <path d="M40 120 H460" stroke={LIME} strokeWidth="1.3" />
      <path d="M120 120 C 140 60, 180 60, 200 60 H 260 C 290 60, 300 120, 320 120" stroke={GOLD} strokeWidth="1.2" strokeDasharray="4 5" className="hx-dash" />
      <path d="M280 120 C 300 170, 330 170, 350 170 H 400 C 420 170, 430 120, 440 120" stroke={LIME} strokeWidth="1.2" strokeDasharray="4 5" className="hx-dash" />
      {main.map((x) => (
        <circle key={x} cx={x} cy="120" r="7" stroke={LIME} strokeWidth="1.3" fill="#06070A" />
      ))}
      {[200, 250].map((x) => (
        <circle key={`b${x}`} cx={x} cy="60" r="6" stroke={GOLD} strokeWidth="1.2" fill="#06070A" />
      ))}
      {[350, 395].map((x) => (
        <circle key={`c${x}`} cx={x} cy="170" r="6" stroke={LIME} strokeWidth="1.2" fill="#06070A" />
      ))}
      <text x="225" y="44" textAnchor="middle" fill={GOLD} fontSize="9" fontFamily={MONO} opacity="0.8">feat/your-idea</text>
      <text x="460" y="104" textAnchor="end" fill={LIME} fontSize="9" fontFamily={MONO} opacity="0.8">main · shipped</text>
    </svg>
  )
}

/* Contact — "let's talk": a signal source broadcasting expanding waves. */
export function SignalWaves({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx="200"
          cy="200"
          r="40"
          stroke={i % 2 ? GOLD : LIME}
          strokeWidth="1.2"
          className="hx-ring"
          style={{ animationDelay: `${i * 1.1}s` }}
        />
      ))}
      <circle cx="200" cy="200" r="22" stroke={LIME} strokeWidth="1.4" fill="#06070A" />
      <path d="M190 194 h20 v13 h-12 l-6 5 v-5 h-2 z" stroke={LIME} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

/* Contact — you ⇄ Hamilix: two endpoints with packets travelling both ways. */
export function Handshake({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 190" className={className} fill="none" aria-hidden>
      <circle cx="70" cy="95" r="42" stroke={GOLD} strokeWidth="1.3" />
      <text x="70" y="100" textAnchor="middle" fill={GOLD} fontSize="13" fontFamily={MONO} opacity="0.9">you</text>
      <g transform="translate(430 95)">
        <path d="M0 -44 L38 -22 V22 L0 44 L-38 22 V-22 Z" stroke={LIME} strokeWidth="1.3" />
        <text x="0" y="5" textAnchor="middle" fill={LIME} fontSize="11" fontFamily={MONO} opacity="0.9">hamilix</text>
      </g>
      <path d="M115 82 H388" stroke={LIME} strokeWidth="1.2" strokeDasharray="4 5" className="hx-dash" />
      <path d="M388 108 H115" stroke={GOLD} strokeWidth="1.2" strokeDasharray="4 5" className="hx-dash" />
      <text x="250" y="70" textAnchor="middle" fill={LIME} fontSize="9" fontFamily={MONO} opacity="0.8">idea →</text>
      <text x="250" y="132" textAnchor="middle" fill={GOLD} fontSize="9" fontFamily={MONO} opacity="0.8">← plan · build · launch</text>
    </svg>
  )
}

/* Small repeated shapes (the floating "confetti" layer) per theme. */
export type ShapeKind = 'hex' | 'cube' | 'ring' | 'coin' | 'plus' | 'bubble' | 'chip'

export function SmallShape({ kind, className, style }: { kind: ShapeKind; className?: string; style?: React.CSSProperties }) {
  const common = { viewBox: '0 0 100 100', className, style, fill: 'none', 'aria-hidden': true } as const
  switch (kind) {
    case 'cube':
      return (
        <svg {...common}>
          <path d="M50 8 L88 30 V70 L50 92 L12 70 V30 Z" stroke="currentColor" strokeWidth="1.4" />
          <path d="M12 30 L50 52 L88 30 M50 52 V92" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        </svg>
      )
    case 'ring':
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="1.1" />
          <path d="M50 8 V40 M50 60 V92 M8 50 H40 M60 50 H92" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
        </svg>
      )
    case 'coin':
      return (
        <svg {...common}>
          <ellipse cx="50" cy="50" rx="42" ry="42" stroke="currentColor" strokeWidth="1.4" />
          <ellipse cx="50" cy="50" rx="32" ry="32" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6" />
          <path d="M50 30 V70 M40 40 h14 a6 6 0 0 1 0 12 h-8 a6 6 0 0 0 0 12 h14" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      )
    case 'plus':
      return (
        <svg {...common}>
          <path d="M50 14 V86 M14 50 H86" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
        </svg>
      )
    case 'chip':
      return (
        <svg {...common}>
          <rect x="24" y="24" width="52" height="52" rx="6" stroke="currentColor" strokeWidth="1.4" />
          <rect x="38" y="38" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
          <path
            d="M36 24 V10 M50 24 V10 M64 24 V10 M36 76 V90 M50 76 V90 M64 76 V90 M24 36 H10 M24 50 H10 M24 64 H10 M76 36 H90 M76 50 H90 M76 64 H90"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeOpacity="0.8"
          />
        </svg>
      )
    case 'bubble':
      return (
        <svg {...common}>
          <path d="M14 22 h72 a6 6 0 0 1 6 6 v38 a6 6 0 0 1 -6 6 H44 l-16 14 v-14 H14 a6 6 0 0 1 -6 -6 V28 a6 6 0 0 1 6 -6 Z" stroke="currentColor" strokeWidth="1.3" />
          <path d="M26 40 H74 M26 54 H58" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        </svg>
      )
    case 'hex':
    default:
      return (
        <svg {...common}>
          <path d="M50 3 L91 26.5 V73.5 L50 97 L9 73.5 V26.5 Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M50 18 L78 34 V66 L50 82 L22 66 V34 Z" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
        </svg>
      )
  }
}
