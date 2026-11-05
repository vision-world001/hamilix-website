/**
 * Careers data model + formatting helpers.
 *
 * HOW TO ADD / EDIT A ROLE (see OPEN_POSITIONS in lib/content.ts):
 *
 *   {
 *     id: 'senior-solidity-engineer',          // URL slug: /careers/senior-solidity-engineer
 *     title: 'Senior Solidity Engineer',
 *     team: 'Engineering',                     // used for the filter chips on /careers
 *     locations: ['Remote / Global'],          // one or more, e.g. ['United States', 'Europe', 'Singapore']
 *     engagements: [                           // one entry per employment type, each with its own pay
 *       { type: 'Full-time', compensation: { min: 180000, max: 240000, period: 'year' } },
 *       { type: 'Part-time', compensation: { min: 120, max: 160, period: 'hour' } },
 *       { type: 'Contract' },                  // compensation is optional → shown as "Negotiable"
 *     ],
 *     summary: '...', about: '...', responsibilities: [...], requirements: [...],
 *   }
 *
 * If a role has more than one location or employment type, the candidate is asked to pick
 * one in the application form, and the chosen values are included in the email you receive.
 */

export const EMPLOYMENT_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship',
] as const

export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number]

export type PayPeriod = 'hour' | 'day' | 'week' | 'month' | 'year'

export type Compensation = {
  min: number
  /** Omit for a single fixed amount, e.g. "$200 / hr". */
  max?: number
  /** ISO currency code. Defaults to USD. */
  currency?: string
  period: PayPeriod
}

export type JobEngagement = {
  type: EmploymentType
  /** Omit when pay is negotiable / not published. */
  compensation?: Compensation
}

export type OpenPosition = {
  id: string
  title: string
  team: string
  locations: readonly string[]
  engagements: readonly JobEngagement[]
  summary: string
  about: string
  responsibilities: readonly string[]
  requirements: readonly string[]
}

const PERIOD_LABEL: Record<PayPeriod, string> = {
  hour: 'hr',
  day: 'day',
  week: 'wk',
  month: 'mo',
  year: 'yr',
}

export const NEGOTIABLE_LABEL = 'Negotiable'

function formatAmount(value: number, currency: string): string {
  const compact = value >= 10000
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,
  })
    .format(value)
    .replace('K', 'k')
}

/** "$220k – $320k / yr", "$180 – $250 / hr", or "Negotiable". */
export function formatCompensation(compensation?: Compensation): string {
  if (!compensation) return NEGOTIABLE_LABEL
  const currency = compensation.currency ?? 'USD'
  const min = formatAmount(compensation.min, currency)
  const range =
    compensation.max !== undefined && compensation.max !== compensation.min
      ? `${min} – ${formatAmount(compensation.max, currency)}`
      : min
  return `${range} / ${PERIOD_LABEL[compensation.period]}`
}

export function getEmploymentTypes(job: OpenPosition): EmploymentType[] {
  return job.engagements.map((engagement) => engagement.type)
}

export function getEngagement(
  job: OpenPosition,
  type: EmploymentType | string,
): JobEngagement | undefined {
  return job.engagements.find((engagement) => engagement.type === type)
}

/** Short one-line summary for listing cards: "Remote / Global · Full-time / Part-time". */
export function formatJobMeta(job: OpenPosition): string {
  return [job.locations.join(', '), getEmploymentTypes(job).join(' / ')]
    .filter(Boolean)
    .join(' · ')
}
