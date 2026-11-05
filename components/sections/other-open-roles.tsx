import { Link } from 'react-router-dom'
import { JobRoleBadge, getJobRoleNumber } from '@/components/sections/job-role-badge'
import type { OpenPosition } from '@/lib/content'

type OtherOpenRolesProps = {
  positions: readonly OpenPosition[]
  currentJobId: string
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M7 4l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function OtherOpenRoles({ positions, currentJobId }: OtherOpenRolesProps) {
  const otherRoles = positions.filter((job) => job.id !== currentJobId)

  if (otherRoles.length === 0) return null

  return (
    <section className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16">
      <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        Other open roles
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {otherRoles.map((job) => (
          <Link
            key={job.id}
            to={`/careers/${job.id}`}
            className="group flex items-center gap-4 rounded-xl border border-border bg-surface px-5 py-4 transition-colors duration-300 hover:border-accent/35"
          >
            <JobRoleBadge number={getJobRoleNumber(positions, job.id)} />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent md:text-base">
                {job.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-muted">{job.location}</p>
            </div>
            <ArrowIcon className="h-4 w-4 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
          </Link>
        ))}
      </div>
      <Link
        to="/careers"
        className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
      >
        View all open roles
        <ArrowIcon className="h-4 w-4" />
      </Link>
    </section>
  )
}
