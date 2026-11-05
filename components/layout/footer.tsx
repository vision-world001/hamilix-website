import { Link } from 'react-router-dom'
import { FOOTER, SITE, SITE_TAGLINE } from '@/lib/content'
import { VelixLogo } from '@/components/layout/velix-logo'
import { SocialLinksRow } from '@/components/ui/social-links'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 overflow-hidden border-t border-border bg-[#040506]">
      <div className="hx-glow-lime pointer-events-none absolute -top-48 left-1/2 h-96 w-[60rem] -translate-x-1/2 opacity-40 blur-3xl" aria-hidden />

      <div className="hx-container relative">
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <VelixLogo imageClassName="h-12 md:h-14" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{FOOTER.blurb}</p>
            <SocialLinksRow links={FOOTER.social} className="mt-8" />
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
            <a href={SITE.phoneHref} className="mt-2 block text-sm text-foreground transition-colors hover:text-accent">
              {SITE.phone}
            </a>
            <div className="mt-6 space-y-3">
              {FOOTER.addresses.map((address) => (
                <p key={address} className="text-sm leading-relaxed text-muted">
                  {address}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="select-none overflow-hidden" aria-hidden>
          <p className="hx-gradient-text translate-y-[18%] text-center font-display text-[22vw] font-bold leading-[0.8] tracking-[-0.06em] opacity-[0.08] lg:text-[16rem]">
            HAMILIX
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-6 text-xs text-subtle md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.16em]">{SITE_TAGLINE}</p>
        </div>
      </div>
    </footer>
  )
}
