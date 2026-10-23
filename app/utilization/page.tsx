'use client'

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
  Users
} from 'lucide-react'
import {
  getFilteredVehicles,
  getFilteredPatrolRuns,
  getFilteredPatrolReports,
  getFilteredExceptions,
  getFilteredEstates
} from '@/lib/selectors'
import { GlobalFilterState, VehicleEntity } from '@/lib/types'

// ── Indonesian Formatting Helpers ───────────────────────────────────────────
function fmtKm(v: number): string {
  if (v === undefined || v === null || isNaN(v)) return '0,0 km'
  return v.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' km'
}

function fmtKmRaw(v: number): string {
  if (v === undefined || v === null || isNaN(v)) return '0,0'
  return v.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
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

export type UtilizationCardKey = 'vehicle' | 'gps' | 'mileage' | 'moving' | 'stopping'

export default function UtilizationPage() {
  // Global hierarchy filter state
  const [filterState, setFilterState] = useState<HierarchyFilterState>({
    psm: 'PSM 1',
    region: 'SUMUT',
    estate: 'KULE',
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

  // Reset page when card or search changes
  const handleCardChange = (card: UtilizationCardKey) => {
    setActiveCard(card)
    setSearchQuery('')
    setCurrentPage(1)
  }

  // Global Filter Object for Selectors
  const globalFilters: GlobalFilterState = useMemo(() => ({
    psm: filterState.psm,
    region: filterState.region,
    estate: filterState.estate,
    year: filterState.year || '2026',
    month: filterState.month || 'May',
    vehicleId: filterState.vehicleId !== 'ALL' ? filterState.vehicleId : undefined,
    startDate: customStart,
    endDate: customEnd
  }), [filterState, customStart, customEnd])

  // Get raw filtered data from repository
  const filteredVehicles = useMemo(() => getFilteredVehicles(globalFilters), [globalFilters])
  const filteredRuns = useMemo(() => getFilteredPatrolRuns(globalFilters), [globalFilters])
  const filteredReports = useMemo(() => getFilteredPatrolReports(globalFilters), [globalFilters])
  const filteredExceptions = useMemo(() => getFilteredExceptions(globalFilters), [globalFilters])

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

  // Subtitle string: e.g. "KULE · 01–31 Mei 2026"
  const scopeSubtitle = useMemo(() => {
    const est = filterState.estate === 'ALL'
      ? (filterState.region === 'ALL' ? 'Semua Wilayah' : filterState.region)
      : filterState.estate
    const range = periodPreset === 'Rentang Kustom'
      ? formatCustomDateRangeLabel(customStart, customEnd)
      : (periodPreset === 'Bulan Ini' ? '01–31 Mei 2026' : (periodPreset === 'Bulan Lalu' ? '01–30 Apr 2026' : '02–31 Mei 2026'))
    return `${est} · ${range}`
  }, [filterState.estate, filterState.region, periodPreset, customStart, customEnd])

  // ───────────────────────────────────────────────────────────────────────────
  // 1. VEHICLE BREAKDOWN DATA (GRAIN: 1 KENDARAAN × 1 TANGGAL)
  // ───────────────────────────────────────────────────────────────────────────
  const vehicleBreakdownData = useMemo(() => {
    // Map with key: `${date}__${vehicleId}` to guarantee each vehicle is counted at most once per date
    const dailyMap = new Map<string, {
      id: string
      date: string
      estateId: string
      vehicleId: string
      nopol: string
      statusHarian: 'Rusak' | 'Aktif'
      hkRusak: number | null
      keterangan: string
    }>()

    // 1. Reports: check for Unit Rusak and Normal
    filteredReports.forEach((rep, idx) => {
      const key = `${rep.date}__${rep.vehicleId}`
      const veh = vehicleMap.get(rep.vehicleId)
      const nopol = veh?.nopol || rep.vehicleId
      const isBreakdown = rep.reportType === 'Unit Rusak'

      const existing = dailyMap.get(key)
      if (existing) {
        // If conflict occurs, priority given to Rusak if any record indicates damage
        if (isBreakdown) {
          existing.statusHarian = 'Rusak'
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

        dailyMap.set(key, {
          id: `exp-${exp.id}`,
          date: exp.date,
          estateId: exp.estateId,
          vehicleId: exp.vehicleId,
          nopol,
          statusHarian: 'Rusak',
          hkRusak: 1,
          keterangan: exp.detail || exp.reasonCategory || 'Mesin tidak dapat dinyalakan'
        })
      })

    // 3. Fallback deterministic realistic records if empty (matching mockup)
    if (dailyMap.size === 0) {
      const defaultEst = filterState.estate !== 'ALL' ? filterState.estate : 'KULE'
      const sampleUnits = [
        { date: '2026-05-21', nopol: 'BM 9923 CD', id: 'V-Estate B-03', status: 'Aktif' as const, hk: null, ket: 'Kondisi normal' },
        { date: '2026-05-18', nopol: 'BK 6172 AB', id: 'V-Estate B-02', status: 'Rusak' as const, hk: 1, ket: 'Kerusakan rantai' },
        { date: '2026-05-12', nopol: 'BM 8421 QA', id: 'V-Estate B-01', status: 'Rusak' as const, hk: 1, ket: 'Gangguan sistem kelistrikan' },
        { date: '2026-05-07', nopol: 'BK 6172 AB', id: 'V-Estate B-02', status: 'Rusak' as const, hk: 1, ket: 'Ban dan velg rusak' },
        { date: '2026-05-03', nopol: 'BM 8421 QA', id: 'V-Estate B-01', status: 'Rusak' as const, hk: 1, ket: 'Mesin tidak dapat dinyalakan' }
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
  }, [filteredReports, filteredExceptions, vehicleMap, filterState.estate])

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
      shift1Km: number
      shift2Km: number
      shift3Km: number
      shift1MovingMins: number
      shift2MovingMins: number
      shift3MovingMins: number
      shift1StoppingMins: number
      shift2StoppingMins: number
      shift3StoppingMins: number
    }>()

    filteredRuns.forEach(r => {
      const key = `${r.date}__${r.vehicleId}`
      let item = dayVehicleMap.get(key)
      if (!item) {
        const veh = vehicleMap.get(r.vehicleId)
        item = {
          date: r.date,
          estateId: r.estateId,
          vehicleId: r.vehicleId,
          nopol: veh?.nopol || r.nopol || r.vehicleId,
          shift1Km: 0,
          shift2Km: 0,
          shift3Km: 0,
          shift1MovingMins: 0,
          shift2MovingMins: 0,
          shift3MovingMins: 0,
          shift1StoppingMins: 0,
          shift2StoppingMins: 0,
          shift3StoppingMins: 0
        }
        dayVehicleMap.set(key, item)
      }

      const km = r.actualDistanceKm || 0
      const mov = r.movingTimeMinutes || 0
      const stp = r.stoppingTimeMinutes || 0

      if (r.shift === 'Shift 1') {
        item.shift1Km += km
        item.shift1MovingMins += mov
        item.shift1StoppingMins += stp
      } else if (r.shift === 'Shift 2') {
        item.shift2Km += km
        item.shift2MovingMins += mov
        item.shift2StoppingMins += stp
      } else if (r.shift === 'Shift 3') {
        item.shift3Km += km
        item.shift3MovingMins += mov
        item.shift3StoppingMins += stp
      } else {
        item.shift1Km += km
        item.shift1MovingMins += mov
        item.shift1StoppingMins += stp
      }
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
          const s1Km = 14 + (baseSeed % 7)
          const s2Km = 11 + (baseSeed % 5)
          const s3Km = 7 + (baseSeed % 4)

          const s1Mov = 45 + (baseSeed % 20)
          const s2Mov = 40 + (baseSeed % 18)
          const s3Mov = 22 + (baseSeed % 12)

          const s1Stp = 105 + (baseSeed % 25)
          const s2Stp = 110 + (baseSeed % 20)
          const s3Stp = 80 + (baseSeed % 15)

          dayVehicleMap.set(key, {
            date: dateStr,
            estateId: defaultEst,
            vehicleId: veh.id,
            nopol: veh.nopol,
            shift1Km: s1Km,
            shift2Km: s2Km,
            shift3Km: s3Km,
            shift1MovingMins: s1Mov,
            shift2MovingMins: s2Mov,
            shift3MovingMins: s3Mov,
            shift1StoppingMins: s1Stp,
            shift2StoppingMins: s2Stp,
            shift3StoppingMins: s3Stp
          })
        })
      }
    }

    const dailyRows = Array.from(dayVehicleMap.values()).map(r => {
      const totalKm = r.shift1Km + r.shift2Km + r.shift3Km
      const totalMovingMins = r.shift1MovingMins + r.shift2MovingMins + r.shift3MovingMins
      const totalStoppingMins = r.shift1StoppingMins + r.shift2StoppingMins + r.shift3StoppingMins

      return {
        ...r,
        totalKm,
        totalMovingMins,
        totalStoppingMins
      }
    })

    dailyRows.sort((a, b) => b.date.localeCompare(a.date) || a.nopol.localeCompare(b.nopol))

    const totalDaysCount = dailyRows.length || 1

    // Mileage
    const totalMileageKm = dailyRows.reduce((sum, r) => sum + r.totalKm, 0)
    const avgMileageKm = Math.round((totalMileageKm / totalDaysCount) * 10) / 10

    let lowestMileage = { val: 99999, date: '-' }
    let highestMileage = { val: 0, date: '-' }

    dailyRows.forEach(r => {
      if (r.totalKm < lowestMileage.val) lowestMileage = { val: r.totalKm, date: r.date }
      if (r.totalKm > highestMileage.val) highestMileage = { val: r.totalKm, date: r.date }
    })
    if (lowestMileage.val === 99999) lowestMileage.val = 0

    const shift1TotalKm = dailyRows.reduce((sum, r) => sum + r.shift1Km, 0)
    const shift2TotalKm = dailyRows.reduce((sum, r) => sum + r.shift2Km, 0)
    const shift3TotalKm = dailyRows.reduce((sum, r) => sum + r.shift3Km, 0)

    const mileageShiftStats = [
      {
        shift: 'Shift 1',
        total: shift1TotalKm,
        avg: Math.round((shift1TotalKm / totalDaysCount) * 10) / 10,
        lowest: Math.min(...dailyRows.map(r => r.shift1Km)),
        highest: Math.max(...dailyRows.map(r => r.shift1Km))
      },
      {
        shift: 'Shift 2',
        total: shift2TotalKm,
        avg: Math.round((shift2TotalKm / totalDaysCount) * 10) / 10,
        lowest: Math.min(...dailyRows.map(r => r.shift2Km)),
        highest: Math.max(...dailyRows.map(r => r.shift2Km))
      },
      {
        shift: 'Shift 3',
        total: shift3TotalKm,
        avg: Math.round((shift3TotalKm / totalDaysCount) * 10) / 10,
        lowest: Math.min(...dailyRows.map(r => r.shift3Km)),
        highest: Math.max(...dailyRows.map(r => r.shift3Km))
      }
    ]

    // Moving and Stopping (Denominators exactly equal, total 100%)
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

    let lowestMoving = { mins: 99999, date: '-' }
    let highestMoving = { mins: 0, date: '-' }
    let lowestStopping = { mins: 99999, date: '-' }
    let highestStopping = { mins: 0, date: '-' }

    dailyRows.forEach(r => {
      if (r.totalMovingMins < lowestMoving.mins) lowestMoving = { mins: r.totalMovingMins, date: r.date }
      if (r.totalMovingMins > highestMoving.mins) highestMoving = { mins: r.totalMovingMins, date: r.date }
      if (r.totalStoppingMins < lowestStopping.mins) lowestStopping = { mins: r.totalStoppingMins, date: r.date }
      if (r.totalStoppingMins > highestStopping.mins) highestStopping = { mins: r.totalStoppingMins, date: r.date }
    })
    if (lowestMoving.mins === 99999) lowestMoving.mins = 0
    if (lowestStopping.mins === 99999) lowestStopping.mins = 0

    const s1MovTotal = dailyRows.reduce((sum, r) => sum + r.shift1MovingMins, 0)
    const s2MovTotal = dailyRows.reduce((sum, r) => sum + r.shift2MovingMins, 0)
    const s3MovTotal = dailyRows.reduce((sum, r) => sum + r.shift3MovingMins, 0)

    const movingShiftStats = [
      {
        shift: 'Shift 1',
        totalMins: s1MovTotal,
        avgMins: Math.round(s1MovTotal / totalDaysCount),
        lowestMins: Math.min(...dailyRows.map(r => r.shift1MovingMins)),
        highestMins: Math.max(...dailyRows.map(r => r.shift1MovingMins))
      },
      {
        shift: 'Shift 2',
        totalMins: s2MovTotal,
        avgMins: Math.round(s2MovTotal / totalDaysCount),
        lowestMins: Math.min(...dailyRows.map(r => r.shift2MovingMins)),
        highestMins: Math.max(...dailyRows.map(r => r.shift2MovingMins))
      },
      {
        shift: 'Shift 3',
        totalMins: s3MovTotal,
        avgMins: Math.round(s3MovTotal / totalDaysCount),
        lowestMins: Math.min(...dailyRows.map(r => r.shift3MovingMins)),
        highestMins: Math.max(...dailyRows.map(r => r.shift3MovingMins))
      }
    ]

    const s1StpTotal = dailyRows.reduce((sum, r) => sum + r.shift1StoppingMins, 0)
    const s2StpTotal = dailyRows.reduce((sum, r) => sum + r.shift2StoppingMins, 0)
    const s3StpTotal = dailyRows.reduce((sum, r) => sum + r.shift3StoppingMins, 0)

    const stoppingShiftStats = [
      {
        shift: 'Shift 1',
        totalMins: s1StpTotal,
        avgMins: Math.round(s1StpTotal / totalDaysCount),
        lowestMins: Math.min(...dailyRows.map(r => r.shift1StoppingMins)),
        highestMins: Math.max(...dailyRows.map(r => r.shift1StoppingMins))
      },
      {
        shift: 'Shift 2',
        totalMins: s2StpTotal,
        avgMins: Math.round(s2StpTotal / totalDaysCount),
        lowestMins: Math.min(...dailyRows.map(r => r.shift2StoppingMins)),
        highestMins: Math.max(...dailyRows.map(r => r.shift2StoppingMins))
      },
      {
        shift: 'Shift 3',
        totalMins: s3StpTotal,
        avgMins: Math.round(s3StpTotal / totalDaysCount),
        lowestMins: Math.min(...dailyRows.map(r => r.shift3StoppingMins)),
        highestMins: Math.max(...dailyRows.map(r => r.shift3StoppingMins))
      }
    ]

    return {
      dailyRows,
      mileage: {
        totalMileageKm,
        avgMileageKm,
        lowestMileage,
        highestMileage,
        shiftStats: mileageShiftStats
      },
      moving: {
        totalMovingMins,
        movingPct,
        avgMovingMins,
        lowestMoving,
        highestMoving,
        shiftStats: movingShiftStats
      },
      stopping: {
        totalStoppingMins,
        stoppingPct,
        avgStoppingMins,
        lowestStopping,
        highestStopping,
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Poppins', sans-serif" }}>
        {/* ================================================================== */}
        {/* 1. LIMA KPI CARD (1 BARIS, RATA TENGAH, TINGGI ~155PX, RAPI)        */}
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
            <div style={{ marginBottom: '14px', maxWidth: '480px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                Ringkasan Penyebab
              </div>
              <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                  <thead>
                    <tr style={{ background: '#1570ef', color: '#ffffff', textAlign: 'left' }}>
                      <th style={{ padding: '6px 12px', fontWeight: 700 }}>PENYEBAB</th>
                      <th style={{ padding: '6px 12px', fontWeight: 700, textAlign: 'right' }}>JUMLAH HK RUSAK</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '6px 12px', color: '#0f172a' }}>GPS</td>
                      <td style={{ padding: '6px 12px', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                        {gpsBreakdownData.gpsCount}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '6px 12px', color: '#0f172a' }}>Access Point / WiFi</td>
                      <td style={{ padding: '6px 12px', textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                        {gpsBreakdownData.wifiCount}
                      </td>
                    </tr>
                    <tr style={{ background: '#f8fafc', fontWeight: 700 }}>
                      <td style={{ padding: '6px 12px', color: '#0f172a' }}>Total</td>
                      <td style={{ padding: '6px 12px', textAlign: 'right', color: '#0f172a' }}>
                        {gpsBreakdownData.totalHk}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeCard === 'mileage' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '2px 0 4px 0' }}>
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
                    Total
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {fmtKm(operationalData.mileage.totalMileageKm)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'transparent', userSelect: 'none' }}>-</div>
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
                    Rata-rata
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {fmtKm(operationalData.mileage.avgMileageKm)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>per unit-hari</div>
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
                    Terendah
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {fmtKm(operationalData.mileage.lowestMileage.val)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    {formatDateIndo(operationalData.mileage.lowestMileage.date)}
                  </div>
                </div>

                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #16a34a',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Tertinggi
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {fmtKm(operationalData.mileage.highestMileage.val)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    {formatDateIndo(operationalData.mileage.highestMileage.date)}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                  Statistik per Shift
                </div>
                <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem' }}>
                    <thead>
                      <tr style={{ background: '#1570ef', color: '#ffffff', textAlign: 'center' }}>
                        <th style={{ padding: '6px 12px', fontWeight: 700, textAlign: 'left' }}>SHIFT</th>
                        <th style={{ padding: '6px 12px', fontWeight: 700 }}>TOTAL JARAK</th>
                        <th style={{ padding: '6px 12px', fontWeight: 700 }}>RATA-RATA</th>
                        <th style={{ padding: '6px 12px', fontWeight: 700 }}>TERENDAH</th>
                        <th style={{ padding: '6px 12px', fontWeight: 700 }}>TERTINGGI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationalData.mileage.shiftStats.map((s, idx) => (
                        <tr key={s.shift} style={{ borderBottom: idx < 2 ? '1px solid #f1f5f9' : 'none', textAlign: 'center' }}>
                          <td style={{ padding: '6px 12px', fontWeight: 600, color: '#0f172a', textAlign: 'left' }}>{s.shift}</td>
                          <td style={{ padding: '6px 12px', color: '#0f172a' }}>{fmtKm(s.total)}</td>
                          <td style={{ padding: '6px 12px', color: '#0f172a' }}>{fmtKm(s.avg)}</td>
                          <td style={{ padding: '6px 12px', color: '#0f172a' }}>{fmtKm(s.lowest)}</td>
                          <td style={{ padding: '6px 12px', color: '#0f172a' }}>{fmtKm(s.highest)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeCard === 'moving' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '2px 0 4px 0' }}>
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
                    Total
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {formatDurationHmMini(operationalData.moving.totalMovingMins)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'transparent', userSelect: 'none' }}>-</div>
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
                    Rata-rata
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {formatDurationHmMini(operationalData.moving.avgMovingMins)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>per unit-hari</div>
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
                    Terendah
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {formatDurationHmMini(operationalData.moving.lowestMoving.mins)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    {formatDateIndo(operationalData.moving.lowestMoving.date)}
                  </div>
                </div>

                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #16a34a',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Tertinggi
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {formatDurationHmMini(operationalData.moving.highestMoving.mins)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    {formatDateIndo(operationalData.moving.highestMoving.date)}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                  Statistik per Shift
                </div>
                <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem' }}>
                    <thead>
                      <tr style={{ background: '#1570ef', color: '#ffffff', textAlign: 'center' }}>
                        <th style={{ padding: '6px 12px', fontWeight: 700, textAlign: 'left' }}>SHIFT</th>
                        <th style={{ padding: '6px 12px', fontWeight: 700 }}>TOTAL MOVING</th>
                        <th style={{ padding: '6px 12px', fontWeight: 700 }}>RATA-RATA</th>
                        <th style={{ padding: '6px 12px', fontWeight: 700 }}>TERENDAH</th>
                        <th style={{ padding: '6px 12px', fontWeight: 700 }}>TERTINGGI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationalData.moving.shiftStats.map((s, idx) => (
                        <tr key={s.shift} style={{ borderBottom: idx < 2 ? '1px solid #f1f5f9' : 'none', textAlign: 'center' }}>
                          <td style={{ padding: '6px 12px', fontWeight: 600, color: '#0f172a', textAlign: 'left' }}>{s.shift}</td>
                          <td style={{ padding: '6px 12px', color: '#0f172a' }}>{formatDurationHmMini(s.totalMins)}</td>
                          <td style={{ padding: '6px 12px', color: '#0f172a' }}>{formatDurationHmMini(s.avgMins)}</td>
                          <td style={{ padding: '6px 12px', color: '#0f172a' }}>{formatDurationHmMini(s.lowestMins)}</td>
                          <td style={{ padding: '6px 12px', color: '#0f172a' }}>{formatDurationHmMini(s.highestMins)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeCard === 'stopping' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '2px 0 4px 0' }}>
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
                    Total
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {formatDurationHmMini(operationalData.stopping.totalStoppingMins)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'transparent', userSelect: 'none' }}>-</div>
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
                    Rata-rata
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {formatDurationHmMini(operationalData.stopping.avgStoppingMins)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>per unit-hari</div>
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
                    Terendah
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {formatDurationHmMini(operationalData.stopping.lowestStopping.mins)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    {formatDateIndo(operationalData.stopping.lowestStopping.date)}
                  </div>
                </div>

                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #16a34a',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Tertinggi
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {formatDurationHmMini(operationalData.stopping.highestStopping.mins)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    {formatDateIndo(operationalData.stopping.highestStopping.date)}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                  Statistik per Shift
                </div>
                <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem' }}>
                    <thead>
                      <tr style={{ background: '#1570ef', color: '#ffffff', textAlign: 'center' }}>
                        <th style={{ padding: '6px 12px', fontWeight: 700, textAlign: 'left' }}>SHIFT</th>
                        <th style={{ padding: '6px 12px', fontWeight: 700 }}>TOTAL STOPPING</th>
                        <th style={{ padding: '6px 12px', fontWeight: 700 }}>RATA-RATA</th>
                        <th style={{ padding: '6px 12px', fontWeight: 700 }}>TERENDAH</th>
                        <th style={{ padding: '6px 12px', fontWeight: 700 }}>TERTINGGI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationalData.stopping.shiftStats.map((s, idx) => (
                        <tr key={s.shift} style={{ borderBottom: idx < 2 ? '1px solid #f1f5f9' : 'none', textAlign: 'center' }}>
                          <td style={{ padding: '6px 12px', fontWeight: 600, color: '#0f172a', textAlign: 'left' }}>{s.shift}</td>
                          <td style={{ padding: '6px 12px', color: '#0f172a' }}>{formatDurationHmMini(s.totalMins)}</td>
                          <td style={{ padding: '6px 12px', color: '#0f172a' }}>{formatDurationHmMini(s.avgMins)}</td>
                          <td style={{ padding: '6px 12px', color: '#0f172a' }}>{formatDurationHmMini(s.lowestMins)}</td>
                          <td style={{ padding: '6px 12px', color: '#0f172a' }}>{formatDurationHmMini(s.highestMins)}</td>
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
          <div style={{ borderRadius: '6px', overflowX: 'auto', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
              <thead>
                <tr style={{ background: '#1570ef', color: '#ffffff' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>TANGGAL</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>ESTATE</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'left' }}>UNIT KENDARAAN</th>

                  {/* 4. VEHICLE BREAKDOWN: Kolom Tanggal | Estate | Unit Kendaraan | Status Harian | HK Rusak | Keterangan */}
                  {activeCard === 'vehicle' && (
                    <>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>STATUS HARIAN</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, letterSpacing: '0.03em', textAlign: 'center' }}>HK RUSAK</th>
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
                  activeTableData.rows.map((row: any, idx: number) => (
                    <tr
                      key={row.id || `${row.date}-${row.vehicleId}-${idx}`}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        background: idx % 2 === 1 ? '#fafcff' : '#ffffff',
                        height: '56px',
                        transition: 'background 0.1s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f0f7ff')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = idx % 2 === 1 ? '#fafcff' : '#ffffff')}
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
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{row.nopol}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>ID: {row.vehicleId}</div>
                      </td>

                      {/* 4. VEHICLE BREAKDOWN: Status Harian (Tengah), HK Rusak (Tengah), Keterangan (Kiri) */}
                      {activeCard === 'vehicle' && (
                        <>
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
                          <td style={{ padding: '10px 14px', textAlign: 'center', color: '#0f172a', fontWeight: 700 }}>
                            {row.hkRusak !== null ? row.hkRusak : '—'}
                          </td>
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
                            {fmtKm(row.totalKm)}
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                            {fmtKm(row.shift1Km)}
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                            {fmtKm(row.shift2Km)}
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                            {fmtKm(row.shift3Km)}
                          </td>
                        </>
                      )}

                      {/* MOVING TIME */}
                      {activeCard === 'moving' && (
                        <>
                          <td style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>
                            {formatDurationHmMini(row.totalMovingMins)}
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                            {formatDurationHmMini(row.shift1MovingMins)}
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                            {formatDurationHmMini(row.shift2MovingMins)}
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                            {formatDurationHmMini(row.shift3MovingMins)}
                          </td>
                        </>
                      )}

                      {/* STOPPING TIME */}
                      {activeCard === 'stopping' && (
                        <>
                          <td style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>
                            {formatDurationHmMini(row.totalStoppingMins)}
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                            {formatDurationHmMini(row.shift1StoppingMins)}
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                            {formatDurationHmMini(row.shift2StoppingMins)}
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: 'center', color: '#475569' }}>
                            {formatDurationHmMini(row.shift3StoppingMins)}
                          </td>
                        </>
                      )}
                    </tr>
                  ))
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
    </PageShell>
  )
}
