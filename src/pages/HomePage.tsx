import { HomeExperience } from '@/components/home/home-experience'
import { usePageTitle } from '@/lib/use-page-title'

export function HomePage() {
  usePageTitle(
    '',
    'Hamilix Labs designs, builds, and launches production-grade AI systems and blockchain platforms — from LLM agents and RAG to smart contracts, tokenization, and crypto payments.',
  )

  return <HomeExperience />
}
