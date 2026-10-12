export interface ReportSummaryKpi {
  targetCompliancePct: number
  targetDistanceKm: number
  actualDistanceKm: number
  overspeedEventsCount: number
  outOfRouteEventsCount: number
  outOfRouteKm: number
  overparkingEventsCount: number
}

export interface MonthlyTargetCompliance {
  month: string
  targetReport: number
  actualReport: number
  compliancePct: number
}

export interface ReportViolationRow {
  id: string
  date: string
  estate: string
  nopol: string
  vehicleType: 'Car' | 'Motorcycle'
  shift: 'Shift 1' | 'Shift 2' | 'Shift 3'
  violationType: 'Overspeed' | 'Out of Route' | 'Overparking'
  detail: string
  locationBlock: string
  durationMinutes?: number
  maxSpeedKmvh?: number
}

export interface BlockSummaryRow {
  id: string
  blockName: string
  estate: string
  isRawan: boolean
  targetPatrols: number
  actualPatrols: number
  coveragePct: number
  status: 'Tercapai' | 'Kurang' | 'Perlu Perhatian'
}

export const MOCK_REPORT_SUMMARY: ReportSummaryKpi = {
  targetCompliancePct: 92.4,
  targetDistanceKm: 1450.0,
  actualDistanceKm: 1340.5,
  overspeedEventsCount: 14,
  outOfRouteEventsCount: 8,
  outOfRouteKm: 42.3,
  overparkingEventsCount: 6,
}

export const MOCK_MONTHLY_COMPLIANCE: MonthlyTargetCompliance[] = [
  { month: 'Okt 2025', targetReport: 120, actualReport: 114, compliancePct: 95.0 },
  { month: 'Nov 2025', targetReport: 125, actualReport: 118, compliancePct: 94.4 },
  { month: 'Des 2025', targetReport: 130, actualReport: 115, compliancePct: 88.4 },
  { month: 'Jan 2026', targetReport: 130, actualReport: 122, compliancePct: 93.8 },
  { month: 'Feb 2026', targetReport: 135, actualReport: 125, compliancePct: 92.5 },
]

export const MOCK_REPORT_VIOLATIONS: ReportViolationRow[] = [
  {
    id: 'V-001',
    date: '2026-02-15',
    estate: 'Estate B',
    nopol: 'BK 7788 XY',
    vehicleType: 'Car',
    shift: 'Shift 1',
    violationType: 'Overspeed',
    detail: 'Kecepatan maksimum mencapai 64 km/jam di jalur poros utama',
    locationBlock: 'Blok B12',
    maxSpeedKmvh: 64,
  },
  {
    id: 'V-002',
    date: '2026-02-15',
    estate: 'Estate B',
    nopol: 'BK 1212 CC',
    vehicleType: 'Car',
    shift: 'Shift 2',
    violationType: 'Out of Route',
    detail: 'Kendaraan keluar dari rute koridor sejauh 4.2 km menuju perbatasan desa',
    locationBlock: 'Blok C08',
  },
  {
    id: 'V-003',
    date: '2026-02-14',
    estate: 'Estate B',
    nopol: 'BK 5656 DD',
    vehicleType: 'Motorcycle',
    shift: 'Shift 1',
    violationType: 'Overparking',
    detail: 'Berhenti tanpa pergerakan selama 48 menit di area pemukiman warga',
    locationBlock: 'Blok A05',
    durationMinutes: 48,
  },
  {
    id: 'V-004',
    date: '2026-02-14',
    estate: 'Estate B',
    nopol: 'BK 8989 EE',
    vehicleType: 'Car',
    shift: 'Shift 3',
    violationType: 'Overspeed',
    detail: 'Kecepatan 58 km/jam pada kondisi malam hari',
    locationBlock: 'Blok D15',
    maxSpeedKmvh: 58,
  },
  {
    id: 'V-005',
    date: '2026-02-13',
    estate: 'Estate B',
    nopol: 'BK 7788 XY',
    vehicleType: 'Car',
    shift: 'Shift 2',
    violationType: 'Overparking',
    detail: 'Parkir melebihi ambang batas 35 menit di simpang blok rawan',
    locationBlock: 'Blok B04 (Rawan)',
    durationMinutes: 35,
  },
  {
    id: 'V-006',
    date: '2026-02-12',
    estate: 'Estate B',
    nopol: 'BK 3434 FF',
    vehicleType: 'Motorcycle',
    shift: 'Shift 1',
    violationType: 'Out of Route',
    detail: 'Penyimpangan rute patroli sejauh 2.8 km di luar area konsesi',
    locationBlock: 'Blok E02',
  },
]

export const MOCK_BLOCK_SUMMARY: BlockSummaryRow[] = [
  { id: 'BLK-01', blockName: 'Blok B04', estate: 'Estate B', isRawan: true, targetPatrols: 24, actualPatrols: 23, coveragePct: 95.8, status: 'Tercapai' },
  { id: 'BLK-02', blockName: 'Blok B12', estate: 'Estate B', isRawan: true, targetPatrols: 24, actualPatrols: 24, coveragePct: 100.0, status: 'Tercapai' },
  { id: 'BLK-03', blockName: 'Blok C08', estate: 'Estate B', isRawan: false, targetPatrols: 18, actualPatrols: 14, coveragePct: 77.8, status: 'Kurang' },
  { id: 'BLK-04', blockName: 'Blok A05', estate: 'Estate B', isRawan: false, targetPatrols: 18, actualPatrols: 18, coveragePct: 100.0, status: 'Tercapai' },
  { id: 'BLK-05', blockName: 'Blok D15', estate: 'Estate B', isRawan: true, targetPatrols: 24, actualPatrols: 19, coveragePct: 79.2, status: 'Perlu Perhatian' },
  { id: 'BLK-06', blockName: 'Blok E02', estate: 'Estate B', isRawan: false, targetPatrols: 12, actualPatrols: 12, coveragePct: 100.0, status: 'Tercapai' },
]
