'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { GlobalFilterState } from '@/lib/types'
import {
  selectRouteEffectivenessKpis,
  selectRouteComparison,
  selectRouteTrendTable,
  selectRouteDailyDetail,
  RouteComparisonCategoryItem
} from '@/lib/selectors'
import { Navigation, Route as RouteIcon, Info, Check, RotateCcw } from 'lucide-react'

interface RouteEffectivenessTabProps {
  globalFilters: GlobalFilterState
}

// ── Threshold Rules per Section 3 ─────────────────────────────────────────────
// x >= 90%: Hijau (#16a34a) - Prioritas Rendah
// 70% <= x < 90%: Amber (#d97706) - Prioritas Sedang
// x < 70%: Merah (#dc2626) - Prioritas Tinggi
// Null / Undefined / NaN: Slate (#64748b)
export function getRouteThresholdColor(v: number | null | undefined): string {
  if (v === null || v === undefined || isNaN(v)) return '#64748b'
  if (v >= 90) return '#16a34a'
  if (v >= 70) return '#d97706'
  return '#dc2626'
}

export function getRouteThresholdBadge(v: number | null | undefined): { label: string; bg: string; color: string } {
  if (v === null || v === undefined || isNaN(v)) {
    return { label: 'Belum ada data', bg: '#f1f5f9', color: '#64748b' }
  }
  if (v >= 90) {
    return { label: 'Rendah (≥90%)', bg: '#f0fdf4', color: '#16a34a' }
  }
  if (v >= 70) {
    return { label: 'Sedang (70–<90%)', bg: '#fffbeb', color: '#d97706' }
  }
  return { label: 'Tinggi (<70%)', bg: '#fef2f2', color: '#dc2626' }
}

// ── Formatting helpers (Indonesian standard) ──────────────────────────────────
function fmtPct(v: number | null | undefined): string {
  if (v === null || v === undefined || isNaN(v)) return '—'
  return v.toFixed(1).replace('.', ',') + '%'
}

function fmtKm(v: number | null | undefined): string {
  if (v === undefined || v === null || isNaN(v)) return '0,0 km'
  return v.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' km'
}

function fmtDiffKm(v: number | null | undefined): string {
  if (v === undefined || v === null || isNaN(v)) return '0,0 km'
  const sign = v > 0 ? '+' : ''
  return sign + v.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' km'
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function RouteEffectivenessTab({ globalFilters }: RouteEffectivenessTabProps) {
  // State
  const [selectedMetric, setSelectedMetric] = useState<'Jarak' | 'Kesesuaian'>('Jarak')
  const [viewMode, setViewMode] = useState<'Perbandingan' | 'Tren 6 Bulan'>('Perbandingan')
  const [measureMode, setMeasureMode] = useState<'%' | 'Km'>('%')
  const [drilldownEntity, setDrilldownEntity] = useState<string | null>(null)
  const [detailPage, setDetailPage] = useState(1)
  const [summaryPage, setSummaryPage] = useState(1)
  const [activeTooltip, setActiveTooltip] = useState<'Jarak' | 'Kesesuaian' | null>(null)

  const summaryPageSize = 10
  const detailPageSize = 10

  // Reset on filter change
  useEffect(() => {
    if (globalFilters.estate && globalFilters.estate !== 'ALL') {
      setViewMode('Tren 6 Bulan')
    } else {
      setViewMode('Perbandingan')
    }
    setDrilldownEntity(null)
    setDetailPage(1)
    setSummaryPage(1)
  }, [globalFilters.psm, globalFilters.region, globalFilters.estate, globalFilters.startDate, globalFilters.endDate, globalFilters.year, globalFilters.month])

  // Selectors
  const kpis = useMemo(() => selectRouteEffectivenessKpis(globalFilters), [globalFilters])
  const compData = useMemo(() => selectRouteComparison(globalFilters), [globalFilters])
  const trendData = useMemo(() => selectRouteTrendTable(globalFilters), [globalFilters])
  const dailyRows = useMemo(() => selectRouteDailyDetail(
    globalFilters,
    drilldownEntity || undefined,
    drilldownEntity ? compData.groupingType : undefined
  ), [globalFilters, drilldownEntity, compData.groupingType])

  // Paginated daily rows
  const totalDetailPages = Math.max(1, Math.ceil(dailyRows.length / detailPageSize))
  const paginatedDaily = dailyRows.slice((detailPage - 1) * detailPageSize, detailPage * detailPageSize)

  // Paginated comparison rows
  const totalSummaryPages = Math.max(1, Math.ceil(compData.categories.length / summaryPageSize))
  const paginatedCategories = compData.categories.slice((summaryPage - 1) * summaryPageSize, summaryPage * summaryPageSize)

  // Paginated trend rows
  const totalTrendPages = Math.max(1, Math.ceil(trendData.rows.length / summaryPageSize))
  const paginatedTrendRows = trendData.rows.slice((summaryPage - 1) * summaryPageSize, summaryPage * summaryPageSize)

  const handleDrilldown = (entityId: string) => {
    setDrilldownEntity(prev => prev === entityId ? null : entityId)
    setDetailPage(1)
  }

  const groupLabel = compData.groupingType === 'Vehicle' ? 'Unit Kendaraan' : compData.groupingType === 'Region' ? 'Region' : 'Estate'

  // ── Render: Two Metric Cards (Sole Metric Selectors per Section 1 & 2) ──────
  const renderMetricCards = () => {
    const isJarakActive = selectedMetric === 'Jarak'
    const isKesesuaianActive = selectedMetric === 'Kesesuaian'

    const jarakColor = getRouteThresholdColor(kpis.jarakPct)
    const kesesuaianColor = getRouteThresholdColor(kpis.kesesuaianPct)

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '16px',
        fontFamily: "'Poppins', sans-serif"
      }}>
        {/* CARD 1: JARAK PATROLI */}
        <div
          role="button"
          tabIndex={0}
          aria-pressed={isJarakActive}
          onClick={() => setSelectedMetric('Jarak')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedMetric('Jarak') } }}
          style={{
            background: isJarakActive ? '#f8faff' : '#ffffff',
            borderRadius: '12px',
            border: isJarakActive ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
            boxShadow: isJarakActive ? '0 2px 8px rgba(37,99,235,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
            padding: '16px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          {/* Card Header Row */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #dbeafe'
                }}>
                  <Navigation size={18} strokeWidth={2} />
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#0f172a' }}>
                  Jarak Patroli
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Active Selection Marker - Distinct from achievement threshold colors */}
                {isJarakActive && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: '#dbeafe',
                    color: '#1d4ed8',
                    padding: '2px 8px',
                    borderRadius: '12px'
                  }}>
                    <Check size={12} strokeWidth={2.5} /> Terpilih
                  </span>
                )}

                {/* Definition Tooltip Button */}
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setActiveTooltip(t => t === 'Jarak' ? null : 'Jarak') }}
                    onBlur={() => setTimeout(() => setActiveTooltip(null), 250)}
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: '1px solid #cbd5e1',
                      background: '#f8fafc',
                      color: '#64748b',
                      fontSize: '11px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0
                    }}
                    title="Definisi teknis metrik Jarak Patroli"
                  >
                    <Info size={13} />
                  </button>
                  {activeTooltip === 'Jarak' && (
                    <div style={{
                      position: 'absolute',
                      top: '28px',
                      right: 0,
                      zIndex: 30,
                      background: '#0f172a',
                      color: '#f8fafc',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      lineHeight: 1.45,
                      width: '280px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                      pointerEvents: 'none'
                    }}>
                      <div style={{ fontWeight: 700, marginBottom: '4px', color: '#60a5fa' }}>Definisi Jarak Patroli (%)</div>
                      <div>Rumus: <code>(Km Aktual / Km Baseline) × 100%</code></div>
                      <div style={{ marginTop: '6px', fontSize: '11px', color: '#94a3b8' }}>
                        Mengukur perbandingan realisasi kilometer patroli terhadap target baseline operasional.
                      </div>
                      <div style={{ marginTop: '6px', fontSize: '11px', borderTop: '1px solid #334155', paddingTop: '4px' }}>
                        Threshold: <strong>≥90% Hijau</strong> (Rendah), <strong>70–&lt;90% Amber</strong> (Sedang), <strong>&lt;70% Merah</strong> (Tinggi).
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Stat Number - colored by Section 3 threshold */}
            <div style={{
              fontSize: '32px',
              fontWeight: 700,
              lineHeight: 1.1,
              color: jarakColor,
              marginBottom: '6px'
            }}>
              {fmtPct(kpis.jarakPct)}
            </div>

            {/* Dynamic Details - Text slate, no static red/green */}
            <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>
              <div>{fmtKm(kpis.totalActualKm)} dari {fmtKm(kpis.totalBaselineKm)} baseline</div>
              <div style={{ fontSize: '11.5px', marginTop: '2px', color: '#64748b' }}>
                {fmtDiffKm(kpis.diffKm)} selisih baseline
              </div>
            </div>
          </div>

          {/* Bottom Progress Bar - 6px uniform bottom */}
          <div style={{ marginTop: '14px' }}>
            <div style={{
              height: '6px',
              borderRadius: '3px',
              background: '#f1f5f9',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, Math.max(0, kpis.jarakPct || 0))}%`,
                background: jarakColor,
                borderRadius: '3px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        </div>

        {/* CARD 2: KESESUAIAN RUTE */}
        <div
          role="button"
          tabIndex={0}
          aria-pressed={isKesesuaianActive}
          onClick={() => setSelectedMetric('Kesesuaian')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedMetric('Kesesuaian') } }}
          style={{
            background: isKesesuaianActive ? '#f8faff' : '#ffffff',
            borderRadius: '12px',
            border: isKesesuaianActive ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
            boxShadow: isKesesuaianActive ? '0 2px 8px rgba(37,99,235,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
            padding: '16px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          {/* Card Header Row */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #dbeafe'
                }}>
                  <RouteIcon size={18} strokeWidth={2} />
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#0f172a' }}>
                  Kesesuaian Rute
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Active Selection Marker - Distinct from achievement threshold colors */}
                {isKesesuaianActive && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: '#dbeafe',
                    color: '#1d4ed8',
                    padding: '2px 8px',
                    borderRadius: '12px'
                  }}>
                    <Check size={12} strokeWidth={2.5} /> Terpilih
                  </span>
                )}

                {/* Definition Tooltip Button */}
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setActiveTooltip(t => t === 'Kesesuaian' ? null : 'Kesesuaian') }}
                    onBlur={() => setTimeout(() => setActiveTooltip(null), 250)}
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: '1px solid #cbd5e1',
                      background: '#f8fafc',
                      color: '#64748b',
                      fontSize: '11px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0
                    }}
                    title="Definisi teknis metrik Kesesuaian Rute"
                  >
                    <Info size={13} />
                  </button>
                  {activeTooltip === 'Kesesuaian' && (
                    <div style={{
                      position: 'absolute',
                      top: '28px',
                      right: 0,
                      zIndex: 30,
                      background: '#0f172a',
                      color: '#f8fafc',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      lineHeight: 1.45,
                      width: '280px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                      pointerEvents: 'none'
                    }}>
                      <div style={{ fontWeight: 700, marginBottom: '4px', color: '#60a5fa' }}>Definisi Kesesuaian Rute (%)</div>
                      <div>Rumus: <code>(Km Dalam Rute / Total Km Aktual) × 100%</code></div>
                      <div style={{ marginTop: '6px', fontSize: '11px', color: '#94a3b8' }}>
                        Mengukur proporsi kilometer patroli yang berada tepat di dalam koridor rute yang ditentukan.
                      </div>
                      <div style={{ marginTop: '6px', fontSize: '11px', borderTop: '1px solid #334155', paddingTop: '4px' }}>
                        Threshold: <strong>≥90% Hijau</strong> (Rendah), <strong>70–&lt;90% Amber</strong> (Sedang), <strong>&lt;70% Merah</strong> (Tinggi).
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Stat Number - colored by Section 3 threshold */}
            <div style={{
              fontSize: '32px',
              fontWeight: 700,
              lineHeight: 1.1,
              color: kesesuaianColor,
              marginBottom: '6px'
            }}>
              {fmtPct(kpis.kesesuaianPct)}
            </div>

            {/* Dynamic Details - Text slate, no static red/green */}
            <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>
              <div>{fmtKm(kpis.totalInRouteKm)} dalam rute dari {fmtKm(kpis.totalActualKm)} aktual</div>
              <div style={{ fontSize: '11.5px', marginTop: '2px', color: '#64748b' }}>
                {fmtKm(kpis.totalOutRouteKm)} luar rute
              </div>
            </div>
          </div>

          {/* Bottom Progress Bar - 6px uniform bottom */}
          <div style={{ marginTop: '14px' }}>
            <div style={{
              height: '6px',
              borderRadius: '3px',
              background: '#f1f5f9',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, Math.max(0, kpis.kesesuaianPct || 0))}%`,
                background: kesesuaianColor,
                borderRadius: '3px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Render: Chart Section (Harmonized with Laporan & Coverage styling) ──────
  const renderChartSection = () => {
    const isJarak = selectedMetric === 'Jarak'
    const isPct = measureMode === '%'

    // Title
    const chartTitle = viewMode === 'Perbandingan'
      ? `Analisis Perbandingan Kepatuhan Rute - ${isJarak ? 'Jarak Patroli' : 'Kesesuaian Rute'}`
      : `Grafik Tren 6 Bulan Kepatuhan Rute - ${isJarak ? 'Jarak Patroli' : 'Kesesuaian Rute'}`

    return (
      <div style={{
        background: '#ffffff',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        padding: '16px 20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        fontFamily: "'Poppins', sans-serif",
        marginBottom: '16px'
      }}>
        {/* Header Row 1: Title & Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '10px' }}>
          <h3 style={{
            margin: 0,
            fontSize: '18.5px',
            fontWeight: 700,
            color: '#172B4D',
            lineHeight: 1.2
          }}>
            {chartTitle}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* View Mode Toggle: Perbandingan / Tren 6 Bulan */}
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              {(['Perbandingan', 'Tren 6 Bulan'] as const).map(mode => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => { setViewMode(mode); setDrilldownEntity(null); setSummaryPage(1) }}
                  style={{
                    padding: '5px 12px',
                    border: viewMode === mode ? '1px solid #bfdbfe' : 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: viewMode === mode ? '#eff6ff' : 'transparent',
                    color: viewMode === mode ? '#2563eb' : '#64748B',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Measure Mode Toggle: % / Km */}
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              {(['%', 'Km'] as const).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMeasureMode(m)}
                  style={{
                    padding: '5px 10px',
                    border: measureMode === m ? '1px solid #bfdbfe' : 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: measureMode === m ? '#eff6ff' : 'transparent',
                    color: measureMode === m ? '#2563eb' : '#64748B',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Header Row 2: Scope Label & Compact Legend Above Plot */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <div style={{ fontSize: '12.5px', color: '#64748B' }}>
            Scope: <strong>{groupLabel}</strong> · Metrik:{' '}
            <strong style={{ color: isJarak ? getRouteThresholdColor(kpis.jarakPct) : getRouteThresholdColor(kpis.kesesuaianPct) }}>
              {isJarak ? 'Jarak Patroli' : 'Kesesuaian Rute'} ({isPct ? 'Rasio %' : 'Kilometer'})
            </strong>
          </div>

          {/* Compact Legend Above Plot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: '#475569', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
              <span>Rendah (≥90%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#d97706', display: 'inline-block' }} />
              <span>Sedang (70–&lt;90%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#dc2626', display: 'inline-block' }} />
              <span>Tinggi (&lt;70%)</span>
            </div>
            {isPct && isJarak && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '16px', height: '0px', borderTop: '2px dashed #0284c7', display: 'inline-block' }} />
                <span>Baseline (100%)</span>
              </div>
            )}
            {!isPct && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#94a3b8', display: 'inline-block' }} />
                <span>Baseline / Pembanding</span>
              </div>
            )}
          </div>
        </div>

        {/* Plot Area */}
        {viewMode === 'Perbandingan' ? renderComparisonPlot() : renderTrendPlot()}
      </div>
    )
  }

  // ── Render: Perbandingan Plot (Evenly distributed bars across plot) ─────────
  const renderComparisonPlot = () => {
    const cats = compData.categories
    if (cats.length === 0) {
      return (
        <div style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
          Tidak ada data kepatuhan rute dalam scope ini.
        </div>
      )
    }

    const PLOT_H = 225
    const isJarak = selectedMetric === 'Jarak'
    const isPct = measureMode === '%'

    // Values & max calculation
    const values = cats.map(c => isPct
      ? (isJarak ? (c.jarakPct ?? 0) : (c.kesesuaianPct ?? 0))
      : (isJarak ? c.actualKm : c.inRouteKm)
    )
    const baselines = isPct ? [] : cats.map(c => isJarak ? c.baselineKm : c.actualKm)
    const maxVal = Math.max(...values, ...(baselines.length ? baselines : [0]), 1)

    // Clean axis ticks per Section 5: avoid 24%, 48%, 72%!
    let ticks: number[] = []
    let yMax = 100

    if (isPct) {
      if (maxVal <= 100) {
        yMax = 100
        ticks = [100, 80, 60, 40, 20, 0]
      } else if (maxVal <= 120) {
        yMax = 120
        ticks = [120, 100, 80, 60, 40, 20, 0]
      } else if (maxVal <= 150) {
        yMax = 150
        ticks = [150, 125, 100, 75, 50, 25, 0]
      } else {
        yMax = Math.ceil(maxVal / 50) * 50
        ticks = Array.from({ length: 6 }, (_, i) => Math.round(yMax * (1 - i / 5)))
      }
    } else {
      // Km mode
      const step = maxVal > 500 ? 100 : maxVal > 200 ? 50 : maxVal > 100 ? 25 : maxVal > 50 ? 10 : 5
      yMax = Math.ceil(maxVal / step) * step || 50
      const count = 5
      ticks = Array.from({ length: count + 1 }, (_, i) => Math.round(yMax * (1 - i / count)))
    }

    return (
      <div style={{ position: 'relative', height: '280px', paddingLeft: '50px', paddingTop: '25px', paddingBottom: '30px' }}>
        {/* Y-Axis Ticks */}
        <div style={{
          position: 'absolute', left: 0, top: '25px', height: `${PLOT_H}px`, width: '45px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end',
          borderRight: '1.5px solid #64748b', paddingRight: '6px'
        }}>
          {ticks.map(t => (
            <span key={t} style={{ fontSize: '0.675rem', color: '#64748b', fontWeight: 600, transform: 'translateY(-50%)', lineHeight: 1 }}>
              {isPct ? `${t}%` : t.toLocaleString('id-ID')}
            </span>
          ))}
        </div>

        {/* Horizontal Gridlines */}
        <div style={{ position: 'absolute', left: '50px', right: 0, top: '25px', height: `${PLOT_H}px`, pointerEvents: 'none' }}>
          {ticks.map((t, idx) => (
            <div
              key={t}
              style={{
                position: 'absolute',
                top: `${(idx / (ticks.length - 1)) * 100}%`,
                left: 0,
                right: 0,
                borderTop: t === 0 ? '1.5px solid #64748b' : '1px dashed #e2e8f0'
              }}
            />
          ))}

          {/* 100% Baseline Line in % Mode */}
          {isPct && yMax >= 100 && (
            <div
              style={{
                position: 'absolute',
                top: `${((yMax - 100) / yMax) * 100}%`,
                left: 0,
                right: 0,
                borderTop: '2px dashed #0284c7',
                opacity: 0.6
              }}
            />
          )}
        </div>

        {/* Proportionally Distributed Bars Container */}
        <div style={{
          position: 'relative',
          height: `${PLOT_H}px`,
          display: 'grid',
          gridTemplateColumns: `repeat(${cats.length}, minmax(0, 1fr))`,
          gap: '0.75rem'
        }}>
          {cats.map(cat => {
            const rawPct = isJarak ? cat.jarakPct : cat.kesesuaianPct
            const valKm = isJarak ? cat.actualKm : cat.inRouteKm
            const baselineKm = isJarak ? cat.baselineKm : cat.actualKm
            const valPlot = isPct ? (rawPct ?? 0) : valKm

            // Threshold color derived from percentage ratio per Section 3 & 5
            const barColor = getRouteThresholdColor(rawPct)
            const barHPx = Math.max(3, (valPlot / yMax) * PLOT_H)
            const isSelected = drilldownEntity === cat.id

            // Tooltip text explaining numbers & threshold priority
            const tooltipText = `${cat.label}
Metrik: ${isJarak ? 'Jarak Patroli' : 'Kesesuaian Rute'}
Pencapaian: ${fmtPct(rawPct)} (Prioritas ${getRouteThresholdBadge(rawPct).label})
${isJarak ? 'Km Aktual' : 'Km Dalam Rute'}: ${fmtKm(valKm)}
${isJarak ? 'Km Baseline' : 'Total Km Aktual'}: ${fmtKm(baselineKm)}
${isJarak ? `Selisih: ${fmtDiffKm(cat.diffKm)}` : `Luar Rute: ${fmtKm(cat.outRouteKm)}`}`

            return (
              <div
                key={cat.id}
                onClick={() => handleDrilldown(cat.id)}
                title={tooltipText}
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                {/* Value Label above bar */}
                <div style={{
                  fontSize: '0.675rem',
                  fontWeight: 700,
                  color: isPct ? barColor : '#0f172a',
                  marginBottom: '4px',
                  whiteSpace: 'nowrap'
                }}>
                  {isPct ? fmtPct(rawPct) : fmtKm(valKm).replace(' km', '')}
                </div>

                {/* Main Bar */}
                <div style={{
                  width: '100%',
                  maxWidth: '48px',
                  height: `${Math.min(PLOT_H, barHPx)}px`,
                  background: barColor,
                  borderRadius: '4px 4px 0 0',
                  border: isSelected ? '2px solid #0f172a' : 'none',
                  boxShadow: isSelected ? '0 0 0 2px #bfdbfe' : 'none',
                  transition: 'height 0.2s ease, opacity 0.15s ease',
                  opacity: isSelected ? 1 : 0.9
                }} />

                {/* X-Axis Category Label */}
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
          })}
        </div>
      </div>
    )
  }

  // ── Render: Trend 6 Bulan Plot (6 Months Scope Aggregates) ──────────────────
  const renderTrendPlot = () => {
    const aggs = trendData.monthlyScopeAggregates
    if (aggs.length === 0) {
      return (
        <div style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
          Tidak ada data tren 6 bulan untuk scope ini.
        </div>
      )
    }

    const PLOT_H = 225
    const isJarak = selectedMetric === 'Jarak'
    const isPct = measureMode === '%'

    const values = aggs.map(a => isPct
      ? (isJarak ? (a.jarakPct ?? 0) : (a.kesesuaianPct ?? 0))
      : (isJarak ? a.actualKm : a.inRouteKm)
    )
    const maxVal = Math.max(...values, 1)

    let ticks: number[] = []
    let yMax = 100

    if (isPct) {
      if (maxVal <= 100) {
        yMax = 100
        ticks = [100, 80, 60, 40, 20, 0]
      } else if (maxVal <= 120) {
        yMax = 120
        ticks = [120, 100, 80, 60, 40, 20, 0]
      } else {
        yMax = Math.ceil(maxVal / 25) * 25
        ticks = Array.from({ length: 6 }, (_, i) => Math.round(yMax * (1 - i / 5)))
      }
    } else {
      const step = maxVal > 500 ? 100 : maxVal > 200 ? 50 : maxVal > 100 ? 25 : 10
      yMax = Math.ceil(maxVal / step) * step || 50
      const count = 5
      ticks = Array.from({ length: count + 1 }, (_, i) => Math.round(yMax * (1 - i / count)))
    }

    return (
      <div style={{ position: 'relative', height: '280px', paddingLeft: '50px', paddingTop: '25px', paddingBottom: '30px' }}>
        {/* Y-Axis Ticks */}
        <div style={{
          position: 'absolute', left: 0, top: '25px', height: `${PLOT_H}px`, width: '45px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end',
          borderRight: '1.5px solid #64748b', paddingRight: '6px'
        }}>
          {ticks.map(t => (
            <span key={t} style={{ fontSize: '0.675rem', color: '#64748b', fontWeight: 600, transform: 'translateY(-50%)', lineHeight: 1 }}>
              {isPct ? `${t}%` : t.toLocaleString('id-ID')}
            </span>
          ))}
        </div>

        {/* Horizontal Gridlines */}
        <div style={{ position: 'absolute', left: '50px', right: 0, top: '25px', height: `${PLOT_H}px`, pointerEvents: 'none' }}>
          {ticks.map((t, idx) => (
            <div
              key={t}
              style={{
                position: 'absolute',
                top: `${(idx / (ticks.length - 1)) * 100}%`,
                left: 0,
                right: 0,
                borderTop: t === 0 ? '1.5px solid #64748b' : '1px dashed #e2e8f0'
              }}
            />
          ))}

          {/* 100% Baseline Line */}
          {isPct && yMax >= 100 && (
            <div
              style={{
                position: 'absolute',
                top: `${((yMax - 100) / yMax) * 100}%`,
                left: 0,
                right: 0,
                borderTop: '2px dashed #0284c7',
                opacity: 0.6
              }}
            />
          )}
        </div>

        {/* Monthly Bars evenly distributed */}
        <div style={{
          position: 'relative',
          height: `${PLOT_H}px`,
          display: 'grid',
          gridTemplateColumns: `repeat(${aggs.length}, minmax(0, 1fr))`,
          gap: '1.25rem'
        }}>
          {aggs.map(a => {
            const rawPct = isJarak ? a.jarakPct : a.kesesuaianPct
            const valKm = isJarak ? a.actualKm : a.inRouteKm
            const valPlot = isPct ? (rawPct ?? 0) : valKm

            const barColor = getRouteThresholdColor(rawPct)
            const barHPx = Math.max(3, (valPlot / yMax) * PLOT_H)

            const tooltipText = `${a.label}
Metrik: ${isJarak ? 'Jarak Patroli' : 'Kesesuaian Rute'}
Pencapaian: ${fmtPct(rawPct)} (Prioritas ${getRouteThresholdBadge(rawPct).label})
${isJarak ? 'Km Aktual' : 'Km Dalam Rute'}: ${fmtKm(valKm)}
${isJarak ? `Baseline: ${fmtKm(a.baselineKm)}` : `Luar Rute: ${fmtKm(a.outRouteKm)}`}`

            return (
              <div
                key={a.yearMonth}
                title={tooltipText}
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                {/* Value label */}
                <div style={{
                  fontSize: '0.675rem',
                  fontWeight: 700,
                  color: isPct ? barColor : '#0f172a',
                  marginBottom: '4px',
                  whiteSpace: 'nowrap'
                }}>
                  {isPct ? fmtPct(rawPct) : fmtKm(valKm).replace(' km', '')}
                </div>

                {/* Bar */}
                <div style={{
                  width: '100%',
                  maxWidth: '54px',
                  height: `${Math.min(PLOT_H, barHPx)}px`,
                  background: barColor,
                  borderRadius: '4px 4px 0 0',
                  opacity: 0.92,
                  transition: 'height 0.2s ease'
                }} />

                {/* X-Axis Month Label */}
                <div style={{
                  position: 'absolute',
                  bottom: '-24px',
                  fontSize: '0.675rem',
                  fontWeight: 600,
                  color: '#475569',
                  whiteSpace: 'nowrap',
                  textAlign: 'center'
                }}>
                  {a.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ── Render: Summary Breakdown Table (Aligned with Laporan & Coverage) ────────
  const renderSummaryTable = () => {
    return (
      <div style={{
        background: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        marginBottom: '16px',
        fontFamily: "'Poppins', sans-serif"
      }}>
        {/* Table Top Bar */}
        <div style={{
          padding: '0.75rem 1rem',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
            {viewMode === 'Perbandingan'
              ? `Tabel Breakdown Perbandingan Kepatuhan Rute (${groupLabel})`
              : `Tabel Breakdown Tren 6 Bulan Kepatuhan Rute (${groupLabel})`}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              {viewMode === 'Perbandingan'
                ? `Menampilkan ${paginatedCategories.length} dari ${compData.categories.length} ${groupLabel}`
                : `Menampilkan ${paginatedTrendRows.length} dari ${trendData.rows.length} ${groupLabel}`}
            </div>
            {drilldownEntity && (
              <button
                type="button"
                onClick={() => setDrilldownEntity(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '0.2rem 0.55rem',
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '4px',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  color: '#1d4ed8',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={11} /> Reset Filter ({drilldownEntity})
              </button>
            )}
          </div>
        </div>

        {viewMode === 'Perbandingan' ? (
          /* Perbandingan Table */
          <div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                <thead>
                  <tr style={{ background: '#e2e8f0', textTransform: 'uppercase', fontSize: '0.725rem', color: '#475569', fontWeight: 700 }}>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'left' }}>{groupLabel}</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Baseline</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Aktual</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'center' }}>Jarak %</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Dalam Rute</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Luar Rute</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'center' }}>Kesesuaian %</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Selisih</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCategories.map((cat, idx) => {
                    const isSelected = drilldownEntity === cat.id
                    return (
                      <tr
                        key={cat.id}
                        onClick={() => handleDrilldown(cat.id)}
                        style={{
                          borderBottom: '1px solid #e2e8f0',
                          background: isSelected ? '#eff6ff' : (idx % 2 === 1 ? '#f8fafc' : '#ffffff'),
                          cursor: 'pointer',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <td style={{ padding: '0.65rem 0.8rem', fontWeight: 700, color: '#0f172a' }}>
                          {cat.label}
                        </td>
                        {/* All kilometer counts strictly Navy #0f172a per Section 4 & 6 */}
                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                          {fmtKm(cat.baselineKm)}
                        </td>
                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                          {fmtKm(cat.actualKm)}
                        </td>
                        {/* Jarak % follows Section 3 threshold */}
                        <td style={{
                          padding: '0.65rem 0.8rem',
                          textAlign: 'center',
                          fontWeight: 800,
                          color: getRouteThresholdColor(cat.jarakPct)
                        }}>
                          {fmtPct(cat.jarakPct)}
                        </td>
                        {/* Dalam Rute strictly navy - removed static green */}
                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                          {fmtKm(cat.inRouteKm)}
                        </td>
                        {/* Luar Rute strictly navy - removed static red */}
                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                          {fmtKm(cat.outRouteKm)}
                        </td>
                        {/* Kesesuaian % follows Section 3 threshold */}
                        <td style={{
                          padding: '0.65rem 0.8rem',
                          textAlign: 'center',
                          fontWeight: 800,
                          color: getRouteThresholdColor(cat.kesesuaianPct)
                        }}>
                          {fmtPct(cat.kesesuaianPct)}
                        </td>
                        {/* Selisih strictly navy - removed static color */}
                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                          {fmtDiffKm(cat.diffKm)}
                        </td>
                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleDrilldown(cat.id) }}
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
                            {isSelected ? '✓ Terpilih' : 'Focus 🎯'}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ background: '#f1f5f9', fontWeight: 800, borderTop: '2px solid #cbd5e1' }}>
                    <td style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Total Agregat Scope</td>
                    <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right', color: '#0f172a' }}>{fmtKm(kpis.totalBaselineKm)}</td>
                    <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right', color: '#0f172a' }}>{fmtKm(kpis.totalActualKm)}</td>
                    <td style={{ padding: '0.75rem 0.8rem', textAlign: 'center', color: getRouteThresholdColor(kpis.jarakPct) }}>
                      {fmtPct(kpis.jarakPct)}
                    </td>
                    <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right', color: '#0f172a' }}>{fmtKm(kpis.totalInRouteKm)}</td>
                    <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right', color: '#0f172a' }}>{fmtKm(kpis.totalOutRouteKm)}</td>
                    <td style={{ padding: '0.75rem 0.8rem', textAlign: 'center', color: getRouteThresholdColor(kpis.kesesuaianPct) }}>
                      {fmtPct(kpis.kesesuaianPct)}
                    </td>
                    <td style={{ padding: '0.75rem 0.8rem', textAlign: 'right', color: '#0f172a' }}>{fmtDiffKm(kpis.diffKm)}</td>
                    <td style={{ padding: '0.75rem 0.8rem', textAlign: 'center' }}>—</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Pagination Controls */}
            {compData.categories.length > summaryPageSize && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b' }}>
                <div>Halaman {summaryPage} dari {totalSummaryPages}</div>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <button
                    type="button"
                    disabled={summaryPage === 1}
                    onClick={() => setSummaryPage(p => Math.max(1, p - 1))}
                    style={{ padding: '0.2rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', cursor: summaryPage === 1 ? 'not-allowed' : 'pointer' }}
                  >
                    Sebelumnya
                  </button>
                  <button
                    type="button"
                    disabled={summaryPage >= totalSummaryPages}
                    onClick={() => setSummaryPage(p => p + 1)}
                    style={{ padding: '0.2rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', cursor: summaryPage >= totalSummaryPages ? 'not-allowed' : 'pointer' }}
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
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                <thead>
                  <tr style={{ background: '#e2e8f0', textTransform: 'uppercase', fontSize: '0.725rem', color: '#475569', fontWeight: 700 }}>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'left' }}>{groupLabel}</th>
                    {trendData.headers.map(h => (
                      <th key={h.yearMonth} style={{ padding: '0.65rem 0.8rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                        {h.label}
                      </th>
                    ))}
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'center', background: '#cbd5e1', color: '#1e293b' }}>Total 6-Bulan</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTrendRows.map((row, idx) => {
                    const isRowSelected = drilldownEntity === row.entityId
                    const isJarak = selectedMetric === 'Jarak'

                    return (
                      <tr
                        key={row.entityId}
                        onClick={() => handleDrilldown(row.entityId)}
                        style={{
                          borderBottom: '1px solid #e2e8f0',
                          background: isRowSelected ? '#eff6ff' : (idx % 2 === 1 ? '#f8fafc' : '#ffffff'),
                          cursor: 'pointer'
                        }}
                      >
                        <td style={{ padding: '0.65rem 0.8rem', fontWeight: 700, color: '#0f172a' }}>
                          {row.entityLabel}
                        </td>

                        {row.months.map(m => {
                          const valPct = isJarak ? m.jarakPct : m.kesesuaianPct
                          const valKm = isJarak ? m.actualKm : m.inRouteKm
                          const cellColor = getRouteThresholdColor(valPct)

                          return (
                            <td
                              key={m.yearMonth}
                              style={{
                                padding: '0.65rem 0.8rem',
                                textAlign: 'center',
                                fontWeight: 700
                              }}
                            >
                              {measureMode === '%' ? (
                                <span style={{ color: cellColor }}>
                                  {fmtPct(valPct)}
                                </span>
                              ) : (
                                <span style={{ color: '#0f172a', fontWeight: 600 }}>
                                  {fmtKm(valKm)}
                                </span>
                              )}
                            </td>
                          )
                        })}

                        {/* Row Total */}
                        <td style={{
                          padding: '0.65rem 0.8rem',
                          textAlign: 'center',
                          fontWeight: 800,
                          background: '#f8fafc'
                        }}>
                          {measureMode === '%' ? (
                            <span style={{ color: getRouteThresholdColor(isJarak ? row.totalJarakPct : row.totalKesesuaianPct) }}>
                              {fmtPct(isJarak ? row.totalJarakPct : row.totalKesesuaianPct)}
                            </span>
                          ) : (
                            <span style={{ color: '#0f172a' }}>
                              {fmtKm(isJarak ? row.totalActualKm : row.totalInRouteKm)}
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ background: '#f1f5f9', fontWeight: 800, borderTop: '2px solid #cbd5e1' }}>
                    <td style={{ padding: '0.75rem 0.8rem', color: '#0f172a' }}>Total Agregat Scope</td>
                    {trendData.monthlyScopeAggregates.map(m => {
                      const valPct = selectedMetric === 'Jarak' ? m.jarakPct : m.kesesuaianPct
                      const valKm = selectedMetric === 'Jarak' ? m.actualKm : m.inRouteKm
                      return (
                        <td
                          key={m.yearMonth}
                          style={{
                            padding: '0.75rem 0.8rem',
                            textAlign: 'center',
                            color: measureMode === '%' ? getRouteThresholdColor(valPct) : '#0f172a'
                          }}
                        >
                          {measureMode === '%' ? fmtPct(valPct) : fmtKm(valKm)}
                        </td>
                      )
                    })}
                    <td style={{
                      padding: '0.75rem 0.8rem',
                      textAlign: 'center',
                      background: '#cbd5e1',
                      color: measureMode === '%' ? getRouteThresholdColor(selectedMetric === 'Jarak' ? trendData.overallScopeAggregate.jarakPct : trendData.overallScopeAggregate.kesesuaianPct) : '#0f172a'
                    }}>
                      {measureMode === '%'
                        ? fmtPct(selectedMetric === 'Jarak' ? trendData.overallScopeAggregate.jarakPct : trendData.overallScopeAggregate.kesesuaianPct)
                        : fmtKm(selectedMetric === 'Jarak' ? trendData.overallScopeAggregate.actualKm : trendData.overallScopeAggregate.inRouteKm)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Pagination Controls */}
            {trendData.rows.length > summaryPageSize && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b' }}>
                <div>Halaman {summaryPage} dari {totalTrendPages}</div>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <button
                    type="button"
                    disabled={summaryPage === 1}
                    onClick={() => setSummaryPage(p => Math.max(1, p - 1))}
                    style={{ padding: '0.2rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', cursor: summaryPage === 1 ? 'not-allowed' : 'pointer' }}
                  >
                    Sebelumnya
                  </button>
                  <button
                    type="button"
                    disabled={summaryPage >= totalTrendPages}
                    onClick={() => setSummaryPage(p => p + 1)}
                    style={{ padding: '0.2rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', cursor: summaryPage >= totalTrendPages ? 'not-allowed' : 'pointer' }}
                  >
                    Berikutnya
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // ── Render: Daily Detail Table (Harmonized with Laporan section) ─────────────
  const renderDailyDetailTable = () => {
    return (
      <div style={{
        background: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        fontFamily: "'Poppins', sans-serif"
      }}>
        {/* Table Top Bar */}
        <div style={{
          padding: '0.75rem 1rem',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
            📋 Detail Patroli Harian
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Total <strong>{dailyRows.length.toLocaleString('id-ID')}</strong> hari operasional
              {drilldownEntity && <span style={{ fontWeight: 600, color: '#1d4ed8' }}> · Filter: {drilldownEntity}</span>}
            </div>
            {drilldownEntity && (
              <button
                type="button"
                onClick={() => { setDrilldownEntity(null); setDetailPage(1) }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '0.2rem 0.55rem',
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '4px',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  color: '#1d4ed8',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={11} /> Hapus Filter
              </button>
            )}
          </div>
        </div>

        {dailyRows.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
            Tidak ada data patroli harian untuk filter ini.
          </div>
        ) : (
          <div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                <thead>
                  <tr style={{ background: '#e2e8f0', textTransform: 'uppercase', fontSize: '0.725rem', color: '#475569', fontWeight: 700 }}>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'left' }}>Tanggal</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'left' }}>Estate</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'left' }}>Nopol</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Baseline</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Aktual</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'center' }}>Jarak %</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Dalam Rute</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Luar Rute</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'center' }}>Kesesuaian %</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'center' }}>GPS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedDaily.map((row, idx) => (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: '1px solid #e2e8f0',
                        background: idx % 2 === 1 ? '#f8fafc' : '#ffffff',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <td style={{ padding: '0.65rem 0.8rem', color: '#0f172a', whiteSpace: 'nowrap' }}>
                        {row.date}
                      </td>
                      <td style={{ padding: '0.65rem 0.8rem', fontWeight: 600, color: '#0f172a' }}>
                        {row.estateId}
                      </td>
                      {/* Vehicle nopol without decorative emoji per Section 6 */}
                      <td style={{ padding: '0.65rem 0.8rem', fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap' }}>
                        {row.nopol}
                      </td>
                      {/* Kilometers strictly Navy #0f172a */}
                      <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                        {fmtKm(row.baselineKm)}
                      </td>
                      <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                        {fmtKm(row.actualKm)}
                      </td>
                      {/* Jarak % follows Section 3 threshold */}
                      <td style={{
                        padding: '0.65rem 0.8rem',
                        textAlign: 'center',
                        fontWeight: 800,
                        color: getRouteThresholdColor(row.jarakPct)
                      }}>
                        {fmtPct(row.jarakPct)}
                      </td>
                      {/* Dalam Rute strictly navy - removed static green */}
                      <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                        {fmtKm(row.inRouteKm)}
                      </td>
                      {/* Luar Rute strictly navy - removed static red */}
                      <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                        {fmtKm(row.outRouteKm)}
                      </td>
                      {/* Kesesuaian % follows Section 3 threshold */}
                      <td style={{
                        padding: '0.65rem 0.8rem',
                        textAlign: 'center',
                        fontWeight: 800,
                        color: getRouteThresholdColor(row.kesesuaianPct)
                      }}>
                        {fmtPct(row.kesesuaianPct)}
                      </td>
                      {/* GPS Quality badge retains its own specific colors */}
                      <td style={{ padding: '0.65rem 0.8rem', textAlign: 'center' }}>
                        <span style={{
                          fontSize: '0.725rem',
                          fontWeight: 600,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          background: row.gpsQuality === 'Good' ? '#f0fdf4' : row.gpsQuality === 'Degraded' ? '#fffbeb' : '#fef2f2',
                          color: row.gpsQuality === 'Good' ? '#16a34a' : row.gpsQuality === 'Degraded' ? '#d97706' : '#dc2626',
                          border: `1px solid ${row.gpsQuality === 'Good' ? '#bbf7d0' : row.gpsQuality === 'Degraded' ? '#fde68a' : '#fecaca'}`
                        }}>
                          {row.gpsQuality}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalDetailPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b' }}>
                <div>Halaman {detailPage} dari {totalDetailPages}</div>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <button
                    type="button"
                    disabled={detailPage === 1}
                    onClick={() => setDetailPage(p => Math.max(1, p - 1))}
                    style={{ padding: '0.2rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', cursor: detailPage === 1 ? 'not-allowed' : 'pointer' }}
                  >
                    Sebelumnya
                  </button>
                  <button
                    type="button"
                    disabled={detailPage >= totalDetailPages}
                    onClick={() => setDetailPage(p => p + 1)}
                    style={{ padding: '0.2rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', cursor: detailPage >= totalDetailPages ? 'not-allowed' : 'pointer' }}
                  >
                    Berikutnya
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // ── Main Render ─────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* 1. TOP: Two Metric Cards (Sole Metric Selectors) */}
      {renderMetricCards()}

      {/* 2. MIDDLE: Chart Section */}
      {renderChartSection()}

      {/* 3. SUMMARY BREAKDOWN TABLE */}
      {renderSummaryTable()}

      {/* 4. BOTTOM: Daily Detail Table */}
      {renderDailyDetailTable()}
    </div>
  )
}
