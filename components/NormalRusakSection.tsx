'use client'

import React, { useState, useMemo } from 'react'
import {
  PatrolReportRecord,
  GlobalFilterState
} from '@/lib/types'
import {
  DamageIncident,
  UserRole,
  buildAllDamageIncidents
} from '@/lib/damage-incidents'
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Flame,
  Info,
  Mail,
  MessageSquare,
  Radio,
  Send,
  ShieldAlert,
  Truck,
  Wrench,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  X,
  UserCheck
} from 'lucide-react'

interface NormalRusakSectionProps {
  globalFilters: GlobalFilterState
  reports: PatrolReportRecord[]
  userRole: UserRole
  onUserRoleChange?: (role: UserRole) => void
  onOpenReportModal?: (report: PatrolReportRecord) => void
  onUpdateReportComment?: (reportId: string, role: UserRole, comment: string) => void
}

export type CategorySegmentKey = 'ALL' | 'NORMAL' | 'URGENT' | 'UNIT_RUSAK' | 'GPS_RUSAK'

export default function NormalRusakSection({
  globalFilters,
  reports,
  userRole,
  onUserRoleChange,
  onOpenReportModal,
  onUpdateReportComment
}: NormalRusakSectionProps) {
  // Segment state
  const [activeSegment, setActiveSegment] = useState<CategorySegmentKey>('ALL')
  const [filterPendingOnly, setFilterPendingOnly] = useState(false)

  // Sub-filter for Urgent category
  const [urgentSubFilter, setUrgentSubFilter] = useState<'ALL' | 'PENDING'>('PENDING')

  // Sub-filter for Damage Incidents (Unit / GPS Rusak)
  const [damageStatusFilter, setDamageStatusFilter] = useState<'Belum Pulih' | 'Selesai'>('Belum Pulih')

  // Selected Damage Incident ID for 2-panel layout
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null)

  // Mobile detail view toggle
  const [showMobileDetail, setShowMobileDetail] = useState(false)

  // Collapsible Laporan Terkait accordion state
  const [showRelatedReportsAccordion, setShowRelatedReportsAccordion] = useState(false)

  // Collapsible timeline repeating reminders state
  const [expandTimelineReminders, setExpandTimelineReminders] = useState(false)

  // Inline Comment Modal state for Urgent reports
  const [commentingReport, setCommentingReport] = useState<PatrolReportRecord | null>(null)
  const [commentInput, setCommentInput] = useState('')
  const [commentSuccessMsg, setCommentSuccessMsg] = useState('')

  // As-of Date calculation
  const asOfDateLabel = useMemo(() => {
    if (globalFilters.endDate) return globalFilters.endDate
    return '2026-05-31'
  }, [globalFilters.endDate])

  // Build Damage Incidents
  const allIncidents = useMemo(() => {
    return buildAllDamageIncidents(globalFilters, userRole, asOfDateLabel)
  }, [globalFilters, userRole, asOfDateLabel])

  // Split damage incidents by type
  const unitRusakIncidents = useMemo(() => {
    return allIncidents.filter(i => i.damageType === 'Unit Rusak')
  }, [allIncidents])

  const gpsRusakIncidents = useMemo(() => {
    return allIncidents.filter(i => i.damageType === 'GPS Rusak')
  }, [allIncidents])

  // Pending action counts for damage incidents
  const unitRusakPendingActionCount = useMemo(() => {
    return unitRusakIncidents.filter(i => i.status === 'Belum Pulih' && i.hasPendingActionForUser).length
  }, [unitRusakIncidents])

  const gpsRusakPendingActionCount = useMemo(() => {
    return gpsRusakIncidents.filter(i => i.status === 'Belum Pulih' && i.hasPendingActionForUser).length
  }, [gpsRusakIncidents])

  // Local report list state to support inline commenting update
  const [localReports, setLocalReports] = useState<PatrolReportRecord[]>(reports)

  React.useEffect(() => {
    setLocalReports(reports)
  }, [reports])

  // Urgent reports pending comment check for user role
  const isReportPendingCommentForRole = (r: PatrolReportRecord, role: UserRole): boolean => {
    if (r.reportType !== 'Urgent') return false
    if (role === 'Manager') {
      return !r.managerComment || r.status === 'Pending Manager Review'
    }
    if (role === 'Admin') {
      return !r.managerComment || !r.picComment
    }
    return !r.picComment || r.status === 'Pending PIC Comment'
  }

  // Urgent reports calculation
  const urgentReportsInPeriod = useMemo(() => {
    return localReports.filter(r => r.reportType === 'Urgent')
  }, [localReports])

  const urgentPendingCount = useMemo(() => {
    return urgentReportsInPeriod.filter(r => isReportPendingCommentForRole(r, userRole)).length
  }, [urgentReportsInPeriod, userRole])

  // Period Counts for Category Strip
  const normalReportsInPeriod = useMemo(() => {
    return localReports.filter(r => r.reportType === 'Normal')
  }, [localReports])

  const unitRusakReportsInPeriod = useMemo(() => {
    return localReports.filter(r => r.reportType === 'Unit Rusak')
  }, [localReports])

  const gpsRusakReportsInPeriod = useMemo(() => {
    return localReports.filter(r => r.reportType === 'GPS Rusak')
  }, [localReports])

  // Handle clicking Category Segment
  const handleSelectSegment = (seg: CategorySegmentKey, pendingOnly: boolean = false) => {
    setActiveSegment(seg)
    setFilterPendingOnly(pendingOnly)
    if (seg === 'URGENT') {
      setUrgentSubFilter(pendingOnly ? 'PENDING' : 'ALL')
    }
    if (seg === 'UNIT_RUSAK' || seg === 'GPS_RUSAK') {
      setDamageStatusFilter('Belum Pulih')
      // Select first incident automatically
      const targetList = seg === 'UNIT_RUSAK' ? unitRusakIncidents : gpsRusakIncidents
      const activeList = targetList.filter(i => i.status === 'Belum Pulih')
      if (activeList.length > 0) {
        setSelectedIncidentId(activeList[0].id)
      } else if (targetList.length > 0) {
        setSelectedIncidentId(targetList[0].id)
      } else {
        setSelectedIncidentId(null)
      }
    }
    setShowMobileDetail(false)
  }

  // Handle saving comment for urgent report
  const handleSaveReportComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentingReport || !commentInput.trim()) return

    const updated = localReports.map(r => {
      if (r.id === commentingReport.id) {
        const newRep = { ...r }
        if (userRole === 'Manager' || userRole === 'Admin') {
          newRep.managerComment = commentInput
          newRep.managerReviewedAt = new Date().toISOString()
          newRep.status = 'Reviewed Manager'
          newRep.managerRating = 'Approved'
        } else {
          newRep.picComment = commentInput
          newRep.picSubmittedAt = new Date().toISOString()
          newRep.status = 'Submitted PIC'
        }
        return newRep
      }
      return r
    })

    setLocalReports(updated)
    if (onUpdateReportComment) {
      onUpdateReportComment(commentingReport.id, userRole, commentInput)
    }

    setCommentSuccessMsg('Komentar berhasil disimpan. Penanda kewajiban role telah diperbarui.')
    setTimeout(() => {
      setCommentingReport(null)
      setCommentInput('')
      setCommentSuccessMsg('')
    }, 1200)
  }

  // Active Incident for 2-panel view
  const currentIncidentsList = activeSegment === 'GPS_RUSAK' ? gpsRusakIncidents : unitRusakIncidents
  const filteredIncidents = useMemo(() => {
    return currentIncidentsList.filter(i => {
      if (damageStatusFilter === 'Belum Pulih') return i.status === 'Belum Pulih'
      return i.status === 'Selesai'
    })
  }, [currentIncidentsList, damageStatusFilter])

  const activeIncident = useMemo(() => {
    if (!selectedIncidentId) return filteredIncidents[0] || null
    return currentIncidentsList.find(i => i.id === selectedIncidentId) || filteredIncidents[0] || null
  }, [currentIncidentsList, filteredIncidents, selectedIncidentId])

  // Count text for damage headers
  const damageHeaderStats = useMemo(() => {
    const list = activeSegment === 'GPS_RUSAK' ? gpsRusakIncidents : unitRusakIncidents
    const unrecovered = list.filter(i => i.status === 'Belum Pulih')
    const totalRelatedReports = list.reduce((acc, curr) => acc + curr.relatedReports.length, 0)
    return `${unrecovered.length} kejadian kerusakan · ${totalRelatedReports} laporan terkait`
  }, [activeSegment, unitRusakIncidents, gpsRusakIncidents])

  return (
    <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
      {/* SECTION HEADER & ROLE SWITCHER TOOLBAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.85rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🛡️</span> Analisis Status Operasional Normal &amp; Kerusakan Peralatan
          </h3>
          <div style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '0.2rem' }}>
            Penelusuran kepatuhan laporan, tindak lanjut urgent, serta eskalasi kerusakan unit &amp; GPS
          </div>
        </div>

        {/* Role Selector Badge & Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.3rem 0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
          <UserCheck size={14} style={{ color: '#2563eb' }} />
          <span style={{ fontSize: '0.725rem', fontWeight: 600, color: '#475569' }}>Role Aktif:</span>
          <select
            value={userRole}
            onChange={(e) => onUserRoleChange && onUserRoleChange(e.target.value as UserRole)}
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.25rem 0.5rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#1e293b',
              cursor: 'pointer'
            }}
          >
            <option value="Manager">Estate Manager (Threshold Day 4+)</option>
            <option value="RC">Regional Control (Threshold Day 8+)</option>
            <option value="VPA">VP Agronomy (Threshold Day 15+)</option>
            <option value="Admin">Super Admin / Monitoring</option>
          </select>
        </div>
      </div>

      {/* 1. SEGMENTED CATEGORY STRIP (STRIP KATEGORI BERSEGMEN) */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            background: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
          }}
        >
          {/* SEGMENT 1: SEMUA */}
          <div
            onClick={() => handleSelectSegment('ALL')}
            style={{
              padding: '0.65rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: activeSegment === 'ALL' ? '#ffffff' : 'transparent',
              borderBottom: activeSegment === 'ALL' ? '3px solid #2563eb' : '3px solid transparent',
              borderRight: '1px solid #e2e8f0',
              transition: 'all 0.15s ease'
            }}
            title="Tampilkan seluruh laporan patroli pada periode filter"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <FileText size={16} style={{ color: activeSegment === 'ALL' ? '#2563eb' : '#64748b' }} />
              <span style={{ fontSize: '0.825rem', fontWeight: activeSegment === 'ALL' ? 800 : 600, color: activeSegment === 'ALL' ? '#0f172a' : '#475569' }}>
                Semua
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: activeSegment === 'ALL' ? '#2563eb' : '#64748b', background: activeSegment === 'ALL' ? '#dbeafe' : '#e2e8f0', padding: '0.1rem 0.45rem', borderRadius: '12px' }}>
              {localReports.length}
            </span>
          </div>

          {/* SEGMENT 2: NORMAL */}
          <div
            onClick={() => handleSelectSegment('NORMAL')}
            style={{
              padding: '0.65rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: activeSegment === 'NORMAL' ? '#ffffff' : 'transparent',
              borderBottom: activeSegment === 'NORMAL' ? '3px solid #16a34a' : '3px solid transparent',
              borderRight: '1px solid #e2e8f0',
              transition: 'all 0.15s ease'
            }}
            title="Tampilkan laporan dengan klasifikasi Normal"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <CheckCircle size={16} style={{ color: activeSegment === 'NORMAL' ? '#16a34a' : '#64748b' }} />
              <span style={{ fontSize: '0.825rem', fontWeight: activeSegment === 'NORMAL' ? 800 : 600, color: activeSegment === 'NORMAL' ? '#0f172a' : '#475569' }}>
                Normal
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: activeSegment === 'NORMAL' ? '#16a34a' : '#64748b', background: activeSegment === 'NORMAL' ? '#dcfce7' : '#e2e8f0', padding: '0.1rem 0.45rem', borderRadius: '12px' }}>
              {normalReportsInPeriod.length}
            </span>
          </div>

          {/* SEGMENT 3: URGENT */}
          <div
            onClick={() => handleSelectSegment('URGENT')}
            style={{
              padding: '0.65rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: activeSegment === 'URGENT' ? '#ffffff' : 'transparent',
              borderBottom: activeSegment === 'URGENT' ? '3px solid #ea580c' : '3px solid transparent',
              borderRight: '1px solid #e2e8f0',
              transition: 'all 0.15s ease'
            }}
            title={`Laporan Urgent: ${urgentReportsInPeriod.length} laporan pada periode filter (${urgentPendingCount} menunggu komentar Anda)`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Flame size={16} style={{ color: activeSegment === 'URGENT' ? '#ea580c' : '#64748b' }} />
              <span style={{ fontSize: '0.825rem', fontWeight: activeSegment === 'URGENT' ? 800 : 600, color: activeSegment === 'URGENT' ? '#0f172a' : '#475569' }}>
                Urgent
              </span>

              {/* Derivative Marker: Alert Icon if pending user comments exist */}
              {urgentPendingCount > 0 && (
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectSegment('URGENT', true)
                  }}
                  title={`${urgentPendingCount} laporan urgent menunggu komentar Anda. Klik untuk memfilter pending.`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#dc2626',
                    background: '#fee2e2',
                    borderRadius: '50%',
                    padding: '2px',
                    marginLeft: '2px',
                    cursor: 'pointer'
                  }}
                >
                  <AlertCircle size={15} />
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: activeSegment === 'URGENT' ? '#ea580c' : '#64748b', background: activeSegment === 'URGENT' ? '#ffedd5' : '#e2e8f0', padding: '0.1rem 0.45rem', borderRadius: '12px' }}>
              {urgentReportsInPeriod.length}
            </span>
          </div>

          {/* SEGMENT 4: UNIT RUSAK */}
          <div
            onClick={() => handleSelectSegment('UNIT_RUSAK')}
            style={{
              padding: '0.65rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: activeSegment === 'UNIT_RUSAK' ? '#ffffff' : 'transparent',
              borderBottom: activeSegment === 'UNIT_RUSAK' ? '3px solid #d97706' : '3px solid transparent',
              borderRight: '1px solid #e2e8f0',
              transition: 'all 0.15s ease'
            }}
            title={`Laporan Unit Rusak: ${unitRusakReportsInPeriod.length} laporan (${unitRusakPendingActionCount} kejadian belum pulih melewati ambang eskalasi Anda)`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Truck size={16} style={{ color: activeSegment === 'UNIT_RUSAK' ? '#d97706' : '#64748b' }} />
              <span style={{ fontSize: '0.825rem', fontWeight: activeSegment === 'UNIT_RUSAK' ? 800 : 600, color: activeSegment === 'UNIT_RUSAK' ? '#0f172a' : '#475569' }}>
                Unit Rusak
              </span>

              {/* Derivative Marker: Important Icon if unrecovered damage exceeds escalation threshold */}
              {unitRusakPendingActionCount > 0 && (
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectSegment('UNIT_RUSAK', true)
                  }}
                  title={`${unitRusakPendingActionCount} kejadian unit rusak belum pulih melewati batas eskalasi Anda. Klik untuk penanganan.`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#b45309',
                    background: '#fef3c7',
                    borderRadius: '50%',
                    padding: '2px',
                    marginLeft: '2px',
                    cursor: 'pointer'
                  }}
                >
                  <AlertTriangle size={15} />
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: activeSegment === 'UNIT_RUSAK' ? '#d97706' : '#64748b', background: activeSegment === 'UNIT_RUSAK' ? '#fef3c7' : '#e2e8f0', padding: '0.1rem 0.45rem', borderRadius: '12px' }}>
              {unitRusakReportsInPeriod.length}
            </span>
          </div>

          {/* SEGMENT 5: GPS RUSAK */}
          <div
            onClick={() => handleSelectSegment('GPS_RUSAK')}
            style={{
              padding: '0.65rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: activeSegment === 'GPS_RUSAK' ? '#ffffff' : 'transparent',
              borderBottom: activeSegment === 'GPS_RUSAK' ? '3px solid #dc2626' : '3px solid transparent',
              transition: 'all 0.15s ease'
            }}
            title={`Laporan GPS Rusak: ${gpsRusakReportsInPeriod.length} laporan (${gpsRusakPendingActionCount} kejadian belum pulih melewati ambang eskalasi Anda)`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Radio size={16} style={{ color: activeSegment === 'GPS_RUSAK' ? '#dc2626' : '#64748b' }} />
              <span style={{ fontSize: '0.825rem', fontWeight: activeSegment === 'GPS_RUSAK' ? 800 : 600, color: activeSegment === 'GPS_RUSAK' ? '#0f172a' : '#475569' }}>
                GPS Rusak
              </span>

              {/* Derivative Marker: Important Icon if unrecovered GPS damage exceeds escalation threshold */}
              {gpsRusakPendingActionCount > 0 && (
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectSegment('GPS_RUSAK', true)
                  }}
                  title={`${gpsRusakPendingActionCount} kejadian GPS rusak belum pulih melewati batas eskalasi Anda. Klik untuk penanganan.`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#991b1b',
                    background: '#fee2e2',
                    borderRadius: '50%',
                    padding: '2px',
                    marginLeft: '2px',
                    cursor: 'pointer'
                  }}
                >
                  <AlertOctagon size={15} />
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: activeSegment === 'GPS_RUSAK' ? '#dc2626' : '#64748b', background: activeSegment === 'GPS_RUSAK' ? '#fee2e2' : '#e2e8f0', padding: '0.1rem 0.45rem', borderRadius: '12px' }}>
              {gpsRusakReportsInPeriod.length}
            </span>
          </div>
        </div>
      </div>

      {/* CROSS-PERIOD PENDING BANNER & REMOVABLE FILTER CHIP */}
      {filterPendingOnly && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fffbe1', border: '1px solid #fde047', padding: '0.5rem 0.85rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.8rem', color: '#854d0e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info size={15} style={{ color: '#b45309' }} />
            <span>
              <strong>Status terkini per {asOfDateLabel}:</strong> Menampilkan item pending yang memerlukan tindakan Anda (termasuk kejadian belum pulih lintas periode).
            </span>
          </div>
          <button
            type="button"
            onClick={() => setFilterPendingOnly(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '0.2rem 0.5rem',
              background: '#ffffff',
              border: '1px solid #ca8a04',
              borderRadius: '4px',
              fontSize: '0.725rem',
              fontWeight: 700,
              color: '#854d0e',
              cursor: 'pointer'
            }}
          >
            <X size={12} /> Hapus Filter Pending
          </button>
        </div>
      )}

      {/* 2. DYNAMIC CONTENT AREA BASED ON SELECTED CATEGORY SEGMENT */}

      {/* CATEGORY A: SEMUA & CATEGORY B: NORMAL (DAILY REPORT TABLES) */}
      {(activeSegment === 'ALL' || activeSegment === 'NORMAL') && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
              {activeSegment === 'ALL' ? 'Daftar Seluruh Laporan Patroli' : 'Daftar Laporan Patroli Klasifikasi Normal'} ({activeSegment === 'ALL' ? localReports.length : normalReportsInPeriod.length} laporan)
            </div>
            {activeSegment === 'NORMAL' && (
              <div style={{ fontSize: '0.75rem', color: '#166534', background: '#f0fdf4', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid #bbf7d0' }}>
                Klasifikasi Normal: Kendaraan &amp; pelacakan beroperasi tanpa kendala teknis.
              </div>
            )}
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: '#e2e8f0', textTransform: 'uppercase', fontSize: '0.7rem', color: '#475569' }}>
                  <th style={{ padding: '0.55rem', textAlign: 'left' }}>Tanggal</th>
                  <th style={{ padding: '0.55rem', textAlign: 'left' }}>Estate</th>
                  <th style={{ padding: '0.55rem', textAlign: 'left' }}>Nopol / Unit</th>
                  <th style={{ padding: '0.55rem', textAlign: 'center' }}>Status Pengiriman</th>
                  <th style={{ padding: '0.55rem', textAlign: 'left' }}>Kategori Laporan</th>
                  <th style={{ padding: '0.55rem', textAlign: 'left' }}>Status Review Manager</th>
                  <th style={{ padding: '0.55rem', textAlign: 'center' }}>Detail</th>
                </tr>
              </thead>
              <tbody>
                {(activeSegment === 'ALL' ? localReports : normalReportsInPeriod).map(row => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.55rem', fontWeight: 600 }}>{row.date}</td>
                    <td style={{ padding: '0.55rem' }}>{row.estateId}</td>
                    <td style={{ padding: '0.55rem', fontWeight: 700 }}>{row.vehicleId}</td>
                    <td style={{ padding: '0.55rem', textAlign: 'center' }}>
                      <span style={{
                        padding: '0.15rem 0.45rem',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        background: row.submissionStatus === 'Sudah Dikirim' ? '#dcfce7' : '#fee2e2',
                        color: row.submissionStatus === 'Sudah Dikirim' ? '#15803d' : '#b91c1c'
                      }}>
                        {row.submissionStatus}
                      </span>
                    </td>
                    <td style={{ padding: '0.55rem' }}>
                      <span style={{
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                        fontSize: '0.725rem',
                        fontWeight: 700,
                        background: row.reportType === 'Normal' ? '#dbeafe' : (row.reportType === 'Urgent' ? '#ffedd5' : (row.reportType === 'Unit Rusak' ? '#fef3c7' : '#fee2e2')),
                        color: row.reportType === 'Normal' ? '#1e40af' : (row.reportType === 'Urgent' ? '#c2410c' : (row.reportType === 'Unit Rusak' ? '#92400e' : '#b91c1c'))
                      }}>
                        {row.reportType}
                      </span>
                    </td>
                    <td style={{ padding: '0.55rem' }}>
                      {row.managerComment ? (
                        <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 600 }}>Reviewed ({row.managerRating || 'Approved'})</span>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Belum Ditinjau</span>
                      )}
                    </td>
                    <td style={{ padding: '0.55rem', textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => onOpenReportModal && onOpenReportModal(row)}
                        title="Lihat Detail Laporan"
                        style={{ padding: '0.2rem 0.5rem', background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        🔍
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CATEGORY C: URGENT (URGENT REPORTS & INLINE COMMENTING) */}
      {activeSegment === 'URGENT' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ea580c', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Flame size={18} /> Laporan Urgent Berdasarkan Kepatuhan Comment
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.1rem' }}>
                Laporan urgent membutuhkan persetujuan/komentar wajib dari role berwenang ({userRole}).
              </div>
            </div>

            {/* Sub-toggle: Semua vs Menunggu Komentar Anda */}
            <div style={{ display: 'flex', gap: '0.3rem', background: '#f1f5f9', padding: '0.2rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <button
                type="button"
                onClick={() => setUrgentSubFilter('ALL')}
                style={{
                  padding: '0.3rem 0.7rem',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: urgentSubFilter === 'ALL' ? '#ffffff' : 'transparent',
                  color: urgentSubFilter === 'ALL' ? '#0f172a' : '#64748b',
                  boxShadow: urgentSubFilter === 'ALL' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Semua ({urgentReportsInPeriod.length})
              </button>
              <button
                type="button"
                onClick={() => setUrgentSubFilter('PENDING')}
                style={{
                  padding: '0.3rem 0.7rem',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: urgentSubFilter === 'PENDING' ? '#ea580c' : 'transparent',
                  color: urgentSubFilter === 'PENDING' ? '#ffffff' : '#64748b',
                  boxShadow: urgentSubFilter === 'PENDING' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Menunggu Komentar Anda ({urgentPendingCount})
              </button>
            </div>
          </div>

          {/* Urgent Reports Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: '#e2e8f0', textTransform: 'uppercase', fontSize: '0.7rem', color: '#475569' }}>
                  <th style={{ padding: '0.55rem', textAlign: 'left' }}>Tanggal</th>
                  <th style={{ padding: '0.55rem', textAlign: 'left' }}>Estate</th>
                  <th style={{ padding: '0.55rem', textAlign: 'left' }}>Nopol / Unit</th>
                  <th style={{ padding: '0.55rem', textAlign: 'left' }}>Catatan PIC</th>
                  <th style={{ padding: '0.55rem', textAlign: 'left' }}>Catatan Manager</th>
                  <th style={{ padding: '0.55rem', textAlign: 'center' }}>Penanda Aksi</th>
                  <th style={{ padding: '0.55rem', textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {urgentReportsInPeriod
                  .filter(r => {
                    if (urgentSubFilter === 'PENDING') return isReportPendingCommentForRole(r, userRole)
                    return true
                  })
                  .map(row => {
                    const isPending = isReportPendingCommentForRole(row, userRole)
                    return (
                      <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0', background: isPending ? '#fff7ed' : 'transparent' }}>
                        <td style={{ padding: '0.55rem', fontWeight: 600 }}>{row.date}</td>
                        <td style={{ padding: '0.55rem' }}>{row.estateId}</td>
                        <td style={{ padding: '0.55rem', fontWeight: 700 }}>{row.vehicleId}</td>
                        <td style={{ padding: '0.55rem' }}>
                          <span style={{ fontSize: '0.75rem', color: row.picComment ? '#1e293b' : '#94a3b8', fontStyle: row.picComment ? 'normal' : 'italic' }}>
                            {row.picComment || 'Belum ada catatan PIC'}
                          </span>
                        </td>
                        <td style={{ padding: '0.55rem' }}>
                          <span style={{ fontSize: '0.75rem', color: row.managerComment ? '#15803d' : '#94a3b8', fontStyle: row.managerComment ? 'normal' : 'italic' }}>
                            {row.managerComment || 'Belum ada catatan Manager'}
                          </span>
                        </td>
                        <td style={{ padding: '0.55rem', textAlign: 'center' }}>
                          {isPending ? (
                            <span
                              title={`Laporan urgent menunggu komentar dari role ${userRole}`}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '0.15rem 0.5rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800 }}
                            >
                              <AlertCircle size={13} /> Menunggu {userRole}
                            </span>
                          ) : (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '0.15rem 0.5rem', background: '#dcfce7', color: '#15803d', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700 }}>
                              <CheckCircle size={13} /> Selesai Review
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '0.55rem', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => {
                              setCommentingReport(row)
                              setCommentInput(userRole === 'Manager' ? row.managerComment || '' : row.picComment || '')
                            }}
                            style={{
                              padding: '0.25rem 0.6rem',
                              background: isPending ? '#ea580c' : '#f1f5f9',
                              color: isPending ? '#ffffff' : '#0f172a',
                              border: isPending ? 'none' : '1px solid #cbd5e1',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <MessageSquare size={13} /> Beri Komentar
                          </button>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CATEGORY D & E: UNIT RUSAK & GPS RUSAK (DAMAGE INCIDENTS 2-PANEL LAYOUT) */}
      {(activeSegment === 'UNIT_RUSAK' || activeSegment === 'GPS_RUSAK') && (
        <div>
          {/* Header & Incidents Filter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: activeSegment === 'GPS_RUSAK' ? '#dc2626' : '#d97706', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {activeSegment === 'GPS_RUSAK' ? <Radio size={18} /> : <Truck size={18} />}
                Daftar &amp; Riwayat Kejadian {activeSegment === 'GPS_RUSAK' ? 'GPS Rusak' : 'Unit Rusak'}
              </div>
              <div style={{ fontSize: '0.775rem', color: '#475569', fontWeight: 600, marginTop: '0.1rem' }}>
                {damageHeaderStats}
              </div>
            </div>

            {/* Status Filter Toggle: Belum Pulih vs Selesai */}
            <div style={{ display: 'flex', gap: '0.3rem', background: '#f1f5f9', padding: '0.2rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <button
                type="button"
                onClick={() => {
                  setDamageStatusFilter('Belum Pulih')
                  const list = currentIncidentsList.filter(i => i.status === 'Belum Pulih')
                  if (list.length > 0) setSelectedIncidentId(list[0].id)
                }}
                style={{
                  padding: '0.3rem 0.75rem',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: damageStatusFilter === 'Belum Pulih' ? '#b45309' : 'transparent',
                  color: damageStatusFilter === 'Belum Pulih' ? '#ffffff' : '#64748b',
                  boxShadow: damageStatusFilter === 'Belum Pulih' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Belum Pulih ({currentIncidentsList.filter(i => i.status === 'Belum Pulih').length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setDamageStatusFilter('Selesai')
                  const list = currentIncidentsList.filter(i => i.status === 'Selesai')
                  if (list.length > 0) setSelectedIncidentId(list[0].id)
                }}
                style={{
                  padding: '0.3rem 0.75rem',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: damageStatusFilter === 'Selesai' ? '#16a34a' : 'transparent',
                  color: damageStatusFilter === 'Selesai' ? '#ffffff' : '#64748b',
                  boxShadow: damageStatusFilter === 'Selesai' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Selesai ({currentIncidentsList.filter(i => i.status === 'Selesai').length})
              </button>
            </div>
          </div>

          {/* DESKTOP 2-PANEL / MOBILE RESPONSIVE LAYOUT */}
          {filteredIncidents.length === 0 ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', color: '#64748b' }}>
              Tidak ada kejadian {activeSegment === 'GPS_RUSAK' ? 'GPS Rusak' : 'Unit Rusak'} dengan status &quot;{damageStatusFilter}&quot; pada scope ini.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '1rem', alignItems: 'start' }}>
              {/* LEFT PANEL: DAFTAR KEJADIAN KERUSAKAN */}
              <div style={{ display: showMobileDetail ? 'none' : 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '720px', overflowY: 'auto', paddingRight: '4px' }}>
                {filteredIncidents.map(inc => {
                  const isSelected = activeIncident?.id === inc.id
                  return (
                    <div
                      key={inc.id}
                      onClick={() => {
                        setSelectedIncidentId(inc.id)
                        setShowMobileDetail(true)
                      }}
                      style={{
                        background: isSelected ? '#ffffff' : '#f8fafc',
                        border: isSelected ? '2px solid #2563eb' : '1px solid #cbd5e1',
                        borderRadius: '8px',
                        padding: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? '0 2px 8px rgba(37,99,235,0.15)' : 'none'
                      }}
                    >
                      {/* Top Header of Item */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a' }}>
                            {inc.nopol} <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>({inc.vehicleId})</span>
                          </div>
                          <div style={{ fontSize: '0.725rem', color: '#475569', fontWeight: 600 }}>
                            {inc.estateId} · {inc.regionId}
                          </div>
                        </div>

                        {/* Important Icon if requiring user action */}
                        {inc.hasPendingActionForUser && (
                          <span
                            title="Kejadian belum pulih ini telah melewati ambang eskalasi role Anda dan memerlukan penanganan."
                            style={{ display: 'inline-flex', alignItems: 'center', background: '#fee2e2', color: '#b91c1c', borderRadius: '50%', padding: '4px' }}
                          >
                            <AlertTriangle size={15} />
                          </span>
                        )}
                      </div>

                      {/* Info badges */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', margin: '0.4rem 0' }}>
                        <span style={{ fontSize: '0.675rem', fontWeight: 700, padding: '0.15rem 0.4rem', borderRadius: '4px', background: inc.status === 'Belum Pulih' ? '#fee2e2' : '#dcfce7', color: inc.status === 'Belum Pulih' ? '#b91c1c' : '#15803d' }}>
                          Hari ke-{inc.durationDays} ({inc.durationDays} Hari)
                        </span>

                        <span style={{ fontSize: '0.675rem', fontWeight: 700, padding: '0.15rem 0.4rem', borderRadius: '4px', background: inc.escalationLevel === 'VPA' ? '#f3e8ff' : (inc.escalationLevel === 'RC' ? '#eff6ff' : (inc.escalationLevel === 'Manager' ? '#fffbe1' : '#f1f5f9')), color: inc.escalationLevel === 'VPA' ? '#6b21a8' : (inc.escalationLevel === 'RC' ? '#1e40af' : (inc.escalationLevel === 'Manager' ? '#854d0e' : '#475569')) }}>
                          Eskalasi: {inc.escalationLevel}
                        </span>
                      </div>

                      {/* Brief latest update */}
                      <div style={{ fontSize: '0.725rem', color: '#475569', fontStyle: 'italic', background: '#ffffff', padding: '0.35rem 0.5rem', borderRadius: '4px', border: '1px solid #e2e8f0', marginTop: '0.35rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        &quot;{inc.latestRepairNote}&quot;
                      </div>

                      <div style={{ fontSize: '0.675rem', color: '#94a3b8', marginTop: '0.35rem', textAlign: 'right' }}>
                        Tgl Mulai: {inc.startDate}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* RIGHT PANEL: DETAIL & RIWAYAT KEJADIAN TERPILIH */}
              {activeIncident && (
                <div style={{ display: !showMobileDetail ? 'block' : 'block', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1.1rem' }}>
                  {/* Mobile Back Button */}
                  <div style={{ display: 'none', marginBottom: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowMobileDetail(false)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '0.3rem 0.6rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      <ArrowLeft size={14} /> Kembali ke Daftar Kejadian
                    </button>
                  </div>

                  {/* 1. RINGKASAN KONDISI TERKINI */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
                      <div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                          Detail Kejadian {activeIncident.damageType} · {activeIncident.nopol}
                        </div>
                        <div style={{ fontSize: '0.775rem', color: '#475569', fontWeight: 600, marginTop: '0.1rem' }}>
                          Unit ID: <strong>{activeIncident.vehicleId}</strong> · Estate: <strong>{activeIncident.estateId}</strong> ({activeIncident.regionId})
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.725rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '12px', background: activeIncident.status === 'Belum Pulih' ? '#fee2e2' : '#dcfce7', color: activeIncident.status === 'Belum Pulih' ? '#b91c1c' : '#15803d' }}>
                          Status: {activeIncident.status}
                        </span>
                        <span style={{ fontSize: '0.725rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '12px', background: '#dbeafe', color: '#1e40af' }}>
                          Hari ke-{activeIncident.durationDays}
                        </span>
                      </div>
                    </div>

                    {/* Escalation & Recipients bar */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', paddingTop: '0.6rem', borderTop: '1px solid #e2e8f0', fontSize: '0.75rem' }}>
                      <div>
                        <div style={{ fontSize: '0.675rem', color: '#64748b', fontWeight: 600 }}>Tingkat Eskalasi Current</div>
                        <div style={{ fontWeight: 800, color: activeIncident.escalationLevel === 'VPA' ? '#6b21a8' : (activeIncident.escalationLevel === 'RC' ? '#1e40af' : '#854d0e') }}>
                          Level {activeIncident.escalationLevel}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.675rem', color: '#64748b', fontWeight: 600 }}>Penerima Eskalasi Manager / RC</div>
                        <div style={{ fontWeight: 600, color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={`${activeIncident.managerEmail}, ${activeIncident.rcEmail}`}>
                          {activeIncident.managerEmail}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.675rem', color: '#64748b', fontWeight: 600 }}>Status Email Eskalasi</div>
                        <div style={{ fontWeight: 700, color: '#2563eb', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Mail size={13} />
                          <span>Simulasi Terkirim ({activeIncident.timeline.filter(t => t.type.includes('ESCALATION') || t.type.includes('REMINDER')).length} Email)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. CATATAN PERBAIKAN TERBARU */}
                  <div style={{ background: '#fffbe1', border: '1px solid #fef08a', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#854d0e', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Wrench size={14} /> Catatan Perbaikan &amp; Pembaruan Kondisi Terbaru
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#713f12' }}>
                      &quot;{activeIncident.latestRepairNote}&quot;
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#a16207', marginTop: '0.2rem' }}>
                      Pembaruan Terakhir: {activeIncident.latestUpdateDate}
                    </div>
                  </div>

                  {/* 3. TIMELINE "RIWAYAT PENANGANAN & ESKALASI" */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Clock size={16} style={{ color: '#2563eb' }} /> Timeline Riwayat Penanganan &amp; Eskalasi (Terbaru di Atas)
                      </span>
                      <span style={{ fontSize: '0.725rem', fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                        {activeIncident.timeline.length} Aktivitas
                      </span>
                    </div>

                    <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {activeIncident.timeline.map((evt, idx) => {
                        const isScheduled = evt.isFutureScheduled
                        return (
                          <div key={evt.id || idx} style={{ position: 'relative' }}>
                            {/* Dot on timeline line */}
                            <div
                              style={{
                                position: 'absolute',
                                left: '-1.95rem',
                                top: '0.15rem',
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: isScheduled ? '#f59e0b' : (evt.type === 'RECOVERED' ? '#16a34a' : (evt.type.includes('ESCALATION') ? '#dc2626' : '#2563eb')),
                                border: '2px solid #ffffff',
                                boxShadow: '0 0 0 2px rgba(0,0,0,0.1)'
                              }}
                            />

                            <div
                              style={{
                                background: isScheduled ? '#fffbe1' : '#ffffff',
                                border: isScheduled ? '1px dashed #f59e0b' : '1px solid #e2e8f0',
                                borderRadius: '6px',
                                padding: '0.65rem 0.85rem'
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: isScheduled ? '#854d0e' : '#0f172a' }}>
                                  {evt.title}
                                </div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b' }}>
                                  {evt.timestamp}
                                </div>
                              </div>

                              <div style={{ fontSize: '0.775rem', color: '#475569', lineHeight: 1.4 }}>
                                {evt.description}
                              </div>

                              {evt.recipientEmail && (
                                <div style={{ fontSize: '0.7rem', color: '#2563eb', fontWeight: 600, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Send size={12} /> Target Penerima: {evt.recipientEmail} ({evt.recipientRole})
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* 4. BAGIAN "LAPORAN TERKAIT" (ACCORDION) */}
                  <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden' }}>
                    <div
                      onClick={() => setShowRelatedReportsAccordion(!showRelatedReportsAccordion)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        background: '#f8fafc',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '0.825rem',
                        color: '#0f172a'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <FileText size={15} style={{ color: '#2563eb' }} />
                        Laporan Terkait Incident Ini ({activeIncident.relatedReports.length} laporan harian)
                      </span>
                      {showRelatedReportsAccordion ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>

                    {showRelatedReportsAccordion && (
                      <div style={{ padding: '0.75rem', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
                        {activeIncident.relatedReports.length === 0 ? (
                          <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', padding: '0.5rem' }}>
                            Tidak ada laporan harian tambahan tercatat pada periode filter ini.
                          </div>
                        ) : (
                          <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                            <thead>
                              <tr style={{ background: '#f1f5f9', textTransform: 'uppercase', fontSize: '0.675rem', color: '#475569' }}>
                                <th style={{ padding: '0.45rem', textAlign: 'left' }}>Tanggal</th>
                                <th style={{ padding: '0.45rem', textAlign: 'left' }}>Kategori</th>
                                <th style={{ padding: '0.45rem', textAlign: 'left' }}>Catatan Disampaikan</th>
                                <th style={{ padding: '0.45rem', textAlign: 'center' }}>Detail</th>
                              </tr>
                            </thead>
                            <tbody>
                              {activeIncident.relatedReports.map(rep => (
                                <tr key={rep.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                  <td style={{ padding: '0.45rem', fontWeight: 600 }}>{rep.date}</td>
                                  <td style={{ padding: '0.45rem' }}>{rep.reportType}</td>
                                  <td style={{ padding: '0.45rem' }}>{rep.repairStatus || rep.gpsNote || rep.picComment || '—'}</td>
                                  <td style={{ padding: '0.45rem', textAlign: 'center' }}>
                                    <button
                                      type="button"
                                      onClick={() => onOpenReportModal && onOpenReportModal(rep)}
                                      style={{ padding: '0.15rem 0.4rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem' }}
                                    >
                                      🔍
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* INLINE COMMENT MODAL FOR URGENT REPORTS */}
      {commentingReport && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', maxWidth: '520px', width: '100%', padding: '1.25rem', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', color: '#ea580c', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MessageSquare size={16} /> Beri Komentar Laporan Urgent (#{commentingReport.id})
              </h4>
              <button onClick={() => setCommentingReport(null)} style={{ border: 'none', background: 'transparent', fontSize: '1.1rem', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '0.85rem' }}>
              Memberikan komentar untuk role: <strong style={{ color: '#2563eb' }}>{userRole}</strong>. Klasifikasi laporan tetap disimpan sebagai <strong style={{ color: '#ea580c' }}>Urgent</strong>.
            </div>

            {commentSuccessMsg ? (
              <div style={{ background: '#dcfce7', color: '#15803d', padding: '0.75rem', borderRadius: '6px', fontSize: '0.825rem', fontWeight: 700, textAlign: 'center' }}>
                {commentSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleSaveReportComment}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Tulis Komentar &amp; Pengarahan Penanganan:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Contoh: Harap segera tindak lanjuti inspeksi fisik di blok rawan D-12..."
                    style={{ width: '100%', padding: '0.6rem', fontSize: '0.825rem', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setCommentingReport(null)}
                    style={{ padding: '0.45rem 0.85rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '0.45rem 1rem', background: '#ea580c', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Send size={14} /> Simpan Komentar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
