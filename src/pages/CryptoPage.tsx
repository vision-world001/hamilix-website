import { ServicePage } from '@/components/brand/service-page'
import { CheckoutVisual } from '@/components/brand/visuals'
import { CRYPTO_PAGE } from '@/lib/content'
import { usePageTitle } from '@/lib/use-page-title'

export function CryptoPage() {
  usePageTitle('Crypto Platforms', 'Hamilix Labs builds token, wallet, payment gateway, custody, exchange, and treasury systems.')
  return <ServicePage content={CRYPTO_PAGE} visual={<CheckoutVisual />} />
}
