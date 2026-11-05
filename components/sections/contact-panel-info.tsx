import { SocialLinksRow, type SocialLinkItem } from '@/components/ui/social-links'

function HeadsetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 14v-2a8 8 0 1 1 16 0v2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M4 14a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H3v-5h1Zm16 0a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1v-5h-1Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type ContactPanelInfoProps = {
  phone: string
  phoneHref: string
  email: string
  addresses: readonly string[]
  social: readonly SocialLinkItem[]
}

export function ContactPanelInfo({
  phone,
  phoneHref,
  email,
  addresses,
  social,
}: ContactPanelInfoProps) {
  return (
    <div className="flex h-full flex-col border-b border-[#2a2a2e] p-8 md:p-10 lg:border-b-0 lg:border-r lg:p-12">
      <a href={phoneHref} className="group flex items-center gap-4 transition-opacity hover:opacity-90">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center text-accent">
          <HeadsetIcon className="h-10 w-10" />
        </span>
        <span className="text-3xl font-semibold tracking-tight text-accent md:text-4xl">{phone}</span>
      </a>

      <div className="mt-12 space-y-10">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Location</h3>
          <div className="mt-3 space-y-1 text-sm leading-relaxed text-muted md:text-base">
            {addresses.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground">Official Email</h3>
          <a
            href={`mailto:${email}`}
            className="mt-3 block text-sm text-foreground transition-colors hover:text-accent md:text-base"
          >
            {email}
          </a>
        </div>
      </div>

      <div className="mt-auto border-t border-[#2a2a2e]/80 pt-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">Connect</p>
        <SocialLinksRow links={social} size="lg" />
      </div>
    </div>
  )
}
