'use client'

import React, { useState, useMemo, useEffect } from 'react'
import PageShell from '@/components/PageShell'
import HierarchyFilterBar, { HierarchyFilterState } from '@/components/HierarchyFilterBar'
import { IMPORTED_TRACKS_MAP, AVAILABLE_IMPORTED_DATES } from '@/lib/imported-tracking'
import dynamic from 'next/dynamic'
import {
  OverviewTrackVehicle,
  OverviewTrackPoint,
  TheftIncidentItem,
  SpeedingEventItem,
  StopEventItem,
  OutRouteEventItem,
  BlockCoverageDetail
} from '@/components/OverviewMapComponent'

const OverviewMapComponent = dynamic(() => import('@/components/OverviewMapComponent'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '540px', background: '#0f172a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
      🔄 Memuat peta Overview Patroli (ArcGIS Satellite)...
    </div>
  )
})

function fmtKm(v: number | null | undefined): string {
  if (v === undefined || v === null || isNaN(v)) return '0,0 km'
  return v.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' km'
}

function fmtPct(v: number | null): string {
  if (v === null || v === undefined || isNaN(v)) return '—'
  return Math.round(v) + '%'
}

function formatDateIndo(dateStr: string): string {
  if (!dateStr) return ''
  const parts = dateStr.split('-')
  if (parts.length !== 3) return dateStr
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agus', 'Sep', 'Okt', 'Nov', 'Des']
  const monthIdx = parseInt(parts[1], 10) - 1
  return `${parseInt(parts[2], 10)} ${monthNames[monthIdx] || parts[1]} ${parts[0]}`
}

// Clean GPS Track Geometry & Split Polylines Across Gaps (>15m or >0.005 deg)
function processCleanedSegments(rawPoints: Array<{ time: string; lat: number; lng: number; speed: number }>): {
  segments: OverviewTrackPoint[][]
  allPoints: OverviewTrackPoint[]
} {
  if (!rawPoints || rawPoints.length === 0) return { segments: [], allPoints: [] }

  const sorted = [...rawPoints].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

  const cleaned: OverviewTrackPoint[] = []
  let prevPt: OverviewTrackPoint | null = null

  for (const pt of sorted) {
    if (pt.lat < 1.5 || pt.lat > 3.0 || pt.lng < 98.0 || pt.lng > 101.0) continue

    if (prevPt) {
      if (Math.abs(pt.lat - prevPt.lat) < 0.00001 && Math.abs(pt.lng - prevPt.lng) < 0.00001) continue

      const dLat = Math.abs(pt.lat - prevPt.lat)
      const dLng = Math.abs(pt.lng - prevPt.lng)
      if (dLat > 0.008 || dLng > 0.008 || pt.speed > 80) {
        continue
      }
    }
    cleaned.push(pt)
    prevPt = pt
  }

  const segments: OverviewTrackPoint[][] = []
  let currentSeg: OverviewTrackPoint[] = []

  for (let i = 0; i < cleaned.length; i++) {
    const pt = cleaned[i]
    if (currentSeg.length === 0) {
      currentSeg.push(pt)
    } else {
      const prev = currentSeg[currentSeg.length - 1]
      const t1 = new Date(prev.time).getTime()
      const t2 = new Date(pt.time).getTime()
      const dist = Math.sqrt((pt.lat - prev.lat) ** 2 + (pt.lng - prev.lng) ** 2)

      if (t2 - t1 > 15 * 60 * 1000 || dist > 0.005) {
        if (currentSeg.length >= 2) segments.push(currentSeg)
        currentSeg = [pt]
      } else {
        currentSeg.push(pt)
      }
    }
  }
  if (currentSeg.length >= 2) segments.push(currentSeg)

  return { segments, allPoints: cleaned }
}

export default function OverviewPatrolPage() {
  const [filterState, setFilterState] = useState<HierarchyFilterState>({
    psm: 'PSM 1',
    region: 'RIAS',
    estate: 'ADPE',
    year: '2026',
    month: 'Sep',
    unitType: 'ALL'
  })

  // SINGLE-DAY FILTER
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-02')

  // Map Display Mode & Block Category Filters
  const [mapMode, setMapMode] = useState<'status' | 'frequency'>('status')
  const [blockCategoryFilter, setBlockCategoryFilter] = useState<'Semua' | 'Rawan' | 'Non-Rawan'>('Semua')

  // Map Layer Toggles
  const [showTracking, setShowTracking] = useState<boolean>(true)
  const [showBaseline, setShowBaseline] = useState<boolean>(true)
  const [showBlocks, setShowBlocks] = useState<boolean>(true)
  const [showIncidents, setShowIncidents] = useState<boolean>(true)
  const [showSpeeding, setShowSpeeding] = useState<boolean>(true)
  const [showStops, setShowStops] = useState<boolean>(true)
  const [showOutRoute, setShowOutRoute] = useState<boolean>(true)

  // Track Visibility per Vehicle ID
  const [hiddenVehicleIds, setHiddenVehicleIds] = useState<Set<string>>(new Set())

  // Focus & Panel Selections
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
  const [selectedBlockDetail, setSelectedBlockDetail] = useState<BlockCoverageDetail | null>(null)
  const [activeEventFilter, setActiveEventFilter] = useState<{ vehicleId: string; type: 'speeding' | 'stop' | 'outRoute' } | null>(null)

  // Playback Controls
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [playbackProgress, setPlaybackProgress] = useState<number>(0) // 0 to 100
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1) // 1x, 2x, 5x

  // Date Step Navigation
  const handleStepDate = (direction: 'prev' | 'next') => {
    const idx = AVAILABLE_IMPORTED_DATES.indexOf(selectedDate)
    if (idx === -1) {
      setSelectedDate('2026-09-02')
      return
    }
    if (direction === 'prev' && idx > 0) {
      setSelectedDate(AVAILABLE_IMPORTED_DATES[idx - 1])
    } else if (direction === 'next' && idx < AVAILABLE_IMPORTED_DATES.length - 1) {
      setSelectedDate(AVAILABLE_IMPORTED_DATES[idx + 1])
    }
  }

  // Playback Timer Effect
  useEffect(() => {
    let interval: any = null
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 100
          }
          return prev + 1 * playbackSpeed
        })
      }, 250)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, playbackSpeed])

  // PREPARE THE THREE DEMO VEHICLES & CSV-BASED GEOMETRY
  const overviewData = useMemo(() => {
    const estateCode = filterState.estate && filterState.estate !== 'ALL' ? filterState.estate : 'ADPE'

    // Source Tracking: Mobil 1 (Sep 2), Mobil 2 (Sep 3), Motor 1 (Sep 4)
    const rawMob1 = IMPORTED_TRACKS_MAP['2026-09-02__V-JAR-01']?.points || []
    const rawMob2 = IMPORTED_TRACKS_MAP['2026-09-03__V-JAR-01']?.points || []
    const rawMot1 = IMPORTED_TRACKS_MAP['2026-09-04__V-JAR-01']?.points || []

    const mob1Clean = processCleanedSegments(rawMob1)
    const mob2Clean = processCleanedSegments(rawMob2)
    const mot1Clean = processCleanedSegments(rawMot1)

    // Check if selectedDate is Alternate Breakdown Date (e.g. 2026-09-03)
    const isBreakdownDate = selectedDate === '2026-09-03'

    const vehicles: OverviewTrackVehicle[] = [
      {
        vehicleId: `V-${estateCode}-01`,
        nopol: `BM 1000 ${estateCode}`,
        demoName: 'Mobil 1',
        vehicleType: 'Car',
        color: '#2563eb', // Blue
        status: 'Normal',
        isVisible: !hiddenVehicleIds.has(`V-${estateCode}-01`),
        sourceDateLabel: 'Geometri 2 Sep 2026',
        segments: mob1Clean.segments,
        allPoints: mob1Clean.allPoints,
        movingTimeFormatted: '17j 12m (71,7%)',
        stoppedTimeFormatted: '6j 48m',
        actualKmFormatted: '46,0 km',
        baselineCoverageFormatted: '75%',
        speedingCount: 1,
        stopCount: 1,
        outRouteCount: 1
      },
      {
        vehicleId: `V-${estateCode}-02`,
        nopol: `BM 2000 ${estateCode}`,
        demoName: 'Mobil 2',
        vehicleType: 'Car',
        color: '#d97706', // Amber
        status: isBreakdownDate ? 'Unit Rusak' : 'Normal',
        isVisible: !hiddenVehicleIds.has(`V-${estateCode}-02`),
        sourceDateLabel: 'Geometri 3 Sep 2026',
        segments: isBreakdownDate ? [] : mob2Clean.segments, // NO fabricated GPS polyline if Unit Rusak
        allPoints: isBreakdownDate ? [] : mob2Clean.allPoints,
        movingTimeFormatted: isBreakdownDate ? '0j 00m (0%)' : '16j 00m (66,7%)',
        stoppedTimeFormatted: isBreakdownDate ? '0j 00m' : '8j 00m',
        actualKmFormatted: isBreakdownDate ? '0,0 km' : '43,0 km',
        baselineCoverageFormatted: isBreakdownDate ? '0%' : '75%',
        speedingCount: isBreakdownDate ? 0 : 1,
        stopCount: isBreakdownDate ? 0 : 1,
        outRouteCount: isBreakdownDate ? 0 : 1,
        repairNote: isBreakdownDate ? 'Proses perbaikan transmisi di Bengkel Central — Estimasi selesai 5 Sep' : undefined
      },
      {
        vehicleId: `V-${estateCode}-03`,
        nopol: `BK 1001 JAR`,
        demoName: 'Motor 1',
        vehicleType: 'Motorcycle',
        color: '#16a34a', // Green
        status: isBreakdownDate ? 'GPS Rusak' : 'Normal',
        isVisible: !hiddenVehicleIds.has(`V-${estateCode}-03`),
        sourceDateLabel: 'Geometri 4 Sep 2026',
        segments: isBreakdownDate ? [] : mot1Clean.segments, // NO fabricated GPS polyline if GPS Rusak
        allPoints: isBreakdownDate ? [] : mot1Clean.allPoints,
        movingTimeFormatted: isBreakdownDate ? '0j 00m (0%)' : '17j 12m (71,7%)',
        stoppedTimeFormatted: isBreakdownDate ? '0j 00m' : '6j 48m',
        actualKmFormatted: isBreakdownDate ? '0,0 km' : '49,0 km',
        baselineCoverageFormatted: isBreakdownDate ? '0%' : '75%',
        speedingCount: 0,
        stopCount: isBreakdownDate ? 0 : 1,
        outRouteCount: 0,
        gpsNote: isBreakdownDate ? 'Unit berpatroli manual, modul GPS rusak dalam koordinasi pergantian vendor' : undefined
      }
    ]

    // EXACT 3 THEFT INCIDENT LOCATIONS
    const incidents: TheftIncidentItem[] = [
      {
        id: 'INC_01',
        title: 'Pencurian TBS Sektor Utara',
        time: '03:45 WIB',
        lat: 2.317411928082803,
        lng: 99.98034669400336,
        locationLabel: 'Areal Sektor Utara (ADPE)',
        summary: 'Ditemukan 15 janjang TBS curian disembunyikan di dekat parit batas. Pelaku melarikan diri saat patroli mendekat.',
        followUp: 'Barang bukti diamankan ke Kantor Divisi Utama.'
      },
      {
        id: 'INC_02',
        title: 'Percobaan Pencurian & Pengrusakan Akses',
        time: '14:20 WIB',
        lat: 2.2950558890235415,
        lng: 99.97688230782134,
        locationLabel: 'Areal Sektor Timur (ADPE)',
        summary: 'Terdapat jejak kendaraan tak dikenal di akses parit timur. Ditemukan 2 egrek dan karung pembungkus.',
        followUp: 'Patroli gabungan ditingkatkan bersama Babinsa.'
      },
      {
        id: 'INC_03',
        title: 'Penangkapan Pelaku Sektor Barat',
        time: '22:15 WIB',
        lat: 2.2977963255838634,
        lng: 99.95973100827986,
        locationLabel: 'Areal Sektor Barat (ADPE)',
        summary: 'Penangkapan 1 unit kendaraan bermuatan 8 janjang TBS curian saat patroli malam.',
        followUp: 'Tersangka dan barang bukti diserahkan ke Polsek.'
      }
    ]

    // SPEEDING EVENTS (>50 KM/H)
    const speedingEvents: SpeedingEventItem[] = [
      {
        id: 'SPD_01',
        vehicleId: `V-${estateCode}-01`,
        nopol: `BM 1000 ${estateCode}`,
        eventNo: 'Mobil 1 — Pelanggaran Kecepatan #1',
        startTime: '07:40 WIB',
        durationMins: 4.2,
        distanceKm: 3.5,
        maxSpeedKmH: 62,
        points: [
          [2.3100, 99.9650],
          [2.3130, 99.9700],
          [2.3150, 99.9750]
        ],
        comment: 'Kelebihan Kecepatan | Kecepatan >50 km/jam di akses jalan utama'
      },
      {
        id: 'SPD_02',
        vehicleId: `V-${estateCode}-02`,
        nopol: `BM 2000 ${estateCode}`,
        eventNo: 'Mobil 2 — Pelanggaran Kecepatan #1',
        startTime: '10:15 WIB',
        durationMins: 3.8,
        distanceKm: 2.9,
        maxSpeedKmH: 58,
        points: [
          [2.2970, 99.9680],
          [2.3000, 99.9720]
        ],
        comment: 'Kelebihan Kecepatan | Memacu kendaraan melebihi batas 50 km/jam di jalur inspeksi'
      }
    ]

    // STOP EVENTS (>30 MINUTES)
    const stopEvents: StopEventItem[] = [
      {
        id: 'STOP_01',
        vehicleId: `V-${estateCode}-01`,
        nopol: `BM 1000 ${estateCode}`,
        eventNo: 'Mobil 1 — Kejadian Berhenti #1',
        startTime: '08:15 WIB',
        endTime: '08:57 WIB',
        durationMins: 42,
        lat: 2.3120,
        lng: 99.9750,
        locationLabel: 'Areal Sektor Utara (Pos 2)',
        comment: 'Waktu Berhenti | Berhenti >30 menit di Pos 2 tanpa laporan kendala'
      },
      {
        id: 'STOP_02',
        vehicleId: `V-${estateCode}-02`,
        nopol: `BM 2000 ${estateCode}`,
        eventNo: 'Mobil 2 — Kejadian Berhenti #1',
        startTime: '13:10 WIB',
        endTime: '13:45 WIB',
        durationMins: 35,
        lat: 2.2980,
        lng: 99.9710,
        locationLabel: 'Kantor Divisi 2',
        comment: 'Waktu Berhenti | Istirahat operasional melebihi 30 menit'
      },
      {
        id: 'STOP_03',
        vehicleId: `V-${estateCode}-03`,
        nopol: `BK 1001 JAR`,
        eventNo: 'Motor 1 — Kejadian Berhenti #1',
        startTime: '10:30 WIB',
        endTime: '11:08 WIB',
        durationMins: 38,
        lat: 2.2960,
        lng: 99.9620,
        locationLabel: 'Blok D-48 Sektor Barat',
        comment: 'Waktu Berhenti | Pemantauan titik rawan berhenti >30 menit'
      }
    ]

    // OUT-OF-ROUTE EVENTS
    const outRouteEvents: OutRouteEventItem[] = [
      {
        id: 'OUT_01',
        vehicleId: `V-${estateCode}-01`,
        nopol: `BM 1000 ${estateCode}`,
        eventNo: 'Mobil 1 — Keluar Koridor #1',
        startTime: '09:20 WIB',
        durationMins: 18,
        distanceKm: 2.8,
        color: '#2563eb',
        points: [
          [2.3140, 99.9730],
          [2.3180, 99.9780],
          [2.3160, 99.9810]
        ],
        reason: 'Keluar Koridor | Detour mengecek akses parit pembatas timur'
      },
      {
        id: 'OUT_02',
        vehicleId: `V-${estateCode}-02`,
        nopol: `BM 2000 ${estateCode}`,
        eventNo: 'Mobil 2 — Keluar Koridor #1',
        startTime: '14:40 WIB',
        durationMins: 22,
        distanceKm: 3.5,
        color: '#d97706',
        points: [
          [2.2960, 99.9680],
          [2.2920, 99.9630],
          [2.2890, 99.9660]
        ],
        reason: 'Keluar Koridor | Detour mengecek jalan kompot selatan'
      }
    ]

    return { vehicles, incidents, speedingEvents, stopEvents, outRouteEvents }
  }, [filterState.estate, selectedDate, hiddenVehicleIds])

  const toggleTrackVisibility = (vehicleId: string) => {
    setHiddenVehicleIds(prev => {
      const next = new Set(prev)
      if (next.has(vehicleId)) next.delete(vehicleId)
      else next.add(vehicleId)
      return next
    })
  }

  const isEstateSelected = filterState.estate && filterState.estate !== 'ALL'

  return (
    <PageShell
      title="Overview Patroli"
      topbarExtra={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <HierarchyFilterBar
            filterState={filterState}
            onChange={setFilterState}
            showUnitTypeFilter={false}
            useCompactPeriodDropdown={false}
          />
          {/* SINGLE-DAY DATE PICKER WITH NAV BUTTONS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#f8fafc', padding: '0.25rem 0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
            <button
              onClick={() => handleStepDate('prev')}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 800, color: '#475569', fontSize: '0.85rem' }}
              title="Hari Sebelumnya"
            >◄</button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ border: 'none', background: 'transparent', fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', cursor: 'pointer', outline: 'none' }}
            />
            <button
              onClick={() => handleStepDate('next')}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 800, color: '#475569', fontSize: '0.85rem' }}
              title="Hari Berikutnya"
            >►</button>
          </div>
        </div>
      }
    >
      {!isEstateSelected ? (
        <div style={{ padding: '3.5rem 1.5rem', textAlign: 'center', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📍</div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>Pilih Kebun (Estate)</h3>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>
            Silakan pilih Kebun (Estate) pada filter header di atas untuk menampilkan Overview Patroli gabungan.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* SIMULASI BANNER */}
          <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '0.45rem 0.85rem', borderRadius: '6px', fontSize: '0.75rem', color: '#0369a1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              <span>ℹ️</span>
              <span>Overview Patroli Kebun <b>{filterState.estate}</b> — Operasional Tanggal <b>{formatDateIndo(selectedDate)}</b></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {selectedDate === '2026-09-03' && (
                <span style={{ fontSize: '0.7rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.15rem 0.5rem', borderRadius: 4, fontWeight: 700 }}>
                  Contoh Status Breakdown (Unit & GPS Rusak)
                </span>
              )}
              <span style={{ fontSize: '0.7rem', background: '#e0f2fe', color: '#0369a1', padding: '0.15rem 0.5rem', borderRadius: 4, fontWeight: 700 }} title="Geometri trek diselaraskan dari 3 sumber hari operasional CSV">
                Simulasi
              </span>
            </div>
          </div>

          {/* 1. TOP SUMMARY: EXACTLY THREE METRICS IN ONE COMPACT CONTAINER */}
          <div style={{
            background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0',
            padding: '1rem 1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem'
          }}>
            {/* METRIC A: WAKTU BERGERAK (70% - GREEN FLAG) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 2 }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Waktu Bergerak</span>
                <span style={{ fontSize: '0.8rem' }} title="Prioritas Normal / Memenuhi Target (>=70%)">🚩</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#16a34a' }}>70%</span>
                <span style={{ fontSize: '0.75rem', color: '#16a34a', background: '#f0fdf4', padding: '0.1rem 0.4rem', borderRadius: 4, fontWeight: 700 }}>
                  Prioritas Normal
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                Rata-rata bergerak: <b>16 jam 48 menit</b> / unit-hari (Berhenti: 7j 12m)
              </div>
            </div>

            {/* METRIC B: COVERAGE RAWAN (41% - RED FLAG) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 2 }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Coverage Rawan</span>
                <span style={{ fontSize: '0.8rem' }} title="Prioritas Tinggi / Di Bawah Target (<50%)">🚩</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#dc2626' }}>41%</span>
                <span style={{ fontSize: '0.75rem', color: '#dc2626', background: '#fef2f2', padding: '0.1rem 0.4rem', borderRadius: 4, fontWeight: 700 }}>
                  Prioritas Tinggi
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                Komposisi coverage rawan: <b>41 cakupan rawan</b> dari 100 total cakupan
              </div>
            </div>

            {/* METRIC C: BASELINE TER-COVER (75% - NEUTRAL) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 2 }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Baseline Ter-cover</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }} title="Panjang rute baseline unik yang terjangkau patroli dibanding total rute baseline">ℹ️</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>75%</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                Panjang rute unik baseline tercover patroli gabungan
              </div>
            </div>
          </div>

          {/* 2. MAIN CONTAINER: MAP (~75%) + RIGHT-SIDE VEHICLE DETAILS (~25%) */}
          <div style={{
            background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0',
            padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            display: 'flex', flexDirection: 'column', gap: '1rem'
          }}>
            {/* Map Header & Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                  Peta Overview Patroli Gabungan ({formatDateIndo(selectedDate)})
                </h3>
                <span style={{ fontSize: '0.72rem', background: '#e0f2fe', color: '#0369a1', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: 12 }}>
                  Kebun {filterState.estate}
                </span>
              </div>

              {/* Map Controls: Mode Toggle & Layer Controls */}
              <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', fontSize: '0.75rem', fontWeight: 600, flexWrap: 'wrap' }}>
                {/* Map Mode Toggle */}
                <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.15rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                  <button
                    onClick={() => setMapMode('status')}
                    style={{
                      border: 'none', padding: '0.2rem 0.55rem', borderRadius: 4, cursor: 'pointer',
                      fontSize: '0.72rem', fontWeight: 700,
                      background: mapMode === 'status' ? '#0f172a' : 'transparent',
                      color: mapMode === 'status' ? '#ffffff' : '#475569'
                    }}
                  >Status Blok</button>
                  <button
                    onClick={() => setMapMode('frequency')}
                    style={{
                      border: 'none', padding: '0.2rem 0.55rem', borderRadius: 4, cursor: 'pointer',
                      fontSize: '0.72rem', fontWeight: 700,
                      background: mapMode === 'frequency' ? '#0f172a' : 'transparent',
                      color: mapMode === 'frequency' ? '#ffffff' : '#475569'
                    }}
                  >Frekuensi</button>
                </div>

                {/* Block Category Filter */}
                <select
                  value={blockCategoryFilter}
                  onChange={e => setBlockCategoryFilter(e.target.value as any)}
                  style={{ fontSize: '0.72rem', padding: '0.2rem 0.45rem', borderRadius: 4, border: '1px solid #cbd5e1', fontWeight: 700, color: '#0f172a' }}
                >
                  <option value="Semua">Semua Blok</option>
                  <option value="Rawan">Blok Rawan</option>
                  <option value="Non-Rawan">Blok Non-Rawan</option>
                </select>

                {/* Layer Checkboxes (NO EYE ICONS) */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', color: '#334155' }}>
                  <input type="checkbox" checked={showTracking} onChange={e => setShowTracking(e.target.checked)} />
                  <span>Tracking</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', color: '#334155' }}>
                  <input type="checkbox" checked={showBaseline} onChange={e => setShowBaseline(e.target.checked)} />
                  <span>Baseline</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', color: '#334155' }}>
                  <input type="checkbox" checked={showBlocks} onChange={e => setShowBlocks(e.target.checked)} />
                  <span>Blok Rawan</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', color: '#be185d', fontWeight: 700 }}>
                  <input type="checkbox" checked={showSpeeding} onChange={e => setShowSpeeding(e.target.checked)} />
                  <span>⚡ Kecepatan</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', color: '#b45309', fontWeight: 700 }}>
                  <input type="checkbox" checked={showStops} onChange={e => setShowStops(e.target.checked)} />
                  <span>🛑 Berhenti</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', color: '#d97706', fontWeight: 700 }}>
                  <input type="checkbox" checked={showOutRoute} onChange={e => setShowOutRoute(e.target.checked)} />
                  <span>⚠️ Keluar Rute</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', color: '#dc2626', fontWeight: 700 }}>
                  <input type="checkbox" checked={showIncidents} onChange={e => setShowIncidents(e.target.checked)} />
                  <span>🚨 Pencurian</span>
                </label>
              </div>
            </div>

            {/* COMPACT BLOCK SUMMARY BAR INSIDE CONTAINER */}
            <div style={{ background: '#f8fafc', padding: '0.45rem 0.85rem', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.75rem' }}>
              <div style={{ color: '#0f172a', fontWeight: 700 }}>
                📍 Blok Rawan: <span style={{ color: '#dc2626' }}>35</span> · Tercakup: <span style={{ color: '#16a34a' }}>28</span> · Belum Tercakup: <span style={{ color: '#d97706' }}>7 (20%)</span>
              </div>
              <div style={{ color: '#475569', fontSize: '0.72rem', display: 'flex', gap: '0.75rem' }}>
                <span>Frekuensi Cakupan Rawan:</span>
                <span title="Blok rawan dengan 0 cakupan"><b>0×:</b> 7 (20%)</span>
                <span title="Blok rawan dicakup 1 kali"><b>1×:</b> 12 (34%)</span>
                <span title="Blok rawan dicakup 2 kali"><b>2×:</b> 11 (31%)</span>
                <span title="Blok rawan dicakup >2 kali"><b>&gt;2×:</b> 5 (14%)</span>
              </div>
            </div>

            {/* Split Grid: Map + Right-Side Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '1rem', minHeight: '540px' }}>
              {/* MAP CONTAINER */}
              <div style={{ height: '100%', minHeight: '540px', position: 'relative' }}>
                <OverviewMapComponent
                  estateId={filterState.estate}
                  mapMode={mapMode}
                  blockCategoryFilter={blockCategoryFilter}
                  vehicles={overviewData.vehicles}
                  incidents={overviewData.incidents}
                  speedingEvents={overviewData.speedingEvents}
                  stopEvents={overviewData.stopEvents}
                  outRouteEvents={overviewData.outRouteEvents}
                  selectedVehicleId={selectedVehicleId}
                  selectedBlockCode={selectedBlockDetail?.blockCode || null}
                  playbackRatio={playbackProgress / 100}
                  showTracking={showTracking}
                  showBaseline={showBaseline}
                  showBlocks={showBlocks}
                  showIncidents={showIncidents}
                  showSpeeding={showSpeeding}
                  showStops={showStops}
                  showOutRoute={showOutRoute}
                  onSelectVehicle={setSelectedVehicleId}
                  onSelectBlock={setSelectedBlockDetail}
                  onPausePlayback={() => setIsPlaying(false)}
                />

                {/* BLOCK DETAIL INSPECTION PANEL OVERLAY */}
                {selectedBlockDetail && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12, zIndex: 1000,
                    background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0',
                    padding: '0.75rem', width: '220px', boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                    fontSize: '0.75rem', fontFamily: 'sans-serif'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <b style={{ fontSize: '0.85rem', color: '#0f172a' }}>Blok {selectedBlockDetail.blockCode}</b>
                      <button onClick={() => setSelectedBlockDetail(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 700, color: '#94a3b8' }}>✕</button>
                    </div>
                    <div style={{ color: selectedBlockDetail.isRawan ? '#dc2626' : '#2563eb', fontWeight: 700, marginBottom: 6 }}>
                      {selectedBlockDetail.isRawan ? 'Blok Rawan Target' : 'Blok Non-Rawan'}
                    </div>
                    <div style={{ background: '#f8fafc', padding: '0.4rem', borderRadius: 4, border: '1px solid #f1f5f9', marginBottom: 6 }}>
                      Total Frekuensi: <b style={{ color: '#16a34a', fontSize: '0.85rem' }}>{selectedBlockDetail.totalFrequency}×</b>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Kontribusi Unit:</div>
                    {selectedBlockDetail.vehicleContributions.map((c, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#1e293b', margin: '2px 0' }}>
                        <span>{c.demoName}:</span>
                        <b>{c.frequency}× ({c.lastTime})</b>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT-SIDE VEHICLE DETAILS PANEL */}
              <div style={{
                background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0',
                padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '1rem',
                justifyContent: 'space-between'
              }}>
                {/* Playback Box */}
                <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
                    <span>SIMULASI PLAYBACK</span>
                    <span>{Math.round(playbackProgress)}%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 8 }}>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      style={{ border: 'none', background: '#2563eb', color: '#fff', padding: '0.35rem 0.7rem', borderRadius: 4, cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem' }}
                    >
                      {isPlaying ? '❚❚' : '▶'}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={playbackProgress}
                      onChange={e => setPlaybackProgress(parseFloat(e.target.value))}
                      style={{ flex: 1, cursor: 'pointer' }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', color: '#64748b' }}>
                    <span>Kecepatan:</span>
                    <div style={{ display: 'flex', gap: '0.2rem' }}>
                      {[1, 2, 5].map(spd => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          style={{
                            border: 'none', padding: '0.15rem 0.4rem', borderRadius: 3, cursor: 'pointer',
                            fontSize: '0.65rem', fontWeight: 700,
                            background: playbackSpeed === spd ? '#0f172a' : '#e2e8f0',
                            color: playbackSpeed === spd ? '#ffffff' : '#475569'
                          }}
                        >{spd}x</button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Exact 3 Demo Vehicles List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', overflowY: 'auto', flex: 1 }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Detail Unit ({overviewData.vehicles.length})</span>
                    {selectedVehicleId && (
                      <button onClick={() => setSelectedVehicleId(null)} style={{ border: 'none', background: 'transparent', color: '#2563eb', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700 }}>
                        Reset Fokus
                      </button>
                    )}
                  </div>

                  {overviewData.vehicles.map(veh => {
                    const isFocused = selectedVehicleId === veh.vehicleId

                    return (
                      <div
                        key={veh.vehicleId}
                        onClick={() => setSelectedVehicleId(prev => prev === veh.vehicleId ? null : veh.vehicleId)}
                        style={{
                          background: isFocused ? '#eff6ff' : '#ffffff',
                          border: isFocused ? '2px solid #2563eb' : '1px solid #e2e8f0',
                          borderRadius: '8px', padding: '0.75rem', cursor: 'pointer',
                          display: 'flex', flexDirection: 'column', gap: '0.45rem',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {/* Title & Checkbox */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>
                            <span style={{ width: 10, height: 10, borderRadius: '50%', background: veh.color }} />
                            <span>{veh.vehicleType === 'Car' ? '🚗' : '🏍️'}</span>
                            <span>{veh.demoName}</span>
                            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>({veh.nopol})</span>
                          </div>

                          <label
                            onClick={(e) => e.stopPropagation()}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem', color: '#475569', cursor: 'pointer', fontWeight: 600 }}
                          >
                            <input
                              type="checkbox"
                              checked={veh.isVisible}
                              onChange={() => toggleTrackVisibility(veh.vehicleId)}
                            />
                            <span>Tampilkan rute</span>
                          </label>
                        </div>

                        {/* Breakdown Status Notes if present */}
                        {veh.status === 'Unit Rusak' && (
                          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '0.4rem 0.55rem', borderRadius: 4, color: '#dc2626', fontSize: '0.68rem', lineHeight: 1.4 }}>
                            🔧 <b>Unit Rusak:</b> {veh.repairNote}
                          </div>
                        )}
                        {veh.status === 'GPS Rusak' && (
                          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '0.4rem 0.55rem', borderRadius: 4, color: '#b45309', fontSize: '0.68rem', lineHeight: 1.4 }}>
                            📡 <b>GPS Rusak:</b> {veh.gpsNote}
                          </div>
                        )}

                        {/* Normal Vehicle Metrics */}
                        {veh.status === 'Normal' && (
                          <>
                            <div style={{ fontSize: '0.72rem', color: '#334155', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem', background: '#f8fafc', padding: '0.4rem 0.5rem', borderRadius: '4px', border: '1px solid #f1f5f9' }}>
                              <div>Bergerak: <b>{veh.movingTimeFormatted}</b></div>
                              <div>Berhenti: <b>{veh.stoppedTimeFormatted}</b></div>
                              <div>Jarak: <b>{veh.actualKmFormatted}</b></div>
                              <div>Baseline: <b>{veh.baselineCoverageFormatted}</b></div>
                            </div>

                            {/* Clickable Event Badges */}
                            <div style={{ fontSize: '0.68rem', color: '#64748b', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: 2 }}>
                              <span
                                onClick={(e) => { e.stopPropagation(); setActiveEventFilter({ vehicleId: veh.vehicleId, type: 'speeding' }) }}
                                style={{ background: '#fdf2f8', color: '#be185d', border: '1px solid #fbcfe8', padding: '0.1rem 0.35rem', borderRadius: 4, fontWeight: 700, cursor: 'pointer' }}
                              >⚡ {veh.speedingCount} kec.</span>
                              <span
                                onClick={(e) => { e.stopPropagation(); setActiveEventFilter({ vehicleId: veh.vehicleId, type: 'stop' }) }}
                                style={{ background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', padding: '0.1rem 0.35rem', borderRadius: 4, fontWeight: 700, cursor: 'pointer' }}
                              >🛑 {veh.stopCount} berhenti</span>
                              <span
                                onClick={(e) => { e.stopPropagation(); setActiveEventFilter({ vehicleId: veh.vehicleId, type: 'outRoute' }) }}
                                style={{ background: '#fff8f1', color: '#d97706', border: '1px solid #ffedd5', padding: '0.1rem 0.35rem', borderRadius: 4, fontWeight: 700, cursor: 'pointer' }}
                              >⚠️ {veh.outRouteCount} out-route</span>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EVENT LIST FILTER MODAL / DRAWER */}
      {activeEventFilter && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }}>
          <div style={{
            background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0',
            width: '100%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
            overflow: 'hidden', display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ background: '#0f172a', color: '#ffffff', padding: '0.85rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <b style={{ fontSize: '0.95rem' }}>Daftar Pelanggaran & Kejadian</b>
              <button onClick={() => setActiveEventFilter(null)} style={{ border: 'none', background: 'transparent', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
              {activeEventFilter.type === 'speeding' && overviewData.speedingEvents.filter(e => e.vehicleId === activeEventFilter.vehicleId).map(sp => (
                <div key={sp.id} style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', padding: '0.75rem', borderRadius: '6px' }}>
                  <b style={{ color: '#be185d' }}>⚡ {sp.eventNo}</b><br/>
                  <span>Waktu: {sp.startTime} · Kecepatan: <b>{sp.maxSpeedKmH} km/h</b></span><br/>
                  <span style={{ color: '#64748b', fontSize: '0.72rem' }}>Catatan: {sp.comment}</span>
                </div>
              ))}
              {activeEventFilter.type === 'stop' && overviewData.stopEvents.filter(e => e.vehicleId === activeEventFilter.vehicleId).map(st => (
                <div key={st.id} style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '0.75rem', borderRadius: '6px' }}>
                  <b style={{ color: '#b45309' }}>🛑 {st.eventNo}</b><br/>
                  <span>Waktu: {st.startTime} – {st.endTime} (<b>{st.durationMins} menit</b>)</span><br/>
                  <span style={{ color: '#64748b', fontSize: '0.72rem' }}>Catatan: {st.comment}</span>
                </div>
              ))}
              {activeEventFilter.type === 'outRoute' && overviewData.outRouteEvents.filter(e => e.vehicleId === activeEventFilter.vehicleId).map(or => (
                <div key={or.id} style={{ background: '#fff8f1', border: '1px solid #ffedd5', padding: '0.75rem', borderRadius: '6px' }}>
                  <b style={{ color: '#d97706' }}>⚠️ {or.eventNo}</b><br/>
                  <span>Waktu: {or.startTime} (<b>{or.distanceKm} km / {or.durationMins}m</b>)</span><br/>
                  <span style={{ color: '#64748b', fontSize: '0.72rem' }}>Catatan: {or.reason}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#f8fafc', padding: '0.65rem 1.25rem', borderTop: '1px solid #e2e8f0', textAlign: 'right' }}>
              <button onClick={() => setActiveEventFilter(null)} style={{ padding: '0.35rem 0.85rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 700, fontSize: '0.78rem' }}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  )
}
