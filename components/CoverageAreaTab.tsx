'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react'
import {
  GlobalFilterState,
  PatrolReportRecord
} from '@/lib/types'
import {
  ComprehensiveCoverageMetrics,
  BlockCoverageMetricItem,
  selectComprehensiveCoverage,
  getFilteredVehicles,
  getFilteredEstates,
  selectCoverageComparison,
  selectCoverageTrendTable,
  CoverageComparisonCategoryItem,
  CoverageTrendRow
} from '@/lib/selectors'
import { MOCK_ESTATES, MOCK_VEHICLES } from '@/lib/mock-database'
import dynamic from 'next/dynamic'
import { ShieldAlert, Layers, Info, Check } from 'lucide-react'
import { MapMetricMode, MapFilterType, getBlockBucket } from './CoverageBlockMap'

// Threshold helper for Aktivitas di Area Rawan (strictly per Section 3):
// x >= 60% : Hijau (#16a34a) - Rendah
// 50% <= x < 60% : Amber (#d97706) - Sedang
// x < 50% : Merah (#dc2626) - Tinggi
export const getAktivitasThresholdColor = (pct: number | null): string => {
  if (pct === null || isNaN(pct)) return '#94a3b8'
  if (pct >= 60.0) return '#16a34a'
  if (pct >= 50.0) return '#d97706'
  return '#dc2626'
}

export const getAktivitasThresholdBadge = (pct: number | null): { label: string; bg: string; color: string; border: string } => {
  if (pct === null || isNaN(pct)) {
    return { label: 'Belum ada data', bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0' }
  }
  if (pct >= 60.0) {
    return { label: 'Rendah (≥60%)', bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' }
  }
  if (pct >= 50.0) {
    return { label: 'Sedang (50–<60%)', bg: '#fef3c7', color: '#d97706', border: '#fde68a' }
  }
  return { label: 'Tinggi (<50%)', bg: '#fee2e2', color: '#dc2626', border: '#fecaca' }
}

const CoverageBlockMap = dynamic(() => import('./CoverageBlockMap'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '520px', background: '#0f172a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
      🔄 Memuat peta area coverage...
    </div>
  )
})

interface CoverageAreaTabProps {
  globalFilters: GlobalFilterState
  coverageMetrics: ComprehensiveCoverageMetrics
  onOpenReportModal?: (r: PatrolReportRecord) => void
  initialMetric?: 'Aktivitas' | 'Cakupan'
}

export interface CoverageDrilldownState {
  entityId: string
  entityLabel: string
  estateId?: string
  vehicleId?: string
  yearMonth?: string
  cellKey?: string
}

export default function CoverageAreaTab({
  globalFilters,
  coverageMetrics,
  onOpenReportModal,
  initialMetric = 'Aktivitas'
}: CoverageAreaTabProps) {
  // Info Modal state
  const [showInfoModal, setShowInfoModal] = useState(false)

  // 1. Primary Analytical Metric Selection: 'Aktivitas' | 'Cakupan' (Default: Aktivitas)
  const [selectedMetric, setSelectedMetric] = useState<'Aktivitas' | 'Cakupan'>(initialMetric)

  useEffect(() => {
    if (initialMetric) {
      setSelectedMetric(initialMetric)
    }
  }, [initialMetric])

  // 2. Middle Section View Mode: 'Perbandingan' | 'Tren 6 Bulan' (Default: Perbandingan)
  const [activeViewMode, setActiveViewMode] = useState<'Perbandingan' | 'Tren 6 Bulan'>('Perbandingan')

  // 3. Drill-down Selection State for Chart/Table -> Map sync
  const [drilldownState, setDrilldownState] = useState<CoverageDrilldownState | null>(null)

  // 4. Pagination states
  const [perbandinganPage, setPerbandinganPage] = useState<number>(1)
  const [trendPage, setTrendPage] = useState<number>(1)

  // Map section ref for smooth scrolling
  const detailMapRef = useRef<HTMLDivElement>(null)

  // Reset drilldown when global filters change
  useEffect(() => {
    setDrilldownState(null)
    setPerbandinganPage(1)
    setTrendPage(1)
  }, [globalFilters.psm, globalFilters.region, globalFilters.estate, globalFilters.year, globalFilters.month, globalFilters.startDate, globalFilters.endDate])

  // Clear drilldown if switching view mode
  const handleViewModeChange = (mode: 'Perbandingan' | 'Tren 6 Bulan') => {
    setActiveViewMode(mode)
    setDrilldownState(null)
  }

  // 5. Selectors for Perbandingan & Tren 6 Bulan
  const compData = useMemo(() => {
    return selectCoverageComparison(globalFilters)
  }, [globalFilters])

  const trendData = useMemo(() => {
    return selectCoverageTrendTable(globalFilters)
  }, [globalFilters])

  // Detail drawer subtab state
  const [activeDetailTab, setActiveDetailTab] = useState<'traversals' | 'date_breakdown'>('traversals')

  // Resolve Estate ID for map drilldown
  const resolveEstateId = (entityId: string): string | undefined => {
    if (compData.groupingType === 'Estate') return entityId
    if (compData.groupingType === 'Vehicle') {
      const veh = MOCK_VEHICLES.find((v: { id: string; estateId: string }) => v.id === entityId)
      return veh ? veh.estateId : (globalFilters.estate !== 'ALL' ? globalFilters.estate : undefined)
    }
    // For Region or PSM, resolve first estate under that region/PSM
    if (compData.groupingType === 'Region') {
      const firstEst = MOCK_ESTATES.find((e: { regionId: string; psmId: string; id: string }) => e.regionId === entityId)
      return firstEst ? firstEst.id : undefined
    }
    if (compData.groupingType === 'PSM') {
      const firstEst = MOCK_ESTATES.find((e: { regionId: string; psmId: string; id: string }) => e.psmId === entityId)
      return firstEst ? firstEst.id : undefined
    }
    return undefined
  }

  // Resolve Vehicle ID for map drilldown
  const resolveVehicleId = (entityId: string): string | undefined => {
    if (compData.groupingType === 'Vehicle') return entityId
    return undefined
  }

  // Handle drilldown click (reversible toggle)
  const handleSelectEntityDrilldown = (entityId: string, entityLabel: string, yearMonth?: string) => {
    const cellKey = yearMonth ? `${entityId}_${yearMonth}` : entityId
    if (drilldownState && drilldownState.cellKey === cellKey) {
      // Toggle off
      setDrilldownState(null)
      return
    }

    const estateId = resolveEstateId(entityId)
    const vehicleId = resolveVehicleId(entityId)

    setMapFilterType('Semua')
    setDrilldownState({
      entityId,
      entityLabel: yearMonth ? `${entityLabel} (${yearMonth})` : entityLabel,
      estateId,
      vehicleId,
      yearMonth,
      cellKey
    })

    // Smooth scroll down to map section
    setTimeout(() => {
      detailMapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  // 6. Map Local Controls & Data
  const [mapMetricMode, setMapMetricMode] = useState<MapMetricMode>('Rata-rata')
  const [mapFilterType, setMapFilterType] = useState<MapFilterType>('Semua')
  const [mapLocalVehicleId, setMapLocalVehicleId] = useState<string>('ALL')
  const [mapSearchQuery, setMapSearchQuery] = useState<string>('')
  const [mapLegendFilter, setMapLegendFilter] = useState<string | null>(null)
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [hoveredBlock, setHoveredBlock] = useState<BlockCoverageMetricItem | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Target Estate ID for Leaflet map
  const activeMapEstateId = useMemo(() => {
    if (drilldownState?.estateId) return drilldownState.estateId
    if (globalFilters.estate && globalFilters.estate !== 'ALL') return globalFilters.estate
    return 'Estate B'
  }, [drilldownState, globalFilters.estate])

  // Reset category filter to 'Semua' when estate changes
  const prevActiveEstateRef = useRef<string>('')
  useEffect(() => {
    if (prevActiveEstateRef.current && prevActiveEstateRef.current !== activeMapEstateId) {
      setMapFilterType('Semua')
    }
    prevActiveEstateRef.current = activeMapEstateId
  }, [activeMapEstateId])

  // Effective Global Filters for Map when drilldown is active
  const effectiveMapGlobalFilters = useMemo(() => {
    const f = { ...globalFilters }
    if (drilldownState) {
      if (drilldownState.estateId) f.estate = drilldownState.estateId
      if (drilldownState.yearMonth) {
        const [yr, mn] = drilldownState.yearMonth.split('-')
        f.year = yr
        const mNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        f.month = mNames[parseInt(mn, 10) - 1] || 'May'
        delete f.startDate
        delete f.endDate
      }
    }
    return f
  }, [globalFilters, drilldownState])

  // Available vehicles for local dropdown
  const availableVehicles = useMemo(() => {
    return getFilteredVehicles(effectiveMapGlobalFilters)
  }, [effectiveMapGlobalFilters])

  // Compute coverage metrics for map (recomputed when local vehicle filter or drilldown changes)
  const mapCoverageMetrics = useMemo(() => {
    if (mapLocalVehicleId === 'ALL') return selectComprehensiveCoverage(effectiveMapGlobalFilters)
    return selectComprehensiveCoverage(effectiveMapGlobalFilters, mapLocalVehicleId)
  }, [effectiveMapGlobalFilters, mapLocalVehicleId])

  // Selected block for drawer panel
  const selectedBlock = useMemo(() => {
    if (!selectedBlockId) return null
    return mapCoverageMetrics.blocksList.find(b => b.blockId === selectedBlockId) || null
  }, [selectedBlockId, mapCoverageMetrics])

  // Filtered blocks for map rendering
  const filteredBlocks = useMemo(() => {
    const query = mapSearchQuery.trim().toUpperCase()
    return mapCoverageMetrics.blocksList.filter(b => {
      if (mapFilterType === 'Rawan' && !b.isRawan) return false
      if (mapFilterType === 'Non-Rawan' && b.isRawan) return false

      if (query) {
        if (!b.blockCode.toUpperCase().includes(query) && !b.estateId.toUpperCase().includes(query)) {
          return false
        }
      }

      if (mapLegendFilter) {
        const bucket = getBlockBucket(mapMetricMode, b)
        if (bucket !== mapLegendFilter) return false
      }

      return true
    })
  }, [mapCoverageMetrics, mapFilterType, mapSearchQuery, mapLegendFilter, mapMetricMode])

  // Format Helper
  const formatPct = (val: number | null) => (val !== null ? `${val.toFixed(1).replace('.', ',')}%` : '—')
  const formatNum = (val: number) => val.toLocaleString('id-ID')

  // Top Card Values
  const cardAAktivitasPct = coverageMetrics.coverageRawanPct
  const cardBCakupanPct = coverageMetrics.rawanDistribution.headlinePct

  // Pagination for perbandingan table
  const perbandinganPageSize = 10
  const paginatedPerbandinganRows = useMemo(() => {
    const start = (perbandinganPage - 1) * perbandinganPageSize
    return compData.categories.slice(start, start + perbandinganPageSize)
  }, [compData.categories, perbandinganPage])

  // Pagination for trend table
  const trendPageSize = 10
  const paginatedTrendRows = useMemo(() => {
    const start = (trendPage - 1) * trendPageSize
    return trendData.rows.slice(start, start + trendPageSize)
  }, [trendData.rows, trendPage])

  // Mode Toggle Switch for Map
  const handleMapModeToggle = (newMode: MapMetricMode) => {
    setMapMetricMode(newMode)
    setMapLegendFilter(null)
  }

  // Frequency buckets configuration based on shared mode toggle
  const dist = mapCoverageMetrics.rawanDistribution
  const frequencyBuckets = useMemo(() => {
    if (mapMetricMode === 'Rata-rata') {
      const d = dist.avgDistribution
      return [
        { key: '0', label: '0 ×/hari', count: d.zeroCount, pct: d.zeroPct, color: '#94a3b8' },
        { key: '>0–<1', label: '>0 s/d <1 ×/hari', count: d.gt0lt1Count, pct: d.gt0lt1Pct, color: '#c084fc' },
        { key: '1–2', label: '1 s/d 2 ×/hari', count: d.oneToTwoCount, pct: d.oneToTwoPct, color: '#9333ea' },
        { key: '>2', label: '>2 ×/hari', count: d.gt2Count, pct: d.gt2Pct, color: '#581c87' }
      ]
    } else {
      const d = dist.countDistribution
      return [
        { key: '0×', label: '0× (Belum ter-cover)', count: d.zeroCount, pct: d.zeroPct, color: '#94a3b8' },
        { key: '1×', label: '1× coverage', count: d.oneCount, pct: d.onePct, color: '#c084fc' },
        { key: '2×', label: '2× coverage', count: d.twoCount, pct: d.twoPct, color: '#9333ea' },
        { key: '>2×', label: '>2× coverage', count: d.moreThanTwoCount, pct: d.moreThanTwoPct, color: '#581c87' }
      ]
    }
  }, [mapMetricMode, dist])

  const handleCategoryClick = (bucketKey: string) => {
    setMapFilterType('Rawan')
    if (mapLegendFilter === bucketKey) {
      setMapLegendFilter(null)
    } else {
      setMapLegendFilter(bucketKey)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>

      {/* 1. TOP SECTION: DUA CARD METRIK SEBAGAI SATU-SATUNYA PEMILIH */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
        width: '100%',
        fontFamily: "'Poppins', sans-serif"
      }}>
        {/* Card 1: Aktivitas di Area Rawan */}
        <div
          role="button"
          tabIndex={0}
          aria-pressed={selectedMetric === 'Aktivitas'}
          onClick={() => setSelectedMetric('Aktivitas')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setSelectedMetric('Aktivitas')
            }
          }}
          style={{
            background: selectedMetric === 'Aktivitas' ? '#eff6ff' : '#ffffff',
            borderRadius: '12px',
            border: selectedMetric === 'Aktivitas' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
            boxShadow: selectedMetric === 'Aktivitas' ? '0 2px 8px rgba(37,99,235,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '148px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            position: 'relative',
            outline: 'none'
          }}
          className="coverage-kpi-card"
        >
          {/* Row 1: Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#eff6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563eb',
                flexShrink: 0
              }}>
                <ShieldAlert size={18} strokeWidth={2} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#1e293b' }}>
                  Aktivitas di Area Rawan
                </span>
                <div
                  title="Formula: (Total kunjungan patroli di blok rawan ÷ Total seluruh kunjungan patroli) × 100%&#10;&#10;Threshold Kategori:&#10;• ≥60%: Rendah (Hijau)&#10;• 50–<60%: Sedang (Amber)&#10;• <50%: Tinggi (Merah)"
                  style={{ cursor: 'help', display: 'flex', alignItems: 'center', color: '#94a3b8' }}
                  onClick={(e) => { e.stopPropagation(); setShowInfoModal(true); }}
                >
                  <Info size={14} />
                </div>
              </div>
            </div>

            {selectedMetric === 'Aktivitas' ? (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '12px',
                background: '#dbeafe',
                color: '#1d4ed8',
                border: '1px solid #bfdbfe'
              }}>
                <Check size={12} strokeWidth={3} />
                Terpilih
              </span>
            ) : (
              <span style={{
                fontSize: '11px',
                fontWeight: 500,
                color: '#94a3b8',
                padding: '2px 8px'
              }}>
                Pilih Metrik
              </span>
            )}
          </div>

          {/* Row 2: Main Stat */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '10px' }}>
            <span style={{
              fontSize: '32px',
              fontWeight: 600,
              lineHeight: 1.1,
              color: cardAAktivitasPct !== null ? getAktivitasThresholdColor(cardAAktivitasPct) : '#64748b'
            }}>
              {formatPct(cardAAktivitasPct)}
            </span>
            {cardAAktivitasPct !== null && (
              <span style={{
                fontSize: '11.5px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                background: getAktivitasThresholdBadge(cardAAktivitasPct).bg,
                color: getAktivitasThresholdBadge(cardAAktivitasPct).color,
                border: `1px solid ${getAktivitasThresholdBadge(cardAAktivitasPct).border}`
              }}>
                Prioritas {getAktivitasThresholdBadge(cardAAktivitasPct).label}
              </span>
            )}
          </div>

          {/* Row 3: Label Detail */}
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', marginBottom: '10px' }}>
            {coverageMetrics.totalValidCoverage > 0
              ? `${formatNum(coverageMetrics.rawanCount)} dari ${formatNum(coverageMetrics.totalValidCoverage)} kunjungan`
              : '— / Belum ada data kunjungan'}
          </div>

          {/* Row 4: Progress Bar (6px, bottom) */}
          <div style={{
            width: '100%',
            height: '6px',
            background: '#e2e8f0',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${Math.min(100, Math.max(0, cardAAktivitasPct || 0))}%`,
              height: '100%',
              borderRadius: '3px',
              background: cardAAktivitasPct !== null ? getAktivitasThresholdColor(cardAAktivitasPct) : '#cbd5e1',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Card 2: Cakupan Blok Rawan */}
        <div
          role="button"
          tabIndex={0}
          aria-pressed={selectedMetric === 'Cakupan'}
          onClick={() => setSelectedMetric('Cakupan')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setSelectedMetric('Cakupan')
            }
          }}
          style={{
            background: selectedMetric === 'Cakupan' ? '#eff6ff' : '#ffffff',
            borderRadius: '12px',
            border: selectedMetric === 'Cakupan' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
            boxShadow: selectedMetric === 'Cakupan' ? '0 2px 8px rgba(37,99,235,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '148px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            position: 'relative',
            outline: 'none'
          }}
          className="coverage-kpi-card"
        >
          {/* Row 1: Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#eff6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563eb',
                flexShrink: 0
              }}>
                <Layers size={18} strokeWidth={2} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#1e293b' }}>
                  Cakupan Blok Rawan
                </span>
                <div
                  title="Formula: (Jumlah blok rawan unik yang pernah dikunjungi (≥1 kali) ÷ Total seluruh blok rawan dalam scope) × 100%&#10;&#10;Mengukur proporsi inventaris blok rawan yang ter-cover patroli."
                  style={{ cursor: 'help', display: 'flex', alignItems: 'center', color: '#94a3b8' }}
                  onClick={(e) => { e.stopPropagation(); setShowInfoModal(true); }}
                >
                  <Info size={14} />
                </div>
              </div>
            </div>

            {selectedMetric === 'Cakupan' ? (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '12px',
                background: '#dbeafe',
                color: '#1d4ed8',
                border: '1px solid #bfdbfe'
              }}>
                <Check size={12} strokeWidth={3} />
                Terpilih
              </span>
            ) : (
              <span style={{
                fontSize: '11px',
                fontWeight: 500,
                color: '#94a3b8',
                padding: '2px 8px'
              }}>
                Pilih Metrik
              </span>
            )}
          </div>

          {/* Row 2: Main Stat */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '10px' }}>
            <span style={{
              fontSize: '32px',
              fontWeight: 600,
              lineHeight: 1.1,
              color: '#0f172a' // Navy
            }}>
              {formatPct(cardBCakupanPct)}
            </span>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
              Blok Ter-cover
            </span>
          </div>

          {/* Row 3: Label Detail */}
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', marginBottom: '10px' }}>
            {coverageMetrics.rawanDistribution.totalRawanBlocks > 0
              ? `${formatNum(coverageMetrics.rawanDistribution.coveredRawanBlocks)} dari ${formatNum(coverageMetrics.rawanDistribution.totalRawanBlocks)} blok`
              : '— / Belum ada inventori blok'}
          </div>

          {/* Row 4: Progress Bar (6px, bottom) */}
          <div style={{
            width: '100%',
            height: '6px',
            background: '#e2e8f0',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${Math.min(100, Math.max(0, cardBCakupanPct || 0))}%`,
              height: '100%',
              borderRadius: '3px',
              background: '#2563eb', // Blue accent
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      </div>

      {/* 2. MIDDLE SECTION: ANALYTICAL VIEW (PERBANDINGAN | TREN 6 BULAN) */}
      <div style={{
        background: '#ffffff',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        padding: '16px 20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        fontFamily: "'Poppins', sans-serif"
      }}>
        {/* Chart Header - Matching Laporan section 2-row layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          {/* Row 1: Title & Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <h3 style={{
              margin: 0,
              fontSize: '18.5px',
              fontWeight: 700,
              color: '#172B4D',
              lineHeight: 1.2
            }}>
              {activeViewMode === 'Perbandingan' ? 'Analisis Perbandingan Coverage Area' : 'Grafik Tren 6 Bulan Coverage Area'}
            </h3>

            {/* Mode Toggle Switch */}
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              {(['Perbandingan', 'Tren 6 Bulan'] as const).map(mode => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleViewModeChange(mode)}
                  style={{
                    padding: '5px 12px',
                    border: activeViewMode === mode ? '1px solid #bfdbfe' : 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: activeViewMode === mode ? '#eff6ff' : 'transparent',
                    color: activeViewMode === mode ? '#2563eb' : '#64748B',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Scope Label & Compact Legend Above Plot */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '12.5px', color: '#64748B' }}>
              Scope: <strong>{compData.scopeLabel}</strong> · Metrik: <strong style={{ color: selectedMetric === 'Aktivitas' ? getAktivitasThresholdColor(cardAAktivitasPct) : '#2563eb' }}>
                {selectedMetric === 'Aktivitas' ? 'Aktivitas di Area Rawan (% Porsi Rawan)' : 'Cakupan Blok Rawan (% Ter-cover)'}
              </strong>
            </div>

            {/* Compact Legend above plot */}
            {selectedMetric === 'Aktivitas' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: '#475569', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
                  <span>Rendah (≥60%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#d97706', display: 'inline-block' }} />
                  <span>Sedang (50–&lt;60%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#dc2626', display: 'inline-block' }} />
                  <span>Tinggi (&lt;50%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#94a3b8', display: 'inline-block' }} />
                  <span>Non-Rawan</span>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: '#475569', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2563eb', display: 'inline-block' }} />
                  <span>Ter-cover (≥1×)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#cbd5e1', display: 'inline-block' }} />
                  <span>Belum Ter-cover</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* VERTICAL 100% STACKED BAR CHART */}
        <div style={{ marginBottom: '1.25rem' }}>
          {activeViewMode === 'Perbandingan' ? (
            /* Perbandingan 100% Stacked Bar Chart */
            <div>
              {compData.categories.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Tidak ada data coverage dalam scope ini.</div>
              ) : (
                <div style={{ position: 'relative', height: '280px', paddingLeft: '45px', paddingTop: '25px', paddingBottom: '30px' }}>
                  {/* Y-Axis Ticks */}
                  <div style={{ position: 'absolute', left: 0, top: '25px', height: '225px', width: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', borderRight: '1.5px solid #64748b', paddingRight: '6px' }}>
                    {[100, 80, 60, 40, 20, 0].map(t => (
                      <span key={t} style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, transform: 'translateY(-50%)', lineHeight: 1 }}>{t}%</span>
                    ))}
                  </div>

                  {/* Horizontal Gridlines */}
                  <div style={{ position: 'absolute', left: '45px', right: 0, top: '25px', height: '225px', pointerEvents: 'none' }}>
                    {[100, 80, 60, 40, 20, 0].map((t, idx) => (
                      <div key={t} style={{ position: 'absolute', top: `${(idx / 5) * 100}%`, left: 0, right: 0, borderTop: t === 0 ? '1.5px solid #64748b' : '1px dashed #e2e8f0' }} />
                    ))}
                  </div>

                  {/* Stacked Bars Container */}
                  <div style={{ position: 'relative', height: '225px', display: 'grid', gridTemplateColumns: `repeat(${compData.categories.length}, 1fr)`, gap: '0.75rem' }}>
                    {compData.categories.map(cat => {
                      const isSelected = drilldownState?.entityId === cat.id

                      if (selectedMetric === 'Aktivitas') {
                        const totalVisits = cat.rawanVisits + cat.nonRawanVisits
                        const hasData = totalVisits > 0
                        const rawanPct = hasData ? (cat.rawanVisits / totalVisits) * 100 : null
                        const nonRawanPct = hasData ? 100 - rawanPct! : null

                        // Strict threshold per Section 3: >=60 Green, 50-<60 Amber, <50 Red
                        const rawanColor = getAktivitasThresholdColor(rawanPct)
                        const nonRawanColor = '#94a3b8'

                        const rawanHeightPx = hasData ? (rawanPct! / 100) * 225 : 0
                        const nonRawanHeightPx = hasData ? (nonRawanPct! / 100) * 225 : 0

                        const tooltipText = hasData
                          ? `${cat.label}\nRawan: ${formatNum(cat.rawanVisits)} (${formatPct(rawanPct)})\nNon-Rawan: ${formatNum(cat.nonRawanVisits)} (${formatPct(nonRawanPct)})\nTotal: ${formatNum(totalVisits)} kunjungan\nStatus: Prioritas ${getAktivitasThresholdBadge(rawanPct).label}`
                          : `${cat.label}\nTidak ada aktivitas patroli`

                        return (
                          <div
                            key={cat.id}
                            onClick={() => handleSelectEntityDrilldown(cat.id, cat.label)}
                            title={tooltipText}
                            style={{
                              position: 'relative',
                              height: '225px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              cursor: 'pointer',
                              opacity: isSelected ? 1 : (drilldownState ? 0.65 : 1)
                            }}
                          >
                            {/* 100% Stacked Bar Fill */}
                            <div style={{
                              width: '100%',
                              maxWidth: '42px',
                              height: '225px',
                              display: 'flex',
                              flexDirection: 'column-reverse',
                              borderRadius: '4px 4px 0 0',
                              overflow: 'hidden',
                              background: hasData ? 'transparent' : '#e2e8f0',
                              border: isSelected ? '2px solid #2563eb' : '1px solid #cbd5e1',
                              boxShadow: isSelected ? '0 0 0 3px rgba(37,99,235,0.2)' : 'none'
                            }}>
                              {hasData ? (
                                <>
                                  {/* Bottom Segment: RAWAN */}
                                  <div style={{
                                    height: `${rawanHeightPx}px`,
                                    background: rawanColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#ffffff',
                                    fontSize: '0.675rem',
                                    fontWeight: 800,
                                    transition: 'height 0.2s ease'
                                  }}>
                                    {rawanHeightPx >= 18 ? `${Math.round(rawanPct!)}%` : ''}
                                  </div>

                                  {/* Top Segment: NON-RAWAN */}
                                  <div style={{
                                    height: `${nonRawanHeightPx}px`,
                                    background: nonRawanColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#ffffff',
                                    fontSize: '0.675rem',
                                    fontWeight: 800,
                                    transition: 'height 0.2s ease'
                                  }}>
                                    {nonRawanHeightPx >= 18 ? `${Math.round(nonRawanPct!)}%` : ''}
                                  </div>
                                </>
                              ) : (
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.7rem' }}>
                                  —
                                </div>
                              )}
                            </div>

                            {/* X-Axis Label */}
                            <div style={{
                              position: 'absolute',
                              bottom: '-24px',
                              fontSize: '0.675rem',
                              fontWeight: isSelected ? 800 : 600,
                              color: isSelected ? '#1e40af' : '#475569',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: '75px',
                              textAlign: 'center'
                            }}>
                              {cat.label}
                            </div>
                          </div>
                        )
                      } else {
                        // Cakupan Blok Rawan Perspective
                        const totalRawan = cat.totalRawanBlocks
                        const hasData = totalRawan > 0
                        const coveredPct = hasData ? (cat.coveredRawanBlocks / totalRawan) * 100 : null
                        const uncoveredPct = hasData ? 100 - coveredPct! : null

                        const coveredColor = '#2563eb'
                        const uncoveredColor = '#cbd5e1'

                        const coveredHeightPx = hasData ? (coveredPct! / 100) * 225 : 0
                        const uncoveredHeightPx = hasData ? (uncoveredPct! / 100) * 225 : 0

                        const tooltipText = hasData
                          ? `${cat.label}\nTer-cover: ${formatNum(cat.coveredRawanBlocks)} (${formatPct(coveredPct)})\nBelum Ter-cover: ${formatNum(cat.uncoveredRawanBlocks)} (${formatPct(uncoveredPct)})\nTotal Rawan: ${formatNum(totalRawan)} blok`
                          : `${cat.label}\nTidak ada inventory blok rawan`

                        return (
                          <div
                            key={cat.id}
                            onClick={() => handleSelectEntityDrilldown(cat.id, cat.label)}
                            title={tooltipText}
                            style={{
                              position: 'relative',
                              height: '225px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              cursor: 'pointer',
                              opacity: isSelected ? 1 : (drilldownState ? 0.65 : 1)
                            }}
                          >
                            <div style={{
                              width: '100%',
                              maxWidth: '42px',
                              height: '225px',
                              display: 'flex',
                              flexDirection: 'column-reverse',
                              borderRadius: '4px 4px 0 0',
                              overflow: 'hidden',
                              background: hasData ? 'transparent' : '#e2e8f0',
                              border: isSelected ? '2px solid #2563eb' : '1px solid #cbd5e1',
                              boxShadow: isSelected ? '0 0 0 3px rgba(37,99,235,0.2)' : 'none'
                            }}>
                              {hasData ? (
                                <>
                                  {/* Bottom Segment: TER-COVER */}
                                  <div style={{
                                    height: `${coveredHeightPx}px`,
                                    background: coveredColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#ffffff',
                                    fontSize: '0.675rem',
                                    fontWeight: 800,
                                    transition: 'height 0.2s ease'
                                  }}>
                                    {coveredHeightPx >= 18 ? `${Math.round(coveredPct!)}%` : ''}
                                  </div>

                                  {/* Top Segment: BELUM TER-COVER */}
                                  <div style={{
                                    height: `${uncoveredHeightPx}px`,
                                    background: uncoveredColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#1e293b',
                                    fontSize: '0.675rem',
                                    fontWeight: 800,
                                    transition: 'height 0.2s ease'
                                  }}>
                                    {uncoveredHeightPx >= 18 ? `${Math.round(uncoveredPct!)}%` : ''}
                                  </div>
                                </>
                              ) : (
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.7rem' }}>
                                  —
                                </div>
                              )}
                            </div>

                            <div style={{
                              position: 'absolute',
                              bottom: '-24px',
                              fontSize: '0.675rem',
                              fontWeight: isSelected ? 800 : 600,
                              color: isSelected ? '#1e40af' : '#475569',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: '75px',
                              textAlign: 'center'
                            }}>
                              {cat.label}
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Tren 6 Bulan Scope Aggregates 100% Stacked Bar Chart */
            <div>
              <div style={{ position: 'relative', height: '280px', paddingLeft: '45px', paddingTop: '25px', paddingBottom: '30px' }}>
                <div style={{ position: 'absolute', left: 0, top: '25px', height: '225px', width: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', borderRight: '1.5px solid #64748b', paddingRight: '6px' }}>
                  {[100, 80, 60, 40, 20, 0].map(t => (
                    <span key={t} style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, transform: 'translateY(-50%)', lineHeight: 1 }}>{t}%</span>
                  ))}
                </div>

                <div style={{ position: 'absolute', left: '45px', right: 0, top: '25px', height: '225px', pointerEvents: 'none' }}>
                  {[100, 80, 60, 40, 20, 0].map((t, idx) => (
                    <div key={t} style={{ position: 'absolute', top: `${(idx / 5) * 100}%`, left: 0, right: 0, borderTop: t === 0 ? '1.5px solid #64748b' : '1px dashed #e2e8f0' }} />
                  ))}
                </div>

                <div style={{ position: 'relative', height: '225px', display: 'grid', gridTemplateColumns: `repeat(${trendData.monthlyScopeAggregates.length}, 1fr)`, gap: '1.5rem' }}>
                  {trendData.monthlyScopeAggregates.map(m => {
                    const isSelected = drilldownState?.yearMonth === m.yearMonth && !drilldownState?.entityId

                    if (selectedMetric === 'Aktivitas') {
                      const totalVisits = m.rawanVisits + m.nonRawanVisits
                      const hasData = totalVisits > 0
                      const rawanPct = hasData ? (m.rawanVisits / totalVisits) * 100 : null
                      const nonRawanPct = hasData ? 100 - rawanPct! : null

                      const rawanColor = getAktivitasThresholdColor(rawanPct)
                      const nonRawanColor = '#94a3b8'

                      const rawanHeightPx = hasData ? (rawanPct! / 100) * 225 : 0
                      const nonRawanHeightPx = hasData ? (nonRawanPct! / 100) * 225 : 0

                      const tooltipText = hasData
                        ? `${m.label} (${compData.scopeLabel})\nRawan: ${formatNum(m.rawanVisits)} (${formatPct(rawanPct)})\nNon-Rawan: ${formatNum(m.nonRawanVisits)} (${formatPct(nonRawanPct)})\nTotal: ${formatNum(totalVisits)} kunjungan\nStatus: Prioritas ${getAktivitasThresholdBadge(rawanPct).label}`
                        : `${m.label}\nTidak ada aktivitas patroli`

                      return (
                        <div
                          key={m.yearMonth}
                          onClick={() => handleSelectEntityDrilldown(compData.scopeLabel, m.label, m.yearMonth)}
                          title={tooltipText}
                          style={{
                            position: 'relative',
                            height: '225px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            cursor: 'pointer',
                            opacity: isSelected ? 1 : (drilldownState ? 0.65 : 1)
                          }}
                        >
                          <div style={{
                            width: '100%',
                            maxWidth: '42px',
                            height: '225px',
                            display: 'flex',
                            flexDirection: 'column-reverse',
                            borderRadius: '4px 4px 0 0',
                            overflow: 'hidden',
                            background: hasData ? 'transparent' : '#e2e8f0',
                            border: isSelected ? '2px solid #2563eb' : '1px solid #cbd5e1',
                            boxShadow: isSelected ? '0 0 0 3px rgba(37,99,235,0.2)' : 'none'
                          }}>
                            {hasData ? (
                              <>
                                <div style={{
                                  height: `${rawanHeightPx}px`,
                                  background: rawanColor,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#ffffff',
                                  fontSize: '0.675rem',
                                  fontWeight: 800,
                                  transition: 'height 0.2s ease'
                                }}>
                                  {rawanHeightPx >= 18 ? `${Math.round(rawanPct!)}%` : ''}
                                </div>
                                <div style={{
                                  height: `${nonRawanHeightPx}px`,
                                  background: nonRawanColor,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#ffffff',
                                  fontSize: '0.675rem',
                                  fontWeight: 800,
                                  transition: 'height 0.2s ease'
                                }}>
                                  {nonRawanHeightPx >= 18 ? `${Math.round(nonRawanPct!)}%` : ''}
                                </div>
                              </>
                            ) : (
                              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.7rem' }}>
                                —
                              </div>
                            )}
                          </div>

                          <div style={{
                            position: 'absolute',
                            bottom: '-24px',
                            fontSize: '0.675rem',
                            fontWeight: isSelected ? 800 : 600,
                            color: isSelected ? '#1e40af' : '#475569',
                            whiteSpace: 'nowrap',
                            textAlign: 'center'
                          }}>
                            {m.label} {m.isPartialMonth ? '*' : ''}
                          </div>
                        </div>
                      )
                    } else {
                      const totalRawan = m.totalRawanBlocks
                      const hasData = totalRawan > 0
                      const coveredPct = hasData ? (m.coveredRawanBlocks / totalRawan) * 100 : null
                      const uncoveredPct = hasData ? 100 - coveredPct! : null

                      const coveredColor = '#2563eb'
                      const uncoveredColor = '#cbd5e1'

                      const coveredHeightPx = hasData ? (coveredPct! / 100) * 225 : 0
                      const uncoveredHeightPx = hasData ? (uncoveredPct! / 100) * 225 : 0

                      const tooltipText = hasData
                        ? `${m.label} (${compData.scopeLabel})\nTer-cover: ${formatNum(m.coveredRawanBlocks)} (${formatPct(coveredPct)})\nBelum Ter-cover: ${formatNum(m.uncoveredRawanBlocks)} (${formatPct(uncoveredPct)})\nTotal Rawan: ${formatNum(totalRawan)} blok`
                        : `${m.label}\nTidak ada inventory blok rawan`

                      return (
                        <div
                          key={m.yearMonth}
                          onClick={() => handleSelectEntityDrilldown(compData.scopeLabel, m.label, m.yearMonth)}
                          title={tooltipText}
                          style={{
                            position: 'relative',
                            height: '225px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            cursor: 'pointer',
                            opacity: isSelected ? 1 : (drilldownState ? 0.65 : 1)
                          }}
                        >
                          <div style={{
                            width: '100%',
                            maxWidth: '42px',
                            height: '225px',
                            display: 'flex',
                            flexDirection: 'column-reverse',
                            borderRadius: '4px 4px 0 0',
                            overflow: 'hidden',
                            background: hasData ? 'transparent' : '#e2e8f0',
                            border: isSelected ? '2px solid #2563eb' : '1px solid #cbd5e1',
                            boxShadow: isSelected ? '0 0 0 3px rgba(37,99,235,0.2)' : 'none'
                          }}>
                            {hasData ? (
                              <>
                                <div style={{
                                  height: `${coveredHeightPx}px`,
                                  background: coveredColor,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#ffffff',
                                  fontSize: '0.675rem',
                                  fontWeight: 800,
                                  transition: 'height 0.2s ease'
                                }}>
                                  {coveredHeightPx >= 18 ? `${Math.round(coveredPct!)}%` : ''}
                                </div>
                                <div style={{
                                  height: `${uncoveredHeightPx}px`,
                                  background: uncoveredColor,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#1e293b',
                                  fontSize: '0.675rem',
                                  fontWeight: 800,
                                  transition: 'height 0.2s ease'
                                }}>
                                  {uncoveredHeightPx >= 18 ? `${Math.round(uncoveredPct!)}%` : ''}
                                </div>
                              </>
                            ) : (
                              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.7rem' }}>
                                —
                              </div>
                            )}
                          </div>

                          <div style={{
                            position: 'absolute',
                            bottom: '-24px',
                            fontSize: '0.675rem',
                            fontWeight: isSelected ? 800 : 600,
                            color: isSelected ? '#1e40af' : '#475569',
                            whiteSpace: 'nowrap',
                            textAlign: 'center'
                          }}>
                            {m.label} {m.isPartialMonth ? '*' : ''}
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SUMMARY TABLE BENEATH CHART - MATCHING LAPORAN SECTION STYLING */}
        <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ padding: '0.75rem 1rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
              {activeViewMode === 'Perbandingan'
                ? `Tabel Breakdown Perbandingan Coverage (${compData.scopeLabel})`
                : `Tabel Breakdown Tren 6 Bulan Coverage (${compData.scopeLabel})`}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {activeViewMode === 'Perbandingan'
                  ? `Menampilkan ${paginatedPerbandinganRows.length} dari ${compData.categories.length} ${compData.groupingType === 'Vehicle' ? 'Unit Kendaraan' : compData.groupingType}`
                  : `Menampilkan ${paginatedTrendRows.length} dari ${trendData.rows.length} ${trendData.breakdownType === 'Vehicle' ? 'Unit Kendaraan' : trendData.breakdownType}`}
              </div>
              {drilldownState && (
                <button
                  type="button"
                  onClick={() => setDrilldownState(null)}
                  style={{
                    padding: '0.2rem 0.5rem',
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '4px',
                    fontSize: '0.725rem',
                    fontWeight: 600,
                    color: '#1d4ed8',
                    cursor: 'pointer'
                  }}
                >
                  Reset Filter ({drilldownState.entityLabel})
                </button>
              )}
            </div>
          </div>

          {activeViewMode === 'Perbandingan' ? (
            /* Perbandingan Table */
            <div>
              <div style={{ overflowX: 'auto' }}>
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                <thead>
                  <tr style={{ background: '#e2e8f0', textTransform: 'uppercase', fontSize: '0.725rem', color: '#475569', fontWeight: 700 }}>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'left' }}>
                      {compData.groupingType === 'Vehicle' ? 'Unit Kendaraan (Nopol)' : compData.groupingType}
                    </th>

                    {selectedMetric === 'Aktivitas' ? (
                      <React.Fragment>
                        <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Coverage Rawan</th>
                        <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Coverage Non-Rawan</th>
                        <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Total Coverage</th>
                        <th style={{ padding: '0.65rem 0.8rem', textAlign: 'center' }}>% Porsi Rawan</th>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Total Blok Rawan</th>
                        <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Ter-cover</th>
                        <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Belum Ter-cover</th>
                        <th style={{ padding: '0.65rem 0.8rem', textAlign: 'center' }}>% Ter-cover</th>
                      </React.Fragment>
                    )}
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPerbandinganRows.map((row, idx) => {
                    const isSelected = drilldownState?.entityId === row.id
                    return (
                      <tr
                        key={row.id}
                        onClick={() => handleSelectEntityDrilldown(row.id, row.label)}
                        style={{
                          borderBottom: '1px solid #e2e8f0',
                          background: isSelected ? '#eff6ff' : (idx % 2 === 1 ? '#f8fafc' : '#ffffff'),
                          cursor: 'pointer',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <td style={{ padding: '0.65rem 0.8rem', fontWeight: 700, color: '#0f172a' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            {row.vehicleType && (
                              <span>{row.vehicleType === 'Car' ? '🚗' : '🏍️'}</span>
                            )}
                            <div>
                              {row.label}
                              {row.subLabel && <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 400 }}>{row.subLabel}</div>}
                            </div>
                          </div>
                        </td>

                        {selectedMetric === 'Aktivitas' ? (
                          <React.Fragment>
                            {/* All counts strictly navy #0f172a */}
                            <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                              {formatNum(row.rawanVisits)}
                            </td>
                            <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                              {formatNum(row.nonRawanVisits)}
                            </td>
                            <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                              {formatNum(row.totalVisits)}
                            </td>
                            {/* Percentage follows Section 3 threshold color */}
                            <td style={{
                              padding: '0.65rem 0.8rem',
                              textAlign: 'center',
                              fontWeight: 800,
                              color: row.aktivitasPct !== null ? getAktivitasThresholdColor(row.aktivitasPct) : '#64748b'
                            }}>
                              {formatPct(row.aktivitasPct)}
                            </td>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            {/* All counts strictly navy #0f172a */}
                            <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                              {formatNum(row.totalRawanBlocks)}
                            </td>
                            <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                              {formatNum(row.coveredRawanBlocks)}
                            </td>
                            <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                              {formatNum(row.uncoveredRawanBlocks)}
                            </td>
                            {/* Cakupan percentage remains navy */}
                            <td style={{ padding: '0.65rem 0.8rem', textAlign: 'center', fontWeight: 800, color: '#0f172a' }}>
                              {formatPct(row.cakupanPct)}
                            </td>
                          </React.Fragment>
                        )}

                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleSelectEntityDrilldown(row.id, row.label); }}
                            style={{
                              padding: '0.25rem 0.55rem',
                              background: isSelected ? '#1d4ed8' : '#eff6ff',
                              color: isSelected ? '#ffffff' : '#1d4ed8',
                              border: '1px solid #bfdbfe',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.725rem',
                              fontWeight: 600,
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {isSelected ? '✓ Terpilih' : 'Focus Map 🗺️'}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ background: '#f1f5f9', fontWeight: 800, borderTop: '2px solid #cbd5e1' }}>
                    <td style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Total Agregat Scope</td>
                    {selectedMetric === 'Aktivitas' ? (
                      <React.Fragment>
                        <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right', color: '#0f172a' }}>{formatNum(compData.totalAggregate.rawanVisits)}</td>
                        <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right', color: '#0f172a' }}>{formatNum(compData.totalAggregate.nonRawanVisits)}</td>
                        <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right', color: '#0f172a' }}>{formatNum(compData.totalAggregate.totalVisits)}</td>
                        <td style={{
                          padding: '0.75rem 0.8rem',
                          textAlign: 'center',
                          color: compData.totalAggregate.aktivitasPct !== null ? getAktivitasThresholdColor(compData.totalAggregate.aktivitasPct) : '#64748b'
                        }}>
                          {formatPct(compData.totalAggregate.aktivitasPct)}
                        </td>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right', color: '#0f172a' }}>{formatNum(compData.totalAggregate.totalRawanBlocks)}</td>
                        <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right', color: '#0f172a' }}>{formatNum(compData.totalAggregate.coveredRawanBlocks)}</td>
                        <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right', color: '#0f172a' }}>{formatNum(compData.totalAggregate.uncoveredRawanBlocks)}</td>
                        <td style={{ padding: '0.75rem 0.8rem', textAlign: 'center', color: '#0f172a' }}>{formatPct(compData.totalAggregate.cakupanPct)}</td>
                      </React.Fragment>
                    )}
                    <td style={{ padding: '0.75rem 0.8rem', textAlign: 'center' }}>—</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Pagination Controls */}
            {compData.categories.length > perbandinganPageSize && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b' }}>
                <div>Halaman {perbandinganPage} dari {Math.ceil(compData.categories.length / perbandinganPageSize)}</div>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <button
                    type="button"
                    disabled={perbandinganPage === 1}
                    onClick={() => setPerbandinganPage(p => Math.max(1, p - 1))}
                    style={{ padding: '0.2rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', cursor: perbandinganPage === 1 ? 'not-allowed' : 'pointer' }}
                  >
                    Sebelumnya
                  </button>
                  <button
                    type="button"
                    disabled={perbandinganPage * perbandinganPageSize >= compData.categories.length}
                    onClick={() => setPerbandinganPage(p => p + 1)}
                    style={{ padding: '0.2rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', cursor: perbandinganPage * perbandinganPageSize >= compData.categories.length ? 'not-allowed' : 'pointer' }}
                  >
                    Berikutnya
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Tren 6 Bulan Table */
          <div>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                <thead>
                  <tr style={{ background: '#e2e8f0', textTransform: 'uppercase', fontSize: '0.725rem', color: '#475569', fontWeight: 700 }}>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'left' }}>
                      {trendData.breakdownType === 'Vehicle' ? 'Unit Kendaraan' : trendData.breakdownType}
                    </th>
                    {trendData.headers.map(h => (
                      <th
                        key={h.yearMonth}
                        onClick={() => handleSelectEntityDrilldown(compData.scopeLabel, h.label, h.yearMonth)}
                        style={{ padding: '0.65rem 0.8rem', textAlign: 'center', cursor: 'pointer' }}
                        title={`Klik untuk memfokuskan scope peta pada bulan ${h.label}`}
                      >
                        {h.label} {h.isPartialMonth ? '*' : ''}
                      </th>
                    ))}
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'center', background: '#cbd5e1', color: '#1e293b' }}>Total 6-Bulan</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTrendRows.map((row, idx) => {
                    const isRowSelected = drilldownState?.entityId === row.id && !drilldownState?.yearMonth
                    return (
                      <tr
                        key={row.id}
                        style={{
                          borderBottom: '1px solid #e2e8f0',
                          background: isRowSelected ? '#eff6ff' : (idx % 2 === 1 ? '#f8fafc' : '#ffffff')
                        }}
                      >
                        <td
                          onClick={() => handleSelectEntityDrilldown(row.id, row.label)}
                          style={{ padding: '0.65rem 0.8rem', fontWeight: 700, color: '#0f172a', cursor: 'pointer' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            {row.vehicleType && <span>{row.vehicleType === 'Car' ? '🚗' : '🏍️'}</span>}
                            <div>
                              {row.label}
                              {row.subLabel && <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 400 }}>{row.subLabel}</div>}
                            </div>
                          </div>
                        </td>

                        {row.months.map(m => {
                          const valPct = selectedMetric === 'Aktivitas' ? m.aktivitasPct : m.cakupanPct
                          const isCellSelected = drilldownState?.cellKey === `${row.id}_${m.yearMonth}`
                          const tooltipText = selectedMetric === 'Aktivitas'
                            ? `${row.label} (${m.label})\nRawan Coverage: ${formatNum(m.rawanVisits)} / ${formatNum(m.totalVisits)} total kunjungan\nStatus: Prioritas ${getAktivitasThresholdBadge(m.aktivitasPct).label}`
                            : `${row.label} (${m.label})\nBlok Ter-cover: ${formatNum(m.coveredRawanBlocks)} / ${formatNum(m.totalRawanBlocks)} total rawan`

                          const cellColor = selectedMetric === 'Aktivitas'
                            ? getAktivitasThresholdColor(valPct)
                            : (valPct !== null ? '#0f172a' : '#94a3b8')

                          return (
                            <td
                              key={m.yearMonth}
                              onClick={() => handleSelectEntityDrilldown(row.id, row.label, m.yearMonth)}
                              title={tooltipText}
                              style={{
                                padding: '0.65rem 0.8rem',
                                textAlign: 'center',
                                fontWeight: 700,
                                cursor: 'pointer',
                                background: isCellSelected ? '#dbeafe' : 'transparent'
                              }}
                            >
                              <span style={{ color: cellColor }}>
                                {formatPct(valPct)}
                              </span>
                            </td>
                          )
                        })}

                        <td style={{
                          padding: '0.65rem 0.8rem',
                          textAlign: 'center',
                          fontWeight: 800,
                          background: '#f8fafc',
                          color: selectedMetric === 'Aktivitas'
                            ? getAktivitasThresholdColor(row.totalAktivitasPct)
                            : '#0f172a'
                        }}>
                          {formatPct(selectedMetric === 'Aktivitas' ? row.totalAktivitasPct : row.totalCakupanPct)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ background: '#f1f5f9', fontWeight: 800, borderTop: '2px solid #cbd5e1' }}>
                    <td style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Total Agregat Scope</td>
                    {trendData.monthlyScopeAggregates.map(m => (
                      <td
                        key={m.yearMonth}
                        style={{
                          padding: '0.75rem 0.8rem',
                          textAlign: 'center',
                          color: selectedMetric === 'Aktivitas'
                            ? getAktivitasThresholdColor(m.aktivitasPct)
                            : '#0f172a'
                        }}
                      >
                        {formatPct(selectedMetric === 'Aktivitas' ? m.aktivitasPct : m.cakupanPct)}
                      </td>
                    ))}
                    <td style={{
                      padding: '0.75rem 0.8rem',
                      textAlign: 'center',
                      background: '#cbd5e1',
                      color: selectedMetric === 'Aktivitas'
                        ? getAktivitasThresholdColor(trendData.overallScopeAggregate.aktivitasPct)
                        : '#0f172a'
                    }}>
                      {formatPct(selectedMetric === 'Aktivitas' ? trendData.overallScopeAggregate.aktivitasPct : trendData.overallScopeAggregate.cakupanPct)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Pagination Controls */}
            {trendData.rows.length > trendPageSize && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b' }}>
                <div>Halaman {trendPage} dari {Math.ceil(trendData.rows.length / trendPageSize)}</div>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <button
                    type="button"
                    disabled={trendPage === 1}
                    onClick={() => setTrendPage(p => Math.max(1, p - 1))}
                    style={{ padding: '0.2rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', cursor: trendPage === 1 ? 'not-allowed' : 'pointer' }}
                  >
                    Sebelumnya
                  </button>
                  <button
                    type="button"
                    disabled={trendPage * trendPageSize >= trendData.rows.length}
                    onClick={() => setTrendPage(p => p + 1)}
                    style={{ padding: '0.2rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', cursor: trendPage * trendPageSize >= trendData.rows.length ? 'not-allowed' : 'pointer' }}
                  >
                    Berikutnya
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. BOTTOM SECTION: DETAIL COVERAGE MAP (CONDITIONALLY DISPLAYED BASED ON REQ 7) */}
      {(() => {
        const isGlobalEstateScope = Boolean(globalFilters.estate && globalFilters.estate !== 'ALL')
        const isDrilldownEstateOrVehicle = Boolean(drilldownState?.estateId || drilldownState?.vehicleId)
        const isMapVisible = isGlobalEstateScope || isDrilldownEstateOrVehicle

        if (!isMapVisible) return null

        return (
          <div ref={detailMapRef} id="detail-coverage-map" style={{
            background: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            padding: '1.25rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>🗺️</span> Detail Coverage Map
                </h3>
                <div style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '0.15rem' }}>
                  Visualisasi batas blok &amp; frekuensi kualifikasi coverage per unit
                </div>
              </div>

              {/* Context Breadcrumb Banner */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  background: drilldownState ? '#fef3c7' : '#f1f5f9',
                  border: drilldownState ? '1.5px solid #f59e0b' : '1px solid #cbd5e1',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  color: drilldownState ? '#92400e' : '#334155'
                }}>
                  {drilldownState ? `🎯 Focused Scope: ${drilldownState.entityLabel}` : `🌐 Scope Estate: ${activeMapEstateId}`}
                </div>

                {drilldownState && (
                  <button
                    type="button"
                    onClick={() => setDrilldownState(null)}
                    style={{
                      padding: '0.35rem 0.65rem',
                      background: '#2563eb',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    🔄 Reset Scope Map
                  </button>
                )}
              </div>
            </div>

            {/* MAP CONTAINER & INTEGRATED CONTROLS */}
            <div style={{
              position: isFullscreen ? 'fixed' : 'relative',
              inset: isFullscreen ? 0 : undefined,
              zIndex: isFullscreen ? 9999 : 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              minHeight: '560px',
              background: '#ffffff'
            }}>
              {/* Integrated Map Toolbar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
                background: '#f8fafc',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid #cbd5e1'
              }}>
                {/* Category Toggle: Semua | Rawan | Non-Rawan */}
                <div style={{ display: 'flex', background: '#e2e8f0', padding: '0.15rem', borderRadius: '5px' }}>
                  {(['Semua', 'Rawan', 'Non-Rawan'] as MapFilterType[]).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setMapFilterType(type)}
                      style={{
                        padding: '0.25rem 0.55rem',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.725rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        background: mapFilterType === type ? '#ffffff' : 'transparent',
                        color: mapFilterType === type ? '#0f172a' : '#64748b',
                        boxShadow: mapFilterType === type ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                      }}
                    >
                      {type === 'Rawan' ? '🔴 Rawan' : type === 'Non-Rawan' ? '🔵 Non-Rawan' : '🌐 Semua'}
                    </button>
                  ))}
                </div>

                {/* Selectors & Mode Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {/* Shared Compact Toggle: Rata-rata | Jumlah */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#475569' }}>Mode Text:</span>
                    <div style={{ display: 'flex', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '0.1rem' }}>
                      <button
                        type="button"
                        onClick={() => handleMapModeToggle('Rata-rata')}
                        style={{
                          padding: '0.15rem 0.45rem',
                          border: 'none',
                          borderRadius: '3px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          background: mapMetricMode === 'Rata-rata' ? '#0f172a' : 'transparent',
                          color: mapMetricMode === 'Rata-rata' ? '#ffffff' : '#475569'
                        }}
                      >
                        Rata-rata
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMapModeToggle('Jumlah')}
                        style={{
                          padding: '0.15rem 0.45rem',
                          border: 'none',
                          borderRadius: '3px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          background: mapMetricMode === 'Jumlah' ? '#0f172a' : 'transparent',
                          color: mapMetricMode === 'Jumlah' ? '#ffffff' : '#475569'
                        }}
                      >
                        Jumlah
                      </button>
                    </div>
                  </div>

                  {/* Vehicle Dropdown (Local Map Filter) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#475569' }}>Unit:</span>
                    <select
                      value={mapLocalVehicleId}
                      onChange={e => setMapLocalVehicleId(e.target.value)}
                      style={{
                        padding: '0.2rem 0.45rem',
                        borderRadius: '4px',
                        border: mapLocalVehicleId !== 'ALL' ? '1.5px solid #0284c7' : '1px solid #cbd5e1',
                        fontSize: '0.725rem',
                        fontWeight: 600,
                        background: mapLocalVehicleId !== 'ALL' ? '#f0f9ff' : '#ffffff',
                        color: mapLocalVehicleId !== 'ALL' ? '#0369a1' : '#0f172a',
                        cursor: 'pointer',
                        maxWidth: '130px'
                      }}
                    >
                      <option value="ALL">Semua Unit</option>
                      {availableVehicles.map(v => (
                        <option key={v.id} value={v.id}>
                          {v.nopol} ({v.vehicleType})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Block Search Input */}
                  <input
                    type="text"
                    value={mapSearchQuery}
                    onChange={e => setMapSearchQuery(e.target.value)}
                    placeholder="Cari blok..."
                    style={{
                      padding: '0.2rem 0.45rem',
                      borderRadius: '4px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.725rem',
                      width: '100px'
                    }}
                  />

                  {/* Fullscreen Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    style={{
                      padding: '0.2rem 0.45rem',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      fontSize: '0.725rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {isFullscreen ? '✕ Exit' : '⛶ Fullscreen'}
                  </button>
                </div>
              </div>

              {/* Leaflet Map Viewer Component */}
              <div style={{ position: 'relative', width: '100%', height: isFullscreen ? 'calc(100vh - 60px)' : '520px', borderRadius: '8px', overflow: 'hidden' }}>
                <CoverageBlockMap
                  estateId={activeMapEstateId}
                  blocks={filteredBlocks}
                  mapFilterType={mapFilterType}
                  mapMetricMode={mapMetricMode}
                  mapLegendFilter={mapLegendFilter}
                  selectedBlockId={selectedBlockId}
                  searchQuery={mapSearchQuery}
                  onSelectBlock={setSelectedBlockId}
                  onHoverBlock={setHoveredBlock}
                />

                {/* On-demand Selected Block Detail Drawer Overlay */}
                {selectedBlock && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '320px',
                    maxHeight: 'calc(100% - 24px)',
                    background: '#ffffff',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                  }}>
                    <div style={{ padding: '0.75rem 1rem', background: '#0f172a', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{selectedBlock.blockCode}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{selectedBlock.estateName} ({selectedBlock.estateId})</div>
                      </div>
                      <button
                        onClick={() => setSelectedBlockId(null)}
                        style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '1.1rem', cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    </div>

                    <div style={{ padding: '0.75rem', overflowY: 'auto', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', background: '#f8fafc', padding: '0.5rem', borderRadius: '6px' }}>
                        <div>Klasifikasi: <strong style={{ color: selectedBlock.isRawan ? '#dc2626' : '#2563eb' }}>{selectedBlock.isRawan ? '🔴 Rawan' : '🔵 Non-Rawan'}</strong></div>
                        <div>Total Coverage: <strong>{selectedBlock.validCoverageCount}×</strong></div>
                        <div>Rata-rata/Hari: <strong>{selectedBlock.avgPerDay.toString().replace('.', ',')}×</strong></div>
                        <div>Hari Tercakup: <strong>{selectedBlock.distinctDaysCount} hari ({selectedBlock.hariTercakupPct.toString().replace('.', ',')}%)</strong></div>
                      </div>

                      {/* Subtabs for Detail Drawer */}
                      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', fontSize: '0.75rem', fontWeight: 600 }}>
                        <div
                          onClick={() => setActiveDetailTab('traversals')}
                          style={{ padding: '0.4rem 0.6rem', cursor: 'pointer', borderBottom: activeDetailTab === 'traversals' ? '2px solid #2563eb' : 'none', color: activeDetailTab === 'traversals' ? '#2563eb' : '#64748b' }}
                        >
                          Qualifying ({selectedBlock.qualifyingTraversals.length})
                        </div>
                        <div
                          onClick={() => setActiveDetailTab('date_breakdown')}
                          style={{ padding: '0.4rem 0.6rem', cursor: 'pointer', borderBottom: activeDetailTab === 'date_breakdown' ? '2px solid #2563eb' : 'none', color: activeDetailTab === 'date_breakdown' ? '#2563eb' : '#64748b' }}
                        >
                          By Date
                        </div>
                      </div>

                      {activeDetailTab === 'traversals' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '200px', overflowY: 'auto' }}>
                          {selectedBlock.qualifyingTraversals.length === 0 ? (
                            <div style={{ fontStyle: 'italic', color: '#94a3b8', fontSize: '0.75rem' }}>Belum ada traversal qualifying.</div>
                          ) : (
                            selectedBlock.qualifyingTraversals.map(item => (
                              <div key={item.id} style={{ background: '#f8fafc', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '0.725rem' }}>
                                <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.date} ({item.shift})</div>
                                <div style={{ color: '#475569' }}>Unit: <strong>{item.nopol}</strong> · {item.distanceInsideMeters}m ({item.durationMinutes}m)</div>
                                {item.reentryGapFormatted && <div style={{ fontSize: '0.675rem', color: '#16a34a' }}>re-entry gap: {item.reentryGapFormatted}</div>}
                              </div>
                            ))
                          )}
                        </div>
                      )}

                      {activeDetailTab === 'date_breakdown' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', maxHeight: '200px', overflowY: 'auto' }}>
                          {selectedBlock.dateBreakdown.map(db => (
                            <div key={db.date} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0.5rem', background: '#f8fafc', borderRadius: '4px', fontSize: '0.725rem' }}>
                              <span style={{ fontWeight: 600 }}>{db.date}</span>
                              <span><strong>{db.coverageCount}×</strong> ({db.nopols.join(', ')})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })()}



      {/* METRIK & FORMULA MODAL */}
      {showInfoModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '1rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', maxWidth: '640px', width: '100%', padding: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>ℹ️</span> Ketentuan &amp; Formula Metrik Coverage Area
              </h3>
              <button onClick={() => setShowInfoModal(false)} style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.825rem', color: '#334155', lineHeight: 1.5 }}>
              <div style={{ background: '#eff6ff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '0.9rem', color: '#1e40af' }}>1. Metric A: Aktivitas di Area Rawan</h4>
                <div>Formula: <code>(Rawan Coverage / Total Classified Coverage) × 100</code></div>
                <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.25rem' }}>Mengukur porsi pembagian aktivitas patroli antara blok rawan dan non-rawan.</div>
              </div>

              <div style={{ background: '#f0fdf4', padding: '0.85rem', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '0.9rem', color: '#166534' }}>2. Metric B: Cakupan Blok Rawan</h4>
                <div>Formula: <code>(Blok Rawan Ter-cover / Total Inventory Blok Rawan) × 100</code></div>
                <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.25rem' }}>Mengukur persentase inventory blok rawan yang memiliki minimal 1 coverage valid pada periode pengamatan.</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '0.9rem', color: '#0f172a' }}>3. Syarat Kualifikasi Traversal</h4>
                <ul style={{ margin: '0.25rem 0 0 1.25rem', padding: 0 }}>
                  <li>Distance in block: minimum <strong>600 meter</strong> di dalam polygon blok.</li>
                  <li>Re-entry gap: minimum <strong>10 menit</strong> dari waktu keluar (exit) sebelumnya pada blok yang sama.</li>
                  <li>Patrol report inclusion: mencakup hasil analisis tracking dari laporan submitted maupun unsubmitted.</li>
                </ul>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: '1.25rem' }}>
              <button
                onClick={() => setShowInfoModal(false)}
                style={{ padding: '0.5rem 1rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
