import { Link } from 'react-router-dom'
import { CONTACT_VISIBILITY, FOOTER, SITE, SITE_TAGLINE } from '@/lib/content'
import { PointWordmark } from '@/components/brand/point-wordmark'
import { VelixLogo } from '@/components/layout/velix-logo'
import { SocialLinksRow } from '@/components/ui/social-links'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 overflow-hidden border-t border-border bg-[#040506]">
      <div className="hx-glow-lime pointer-events-none absolute -top-48 left-1/2 h-96 w-[60rem] -translate-x-1/2 opacity-40 blur-3xl" aria-hidden />

      <div className="hx-container relative">
        <div className="grid gap-12 pb-6 pt-16 md:pb-8 md:pt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <VelixLogo imageClassName="h-12 md:h-14" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{FOOTER.blurb}</p>
            {CONTACT_VISIBILITY.social ? (
              <SocialLinksRow links={FOOTER.social} className="mt-8" />
            ) : null}
          </div>

          {FOOTER.columns.map((column) => (
            <nav key={column.heading} className="lg:col-span-2" aria-label={column.heading}>
              <h2 className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-subtle">
                {column.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h2 className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-subtle">Get in touch</h2>
            <a href={`mailto:${SITE.email}`} className="mt-5 block text-sm text-foreground transition-colors hover:text-accent">
              {SITE.email}
            </a>
            {CONTACT_VISIBILITY.phone ? (
              <a href={SITE.phoneHref} className="mt-2 block text-sm text-foreground transition-colors hover:text-accent">
                {SITE.phone}
              </a>
            ) : null}
            {CONTACT_VISIBILITY.location ? (
              <div className="mt-6 space-y-3">
                {FOOTER.addresses.map((address) => (
                  <p key={address} className="text-sm leading-relaxed text-muted">
                    {address}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* HAMILIX drawn in fire-coloured points. mt-* sets the space above it. */}
      <div className="pointer-events-none relative mt-2 select-none px-2 md:mt-4 md:px-4" aria-hidden>
        <PointWordmark className="opacity-90 blur-[0.4px]" />
      </div>

      {/* Bottom bar: plain, sits below the point wordmark. */}
      <div className="relative">
        <div className="hx-container flex flex-col gap-3 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.16em]">{SITE_TAGLINE}</p>
        </div>
      </div>
    </footer>
  )
}
