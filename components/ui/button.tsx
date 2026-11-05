import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-[#0B0D07] font-semibold border-transparent hover:bg-[#c6ff55] hover:shadow-accent-glow',
  gold: 'bg-gold text-[#140F02] font-semibold border-transparent hover:bg-[#ffd36b] hover:shadow-gold-glow',
  secondary:
    'bg-white/[0.03] text-foreground border-border-strong hover:border-accent/50 hover:bg-white/[0.06]',
  ghost: 'bg-transparent text-muted border-transparent hover:text-foreground',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[0.95rem]',
}

const base =
  'group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={cn('h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5', className)}
      aria-hidden
    >
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
}

interface ButtonLinkProps {
  href: string
  children: React.ReactNode
  variant?: Variant
  size?: Size
  className?: string
  arrow?: boolean
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  arrow = false,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <>
      {children}
      {arrow ? <ArrowRight /> : null}
    </>
  )
  const isInternalRoute = href.startsWith('/') && !href.startsWith('//')

  if (!isInternalRoute) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <Link to={href} className={classes}>
      {content}
    </Link>
  )
}
