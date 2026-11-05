import {
  EMAIL_COMPANY_NAME,
  type EmailTemplateParams,
  getEmailJSErrorMessage,
  sendTemplateEmail,
} from '@/lib/emailjs-client'
import { type OpenPosition, formatCompensation, getEngagement } from '@/lib/careers'

export type JobApplicationEmailParams = EmailTemplateParams

export function buildJobApplicationEmailParams(
  values: {
    fullName: string
    email: string
    phoneNumber: string
    portfolio: string
    whyRole: string
    employmentType: string
    location: string
  },
  job: OpenPosition,
): JobApplicationEmailParams {
  const note = values.whyRole.trim()
  const engagement = getEngagement(job, values.employmentType)
  const compensation = formatCompensation(engagement?.compensation)
  const positionUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/careers/${job.id}` : `/careers/${job.id}`

  // Position details are placed at the top of {{message}} so they appear in the email
  // even with the existing EmailJS template. They are also sent as separate variables
  // ({{position_title}}, {{employment_type}}, ...) for use in an updated template.
  const message = [
    `APPLIED POSITION: ${job.title}`,
    `Employment type: ${values.employmentType}`,
    `Location: ${values.location}`,
    `Compensation range: ${compensation}`,
    `Team: ${job.team}`,
    `Job link: ${positionUrl}`,
    '',
    'Why this role:',
    note || '(not provided)',
  ].join('\n')

  return {
    from_name: values.fullName.trim(),
    from_email: values.email.trim(),
    from_phone: values.phoneNumber.trim(),
    from_linkedin: values.portfolio.trim(),
    message,
    company_name: EMAIL_COMPANY_NAME,
    subject: `Job application: ${job.title} (${values.employmentType}) — ${values.fullName.trim()}`,
    position_title: job.title,
    position_id: job.id,
    position_team: job.team,
    employment_type: values.employmentType,
    position_location: values.location,
    position_compensation: compensation,
    position_url: positionUrl,
  }
}

export async function sendJobApplicationEmail(
  params: JobApplicationEmailParams,
): Promise<void> {
  await sendTemplateEmail(params)
}

export { getEmailJSErrorMessage }
