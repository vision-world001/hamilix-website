import { Icon, type IconName } from '@/components/brand/icons'
import { cn } from '@/lib/utils'

/* AI — a live "console" of the platform layers */
export function AiConsoleVisual() {
  const rows = [
    { k: 'retrieve', v: 'top_k=8 · reranked', ok: true },
    { k: 'route', v: 'model → best-fit', ok: true },
    { k: 'agent', v: 'tools: 4 · memory: on', ok: true },
    { k: 'eval', v: 'faithfulness 0.97', ok: true },
    { k: 'guard', v: 'policy: enforced', ok: true },
  ]
  return (
    <div className="hx-card hx-ring-gradient mx-auto w-full max-w-md overflow-hidden" aria-hidden>
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b5a]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        </div>
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-subtle">hamilix://ai-runtime</span>
      </div>
      <div className="space-y-3 p-5 font-mono text-[0.8rem]">
        {rows.map((r, i) => (
          <div key={r.k} className="flex items-center gap-3" style={{ animation: `fadeIn 0.5s ease-out ${0.3 + i * 0.25}s both` }}>
            <span className="text-accent">❯</span>
            <span className="w-16 text-foreground">{r.k}</span>
            <span className="flex-1 truncate text-muted">{r.v}</span>
            <span className="text-accent">✓</span>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-2 text-subtle" style={{ animation: 'fadeIn 0.5s ease-out 1.6s both' }}>
          <span className="inline-block h-4 w-2 animate-pulse bg-accent" />
          answer ready · 412ms
        </div>
      </div>
    </div>
  )
}

/* Blockchain — linked blocks */
const BLOCKS = [
  { height: '#000128', hash: '0x7f3a…c91e', label: 'Contract deployed', tone: 'gold' },
  { height: '#000129', hash: '0x2be0…41d7', label: 'Tokens minted', tone: 'lime' },
  { height: '#000130', hash: '0x9c14…e0a2', label: 'Settlement final', tone: 'gold' },
] as const

export function ChainVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden>
      <div className="absolute bottom-8 left-[1.6rem] top-8 w-px bg-gradient-to-b from-gold/60 via-accent/40 to-gold/60" />
      <div className="space-y-5">
        {BLOCKS.map((block, i) => (
          <div key={block.height} className="relative flex items-center gap-5" style={{ animation: `float 7s ease-in-out ${i * 0.8}s infinite` }}>
            <span
              className={cn(
                'hx-hex-clip relative z-10 flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center',
                block.tone === 'gold' ? 'bg-gold/90 text-[#140F02]' : 'bg-accent/90 text-[#0B0D07]',
              )}
            >
              <Icon name="cube" className="h-5 w-5" />
            </span>
            <div className="hx-card flex-1 bg-surface/90 px-5 py-4 backdrop-blur">
              <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.14em] text-subtle">
                <span>Block {block.height}</span>
                <span className="text-accent">✓ confirmed</span>
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">{block.label}</p>
              <p className="mt-1 font-mono text-xs text-muted">{block.hash}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Web3 — tilted stack of layers */
const LAYERS: { title: string; icon: IconName }[] = [
  { title: 'dApp Interface', icon: 'eye' },
  { title: 'Wallet Bridge', icon: 'wallet' },
  { title: 'Backend & Indexers', icon: 'network' },
  { title: 'On-Chain Layer', icon: 'cube' },
]

export function StackVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md [perspective:1200px]" aria-hidden>
      <div className="space-y-3 [transform:rotateX(18deg)_rotateZ(-4deg)]">
        {LAYERS.map((layer, i) => (
          <div
            key={layer.title}
            className="hx-card flex items-center gap-4 bg-surface/90 px-5 py-4 backdrop-blur"
            style={{ marginLeft: `${i * 1.25}rem`, marginRight: `${(3 - i) * 1.25}rem`, animation: `float 7s ease-in-out ${i * 0.5}s infinite` }}
          >
            <span className={cn('hx-icon-tile h-9 w-9', i === 3 && 'text-gold')}>
              <Icon name={layer.icon} className="h-4 w-4" />
            </span>
            <span className="flex-1 text-sm font-medium">{layer.title}</span>
            <span className="font-mono text-[0.65rem] text-subtle">L0{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Crypto — checkout widget */
export function CheckoutVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm" aria-hidden>
      <div className="hx-glow-gold absolute -inset-10 blur-2xl" />
      <div className="hx-card hx-ring-gradient relative overflow-hidden bg-surface/95 p-6 backdrop-blur">
        <div className="flex items-center justify-between">
          <img src="/images/hamilix-icon.png" alt="" className="h-8 w-8" />
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">
            Secure checkout
          </span>
        </div>
        <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-subtle">Amount due</p>
        <p className="mt-1 font-display text-4xl font-semibold">
          250.00 <span className="text-xl text-gold">USDC</span>
        </p>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {['USDC', 'ETH', 'BTC'].map((asset, i) => (
            <span
              key={asset}
              className={cn(
                'rounded-xl border px-3 py-2.5 text-center font-mono text-xs',
                i === 0 ? 'border-gold/50 bg-gold/10 text-gold' : 'border-border text-muted',
              )}
            >
              {asset}
            </span>
          ))}
        </div>
        <div className="mt-5 space-y-2.5 rounded-xl border border-border bg-bg/60 p-4 font-mono text-xs">
          <div className="flex justify-between text-muted">
            <span>Network</span>
            <span className="text-foreground">Base</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>Status</span>
            <span className="text-accent">● Confirmed</span>
          </div>
        </div>
        <div className="mt-5 flex h-11 items-center justify-center rounded-full bg-gold font-semibold text-[#140F02]">Pay with wallet</div>
      </div>
    </div>
  )
}
