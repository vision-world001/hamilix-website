import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { JobDetailContent } from '@/components/sections/job-detail-content'
import { getOpenPositionById } from '@/lib/content'
import { usePageTitle } from '@/lib/use-page-title'

export function JobDetailPage() {
  const { jobId } = useParams<{ jobId: string }>()
  const job = jobId ? getOpenPositionById(jobId) : undefined

  usePageTitle(
    job?.title ?? 'Careers',
    job?.summary ?? 'Join Hamilix and build the future of AI and Web3 infrastructure.',
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [jobId])

  if (!job) {
    return <Navigate to="/careers" replace />
  }

  return <JobDetailContent job={job} />
}
