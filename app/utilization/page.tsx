'use client'

// SmartTrack - Monitoring Utilisasi Kendaraan & GPS
import React, { useState, useMemo } from 'react'
import PageShell from '@/components/PageShell'
import HierarchyFilterBar, { HierarchyFilterState, PeriodPreset, formatCustomDateRangeLabel } from '@/components/HierarchyFilterBar'
import {
  Car,
  Wifi,
  Navigation,
  Clock,
  Square,
  Search,
  ChevronRight,
  ChevronLeft,
  Users,
  Truck,
  Bike,
  X
} from 'lucide-react'
import {
  getFilteredVehicles,
  getFilteredPatrolRuns,
  getFilteredPatrolReports,
  getFilteredExceptions,
  getFilteredEstates
} from '@/lib/selectors'
import { GlobalFilterState, VehicleEntity } from '@/lib/types'
import { buildAllDamageIncidents } from '@/lib/damage-incidents'
import { IMPORTED_TRACKS_MAP, ImportedGpsPoint } from '@/lib/imported-tracking'

// ── Indonesian Formatting Helpers ───────────────────────────────────────────
function fmtKm(v: number | null | undefined): string {
  if (v === undefined || v === null || isNaN(v)) return '—'
  return v.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' km'
}

function fmtKmRaw(v: number | null | undefined): string {
  if (v === undefined || v === null || isNaN(v)) return '—'
  return v.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}

function formatDurationJamMenit(totalMins: number | null | undefined): string {
  if (totalMins === undefined || totalMins === null || isNaN(totalMins)) return '—'
  const h = Math.floor(totalMins / 60)
  const m = Math.round(totalMins % 60)
  return `${h} jam ${m} m`
}

function formatDurationHmMini(totalMins: number): string {
  if (!totalMins || isNaN(totalMins) || totalMins <= 0) return '0 j 00 m'
  const h = Math.floor(totalMins / 60)
  const m = Math.round(totalMins % 60)
  return `${h} j ${m < 10 ? '0' : ''}${m} m`
}

function formatDurationHmFull(totalMins: number): string {
  if (!totalMins || isNaN(totalMins) || totalMins <= 0) return '0 jam 0 menit'
  const h = Math.floor(totalMins / 60)
  const m = Math.round(totalMins % 60)
  return `${h} jam ${m} menit`
}

function formatDateIndo(dateStr: string): string {
  if (!dateStr || dateStr === '-') return '-'
  const parts = dateStr.split('-')
  if (parts.length !== 3) return dateStr
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  const mIndex = parseInt(parts[1], 10) - 1
  return `${parts[2]} ${monthNames[mIndex] || parts[1]} ${parts[0]}`
}

// ── Shift Distribution & Tracking Calculations ──────────────────────────────
function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function parseTrackTimeMs(tStr: string): number {
  return new Date(tStr.replace(' ', 'T')).getTime()
}

/** Shift 1: 07:00–15:00 · Shift 2: 15:00–23:00 · Shift 3: 23:00–07:00 (+1) */
function getShiftForTimestamp(ts: number): 1 | 2 | 3 {
  const d = new Date(ts)
  const mins = d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60
  if (mins >= 420 && mins < 900) return 1
  if (mins >= 900 && mins < 1380) return 2
  return 3
}

interface IntervalSlice {
  start: number
  end: number
  durationMs: number
  shift: 1 | 2 | 3
}

function splitIntervalByShift(tA: number, tB: number): IntervalSlice[] {
  const slices: IntervalSlice[] = []
  let cur = tA
  while (cur < tB) {
    const d = new Date(cur)
    const y = d.getFullYear()
    const m = d.getMonth()
    const day = d.getDate()

    const b07 = new Date(y, m, day, 7, 0, 0).getTime()
    const b15 = new Date(y, m, day, 15, 0, 0).getTime()
    const b23 = new Date(y, m, day, 23, 0, 0).getTime()
    const bNext07 = new Date(y, m, day + 1, 7, 0, 0).getTime()

    const candidates = [b07, b15, b23, bNext07].filter(b => b > cur && b < tB).sort((a, b) => a - b)
    const nextCut = candidates.length > 0 ? candidates[0] : tB

    const midPoint = (cur + nextCut) / 2
    const shift = getShiftForTimestamp(midPoint)
    slices.push({
      start: cur,
      end: nextCut,
      durationMs: nextCut - cur,
      shift
    })
    cur = nextCut
  }
  return slices
}

export interface ShiftDistributionResult {
  hasShift1: boolean
  hasShift2: boolean
  hasShift3: boolean
  shift1Km: number | null
  shift2Km: number | null
  shift3Km: number | null
  shift1MovingMins: number | null
  shift2MovingMins: number | null
  shift3MovingMins: number | null
  shift1StoppingMins: number | null
  shift2StoppingMins: number | null
  shift3StoppingMins: number | null
  totalKm: number
  totalMovingMins: number
  totalStoppingMins: number
  isCompleteDay: boolean
}

/** Compute authentic shift breakdown from actual GPS points */
function computeShiftBreakdownFromPoints(points: ImportedGpsPoint[]): ShiftDistributionResult {
  if (!points || points.length === 0) {
    return {
      hasShift1: false,
      hasShift2: false,
      hasShift3: false,
      shift1Km: null,
      shift2Km: null,
      shift3Km: null,
      shift1MovingMins: null,
      shift2MovingMins: null,
      shift3MovingMins: null,
      shift1StoppingMins: null,
      shift2StoppingMins: null,
      shift3StoppingMins: null,
      totalKm: 0,
      totalMovingMins: 0,
      totalStoppingMins: 0,
      isCompleteDay: false
    }
  }

  const shiftKm = { 1: 0, 2: 0, 3: 0 }
  const shiftMov = { 1: 0, 2: 0, 3: 0 }
  const shiftStp = { 1: 0, 2: 0, 3: 0 }
  const shiftHasData = { 1: false, 2: false, 3: false }

  const firstT = parseTrackTimeMs(points[0].time)
  if (!isNaN(firstT)) {
    shiftHasData[getShiftForTimestamp(firstT)] = true
  }

  for (let i = 1; i < points.length; i++) {
    const pPrev = points[i - 1]
    const pCurr = points[i]
    const tA = parseTrackTimeMs(pPrev.time)
    const tB = parseTrackTimeMs(pCurr.time)
    if (isNaN(tA) || isNaN(tB) || tB <= tA) continue

    const totalDurMs = tB - tA
    const dist = haversineKm(pPrev.lat, pPrev.lng, pCurr.lat, pCurr.lng)
    const isMoving = pCurr.speed > 0 || pPrev.speed > 0 || dist > 0.05

    const slices = splitIntervalByShift(tA, tB)
    for (const slice of slices) {
      const frac = slice.durationMs / totalDurMs
      const durMins = slice.durationMs / (1000 * 60)
      const pieceDist = dist * frac
      const s = slice.shift

      shiftHasData[s] = true
      shiftKm[s] += pieceDist
      if (isMoving) {
        shiftMov[s] += durMins
      } else {
        shiftStp[s] += durMins
      }
    }
  }

  const s1Km = shiftHasData[1] ? Math.round(shiftKm[1] * 10) / 10 : null
  const s2Km = shiftHasData[2] ? Math.round(shiftKm[2] * 10) / 10 : null
  const s3Km = shiftHasData[3] ? Math.round(shiftKm[3] * 10) / 10 : null

  const s1Mov = shiftHasData[1] ? Math.round(shiftMov[1]) : null
  const s2Mov = shiftHasData[2] ? Math.round(shiftMov[2]) : null
  const s3Mov = shiftHasData[3] ? Math.round(shiftMov[3]) : null

  const s1Stp = shiftHasData[1] ? Math.round(shiftStp[1]) : null
  const s2Stp = shiftHasData[2] ? Math.round(shiftStp[2]) : null
  const s3Stp = shiftHasData[3] ? Math.round(shiftStp[3]) : null

  const totalKm = Math.round(((s1Km ?? 0) + (s2Km ?? 0) + (s3Km ?? 0)) * 10) / 10
  const totalMovingMins = (s1Mov ?? 0) + (s2Mov ?? 0) + (s3Mov ?? 0)
  const totalStoppingMins = (s1Stp ?? 0) + (s2Stp ?? 0) + (s3Stp ?? 0)

  const isCompleteDay = shiftHasData[1] && shiftHasData[2] && shiftHasData[3]

  return {
    hasShift1: shiftHasData[1],
    hasShift2: shiftHasData[2],
    hasShift3: shiftHasData[3],
    shift1Km: s1Km,
    shift2Km: s2Km,
    shift3Km: s3Km,
    shift1MovingMins: s1Mov,
    shift2MovingMins: s2Mov,
    shift3MovingMins: s3Mov,
    shift1StoppingMins: s1Stp,
    shift2StoppingMins: s2Stp,
    shift3StoppingMins: s3Stp,
    totalKm,
    totalMovingMins,
    totalStoppingMins,
    isCompleteDay
  }
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

/** Distribute dummy patrol usage across 3 shifts with realistic operational variations */
function distributeDummyShifts(key: string, baseKm: number, baseMov: number, baseStp: number): ShiftDistributionResult {
  const h = hashString(key)
  const pattern = h % 6

  let s1Km: number = 0
  let s2Km: number = 0
  let s3Km: number | null = 0

  let s1Mov: number = 0
  let s2Mov: number = 0
  let s3Mov: number | null = 0

  let s1Stp: number = 0
  let s2Stp: number = 0
  let s3Stp: number | null = 0

  let hasShift1 = true
  let hasShift2 = true
  let hasShift3 = true
  let isCompleteDay = true

  if (pattern === 0) {
    // Pattern 0: Night Security Intensive (Shift 1 = 25%, Shift 2 = 25%, Shift 3 = 50%)
    // Contoh user: Total Moving 8 jam -> Shift 1 = 2 jam, Shift 2 = 2 jam, Shift 3 = 4 jam
    s1Km = Math.round(baseKm * 0.25 * 10) / 10
    s2Km = Math.round(baseKm * 0.25 * 10) / 10
    s3Km = Math.round((baseKm - s1Km - s2Km) * 10) / 10

    s1Mov = Math.round(baseMov * 0.25)
    s2Mov = Math.round(baseMov * 0.25)
    s3Mov = baseMov - s1Mov - s2Mov

    s1Stp = Math.round(baseStp * 0.30)
    s2Stp = Math.round(baseStp * 0.30)
    s3Stp = baseStp - s1Stp - s2Stp
  } else if (pattern === 1) {
    // Pattern 1: Daytime Core Inspection Patrol (50%, 35%, 15%)
    s1Km = Math.round(baseKm * 0.50 * 10) / 10
    s2Km = Math.round(baseKm * 0.35 * 10) / 10
    s3Km = Math.round((baseKm - s1Km - s2Km) * 10) / 10

    s1Mov = Math.round(baseMov * 0.50)
    s2Mov = Math.round(baseMov * 0.35)
    s3Mov = baseMov - s1Mov - s2Mov

    s1Stp = Math.round(baseStp * 0.40)
    s2Stp = Math.round(baseStp * 0.35)
    s3Stp = baseStp - s1Stp - s2Stp
  } else if (pattern === 2) {
    // Pattern 2: 24/7 Balanced Estate Rounds (35%, 35%, 30%)
    s1Km = Math.round(baseKm * 0.35 * 10) / 10
    s2Km = Math.round(baseKm * 0.35 * 10) / 10
    s3Km = Math.round((baseKm - s1Km - s2Km) * 10) / 10

    s1Mov = Math.round(baseMov * 0.35)
    s2Mov = Math.round(baseMov * 0.35)
    s3Mov = baseMov - s1Mov - s2Mov

    s1Stp = Math.round(baseStp * 0.35)
    s2Stp = Math.round(baseStp * 0.35)
    s3Stp = baseStp - s1Stp - s2Stp
  } else if (pattern === 3) {
    // Pattern 3: Day + Afternoon Active, Night Standby at Guard Pos (Valid 0!)
    s1Km = Math.round(baseKm * 0.55 * 10) / 10
    s2Km = Math.round((baseKm - s1Km) * 10) / 10
    s3Km = 0.0

    s1Mov = Math.round(baseMov * 0.55)
    s2Mov = baseMov - s1Mov
    s3Mov = 0

    s1Stp = Math.round(baseStp * 0.35)
    s2Stp = Math.round(baseStp * 0.35)
    s3Stp = baseStp - s1Stp - s2Stp
  } else if (pattern === 4) {
    // Pattern 4: Morning & Night Security Patrol, Light Afternoon (45%, 15%, 40%)
    s1Km = Math.round(baseKm * 0.45 * 10) / 10
    s2Km = Math.round(baseKm * 0.15 * 10) / 10
    s3Km = Math.round((baseKm - s1Km - s2Km) * 10) / 10

    s1Mov = Math.round(baseMov * 0.45)
    s2Mov = Math.round(baseMov * 0.15)
    s3Mov = baseMov - s1Mov - s2Mov

    s1Stp = Math.round(baseStp * 0.40)
    s2Stp = Math.round(baseStp * 0.20)
    s3Stp = baseStp - s1Stp - s2Stp
  } else {
    // Pattern 5: 2 Shifts Scheduled, Shift 3 Unavailable / Not scheduled (partial day)
    s1Km = Math.round(baseKm * 0.60 * 10) / 10
    s2Km = Math.round((baseKm - s1Km) * 10) / 10
    s3Km = null
    hasShift3 = false

    s1Mov = Math.round(baseMov * 0.60)
    s2Mov = baseMov - s1Mov
    s3Mov = null

    s1Stp = Math.round(baseStp * 0.55)
    s2Stp = baseStp - s1Stp
    s3Stp = null

    isCompleteDay = false
  }

  // Exact Sum of shifts: Total = Shift 1 + Shift 2 + Shift 3
  const totalKm = Math.round(((hasShift1 && s1Km !== null ? s1Km : 0) + (hasShift2 && s2Km !== null ? s2Km : 0) + (hasShift3 && s3Km !== null ? s3Km : 0)) * 10) / 10
  const totalMovingMins = (hasShift1 && s1Mov !== null ? s1Mov : 0) + (hasShift2 && s2Mov !== null ? s2Mov : 0) + (hasShift3 && s3Mov !== null ? s3Mov : 0)
  const totalStoppingMins = (hasShift1 && s1Stp !== null ? s1Stp : 0) + (hasShift2 && s2Stp !== null ? s2Stp : 0) + (hasShift3 && s3Stp !== null ? s3Stp : 0)

  return {
    hasShift1,
    hasShift2,
    hasShift3,
    shift1Km: s1Km,
    shift2Km: s2Km,
    shift3Km: s3Km,
    shift1MovingMins: s1Mov,
    shift2MovingMins: s2Mov,
    shift3MovingMins: s3Mov,
    shift1StoppingMins: s1Stp,
    shift2StoppingMins: s2Stp,
    shift3StoppingMins: s3Stp,
    totalKm,
    totalMovingMins,
    totalStoppingMins,
    isCompleteDay
  }
}

export type UtilizationCardKey = 'vehicle' | 'gps' | 'mileage' | 'moving' | 'stopping'

// ── Extremum Record & Helper Types ──────────────────────────────────────────
export interface ExtremumRecord {
  val: number
  date: string
  estateId: string
  vehicleId: string
  nopol: string
  shift?: 'Shift 1' | 'Shift 2' | 'Shift 3'
}

export interface ExtremumData {
  primary: ExtremumRecord | null
  allMatches: ExtremumRecord[]
  count: number
}

export function findExtremum(
  records: Array<{
    val: number | null | undefined
    date: string
    estateId: string
    vehicleId: string
    nopol: string
    shift?: 'Shift 1' | 'Shift 2' | 'Shift 3'
  }>,
  mode: 'min' | 'max'
): ExtremumData {
  const valid = records.filter(
    (r): r is typeof r & { val: number } =>
      r.val !== null && r.val !== undefined && !isNaN(r.val)
  )

  if (valid.length === 0) {
    return { primary: null, allMatches: [], count: 0 }
  }

  let extremeVal = valid[0].val
  for (let i = 1; i < valid.length; i++) {
    const v = valid[i].val
    if (mode === 'min') {
      if (v < extremeVal) extremeVal = v
    } else {
      if (v > extremeVal) extremeVal = v
    }
  }

  const EPSILON = 0.0001
  const matches = valid.filter(r => Math.abs(r.val - extremeVal) < EPSILON)

  // Sort: newest date first, then nopol ascending
  matches.sort((a, b) => b.date.localeCompare(a.date) || a.nopol.localeCompare(b.nopol))

  return {
    primary: matches[0],
    allMatches: matches,
    count: matches.length
  }
}

// ── Summary Card Component for Terendah/Tertinggi Harian ─────────────────────
function ExtremumCard({
  label,
  borderColor,
  data,
  unitType,
  onSelect,
  onOpenTieModal
}: {
  label: 'TERENDAH HARIAN' | 'TERTINGGI HARIAN'
  borderColor: string
  data: ExtremumData
  unitType: 'km' | 'duration'
  onSelect: (rec: ExtremumRecord) => void
  onOpenTieModal: (title: string, records: ExtremumRecord[], unitType: 'km' | 'duration') => void
}) {
  const p = data.primary
  return (
    <div
      style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderLeft: `4px solid ${borderColor}`,
        borderRadius: '8px',
        padding: '10px 14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '2px',
        cursor: p ? 'pointer' : 'default',
        transition: 'all 0.15s ease'
      }}
      onClick={() => p && onSelect(p)}
      title={p ? 'Klik untuk menyorot record pada tabel detail' : undefined}
    >
      <div
        style={{
          fontSize: '0.68rem',
          fontWeight: 600,
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}
      >
        {label}
      </div>

      {p ? (
        <>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
            {unitType === 'km' ? fmtKm(p.val) : formatDurationJamMenit(p.val)}
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748b', lineHeight: 1.25 }}>
            {formatDateIndo(p.date)} · {p.estateId}
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 500, lineHeight: 1.25 }}>
            {p.nopol}
          </div>
          {data.count > 1 ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onOpenTieModal(label, data.allMatches, unitType)
              }}
              style={{
                marginTop: '2px',
                fontSize: '0.65rem',
                color: '#2563eb',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontWeight: 600,
                textDecoration: 'underline'
              }}
            >
              +{data.count - 1} record lainnya
            </button>
          ) : (
            <div style={{ height: '14px' }} />
          )}
        </>
      ) : (
        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#94a3b8', lineHeight: 1.2, margin: '8px 0' }}>
          —
        </div>
      )}
    </div>
  )
}

// ── Shift Statistics Cell Component for Terendah/Tertinggi ───────────────────
function ExtremumShiftCell({
  data,
  unitType,
  shiftLabel,
  statType,
  onSelect,
  onOpenTieModal
}: {
  data: ExtremumData
  unitType: 'km' | 'duration'
  shiftLabel: string
  statType: 'Terendah' | 'Tertinggi'
  onSelect: (rec: ExtremumRecord) => void
  onOpenTieModal: (title: string, records: ExtremumRecord[], unitType: 'km' | 'duration') => void
}) {
  const p = data.primary
  if (!p) {
    return <span style={{ color: '#94a3b8' }}>—</span>
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        padding: '2px 4px',
        borderRadius: '4px'
      }}
      onClick={() => onSelect(p)}
      title="Klik untuk menyorot record pada tabel detail"
    >
      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.82rem', lineHeight: 1.25 }}>
        {unitType === 'km' ? fmtKm(p.val) : formatDurationJamMenit(p.val)}
      </div>
      <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px', lineHeight: 1.2 }}>
        {formatDateIndo(p.date)} · {p.estateId}
      </div>
      <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 500, lineHeight: 1.2 }}>
        {p.nopol}
      </div>
      {data.count > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onOpenTieModal(`${shiftLabel} - ${statType}`, data.allMatches, unitType)
          }}
          style={{
            marginTop: '2px',
            fontSize: '0.65rem',
            color: '#2563eb',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontWeight: 600,
            textDecoration: 'underline'
          }}
        >
          +{data.count - 1} record lainnya
        </button>
      )}
    </div>
  )
}

export default function UtilizationPage() {
  // Global hierarchy filter state
  const [filterState, setFilterState] = useState<HierarchyFilterState>({
    psm: 'PSM A',
    region: 'Region A',
    estate: 'Estate B',
    year: '2026',
    month: 'May',
    vehicleId: 'ALL'
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

  // Active Main Card (1: Vehicle, 2: GPS, 3: Mileage, 4: Moving, 5: Stopping)
  const [activeCard, setActiveCard] = useState<UtilizationCardKey>('vehicle')

  // Table search & pagination states per view
  const [searchQuery, setSearchQuery] = useState('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Highlighting & Extremum Interactions
  const [highlightedRowKey, setHighlightedRowKey] = useState<string | null>(null)
  const detailTableRef = React.useRef<HTMLDivElement>(null)

  // Tie Records Modal State
  const [tieModal, setTieModal] = useState<{
    isOpen: boolean
    title: string
    records: ExtremumRecord[]
    unitType: 'km' | 'duration'
  }>({
    isOpen: false,
    title: '',
    records: [],
    unitType: 'km'
  })

  const openTieModal = (title: string, records: ExtremumRecord[], unitType: 'km' | 'duration') => {
    setTieModal({
      isOpen: true,
      title,
      records,
      unitType
    })
  }

  // Reset page & highlight when card changes
  const handleCardChange = (card: UtilizationCardKey) => {
    setActiveCard(card)
    setSearchQuery('')
    setCurrentPage(1)
    setHighlightedRowKey(null)
  }

  const handleSelectExtremum = (rec: ExtremumRecord) => {
    if (!rec) return
    if (searchQuery) {
      setSearchQuery('')
    }
    const targetKey = `${rec.date}__${rec.vehicleId}`
    setHighlightedRowKey(targetKey)

    // Calculate target page in operational rows
    const rowIndex = operationalData.dailyRows.findIndex(
      r => `${r.date}__${r.vehicleId}` === targetKey
    )
    if (rowIndex !== -1) {
      const targetPage = Math.floor(rowIndex / pageSize) + 1
      setCurrentPage(targetPage)
    }

    setTimeout(() => {
      detailTableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  // Global Filter Object for Selectors with graceful mapping for mock names
  const globalFilters: GlobalFilterState = useMemo(() => {
    let psm = filterState.psm
    let region = filterState.region
    let estate = filterState.estate

    if (psm === 'PSM 1') psm = 'PSM A'
    if (region === 'SUMUT') region = 'Region A'
    if (estate === 'KULE' || estate === 'PHLE') estate = 'Estate B'

    return {
      psm,
      region,
      estate,
      year: filterState.year || '2026',
      month: filterState.month || 'May',
      vehicleId: filterState.vehicleId !== 'ALL' ? filterState.vehicleId : undefined,
      startDate: customStart,
      endDate: customEnd
    }
  }, [filterState, customStart, customEnd])

  // Get raw filtered data from repository (Master Inventaris Kendaraan)
  const filteredVehicles = useMemo(() => getFilteredVehicles(globalFilters), [globalFilters])
  const filteredRuns = useMemo(() => getFilteredPatrolRuns(globalFilters), [globalFilters])
  const filteredReports = useMemo(() => getFilteredPatrolReports(globalFilters), [globalFilters])
  const filteredExceptions = useMemo(() => getFilteredExceptions(globalFilters), [globalFilters])

  // Perhitungan inventaris aktual master: Total, Mobil, Motor mengikuti filter PSM -> Region -> Estate -> Kendaraan
  // Kendaraan rusak tetap dihitung sebagai inventaris
  const inventoryStats = useMemo(() => {
    const total = filteredVehicles.length
    const mobil = filteredVehicles.filter(v => v.vehicleType === 'Car').length
    const motor = filteredVehicles.filter(v => v.vehicleType === 'Motorcycle').length
    return { total, mobil, motor }
  }, [filteredVehicles])

  // Vehicle options for the filter bar
  const vehicleOptions = useMemo(() => {
    return filteredVehicles.map(v => ({
      id: v.id,
      label: `${v.nopol} (${v.id})`,
      estateId: v.estateId
    }))
  }, [filteredVehicles])

  // Vehicle lookup map for quick metadata access
  const vehicleMap = useMemo(() => {
    const map = new Map<string, VehicleEntity>()
    for (const v of filteredVehicles) {
      map.set(v.id, v)
    }
    return map
  }, [filteredVehicles])

  // Subtitle string: e.g. "Estate B · 01–31 Mei 2026"
  const scopeSubtitle = useMemo(() => {
    const est = filterState.estate === 'ALL'
      ? (filterState.region === 'ALL' ? (filterState.psm === 'ALL' ? 'Semua Wilayah' : filterState.psm) : filterState.region)
      : filterState.estate
    const range = periodPreset === 'Rentang Kustom'
      ? formatCustomDateRangeLabel(customStart, customEnd)
      : (periodPreset === 'Bulan Ini' ? '01–31 Mei 2026' : (periodPreset === 'Bulan Lalu' ? '01–30 Apr 2026' : '02–31 Mei 2026'))
    return `${est} · ${range}`
  }, [filterState.estate, filterState.region, filterState.psm, periodPreset, customStart, customEnd])

  // ───────────────────────────────────────────────────────────────────────────
  // 1. VEHICLE BREAKDOWN DATA (GRAIN: 1 KENDARAAN × 1 TANGGAL)
  // ───────────────────────────────────────────────────────────────────────────
  const vehicleBreakdownData = useMemo(() => {
    // Damage incidents for looking up recorded status
    const allIncidents = buildAllDamageIncidents(globalFilters)
    const incidentByVehicle = new Map<string, typeof allIncidents[0]>()
    allIncidents.forEach(inc => {
      incidentByVehicle.set(inc.vehicleId, inc)
    })

    // Map with key: `${date}__${vehicleId}` to guarantee each vehicle is counted at most once per date
    const dailyMap = new Map<string, {
      id: string
      date: string
      estateId: string
      vehicleId: string
      nopol: string
      statusHarian: 'Rusak' | 'Aktif'
      statusKerusakan: string | null
      hkRusak: number | null
      keterangan: string
    }>()

    // 1. Reports: check for Unit Rusak and Normal
    filteredReports.forEach((rep, idx) => {
      const key = `${rep.date}__${rep.vehicleId}`
      const veh = vehicleMap.get(rep.vehicleId)
      const nopol = veh?.nopol || rep.vehicleId
      const isBreakdown = rep.reportType === 'Unit Rusak'
      const inc = incidentByVehicle.get(rep.vehicleId)
      const recordedStatus = isBreakdown ? ((rep as any).damageStatus || inc?.status || null) : null

      const existing = dailyMap.get(key)
      if (existing) {
        // If conflict occurs, priority given to Rusak if any record indicates damage
        if (isBreakdown) {
          existing.statusHarian = 'Rusak'
          existing.statusKerusakan = recordedStatus
          existing.hkRusak = 1
          existing.keterangan = rep.picComment || 'Kerusakan pada unit kendaraan'
        }
      } else {
        dailyMap.set(key, {
          id: `rep-veh-${rep.id || idx}`,
          date: rep.date,
          estateId: rep.estateId,
          vehicleId: rep.vehicleId,
          nopol,
          statusHarian: isBreakdown ? 'Rusak' : 'Aktif',
          statusKerusakan: recordedStatus,
          hkRusak: isBreakdown ? 1 : null,
          keterangan: rep.picComment || (isBreakdown ? 'Kerusakan pada unit kendaraan' : 'Kondisi normal')
        })
      }
    })

    // 2. Exceptions: check for Vehicle Breakdown
    filteredExceptions
      .filter(e => e.type === 'Vehicle Breakdown')
      .forEach(exp => {
        const key = `${exp.date}__${exp.vehicleId}`
        const veh = vehicleMap.get(exp.vehicleId)
        const nopol = veh?.nopol || exp.vehicleId
        const inc = incidentByVehicle.get(exp.vehicleId)
        const recordedStatus = (exp as any).damageStatus || inc?.status || null

        dailyMap.set(key, {
          id: `exp-${exp.id}`,
          date: exp.date,
          estateId: exp.estateId,
          vehicleId: exp.vehicleId,
          nopol,
          statusHarian: 'Rusak',
          statusKerusakan: recordedStatus,
          hkRusak: 1,
          keterangan: exp.detail || exp.reasonCategory || 'Mesin tidak dapat dinyalakan'
        })
      })

    // 3. Fallback deterministic realistic records if empty (matching mockup)
    if (dailyMap.size === 0) {
      const defaultEst = filterState.estate !== 'ALL' ? filterState.estate : 'Estate B'
      const sampleUnits = [
        { date: '2026-05-21', nopol: 'BM 9923 CD', id: 'V-Estate B-03', status: 'Aktif' as const, statusKerusakan: null, hk: null, ket: 'Kondisi normal' },
        { date: '2026-05-18', nopol: 'BK 6172 AB', id: 'V-Estate B-02', status: 'Rusak' as const, statusKerusakan: 'Belum Pulih', hk: 1, ket: 'Kerusakan rantai' },
        { date: '2026-05-12', nopol: 'BM 8421 QA', id: 'V-Estate B-01', status: 'Rusak' as const, statusKerusakan: 'Belum Pulih', hk: 1, ket: 'Gangguan sistem kelistrikan' },
        { date: '2026-05-07', nopol: 'BK 6172 AB', id: 'V-Estate B-02', status: 'Rusak' as const, statusKerusakan: 'Selesai', hk: 1, ket: 'Ban dan velg rusak' },
        { date: '2026-05-03', nopol: 'BM 8421 QA', id: 'V-Estate B-01', status: 'Rusak' as const, statusKerusakan: 'Belum Pulih', hk: 1, ket: 'Mesin tidak dapat dinyalakan' }
      ]
      sampleUnits.forEach((s, i) => {
        const key = `${s.date}__${s.id}`
        dailyMap.set(key, {
          id: `sample-breakdown-${i}`,
          date: s.date,
          estateId: defaultEst,
          vehicleId: s.id,
          nopol: s.nopol,
          statusHarian: s.status,
          statusKerusakan: s.statusKerusakan,
          hkRusak: s.hk,
          keterangan: s.ket
        })
      })
    }

    const rows = Array.from(dailyMap.values())
    // Sort descending by date
    rows.sort((a, b) => b.date.localeCompare(a.date))

    // HK rusak = jumlah pasangan kendaraan–tanggal yang berstatus rusak
    const rusakRows = rows.filter(r => r.statusHarian === 'Rusak')
    const totalHk = rusakRows.length

    // Unit terdampak = jumlah kendaraan unik yang mengalami kerusakan
    const affectedUnitsSet = new Set(rusakRows.map(r => r.vehicleId))
    const affectedUnitsCount = affectedUnitsSet.size

    return {
      totalHk,
      affectedUnitsCount,
      rows
    }
  }, [filteredReports, filteredExceptions, vehicleMap, filterState.estate, globalFilters])

  // ───────────────────────────────────────────────────────────────────────────
  // 2. GPS / WIFI BREAKDOWN DATA (GRAIN: 1 KENDARAAN × 1 TANGGAL)
  // ───────────────────────────────────────────────────────────────────────────
  const gpsBreakdownData = useMemo(() => {
    const dailyMap = new Map<string, {
      id: string
      date: string
      estateId: string
      vehicleId: string
      nopol: string
      statusHarian: 'Rusak' | 'Aktif'
      penyebab: 'GPS' | 'Access Point / WiFi'
      hkRusak: number | null
      keterangan: string
    }>()

    filteredReports
      .filter(r => r.reportType === 'GPS Rusak')
      .forEach((rep, idx) => {
        const key = `${rep.date}__${rep.vehicleId}`
        const veh = vehicleMap.get(rep.vehicleId)
        const nopol = veh?.nopol || rep.vehicleId
        dailyMap.set(key, {
          id: `rep-gps-${rep.id || idx}`,
          date: rep.date,
          estateId: rep.estateId,
          vehicleId: rep.vehicleId,
          nopol,
          statusHarian: 'Rusak',
          penyebab: 'GPS',
          hkRusak: 1,
          keterangan: rep.gpsNote || rep.picComment || 'Tidak mengirim posisi'
        })
      })

    filteredExceptions
      .filter(e => e.type === 'GPS Breakdown')
      .forEach(exp => {
        const key = `${exp.date}__${exp.vehicleId}`
        const veh = vehicleMap.get(exp.vehicleId)
        const nopol = veh?.nopol || exp.vehicleId
        const isWifi = exp.detail?.toLowerCase().includes('wifi') || exp.reasonCategory?.toLowerCase().includes('wifi')
        dailyMap.set(key, {
          id: `exp-gps-${exp.id}`,
          date: exp.date,
          estateId: exp.estateId,
          vehicleId: exp.vehicleId,
          nopol,
          statusHarian: 'Rusak',
          penyebab: isWifi ? 'Access Point / WiFi' : 'GPS',
          hkRusak: 1,
          keterangan: exp.detail || 'Koneksi access point terputus'
        })
      })

    if (dailyMap.size === 0) {
      const defaultEst = filterState.estate !== 'ALL' ? filterState.estate : 'KULE'
      const sampleGps = [
        { date: '2026-05-17', nopol: 'BM 8421 QA', id: 'V-Estate B-01', penyebab: 'GPS' as const, ket: 'Perangkat tidak menyala' },
        { date: '2026-05-10', nopol: 'BK 6172 AB', id: 'V-Estate B-02', penyebab: 'Access Point / WiFi' as const, ket: 'Koneksi access point terputus' },
        { date: '2026-05-04', nopol: 'BM 8421 QA', id: 'V-Estate B-01', penyebab: 'GPS' as const, ket: 'Tidak mengirim posisi' }
      ]
      sampleGps.forEach((s, i) => {
        const key = `${s.date}__${s.id}`
        dailyMap.set(key, {
          id: `sample-gps-${i}`,
          date: s.date,
          estateId: defaultEst,
          vehicleId: s.id,
          nopol: s.nopol,
          statusHarian: 'Rusak',
          penyebab: s.penyebab,
          hkRusak: 1,
          keterangan: s.ket
        })
      })
    }

    const rows = Array.from(dailyMap.values())
    rows.sort((a, b) => b.date.localeCompare(a.date))

    const totalHk = rows.length
    const affectedUnitsSet = new Set(rows.map(r => r.vehicleId))
    const affectedUnitsCount = affectedUnitsSet.size

    const gpsCount = rows.filter(r => r.penyebab === 'GPS').length
    const wifiCount = rows.filter(r => r.penyebab === 'Access Point / WiFi').length

    return {
      totalHk,
      affectedUnitsCount,
      gpsCount,
      wifiCount,
      rows
    }
  }, [filteredReports, filteredExceptions, vehicleMap, filterState.estate])

  // ───────────────────────────────────────────────────────────────────────────
  // 3, 4, 5. MILEAGE, MOVING TIME, STOPPING TIME DATA
  // ───────────────────────────────────────────────────────────────────────────
  const operationalData = useMemo(() => {
    const dayVehicleMap = new Map<string, {
      date: string
      estateId: string
      vehicleId: string
      nopol: string
      hasShift1: boolean
      hasShift2: boolean
      hasShift3: boolean
      shift1Km: number | null
      shift2Km: number | null
      shift3Km: number | null
      shift1MovingMins: number | null
      shift2MovingMins: number | null
      shift3MovingMins: number | null
      shift1StoppingMins: number | null
      shift2StoppingMins: number | null
      shift3StoppingMins: number | null
      totalKm: number
      totalMovingMins: number
      totalStoppingMins: number
      isCompleteDay: boolean
    }>()

    // 1. Group filtered runs by vehicle and date: 1 row = 1 vehicle on 1 operational date
    const runsByKey = new Map<string, typeof filteredRuns>()
    filteredRuns.forEach(r => {
      const key = `${r.date}__${r.vehicleId}`
      const list = runsByKey.get(key)
      if (list) {
        list.push(r)
      } else {
        runsByKey.set(key, [r])
      }
    })

    runsByKey.forEach((runs, key) => {
      const [dateStr, vehicleId] = key.split('__')
      const primaryRun = runs[0]
      const veh = vehicleMap.get(vehicleId)
      const nopol = veh?.nopol || primaryRun.nopol || vehicleId
      const estateId = primaryRun.estateId

      let breakdown: ShiftDistributionResult

      const track = IMPORTED_TRACKS_MAP[key]
      if (track && track.points && track.points.length > 0) {
        // ACTUAL GPS TRACKING DATA: authentic timestamp tracking across shift boundaries
        breakdown = computeShiftBreakdownFromPoints(track.points)
      } else if (runs.length > 1) {
        // Multiple runs for same vehicle and date with explicit shift tags
        let hasShift1 = false, hasShift2 = false, hasShift3 = false
        let s1Km: number | null = null, s2Km: number | null = null, s3Km: number | null = null
        let s1Mov: number | null = null, s2Mov: number | null = null, s3Mov: number | null = null
        let s1Stp: number | null = null, s2Stp: number | null = null, s3Stp: number | null = null

        runs.forEach(r => {
          const km = (r.actualDistanceKm !== null && r.actualDistanceKm !== undefined && !isNaN(r.actualDistanceKm)) ? r.actualDistanceKm : 0
          const mov = (r.movingTimeMinutes !== null && r.movingTimeMinutes !== undefined && !isNaN(r.movingTimeMinutes)) ? r.movingTimeMinutes : 0
          const stp = (r.stoppingTimeMinutes !== null && r.stoppingTimeMinutes !== undefined && !isNaN(r.stoppingTimeMinutes)) ? r.stoppingTimeMinutes : 0
          if (r.shift === 'Shift 1') {
            hasShift1 = true; s1Km = (s1Km ?? 0) + km; s1Mov = (s1Mov ?? 0) + mov; s1Stp = (s1Stp ?? 0) + stp
          } else if (r.shift === 'Shift 2') {
            hasShift2 = true; s2Km = (s2Km ?? 0) + km; s2Mov = (s2Mov ?? 0) + mov; s2Stp = (s2Stp ?? 0) + stp
          } else if (r.shift === 'Shift 3') {
            hasShift3 = true; s3Km = (s3Km ?? 0) + km; s3Mov = (s3Mov ?? 0) + mov; s3Stp = (s3Stp ?? 0) + stp
          }
        })

        const totalKm = Math.round(((s1Km ?? 0) + (s2Km ?? 0) + (s3Km ?? 0)) * 10) / 10
        const totalMovingMins = (s1Mov ?? 0) + (s2Mov ?? 0) + (s3Mov ?? 0)
        const totalStoppingMins = (s1Stp ?? 0) + (s2Stp ?? 0) + (s3Stp ?? 0)
        const isCompleteDay = hasShift1 && hasShift2 && hasShift3

        breakdown = {
          hasShift1, hasShift2, hasShift3,
          shift1Km: s1Km, shift2Km: s2Km, shift3Km: s3Km,
          shift1MovingMins: s1Mov, shift2MovingMins: s2Mov, shift3MovingMins: s3Mov,
          shift1StoppingMins: s1Stp, shift2StoppingMins: s2Stp, shift3StoppingMins: s3Stp,
          totalKm, totalMovingMins, totalStoppingMins,
          isCompleteDay
        }
      } else {
        // DUMMY / MOCK DATA: Distribute across 3 shifts with realistic operational variations
        const baseKm = (primaryRun.actualDistanceKm !== null && primaryRun.actualDistanceKm !== undefined && !isNaN(primaryRun.actualDistanceKm)) ? primaryRun.actualDistanceKm : 0
        const baseMov = (primaryRun.movingTimeMinutes !== null && primaryRun.movingTimeMinutes !== undefined && !isNaN(primaryRun.movingTimeMinutes)) ? primaryRun.movingTimeMinutes : 0
        const baseStp = (primaryRun.stoppingTimeMinutes !== null && primaryRun.stoppingTimeMinutes !== undefined && !isNaN(primaryRun.stoppingTimeMinutes)) ? primaryRun.stoppingTimeMinutes : 0
        breakdown = distributeDummyShifts(key, baseKm, baseMov, baseStp)
      }

      dayVehicleMap.set(key, {
        date: dateStr,
        estateId,
        vehicleId,
        nopol,
        ...breakdown
      })
    })

    if (dayVehicleMap.size === 0) {
      const defaultEst = filterState.estate !== 'ALL' ? filterState.estate : 'KULE'
      const sampleVehicles = [
        { id: 'V-Estate B-01', nopol: 'BM 8421 QA' },
        { id: 'V-Estate B-02', nopol: 'BK 6172 AB' }
      ]
      for (let day = 1; day <= 22; day++) {
        const dStr = day < 10 ? `0${day}` : `${day}`
        const dateStr = `2026-05-${dStr}`
        sampleVehicles.forEach((veh, vIdx) => {
          const key = `${dateStr}__${veh.id}`
          const baseSeed = day * 13 + vIdx * 37
          const baseKm = 28 + (baseSeed % 15)
          const baseMov = 180 + (baseSeed % 60)
          const baseStp = 240 + (baseSeed % 40)
          const breakdown = distributeDummyShifts(key, baseKm, baseMov, baseStp)

          dayVehicleMap.set(key, {
            date: dateStr,
            estateId: defaultEst,
            vehicleId: veh.id,
            nopol: veh.nopol,
            ...breakdown
          })
        })
      }
    }

    const dailyRows = Array.from(dayVehicleMap.values())
    dailyRows.sort((a, b) => b.date.localeCompare(a.date) || a.nopol.localeCompare(b.nopol))

    const totalDaysCount = dailyRows.length || 1

    // ─────────────────────────────────────────────────────────────────────────
    // MILEAGE EXTREMUMS & STATS
    // ─────────────────────────────────────────────────────────────────────────
    const totalMileageKm = Math.round(dailyRows.reduce((sum, r) => sum + r.totalKm, 0) * 10) / 10
    const avgMileageKm = Math.round((totalMileageKm / totalDaysCount) * 10) / 10

    // Basis harian: 1 kendaraan × 1 tanggal (total Shift 1–3)
    // Jangan menampilkan total parsial seolah-olah merupakan total harian lengkap:
    // Terendah harian hanya membandingkan hari lengkap (isCompleteDay) agar hari parsial tidak menjadi terendah semu
    const completeMileageRows = dailyRows.filter(r => r.isCompleteDay)
    const dailyMileageRecords = (completeMileageRows.length > 0 ? completeMileageRows : dailyRows).map(r => ({
      val: r.totalKm,
      date: r.date,
      estateId: r.estateId,
      vehicleId: r.vehicleId,
      nopol: r.nopol
    }))
    const lowestDailyMileage = findExtremum(dailyMileageRecords, 'min')
    const highestDailyMileage = findExtremum(
      dailyRows.map(r => ({
        val: r.totalKm,
        date: r.date,
        estateId: r.estateId,
        vehicleId: r.vehicleId,
        nopol: r.nopol
      })),
      'max'
    )

    // Basis per shift: 1 kendaraan × 1 tanggal × shift (hanya record shift terkait yang memiliki data)
    const s1MileageRecords = dailyRows.filter(r => r.hasShift1 && r.shift1Km !== null).map(r => ({
      val: r.shift1Km!,
      date: r.date,
      estateId: r.estateId,
      vehicleId: r.vehicleId,
      nopol: r.nopol,
      shift: 'Shift 1' as const
    }))
    const s2MileageRecords = dailyRows.filter(r => r.hasShift2 && r.shift2Km !== null).map(r => ({
      val: r.shift2Km!,
      date: r.date,
      estateId: r.estateId,
      vehicleId: r.vehicleId,
      nopol: r.nopol,
      shift: 'Shift 2' as const
    }))
    const s3MileageRecords = dailyRows.filter(r => r.hasShift3 && r.shift3Km !== null).map(r => ({
      val: r.shift3Km!,
      date: r.date,
      estateId: r.estateId,
      vehicleId: r.vehicleId,
      nopol: r.nopol,
      shift: 'Shift 3' as const
    }))

    const s1TotalKm = Math.round(s1MileageRecords.reduce((sum, r) => sum + r.val, 0) * 10) / 10
    const s2TotalKm = Math.round(s2MileageRecords.reduce((sum, r) => sum + r.val, 0) * 10) / 10
    const s3TotalKm = Math.round(s3MileageRecords.reduce((sum, r) => sum + r.val, 0) * 10) / 10

    const mileageShiftStats = [
      {
        shift: 'Shift 1' as const,
        total: s1TotalKm,
        avg: s1MileageRecords.length > 0 ? Math.round((s1TotalKm / s1MileageRecords.length) * 10) / 10 : 0,
        lowest: findExtremum(s1MileageRecords, 'min'),
        highest: findExtremum(s1MileageRecords, 'max')
      },
      {
        shift: 'Shift 2' as const,
        total: s2TotalKm,
        avg: s2MileageRecords.length > 0 ? Math.round((s2TotalKm / s2MileageRecords.length) * 10) / 10 : 0,
        lowest: findExtremum(s2MileageRecords, 'min'),
        highest: findExtremum(s2MileageRecords, 'max')
      },
      {
        shift: 'Shift 3' as const,
        total: s3TotalKm,
        avg: s3MileageRecords.length > 0 ? Math.round((s3TotalKm / s3MileageRecords.length) * 10) / 10 : 0,
        lowest: findExtremum(s3MileageRecords, 'min'),
        highest: findExtremum(s3MileageRecords, 'max')
      }
    ]

    // ─────────────────────────────────────────────────────────────────────────
    // MOVING & STOPPING TIME (Equal Denominator, Total 100%)
    // ─────────────────────────────────────────────────────────────────────────
    const totalMovingMins = dailyRows.reduce((sum, r) => sum + r.totalMovingMins, 0)
    const totalStoppingMins = dailyRows.reduce((sum, r) => sum + r.totalStoppingMins, 0)
    const totalOperationalMins = totalMovingMins + totalStoppingMins

    let movingPct = 0
    let stoppingPct = 0
    if (totalOperationalMins > 0) {
      movingPct = Math.round((totalMovingMins / totalOperationalMins) * 100)
      stoppingPct = 100 - movingPct
    }

    const avgMovingMins = Math.round(totalMovingMins / totalDaysCount)
    const avgStoppingMins = Math.round(totalStoppingMins / totalDaysCount)

    // Moving Extremums
    const completeMovingRows = dailyRows.filter(r => r.isCompleteDay)
    const dailyMovingRecords = (completeMovingRows.length > 0 ? completeMovingRows : dailyRows).map(r => ({
      val: r.totalMovingMins,
      date: r.date,
      estateId: r.estateId,
      vehicleId: r.vehicleId,
      nopol: r.nopol
    }))
    const lowestDailyMoving = findExtremum(dailyMovingRecords, 'min')
    const highestDailyMoving = findExtremum(
      dailyRows.map(r => ({
        val: r.totalMovingMins,
        date: r.date,
        estateId: r.estateId,
        vehicleId: r.vehicleId,
        nopol: r.nopol
      })),
      'max'
    )

    const s1MovingRecords = dailyRows.filter(r => r.hasShift1 && r.shift1MovingMins !== null).map(r => ({
      val: r.shift1MovingMins!,
      date: r.date,
      estateId: r.estateId,
      vehicleId: r.vehicleId,
      nopol: r.nopol,
      shift: 'Shift 1' as const
    }))
    const s2MovingRecords = dailyRows.filter(r => r.hasShift2 && r.shift2MovingMins !== null).map(r => ({
      val: r.shift2MovingMins!,
      date: r.date,
      estateId: r.estateId,
      vehicleId: r.vehicleId,
      nopol: r.nopol,
      shift: 'Shift 2' as const
    }))
    const s3MovingRecords = dailyRows.filter(r => r.hasShift3 && r.shift3MovingMins !== null).map(r => ({
      val: r.shift3MovingMins!,
      date: r.date,
      estateId: r.estateId,
      vehicleId: r.vehicleId,
      nopol: r.nopol,
      shift: 'Shift 3' as const
    }))

    const s1MovTotal = s1MovingRecords.reduce((sum, r) => sum + r.val, 0)
    const s2MovTotal = s2MovingRecords.reduce((sum, r) => sum + r.val, 0)
    const s3MovTotal = s3MovingRecords.reduce((sum, r) => sum + r.val, 0)

    const movingShiftStats = [
      {
        shift: 'Shift 1' as const,
        totalMins: s1MovTotal,
        avgMins: s1MovingRecords.length > 0 ? Math.round(s1MovTotal / s1MovingRecords.length) : 0,
        lowest: findExtremum(s1MovingRecords, 'min'),
        highest: findExtremum(s1MovingRecords, 'max')
      },
      {
        shift: 'Shift 2' as const,
        totalMins: s2MovTotal,
        avgMins: s2MovingRecords.length > 0 ? Math.round(s2MovTotal / s2MovingRecords.length) : 0,
        lowest: findExtremum(s2MovingRecords, 'min'),
        highest: findExtremum(s2MovingRecords, 'max')
      },
      {
        shift: 'Shift 3' as const,
        totalMins: s3MovTotal,
        avgMins: s3MovingRecords.length > 0 ? Math.round(s3MovTotal / s3MovingRecords.length) : 0,
        lowest: findExtremum(s3MovingRecords, 'min'),
        highest: findExtremum(s3MovingRecords, 'max')
      }
    ]

    // Stopping Extremums
    const completeStoppingRows = dailyRows.filter(r => r.isCompleteDay)
    const dailyStoppingRecords = (completeStoppingRows.length > 0 ? completeStoppingRows : dailyRows).map(r => ({
      val: r.totalStoppingMins,
      date: r.date,
      estateId: r.estateId,
      vehicleId: r.vehicleId,
      nopol: r.nopol
    }))
    const lowestDailyStopping = findExtremum(dailyStoppingRecords, 'min')
    const highestDailyStopping = findExtremum(
      dailyRows.map(r => ({
        val: r.totalStoppingMins,
        date: r.date,
        estateId: r.estateId,
        vehicleId: r.vehicleId,
        nopol: r.nopol
      })),
      'max'
    )

    const s1StoppingRecords = dailyRows.filter(r => r.hasShift1 && r.shift1StoppingMins !== null).map(r => ({
      val: r.shift1StoppingMins!,
      date: r.date,
      estateId: r.estateId,
      vehicleId: r.vehicleId,
      nopol: r.nopol,
      shift: 'Shift 1' as const
    }))
    const s2StoppingRecords = dailyRows.filter(r => r.hasShift2 && r.shift2StoppingMins !== null).map(r => ({
      val: r.shift2StoppingMins!,
      date: r.date,
      estateId: r.estateId,
      vehicleId: r.vehicleId,
      nopol: r.nopol,
      shift: 'Shift 2' as const
    }))
    const s3StoppingRecords = dailyRows.filter(r => r.hasShift3 && r.shift3StoppingMins !== null).map(r => ({
      val: r.shift3StoppingMins!,
      date: r.date,
      estateId: r.estateId,
      vehicleId: r.vehicleId,
      nopol: r.nopol,
      shift: 'Shift 3' as const
    }))

    const s1StpTotal = s1StoppingRecords.reduce((sum, r) => sum + r.val, 0)
    const s2StpTotal = s2StoppingRecords.reduce((sum, r) => sum + r.val, 0)
    const s3StpTotal = s3StoppingRecords.reduce((sum, r) => sum + r.val, 0)

    const stoppingShiftStats = [
      {
        shift: 'Shift 1' as const,
        totalMins: s1StpTotal,
        avgMins: s1StoppingRecords.length > 0 ? Math.round(s1StpTotal / s1StoppingRecords.length) : 0,
        lowest: findExtremum(s1StoppingRecords, 'min'),
        highest: findExtremum(s1StoppingRecords, 'max')
      },
      {
        shift: 'Shift 2' as const,
        totalMins: s2StpTotal,
        avgMins: s2StoppingRecords.length > 0 ? Math.round(s2StpTotal / s2StoppingRecords.length) : 0,
        lowest: findExtremum(s2StoppingRecords, 'min'),
        highest: findExtremum(s2StoppingRecords, 'max')
      },
      {
        shift: 'Shift 3' as const,
        totalMins: s3StpTotal,
        avgMins: s3StoppingRecords.length > 0 ? Math.round(s3StpTotal / s3StoppingRecords.length) : 0,
        lowest: findExtremum(s3StoppingRecords, 'min'),
        highest: findExtremum(s3StoppingRecords, 'max')
      }
    ]

    return {
      dailyRows,
      mileage: {
        totalMileageKm,
        avgMileageKm,
        lowestDaily: lowestDailyMileage,
        highestDaily: highestDailyMileage,
        shiftStats: mileageShiftStats
      },
      moving: {
        totalMovingMins,
        movingPct,
        avgMovingMins,
        lowestDaily: lowestDailyMoving,
        highestDaily: highestDailyMoving,
        shiftStats: movingShiftStats
      },
      stopping: {
        totalStoppingMins,
        stoppingPct,
        avgStoppingMins,
        lowestDaily: lowestDailyStopping,
        highestDaily: highestDailyStopping,
        shiftStats: stoppingShiftStats
      }
    }
  }, [filteredRuns, vehicleMap, filterState.estate])

  // ───────────────────────────────────────────────────────────────────────────
  // FILTERED TABLE ROWS BASED ON SEARCH QUERY & PAGINATION
  // ───────────────────────────────────────────────────────────────────────────
  const activeTableData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()

    if (activeCard === 'vehicle') {
      const filtered = vehicleBreakdownData.rows.filter(r => {
        if (!q) return true
        return (
          r.nopol.toLowerCase().includes(q) ||
          r.vehicleId.toLowerCase().includes(q) ||
          r.estateId.toLowerCase().includes(q) ||
          r.keterangan.toLowerCase().includes(q) ||
          r.statusHarian.toLowerCase().includes(q) ||
          (r.statusKerusakan && r.statusKerusakan.toLowerCase().includes(q)) ||
          r.date.includes(q)
        )
      })
      const total = filtered.length
      const start = (currentPage - 1) * pageSize
      const paginated = filtered.slice(start, start + pageSize)
      return { total, rows: paginated }
    }

    if (activeCard === 'gps') {
      const filtered = gpsBreakdownData.rows.filter(r => {
        if (!q) return true
        return (
          r.nopol.toLowerCase().includes(q) ||
          r.vehicleId.toLowerCase().includes(q) ||
          r.estateId.toLowerCase().includes(q) ||
          r.keterangan.toLowerCase().includes(q) ||
          r.penyebab.toLowerCase().includes(q) ||
          r.date.includes(q)
        )
      })
      const total = filtered.length
      const start = (currentPage - 1) * pageSize
      const paginated = filtered.slice(start, start + pageSize)
      return { total, rows: paginated }
    }

    const filtered = operationalData.dailyRows.filter(r => {
      if (!q) return true
      return (
        r.nopol.toLowerCase().includes(q) ||
        r.vehicleId.toLowerCase().includes(q) ||
        r.estateId.toLowerCase().includes(q) ||
        r.date.includes(q)
      )
    })
    const total = filtered.length
    const start = (currentPage - 1) * pageSize
    const paginated = filtered.slice(start, start + pageSize)
    return { total, rows: paginated }
  }, [
    activeCard,
    searchQuery,
    currentPage,
    pageSize,
    vehicleBreakdownData,
    gpsBreakdownData,
    operationalData
  ])

  const totalPages = Math.max(1, Math.ceil(activeTableData.total / pageSize))

  return (
    <PageShell
      title="Utilisasi Kendaraan & GPS"
      subtitle="monitoring utilisasi kendaraan dan data GPS"
      topbarExtra={
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
          <HierarchyFilterBar
            filterState={filterState}
            onChange={setFilterState}
            showUnitTypeFilter={false}
            showVehicleFilter={true}
            vehicleOptions={vehicleOptions}
            useCompactPeriodDropdown={true}
            datePreset={periodPreset}
            customStartDate={customStart}
            customEndDate={customEnd}
            onPeriodChange={handlePeriodChange}
          />
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500, marginRight: '4px' }}>
            {scopeSubtitle}
          </span>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: "'Poppins', sans-serif" }}>
        {/* ================================================================== */}
        {/* 1. STRIP INVENTARIS KENDARAAN (RINGKAS, TINGGI 44–48PX, 1 BARIS)    */}
        {/* ================================================================== */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            position: 'relative',
            overflow: 'hidden',
            padding: '8px 16px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            minHeight: '44px'
          }}
        >
          {/* Garis gradasi biru-hijau tipis di bagian atas */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2.5px',
              background: 'linear-gradient(90deg, #2563eb 0%, #0d9488 50%, #16a34a 100%)'
            }}
          />

          {/* Baris Horizontal: 3 Kelompok tersusun seimbang dengan pemisah vertikal tipis */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px 0'
            }}
          >
            {/* Kelompok 1: Inventaris */}
            <div
              style={{
                flex: 1,
                minWidth: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '13.5px',
                padding: '0 12px'
              }}
            >
              <Truck size={19} color="#2563eb" style={{ flexShrink: 0 }} />
              <span>
                <span style={{ fontWeight: 400, color: '#475569' }}>Inventaris: </span>
                <strong style={{ fontWeight: 700, color: '#0f172a' }}>{inventoryStats.total}</strong>
                <span style={{ fontWeight: 400, color: '#64748b' }}> unit</span>
              </span>
            </div>

            {/* Pemisah Vertikal 1 */}
            <div style={{ width: '1px', height: '18px', background: '#e2e8f0', flexShrink: 0 }} />

            {/* Kelompok 2: Mobil */}
            <div
              style={{
                flex: 1,
                minWidth: '160px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '13.5px',
                padding: '0 12px'
              }}
            >
              <Car size={19} color="#0284c7" style={{ flexShrink: 0 }} />
              <span>
                <span style={{ fontWeight: 400, color: '#475569' }}>Mobil: </span>
                <strong style={{ fontWeight: 700, color: '#0f172a' }}>{inventoryStats.mobil}</strong>
                <span style={{ fontWeight: 400, color: '#64748b' }}> unit</span>
              </span>
            </div>

            {/* Pemisah Vertikal 2 */}
            <div style={{ width: '1px', height: '18px', background: '#e2e8f0', flexShrink: 0 }} />

            {/* Kelompok 3: Motor */}
            <div
              style={{
                flex: 1,
                minWidth: '160px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '13.5px',
                padding: '0 12px'
              }}
            >
              <Bike size={19} color="#0d9488" style={{ flexShrink: 0 }} />
              <span>
                <span style={{ fontWeight: 400, color: '#475569' }}>Motor: </span>
                <strong style={{ fontWeight: 700, color: '#0f172a' }}>{inventoryStats.motor}</strong>
                <span style={{ fontWeight: 400, color: '#64748b' }}> unit</span>
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2. LIMA KPI CARD (1 BARIS, RATA TENGAH, TINGGI ~155PX, RAPI)        */}
        {/* ================================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '12px'
          }}
        >
          {/* CARD 1: VEHICLE BREAKDOWN */}
          <div
            onClick={() => handleCardChange('vehicle')}
            style={{
              background: '#ffffff',
              border: activeCard === 'vehicle' ? '2px solid #2563eb' : '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '14px 16px',
              cursor: 'pointer',
              boxShadow: activeCard === 'vehicle' ? '0 4px 14px rgba(37, 99, 235, 0.12)' : '0 1px 3px rgba(0,0,0,0.03)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '155px',
              boxSizing: 'border-box',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', background: '#f97316' }} />
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Car size={16} color="#ea580c" />
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>Vehicle Breakdown</span>
              </div>
              <ChevronRight size={15} color={activeCard === 'vehicle' ? '#2563eb' : '#cbd5e1'} />
            </div>
            {/* Center Area: Number & Caption Rata-Tengah */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {vehicleBreakdownData.totalHk} HK
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
                {vehicleBreakdownData.affectedUnitsCount} unit terdampak
              </div>
            </div>
          </div>

          {/* CARD 2: GPS/WIFI BREAKDOWN */}
          <div
            onClick={() => handleCardChange('gps')}
            style={{
              background: '#ffffff',
              border: activeCard === 'gps' ? '2px solid #2563eb' : '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '14px 16px',
              cursor: 'pointer',
              boxShadow: activeCard === 'gps' ? '0 4px 14px rgba(37, 99, 235, 0.12)' : '0 1px 3px rgba(0,0,0,0.03)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '155px',
              boxSizing: 'border-box',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', background: '#f59e0b' }} />
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Wifi size={16} color="#d97706" />
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>GPS/WiFi Breakdown</span>
              </div>
              <ChevronRight size={15} color={activeCard === 'gps' ? '#2563eb' : '#cbd5e1'} />
            </div>
            {/* Center Area: Number & Caption Rata-Tengah */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {gpsBreakdownData.totalHk} HK
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
                {gpsBreakdownData.affectedUnitsCount} unit terdampak
              </div>
            </div>
          </div>

          {/* CARD 3: MILEAGE */}
          <div
            onClick={() => handleCardChange('mileage')}
            style={{
              background: '#ffffff',
              border: activeCard === 'mileage' ? '2px solid #2563eb' : '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '14px 16px',
              cursor: 'pointer',
              boxShadow: activeCard === 'mileage' ? '0 4px 14px rgba(37, 99, 235, 0.12)' : '0 1px 3px rgba(0,0,0,0.03)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '155px',
              boxSizing: 'border-box',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', background: '#2563eb' }} />
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Navigation size={16} color="#2563eb" />
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>Mileage</span>
              </div>
              <ChevronRight size={15} color={activeCard === 'mileage' ? '#2563eb' : '#cbd5e1'} />
            </div>
            {/* Center Area: Number & Caption Rata-Tengah */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {fmtKm(operationalData.mileage.totalMileageKm)}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
                Total jarak tempuh
              </div>
            </div>
          </div>

          {/* CARD 4: MOVING TIME */}
          <div
            onClick={() => handleCardChange('moving')}
            style={{
              background: '#ffffff',
              border: activeCard === 'moving' ? '2px solid #2563eb' : '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '14px 16px',
              cursor: 'pointer',
              boxShadow: activeCard === 'moving' ? '0 4px 14px rgba(37, 99, 235, 0.12)' : '0 1px 3px rgba(0,0,0,0.03)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '155px',
              boxSizing: 'border-box',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', background: '#16a34a' }} />
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={16} color="#16a34a" />
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>Moving Time</span>
              </div>
              <ChevronRight size={15} color={activeCard === 'moving' ? '#2563eb' : '#cbd5e1'} />
            </div>
            {/* Center Area: Number & Caption Rata-Tengah */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {operationalData.moving.movingPct}%
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
                {formatDurationHmFull(operationalData.moving.totalMovingMins)}
              </div>
            </div>
          </div>

          {/* CARD 5: STOPPING TIME */}
          <div
            onClick={() => handleCardChange('stopping')}
            style={{
              background: '#ffffff',
              border: activeCard === 'stopping' ? '2px solid #2563eb' : '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '14px 16px',
              cursor: 'pointer',
              boxShadow: activeCard === 'stopping' ? '0 4px 14px rgba(37, 99, 235, 0.12)' : '0 1px 3px rgba(0,0,0,0.03)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '155px',
              boxSizing: 'border-box',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', background: '#0284c7' }} />
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Square size={15} color="#0284c7" />
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>Stopping Time</span>
              </div>
              <ChevronRight size={15} color={activeCard === 'stopping' ? '#2563eb' : '#cbd5e1'} />
            </div>
            {/* Center Area: Number & Caption Rata-Tengah */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {operationalData.stopping.stoppingPct}%
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
                {formatDurationHmFull(operationalData.stopping.totalStoppingMins)}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2 & 4. SATU CONTAINER DETAIL DENGAN BADGE COMPACT & TABEL HARIAN   */}
        {/* ================================================================== */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            position: 'relative',
            overflow: 'hidden',
            padding: '18px 20px'
          }}
        >
          {/* Top Tri-Color Gradient Stripe */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #2563eb 0%, #0d9488 50%, #16a34a 100%)'
            }}
          />

          {/* ───────────────────────────────────────────────────────────── */}
          {/* DETAIL HEADING ROW WITH COMPACT BADGES ON THE RIGHT           */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '14px',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                {activeCard === 'vehicle' && 'Detail Vehicle Breakdown'}
                {activeCard === 'gps' && 'Detail GPS/WiFi Breakdown'}
                {activeCard === 'mileage' && 'Detail Mileage'}
                {activeCard === 'moving' && 'Detail Moving Time'}
                {activeCard === 'stopping' && 'Detail Stopping Time'}
              </h2>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '3px' }}>
                {scopeSubtitle}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '1px' }}>
                {activeCard === 'vehicle' && 'Status harian per kendaraan'}
                {activeCard === 'gps' && 'Status harian GPS/WiFi per kendaraan'}
                {activeCard === 'mileage' && 'Rincian jarak tempuh harian per unit kendaraan'}
                {activeCard === 'moving' && 'Rincian durasi bergerak harian per unit kendaraan'}
                {activeCard === 'stopping' && 'Rincian durasi berhenti harian per unit kendaraan'}
              </div>
            </div>

            {/* Compact Badges on the Right for Breakdown Views */}
            {activeCard === 'vehicle' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#fee2e2',
                    color: '#dc2626',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700
                  }}
                >
                  <Car size={16} />
                  <span>{vehicleBreakdownData.totalHk} HK rusak</span>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700
                  }}
                >
                  <Users size={16} />
                  <span>{vehicleBreakdownData.affectedUnitsCount} unit terdampak</span>
                </div>
              </div>
            )}

            {activeCard === 'gps' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#fef3c7',
                    color: '#b45309',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700
                  }}
                >
                  <Wifi size={16} />
                  <span>{gpsBreakdownData.totalHk} HK rusak</span>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700
                  }}
                >
                  <Users size={16} />
                  <span>{gpsBreakdownData.affectedUnitsCount} unit terdampak</span>
                </div>
              </div>
            )}
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* COMPACT SUB-STATISTICS FOR GPS, MILEAGE, MOVING, STOPPING      */}
          {/* ───────────────────────────────────────────────────────────── */}
          {activeCard === 'gps' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', padding: '2px 0 4px 0', maxWidth: '780px' }}>
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #2563eb',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Total HK Rusak
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {gpsBreakdownData.totalHk} HK
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    {gpsBreakdownData.affectedUnitsCount} unit terdampak
                  </div>
                </div>

                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #f59e0b',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Penyebab GPS
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {gpsBreakdownData.gpsCount} HK
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    {Math.round((gpsBreakdownData.gpsCount / (gpsBreakdownData.totalHk || 1)) * 100)}% dari total
                  </div>
                </div>

                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #0d9488',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Penyebab AP / WiFi
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {gpsBreakdownData.wifiCount} HK
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    {Math.round((gpsBreakdownData.wifiCount / (gpsBreakdownData.totalHk || 1)) * 100)}% dari total
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCard === 'mileage' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '2px 0 4px 0' }}>
                {/* Total */}
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #2563eb',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '2px'
                  }}
                >
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Total
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {fmtKm(operationalData.mileage.totalMileageKm)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    Total jarak tempuh
                  </div>
                  <div style={{ height: '14px' }} />
                </div>

                {/* Rata-rata */}
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #0d9488',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '2px'
                  }}
                >
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Rata-rata
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {fmtKm(operationalData.mileage.avgMileageKm)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    per unit-hari
                  </div>
                  <div style={{ height: '14px' }} />
                </div>

                {/* Terendah Harian */}
                <ExtremumCard
                  label="TERENDAH HARIAN"
                  borderColor="#f59e0b"
                  data={operationalData.mileage.lowestDaily}
                  unitType="km"
                  onSelect={handleSelectExtremum}
                  onOpenTieModal={openTieModal}
                />

                {/* Tertinggi Harian */}
                <ExtremumCard
                  label="TERTINGGI HARIAN"
                  borderColor="#16a34a"
                  data={operationalData.mileage.highestDaily}
                  unitType="km"
                  onSelect={handleSelectExtremum}
                  onOpenTieModal={openTieModal}
                />
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Statistik per Shift
                </div>
                <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem' }}>
                    <thead>
                      <tr style={{ background: '#1570ef', color: '#ffffff' }}>
                        <th style={{ padding: '8px 14px', fontWeight: 700, textAlign: 'left', width: '16%' }}>SHIFT</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'center', width: '20%' }}>TOTAL</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'center', width: '20%' }}>RATA-RATA</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'center', width: '22%' }}>TERENDAH</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'center', width: '22%' }}>TERTINGGI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationalData.mileage.shiftStats.map((s, idx) => (
                        <tr
                          key={s.shift}
                          style={{
                            borderBottom: idx < 2 ? '1px solid #f1f5f9' : 'none',
                            background: idx % 2 === 1 ? '#fafcff' : '#ffffff',
                            height: '80px'
                          }}
                        >
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#0f172a', textAlign: 'left', verticalAlign: 'middle' }}>
                            {s.shift}
                          </td>
                          <td style={{ padding: '8px 12px', color: '#0f172a', fontWeight: 600, textAlign: 'center', verticalAlign: 'middle' }}>
                            {fmtKm(s.total)}
                          </td>
                          <td style={{ padding: '8px 12px', color: '#0f172a', textAlign: 'center', verticalAlign: 'middle' }}>
                            {fmtKm(s.avg)}
                          </td>
                          <td style={{ padding: '8px 12px', textAlign: 'center', verticalAlign: 'middle' }}>
                            <ExtremumShiftCell
                              data={s.lowest}
                              unitType="km"
                              shiftLabel={s.shift}
                              statType="Terendah"
                              onSelect={handleSelectExtremum}
                              onOpenTieModal={openTieModal}
                            />
                          </td>
                          <td style={{ padding: '8px 12px', textAlign: 'center', verticalAlign: 'middle' }}>
                            <ExtremumShiftCell
                              data={s.highest}
                              unitType="km"
                              shiftLabel={s.shift}
                              statType="Tertinggi"
                              onSelect={handleSelectExtremum}
                              onOpenTieModal={openTieModal}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeCard === 'moving' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '2px 0 4px 0' }}>
                {/* Total */}
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #2563eb',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '2px'
                  }}
                >
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Total
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {formatDurationJamMenit(operationalData.moving.totalMovingMins)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    {operationalData.moving.movingPct}% dari total operasional
                  </div>
                  <div style={{ height: '14px' }} />
                </div>

                {/* Rata-rata */}
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #0d9488',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '2px'
                  }}
                >
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Rata-rata
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {formatDurationJamMenit(operationalData.moving.avgMovingMins)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    per unit-hari
                  </div>
                  <div style={{ height: '14px' }} />
                </div>

                {/* Terendah Harian */}
                <ExtremumCard
                  label="TERENDAH HARIAN"
                  borderColor="#f59e0b"
                  data={operationalData.moving.lowestDaily}
                  unitType="duration"
                  onSelect={handleSelectExtremum}
                  onOpenTieModal={openTieModal}
                />

                {/* Tertinggi Harian */}
                <ExtremumCard
                  label="TERTINGGI HARIAN"
                  borderColor="#16a34a"
                  data={operationalData.moving.highestDaily}
                  unitType="duration"
                  onSelect={handleSelectExtremum}
                  onOpenTieModal={openTieModal}
                />
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Statistik per Shift
                </div>
                <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem' }}>
                    <thead>
                      <tr style={{ background: '#1570ef', color: '#ffffff' }}>
                        <th style={{ padding: '8px 14px', fontWeight: 700, textAlign: 'left', width: '16%' }}>SHIFT</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'center', width: '20%' }}>TOTAL</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'center', width: '20%' }}>RATA-RATA</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'center', width: '22%' }}>TERENDAH</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'center', width: '22%' }}>TERTINGGI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationalData.moving.shiftStats.map((s, idx) => (
                        <tr
                          key={s.shift}
                          style={{
                            borderBottom: idx < 2 ? '1px solid #f1f5f9' : 'none',
                            background: idx % 2 === 1 ? '#fafcff' : '#ffffff',
                            height: '80px'
                          }}
                        >
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#0f172a', textAlign: 'left', verticalAlign: 'middle' }}>
                            {s.shift}
                          </td>
                          <td style={{ padding: '8px 12px', color: '#0f172a', fontWeight: 600, textAlign: 'center', verticalAlign: 'middle' }}>
                            {formatDurationJamMenit(s.totalMins)}
                          </td>
                          <td style={{ padding: '8px 12px', color: '#0f172a', textAlign: 'center', verticalAlign: 'middle' }}>
                            {formatDurationJamMenit(s.avgMins)}
                          </td>
                          <td style={{ padding: '8px 12px', textAlign: 'center', verticalAlign: 'middle' }}>
                            <ExtremumShiftCell
                              data={s.lowest}
                              unitType="duration"
                              shiftLabel={s.shift}
                              statType="Terendah"
                              onSelect={handleSelectExtremum}
                              onOpenTieModal={openTieModal}
                            />
                          </td>
                          <td style={{ padding: '8px 12px', textAlign: 'center', verticalAlign: 'middle' }}>
                            <ExtremumShiftCell
                              data={s.highest}
                              unitType="duration"
                              shiftLabel={s.shift}
                              statType="Tertinggi"
                              onSelect={handleSelectExtremum}
                              onOpenTieModal={openTieModal}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeCard === 'stopping' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '2px 0 4px 0' }}>
                {/* Total */}
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #2563eb',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '2px'
                  }}
                >
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Total
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {formatDurationJamMenit(operationalData.stopping.totalStoppingMins)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    {operationalData.stopping.stoppingPct}% dari total operasional
                  </div>
                  <div style={{ height: '14px' }} />
                </div>

                {/* Rata-rata */}
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #0d9488',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '2px'
                  }}
                >
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Rata-rata
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {formatDurationJamMenit(operationalData.stopping.avgStoppingMins)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    per unit-hari
                  </div>
                  <div style={{ height: '14px' }} />
                </div>

                {/* Terendah Harian */}
                <ExtremumCard
                  label="TERENDAH HARIAN"
                  borderColor="#f59e0b"
                  data={operationalData.stopping.lowestDaily}
                  unitType="duration"
                  onSelect={handleSelectExtremum}
                  onOpenTieModal={openTieModal}
                />

                {/* Tertinggi Harian */}
                <ExtremumCard
                  label="TERTINGGI HARIAN"
                  borderColor="#16a34a"
                  data={operationalData.stopping.highestDaily}
                  unitType="duration"
                  onSelect={handleSelectExtremum}
                  onOpenTieModal={openTieModal}
                />
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Statistik per Shift
                </div>
                <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem' }}>
                    <thead>
                      <tr style={{ background: '#1570ef', color: '#ffffff' }}>
                        <th style={{ padding: '8px 14px', fontWeight: 700, textAlign: 'left', width: '16%' }}>SHIFT</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'center', width: '20%' }}>TOTAL</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'center', width: '20%' }}>RATA-RATA</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'center', width: '22%' }}>TERENDAH</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'center', width: '22%' }}>TERTINGGI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationalData.stopping.shiftStats.map((s, idx) => (
                        <tr
                          key={s.shift}
                          style={{
                            borderBottom: idx < 2 ? '1px solid #f1f5f9' : 'none',
                            background: idx % 2 === 1 ? '#fafcff' : '#ffffff',
                            height: '80px'
                          }}
                        >
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: '#0f172a', textAlign: 'left', verticalAlign: 'middle' }}>
                            {s.shift}
                          </td>
                          <td style={{ padding: '8px 12px', color: '#0f172a', fontWeight: 600, textAlign: 'center', verticalAlign: 'middle' }}>
                            {formatDurationJamMenit(s.totalMins)}
                          </td>
                          <td style={{ padding: '8px 12px', color: '#0f172a', textAlign: 'center', verticalAlign: 'middle' }}>
                            {formatDurationJamMenit(s.avgMins)}
                          </td>
                          <td style={{ padding: '8px 12px', textAlign: 'center', verticalAlign: 'middle' }}>
                            <ExtremumShiftCell
                              data={s.lowest}
                              unitType="duration"
                              shiftLabel={s.shift}
                              statType="Terendah"
                              onSelect={handleSelectExtremum}
                              onOpenTieModal={openTieModal}
                            />
                          </td>
                          <td style={{ padding: '8px 12px', textAlign: 'center', verticalAlign: 'middle' }}>
                            <ExtremumShiftCell
                              data={s.highest}
                              unitType="duration"
                              shiftLabel={s.shift}
                              statType="Tertinggi"
                              onSelect={handleSelectExtremum}
                              onOpenTieModal={openTieModal}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────── */}
          {/* TOOLBAR PENCARIAN & PAGE SIZE (LANGSUNG DI ATAS TABEL)       */}
          {/* ───────────────────────────────────────────────────────────── */}
          {highlightedRowKey && (
            <div
              style={{
                marginBottom: '10px',
                padding: '6px 14px',
                background: '#fefce8',
                border: '1px solid #fde047',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#854d0e',
                animation: 'fadeIn 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 700, background: '#fde047', padding: '1px 6px', borderRadius: '4px' }}>
                  Disorot
                </span>
                <span>
                  Record terpilih:{' '}
                  <strong>{formatDateIndo(highlightedRowKey.split('__')[0])}</strong> · Unit ID{' '}
                  <strong>{highlightedRowKey.split('__')[1]}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setHighlightedRowKey(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#854d0e',
                  cursor: 'pointer',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}
              >
                <X size={13} /> Hapus Sorotan
              </button>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
              gap: '12px'
            }}
          >
            <div
              style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '6px 12px'
              }}
            >
              <Search size={15} color="#94a3b8" style={{ marginRight: '8px', flexShrink: 0 }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder={
                  activeCard === 'vehicle'
                    ? 'Cari unit atau keterangan...'
                    : 'Cari unit kendaraan atau tanggal...'
                }
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '0.78rem',
                  color: '#0f172a',
                  width: '100%',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(parseInt(e.target.value, 10))
                setCurrentPage(1)
              }}
              style={{
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                borderRadius: '6px',
                padding: '6px 10px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#0f172a',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* TABEL DETAIL HARIAN (BLUE HEADER, ALTERNATING ROWS)          */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div ref={detailTableRef} style={{ borderRadius: '6px', overflowX: 'auto', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
              <thead>
                <tr style={{ background: '#1570ef', color: '#ffffff' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>TANGGAL</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>ESTATE</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'left' }}>UNIT KENDARAAN</th>

                  {/* 4. VEHICLE BREAKDOWN: Kolom Tanggal | Estate | Unit Kendaraan | Status Harian | Status Kerusakan | Keterangan */}
                  {activeCard === 'vehicle' && (
                    <>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>STATUS HARIAN</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>STATUS KERUSAKAN</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'left' }}>KETERANGAN</th>
                    </>
                  )}

                  {/* GPS BREAKDOWN: Tanpa kolom shift */}
                  {activeCard === 'gps' && (
                    <>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>PENYEBAB</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>HK RUSAK</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'left' }}>KETERANGAN</th>
                    </>
                  )}

                  {/* MILEAGE */}
                  {activeCard === 'mileage' && (
                    <>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>TOTAL JARAK</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>SHIFT 1</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>SHIFT 2</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>SHIFT 3</th>
                    </>
                  )}

                  {/* MOVING TIME */}
                  {activeCard === 'moving' && (
                    <>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>TOTAL MOVING</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>SHIFT 1</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>SHIFT 2</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>SHIFT 3</th>
                    </>
                  )}

                  {/* STOPPING TIME */}
                  {activeCard === 'stopping' && (
                    <>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>TOTAL STOPPING</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>SHIFT 1</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>SHIFT 2</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>SHIFT 3</th>
                    </>
                  )}
                </tr>
              </thead>

              <tbody>
                {activeTableData.rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
                      Tidak ada data yang sesuai dengan filter atau pencarian.
                    </td>
                  </tr>
                ) : (
                  activeTableData.rows.map((row: any, idx: number) => {
                    const rowKey = `${row.date}__${row.vehicleId}`
                    const isHighlighted = highlightedRowKey === rowKey

                    return (
                      <tr
                        key={row.id || `${row.date}-${row.vehicleId}-${idx}`}
                        style={{
                          borderBottom: '1px solid #f1f5f9',
                          background: isHighlighted ? '#fef9c3' : (idx % 2 === 1 ? '#fafcff' : '#ffffff'),
                          boxShadow: isHighlighted ? 'inset 0 0 0 2px #eab308' : 'none',
                          height: '56px',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = isHighlighted ? '#fef08a' : '#f0f7ff')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = isHighlighted ? '#fef9c3' : (idx % 2 === 1 ? '#fafcff' : '#ffffff'))}
                      >
                        {/* Tanggal (Rata Tengah) */}
                        <td style={{ padding: '10px 14px', color: '#334155', whiteSpace: 'nowrap', textAlign: 'center' }}>
                          {formatDateIndo(row.date)}
                        </td>

                        {/* Estate (Rata Tengah) */}
                        <td style={{ padding: '10px 14px', color: '#334155', fontWeight: 500, textAlign: 'center' }}>
                          {row.estateId}
                        </td>

                        {/* Unit Kendaraan (Rata Kiri, Nopol Bold, ID Subteks) */}
                        <td style={{ padding: '10px 14px', textAlign: 'left' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontWeight: 700, color: '#0f172a' }}>{row.nopol}</span>
                            {isHighlighted && (
                              <span
                                style={{
                                  fontSize: '0.65rem',
                                  background: '#fde047',
                                  color: '#854d0e',
                                  border: '1px solid #eab308',
                                  padding: '1px 6px',
                                  borderRadius: '4px',
                                  fontWeight: 700
                                }}
                              >
                                Disorot
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>ID: {row.vehicleId}</div>
                        </td>

                        {/* 4. VEHICLE BREAKDOWN: Status Harian (Tengah), Status Kerusakan (Tengah), Keterangan (Kiri) */}
                        {activeCard === 'vehicle' && (
                          <>
                            {/* Status Harian (Rata Tengah) */}
                            <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                              {row.statusHarian === 'Rusak' ? (
                                <span
                                  style={{
                                    background: '#fee2e2',
                                    color: '#dc2626',
                                    padding: '3px 10px',
                                    borderRadius: '4px',
                                    fontSize: '0.74rem',
                                    fontWeight: 600,
                                    display: 'inline-block'
                                  }}
                                >
                                  Rusak
                                </span>
                              ) : (
                                <span
                                  style={{
                                    background: '#dcfce7',
                                    color: '#16a34a',
                                    padding: '3px 10px',
                                    borderRadius: '4px',
                                    fontSize: '0.74rem',
                                    fontWeight: 600,
                                    display: 'inline-block'
                                  }}
                                >
                                  Aktif
                                </span>
                              )}
                            </td>

                            {/* Status Kerusakan (Rata Tengah) */}
                            <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                              {row.statusHarian === 'Aktif' ? (
                                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>—</span>
                              ) : row.statusKerusakan ? (
                                row.statusKerusakan === 'Belum Pulih' ? (
                                  <span
                                    style={{
                                      background: '#fef3c7',
                                      color: '#b45309',
                                      border: '1px solid #fde68a',
                                      padding: '3px 10px',
                                      borderRadius: '4px',
                                      fontSize: '0.74rem',
                                      fontWeight: 600,
                                      display: 'inline-block'
                                    }}
                                  >
                                    Belum Pulih
                                  </span>
                                ) : row.statusKerusakan === 'Selesai' ? (
                                  <span
                                    style={{
                                      background: '#dcfce7',
                                      color: '#16a34a',
                                      border: '1px solid #bbf7d0',
                                      padding: '3px 10px',
                                      borderRadius: '4px',
                                      fontSize: '0.74rem',
                                      fontWeight: 600,
                                      display: 'inline-block'
                                    }}
                                  >
                                    Selesai
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      background: '#eff6ff',
                                      color: '#2563eb',
                                      border: '1px solid #bfdbfe',
                                      padding: '3px 10px',
                                      borderRadius: '4px',
                                      fontSize: '0.74rem',
                                      fontWeight: 600,
                                      display: 'inline-block'
                                    }}
                                  >
                                    {row.statusKerusakan}
                                  </span>
                                )
                              ) : (
                                <span
                                  style={{
                                    background: '#f1f5f9',
                                    color: '#64748b',
                                    border: '1px solid #e2e8f0',
                                    padding: '3px 10px',
                                    borderRadius: '4px',
                                    fontSize: '0.74rem',
                                    fontWeight: 600,
                                    display: 'inline-block'
                                  }}
                                >
                                  Belum diisi
                                </span>
                              )}
                            </td>

                            {/* Keterangan (Rata Kiri) */}
                            <td style={{ padding: '10px 14px', color: '#475569', textAlign: 'left' }}>
                              {row.keterangan}
                            </td>
                          </>
                        )}

                        {/* GPS BREAKDOWN: Penyebab (Tengah), HK Rusak (Tengah), Keterangan (Kiri) */}
                        {activeCard === 'gps' && (
                          <>
                            <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                              <span
                                style={{
                                  background: '#fef3c7',
                                  color: '#b45309',
                                  padding: '3px 10px',
                                  borderRadius: '4px',
                                  fontSize: '0.74rem',
                                  fontWeight: 600,
                                  display: 'inline-block'
                                }}
                              >
                                {row.penyebab}
                              </span>
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'center', color: '#0f172a', fontWeight: 700 }}>
                              {row.hkRusak !== null ? row.hkRusak : '—'}
                            </td>
                            <td style={{ padding: '10px 14px', color: '#475569', textAlign: 'left' }}>
                              {row.keterangan}
                            </td>
                          </>
                        )}

                        {/* MILEAGE */}
                        {activeCard === 'mileage' && (
                          <>
                            <td style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>
                              <div>{fmtKm(row.totalKm)}</div>
                              {!row.isCompleteDay && (
                                <span
                                  title="Data parsial: tidak semua shift memiliki rekaman"
                                  style={{
                                    display: 'inline-block',
                                    marginTop: '2px',
                                    fontSize: '0.68rem',
                                    fontWeight: 600,
                                    color: '#b45309',
                                    background: '#fef3c7',
                                    border: '1px solid #fde68a',
                                    padding: '1px 6px',
                                    borderRadius: '4px'
                                  }}
                                >
                                  Parsial
                                </span>
                              )}
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                              {row.hasShift1 && row.shift1Km !== null ? fmtKm(row.shift1Km) : '—'}
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                              {row.hasShift2 && row.shift2Km !== null ? fmtKm(row.shift2Km) : '—'}
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                              {row.hasShift3 && row.shift3Km !== null ? fmtKm(row.shift3Km) : '—'}
                            </td>
                          </>
                        )}

                        {/* MOVING TIME */}
                        {activeCard === 'moving' && (
                          <>
                            <td style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>
                              <div>{formatDurationJamMenit(row.totalMovingMins)}</div>
                              {!row.isCompleteDay && (
                                <span
                                  title="Data parsial: tidak semua shift memiliki rekaman"
                                  style={{
                                    display: 'inline-block',
                                    marginTop: '2px',
                                    fontSize: '0.68rem',
                                    fontWeight: 600,
                                    color: '#b45309',
                                    background: '#fef3c7',
                                    border: '1px solid #fde68a',
                                    padding: '1px 6px',
                                    borderRadius: '4px'
                                  }}
                                >
                                  Parsial
                                </span>
                              )}
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                              {row.hasShift1 && row.shift1MovingMins !== null ? formatDurationJamMenit(row.shift1MovingMins) : '—'}
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                              {row.hasShift2 && row.shift2MovingMins !== null ? formatDurationJamMenit(row.shift2MovingMins) : '—'}
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                              {row.hasShift3 && row.shift3MovingMins !== null ? formatDurationJamMenit(row.shift3MovingMins) : '—'}
                            </td>
                          </>
                        )}

                        {/* STOPPING TIME */}
                        {activeCard === 'stopping' && (
                          <>
                            <td style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>
                              <div>{formatDurationJamMenit(row.totalStoppingMins)}</div>
                              {!row.isCompleteDay && (
                                <span
                                  title="Data parsial: tidak semua shift memiliki rekaman"
                                  style={{
                                    display: 'inline-block',
                                    marginTop: '2px',
                                    fontSize: '0.68rem',
                                    fontWeight: 600,
                                    color: '#b45309',
                                    background: '#fef3c7',
                                    border: '1px solid #fde68a',
                                    padding: '1px 6px',
                                    borderRadius: '4px'
                                  }}
                                >
                                  Parsial
                                </span>
                              )}
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                              {row.hasShift1 && row.shift1StoppingMins !== null ? formatDurationJamMenit(row.shift1StoppingMins) : '—'}
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                              {row.hasShift2 && row.shift2StoppingMins !== null ? formatDurationJamMenit(row.shift2StoppingMins) : '—'}
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                              {row.hasShift3 && row.shift3StoppingMins !== null ? formatDurationJamMenit(row.shift3StoppingMins) : '—'}
                            </td>
                          </>
                        )}
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* TABLE FOOTER / PAGINATION                                     */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '12px',
              fontSize: '0.75rem',
              color: '#64748b'
            }}
          >
            <div>
              Menampilkan {activeTableData.total > 0 ? (currentPage - 1) * pageSize + 1 : 0}-
              {Math.min(currentPage * pageSize, activeTableData.total)} dari {activeTableData.total} data
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginRight: '8px' }}>Data ilustrasi</span>

              {/* Prev button */}
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                style={{
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  borderRadius: '4px',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage <= 1 ? 0.4 : 1
                }}
              >
                <ChevronLeft size={14} color="#64748b" />
              </button>

              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    border: pageNum === currentPage ? 'none' : '1px solid #cbd5e1',
                    background: pageNum === currentPage ? '#2563eb' : '#ffffff',
                    color: pageNum === currentPage ? '#ffffff' : '#475569',
                    borderRadius: '4px',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontWeight: pageNum === currentPage ? 700 : 500
                  }}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next button */}
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                style={{
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  borderRadius: '4px',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage >= totalPages ? 0.4 : 1
                }}
              >
                <ChevronRight size={14} color="#64748b" />
              </button>
            </div>
          </div>

          {/* Subtext info under table */}
          {activeCard === 'vehicle' && (
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '6px' }}>
              HK rusak dihitung per kendaraan per hari.
            </div>
          )}
          {activeCard === 'gps' && (
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '6px' }}>
              HK rusak GPS/WiFi dihitung per kendaraan per hari.
            </div>
          )}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MODAL DAFTAR RECORD DENGAN NILAI EKSTREM SAMA                 */}
      {/* ───────────────────────────────────────────────────────────── */}
      {tieModal.isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px'
          }}
          onClick={() => setTieModal(prev => ({ ...prev, isOpen: false }))}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid #e2e8f0'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#f8fafc'
              }}
            >
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                  Daftar Record Nilai Sama: {tieModal.title}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                  Ditemukan {tieModal.records.length} record dengan nilai yang sama (diurutkan tanggal terbaru, lalu nomor polisi)
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTieModal(prev => ({ ...prev, isOpen: false }))}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Tutup modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body Table */}
            <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                <thead>
                  <tr style={{ background: '#1570ef', color: '#ffffff' }}>
                    <th style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 700, borderRadius: '4px 0 0 0' }}>NO</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 700 }}>TANGGAL</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 700 }}>ESTATE</th>
                    <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 700 }}>UNIT KENDARAAN</th>
                    {tieModal.records.some(r => !!r.shift) && (
                      <th style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 700 }}>SHIFT</th>
                    )}
                    <th style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 700 }}>NILAI</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 700, borderRadius: '0 4px 0 0' }}>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {tieModal.records.map((r, i) => (
                    <tr
                      key={`${r.date}-${r.vehicleId}-${r.shift || 'daily'}-${i}`}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        background: i % 2 === 1 ? '#fafcff' : '#ffffff'
                      }}
                    >
                      <td style={{ padding: '8px 10px', textAlign: 'center', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '8px 10px', textAlign: 'center', color: '#0f172a', fontWeight: 500 }}>
                        {formatDateIndo(r.date)}
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'center', color: '#475569' }}>
                        {r.estateId}
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'left' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{r.nopol}</div>
                        <div style={{ fontSize: '0.68rem', color: '#64748b' }}>ID: {r.vehicleId}</div>
                      </td>
                      {tieModal.records.some(rec => !!rec.shift) && (
                        <td style={{ padding: '8px 10px', textAlign: 'center', color: '#475569', fontWeight: 500 }}>
                          {r.shift || '—'}
                        </td>
                      )}
                      <td style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>
                        {tieModal.unitType === 'km' ? fmtKm(r.val) : formatDurationJamMenit(r.val)}
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setTieModal(prev => ({ ...prev, isOpen: false }))
                            handleSelectExtremum(r)
                          }}
                          style={{
                            background: '#eff6ff',
                            color: '#1d4ed8',
                            border: '1px solid #bfdbfe',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#2563eb'
                            e.currentTarget.style.color = '#ffffff'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#eff6ff'
                            e.currentTarget.style.color = '#1d4ed8'
                          }}
                        >
                          Sorot di Tabel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '12px 20px',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'flex-end',
                background: '#f8fafc'
              }}
            >
              <button
                type="button"
                onClick={() => setTieModal(prev => ({ ...prev, isOpen: false }))}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '6px 16px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer'
                }}
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
