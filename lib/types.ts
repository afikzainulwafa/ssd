// Types for SmartTrack Reports / Analytics & Utilization Data Model

export interface EstateEntity {
  id: string; // e.g. 'Estate B', 'AMPA', 'PANG'
  name: string;
  regionId: string; // e.g. 'Region A', 'RIAS', 'RIAN', 'KALBAR'
  psmId: string; // e.g. 'PSM A', 'PSM B', 'PSM C'
}

export interface VehicleEntity {
  id: string;
  nopol: string;
  estateId: string;
  vehicleType: 'Car' | 'Motorcycle';
  gpsId: string;
  effectiveStartDate: string; // e.g. '2026-01-01'
  effectiveEndDate?: string;
  status: 'Active' | 'Under Maintenance' | 'Decommissioned';
}

export interface BlockEntity {
  id: string;
  estateId: string;
  blockCode: string; // e.g. 'Blok B04'
  isRawan: boolean; // true = Rawan, false = Non-Rawan
  hasGeometry: boolean; // Data quality indicator
}

export interface PatrolRunRecord {
  id: string;
  date: string; // YYYY-MM-DD
  estateId: string;
  vehicleId: string;
  shift?: 'Shift 1' | 'Shift 2' | 'Shift 3';
  driverName?: string;
  targetDistanceKm: number | null;
  actualDistanceKm: number | null;
  inRouteKm: number | null;
  outOfRouteKm: number | null;
  unclassifiedKm?: number | null;
  movingTimeMinutes: number;
  stoppingTimeMinutes: number;
  gpsTraceQuality: 'Good' | 'Degraded' | 'Missing';
  rawanBlocksCovered?: number;
  nonRawanBlocksCovered?: number;
  nopol?: string;
  vehicleType?: string;
  isImported?: boolean;
}

export interface ExceptionEventRecord {
  id: string;
  patrolRunId: string;
  date: string;
  estateId: string;
  vehicleId: string;
  shift: 'Shift 1' | 'Shift 2' | 'Shift 3';
  type: 'Overspeed' | 'Out of Route' | 'Overparking' | 'Vehicle Breakdown' | 'GPS Breakdown';
  reasonCategory: string; // e.g., 'Instruksi Mendadak', 'Cek Areal Pringgan', 'Perbaikan Ban'
  detail: string;
  locationBlock: string;
  durationMinutes?: number;
  durationSeconds?: number;
  distanceKm?: number;
  maxSpeedKmvh?: number;
  reportPriority?: 'Normal' | 'Urgent';
  eventIndex?: number;
  startTime?: string;
  endTime?: string;
  parentReason?: string;
  subReason?: string;
  lat?: number;
  lng?: number;
  picComment?: string;
}

export interface BlockVisitRecord {
  id: string;
  patrolRunId: string;
  blockId: string;
  date: string;
  shift: 'Shift 1' | 'Shift 2' | 'Shift 3';
  entryTimestamp: string;
  exitTimestamp: string;
  distanceInsideMeters: number;
  durationMinutes: number;
  isQualifying: boolean; // For Rawan: distance >= 600m AND gap >= 10m
}

export interface PatrolReportRecord {
  id: string;
  patrolRunId: string;
  date: string; // YYYY-MM-DD
  estateId: string;
  vehicleId: string;
  submissionStatus: 'Sudah Dikirim' | 'Belum Dikirim';
  reportType: 'Normal' | 'Urgent' | 'Unit Rusak' | 'GPS Rusak';
  uploadDate?: string;
  status: 'Generated' | 'Pending PIC Comment' | 'Submitted PIC' | 'Pending Manager Review' | 'Reviewed Manager';
  picComment?: string;
  picSubmittedAt?: string;
  managerComment?: string;
  managerReviewedAt?: string;
  managerRating?: 'Approved' | 'Needs Improvement';
  repairStatus?: string;
  gpsNote?: string;
}

export interface GlobalFilterState {
  psm: string; // 'ALL', 'PSM A', 'PSM B', ...
  region: string; // 'ALL', 'Region A', 'RIAS', ...
  estate: string; // 'ALL', 'Estate B', 'AMPA', ...
  year: string; // '2026'
  month: string; // '01', '02', ..., '05', ...
  vehicleId?: string; // 'ALL' or specific vehicle ID
  startDate?: string;
  endDate?: string;
}

