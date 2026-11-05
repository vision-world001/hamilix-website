import {
  type EmailTemplateParams,
  getEmailJSErrorMessage,
  sendTemplateEmail,
} from '@/lib/emailjs-client'

export type JobApplicationEmailParams = EmailTemplateParams

export function buildJobApplicationEmailParams(
  values: {
    fullName: string
    email: string
    phoneNumber: string
    portfolio: string
    whyRole: string
  },
  jobTitle: string,
): JobApplicationEmailParams {
  const note = values.whyRole.trim()

  return {
    from_name: values.fullName.trim(),
    from_email: values.email.trim(),
    from_phone: values.phoneNumber.trim(),
    from_linkedin: values.portfolio.trim(),
    message: note || `Application for ${jobTitle}`,
  }
}

export async function sendJobApplicationEmail(
  params: JobApplicationEmailParams,
): Promise<void> {
  await sendTemplateEmail(params)
}

export { getEmailJSErrorMessage }
