'use client'
import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { fetchSubmittedReports, SubmittedReportRow } from '@/lib/patrol-queries'
import PageShell from '@/components/PageShell'
import PatrolOverviewStats from '@/components/PatrolOverviewStats'
import VehicleTypeBadge from '@/components/VehicleTypeBadge'
import { getStopEventFlag } from '@/lib/patrol-comment-options'
import { createDemoStopEvents } from '@/lib/demo-patrol-events'
import {
  Calendar, CheckCircle, XCircle, Eye, FileText, FileCheck, User, Radio, AlertTriangle
} from 'lucide-react'

const parseIssueDescription = (rawDesc: string) => {
  if (!rawDesc) return { status: 'Pelaporan Kerusakan', text: '' }
  try {
    if (rawDesc.startsWith('{') && rawDesc.endsWith('}')) {
      const parsed = JSON.parse(rawDesc)
      return {
        status: parsed.status || 'Pelaporan Kerusakan',
        text: parsed.text || ''
      }
    }
  } catch (e) {
    // ignore
  }
  return {
    status: 'Pelaporan Kerusakan',
    text: rawDesc
  }
}

export default function HasilLaporanPatroliPage() {
  const [rows, setRows] = useState<SubmittedReportRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filterState, setFilterState] = useState<'uncommented' | 'all'>('uncommented')
  const router = useRouter()

  useEffect(() => {
    fetchSubmittedReports().then((data) => {
      setRows(data)
      setLoading(false)
    })
  }, [])

  const handleDownloadCsv = () => {
    const headers = ['No', 'Tanggal Patroli', 'Estate', 'Tipe Kendaraan', 'Plat Nomor', 'Pelacakan', 'Prioritas', 'Tanggal Submit']
    const rowsData = visibleRows.map((r, i) => {
      const priority = r.result?.team_assignment?.priority_level || (r.issue?.issue_type === 'vehicle' ? 'urgent' : 'normal')
      const tracking = r.report.tracking_available
        ? (r.issue ? `Ada Kendala (${r.issue.issue_type === 'gps' ? 'GPS Rusak' : 'Unit Rusak'})` : 'Tersedia')
        : 'Tidak Tersedia'
      const submitDate = r.result?.submitted_at || r.issue?.submitted_at || ''
      return [
        i + 1,
        r.report.date,
        r.report.estate,
        r.report.type,
        r.report.nopol,
        tracking,
        priority === 'urgent' ? 'Urgent' : 'Normal',
        submitDate ? new Date(submitDate).toLocaleDateString('id-ID', {
          day: '2-digit', month: 'short', year: 'numeric'
        }) : '—'
      ]
    })

    const csvContent = [
      headers.join(','),
      ...rowsData.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `hasil-laporan-patroli-${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const uniqueRows = useMemo(() => {
    const seen = new Set<string>()
    const result: SubmittedReportRow[] = []
    
    // Sort descending by database created_at first so that the latest re-seed is kept
    const sorted = [...rows].sort((a, b) => {
      const createdA = new Date((a.result as any)?.created_at || (a.issue as any)?.created_at || 0).getTime()
      const createdB = new Date((b.result as any)?.created_at || (b.issue as any)?.created_at || 0).getTime()
      if (createdB !== createdA) {
        return createdB - createdA
      }
      const dateA = new Date(a.result?.submitted_at || a.issue?.submitted_at || a.report.created_at).getTime()
      const dateB = new Date(b.result?.submitted_at || b.issue?.submitted_at || b.report.created_at).getTime()
      return dateB - dateA
    })

    for (const r of sorted) {
      if (!seen.has(r.report.id)) {
        seen.add(r.report.id)
        result.push(r)
      }
    }
    
    // Sort: Urgent first, then normal. Within that, by report date ascending
    return result.sort((a, b) => {
      const priorityA = a.result?.team_assignment?.priority_level || (a.issue?.issue_type === 'vehicle' ? 'urgent' : 'normal')
      const priorityB = b.result?.team_assignment?.priority_level || (b.issue?.issue_type === 'vehicle' ? 'urgent' : 'normal')
      
      const isUrgentA = priorityA === 'urgent' ? 1 : 0
      const isUrgentB = priorityB === 'urgent' ? 1 : 0
      
      if (isUrgentA !== isUrgentB) {
        return isUrgentB - isUrgentA
      }
      
      const dateA = new Date(a.report.date).getTime()
      const dateB = new Date(b.report.date).getTime()
      return dateA - dateB
    })
  }, [rows])

  const reports = uniqueRows.map((r) => r.report)

  // Calculations for summary stats and drill-down
  const gpsRusakCount = uniqueRows.filter(r => r.issue?.issue_type === 'gps').length
  const vehicleRusakCount = uniqueRows.filter(r => r.issue?.issue_type === 'vehicle').length

  const uncommentedCount = uniqueRows.filter(r => {
    const hasEM = Boolean(r.result?.team_assignment?.manager_comment)
    return !hasEM
  }).length

  const completedCount = uniqueRows.length - uncommentedCount

  // Filter rows based on toggle selection
  const visibleRows = uniqueRows.filter(r => {
    if (filterState === 'all') return true
    const hasEM = Boolean(r.result?.team_assignment?.manager_comment)
    return !hasEM
  })

  return (
    <PageShell
      title="Hasil Laporan Patroli"
      subtitle="Dashboard Keamanan · Laporan Sudah Disubmit"
      iconVariant="teal"
      icon={<FileCheck size={18} />}
    >
      <PatrolOverviewStats
        reports={reports}
        anchorLabel="Laporan Disubmit"
        anchorSub="Sudah dikirim PIC"
        gpsRusakCount={gpsRusakCount}
        vehicleRusakCount={vehicleRusakCount}
      />

      <div className="table-panel">
        <div className="table-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div className="table-title-wrap">
            <span className="table-title-icon">
              <FileText size={15} />
            </span>
            <h3 className="table-title">Riwayat Laporan Disubmit</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Summary Capsules */}
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ background: '#f5f5f5', color: '#616161', border: '1px solid #e0e0e0', fontSize: 12, padding: '3px 8px', borderRadius: 12 }}>
                Total: <strong>{uniqueRows.length}</strong>
              </span>
              <span style={{ background: '#fff3e0', color: '#e65100', border: '1px solid #ffe0b2', fontSize: 12, padding: '3px 8px', borderRadius: 12 }}>
                Belum Komentar: <strong>{uncommentedCount}</strong>
              </span>
              <span style={{ background: '#e8f5e9', color: '#2e7d32', border: '1px solid #c8e6c9', fontSize: 12, padding: '3px 8px', borderRadius: 12 }}>
                Selesai: <strong>{completedCount}</strong>
              </span>
            </div>

            {/* Filter Toggle */}
            <div style={{ display: 'flex', background: '#f1f3f4', padding: 3, borderRadius: 8 }}>
              <button
                type="button"
                onClick={() => setFilterState('uncommented')}
                style={{
                  border: 'none',
                  background: filterState === 'uncommented' ? '#ffffff' : 'transparent',
                  color: filterState === 'uncommented' ? '#1a73e8' : '#5f6368',
                  padding: '5px 12px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: filterState === 'uncommented' ? 'bold' : 'normal',
                  cursor: 'pointer',
                  boxShadow: filterState === 'uncommented' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                Belum Komentar
              </button>
              <button
                type="button"
                onClick={() => setFilterState('all')}
                style={{
                  border: 'none',
                  background: filterState === 'all' ? '#ffffff' : 'transparent',
                  color: filterState === 'all' ? '#1a73e8' : '#5f6368',
                  padding: '5px 12px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: filterState === 'all' ? 'bold' : 'normal',
                  cursor: 'pointer',
                  boxShadow: filterState === 'all' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                Semua Laporan
              </button>
            </div>

            <button
              type="button"
              onClick={handleDownloadCsv}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                padding: '6px 12px',
                fontWeight: 700,
                borderRadius: '8px',
                border: '1px solid #cfd8dc',
                background: '#ffffff',
                color: '#37474f',
                cursor: 'pointer',
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
          ) : visibleRows.length === 0 ? (
            <div className="loading-state">Tidak ada laporan untuk filter ini.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th className="text-left">No</th>
                  <th className="text-left">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <Calendar size={13} /> Tanggal Patroli
                    </span>
                  </th>
                  <th className="text-left">Estate</th>
                  <th className="text-left">Tipe Kendaraan</th>
                  <th className="text-left">Plat Nomor</th>
                  <th className="text-left">Pelacakan</th>
                  <th className="text-left">Prioritas</th>
                  <th className="text-left">Tanggal Submit</th>
                  <th className="text-left">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <User size={13} /> PIC
                    </span>
                  </th>
                  <th className="text-left">Komentar</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>                {visibleRows.map(({ report, result, issue, pic }, index) => {
                  const hasEM = result
                    ? Boolean(result.team_assignment?.manager_comment)
                    : (report.id === '5f9fc0bb-6810-4175-842a-eae3cea60c50')
                  const hasRC = result
                    ? Boolean(result.team_assignment?.rc_comment)
                    : (report.id === '5f9fc0bb-6810-4175-842a-eae3cea60c50')
                  const hasSRMD = result
                    ? Boolean(result.team_assignment?.srmd_comment)
                    : (report.id === '5f9fc0bb-6810-4175-842a-eae3cea60c50')
                  const priority = result?.team_assignment?.priority_level || (issue?.issue_type === 'vehicle' ? 'urgent' : 'normal')
                  const submitDate = result?.submitted_at || issue?.submitted_at || ''

                  const mockPicList = ['Aditya Pratama', 'Hendra Wijaya', 'Ahmad Fauzi']
                  const charSum = report.id.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0)
                  const fallbackPic = mockPicList[charSum % mockPicList.length]
                  const displayPic = pic?.trim() && pic !== '—' ? pic : fallbackPic

                  let hasFlags = false
                  if (result) {
                    const stops = (result.stops && result.stops.length > 0)
                      ? result.stops
                      : createDemoStopEvents(true)
                    hasFlags = stops.some(e => getStopEventFlag(e, 'stop'))
                  }

                  return (
                    <tr
                      key={report.id}
                      style={priority === 'urgent' ? { background: '#fff8f8', boxShadow: 'inset 4px 0 0 #d32f2f' } : undefined}
                    >
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
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span className="status-unavailable" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                              <XCircle size={14} /> {issue?.issue_type === 'gps' ? 'GPS Rusak' : 'Unit Rusak'}
                            </span>
                            {issue?.issue_type === 'vehicle' && (
                              <span style={{ fontSize: '10px', color: '#e65100', fontWeight: 700, paddingLeft: '18px' }}>
                                {parseIssueDescription(issue.description).status}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="text-left">
                        {priority === 'urgent' ? (
                          <span style={{
                            background: '#ffebee', color: '#c62828', border: '1px solid #ef9a9a',
                            padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 'bold',
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                            animation: 'pulse 2s infinite'
                          }}>
                            <AlertTriangle size={12} /> Urgent
                          </span>
                        ) : (
                          <span style={{
                            background: '#e8f0fe', color: '#1a73e8', border: '1px solid #aecbfa',
                            padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 'normal',
                            display: 'inline-flex', alignItems: 'center'
                          }}>
                            Normal
                          </span>
                        )}
                      </td>
                      <td className="text-left">
                        {submitDate ? new Date(submitDate).toLocaleDateString('id-ID', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        }) : '—'}
                      </td>
                      <td className="text-left">{displayPic}</td>
                      <td className="text-left">
                        <div style={{ display: 'flex', gap: 6 }}>
                          <span style={{
                            background: hasEM ? '#e8f5e9' : '#f5f5f5',
                            color: hasEM ? '#2e7d32' : '#9e9e9e',
                            border: `1px solid ${hasEM ? '#a5d6a7' : '#e0e0e0'}`,
                            fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 'bold'
                          }} title={hasEM ? 'Estate Manager sudah komentar' : 'Estate Manager belum komentar'}>EM</span>
                          <span style={{
                            background: hasRC ? '#e8f5e9' : '#f5f5f5',
                            color: hasRC ? '#2e7d32' : '#9e9e9e',
                            border: `1px solid ${hasRC ? '#a5d6a7' : '#e0e0e0'}`,
                            fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 'bold'
                          }} title={hasRC ? 'RC sudah komentar' : 'RC belum komentar'}>RC</span>
                          <span style={{
                            background: hasSRMD ? '#e8f5e9' : '#f5f5f5',
                            color: hasSRMD ? '#2e7d32' : '#9e9e9e',
                            border: `1px solid ${hasSRMD ? '#a5d6a7' : '#e0e0e0'}`,
                            fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 'bold'
                            }} title={hasSRMD ? 'SRMD sudah komentar' : 'SRMD belum komentar'}>SRMD</span>
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => router.push(`/hasil-laporan-patroli/${report.id}`)}
                          className="action-btn action-btn-view"
                          aria-label="Lihat detail laporan"
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </PageShell>
  )
}
