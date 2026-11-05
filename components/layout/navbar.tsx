import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { NAV_LINKS } from '@/lib/content'
import { VelixLogo } from '@/components/layout/velix-logo'
import { cn } from '@/lib/utils'
import { ButtonLink } from '@/components/ui/button'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'border-b border-border bg-bg/75 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="hx-container flex h-[4.5rem] items-center justify-between gap-6">
        <VelixLogo />

        <nav
          className="hidden items-center gap-1 rounded-full border border-border bg-surface/60 p-1 backdrop-blur-md lg:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                to={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  active ? 'bg-white/[0.07] text-foreground' : 'text-muted hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex" arrow>
            Start a project
          </ButtonLink>
          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={cn(
                'absolute h-[1.5px] w-4 bg-current transition-transform duration-300',
                open ? 'rotate-45' : '-translate-y-[3px]',
              )}
            />
            <span
              className={cn(
                'absolute h-[1.5px] w-4 bg-current transition-transform duration-300',
                open ? '-rotate-45' : 'translate-y-[3px]',
              )}
            />
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-bg lg:hidden">
          <nav className="hx-container flex flex-col py-6" aria-label="Mobile navigation">
            {[{ label: 'Home', href: '/' }, ...NAV_LINKS].map((link, i) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'flex items-center justify-between border-b border-border py-4 font-display text-2xl font-medium',
                  isActive(pathname, link.href) ? 'text-accent' : 'text-foreground',
                )}
              >
                {link.label}
                <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, '0')}</span>
              </Link>
            ))}
            <ButtonLink href="/contact" size="lg" className="mt-8 w-full" arrow>
              Start a project
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
