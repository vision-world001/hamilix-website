import { SITE } from '@/lib/content'
import { cn } from '@/lib/utils'

const ORBIT_CHIPS = [
  { label: 'LLM Agents', tone: 'lime', pos: 'left-[2%] top-[18%]' },
  { label: 'Smart Contracts', tone: 'gold', pos: 'right-[0%] top-[12%]' },
  { label: 'RAG Pipelines', tone: 'lime', pos: 'right-[-2%] bottom-[24%]' },
  { label: 'Tokenization', tone: 'gold', pos: 'left-[0%] bottom-[14%]' },
] as const

/** Animated brand emblem: the Hamilix hexagon inside orbiting AI × blockchain rings. */
export function HexEmblem({ className }: { className?: string }) {
  return (
    <div className={cn('relative mx-auto aspect-square w-full max-w-[34rem]', className)} aria-hidden>
      {/* glows */}
      <div className="hx-glow-lime absolute inset-[8%] blur-2xl" />
      <div className="hx-glow-gold absolute inset-[22%] translate-x-[12%] translate-y-[10%] blur-2xl" />

      {/* rings */}
      <div className="absolute inset-[4%] rounded-full border border-white/[0.06]" />
      <div className="absolute inset-[4%] animate-spin-slow rounded-full">
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_4px_rgba(182,242,60,0.6)]" />
        <span className="absolute bottom-[14.6%] right-[14.6%] h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_12px_3px_rgba(242,193,78,0.6)]" />
      </div>
      <div className="absolute inset-[16%] rounded-full border border-dashed border-gold/20" />
      <div className="absolute inset-[16%] animate-spin-slower rounded-full">
        <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-gold shadow-[0_0_14px_4px_rgba(242,193,78,0.55)]" />
        <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_3px_rgba(182,242,60,0.55)]" />
      </div>
      <div
        className="absolute inset-[28%] animate-spin-slow rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(182,242,60,0.55) 60deg, transparent 120deg, rgba(242,193,78,0.45) 200deg, transparent 260deg)',
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))',
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))',
        }}
      />

      {/* emblem */}
      <div className="absolute inset-[27%] flex animate-float items-center justify-center">
        <img
          src="/images/hamilix-icon.png"
          alt={`${SITE.name} emblem`}
          className="h-full w-full object-contain drop-shadow-[0_0_40px_rgba(182,242,60,0.35)]"
        />
      </div>

      {/* orbit chips */}
      {ORBIT_CHIPS.map((chip, i) => (
        <div
          key={chip.label}
          className={cn('absolute hidden sm:block', chip.pos)}
          style={{ animation: `float 7s ease-in-out ${i * 0.9}s infinite` }}
        >
          <span
            className={cn(
              'inline-flex items-center gap-2 rounded-full border bg-bg/80 px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] backdrop-blur-md',
              chip.tone === 'lime' ? 'border-accent/30 text-accent' : 'border-gold/30 text-gold',
            )}
          >
            <span className={cn('h-1.5 w-1.5 rounded-full', chip.tone === 'lime' ? 'bg-accent' : 'bg-gold')} />
            {chip.label}
          </span>
        </div>
      ))}
    </div>
  )
}
