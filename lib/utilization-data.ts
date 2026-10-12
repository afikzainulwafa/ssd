export interface UtilizationSummaryKpi {
  totalMileageKm: number
  avgMileageKmPerUnit: number
  totalMovingHours: number
  avgMovingHoursPerUnit: number
  totalStoppingHours: number
  avgStoppingHoursPerUnit: number
  gpsActiveCount: number
  gpsIssueCount: number
}

export interface VehicleUtilizationRow {
  id: string
  nopol: string
  estate: string
  vehicleType: 'Car' | 'Motorcycle'
  gpsId: string
  mileageKm: number
  movingTimeHours: number
  stoppingTimeHours: number
  shift1MovingHours: number
  shift2MovingHours: number
  shift3MovingHours: number
  shift1StoppingHours: number
  shift2StoppingHours: number
  shift3StoppingHours: number
  gpsStatus: 'Active' | 'Signal Weak' | 'Offline'
  lastActiveTime: string
}

export const MOCK_UTILIZATION_SUMMARY: UtilizationSummaryKpi = {
  totalMileageKm: 3845.2,
  avgMileageKmPerUnit: 153.8,
  totalMovingHours: 248.5,
  avgMovingHoursPerUnit: 9.9,
  totalStoppingHours: 112.0,
  avgStoppingHoursPerUnit: 4.5,
  gpsActiveCount: 23,
  gpsIssueCount: 2,
}

export const MOCK_VEHICLE_UTILIZATION: VehicleUtilizationRow[] = [
  {
    id: 'U-001',
    nopol: 'BK 7788 XY',
    estate: 'Estate B',
    vehicleType: 'Car',
    gpsId: 'GPS-KL-001',
    mileageKm: 342.5,
    movingTimeHours: 22.4,
    stoppingTimeHours: 8.6,
    shift1MovingHours: 8.2,
    shift2MovingHours: 7.8,
    shift3MovingHours: 6.4,
    shift1StoppingHours: 2.5,
    shift2StoppingHours: 2.8,
    shift3StoppingHours: 3.3,
    gpsStatus: 'Active',
    lastActiveTime: '2026-02-16 16:45',
  },
  {
    id: 'U-002',
    nopol: 'BK 1212 CC',
    estate: 'Estate B',
    vehicleType: 'Car',
    gpsId: 'GPS-KL-002',
    mileageKm: 298.0,
    movingTimeHours: 19.8,
    stoppingTimeHours: 11.2,
    shift1MovingHours: 7.5,
    shift2MovingHours: 6.9,
    shift3MovingHours: 5.4,
    shift1StoppingHours: 3.2,
    shift2StoppingHours: 3.8,
    shift3StoppingHours: 4.2,
    gpsStatus: 'Active',
    lastActiveTime: '2026-02-16 16:42',
  },
  {
    id: 'U-003',
    nopol: 'BK 5656 DD',
    estate: 'Estate B',
    vehicleType: 'Motorcycle',
    gpsId: 'GPS-KL-003',
    mileageKm: 184.2,
    movingTimeHours: 14.2,
    stoppingTimeHours: 14.8,
    shift1MovingHours: 6.1,
    shift2MovingHours: 5.2,
    shift3MovingHours: 2.9,
    shift1StoppingHours: 4.5,
    shift2StoppingHours: 5.1,
    shift3StoppingHours: 5.2,
    gpsStatus: 'Signal Weak',
    lastActiveTime: '2026-02-16 14:15',
  },
  {
    id: 'U-004',
    nopol: 'BK 8989 EE',
    estate: 'Estate B',
    vehicleType: 'Car',
    gpsId: 'GPS-KL-004',
    mileageKm: 412.0,
    movingTimeHours: 26.5,
    stoppingTimeHours: 6.5,
    shift1MovingHours: 9.1,
    shift2MovingHours: 8.9,
    shift3MovingHours: 8.5,
    shift1StoppingHours: 2.1,
    shift2StoppingHours: 2.0,
    shift3StoppingHours: 2.4,
    gpsStatus: 'Active',
    lastActiveTime: '2026-02-16 16:50',
  },
  {
    id: 'U-005',
    nopol: 'BK 3434 FF',
    estate: 'Estate B',
    vehicleType: 'Motorcycle',
    gpsId: 'GPS-KL-005',
    mileageKm: 165.8,
    movingTimeHours: 12.6,
    stoppingTimeHours: 16.4,
    shift1MovingHours: 5.4,
    shift2MovingHours: 4.8,
    shift3MovingHours: 2.4,
    shift1StoppingHours: 5.1,
    shift2StoppingHours: 5.5,
    shift3StoppingHours: 5.8,
    gpsStatus: 'Active',
    lastActiveTime: '2026-02-16 16:38',
  },
  {
    id: 'U-006',
    nopol: 'BK 9900 GG',
    estate: 'Estate B',
    vehicleType: 'Car',
    gpsId: 'GPS-KL-006',
    mileageKm: 85.0,
    movingTimeHours: 5.8,
    stoppingTimeHours: 23.2,
    shift1MovingHours: 3.2,
    shift2MovingHours: 2.6,
    shift3MovingHours: 0.0,
    shift1StoppingHours: 7.2,
    shift2StoppingHours: 8.0,
    shift3StoppingHours: 8.0,
    gpsStatus: 'Offline',
    lastActiveTime: '2026-02-15 09:20',
  },
]
