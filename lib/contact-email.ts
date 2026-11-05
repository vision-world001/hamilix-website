import {
  EMAIL_COMPANY_NAME,
  type EmailTemplateParams,
  getEmailJSErrorMessage,
  sendTemplateEmail,
} from '@/lib/emailjs-client'

export type ContactFormValues = {
  name: string
  email: string
  phone: string
  message: string
}

export function buildContactEmailParams(values: ContactFormValues): EmailTemplateParams {
  return {
    from_name: values.name.trim(),
    from_email: values.email.trim(),
    from_phone: values.phone.trim() || 'Not provided',
    from_linkedin: 'Contact page inquiry',
    message: values.message.trim(),
    company_name: EMAIL_COMPANY_NAME,
    subject: `New contact message from ${values.name.trim()}`,
    position_title: 'General inquiry (Contact page)',
  }
}

export async function sendContactEmail(values: ContactFormValues): Promise<void> {
  await sendTemplateEmail(buildContactEmailParams(values))
}

export { getEmailJSErrorMessage }
