'use client'

import React, { useState, useMemo, useEffect } from 'react'
import PageShell from '@/components/PageShell'
import HierarchyFilterBar, { HierarchyFilterState, formatCustomDateRangeLabel } from '@/components/HierarchyFilterBar'
import { MOCK_VEHICLES } from '@/lib/mock-database'
import CoverageAreaTab from '@/components/CoverageAreaTab'
import RouteEffectivenessTab from '@/components/RouteEffectivenessTab'
import NormalRusakSection from '@/components/NormalRusakSection'
import { UserRole, buildAllDamageIncidents } from '@/lib/damage-incidents'
import { AlertCircle, AlertTriangle } from 'lucide-react'
import {
  selectReportsKpis,
  selectReasonBreakdown,
  selectBlockCoverageMetrics,
  selectComprehensiveCoverage,
  selectLaporanChartAndTable,
  selectTrendBreakdownTable,
  selectSpeedingDetails,
  selectUnifiedExceptionBreakdown,
  selectRouteEffectivenessKpis,
  getFilteredPatrolRuns,
  getFilteredExceptions,
  generateCsvData,
  normalizeMonth,
  ChartCategoryItem,
  DailyReportViewItem,
  SpeedingReasonRow,
  SpeedingEventRow,
  getDisiplinColor
} from '@/lib/selectors'
import {
  formatDurationFormatted,
  formatDurationLong,
  formatDistanceKm,
  formatCount,
  formatPercentage
} from '@/lib/formatters'
import { GlobalFilterState, PatrolReportRecord, ExceptionEventRecord } from '@/lib/types'

/* ==========================================================================
   COMPONENT 1: SUBMISSION VERTICAL BAR CHART (WITH EXPLICIT Y-AXES)
   ========================================================================== */
function SubmissionVerticalBarChart({
  categories,
  chartMeasureMode,
  effectiveDateRangeLabel,
  onSelectCategory,
  selectedCategoryId
}: {
  categories: ChartCategoryItem[]
  chartMeasureMode: 'Persentase (%)' | 'Jumlah Laporan'
  effectiveDateRangeLabel: string
  onSelectCategory: (cat: ChartCategoryItem) => void
  selectedCategoryId?: string | null
}) {
  if (categories.length === 0) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Tidak ada data laporan dalam scope ini.</div>
  }

  const PLOT_HEIGHT = 240

  const renderPriorityLegend = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '0.85rem', fontSize: '0.75rem', padding: '0.4rem 0.65rem', background: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
      <span style={{ fontWeight: 700, color: '#334155' }}>Prioritas Disiplin Upload:</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#15803d', fontWeight: 600 }}>
        <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#16a34a', display: 'inline-block' }} />
        Rendah (≥100%)
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#b45309', fontWeight: 600 }}>
        <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#d97706', display: 'inline-block' }} />
        Sedang (≥90%–&lt;100%)
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#b91c1c', fontWeight: 600 }}>
        <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#dc2626', display: 'inline-block' }} />
        Tinggi (&lt;90%)
      </span>
      {chartMeasureMode === 'Jumlah Laporan' && (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#475569', fontWeight: 600, borderLeft: '1px solid #cbd5e1', paddingLeft: '0.85rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#94a3b8', display: 'inline-block' }} />
          Target
        </span>
      )}
    </div>
  )

  if (chartMeasureMode === 'Persentase (%)') {
    const ticks = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]
    return (
      <div>
        {renderPriorityLegend()}
        <div style={{ position: 'relative', height: `${PLOT_HEIGHT + 55}px`, paddingLeft: '45px', paddingTop: '25px', paddingBottom: '30px' }}>
          {/* Y-Axis Ticks */}
          <div style={{ position: 'absolute', left: 0, top: '25px', height: `${PLOT_HEIGHT}px`, width: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', borderRight: '1.5px solid #64748b', paddingRight: '6px' }}>
            {ticks.map(t => (
              <span key={t} style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, transform: 'translateY(-50%)', lineHeight: 1 }}>{t}%</span>
            ))}
          </div>

          {/* Horizontal Gridlines */}
          <div style={{ position: 'absolute', left: '45px', right: 0, top: '25px', height: `${PLOT_HEIGHT}px`, pointerEvents: 'none' }}>
            {ticks.map((t, idx) => (
              <div key={t} style={{ position: 'absolute', top: `${(idx / (ticks.length - 1)) * 100}%`, left: 0, right: 0, borderTop: t === 0 ? '1.5px solid #64748b' : '1px dashed #e2e8f0' }} />
            ))}
          </div>

          {/* Bars Container */}
          <div style={{ position: 'relative', height: `${PLOT_HEIGHT}px`, display: 'grid', gridTemplateColumns: `repeat(${categories.length}, 1fr)`, gap: '0.75rem' }}>
            {categories.map(cat => {
              const pctVal = cat.compliancePct !== null ? cat.compliancePct : 0
              const barHeightPx = Math.min(PLOT_HEIGHT, Math.max(0, (pctVal / 100) * PLOT_HEIGHT))
              const isSelected = selectedCategoryId === cat.id

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat)}
                  title={`${cat.label}\nDisiplin Upload: ${cat.compliancePct !== null ? formatPercentage(cat.compliancePct) : 'N/A'}\nSubmitted: ${formatCount(cat.actualReports)} / Target: ${formatCount(cat.targetReports)} laporan${cat.partialTooltip ? '\n' + cat.partialTooltip : ''}`}
                  style={{ position: 'relative', height: `${PLOT_HEIGHT}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', cursor: 'pointer', opacity: isSelected ? 1 : (selectedCategoryId ? 0.6 : 1) }}
                >
                  {/* Value label positioned above bar top */}
                  <div style={{ position: 'absolute', bottom: `${barHeightPx + 4}px`, fontSize: '0.65rem', fontWeight: 700, color: cat.compliancePct !== null ? cat.thresholdColor : '#94a3b8', whiteSpace: 'nowrap' }}>
                    {cat.compliancePct !== null ? formatPercentage(cat.compliancePct) : 'N/A'}
                  </div>

                  {/* Actual Bar Element */}
                  <div style={{ width: '100%', maxWidth: '40px', height: `${barHeightPx}px`, background: cat.compliancePct !== null ? cat.thresholdColor : '#cbd5e1', borderRadius: '4px 4px 0 0', transition: 'height 0.3s ease', border: isSelected ? '2px solid #0f172a' : 'none', boxShadow: isSelected ? '0 0 0 2px rgba(15,23,42,0.2)' : 'none' }} />

                  {/* X-axis Category Label */}
                  <div style={{ position: 'absolute', top: `${PLOT_HEIGHT + 6}px`, fontSize: '0.675rem', color: isSelected ? '#0f172a' : '#334155', fontWeight: isSelected ? 800 : 600, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                    {cat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // JUMLAH MODE (Grouped Vertical Bars with Explicit Numeric Y-Axis)
  const maxVal = Math.max(...categories.map(c => Math.max(c.targetReports, c.actualReports)), 1)
  const tickStep = Math.max(1, Math.ceil(maxVal / 5))
  const maxAxisVal = Math.ceil(maxVal / tickStep) * tickStep
  const ticks = []
  for (let v = maxAxisVal; v >= 0; v -= tickStep) {
    ticks.push(v)
  }

  return (
    <div>
      {renderPriorityLegend()}
      <div style={{ position: 'relative', height: `${PLOT_HEIGHT + 55}px`, paddingLeft: '45px', paddingTop: '25px', paddingBottom: '30px' }}>
        {/* Y-Axis Ticks */}
        <div style={{ position: 'absolute', left: 0, top: '25px', height: `${PLOT_HEIGHT}px`, width: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', borderRight: '1.5px solid #64748b', paddingRight: '6px' }}>
          {ticks.map(t => (
            <span key={t} style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, transform: 'translateY(-50%)', lineHeight: 1 }}>{t}</span>
          ))}
        </div>

        {/* Horizontal Gridlines */}
        <div style={{ position: 'absolute', left: '45px', right: 0, top: '25px', height: `${PLOT_HEIGHT}px`, pointerEvents: 'none' }}>
          {ticks.map((t, idx) => (
            <div key={t} style={{ position: 'absolute', top: `${(idx / (ticks.length - 1)) * 100}%`, left: 0, right: 0, borderTop: t === 0 ? '1.5px solid #64748b' : '1px dashed #e2e8f0' }} />
          ))}
        </div>

        {/* Grouped Bars Container */}
        <div style={{ position: 'relative', height: `${PLOT_HEIGHT}px`, display: 'grid', gridTemplateColumns: `repeat(${categories.length}, 1fr)`, gap: '0.75rem' }}>
          {categories.map(cat => {
            const targetPx = Math.min(PLOT_HEIGHT, Math.max(0, (cat.targetReports / maxAxisVal) * PLOT_HEIGHT))
            const actualPx = Math.min(PLOT_HEIGHT, Math.max(0, (cat.actualReports / maxAxisVal) * PLOT_HEIGHT))
            const isSelected = selectedCategoryId === cat.id

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat)}
                title={`${cat.label}\nTarget: ${formatCount(cat.targetReports)} laporan\nSudah Dikirim: ${formatCount(cat.actualReports)} laporan\nBelum Dikirim: ${formatCount(cat.shortfall)} laporan${cat.partialTooltip ? '\n' + cat.partialTooltip : ''}`}
                style={{ position: 'relative', height: `${PLOT_HEIGHT}px`, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', cursor: 'pointer', opacity: isSelected ? 1 : (selectedCategoryId ? 0.6 : 1) }}
              >
                <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', width: '100%', maxWidth: '44px', height: `${PLOT_HEIGHT}px`, position: 'relative' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: `${PLOT_HEIGHT}px`, position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: `${targetPx + 2}px`, fontSize: '0.6rem', fontWeight: 600, color: '#64748b', whiteSpace: 'nowrap' }}>
                      {formatCount(cat.targetReports)}
                    </div>
                    <div style={{ width: '100%', height: `${targetPx}px`, background: '#94a3b8', borderRadius: '3px 3px 0 0' }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: `${PLOT_HEIGHT}px`, position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: `${actualPx + 2}px`, fontSize: '0.6rem', fontWeight: 700, color: cat.compliancePct !== null ? cat.thresholdColor : '#94a3b8', whiteSpace: 'nowrap' }}>
                      {formatCount(cat.actualReports)}
                    </div>
                    <div style={{ width: '100%', height: `${actualPx}px`, background: cat.compliancePct !== null ? cat.thresholdColor : '#94a3b8', borderRadius: '3px 3px 0 0' }} />
                  </div>
                </div>
                <div style={{ position: 'absolute', top: `${PLOT_HEIGHT + 6}px`, fontSize: '0.675rem', color: isSelected ? '#0f172a' : '#334155', fontWeight: isSelected ? 800 : 600, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                  {cat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   COMPONENT 2: UNIFIED EXCEPTION BREAKDOWN (DONUT + TABLE + DETAIL)
   ========================================================================== */
function UnifiedExceptionBreakdownView({
  exceptionKey,
  globalFilters,
  priorityFilter,
  onBack,
  onOpenReportModal,
  onOpenExceptionModal
}: {
  exceptionKey: 'Kecepatan' | 'Keluar Rute' | 'Berhenti'
  globalFilters: GlobalFilterState
  priorityFilter: 'ALL' | 'Normal' | 'Urgent'
  onBack: () => void
  onOpenReportModal: (r: PatrolReportRecord) => void
  onOpenExceptionModal: (e: ExceptionEventRecord) => void
}) {
  const [mode, setMode] = useState<'Alasan' | 'Perbandingan'>('Alasan')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedLainnya, setExpandedLainnya] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [eventPage, setEventPage] = useState(1)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)

  // Reset local category selection when mode changes
  const handleModeChange = (newMode: 'Alasan' | 'Perbandingan') => {
    setMode(newMode)
    setSelectedCategory(null)
    setExpandedLainnya(false)
    setEventPage(1)
  }

  const result = useMemo(() => {
    return selectUnifiedExceptionBreakdown(
      globalFilters,
      exceptionKey,
      priorityFilter,
      mode,
      selectedCategory
    )
  }, [globalFilters, exceptionKey, priorityFilter, mode, selectedCategory])

  const iconMap = {
    'Kecepatan': '🏎️',
    'Keluar Rute': '📍',
    'Berhenti': '🅿️'
  }

  const titleMap = {
    'Kecepatan': 'Kecepatan >50 km/jam',
    'Keluar Rute': 'Keluar Rute',
    'Berhenti': 'Berhenti >30 menit'
  }

  const colorTheme = {
    'Kecepatan': { text: '#e11d48', bg: '#ffe4e6', border: '#f43f5e' },
    'Keluar Rute': { text: '#7c3aed', bg: '#f3e8ff', border: '#a855f7' },
    'Berhenti': { text: '#0284c7', bg: '#e0f2fe', border: '#38bdf8' }
  }[exceptionKey]

  // Indonesian percentage formatter (no trailing zeros, max 1 decimal place)
  const formatIndonesianPct = (val: number) => {
    const s = val.toFixed(1).replace('.', ',')
    return s.endsWith(',0') ? `${Math.round(val)}%` : `${s}%`
  }

  // Donut Arc Calculations
  const donutCenter = 110
  const outerR = 80
  const innerR = 50

  let currentAngle = 0
  const arcPaths = result.donutSegments.map(seg => {
    const sliceAngle = (seg.percentage / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + sliceAngle
    const midAngle = startAngle + sliceAngle / 2
    currentAngle = endAngle

    // Convert angle in degrees to radians (start from top = -90deg)
    const startRad = ((startAngle - 90) * Math.PI) / 180
    const endRad = ((endAngle - 90) * Math.PI) / 180
    const midRad = ((midAngle - 90) * Math.PI) / 180

    const x1_out = donutCenter + outerR * Math.cos(startRad)
    const y1_out = donutCenter + outerR * Math.sin(startRad)
    const x2_out = donutCenter + outerR * Math.cos(endRad)
    const y2_out = donutCenter + outerR * Math.sin(endRad)

    const x1_in = donutCenter + innerR * Math.cos(endRad)
    const y1_in = donutCenter + innerR * Math.sin(endRad)
    const x2_in = donutCenter + innerR * Math.cos(startRad)
    const y2_in = donutCenter + innerR * Math.sin(startRad)

    const largeArc = sliceAngle > 180 ? 1 : 0

    const pathData = [
      `M ${x1_out} ${y1_out}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2_out} ${y2_out}`,
      `L ${x1_in} ${y1_in}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x2_in} ${y2_in}`,
      'Z'
    ].join(' ')

    // Text label coordinates
    let textR = (outerR + innerR) / 2
    let isOutsideLabel = false
    if (seg.percentage < 7.5 && seg.percentage >= 3.5) {
      textR = outerR + 15
      isOutsideLabel = true
    }

    const labelX = donutCenter + textR * Math.cos(midRad)
    const labelY = donutCenter + textR * Math.sin(midRad)

    return {
      seg,
      pathData,
      midRad,
      labelX,
      labelY,
      isOutsideLabel,
      showLabel: seg.percentage >= 3.5
    }
  })

  // Currently hovered item data for tooltip
  const hoveredItem = useMemo(() => {
    if (!hoveredCategory) return null
    const seg = result.donutSegments.find(s => s.id === hoveredCategory)
    if (seg) return seg
    const row = result.rows.find(r => r.id === hoveredCategory)
    if (row) {
      return {
        id: row.id,
        label: row.label,
        color: row.color,
        count: row.totalEvents,
        percentage: row.percentage,
        metricFormatted: row.metricFormatted,
        s1Count: row.s1Count,
        s2Count: row.s2Count,
        s3Count: row.s3Count,
        supportingImpactText: row.supportingImpactText
      }
    }
    return null
  }, [hoveredCategory, result])

  // Filter summary table rows based on search
  const visibleTableRows = useMemo(() => {
    if (!searchQuery.trim()) return result.rows
    const q = searchQuery.toLowerCase()
    return result.rows.filter(r => r.label.toLowerCase().includes(q) || (r.subLabel && r.subLabel.toLowerCase().includes(q)))
  }, [result.rows, searchQuery])

  // Context scope display text
  const scopeText = globalFilters.estate !== 'ALL'
    ? `Estate ${globalFilters.estate}`
    : globalFilters.region !== 'ALL'
    ? `Region ${globalFilters.region}`
    : globalFilters.psm !== 'ALL'
    ? `PSM ${globalFilters.psm}`
    : 'Semua Scope'

  return (
    <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem', position: 'relative' }}>
      {/* Container Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: colorTheme.text, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{iconMap[exceptionKey]}</span> {titleMap[exceptionKey]}
          </h3>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
            Scope: <strong>{scopeText}</strong> · Periode: <strong>{globalFilters.startDate} s/d {globalFilters.endDate}</strong> · Prioritas: <strong style={{ color: '#0f172a' }}>{priorityFilter === 'ALL' ? 'Normal + Urgent' : priorityFilter}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {/* Exact Mode Toggle: Alasan | Perbandingan */}
          <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.2rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
            <button
              type="button"
              onClick={() => handleModeChange('Alasan')}
              style={{
                padding: '0.35rem 0.8rem',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: mode === 'Alasan' ? '#ffffff' : 'transparent',
                color: mode === 'Alasan' ? '#0f172a' : '#64748b',
                boxShadow: mode === 'Alasan' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Alasan
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('Perbandingan')}
              style={{
                padding: '0.35rem 0.8rem',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: mode === 'Perbandingan' ? '#ffffff' : 'transparent',
                color: mode === 'Perbandingan' ? '#0f172a' : '#64748b',
                boxShadow: mode === 'Perbandingan' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Perbandingan
            </button>
          </div>

          <button
            type="button"
            onClick={onBack}
            style={{ padding: '0.35rem 0.75rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
          >
            ← Kembali ke Ringkasan
          </button>
        </div>
      </div>

      {/* Floating Hover Tooltip overlay */}
      {hoveredItem && (
        <div
          style={{
            position: 'fixed',
            left: Math.min((tooltipPos?.x || 0) + 12, (typeof window !== 'undefined' ? window.innerWidth : 1000) - 270),
            top: Math.max(10, (tooltipPos?.y || 0) - 85),
            background: '#0f172a',
            color: '#ffffff',
            padding: '0.6rem 0.85rem',
            borderRadius: '6px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.4), 0 8px 10px -6px rgba(0,0,0,0.3)',
            pointerEvents: 'none',
            zIndex: 9999,
            fontSize: '0.75rem',
            minWidth: '220px',
            maxWidth: '280px',
            border: '1px solid #334155'
          }}
        >
          <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#f8fafc', marginBottom: '0.25rem', borderBottom: '1px solid #334155', paddingBottom: '0.25rem', wordBreak: 'break-word' }}>
            {hoveredItem.label}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#38bdf8', marginBottom: '0.25rem' }}>
            <span>{hoveredItem.count} kejadian</span>
            <span>{formatIndonesianPct(hoveredItem.percentage)}</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
            Shift breakdown: <strong>S1: {hoveredItem.s1Count}</strong> · <strong>S2: {hoveredItem.s2Count}</strong> · <strong>S3: {hoveredItem.s3Count}</strong>
          </div>
          {hoveredItem.supportingImpactText && (
            <div style={{ fontSize: '0.7rem', color: '#cbd5e1', fontStyle: 'italic', borderTop: '1px solid #334155', paddingTop: '0.25rem', marginTop: '0.25rem' }}>
              Dampak: {hoveredItem.supportingImpactText}
            </div>
          )}
        </div>
      )}

      {/* Main 2-Column Desktop Grid Layout (~65% Summary Table + ~35% Donut Chart) */}
      <div style={{ display: 'grid', gridTemplateColumns: '65fr 35fr', gap: '1.25rem', marginBottom: '1.5rem', alignItems: 'start' }}>
        
        {/* LEFT PANEL (~65%): SUMMARY TABLE AS LEGEND */}
        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
              Tabel Breakdown Kejadian ({mode === 'Alasan' ? 'Kategori Alasan' : result.firstColumnLabel})
            </div>
            {selectedCategory && (
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                style={{ fontSize: '0.725rem', padding: '0.15rem 0.45rem', background: '#e2e8f0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
              >
                ✕ Reset Filter Kategori ({selectedCategory})
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: '0.65rem' }}>
            <input
              type="text"
              placeholder={`Cari ${result.firstColumnLabel.toLowerCase()}...`}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '0.35rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.775rem' }}
            />
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: '#e2e8f0', textTransform: 'uppercase', fontSize: '0.7rem', color: '#475569' }}>
                  <th style={{ padding: '0.55rem 0.65rem', textAlign: 'left' }}>
                    {result.firstColumnLabel}
                  </th>
                  <th style={{ padding: '0.55rem 0.5rem', textAlign: 'right' }} title="Jumlah kejadian Shift 1 (06:00 - 14:00)">S1</th>
                  <th style={{ padding: '0.55rem 0.5rem', textAlign: 'right' }} title="Jumlah kejadian Shift 2 (14:00 - 22:00)">S2</th>
                  <th style={{ padding: '0.55rem 0.5rem', textAlign: 'right' }} title="Jumlah kejadian Shift 3 (22:00 - 06:00)">S3</th>
                  <th style={{ padding: '0.55rem 0.65rem', textAlign: 'right' }} title="Total kejadian">Total</th>
                  <th style={{ padding: '0.55rem 0.65rem', textAlign: 'right' }} title="Kontribusi terhadap seluruh kejadian pada filter aktif">%</th>
                </tr>
              </thead>
              <tbody>
                {visibleTableRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>
                      Tidak ada kejadian yang memenuhi filter.
                    </td>
                  </tr>
                ) : (
                  visibleTableRows.map(row => {
                    const isSelected = selectedCategory === row.id
                    const isHovered = hoveredCategory === row.id

                    return (
                      <tr
                        key={row.id}
                        onMouseEnter={(e) => {
                          setHoveredCategory(row.id)
                          setTooltipPos({ x: e.clientX, y: e.clientY })
                        }}
                        onMouseMove={(e) => {
                          setTooltipPos({ x: e.clientX, y: e.clientY })
                        }}
                        onMouseLeave={() => {
                          setHoveredCategory(null)
                          setTooltipPos(null)
                        }}
                        onClick={() => {
                          if (isSelected) setSelectedCategory(null)
                          else setSelectedCategory(row.id)
                          setEventPage(1)
                        }}
                        style={{
                          borderBottom: '1px solid #e2e8f0',
                          cursor: 'pointer',
                          background: isSelected ? '#ffedd5' : (isHovered ? '#f1f5f9' : 'transparent'),
                          fontWeight: isSelected ? 700 : 400
                        }}
                      >
                        <td style={{ padding: '0.55rem 0.65rem', color: '#0f172a' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: row.color, display: 'inline-block', flexShrink: 0 }} />
                            <span>{row.label}</span>
                            {isSelected && <span style={{ fontSize: '0.65rem', color: '#ea580c', fontWeight: 700 }}>(Aktif)</span>}
                          </div>
                          {row.subLabel && <div style={{ fontSize: '0.675rem', color: '#64748b', paddingLeft: '1.1rem' }}>{row.subLabel}</div>}
                        </td>
                        <td style={{ padding: '0.55rem 0.5rem', textAlign: 'right', color: row.s1Count > 0 ? '#0f172a' : '#94a3b8' }}>{row.s1Count}</td>
                        <td style={{ padding: '0.55rem 0.5rem', textAlign: 'right', color: row.s2Count > 0 ? '#0f172a' : '#94a3b8' }}>{row.s2Count}</td>
                        <td style={{ padding: '0.55rem 0.5rem', textAlign: 'right', color: row.s3Count > 0 ? '#0f172a' : '#94a3b8' }}>{row.s3Count}</td>
                        <td style={{ padding: '0.55rem 0.65rem', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{row.totalEvents}</td>
                        <td style={{ padding: '0.55rem 0.65rem', textAlign: 'right', fontWeight: 700, color: colorTheme.text }}>
                          {formatIndonesianPct(row.percentage)}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
              <tfoot>
                <tr style={{ background: '#f1f5f9', fontWeight: 800, borderTop: '2px solid #cbd5e1', fontSize: '0.8rem' }}>
                  <td style={{ padding: '0.6rem 0.65rem', color: '#0f172a' }}>Total Agregat</td>
                  <td style={{ padding: '0.6rem 0.5rem', textAlign: 'right' }}>{result.aggregateTotalRow.s1Count}</td>
                  <td style={{ padding: '0.6rem 0.5rem', textAlign: 'right' }}>{result.aggregateTotalRow.s2Count}</td>
                  <td style={{ padding: '0.6rem 0.5rem', textAlign: 'right' }}>{result.aggregateTotalRow.s3Count}</td>
                  <td style={{ padding: '0.6rem 0.65rem', textAlign: 'right', color: '#0f172a' }}>{result.aggregateTotalRow.totalEvents}</td>
                  <td style={{ padding: '0.6rem 0.65rem', textAlign: 'right', color: colorTheme.text }}>
                    {formatIndonesianPct(result.aggregateTotalRow.percentage)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* RIGHT PANEL (~35%): SVG DONUT CHART WITH SEGMENT PERCENTAGES & CENTER EVENT COUNT */}
        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '280px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem', textAlign: 'center' }}>
            Proporsi Kejadian ({mode})
          </div>

          {result.totalEventsInScope === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>
              Tidak ada kejadian untuk ditampilkan pada donut chart.
            </div>
          ) : (
            <div style={{ position: 'relative', width: '220px', height: '220px' }}>
              <svg width="220" height="220" viewBox="0 0 220 220">
                {arcPaths.map(({ seg, pathData, labelX, labelY, isOutsideLabel, showLabel }) => {
                  const isSelected = selectedCategory === seg.id
                  const isHovered = hoveredCategory === seg.id

                  return (
                    <g key={seg.id}>
                      <path
                        d={pathData}
                        fill={seg.color}
                        opacity={isSelected || isHovered ? 1 : (selectedCategory ? 0.45 : 0.95)}
                        stroke="#ffffff"
                        strokeWidth={isSelected ? '2.5' : '1.5'}
                        onMouseEnter={(e) => {
                          setHoveredCategory(seg.id)
                          setTooltipPos({ x: e.clientX, y: e.clientY })
                        }}
                        onMouseMove={(e) => {
                          setTooltipPos({ x: e.clientX, y: e.clientY })
                        }}
                        onMouseLeave={() => {
                          setHoveredCategory(null)
                          setTooltipPos(null)
                        }}
                        onClick={() => {
                          if (isSelected) setSelectedCategory(null)
                          else setSelectedCategory(seg.id)
                          setEventPage(1)
                        }}
                        style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                      />
                      {showLabel && (
                        <text
                          x={labelX}
                          y={labelY}
                          fill={isOutsideLabel ? '#334155' : '#ffffff'}
                          fontSize={isOutsideLabel ? '9px' : '10.5px'}
                          fontWeight="800"
                          textAnchor="middle"
                          dominantBaseline="central"
                          pointerEvents="none"
                          style={{
                            textShadow: isOutsideLabel ? 'none' : '0 1px 2px rgba(0,0,0,0.7)',
                            userSelect: 'none'
                          }}
                        >
                          {formatIndonesianPct(seg.percentage)}
                        </text>
                      )}
                    </g>
                  )
                })}
              </svg>

              {/* Donut Center Text: Event Count */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                  {result.totalEventsInScope}
                </div>
                <div style={{ fontSize: '0.725rem', fontWeight: 600, color: '#64748b', marginTop: '2px' }}>
                  kejadian
                </div>
              </div>
            </div>
          )}

          <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.75rem', textAlign: 'center' }}>
            Total Dampak: <strong>{result.totalMetricFormatted}</strong> ({result.metricLabel})
          </div>
        </div>
      </div>

      {/* LOWER PANEL: EVENT DETAIL TABLE (1 Row Per Matching Event) */}
      <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
            Detail Kejadian · {selectedCategory ? selectedCategory : `Semua ${mode === 'Alasan' ? 'Alasan' : result.firstColumnLabel}`} ({result.eventRows.length} Kejadian)
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {selectedCategory && (
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                style={{ padding: '0.25rem 0.55rem', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.725rem', cursor: 'pointer', fontWeight: 600 }}
              >
                🔄 Tampilkan Semua ({result.eventRows.length})
              </button>
            )}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: '#e2e8f0', textTransform: 'uppercase', fontSize: '0.7rem', color: '#475569' }}>
                <th style={{ padding: '0.55rem 0.6rem', textAlign: 'left' }}>Tanggal</th>
                <th style={{ padding: '0.55rem 0.6rem', textAlign: 'left' }}>Kendaraan</th>
                <th style={{ padding: '0.55rem 0.6rem', textAlign: 'center' }}>Prioritas</th>
                <th style={{ padding: '0.55rem 0.6rem', textAlign: 'center' }}>Kejadian</th>
                <th style={{ padding: '0.55rem 0.6rem', textAlign: 'center' }}>Mulai</th>
                <th style={{ padding: '0.55rem 0.6rem', textAlign: 'right' }}>Durasi</th>
                <th style={{ padding: '0.55rem 0.6rem', textAlign: 'center' }} title="Shift saat kejadian dimulai">Shift</th>
                {exceptionKey === 'Kecepatan' && <th style={{ padding: '0.55rem 0.6rem', textAlign: 'right' }}>Jarak</th>}
                {exceptionKey === 'Keluar Rute' && <th style={{ padding: '0.55rem 0.6rem', textAlign: 'right' }}>Jarak Keluar</th>}
                {exceptionKey === 'Berhenti' && <th style={{ padding: '0.55rem 0.6rem', textAlign: 'left' }}>Lokasi</th>}
                <th style={{ padding: '0.55rem 0.6rem', textAlign: 'center' }}>Detail</th>
              </tr>
            </thead>
            <tbody>
              {result.eventRows.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>
                    Tidak ada kejadian yang sesuai dengan filter ini.
                  </td>
                </tr>
              ) : (
                result.eventRows.slice((eventPage - 1) * 10, eventPage * 10).map(row => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #cbd5e1' }}>
                    <td style={{ padding: '0.55rem 0.6rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{row.date}</td>
                    <td style={{ padding: '0.55rem 0.6rem' }}>
                      {renderVehicleNopolCell(
                        row.nopol,
                        MOCK_VEHICLES.find(v => v.id === row.vehicleId)?.vehicleType === 'Car' ? 'Mobil' : 'Motor'
                      )}
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{row.estateName}</div>
                    </td>
                    <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center' }}>
                      <span style={{
                        padding: '0.15rem 0.4rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        background: row.reportPriority === 'Urgent' ? '#ffedd5' : '#dbeafe',
                        color: row.reportPriority === 'Urgent' ? '#c2410c' : '#1e40af'
                      }}>
                        {row.reportPriority}
                      </span>
                    </td>
                    <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center', fontWeight: 700, color: colorTheme.text }}>
                      {row.eventIndexLabel}
                    </td>
                    <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center', fontFamily: 'monospace', fontSize: '0.775rem' }}>
                      {row.startTime}
                    </td>
                    <td style={{ padding: '0.55rem 0.6rem', textAlign: 'right', fontWeight: 600 }}>
                      {row.durationFormatted}
                    </td>
                    <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center' }}>
                      <span style={{ padding: '0.15rem 0.4rem', background: '#e2e8f0', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }} title="Attributed to starting shift">
                        {row.rawRecord.shift || 'Shift 1'}
                      </span>
                    </td>
                    {exceptionKey === 'Kecepatan' && (
                      <td style={{ padding: '0.55rem 0.6rem', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                        {row.distanceFormatted}
                      </td>
                    )}
                    {exceptionKey === 'Keluar Rute' && (
                      <td style={{ padding: '0.55rem 0.6rem', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                        {row.distanceFormatted}
                      </td>
                    )}
                    {exceptionKey === 'Berhenti' && (
                      <td style={{ padding: '0.55rem 0.6rem', textAlign: 'left', fontWeight: 600, color: '#334155' }}>
                        {row.rawRecord.locationBlock || '—'}
                      </td>
                    )}
                    <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => onOpenExceptionModal(row.rawRecord)}
                        title="Lihat Detail Kejadian"
                        style={{ padding: '0.25rem 0.45rem', background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        🔍
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Detail Table Pagination */}
        {result.eventRows.length > 10 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.65rem', fontSize: '0.75rem', color: '#64748b' }}>
            <div>Halaman {eventPage} dari {Math.ceil(result.eventRows.length / 10)} ({result.eventRows.length} total kejadian)</div>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <button
                type="button"
                disabled={eventPage === 1}
                onClick={() => setEventPage(p => Math.max(1, p - 1))}
                style={{ padding: '0.2rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', cursor: eventPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                Sebelumnya
              </button>
              <button
                type="button"
                disabled={eventPage * 10 >= result.eventRows.length}
                onClick={() => setEventPage(p => p + 1)}
                style={{ padding: '0.2rem 0.45rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', cursor: eventPage * 10 >= result.eventRows.length ? 'not-allowed' : 'pointer' }}
              >
                Berikutnya
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ==========================================================================
   TABLE HELPER RENDERERS
   ========================================================================== */
function renderCommentManagerCell(row: DailyReportViewItem) {
  if (row.submissionStatus !== 'Sudah Dikirim') {
    return <span style={{ color: '#94a3b8' }}>—</span>
  }
  if (!row.managerComment || row.managerComment.trim() === '') {
    return <span style={{ color: '#64748b', fontStyle: 'italic', fontWeight: 500 }}>Pending</span>
  }
  const words = row.managerComment.trim().split(/\s+/)
  const preview = words.length > 4 ? words.slice(0, 4).join(' ') + '…' : row.managerComment
  return (
    <span title={row.managerComment} style={{ cursor: 'help' }}>
      {preview}
    </span>
  )
}

function renderVehicleNopolCell(nopol: string, vehicleType?: string) {
  const icon = vehicleType === 'Motor' ? '🏍️' : '🚗'
  const typeLabel = vehicleType === 'Motor' ? 'Motor Patroli' : 'Mobil Patroli'
  return (
    <span title={typeLabel} style={{ fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>
      {icon} {nopol}
    </span>
  )
}

/* ==========================================================================
   COMPONENT 3: BELUM DIKIRIM DEDICATED TABLE VIEW
   ========================================================================== */
function BelumDikirimView({
  filteredDailyTableRows,
  effectiveDateRangeLabel,
  onBack,
  onOpenReportModal
}: {
  filteredDailyTableRows: DailyReportViewItem[]
  effectiveDateRangeLabel: string
  onBack: () => void
  onOpenReportModal: (r: PatrolReportRecord) => void
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredDailyTableRows.slice(start, start + pageSize)
  }, [filteredDailyTableRows, currentPage])

  const totalPages = Math.ceil(filteredDailyTableRows.length / pageSize) || 1

  return (
    <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#991b1b' }}>
            📋 Laporan Belum Dikirim ({filteredDailyTableRows.length} Laporan)
          </h3>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
            Periode Efektif: <strong>{effectiveDateRangeLabel}</strong>
          </div>
        </div>

        <button
          type="button"
          onClick={onBack}
          style={{ padding: '0.35rem 0.75rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
        >
          ← Kembali ke Ringkasan
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', textTransform: 'uppercase', fontSize: '0.725rem', color: '#475569' }}>
              <th style={{ padding: '0.65rem', textAlign: 'left' }}>Tanggal</th>
              <th style={{ padding: '0.65rem', textAlign: 'left' }}>Estate</th>
              <th style={{ padding: '0.65rem', textAlign: 'left' }}>Nopol</th>
              <th style={{ padding: '0.65rem', textAlign: 'center' }}>Pelacakan</th>
              <th style={{ padding: '0.65rem', textAlign: 'center' }}>Pengiriman</th>
              <th style={{ padding: '0.65rem', textAlign: 'left' }}>Comment Manager</th>
              <th style={{ padding: '0.65rem', textAlign: 'center' }}>Detail</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                  Tidak ada laporan Belum Dikirim pada periode dan scope ini.
                </td>
              </tr>
            ) : (
              paginatedRows.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.65rem', fontWeight: 600 }}>{row.date}</td>
                  <td style={{ padding: '0.65rem' }}>{row.estateId}</td>
                  <td style={{ padding: '0.65rem' }}>
                    {renderVehicleNopolCell(row.nopol, row.vehicleType)}
                  </td>
                  <td style={{ padding: '0.65rem', textAlign: 'center' }}>
                    <span style={{
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      background: row.trackingStatus === 'Tersedia' ? '#dcfce7' : '#f1f5f9',
                      color: row.trackingStatus === 'Tersedia' ? '#15803d' : '#64748b',
                      border: row.trackingStatus === 'Tersedia' ? '1px solid #86efac' : '1px solid #cbd5e1'
                    }}>
                      {row.trackingStatus === 'Tersedia' ? 'Tersedia' : 'Tidak Tersedia'}
                    </span>
                  </td>
                  <td style={{ padding: '0.65rem', textAlign: 'center' }}>
                    <span style={{
                      padding: '0.2rem 0.55rem',
                      borderRadius: '12px',
                      fontSize: '0.725rem',
                      fontWeight: 700,
                      background: '#fee2e2',
                      color: '#991b1b'
                    }}>
                      Belum Dikirim
                    </span>
                  </td>
                  <td style={{ padding: '0.65rem' }}>
                    {renderCommentManagerCell(row)}
                  </td>
                  <td style={{ padding: '0.65rem', textAlign: 'center' }}>
                    {row.rawRecord ? (
                      <button
                        type="button"
                        onClick={() => onOpenReportModal(row.rawRecord!)}
                        title="Lihat Detail Laporan"
                        style={{ padding: '0.25rem 0.45rem', background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        🔍
                      </button>
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
        <div>Menampilkan <strong>{paginatedRows.length}</strong> dari <strong>{filteredDailyTableRows.length}</strong> total baris</div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            style={{ padding: '0.3rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
          >
            Previous
          </button>
          <span style={{ padding: '0.3rem 0.6rem', fontWeight: 600 }}>{currentPage} / {totalPages}</span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            style={{ padding: '0.3rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ReportsPage() {
  const [filterState, setFilterState] = useState<HierarchyFilterState>({
    psm: 'PSM A',
    region: 'Region A',
    estate: 'Estate B',
    year: '2026',
    month: 'May',
  })

  // Date Range Filter State specifically for Analisis Patroli
  const [datePreset, setDatePreset] = useState<'Bulan Ini' | 'Bulan Lalu' | '30 Hari Terakhir' | 'Rentang Kustom'>('Bulan Ini')
  const [customStartDate, setCustomStartDate] = useState('2026-05-01')
  const [customEndDate, setCustomEndDate] = useState('2026-05-31')

  const effectiveDateRange = useMemo(() => {
    if (datePreset === 'Bulan Ini') return { start: '2026-05-01', end: '2026-05-31', label: '01 Mei–31 Mei 2026' }
    if (datePreset === 'Bulan Lalu') return { start: '2026-04-01', end: '2026-04-30', label: '01 Apr–30 Apr 2026' }
    if (datePreset === '30 Hari Terakhir') return { start: '2026-05-02', end: '2026-05-31', label: '02 Mei–31 Mei 2026' }
    return {
      start: customStartDate || '2026-05-01',
      end: customEndDate || '2026-05-31',
      label: formatCustomDateRangeLabel(customStartDate, customEndDate)
    }
  }, [datePreset, customStartDate, customEndDate])

  // Global Filter State
  const globalFilters: GlobalFilterState = useMemo(() => ({
    psm: filterState.psm,
    region: filterState.region,
    estate: filterState.estate,
    year: effectiveDateRange.start.substring(0, 4),
    month: effectiveDateRange.start.substring(5, 7),
    startDate: effectiveDateRange.start,
    endDate: effectiveDateRange.end
  }), [filterState, effectiveDateRange])

  const routeKpis = useMemo(() => selectRouteEffectivenessKpis(globalFilters), [globalFilters])

  // Redesigned 5-Card Main Navigation State: 'laporan' | 'normal_rusak' | 'exceptions' | 'coverage' | 'route'
  const [activeMainCard, setActiveMainCard] = useState<'laporan' | 'normal_rusak' | 'exceptions' | 'coverage' | 'route'>('laporan')
  const [activeExceptionSub, setActiveExceptionSub] = useState<'Kecepatan' | 'Keluar Rute' | 'Berhenti'>('Kecepatan')
  const [activeCoverageSubTab, setActiveCoverageSubTab] = useState<'Aktivitas' | 'Cakupan'>('Aktivitas')
  const [activeNormalRusakSub, setActiveNormalRusakSub] = useState<'ALL' | 'NORMAL' | 'UNIT_RUSAK' | 'GPS_RUSAK'>('ALL')

  // Persistent Priority Filter State: 'ALL' | 'Normal' | 'Urgent'
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | 'Normal' | 'Urgent'>('ALL')

  // Selected Summary / Detail Key State
  const [selectedSummaryKey, setSelectedSummaryKey] = useState<
    'Sudah Dikirim' | 'Belum Dikirim' | 'Normal' | 'Urgent' | 'Unit Rusak' | 'GPS Rusak' | 'Kecepatan' | 'Keluar Rute' | 'Berhenti'
  >('Sudah Dikirim')

  const [blockCategoryTab, setBlockCategoryTab] = useState<'rawan' | 'non_rawan'>('rawan')
  const [activeReportModal, setActiveReportModal] = useState<PatrolReportRecord | null>(null)
  const [activeExceptionModal, setActiveExceptionModal] = useState<ExceptionEventRecord | null>(null)

  // Chart & Table Independent Controls
  const [chartViewMode, setChartViewMode] = useState<'Perbandingan' | 'Tren 6 Bulan'>('Tren 6 Bulan')
  const [chartMeasureMode, setChartMeasureMode] = useState<'Persentase (%)' | 'Jumlah Laporan'>('Persentase (%)')

  // Table View Control (Ringkasan vs Laporan Harian)
  const [tableViewMode, setTableViewMode] = useState<'Ringkasan' | 'Laporan Harian'>('Ringkasan')

  // Category filter inside daily report detail view
  const [reportCategoryFilter, setReportCategoryFilter] = useState<'ALL' | 'Normal' | 'Urgent' | 'Unit Rusak' | 'GPS Rusak'>('ALL')

  // Drilldown state
  const [drilldownState, setDrilldownState] = useState<{ categoryKey: string; label: string } | null>(null)

  // Daily Table filters & pagination
  const [tableSearchText, setTableSearchText] = useState('')
  const [tableStatusFilter, setTableStatusFilter] = useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Speeding detail interactive state
  const [speedingReasonFilter, setSpeedingReasonFilter] = useState<string | null>(null)
  const [speedingReasonSearch, setSpeedingReasonSearch] = useState('')
  const [speedingReasonSortCol, setSpeedingReasonSortCol] = useState<'reason' | 'eventCount' | 'percentage'>('eventCount')
  const [speedingReasonSortAsc, setSpeedingReasonSortAsc] = useState(false)
  const [speedingChartMode, setSpeedingChartMode] = useState<'Alasan' | 'Tren' | 'Perbandingan'>('Alasan')
  const [speedingTrendMetric, setSpeedingTrendMetric] = useState<'Kejadian' | 'Durasi'>('Kejadian')
  const [speedingCompareMetric, setSpeedingCompareMetric] = useState<'Kejadian' | '% Laporan'>('Kejadian')
  const [speedingTrendGranularity, setSpeedingTrendGranularity] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily')
  const [speedingDailyPage, setSpeedingDailyPage] = useState(1)
  const handleCardClick = (cardKey: 'laporan' | 'normal_rusak' | 'exceptions' | 'coverage' | 'route') => {
    setActiveMainCard(cardKey)
    if (cardKey === 'laporan') {
      setSelectedSummaryKey('Sudah Dikirim')
    } else if (cardKey === 'exceptions') {
      setSelectedSummaryKey(activeExceptionSub)
    }
  }

  const handleExceptionSubClick = (subKey: 'Kecepatan' | 'Keluar Rute' | 'Berhenti') => {
    setActiveMainCard('exceptions')
    setActiveExceptionSub(subKey)
    setSelectedSummaryKey(subKey)
  }
  // Reset local state when global hierarchy or period changes
  useEffect(() => {
    if (globalFilters.estate !== 'ALL') {
      setChartViewMode('Tren 6 Bulan')
    } else {
      setChartViewMode('Perbandingan')
    }
    setDrilldownState(null)
    setSpeedingReasonFilter(null)
    setReportCategoryFilter('ALL')
    setCurrentPage(1)
    setSpeedingDailyPage(1)
  }, [globalFilters.psm, globalFilters.region, globalFilters.estate, effectiveDateRange])

  // Selector Calculations
  const reportsKpis = useMemo(() => selectReportsKpis(globalFilters, priorityFilter), [globalFilters, priorityFilter])
  const coverageMetrics = useMemo(() => selectComprehensiveCoverage(globalFilters), [globalFilters])
  const speedReasons = useMemo(() => selectReasonBreakdown(globalFilters, 'Overspeed', priorityFilter), [globalFilters, priorityFilter])
  const outRouteReasons = useMemo(() => selectReasonBreakdown(globalFilters, 'Out of Route', priorityFilter), [globalFilters, priorityFilter])
  const parkingReasons = useMemo(() => selectReasonBreakdown(globalFilters, 'Overparking', priorityFilter), [globalFilters, priorityFilter])

  const allExceptions = useMemo(() => getFilteredExceptions(globalFilters), [globalFilters])

  const blockMetrics = useMemo(() => selectBlockCoverageMetrics(globalFilters, blockCategoryTab === 'rawan'), [globalFilters, blockCategoryTab])
  const filteredRuns = useMemo(() => getFilteredPatrolRuns(globalFilters), [globalFilters])

  // Speeding Details Selector
  const speedingData = useMemo(() => {
    return selectSpeedingDetails(
      globalFilters,
      priorityFilter,
      speedingReasonFilter,
      speedingTrendGranularity
    )
  }, [globalFilters, priorityFilter, speedingReasonFilter, speedingTrendGranularity])

  // Comprehensive Laporan Chart & Table Selector
  const laporanData = useMemo(() => {
    return selectLaporanChartAndTable(globalFilters, chartViewMode, chartMeasureMode, drilldownState)
  }, [globalFilters, chartViewMode, chartMeasureMode, drilldownState])

  // User Role state for Normal / Rusak card & escalation tracking
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('Manager')

  // Calculated indicator counts for Normal / Rusak card
  const allDamageIncidentsForCard = useMemo(() => {
    return buildAllDamageIncidents(globalFilters, currentUserRole, effectiveDateRange.end || '2026-05-31')
  }, [globalFilters, currentUserRole, effectiveDateRange.end])

  const urgentPendingCardCount = useMemo(() => {
    return laporanData.laporanHarianRows.filter(r => {
      if (r.reportType !== 'Urgent') return false
      const raw = r.rawRecord
      if (currentUserRole === 'Manager') return !r.managerComment || r.managerStatus !== 'Approved'
      if (currentUserRole === 'Admin') return !r.managerComment || !(raw && raw.picComment)
      return !(raw && raw.picComment) || r.picStatus === 'Pending PIC Comment'
    }).length
  }, [laporanData.laporanHarianRows, currentUserRole])

  const damagePendingActionCardCount = useMemo(() => {
    return allDamageIncidentsForCard.filter(i => i.status === 'Belum Pulih' && i.hasPendingActionForUser).length
  }, [allDamageIncidentsForCard])

  // 6-Month Trend Breakdown Table Selector
  const trendBreakdownData = useMemo(() => {
    return selectTrendBreakdownTable(globalFilters)
  }, [globalFilters])

  // Table pagination state for Perbandingan & Tren 6 Bulan tables
  const [perbandinganTablePage, setPerbandinganTablePage] = useState(1)
  const [trendTablePage, setTrendTablePage] = useState(1)

  const paginatedCategories = useMemo(() => {
    const startIndex = (perbandinganTablePage - 1) * 10
    return laporanData.categories.slice(startIndex, startIndex + 10)
  }, [laporanData.categories, perbandinganTablePage])

  const paginatedTrendRows = useMemo(() => {
    const startIndex = (trendTablePage - 1) * 10
    return trendBreakdownData.rows.slice(startIndex, startIndex + 10)
  }, [trendBreakdownData.rows, trendTablePage])

  const trendMonthAggregates = useMemo(() => {
    if (trendBreakdownData.rows.length === 0) return []
    const monthCount = trendBreakdownData.headers.length
    const aggs = []
    for (let mIdx = 0; mIdx < monthCount; mIdx++) {
      let totTarget = 0
      let totActual = 0
      trendBreakdownData.rows.forEach(r => {
        if (r.months[mIdx]) {
          totTarget += r.months[mIdx].targetReports
          totActual += r.months[mIdx].actualReports
        }
      })
      const pct = totTarget > 0 ? (totActual / totTarget) * 100 : null
      aggs.push({
        target: totTarget,
        actual: totActual,
        pct,
        thresholdColor: getDisiplinColor(pct)
      })
    }
    return aggs
  }, [trendBreakdownData])

  const trendOverallAggregate = useMemo(() => {
    let totTarget = 0
    let totActual = 0
    trendBreakdownData.rows.forEach(r => {
      totTarget += r.totalTarget
      totActual += r.totalActual
    })
    const pct = totTarget > 0 ? (totActual / totTarget) * 100 : null
    return {
      target: totTarget,
      actual: totActual,
      pct,
      thresholdColor: getDisiplinColor(pct)
    }
  }, [trendBreakdownData])

  // --- Interaction Handlers ---

  // Click Normal card
  const handleNormalCardClick = () => {
    if (priorityFilter === 'Normal') {
      setPriorityFilter('ALL')
      if (selectedSummaryKey === 'Normal') {
        setSelectedSummaryKey('Sudah Dikirim')
      }
    } else {
      setPriorityFilter('Normal')
      if (!['Kecepatan', 'Keluar Rute', 'Berhenti'].includes(selectedSummaryKey)) {
        setSelectedSummaryKey('Normal')
      }
    }
  }

  // Click Urgent card
  const handleUrgentCardClick = () => {
    if (priorityFilter === 'Urgent') {
      setPriorityFilter('ALL')
      if (selectedSummaryKey === 'Urgent') {
        setSelectedSummaryKey('Sudah Dikirim')
      }
    } else {
      setPriorityFilter('Urgent')
      if (!['Kecepatan', 'Keluar Rute', 'Berhenti'].includes(selectedSummaryKey)) {
        setSelectedSummaryKey('Urgent')
      }
    }
  }

  // Click Exception Card (Kecepatan, Keluar Rute, Berhenti) -> PRESERVES priorityFilter!
  const handleExceptionCardClick = (key: 'Kecepatan' | 'Keluar Rute' | 'Berhenti') => {
    setSelectedSummaryKey(key)
  }

  // Click Other Cards (Sudah Dikirim, Belum Dikirim, Unit Rusak, GPS Rusak)
  const handleOtherSummaryCardClick = (key: 'Sudah Dikirim' | 'Belum Dikirim' | 'Unit Rusak' | 'GPS Rusak') => {
    setSelectedSummaryKey(key)
    setPriorityFilter('ALL')
  }

  // Handle Chart View Mode Toggle
  const handleChartViewToggle = (mode: 'Perbandingan' | 'Tren 6 Bulan') => {
    setChartViewMode(mode)
    setDrilldownState(null)
    setCurrentPage(1)
  }

  // Handle Drilldown Activation
  const handleSelectDrilldown = (categoryKey: string, label: string) => {
    const contextLabel = chartViewMode === 'Perbandingan'
      ? `Detail: ${laporanData.groupingType} ${label} · ${globalFilters.month} ${globalFilters.year}`
      : `Detail: ${label} · Scope ${globalFilters.estate !== 'ALL' ? globalFilters.estate : globalFilters.region !== 'ALL' ? globalFilters.region : globalFilters.psm}`

    setDrilldownState({ categoryKey, label: contextLabel })
    setTableViewMode('Laporan Harian')
    setCurrentPage(1)
  }

  const handleResetDrilldown = () => {
    setDrilldownState(null)
    setCurrentPage(1)
  }

  // Filtered Daily Reports based on Selected Summary & Category Filter
  const filteredDailyTableRows = useMemo(() => {
    return laporanData.laporanHarianRows.filter(r => {
      if (selectedSummaryKey === 'Sudah Dikirim' && r.submissionStatus !== 'Sudah Dikirim') return false
      if (selectedSummaryKey === 'Belum Dikirim' && r.submissionStatus !== 'Belum Dikirim') return false
      if (selectedSummaryKey === 'Normal' && (r.submissionStatus !== 'Sudah Dikirim' || r.reportType !== 'Normal')) return false
      if (selectedSummaryKey === 'Urgent' && (r.submissionStatus !== 'Sudah Dikirim' || r.reportType !== 'Urgent')) return false
      if (selectedSummaryKey === 'Unit Rusak' && (r.submissionStatus !== 'Sudah Dikirim' || r.reportType !== 'Unit Rusak')) return false
      if (selectedSummaryKey === 'GPS Rusak' && (r.submissionStatus !== 'Sudah Dikirim' || r.reportType !== 'GPS Rusak')) return false

      if (reportCategoryFilter !== 'ALL' && r.reportType !== reportCategoryFilter) return false

      if (tableSearchText.trim()) {
        const query = tableSearchText.toLowerCase()
        const matchVeh = r.vehicleId.toLowerCase().includes(query) || r.nopol.toLowerCase().includes(query)
        const matchEst = r.estateId.toLowerCase().includes(query)
        const matchDate = r.date.toLowerCase().includes(query)
        const matchType = r.reportType.toLowerCase().includes(query)
        if (!matchVeh && !matchEst && !matchDate && !matchType) return false
      }

      if (tableStatusFilter !== 'ALL') {
        if (tableStatusFilter === 'Belum Dikirim' && r.submissionStatus !== 'Belum Dikirim') return false
        if (tableStatusFilter === 'Reviewed Manager' && r.managerStatus !== 'Approved') return false
        if (tableStatusFilter === 'Submitted PIC' && (r.picStatus !== 'Submitted PIC' || r.managerStatus === 'Approved')) return false
        if (tableStatusFilter === 'Pending PIC Comment' && r.picStatus !== 'Pending PIC Comment') return false
      }

      return true
    })
  }, [laporanData.laporanHarianRows, selectedSummaryKey, reportCategoryFilter, tableSearchText, tableStatusFilter])

  // Paginated Rows
  const paginatedDailyRows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredDailyTableRows.slice(startIndex, startIndex + pageSize)
  }, [filteredDailyTableRows, currentPage])

  const totalPages = Math.ceil(filteredDailyTableRows.length / pageSize) || 1

  // Exception filtered lists based on type and persistent priorityFilter
  const filteredExceptionList = useMemo(() => {
    let typeName: 'Overspeed' | 'Out of Route' | 'Overparking' = 'Overspeed'
    if (selectedSummaryKey === 'Keluar Rute') typeName = 'Out of Route'
    if (selectedSummaryKey === 'Berhenti') typeName = 'Overparking'

    return allExceptions.filter(e => {
      if (e.type !== typeName) return false
      if (priorityFilter !== 'ALL') {
        if (e.reportPriority !== priorityFilter) return false
      }
      return true
    })
  }, [allExceptions, selectedSummaryKey, priorityFilter])

  // CSV Export Handler
  const handleExportCsv = () => {
    if (['laporan', 'normal_rusak', 'exceptions'].includes(activeMainCard)) {
      if (selectedSummaryKey === 'Sudah Dikirim') {
        if (tableViewMode === 'Ringkasan') {
          if (chartViewMode === 'Tren 6 Bulan') {
            const headers = [
              trendBreakdownData.breakdownType === 'Vehicle' ? 'Kendaraan' : trendBreakdownData.breakdownType,
              ...trendBreakdownData.headers,
              'Total Periode Target',
              'Total Periode Submitted',
              'Total Periode Disiplin (%)'
            ]
            const rows = trendBreakdownData.rows.map(r => [
              r.label,
              ...r.months.map(m => m.pct !== null ? `${m.pct}% (${m.actualReports}/${m.targetReports})` : 'N/A'),
              r.totalTarget,
              r.totalActual,
              r.totalPct !== null ? `${r.totalPct}%` : 'N/A'
            ])
            const csvContent = generateCsvData(headers, rows)
            downloadFile(csvContent, `smarttrack_laporan_tren6bulan_${globalFilters.estate !== 'ALL' ? globalFilters.estate : globalFilters.region !== 'ALL' ? globalFilters.region : globalFilters.psm}.csv`)
          } else {
            const headers = [
              laporanData.groupingType === 'Vehicle' ? 'Vehicle ID / Nopol' : (laporanData.groupingType === 'Month' ? 'Bulan' : laporanData.groupingType),
              laporanData.groupingType === 'Vehicle' ? 'Hari Terhitung' : 'Jumlah Unit Kendaraan',
              'Target Laporan',
              'Submitted Laporan',
              'Selisih Laporan',
              'Disiplin Upload (%)',
              'Status Disiplin'
            ]
            const rows = laporanData.categories.map(c => [
              c.label,
              c.vehicleCount,
              c.targetReports,
              c.actualReports,
              c.shortfall,
              c.compliancePct !== null ? `${c.compliancePct}%` : 'N/A',
              c.threshold
            ])
            const csvContent = generateCsvData(headers, rows)
            downloadFile(csvContent, `smarttrack_laporan_perbandingan_${effectiveDateRange.start}_${effectiveDateRange.end}.csv`)
          }
        } else {
          const headers = ['Tanggal Patroli', 'Estate', 'Vehicle ID', 'No. Polisi', 'Status Pengiriman', 'Kategori Utama', 'Status PIC', 'Status Review Manager', 'Upload Date']
          const rows = filteredDailyTableRows.map(r => [
            r.date, r.estateId, r.vehicleId, r.nopol, r.submissionStatus, r.reportType, r.picStatus, r.managerStatus, r.uploadDate || '-'
          ])
          const csvContent = generateCsvData(headers, rows)
          downloadFile(csvContent, `smarttrack_laporan_harian_${drilldownState ? 'detail' : 'all'}_${effectiveDateRange.start}_${effectiveDateRange.end}.csv`)
        }
      } else if (selectedSummaryKey === 'Kecepatan') {
        const headers = ['Alasan', 'Kejadian', 'Persentase (%)', 'Total Durasi (Menit)']
        const rows = speedingData.reasonSummaryRows.map(r => [
          r.reason, r.eventCount, `${r.percentage.toFixed(1)}%`, r.totalDurationMinutes
        ])
        const csvContent = generateCsvData(headers, rows)
        downloadFile(csvContent, `smarttrack_speeding_reasons_${priorityFilter}_${effectiveDateRange.start}_${effectiveDateRange.end}.csv`)
      } else if (['Keluar Rute', 'Berhenti'].includes(selectedSummaryKey)) {
        const headers = ['ID Kejadian', 'Run ID', 'Tanggal', 'Estate', 'Vehicle ID', 'Shift', 'Tipe Kejadian', 'Prioritas Laporan', 'Kategori Alasan', 'Detail', 'Lokasi Blok']
        const rows = filteredExceptionList.map(e => [
          e.id, e.patrolRunId, e.date, e.estateId, e.vehicleId, e.shift, e.type, e.reportPriority || 'Normal', e.reasonCategory, e.detail, e.locationBlock
        ])
        const csvContent = generateCsvData(headers, rows)
        downloadFile(csvContent, `smarttrack_insiden_${selectedSummaryKey}_${priorityFilter}_${effectiveDateRange.start}_${effectiveDateRange.end}.csv`)
      } else {
        const headers = ['Tanggal Patroli', 'Estate', 'Vehicle ID', 'No. Polisi', 'Status Pengiriman', 'Kategori Utama', 'Status PIC', 'Status Review Manager', 'Upload Date']
        const rows = filteredDailyTableRows.map(r => [
          r.date, r.estateId, r.vehicleId, r.nopol, r.submissionStatus, r.reportType, r.picStatus, r.managerStatus, r.uploadDate || '-'
        ])
        const csvContent = generateCsvData(headers, rows)
        downloadFile(csvContent, `smarttrack_laporan_${selectedSummaryKey}_${effectiveDateRange.start}_${effectiveDateRange.end}.csv`)
      }
    } else if (activeMainCard === 'coverage') {
      const headers = ['Kode Blok', 'Estate', 'Kategori', 'Status Dikunjungi', 'Frekuensi Kunjungan', 'Geometri State']
      const rows = blockMetrics.blockRows.map(b => [
        b.blockCode, b.estateId, blockCategoryTab === 'rawan' ? 'Rawan' : 'Non-Rawan', b.isVisited ? 'Dikunjungi' : 'Belum Dikunjungi', b.actualVisits, b.hasGeometry ? 'Valid' : 'Belum Ada'
      ])
      const csvContent = generateCsvData(headers, rows)
      downloadFile(csvContent, `smarttrack_cakupan_blok_${blockCategoryTab}_${globalFilters.estate}.csv`)
    } else {
      const headers = ['Run ID', 'Tanggal', 'Estate', 'Vehicle ID', 'Shift', 'Actual KM', 'Baseline KM', 'In-Route KM', 'Out-of-Route KM']
      const rows = filteredRuns.map(r => [
        r.id, r.date, r.estateId, r.vehicleId, r.shift ?? '', r.actualDistanceKm ?? 0, r.targetDistanceKm ?? 0, r.inRouteKm ?? 0, r.outOfRouteKm ?? 0
      ])
      const csvContent = generateCsvData(headers, rows)
      downloadFile(csvContent, `smarttrack_efektivitas_rute_${globalFilters.estate}.csv`)
    }
  }

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <PageShell
      title="Analisis Laporan Patroli"
      subtitle="monitoring kepatuhan laporan patroli"
      topbarExtra={
        <HierarchyFilterBar
          filterState={filterState}
          onChange={setFilterState}
          useCompactPeriodDropdown={true}
          datePreset={datePreset}
          customStartDate={customStartDate}
          customEndDate={customEndDate}
          onPeriodChange={(preset, customStart, customEnd) => {
            setDatePreset(preset)
            if (customStart) setCustomStartDate(customStart)
            if (customEnd) setCustomEndDate(customEnd)
            setCurrentPage(1)
            setSpeedingDailyPage(1)
          }}
        />
      }
    >
      {/* Global & Card Component Styling */}
      <style jsx global>{`
        .data-table th {
          text-align: center !important;
          vertical-align: middle !important;
        }

        .five-cards-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1.35fr 1fr 1.15fr;
          gap: 0.85rem;
          margin-bottom: 1.5rem;
          align-items: stretch;
        }

        @media (max-width: 1100px) {
          .five-cards-container {
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          }
        }

        .kpi-card {
          background: #ffffff;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          padding: 0.85rem 0.95rem;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 142px;
        }

        .kpi-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-color: #cbd5e1;
        }

        .kpi-card.active {
          border: 2px solid #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06);
          background: #ffffff;
        }

        .card-top-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
        }

        .card-top-accent.green { background: #16a34a; }
        .card-top-accent.orange { background: #ea580c; }
        .card-top-accent.red { background: #dc2626; }
        .card-top-accent.sky { background: #0284c7; }
        .card-top-accent.cyan-amber { background: linear-gradient(90deg, #2563eb 65%, #f59e0b 35%); }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
        }

        .card-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .card-icon {
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #1e293b;
        }

        .active-badge {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.1rem 0.45rem;
          border-radius: 12px;
          background: #dbeafe;
          color: #1d4ed8;
        }

        .card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .main-stat {
          font-size: 1.65rem;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .green-text { color: #16a34a; }
        .orange-text { color: #ea580c; }
        .red-text { color: #dc2626; }
        .purple-text { color: #7c3aed; }
        .sky-text { color: #0284c7; }
        .blue-text { color: #2563eb; }
        .amber-text { color: #d97706; }

        .sub-stat {
          font-size: 0.775rem;
          color: #64748b;
          margin-top: 0.2rem;
        }

        .sub-stat-heading {
          font-size: 0.775rem;
          font-weight: 600;
          color: #475569;
          margin-top: 0.15rem;
        }

        .sub-stat-detail {
          font-size: 0.725rem;
          color: #64748b;
          margin-top: 0.1rem;
        }

        .thin-progress-bg {
          width: 100%;
          height: 4px;
          background: #e2e8f0;
          border-radius: 2px;
          margin-top: 0.35rem;
          overflow: hidden;
        }

        .thin-progress-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .thin-progress-fill.green-fill { background: #16a34a; }

        .card-body.dual-stat {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
        }

        .stat-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-num {
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.725rem;
          color: #64748b;
          margin-top: 0.2rem;
          font-weight: 600;
        }

        .stat-divider {
          width: 1px;
          height: 28px;
          background: #cbd5e1;
        }

        .triple-sub-stat {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 0.2rem;
          margin: 0.2rem 0;
        }

        .sub-indicator-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.25rem 0.15rem;
          border-radius: 6px;
          transition: background 0.15s ease, border 0.15s ease;
          cursor: pointer;
        }

        .sub-indicator-item:hover {
          background: #f1f5f9;
        }

        .sub-indicator-item.selected {
          background: #fee2e2;
          box-shadow: inset 0 0 0 1px #ef4444;
        }

        .sub-num {
          font-size: 1.25rem;
          font-weight: 800;
          line-height: 1;
        }

        .sub-label {
          font-size: 0.675rem;
          color: #475569;
          font-weight: 600;
          margin-top: 0.15rem;
          white-space: nowrap;
        }

        .sub-divider {
          width: 1px;
          height: 24px;
          background: #e2e8f0;
        }

        .card-body-bar {
          margin-top: 0.25rem;
        }

        .prop-bar-bg {
          width: 100%;
          height: 6px;
          background: #e2e8f0;
          border-radius: 3px;
          display: flex;
          overflow: hidden;
        }

        .prop-bar-in {
          height: 100%;
          background: #2563eb;
          transition: width 0.3s ease;
        }

        .prop-bar-out {
          height: 100%;
          background: #f59e0b;
          transition: width 0.3s ease;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.4rem;
          padding-top: 0.25rem;
          border-top: 1px solid #f1f5f9;
        }

        .footer-label {
          font-size: 0.725rem;
          color: #64748b;
          font-weight: 500;
        }

        .footer-arrow {
          font-size: 1rem;
          color: #94a3b8;
          font-weight: 700;
          line-height: 1;
        }

        .kpi-card:hover .footer-arrow,
        .kpi-card.active .footer-arrow {
          color: #2563eb;
          transform: translateX(2px);
          transition: transform 0.15s ease;
        }
      `}</style>

      {/* 5 MAIN DESKTOP CARDS HEADER (1 ROW) */}
      <div className="five-cards-container">
        {/* CARD A: LAPORAN */}
        <div
          className={`kpi-card ${activeMainCard === 'laporan' ? 'active' : ''}`}
          onClick={() => handleCardClick('laporan')}
        >
          <div className="card-top-accent green" />
          <div className="card-header">
            <div className="card-title-wrap">
              <span className="card-icon green-text">📄</span>
              <span className="card-title">Laporan</span>
            </div>
            {activeMainCard === 'laporan' && <span className="active-badge">Aktif</span>}
          </div>
          <div className="card-body">
            <div className="main-stat green-text">
              {reportsKpis.sudahDikirimPct !== null ? `${formatPercentage(reportsKpis.sudahDikirimPct)}` : 'N/A'}
            </div>
            <div className="sub-stat">
              <strong>{reportsKpis.sudahDikirimCount}</strong> / {reportsKpis.targetReports} terkirim
            </div>
            <div className="thin-progress-bg">
              <div className="thin-progress-fill green-fill" style={{ width: `${Math.min(100, reportsKpis.sudahDikirimPct || 0)}%` }} />
            </div>
          </div>
          <div className="card-footer">
            <span className="footer-label">Kepatuhan pengiriman</span>
            <span className="footer-arrow">›</span>
          </div>
        </div>

        {/* CARD B: NORMAL / RUSAK */}
        <div
          className={`kpi-card ${activeMainCard === 'normal_rusak' ? 'active' : ''}`}
          onClick={() => handleCardClick('normal_rusak')}
        >
          <div className="card-top-accent orange" />
          <div className="card-header">
            <div className="card-title-wrap">
              <span className="card-icon orange-text">🛡️</span>
              <span className="card-title">Normal / Rusak</span>
            </div>
            {activeMainCard === 'normal_rusak' && <span className="active-badge">Aktif</span>}
          </div>
          <div className="card-body dual-stat">
            <div className="stat-col">
              <div className="stat-num green-text" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>{reportsKpis.normalCount + reportsKpis.urgentCount}</span>
                {urgentPendingCardCount > 0 && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCardClick('normal_rusak')
                    }}
                    title={`${urgentPendingCardCount} laporan urgent menunggu komentar Anda.`}
                    aria-label={`${urgentPendingCardCount} laporan urgent menunggu komentar Anda.`}
                    style={{ display: 'inline-flex', cursor: 'pointer', color: '#dc2626' }}
                  >
                    <AlertCircle size={16} />
                  </span>
                )}
              </div>
              <div className="stat-label">Normal</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-col">
              <div className="stat-num orange-text" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>{reportsKpis.unitRusakCount + reportsKpis.gpsRusakCount}</span>
                {damagePendingActionCardCount > 0 && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCardClick('normal_rusak')
                    }}
                    title={`${damagePendingActionCardCount} unit/GPS belum pulih melewati batas eskalasi Anda.`}
                    aria-label={`${damagePendingActionCardCount} unit/GPS belum pulih melewati batas eskalasi Anda.`}
                    style={{ display: 'inline-flex', cursor: 'pointer', color: '#b45309' }}
                  >
                    <AlertTriangle size={16} />
                  </span>
                )}
              </div>
              <div className="stat-label">Rusak</div>
            </div>
          </div>
          <div className="card-footer">
            <span className="footer-label">Status operasional</span>
            <span className="footer-arrow">›</span>
          </div>
        </div>

        {/* CARD C: EXCEPTIONS */}
        <div className={`kpi-card ${activeMainCard === 'exceptions' ? 'active' : ''}`}>
          <div className="card-top-accent red" />
          <div className="card-header">
            <div className="card-title-wrap">
              <span className="card-icon red-text">⚠️</span>
              <span className="card-title">Exceptions</span>
            </div>
            {activeMainCard === 'exceptions' && <span className="active-badge">Aktif</span>}
          </div>
          <div className="card-body triple-sub-stat">
            {/* Speeding */}
            <div
              className={`sub-indicator-item ${activeMainCard === 'exceptions' && activeExceptionSub === 'Kecepatan' ? 'selected' : ''}`}
              onClick={(e) => { e.stopPropagation(); handleExceptionSubClick('Kecepatan'); }}
              title="Kecepatan >50 km/jam"
            >
              <div className="sub-num red-text">{formatCount(reportsKpis.speedingCount)}</div>
              <div className="sub-label">Speeding</div>
            </div>

            <div className="sub-divider" />

            {/* Keluar Rute */}
            <div
              className={`sub-indicator-item ${activeMainCard === 'exceptions' && activeExceptionSub === 'Keluar Rute' ? 'selected' : ''}`}
              onClick={(e) => { e.stopPropagation(); handleExceptionSubClick('Keluar Rute'); }}
              title="Keluar rute patroli"
            >
              <div className="sub-num purple-text">{formatCount(reportsKpis.outOfRouteCount)}</div>
              <div className="sub-label">Keluar rute</div>
            </div>

            <div className="sub-divider" />

            {/* Stop >30 mnt */}
            <div
              className={`sub-indicator-item ${activeMainCard === 'exceptions' && activeExceptionSub === 'Berhenti' ? 'selected' : ''}`}
              onClick={(e) => { e.stopPropagation(); handleExceptionSubClick('Berhenti'); }}
              title="Berhenti >30 menit"
            >
              <div className="sub-num blue-text">{formatCount(reportsKpis.overparkingCount)}</div>
              <div className="sub-label">Stop &gt;30 mnt</div>
            </div>
          </div>
          <div className="card-footer">
            <span className="footer-label">kejadian</span>
            <span className="footer-arrow">›</span>
          </div>
        </div>

        {/* CARD D: COVERAGE */}
        <div
          className={`kpi-card ${activeMainCard === 'coverage' ? 'active' : ''}`}
          onClick={() => handleCardClick('coverage')}
        >
          <div className="card-top-accent sky" />
          <div className="card-header">
            <div className="card-title-wrap">
              <span className="card-icon sky-text">🗺️</span>
              <span className="card-title">Coverage</span>
            </div>
            {activeMainCard === 'coverage' && <span className="active-badge">Aktif</span>}
          </div>
          <div className="card-body">
            <div className="main-stat sky-text">
              {coverageMetrics.coverageRawanPct !== null ? `${coverageMetrics.coverageRawanPct.toFixed(1).replace('.', ',')}%` : '—'}
            </div>
            <div className="sub-stat-heading">Aktivitas area rawan</div>
            <div className="sub-stat-detail">
              {coverageMetrics.rawanCount} / {coverageMetrics.totalValidCoverage} kunjungan
            </div>
          </div>
          <div className="card-footer">
            <span className="footer-arrow">›</span>
          </div>
        </div>

        {/* CARD E: IN-ROUTE / OUT-ROUTE */}
        <div
          className={`kpi-card ${activeMainCard === 'route' ? 'active' : ''}`}
          onClick={() => handleCardClick('route')}
        >
          <div className="card-top-accent cyan-amber" />
          <div className="card-header">
            <div className="card-title-wrap">
              <span className="card-icon blue-text">🔀</span>
              <span className="card-title">In-route / Out-route</span>
            </div>
            {activeMainCard === 'route' && <span className="active-badge">Aktif</span>}
          </div>
          <div className="card-body dual-stat">
            <div className="stat-col">
              <div className="stat-num blue-text">
                {routeKpis.kesesuaianPct !== null ? `${Math.round(routeKpis.kesesuaianPct)}%` : '—'}
              </div>
              <div className="stat-label">In-route</div>
            </div>
            <div className="stat-col">
              <div className="stat-num amber-text">
                {routeKpis.kesesuaianPct !== null ? `${100 - Math.round(routeKpis.kesesuaianPct)}%` : '—'}
              </div>
              <div className="stat-label">Out-route</div>
            </div>
          </div>
          <div className="card-body-bar">
            <div className="prop-bar-bg">
              <div className="prop-bar-in" style={{ width: `${Math.min(100, Math.max(0, routeKpis.kesesuaianPct || 0))}%` }} />
              <div className="prop-bar-out" style={{ width: `${Math.min(100, Math.max(0, 100 - (routeKpis.kesesuaianPct || 0)))}%` }} />
            </div>
          </div>
          <div className="card-footer">
            <span className="footer-label">Proporsi jarak patroli</span>
            <span className="footer-arrow">›</span>
          </div>
        </div>
      </div>

      {/* LOWER DYNAMIC ANALYSIS AREA BASED ON ACTIVE CARD */}

      {/* 1. CARD A: LAPORAN (Pengiriman Laporan Analysis) */}
      {activeMainCard === 'laporan' && (
        <React.Fragment>
          {selectedSummaryKey === 'Belum Dikirim' ? (
            <BelumDikirimView
              filteredDailyTableRows={filteredDailyTableRows}
              effectiveDateRangeLabel={effectiveDateRange.label}
              onBack={() => setSelectedSummaryKey('Sudah Dikirim')}
              onOpenReportModal={setActiveReportModal}
            />
          ) : (
            <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                    Disiplin Pengiriman Laporan Patroli
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                    Periode Efektif: <strong>{effectiveDateRange.label}</strong> ({reportsKpis.hkDays} Hari Operasional)
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.2rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                    <button
                      type="button"
                      onClick={() => handleChartViewToggle('Perbandingan')}
                      style={{
                        padding: '0.35rem 0.75rem',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: chartViewMode === 'Perbandingan' ? '#ffffff' : 'transparent',
                        color: chartViewMode === 'Perbandingan' ? '#0f172a' : '#64748b',
                        boxShadow: chartViewMode === 'Perbandingan' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                      }}
                    >
                      📊 Perbandingan
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChartViewToggle('Tren 6 Bulan')}
                      style={{
                        padding: '0.35rem 0.75rem',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: chartViewMode === 'Tren 6 Bulan' ? '#ffffff' : 'transparent',
                        color: chartViewMode === 'Tren 6 Bulan' ? '#0f172a' : '#64748b',
                        boxShadow: chartViewMode === 'Tren 6 Bulan' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                      }}
                    >
                      📈 Tren 6 Bulan
                    </button>
                  </div>
                </div>
              </div>

              {/* MODE 1: PERBANDINGAN */}
              {chartViewMode === 'Perbandingan' && (
                <div>
                  <div style={{ marginBottom: '1.5rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                          {laporanData.chartTitle} ({effectiveDateRange.label})
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.1rem' }}>
                          Total Terkirim: <strong>{formatCount(reportsKpis.sudahDikirimCount)}</strong> / <strong>{formatCount(reportsKpis.targetReports)}</strong> target laporan ({formatPercentage(reportsKpis.sudahDikirimPct)})
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.3rem', background: '#e2e8f0', padding: '0.2rem', borderRadius: '6px' }}>
                        {(['Persentase (%)', 'Jumlah Laporan'] as const).map(mode => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setChartMeasureMode(mode)}
                            style={{
                              padding: '0.25rem 0.6rem',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              background: chartMeasureMode === mode ? '#ffffff' : 'transparent',
                              color: chartMeasureMode === mode ? '#0f172a' : '#64748b'
                            }}
                          >
                            {mode === 'Persentase (%)' ? '%' : 'Jumlah'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {chartMeasureMode === 'Jumlah Laporan' && (
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <span style={{ width: '12px', height: '12px', background: '#94a3b8', borderRadius: '2px', display: 'inline-block' }} />
                          <span>Target</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <span style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '2px', display: 'inline-block' }} />
                          <span>Sudah Dikirim</span>
                        </div>
                      </div>
                    )}

                    <SubmissionVerticalBarChart
                      categories={laporanData.categories}
                      chartMeasureMode={chartMeasureMode}
                      effectiveDateRangeLabel={effectiveDateRange.label}
                      onSelectCategory={cat => handleSelectDrilldown(cat.id, cat.label)}
                      selectedCategoryId={drilldownState?.categoryKey}
                    />
                  </div>

                  {/* Summary Table directly below Perbandingan chart */}
                  <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ padding: '0.75rem 1rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                        Tabel Ringkasan Perbandingan ({effectiveDateRange.label})
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Menampilkan {paginatedCategories.length} dari {laporanData.categories.length} {laporanData.groupingType}
                      </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                      <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                        <thead>
                          <tr style={{ background: '#e2e8f0', textTransform: 'uppercase', fontSize: '0.725rem', color: '#475569' }}>
                            <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left' }}>
                              {laporanData.groupingType === 'Vehicle' ? 'Unit Kendaraan' : laporanData.groupingType}
                            </th>
                            <th style={{ padding: '0.6rem 0.8rem', textAlign: 'right' }}>Target Laporan</th>
                            <th style={{ padding: '0.6rem 0.8rem', textAlign: 'right' }}>Sudah Dikirim</th>
                            <th style={{ padding: '0.6rem 0.8rem', textAlign: 'right' }}>Belum Dikirim</th>
                            <th style={{ padding: '0.6rem 0.8rem', textAlign: 'right' }}>Disiplin Upload (%)</th>
                            <th style={{ padding: '0.6rem 0.8rem', textAlign: 'center' }}>Status Disiplin</th>
                            <th style={{ padding: '0.6rem 0.8rem', textAlign: 'center' }}>Detail</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedCategories.map(cat => (
                            <tr
                              key={cat.id}
                              style={{
                                borderBottom: '1px solid #e2e8f0',
                                background: drilldownState?.categoryKey === cat.id ? '#eff6ff' : 'transparent'
                              }}
                            >
                              <td style={{ padding: '0.65rem 0.8rem', fontWeight: 700, color: '#0f172a' }}>
                                {cat.label}
                                {cat.subLabel && <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 400 }}>{cat.subLabel}</div>}
                              </td>
                              <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 600 }}>{formatCount(cat.targetReports)}</td>
                              <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 700, color: '#166534' }}>{formatCount(cat.actualReports)}</td>
                              <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 600, color: cat.shortfall > 0 ? '#991b1b' : '#64748b' }}>{formatCount(cat.shortfall)}</td>
                              <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 800, color: cat.thresholdColor }}>{formatPercentage(cat.compliancePct)}</td>
                              <td style={{ padding: '0.65rem 0.8rem', textAlign: 'center' }}>
                                <span style={{ padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, background: cat.thresholdColor, color: '#fff' }}>
                                  {cat.threshold}
                                </span>
                              </td>
                              <td style={{ padding: '0.65rem 0.8rem', textAlign: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => handleSelectDrilldown(cat.id, cat.label)}
                                  title="Lihat Laporan Harian"
                                  style={{ padding: '0.25rem 0.45rem', background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                                >
                                  🔍
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr style={{ background: '#f1f5f9', fontWeight: 800, borderTop: '2px solid #cbd5e1', fontSize: '0.85rem' }}>
                            <td style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Total Ringkasan Scope</td>
                            <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right' }}>{formatCount(reportsKpis.targetReports)}</td>
                            <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right', color: '#166534' }}>{formatCount(reportsKpis.sudahDikirimCount)}</td>
                            <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right', color: reportsKpis.belumDikirimCount > 0 ? '#991b1b' : '#64748b' }}>{formatCount(reportsKpis.belumDikirimCount)}</td>
                            <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right', color: reportsKpis.thresholdColor }}>{formatPercentage(reportsKpis.sudahDikirimPct)}</td>
                            <td style={{ padding: '0.75rem 0.8rem', textAlign: 'center' }}>
                              <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.725rem', fontWeight: 800, background: reportsKpis.thresholdColor, color: '#fff' }}>
                                {reportsKpis.threshold}
                              </span>
                            </td>
                            <td style={{ padding: '0.75rem 0.8rem', textAlign: 'center' }}>—</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {/* Pagination Controls for Perbandingan Table */}
                    {laporanData.categories.length > 10 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '0.75rem' }}>
                        <div>Halaman {perbandinganTablePage} dari {Math.ceil(laporanData.categories.length / 10)}</div>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <button
                            type="button"
                            disabled={perbandinganTablePage === 1}
                            onClick={() => setPerbandinganTablePage(p => Math.max(1, p - 1))}
                            style={{ padding: '0.2rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', opacity: perbandinganTablePage === 1 ? 0.5 : 1, cursor: perbandinganTablePage === 1 ? 'not-allowed' : 'pointer' }}
                          >
                            Sebelumnya
                          </button>
                          <button
                            type="button"
                            disabled={perbandinganTablePage * 10 >= laporanData.categories.length}
                            onClick={() => setPerbandinganTablePage(p => p + 1)}
                            style={{ padding: '0.2rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', opacity: perbandinganTablePage * 10 >= laporanData.categories.length ? 0.5 : 1, cursor: perbandinganTablePage * 10 >= laporanData.categories.length ? 'not-allowed' : 'pointer' }}
                          >
                            Berikutnya
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* MODE 2: TREN 6 BULAN */}
              {chartViewMode === 'Tren 6 Bulan' && (
                <div>
                  <div style={{ marginBottom: '1.5rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                          Grafik Tren 6 Bulan ({laporanData.chartSubtitle})
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.1rem' }}>
                          {laporanData.categories.some(c => c.isPartialMonth) && (
                            <span>* Bulan terakhir memuat target &amp; actual parsial sesuai cutoff periode.</span>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.3rem', background: '#e2e8f0', padding: '0.2rem', borderRadius: '6px' }}>
                        {(['Persentase (%)', 'Jumlah Laporan'] as const).map(mode => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setChartMeasureMode(mode)}
                            style={{
                              padding: '0.25rem 0.6rem',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              background: chartMeasureMode === mode ? '#ffffff' : 'transparent',
                              color: chartMeasureMode === mode ? '#0f172a' : '#64748b'
                            }}
                          >
                            {mode === 'Persentase (%)' ? '%' : 'Jumlah'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {chartMeasureMode === 'Jumlah Laporan' && (
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <span style={{ width: '12px', height: '12px', background: '#94a3b8', borderRadius: '2px', display: 'inline-block' }} />
                          <span>Target</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <span style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '2px', display: 'inline-block' }} />
                          <span>Sudah Dikirim</span>
                        </div>
                      </div>
                    )}

                    <SubmissionVerticalBarChart
                      categories={laporanData.categories}
                      chartMeasureMode={chartMeasureMode}
                      effectiveDateRangeLabel={effectiveDateRange.label}
                      onSelectCategory={cat => handleSelectDrilldown(cat.id, cat.label)}
                      selectedCategoryId={drilldownState?.categoryKey}
                    />
                  </div>

                  {/* Summary Table directly below 6-Month Chart */}
                  <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ padding: '0.75rem 1rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                        Tabel Breakdown Tren 6 Bulan ({trendBreakdownData.breakdownType === 'Vehicle' ? 'Per Unit Kendaraan' : `Per ${trendBreakdownData.breakdownType}`})
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Menampilkan {paginatedTrendRows.length} dari {trendBreakdownData.rows.length} {trendBreakdownData.breakdownType}
                      </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                      <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                        <thead>
                          <tr style={{ background: '#e2e8f0', textTransform: 'uppercase', fontSize: '0.725rem', color: '#475569' }}>
                            <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left' }}>
                              {trendBreakdownData.breakdownType === 'Vehicle' ? 'Unit Kendaraan' : trendBreakdownData.breakdownType}
                            </th>
                            {trendBreakdownData.headers.map(h => (
                              <th key={h} style={{ padding: '0.6rem 0.8rem', textAlign: 'center' }}>{h}</th>
                            ))}
                            <th style={{ padding: '0.6rem 0.8rem', textAlign: 'center', background: '#cbd5e1' }}>Total Periode</th>
                            <th style={{ padding: '0.6rem 0.8rem', textAlign: 'center' }}>Detail</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedTrendRows.map(row => (
                            <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                              <td style={{ padding: '0.65rem 0.8rem', fontWeight: 700, color: '#0f172a' }}>
                                {row.label}
                                {row.subLabel && <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 400 }}>{row.subLabel}</div>}
                              </td>
                              {row.months.map(m => (
                                <td
                                  key={m.yearMonth}
                                  onClick={() => handleSelectDrilldown(row.id, `${row.label} · ${m.label}`)}
                                  style={{ padding: '0.65rem 0.8rem', textAlign: 'center', cursor: 'pointer' }}
                                  title={m.partialTooltip || `${m.label}: ${formatCount(m.actualReports)} / ${formatCount(m.targetReports)} laporan`}
                                >
                                  {chartMeasureMode === 'Persentase (%)' ? (
                                    m.pct !== null ? (
                                      <span style={{ padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.725rem', fontWeight: 700, background: m.thresholdColor, color: '#ffffff' }}>
                                        {formatPercentage(m.pct)}
                                      </span>
                                    ) : (
                                      <span style={{ color: '#94a3b8' }}>N/A</span>
                                    )
                                  ) : (
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0f172a' }}>
                                      {formatCount(m.actualReports)} / {formatCount(m.targetReports)}
                                    </span>
                                  )}
                                </td>
                              ))}
                              <td style={{ padding: '0.65rem 0.8rem', textAlign: 'center', fontWeight: 800, background: '#f1f5f9' }}>
                                {chartMeasureMode === 'Persentase (%)' ? (
                                  row.totalPct !== null ? (
                                    <span style={{ color: row.totalThresholdColor }}>{formatPercentage(row.totalPct)}</span>
                                  ) : 'N/A'
                                ) : (
                                  <span>{formatCount(row.totalActual)} / {formatCount(row.totalTarget)}</span>
                                )}
                              </td>
                              <td style={{ padding: '0.65rem 0.8rem', textAlign: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => handleSelectDrilldown(row.id, row.label)}
                                  title="Lihat Laporan Harian"
                                  style={{ padding: '0.25rem 0.45rem', background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                                >
                                  🔍
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr style={{ background: '#f1f5f9', fontWeight: 800, borderTop: '2px solid #cbd5e1', fontSize: '0.85rem' }}>
                            <td style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Total Agregat Scope</td>
                            {trendMonthAggregates.map((agg, idx) => (
                              <td key={idx} style={{ padding: '0.75rem 0.8rem', textAlign: 'center', color: agg.thresholdColor }}>
                                {chartMeasureMode === 'Persentase (%)' ? formatPercentage(agg.pct) : `${formatCount(agg.actual)} / ${formatCount(agg.target)}`}
                              </td>
                            ))}
                            <td style={{ padding: '0.75rem 0.8rem', textAlign: 'center', background: '#cbd5e1', color: trendOverallAggregate.thresholdColor }}>
                              {chartMeasureMode === 'Persentase (%)' ? formatPercentage(trendOverallAggregate.pct) : `${formatCount(trendOverallAggregate.actual)} / ${formatCount(trendOverallAggregate.target)}`}
                            </td>
                            <td style={{ padding: '0.75rem 0.8rem', textAlign: 'center' }}>—</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {/* Pagination Controls for Trend Table */}
                    {trendBreakdownData.rows.length > 10 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '0.75rem' }}>
                        <div>Halaman {trendTablePage} dari {Math.ceil(trendBreakdownData.rows.length / 10)}</div>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <button
                            type="button"
                            disabled={trendTablePage === 1}
                            onClick={() => setTrendTablePage(p => Math.max(1, p - 1))}
                            style={{ padding: '0.2rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', opacity: trendTablePage === 1 ? 0.5 : 1, cursor: trendTablePage === 1 ? 'not-allowed' : 'pointer' }}
                          >
                            Sebelumnya
                          </button>
                          <button
                            type="button"
                            disabled={trendTablePage * 10 >= trendBreakdownData.rows.length}
                            onClick={() => setTrendTablePage(p => p + 1)}
                            style={{ padding: '0.2rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', opacity: trendTablePage * 10 >= trendBreakdownData.rows.length ? 0.5 : 1, cursor: trendTablePage * 10 >= trendBreakdownData.rows.length ? 'not-allowed' : 'pointer' }}
                          >
                            Berikutnya
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* IN-PAGE DAILY REPORT CONTAINER (Always Visible by Default) */}
              <div style={{ marginTop: '1.5rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: drilldownState ? '1.5px solid #3b82f6' : '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e3a8a' }}>
                      📋 Laporan Harian {drilldownState ? `· ${drilldownState.label}` : ''}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.1rem' }}>
                      Scope: <strong>{chartViewMode === 'Tren 6 Bulan' ? laporanData.chartSubtitle : effectiveDateRange.label}</strong> ({filteredDailyTableRows.length} laporan)
                    </div>
                  </div>

                  {drilldownState && (
                    <button
                      type="button"
                      onClick={handleResetDrilldown}
                      style={{ padding: '0.3rem 0.65rem', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', color: '#2563eb' }}
                    >
                      🔄 Reset pilihan
                    </button>
                  )}
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ background: '#e2e8f0', textTransform: 'uppercase', fontSize: '0.7rem', color: '#475569' }}>
                        <th style={{ padding: '0.55rem', textAlign: 'left' }}>Tanggal</th>
                        <th style={{ padding: '0.55rem', textAlign: 'left' }}>Estate</th>
                        <th style={{ padding: '0.55rem', textAlign: 'left' }}>Nopol</th>
                        <th style={{ padding: '0.55rem', textAlign: 'center' }}>Pengiriman</th>
                        <th style={{ padding: '0.55rem', textAlign: 'left' }}>Kategori Utama</th>
                        <th style={{ padding: '0.55rem', textAlign: 'left' }}>Comment Manager</th>
                        <th style={{ padding: '0.55rem', textAlign: 'center' }}>Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedDailyRows.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>
                            Tidak ada laporan harian pada scope ini.
                          </td>
                        </tr>
                      ) : (
                        paginatedDailyRows.map(row => (
                          <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                            <td style={{ padding: '0.55rem', fontWeight: 600 }}>{row.date}</td>
                            <td style={{ padding: '0.55rem' }}>{row.estateId}</td>
                            <td style={{ padding: '0.55rem' }}>
                              {renderVehicleNopolCell(row.nopol, row.vehicleType)}
                            </td>
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
                              {row.submissionStatus === 'Sudah Dikirim' ? (
                                <span style={{
                                  padding: '0.15rem 0.45rem',
                                  borderRadius: '4px',
                                  fontSize: '0.7rem',
                                  fontWeight: 700,
                                  background: row.reportType === 'Normal' ? '#dbeafe' : (row.reportType === 'Urgent' ? '#ffedd5' : (row.reportType === 'Unit Rusak' ? '#fef3c7' : '#fee2e2')),
                                  color: row.reportType === 'Normal' ? '#1e40af' : (row.reportType === 'Urgent' ? '#c2410c' : (row.reportType === 'Unit Rusak' ? '#92400e' : '#b91c1c'))
                                }}>
                                  {row.reportType}
                                </span>
                              ) : (
                                <span style={{
                                  padding: '0.15rem 0.45rem',
                                  borderRadius: '4px',
                                  fontSize: '0.7rem',
                                  fontWeight: 600,
                                  background: row.trackingStatus === 'Tersedia' ? '#dcfce7' : '#f1f5f9',
                                  color: row.trackingStatus === 'Tersedia' ? '#15803d' : '#64748b'
                                }}>
                                  {row.trackingStatus === 'Tersedia' ? 'Tersedia Pelacakan' : 'Tidak Tersedia Pelacakan'}
                                </span>
                              )}
                            </td>
                            <td style={{ padding: '0.55rem' }}>
                              {renderCommentManagerCell(row)}
                            </td>
                            <td style={{ padding: '0.55rem', textAlign: 'center' }}>
                              {row.rawRecord ? (
                                <button
                                  type="button"
                                  onClick={() => setActiveReportModal(row.rawRecord!)}
                                  title="Lihat Detail Laporan"
                                  style={{ padding: '0.25rem 0.45rem', background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                                >
                                  🔍
                                </button>
                              ) : (
                                <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>—</span>
                              )}
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
        </React.Fragment>
      )}

      {/* 2. CARD B: NORMAL / RUSAK (Operational Status & Equipment Damage Analysis) */}
      {activeMainCard === 'normal_rusak' && (
        <NormalRusakSection
          globalFilters={globalFilters}
          reports={laporanData.laporanHarianRows.map(r => r.rawRecord!).filter(Boolean)}
          userRole={currentUserRole}
          onUserRoleChange={setCurrentUserRole}
          onOpenReportModal={setActiveReportModal}
        />
      )}

      {/* 3. CARD C: EXCEPTIONS (Unified Exception Breakdown View) */}
      {activeMainCard === 'exceptions' && (
        <UnifiedExceptionBreakdownView
          exceptionKey={activeExceptionSub}
          globalFilters={globalFilters}
          priorityFilter={priorityFilter}
          onBack={() => setActiveMainCard('laporan')}
          onOpenReportModal={setActiveReportModal}
          onOpenExceptionModal={setActiveExceptionModal}
        />
      )}

      {/* 4. CARD D: COVERAGE (Coverage Area Tab) */}
      {activeMainCard === 'coverage' && (
        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
          {/* Header & Sub-tabs selector matching mockup */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0284c7', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🗺️ Analisis Coverage Area
              </h3>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                Scope: <strong>{globalFilters.estate !== 'ALL' ? globalFilters.estate : globalFilters.region !== 'ALL' ? globalFilters.region : globalFilters.psm}</strong> · Periode sesuai filter
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', background: '#f1f5f9', padding: '0.25rem', borderRadius: '6px' }}>
              <button
                type="button"
                onClick={() => setActiveCoverageSubTab('Aktivitas')}
                style={{
                  padding: '0.4rem 0.9rem',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: activeCoverageSubTab === 'Aktivitas' ? '#ffffff' : 'transparent',
                  color: activeCoverageSubTab === 'Aktivitas' ? '#0f172a' : '#64748b',
                  boxShadow: activeCoverageSubTab === 'Aktivitas' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Aktivitas Area Rawan
              </button>
              <button
                type="button"
                onClick={() => setActiveCoverageSubTab('Cakupan')}
                style={{
                  padding: '0.4rem 0.9rem',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: activeCoverageSubTab === 'Cakupan' ? '#ffffff' : 'transparent',
                  color: activeCoverageSubTab === 'Cakupan' ? '#0f172a' : '#64748b',
                  boxShadow: activeCoverageSubTab === 'Cakupan' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Cakupan Blok Rawan
              </button>
            </div>
          </div>

          <CoverageAreaTab
            globalFilters={globalFilters}
            coverageMetrics={coverageMetrics}
            onOpenReportModal={setActiveReportModal}
            initialMetric={activeCoverageSubTab}
          />
        </div>
      )}

      {/* 5. CARD E: IN-ROUTE / OUT-ROUTE (Route Effectiveness Tab) */}
      {activeMainCard === 'route' && (
        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
          <RouteEffectivenessTab
            globalFilters={globalFilters}
          />
        </div>
      )}
      {activeReportModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', maxWidth: '600px', width: '100%', padding: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>Detail Laporan Patroli #{activeReportModal.id}</h3>
              <button onClick={() => setActiveReportModal(null)} style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
              <div>Tanggal Patroli: <strong>{activeReportModal.date}</strong></div>
              <div>Estate: <strong>{activeReportModal.estateId}</strong></div>
              <div>Unit Kendaraan: <strong>{activeReportModal.vehicleId}</strong></div>
              <div>Status Pengiriman: <strong>{activeReportModal.submissionStatus}</strong></div>
              <div>Kategori Utama: <strong>{activeReportModal.reportType}</strong></div>
              <div>Upload Timestamp: <strong>{activeReportModal.uploadDate || '—'}</strong></div>
              <div>Status Review: <strong>{activeReportModal.status}</strong></div>
            </div>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#334155' }}>Catatan PIC Patroli:</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', fontStyle: activeReportModal.picComment ? 'normal' : 'italic' }}>
                {activeReportModal.picComment || 'Belum ada catatan PIC.'}
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#334155' }}>Review &amp; Keputusan Manager:</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', fontStyle: activeReportModal.managerComment ? 'normal' : 'italic' }}>
                {activeReportModal.managerComment || 'Belum ditinjau Manager.'}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => setActiveReportModal(null)}
                style={{ padding: '0.5rem 1rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXCEPTION MODAL */}
      {activeExceptionModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', maxWidth: '640px', width: '100%', padding: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🔍 Detail Insiden #{activeExceptionModal.id} ({activeExceptionModal.type})
              </h3>
              <button onClick={() => setActiveExceptionModal(null)} style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
              <div>ID Run Patroli: <strong>{activeExceptionModal.patrolRunId}</strong></div>
              <div>Tanggal &amp; Shift: <strong>{activeExceptionModal.date} ({activeExceptionModal.shift})</strong></div>
              {activeExceptionModal.startTime && (
                <div>Waktu Kejadian: <strong>{activeExceptionModal.startTime} - {activeExceptionModal.endTime} WIB</strong></div>
              )}
              <div>Estate / Vehicle: <strong>{activeExceptionModal.estateId} - {activeExceptionModal.vehicleId}</strong></div>
              <div>Tipe Insiden: <strong>{activeExceptionModal.type}</strong></div>
              <div>Prioritas Laporan: <strong style={{ color: activeExceptionModal.reportPriority === 'Urgent' ? '#c2410c' : '#1e40af' }}>{activeExceptionModal.reportPriority || 'Normal'}</strong></div>
              {activeExceptionModal.maxSpeedKmvh && (
                <div>Kecepatan Maks.: <strong style={{ color: '#e11d48' }}>{activeExceptionModal.maxSpeedKmvh} km/jam</strong></div>
              )}
              {activeExceptionModal.durationMinutes && (
                <div>Durasi Insiden: <strong>{activeExceptionModal.durationMinutes} Menit</strong></div>
              )}
              <div>Lokasi Blok: <strong>{activeExceptionModal.locationBlock}</strong></div>
              {activeExceptionModal.lat && (
                <div>Koordinat GPS: <strong>{activeExceptionModal.lat}, {activeExceptionModal.lng}</strong></div>
              )}
            </div>

            <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '0.85rem', color: '#9f1239' }}>Alasan &amp; Catatan Operasional:</h4>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#881337', marginBottom: '0.25rem' }}>
                {activeExceptionModal.reasonCategory || 'Tanpa alasan tercatat'}
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                {activeExceptionModal.detail}
              </p>
              {activeExceptionModal.picComment && (
                <div style={{ fontSize: '0.8rem', color: '#334155', fontStyle: 'italic', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed #fca5a5' }}>
                  Catatan PIC: &quot;{activeExceptionModal.picComment}&quot;
                </div>
              )}
            </div>

            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => setActiveExceptionModal(null)}
                style={{ padding: '0.5rem 1rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  )
}
