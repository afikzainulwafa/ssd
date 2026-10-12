'use client'

import { useParams } from 'next/navigation'
import PageShell from '@/components/PageShell'
import PatrolHasilView from '@/components/PatrolHasilView'
import { FileCheck } from 'lucide-react'

export default function HasilLaporanDetailPage() {
  const params = useParams()
  const id = params.id as string

  return (
    <PageShell
      title="Hasil Laporan Patroli"
      subtitle="Tinjau laporan yang sudah disubmit oleh PIC"
      iconVariant="teal"
      icon={<FileCheck size={18} />}
    >
      <PatrolHasilView mode="view" reportId={id} backHref="/hasil-laporan-patroli" />
    </PageShell>
  )
}
