'use client'

import React, { useState, useMemo } from 'react'
import PageShell from '@/components/PageShell'
import HierarchyFilterBar, { HierarchyFilterState, PeriodPreset } from '@/components/HierarchyFilterBar'
import {
  Car,
  Clock,
  Navigation,
  Wrench,
  ChevronRight,
  Info,
  BarChart2,
  TrendingUp,
  Search,
  Radio,
  X,
  Calendar as CalendarIcon
} from 'lucide-react'
import {
  selectUtilizationStatusUnit,
  selectUtilizationOperationalTime,
  selectUtilizationRepairs,
  selectRouteEffectivenessKpis,
  selectRouteComparison,
  selectRouteTrendTable,
  selectRouteDailyDetail,
  getFilteredVehicles,
  getFilteredPatrolRuns
} from '@/lib/selectors'
import { GlobalFilterState } from '@/lib/types'

// ── Indonesian Formatting Helpers ───────────────────────────────────────────
function fmtKm(v: number): string {
  if (v === undefined || v === null || isNaN(v)) return '0,0 km'
  return v.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' km'
}

function fmtPct(v: number | null): string {
  if (v === null || v === undefined || isNaN(v)) return '—'
  return v.toFixed(1).replace('.', ',') + '%'
}

function fmtHours(v: number): string {
  if (v === undefined || v === null || isNaN(v)) return '0,0 jam'
  return v.toFixed(1).replace('.', ',') + ' jam'
}

export default function UtilizationPage() {
  // Global hierarchy filter state
  const [filterState, setFilterState] = useState<HierarchyFilterState>({
    psm: 'PSM 1',
    region: 'RIAS',
    estate: 'KULE',
    year: '2026',
    month: 'May',
    unitType: 'ALL'
  })

  // Period preset & date ranges
  const [periodPreset, setPeriodPreset] = useState<PeriodPreset>('Bulan Ini')
  const [customStart, setCustomStart] = useState<string>('2026-05-01')
  const [customEnd, setCustomEnd] = useState<string>('2026-05-31')

  // Handle Period Changes
  const handlePeriodChange = (preset: PeriodPreset, customStartStr?: string, customEndStr?: string) => {
    setPeriodPreset(preset)
    if (preset === 'Bulan Ini') {
      setCustomStart('2026-05-01')
      setCustomEnd('2026-05-31')
      setFilterState(prev => ({ ...prev, year: '2026', month: 'May' }))
    } else if (preset === 'Bulan Lalu') {
      setCustomStart('2026-04-01')
      setCustomEnd('2026-04-30')
      setFilterState(prev => ({ ...prev, year: '2026', month: 'Apr' }))
    } else if (preset === '30 Hari Terakhir') {
      setCustomStart('2026-05-02')
      setCustomEnd('2026-05-31')
      setFilterState(prev => ({ ...prev, year: '2026', month: 'May' }))
    } else if (preset === 'Rentang Kustom' && customStartStr && customEndStr) {
      setCustomStart(customStartStr)
      setCustomEnd(customEndStr)
    }
  }

  // Active Main Card (Default: Status)
  const [activeCard, setActiveCard] = useState<'Status' | 'Waktu' | 'Jarak' | 'Perbaikan'>('Status')

  // Sub-controls for Waktu Operasional
  const [waktuViewMode, setWaktuViewMode] = useState<'Perbandingan' | 'Tren Harian'>('Perbandingan')
  const [waktuUnitMode, setWaktuUnitMode] = useState<'Jam' | '%'>('Jam')

  // Sub-controls for Jarak Tempuh
  const [jarakViewMode, setJarakViewMode] = useState<'Perbandingan' | 'Tren Harian'>('Perbandingan')
  const [jarakUnitMode, setJarakUnitMode] = useState<'Total' | 'Rata-rata'>('Total')

  // Sub-controls for Perbaikan
  const [repairCategory, setRepairCategory] = useState<'Kendaraan' | 'GPS'>('Kendaraan')
  const [repairFilter, setRepairFilter] = useState<'Berjalan' | 'Selesai' | 'Semua'>('Berjalan')
  const [selectedStageFilter, setSelectedStageFilter] = useState<string | null>(null)
  const [selectedCaseHistory, setSelectedCaseHistory] = useState<any | null>(null)

  // Local drilldown selection for Status Unit & Jarak
  const [localRowSelect, setLocalRowSelect] = useState<string | null>(null)
  const [selectedCalDate, setSelectedCalDate] = useState<string | null>('2026-05-31')
  const [selectedCalStatus, setSelectedCalStatus] = useState<string | null>(null)

  // Tooltip popovers
  const [showCardInfo, setShowCardInfo] = useState<string | null>(null)

  // Global Filter Object for Selectors
  const globalFilters: GlobalFilterState = useMemo(() => ({
    psm: filterState.psm,
    region: filterState.region,
    estate: filterState.estate,
    year: filterState.year || '2026',
    month: filterState.month || 'May',
    vehicleId: filterState.unitType !== 'ALL' ? filterState.unitType : undefined,
    startDate: customStart,
    endDate: customEnd
  }), [filterState, customStart, customEnd])

  // Data Selectors
  const statusUnitData = useMemo(() => selectUtilizationStatusUnit(globalFilters), [globalFilters])
  const operationalTimeData = useMemo(() => selectUtilizationOperationalTime(globalFilters), [globalFilters])
  const repairData = useMemo(() => selectUtilizationRepairs(globalFilters), [globalFilters])
  const routeKpis = useMemo(() => selectRouteEffectivenessKpis(globalFilters), [globalFilters])
  const routeComp = useMemo(() => selectRouteComparison(globalFilters), [globalFilters])
  const routeDaily = useMemo(() => selectRouteDailyDetail(globalFilters), [globalFilters])

  const filteredVehicles = useMemo(() => getFilteredVehicles(globalFilters), [globalFilters])
  const filteredRuns = useMemo(() => getFilteredPatrolRuns(globalFilters), [globalFilters])

  // Distance Stats
  const distanceStats = useMemo(() => {
    const totalKm = routeKpis.totalActualKm
    const observedVehicleDays = Math.max(1, new Set(filteredRuns.map(r => `${r.date}__${r.vehicleId}`)).size)
    const avgKmPerDay = Math.round((totalKm / observedVehicleDays) * 10) / 10

    let lowestKm = { val: 999, nopol: '-', date: '-' }
    let highestKm = { val: 0, nopol: '-', date: '-' }

    for (const r of routeDaily) {
      if (r.actualKm < lowestKm.val) lowestKm = { val: r.actualKm, nopol: r.nopol, date: r.date }
      if (r.actualKm > highestKm.val) highestKm = { val: r.actualKm, nopol: r.nopol, date: r.date }
    }
    if (lowestKm.val === 999) lowestKm.val = 0

    return {
      totalKm,
      avgKmPerDay,
      lowestKm,
      highestKm,
      observedVehicleDays
    }
  }, [routeKpis, filteredRuns, routeDaily])

  // Calendar filtering helpers
  const activeCalDay = useMemo(() => {
    if (!selectedCalDate) return null
    return statusUnitData.calendarDays.find(d => d.date === selectedCalDate) || null
  }, [statusUnitData, selectedCalDate])

  const filteredCalVehicles = useMemo(() => {
    if (!activeCalDay) return []
    let list = activeCalDay.vehicleDetails
    if (localRowSelect) {
      if (filterState.estate && filterState.estate !== 'ALL') {
        list = list.filter(v => v.vehicleId === localRowSelect)
      } else {
        list = list.filter(v => v.estateId === localRowSelect)
      }
    }
    if (selectedCalStatus) {
      list = list.filter(v => v.status === selectedCalStatus)
    }
    return list
  }, [activeCalDay, localRowSelect, filterState.estate, selectedCalStatus])

  // Repair Cases filtering
  const filteredRepairCases = useMemo(() => {
    return repairData.cases.filter(c => {
      if (c.category !== repairCategory) return false
      if (repairFilter === 'Berjalan' && c.isCompleted) return false
      if (repairFilter === 'Selesai' && !c.isCompleted) return false
      if (selectedStageFilter && c.lastStatus !== selectedStageFilter) return false
      return true
    })
  }, [repairData, repairCategory, repairFilter, selectedStageFilter])

  // Vehicle repair stage breakdown counts
  const repairStageBreakdown = useMemo(() => {
    const stages = [
      'Pelaporan Kerusakan',
      'Pemeriksaan Bengkel',
      'Menunggu Sparepart',
      'Menunggu Kedatangan Barang',
      'Barang Diterima',
      'Dalam Perbaikan',
      'Selesai'
    ]
    const openCases = repairData.cases.filter(c => c.category === 'Kendaraan' && !c.isCompleted)
    const stageCounts: { [key: string]: number } = {}
    for (const s of stages) stageCounts[s] = 0
    for (const c of openCases) {
      stageCounts[c.lastStatus] = (stageCounts[c.lastStatus] || 0) + 1
    }
    return stages.map(s => ({ stage: s, count: stageCounts[s] || 0 }))
  }, [repairData])

  return (
    <PageShell
      title="Utilisasi Kendaraan & GPS"
      topbarExtra={
        <HierarchyFilterBar
          filterState={filterState}
          onChange={setFilterState}
          showUnitTypeFilter={false}
          useCompactPeriodDropdown={true}
          datePreset={periodPreset}
          customStartDate={customStart}
          customEndDate={customEnd}
          onPeriodChange={handlePeriodChange}
        />
      }
    >
      {/* 4 EQUAL-HEIGHT COMPACT INTERACTIVE CARDS IN ONE DESKTOP ROW */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '16px',
        fontFamily: "'Poppins', sans-serif"
      }}>
        {/* CARD A: STATUS UNIT */}
        <div
          onClick={() => setActiveCard('Status')}
          style={{
            background: '#ffffff',
            border: activeCard === 'Status' ? '2px solid #16a34a' : '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '14px 16px',
            cursor: 'pointer',
            boxShadow: activeCard === 'Status' ? '0 4px 14px rgba(22, 163, 74, 0.12)' : '0 1px 3px rgba(0,0,0,0.04)',
            transition: 'all 0.15s ease',
            position: 'relative',
            overflow: 'hidden',
            height: '155px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {/* Top colored stripe */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', background: '#16a34a' }} />

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Car size={18} style={{ color: '#16a34a' }} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#172B4D' }}>
                Status Unit
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowCardInfo(p => p === 'status' ? null : 'status') }}
                style={{ border: 'none', background: 'transparent', color: '#94a3b8', padding: '2px', cursor: 'pointer' }}
                title="Informasi Status Unit"
              >
                <Info size={15} />
              </button>
              <ChevronRight size={16} style={{ color: activeCard === 'Status' ? '#16a34a' : '#cbd5e1' }} />
            </div>
          </div>

          {/* Number & label */}
          <div>
            <div style={{ fontSize: '30px', fontWeight: 700, color: '#16a34a', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {fmtPct(statusUnitData.periodStatus.aktifPct)}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
              {statusUnitData.inventory.totalVehicles} unit armada total
            </div>
          </div>

          {/* Progress track & micro stats */}
          <div>
            <div style={{ height: '6px', borderRadius: '3px', background: '#f1f5f9', overflow: 'hidden', display: 'flex', marginBottom: '6px' }}>
              <div style={{ width: `${statusUnitData.periodStatus.aktifPct || 0}%`, background: '#16a34a', borderRadius: '3px' }} />
            </div>
            <div style={{ fontSize: '11px', color: '#475569', fontWeight: 500, display: 'flex', justifyContent: 'space-between' }}>
              <span>🚗 {statusUnitData.inventory.mobilCount} Mobil</span>
              <span>🏍️ {statusUnitData.inventory.motorCount} Motor</span>
              <span>{statusUnitData.periodStatus.aktifCount} hari aktif</span>
            </div>
          </div>
        </div>

        {/* CARD B: WAKTU OPERASIONAL */}
        <div
          onClick={() => setActiveCard('Waktu')}
          style={{
            background: '#ffffff',
            border: activeCard === 'Waktu' ? '2px solid #2563eb' : '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '14px 16px',
            cursor: 'pointer',
            boxShadow: activeCard === 'Waktu' ? '0 4px 14px rgba(37, 99, 235, 0.12)' : '0 1px 3px rgba(0,0,0,0.04)',
            transition: 'all 0.15s ease',
            position: 'relative',
            overflow: 'hidden',
            height: '155px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {/* Top colored stripe */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', background: '#2563eb' }} />

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Clock size={18} style={{ color: '#2563eb' }} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#172B4D' }}>
                Waktu Operasional
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowCardInfo(p => p === 'waktu' ? null : 'waktu') }}
                style={{ border: 'none', background: 'transparent', color: '#94a3b8', padding: '2px', cursor: 'pointer' }}
                title="Informasi Waktu Operasional"
              >
                <Info size={15} />
              </button>
              <ChevronRight size={16} style={{ color: activeCard === 'Waktu' ? '#2563eb' : '#cbd5e1' }} />
            </div>
          </div>

          {showCardInfo === 'waktu' && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 6, zIndex: 50,
              background: '#0f172a', color: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: 8,
              fontSize: '0.75rem', lineHeight: 1.4, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)'
            }}>
              Dihitung dari hari berstatus Aktif. Bergerak + berhenti = 24 jam per unit per hari. Unit Rusak, GPS Rusak, dan Belum Dikirim tidak disertakan.
            </div>
          )}

          {/* Number & label */}
          <div>
            <div style={{ fontSize: '30px', fontWeight: 700, color: '#172B4D', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {operationalTimeData.avgMovingHours !== null ? fmtHours(operationalTimeData.avgMovingHours) : '—'}
              {operationalTimeData.avgMovingHours !== null && (
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748B' }}> /hari</span>
              )}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
              Rata-rata bergerak aktif
            </div>
          </div>

          {/* Progress track */}
          <div>
            <div style={{ height: '6px', borderRadius: '3px', background: '#f1f5f9', overflow: 'hidden', display: 'flex', marginBottom: '6px' }}>
              <div style={{ width: `${operationalTimeData.movingSharePct || 0}%`, background: '#2563eb', borderRadius: '3px' }} />
            </div>
            <div style={{ fontSize: '11px', color: '#475569', fontWeight: 500, display: 'flex', justifyContent: 'space-between' }}>
              <span>Bergerak: {fmtPct(operationalTimeData.movingSharePct)}</span>
              <span>Berhenti: {fmtPct(operationalTimeData.stoppedSharePct)}</span>
            </div>
          </div>
        </div>

        {/* CARD C: JARAK TEMPUH */}
        <div
          onClick={() => setActiveCard('Jarak')}
          style={{
            background: '#ffffff',
            border: activeCard === 'Jarak' ? '2px solid #0284c7' : '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '14px 16px',
            cursor: 'pointer',
            boxShadow: activeCard === 'Jarak' ? '0 4px 14px rgba(2, 132, 199, 0.12)' : '0 1px 3px rgba(0,0,0,0.04)',
            transition: 'all 0.15s ease',
            position: 'relative',
            overflow: 'hidden',
            height: '155px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {/* Top colored stripe */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', background: '#0284c7' }} />

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Navigation size={18} style={{ color: '#0284c7' }} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#172B4D' }}>
                Jarak Tempuh
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowCardInfo(p => p === 'jarak' ? null : 'jarak') }}
                style={{ border: 'none', background: 'transparent', color: '#94a3b8', padding: '2px', cursor: 'pointer' }}
                title="Informasi Jarak Tempuh"
              >
                <Info size={15} />
              </button>
              <ChevronRight size={16} style={{ color: activeCard === 'Jarak' ? '#0284c7' : '#cbd5e1' }} />
            </div>
          </div>

          {/* Number & label */}
          <div>
            <div style={{ fontSize: '30px', fontWeight: 700, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {fmtKm(distanceStats.totalKm)}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
              Total jarak periode
            </div>
          </div>

          {/* Progress track */}
          <div>
            <div style={{ height: '6px', borderRadius: '3px', background: '#f1f5f9', overflow: 'hidden', display: 'flex', marginBottom: '6px' }}>
              <div style={{ width: '75%', background: '#0284c7', borderRadius: '3px' }} />
            </div>
            <div style={{ fontSize: '11px', color: '#475569', fontWeight: 500, display: 'flex', justifyContent: 'space-between' }}>
              <span>Rata-rata: {fmtKm(distanceStats.avgKmPerDay)}/hari</span>
              <span>{distanceStats.observedVehicleDays} unit-hari</span>
            </div>
          </div>
        </div>

        {/* CARD D: PERBAIKAN */}
        <div
          onClick={() => setActiveCard('Perbaikan')}
          style={{
            background: '#ffffff',
            border: activeCard === 'Perbaikan' ? '2px solid #d97706' : '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '14px 16px',
            cursor: 'pointer',
            boxShadow: activeCard === 'Perbaikan' ? '0 4px 14px rgba(217, 119, 6, 0.12)' : '0 1px 3px rgba(0,0,0,0.04)',
            transition: 'all 0.15s ease',
            position: 'relative',
            overflow: 'hidden',
            height: '155px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {/* Top colored stripe */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', background: '#d97706' }} />

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Wrench size={18} style={{ color: '#d97706' }} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#172B4D' }}>
                Perbaikan
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowCardInfo(p => p === 'perbaikan' ? null : 'perbaikan') }}
                style={{ border: 'none', background: 'transparent', color: '#94a3b8', padding: '2px', cursor: 'pointer' }}
                title="Informasi Perbaikan"
              >
                <Info size={15} />
              </button>
              <ChevronRight size={16} style={{ color: activeCard === 'Perbaikan' ? '#d97706' : '#cbd5e1' }} />
            </div>
          </div>

          {/* Number & label */}
          <div>
            <div style={{ fontSize: '30px', fontWeight: 700, color: '#d97706', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {repairData.affectedVehiclesCount} unit
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
              Dalam proses perbaikan
            </div>
          </div>

          {/* Progress track */}
          <div>
            <div style={{ height: '6px', borderRadius: '3px', background: '#f1f5f9', overflow: 'hidden', display: 'flex', marginBottom: '6px' }}>
              <div style={{
                width: `${Math.min(100, Math.max(15, (repairData.affectedVehiclesCount / Math.max(1, statusUnitData.inventory.totalVehicles)) * 100))}%`,
                background: '#d97706', borderRadius: '3px'
              }} />
            </div>
            <div style={{ fontSize: '11px', color: '#475569', fontWeight: 500, display: 'flex', justifyContent: 'space-between' }}>
              <span>{repairData.openCasesCount} kasus aktif</span>
              <span>Terlama: {repairData.oldestOpenCaseAgeDays} hari</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CARD 1: STATUS UNIT CONTENT ─────────────────────────────────────── */}
      {activeCard === 'Status' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontFamily: "'Poppins', sans-serif" }}>
          {/* Status Summary Strip (Legend & Shares) */}
          <div className="container-panel-line" style={{
            background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0',
            padding: '1rem 1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#16a34a' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#15803d' }}>Aktif: {fmtPct(statusUnitData.periodStatus.aktifPct)}</span>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>({statusUnitData.periodStatus.aktifCount} hari)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#dc2626' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#b91c1c' }}>Unit Rusak: {fmtPct(statusUnitData.periodStatus.unitRusakPct)}</span>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>({statusUnitData.periodStatus.unitRusakCount} hari)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#d97706' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#b45309' }}>GPS Rusak: {fmtPct(statusUnitData.periodStatus.gpsRusakPct)}</span>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>({statusUnitData.periodStatus.gpsRusakCount} hari)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#94a3b8' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Belum Dikirim: {fmtPct(statusUnitData.periodStatus.belumDikirimPct)}</span>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>({statusUnitData.periodStatus.belumDikirimCount} hari)</span>
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Penyebut: <strong style={{ color: '#0f172a' }}>{statusUnitData.periodStatus.totalVehicleDays} vehicle-days</strong> ({statusUnitData.inventory.totalVehicles} unit × hari berlaku)
            </div>
          </div>

          {/* Summary Table */}
          <div className="container-panel-line" style={{
            background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0',
            padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#172B4D' }}>
                  Ringkasan Armada
                </h3>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                  Distribusi status unit per wilayah atau kendaraan dalam rentang waktu terpilih
                </div>
              </div>
              {localRowSelect && (
                <button
                  type="button"
                  onClick={() => setLocalRowSelect(null)}
                  style={{
                    padding: '0.3rem 0.65rem', fontSize: '0.72rem', borderRadius: 6,
                    border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer',
                    fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '4px'
                  }}
                >
                  <X size={12} /> Hapus Filter: {localRowSelect}
                </button>
              )}
            </div>

            <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Wilayah / Nopol</th>
                    {statusUnitData.summaryTableRows.some(r => r.type === 'Geographic') && (
                      <>
                        <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Mobil</th>
                        <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Motor</th>
                        <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Total</th>
                      </>
                    )}
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700, width: '45%' }}>Status Periode</th>
                  </tr>
                </thead>
                <tbody>
                  {statusUnitData.summaryTableRows.map(row => {
                    const isSelected = localRowSelect === row.id
                    return (
                      <tr key={row.id}
                        onClick={() => setLocalRowSelect(prev => prev === row.id ? null : row.id)}
                        style={{
                          borderBottom: '1px solid #f1f5f9', cursor: 'pointer',
                          background: isSelected ? '#f0f9ff' : 'transparent',
                          fontWeight: isSelected ? 600 : 400,
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>
                          {row.type === 'Vehicle' && (row.vehicleType === 'Car' ? '🚗 ' : '🏍️ ')}
                          {row.label}
                        </td>
                        {statusUnitData.summaryTableRows.some(r => r.type === 'Geographic') && (
                          row.type === 'Geographic' ? (
                            <>
                              <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: '#334155' }}>{row.mobilCount}</td>
                              <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: '#334155' }}>{row.motorCount}</td>
                              <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>{row.totalCount}</td>
                            </>
                          ) : (
                            <>
                              <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: '#94a3b8' }}>—</td>
                              <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: '#94a3b8' }}>—</td>
                              <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: '#94a3b8' }}>—</td>
                            </>
                          )
                        )}
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center' }}>
                          <div style={{ display: 'flex', height: 16, borderRadius: 4, overflow: 'hidden', background: '#e2e8f0' }}
                            title={`Aktif: ${fmtPct(row.aktifPct)}\nUnit Rusak: ${fmtPct(row.unitRusakPct)}\nGPS Rusak: ${fmtPct(row.gpsRusakPct)}\nBelum Dikirim: ${fmtPct(row.belumDikirimPct)}`}
                          >
                            <div style={{ width: `${row.aktifPct}%`, background: '#16a34a' }} />
                            <div style={{ width: `${row.unitRusakPct}%`, background: '#dc2626' }} />
                            <div style={{ width: `${row.gpsRusakPct}%`, background: '#d97706' }} />
                            <div style={{ width: `${row.belumDikirimPct}%`, background: '#94a3b8' }} />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Calendar View */}
          <div className="container-panel-line" style={{
            background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0',
            padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#172B4D' }}>
                  Kalender Status Unit ({filterState.month} {filterState.year})
                </h3>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                  Klik tanggal atau badge status untuk menyaring detail unit di bawah
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem', color: '#64748b' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a' }} /> Aktif
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#dc2626' }} /> Unit Rusak
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#d97706' }} /> GPS Rusak
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#94a3b8' }} /> Belum Dikirim
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(dayName => (
                <div key={dayName} style={{ textAlign: 'center', fontSize: '0.72rem', fontWeight: 700, color: '#475569', padding: '0.3rem', background: '#f8fafc', borderRadius: 4 }}>
                  {dayName}
                </div>
              ))}
              {statusUnitData.calendarDays.map(cd => {
                const isSelected = selectedCalDate === cd.date
                return (
                  <div key={cd.date}
                    onClick={() => {
                      if (!cd.isFuture) {
                        setSelectedCalDate(prev => prev === cd.date ? null : cd.date)
                      }
                    }}
                    style={{
                      border: isSelected ? '2px solid #16a34a' : '1px solid #e2e8f0',
                      borderRadius: '8px', padding: '0.45rem', minHeight: 68,
                      background: cd.isFuture ? '#f8fafc' : isSelected ? '#f0fdf4' : cd.isDisabled ? '#f8fafc' : '#ffffff',
                      opacity: cd.isDisabled ? 0.6 : 1,
                      cursor: cd.isFuture ? 'not-allowed' : 'pointer',
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 2px 8px rgba(22, 163, 74, 0.15)' : 'none'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: cd.isFuture ? '#cbd5e1' : '#0f172a' }}>
                      {cd.dayNum}
                    </div>
                    {!cd.isFuture && (
                      <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap', marginTop: 4 }}>
                        {cd.counts.aktif > 0 && (
                          <span
                            onClick={(e) => { e.stopPropagation(); setSelectedCalDate(cd.date); setSelectedCalStatus(prev => prev === 'Aktif' ? null : 'Aktif') }}
                            style={{ background: '#16a34a', color: '#fff', fontSize: '0.62rem', fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                            title={`${cd.counts.aktif} Unit Aktif`}
                          >{cd.counts.aktif}</span>
                        )}
                        {cd.counts.unitRusak > 0 && (
                          <span
                            onClick={(e) => { e.stopPropagation(); setSelectedCalDate(cd.date); setSelectedCalStatus(prev => prev === 'Unit Rusak' ? null : 'Unit Rusak') }}
                            style={{ background: '#dc2626', color: '#fff', fontSize: '0.62rem', fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                            title={`${cd.counts.unitRusak} Unit Rusak`}
                          >{cd.counts.unitRusak}</span>
                        )}
                        {cd.counts.gpsRusak > 0 && (
                          <span
                            onClick={(e) => { e.stopPropagation(); setSelectedCalDate(cd.date); setSelectedCalStatus(prev => prev === 'GPS Rusak' ? null : 'GPS Rusak') }}
                            style={{ background: '#d97706', color: '#fff', fontSize: '0.62rem', fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                            title={`${cd.counts.gpsRusak} GPS Rusak`}
                          >{cd.counts.gpsRusak}</span>
                        )}
                        {cd.counts.belumDikirim > 0 && (
                          <span
                            onClick={(e) => { e.stopPropagation(); setSelectedCalDate(cd.date); setSelectedCalStatus(prev => prev === 'Belum Dikirim' ? null : 'Belum Dikirim') }}
                            style={{ background: '#94a3b8', color: '#fff', fontSize: '0.62rem', fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                            title={`${cd.counts.belumDikirim} Belum Dikirim`}
                          >{cd.counts.belumDikirim}</span>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Daily Detail Table for Selected Date */}
          <div className="container-panel-line" style={{
            background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0',
            padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#172B4D' }}>
                  Detail Harian Status Unit ({selectedCalDate || 'Semua Tanggal'})
                </h3>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                  Daftar armada beserta status operasional terverifikasi
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {selectedCalStatus && (
                  <button onClick={() => setSelectedCalStatus(null)} style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem', borderRadius: 6, border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <X size={12} /> Status: {selectedCalStatus}
                  </button>
                )}
                {selectedCalDate && (
                  <button onClick={() => setSelectedCalDate(null)} style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem', borderRadius: 6, border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <X size={12} /> Semua Tanggal
                  </button>
                )}
              </div>
            </div>

            <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Estate</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Nopol</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Jenis Unit</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Status Terkonfirmasi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCalVehicles.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ padding: '2rem 1rem', textAlign: 'center', color: '#64748b' }}>
                        Tidak ada unit untuk filter ini.
                      </td>
                    </tr>
                  ) : (
                    filteredCalVehicles.map(v => (
                      <tr key={v.vehicleId} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 600, color: '#334155' }}>{v.estateId}</td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>
                          {v.vehicleType === 'Car' ? '🚗 ' : '🏍️ '}
                          {v.nopol}
                        </td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: '#64748b' }}>
                          {v.vehicleType === 'Car' ? 'Mobil Patroli' : 'Motor Patroli'}
                        </td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center' }}>
                          <span style={{
                            fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.65rem', borderRadius: 12,
                            background: v.status === 'Aktif' ? '#f0fdf4' : v.status === 'Unit Rusak' ? '#fef2f2' : v.status === 'GPS Rusak' ? '#fffbeb' : '#f1f5f9',
                            color: v.status === 'Aktif' ? '#16a34a' : v.status === 'Unit Rusak' ? '#dc2626' : v.status === 'GPS Rusak' ? '#d97706' : '#64748b',
                            border: `1px solid ${v.status === 'Aktif' ? '#bbf7d0' : v.status === 'Unit Rusak' ? '#fecaca' : v.status === 'GPS Rusak' ? '#fde68a' : '#cbd5e1'}`
                          }}>
                            {v.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── CARD 2: WAKTU OPERASIONAL CONTENT ────────────────────────────────── */}
      {activeCard === 'Waktu' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontFamily: "'Poppins', sans-serif" }}>
          {/* Supporting Summary Strip */}
          <div className="container-panel-line" style={{
            background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0',
            padding: '1rem 1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Rata-rata Bergerak</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16a34a', marginTop: 2 }}>
                {operationalTimeData.avgMovingHours !== null ? fmtHours(operationalTimeData.avgMovingHours) : '—'}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>
                {operationalTimeData.movingSharePct !== null ? `${fmtPct(operationalTimeData.movingSharePct)} dari 24 jam` : ''}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Rata-rata Berhenti</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#64748b', marginTop: 2 }}>
                {operationalTimeData.avgStoppedHours !== null ? fmtHours(operationalTimeData.avgStoppedHours) : '—'}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>
                {operationalTimeData.stoppedSharePct !== null ? `${fmtPct(operationalTimeData.stoppedSharePct)} dari 24 jam` : ''}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Bergerak Terendah</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginTop: 2 }}>
                {operationalTimeData.lowestMoving.val !== null ? fmtHours(operationalTimeData.lowestMoving.val) : '—'}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>
                {operationalTimeData.lowestMoving.nopol !== '-' ? `${operationalTimeData.lowestMoving.nopol} · ${operationalTimeData.lowestMoving.date}` : '-'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Bergerak Tertinggi</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginTop: 2 }}>
                {operationalTimeData.highestMoving.val !== null ? fmtHours(operationalTimeData.highestMoving.val) : '—'}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>
                {operationalTimeData.highestMoving.nopol !== '-' ? `${operationalTimeData.highestMoving.nopol} · ${operationalTimeData.highestMoving.date}` : '-'}
              </div>
            </div>
          </div>

          {/* Controls & Main Visual Container */}
          <div className="container-panel-line" style={{
            background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0',
            padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#172B4D' }}>
                  Waktu Operasional Unit
                </h3>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                  Diterapkan hanya pada hari berstatus <strong>Aktif</strong> ({operationalTimeData.totalActiveVehicleDays} unit-hari aktif)
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.25rem', background: '#f1f5f9', padding: '3px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  {(['Perbandingan', 'Tren Harian'] as const).map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setWaktuViewMode(m)}
                      style={{
                        padding: '0.35rem 0.8rem', borderRadius: 4, border: 'none',
                        fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer',
                        background: waktuViewMode === m ? '#ffffff' : 'transparent',
                        color: waktuViewMode === m ? '#0f172a' : '#64748b',
                        boxShadow: waktuViewMode === m ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.25rem', background: '#f1f5f9', padding: '3px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  {(['Jam', '%'] as const).map(u => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setWaktuUnitMode(u)}
                      style={{
                        padding: '0.35rem 0.75rem', borderRadius: 4, border: 'none',
                        fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer',
                        background: waktuUnitMode === u ? '#ffffff' : 'transparent',
                        color: waktuUnitMode === u ? '#0f172a' : '#64748b',
                        boxShadow: waktuUnitMode === u ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {!operationalTimeData.hasData || operationalTimeData.totalActiveVehicleDays === 0 ? (
              <div style={{ padding: '3rem 1.5rem', textAlign: 'center', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', color: '#64748b', fontSize: '0.875rem', fontWeight: 600 }}>
                Tidak ada data unit aktif pada periode ini.
              </div>
            ) : (
              <>
                {/* Vertical Stacked Bars Chart */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.25rem', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ width: 12, height: 12, borderRadius: 3, background: '#2563eb' }} />
                      <span style={{ color: '#1e40af' }}>Bergerak</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ width: 12, height: 12, borderRadius: 3, background: '#cbd5e1' }} />
                      <span style={{ color: '#475569' }}>Berhenti</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', height: 210, paddingTop: 20, borderBottom: '1px solid #e2e8f0', paddingBottom: 8 }}>
                    {/* Y Axis Labels */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', fontSize: '0.68rem', color: '#94a3b8', paddingRight: 6 }}>
                      <span>{waktuUnitMode === 'Jam' ? '24h' : '100%'}</span>
                      <span>{waktuUnitMode === 'Jam' ? '18h' : '75%'}</span>
                      <span>{waktuUnitMode === 'Jam' ? '12h' : '50%'}</span>
                      <span>{waktuUnitMode === 'Jam' ? '6h' : '25%'}</span>
                      <span>0</span>
                    </div>

                    {/* Bar List */}
                    <div style={{ display: 'flex', flex: 1, gap: '0.75rem', height: '100%', alignItems: 'flex-end' }}>
                      {(waktuViewMode === 'Perbandingan' ? operationalTimeData.comparisonBars : operationalTimeData.trendBars).map((bar, idx) => {
                        const isNoData = bar.activeDays === 0 || bar.avgMovingHours === null;
                        
                        if (isNoData) {
                          return (
                            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                              <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginBottom: 4 }}>—</div>
                              <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 6, fontWeight: 600, textAlign: 'center', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {bar.label}
                              </div>
                            </div>
                          );
                        }

                        const movingH = bar.avgMovingHours!;
                        const stoppedH = bar.avgStoppedHours!;
                        const movingP = bar.movingPct!;
                        const stoppedP = bar.stoppedPct!;

                        const movingFlex = waktuUnitMode === 'Jam' ? movingH : movingP;
                        const stoppedFlex = waktuUnitMode === 'Jam' ? stoppedH : stoppedP;

                        const movingBg = movingP >= 70 ? '#16a34a' : movingP >= 50 ? '#d97706' : '#dc2626';

                        return (
                          <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                            <div
                              style={{
                                width: '100%', maxWidth: 48, height: '100%', display: 'flex', flexDirection: 'column-reverse',
                                borderRadius: '6px 6px 0 0', overflow: 'hidden', position: 'relative', cursor: 'pointer'
                              }}
                              title={`${bar.label}\nBergerak: ${fmtHours(movingH)} (${fmtPct(movingP)})\nBerhenti: ${fmtHours(stoppedH)} (${fmtPct(stoppedP)})\nTotal: 24,0 jam (100%)\nUnit-hari Aktif: ${bar.activeDays}`}
                            >
                              {/* Bergerak segment */}
                              <div style={{ flex: movingFlex, background: movingBg, transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {movingFlex > 3 && (
                                  <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#ffffff' }}>
                                    {waktuUnitMode === 'Jam' ? `${movingH}h` : fmtPct(movingP)}
                                  </span>
                                )}
                              </div>
                              {/* Berhenti segment */}
                              <div style={{ flex: stoppedFlex, background: '#cbd5e1', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {stoppedFlex > 4 && (
                                  <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#475569' }}>
                                    {waktuUnitMode === 'Jam' ? `${stoppedH}h` : fmtPct(stoppedP)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#475569', marginTop: 6, fontWeight: 600, textAlign: 'center', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={bar.label}>
                              {'vehicleType' in bar && bar.vehicleType === 'Car' ? '🚗 ' : 'vehicleType' in bar && bar.vehicleType === 'Motorcycle' ? '🏍️ ' : ''}
                              {bar.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Summary Table */}
                <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Wilayah / Nopol</th>
                        <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Bergerak</th>
                        <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Berhenti</th>
                        <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Bergerak (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationalTimeData.summaryTableRows.map(row => {
                        const hasData = row.activeDays > 0 && row.avgMovingHours !== null;
                        return (
                          <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}>
                            <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>
                              {row.type === 'Vehicle' && (row.vehicleType === 'Car' ? '🚗 ' : '🏍️ ')}
                              {row.label}
                            </td>
                            <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: '#16a34a', fontWeight: 700 }}>
                              {hasData ? (waktuUnitMode === 'Jam' ? fmtHours(row.avgMovingHours!) : fmtPct(row.movingPct!)) : '—'}
                            </td>
                            <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: '#64748b', fontWeight: 600 }}>
                              {hasData ? (waktuUnitMode === 'Jam' ? fmtHours(row.avgStoppedHours!) : fmtPct(row.stoppedPct!)) : '—'}
                            </td>
                            <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>
                              {hasData ? fmtPct(row.movingPct!) : '—'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          {/* Daily Detail Table */}
          <div className="container-panel-line" style={{
            background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0',
            padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#172B4D' }}>
                  Detail Harian Waktu Operasional
                </h3>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                  Menampilkan catatan unit-hari berstatus <strong>Aktif</strong> (Bergerak + Berhenti = 24,0 jam per record)
                </div>
              </div>
            </div>
            <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Tanggal</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Estate</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Nopol</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Bergerak</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Berhenti</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Bergerak (%)</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {operationalTimeData.dailyDetailRows.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: '2rem 1rem', textAlign: 'center', color: '#64748b' }}>
                        Tidak ada data unit aktif pada periode ini.
                      </td>
                    </tr>
                  ) : (
                    operationalTimeData.dailyDetailRows.map(row => (
                      <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 600, color: '#334155' }}>{row.date}</td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 600, color: '#334155' }}>{row.estateId}</td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>
                          {row.vehicleType === 'Car' ? '🚗 ' : '🏍️ '}
                          {row.nopol}
                        </td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: '#16a34a', fontWeight: 700 }}>{fmtHours(row.movingHours)}</td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: '#64748b', fontWeight: 600 }}>{fmtHours(row.stoppedHours)}</td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>{fmtPct(row.movingPct)}</td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => alert(`Detail Waktu Operasional: ${row.nopol} (${row.date})\nBergerak: ${fmtHours(row.movingHours)} (${fmtPct(row.movingPct)})\nBerhenti: ${fmtHours(row.stoppedHours)} (${fmtPct(row.stoppedPct)})\nTotal Daily: 24,0 jam`)}
                            style={{
                              background: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px',
                              padding: '5px 8px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: '#2563eb',
                              transition: 'all 0.15s ease'
                            }}
                            title="Lihat Detail"
                          >
                            <Search size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── CARD 3: JARAK TEMPUH CONTENT ────────────────────────────────────── */}
      {activeCard === 'Jarak' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontFamily: "'Poppins', sans-serif" }}>
          {/* Supporting Summary Strip */}
          <div className="container-panel-line" style={{
            background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0',
            padding: '1rem 1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Rata-rata Harian</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16a34a', marginTop: 2 }}>{fmtKm(distanceStats.avgKmPerDay)} / vehicle-day</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>Total observasi: {distanceStats.observedVehicleDays} unit-hari</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Jarak Terendah</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{fmtKm(distanceStats.lowestKm.val)}</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>{distanceStats.lowestKm.nopol} · {distanceStats.lowestKm.date}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Jarak Tertinggi</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{fmtKm(distanceStats.highestKm.val)}</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>{distanceStats.highestKm.nopol} · {distanceStats.highestKm.date}</div>
            </div>
          </div>

          {/* Controls & Main Visual Container */}
          <div className="container-panel-line" style={{
            background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0',
            padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#172B4D' }}>
                  Statistik Jarak Tempuh
                </h3>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                  Visualisasi performa jarak tempuh kendaraan operasional
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.25rem', background: '#f1f5f9', padding: '3px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  {(['Perbandingan', 'Tren Harian'] as const).map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setJarakViewMode(m)}
                      style={{
                        padding: '0.35rem 0.8rem', borderRadius: 4, border: 'none',
                        fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer',
                        background: jarakViewMode === m ? '#ffffff' : 'transparent',
                        color: jarakViewMode === m ? '#0f172a' : '#64748b',
                        boxShadow: jarakViewMode === m ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.25rem', background: '#f1f5f9', padding: '3px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  {(['Total', 'Rata-rata'] as const).map(u => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setJarakUnitMode(u)}
                      style={{
                        padding: '0.35rem 0.75rem', borderRadius: 4, border: 'none',
                        fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer',
                        background: jarakUnitMode === u ? '#ffffff' : 'transparent',
                        color: jarakUnitMode === u ? '#0f172a' : '#64748b',
                        boxShadow: jarakUnitMode === u ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Vertical Bar Chart for Jarak Tempuh */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 600 }}>
                <span style={{ color: '#64748b' }}>
                  Mode: <strong>{jarakViewMode}</strong> ({jarakUnitMode === 'Total' ? 'Total km' : 'Rata-rata km/hari'})
                </span>
                <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: '#16a34a', display: 'inline-block' }} /> Jarak Tempuh (km)
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', height: 180, paddingTop: 16, borderBottom: '1px solid #e2e8f0', paddingBottom: 8 }}>
                <div style={{ display: 'flex', flex: 1, gap: '0.75rem', height: '100%', alignItems: 'flex-end' }}>
                  {routeComp.categories.map((cat) => {
                    const veh = filteredVehicles.find(v => v.id === cat.id);
                    const rawVal = jarakUnitMode === 'Total' ? cat.actualKm : Math.round((cat.actualKm / 31) * 10) / 10;
                    const maxVal = Math.max(1, ...routeComp.categories.map(c => jarakUnitMode === 'Total' ? c.actualKm : c.actualKm / 31));
                    const heightPct = Math.min(100, Math.max(6, Math.round((rawVal / maxVal) * 100)));

                    return (
                      <div key={cat.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                        <div
                          style={{
                            width: '100%', maxWidth: 48, height: `${heightPct}%`, background: '#16a34a',
                            borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s ease', cursor: 'pointer'
                          }}
                          title={`${cat.label}: ${fmtKm(rawVal)} (${jarakUnitMode})`}
                        >
                          <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#ffffff' }}>
                            {Math.round(rawVal)}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#475569', marginTop: 6, fontWeight: 600, textAlign: 'center', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={cat.label}>
                          {veh && (veh.vehicleType === 'Car' ? '🚗 ' : '🏍️ ')}
                          {cat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Summary Table */}
            <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Wilayah / Nopol</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Total Jarak (km)</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Rata-rata Harian (km/hari)</th>
                  </tr>
                </thead>
                <tbody>
                  {routeComp.categories.map(cat => {
                    const veh = filteredVehicles.find(v => v.id === cat.id)
                    const avgDaily = Math.round((cat.actualKm / 31) * 10) / 10
                    return (
                      <tr key={cat.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>
                          {veh && (veh.vehicleType === 'Car' ? '🚗 ' : '🏍️ ')}
                          {cat.label}
                        </td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>{fmtKm(cat.actualKm)}</td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: '#16a34a', fontWeight: 600 }}>{avgDaily} km/hari</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Daily Detail Table */}
          <div className="container-panel-line" style={{
            background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0',
            padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#172B4D' }}>
                  Detail Harian Jarak Tempuh
                </h3>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                  Catatan perjalanan harian per armada dalam rentang waktu yang dipilih
                </div>
              </div>
            </div>
            <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Tanggal</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Estate</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Nopol</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Jarak (km)</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {routeDaily.slice(0, 10).map(rd => (
                    <tr key={rd.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}>
                      <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 600, color: '#334155' }}>{rd.date}</td>
                      <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 600, color: '#334155' }}>{rd.estateId}</td>
                      <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>
                        {rd.vehicleType === 'Car' ? '🚗 ' : '🏍️ '}
                        {rd.nopol}
                      </td>
                      <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>{fmtKm(rd.actualKm)}</td>
                      <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => alert(`Detail Jarak Tempuh: ${rd.nopol} (${rd.date})\nEstate: ${rd.estateId}\nJenis Unit: ${rd.vehicleType === 'Car' ? 'Mobil' : 'Motor'}\nJarak Tempuh: ${fmtKm(rd.actualKm)}`)}
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            padding: '5px 8px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#0284c7',
                            transition: 'all 0.15s ease'
                          }}
                          title="Lihat Detail"
                        >
                          <Search size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── CARD 4: PROGRES PERBAIKAN CONTENT ───────────────────────────────── */}
      {activeCard === 'Perbaikan' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontFamily: "'Poppins', sans-serif" }}>
          {/* Supporting Summary Strip */}
          <div className="container-panel-line" style={{
            background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0',
            padding: '1rem 1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Kasus Berjalan</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#d97706', marginTop: 2 }}>{repairData.openCasesCount} kasus</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>Dalam penanganan bengkel / IT</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Unit Terdampak</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: 2 }}>{repairData.affectedVehiclesCount} unit</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>Armada belum beroperasi penuh</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Selesai dalam Periode</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16a34a', marginTop: 2 }}>2 kasus</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>Unit telah kembali aktif</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Kasus Terlama</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#dc2626', marginTop: 2 }}>{repairData.oldestOpenCaseAgeDays} hari</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>Perlu eskalasi suku cadang</div>
            </div>
          </div>

          {/* Controls & Vehicle Stage Progress Visual */}
          <div className="container-panel-line" style={{
            background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0',
            padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.25rem', background: '#f1f5f9', padding: '3px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                {(['Kendaraan', 'GPS'] as const).map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setRepairCategory(cat)}
                    style={{
                      padding: '0.35rem 0.85rem', borderRadius: 4, border: 'none',
                      fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer',
                      background: repairCategory === cat ? '#ffffff' : 'transparent',
                      color: repairCategory === cat ? '#0f172a' : '#64748b',
                      boxShadow: repairCategory === cat ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {cat === 'Kendaraan' ? '🚗 Perbaikan Kendaraan' : '📡 Perbaikan GPS'}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.25rem', background: '#f1f5f9', padding: '3px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                {(['Berjalan', 'Selesai', 'Semua'] as const).map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setRepairFilter(f)}
                    style={{
                      padding: '0.35rem 0.75rem', borderRadius: 4, border: 'none',
                      fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer',
                      background: repairFilter === f ? '#ffffff' : 'transparent',
                      color: repairFilter === f ? '#0f172a' : '#64748b',
                      boxShadow: repairFilter === f ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Stage Distribution Horizontal Bar Chart */}
            {repairCategory === 'Kendaraan' && (
              <div style={{ marginBottom: '1.25rem', padding: '0.85rem 1rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
                  Distribusi Tahap Perbaikan Kendaraan (Klik untuk menyaring)
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {repairStageBreakdown.map(sb => {
                    const isSelected = selectedStageFilter === sb.stage
                    return (
                      <div
                        key={sb.stage}
                        onClick={() => setSelectedStageFilter(prev => prev === sb.stage ? null : sb.stage)}
                        style={{
                          padding: '0.35rem 0.7rem', borderRadius: 6, cursor: 'pointer',
                          background: isSelected ? '#d97706' : '#ffffff',
                          color: isSelected ? '#ffffff' : '#334155',
                          border: `1px solid ${isSelected ? '#d97706' : '#cbd5e1'}`,
                          fontSize: '0.72rem', fontWeight: 600,
                          display: 'flex', alignItems: 'center', gap: '0.45rem',
                          transition: 'all 0.15s ease',
                          boxShadow: isSelected ? '0 2px 6px rgba(217, 119, 6, 0.2)' : 'none'
                        }}
                      >
                        <span>{sb.stage}</span>
                        <span style={{
                          background: isSelected ? '#ffffff' : '#f1f5f9',
                          color: isSelected ? '#d97706' : '#0f172a',
                          padding: '0.1rem 0.45rem', borderRadius: 10, fontSize: '0.65rem', fontWeight: 700
                        }}>{sb.count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Repair Cases Table */}
            <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Nopol</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Estate</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Mulai</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Status Terakhir</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Pembaruan</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Lama</th>
                    <th style={{ padding: '0.7rem 0.75rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRepairCases.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: '2rem 1rem', textAlign: 'center', color: '#64748b' }}>
                        Tidak ada perbaikan berjalan untuk filter ini.
                      </td>
                    </tr>
                  ) : (
                    filteredRepairCases.map(c => (
                      <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>{c.nopol}</td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 600, color: '#334155' }}>{c.estateId}</td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: '#475569' }}>{c.startDate}</td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center' }}>
                          <span style={{
                            fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.65rem', borderRadius: 12,
                            background: c.isCompleted ? '#f0fdf4' : '#fffbeb',
                            color: c.isCompleted ? '#16a34a' : '#d97706',
                            border: `1px solid ${c.isCompleted ? '#bbf7d0' : '#fde68a'}`
                          }}>
                            {c.lastStatus}
                          </span>
                        </td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: '#475569' }}>{c.lastUpdateDate}</td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 700, color: c.ageDays > 14 ? '#dc2626' : '#0f172a' }}>
                          {c.ageDays} hari
                        </td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => setSelectedCaseHistory(c)}
                            style={{
                              background: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px',
                              padding: '5px 8px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: '#d97706',
                              transition: 'all 0.15s ease'
                            }}
                            title="Lihat Histori Timeline"
                          >
                            <Search size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CHRONOLOGICAL REPAIR TIMELINE MODAL */}
      {selectedCaseHistory && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100,
          background: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
          fontFamily: "'Poppins', sans-serif"
        }}>
          <div className="container-panel-line" style={{
            background: '#ffffff', borderRadius: 12, maxWidth: 520, width: '100%',
            padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)', position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#172B4D' }}>
                Histori Progres Perbaikan: {selectedCaseHistory.nopol}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedCaseHistory(null)}
                style={{
                  border: 'none', background: '#f1f5f9', borderRadius: '50%', width: 28, height: 28,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#64748b', transition: 'all 0.15s ease'
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '1.25rem', background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: 8, border: '1px solid #e2e8f0' }}>
              Kasus dibuka pada: <strong style={{ color: '#0f172a' }}>{selectedCaseHistory.startDate}</strong> ({selectedCaseHistory.estateId})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', paddingLeft: '1.25rem', borderLeft: '2px solid #e2e8f0', marginLeft: '0.5rem' }}>
              {selectedCaseHistory.history.map((h: any, i: number) => (
                <div key={i} style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '-1.65rem', top: 3, width: 12, height: 12,
                    borderRadius: '50%', background: i === selectedCaseHistory.history.length - 1 ? '#16a34a' : '#2563eb',
                    border: '2px solid #ffffff', boxShadow: '0 0 0 1px #cbd5e1'
                  }} />
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>
                    {h.date} — {h.stage}
                  </div>
                  {h.note && (
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>
                      {h.note}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button
                type="button"
                onClick={() => setSelectedCaseHistory(null)}
                style={{
                  padding: '0.45rem 1.25rem', borderRadius: 6, border: 'none',
                  background: '#0f172a', color: '#ffffff', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer'
                }}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  )
}
