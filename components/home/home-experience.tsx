import { CtaBand } from '@/components/brand/cta-band'
import { HomeHero } from './hero'
import {
  BuildSection,
  EquationSection,
  ManifestoSection,
  PrinciplesSection,
  ProcessSection,
  TestimonialsSection,
  VerbsSection,
} from './home-sections'

export function HomeExperience() {
  return (
    <div className="relative">
      <HomeHero />
      <ManifestoSection />
      <VerbsSection />
      <EquationSection />
      <BuildSection />
      <PrinciplesSection />
      <ProcessSection />
      <TestimonialsSection />
      <CtaBand />
    </div>
  )
}
