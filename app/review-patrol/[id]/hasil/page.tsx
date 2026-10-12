'use client'

import { useParams } from 'next/navigation'
import PageShell from '@/components/PageShell'
import PatrolHasilView from '@/components/PatrolHasilView'
import { ClipboardCheck } from 'lucide-react'

export default function LaporanHasilPage() {
  const params = useParams()
  const id = params.id as string

  return (
    <PageShell
      title="Tinjau Hasil Patroli"
      subtitle="Laporan Hasil Patroli · Pelacakan GPS"
      iconVariant="teal"
      icon={<ClipboardCheck size={18} />}
    >
      <PatrolHasilView mode="edit" reportId={id} backHref="/review-patrol" />
    </PageShell>
  )
}
