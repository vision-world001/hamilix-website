import { AnimatePresence, m, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/* WordRotator — cycles through words with a vertical slot animation   */
/* ------------------------------------------------------------------ */

export function WordRotator({
  words,
  interval = 2200,
  className,
  wordClassName,
}: {
  words: readonly string[]
  interval?: number
  className?: string
  wordClassName?: string
}) {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => window.clearInterval(id)
  }, [words.length, interval, reduced])

  return (
    <span className={cn('relative -mb-[0.2em] inline-flex overflow-hidden pb-[0.32em] align-bottom', className)}>
      <span className="sr-only">{words.join(', ')}</span>
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={words[index]}
          aria-hidden
          className={cn('inline-block whitespace-nowrap', wordClassName)}
          initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </m.span>
      </AnimatePresence>
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Spotlight — a surface whose border/glow follows the cursor          */
/* ------------------------------------------------------------------ */

export function Spotlight({
  as: Tag = 'div',
  tone = 'lime',
  className,
  children,
}: {
  as?: 'div' | 'article' | 'section'
  tone?: 'lime' | 'gold'
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMove}
      className={cn('hx-spotlight', tone === 'gold' && 'hx-spotlight-gold', className)}
    >
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/* TapeMarquee — giant tilted band of scrolling words                  */
/* ------------------------------------------------------------------ */

export function TapeMarquee({
  words,
  tone = 'lime',
  reverse = false,
  tilt = -2,
  className,
}: {
  words: readonly string[]
  tone?: 'lime' | 'gold' | 'dark'
  reverse?: boolean
  tilt?: number
  className?: string
}) {
  const doubled = [...words, ...words]
  return (
    <div
      className={cn(
        'relative -mx-[5vw] overflow-hidden border-y py-4 md:py-5',
        tone === 'lime' && 'border-accent bg-accent text-[#0B0D07]',
        tone === 'gold' && 'border-gold bg-gold text-[#140F02]',
        tone === 'dark' && 'border-border-strong bg-surface text-foreground',
        className,
      )}
      style={{ transform: `rotate(${tilt}deg)` }}
      aria-hidden
    >
      <div className={cn('flex w-max', reverse ? 'animate-marquee-reverse' : 'animate-marquee')}>
        {doubled.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center whitespace-nowrap font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
            <span className="px-6 md:px-8">{word}</span>
            <span className="hx-hex-clip h-4 w-4 bg-current opacity-80 md:h-5 md:w-5" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* ScrollRevealText — words light up as the section scrolls past       */
/* ------------------------------------------------------------------ */

function RevealWord({
  word,
  progress,
  range,
  highlight,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
  highlight: boolean
}) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <m.span style={{ opacity }} className={cn('mr-[0.25em] inline-block', highlight && 'hx-gradient-text')}>
      {word}
    </m.span>
  )
}

export function ScrollRevealText({
  text,
  highlights = [],
  className,
}: {
  text: string
  highlights?: readonly string[]
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  const isHighlight = (w: string) => highlights.some((h) => w.replace(/[.,—]/g, '').toLowerCase() === h.toLowerCase())

  if (reduced) {
    return <p className={className}>{text}</p>
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <RevealWord
          key={`${word}-${i}`}
          word={word}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          highlight={isHighlight(word)}
        />
      ))}
    </p>
  )
}

/* ------------------------------------------------------------------ */
/* Counter-style kicker                                                */
/* ------------------------------------------------------------------ */

export function Kicker({ children, tone = 'lime', className }: { children: React.ReactNode; tone?: 'lime' | 'gold'; className?: string }) {
  return <p className={cn('hx-eyebrow', tone === 'gold' && 'hx-eyebrow-gold', className)}>{children}</p>
}
