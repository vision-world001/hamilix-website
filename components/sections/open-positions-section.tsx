import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { JobRoleBadge, getJobRoleNumber } from '@/components/sections/job-role-badge'
import { cn } from '@/lib/utils'
import type { OpenPosition } from '@/lib/content'

type OpenPositionsSectionProps = {
  positions: readonly OpenPosition[]
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

function JobCard({ job, number }: { job: OpenPosition; number: string }) {
  return (
    <Link
      to={`/careers/${job.id}`}
      className="group flex items-center gap-4 rounded-xl border border-border bg-surface px-5 py-4 transition-colors duration-300 hover:border-accent/35 md:gap-5 md:px-6 md:py-5"
    >
      <JobRoleBadge
        number={number}
        className="transition-colors duration-300 group-hover:border-accent/30"
      />

      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent md:text-lg">
          {job.title}
        </h3>
        <p className="mt-1 font-mono text-xs text-muted">{job.location}</p>
      </div>

      <ArrowIcon className="h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent" />
    </Link>
  )
}

export function OpenPositionsSection({ positions }: OpenPositionsSectionProps) {
  const [activeTeam, setActiveTeam] = useState('All')

  const teams = useMemo(() => {
    const unique = [...new Set(positions.map((job) => job.team))]
    return ['All', ...unique]
  }, [positions])

  const filtered = useMemo(
    () => (activeTeam === 'All' ? positions : positions.filter((job) => job.team === activeTeam)),
    [activeTeam, positions],
  )

  const teamCounts = useMemo(() => {
    const counts = positions.reduce<Record<string, number>>((acc, job) => {
      acc[job.team] = (acc[job.team] ?? 0) + 1
      return acc
    }, {})
    return counts
  }, [positions])

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3 md:mb-10">
        <p className="mr-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {positions.length} open {positions.length === 1 ? 'position' : 'positions'}
        </p>
        <div className="flex flex-wrap gap-2">
          {teams.map((team) => {
            const count = team === 'All' ? positions.length : teamCounts[team] ?? 0
            const isActive = activeTeam === team

            return (
              <button
                key={team}
                type="button"
                onClick={() => setActiveTeam(team)}
                className={cn(
                  'rounded-full border px-4 py-1.5 font-mono text-xs transition-colors duration-200',
                  isActive
                    ? 'border-accent/50 bg-accent/10 text-accent'
                    : 'border-border bg-surface text-muted hover:border-accent/25 hover:text-foreground',
                )}
              >
                {team}
                <span className="ml-1.5 text-muted/80">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            number={getJobRoleNumber(positions, job.id)}
          />
        ))}
      </div>
    </div>
  )
}
