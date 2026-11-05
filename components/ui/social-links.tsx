import { cn } from '@/lib/utils'

export type SocialIconType = 'linkedin' | 'email' | 'telegram'

export type SocialLinkItem = {
  readonly label: string
  readonly href: string
  readonly icon: SocialIconType
}

const BUTTON_CLASS =
  'rounded-full border border-border-strong bg-white/[0.02] text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent'

const ICON_CLASS = 'h-[1.125rem] w-[1.125rem]'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M2 9v12h4V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect
        x="4.5"
        y="6.5"
        width="15"
        height="11"
        rx="1.75"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m5 8 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M20.5 4.5 4.5 11.5c-.85.33-.83 1.55.04 1.88l3.85 1.27 1.46 4.53c.27.85 1.4 1.04 1.93.34l2.18-2.82 4 2.97c.71.53 1.71.13 1.88-.71L22 6.2c.19-1-.8-1.78-1.5-1.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 14.5 18 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

const ICONS = {
  linkedin: LinkedInIcon,
  email: EmailIcon,
  telegram: TelegramIcon,
} as const

export function SocialLinkIcon({
  icon,
  className,
}: {
  icon: SocialIconType
  className?: string
}) {
  const Icon = ICONS[icon]
  return <Icon className={className} />
}

export function SocialLinksRow({
  links,
  className,
  iconClassName,
  size = 'md',
}: {
  links: readonly SocialLinkItem[]
  className?: string
  iconClassName?: string
  size?: 'md' | 'lg'
}) {
  const dimension =
    size === 'lg' ? 'h-12 w-12 md:h-[3.25rem] md:w-[3.25rem]' : 'h-10 w-10'
  const gap = size === 'lg' ? 'gap-3.5' : 'gap-3'

  return (
    <div className={cn('flex flex-wrap items-center', gap, className)}>
      {links.map((item) => {
        const isEmail = item.href.startsWith('mailto:')
        const Icon = ICONS[item.icon]

        return (
          <a
            key={item.label}
            href={item.href}
            title={item.label}
            {...(isEmail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            aria-label={item.label}
            className={cn('inline-flex items-center justify-center', dimension, BUTTON_CLASS)}
          >
            <Icon className={cn(ICON_CLASS, iconClassName)} />
          </a>
        )
      })}
    </div>
  )
}
