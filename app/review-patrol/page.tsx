'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PatrolReport } from '@/lib/supabase'
import { fetchPendingReports } from '@/lib/patrol-queries'
import PageShell from '@/components/PageShell'
import PatrolOverviewStats from '@/components/PatrolOverviewStats'
import VehicleTypeBadge from '@/components/VehicleTypeBadge'
import { Calendar, CheckCircle, XCircle, Pencil, FileText, ClipboardCheck } from 'lucide-react'

export default function ReviewPatrolPage() {
  const [reports, setReports] = useState<PatrolReport[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchPendingReports().then((data) => {
      setReports(data)
      setLoading(false)
    })
  }, [])

  const handleDownloadCsv = () => {
    const headers = ['No', 'Tanggal', 'Estate', 'Tipe Kendaraan', 'Plat Nomor', 'Ketersediaan Pelacakan']
    const rows = reports.map((r, i) => [
      i + 1,
      r.date,
      r.estate,
      r.type,
      r.nopol,
      r.tracking_available ? 'Tersedia' : 'Tidak Tersedia'
    ])
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `tinjau-hasil-patroli-${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleAction = (report: PatrolReport) => {
    if (report.tracking_available) {
      router.push(`/review-patrol/${report.id}/hasil`)
    } else {
      router.push(`/review-patrol/${report.id}/kendala`)
    }
  }

  return (
    <PageShell
      title="Tinjau Hasil Patroli"
      subtitle="Dashboard Keamanan · Laporan Menunggu Review"
      iconVariant="teal"
      icon={<ClipboardCheck size={18} />}
    >
      <PatrolOverviewStats
        reports={reports}
        anchorLabel="Laporan Belum Ditinjau"
        anchorSub="Menunggu review PIC"
      />

      <div className="table-panel">
        <div className="table-head">
          <div className="table-title-wrap">
            <span className="table-title-icon">
              <FileText size={15} />
            </span>
            <h3 className="table-title">Daftar Laporan Patroli</h3>
          </div>
          <div className="table-actions">
            <button
              type="button"
              onClick={handleDownloadCsv}
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                padding: '6px 12px',
                fontWeight: 700,
                borderRadius: '8px',
                cursor: 'pointer',
                border: '1px solid #cfd8dc',
                background: '#ffffff',
                color: '#37474f',
                transition: 'all 0.15s ease',
              }}
            >
              Unduh CSV
            </button>
          </div>
        </div>
        <div className="table-scroll">
          {loading ? (
            <div className="loading-state">Memuat...</div>
          ) : reports.length === 0 ? (
            <div className="loading-state">Semua laporan sudah ditinjau.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th className="text-left">No</th>
                  <th className="text-left">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <Calendar size={13} /> Tanggal
                    </span>
                  </th>
                  <th className="text-left">Estate</th>
                  <th className="text-left">Tipe Kendaraan</th>
                  <th className="text-left">Plat Nomor</th>
                  <th className="text-left">Ketersediaan Pelacakan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={report.id}>
                    <td className="text-left">{index + 1}</td>
                    <td className="text-left">
                      {new Date(report.date).toLocaleDateString('id-ID', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                    </td>
                    <td className="text-left">{report.estate}</td>
                    <td className="text-left">
                      <VehicleTypeBadge type={report.type} size="sm" />
                    </td>
                    <td className="text-left">
                      <span className="nopol-badge">{report.nopol}</span>
                    </td>
                    <td className="text-left">
                      {report.tracking_available ? (
                        <span className="status-available">
                          <CheckCircle size={14} /> Tersedia
                        </span>
                      ) : (
                        <span className="status-unavailable">
                          <XCircle size={14} /> Tidak Tersedia
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleAction(report)}
                        className="action-btn"
                        aria-label="Tinjau laporan"
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </PageShell>
  )
}
