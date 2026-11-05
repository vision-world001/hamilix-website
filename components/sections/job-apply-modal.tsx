import { FormEvent, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { MOTION_EASE } from '@/components/motion/tokens'
import { formatCompensation } from '@/lib/careers'
import { CAREERS_APPLY } from '@/lib/content'
import type { OpenPosition } from '@/lib/content'
import {
  buildJobApplicationEmailParams,
  getEmailJSErrorMessage,
  sendJobApplicationEmail,
} from '@/lib/job-application-email'
import { cn } from '@/lib/utils'

const TOAST_DURATION_MS = 5000

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type ToastNotification = {
  type: 'success' | 'error'
  title: string
  message: string
}

function ApplyToast({
  notification,
  onDismiss,
}: {
  notification: ToastNotification
  onDismiss: () => void
}) {
  const isError = notification.type === 'error'

  useEffect(() => {
    const timer = window.setTimeout(onDismiss, TOAST_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [notification, onDismiss])

  return (
    <m.div
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      initial={{ opacity: 0, x: 24, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 16, scale: 0.98 }}
      transition={{ duration: 0.35, ease: MOTION_EASE }}
      className="fixed bottom-6 right-6 z-[110] w-[min(24rem,calc(100vw-2rem))]"
    >
      <div
        className={cn(
          'flex items-start gap-3 rounded-xl border bg-[#141416] p-4 shadow-accent-glow-sm md:p-5',
          isError ? 'border-red-400/35' : 'border-accent/35',
        )}
      >
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
            isError ? 'bg-red-400/15 text-red-400' : 'bg-accent/15 text-accent',
          )}
        >
          {isError ? <AlertIcon className="h-5 w-5" /> : <CheckIcon className="h-5 w-5" />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-foreground">{notification.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{notification.message}</p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-md p-1 text-muted transition-colors hover:text-foreground"
          aria-label="Dismiss notification"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
            <path
              d="M5 5l10 10M15 5 5 15"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </m.div>
  )
}

const RESUME_EXTENSIONS = ['pdf', 'doc', 'docx'] as const
const RESUME_ACCEPT = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
const MAX_RESUME_BYTES = CAREERS_APPLY.maxResumeSizeMb * 1024 * 1024
const MAX_WHY_LENGTH = 2000

type FormValues = {
  fullName: string
  email: string
  phoneNumber: string
  portfolio: string
  whyRole: string
  employmentType: string
  location: string
}

function initialFormValues(job: OpenPosition): FormValues {
  return {
    fullName: '',
    email: '',
    phoneNumber: '',
    portfolio: '',
    whyRole: '',
    employmentType: job.engagements.length === 1 ? job.engagements[0].type : '',
    location: job.locations.length === 1 ? job.locations[0] : '',
  }
}

type FormErrors = Partial<Record<keyof FormValues | 'resume', string>>

type JobApplyModalProps = {
  job: OpenPosition
  open: boolean
  onClose: () => void
}

function validateFullName(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Full name is required.'
  if (trimmed.length < 2) return 'Please enter your full name.'
  if (trimmed.length > 80) return 'Name must be 80 characters or fewer.'
  if (!/^[\p{L}\p{M}'.\-\s]+$/u.test(trimmed)) return 'Please enter a valid name.'
  return null
}

function validateEmail(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Email address is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return 'Please enter a valid email address.'
  return null
}

function validatePhoneNumber(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Phone number is required.'
  const digits = trimmed.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) return 'Please enter a valid phone number.'
  return null
}

const LINKEDIN_PROFILE_PREFIX = 'https://www.linkedin.com/in/'

function normalizeLinkedInUrl(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null

  let candidate = trimmed
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`
  }

  try {
    const url = new URL(candidate)
    const hostname = url.hostname.toLowerCase().replace(/^www\./, '')
    if (hostname !== 'linkedin.com') return null
    if (!url.pathname.toLowerCase().startsWith('/in/')) return null

    const slug = url.pathname.slice('/in/'.length).replace(/\/$/, '')
    if (!slug || !/^[\w%-]+$/i.test(slug)) return null

    return `${LINKEDIN_PROFILE_PREFIX}${slug}`
  } catch {
    return null
  }
}

function validatePortfolio(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'LinkedIn profile link is required.'
  if (!normalizeLinkedInUrl(trimmed)) {
    return 'Please enter a valid LinkedIn profile URL (e.g. linkedin.com/in/your-profile).'
  }
  return null
}

function validateWhyRole(value: string): string | null {
  if (value.length > MAX_WHY_LENGTH) {
    return `Please keep your response under ${MAX_WHY_LENGTH} characters.`
  }
  return null
}

function validateResume(file: File | null): string | null {
  if (!file) return null

  const extension = file.name.split('.').pop()?.toLowerCase()
  if (!extension || !RESUME_EXTENSIONS.includes(extension as (typeof RESUME_EXTENSIONS)[number])) {
    return 'Please upload a PDF, DOC, or DOCX file.'
  }

  if (file.size > MAX_RESUME_BYTES) {
    return `File size must be ${CAREERS_APPLY.maxResumeSizeMb} MB or less.`
  }

  return null
}

function ModalOverlay({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: MOTION_EASE }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden
      />
      {children}
    </m.div>
  )
}

const modalPanelClass =
  'relative z-[101] w-full overflow-hidden rounded-2xl border border-border bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.55)]'

const modalMotion = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: 0.3, ease: MOTION_EASE },
} as const

function ModalHeader({
  jobTitle,
  onClose,
  showClose,
}: {
  jobTitle: string
  onClose?: () => void
  showClose: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5 md:px-7">
      <div className="min-w-0">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
          {CAREERS_APPLY.modalEyebrow}
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {jobTitle}
        </h2>
      </div>
      {showClose && onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-md p-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
          aria-label="Close application form"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden>
            <path
              d="M5 5l10 10M15 5 5 15"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : (
        <span className="h-8 w-8 shrink-0" aria-hidden />
      )}
    </div>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-xs text-red-400" role="alert">
      {message}
    </p>
  )
}

function ApplicationFormModal({
  job,
  onClose,
  onNotify,
}: {
  job: OpenPosition
  onClose: () => void
  onNotify: (notification: ToastNotification) => void
}) {
  const resumeInputId = useId()
  const [values, setValues] = useState<FormValues>(() => initialFormValues(job))
  const [resume, setResume] = useState<File | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const closeTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  const inputClass = (hasError: boolean) =>
    cn(
      'mt-2 w-full rounded-lg border bg-[#141416] px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/40',
      hasError ? 'border-red-400/70' : 'border-border focus:border-accent/40',
    )

  function validateForm(): FormErrors {
    const next: FormErrors = {}
    const fullNameError = validateFullName(values.fullName)
    const emailError = validateEmail(values.email)
    const phoneError = validatePhoneNumber(values.phoneNumber)
    const portfolioError = validatePortfolio(values.portfolio)
    const whyError = validateWhyRole(values.whyRole)
    const resumeError = validateResume(resume)

    if (fullNameError) next.fullName = fullNameError
    if (emailError) next.email = emailError
    if (phoneError) next.phoneNumber = phoneError
    if (portfolioError) next.portfolio = portfolioError
    if (whyError) next.whyRole = whyError
    if (resumeError) next.resume = resumeError
    if (!values.employmentType) next.employmentType = 'Please choose an employment type.'
    if (!values.location) next.location = 'Please choose your preferred location.'

    return next
  }

  function resetForm() {
    setValues(initialFormValues(job))
    setResume(null)
    setErrors({})
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateForm()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const firstError = Object.values(nextErrors).find(Boolean)
      if (firstError) {
        onNotify({
          type: 'error',
          title: 'Please fix the form',
          message: firstError,
        })
      }
      return
    }

    setSubmitting(true)

    const linkedinUrl = normalizeLinkedInUrl(values.portfolio) ?? values.portfolio.trim()

    try {
      await sendJobApplicationEmail(
        buildJobApplicationEmailParams(
          { ...values, portfolio: linkedinUrl },
          job,
        ),
      )
      resetForm()
      onNotify({
        type: 'success',
        title: CAREERS_APPLY.successTitle,
        message: `${CAREERS_APPLY.successMessageBefore} ${job.title} (${values.employmentType}). ${CAREERS_APPLY.successMessageAfter}`,
      })
      closeTimerRef.current = window.setTimeout(() => {
        onClose()
      }, 600)
    } catch (error) {
      onNotify({
        type: 'error',
        title: 'Submission failed',
        message: getEmailJSErrorMessage(error),
      })
    } finally {
      setSubmitting(false)
    }
  }

  function handleResumeChange(file: File | null) {
    setResume(file)
    const resumeError = validateResume(file)
    setErrors((current) => ({ ...current, resume: resumeError ?? undefined }))
  }

  return (
    <ModalOverlay>
      <m.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-apply-title"
        {...modalMotion}
        className={cn(modalPanelClass, 'flex max-h-[min(90vh,820px)] max-w-lg flex-col')}
      >
        <ModalHeader jobTitle={job.title} onClose={onClose} showClose />

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
          noValidate
        >
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-5 md:px-7">
            {job.engagements.length > 1 ? (
              <fieldset>
                <legend className="text-sm text-muted">
                  Employment type <span className="text-red-400">*</span>
                </legend>
                <div
                  className="mt-2 grid gap-2 sm:grid-cols-2"
                  role="radiogroup"
                  aria-describedby={errors.employmentType ? 'apply-type-error' : undefined}
                >
                  {job.engagements.map((engagement) => {
                    const selected = values.employmentType === engagement.type
                    return (
                      <label
                        key={engagement.type}
                        className={cn(
                          'flex cursor-pointer flex-col rounded-lg border bg-[#141416] px-4 py-3 transition-colors',
                          selected
                            ? 'border-accent/60 ring-2 ring-accent/30'
                            : errors.employmentType
                              ? 'border-red-400/70'
                              : 'border-border hover:border-accent/30',
                        )}
                      >
                        <input
                          type="radio"
                          name="employmentType"
                          value={engagement.type}
                          checked={selected}
                          onChange={() => {
                            setValues((current) => ({ ...current, employmentType: engagement.type }))
                            setErrors((current) => ({ ...current, employmentType: undefined }))
                          }}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium text-foreground">{engagement.type}</span>
                        <span className="mt-0.5 font-mono text-xs text-muted">
                          {formatCompensation(engagement.compensation)}
                        </span>
                      </label>
                    )
                  })}
                </div>
                <FieldError id="apply-type-error" message={errors.employmentType} />
              </fieldset>
            ) : null}

            {job.locations.length > 1 ? (
              <div>
                <label htmlFor="apply-location" className="text-sm text-muted">
                  Preferred location <span className="text-red-400">*</span>
                </label>
                <select
                  id="apply-location"
                  name="location"
                  value={values.location}
                  onChange={(event) => {
                    setValues((current) => ({ ...current, location: event.target.value }))
                    if (errors.location) setErrors((current) => ({ ...current, location: undefined }))
                  }}
                  className={inputClass(Boolean(errors.location))}
                  aria-invalid={Boolean(errors.location)}
                  aria-describedby={errors.location ? 'apply-location-error' : undefined}
                >
                  <option value="" disabled>
                    Select a location
                  </option>
                  {job.locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <FieldError id="apply-location-error" message={errors.location} />
              </div>
            ) : null}

            <div>
              <label htmlFor="apply-full-name" className="text-sm text-muted">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                id="apply-full-name"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                value={values.fullName}
                onChange={(event) => {
                  setValues((current) => ({ ...current, fullName: event.target.value }))
                  if (errors.fullName) setErrors((current) => ({ ...current, fullName: undefined }))
                }}
                className={inputClass(Boolean(errors.fullName))}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'apply-full-name-error' : undefined}
              />
              <FieldError id="apply-full-name-error" message={errors.fullName} />
            </div>

            <div>
              <label htmlFor="apply-email" className="text-sm text-muted">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                id="apply-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@example.com"
                value={values.email}
                onChange={(event) => {
                  setValues((current) => ({ ...current, email: event.target.value }))
                  if (errors.email) setErrors((current) => ({ ...current, email: undefined }))
                }}
                className={inputClass(Boolean(errors.email))}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'apply-email-error' : undefined}
              />
              <FieldError id="apply-email-error" message={errors.email} />
            </div>

            <div>
              <label htmlFor="apply-phone" className="text-sm text-muted">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                id="apply-phone"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                placeholder="+1 (555) 000-0000"
                value={values.phoneNumber}
                onChange={(event) => {
                  setValues((current) => ({ ...current, phoneNumber: event.target.value }))
                  if (errors.phoneNumber) setErrors((current) => ({ ...current, phoneNumber: undefined }))
                }}
                className={inputClass(Boolean(errors.phoneNumber))}
                aria-invalid={Boolean(errors.phoneNumber)}
                aria-describedby={errors.phoneNumber ? 'apply-phone-error' : undefined}
              />
              <FieldError id="apply-phone-error" message={errors.phoneNumber} />
            </div>

            <div>
              <label htmlFor="apply-portfolio" className="text-sm text-muted">
                LinkedIn <span className="text-red-400">*</span>
              </label>
              <p className="mt-1 text-xs text-muted/80">{CAREERS_APPLY.linkedinHint}</p>
              <input
                id="apply-portfolio"
                name="portfolio"
                type="url"
                placeholder="https://www.linkedin.com/in/your-profile"
                value={values.portfolio}
                onChange={(event) => {
                  setValues((current) => ({ ...current, portfolio: event.target.value }))
                  if (errors.portfolio) setErrors((current) => ({ ...current, portfolio: undefined }))
                }}
                className={cn(inputClass(Boolean(errors.portfolio)), 'mt-2')}
                aria-invalid={Boolean(errors.portfolio)}
                aria-describedby={errors.portfolio ? 'apply-portfolio-error' : undefined}
              />
              <FieldError id="apply-portfolio-error" message={errors.portfolio} />
            </div>

            <div>
              <span className="text-sm text-muted">
                Resume / CV <span className="text-muted/70">(optional)</span>
              </span>
              <input
                ref={fileInputRef}
                id={resumeInputId}
                type="file"
                accept={RESUME_ACCEPT}
                className="sr-only"
                onChange={(event) => handleResumeChange(event.target.files?.[0] ?? null)}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  'mt-2 flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-6 text-center transition-colors hover:border-accent/35 hover:bg-surface/40',
                  errors.resume ? 'border-red-400/70' : 'border-border',
                )}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-muted" aria-hidden>
                  <path
                    d="M12 16V4m0 0 8-4-4 4m0 0 4 4M4 18v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm text-muted">
                  {resume ? resume.name : CAREERS_APPLY.resumeHint}
                </span>
              </button>
              <FieldError id="apply-resume-error" message={errors.resume} />
            </div>

            <div>
              <label htmlFor="apply-why-role" className="text-sm text-muted">
                Why this role? <span className="text-muted/70">(optional)</span>
              </label>
              <textarea
                id="apply-why-role"
                name="whyRole"
                rows={4}
                placeholder="Tell us what excites you about this position..."
                value={values.whyRole}
                onChange={(event) => {
                  setValues((current) => ({ ...current, whyRole: event.target.value }))
                  if (errors.whyRole) setErrors((current) => ({ ...current, whyRole: undefined }))
                }}
                className={cn(inputClass(Boolean(errors.whyRole)), 'resize-none')}
                aria-invalid={Boolean(errors.whyRole)}
                aria-describedby={errors.whyRole ? 'apply-why-role-error' : undefined}
              />
              <FieldError id="apply-why-role-error" message={errors.whyRole} />
            </div>
          </div>

          <div className="border-t border-border px-6 py-5 md:px-7">
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full rounded-full font-semibold uppercase tracking-[0.1em]"
            >
              {submitting ? 'Submitting…' : CAREERS_APPLY.submitLabel}
              {!submitting ? <span aria-hidden>→</span> : null}
            </Button>
          </div>
        </form>
      </m.div>
    </ModalOverlay>
  )
}

export function JobApplyModal({ job, open, onClose }: JobApplyModalProps) {
  const [toast, setToast] = useState<ToastNotification | null>(null)

  useEffect(() => {
    if (!open) return
    setToast(null)
  }, [open, job.id])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  function dismissToast() {
    setToast(null)
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <>
      <AnimatePresence mode="wait">
        {open ? (
          <ApplicationFormModal
            key={`apply-form-${job.id}`}
            job={job}
            onClose={onClose}
            onNotify={setToast}
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {toast ? (
          <ApplyToast key={`${toast.type}-${toast.title}`} notification={toast} onDismiss={dismissToast} />
        ) : null}
      </AnimatePresence>
    </>,
    document.body,
  )
}

export function JobApplyButton({
  job,
  className,
}: {
  job: OpenPosition
  className?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button type="button" size="lg" className={className} onClick={() => setOpen(true)}>
        {CAREERS_APPLY.buttonLabel}
      </Button>
      <JobApplyModal job={job} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
