import { cn } from '@/lib/utils'

type JobRoleBadgeProps = {
  number: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClass = {
  sm: 'h-11 w-11 text-sm md:h-12 md:w-12 md:text-base',
  md: 'h-12 w-12 text-base md:h-14 md:w-14',
  lg: 'h-14 w-14 text-base md:h-16 md:w-16 md:text-lg',
} as const

export function JobRoleBadge({ number, size = 'sm', className }: JobRoleBadgeProps) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-lg border border-border bg-[#141416] font-mono font-semibold tracking-tight text-accent',
        sizeClass[size],
        className,
      )}
    >
      {number}
    </span>
  )
}

export function getJobRoleNumber(
  positions: readonly { id: string }[],
  jobId: string,
): string {
  const index = positions.findIndex((position) => position.id === jobId)
  return String(index + 1).padStart(2, '0')
}
