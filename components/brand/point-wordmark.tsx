import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * "HAMILIX" drawn with points: the word is sampled into a dot grid, each dot coloured
 * like fire (white-hot base → blockchain gold → ember → AI lime tips) and twinkling,
 * while small ember points rise off the top edges of the letters.
 *
 * Canvas-based, DPR-aware, paused while off-screen; static when reduced motion is preferred.
 */

const ASPECT = 5 // width : height, leaves a little headroom above the letters for rising embers
const FONT_FAMILY = '"Space Grotesk", Inter, sans-serif'

type Dot = { x: number; y: number; r: number; t: number; phase: number; speed: number; edge: boolean }
type Ember = { x: number; y: number; vy: number; vx: number; life: number; max: number; r: number }

// Fire ramp sampled by t ∈ [0 (letter base) … 1 (letter top)].
const RAMP: [number, [number, number, number]][] = [
  [0, [255, 244, 196]],
  [0.3, [242, 193, 78]],
  [0.68, [255, 138, 26]],
  [1, [182, 242, 60]],
]

function rampColor(t: number): [number, number, number] {
  const k = Math.min(1, Math.max(0, t))
  for (let i = 1; i < RAMP.length; i++) {
    const [p1, c1] = RAMP[i]
    const [p0, c0] = RAMP[i - 1]
    if (k <= p1) {
      const f = (k - p0) / (p1 - p0)
      return [c0[0] + (c1[0] - c0[0]) * f, c0[1] + (c1[1] - c0[1]) * f, c0[2] + (c1[2] - c0[2]) * f]
    }
  }
  return RAMP[RAMP.length - 1][1]
}

function buildDots(text: string, width: number, height: number) {
  const off = document.createElement('canvas')
  off.width = Math.max(1, Math.round(width))
  off.height = Math.max(1, Math.round(height))
  const ctx = off.getContext('2d', { willReadFrequently: true })
  if (!ctx) return { dots: [] as Dot[], step: 4 }

  // Fit the word to ~99% of the width.
  ctx.font = `700 100px ${FONT_FAMILY}`
  const measured = ctx.measureText(text).width || 1
  const fontSize = (100 * width * 0.99) / measured
  ctx.font = `700 ${fontSize}px ${FONT_FAMILY}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  const metrics = ctx.measureText(text)
  const capTop = metrics.actualBoundingBoxAscent || fontSize * 0.7
  const baseline = height - Math.max(2, height * 0.02)
  ctx.fillStyle = '#fff'
  ctx.fillText(text, width / 2, baseline)

  const { data } = ctx.getImageData(0, 0, off.width, off.height)
  const step = Math.max(4, Math.round(width / 230))
  const filled = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < off.width && y < off.height && data[(Math.round(y) * off.width + Math.round(x)) * 4 + 3] > 128

  const dots: Dot[] = []
  const top = baseline - capTop
  for (let y = step / 2; y < off.height; y += step) {
    for (let x = step / 2; x < off.width; x += step) {
      if (!filled(x, y)) continue
      dots.push({
        x,
        y,
        r: step * (0.3 + Math.random() * 0.08),
        t: (baseline - y) / (baseline - top),
        phase: Math.random() * Math.PI * 2,
        speed: 1.2 + Math.random() * 2.2,
        edge: !filled(x, y - step),
      })
    }
  }
  return { dots, step }
}

export function PointWordmark({ text = 'HAMILIX', className }: { text?: string; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let dots: Dot[] = []
    let edgeDots: Dot[] = []
    let step = 4
    let embers: Ember[] = []
    let cssW = 0
    let cssH = 0
    let raf = 0
    let visible = true
    let cancelled = false

    const layout = () => {
      cssW = wrap.clientWidth
      cssH = cssW / ASPECT
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(cssW * dpr)
      canvas.height = Math.round(cssH * dpr)
      canvas.style.height = `${cssH}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const built = buildDots(text, cssW, cssH)
      dots = built.dots
      step = built.step
      edgeDots = dots.filter((d) => d.edge)
      embers = []
    }

    const spawnEmber = () => {
      const src = edgeDots[(Math.random() * edgeDots.length) | 0]
      if (!src) return
      const max = 50 + Math.random() * 70
      embers.push({
        x: src.x + (Math.random() - 0.5) * step,
        y: src.y - step * 0.5,
        vy: -(0.25 + Math.random() * 0.6) * (step / 4),
        vx: (Math.random() - 0.5) * 0.25,
        life: 0,
        max,
        r: step * (0.18 + Math.random() * 0.14),
      })
    }

    const draw = (time: number) => {
      const s = time / 1000
      ctx.clearRect(0, 0, cssW, cssH)
      ctx.globalCompositeOperation = 'lighter'

      for (const d of dots) {
        const [r, g, b] = rampColor(d.t + Math.sin(s * 0.8 + d.x * 0.01) * 0.06)
        const flicker = reduceMotion ? 0.85 : 0.55 + 0.45 * Math.sin(s * d.speed + d.phase)
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${0.35 + flicker * 0.65})`
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r * (0.85 + flicker * 0.25), 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduceMotion) {
        const target = Math.min(220, Math.round(edgeDots.length * 0.35))
        for (let i = 0; i < 4 && embers.length < target; i++) spawnEmber()
        embers = embers.filter((e) => e.life < e.max)
        for (const e of embers) {
          e.life += 1
          e.x += e.vx + Math.sin((e.life + e.x) * 0.08) * 0.25
          e.y += e.vy
          const k = e.life / e.max
          const [r, g, b] = rampColor(0.55 + k * 0.45)
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${(1 - k) * 0.85})`
          ctx.beginPath()
          ctx.arc(e.x, e.y, e.r * (1 - k * 0.5), 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    const loop = (time: number) => {
      draw(time)
      if (visible && !reduceMotion) raf = requestAnimationFrame(loop)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(loop)
    }

    // Wait for the display font so the dots trace the real letterforms.
    const fontReady = document.fonts?.load(`700 100px ${FONT_FAMILY}`).catch(() => undefined) ?? Promise.resolve()
    void fontReady.then(() => {
      if (cancelled) return
      layout()
      start()
    })

    const ro = new ResizeObserver(() => {
      if (Math.abs(wrap.clientWidth - cssW) < 1) return
      layout()
      start()
    })
    ro.observe(wrap)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else cancelAnimationFrame(raf)
    })
    io.observe(wrap)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [text, reduceMotion])

  return (
    <div ref={wrapRef} className={cn('w-full', className)} aria-hidden>
      <canvas ref={canvasRef} className="block w-full" />
    </div>
  )
}
