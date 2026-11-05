import { Reveal } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import { SITE } from '@/lib/content'
import { cn } from '@/lib/utils'

type MegaCtaProps = {
  kicker?: string
  /** Leading words, rendered solid. */
  title?: string
  /** Final word(s), rendered in the brand gradient. */
  accent?: string
  size?: 'mega' | 'big'
  tone?: 'lime' | 'gold'
  cta?: { label: string; href: string }
}

export function CtaBand({
  kicker = 'Start a project',
  title = "Let's",
  accent = 'build.',
  size = 'mega',
  tone = 'lime',
  cta = { label: 'Book a free consultation', href: '/contact' },
}: MegaCtaProps) {
  return (
    <section className="relative overflow-hidden border-t border-border py-24 md:py-36">
      <div className="hx-hex-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className={cn(
          'pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 blur-3xl',
          tone === 'gold' ? 'hx-glow-gold' : 'hx-glow-lime',
        )}
        aria-hidden
      />
      <img
        src="/images/hamilix-icon.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 hidden w-[28rem] -translate-y-1/2 animate-spin-slower opacity-[0.07] lg:block"
      />

      <div className="hx-container relative text-center">
        <Reveal>
          <p className={cn('hx-eyebrow justify-center', tone === 'gold' && 'hx-eyebrow-gold')}>{kicker}</p>
          <h2 className={cn('mx-auto mt-8', size === 'mega' ? 'hx-mega' : 'hx-giant max-w-6xl')}>
            {title} <span className="hx-gradient-text">{accent}</span>
          </h2>
          <div className="mt-12 flex flex-col items-center gap-5">
            <ButtonLink href={cta.href} size="lg" variant={tone === 'gold' ? 'gold' : 'primary'} arrow className="h-14 px-8 text-base">
              {cta.label}
            </ButtonLink>
            <a href={`mailto:${SITE.email}`} className="font-mono text-sm text-muted transition-colors hover:text-accent">
              {SITE.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
