import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function ScrollToTopOnNavigate() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-surface/90 text-accent shadow-card backdrop-blur-md transition-all duration-300 hover:border-accent/50 sm:bottom-8 sm:right-8',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M12 18V7M7 11l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
