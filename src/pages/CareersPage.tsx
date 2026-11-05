import { Icon, type IconName } from '@/components/brand/icons'
import { Kicker } from '@/components/brand/kinetic'
import { GiantVerb } from '@/components/brand/service-page'
import { Reveal } from '@/components/motion/reveal'
import { OpenPositionsSection } from '@/components/sections/open-positions-section'
import { ButtonLink } from '@/components/ui/button'
import { Section, SectionHeader } from '@/components/ui/section'
import {
  CAREERS_FALLBACK_CTA,
  CAREERS_INTERVIEW_PROCESS,
  CAREERS_POSITIONS_SECTION,
  CULTURE_VALUES,
  OPEN_POSITIONS,
} from '@/lib/content'
import { usePageTitle } from '@/lib/use-page-title'

const CULTURE_ICONS: IconName[] = ['rocket', 'sparkles', 'code', 'globe']

export function CareersPage() {
  usePageTitle('Careers', 'Join Hamilix and build excellent AI and blockchain products with a remote-first engineering team.')

  const teams = [...new Set(OPEN_POSITIONS.map((job) => job.team))]
  const count: number = OPEN_POSITIONS.length

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hx-grid-bg pointer-events-none absolute inset-0" aria-hidden />
        <div className="hx-glow-lime pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] blur-3xl" aria-hidden />
        <div className="hx-container relative z-10 pb-20 pt-12 md:pt-16">
          <Reveal>
            <Kicker>Careers</Kicker>
            <h1 className="sr-only">Careers at Hamilix</h1>
            <GiantVerb word="JOIN." tone="lime" className="mt-6" />
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="hx-big" aria-hidden>
                Build the future of <span className="hx-gradient-text">AI & blockchain.</span>
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="hx-chip border-accent/30 text-accent">
                  {count} open {count === 1 ? 'role' : 'roles'}
                </span>
                <span className="hx-chip">{teams.join(' · ')}</span>
                <span className="hx-chip">Remote-first · Global</span>
              </div>
            </div>
            <ButtonLink href="#open-roles" size="lg" arrow>
              View open roles
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="Culture" title="How we work." titleClassName="hx-big" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CULTURE_VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.06}>
              <article className="hx-card hx-card-hover h-full p-7">
                <span className="hx-icon-tile">
                  <Icon name={CULTURE_ICONS[i] ?? 'sparkles'} />
                </span>
                <h3 className="mt-8 text-xl font-semibold">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{value.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section variant="surface" id="open-roles">
        <SectionHeader
          eyebrow={CAREERS_POSITIONS_SECTION.eyebrow}
          title={CAREERS_POSITIONS_SECTION.title}
          description={CAREERS_POSITIONS_SECTION.description}
        />
        <OpenPositionsSection positions={OPEN_POSITIONS} />

        <div className="hx-card mt-12 flex flex-col items-start justify-between gap-6 bg-bg/70 p-7 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="text-xl font-semibold">{CAREERS_FALLBACK_CTA.title}</h3>
            <p className="mt-2 text-sm text-muted">{CAREERS_FALLBACK_CTA.description}</p>
          </div>
          <ButtonLink href={CAREERS_FALLBACK_CTA.cta.href} variant="secondary" arrow>
            {CAREERS_FALLBACK_CTA.cta.label}
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Hiring process" title="Four steps. No surprises." titleClassName="hx-big" />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CAREERS_INTERVIEW_PROCESS.map((stage, i) => (
            <li key={stage.step}>
              <Reveal delay={i * 0.06} className="h-full">
                <div className="hx-card h-full p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 font-mono text-sm text-accent">
                    {stage.step.padStart(2, '0')}
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">{stage.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{stage.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>
    </>
  )
}
