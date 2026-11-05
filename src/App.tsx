import { Routes, Route } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { HomePage } from './pages/HomePage'
import { AIPage } from './pages/AIPage'
import { BlockchainPage } from './pages/BlockchainPage'
import { Web3Page } from './pages/Web3Page'
import { CryptoPage } from './pages/CryptoPage'
import { CareersPage } from './pages/CareersPage'
import { JobDetailPage } from './pages/JobDetailPage'
import { ContactPage } from './pages/ContactPage'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="ai" element={<AIPage />} />
        <Route path="blockchain" element={<BlockchainPage />} />
        <Route path="web3" element={<Web3Page />} />
        <Route path="crypto" element={<CryptoPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="careers/:jobId" element={<JobDetailPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}
