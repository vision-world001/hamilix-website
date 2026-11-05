import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  variant?: 'default' | 'surface'
  spacing?: 'default' | 'lg'
  /** Kept for backwards compatibility; renders a subtle image behind the section. */
  backgroundImage?: string
  backgroundOverlay?: boolean
  backgroundEffect?: 'dark-blue'
  containerClassName?: string
}

export function Section({
  children,
  variant = 'default',
  spacing = 'default',
  className,
  backgroundImage,
  backgroundOverlay = true,
  backgroundEffect: _backgroundEffect,
  containerClassName,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'relative',
        variant === 'surface' && 'border-y border-border bg-surface/60',
        spacing === 'default' ? 'py-20 md:py-28' : 'py-28 md:py-36',
        backgroundImage && 'overflow-hidden',
        className,
      )}
      {...props}
    >
      {backgroundImage ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
            aria-hidden
          />
          {backgroundOverlay ? <div className="pointer-events-none absolute inset-0 bg-bg/80" aria-hidden /> : null}
        </>
      ) : null}
      <div className={cn('hx-container', backgroundImage && 'relative z-10', containerClassName)}>{children}</div>
    </section>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center' | 'split'
  tone?: 'lime' | 'gold'
  className?: string
  titleClassName?: string
  action?: React.ReactNode
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'lime',
  className,
  titleClassName,
  action,
}: SectionHeaderProps) {
  if (align === 'split') {
    return (
      <div className={cn('mb-12 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end lg:gap-10', className)}>
        <div className="lg:col-span-7">
          {eyebrow ? <p className={cn('hx-eyebrow', tone === 'gold' && 'hx-eyebrow-gold')}>{eyebrow}</p> : null}
          <h2 className={cn('hx-h2 mt-4', titleClassName)}>{title}</h2>
        </div>
        <div className="lg:col-span-5">
          {description ? <p className="hx-lead">{description}</p> : null}
          {action ? <div className="mt-6">{action}</div> : null}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn('hx-eyebrow', tone === 'gold' && 'hx-eyebrow-gold', align === 'center' && 'justify-center')}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn('hx-h2 mt-4', titleClassName)}>{title}</h2>
      {description ? <p className={cn('hx-lead mt-5', align === 'center' && 'mx-auto max-w-2xl')}>{description}</p> : null}
      {action ? <div className="mt-7">{action}</div> : null}
    </div>
  )
}
