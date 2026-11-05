import { Kicker } from '@/components/brand/kinetic'
import { GiantVerb } from '@/components/brand/service-page'
import { Reveal } from '@/components/motion/reveal'
import { ContactPanel } from '@/components/sections/contact-panel'
import { Section } from '@/components/ui/section'
import { CONTACT_PAGE, FOOTER, SITE } from '@/lib/content'
import { usePageTitle } from '@/lib/use-page-title'

export function ContactPage() {
  usePageTitle('Contact', 'Talk to the Hamilix Labs engineering team about your AI or blockchain project.')

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hx-grid-bg pointer-events-none absolute inset-0" aria-hidden />
        <div className="hx-glow-gold pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] blur-3xl" aria-hidden />
        <div className="hx-container relative z-10 pb-14 pt-12 md:pt-16">
          <Reveal>
            <Kicker>{CONTACT_PAGE.hero.eyebrow}</Kicker>
            <h1 className="sr-only">Contact Hamilix Labs</h1>
            <GiantVerb word="HELLO." tone="lime" className="mt-6" />
            <p className="hx-big mt-8" aria-hidden>
              Let&apos;s build something <span className="hx-gradient-text">excellent.</span>
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-0 md:pt-0">
        <ContactPanel
          phone={SITE.phone}
          phoneHref={SITE.phoneHref}
          email={SITE.email}
          addresses={FOOTER.addresses}
          social={CONTACT_PAGE.social}
          badge={CONTACT_PAGE.panel.badge}
          title={CONTACT_PAGE.panel.title}
          submitLabel={CONTACT_PAGE.panel.submitLabel}
          submitSuccessTitle={CONTACT_PAGE.panel.submitSuccessTitle}
          submitSuccessMessage={CONTACT_PAGE.panel.submitSuccessMessage}
        />
      </Section>
    </>
  )
}
