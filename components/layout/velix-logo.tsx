import { Link } from 'react-router-dom'
import { SITE } from '@/lib/content'
import { cn } from '@/lib/utils'

type VelixLogoProps = {
  className?: string
  imageClassName?: string
}

export function VelixLogo({ className, imageClassName }: VelixLogoProps) {
  return (
    <Link
      to="/"
      className={cn(
        'inline-flex shrink-0 items-center transition-opacity hover:opacity-90',
        className,
      )}
      aria-label={`${SITE.name} home`}
    >
      <img
        src={SITE.logo}
        alt={SITE.name}
        className={cn(
          'h-9 w-auto shrink-0 object-contain object-left md:h-10',
          imageClassName,
        )}
      />
    </Link>
  )
}
