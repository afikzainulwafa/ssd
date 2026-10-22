'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import PageShell from '@/components/PageShell'
import HierarchyFilterBar, { HierarchyFilterState } from '@/components/HierarchyFilterBar'
import { IMPORTED_TRACKS_MAP, AVAILABLE_IMPORTED_DATES } from '@/lib/imported-tracking'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  Layers,
  FileText,
  Car,
  SlidersHorizontal,
  Info,
  Crosshair,
  ExternalLink,
  X,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react'
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
    <div style={{ height: '100%', width: '100%', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.875rem', fontFamily: "'Poppins', sans-serif" }}>
      🔄 Memuat peta Overview Patroli (ArcGIS Satellite)...
    </div>
  )
})

function formatDateIndo(dateStr: string): string {
  if (!dateStr) return ''
  const parts = dateStr.split('-')
  if (parts.length !== 3) return dateStr
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agus', 'Sep', 'Okt', 'Nov', 'Des']
  const monthIdx = parseInt(parts[1], 10) - 1
  return `${parseInt(parts[2], 10)} ${monthNames[monthIdx] || parts[1]} ${parts[0]}`
}

function formatMinutesToTime(mins: number): string {
  const h = Math.floor(mins / 60)
  const m = Math.floor(mins % 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
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

interface VehicleShiftRow {
  shift: string
  baselineName: string
  baselineKm: number
  tercoverPct: number
  sesuaiRuteKm: number
  diLuarRuteKm: number
  aktualKm: number
}

interface VehicleDetailModalData {
  vehicleId: string
  demoName: string
  nopol: string
  vehicleType: 'Car' | 'Motorcycle'
  color: string
  submissionStatus: 'Sudah Dikirim' | 'Belum Dikirim'
  priority: 'Normal' | 'Urgent' | null
  managerCommentStatus: 'Sudah Dikomentari' | 'Belum Dikomentari' | 'Menunggu pengiriman'
  movingTimeFormatted: string
  movingPctFormatted: string
  stoppedTimeFormatted: string
  stoppedPctFormatted: string
  actualKmFormatted: string
  baselineCoverageFormatted: string
  shifts: VehicleShiftRow[]
  totals: {
    baselineKm: number
    tercoverPct: number
    sesuaiRuteKm: number
    diLuarRuteKm: number
    aktualKm: number
  }
  picReport: {
    author: string
    role: string
    timestamp: string
    content: string
  } | null
  managerComment: {
    author: string
    role: string
    timestamp: string
    content: string
  } | null
}

type ActivePopoverType = 'layer' | 'statusLaporan' | 'panel' | null

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

  // Map Layer Toggles (7 independent layers)
  const [showTracking, setShowTracking] = useState<boolean>(true)
  const [showBaseline, setShowBaseline] = useState<boolean>(true)
  const [showBlocks, setShowBlocks] = useState<boolean>(true)
  const [showIncidents, setShowIncidents] = useState<boolean>(true)
  const [showSpeeding, setShowSpeeding] = useState<boolean>(true)
  const [showStops, setShowStops] = useState<boolean>(true)
  const [showOutRoute, setShowOutRoute] = useState<boolean>(true)

  // Track Visibility per Vehicle ID
  const [hiddenVehicleIds, setHiddenVehicleIds] = useState<Set<string>>(new Set())

  // Focus & Selections
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
  const [focusVehicleId, setFocusVehicleId] = useState<string | null>(null)
  const [fitEstateTrigger, setFitEstateTrigger] = useState<number>(0)
  const [selectedBlockDetail, setSelectedBlockDetail] = useState<BlockCoverageDetail | null>(null)
  const [activeEventFilter, setActiveEventFilter] = useState<{ vehicleId: string; type: 'speeding' | 'stop' | 'outRoute' } | null>(null)

  // DEFAULTS AS SPECIFIED IN REQUIREMENTS:
  // - Ringkasan KPI: Terbuka (true)
  // - Strip coverage: Terbuka (true)
  // - Legenda: Tertutup (false)
  // - Playback: TERTUTUP (false)
  // - Kendaraan: TERTUTUP (false)
  const [kpiVisible, setKpiVisible] = useState<boolean>(true)
  const [coverageStripVisible, setCoverageStripVisible] = useState<boolean>(true)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState<boolean>(false) // Default closed!
  const [legendaOpen, setLegendaOpen] = useState<boolean>(false) // Default closed!
  const [playbackVisible, setPlaybackVisible] = useState<boolean>(false) // Default closed!

  // Indikator Perhatian Status Laporan (Gentle pulse stops once seen)
  const [attentionSeen, setAttentionSeen] = useState<boolean>(false)
  // Highlight Filter for Vehicles ('urgent' | 'unsubmitted' | 'uncommented' | null)
  const [highlightedFilter, setHighlightedFilter] = useState<'urgent' | 'unsubmitted' | 'uncommented' | null>(null)

  // Popover State (Only one popover open at a time)
  const [activePopover, setActivePopover] = useState<ActivePopoverType>(null)
  const [modalVehicle, setModalVehicle] = useState<VehicleDetailModalData | null>(null)

  // Playback Controls
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [playbackProgress, setPlaybackProgress] = useState<number>(0) // 0 to 100
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1) // 1x, 2x, 5x

  // Toggle playback and safely pause on collapse
  const handleTogglePlayback = (visible: boolean) => {
    setPlaybackVisible(visible)
    if (!visible && isPlaying) {
      setIsPlaying(false)
    }
  }

  // Dynamic top offset for floating Zoom & Fit Estate controls
  const topControlsOffset = useMemo(() => {
    if (kpiVisible && coverageStripVisible) return 204
    if (kpiVisible && !coverageStripVisible) return 164
    if (!kpiVisible && coverageStripVisible) return 144
    return 98
  }, [kpiVisible, coverageStripVisible])

  const dateInputRef = useRef<HTMLInputElement>(null)
  const popoverContainerRef = useRef<HTMLDivElement>(null)

  // Close popover when clicking outside or pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePopover(null)
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverContainerRef.current && !popoverContainerRef.current.contains(e.target as Node)) {
        setActivePopover(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
          return Math.min(100, prev + 1 * playbackSpeed)
        })
      }, 250)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, playbackSpeed])

  // PREPARE VEHICLES & REAL DATA
  const overviewData = useMemo(() => {
    const estateCode = filterState.estate && filterState.estate !== 'ALL' ? filterState.estate : 'ADPE'

    // Source Tracking
    const rawMob1 = IMPORTED_TRACKS_MAP['2026-09-02__V-JAR-01']?.points || []
    const rawMob2 = IMPORTED_TRACKS_MAP['2026-09-03__V-JAR-01']?.points || []
    const rawMot1 = IMPORTED_TRACKS_MAP['2026-09-04__V-JAR-01']?.points || []

    const mob1Clean = processCleanedSegments(rawMob1)
    const mob2Clean = processCleanedSegments(rawMob2)
    const mot1Clean = processCleanedSegments(rawMot1)

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
        segments: isBreakdownDate ? [] : mob2Clean.segments,
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
        segments: isBreakdownDate ? [] : mot1Clean.segments,
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

    // EXACT 3 THEFT INCIDENTS
    const incidents: TheftIncidentItem[] = [
      {
        id: 'INC_01',
        title: 'Pencurian TBS Sektor Utara',
        time: '03:45 WIB',
        lat: 2.317411928082803,
        lng: 99.98034669400336,
        locationLabel: `Areal Sektor Utara (${estateCode})`,
        summary: 'Ditemukan 15 janjang TBS curian disembunyikan di dekat parit batas. Pelaku melarikan diri saat patroli mendekat.',
        followUp: 'Barang bukti diamankan ke Kantor Divisi Utama.'
      },
      {
        id: 'INC_02',
        title: 'Percobaan Pencurian & Pengrusakan Akses',
        time: '14:20 WIB',
        lat: 2.2950558890235415,
        lng: 99.97688230782134,
        locationLabel: `Areal Sektor Timur (${estateCode})`,
        summary: 'Terdapat jejak kendaraan tak dikenal di akses parit timur. Ditemukan 2 egrek dan karung pembungkus.',
        followUp: 'Patroli gabungan ditingkatkan bersama Babinsa.'
      },
      {
        id: 'INC_03',
        title: 'Penangkapan Pelaku Sektor Barat',
        time: '22:15 WIB',
        lat: 2.2977963255838634,
        lng: 99.95973100827986,
        locationLabel: `Areal Sektor Barat (${estateCode})`,
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

  // THREE-DIMENSIONAL REPORT STATUS DICTIONARY
  const vehicleReportDetails: Record<string, VehicleDetailModalData> = useMemo(() => {
    const estateCode = filterState.estate && filterState.estate !== 'ALL' ? filterState.estate : 'ADPE'
    return {
      [`V-${estateCode}-01`]: {
        vehicleId: `V-${estateCode}-01`,
        demoName: 'Mobil 1',
        nopol: `BM 1000 ${estateCode}`,
        vehicleType: 'Car',
        color: '#2563eb',
        submissionStatus: 'Sudah Dikirim',
        priority: 'Urgent',
        managerCommentStatus: 'Sudah Dikomentari',
        movingTimeFormatted: '17j 12m',
        movingPctFormatted: '71,7%',
        stoppedTimeFormatted: '6j 48m',
        stoppedPctFormatted: '28,3%',
        actualKmFormatted: '46,0 km',
        baselineCoverageFormatted: '75%',
        shifts: [
          { shift: 'Shift 1', baselineName: `${estateCode} Mobil 1 — Pagi`, baselineKm: 20.0, tercoverPct: 75, sesuaiRuteKm: 14.0, diLuarRuteKm: 1.0, aktualKm: 15.0 },
          { shift: 'Shift 2', baselineName: `${estateCode} Mobil 1 — Sore`, baselineKm: 20.0, tercoverPct: 75, sesuaiRuteKm: 13.0, diLuarRuteKm: 2.0, aktualKm: 15.0 },
          { shift: 'Shift 3', baselineName: `${estateCode} Mobil 1 — Malam`, baselineKm: 20.0, tercoverPct: 75, sesuaiRuteKm: 15.0, diLuarRuteKm: 1.0, aktualKm: 16.0 }
        ],
        totals: {
          baselineKm: 60.0,
          tercoverPct: 75,
          sesuaiRuteKm: 42.0,
          diLuarRuteKm: 4.0,
          aktualKm: 46.0
        },
        picReport: {
          author: 'Budi Santoso',
          role: 'PIC / Kanitpam',
          timestamp: 'Dikirim 3 Sep 2026, 09.12',
          content: 'Patroli dilaksanakan pada tiga shift dengan fokus blok rawan dan jalur perbatasan. Ditemukan akses terbuka di Blok C-55 dan telah dilakukan koordinasi dengan asisten divisi. Pengawasan malam akan diperkuat pada area tersebut.'
        },
        managerComment: {
          author: 'Andi Pratama',
          role: 'Manager',
          timestamp: '3 Sep 2026, 10.05',
          content: 'Segera tindak lanjuti penutupan akses di Blok C-55 dan koordinasikan dengan divisi terkait. Lakukan pengecekan ulang pada patroli berikutnya serta sampaikan perkembangan pada laporan harian.'
        }
      },
      [`V-${estateCode}-02`]: {
        vehicleId: `V-${estateCode}-02`,
        demoName: 'Mobil 2',
        nopol: `BM 2000 ${estateCode}`,
        vehicleType: 'Car',
        color: '#d97706',
        submissionStatus: 'Sudah Dikirim',
        priority: 'Normal',
        managerCommentStatus: 'Belum Dikomentari',
        movingTimeFormatted: '16j 00m',
        movingPctFormatted: '66,7%',
        stoppedTimeFormatted: '8j 00m',
        stoppedPctFormatted: '33,3%',
        actualKmFormatted: '43,0 km',
        baselineCoverageFormatted: '75%',
        shifts: [
          { shift: 'Shift 1', baselineName: `${estateCode} Mobil 2 — Pagi`, baselineKm: 20.0, tercoverPct: 75, sesuaiRuteKm: 13.0, diLuarRuteKm: 1.5, aktualKm: 14.5 },
          { shift: 'Shift 2', baselineName: `${estateCode} Mobil 2 — Sore`, baselineKm: 20.0, tercoverPct: 75, sesuaiRuteKm: 12.0, diLuarRuteKm: 1.5, aktualKm: 13.5 },
          { shift: 'Shift 3', baselineName: `${estateCode} Mobil 2 — Malam`, baselineKm: 20.0, tercoverPct: 75, sesuaiRuteKm: 14.0, diLuarRuteKm: 1.0, aktualKm: 15.0 }
        ],
        totals: {
          baselineKm: 60.0,
          tercoverPct: 75,
          sesuaiRuteKm: 39.0,
          diLuarRuteKm: 4.0,
          aktualKm: 43.0
        },
        picReport: {
          author: 'Hendra Kusuma',
          role: 'PIC / Kanitpam',
          timestamp: 'Dikirim 3 Sep 2026, 08.45',
          content: 'Patroli rutin terlaksana lancar pada 3 shift. Situasi seluruh areal kondusif tanpa kendala menonjol atau indikasi pencurian.'
        },
        managerComment: null
      },
      [`V-${estateCode}-03`]: {
        vehicleId: `V-${estateCode}-03`,
        demoName: 'Motor 1',
        nopol: `BK 1001 JAR`,
        vehicleType: 'Motorcycle',
        color: '#16a34a',
        submissionStatus: 'Belum Dikirim',
        priority: null,
        managerCommentStatus: 'Menunggu pengiriman',
        movingTimeFormatted: '17j 12m',
        movingPctFormatted: '71,7%',
        stoppedTimeFormatted: '6j 48m',
        stoppedPctFormatted: '28,3%',
        actualKmFormatted: '49,0 km',
        baselineCoverageFormatted: '75%',
        shifts: [
          { shift: 'Shift 1', baselineName: `${estateCode} Motor 1 — Pagi`, baselineKm: 20.0, tercoverPct: 75, sesuaiRuteKm: 15.0, diLuarRuteKm: 1.5, aktualKm: 16.5 },
          { shift: 'Shift 2', baselineName: `${estateCode} Motor 1 — Sore`, baselineKm: 20.0, tercoverPct: 75, sesuaiRuteKm: 14.5, diLuarRuteKm: 1.5, aktualKm: 16.0 },
          { shift: 'Shift 3', baselineName: `${estateCode} Motor 1 — Malam`, baselineKm: 20.0, tercoverPct: 75, sesuaiRuteKm: 15.5, diLuarRuteKm: 1.0, aktualKm: 16.5 }
        ],
        totals: {
          baselineKm: 60.0,
          tercoverPct: 75,
          sesuaiRuteKm: 45.0,
          diLuarRuteKm: 4.0,
          aktualKm: 49.0
        },
        picReport: null,
        managerComment: null
      }
    }
  }, [filterState.estate])

  // REPORT STATUS SUMMARY METRICS (Three separate dimensions)
  const reportStatusSummary = useMemo(() => {
    const list = Object.values(vehicleReportDetails)
    const totalReports = list.length
    const sentCount = list.filter(v => v.submissionStatus === 'Sudah Dikirim').length
    const unsentCount = totalReports - sentCount

    const sentReports = list.filter(v => v.submissionStatus === 'Sudah Dikirim')
    const urgentCount = sentReports.filter(v => v.priority === 'Urgent').length
    const normalCount = sentReports.filter(v => v.priority === 'Normal').length

    const commentedCount = sentReports.filter(v => v.managerCommentStatus === 'Sudah Dikomentari').length

    return {
      totalReports,
      sentCount,
      unsentCount,
      urgentCount,
      normalCount,
      commentedCount,
      sentReportsCount: sentReports.length
    }
  }, [vehicleReportDetails])

  const toggleTrackVisibility = (vehicleId: string) => {
    setHiddenVehicleIds(prev => {
      const next = new Set(prev)
      if (next.has(vehicleId)) next.delete(vehicleId)
      else next.add(vehicleId)
      return next
    })
  }

  const handleOpenVehicleModal = (vehicleId: string) => {
    const data = vehicleReportDetails[vehicleId]
    if (data) {
      setModalVehicle(data)
    }
  }

  const handleFocusVehicle = (vehicleId: string) => {
    setFocusVehicleId(vehicleId)
    setSelectedVehicleId(vehicleId)
  }

  const isEstateSelected = filterState.estate && filterState.estate !== 'ALL'

  // Time formatted for Playback slider
  const playbackTimeString = useMemo(() => {
    const totalMins = Math.floor((playbackProgress / 100) * 24 * 60)
    return formatMinutesToTime(totalMins)
  }, [playbackProgress])

  return (
    <PageShell
      title="Overview Patroli"
      fullBleed={true}
      topbarExtra={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', fontFamily: "'Poppins', sans-serif" }}>
          <HierarchyFilterBar
            filterState={filterState}
            onChange={setFilterState}
            showUnitTypeFilter={false}
            useCompactPeriodDropdown={false}
          />

          {/* SINGLE-DAY DATE PICKER STEPPER */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '0.2rem 0.5rem',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}
          >
            <button
              type="button"
              onClick={() => handleStepDate('prev')}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: '#475569',
                fontSize: '0.8rem',
                padding: '2px 4px',
                borderRadius: '4px'
              }}
              title="Hari Sebelumnya"
            >
              ◀
            </button>

            <button
              type="button"
              onClick={() => dateInputRef.current?.showPicker ? dateInputRef.current.showPicker() : dateInputRef.current?.focus()}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#0f172a',
                padding: '2px 4px'
              }}
              title="Pilih Tanggal Operasional"
            >
              <span>📅</span>
              <span>{formatDateIndo(selectedDate)}</span>
            </button>

            <input
              ref={dateInputRef}
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
            />

            <button
              type="button"
              onClick={() => handleStepDate('next')}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: '#475569',
                fontSize: '0.8rem',
                padding: '2px 4px',
                borderRadius: '4px'
              }}
              title="Hari Berikutnya"
            >
              ▶
            </button>
          </div>
        </div>
      }
    >
      {!isEstateSelected ? (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', background: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.25rem', fontWeight: 700 }}>Pilih Kebun (Estate)</h3>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
            Silakan pilih Kebun (Estate) pada filter header di atas untuk menampilkan Overview Patroli.
          </p>
        </div>
      ) : (
        /* WORKSPACE BERBASIS PETA: FULL BLEED CONTAINER */
        <div
          ref={popoverContainerRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          {/* BASE MAP BACKGROUND */}
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
            vehiclePanelOpen={vehiclePanelOpen}
            focusVehicleId={focusVehicleId}
            fitEstateTrigger={fitEstateTrigger}
            topControlsOffset={topControlsOffset}
            onSelectVehicle={setSelectedVehicleId}
            onSelectBlock={setSelectedBlockDetail}
            onPausePlayback={() => setIsPlaying(false)}
          />

          {/* ======================================================== */}
          {/* ZONA ATAS: TOOLBAR (SINGLE LINE ACROSS TOP) */}
          {/* ======================================================== */}
          <div
            style={{
              position: 'absolute',
              top: '14px',
              left: '16px',
              right: '16px',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pointerEvents: 'none'
            }}
          >
            {/* KELOMPOK KIRI: STATUS BLOK / FREKUENSI, SEMUA BLOK, LAYER */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'auto', position: 'relative' }}>
              {/* Mode Pills */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(226, 232, 240, 0.85)',
                  borderRadius: '8px',
                  padding: '3px',
                  display: 'flex',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)'
                }}
              >
                <button
                  type="button"
                  onClick={() => setMapMode('status')}
                  style={{
                    border: 'none',
                    background: mapMode === 'status' ? '#0f172a' : 'transparent',
                    color: mapMode === 'status' ? '#ffffff' : '#475569',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Status Blok
                </button>
                <button
                  type="button"
                  onClick={() => setMapMode('frequency')}
                  style={{
                    border: 'none',
                    background: mapMode === 'frequency' ? '#0f172a' : 'transparent',
                    color: mapMode === 'frequency' ? '#ffffff' : '#475569',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Frekuensi
                </button>
              </div>

              {/* Block Category Dropdown */}
              <select
                value={blockCategoryFilter}
                onChange={(e) => setBlockCategoryFilter(e.target.value as any)}
                style={{
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(226, 232, 240, 0.85)',
                  borderRadius: '8px',
                  padding: '7px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)'
                }}
              >
                <option value="Semua">Semua Blok</option>
                <option value="Rawan">Blok Rawan</option>
                <option value="Non-Rawan">Blok Non-Rawan</option>
              </select>

              {/* Layer Popover Button */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setActivePopover(prev => prev === 'layer' ? null : 'layer')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(226, 232, 240, 0.85)',
                    borderRadius: '8px',
                    padding: '7px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#0f172a',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)'
                  }}
                  aria-expanded={activePopover === 'layer'}
                >
                  <Layers size={15} color="#475569" />
                  <span>Layer</span>
                  <ChevronDown size={14} color="#64748b" />
                </button>

                {/* LAYER POPOVER MENU (7 INDEPENDENT CHECKBOXES - DOES NOT PUSH LAYOUT) */}
                {activePopover === 'layer' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '44px',
                      left: '0',
                      zIndex: 1200,
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      boxShadow: '0 8px 24px rgba(15, 23, 42, 0.14)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      width: '220px',
                      fontSize: '0.78rem'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '2px', borderBottom: '1px solid #f1f5f9', paddingBottom: '4px' }}>
                      Pilihan Layer Peta
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#0f172a' }}>
                      <input type="checkbox" checked={showTracking} onChange={e => setShowTracking(e.target.checked)} />
                      <span>Tracking aktual</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#0f172a' }}>
                      <input type="checkbox" checked={showBaseline} onChange={e => setShowBaseline(e.target.checked)} />
                      <span>Baseline rute</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#0f172a' }}>
                      <input type="checkbox" checked={showBlocks} onChange={e => setShowBlocks(e.target.checked)} />
                      <span>Blok rawan</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#dc2626' }}>
                      <input type="checkbox" checked={showSpeeding} onChange={e => setShowSpeeding(e.target.checked)} />
                      <span>Kecepatan &gt;50 km/jam</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#b45309' }}>
                      <input type="checkbox" checked={showStops} onChange={e => setShowStops(e.target.checked)} />
                      <span>Berhenti &gt;30 menit</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#2563eb' }}>
                      <input type="checkbox" checked={showOutRoute} onChange={e => setShowOutRoute(e.target.checked)} />
                      <span>Keluar rute</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#dc2626' }}>
                      <input type="checkbox" checked={showIncidents} onChange={e => setShowIncidents(e.target.checked)} />
                      <span>Pencurian</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* KELOMPOK KANAN: STATUS LAPORAN, KENDARAAN (3), PANEL MENU */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'auto', position: 'relative' }}>
              {/* STATUS LAPORAN BUTTON WITH GENTLE PULSE HALO */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => {
                    setActivePopover(prev => prev === 'statusLaporan' ? null : 'statusLaporan')
                    setAttentionSeen(true)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(226, 232, 240, 0.85)',
                    borderRadius: '8px',
                    padding: '7px 12px',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#0f172a'
                  }}
                  title="1 laporan Urgent, 1 belum dikirim, 1 menunggu komentar Manager."
                  aria-expanded={activePopover === 'statusLaporan'}
                  aria-label="Status Laporan: 1 laporan Urgent, 1 belum dikirim, 1 menunggu komentar Manager."
                >
                  <FileText size={15} color={reportStatusSummary.urgentCount > 0 ? '#dc2626' : '#475569'} />
                  <span>Status Laporan</span>
                  
                  {/* DUAL COUNTER BADGE WITH GENTLE PULSE */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {reportStatusSummary.urgentCount > 0 && (
                      <span
                        className={!attentionSeen ? 'pulse-urgent-badge' : ''}
                        style={{
                          background: '#ef4444',
                          color: '#ffffff',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '1px 7px',
                          borderRadius: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        {reportStatusSummary.urgentCount} Urgent
                      </span>
                    )}
                    {reportStatusSummary.unsentCount > 0 && (
                      <span
                        style={{
                          background: '#fef3c7',
                          color: '#b45309',
                          border: '1px solid #fde68a',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '1px 7px',
                          borderRadius: '12px'
                        }}
                      >
                        {reportStatusSummary.unsentCount} Belum Dikirim
                      </span>
                    )}
                  </div>
                </button>

                {/* STATUS LAPORAN POPOVER (THREE INDEPENDENT DIMENSIONS WITH INTERACTIVE HIGHLIGHTS) */}
                {activePopover === 'statusLaporan' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '44px',
                      right: '0',
                      zIndex: 1200,
                      width: '330px',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      boxShadow: '0 8px 24px rgba(15, 23, 42, 0.14)',
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>
                        <FileText size={16} color="#0f172a" />
                        <span>Status Laporan</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActivePopover(null)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8', fontSize: '1rem', fontWeight: 700 }}
                      >
                        ✕
                      </button>
                    </div>

                    {/* THREE INDEPENDENT DIMENSIONS SUMMARY (CLICK TO HIGHLIGHT IN VEHICLE PANEL) */}
                    <div style={{ background: '#f8fafc', borderRadius: '6px', padding: '10px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                      {/* Dimensi 1: Pengiriman */}
                      <div
                        onClick={() => {
                          setVehiclePanelOpen(true)
                          setHighlightedFilter('unsubmitted')
                          setActivePopover(null)
                        }}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '3px 4px', borderRadius: '4px' }}
                        title="Klik untuk menyorot kendaraan yang belum mengirim laporan"
                      >
                        <span style={{ color: '#64748b' }}>Pengiriman</span>
                        <span style={{ fontWeight: 700, color: '#0f172a', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <span>{reportStatusSummary.sentCount}/{reportStatusSummary.totalReports} dikirim</span>
                          <span style={{ color: '#b45309', background: '#fef3c7', padding: '1px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>
                            {reportStatusSummary.unsentCount} Belum ↗
                          </span>
                        </span>
                      </div>

                      {/* Dimensi 2: Prioritas */}
                      <div
                        onClick={() => {
                          setVehiclePanelOpen(true)
                          setHighlightedFilter('urgent')
                          setActivePopover(null)
                        }}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '3px 4px', borderRadius: '4px' }}
                        title="Klik untuk menyorot kendaraan dengan laporan Urgent"
                      >
                        <span style={{ color: '#64748b' }}>Prioritas</span>
                        <span style={{ fontWeight: 700, color: '#0f172a', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <span>{reportStatusSummary.normalCount} Normal</span>
                          <span>·</span>
                          <span style={{ color: '#dc2626', background: '#fee2e2', padding: '1px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>
                            {reportStatusSummary.urgentCount} Urgent ↗
                          </span>
                        </span>
                      </div>

                      {/* Dimensi 3: Komentar Manager */}
                      <div
                        onClick={() => {
                          setVehiclePanelOpen(true)
                          setHighlightedFilter('uncommented')
                          setActivePopover(null)
                        }}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '3px 4px', borderRadius: '4px' }}
                        title="Klik untuk menyorot kendaraan yang belum dikomentari Manager"
                      >
                        <span style={{ color: '#64748b' }}>Komentar Manager</span>
                        <span style={{ fontWeight: 700, color: '#0f172a', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <span>{reportStatusSummary.commentedCount}/{reportStatusSummary.sentReportsCount} dikomentari</span>
                          <span style={{ color: '#2563eb', background: '#eff6ff', padding: '1px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>
                            1 Menunggu ↗
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* VEHICLE STATUS BREAKDOWN LIST */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {Object.values(vehicleReportDetails).map(veh => (
                        <div
                          key={veh.vehicleId}
                          onClick={() => {
                            setModalVehicle(veh)
                            setActivePopover(null)
                          }}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            padding: '8px 10px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            cursor: 'pointer',
                            transition: 'background 0.15s ease',
                            background: '#ffffff'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
                          title="Klik untuk melihat detail lengkap kendaraan"
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.8rem', color: '#0f172a' }}>
                              <span style={{ width: 8, height: 8, borderRadius: '50%', background: veh.color }} />
                              <span>{veh.demoName}</span>
                            </div>
                            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Detail &gt;</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#475569' }}>
                            <span style={{ fontWeight: 600 }}>{veh.submissionStatus === 'Sudah Dikirim' ? 'Dikirim' : 'Belum dikirim'}</span>
                            <span>·</span>
                            {veh.submissionStatus === 'Sudah Dikirim' ? (
                              veh.priority === 'Urgent' ? (
                                <span style={{ color: '#dc2626', fontWeight: 700 }}>Urgent</span>
                              ) : (
                                <span style={{ color: '#16a34a', fontWeight: 600 }}>Normal</span>
                              )
                            ) : (
                              <span style={{ color: '#94a3b8' }}>—</span>
                            )}
                            <span>·</span>
                            <span style={{ color: veh.managerCommentStatus === 'Sudah Dikomentari' ? '#0f172a' : '#64748b' }}>
                              {veh.managerCommentStatus === 'Sudah Dikomentari' ? 'Dikomentari' : (veh.managerCommentStatus === 'Menunggu pengiriman' ? 'Menunggu pengiriman' : 'Belum komentar')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* KENDARAAN (3) QUICK TOGGLE BUTTON */}
              <button
                type="button"
                onClick={() => setVehiclePanelOpen(prev => !prev)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: vehiclePanelOpen ? '#0f172a' : 'rgba(255, 255, 255, 0.92)',
                  color: vehiclePanelOpen ? '#ffffff' : '#0f172a',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(226, 232, 240, 0.85)',
                  borderRadius: '8px',
                  padding: '7px 12px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  transition: 'all 0.15s ease'
                }}
                title={vehiclePanelOpen ? 'Tutup panel kendaraan' : 'Buka panel kendaraan'}
                aria-expanded={vehiclePanelOpen}
              >
                <Car size={15} color={vehiclePanelOpen ? '#ffffff' : '#475569'} />
                <span>Kendaraan · {overviewData.vehicles.length}</span>
              </button>

              {/* PANEL MENU BUTTON */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setActivePopover(prev => prev === 'panel' ? null : 'panel')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(226, 232, 240, 0.85)',
                    borderRadius: '8px',
                    padding: '7px 12px',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#0f172a'
                  }}
                  title="Pengaturan panel tampilan"
                  aria-expanded={activePopover === 'panel'}
                >
                  <SlidersHorizontal size={15} color="#475569" />
                  <span>Panel</span>
                  <ChevronDown size={14} color="#64748b" />
                </button>

                {/* PANEL DROPDOWN MENU */}
                {activePopover === 'panel' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '44px',
                      right: '0',
                      zIndex: 1200,
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      boxShadow: '0 8px 24px rgba(15, 23, 42, 0.14)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      width: '210px',
                      fontSize: '0.78rem'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '2px', borderBottom: '1px solid #f1f5f9', paddingBottom: '4px' }}>
                      Visibilitas Panel
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#0f172a' }}>
                      <input type="checkbox" checked={kpiVisible} onChange={e => setKpiVisible(e.target.checked)} />
                      <span>Ringkasan KPI</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#0f172a' }}>
                      <input type="checkbox" checked={coverageStripVisible} onChange={e => setCoverageStripVisible(e.target.checked)} />
                      <span>Strip Coverage</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#0f172a' }}>
                      <input type="checkbox" checked={vehiclePanelOpen} onChange={e => setVehiclePanelOpen(e.target.checked)} />
                      <span>Panel Kendaraan</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#0f172a' }}>
                      <input type="checkbox" checked={legendaOpen} onChange={e => setLegendaOpen(e.target.checked)} />
                      <span>Legenda</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#0f172a' }}>
                      <input type="checkbox" checked={playbackVisible} onChange={e => handleTogglePlayback(e.target.checked)} />
                      <span>Playback Bar</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* ZONA ATAS: STRIP RINGKASAN KPI (COLLAPSIBLE) */}
          {/* ======================================================== */}
          {kpiVisible ? (
            <div
              style={{
                position: 'absolute',
                top: '58px',
                left: '16px',
                zIndex: 900,
                width: '680px',
                maxWidth: 'calc(100vw - 380px)',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(226, 232, 240, 0.85)',
                borderRadius: '10px',
                boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.08)',
                padding: '12px 18px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px'
              }}
            >
              {/* Chevron Collapse Button */}
              <button
                type="button"
                onClick={() => setKpiVisible(false)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: '#64748b',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Ciutkan Ringkasan KPI"
                aria-label="Ciutkan Ringkasan KPI"
              >
                <ChevronUp size={15} />
              </button>

              {/* COLUMN 1: WAKTU BERGERAK */}
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                  Bergerak
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 2px' }}>
                  70%
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  16j 48m bergerak / 7j 12m berhenti
                </div>
              </div>

              {/* COLUMN 2: COVERAGE RAWAN */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                  <span>Coverage Rawan</span>
                  <span
                    title="Proporsi cakupan rawan terhadap total cakupan: 41 cakupan rawan dari 100 total cakupan. Berbeda dengan jumlah blok rawan unik yang telah tercakup (28/35 blok)."
                    style={{ cursor: 'help', color: '#3b82f6', display: 'inline-flex' }}
                  >
                    <Info size={13} />
                  </span>
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#dc2626', margin: '2px 0 2px' }}>
                  41%
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  Cakupan rawan / total cakupan
                </div>
              </div>

              {/* COLUMN 3: BASELINE TERCOVER */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                  <span>Baseline Tercover</span>
                  <span
                    title="Panjang rute baseline unik yang terjangkau patroli gabungan dibanding total rute baseline. Ditampilkan netral."
                    style={{ cursor: 'help', color: '#3b82f6', display: 'inline-flex' }}
                  >
                    <Info size={13} />
                  </span>
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 2px' }}>
                  75%
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  Rute baseline tercakup
                </div>
              </div>
            </div>
          ) : (
            /* COLLAPSED KPI BUTTON */
            <button
              type="button"
              onClick={() => setKpiVisible(true)}
              style={{
                position: 'absolute',
                top: '58px',
                left: '16px',
                zIndex: 900,
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(226, 232, 240, 0.85)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#0f172a',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)'
              }}
              title="Buka Ringkasan KPI"
              aria-expanded={false}
            >
              <span>Ringkasan</span>
              <ChevronDown size={14} color="#64748b" />
            </button>
          )}

          {/* ======================================================== */}
          {/* ZONA ATAS: STRIP COVERAGE DAN FREKUENSI (COLLAPSIBLE) */}
          {/* ======================================================== */}
          {coverageStripVisible ? (
            <div
              style={{
                position: 'absolute',
                top: kpiVisible ? '154px' : '96px',
                left: '16px',
                zIndex: 900,
                width: '680px',
                maxWidth: 'calc(100vw - 380px)',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(226, 232, 240, 0.85)',
                borderRadius: '8px',
                padding: '7px 14px',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '0.75rem',
                flexWrap: 'wrap',
                transition: 'top 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#dc2626' }} />
                <span style={{ color: '#475569' }}>Blok rawan</span>
                <b style={{ color: '#0f172a' }}>35</b>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563eb' }} />
                <span style={{ color: '#475569' }}>Tercakup</span>
                <b style={{ color: '#0f172a' }}>28</b>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#94a3b8' }} />
                <span style={{ color: '#475569' }}>Belum</span>
                <b style={{ color: '#0f172a' }}>7 (20%)</b>
              </div>

              <span style={{ color: '#cbd5e1' }}>|</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569' }}>
                <span><b>0x:</b> 7</span>
                <span><b>1x:</b> 12</span>
                <span><b>2x:</b> 11</span>
                <span><b>&gt;2x:</b> 5</span>
              </div>

              {/* Chevron Collapse Button */}
              <button
                type="button"
                onClick={() => setCoverageStripVisible(false)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: '#64748b',
                  marginLeft: 'auto',
                  padding: '2px 4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Ciutkan Strip Coverage"
                aria-label="Ciutkan Strip Coverage"
              >
                <ChevronUp size={14} />
              </button>
            </div>
          ) : (
            /* COLLAPSED COVERAGE BUTTON */
            <button
              type="button"
              onClick={() => setCoverageStripVisible(true)}
              style={{
                position: 'absolute',
                top: kpiVisible ? '154px' : '58px',
                left: kpiVisible ? '16px' : '124px',
                zIndex: 900,
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(226, 232, 240, 0.85)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#0f172a',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)'
              }}
              title="Buka Strip Coverage & Frekuensi"
              aria-expanded={false}
            >
              <span>Coverage</span>
              <ChevronDown size={14} color="#64748b" />
            </button>
          )}

          {/* ======================================================== */}
          {/* ZONA TENGAH (KANAN): PANEL KENDARAAN (DEFAULT TERTUTUP) */}
          {/* ======================================================== */}
          {/* ZONA TENGAH (KANAN): PANEL KENDARAAN (COLLAPSIBLE, DEFAULT TERTUTUP) */}
          {/* ======================================================== */}
          {!vehiclePanelOpen ? (
            /* COLLAPSED KENDARAAN BUTTON IN ZONE */
            <button
              type="button"
              onClick={() => setVehiclePanelOpen(true)}
              style={{
                position: 'absolute',
                top: '58px',
                right: '16px',
                zIndex: 900,
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(226, 232, 240, 0.85)',
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#0f172a',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)'
              }}
              title="Buka Panel Kendaraan"
              aria-expanded={false}
            >
              <Car size={14} color="#64748b" />
              <span>Kendaraan · {overviewData.vehicles.length}</span>
              <ChevronDown size={14} color="#64748b" />
            </button>
          ) : (
            <div
              style={{
                position: 'absolute',
                top: '58px',
                right: '16px',
                bottom: '16px',
                zIndex: 1000,
                width: '340px',
                background: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(226, 232, 240, 0.85)',
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(241, 245, 249, 0.9)'
                }}
              >
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                  Kendaraan · {overviewData.vehicles.length}
                </div>
                <button
                  type="button"
                  onClick={() => setVehiclePanelOpen(false)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px 4px'
                  }}
                  title="Ciutkan Panel Kendaraan"
                  aria-label="Ciutkan Panel Kendaraan"
                >
                  <ChevronUp size={16} />
                </button>
              </div>

              {/* ACTIVE HIGHLIGHT FILTER BANNER */}
              {highlightedFilter && (
                <div
                  style={{
                    padding: '8px 12px',
                    background: '#eff6ff',
                    borderBottom: '1px solid #dbeafe',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.72rem'
                  }}
                >
                  <span style={{ color: '#1e40af', fontWeight: 600 }}>
                    Menyorot:{' '}
                    <b>
                      {highlightedFilter === 'urgent'
                        ? 'Laporan Urgent'
                        : highlightedFilter === 'unsubmitted'
                        ? 'Belum Dikirim'
                        : 'Menunggu Komentar'}
                    </b>
                  </span>
                  <button
                    type="button"
                    onClick={() => setHighlightedFilter(null)}
                    style={{
                      border: 'none',
                      background: '#2563eb',
                      color: '#ffffff',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Tampilkan Semua
                  </button>
                </div>
              )}

              {/* Content List */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                {overviewData.vehicles.map(veh => {
                  const rep = vehicleReportDetails[veh.vehicleId]
                  const isFocused = selectedVehicleId === veh.vehicleId

                  // Check if highlighted
                  let isHighlighted = false
                  if (highlightedFilter === 'urgent') {
                    isHighlighted = rep?.submissionStatus === 'Sudah Dikirim' && rep?.priority === 'Urgent'
                  } else if (highlightedFilter === 'unsubmitted') {
                    isHighlighted = rep?.submissionStatus === 'Belum Dikirim'
                  } else if (highlightedFilter === 'uncommented') {
                    isHighlighted = rep?.submissionStatus === 'Sudah Dikirim' && rep?.managerCommentStatus === 'Belum Dikomentari'
                  }

                  const hasActiveFilter = highlightedFilter !== null

                  return (
                    <div
                      key={veh.vehicleId}
                      onClick={() => handleOpenVehicleModal(veh.vehicleId)}
                      style={{
                        background: isHighlighted
                          ? '#fef2f2'
                          : isFocused
                          ? '#f8fafc'
                          : '#ffffff',
                        border: isHighlighted
                          ? '1.5px solid #dc2626'
                          : isFocused
                          ? '1.5px solid #2563eb'
                          : '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        opacity: hasActiveFilter && !isHighlighted ? 0.65 : 1
                      }}
                    >
                      {/* Top Row: Color circle, Name, nopol, Checkbox Rute, Button Fokus */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.82rem', color: '#0f172a' }}>
                          <span style={{ width: 10, height: 10, borderRadius: '50%', background: veh.color }} />
                          <span>{veh.demoName}</span>
                          <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>({veh.nopol})</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {/* Checkbox Rute */}
                          <label
                            onClick={(e) => e.stopPropagation()}
                            style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#475569', cursor: 'pointer', fontWeight: 600 }}
                          >
                            <input
                              type="checkbox"
                              checked={veh.isVisible}
                              onChange={() => toggleTrackVisibility(veh.vehicleId)}
                            />
                            <span>Rute</span>
                          </label>

                          {/* Button Fokus */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleFocusVehicle(veh.vehicleId)
                            }}
                            style={{
                              border: '1px solid #cbd5e1',
                              background: isFocused ? '#eff6ff' : '#ffffff',
                              color: isFocused ? '#2563eb' : '#475569',
                              borderRadius: '4px',
                              padding: '2px 6px',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            title="Pusatkan peta ke kendaraan ini"
                          >
                            <Crosshair size={12} />
                            <span>Fokus</span>
                          </button>
                        </div>
                      </div>

                      {/* 2x2 Stats Grid (CLEAN SPACING, NO CARD-IN-CARD BOX) */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '6px 12px',
                          padding: '4px 0'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Bergerak</div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                            {veh.movingTimeFormatted}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Berhenti</div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                            {veh.stoppedTimeFormatted}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Jarak</div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                            {veh.actualKmFormatted}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Baseline</div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                            {veh.baselineCoverageFormatted}
                          </div>
                        </div>
                      </div>

                      {/* 3 Status Lines */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.72rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <FileText size={13} color="#64748b" />
                          <span>
                            {rep?.submissionStatus === 'Sudah Dikirim' ? (
                              <>
                                <span>Sudah dikirim</span>
                                <span> · </span>
                                {rep.priority === 'Urgent' ? (
                                  <span style={{ color: '#dc2626', fontWeight: 700 }}>Urgent</span>
                                ) : (
                                  <span style={{ color: '#16a34a', fontWeight: 600 }}>Normal</span>
                                )}
                              </>
                            ) : (
                              <span style={{ color: '#64748b' }}>Belum dikirim</span>
                            )}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
                          <span style={{ fontSize: '12px' }}>💬</span>
                          <span>
                            {rep?.managerCommentStatus === 'Sudah Dikomentari' ? (
                              <span>Manager: Sudah dikomentari</span>
                            ) : rep?.managerCommentStatus === 'Belum Dikomentari' ? (
                              <span>Manager: Belum dikomentari</span>
                            ) : (
                              <span>Manager: Menunggu pengiriman</span>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Card Footer Links */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderTop: '1px solid #f1f5f9',
                          paddingTop: '6px',
                          marginTop: '2px'
                        }}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenVehicleModal(veh.vehicleId)
                          }}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            color: '#2563eb',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          Detail kendaraan &gt;
                        </button>

                        <Link
                          href={`/hasil-laporan-patroli?vehicleId=${veh.vehicleId}&date=${selectedDate}`}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: '#2563eb',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                        >
                          <span>Lihat Laporan</span>
                          <ExternalLink size={12} />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ZONA BAWAH: LEGENDA (COLLAPSIBLE, DEFAULT TERTUTUP) */}
          {/* ======================================================== */}
          {legendaOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: playbackVisible ? '68px' : '56px',
                left: '16px',
                zIndex: 950,
                width: '680px',
                maxWidth: 'calc(100vw - 380px)',
                background: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(226, 232, 240, 0.85)',
                borderRadius: '8px',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.72rem'
              }}
            >
              {/* Header with Close */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.78rem' }}>
                  Legenda
                </div>
                <button
                  type="button"
                  onClick={() => setLegendaOpen(false)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8', fontSize: '0.85rem' }}
                  title="Tutup Legenda"
                  aria-label="Tutup Legenda"
                >
                  ✕
                </button>
              </div>

              {/* Row 1: Vehicles & Blocks */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: 14, height: 3, borderRadius: 2, background: '#2563eb', display: 'inline-block' }} />
                  <span>Mobil 1</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: 14, height: 3, borderRadius: 2, background: '#d97706', display: 'inline-block' }} />
                  <span>Mobil 2</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: 14, height: 3, borderRadius: 2, background: '#16a34a', display: 'inline-block' }} />
                  <span>Motor 1</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: 14, height: 2, borderTop: '2px dashed #94a3b8', display: 'inline-block' }} />
                  <span>Baseline</span>
                </div>

                {mapMode === 'status' ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(239, 68, 68, 0.4)', border: '1px solid #dc2626', display: 'inline-block' }} />
                      <span>Rawan</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(59, 130, 246, 0.2)', border: '1px solid #60a5fa', display: 'inline-block' }} />
                      <span>Non-Rawan</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: 10, height: 10, background: '#f1f5f9', border: '1px solid #cbd5e1', display: 'inline-block' }} />
                      <span>0×</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: 10, height: 10, background: '#bbf7d0', border: '1px solid #4ade80', display: 'inline-block' }} />
                      <span>1×</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: 10, height: 10, background: '#4ade80', border: '1px solid #16a34a', display: 'inline-block' }} />
                      <span>2×</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: 10, height: 10, background: '#15803d', border: '1px solid #14532d', display: 'inline-block' }} />
                      <span>&gt;2×</span>
                    </div>
                  </>
                )}
              </div>

              {/* Row 2: Event Markers (Exact Concept Icons) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', borderTop: '1px solid rgba(241, 245, 249, 0.9)', paddingTop: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ background: '#d946ef', color: '#fff', width: 16, height: 16, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 800 }}>⚡</span>
                  <span>&gt;50 km/jam</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ background: '#dc2626', color: '#fff', width: 16, height: 16, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800 }}>⦿</span>
                  <span>&gt;30 menit</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ background: '#f59e0b', color: '#fff', width: 16, height: 16, borderRadius: 3, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 800 }}>▲</span>
                  <span>Keluar rute</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '13px' }}>📍</span>
                  <span>Pencurian</span>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ZONA BAWAH: PLAYBACK (DEFAULT TERTUTUP - COMPACT WHEN CLOSED) */}
          {/* ======================================================== */}
          {!playbackVisible ? (
            /* COMPACT FLOATING BUTTON CLUSTER WHEN PLAYBACK IS CLOSED (NO EMPTY BAR) */
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                zIndex: 900,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {/* Button Legenda */}
              <button
                type="button"
                onClick={() => setLegendaOpen(prev => !prev)}
                style={{
                  background: legendaOpen ? '#0f172a' : 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(226, 232, 240, 0.85)',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: legendaOpen ? '#ffffff' : '#0f172a',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)'
                }}
                title={legendaOpen ? 'Tutup Legenda' : 'Buka Legenda'}
                aria-expanded={legendaOpen}
              >
                <span>Legenda</span>
                <ChevronDown size={14} style={{ transform: legendaOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }} />
              </button>

              {/* Button Playback */}
              <button
                type="button"
                onClick={() => handleTogglePlayback(true)}
                style={{
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(226, 232, 240, 0.85)',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)'
                }}
                title="Buka Playback Bar"
                aria-expanded={false}
              >
                <Play size={13} color="#2563eb" fill="#2563eb" />
                <span>Playback</span>
              </button>
            </div>
          ) : (
            /* EXPANDED PLAYBACK BAR WITH GLASSMORPHISM */
            <div
              style={{
                position: 'absolute',
                bottom: '14px',
                left: '16px',
                right: vehiclePanelOpen ? '372px' : '16px',
                zIndex: 900,
                height: '48px',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(226, 232, 240, 0.85)',
                borderRadius: '8px',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                gap: '12px',
                transition: 'right 0.2s ease'
              }}
            >
              {/* Legenda Toggle Button */}
              <button
                type="button"
                onClick={() => setLegendaOpen(prev => !prev)}
                style={{
                  border: '1px solid rgba(226, 232, 240, 0.85)',
                  background: legendaOpen ? '#0f172a' : '#ffffff',
                  color: legendaOpen ? '#ffffff' : '#475569',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                aria-expanded={legendaOpen}
              >
                <span>Legenda</span>
                <ChevronDown size={13} style={{ transform: legendaOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }} />
              </button>

              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                  background: '#2563eb',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)'
                }}
                title={isPlaying ? 'Jeda' : 'Putar'}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: 2 }} />}
              </button>

              {/* Time display */}
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', minWidth: '78px' }}>
                {playbackTimeString} / 24:00
              </span>

              {/* Progress Slider */}
              <input
                type="range"
                min={0}
                max={100}
                value={playbackProgress}
                onChange={e => setPlaybackProgress(parseFloat(e.target.value))}
                style={{ flex: 1, cursor: 'pointer', accentColor: '#2563eb' }}
              />

              {/* Speed Pills */}
              <div style={{ display: 'flex', gap: '3px', flexShrink: 0 }}>
                {[1, 2, 5].map(spd => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setPlaybackSpeed(spd)}
                    style={{
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      background: playbackSpeed === spd ? '#0f172a' : '#f1f5f9',
                      color: playbackSpeed === spd ? '#ffffff' : '#64748b'
                    }}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {/* Collapse Playback Button */}
              <button
                type="button"
                onClick={() => handleTogglePlayback(false)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: '#64748b',
                  marginLeft: '4px',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Ciutkan Playback"
                aria-label="Ciutkan Playback"
              >
                <ChevronDown size={16} />
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* POPUP DETAIL KENDARAAN (MODAL DIALOG) */}
          {/* ======================================================== */}
          {modalVehicle && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(4px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem'
              }}
            >
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  width: '100%',
                  maxWidth: '780px',
                  maxHeight: '90vh',
                  boxShadow: '0 20px 30px -10px rgba(0,0,0,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                {/* MODAL HEADER (STICKY) */}
                <div
                  style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    background: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: '#f1f5f9',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem'
                      }}
                    >
                      {modalVehicle.vehicleType === 'Car' ? '🚗' : '🏍️'}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                          {modalVehicle.demoName}
                        </h2>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                        {modalVehicle.nopol} · {filterState.estate} · {formatDateIndo(selectedDate)}
                      </div>

                      {/* 3 Status Badges */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            background: modalVehicle.submissionStatus === 'Sudah Dikirim' ? '#f0fdf4' : '#f8fafc',
                            color: modalVehicle.submissionStatus === 'Sudah Dikirim' ? '#16a34a' : '#64748b',
                            border: `1px solid ${modalVehicle.submissionStatus === 'Sudah Dikirim' ? '#bbf7d0' : '#e2e8f0'}`,
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <FileText size={12} />
                          <span>{modalVehicle.submissionStatus}</span>
                        </span>

                        {modalVehicle.submissionStatus === 'Sudah Dikirim' && modalVehicle.priority && (
                          <span
                            style={{
                              background: modalVehicle.priority === 'Urgent' ? '#fef2f2' : '#f0fdf4',
                              color: modalVehicle.priority === 'Urgent' ? '#dc2626' : '#16a34a',
                              border: `1px solid ${modalVehicle.priority === 'Urgent' ? '#fca5a5' : '#bbf7d0'}`,
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '6px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <span>{modalVehicle.priority === 'Urgent' ? '❗' : '✓'}</span>
                            <span>{modalVehicle.priority}</span>
                          </span>
                        )}

                        <span
                          style={{
                            background: '#f8fafc',
                            color: '#475569',
                            border: '1px solid #e2e8f0',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: '6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>💬</span>
                          <span>
                            {modalVehicle.managerCommentStatus === 'Sudah Dikomentari'
                              ? 'Sudah Dikomentari Manager'
                              : modalVehicle.managerCommentStatus === 'Belum Dikomentari'
                              ? 'Belum Dikomentari Manager'
                              : 'Menunggu Pengiriman Manager'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setModalVehicle(null)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: '#94a3b8',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      padding: '4px'
                    }}
                    title="Tutup"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* MODAL BODY (SCROLLABLE) */}
                <div
                  style={{
                    padding: '16px 20px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  {/* B. RINGKASAN HARIAN (4 CARDS) */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '10px'
                    }}
                  >
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Bergerak</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0' }}>
                        {modalVehicle.movingTimeFormatted} <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>({modalVehicle.movingPctFormatted})</span>
                      </div>
                    </div>
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Berhenti</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0' }}>
                        {modalVehicle.stoppedTimeFormatted} <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>({modalVehicle.stoppedPctFormatted})</span>
                      </div>
                    </div>
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Jarak Aktual</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0' }}>
                        {modalVehicle.actualKmFormatted}
                      </div>
                    </div>
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Baseline Tercover</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0' }}>
                        {modalVehicle.baselineCoverageFormatted}
                      </div>
                    </div>
                  </div>

                  {/* C. RUTE DAN JARAK PER SHIFT (TABLE) */}
                  <div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                      Rute dan Jarak per Shift
                    </h4>

                    <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                            <th style={{ padding: '7px 10px' }}>Shift</th>
                            <th style={{ padding: '7px 10px' }}>Nama Baseline</th>
                            <th style={{ padding: '7px 10px', textAlign: 'right' }}>Baseline (km)</th>
                            <th style={{ padding: '7px 10px', textAlign: 'center' }}>Tercover</th>
                            <th style={{ padding: '7px 10px', textAlign: 'right' }}>Sesuai Rute (km)</th>
                            <th style={{ padding: '7px 10px', textAlign: 'right' }}>Di Luar Rute (km)</th>
                            <th style={{ padding: '7px 10px', textAlign: 'right' }}>Aktual (km)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modalVehicle.shifts.map((row, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                              <td style={{ padding: '7px 10px', fontWeight: 600 }}>{row.shift}</td>
                              <td style={{ padding: '7px 10px', color: '#0f172a' }}>{row.baselineName}</td>
                              <td style={{ padding: '7px 10px', textAlign: 'right' }}>{row.baselineKm.toLocaleString('id-ID', { minimumFractionDigits: 1 })}</td>
                              <td style={{ padding: '7px 10px', textAlign: 'center', fontWeight: 600 }}>{row.tercoverPct}%</td>
                              <td style={{ padding: '7px 10px', textAlign: 'right' }}>{row.sesuaiRuteKm.toLocaleString('id-ID', { minimumFractionDigits: 1 })}</td>
                              <td style={{ padding: '7px 10px', textAlign: 'right', color: row.diLuarRuteKm > 0 ? '#d97706' : '#64748b' }}>
                                {row.diLuarRuteKm.toLocaleString('id-ID', { minimumFractionDigits: 1 })}
                              </td>
                              <td style={{ padding: '7px 10px', textAlign: 'right', fontWeight: 700 }}>
                                {row.aktualKm.toLocaleString('id-ID', { minimumFractionDigits: 1 })}
                              </td>
                            </tr>
                          ))}
                          {/* TOTAL ROW */}
                          <tr style={{ background: '#f8fafc', fontWeight: 800, color: '#0f172a' }}>
                            <td style={{ padding: '8px 10px' }}>Total Harian</td>
                            <td style={{ padding: '8px 10px', color: '#64748b' }}>—</td>
                            <td style={{ padding: '8px 10px', textAlign: 'right' }}>{modalVehicle.totals.baselineKm.toLocaleString('id-ID', { minimumFractionDigits: 1 })}</td>
                            <td style={{ padding: '8px 10px', textAlign: 'center' }}>{modalVehicle.totals.tercoverPct}%</td>
                            <td style={{ padding: '8px 10px', textAlign: 'right' }}>{modalVehicle.totals.sesuaiRuteKm.toLocaleString('id-ID', { minimumFractionDigits: 1 })}</td>
                            <td style={{ padding: '8px 10px', textAlign: 'right' }}>{modalVehicle.totals.diLuarRuteKm.toLocaleString('id-ID', { minimumFractionDigits: 1 })}</td>
                            <td style={{ padding: '8px 10px', textAlign: 'right', color: '#0f172a' }}>
                              {modalVehicle.totals.aktualKm.toLocaleString('id-ID', { minimumFractionDigits: 1 })}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* D. RINGKASAN KEGIATAN PATROLI — PIC/KANITPAM */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <FileText size={15} color="#0f172a" />
                      <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                        Ringkasan Kegiatan Patroli
                      </h4>
                    </div>

                    {modalVehicle.picReport ? (
                      <>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '6px' }}>
                          {modalVehicle.picReport.role} • <b>{modalVehicle.picReport.author}</b> • {modalVehicle.picReport.timestamp}
                        </div>
                        <div
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #f1f5f9',
                            borderRadius: '6px',
                            padding: '8px 10px',
                            fontSize: '0.78rem',
                            color: '#334155',
                            lineHeight: 1.5,
                            whiteSpace: 'pre-wrap'
                          }}
                        >
                          {modalVehicle.picReport.content}
                        </div>
                      </>
                    ) : (
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic', padding: '4px 0' }}>
                        Laporan belum dikirim oleh PIC/Kanitpam.
                      </div>
                    )}
                  </div>

                  {/* E. KOMENTAR MANAGER */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '13px' }}>💬</span>
                      <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                        Komentar Manager
                      </h4>
                    </div>

                    {modalVehicle.managerComment ? (
                      <>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '6px' }}>
                          {modalVehicle.managerComment.role} • <b>{modalVehicle.managerComment.author}</b> • {modalVehicle.managerComment.timestamp}
                        </div>
                        <div
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #f1f5f9',
                            borderRadius: '6px',
                            padding: '8px 10px',
                            fontSize: '0.78rem',
                            color: '#334155',
                            lineHeight: 1.5,
                            whiteSpace: 'pre-wrap'
                          }}
                        >
                          {modalVehicle.managerComment.content}
                        </div>
                      </>
                    ) : modalVehicle.submissionStatus === 'Sudah Dikirim' ? (
                      <div style={{ fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic', padding: '4px 0' }}>
                        Belum dikomentari Manager.
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic', padding: '4px 0' }}>
                        Menunggu pengiriman laporan oleh PIC/Kanitpam.
                      </div>
                    )}
                  </div>
                </div>

                {/* MODAL FOOTER (STICKY) */}
                <div
                  style={{
                    padding: '12px 20px',
                    borderTop: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    ℹ️ Detail event tersedia di laporan kendaraan.
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setModalVehicle(null)}
                      style={{
                        padding: '6px 14px',
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      Tutup
                    </button>

                    <Link
                      href={`/hasil-laporan-patroli?vehicleId=${modalVehicle.vehicleId}&date=${selectedDate}`}
                      style={{
                        padding: '6px 14px',
                        background: '#2563eb',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>Lihat Laporan Kendaraan</span>
                      <ExternalLink size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EVENT FILTER MODAL (WHEN CLICKING INDIVIDUAL EVENT BADGE) */}
          {activeEventFilter && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(4px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem'
              }}
            >
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  width: '100%',
                  maxWidth: '500px',
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
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
        </div>
      )}
    </PageShell>
  )
}
