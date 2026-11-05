import { Fragment, useId } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * "HAMILIX" on fire — blockchain gold embers burning up into AI lime flame tips.
 *
 * Pure SVG (no canvas, no images):
 *  - flames: the letter shapes are stacked upward in fire tones (gold → ember → lime), blurred,
 *    then warped by animated turbulence so they lick and flicker above the letters
 *  - letters: white-hot base → gold → ember, with slightly scorched, flickering edges
 * Animation is skipped when the visitor prefers reduced motion.
 */

const VIEW_W = 1200
const VIEW_H = 360
const BASELINE = 340
const FONT_SIZE = 292

type FlameLayer = { color: string; opacity: number; dy: number; blur: number; flicker: string }

// Inner → outer. Close to the letters the fire is hot gold; it cools to ember and burns out in lime.
const FLAME_LAYERS: FlameLayer[] = [
  { color: '#fff1b8', opacity: 0.9, dy: -3, blur: 2, flicker: '-3;-5;-2;-4;-3' },
  { color: '#f2c14e', opacity: 0.8, dy: -10, blur: 5, flicker: '-10;-14;-8;-12;-10' },
  { color: '#ff8a1a', opacity: 0.55, dy: -22, blur: 9, flicker: '-22;-28;-19;-26;-22' },
  { color: '#b6f23c', opacity: 0.5, dy: -44, blur: 14, flicker: '-44;-56;-38;-50;-44' },
]

export function FireWordmark({ text = 'HAMILIX', className }: { text?: string; className?: string }) {
  const reduceMotion = useReducedMotion()
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const id = (name: string) => `fire-${name}-${uid}`

  const textProps = {
    x: VIEW_W / 2,
    y: BASELINE,
    textAnchor: 'middle' as const,
    textLength: VIEW_W - 8,
    lengthAdjust: 'spacing' as const,
    style: {
      fontFamily: '"Space Grotesk", Inter, sans-serif',
      fontWeight: 700,
      fontSize: FONT_SIZE,
      letterSpacing: '-0.01em',
    },
  }

  const region = { filterUnits: 'userSpaceOnUse' as const, x: 0, y: 0, width: VIEW_W, height: VIEW_H }

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={cn('block h-auto w-full overflow-visible', className)}
      aria-hidden
    >
      <defs>
        {/* Letter fill: white-hot at the base, gold body, ember at the top. */}
        <linearGradient id={id('core')} gradientUnits="userSpaceOnUse" x1="0" y1={BASELINE} x2="0" y2={BASELINE - 210}>
          <stop offset="0%" stopColor="#fff4c4">
            {reduceMotion ? null : (
              <animate attributeName="stop-color" dur="1.6s" values="#fff4c4;#ffe08a;#fff4c4" repeatCount="indefinite" />
            )}
          </stop>
          <stop offset="35%" stopColor="#f2c14e" />
          <stop offset="75%" stopColor="#ff8a1a" />
          <stop offset="100%" stopColor="#d9ef55" />
        </linearGradient>

        {/* Flames: stacked, offset, blurred copies of the letters, then warped by noise. */}
        <filter id={id('flames')} {...region} colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="shape" />
          {FLAME_LAYERS.map((layer, i) => (
            <Fragment key={layer.color}>
              <feFlood floodColor={layer.color} floodOpacity={layer.opacity} />
              <feComposite in2="shape" operator="in" />
              <feOffset dx="0" dy={layer.dy}>
                {reduceMotion ? null : (
                  <animate
                    attributeName="dy"
                    dur={`${1.1 + i * 0.25}s`}
                    values={layer.flicker}
                    repeatCount="indefinite"
                  />
                )}
              </feOffset>
              <feGaussianBlur stdDeviation={layer.blur} result={`flame${i}`} />
            </Fragment>
          ))}
          <feMerge result="stack">
            {[...FLAME_LAYERS].reverse().map((_, i) => (
              <feMergeNode key={i} in={`flame${FLAME_LAYERS.length - 1 - i}`} />
            ))}
          </feMerge>
          <feTurbulence type="fractalNoise" baseFrequency="0.07 0.022" numOctaves="2" seed="4" result="noise">
            {reduceMotion ? null : (
              <animate
                attributeName="baseFrequency"
                dur="1.8s"
                values="0.07 0.022;0.08 0.03;0.065 0.018;0.075 0.026;0.07 0.022"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feDisplacementMap in="stack" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Scorched, flickering letter edges. */}
        <filter id={id('lick')} {...region}>
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.1" numOctaves="2" seed="9" result="noise">
            {reduceMotion ? null : (
              <animate
                attributeName="baseFrequency"
                dur="2.2s"
                values="0.02 0.1;0.025 0.13;0.018 0.09;0.02 0.1"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* Flames behind the letters */}
      <text {...textProps} fill="#000" filter={`url(#${id('flames')})`}>
        {text}
      </text>

      {/* Burning letters */}
      <text {...textProps} fill={`url(#${id('core')})`} filter={`url(#${id('lick')})`}>
        {text}
      </text>
    </svg>
  )
}
