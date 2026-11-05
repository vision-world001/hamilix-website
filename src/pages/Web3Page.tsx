import { ServicePage } from '@/components/brand/service-page'
import { StackVisual } from '@/components/brand/visuals'
import { WEB3_PAGE } from '@/lib/content'
import { usePageTitle } from '@/lib/use-page-title'

export function Web3Page() {
  usePageTitle('Web3 Products', 'Hamilix builds dApps, wallet integration, Web3 auth, on-chain indexing, and DAO systems.')
  return <ServicePage content={WEB3_PAGE} visual={<StackVisual />} />
}
