import { ContactPanelForm } from '@/components/sections/contact-panel-form'
import { ContactPanelInfo } from '@/components/sections/contact-panel-info'
import { Reveal } from '@/components/motion/reveal'
import type { SocialLinkItem } from '@/components/ui/social-links'

type ContactPanelProps = {
  phone: string
  phoneHref: string
  email: string
  addresses: readonly string[]
  social: readonly SocialLinkItem[]
  badge: string
  title: string
  submitLabel: string
  submitSuccessTitle: string
  submitSuccessMessage: string
}

export function ContactPanel({
  phone,
  phoneHref,
  email,
  addresses,
  social,
  badge,
  title,
  submitLabel,
  submitSuccessTitle,
  submitSuccessMessage,
}: ContactPanelProps) {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-2xl border border-[#2a2a2e] bg-[#0a0a0a]">
        <div className="grid lg:grid-cols-2">
          <ContactPanelInfo
            phone={phone}
            phoneHref={phoneHref}
            email={email}
            addresses={addresses}
            social={social}
          />
          <ContactPanelForm
            badge={badge}
            title={title}
            submitLabel={submitLabel}
            submitSuccessTitle={submitSuccessTitle}
            submitSuccessMessage={submitSuccessMessage}
          />
        </div>
      </div>
    </Reveal>
  )
}
