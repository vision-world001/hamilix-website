import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ScrollToTopButton, ScrollToTopOnNavigate } from '@/components/layout/scroll-to-top'
import { MotionProvider } from '@/components/motion/motion-provider'
import { BrandBackdrop } from '@/components/brand/backdrop'

export function RootLayout() {
  return (
    <MotionProvider>
      <ScrollToTopOnNavigate />
      <BrandBackdrop />
      <Navbar />
      <main className="relative z-10 pt-[4.5rem]">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </MotionProvider>
  )
}
