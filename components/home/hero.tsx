import { useRef } from 'react'
import { HexEmblem } from '@/components/brand/hex-emblem'
import { TapeMarquee, WordRotator } from '@/components/brand/kinetic'
import { Reveal } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import { HERO, TAPE_WORDS } from '@/lib/home-content'

export function HomeHero() {
  const ref = useRef<HTMLElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--hx', `${e.clientX - r.left}px`)
    el.style.setProperty('--hy', `${e.clientY - r.top}px`)
  }

  return (
    <>
      <section ref={ref} onMouseMove={onMove} className="relative overflow-hidden" style={{ ['--hx' as string]: '70%', ['--hy' as string]: '40%' }}>
        <div className="hx-grid-bg pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 hidden transition-[background] duration-200 lg:block"
          style={{ background: 'radial-gradient(520px circle at var(--hx) var(--hy), rgba(182,242,60,0.09), transparent 60%)' }}
          aria-hidden
        />
        <div className="hx-glow-gold pointer-events-none absolute -right-32 top-24 h-[36rem] w-[36rem] blur-3xl" aria-hidden />

        {/* Emblem sits behind the headline on large screens */}
        <div className="pointer-events-none absolute right-[-3rem] top-1/2 hidden w-[36rem] -translate-y-1/2 opacity-90 lg:block xl:right-[2%] xl:w-[40rem]">
          <HexEmblem className="max-w-none" />
        </div>

        <div className="hx-container relative z-10 flex min-h-[min(calc(100svh-4.5rem),54rem)] flex-col justify-center py-16">
          <Reveal>
            <p className="hx-eyebrow">{HERO.kicker}</p>
            <h1 className="hx-giant mt-6">
              <span className="block">{HERO.lead}</span>
              <WordRotator words={HERO.rotating} className="flex" wordClassName="hx-gradient-text pr-[0.08em]" />
              <span className="block text-foreground/90">{HERO.tail}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 flex max-w-xl flex-col gap-8">
            <p className="max-w-md text-lg leading-snug text-muted md:text-xl">{HERO.sub}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={HERO.primaryCta.href} size="lg" arrow>
                {HERO.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={HERO.secondaryCta.href} size="lg" variant="secondary">
                {HERO.secondaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>

          <div className="mx-auto mt-10 w-full max-w-[18rem] sm:hidden">
            <HexEmblem className="max-w-[18rem]" />
          </div>
        </div>
      </section>

      {/* Crossing tapes — AI meets blockchain */}
      <div className="relative z-10 overflow-hidden py-14 md:py-20" aria-hidden>
        <TapeMarquee words={TAPE_WORDS.lime} tone="lime" tilt={-3} />
        <TapeMarquee words={TAPE_WORDS.gold} tone="gold" tilt={2.5} reverse className="-mt-2 md:-mt-4" />
      </div>
    </>
  )
}
