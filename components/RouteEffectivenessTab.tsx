'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { GlobalFilterState } from '@/lib/types'
import {
  selectRouteEffectivenessKpis,
  selectRouteComparison,
  selectRouteTrendTable,
  selectRouteDailyDetail,
  RouteComparisonCategoryItem
} from '@/lib/selectors'

interface RouteEffectivenessTabProps {
  globalFilters: GlobalFilterState
}

// ── Formatting helpers (Indonesian) ─────────────────────────────────────────
function fmtPct(v: number | null): string {
  if (v === null || v === undefined || isNaN(v)) return '—'
  return v.toFixed(1).replace('.', ',') + '%'
}
function fmtKm(v: number): string {
  if (v === undefined || v === null || isNaN(v)) return '0 km'
  return v.toLocaleString('id-ID', { maximumFractionDigits: 1 }) + ' km'
}
function fmtDiffKm(v: number): string {
  const sign = v >= 0 ? '+' : ''
  return sign + v.toLocaleString('id-ID', { maximumFractionDigits: 1 }) + ' km'
}

// ── Main component ───────────────────────────────────────────────────────────
export default function RouteEffectivenessTab({ globalFilters }: RouteEffectivenessTabProps) {
  // State
  const [selectedMetric, setSelectedMetric] = useState<'Jarak' | 'Kesesuaian'>('Jarak')
  const [viewMode, setViewMode] = useState<'Perbandingan' | 'Tren 6 Bulan'>('Perbandingan')
  const [measureMode, setMeasureMode] = useState<'%' | 'Km'>('%')
  const [drilldownEntity, setDrilldownEntity] = useState<string | null>(null)
  const [detailPage, setDetailPage] = useState(1)
  const [showInfoPopover, setShowInfoPopover] = useState(false)
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

  const handleDrilldown = (entityId: string) => {
    setDrilldownEntity(prev => prev === entityId ? null : entityId)
    setDetailPage(1)
  }

  // ── Render: Summary Cards ──────────────────────────────────────────────────
  const renderSummaryCards = () => (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
      background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: '1.25rem', overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Info icon */}
      <button
        onClick={() => setShowInfoPopover(p => !p)}
        onBlur={() => setTimeout(() => setShowInfoPopover(false), 200)}
        style={{
          position: 'absolute', top: 10, right: 12, zIndex: 2,
          width: 24, height: 24, borderRadius: '50%', border: '1px solid #cbd5e1',
          background: '#f8fafc', color: '#475569', fontSize: '0.75rem',
          fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
        title="Metrik & Formula"
      >i</button>
      {showInfoPopover && (
        <div style={{
          position: 'absolute', top: 38, right: 12, zIndex: 10,
          background: '#0f172a', color: '#e2e8f0', padding: '0.85rem 1.1rem',
          borderRadius: 8, fontSize: '0.78rem', lineHeight: 1.5, maxWidth: 350,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
        }}>
          <div style={{ fontWeight: 700, marginBottom: 6, color: '#f8fafc', fontSize: '0.85rem' }}>Formula & Metrik</div>
          <div><strong>Jarak Patroli (%)</strong> = Total Jarak Aktual / Total Jarak Baseline × 100%</div>
          <div style={{ marginTop: 4 }}><strong>Kesesuaian Rute (%)</strong> = Total Jarak Dalam Rute / Total Jarak Aktual × 100%</div>
          <div style={{ marginTop: 8, fontSize: '0.72rem', color: '#94a3b8' }}>
            Agregat dihitung dari rasio total jarak (ratio-of-sums), bukan rata-rata persentase harian. Melebihi baseline tidak otomatis berarti rute terpenuhi.
          </div>
        </div>
      )}

      {/* Jarak Patroli card */}
      <div
        onClick={() => setSelectedMetric('Jarak')}
        style={{
          padding: '1rem 1.25rem', cursor: 'pointer',
          borderRight: '1px solid #e2e8f0',
          background: selectedMetric === 'Jarak' ? '#f0fdf4' : '#ffffff',
          borderBottom: selectedMetric === 'Jarak' ? '3px solid #16a34a' : '3px solid transparent',
          transition: 'all 0.15s ease'
        }}
      >
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
          Jarak Patroli
        </div>
        <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.15 }}>
          {fmtPct(kpis.jarakPct)}
        </div>
        <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: 4 }}>
          {fmtKm(kpis.totalActualKm)} dari {fmtKm(kpis.totalBaselineKm)} baseline
        </div>
        <div style={{ fontSize: '0.72rem', color: kpis.diffKm >= 0 ? '#16a34a' : '#dc2626', fontWeight: 600, marginTop: 2 }}>
          {fmtDiffKm(kpis.diffKm)} selisih baseline
        </div>
      </div>

      {/* Kesesuaian Rute card */}
      <div
        onClick={() => setSelectedMetric('Kesesuaian')}
        style={{
          padding: '1rem 1.25rem', cursor: 'pointer',
          background: selectedMetric === 'Kesesuaian' ? '#eff6ff' : '#ffffff',
          borderBottom: selectedMetric === 'Kesesuaian' ? '3px solid #2563eb' : '3px solid transparent',
          transition: 'all 0.15s ease'
        }}
      >
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
          Kesesuaian Rute
        </div>
        <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#1e40af', lineHeight: 1.15 }}>
          {fmtPct(kpis.kesesuaianPct)}
        </div>
        <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: 4 }}>
          {fmtKm(kpis.totalInRouteKm)} dalam rute dari {fmtKm(kpis.totalActualKm)} aktual
        </div>
        <div style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 600, marginTop: 2 }}>
          {fmtKm(kpis.totalOutRouteKm)} luar rute
        </div>
      </div>
    </div>
  )

  // ── Render: Chart controls bar ─────────────────────────────────────────────
  const renderChartControls = () => (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem'
    }}>
      {/* View mode toggle */}
      <div style={{ display: 'flex', gap: '0.35rem', background: '#f1f5f9', padding: '0.2rem', borderRadius: '6px' }}>
        {(['Perbandingan', 'Tren 6 Bulan'] as const).map(mode => (
          <button key={mode} onClick={() => { setViewMode(mode); setDrilldownEntity(null) }}
            style={{
              padding: '0.35rem 0.8rem', borderRadius: '4px', border: 'none',
              fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer',
              background: viewMode === mode ? '#fff' : 'transparent',
              color: viewMode === mode ? '#0f172a' : '#64748b',
              boxShadow: viewMode === mode ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'
            }}>{mode}</button>
        ))}
      </div>
      {/* Measure mode toggle */}
      <div style={{ display: 'flex', gap: '0.35rem', background: '#f1f5f9', padding: '0.2rem', borderRadius: '6px' }}>
        {(['%', 'Km'] as const).map(m => (
          <button key={m} onClick={() => setMeasureMode(m)}
            style={{
              padding: '0.35rem 0.65rem', borderRadius: '4px', border: 'none',
              fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer',
              background: measureMode === m ? '#fff' : 'transparent',
              color: measureMode === m ? '#0f172a' : '#64748b',
              boxShadow: measureMode === m ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'
            }}>{m}</button>
        ))}
      </div>
    </div>
  )

  // ── Render: Perbandingan vertical bar chart ────────────────────────────────
  const renderComparisonChart = () => {
    const cats = compData.categories
    if (cats.length === 0) return <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Tidak ada data dalam scope ini.</div>

    const PLOT_H = 220
    const isJarak = selectedMetric === 'Jarak'
    const isPct = measureMode === '%'

    const values = cats.map(c => isPct
      ? (isJarak ? c.jarakPct ?? 0 : c.kesesuaianPct ?? 0)
      : (isJarak ? c.actualKm : c.inRouteKm)
    )
    const baselines = isPct ? undefined : cats.map(c => isJarak ? c.baselineKm : c.actualKm)
    const maxVal = Math.max(...values, ...(baselines || [0])) * 1.15
    const yMax = isPct ? Math.max(120, Math.ceil(maxVal / 10) * 10) : Math.ceil(maxVal / 50) * 50 || 100
    const barW = Math.max(24, Math.min(52, 600 / cats.length))

    const tickCount = 6
    const ticks = Array.from({ length: tickCount }, (_, i) => Math.round(yMax * (1 - i / (tickCount - 1))))

    return (
      <div style={{ position: 'relative', height: PLOT_H + 70, paddingLeft: 50, paddingTop: 25, paddingBottom: 40, marginTop: 8 }}>
        {/* Y axis */}
        <div style={{
          position: 'absolute', left: 0, top: 25, height: PLOT_H, width: 45,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end',
          borderRight: '1.5px solid #94a3b8', paddingRight: 6
        }}>
          {ticks.map(t => (
            <span key={t} style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, lineHeight: 1 }}>
              {isPct ? `${t}%` : `${t}`}
            </span>
          ))}
        </div>

        {/* Gridlines */}
        <div style={{ position: 'absolute', left: 50, right: 0, top: 25, height: PLOT_H, pointerEvents: 'none' }}>
          {ticks.map((t, i) => (
            <div key={t} style={{ position: 'absolute', top: `${(i / (tickCount - 1)) * 100}%`, left: 0, right: 0, borderTop: t === 0 ? '1.5px solid #94a3b8' : '1px dashed #e2e8f0' }} />
          ))}
          {/* Baseline reference line 100% */}
          {isPct && (
            <div style={{
              position: 'absolute',
              top: `${((yMax - 100) / yMax) * 100}%`,
              left: 0, right: 0, borderTop: '2px dashed #0284c7', opacity: 0.5
            }} />
          )}
        </div>

        {/* Bars */}
        <div style={{
          display: 'flex', gap: 6, alignItems: 'flex-end', height: PLOT_H,
          paddingLeft: 10, overflowX: 'auto', paddingBottom: 0
        }}>
          {cats.map(cat => {
            const val = isPct ? (isJarak ? cat.jarakPct ?? 0 : cat.kesesuaianPct ?? 0) : (isJarak ? cat.actualKm : cat.inRouteKm)
            const barH = Math.max(2, (val / yMax) * PLOT_H)
            const isSelected = drilldownEntity === cat.id
            const barColor = isJarak ? '#16a34a' : '#2563eb'

            return (
              <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', flex: `0 0 ${barW}px` }}
                onClick={() => handleDrilldown(cat.id)}
                title={`${cat.label}\nJarak %: ${fmtPct(cat.jarakPct)}\nKesesuaian %: ${fmtPct(cat.kesesuaianPct)}\nAktual: ${fmtKm(cat.actualKm)}\nBaseline: ${fmtKm(cat.baselineKm)}\nDalam Rute: ${fmtKm(cat.inRouteKm)}\nLuar Rute: ${fmtKm(cat.outRouteKm)}`}
              >
                {/* Value label */}
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: barColor, marginBottom: 2, whiteSpace: 'nowrap' }}>
                  {isPct ? fmtPct(isJarak ? cat.jarakPct : cat.kesesuaianPct) : fmtKm(isJarak ? cat.actualKm : cat.inRouteKm).replace(' km', '')}
                </div>
                {/* Bar */}
                <div style={{
                  width: barW - 6, height: barH, borderRadius: '3px 3px 0 0',
                  background: barColor, opacity: isSelected ? 1 : 0.8,
                  border: isSelected ? '2px solid #0f172a' : 'none',
                  transition: 'all 0.15s ease'
                }} />
                {/* X label */}
                <div style={{
                  fontSize: '0.62rem', color: isSelected ? '#0f172a' : '#64748b',
                  fontWeight: isSelected ? 700 : 500, marginTop: 4,
                  textAlign: 'center', maxWidth: barW + 4, overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap'
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

  // ── Render: Trend bar chart (6 months) ─────────────────────────────────────
  const renderTrendChart = () => {
    const aggs = trendData.monthlyScopeAggregates
    if (aggs.length === 0) return <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Tidak ada data tren.</div>

    const PLOT_H = 220
    const isJarak = selectedMetric === 'Jarak'
    const isPct = measureMode === '%'

    const values = aggs.map(a => isPct
      ? (isJarak ? a.jarakPct ?? 0 : a.kesesuaianPct ?? 0)
      : (isJarak ? a.actualKm : a.inRouteKm)
    )
    const maxVal = Math.max(...values) * 1.15
    const yMax = isPct ? Math.max(120, Math.ceil(maxVal / 10) * 10) : Math.ceil(maxVal / 100) * 100 || 100
    const barW = 64

    const tickCount = 6
    const ticks = Array.from({ length: tickCount }, (_, i) => Math.round(yMax * (1 - i / (tickCount - 1))))

    return (
      <div style={{ position: 'relative', height: PLOT_H + 70, paddingLeft: 55, paddingTop: 25, paddingBottom: 40, marginTop: 8 }}>
        {/* Y axis */}
        <div style={{
          position: 'absolute', left: 0, top: 25, height: PLOT_H, width: 50,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end',
          borderRight: '1.5px solid #94a3b8', paddingRight: 6
        }}>
          {ticks.map(t => (
            <span key={t} style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, lineHeight: 1 }}>
              {isPct ? `${t}%` : t.toLocaleString('id-ID')}
            </span>
          ))}
        </div>

        {/* Gridlines */}
        <div style={{ position: 'absolute', left: 55, right: 0, top: 25, height: PLOT_H, pointerEvents: 'none' }}>
          {ticks.map((t, i) => (
            <div key={t} style={{ position: 'absolute', top: `${(i / (tickCount - 1)) * 100}%`, left: 0, right: 0, borderTop: t === 0 ? '1.5px solid #94a3b8' : '1px dashed #e2e8f0' }} />
          ))}
        </div>

        {/* Bars */}
        <div style={{
          display: 'flex', gap: 16, alignItems: 'flex-end', height: PLOT_H,
          justifyContent: 'center'
        }}>
          {aggs.map(a => {
            const val = isPct ? (isJarak ? a.jarakPct ?? 0 : a.kesesuaianPct ?? 0) : (isJarak ? a.actualKm : a.inRouteKm)
            const barH = Math.max(2, (val / yMax) * PLOT_H)
            const color = isJarak ? '#16a34a' : '#2563eb'
            return (
              <div key={a.yearMonth} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                title={`${a.label}\nJarak %: ${fmtPct(a.jarakPct)}\nKesesuaian %: ${fmtPct(a.kesesuaianPct)}\nBaseline: ${fmtKm(a.baselineKm)}\nAktual: ${fmtKm(a.actualKm)}\nDalam Rute: ${fmtKm(a.inRouteKm)}\nLuar Rute: ${fmtKm(a.outRouteKm)}`}
              >
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color, marginBottom: 2 }}>
                  {isPct ? fmtPct(isJarak ? a.jarakPct : a.kesesuaianPct) : fmtKm(isJarak ? a.actualKm : a.inRouteKm).replace(' km', '')}
                </div>
                <div style={{
                  width: barW, height: barH, borderRadius: '4px 4px 0 0',
                  background: color, opacity: 0.85, transition: 'height 0.2s ease'
                }} />
                <div style={{ fontSize: '0.68rem', color: '#475569', fontWeight: 600, marginTop: 4 }}>
                  {a.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ── Render: Summary table (Perbandingan) ───────────────────────────────────
  const renderComparisonTable = () => {
    const cats = compData.categories
    const groupLabel = compData.groupingType === 'Vehicle' ? 'Kendaraan' : compData.groupingType === 'Region' ? 'Region' : 'Estate'

    return (
      <div style={{ overflowX: 'auto', marginTop: '0.75rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.6rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>{groupLabel}</th>
              <th style={{ padding: '0.6rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Baseline</th>
              <th style={{ padding: '0.6rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Aktual</th>
              <th style={{ padding: '0.6rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Jarak %</th>
              <th style={{ padding: '0.6rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Dalam Rute</th>
              <th style={{ padding: '0.6rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Luar Rute</th>
              <th style={{ padding: '0.6rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Kesesuaian %</th>
              <th style={{ padding: '0.6rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Selisih</th>
            </tr>
          </thead>
          <tbody>
            {cats.map(cat => {
              const isSelected = drilldownEntity === cat.id
              return (
                <tr key={cat.id}
                  onClick={() => handleDrilldown(cat.id)}
                  style={{
                    borderBottom: '1px solid #e2e8f0', cursor: 'pointer',
                    background: isSelected ? '#f0f9ff' : 'transparent',
                    fontWeight: isSelected ? 600 : 400
                  }}
                >
                  <td style={{ padding: '0.55rem 0.6rem', fontWeight: 700, textAlign: 'center' }}>{cat.label}</td>
                  <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center' }}>{cat.baselineKm.toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</td>
                  <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center', fontWeight: 700 }}>{cat.actualKm.toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</td>
                  <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>{fmtPct(cat.jarakPct)}</td>
                  <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center', color: '#16a34a', fontWeight: 600 }}>{cat.inRouteKm.toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</td>
                  <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center', color: cat.outRouteKm > 10 ? '#dc2626' : '#64748b' }}>{cat.outRouteKm.toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</td>
                  <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center', color: '#1e40af', fontWeight: 700 }}>{fmtPct(cat.kesesuaianPct)}</td>
                  <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center', color: cat.diffKm >= 0 ? '#16a34a' : '#dc2626', fontWeight: 600 }}>{fmtDiffKm(cat.diffKm)}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: '2px solid #0f172a', background: '#f8fafc', fontWeight: 700 }}>
              <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center' }}>TOTAL</td>
              <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center' }}>{kpis.totalBaselineKm.toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</td>
              <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center' }}>{kpis.totalActualKm.toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</td>
              <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center', color: '#0f172a' }}>{fmtPct(kpis.jarakPct)}</td>
              <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center', color: '#16a34a' }}>{kpis.totalInRouteKm.toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</td>
              <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center', color: '#dc2626' }}>{kpis.totalOutRouteKm.toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</td>
              <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center', color: '#1e40af' }}>{fmtPct(kpis.kesesuaianPct)}</td>
              <td style={{ padding: '0.55rem 0.6rem', textAlign: 'center', color: kpis.diffKm >= 0 ? '#16a34a' : '#dc2626' }}>{fmtDiffKm(kpis.diffKm)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

  // ── Render: Trend table (6 months) ─────────────────────────────────────────
  const renderTrendTable = () => {
    const { headers, rows, monthlyScopeAggregates: aggs, overallScopeAggregate: overall } = trendData
    const entityLabel = trendData.breakdownType === 'Vehicle' ? 'Kendaraan' : trendData.breakdownType === 'Region' ? 'Region' : 'Estate'
    const isJarak = selectedMetric === 'Jarak'

    return (
      <div style={{ overflowX: 'auto', marginTop: '0.75rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', minWidth: 700 }}>
          <thead>
            <tr style={{ background: '#f1f5f9', fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.5rem 0.6rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700, position: 'sticky', left: 0, background: '#f1f5f9', zIndex: 1 }}>{entityLabel}</th>
              {headers.map(h => (
                <th key={h.yearMonth} style={{ padding: '0.5rem 0.5rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {h.label}
                </th>
              ))}
              <th style={{ padding: '0.5rem 0.5rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700, borderLeft: '2px solid #cbd5e1' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.entityId}
                onClick={() => handleDrilldown(row.entityId)}
                style={{
                  borderBottom: '1px solid #e2e8f0', cursor: 'pointer',
                  background: drilldownEntity === row.entityId ? '#f0f9ff' : 'transparent'
                }}
              >
                <td style={{ padding: '0.5rem 0.6rem', fontWeight: 700, textAlign: 'center', position: 'sticky', left: 0, background: drilldownEntity === row.entityId ? '#f0f9ff' : '#fff', zIndex: 1 }}>
                  {row.entityLabel}
                </td>
                {row.months.map(mc => {
                  const pct = isJarak ? mc.jarakPct : mc.kesesuaianPct
                  const km = isJarak ? mc.actualKm : mc.inRouteKm
                  return (
                    <td key={mc.yearMonth} style={{ padding: '0.5rem 0.5rem', textAlign: 'center' }}>
                      {measureMode === '%' ? (
                        <span style={{ fontWeight: 600, color: isJarak ? '#0f172a' : '#1e40af' }}>
                          {fmtPct(pct)}
                        </span>
                      ) : (
                        <span style={{ fontWeight: 500 }}>{km.toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</span>
                      )}
                    </td>
                  )
                })}
                <td style={{ padding: '0.5rem 0.5rem', textAlign: 'center', borderLeft: '2px solid #cbd5e1', fontWeight: 700 }}>
                  {measureMode === '%' ? (
                    <span style={{ color: isJarak ? '#0f172a' : '#1e40af' }}>
                      {fmtPct(isJarak ? row.totalJarakPct : row.totalKesesuaianPct)}
                    </span>
                  ) : (
                    <span>{(isJarak ? row.totalActualKm : row.totalInRouteKm).toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: '2px solid #0f172a', background: '#f8fafc', fontWeight: 700 }}>
              <td style={{ padding: '0.5rem 0.6rem', textAlign: 'center', position: 'sticky', left: 0, background: '#f8fafc', zIndex: 1 }}>SCOPE</td>
              {aggs.map(a => {
                const pct = isJarak ? a.jarakPct : a.kesesuaianPct
                const km = isJarak ? a.actualKm : a.inRouteKm
                return (
                  <td key={a.yearMonth} style={{ padding: '0.5rem 0.5rem', textAlign: 'center' }}>
                    {measureMode === '%' ? (
                      <span style={{ color: isJarak ? '#0f172a' : '#1e40af' }}>{fmtPct(pct)}</span>
                    ) : (
                      <span>{km.toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</span>
                    )}
                  </td>
                )
              })}
              <td style={{ padding: '0.5rem 0.5rem', textAlign: 'center', borderLeft: '2px solid #cbd5e1' }}>
                {measureMode === '%' ? (
                  <span style={{ color: isJarak ? '#0f172a' : '#1e40af' }}>
                    {fmtPct(isJarak ? overall.jarakPct : overall.kesesuaianPct)}
                  </span>
                ) : (
                  <span>{(isJarak ? overall.actualKm : overall.inRouteKm).toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</span>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

  // ── Render: Daily detail table ─────────────────────────────────────────────
  const renderDailyDetail = () => {
    if (dailyRows.length === 0) {
      return <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>Tidak ada data rute harian untuk scope ini.</div>
    }
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
            Total {dailyRows.length.toLocaleString('id-ID')} hari operasional
            {drilldownEntity && <span style={{ fontWeight: 600, color: '#0f172a' }}> · Filter: {drilldownEntity}</span>}
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', minWidth: 800 }}>
            <thead>
              <tr style={{ background: '#f1f5f9', fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.55rem 0.5rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Tanggal</th>
                <th style={{ padding: '0.55rem 0.5rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Estate</th>
                <th style={{ padding: '0.55rem 0.5rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Nopol</th>
                <th style={{ padding: '0.55rem 0.5rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Baseline</th>
                <th style={{ padding: '0.55rem 0.5rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Aktual</th>
                <th style={{ padding: '0.55rem 0.5rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Jarak %</th>
                <th style={{ padding: '0.55rem 0.5rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Dalam Rute</th>
                <th style={{ padding: '0.55rem 0.5rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Luar Rute</th>
                <th style={{ padding: '0.55rem 0.5rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>Kesesuaian %</th>
                <th style={{ padding: '0.55rem 0.5rem', textAlign: 'center', verticalAlign: 'middle', fontWeight: 700 }}>GPS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDaily.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.5rem', whiteSpace: 'nowrap', textAlign: 'center' }}>{row.date}</td>
                  <td style={{ padding: '0.5rem', fontWeight: 600, textAlign: 'center' }}>{row.estateId}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600, color: '#0f172a' }}>
                      {row.vehicleType === 'Car' ? '🚗' : '🏍️'} {row.nopol}
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>{row.baselineKm.toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center', fontWeight: 700 }}>{row.actualKm.toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>{fmtPct(row.jarakPct)}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center', color: '#16a34a', fontWeight: 600 }}>{row.inRouteKm.toLocaleString('id-ID', { maximumFractionDigits: 1 })} km</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center', color: row.outRouteKm > 5 ? '#dc2626' : '#64748b', fontWeight: row.outRouteKm > 5 ? 700 : 400 }}>
                    {row.outRouteKm.toLocaleString('id-ID', { maximumFractionDigits: 1 })} km
                  </td>
                  <td style={{ padding: '0.5rem', textAlign: 'center', color: '#1e40af', fontWeight: 700 }}>{fmtPct(row.kesesuaianPct)}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '0.68rem', fontWeight: 600, padding: '0.15rem 0.4rem', borderRadius: 4,
                      background: row.gpsQuality === 'Good' ? '#f0fdf4' : row.gpsQuality === 'Degraded' ? '#fffbeb' : '#fef2f2',
                      color: row.gpsQuality === 'Good' ? '#16a34a' : row.gpsQuality === 'Degraded' ? '#d97706' : '#dc2626'
                    }}>{row.gpsQuality}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalDetailPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.78rem' }}>
            <button disabled={detailPage === 1} onClick={() => setDetailPage(p => Math.max(1, p - 1))}
              style={{ padding: '0.3rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: 4, background: '#fff', cursor: detailPage === 1 ? 'not-allowed' : 'pointer', opacity: detailPage === 1 ? 0.5 : 1 }}>Prev</button>
            <span style={{ color: '#475569' }}>Hal {detailPage} / {totalDetailPages}</span>
            <button disabled={detailPage === totalDetailPages} onClick={() => setDetailPage(p => Math.min(totalDetailPages, p + 1))}
              style={{ padding: '0.3rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: 4, background: '#fff', cursor: detailPage === totalDetailPages ? 'not-allowed' : 'pointer', opacity: detailPage === totalDetailPages ? 0.5 : 1 }}>Next</button>
          </div>
        )}
      </div>
    )
  }

  // ── Main Render ────────────────────────────────────────────────────────────
  return (
    <div>
      {/* TOP: Summary Cards */}
      {renderSummaryCards()}

      {/* MIDDLE: Chart + Summary Table */}
      <div style={{
        background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0',
        padding: '1.25rem', marginBottom: '1.25rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        {renderChartControls()}
        {viewMode === 'Perbandingan' ? renderComparisonChart() : renderTrendChart()}
        {viewMode === 'Perbandingan' ? renderComparisonTable() : renderTrendTable()}
      </div>

      {/* BOTTOM: Daily Detail Table */}
      <div style={{
        background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0',
        padding: '1.25rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
            📋 Detail Patroli Harian
          </h3>
          {drilldownEntity && (
            <button onClick={() => { setDrilldownEntity(null); setDetailPage(1) }}
              style={{
                padding: '0.3rem 0.65rem', borderRadius: 4, border: '1px solid #cbd5e1',
                background: '#f8fafc', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, color: '#475569'
              }}>
              ✕ Hapus Filter: {drilldownEntity}
            </button>
          )}
        </div>
        {renderDailyDetail()}
      </div>
    </div>
  )
}
