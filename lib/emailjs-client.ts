import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

let initialized = false

function initEmailJS() {
  if (initialized || !PUBLIC_KEY) return
  emailjs.init({ publicKey: PUBLIC_KEY })
  initialized = true
}

export type EmailTemplateParams = {
  from_name: string
  from_email: string
  from_phone: string
  from_linkedin: string
  message: string
  /** Shown as the sender/company in the EmailJS template ({{company_name}}). */
  company_name?: string
  /** Optional subject line ({{subject}}). */
  subject?: string
  /** Job application details — empty for contact-page messages. */
  position_title?: string
  position_id?: string
  position_team?: string
  employment_type?: string
  position_location?: string
  position_compensation?: string
  position_url?: string
}

export const EMAIL_COMPANY_NAME = 'Hamilix Labs'

export function getEmailJSErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'text' in error) {
    const text = String((error as { text: unknown }).text)
    if (text) return text
  }
  if (error instanceof Error && error.message) return error.message
  if (typeof error === 'string' && error) return error
  return 'Something went wrong. Please try again.'
}

export async function sendTemplateEmail(params: EmailTemplateParams): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      'Email service is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env file.',
    )
  }

  initEmailJS()

  const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, {
    publicKey: PUBLIC_KEY,
  })

  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.text || 'Email could not be sent.')
  }
}
