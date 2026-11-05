import { ServicePage } from '@/components/brand/service-page'
import { ChainVisual } from '@/components/brand/visuals'
import { BLOCKCHAIN_PAGE } from '@/lib/content'
import { usePageTitle } from '@/lib/use-page-title'

export function BlockchainPage() {
  usePageTitle('Blockchain Engineering', 'Hamilix builds smart contracts, enterprise chains, tokenization, identity, and cross-chain infrastructure.')
  return <ServicePage content={BLOCKCHAIN_PAGE} visual={<ChainVisual />} />
}
