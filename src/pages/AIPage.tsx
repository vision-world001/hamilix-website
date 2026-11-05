import { ServicePage } from '@/components/brand/service-page'
import { AiConsoleVisual } from '@/components/brand/visuals'
import { AI_PAGE } from '@/lib/content'
import { usePageTitle } from '@/lib/use-page-title'

export function AIPage() {
  usePageTitle('AI Engineering', 'Hamilix Labs builds production AI — LLM agents, RAG, model routing, evals, and automation.')
  return <ServicePage content={AI_PAGE} visual={<AiConsoleVisual />} />
}
