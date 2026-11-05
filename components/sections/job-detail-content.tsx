import { Link } from 'react-router-dom'
import { JobApplyButton } from '@/components/sections/job-apply-modal'
import { JobRoleBadge, getJobRoleNumber } from '@/components/sections/job-role-badge'
import { OtherOpenRoles } from '@/components/sections/other-open-roles'
import { Section } from '@/components/ui/section'
import type { OpenPosition } from '@/lib/content'
import { CAREERS_APPLY, OPEN_POSITIONS } from '@/lib/content'

function MetaPill({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted">
      <span className="text-accent/80">{icon}</span>
      {children}
    </span>
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M8 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 1.5a5.5 5.5 0 0 0-5.5 5.5c0 3.75 5.5 7.5 5.5 7.5s5.5-3.75 5.5-7.5A5.5 5.5 0 0 0 8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function CompensationIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M8 4.5v7M6 6.5h3a1.5 1.5 0 0 1 0 3H6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <rect x="2.5" y="5" width="11" height="8" rx="1.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5.5 5V4a2.5 2.5 0 0 1 5 0v1" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function SectionCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <article className="rounded-xl border border-border bg-surface p-6 md:p-8">
      <h2 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </article>
  )
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90 md:text-base">
          <span className="mt-2 h-1 w-4 shrink-0 rounded-full bg-accent/80" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function JobDetailContent({ job }: { job: OpenPosition }) {
  const roleNumber = getJobRoleNumber(OPEN_POSITIONS, job.id)

  return (
    <Section className="pt-12 md:pt-16">
      <Link
        to="/careers"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
      >
        <span aria-hidden>←</span>
        All open roles
      </Link>

      <div className="mt-8 flex min-w-0 items-start gap-4 md:mt-10 md:gap-5">
        <JobRoleBadge number={roleNumber} size="lg" />
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {job.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <MetaPill icon={<LocationIcon />}>{job.location}</MetaPill>
            <MetaPill icon={<ClockIcon />}>{job.type}</MetaPill>
            <MetaPill icon={<CompensationIcon />}>{job.compensation}</MetaPill>
            <MetaPill icon={<TeamIcon />}>{job.team}</MetaPill>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-6 lg:col-span-8">
          <SectionCard title="About the role">
            <p className="text-sm leading-relaxed text-muted md:text-base">{job.about}</p>
          </SectionCard>

          <SectionCard title="What you'll do">
            <BulletList items={job.responsibilities} />
          </SectionCard>

          <SectionCard title="What we're looking for">
            <BulletList items={job.requirements} />
          </SectionCard>
        </div>

        <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <article className="rounded-xl border border-border bg-surface p-6 md:p-7">
            <h2 className="text-lg font-semibold text-foreground">Ready to apply?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{CAREERS_APPLY.prompt}</p>
            <JobApplyButton job={job} className="mt-5 w-full rounded-full font-semibold" />
            <a
              href={`mailto:${CAREERS_APPLY.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
              className="mt-4 block text-center font-mono text-sm text-foreground/90 transition-colors hover:text-accent"
            >
              {CAREERS_APPLY.email}
            </a>
          </article>

          {/* <article className="rounded-xl border border-border bg-surface p-6 md:p-7">
            <h2 className="text-lg font-semibold text-foreground">Interview process</h2>
            <ol className="mt-5 space-y-4">
              {CAREERS_INTERVIEW_PROCESS.map((stage) => (
                <li key={stage.step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-mono text-xs text-accent">
                    {stage.step}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{stage.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{stage.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article> */}
        </aside>
      </div>

      <OtherOpenRoles positions={OPEN_POSITIONS} currentJobId={job.id} />
    </Section>
  )
}
