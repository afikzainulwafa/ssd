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

  // Sub-filter for report tables (Semua, Normal, Urgent)
  const [tableCommentFilter, setTableCommentFilter] = useState<'ALL' | 'PENDING'>('ALL')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedDetailReport, setSelectedDetailReport] = useState<PatrolReportRecord | null>(null)

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
    setTableCommentFilter(pendingOnly ? 'PENDING' : 'ALL')
    setCurrentPage(1)
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
    const targetRep = selectedDetailReport || commentingReport
    if (!targetRep || !commentInput.trim()) return

    const updated = localReports.map(r => {
      if (r.id === targetRep.id) {
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
    const updatedTarget = updated.find(r => r.id === targetRep.id) || null
    if (selectedDetailReport && updatedTarget) {
      setSelectedDetailReport(updatedTarget)
    }
    if (onUpdateReportComment) {
      onUpdateReportComment(targetRep.id, userRole, commentInput)
    }

    setCommentSuccessMsg('Komentar berhasil disimpan. Penanda kewajiban role telah diperbarui.')
    setTimeout(() => {
      setCommentSuccessMsg('')
      if (commentingReport) {
        setCommentingReport(null)
        setCommentInput('')
      }
    }, 1200)
  }

  // Handle opening Detail Modal
  const handleOpenDetailModal = (row: PatrolReportRecord) => {
    setSelectedDetailReport(row)
    setCommentInput(userRole === 'Manager' ? row.managerComment || '' : row.picComment || '')
    setCommentSuccessMsg('')
    if (onOpenReportModal) {
      onOpenReportModal(row)
    }
  }

  // Base reports for current active segment (ALL, NORMAL, URGENT)
  const currentSegmentReports = useMemo(() => {
    if (activeSegment === 'NORMAL') return normalReportsInPeriod
    if (activeSegment === 'URGENT') return urgentReportsInPeriod
    if (activeSegment === 'ALL') return localReports
    return []
  }, [activeSegment, normalReportsInPeriod, urgentReportsInPeriod, localReports])

  // Count of pending comments for role in current segment
  const currentSegmentPendingCount = useMemo(() => {
    if (activeSegment === 'NORMAL') return 0
    if (activeSegment === 'URGENT') return urgentPendingCount
    return localReports.filter(r => isReportPendingCommentForRole(r, userRole)).length
  }, [activeSegment, urgentPendingCount, localReports, userRole])

  // Filtered reports by comment status (ALL vs PENDING)
  const filteredTableReports = useMemo(() => {
    if (tableCommentFilter === 'PENDING') {
      return currentSegmentReports.filter(r => isReportPendingCommentForRole(r, userRole))
    }
    return currentSegmentReports
  }, [currentSegmentReports, tableCommentFilter, userRole])

  // Table title according to requirement (Navy #0f172a)
  const currentTableTitle = useMemo(() => {
    if (activeSegment === 'NORMAL') return `Daftar Laporan Patroli — Normal (${filteredTableReports.length} laporan)`
    if (activeSegment === 'URGENT') return `Daftar Laporan Patroli — Urgent (${filteredTableReports.length} laporan)`
    return `Daftar Seluruh Laporan Patroli (${filteredTableReports.length} laporan)`
  }, [activeSegment, filteredTableReports.length])

  // Pagination for table
  const PAGE_SIZE = 10
  const totalTablePages = Math.ceil(filteredTableReports.length / PAGE_SIZE) || 1
  const paginatedTableReports = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredTableReports.slice(start, start + PAGE_SIZE)
  }, [filteredTableReports, currentPage])

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

      {/* CATEGORY A: SEMUA, B: NORMAL, C: URGENT (UNIFIED 7-COLUMN REPORT TABLES) */}
      {(activeSegment === 'ALL' || activeSegment === 'NORMAL' || activeSegment === 'URGENT') && (
        <div>
          {/* Header row: Title on left, Segmented Control on right */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>{currentTableTitle}</span>
            </div>

            {/* Segmented Control: Semua (X) | Menunggu Komentar Anda (X) */}
            <div style={{
              display: 'flex',
              background: '#ffffff',
              padding: '2px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              height: '32px',
              alignItems: 'center',
              boxSizing: 'border-box'
            }}>
              <button
                type="button"
                onClick={() => {
                  setTableCommentFilter('ALL')
                  setCurrentPage(1)
                }}
                style={{
                  padding: '0 12px',
                  height: '26px',
                  border: tableCommentFilter === 'ALL' ? '1px solid #bfdbfe' : 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: tableCommentFilter === 'ALL' ? '#eff6ff' : 'transparent',
                  color: tableCommentFilter === 'ALL' ? '#2563eb' : '#64748B',
                  transition: 'all 0.15s ease',
                  fontFamily: 'inherit',
                  lineHeight: 1
                }}
              >
                Semua ({currentSegmentReports.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setTableCommentFilter('PENDING')
                  setCurrentPage(1)
                }}
                style={{
                  padding: '0 12px',
                  height: '26px',
                  border: tableCommentFilter === 'PENDING' ? '1px solid #bfdbfe' : 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: tableCommentFilter === 'PENDING' ? '#eff6ff' : 'transparent',
                  color: tableCommentFilter === 'PENDING' ? '#2563eb' : '#64748B',
                  transition: 'all 0.15s ease',
                  fontFamily: 'inherit',
                  lineHeight: 1
                }}
              >
                Menunggu Komentar Anda ({currentSegmentPendingCount})
              </button>
            </div>
          </div>

          {/* Unified 7-Column Table */}
          <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead style={{ background: '#e2e8f0' }}>
                <tr style={{ textTransform: 'uppercase', fontSize: '0.7rem', color: '#475569', fontWeight: 700, letterSpacing: '0.02em' }}>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left' }}>Tanggal</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left' }}>Estate</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left' }}>Nopol / Unit</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'center' }}>Status Pengiriman</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left' }}>Kategori Laporan</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left' }}>Status Review Manager</th>
                  <th style={{ padding: '0.6rem 0.75rem', textAlign: 'center' }}>Detail</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTableReports.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.825rem' }}>
                      Tidak ada laporan yang sesuai dengan filter ini.
                    </td>
                  </tr>
                ) : (
                  paginatedTableReports.map((row, idx) => {
                    const isZebra = idx % 2 === 1
                    return (
                      <tr
                        key={row.id}
                        style={{
                          borderBottom: '1px solid #e2e8f0',
                          background: isZebra ? '#f8fafc' : '#ffffff',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <td style={{ padding: '0.6rem 0.75rem', fontWeight: 600, color: '#0f172a' }}>{row.date}</td>
                        <td style={{ padding: '0.6rem 0.75rem', color: '#334155' }}>{row.estateId}</td>
                        <td style={{ padding: '0.6rem 0.75rem', fontWeight: 700, color: '#0f172a' }}>{row.vehicleId}</td>
                        <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center' }}>
                          <span style={{
                            padding: '0.15rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            background: row.submissionStatus === 'Sudah Dikirim' ? '#dcfce7' : '#fee2e2',
                            color: row.submissionStatus === 'Sudah Dikirim' ? '#15803d' : '#b91c1c'
                          }}>
                            {row.submissionStatus}
                          </span>
                        </td>
                        <td style={{ padding: '0.6rem 0.75rem' }}>
                          <span style={{
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            background:
                              row.reportType === 'Normal' ? '#dbeafe' :
                              row.reportType === 'Urgent' ? '#ffedd5' :
                              row.reportType === 'Unit Rusak' ? '#fef3c7' : '#fee2e2',
                            color:
                              row.reportType === 'Normal' ? '#1e40af' :
                              row.reportType === 'Urgent' ? '#c2410c' :
                              row.reportType === 'Unit Rusak' ? '#92400e' : '#b91c1c'
                          }}>
                            {row.reportType}
                          </span>
                        </td>
                        <td style={{ padding: '0.6rem 0.75rem' }}>
                          {row.managerComment ? (
                            <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <CheckCircle size={13} /> Reviewed ({row.managerRating || 'Approved'})
                            </span>
                          ) : row.reportType === 'Urgent' && isReportPendingCommentForRole(row, userRole) ? (
                            <span style={{ fontSize: '0.75rem', color: '#c2410c', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <AlertCircle size={13} /> Menunggu Review
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Belum Ditinjau</span>
                          )}
                        </td>
                        <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleOpenDetailModal(row)}
                            title="Lihat Detail & Tindak Lanjut"
                            style={{
                              padding: '0.25rem 0.6rem',
                              background: '#f8fafc',
                              color: '#0f172a',
                              border: '1px solid #cbd5e1',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                              fontWeight: 600
                            }}
                          >
                            🔍
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {filteredTableReports.length > PAGE_SIZE && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 0.5rem',
              marginTop: '0.5rem',
              fontSize: '0.775rem',
              color: '#64748b'
            }}>
              <div>
                Menampilkan {Math.min((currentPage - 1) * PAGE_SIZE + 1, filteredTableReports.length)}–{Math.min(currentPage * PAGE_SIZE, filteredTableReports.length)} dari {filteredTableReports.length} laporan
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  style={{
                    padding: '0.25rem 0.65rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '5px',
                    background: currentPage === 1 ? '#f8fafc' : '#ffffff',
                    color: currentPage === 1 ? '#94a3b8' : '#0f172a',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Sebelumnya
                </button>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', padding: '0 4px' }}>
                  {currentPage} / {totalTablePages}
                </span>
                <button
                  type="button"
                  disabled={currentPage >= totalTablePages}
                  onClick={() => setCurrentPage(p => Math.min(totalTablePages, p + 1))}
                  style={{
                    padding: '0.25rem 0.65rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '5px',
                    background: currentPage >= totalTablePages ? '#f8fafc' : '#ffffff',
                    color: currentPage >= totalTablePages ? '#94a3b8' : '#0f172a',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: currentPage >= totalTablePages ? 'not-allowed' : 'pointer'
                  }}
                >
                  Berikutnya
                </button>
              </div>
            </div>
          )}
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

      {/* DETAIL & COMMENT MODAL FOR PATROL REPORTS */}
      {(selectedDetailReport || commentingReport) && (
        (() => {
          const rep = selectedDetailReport || commentingReport!
          return (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem' }}>
              <div style={{ background: '#ffffff', borderRadius: '12px', maxWidth: '580px', width: '100%', padding: '1.5rem', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
                {/* Modal Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                      Detail Laporan Patroli #{rep.id}
                    </h4>
                    <span style={{
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background:
                        rep.reportType === 'Normal' ? '#dbeafe' :
                        rep.reportType === 'Urgent' ? '#ffedd5' :
                        rep.reportType === 'Unit Rusak' ? '#fef3c7' : '#fee2e2',
                      color:
                        rep.reportType === 'Normal' ? '#1e40af' :
                        rep.reportType === 'Urgent' ? '#c2410c' :
                        rep.reportType === 'Unit Rusak' ? '#92400e' : '#b91c1c'
                    }}>
                      {rep.reportType}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDetailReport(null)
                      setCommentingReport(null)
                    }}
                    style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', color: '#64748b' }}
                  >
                    ✕
                  </button>
                </div>

                {/* Metadata Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.825rem', marginBottom: '1rem' }}>
                  <div>Tanggal Patroli: <strong>{rep.date}</strong></div>
                  <div>Estate: <strong>{rep.estateId}</strong></div>
                  <div>Unit Kendaraan: <strong>{rep.vehicleId}</strong></div>
                  <div>
                    Status Pengiriman:{' '}
                    <span style={{
                      padding: '0.1rem 0.45rem',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      background: rep.submissionStatus === 'Sudah Dikirim' ? '#dcfce7' : '#fee2e2',
                      color: rep.submissionStatus === 'Sudah Dikirim' ? '#15803d' : '#b91c1c'
                    }}>
                      {rep.submissionStatus}
                    </span>
                  </div>
                  <div>Kategori Utama: <strong>{rep.reportType}</strong></div>
                  <div>Upload Timestamp: <strong>{rep.uploadDate || '—'}</strong></div>
                  <div style={{ gridColumn: 'span 2' }}>Status Review: <strong>{rep.status}</strong></div>
                </div>

                {/* Catatan PIC */}
                <div style={{ background: '#f8fafc', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '0.85rem' }}>
                  <h5 style={{ margin: '0 0 0.3rem 0', fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                    Catatan PIC Patroli:
                  </h5>
                  <p style={{ margin: 0, fontSize: '0.825rem', color: '#475569', fontStyle: rep.picComment ? 'normal' : 'italic' }}>
                    {rep.picComment || 'Belum ada catatan PIC.'}
                  </p>
                </div>

                {/* Catatan & Keputusan Manager */}
                <div style={{ background: '#f8fafc', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                  <h5 style={{ margin: '0 0 0.3rem 0', fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                    Catatan &amp; Keputusan Manager:
                  </h5>
                  <p style={{ margin: 0, fontSize: '0.825rem', color: '#475569', fontStyle: rep.managerComment ? 'normal' : 'italic' }}>
                    {rep.managerComment || 'Belum ditinjau Manager.'}
                  </p>
                </div>

                {/* Form Komentar for Urgent Reports or Role Action */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.85rem' }}>
                  <h5 style={{ margin: '0 0 0.45rem 0', fontSize: '0.825rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MessageSquare size={14} style={{ color: '#2563eb' }} />
                    Form Komentar / Tindak Lanjut (Role: {userRole})
                  </h5>

                  {commentSuccessMsg ? (
                    <div style={{ background: '#dcfce7', color: '#15803d', padding: '0.65rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, textAlign: 'center', marginBottom: '0.85rem' }}>
                      {commentSuccessMsg}
                    </div>
                  ) : (
                    <form onSubmit={handleSaveReportComment}>
                      <div style={{ marginBottom: '0.85rem' }}>
                        <textarea
                          rows={3}
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder={`Tulis arahan tindak lanjut sebagai ${userRole}...`}
                          style={{ width: '100%', padding: '0.55rem', fontSize: '0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                        />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDetailReport(null)
                            setCommentingReport(null)
                          }}
                          style={{ padding: '0.4rem 0.85rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', color: '#475569' }}
                        >
                          Tutup
                        </button>
                        <button
                          type="submit"
                          disabled={!commentInput.trim()}
                          style={{
                            padding: '0.4rem 0.95rem',
                            background: commentInput.trim() ? '#2563eb' : '#94a3b8',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: commentInput.trim() ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Send size={13} /> Simpan Komentar
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )
        })()
      )}
    </div>
  )
}
