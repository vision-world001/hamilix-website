import { cn } from '@/lib/utils'

const PATHS = {
  brain: (
    <>
      <path d="M9 4.5a2.5 2.5 0 0 0-4.9.7A2.75 2.75 0 0 0 3 10.4a2.75 2.75 0 0 0 1.3 4.6A2.75 2.75 0 0 0 9 18.5V4.5Z" />
      <path d="M15 4.5a2.5 2.5 0 0 1 4.9.7A2.75 2.75 0 0 1 21 10.4a2.75 2.75 0 0 1-1.3 4.6A2.75 2.75 0 0 1 15 18.5V4.5Z" />
      <path d="M9 4.5c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2M9 18.5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 11.5h6" />
    </>
  ),
  cube: (
    <>
      <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" />
      <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8 19.5 6v5.6c0 4.6-3.1 8.4-7.5 9.6-4.4-1.2-7.5-5-7.5-9.6V6L12 2.8Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
  bolt: <path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12l1-8Z" />,
  layers: (
    <>
      <path d="M12 3 21 8l-9 5-9-5 9-5Z" />
      <path d="m3 12.5 9 5 9-5M3 16.5l9 5 9-5" />
    </>
  ),
  wallet: (
    <>
      <path d="M3.5 7.5A2.5 2.5 0 0 1 6 5h11.5v3" />
      <rect x="3.5" y="7.5" width="17" height="12" rx="2.5" />
      <path d="M16 13.5h1.5" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.6 0-2.7.8-2.7 2s1.2 1.6 2.7 2c1.6.4 2.7.9 2.7 2.1 0 1.2-1.1 2-2.7 2-1.1 0-2.1-.5-2.6-1.3M12 6.5V8m0 8v1.5" />
    </>
  ),
  card: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19M6.5 15h4" />
    </>
  ),
  vault: (
    <>
      <rect x="3" y="3.5" width="18" height="17" rx="2.5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 8v1.5M12 14.5V16M8 12h1.5M14.5 12H16M6 20.5v1.5M18 20.5v1.5" />
    </>
  ),
  exchange: <path d="M4 8h14m0 0-3.5-3.5M18 8l-3.5 3.5M20 16H6m0 0 3.5-3.5M6 16l3.5 3.5" />,
  chart: (
    <>
      <path d="M3.5 3.5v17h17" />
      <path d="m7 15 4-4.5 3 3 5.5-6" />
    </>
  ),
  code: <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15" />,
  network: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M11 6.9 6 16.1M13 6.9l5 9.2M7.2 18h9.6" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3.5 13.8 9 19.5 11l-5.7 2-1.8 5.5-1.8-5.5L4.5 11l5.7-2L12 3.5Z" />
      <path d="M19 3v3M17.5 4.5h3M5 17.5v3M3.5 19h3" />
    </>
  ),
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5S9.7 5.9 12 3.5Z" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5" />
      <path d="M16 4.8a3.3 3.3 0 0 1 0 6.4M18.5 14.8c1.7.7 2.8 2.4 3 5.2" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H16a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h7.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M14 4.5c3-1.5 5.5-1.5 5.5-1.5s0 2.5-1.5 5.5L12 14.5 9.5 12l4.5-7.5Z" />
      <path d="M9.5 12 6 11.5 8.5 8h4M12 14.5l.5 3.5 3.5-2.5v-4M6.5 17.5 4 20" />
    </>
  ),
  document: (
    <>
      <path d="M6 2.5h8l4.5 4.5v14.5H6V2.5Z" />
      <path d="M14 2.5V7h4.5M9 12h6M9 16h6" />
    </>
  ),
  plug: (
    <>
      <path d="M9 2.5v5M15 2.5v5M6.5 7.5h11V11a5.5 5.5 0 0 1-11 0V7.5Z" />
      <path d="M12 16.5v5" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 17a8.5 8.5 0 1 1 16 0" />
      <path d="m12 13 4-4.5" />
      <circle cx="12" cy="13" r="1.4" />
    </>
  ),
} as const

export type IconName = keyof typeof PATHS

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-5 w-5', className)}
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  )
}
