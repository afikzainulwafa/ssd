import {
  MOCK_ESTATES,
  MOCK_VEHICLES,
  MOCK_BLOCKS,
  MOCK_PATROL_RUNS,
  MOCK_EXCEPTIONS,
  MOCK_BLOCK_VISITS,
  MOCK_PATROL_REPORTS
} from './mock-database';
import { IMPORTED_PATROL_RUNS, IMPORTED_TRACKS_MAP } from './imported-tracking';
import {
  GlobalFilterState,
  EstateEntity,
  VehicleEntity,
  BlockEntity,
  PatrolRunRecord,
  ExceptionEventRecord,
  BlockVisitRecord,
  PatrolReportRecord
} from './types';
import { formatDurationFormatted, formatDistanceKm } from './formatters';

// Month helper mapping
const MONTH_MAP: { [key: string]: { num: string; shortIndo: string; days: number } } = {
  'Jan': { num: '01', shortIndo: 'Jan', days: 31 },
  'Feb': { num: '02', shortIndo: 'Feb', days: 28 },
  'Mar': { num: '03', shortIndo: 'Mar', days: 31 },
  'Apr': { num: '04', shortIndo: 'Apr', days: 30 },
  'May': { num: '05', shortIndo: 'Mei', days: 31 },
  'Jun': { num: '06', shortIndo: 'Jun', days: 30 },
  'Jul': { num: '07', shortIndo: 'Jul', days: 31 },
  'Aug': { num: '08', shortIndo: 'Agu', days: 31 },
  'Sep': { num: '09', shortIndo: 'Sep', days: 30 },
  'Oct': { num: '10', shortIndo: 'Okt', days: 31 },
  'Nov': { num: '11', shortIndo: 'Nov', days: 30 },
  'Dec': { num: '12', shortIndo: 'Des', days: 31 },
  '01': { num: '01', shortIndo: 'Jan', days: 31 },
  '02': { num: '02', shortIndo: 'Feb', days: 28 },
  '03': { num: '03', shortIndo: 'Mar', days: 31 },
  '04': { num: '04', shortIndo: 'Apr', days: 30 },
  '05': { num: '05', shortIndo: 'Mei', days: 31 },
  '06': { num: '06', shortIndo: 'Jun', days: 30 },
  '07': { num: '07', shortIndo: 'Jul', days: 31 },
  '08': { num: '08', shortIndo: 'Agu', days: 31 },
  '09': { num: '09', shortIndo: 'Sep', days: 30 },
  '10': { num: '10', shortIndo: 'Okt', days: 31 },
  '11': { num: '11', shortIndo: 'Nov', days: 30 },
  '12': { num: '12', shortIndo: 'Des', days: 31 },
};

export function normalizeMonth(monthStr?: string): { num: string; shortIndo: string; days: number } {
  if (!monthStr || monthStr === 'ALL') return MONTH_MAP['May'];
  return MONTH_MAP[monthStr] || MONTH_MAP['May'];
}

export function get6MonthTrendWindow(endYearStr: string, endMonthStr: string, endDateStr?: string) {
  let endYr = parseInt(endYearStr || '2026', 10);
  let endMInfo = normalizeMonth(endMonthStr);
  let endMNum = parseInt(endMInfo.num, 10);
  let endDayNum: number | null = null;

  if (endDateStr) {
    const parts = endDateStr.split('-');
    if (parts.length === 3) {
      endYr = parseInt(parts[0], 10);
      endMNum = parseInt(parts[1], 10);
      endDayNum = parseInt(parts[2], 10);
    }
  }

  const windowMonths = [];
  for (let i = 5; i >= 0; i--) {
    let yr = endYr;
    let mNum = endMNum - i;
    if (mNum <= 0) {
      mNum += 12;
      yr -= 1;
    }
    const mStr = mNum < 10 ? `0${mNum}` : `${mNum}`;
    const mInfo = normalizeMonth(mStr);

    let days = mInfo.days;
    let isPartialMonth = false;
    let label = `${mInfo.shortIndo} ${yr}`;
    let partialTooltip: string | undefined = undefined;
    let maxDateStr: string | undefined = undefined;

    if (i === 0 && endDayNum !== null && endDayNum < mInfo.days) {
      days = endDayNum;
      isPartialMonth = true;
      label = `${mInfo.shortIndo} ${yr}*`;
      partialTooltip = `Target & actual hanya s/d ${endDayNum} ${mInfo.shortIndo} ${yr} (${days} hari)`;
      maxDateStr = endDateStr;
    }

    windowMonths.push({
      year: yr.toString(),
      monthNum: mStr,
      yearMonth: `${yr}-${mStr}`,
      label,
      days,
      isPartialMonth,
      partialTooltip,
      maxDateStr
    });
  }
  return windowMonths;
}

// Helper to filter Estates by Global Filter
export function getFilteredEstates(filters: GlobalFilterState): EstateEntity[] {
  return MOCK_ESTATES.filter(estate => {
    if (filters.psm && filters.psm !== 'ALL' && estate.psmId !== filters.psm) return false;
    if (filters.region && filters.region !== 'ALL' && estate.regionId !== filters.region) return false;
    if (filters.estate && filters.estate !== 'ALL' && estate.id !== filters.estate) return false;
    return true;
  });
}

// Helper to filter Vehicles by Global Filter
export function getFilteredVehicles(filters: GlobalFilterState): VehicleEntity[] {
  const allowedEstates = new Set(getFilteredEstates(filters).map(e => e.id));
  return MOCK_VEHICLES.filter(v => {
    if (!allowedEstates.has(v.estateId)) return false;
    if (filters.vehicleId && filters.vehicleId !== 'ALL' && v.id !== filters.vehicleId) return false;
    return true;
  });
}

// Helper to filter Patrol Runs
export function getFilteredPatrolRuns(filters: GlobalFilterState): PatrolRunRecord[] {
  const allowedEstates = new Set(getFilteredEstates(filters).map(e => e.id));
  const allowedVehicles = new Set(getFilteredVehicles(filters).map(v => v.id));

  const importedMap = new Map(IMPORTED_PATROL_RUNS.map(r => [`${r.date}__${r.vehicleId}`, r]));
  const combinedRuns = [
    ...IMPORTED_PATROL_RUNS,
    ...MOCK_PATROL_RUNS.filter(r => !importedMap.has(`${r.date}__${r.vehicleId}`))
  ];

  return combinedRuns.filter(run => {
    if (!allowedEstates.has(run.estateId)) return false;
    if (!allowedVehicles.has(run.vehicleId)) return false;

    if (filters.startDate && filters.endDate) {
      if (run.date < filters.startDate || run.date > filters.endDate) return false;
    } else {
      const mInfo = normalizeMonth(filters.month);
      if (filters.year && filters.month && filters.month !== 'ALL') {
        const yearMonthPrefix = `${filters.year}-${mInfo.num}`;
        if (!run.date.startsWith(yearMonthPrefix)) return false;
      } else if (filters.year) {
        if (!run.date.startsWith(filters.year)) return false;
      }
    }

    return true;
  });
}

// Helper to filter Patrol Reports
export function getFilteredPatrolReports(filters: GlobalFilterState): PatrolReportRecord[] {
  const allowedEstates = new Set(getFilteredEstates(filters).map(e => e.id));
  const allowedVehicles = new Set(getFilteredVehicles(filters).map(v => v.id));

  return MOCK_PATROL_REPORTS.filter(rep => {
    if (!allowedEstates.has(rep.estateId)) return false;
    if (!allowedVehicles.has(rep.vehicleId)) return false;

    if (filters.startDate && filters.endDate) {
      if (rep.date < filters.startDate || rep.date > filters.endDate) return false;
    } else {
      const mInfo = normalizeMonth(filters.month);
      if (filters.year && filters.month && filters.month !== 'ALL') {
        const yearMonthPrefix = `${filters.year}-${mInfo.num}`;
        if (!rep.date.startsWith(yearMonthPrefix)) return false;
      } else if (filters.year) {
        if (!rep.date.startsWith(filters.year)) return false;
      }
    }

    return true;
  });
}

// Helper to filter Exceptions
export function getFilteredExceptions(filters: GlobalFilterState): ExceptionEventRecord[] {
  const allowedEstates = new Set(getFilteredEstates(filters).map(e => e.id));
  const allowedVehicles = new Set(getFilteredVehicles(filters).map(v => v.id));

  return MOCK_EXCEPTIONS.filter(exp => {
    if (!allowedEstates.has(exp.estateId)) return false;
    if (!allowedVehicles.has(exp.vehicleId)) return false;

    if (filters.startDate && filters.endDate) {
      if (exp.date < filters.startDate || exp.date > filters.endDate) return false;
    } else {
      const mInfo = normalizeMonth(filters.month);
      if (filters.year && filters.month && filters.month !== 'ALL') {
        const yearMonthPrefix = `${filters.year}-${mInfo.num}`;
        if (!exp.date.startsWith(yearMonthPrefix)) return false;
      } else if (filters.year) {
        if (!exp.date.startsWith(filters.year)) return false;
      }
    }

    return true;
  });
}

// Helper for Disiplin Upload Thresholds
export function getDisiplinThreshold(pct: number | null): 'Green' | 'Yellow' | 'Red' | 'N/A' {
  if (pct === null) return 'N/A';
  if (pct >= 100) return 'Green';
  if (pct >= 90) return 'Yellow';
  return 'Red';
}

export function getDisiplinColor(pct: number | null): string {
  const threshold = getDisiplinThreshold(pct);
  if (threshold === 'Green') return '#10b981'; // emerald-500
  if (threshold === 'Yellow') return '#f59e0b'; // amber-500
  if (threshold === 'Red') return '#ef4444'; // red-500
  return '#9ca3af'; // gray-400
}

export function getSrmdThresholdColor(pct: number | null): string {
  if (pct === null) return '#9ca3af';
  if (pct <= 10) return '#10b981'; // Green <= 10%
  if (pct <= 20) return '#f59e0b'; // Yellow 10% < pct <= 20%
  return '#ef4444'; // Red > 20%
}

// 1. Selector for Reports Summary KPI Cards
export function selectReportsKpis(
  filters: GlobalFilterState,
  priorityFilter: 'ALL' | 'Normal' | 'Urgent' = 'ALL'
) {
  const filteredVehicles = getFilteredVehicles(filters);
  const filteredReports = getFilteredPatrolReports(filters);
  const filteredExceptions = getFilteredExceptions(filters);
  let daysInPeriod = 31;
  if (filters.startDate && filters.endDate) {
    const s = new Date(filters.startDate);
    const e = new Date(filters.endDate);
    const diffTime = Math.abs(e.getTime() - s.getTime());
    daysInPeriod = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  } else {
    const mInfo = normalizeMonth(filters.month);
    daysInPeriod = mInfo.days;
  }
  const targetReports = filteredVehicles.length * daysInPeriod;

  const sudahDikirimReports = filteredReports.filter(r => r.submissionStatus === 'Sudah Dikirim');
  const belumDikirimReports = filteredReports.filter(r => r.submissionStatus === 'Belum Dikirim');

  const sudahDikirimCount = sudahDikirimReports.length;
  const belumDikirimCount = Math.max(0, targetReports - sudahDikirimCount);

  const normalCount = sudahDikirimReports.filter(r => r.reportType === 'Normal').length;
  const urgentCount = sudahDikirimReports.filter(r => r.reportType === 'Urgent').length;
  const unitRusakCount = sudahDikirimReports.filter(r => r.reportType === 'Unit Rusak').length;
  const gpsRusakCount = sudahDikirimReports.filter(r => r.reportType === 'GPS Rusak').length;

  const rawRate = targetReports > 0 ? (sudahDikirimCount / targetReports) * 100 : 0;
  const complianceRate = Math.round(rawRate * 10) / 10;
  const threshold = getDisiplinThreshold(targetReports > 0 ? complianceRate : null);

  // Common denominator T = targetReports
  const normalPct = targetReports > 0 ? Math.round((normalCount / targetReports) * 1000) / 10 : 0;
  const urgentPct = targetReports > 0 ? Math.round((urgentCount / targetReports) * 1000) / 10 : 0;
  const patrolSubtotalPct = targetReports > 0 ? Math.round(((normalCount + urgentCount) / targetReports) * 1000) / 10 : 0;
  const unitRusakPct = targetReports > 0 ? Math.round((unitRusakCount / targetReports) * 1000) / 10 : 0;
  const gpsRusakPct = targetReports > 0 ? Math.round((gpsRusakCount / targetReports) * 1000) / 10 : 0;

  const rawUnitRusakPct = targetReports > 0 ? (unitRusakCount / targetReports) * 100 : 0;
  const rawGpsRusakPct = targetReports > 0 ? (gpsRusakCount / targetReports) * 100 : 0;

  const unitRusakThresholdColor = getSrmdThresholdColor(targetReports > 0 ? rawUnitRusakPct : null);
  const gpsRusakThresholdColor = getSrmdThresholdColor(targetReports > 0 ? rawGpsRusakPct : null);

  // Filter report IDs for exceptions based on priorityFilter
  const targetReportIds = new Set(
    sudahDikirimReports
      .filter(r => {
        if (priorityFilter === 'Normal') return r.reportType === 'Normal';
        if (priorityFilter === 'Urgent') return r.reportType === 'Urgent';
        return r.reportType === 'Normal' || r.reportType === 'Urgent';
      })
      .map(r => r.patrolRunId)
  );

  const speedingEvents = filteredExceptions.filter(e => e.type === 'Overspeed' && targetReportIds.has(e.patrolRunId));
  const speedingDurationMinutes = speedingEvents.reduce((sum, e) => sum + (e.durationMinutes || 0), 0);
  const speedingAffectedReports = new Set(speedingEvents.map(e => e.patrolRunId)).size;

  const outOfRouteEvents = filteredExceptions.filter(e => e.type === 'Out of Route' && targetReportIds.has(e.patrolRunId));
  const outOfRouteKm = outOfRouteEvents.reduce((sum, e) => sum + (e.distanceKm || 0), 0);
  const outOfRouteAffectedReports = new Set(outOfRouteEvents.map(e => e.patrolRunId)).size;

  const overparkingEvents = filteredExceptions.filter(e => e.type === 'Overparking' && targetReportIds.has(e.patrolRunId));
  const overparkingMinutes = overparkingEvents.reduce((sum, e) => sum + (e.durationMinutes || 0), 0);
  const overparkingHours = Math.round((overparkingMinutes / 60) * 10) / 10;
  const overparkingAffectedReports = new Set(overparkingEvents.map(e => e.patrolRunId)).size;

  const vehicleCount = filteredVehicles.length;
  const vehicleDayText = `${vehicleCount} unit · ${daysInPeriod} hari`;
  const targetTooltip = `Target: ${vehicleCount} kendaraan × ${daysInPeriod} hari = ${targetReports} laporan.`;

  return {
    targetReports,
    vehicleCount,
    vehicleDayText,
    targetTooltip,
    sudahDikirimCount,
    belumDikirimCount,
    sudahDikirimPct: complianceRate,
    normalCount,
    normalPct,
    urgentCount,
    urgentPct,
    patrolSubtotalPct,
    unitRusakCount,
    unitRusakPct,
    unitRusakThresholdColor,
    gpsRusakCount,
    gpsRusakPct,
    gpsRusakThresholdColor,
    threshold,
    thresholdColor: getDisiplinColor(targetReports > 0 ? complianceRate : null),
    speedingCount: speedingEvents.length,
    speedingAffectedReports,
    speedingDurationMinutes,
    outOfRouteCount: outOfRouteEvents.length,
    outOfRouteAffectedReports,
    outOfRouteKm: Math.round(outOfRouteKm * 100) / 100,
    overparkingCount: overparkingEvents.length,
    overparkingAffectedReports,
    overparkingHours,
    overparkingMinutes,
    hkDays: daysInPeriod
  };
}

// 2. Comprehensive Selector for Laporan Chart & Table
export interface ChartCategoryItem {
  id: string;
  label: string;
  subLabel?: string;
  targetReports: number;
  actualReports: number;
  shortfall: number;
  compliancePct: number | null; // null if target is 0
  vehicleCount: number;
  threshold: 'Green' | 'Yellow' | 'Red' | 'N/A';
  thresholdColor: string;
  isCompliant: boolean;
  isNoTarget: boolean;
  yearMonth?: string;
  isPartialMonth?: boolean;
  partialTooltip?: string;
}

export interface DailyReportViewItem {
  id: string;
  date: string;
  estateId: string;
  vehicleId: string;
  nopol: string;
  vehicleType: 'Mobil' | 'Motor';
  trackingStatus: 'Tersedia' | 'Tidak Tersedia';
  submissionStatus: 'Sudah Dikirim' | 'Belum Dikirim';
  reportType: 'Normal' | 'Urgent' | 'Unit Rusak' | 'GPS Rusak';
  picStatus: string;
  managerStatus: string;
  managerComment?: string;
  repairStatus?: string;
  gpsNote?: string;
  isMissing: boolean;
  uploadDate?: string;
  rawRecord?: PatrolReportRecord;
}

export function selectLaporanChartAndTable(
  filters: GlobalFilterState,
  chartViewMode: 'Perbandingan' | 'Tren 6 Bulan',
  measureMode: 'Persentase (%)' | 'Jumlah Laporan',
  drilldownState: { categoryKey: string; label: string } | null
) {
  const mInfo = normalizeMonth(filters.month);
  const yearStr = filters.year || '2026';

  let groupingType: 'PSM' | 'Region' | 'Estate' | 'Vehicle' | 'Month' = 'PSM';
  if (chartViewMode === 'Perbandingan') {
    if (filters.psm === 'ALL') groupingType = 'PSM';
    else if (filters.region === 'ALL') groupingType = 'Region';
    else if (filters.estate === 'ALL') groupingType = 'Estate';
    else groupingType = 'Vehicle';
  } else {
    groupingType = 'Month';
  }

  const categories: ChartCategoryItem[] = [];

  let periodDays = 31;
  let startDateStr = '';
  let endDateStr = '';

  if (filters.startDate && filters.endDate) {
    startDateStr = filters.startDate;
    endDateStr = filters.endDate;
    const s = new Date(filters.startDate);
    const e = new Date(filters.endDate);
    const diffTime = Math.abs(e.getTime() - s.getTime());
    periodDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  } else {
    periodDays = mInfo.days;
    startDateStr = `${yearStr}-${mInfo.num}-01`;
    endDateStr = `${yearStr}-${mInfo.num}-${periodDays < 10 ? '0' + periodDays : periodDays}`;
  }

  if (chartViewMode === 'Perbandingan') {
    if (groupingType === 'PSM') {
      const psms = ['PSM A', 'PSM B', 'PSM C', 'PSM E', 'PSM F', 'PSM G'];
      psms.forEach(psmId => {
        const psmEstates = MOCK_ESTATES.filter(e => e.psmId === psmId);
        const estateIds = new Set(psmEstates.map(e => e.id));
        const psmVehicles = MOCK_VEHICLES.filter(v => estateIds.has(v.estateId));

        const target = psmVehicles.length * periodDays;
        const actual = MOCK_PATROL_REPORTS.filter(r =>
          estateIds.has(r.estateId) &&
          r.date >= startDateStr &&
          r.date <= endDateStr &&
          r.submissionStatus === 'Sudah Dikirim'
        ).length;
        const shortfall = Math.max(0, target - actual);
        const pct = target > 0 ? Math.round((actual / target) * 1000) / 10 : null;

        categories.push({
          id: psmId,
          label: psmId,
          subLabel: `${psmEstates.length} Estate · ${psmVehicles.length} Unit`,
          targetReports: target,
          actualReports: actual,
          shortfall,
          compliancePct: pct,
          vehicleCount: psmVehicles.length,
          threshold: getDisiplinThreshold(pct),
          thresholdColor: getDisiplinColor(pct),
          isCompliant: pct !== null && pct >= 90,
          isNoTarget: target === 0
        });
      });
    } else if (groupingType === 'Region') {
      const psmEstates = MOCK_ESTATES.filter(e => e.psmId === filters.psm);
      const regionsSet = Array.from(new Set(psmEstates.map(e => e.regionId)));

      regionsSet.forEach(regId => {
        const regEstates = psmEstates.filter(e => e.regionId === regId);
        const estateIds = new Set(regEstates.map(e => e.id));
        const regVehicles = MOCK_VEHICLES.filter(v => estateIds.has(v.estateId));

        const target = regVehicles.length * periodDays;
        const actual = MOCK_PATROL_REPORTS.filter(r =>
          estateIds.has(r.estateId) &&
          r.date >= startDateStr &&
          r.date <= endDateStr &&
          r.submissionStatus === 'Sudah Dikirim'
        ).length;
        const shortfall = Math.max(0, target - actual);
        const pct = target > 0 ? Math.round((actual / target) * 1000) / 10 : null;

        categories.push({
          id: regId,
          label: regId,
          subLabel: `${regEstates.length} Estate · ${regVehicles.length} Unit`,
          targetReports: target,
          actualReports: actual,
          shortfall,
          compliancePct: pct,
          vehicleCount: regVehicles.length,
          threshold: getDisiplinThreshold(pct),
          thresholdColor: getDisiplinColor(pct),
          isCompliant: pct !== null && pct >= 90,
          isNoTarget: target === 0
        });
      });
    } else if (groupingType === 'Estate') {
      const regEstates = getFilteredEstates(filters);

      regEstates.forEach(est => {
        const estVehicles = MOCK_VEHICLES.filter(v => v.estateId === est.id);

        const target = estVehicles.length * periodDays;
        const actual = MOCK_PATROL_REPORTS.filter(r =>
          r.estateId === est.id &&
          r.date >= startDateStr &&
          r.date <= endDateStr &&
          r.submissionStatus === 'Sudah Dikirim'
        ).length;
        const shortfall = Math.max(0, target - actual);
        const pct = target > 0 ? Math.round((actual / target) * 1000) / 10 : null;

        categories.push({
          id: est.id,
          label: est.id,
          subLabel: `${estVehicles.length} Unit Kendaraan`,
          targetReports: target,
          actualReports: actual,
          shortfall,
          compliancePct: pct,
          vehicleCount: estVehicles.length,
          threshold: getDisiplinThreshold(pct),
          thresholdColor: getDisiplinColor(pct),
          isCompliant: pct !== null && pct >= 90,
          isNoTarget: target === 0
        });
      });
    } else {
      const estVehicles = getFilteredVehicles(filters);

      estVehicles.forEach(veh => {
        const target = periodDays;
        const actual = MOCK_PATROL_REPORTS.filter(r =>
          r.vehicleId === veh.id &&
          r.date >= startDateStr &&
          r.date <= endDateStr &&
          r.submissionStatus === 'Sudah Dikirim'
        ).length;
        const shortfall = Math.max(0, target - actual);
        const pct = target > 0 ? Math.round((actual / target) * 1000) / 10 : null;

        categories.push({
          id: veh.id,
          label: veh.nopol || veh.id,
          subLabel: `ID: ${veh.id} (${veh.vehicleType})`,
          targetReports: target,
          actualReports: actual,
          shortfall,
          compliancePct: pct,
          vehicleCount: 1,
          threshold: getDisiplinThreshold(pct),
          thresholdColor: getDisiplinColor(pct),
          isCompliant: pct !== null && pct >= 90,
          isNoTarget: target === 0
        });
      });
    }
  } else {
    const trendMonths = get6MonthTrendWindow(yearStr, filters.month || 'May', filters.endDate);
    const filteredVehicles = getFilteredVehicles(filters);
    const scopeEstates = new Set(getFilteredEstates(filters).map(e => e.id));

    trendMonths.forEach(m => {
      const target = filteredVehicles.length * m.days;
      const actual = MOCK_PATROL_REPORTS.filter(r => {
        if (!scopeEstates.has(r.estateId)) return false;
        if (r.submissionStatus !== 'Sudah Dikirim') return false;
        if (m.maxDateStr) {
          return r.date >= `${m.yearMonth}-01` && r.date <= m.maxDateStr;
        }
        return r.date.startsWith(m.yearMonth);
      }).length;
      const shortfall = Math.max(0, target - actual);
      const pct = target > 0 ? Math.round((actual / target) * 1000) / 10 : null;

      categories.push({
        id: m.yearMonth,
        label: m.label,
        subLabel: `${m.days} Hari · ${filteredVehicles.length} Unit`,
        targetReports: target,
        actualReports: actual,
        shortfall,
        compliancePct: pct,
        vehicleCount: filteredVehicles.length,
        threshold: getDisiplinThreshold(pct),
        thresholdColor: getDisiplinColor(pct),
        isCompliant: pct !== null && pct >= 90,
        isNoTarget: target === 0,
        yearMonth: m.yearMonth,
        isPartialMonth: m.isPartialMonth,
        partialTooltip: m.partialTooltip
      });
    });
  }

  let scopeLabel = 'Nasional';
  if (filters.estate && filters.estate !== 'ALL') scopeLabel = filters.estate;
  else if (filters.region && filters.region !== 'ALL') scopeLabel = filters.region;
  else if (filters.psm && filters.psm !== 'ALL') scopeLabel = filters.psm;

  let chartTitle = '';
  let chartSubtitle = '';

  if (chartViewMode === 'Perbandingan') {
    if (groupingType === 'PSM') chartTitle = 'Laporan per PSM';
    else if (groupingType === 'Region') chartTitle = 'Laporan per Region';
    else if (groupingType === 'Estate') chartTitle = 'Laporan per Estate';
    else chartTitle = 'Laporan per Kendaraan';

    chartSubtitle = `${scopeLabel} · ${startDateStr} s/d ${endDateStr}`;
  } else {
    chartTitle = 'Tren Laporan';
    const windowMonths = get6MonthTrendWindow(yearStr, filters.month || 'May', filters.endDate);
    const firstM = windowMonths[0].label;
    const lastM = windowMonths[windowMonths.length - 1].label;
    chartSubtitle = `${scopeLabel} · ${firstM}–${lastM}`;
  }

  const chartWindowLabel = chartSubtitle;

  let targetVehicles = getFilteredVehicles(filters);
  let targetYearMonth = `${yearStr}-${mInfo.num}`;
  let daysCount = mInfo.days;

  if (drilldownState) {
    if (chartViewMode === 'Perbandingan') {
      if (groupingType === 'PSM') {
        const psmEstates = new Set(MOCK_ESTATES.filter(e => e.psmId === drilldownState.categoryKey).map(e => e.id));
        targetVehicles = MOCK_VEHICLES.filter(v => psmEstates.has(v.estateId));
      } else if (groupingType === 'Region') {
        const regEstates = new Set(MOCK_ESTATES.filter(e => e.regionId === drilldownState.categoryKey).map(e => e.id));
        targetVehicles = MOCK_VEHICLES.filter(v => regEstates.has(v.estateId));
      } else if (groupingType === 'Estate') {
        targetVehicles = MOCK_VEHICLES.filter(v => v.estateId === drilldownState.categoryKey);
      } else {
        targetVehicles = MOCK_VEHICLES.filter(v => v.id === drilldownState.categoryKey);
      }
    } else {
      targetYearMonth = drilldownState.categoryKey;
      const [yr, mn] = targetYearMonth.split('-');
      const mDetail = normalizeMonth(mn);
      daysCount = mDetail.days;
    }
  }

  const SAMPLE_MANAGER_COMMENTS = [
    "Perketat penjagaan di area pringgan pada shift malam.",
    "Pastikan patroli menjangkau seluruh blok rawan pencurian.",
    "Koordinasikan perbaikan kendaraan dengan asisten teknik segera.",
    "Evaluasi kembali rute patroli bersama tim keamanan.",
    "Pantau pengiriman perangkat pengganti bersama tim SRMD."
  ];

  const SAMPLE_REPAIR_STATUSES = [
    "Perbaikan Internal - Sparepart Tersedia",
    "Pemeriksaan Bengkel",
    "Perbaikan Internal - Menunggu Sparepart / Pengajuan PR",
    "Perbaikan Eksternal",
    "Selesai"
  ];

  const SAMPLE_GPS_NOTES = [
    "Sudah dikoordinasikan dengan tim SRMD.",
    "Perangkat sedang dalam perbaikan vendor.",
    "Perangkat sedang dikirim dari vendor ke estate.",
    "Menunggu perangkat pengganti dari vendor.",
    "Perangkat pengganti sudah diterima, menunggu pemasangan."
  ];

  const laporanHarianRows: DailyReportViewItem[] = [];

  targetVehicles.forEach(veh => {
    const vType = veh.vehicleType === 'Car' ? 'Mobil' : 'Motor';
    const vehChar = veh.id.charCodeAt(veh.id.length - 1) || 0;

    for (let d = 1; d <= daysCount; d++) {
      const dayStr = d < 10 ? `0${d}` : `${d}`;
      const dateStr = `${targetYearMonth}-${dayStr}`;

      const existingReport = MOCK_PATROL_REPORTS.find(r => r.vehicleId === veh.id && r.date === dateStr);
      const existingRun = MOCK_PATROL_RUNS.find(run => run.vehicleId === veh.id && run.date === dateStr);
      const tStatus: 'Tersedia' | 'Tidak Tersedia' = (existingRun && existingRun.gpsTraceQuality !== 'Missing') ? 'Tersedia' : 'Tidak Tersedia';

      const commentIdx = (vehChar + d) % SAMPLE_MANAGER_COMMENTS.length;
      let mComment = existingReport?.managerComment;
      if (!mComment && existingReport && existingReport.submissionStatus === 'Sudah Dikirim') {
        if (d % 3 !== 0) {
          mComment = SAMPLE_MANAGER_COMMENTS[commentIdx];
        }
      }

      let rStatus: string | undefined = existingReport?.repairStatus;
      if (!rStatus && existingReport?.reportType === 'Unit Rusak') {
        rStatus = SAMPLE_REPAIR_STATUSES[(vehChar + d) % SAMPLE_REPAIR_STATUSES.length];
      }

      let gNote: string | undefined = existingReport?.gpsNote;
      if (!gNote && existingReport?.reportType === 'GPS Rusak') {
        gNote = SAMPLE_GPS_NOTES[(vehChar + d) % SAMPLE_GPS_NOTES.length];
      }

      if (existingReport && existingReport.submissionStatus === 'Sudah Dikirim') {
        laporanHarianRows.push({
          id: existingReport.id,
          date: dateStr,
          estateId: veh.estateId,
          vehicleId: veh.id,
          nopol: veh.nopol,
          vehicleType: vType,
          trackingStatus: tStatus,
          submissionStatus: 'Sudah Dikirim',
          reportType: existingReport.reportType,
          picStatus: existingReport.status === 'Reviewed Manager' ? 'Submitted PIC' : (existingReport.status === 'Submitted PIC' ? 'Submitted PIC' : 'Pending PIC Comment'),
          managerStatus: existingReport.status === 'Reviewed Manager' ? 'Approved' : 'Pending Manager Review',
          managerComment: mComment,
          repairStatus: rStatus,
          gpsNote: gNote,
          isMissing: false,
          uploadDate: existingReport.uploadDate,
          rawRecord: existingReport
        });
      } else {
        laporanHarianRows.push({
          id: existingReport ? existingReport.id : `MISSING-${veh.id}-${dateStr}`,
          date: dateStr,
          estateId: veh.estateId,
          vehicleId: veh.id,
          nopol: veh.nopol,
          vehicleType: vType,
          trackingStatus: tStatus,
          submissionStatus: 'Belum Dikirim',
          reportType: 'Normal',
          picStatus: 'Belum Dikirim',
          managerStatus: 'Belum Dikirim',
          managerComment: undefined,
          repairStatus: undefined,
          gpsNote: undefined,
          isMissing: true,
          rawRecord: existingReport
        });
      }
    }
  });


  laporanHarianRows.sort((a, b) => b.date.localeCompare(a.date));

  return {
    groupingType,
    chartTitle,
    chartSubtitle,
    chartWindowLabel,
    categories,
    laporanHarianRows,
    activeDrilldownContext: drilldownState ? drilldownState.label : null
  };
}

// Selector for 6-Month Trend Breakdown Summary Table
export interface TrendBreakdownMonthCell {
  yearMonth: string;
  label: string;
  targetReports: number;
  actualReports: number;
  pct: number | null;
  threshold: 'Green' | 'Yellow' | 'Red' | 'N/A';
  thresholdColor: string;
  isPartialMonth?: boolean;
  partialTooltip?: string;
}

export interface TrendBreakdownRow {
  id: string;
  label: string;
  subLabel?: string;
  vehicleCount: number;
  months: TrendBreakdownMonthCell[];
  totalTarget: number;
  totalActual: number;
  totalPct: number | null;
  totalThreshold: 'Green' | 'Yellow' | 'Red' | 'N/A';
  totalThresholdColor: string;
}

export function selectTrendBreakdownTable(
  filters: GlobalFilterState
): { breakdownType: 'PSM' | 'Region' | 'Estate' | 'Vehicle'; headers: string[]; rows: TrendBreakdownRow[] } {
  const yearStr = filters.year || '2026';
  const trendMonths = get6MonthTrendWindow(yearStr, filters.month || 'May', filters.endDate);
  const headers = trendMonths.map(m => m.label);

  let breakdownType: 'PSM' | 'Region' | 'Estate' | 'Vehicle' = 'PSM';
  if (filters.psm === 'ALL') breakdownType = 'PSM';
  else if (filters.region === 'ALL') breakdownType = 'Region';
  else if (filters.estate === 'ALL') breakdownType = 'Estate';
  else breakdownType = 'Vehicle';

  const rows: TrendBreakdownRow[] = [];

  if (breakdownType === 'PSM') {
    const psms = ['PSM A', 'PSM B', 'PSM C', 'PSM E', 'PSM F', 'PSM G'];
    psms.forEach(psmId => {
      const psmEstates = MOCK_ESTATES.filter(e => e.psmId === psmId);
      const estateIds = new Set(psmEstates.map(e => e.id));
      const psmVehicles = MOCK_VEHICLES.filter(v => estateIds.has(v.estateId));

      const months: TrendBreakdownMonthCell[] = [];
      let totalTarget = 0;
      let totalActual = 0;

      trendMonths.forEach(m => {
        const target = psmVehicles.length * m.days;
        const actual = MOCK_PATROL_REPORTS.filter(r => {
          if (!estateIds.has(r.estateId)) return false;
          if (r.submissionStatus !== 'Sudah Dikirim') return false;
          if (m.maxDateStr) {
            return r.date >= `${m.yearMonth}-01` && r.date <= m.maxDateStr;
          }
          return r.date.startsWith(m.yearMonth);
        }).length;

        const pct = target > 0 ? Math.round((actual / target) * 1000) / 10 : null;
        totalTarget += target;
        totalActual += actual;
        months.push({
          yearMonth: m.yearMonth,
          label: m.label,
          targetReports: target,
          actualReports: actual,
          pct,
          threshold: getDisiplinThreshold(pct),
          thresholdColor: getDisiplinColor(pct),
          isPartialMonth: m.isPartialMonth,
          partialTooltip: m.partialTooltip
        });
      });

      const totalPct = totalTarget > 0 ? Math.round((totalActual / totalTarget) * 1000) / 10 : null;

      rows.push({
        id: psmId,
        label: psmId,
        subLabel: `${psmEstates.length} Estate · ${psmVehicles.length} Unit`,
        vehicleCount: psmVehicles.length,
        months,
        totalTarget,
        totalActual,
        totalPct,
        totalThreshold: getDisiplinThreshold(totalPct),
        totalThresholdColor: getDisiplinColor(totalPct)
      });
    });
  } else if (breakdownType === 'Region') {
    const psmEstates = MOCK_ESTATES.filter(e => e.psmId === filters.psm);
    const regionsSet = Array.from(new Set(psmEstates.map(e => e.regionId)));

    regionsSet.forEach(regId => {
      const regEstates = psmEstates.filter(e => e.regionId === regId);
      const estateIds = new Set(regEstates.map(e => e.id));
      const regVehicles = MOCK_VEHICLES.filter(v => estateIds.has(v.estateId));

      const months: TrendBreakdownMonthCell[] = [];
      let totalTarget = 0;
      let totalActual = 0;

      trendMonths.forEach(m => {
        const target = regVehicles.length * m.days;
        const actual = MOCK_PATROL_REPORTS.filter(r => {
          if (!estateIds.has(r.estateId)) return false;
          if (r.submissionStatus !== 'Sudah Dikirim') return false;
          if (m.maxDateStr) {
            return r.date >= `${m.yearMonth}-01` && r.date <= m.maxDateStr;
          }
          return r.date.startsWith(m.yearMonth);
        }).length;

        const pct = target > 0 ? Math.round((actual / target) * 1000) / 10 : null;
        totalTarget += target;
        totalActual += actual;
        months.push({
          yearMonth: m.yearMonth,
          label: m.label,
          targetReports: target,
          actualReports: actual,
          pct,
          threshold: getDisiplinThreshold(pct),
          thresholdColor: getDisiplinColor(pct),
          isPartialMonth: m.isPartialMonth,
          partialTooltip: m.partialTooltip
        });
      });

      const totalPct = totalTarget > 0 ? Math.round((totalActual / totalTarget) * 1000) / 10 : null;

      rows.push({
        id: regId,
        label: regId,
        subLabel: `${regEstates.length} Estate · ${regVehicles.length} Unit`,
        vehicleCount: regVehicles.length,
        months,
        totalTarget,
        totalActual,
        totalPct,
        totalThreshold: getDisiplinThreshold(totalPct),
        totalThresholdColor: getDisiplinColor(totalPct)
      });
    });
  } else if (breakdownType === 'Estate') {
    const regEstates = getFilteredEstates(filters);

    regEstates.forEach(est => {
      const estVehicles = MOCK_VEHICLES.filter(v => v.estateId === est.id);

      const months: TrendBreakdownMonthCell[] = [];
      let totalTarget = 0;
      let totalActual = 0;

      trendMonths.forEach(m => {
        const target = estVehicles.length * m.days;
        const actual = MOCK_PATROL_REPORTS.filter(r => {
          if (r.estateId !== est.id) return false;
          if (r.submissionStatus !== 'Sudah Dikirim') return false;
          if (m.maxDateStr) {
            return r.date >= `${m.yearMonth}-01` && r.date <= m.maxDateStr;
          }
          return r.date.startsWith(m.yearMonth);
        }).length;

        const pct = target > 0 ? Math.round((actual / target) * 1000) / 10 : null;
        totalTarget += target;
        totalActual += actual;
        months.push({
          yearMonth: m.yearMonth,
          label: m.label,
          targetReports: target,
          actualReports: actual,
          pct,
          threshold: getDisiplinThreshold(pct),
          thresholdColor: getDisiplinColor(pct),
          isPartialMonth: m.isPartialMonth,
          partialTooltip: m.partialTooltip
        });
      });

      const totalPct = totalTarget > 0 ? Math.round((totalActual / totalTarget) * 1000) / 10 : null;

      rows.push({
        id: est.id,
        label: est.id,
        subLabel: `${estVehicles.length} Unit Kendaraan`,
        vehicleCount: estVehicles.length,
        months,
        totalTarget,
        totalActual,
        totalPct,
        totalThreshold: getDisiplinThreshold(totalPct),
        totalThresholdColor: getDisiplinColor(totalPct)
      });
    });
  } else {
    const estVehicles = getFilteredVehicles(filters);

    estVehicles.forEach(veh => {
      const months: TrendBreakdownMonthCell[] = [];
      let totalTarget = 0;
      let totalActual = 0;

      trendMonths.forEach(m => {
        const target = m.days;
        const actual = MOCK_PATROL_REPORTS.filter(r => {
          if (r.vehicleId !== veh.id) return false;
          if (r.submissionStatus !== 'Sudah Dikirim') return false;
          if (m.maxDateStr) {
            return r.date >= `${m.yearMonth}-01` && r.date <= m.maxDateStr;
          }
          return r.date.startsWith(m.yearMonth);
        }).length;

        const pct = target > 0 ? Math.round((actual / target) * 1000) / 10 : null;
        totalTarget += target;
        totalActual += actual;
        months.push({
          yearMonth: m.yearMonth,
          label: m.label,
          targetReports: target,
          actualReports: actual,
          pct,
          threshold: getDisiplinThreshold(pct),
          thresholdColor: getDisiplinColor(pct),
          isPartialMonth: m.isPartialMonth,
          partialTooltip: m.partialTooltip
        });
      });

      const totalPct = totalTarget > 0 ? Math.round((totalActual / totalTarget) * 1000) / 10 : null;

      rows.push({
        id: veh.id,
        label: veh.nopol || veh.id,
        subLabel: `ID: ${veh.id}`,
        vehicleCount: 1,
        months,
        totalTarget,
        totalActual,
        totalPct,
        totalThreshold: getDisiplinThreshold(totalPct),
        totalThresholdColor: getDisiplinColor(totalPct)
      });
    });
  }

  return { breakdownType, headers, rows };
}

// Selector for Utilization Main KPIs & 4 Sub-Stat Cards
export function selectUtilizationKpis(filters: GlobalFilterState) {
  const filteredRuns = getFilteredPatrolRuns(filters);
  const filteredVehicles = getFilteredVehicles(filters);
  const daysInPeriod = 31;

  const totalCapacityHours = filteredVehicles.length * daysInPeriod * 24;

  const totalMileageKm = filteredRuns.reduce((sum, r) => sum + (r.actualDistanceKm ?? 0), 0);
  const totalMovingMins = filteredRuns.reduce((sum, r) => sum + r.movingTimeMinutes, 0);
  const totalStoppingMins = filteredRuns.reduce((sum, r) => sum + r.stoppingTimeMinutes, 0);

  const movingHours = Math.round((totalMovingMins / 60) * 10) / 10;
  const stoppingHours = Math.round((totalStoppingMins / 60) * 10) / 10;

  const movingPct = totalCapacityHours > 0 ? Math.round((movingHours / totalCapacityHours) * 100) : 0;
  const stoppingPct = totalCapacityHours > 0 ? Math.round((stoppingHours / totalCapacityHours) * 100) : 0;
  const unmonitoredPct = Math.max(0, 100 - (movingPct + stoppingPct));

  const avgMileageKm = filteredVehicles.length > 0 ? Math.round((totalMileageKm / (filteredVehicles.length * daysInPeriod)) * 10) / 10 : 0;

  const filteredExceptions = getFilteredExceptions(filters);
  const vehicleBreakdownCount = filteredExceptions.filter(e => e.type === 'Vehicle Breakdown').length;
  const gpsBreakdownCount = filteredExceptions.filter(e => e.type === 'GPS Breakdown').length;

  return {
    totalMileageKm,
    avgMileageKm,
    movingHours,
    movingPct,
    stoppingHours,
    stoppingPct,
    unmonitoredPct,
    vehicleBreakdownCount,
    gpsBreakdownCount,
    totalCapacityHours
  };
}

export function selectUtilizationSubCards(
  filters: GlobalFilterState,
  metricType: 'Mileage' | 'Moving Time' | 'Stopping Time'
) {
  const filteredRuns = getFilteredPatrolRuns(filters);

  if (filteredRuns.length === 0) {
    return {
      overallAvg: 0,
      lowestValue: 0,
      lowestDate: '-',
      highestValue: 0,
      highestDate: '-',
      shift1Avg: 0,
      shift2Avg: 0,
      shift3Avg: 0,
      shift1Lowest: { val: 0, date: '-' },
      shift2Lowest: { val: 0, date: '-' },
      shift3Lowest: { val: 0, date: '-' },
      shift1Highest: { val: 0, date: '-' },
      shift2Highest: { val: 0, date: '-' },
      shift3Highest: { val: 0, date: '-' },
    };
  }

  const getValue = (r: PatrolRunRecord) => {
    if (metricType === 'Mileage') return r.actualDistanceKm ?? 0;
    if (metricType === 'Moving Time') return Math.round((r.movingTimeMinutes / 60) * 10) / 10;
    return Math.round((r.stoppingTimeMinutes / 60) * 10) / 10;
  };

  const sortedRuns = [...filteredRuns].sort((a, b) => getValue(a) - getValue(b));
  const lowestRun = sortedRuns[0];
  const highestRun = sortedRuns[sortedRuns.length - 1];
  const totalVal = filteredRuns.reduce((sum, r) => sum + getValue(r), 0);

  const shift1Runs = filteredRuns.filter(r => r.shift === 'Shift 1');
  const shift2Runs = filteredRuns.filter(r => r.shift === 'Shift 2');
  const shift3Runs = filteredRuns.filter(r => r.shift === 'Shift 3');

  const getShiftStats = (runs: PatrolRunRecord[]) => {
    if (runs.length === 0) return { avg: 0, lowest: { val: 0, date: '-' }, highest: { val: 0, date: '-' } };
    const sorted = [...runs].sort((a, b) => getValue(a) - getValue(b));
    const sum = runs.reduce((s, r) => s + getValue(r), 0);
    return {
      avg: Math.round((sum / runs.length) * 10) / 10,
      lowest: { val: getValue(sorted[0]), date: sorted[0].date },
      highest: { val: getValue(sorted[sorted.length - 1]), date: sorted[sorted.length - 1].date }
    };
  };

  const s1 = getShiftStats(shift1Runs);
  const s2 = getShiftStats(shift2Runs);
  const s3 = getShiftStats(shift3Runs);

  return {
    overallAvg: Math.round((totalVal / filteredRuns.length) * 10) / 10,
    lowestValue: getValue(lowestRun),
    lowestDate: lowestRun.date,
    highestValue: getValue(highestRun),
    highestDate: highestRun.date,
    shift1Avg: s1.avg,
    shift2Avg: s2.avg,
    shift3Avg: s3.avg,
    shift1Lowest: s1.lowest,
    shift2Lowest: s2.lowest,
    shift3Lowest: s3.lowest,
    shift1Highest: s1.highest,
    shift2Highest: s2.highest,
    shift3Highest: s3.highest
  };
}

// Selector for Exception Reasons Chart & Shift Details
export function selectReasonBreakdown(
  filters: GlobalFilterState,
  kpiType: 'Overspeed' | 'Out of Route' | 'Overparking',
  priorityFilter: 'ALL' | 'Normal' | 'Urgent' = 'ALL'
) {
  const filteredReports = getFilteredPatrolReports(filters);
  const targetReportIds = new Set(
    filteredReports
      .filter(r => {
        if (r.submissionStatus !== 'Sudah Dikirim') return false;
        if (priorityFilter === 'Normal') return r.reportType === 'Normal';
        if (priorityFilter === 'Urgent') return r.reportType === 'Urgent';
        return r.reportType === 'Normal' || r.reportType === 'Urgent';
      })
      .map(r => r.patrolRunId)
  );

  const filteredExceptions = getFilteredExceptions(filters).filter(e => e.type === kpiType && targetReportIds.has(e.patrolRunId));
  const totalCount = filteredExceptions.length;

  const reasonMap: { [reason: string]: { count: number; impact: number } } = {};

  filteredExceptions.forEach(e => {
    const cat = e.reasonCategory || 'Lainnya';
    if (!reasonMap[cat]) {
      reasonMap[cat] = { count: 0, impact: 0 };
    }
    reasonMap[cat].count += 1;
    if (kpiType === 'Overspeed') reasonMap[cat].impact += (e.durationMinutes || 0);
    if (kpiType === 'Out of Route') reasonMap[cat].impact += (e.distanceKm || 0);
    if (kpiType === 'Overparking') reasonMap[cat].impact += (e.durationMinutes || 0);
  });

  const reasonsList = Object.keys(reasonMap).map(reason => ({
    reason,
    count: reasonMap[reason].count,
    percentage: totalCount > 0 ? Math.round((reasonMap[reason].count / totalCount) * 1000) / 10 : 0,
    impactValue: Math.round(reasonMap[reason].impact * 10) / 10
  })).sort((a, b) => b.count - a.count);

  const shift1Events = filteredExceptions.filter(e => e.shift === 'Shift 1');
  const shift2Events = filteredExceptions.filter(e => e.shift === 'Shift 2');
  const shift3Events = filteredExceptions.filter(e => e.shift === 'Shift 3');

  const shiftImpact = (events: ExceptionEventRecord[]) => {
    if (kpiType === 'Overspeed') return events.reduce((s, e) => s + (e.durationMinutes || 0), 0);
    if (kpiType === 'Out of Route') return Math.round(events.reduce((s, e) => s + (e.distanceKm || 0), 0) * 10) / 10;
    if (kpiType === 'Overparking') return Math.round(events.reduce((s, e) => s + (e.durationMinutes || 0), 0) / 60 * 10) / 10;
    return events.length;
  };

  return {
    reasonsList,
    totalCount,
    shiftSummary: {
      totalImpact: shiftImpact(filteredExceptions),
      shift1Count: shift1Events.length,
      shift1Impact: shiftImpact(shift1Events),
      shift2Count: shift2Events.length,
      shift2Impact: shiftImpact(shift2Events),
      shift3Count: shift3Events.length,
      shift3Impact: shiftImpact(shift3Events),
    }
  };
}

export interface QualifyingTraversalDetail {
  id: string;
  patrolRunId: string;
  blockId: string;
  blockCode: string;
  estateId: string;
  vehicleId: string;
  nopol: string;
  vehicleType: 'Car' | 'Motorcycle';
  date: string;
  shift: 'Shift 1' | 'Shift 2' | 'Shift 3';
  entryTimestamp: string;
  exitTimestamp: string;
  distanceInsideMeters: number;
  durationMinutes: number;
  isQualifying: boolean;
  nonQualifyingReason?: string;
  qualifyingIndex?: number;
  reentryGapMinutes?: number;
  reentryGapFormatted?: string;
  isRawan: boolean;
  submissionStatus: 'Sudah Dikirim' | 'Belum Dikirim';
}

export interface BlockCoverageMetricItem {
  blockId: string;
  blockCode: string;
  estateId: string;
  estateName: string;
  isRawan: boolean;
  hasGeometry: boolean;
  validCoverageCount: number;
  avgPerDay: number;
  distinctDaysCount: number;
  totalReportingDays: number;
  hariTercakupPct: number;
  latestQualifyingTimestamp?: string;
  qualifyingTraversals: QualifyingTraversalDetail[];
  nonQualifyingPasses: QualifyingTraversalDetail[];
  contributingVehiclesCount: number;
  contributingNopols: string[];
  dateBreakdown: { date: string; coverageCount: number; vehiclesCount: number; nopols: string[] }[];
}

export interface RawanBlockCategoryDistribution {
  totalRawanBlocks: number;
  coveredRawanBlocks: number;
  headlinePct: number | null; // e.g. 70.0 or 80.0
  // Mode A: Rata-rata (×/hari)
  avgDistribution: {
    zeroCount: number; zeroPct: number;
    gt0lt1Count: number; gt0lt1Pct: number;
    oneToTwoCount: number; oneToTwoPct: number;
    gt2Count: number; gt2Pct: number;
  };
  // Mode B: Jumlah (×)
  countDistribution: {
    zeroCount: number; zeroPct: number;
    oneCount: number; onePct: number;
    twoCount: number; twoPct: number;
    moreThanTwoCount: number; moreThanTwoPct: number;
  };
}

export interface ComprehensiveCoverageMetrics {
  rawanCount: number;
  nonRawanCount: number;
  totalValidCoverage: number;
  coverageRawanPct: number | null; // e.g. 83.0 or null if total == 0
  coverageNonRawanPct: number | null; // e.g. 17.0 or null if total == 0
  rawanDistribution: RawanBlockCategoryDistribution;
  totalBlocksInScope: number;
  mappedBlocksCount: number;
  unmappedBlocksCount: number;
  reportingDays: number;
  blocksList: BlockCoverageMetricItem[];
}

export function selectComprehensiveCoverage(
  filters: GlobalFilterState,
  localVehicleId?: string
): ComprehensiveCoverageMetrics {
  const allowedEstates = new Set(getFilteredEstates(filters).map(e => e.id));

  let reportingDays = 31;
  if (filters.startDate && filters.endDate) {
    const s = new Date(filters.startDate);
    const e = new Date(filters.endDate);
    const diffTime = Math.abs(e.getTime() - s.getTime());
    reportingDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);
  } else {
    const mInfo = normalizeMonth(filters.month);
    reportingDays = mInfo.days;
  }

  const scopeBlocks = MOCK_BLOCKS.filter(b => allowedEstates.has(b.estateId));
  const estateMap = new Map(MOCK_ESTATES.map(e => [e.id, e]));
  const vehicleMap = new Map(MOCK_VEHICLES.map(v => [v.id, v]));

  const filteredRuns = getFilteredPatrolRuns(filters);
  const runMap = new Map(filteredRuns.map(r => [r.id, r]));

  const filteredReports = getFilteredPatrolReports(filters);
  const reportMap = new Map(filteredReports.map(r => [r.patrolRunId, r]));

  let scopeVisits = MOCK_BLOCK_VISITS.filter(v => runMap.has(v.patrolRunId));
  if (localVehicleId && localVehicleId !== 'ALL') {
    const runVehMap = new Map(filteredRuns.map(r => [r.id, r.vehicleId]));
    scopeVisits = scopeVisits.filter(v => runVehMap.get(v.patrolRunId) === localVehicleId);
  }

  const visitsByVehicleBlock = new Map<string, BlockVisitRecord[]>();
  scopeVisits.forEach(v => {
    const run = runMap.get(v.patrolRunId);
    if (!run) return;
    const key = `${run.vehicleId}_${v.blockId}`;
    if (!visitsByVehicleBlock.has(key)) {
      visitsByVehicleBlock.set(key, []);
    }
    visitsByVehicleBlock.get(key)!.push(v);
  });

  const blockTraversalsMap = new Map<string, { qualifying: QualifyingTraversalDetail[]; nonQualifying: QualifyingTraversalDetail[] }>();

  visitsByVehicleBlock.forEach((vList) => {
    vList.sort((a, b) => a.entryTimestamp.localeCompare(b.entryTimestamp));

    let lastQualifyingExitTime: string | null = null;
    let qualIdxCounter = 1;

    vList.forEach((visit) => {
      const run = runMap.get(visit.patrolRunId);
      if (!run) return;
      const veh = vehicleMap.get(run.vehicleId);
      const report = reportMap.get(visit.patrolRunId);
      const blockObj = MOCK_BLOCKS.find(b => b.id === visit.blockId);
      const isRawan = blockObj ? blockObj.isRawan : false;

      const dist = visit.distanceInsideMeters;
      const entryTimeMs = new Date(visit.entryTimestamp.replace(' ', 'T')).getTime();

      let gapMs: number | null = null;
      let gapMinutes: number | null = null;
      let gapFormatted: string | undefined = undefined;

      if (lastQualifyingExitTime !== null) {
        const exitTimeMs = new Date(lastQualifyingExitTime.replace(' ', 'T')).getTime();
        gapMs = entryTimeMs - exitTimeMs;
        gapMinutes = Math.floor(gapMs / (1000 * 60));
        gapFormatted = `${gapMinutes}m ${Math.floor((gapMs % 60000)/1000)}s`;
      }

      const meetsDistance = dist >= 600;
      const meetsGap = gapMs === null || gapMs >= 10 * 60 * 1000;

      let isQualifying = false;
      let nonQualifyingReason: string | undefined = undefined;

      if (!meetsDistance) {
        isQualifying = false;
        nonQualifyingReason = `Jarak di dalam blok ${dist}m (<600m)`;
      } else if (!meetsGap) {
        isQualifying = false;
        nonQualifyingReason = `Jarak re-entry (${gapFormatted}) kurang dari 10m`;
      } else {
        isQualifying = true;
      }

      const itemDetail: QualifyingTraversalDetail = {
        id: visit.id,
        patrolRunId: visit.patrolRunId,
        blockId: visit.blockId,
        blockCode: blockObj ? blockObj.blockCode : visit.blockId,
        estateId: run.estateId,
        vehicleId: run.vehicleId,
        nopol: veh ? veh.nopol : run.vehicleId,
        vehicleType: veh ? veh.vehicleType : 'Car',
        date: visit.date,
        shift: visit.shift,
        entryTimestamp: visit.entryTimestamp,
        exitTimestamp: visit.exitTimestamp,
        distanceInsideMeters: dist,
        durationMinutes: visit.durationMinutes,
        isQualifying,
        nonQualifyingReason,
        qualifyingIndex: isQualifying ? qualIdxCounter++ : undefined,
        reentryGapMinutes: gapMinutes !== null ? gapMinutes : undefined,
        reentryGapFormatted: gapFormatted,
        isRawan,
        submissionStatus: report ? report.submissionStatus : 'Sudah Dikirim'
      };

      if (!blockTraversalsMap.has(visit.blockId)) {
        blockTraversalsMap.set(visit.blockId, { qualifying: [], nonQualifying: [] });
      }

      if (isQualifying) {
        blockTraversalsMap.get(visit.blockId)!.qualifying.push(itemDetail);
        lastQualifyingExitTime = visit.exitTimestamp;
      } else {
        blockTraversalsMap.get(visit.blockId)!.nonQualifying.push(itemDetail);
      }
    });
  });

  let rawanCount = 0;
  let nonRawanCount = 0;

  const blocksList: BlockCoverageMetricItem[] = scopeBlocks.map(block => {
    const est = estateMap.get(block.estateId);
    const estName = est ? est.name : block.estateId;

    const record = blockTraversalsMap.get(block.id) || { qualifying: [], nonQualifying: [] };
    const qualList = record.qualifying;
    const nonQualList = record.nonQualifying;

    const validCoverageCount = qualList.length;

    if (block.isRawan) {
      rawanCount += validCoverageCount;
    } else {
      nonRawanCount += validCoverageCount;
    }

    const avgPerDay = Math.round((validCoverageCount / reportingDays) * 10) / 10;

    const distinctDates = Array.from(new Set(qualList.map(q => q.date)));
    const distinctDaysCount = distinctDates.length;
    const hariTercakupPct = Math.round((distinctDaysCount / reportingDays) * 1000) / 10;

    let latestQualifyingTimestamp: string | undefined = undefined;
    if (qualList.length > 0) {
      const sortedByTime = [...qualList].sort((a, b) => b.entryTimestamp.localeCompare(a.entryTimestamp));
      latestQualifyingTimestamp = sortedByTime[0].entryTimestamp;
    }

    const nopolsSet = Array.from(new Set(qualList.map(q => q.nopol)));

    const dateMap = new Map<string, Set<string>>();
    qualList.forEach(q => {
      if (!dateMap.has(q.date)) dateMap.set(q.date, new Set());
      dateMap.get(q.date)!.add(q.nopol);
    });

    const dateBreakdown = Array.from(dateMap.entries()).map(([dt, nopols]) => ({
      date: dt,
      coverageCount: qualList.filter(q => q.date === dt).length,
      vehiclesCount: nopols.size,
      nopols: Array.from(nopols)
    })).sort((a, b) => b.date.localeCompare(a.date));

    return {
      blockId: block.id,
      blockCode: block.blockCode,
      estateId: block.estateId,
      estateName: estName,
      isRawan: block.isRawan,
      hasGeometry: block.hasGeometry,
      validCoverageCount,
      avgPerDay,
      distinctDaysCount,
      totalReportingDays: reportingDays,
      hariTercakupPct,
      latestQualifyingTimestamp,
      qualifyingTraversals: qualList.sort((a, b) => b.entryTimestamp.localeCompare(a.entryTimestamp)),
      nonQualifyingPasses: nonQualList.sort((a, b) => b.entryTimestamp.localeCompare(a.entryTimestamp)),
      contributingVehiclesCount: nopolsSet.length,
      contributingNopols: nopolsSet,
      dateBreakdown
    };
  });

  blocksList.sort((a, b) => {
    if (a.isRawan !== b.isRawan) return a.isRawan ? -1 : 1;
    if (b.validCoverageCount !== a.validCoverageCount) return b.validCoverageCount - a.validCoverageCount;
    return a.blockCode.localeCompare(b.blockCode);
  });

  const totalValidCoverage = rawanCount + nonRawanCount;
  const coverageRawanPct = totalValidCoverage > 0 ? Math.round((rawanCount / totalValidCoverage) * 1000) / 10 : null;
  const coverageNonRawanPct = totalValidCoverage > 0 ? Math.round((nonRawanCount / totalValidCoverage) * 1000) / 10 : null;

  // Metric B: Rawan Block Coverage Distribution
  const rawanBlocksInScope = blocksList.filter(b => b.isRawan);
  const totalRawanBlocks = rawanBlocksInScope.length;

  // Mode B: Jumlah
  let cZero = 0, cOne = 0, cTwo = 0, cGt2 = 0;
  // Mode A: Rata-rata
  let aZero = 0, aGt0Lt1 = 0, a1to2 = 0, aGt2 = 0;

  rawanBlocksInScope.forEach(b => {
    // Jumlah Mode
    if (b.validCoverageCount === 0) cZero++;
    else if (b.validCoverageCount === 1) cOne++;
    else if (b.validCoverageCount === 2) cTwo++;
    else if (b.validCoverageCount > 2) cGt2++;

    // Rata-rata Mode (unrounded avgPerDay = validCoverageCount / reportingDays)
    const exactAvg = b.validCoverageCount / reportingDays;
    if (exactAvg === 0) aZero++;
    else if (exactAvg > 0 && exactAvg < 1) aGt0Lt1++;
    else if (exactAvg >= 1 && exactAvg <= 2) a1to2++;
    else if (exactAvg > 2) aGt2++;
  });

  const coveredRawanBlocks = totalRawanBlocks - cZero;
  const headlinePct = totalRawanBlocks > 0
    ? Math.round((coveredRawanBlocks / totalRawanBlocks) * 1000) / 10
    : null;

  const rawanDistribution: RawanBlockCategoryDistribution = {
    totalRawanBlocks,
    coveredRawanBlocks,
    headlinePct,
    avgDistribution: {
      zeroCount: aZero,
      zeroPct: totalRawanBlocks > 0 ? Math.round((aZero / totalRawanBlocks) * 1000) / 10 : 0,
      gt0lt1Count: aGt0Lt1,
      gt0lt1Pct: totalRawanBlocks > 0 ? Math.round((aGt0Lt1 / totalRawanBlocks) * 1000) / 10 : 0,
      oneToTwoCount: a1to2,
      oneToTwoPct: totalRawanBlocks > 0 ? Math.round((a1to2 / totalRawanBlocks) * 1000) / 10 : 0,
      gt2Count: aGt2,
      gt2Pct: totalRawanBlocks > 0 ? Math.round((aGt2 / totalRawanBlocks) * 1000) / 10 : 0,
    },
    countDistribution: {
      zeroCount: cZero,
      zeroPct: totalRawanBlocks > 0 ? Math.round((cZero / totalRawanBlocks) * 1000) / 10 : 0,
      oneCount: cOne,
      onePct: totalRawanBlocks > 0 ? Math.round((cOne / totalRawanBlocks) * 1000) / 10 : 0,
      twoCount: cTwo,
      twoPct: totalRawanBlocks > 0 ? Math.round((cTwo / totalRawanBlocks) * 1000) / 10 : 0,
      moreThanTwoCount: cGt2,
      moreThanTwoPct: totalRawanBlocks > 0 ? Math.round((cGt2 / totalRawanBlocks) * 1000) / 10 : 0,
    }
  };

  const totalBlocksInScope = scopeBlocks.length;
  const mappedBlocksCount = scopeBlocks.filter(b => b.hasGeometry).length;
  const unmappedBlocksCount = totalBlocksInScope - mappedBlocksCount;

  return {
    rawanCount,
    nonRawanCount,
    totalValidCoverage,
    coverageRawanPct,
    coverageNonRawanPct,
    rawanDistribution,
    totalBlocksInScope,
    mappedBlocksCount,
    unmappedBlocksCount,
    reportingDays,
    blocksList
  };
}

// Legacy Selector for Block Coverage (kept for compatibility)
export function selectBlockCoverageMetrics(
  filters: GlobalFilterState,
  isRawan: boolean
) {
  const comp = selectComprehensiveCoverage(filters);
  const blocks = comp.blocksList.filter(b => b.isRawan === isRawan);
  const totalApplicableBlocks = blocks.length;
  const uniqueVisitedCount = blocks.filter(b => b.validCoverageCount > 0).length;
  const totalActualVisits = blocks.reduce((acc, b) => acc + b.validCoverageCount, 0);
  const uniqueCoveragePct = totalApplicableBlocks > 0
    ? Math.round((uniqueVisitedCount / totalApplicableBlocks) * 1000) / 10
    : 0;

  const blockRows = blocks.map(b => ({
    id: b.blockId,
    blockCode: b.blockCode,
    estateId: b.estateId,
    isVisited: b.validCoverageCount > 0,
    actualVisits: b.validCoverageCount,
    hasGeometry: b.hasGeometry,
    visitsLog: b.qualifyingTraversals
  }));

  return {
    totalApplicableBlocks,
    uniqueVisitedCount,
    unvisitedCount: totalApplicableBlocks - uniqueVisitedCount,
    totalActualVisits,
    uniqueCoveragePct,
    blockRows
  };
}

// CSV Export Generator Utility
export function generateCsvData(headers: string[], rows: (string | number)[][]): string {
  const headerLine = headers.map(h => `"${h}"`).join(',');
  const rowLines = rows.map(row => row.map(cell => `"${cell}"`).join(','));
  return [headerLine, ...rowLines].join('\n');
}

// ----------------------------------------------------------------------
// Speeding Detail Selector for Primary Reason Table, Chart, & Event Table
// ----------------------------------------------------------------------
export interface SpeedingReasonRow {
  reason: string;
  eventCount: number;
  percentage: number; // e.g. 35.0
  totalDurationSeconds: number;
  totalDurationMinutes: number;
}

export interface SpeedingEventRow {
  id: string;
  date: string; // Operational report date
  vehicleId: string;
  nopol: string;
  estateId: string;
  estateName: string;
  reportPriority: 'Normal' | 'Urgent';
  eventIndexLabel: string; // e.g. "#1", "#2", "#3"
  eventIndex: number;
  startTime: string; // HH:mm:ss
  durationSeconds: number;
  durationFormatted: string; // e.g. "40s" or "1m 20s"
  shift: 'Shift 1' | 'Shift 2' | 'Shift 3';
  shift1Duration: string; // e.g. "40s" or "—"
  shift2Duration: string; // e.g. "1m 20s" or "—"
  shift3Duration: string; // e.g. "—"
  distanceKm: number;
  distanceFormatted: string; // e.g. "0.62 km"
  reasonCategory: string; // e.g. "Tugas Non-Patroli | Mengantar Tamu"
  parentReason?: string;
  subReason?: string;
  patrolRunId: string;
  detail: string;
  lat?: number;
  lng?: number;
  maxSpeedKmvh?: number;
  picComment?: string;
  rawRecord: ExceptionEventRecord;
}

export interface SpeedingComparisonItem {
  id: string;
  name: string;
  eventCount: number;
  matchingReportsCount: number;
  totalSubmittedReportsCount: number;
  reportPercentage: number;
}

export interface SpeedingTrendBucket {
  bucketKey: string;
  label: string;
  eventCount: number;
  durationMinutes: number;
  affectedVehiclesCount: number;
  dateStart: string;
  dateEnd: string;
}

export function formatDuration(sec: number): string {
  if (!sec || sec <= 0) return '0s';
  const mins = Math.floor(sec / 60);
  const remSec = Math.round(sec % 60);
  if (mins === 0) return `${remSec}s`;
  if (remSec === 0) return `${mins}m`;
  return `${mins}m ${remSec}s`;
}

export function selectSpeedingDetails(
  filters: GlobalFilterState,
  priorityFilter: 'ALL' | 'Normal' | 'Urgent' = 'ALL',
  selectedReasonFilter?: string | null,
  trendTimeGranularity: 'Daily' | 'Weekly' | 'Monthly' = 'Daily'
) {
  const filteredReports = getFilteredPatrolReports(filters);
  const targetReportIds = new Set(
    filteredReports
      .filter(r => {
        if (r.submissionStatus !== 'Sudah Dikirim') return false;
        if (priorityFilter === 'Normal') return r.reportType === 'Normal';
        if (priorityFilter === 'Urgent') return r.reportType === 'Urgent';
        return r.reportType === 'Normal' || r.reportType === 'Urgent';
      })
      .map(r => r.patrolRunId)
  );

  const allSpeedingEvents = getFilteredExceptions(filters).filter(
    e => e.type === 'Overspeed' && targetReportIds.has(e.patrolRunId)
  );

  const totalEvents = allSpeedingEvents.length;
  const totalDurationSeconds = allSpeedingEvents.reduce((s, e) => s + (e.durationSeconds || Math.round((e.durationMinutes || 0) * 60)), 0);
  const totalDurationMinutes = Math.round(totalDurationSeconds / 60);
  const maxSpeedKmvh = allSpeedingEvents.length > 0 ? Math.max(...allSpeedingEvents.map(e => e.maxSpeedKmvh || 0)) : 0;
  const affectedVehiclesCount = new Set(allSpeedingEvents.map(e => e.vehicleId)).size;

  // 1. Reason summary table & chart data (Denominator is totalEvents)
  const reasonMap: { [reason: string]: { count: number; durationSeconds: number } } = {};
  allSpeedingEvents.forEach(e => {
    const r = (e.reasonCategory && e.reasonCategory.trim() !== '') ? e.reasonCategory.trim() : 'Tanpa alasan tercatat';
    if (!reasonMap[r]) reasonMap[r] = { count: 0, durationSeconds: 0 };
    reasonMap[r].count += 1;
    reasonMap[r].durationSeconds += (e.durationSeconds || Math.round((e.durationMinutes || 0) * 60));
  });

  const reasonSummaryRows: SpeedingReasonRow[] = Object.keys(reasonMap)
    .map(reason => {
      const count = reasonMap[reason].count;
      const durSec = reasonMap[reason].durationSeconds;
      return {
        reason,
        eventCount: count,
        percentage: totalEvents > 0 ? (count / totalEvents) * 100 : 0,
        totalDurationSeconds: durSec,
        totalDurationMinutes: Math.round(durSec / 60)
      };
    })
    .sort((a, b) => b.eventCount - a.eventCount);

  // Filter events by selectedReasonFilter if provided
  const activeEvents = selectedReasonFilter
    ? allSpeedingEvents.filter(e => {
        const r = (e.reasonCategory && e.reasonCategory.trim() !== '') ? e.reasonCategory.trim() : 'Tanpa alasan tercatat';
        return r === selectedReasonFilter;
      })
    : allSpeedingEvents;

  // 2. Trend Bucket Chart Data
  const trendBucketMap: { [bucketKey: string]: { label: string; events: ExceptionEventRecord[]; dateStart: string; dateEnd: string } } = {};

  activeEvents.forEach(e => {
    let key = e.date;
    let label = e.date;
    if (trendTimeGranularity === 'Monthly') {
      key = e.date.substring(0, 7); // YYYY-MM
      const [yr, mn] = key.split('-');
      const mInfo = normalizeMonth(mn);
      label = `${mInfo.shortIndo} ${yr}`;
    } else if (trendTimeGranularity === 'Weekly') {
      const day = parseInt(e.date.substring(8, 10), 10);
      const weekNum = Math.ceil(day / 7);
      key = `${e.date.substring(0, 7)}-W${weekNum}`;
      label = `M${weekNum} (${e.date.substring(0, 7)})`;
    }

    if (!trendBucketMap[key]) {
      trendBucketMap[key] = { label, events: [], dateStart: e.date, dateEnd: e.date };
    }
    trendBucketMap[key].events.push(e);
  });

  const trendBuckets: SpeedingTrendBucket[] = Object.keys(trendBucketMap)
    .sort()
    .map(bucketKey => {
      const evs = trendBucketMap[bucketKey].events;
      return {
        bucketKey,
        label: trendBucketMap[bucketKey].label,
        eventCount: evs.length,
        durationMinutes: evs.reduce((s, ev) => s + (ev.durationMinutes || 0), 0),
        affectedVehiclesCount: new Set(evs.map(ev => ev.vehicleId)).size,
        dateStart: trendBucketMap[bucketKey].dateStart,
        dateEnd: trendBucketMap[bucketKey].dateEnd
      };
    });

  // 3. Comparison Chart Data (immediate child level)
  let breakdownType: 'PSM' | 'Region' | 'Estate' | 'Vehicle' = 'PSM';
  if (filters.psm === 'ALL') breakdownType = 'PSM';
  else if (filters.region === 'ALL') breakdownType = 'Region';
  else if (filters.estate === 'ALL') breakdownType = 'Estate';
  else breakdownType = 'Vehicle';

  const comparisonItems: SpeedingComparisonItem[] = [];
  const submittedReportsForPriority = filteredReports.filter(r => {
    if (r.submissionStatus !== 'Sudah Dikirim') return false;
    if (priorityFilter === 'Normal') return r.reportType === 'Normal';
    if (priorityFilter === 'Urgent') return r.reportType === 'Urgent';
    return r.reportType === 'Normal' || r.reportType === 'Urgent';
  });

  if (breakdownType === 'PSM') {
    const psms = ['PSM A', 'PSM B', 'PSM C', 'PSM E', 'PSM F', 'PSM G'];
    psms.forEach(psmId => {
      const psmEstates = MOCK_ESTATES.filter(e => e.psmId === psmId);
      const estateIds = new Set(psmEstates.map(e => e.id));
      const psmEvents = activeEvents.filter(e => estateIds.has(e.estateId));
      const psmSubmittedReps = submittedReportsForPriority.filter(r => estateIds.has(r.estateId));
      const psmMatchingReps = new Set(psmEvents.map(e => e.patrolRunId)).size;
      const reportPct = psmSubmittedReps.length > 0 ? (psmMatchingReps / psmSubmittedReps.length) * 100 : 0;

      comparisonItems.push({
        id: psmId,
        name: psmId,
        eventCount: psmEvents.length,
        matchingReportsCount: psmMatchingReps,
        totalSubmittedReportsCount: psmSubmittedReps.length,
        reportPercentage: Math.round(reportPct * 10) / 10
      });
    });
  } else if (breakdownType === 'Region') {
    const psmEstates = MOCK_ESTATES.filter(e => e.psmId === filters.psm);
    const regionsSet = Array.from(new Set(psmEstates.map(e => e.regionId)));
    regionsSet.forEach(regId => {
      const regEstates = psmEstates.filter(e => e.regionId === regId);
      const estateIds = new Set(regEstates.map(e => e.id));
      const regEvents = activeEvents.filter(e => estateIds.has(e.estateId));
      const regSubmittedReps = submittedReportsForPriority.filter(r => estateIds.has(r.estateId));
      const regMatchingReps = new Set(regEvents.map(e => e.patrolRunId)).size;
      const reportPct = regSubmittedReps.length > 0 ? (regMatchingReps / regSubmittedReps.length) * 100 : 0;

      comparisonItems.push({
        id: regId,
        name: regId,
        eventCount: regEvents.length,
        matchingReportsCount: regMatchingReps,
        totalSubmittedReportsCount: regSubmittedReps.length,
        reportPercentage: Math.round(reportPct * 10) / 10
      });
    });
  } else if (breakdownType === 'Estate') {
    const regEstates = getFilteredEstates(filters);
    regEstates.forEach(est => {
      const estEvents = activeEvents.filter(e => e.estateId === est.id);
      const estSubmittedReps = submittedReportsForPriority.filter(r => r.estateId === est.id);
      const estMatchingReps = new Set(estEvents.map(e => e.patrolRunId)).size;
      const reportPct = estSubmittedReps.length > 0 ? (estMatchingReps / estSubmittedReps.length) * 100 : 0;

      comparisonItems.push({
        id: est.id,
        name: est.name,
        eventCount: estEvents.length,
        matchingReportsCount: estMatchingReps,
        totalSubmittedReportsCount: estSubmittedReps.length,
        reportPercentage: Math.round(reportPct * 10) / 10
      });
    });
  } else {
    const estVehicles = getFilteredVehicles(filters);
    estVehicles.forEach(veh => {
      const vehEvents = activeEvents.filter(e => e.vehicleId === veh.id);
      const vehSubmittedReps = submittedReportsForPriority.filter(r => r.vehicleId === veh.id);
      const vehMatchingReps = new Set(vehEvents.map(e => e.patrolRunId)).size;
      const reportPct = vehSubmittedReps.length > 0 ? (vehMatchingReps / vehSubmittedReps.length) * 100 : 0;

      comparisonItems.push({
        id: veh.id,
        name: veh.nopol || veh.id,
        eventCount: vehEvents.length,
        matchingReportsCount: vehMatchingReps,
        totalSubmittedReportsCount: vehSubmittedReps.length,
        reportPercentage: Math.round(reportPct * 10) / 10
      });
    });
  }

  // 4. Single-Event Rows for Lower Table
  const vehicleMap = new Map(MOCK_VEHICLES.map(v => [v.id, v]));
  const estateMap = new Map(MOCK_ESTATES.map(e => [e.id, e]));

  const eventRows: SpeedingEventRow[] = activeEvents.map(ev => {
    const veh = vehicleMap.get(ev.vehicleId);
    const est = estateMap.get(ev.estateId);
    const durSec = ev.durationSeconds || Math.round((ev.durationMinutes || 0) * 60);
    const durFormatted = formatDuration(durSec);

    const shift1Duration = ev.shift === 'Shift 1' ? durFormatted : '—';
    const shift2Duration = ev.shift === 'Shift 2' ? durFormatted : '—';
    const shift3Duration = ev.shift === 'Shift 3' ? durFormatted : '—';

    const distKm = ev.distanceKm || 0.5;

    return {
      id: ev.id,
      date: ev.date,
      vehicleId: ev.vehicleId,
      nopol: veh ? veh.nopol : ev.vehicleId,
      estateId: ev.estateId,
      estateName: est ? est.name : ev.estateId,
      reportPriority: ev.reportPriority || 'Normal',
      eventIndexLabel: `#${ev.eventIndex || 1}`,
      eventIndex: ev.eventIndex || 1,
      startTime: ev.startTime || '08:00:00',
      durationSeconds: durSec,
      durationFormatted: durFormatted,
      shift: ev.shift,
      shift1Duration,
      shift2Duration,
      shift3Duration,
      distanceKm: distKm,
      distanceFormatted: `${distKm.toFixed(2)} km`,
      reasonCategory: ev.reasonCategory || 'Tanpa alasan tercatat',
      parentReason: ev.parentReason,
      subReason: ev.subReason,
      patrolRunId: ev.patrolRunId,
      detail: ev.detail || '',
      lat: ev.lat,
      lng: ev.lng,
      maxSpeedKmvh: ev.maxSpeedKmvh,
      picComment: ev.picComment,
      rawRecord: ev
    };
  }).sort((a, b) => {
    const dateCmp = b.date.localeCompare(a.date);
    if (dateCmp !== 0) return dateCmp;
    const vehCmp = a.vehicleId.localeCompare(b.vehicleId);
    if (vehCmp !== 0) return vehCmp;
    return a.eventIndex - b.eventIndex;
  });

  return {
    totalEvents,
    totalDurationSeconds,
    totalDurationMinutes,
    maxSpeedKmvh,
    affectedVehiclesCount,
    reasonSummaryRows,
    trendBuckets,
    comparisonItems,
    eventRows,
    breakdownType
  };
}

export interface UnifiedExceptionRow {
  id: string;
  label: string;
  subLabel?: string;
  color: string;
  s1Count: number;
  s2Count: number;
  s3Count: number;
  totalEvents: number;
  percentage: number;
  metricValue: number;
  metricFormatted: string;
  supportingImpactText: string;
}

export interface DonutSegment {
  id: string;
  label: string;
  color: string;
  count: number;
  percentage: number;
  metricFormatted: string;
  s1Count: number;
  s2Count: number;
  s3Count: number;
  supportingImpactText: string;
  isLainnya?: boolean;
  childrenIds?: string[];
}

export interface UnifiedExceptionResult {
  totalEventsInScope: number;
  totalMetricValue: number;
  metricLabel: string;
  totalMetricFormatted: string;
  firstColumnLabel: string;
  rows: UnifiedExceptionRow[];
  aggregateTotalRow: {
    s1Count: number;
    s2Count: number;
    s3Count: number;
    totalEvents: number;
    percentage: number;
    totalMetricValue: number;
    metricFormatted: string;
  };
  donutSegments: DonutSegment[];
  eventRows: SpeedingEventRow[];
}

export function selectUnifiedExceptionBreakdown(
  filters: GlobalFilterState,
  exceptionKey: 'Kecepatan' | 'Keluar Rute' | 'Berhenti',
  priorityFilter: 'ALL' | 'Normal' | 'Urgent' = 'ALL',
  viewMode: 'Alasan' | 'Perbandingan' = 'Alasan',
  selectedCategoryFilter: string | null = null
): UnifiedExceptionResult {
  const targetType = exceptionKey === 'Kecepatan' ? 'Overspeed' : (exceptionKey === 'Keluar Rute' ? 'Out of Route' : 'Overparking');

  const filteredReports = getFilteredPatrolReports(filters);
  const targetReportIds = new Set(
    filteredReports
      .filter(r => {
        if (r.submissionStatus !== 'Sudah Dikirim') return false;
        if (priorityFilter === 'Normal') return r.reportType === 'Normal';
        if (priorityFilter === 'Urgent') return r.reportType === 'Urgent';
        return r.reportType === 'Normal' || r.reportType === 'Urgent';
      })
      .map(r => r.patrolRunId)
  );

  const targetEvents = getFilteredExceptions(filters).filter(
    e => e.type === targetType && targetReportIds.has(e.patrolRunId)
  );

  const totalEventsInScope = targetEvents.length;

  let metricLabel = 'Total Durasi';
  if (exceptionKey === 'Keluar Rute') metricLabel = 'Jarak Out of Route';
  if (exceptionKey === 'Berhenti') metricLabel = 'Total Durasi Berhenti';

  const getMetricValue = (e: ExceptionEventRecord) => {
    if (exceptionKey === 'Keluar Rute') {
      return e.distanceKm || 0;
    }
    const sec = e.durationSeconds || Math.round((e.durationMinutes || 0) * 60);
    return sec / 60; // minutes
  };

  const formatMetric = (val: number) => {
    if (exceptionKey === 'Keluar Rute') {
      return formatDistanceKm(val);
    }
    return formatDurationFormatted(val);
  };

  const totalMetricValue = targetEvents.reduce((acc, e) => acc + getMetricValue(e), 0);
  const totalMetricFormatted = formatMetric(totalMetricValue);

  let firstColumnLabel = 'Alasan';
  const groupMap = new Map<string, { id: string; label: string; subLabel?: string; events: ExceptionEventRecord[] }>();

  if (viewMode === 'Alasan') {
    firstColumnLabel = 'Alasan';
    targetEvents.forEach(e => {
      const reasonStr = (e.reasonCategory && e.reasonCategory.trim()) ? e.reasonCategory.trim() : 'Tanpa alasan tercatat';
      if (!groupMap.has(reasonStr)) {
        groupMap.set(reasonStr, { id: reasonStr, label: reasonStr, events: [] });
      }
      groupMap.get(reasonStr)!.events.push(e);
    });
  } else {
    if (filters.psm === 'ALL') {
      firstColumnLabel = 'PSM';
      const psms = ['PSM A', 'PSM B', 'PSM C', 'PSM E', 'PSM F', 'PSM G'];
      psms.forEach(p => groupMap.set(p, { id: p, label: p, events: [] }));
      const estateMap = new Map(MOCK_ESTATES.map(est => [est.id, est]));
      targetEvents.forEach(e => {
        const est = estateMap.get(e.estateId);
        const psmId = est ? est.psmId : 'PSM A';
        if (groupMap.has(psmId)) {
          groupMap.get(psmId)!.events.push(e);
        }
      });
    } else if (filters.region === 'ALL') {
      firstColumnLabel = 'Region';
      const psmEstates = MOCK_ESTATES.filter(est => est.psmId === filters.psm);
      const regionsSet = Array.from(new Set(psmEstates.map(est => est.regionId)));
      regionsSet.forEach(r => groupMap.set(r, { id: r, label: r, events: [] }));
      const estateMap = new Map(MOCK_ESTATES.map(est => [est.id, est]));
      targetEvents.forEach(e => {
        const est = estateMap.get(e.estateId);
        const regId = est ? est.regionId : (regionsSet[0] || 'Region A');
        if (groupMap.has(regId)) {
          groupMap.get(regId)!.events.push(e);
        }
      });
    } else if (filters.estate === 'ALL') {
      firstColumnLabel = 'Estate';
      const regEstates = getFilteredEstates(filters);
      regEstates.forEach(est => groupMap.set(est.id, { id: est.id, label: est.name, subLabel: est.id, events: [] }));
      targetEvents.forEach(e => {
        if (groupMap.has(e.estateId)) {
          groupMap.get(e.estateId)!.events.push(e);
        }
      });
    } else {
      firstColumnLabel = 'Kendaraan';
      const estVehicles = getFilteredVehicles(filters);
      estVehicles.forEach(v => groupMap.set(v.id, { id: v.id, label: `${v.nopol} (${v.id})`, subLabel: v.id, events: [] }));
      targetEvents.forEach(e => {
        if (groupMap.has(e.vehicleId)) {
          groupMap.get(e.vehicleId)!.events.push(e);
        }
      });
    }
  }

  // Visually distinct palette alternating hue and tone
  const COLOR_PALETTE = [
    '#2563eb', // Royal Blue
    '#ea580c', // Vibrant Orange
    '#16a34a', // Emerald Green
    '#db2777', // Magenta / Pink
    '#7c3aed', // Deep Purple
    '#d97706', // Gold / Amber
    '#0284c7', // Sky Blue / Cyan
    '#059669', // Mint / Dark Emerald
    '#e11d48', // Crimson Red
    '#4f46e5', // Indigo
    '#854d0e', // Dark Bronze / Yellow
    '#64748b'  // Slate Gray
  ];

  // Stable category color assignment by hashing category ID
  const getStableColor = (id: string, idx: number) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash << 5) - hash + id.charCodeAt(i);
      hash |= 0;
    }
    return COLOR_PALETTE[Math.abs(hash) % COLOR_PALETTE.length];
  };

  const rawRows: UnifiedExceptionRow[] = [];
  let colorIdx = 0;

  groupMap.forEach((grp) => {
    const evs = grp.events;
    const s1Count = evs.filter(e => e.shift === 'Shift 1').length;
    const s2Count = evs.filter(e => e.shift === 'Shift 2').length;
    const s3Count = evs.filter(e => e.shift === 'Shift 3').length;
    const totalEvents = evs.length;
    const percentage = totalEventsInScope > 0 ? (totalEvents / totalEventsInScope) * 100 : 0;
    const metricVal = evs.reduce((acc, e) => acc + getMetricValue(e), 0);
    const metricFormatted = formatMetric(metricVal);

    let supportingImpactText = '';
    if (exceptionKey === 'Kecepatan') {
      const totalKm = evs.reduce((acc, e) => acc + (e.distanceKm || 0), 0);
      supportingImpactText = `Jarak: ${formatDistanceKm(totalKm)} · Durasi: ${metricFormatted}`;
    } else if (exceptionKey === 'Keluar Rute') {
      supportingImpactText = `Jarak Out of Route: ${metricFormatted}`;
    } else {
      supportingImpactText = `Durasi Berhenti: ${metricFormatted}`;
    }

    rawRows.push({
      id: grp.id,
      label: grp.label,
      subLabel: grp.subLabel,
      color: getStableColor(grp.id, colorIdx),
      s1Count,
      s2Count,
      s3Count,
      totalEvents,
      percentage: Math.round(percentage * 10) / 10,
      metricValue: metricVal,
      metricFormatted,
      supportingImpactText
    });

    colorIdx++;
  });

  rawRows.sort((a, b) => b.totalEvents - a.totalEvents);

  const aggregateTotalRow = {
    s1Count: rawRows.reduce((acc, r) => acc + r.s1Count, 0),
    s2Count: rawRows.reduce((acc, r) => acc + r.s2Count, 0),
    s3Count: rawRows.reduce((acc, r) => acc + r.s3Count, 0),
    totalEvents: totalEventsInScope,
    percentage: totalEventsInScope > 0 ? 100 : 0,
    totalMetricValue,
    metricFormatted: totalMetricFormatted
  };

  const donutSegments: DonutSegment[] = [];
  if (rawRows.length > 7) {
    for (let i = 0; i < 6; i++) {
      const r = rawRows[i];
      donutSegments.push({
        id: r.id,
        label: r.label,
        color: r.color,
        count: r.totalEvents,
        percentage: r.percentage,
        metricFormatted: r.metricFormatted,
        s1Count: r.s1Count,
        s2Count: r.s2Count,
        s3Count: r.s3Count,
        supportingImpactText: r.supportingImpactText
      });
    }
    const remainingRows = rawRows.slice(6);
    const lainnyaCount = remainingRows.reduce((acc, r) => acc + r.totalEvents, 0);
    const lainnyaPct = totalEventsInScope > 0 ? Math.round((lainnyaCount / totalEventsInScope) * 1000) / 10 : 0;
    const lainnyaMetricVal = remainingRows.reduce((acc, r) => acc + r.metricValue, 0);
    const lainnyaS1 = remainingRows.reduce((acc, r) => acc + r.s1Count, 0);
    const lainnyaS2 = remainingRows.reduce((acc, r) => acc + r.s2Count, 0);
    const lainnyaS3 = remainingRows.reduce((acc, r) => acc + r.s3Count, 0);

    let lainnyaImpact = '';
    if (exceptionKey === 'Kecepatan') {
      const lainEvents = targetEvents.filter(e => remainingRows.some(rr => rr.id === e.reasonCategory || rr.id === e.estateId || rr.id === e.vehicleId));
      const lainKm = lainEvents.reduce((acc, e) => acc + (e.distanceKm || 0), 0);
      lainnyaImpact = `Jarak: ${formatDistanceKm(lainKm)} · Durasi: ${formatMetric(lainnyaMetricVal)}`;
    } else if (exceptionKey === 'Keluar Rute') {
      lainnyaImpact = `Jarak Out of Route: ${formatMetric(lainnyaMetricVal)}`;
    } else {
      lainnyaImpact = `Durasi Berhenti: ${formatMetric(lainnyaMetricVal)}`;
    }

    donutSegments.push({
      id: 'Lainnya',
      label: 'Lainnya',
      color: '#94a3b8',
      count: lainnyaCount,
      percentage: lainnyaPct,
      metricFormatted: formatMetric(lainnyaMetricVal),
      s1Count: lainnyaS1,
      s2Count: lainnyaS2,
      s3Count: lainnyaS3,
      supportingImpactText: lainnyaImpact,
      isLainnya: true,
      childrenIds: remainingRows.map(r => r.id)
    });
  } else {
    rawRows.forEach(r => {
      donutSegments.push({
        id: r.id,
        label: r.label,
        color: r.color,
        count: r.totalEvents,
        percentage: r.percentage,
        metricFormatted: r.metricFormatted,
        s1Count: r.s1Count,
        s2Count: r.s2Count,
        s3Count: r.s3Count,
        supportingImpactText: r.supportingImpactText
      });
    });
  }

  let filteredEvents = targetEvents;
  if (selectedCategoryFilter) {
    if (selectedCategoryFilter === 'Lainnya') {
      const topIds = new Set(rawRows.slice(0, 6).map(r => r.id));
      filteredEvents = targetEvents.filter(e => {
        if (viewMode === 'Alasan') {
          const rCat = (e.reasonCategory && e.reasonCategory.trim()) ? e.reasonCategory.trim() : 'Tanpa alasan tercatat';
          return !topIds.has(rCat);
        } else {
          return true;
        }
      });
    } else {
      filteredEvents = targetEvents.filter(e => {
        if (viewMode === 'Alasan') {
          const rCat = (e.reasonCategory && e.reasonCategory.trim()) ? e.reasonCategory.trim() : 'Tanpa alasan tercatat';
          return rCat === selectedCategoryFilter;
        } else {
          if (filters.psm === 'ALL') {
            const est = MOCK_ESTATES.find(m => m.id === e.estateId);
            return est?.psmId === selectedCategoryFilter;
          } else if (filters.region === 'ALL') {
            const est = MOCK_ESTATES.find(m => m.id === e.estateId);
            return est?.regionId === selectedCategoryFilter;
          } else if (filters.estate === 'ALL') {
            return e.estateId === selectedCategoryFilter;
          } else {
            return e.vehicleId === selectedCategoryFilter;
          }
        }
      });
    }
  }

  const vehicleMap = new Map(MOCK_VEHICLES.map(v => [v.id, v]));
  const estateMap = new Map(MOCK_ESTATES.map(est => [est.id, est]));

  const eventRows: SpeedingEventRow[] = filteredEvents.map(ev => {
    const veh = vehicleMap.get(ev.vehicleId);
    const est = estateMap.get(ev.estateId);
    const durSec = ev.durationSeconds || Math.round((ev.durationMinutes || 0) * 60);
    const durFormatted = formatDurationFormatted(durSec / 60);
    const distKm = ev.distanceKm || 0;

    return {
      id: ev.id,
      date: ev.date,
      vehicleId: ev.vehicleId,
      nopol: veh ? veh.nopol : ev.vehicleId,
      estateId: ev.estateId,
      estateName: est ? est.name : ev.estateId,
      reportPriority: ev.reportPriority || 'Normal',
      eventIndexLabel: `#${ev.eventIndex || 1}`,
      eventIndex: ev.eventIndex || 1,
      startTime: ev.startTime || '08:00:00',
      durationSeconds: durSec,
      durationFormatted: durFormatted,
      shift: ev.shift,
      shift1Duration: ev.shift === 'Shift 1' ? durFormatted : '—',
      shift2Duration: ev.shift === 'Shift 2' ? durFormatted : '—',
      shift3Duration: ev.shift === 'Shift 3' ? durFormatted : '—',
      distanceKm: distKm,
      distanceFormatted: formatDistanceKm(distKm),
      reasonCategory: ev.reasonCategory || 'Tanpa alasan tercatat',
      parentReason: ev.parentReason,
      subReason: ev.subReason,
      patrolRunId: ev.patrolRunId,
      detail: ev.detail || '',
      lat: ev.lat,
      lng: ev.lng,
      maxSpeedKmvh: ev.maxSpeedKmvh,
      picComment: ev.picComment,
      rawRecord: ev
    };
  }).sort((a, b) => {
    const dateCmp = b.date.localeCompare(a.date);
    if (dateCmp !== 0) return dateCmp;
    const vehCmp = a.vehicleId.localeCompare(b.vehicleId);
    if (vehCmp !== 0) return vehCmp;
    return a.eventIndex - b.eventIndex;
  });

  return {
    totalEventsInScope,
    totalMetricValue,
    metricLabel,
    totalMetricFormatted,
    firstColumnLabel,
    rows: rawRows,
    aggregateTotalRow,
    donutSegments,
    eventRows
  };
}

// ----------------------------------------------------------------------------
// SELECTORS FOR COVERAGE AREA COMPARISON & TREN 6 BULAN
// ----------------------------------------------------------------------------

export interface CoverageComparisonCategoryItem {
  id: string;
  label: string;
  subLabel?: string;
  vehicleType?: 'Car' | 'Motorcycle';
  vehicleCount: number;

  // Metric A: Aktivitas di Area Rawan
  rawanVisits: number;
  nonRawanVisits: number;
  totalVisits: number;
  aktivitasPct: number | null;

  // Metric B: Cakupan Blok Rawan
  totalRawanBlocks: number;
  coveredRawanBlocks: number;
  uncoveredRawanBlocks: number;
  cakupanPct: number | null;
}

export interface CoverageComparisonResult {
  groupingType: 'PSM' | 'Region' | 'Estate' | 'Vehicle';
  scopeLabel: string;
  categories: CoverageComparisonCategoryItem[];
  totalAggregate: {
    rawanVisits: number;
    nonRawanVisits: number;
    totalVisits: number;
    aktivitasPct: number | null;
    totalRawanBlocks: number;
    coveredRawanBlocks: number;
    uncoveredRawanBlocks: number;
    cakupanPct: number | null;
  };
}

export function selectCoverageComparison(
  filters: GlobalFilterState
): CoverageComparisonResult {
  const yearStr = filters.year || '2026';
  let startDateStr = `${yearStr}-05-01`;
  let endDateStr = `${yearStr}-05-31`;

  if (filters.startDate && filters.endDate) {
    startDateStr = filters.startDate;
    endDateStr = filters.endDate;
  } else if (filters.year && filters.month && filters.month !== 'ALL') {
    const mInfo = normalizeMonth(filters.month);
    startDateStr = `${filters.year}-${mInfo.num}-01`;
    endDateStr = `${filters.year}-${mInfo.num}-${mInfo.days < 10 ? '0' + mInfo.days : mInfo.days}`;
  }

  const estateMap = new Map(MOCK_ESTATES.map(e => [e.id, e]));
  const blockMap = new Map(MOCK_BLOCKS.map(b => [b.id, b]));
  const vehicleMap = new Map(MOCK_VEHICLES.map(v => [v.id, v]));
  const runMap = new Map(MOCK_PATROL_RUNS.map(r => [r.id, r]));

  // Valid visits within date range
  const validVisits = MOCK_BLOCK_VISITS.filter(v => {
    if (v.date < startDateStr || v.date > endDateStr) return false;
    const run = runMap.get(v.patrolRunId);
    return !!run;
  });

  let groupingType: 'PSM' | 'Region' | 'Estate' | 'Vehicle' = 'PSM';
  let scopeLabel = 'Nasional';

  if (filters.estate && filters.estate !== 'ALL') {
    groupingType = 'Vehicle';
    scopeLabel = filters.estate;
  } else if (filters.region && filters.region !== 'ALL') {
    groupingType = 'Estate';
    scopeLabel = filters.region;
  } else if (filters.psm && filters.psm !== 'ALL') {
    groupingType = 'Region';
    scopeLabel = filters.psm;
  } else {
    groupingType = 'PSM';
    scopeLabel = 'Nasional';
  }

  const categories: CoverageComparisonCategoryItem[] = [];

  if (groupingType === 'PSM') {
    const psms = ['PSM A', 'PSM B', 'PSM C', 'PSM E', 'PSM F', 'PSM G'];
    psms.forEach(psmId => {
      const psmEstates = MOCK_ESTATES.filter(e => e.psmId === psmId);
      const estateIds = new Set(psmEstates.map(e => e.id));
      const psmVehicles = MOCK_VEHICLES.filter(v => estateIds.has(v.estateId));
      const psmBlocks = MOCK_BLOCKS.filter(b => estateIds.has(b.estateId));
      const rawanBlocks = psmBlocks.filter(b => b.isRawan);

      const psmVisits = validVisits.filter(v => {
        const run = runMap.get(v.patrolRunId);
        return run && estateIds.has(run.estateId);
      });

      let rawanVisits = 0;
      let nonRawanVisits = 0;
      const coveredRawanBlockIds = new Set<string>();

      psmVisits.forEach(v => {
        const blk = blockMap.get(v.blockId);
        if (blk) {
          if (blk.isRawan) {
            rawanVisits++;
            coveredRawanBlockIds.add(blk.id);
          } else {
            nonRawanVisits++;
          }
        }
      });

      const totalVisits = rawanVisits + nonRawanVisits;
      const aktivitasPct = totalVisits > 0 ? Math.round((rawanVisits / totalVisits) * 1000) / 10 : null;

      const totalRawanBlocks = rawanBlocks.length;
      const coveredRawanBlocks = coveredRawanBlockIds.size;
      const uncoveredRawanBlocks = Math.max(0, totalRawanBlocks - coveredRawanBlocks);
      const cakupanPct = totalRawanBlocks > 0 ? Math.round((coveredRawanBlocks / totalRawanBlocks) * 1000) / 10 : null;

      categories.push({
        id: psmId,
        label: psmId,
        subLabel: `${psmEstates.length} Estate · ${psmVehicles.length} Unit`,
        vehicleCount: psmVehicles.length,
        rawanVisits,
        nonRawanVisits,
        totalVisits,
        aktivitasPct,
        totalRawanBlocks,
        coveredRawanBlocks,
        uncoveredRawanBlocks,
        cakupanPct
      });
    });
  } else if (groupingType === 'Region') {
    const psmEstates = MOCK_ESTATES.filter(e => e.psmId === filters.psm);
    const regions = Array.from(new Set(psmEstates.map(e => e.regionId)));

    regions.forEach(regId => {
      const regEstates = psmEstates.filter(e => e.regionId === regId);
      const estateIds = new Set(regEstates.map(e => e.id));
      const regVehicles = MOCK_VEHICLES.filter(v => estateIds.has(v.estateId));
      const regBlocks = MOCK_BLOCKS.filter(b => estateIds.has(b.estateId));
      const rawanBlocks = regBlocks.filter(b => b.isRawan);

      const regVisits = validVisits.filter(v => {
        const run = runMap.get(v.patrolRunId);
        return run && estateIds.has(run.estateId);
      });

      let rawanVisits = 0;
      let nonRawanVisits = 0;
      const coveredRawanBlockIds = new Set<string>();

      regVisits.forEach(v => {
        const blk = blockMap.get(v.blockId);
        if (blk) {
          if (blk.isRawan) {
            rawanVisits++;
            coveredRawanBlockIds.add(blk.id);
          } else {
            nonRawanVisits++;
          }
        }
      });

      const totalVisits = rawanVisits + nonRawanVisits;
      const aktivitasPct = totalVisits > 0 ? Math.round((rawanVisits / totalVisits) * 1000) / 10 : null;

      const totalRawanBlocks = rawanBlocks.length;
      const coveredRawanBlocks = coveredRawanBlockIds.size;
      const uncoveredRawanBlocks = Math.max(0, totalRawanBlocks - coveredRawanBlocks);
      const cakupanPct = totalRawanBlocks > 0 ? Math.round((coveredRawanBlocks / totalRawanBlocks) * 1000) / 10 : null;

      categories.push({
        id: regId,
        label: regId,
        subLabel: `${regEstates.length} Estate · ${regVehicles.length} Unit`,
        vehicleCount: regVehicles.length,
        rawanVisits,
        nonRawanVisits,
        totalVisits,
        aktivitasPct,
        totalRawanBlocks,
        coveredRawanBlocks,
        uncoveredRawanBlocks,
        cakupanPct
      });
    });
  } else if (groupingType === 'Estate') {
    const regEstates = getFilteredEstates(filters);

    regEstates.forEach(est => {
      const estVehicles = MOCK_VEHICLES.filter(v => v.estateId === est.id);
      const estBlocks = MOCK_BLOCKS.filter(b => b.estateId === est.id);
      const rawanBlocks = estBlocks.filter(b => b.isRawan);

      const estVisits = validVisits.filter(v => {
        const run = runMap.get(v.patrolRunId);
        return run && run.estateId === est.id;
      });

      let rawanVisits = 0;
      let nonRawanVisits = 0;
      const coveredRawanBlockIds = new Set<string>();

      estVisits.forEach(v => {
        const blk = blockMap.get(v.blockId);
        if (blk) {
          if (blk.isRawan) {
            rawanVisits++;
            coveredRawanBlockIds.add(blk.id);
          } else {
            nonRawanVisits++;
          }
        }
      });

      const totalVisits = rawanVisits + nonRawanVisits;
      const aktivitasPct = totalVisits > 0 ? Math.round((rawanVisits / totalVisits) * 1000) / 10 : null;

      const totalRawanBlocks = rawanBlocks.length;
      const coveredRawanBlocks = coveredRawanBlockIds.size;
      const uncoveredRawanBlocks = Math.max(0, totalRawanBlocks - coveredRawanBlocks);
      const cakupanPct = totalRawanBlocks > 0 ? Math.round((coveredRawanBlocks / totalRawanBlocks) * 1000) / 10 : null;

      categories.push({
        id: est.id,
        label: est.id,
        subLabel: `${estVehicles.length} Unit Kendaraan`,
        vehicleCount: estVehicles.length,
        rawanVisits,
        nonRawanVisits,
        totalVisits,
        aktivitasPct,
        totalRawanBlocks,
        coveredRawanBlocks,
        uncoveredRawanBlocks,
        cakupanPct
      });
    });
  } else {
    // Vehicle level
    const estVehicles = getFilteredVehicles(filters);
    const targetEstateId = filters.estate;
    const estBlocks = MOCK_BLOCKS.filter(b => b.estateId === targetEstateId);
    const rawanBlocks = estBlocks.filter(b => b.isRawan);

    estVehicles.forEach(veh => {
      const vehVisits = validVisits.filter(v => {
        const run = runMap.get(v.patrolRunId);
        return run && run.vehicleId === veh.id;
      });

      let rawanVisits = 0;
      let nonRawanVisits = 0;
      const coveredRawanBlockIds = new Set<string>();

      vehVisits.forEach(v => {
        const blk = blockMap.get(v.blockId);
        if (blk) {
          if (blk.isRawan) {
            rawanVisits++;
            coveredRawanBlockIds.add(blk.id);
          } else {
            nonRawanVisits++;
          }
        }
      });

      const totalVisits = rawanVisits + nonRawanVisits;
      const aktivitasPct = totalVisits > 0 ? Math.round((rawanVisits / totalVisits) * 1000) / 10 : null;

      // Vehicle-level Cakupan Blok Rawan: covered by this vehicle vs estate total rawan blocks
      const totalRawanBlocks = rawanBlocks.length;
      const coveredRawanBlocks = coveredRawanBlockIds.size;
      const uncoveredRawanBlocks = Math.max(0, totalRawanBlocks - coveredRawanBlocks);
      const cakupanPct = totalRawanBlocks > 0 ? Math.round((coveredRawanBlocks / totalRawanBlocks) * 1000) / 10 : null;

      categories.push({
        id: veh.id,
        label: veh.nopol || veh.id,
        subLabel: `ID: ${veh.id}`,
        vehicleType: veh.vehicleType,
        vehicleCount: 1,
        rawanVisits,
        nonRawanVisits,
        totalVisits,
        aktivitasPct,
        totalRawanBlocks,
        coveredRawanBlocks,
        uncoveredRawanBlocks,
        cakupanPct
      });
    });
  }

  // Calculate overall scope aggregate
  const scopeEstates = new Set(getFilteredEstates(filters).map(e => e.id));
  const scopeBlocks = MOCK_BLOCKS.filter(b => scopeEstates.has(b.estateId));
  const scopeRawanBlocks = scopeBlocks.filter(b => b.isRawan);

  const scopeVisits = validVisits.filter(v => {
    const run = runMap.get(v.patrolRunId);
    return run && scopeEstates.has(run.estateId);
  });

  let aggRawanVisits = 0;
  let aggNonRawanVisits = 0;
  const aggCoveredRawanBlockIds = new Set<string>();

  scopeVisits.forEach(v => {
    const blk = blockMap.get(v.blockId);
    if (blk) {
      if (blk.isRawan) {
        aggRawanVisits++;
        aggCoveredRawanBlockIds.add(blk.id);
      } else {
        aggNonRawanVisits++;
      }
    }
  });

  const aggTotalVisits = aggRawanVisits + aggNonRawanVisits;
  const aggAktivitasPct = aggTotalVisits > 0 ? Math.round((aggRawanVisits / aggTotalVisits) * 1000) / 10 : null;

  const aggTotalRawanBlocks = scopeRawanBlocks.length;
  const aggCoveredRawanBlocks = aggCoveredRawanBlockIds.size;
  const aggUncoveredRawanBlocks = Math.max(0, aggTotalRawanBlocks - aggCoveredRawanBlocks);
  const aggCakupanPct = aggTotalRawanBlocks > 0 ? Math.round((aggCoveredRawanBlocks / aggTotalRawanBlocks) * 1000) / 10 : null;

  return {
    groupingType,
    scopeLabel,
    categories,
    totalAggregate: {
      rawanVisits: aggRawanVisits,
      nonRawanVisits: aggNonRawanVisits,
      totalVisits: aggTotalVisits,
      aktivitasPct: aggAktivitasPct,
      totalRawanBlocks: aggTotalRawanBlocks,
      coveredRawanBlocks: aggCoveredRawanBlocks,
      uncoveredRawanBlocks: aggUncoveredRawanBlocks,
      cakupanPct: aggCakupanPct
    }
  };
}

export interface CoverageTrendMonthCell {
  yearMonth: string;
  label: string;
  isPartialMonth?: boolean;
  partialTooltip?: string;

  rawanVisits: number;
  nonRawanVisits: number;
  totalVisits: number;
  aktivitasPct: number | null;

  totalRawanBlocks: number;
  coveredRawanBlocks: number;
  uncoveredRawanBlocks: number;
  cakupanPct: number | null;
}

export interface CoverageTrendRow {
  id: string;
  label: string;
  subLabel?: string;
  vehicleType?: 'Car' | 'Motorcycle';
  vehicleCount: number;
  months: CoverageTrendMonthCell[];

  totalRawanVisits: number;
  totalNonRawanVisits: number;
  totalVisits: number;
  totalAktivitasPct: number | null;

  totalRawanBlocks: number;
  totalCoveredRawanBlocks: number;
  totalUncoveredRawanBlocks: number;
  totalCakupanPct: number | null;
}

export interface CoverageTrendResult {
  breakdownType: 'PSM' | 'Region' | 'Estate' | 'Vehicle';
  headers: { yearMonth: string; label: string; isPartialMonth?: boolean; partialTooltip?: string }[];
  rows: CoverageTrendRow[];
  monthlyScopeAggregates: CoverageTrendMonthCell[];
  overallScopeAggregate: {
    rawanVisits: number;
    nonRawanVisits: number;
    totalVisits: number;
    aktivitasPct: number | null;
    totalRawanBlocks: number;
    coveredRawanBlocks: number;
    cakupanPct: number | null;
  };
}

export function selectCoverageTrendTable(
  filters: GlobalFilterState
): CoverageTrendResult {
  const yearStr = filters.year || '2026';
  const trendMonths = get6MonthTrendWindow(yearStr, filters.month || 'May', filters.endDate);
  const headers = trendMonths.map(m => ({
    yearMonth: m.yearMonth,
    label: m.label,
    isPartialMonth: m.isPartialMonth,
    partialTooltip: m.partialTooltip
  }));

  const blockMap = new Map(MOCK_BLOCKS.map(b => [b.id, b]));
  const runMap = new Map(MOCK_PATROL_RUNS.map(r => [r.id, r]));

  let breakdownType: 'PSM' | 'Region' | 'Estate' | 'Vehicle' = 'PSM';
  if (filters.estate && filters.estate !== 'ALL') breakdownType = 'Vehicle';
  else if (filters.region && filters.region !== 'ALL') breakdownType = 'Estate';
  else if (filters.psm && filters.psm !== 'ALL') breakdownType = 'Region';
  else breakdownType = 'PSM';

  const rows: CoverageTrendRow[] = [];

  const getEntityBlocks = (entityId: string, type: 'PSM' | 'Region' | 'Estate' | 'Vehicle') => {
    if (type === 'PSM') {
      const psmEstates = new Set(MOCK_ESTATES.filter(e => e.psmId === entityId).map(e => e.id));
      return MOCK_BLOCKS.filter(b => psmEstates.has(b.estateId));
    } else if (type === 'Region') {
      const regEstates = new Set(MOCK_ESTATES.filter(e => e.regionId === entityId).map(e => e.id));
      return MOCK_BLOCKS.filter(b => regEstates.has(b.estateId));
    } else if (type === 'Estate') {
      return MOCK_BLOCKS.filter(b => b.estateId === entityId);
    } else {
      const veh = MOCK_VEHICLES.find(v => v.id === entityId);
      return veh ? MOCK_BLOCKS.filter(b => b.estateId === veh.estateId) : [];
    }
  };

  const getEntityVehicles = (entityId: string, type: 'PSM' | 'Region' | 'Estate' | 'Vehicle') => {
    if (type === 'PSM') {
      const psmEstates = new Set(MOCK_ESTATES.filter(e => e.psmId === entityId).map(e => e.id));
      return MOCK_VEHICLES.filter(v => psmEstates.has(v.estateId));
    } else if (type === 'Region') {
      const regEstates = new Set(MOCK_ESTATES.filter(e => e.regionId === entityId).map(e => e.id));
      return MOCK_VEHICLES.filter(v => regEstates.has(v.estateId));
    } else if (type === 'Estate') {
      return MOCK_VEHICLES.filter(v => v.estateId === entityId);
    } else {
      return MOCK_VEHICLES.filter(v => v.id === entityId);
    }
  };

  const getEntityList = (): Array<{ id: string; label: string; subLabel: string; vehicleType?: string }> => {
    if (breakdownType === 'PSM') {
      return ['PSM A', 'PSM B', 'PSM C', 'PSM E', 'PSM F', 'PSM G'].map(id => ({ id, label: id, subLabel: 'PSM' }));
    } else if (breakdownType === 'Region') {
      const psmEstates = MOCK_ESTATES.filter(e => e.psmId === filters.psm);
      const regions = Array.from(new Set(psmEstates.map(e => e.regionId)));
      return regions.map(id => ({ id, label: id, subLabel: 'Region' }));
    } else if (breakdownType === 'Estate') {
      const regEstates = getFilteredEstates(filters);
      return regEstates.map(e => ({ id: e.id, label: e.id, subLabel: `${MOCK_VEHICLES.filter(v => v.estateId === e.id).length} Unit` }));
    } else {
      const estVehicles = getFilteredVehicles(filters);
      return estVehicles.map(v => ({ id: v.id, label: v.nopol || v.id, subLabel: `ID: ${v.id}`, vehicleType: v.vehicleType }));
    }
  };

  const entities = getEntityList();

  entities.forEach(ent => {
    const entBlocks = getEntityBlocks(ent.id, breakdownType);
    const rawanBlocks = entBlocks.filter(b => b.isRawan);
    const entVehicles = getEntityVehicles(ent.id, breakdownType);

    const monthCells: CoverageTrendMonthCell[] = [];

    let totalRawanVisits = 0;
    let totalNonRawanVisits = 0;
    const overallCoveredRawanBlockIds = new Set<string>();

    trendMonths.forEach(m => {
      const monthVisits = MOCK_BLOCK_VISITS.filter(v => {
        const run = runMap.get(v.patrolRunId);
        if (!run) return false;

        if (breakdownType === 'Vehicle') {
          if (run.vehicleId !== ent.id) return false;
        } else if (breakdownType === 'Estate') {
          if (run.estateId !== ent.id) return false;
        } else if (breakdownType === 'Region') {
          const est = MOCK_ESTATES.find(e => e.id === run.estateId);
          if (!est || est.regionId !== ent.id) return false;
        } else {
          const est = MOCK_ESTATES.find(e => e.id === run.estateId);
          if (!est || est.psmId !== ent.id) return false;
        }

        if (m.maxDateStr) {
          return v.date >= `${m.yearMonth}-01` && v.date <= m.maxDateStr;
        }
        return v.date.startsWith(m.yearMonth);
      });

      let rawanVisits = 0;
      let nonRawanVisits = 0;
      const monthCoveredRawanBlockIds = new Set<string>();

      monthVisits.forEach(v => {
        const blk = blockMap.get(v.blockId);
        if (blk) {
          if (blk.isRawan) {
            rawanVisits++;
            monthCoveredRawanBlockIds.add(blk.id);
            overallCoveredRawanBlockIds.add(blk.id);
          } else {
            nonRawanVisits++;
          }
        }
      });

      totalRawanVisits += rawanVisits;
      totalNonRawanVisits += nonRawanVisits;

      const totalVisits = rawanVisits + nonRawanVisits;
      const aktivitasPct = totalVisits > 0 ? Math.round((rawanVisits / totalVisits) * 1000) / 10 : null;

      const totalRawanBlocks = rawanBlocks.length;
      const coveredRawanBlocks = monthCoveredRawanBlockIds.size;
      const uncoveredRawanBlocks = Math.max(0, totalRawanBlocks - coveredRawanBlocks);
      const cakupanPct = totalRawanBlocks > 0 ? Math.round((coveredRawanBlocks / totalRawanBlocks) * 1000) / 10 : null;

      monthCells.push({
        yearMonth: m.yearMonth,
        label: m.label,
        isPartialMonth: m.isPartialMonth,
        partialTooltip: m.partialTooltip,
        rawanVisits,
        nonRawanVisits,
        totalVisits,
        aktivitasPct,
        totalRawanBlocks,
        coveredRawanBlocks,
        uncoveredRawanBlocks,
        cakupanPct
      });
    });

    const totalVisits = totalRawanVisits + totalNonRawanVisits;
    const totalAktivitasPct = totalVisits > 0 ? Math.round((totalRawanVisits / totalVisits) * 1000) / 10 : null;

    const totalRawanBlocks = rawanBlocks.length;
    const totalCoveredRawanBlocks = overallCoveredRawanBlockIds.size;
    const totalUncoveredRawanBlocks = Math.max(0, totalRawanBlocks - totalCoveredRawanBlocks);
    const totalCakupanPct = totalRawanBlocks > 0 ? Math.round((totalCoveredRawanBlocks / totalRawanBlocks) * 1000) / 10 : null;

    rows.push({
      id: ent.id,
      label: ent.label,
      subLabel: ent.subLabel,
      vehicleType: ent.vehicleType as 'Car' | 'Motorcycle' | undefined,
      vehicleCount: entVehicles.length,
      months: monthCells,
      totalRawanVisits,
      totalNonRawanVisits,
      totalVisits,
      totalAktivitasPct,
      totalRawanBlocks,
      totalCoveredRawanBlocks,
      totalUncoveredRawanBlocks,
      totalCakupanPct
    });
  });

  // Calculate scope-wide monthly aggregates
  const scopeEstates = new Set(getFilteredEstates(filters).map(e => e.id));
  const scopeBlocks = MOCK_BLOCKS.filter(b => scopeEstates.has(b.estateId));
  const scopeRawanBlocks = scopeBlocks.filter(b => b.isRawan);

  const monthlyScopeAggregates: CoverageTrendMonthCell[] = [];
  let scopeTotalRawanVisits = 0;
  let scopeTotalNonRawanVisits = 0;
  const scopeOverallCoveredBlockIds = new Set<string>();

  trendMonths.forEach(m => {
    const scopeMonthVisits = MOCK_BLOCK_VISITS.filter(v => {
      const run = runMap.get(v.patrolRunId);
      if (!run || !scopeEstates.has(run.estateId)) return false;
      if (m.maxDateStr) {
        return v.date >= `${m.yearMonth}-01` && v.date <= m.maxDateStr;
      }
      return v.date.startsWith(m.yearMonth);
    });

    let rawanVisits = 0;
    let nonRawanVisits = 0;
    const monthCoveredBlockIds = new Set<string>();

    scopeMonthVisits.forEach(v => {
      const blk = blockMap.get(v.blockId);
      if (blk) {
        if (blk.isRawan) {
          rawanVisits++;
          monthCoveredBlockIds.add(blk.id);
          scopeOverallCoveredBlockIds.add(blk.id);
        } else {
          nonRawanVisits++;
        }
      }
    });

    scopeTotalRawanVisits += rawanVisits;
    scopeTotalNonRawanVisits += nonRawanVisits;

    const totalVisits = rawanVisits + nonRawanVisits;
    const aktivitasPct = totalVisits > 0 ? Math.round((rawanVisits / totalVisits) * 1000) / 10 : null;

    const totalRawanBlocks = scopeRawanBlocks.length;
    const coveredRawanBlocks = monthCoveredBlockIds.size;
    const uncoveredRawanBlocks = Math.max(0, totalRawanBlocks - coveredRawanBlocks);
    const cakupanPct = totalRawanBlocks > 0 ? Math.round((coveredRawanBlocks / totalRawanBlocks) * 1000) / 10 : null;

    monthlyScopeAggregates.push({
      yearMonth: m.yearMonth,
      label: m.label,
      isPartialMonth: m.isPartialMonth,
      partialTooltip: m.partialTooltip,
      rawanVisits,
      nonRawanVisits,
      totalVisits,
      aktivitasPct,
      totalRawanBlocks,
      coveredRawanBlocks,
      uncoveredRawanBlocks,
      cakupanPct
    });
  });

  const scopeTotalVisits = scopeTotalRawanVisits + scopeTotalNonRawanVisits;
  const scopeAktivitasPct = scopeTotalVisits > 0 ? Math.round((scopeTotalRawanVisits / scopeTotalVisits) * 1000) / 10 : null;

  const scopeTotalRawanBlocks = scopeRawanBlocks.length;
  const scopeCoveredRawanBlocks = scopeOverallCoveredBlockIds.size;
  const scopeCakupanPct = scopeTotalRawanBlocks > 0 ? Math.round((scopeCoveredRawanBlocks / scopeTotalRawanBlocks) * 1000) / 10 : null;

  return {
    breakdownType,
    headers,
    rows,
    monthlyScopeAggregates,
    overallScopeAggregate: {
      rawanVisits: scopeTotalRawanVisits,
      nonRawanVisits: scopeTotalNonRawanVisits,
      totalVisits: scopeTotalVisits,
      aktivitasPct: scopeAktivitasPct,
      totalRawanBlocks: scopeTotalRawanBlocks,
      coveredRawanBlocks: scopeCoveredRawanBlocks,
      cakupanPct: scopeCakupanPct
    }
  };
}


// ============================================================================
// ROUTE EFFECTIVENESS (Efektivitas Koridor Rute) SELECTORS
// ============================================================================

export interface RouteEffectivenessKpis {
  // Jarak Patroli
  totalBaselineKm: number;
  totalActualKm: number;
  jarakPct: number | null;       // totalActual / totalBaseline * 100
  diffKm: number;                // totalActual - totalBaseline
  runCount: number;

  // Kesesuaian Rute
  totalInRouteKm: number;
  totalOutRouteKm: number;
  kesesuaianPct: number | null;  // totalInRoute / totalActual * 100
}

export function selectRouteEffectivenessKpis(filters: GlobalFilterState): RouteEffectivenessKpis {
  const runs = getFilteredPatrolRuns(filters);
  let totalBaseline = 0, totalActual = 0, totalInRoute = 0, totalOutRoute = 0;
  let runCount = 0;

  for (const r of runs) {
    const baseline = r.targetDistanceKm ?? 0;
    const actual = r.actualDistanceKm ?? 0;
    const inRoute = r.inRouteKm ?? 0;
    const outRoute = r.outOfRouteKm ?? 0;
    if (baseline <= 0 && actual <= 0) continue;
    totalBaseline += baseline;
    totalActual += actual;
    totalInRoute += inRoute;
    totalOutRoute += outRoute;
    runCount++;
  }

  const jarakPct = totalBaseline > 0 ? Math.round((totalActual / totalBaseline) * 1000) / 10 : null;
  const kesesuaianPct = totalActual > 0 ? Math.round((totalInRoute / totalActual) * 1000) / 10 : null;

  return {
    totalBaselineKm: totalBaseline,
    totalActualKm: totalActual,
    jarakPct,
    diffKm: Math.round((totalActual - totalBaseline) * 100) / 100,
    runCount,
    totalInRouteKm: totalInRoute,
    totalOutRouteKm: totalOutRoute,
    kesesuaianPct
  };
}

export interface RouteComparisonCategoryItem {
  id: string;
  label: string;
  baselineKm: number;
  actualKm: number;
  jarakPct: number | null;
  inRouteKm: number;
  outRouteKm: number;
  kesesuaianPct: number | null;
  diffKm: number;
  runCount: number;
}

export interface RouteComparisonResult {
  groupingType: 'Estate' | 'Vehicle' | 'Region';
  categories: RouteComparisonCategoryItem[];
}

export function selectRouteComparison(filters: GlobalFilterState): RouteComparisonResult {
  const runs = getFilteredPatrolRuns(filters);
  const estates = getFilteredEstates(filters);

  let groupingType: 'Estate' | 'Vehicle' | 'Region' = 'Estate';
  if (filters.estate && filters.estate !== 'ALL') {
    groupingType = 'Vehicle';
  } else if ((!filters.region || filters.region === 'ALL') && (!filters.estate || filters.estate === 'ALL')) {
    groupingType = 'Region';
  }

  const buckets = new Map<string, { label: string; baseline: number; actual: number; inRoute: number; outRoute: number; count: number }>();

  for (const r of runs) {
    const baseline = r.targetDistanceKm ?? 0;
    const actual = r.actualDistanceKm ?? 0;
    const inRoute = r.inRouteKm ?? 0;
    const outRoute = r.outOfRouteKm ?? 0;
    if (baseline <= 0 && actual <= 0) continue;

    let key: string;
    let label: string;
    if (groupingType === 'Vehicle') {
      key = r.vehicleId;
      const veh = MOCK_VEHICLES.find((v: VehicleEntity) => v.id === r.vehicleId);
      label = veh ? veh.nopol : r.vehicleId;
    } else if (groupingType === 'Region') {
      const est = estates.find(e => e.id === r.estateId);
      key = est?.regionId || 'OTHER';
      label = key;
    } else {
      key = r.estateId;
      label = r.estateId;
    }

    const b = buckets.get(key) || { label, baseline: 0, actual: 0, inRoute: 0, outRoute: 0, count: 0 };
    b.baseline += baseline;
    b.actual += actual;
    b.inRoute += inRoute;
    b.outRoute += outRoute;
    b.count++;
    buckets.set(key, b);
  }

  const categories: RouteComparisonCategoryItem[] = [];
  for (const [id, b] of buckets.entries()) {
    categories.push({
      id,
      label: b.label,
      baselineKm: Math.round(b.baseline * 100) / 100,
      actualKm: Math.round(b.actual * 100) / 100,
      jarakPct: b.baseline > 0 ? Math.round((b.actual / b.baseline) * 1000) / 10 : null,
      inRouteKm: Math.round(b.inRoute * 100) / 100,
      outRouteKm: Math.round(b.outRoute * 100) / 100,
      kesesuaianPct: b.actual > 0 ? Math.round((b.inRoute / b.actual) * 1000) / 10 : null,
      diffKm: Math.round((b.actual - b.baseline) * 100) / 100,
      runCount: b.count
    });
  }

  categories.sort((a, b) => (a.jarakPct ?? 0) - (b.jarakPct ?? 0));

  return { groupingType, categories };
}

export interface RouteTrendMonthCell {
  yearMonth: string;
  label: string;
  baselineKm: number;
  actualKm: number;
  jarakPct: number | null;
  inRouteKm: number;
  outRouteKm: number;
  kesesuaianPct: number | null;
  runCount: number;
  isPartial?: boolean;
}

export interface RouteTrendRow {
  entityId: string;
  entityLabel: string;
  months: RouteTrendMonthCell[];
  totalBaselineKm: number;
  totalActualKm: number;
  totalJarakPct: number | null;
  totalInRouteKm: number;
  totalOutRouteKm: number;
  totalKesesuaianPct: number | null;
  totalRunCount: number;
}

export interface RouteTrendResult {
  breakdownType: 'Estate' | 'Vehicle' | 'Region';
  headers: { yearMonth: string; label: string; isPartial?: boolean }[];
  rows: RouteTrendRow[];
  monthlyScopeAggregates: RouteTrendMonthCell[];
  overallScopeAggregate: {
    baselineKm: number;
    actualKm: number;
    jarakPct: number | null;
    inRouteKm: number;
    outRouteKm: number;
    kesesuaianPct: number | null;
    runCount: number;
  };
}

export function selectRouteTrendTable(filters: GlobalFilterState): RouteTrendResult {
  const windowMonths = get6MonthTrendWindow(
    filters.year || '2026',
    filters.month || 'May',
    filters.endDate
  );

  const estates = getFilteredEstates(filters);
  const allowedEstateIds = new Set(estates.map(e => e.id));
  const allowedVehicleIds = new Set(getFilteredVehicles(filters).map(v => v.id));

  let breakdownType: 'Estate' | 'Vehicle' | 'Region' = 'Estate';
  if (filters.estate && filters.estate !== 'ALL') {
    breakdownType = 'Vehicle';
  } else if ((!filters.region || filters.region === 'ALL') && (!filters.estate || filters.estate === 'ALL')) {
    breakdownType = 'Region';
  }

  // Collect all runs across the 6-month window
  const allRuns = MOCK_PATROL_RUNS.filter(run => {
    if (!allowedEstateIds.has(run.estateId)) return false;
    if (!allowedVehicleIds.has(run.vehicleId)) return false;
    const ym = run.date.substring(0, 7);
    return windowMonths.some(wm => wm.yearMonth === ym);
  });

  // Build per-entity per-month buckets
  type Bucket = { baseline: number; actual: number; inRoute: number; outRoute: number; count: number };
  const entityMonthMap = new Map<string, { label: string; months: Map<string, Bucket> }>();

  for (const r of allRuns) {
    const baseline = r.targetDistanceKm ?? 0;
    const actual = r.actualDistanceKm ?? 0;
    const inRoute = r.inRouteKm ?? 0;
    const outRoute = r.outOfRouteKm ?? 0;
    if (baseline <= 0 && actual <= 0) continue;

    let entityKey: string;
    let entityLabel: string;
    if (breakdownType === 'Vehicle') {
      entityKey = r.vehicleId;
      const veh = MOCK_VEHICLES.find((v: VehicleEntity) => v.id === r.vehicleId);
      entityLabel = veh ? veh.nopol : r.vehicleId;
    } else if (breakdownType === 'Region') {
      const est = estates.find(e => e.id === r.estateId);
      entityKey = est?.regionId || 'OTHER';
      entityLabel = entityKey;
    } else {
      entityKey = r.estateId;
      entityLabel = r.estateId;
    }

    const ym = r.date.substring(0, 7);
    let entityEntry = entityMonthMap.get(entityKey);
    if (!entityEntry) {
      entityEntry = { label: entityLabel, months: new Map() };
      entityMonthMap.set(entityKey, entityEntry);
    }
    let bucket = entityEntry.months.get(ym);
    if (!bucket) {
      bucket = { baseline: 0, actual: 0, inRoute: 0, outRoute: 0, count: 0 };
      entityEntry.months.set(ym, bucket);
    }
    bucket.baseline += baseline;
    bucket.actual += actual;
    bucket.inRoute += inRoute;
    bucket.outRoute += outRoute;
    bucket.count++;
  }

  // Build headers
  const headers = windowMonths.map(wm => ({
    yearMonth: wm.yearMonth,
    label: wm.label,
    isPartial: wm.isPartialMonth
  }));

  // Build rows
  const rows: RouteTrendRow[] = [];
  for (const [entityId, entry] of entityMonthMap.entries()) {
    const months: RouteTrendMonthCell[] = windowMonths.map(wm => {
      const b = entry.months.get(wm.yearMonth) || { baseline: 0, actual: 0, inRoute: 0, outRoute: 0, count: 0 };
      return {
        yearMonth: wm.yearMonth,
        label: wm.label,
        baselineKm: Math.round(b.baseline * 100) / 100,
        actualKm: Math.round(b.actual * 100) / 100,
        jarakPct: b.baseline > 0 ? Math.round((b.actual / b.baseline) * 1000) / 10 : null,
        inRouteKm: Math.round(b.inRoute * 100) / 100,
        outRouteKm: Math.round(b.outRoute * 100) / 100,
        kesesuaianPct: b.actual > 0 ? Math.round((b.inRoute / b.actual) * 1000) / 10 : null,
        runCount: b.count,
        isPartial: wm.isPartialMonth
      };
    });

    let tb = 0, ta = 0, ti = 0, to2 = 0, tc = 0;
    for (const m of months) { tb += m.baselineKm; ta += m.actualKm; ti += m.inRouteKm; to2 += m.outRouteKm; tc += m.runCount; }

    rows.push({
      entityId,
      entityLabel: entry.label,
      months,
      totalBaselineKm: Math.round(tb * 100) / 100,
      totalActualKm: Math.round(ta * 100) / 100,
      totalJarakPct: tb > 0 ? Math.round((ta / tb) * 1000) / 10 : null,
      totalInRouteKm: Math.round(ti * 100) / 100,
      totalOutRouteKm: Math.round(to2 * 100) / 100,
      totalKesesuaianPct: ta > 0 ? Math.round((ti / ta) * 1000) / 10 : null,
      totalRunCount: tc
    });
  }

  // Monthly scope aggregates
  const monthlyScopeAggregates: RouteTrendMonthCell[] = windowMonths.map(wm => {
    let sb = 0, sa = 0, si = 0, so = 0, sc = 0;
    for (const row of rows) {
      const mc = row.months.find(m => m.yearMonth === wm.yearMonth);
      if (mc) { sb += mc.baselineKm; sa += mc.actualKm; si += mc.inRouteKm; so += mc.outRouteKm; sc += mc.runCount; }
    }
    return {
      yearMonth: wm.yearMonth,
      label: wm.label,
      baselineKm: Math.round(sb * 100) / 100,
      actualKm: Math.round(sa * 100) / 100,
      jarakPct: sb > 0 ? Math.round((sa / sb) * 1000) / 10 : null,
      inRouteKm: Math.round(si * 100) / 100,
      outRouteKm: Math.round(so * 100) / 100,
      kesesuaianPct: sa > 0 ? Math.round((si / sa) * 1000) / 10 : null,
      runCount: sc,
      isPartial: wm.isPartialMonth
    };
  });

  // Overall scope aggregate
  let osb = 0, osa = 0, osi = 0, oso = 0, osc = 0;
  for (const agg of monthlyScopeAggregates) { osb += agg.baselineKm; osa += agg.actualKm; osi += agg.inRouteKm; oso += agg.outRouteKm; osc += agg.runCount; }

  return {
    breakdownType,
    headers,
    rows,
    monthlyScopeAggregates,
    overallScopeAggregate: {
      baselineKm: Math.round(osb * 100) / 100,
      actualKm: Math.round(osa * 100) / 100,
      jarakPct: osb > 0 ? Math.round((osa / osb) * 1000) / 10 : null,
      inRouteKm: Math.round(osi * 100) / 100,
      outRouteKm: Math.round(oso * 100) / 100,
      kesesuaianPct: osa > 0 ? Math.round((osi / osa) * 1000) / 10 : null,
      runCount: osc
    }
  };
}

export interface RouteDailyDetailRow {
  id: string;
  date: string;
  estateId: string;
  vehicleId: string;
  nopol: string;
  vehicleType: 'Car' | 'Motorcycle';
  baselineKm: number;
  actualKm: number;
  jarakPct: number | null;
  inRouteKm: number;
  outRouteKm: number;
  unclassifiedKm: number;
  kesesuaianPct: number | null;
  diffKm: number;
  gpsQuality: string;
}

export function selectRouteDailyDetail(
  filters: GlobalFilterState,
  entityFilter?: string,
  entityType?: 'Estate' | 'Vehicle' | 'Region'
): RouteDailyDetailRow[] {
  const runs = getFilteredPatrolRuns(filters);
  const estates = getFilteredEstates(filters);

  // Filter runs by entity
  const filteredRuns = runs.filter(r => {
    if (!entityFilter || entityFilter === 'ALL') return true;
    if (entityType === 'Vehicle') return r.vehicleId === entityFilter;
    if (entityType === 'Region') {
      const est = estates.find(e => e.id === r.estateId);
      return est?.regionId === entityFilter;
    }
    return r.estateId === entityFilter;
  });

  // Aggregate by (date, vehicleId)
  const map = new Map<string, {
    date: string;
    estateId: string;
    vehicleId: string;
    baseline: number;
    actual: number;
    inRoute: number;
    outRoute: number;
    unclassified: number;
    gpsQualities: string[];
  }>();

  for (const r of filteredRuns) {
    const key = `${r.date}__${r.vehicleId}`;
    const baseline = r.targetDistanceKm ?? 0;
    const actual = r.actualDistanceKm ?? 0;
    const inRoute = r.inRouteKm ?? 0;
    const outRoute = r.outOfRouteKm ?? 0;
    const unclassified = r.unclassifiedKm ?? 0;

    let entry = map.get(key);
    if (!entry) {
      entry = {
        date: r.date,
        estateId: r.estateId,
        vehicleId: r.vehicleId,
        baseline: 0,
        actual: 0,
        inRoute: 0,
        outRoute: 0,
        unclassified: 0,
        gpsQualities: []
      };
      map.set(key, entry);
    }
    entry.baseline += baseline;
    entry.actual += actual;
    entry.inRoute += inRoute;
    entry.outRoute += outRoute;
    entry.unclassified += unclassified;
    if (r.gpsTraceQuality && !entry.gpsQualities.includes(r.gpsTraceQuality)) {
      entry.gpsQualities.push(r.gpsTraceQuality);
    }
  }

  const result: RouteDailyDetailRow[] = [];
  for (const [key, entry] of map.entries()) {
    const veh = MOCK_VEHICLES.find((v: VehicleEntity) => v.id === entry.vehicleId);
    const baseline = Math.round(entry.baseline * 100) / 100;
    const actual = Math.round(entry.actual * 100) / 100;
    const inRoute = Math.round(entry.inRoute * 100) / 100;
    const outRoute = Math.round(entry.outRoute * 100) / 100;
    const unclassified = Math.round(entry.unclassified * 100) / 100;
    const diffKm = Math.round((actual - baseline) * 100) / 100;

    const jarakPct = baseline > 0 ? Math.round((actual / baseline) * 1000) / 10 : null;
    const kesesuaianPct = actual > 0 ? Math.round((inRoute / actual) * 1000) / 10 : null;

    let gpsQuality = 'Good';
    if (entry.gpsQualities.includes('Missing')) gpsQuality = 'Missing';
    else if (entry.gpsQualities.includes('Degraded')) gpsQuality = 'Degraded';

    result.push({
      id: key,
      date: entry.date,
      estateId: entry.estateId,
      vehicleId: entry.vehicleId,
      nopol: veh?.nopol || entry.vehicleId,
      vehicleType: veh?.vehicleType || 'Car',
      baselineKm: baseline,
      actualKm: actual,
      jarakPct,
      inRouteKm: inRoute,
      outRouteKm: outRoute,
      unclassifiedKm: unclassified,
      kesesuaianPct,
      diffKm,
      gpsQuality
    });
  }

  return result.sort((a, b) => b.date.localeCompare(a.date) || a.estateId.localeCompare(b.estateId));
}

// ── UTILISASI KENDARAAN & GPS SELECTORS ──────────────────────────────────────

export interface UtilizationStatusUnitResult {
  inventory: {
    totalVehicles: number;
    mobilCount: number;
    motorCount: number;
  };
  periodStatus: {
    totalVehicleDays: number;
    aktifCount: number;
    unitRusakCount: number;
    gpsRusakCount: number;
    belumDikirimCount: number;
    aktifPct: number;
    unitRusakPct: number;
    gpsRusakPct: number;
    belumDikirimPct: number;
  };
  summaryTableRows: Array<{
    id: string;
    label: string;
    type: 'Geographic' | 'Vehicle';
    vehicleType?: 'Car' | 'Motorcycle';
    mobilCount: number;
    motorCount: number;
    totalCount: number;
    aktifCount: number;
    unitRusakCount: number;
    gpsRusakCount: number;
    belumDikirimCount: number;
    totalVehicleDays: number;
    aktifPct: number;
    unitRusakPct: number;
    gpsRusakPct: number;
    belumDikirimPct: number;
  }>;
  calendarDays: Array<{
    date: string;
    dayNum: number;
    isCurrentMonth: boolean;
    isFuture: boolean;
    isDisabled: boolean;
    counts: {
      aktif: number;
      unitRusak: number;
      gpsRusak: number;
      belumDikirim: number;
    };
    vehicleDetails: Array<{
      vehicleId: string;
      nopol: string;
      estateId: string;
      vehicleType: 'Car' | 'Motorcycle';
      status: 'Aktif' | 'Unit Rusak' | 'GPS Rusak' | 'Belum Dikirim';
    }>;
  }>;
}

export function selectUtilizationStatusUnit(filters: GlobalFilterState): UtilizationStatusUnitResult {
  const filteredVehicles = getFilteredVehicles(filters);
  const estates = getFilteredEstates(filters);

  const totalVehicles = filteredVehicles.length;
  const mobilCount = filteredVehicles.filter(v => v.vehicleType === 'Car').length;
  const motorCount = filteredVehicles.filter(v => v.vehicleType === 'Motorcycle').length;

  const monthInfo = normalizeMonth(filters.month);
  const year = filters.year || '2026';
  const monthNum = monthInfo.num;
  const daysInMonth = monthInfo.days;

  // Range determination
  let startDay = 1;
  let endDay = daysInMonth;
  if (filters.startDate && filters.endDate) {
    const s = filters.startDate.split('-');
    const e = filters.endDate.split('-');
    if (s.length === 3 && e.length === 3 && s[0] === year && s[1] === monthNum) {
      startDay = parseInt(s[2], 10);
      endDay = parseInt(e[2], 10);
    }
  }

  // Pre-fetch reports indexed by `${date}__${vehicleId}`
  const allReports = MOCK_PATROL_REPORTS;
  const reportMap = new Map<string, PatrolReportRecord>();
  for (const r of allReports) {
    reportMap.set(`${r.date}__${r.vehicleId}`, r);
  }

  let totalVehicleDays = 0;
  let aktifCount = 0;
  let unitRusakCount = 0;
  let gpsRusakCount = 0;
  let belumDikirimCount = 0;

  // Build calendar days
  const calendarDays: UtilizationStatusUnitResult['calendarDays'] = [];
  const todayStr = '2026-05-31';

  for (let d = 1; d <= daysInMonth; d++) {
    const dayStr = d < 10 ? `0${d}` : `${d}`;
    const dateStr = `${year}-${monthNum}-${dayStr}`;
    const isFuture = dateStr > todayStr;
    const isDisabled = d < startDay || d > endDay;

    let dayAktif = 0;
    let dayUnitRusak = 0;
    let dayGpsRusak = 0;
    let dayBelumDikirim = 0;

    const vehicleDetails: UtilizationStatusUnitResult['calendarDays'][0]['vehicleDetails'] = [];

    for (const veh of filteredVehicles) {
      if (!isFuture && !isDisabled) {
        totalVehicleDays++;
      }

      const rep = reportMap.get(`${dateStr}__${veh.id}`);
      let status: 'Aktif' | 'Unit Rusak' | 'GPS Rusak' | 'Belum Dikirim' = 'Belum Dikirim';

      if (rep && rep.submissionStatus === 'Sudah Dikirim') {
        if (rep.reportType === 'Unit Rusak') status = 'Unit Rusak';
        else if (rep.reportType === 'GPS Rusak') status = 'GPS Rusak';
        else status = 'Aktif';
      } else {
        status = 'Belum Dikirim';
      }

      if (!isFuture && !isDisabled) {
        if (status === 'Aktif') { aktifCount++; dayAktif++; }
        else if (status === 'Unit Rusak') { unitRusakCount++; dayUnitRusak++; }
        else if (status === 'GPS Rusak') { gpsRusakCount++; dayGpsRusak++; }
        else { belumDikirimCount++; dayBelumDikirim++; }
      }

      vehicleDetails.push({
        vehicleId: veh.id,
        nopol: veh.nopol,
        estateId: veh.estateId,
        vehicleType: veh.vehicleType,
        status
      });
    }

    calendarDays.push({
      date: dateStr,
      dayNum: d,
      isCurrentMonth: true,
      isFuture,
      isDisabled,
      counts: {
        aktif: dayAktif,
        unitRusak: dayUnitRusak,
        gpsRusak: dayGpsRusak,
        belumDikirim: dayBelumDikirim
      },
      vehicleDetails
    });
  }

  const denom = totalVehicleDays || 1;
  const aktifPct = Math.round((aktifCount / denom) * 1000) / 10;
  const unitRusakPct = Math.round((unitRusakCount / denom) * 1000) / 10;
  const gpsRusakPct = Math.round((gpsRusakCount / denom) * 1000) / 10;
  const belumDikirimPct = Math.round((100 - (aktifPct + unitRusakPct + gpsRusakPct)) * 10) / 10;

  // Summary table rows
  let groupingType: 'PSM' | 'Region' | 'Estate' | 'Vehicle' = 'PSM';
  if (filters.estate && filters.estate !== 'ALL') groupingType = 'Vehicle';
  else if (filters.region && filters.region !== 'ALL') groupingType = 'Estate';
  else if (filters.psm && filters.psm !== 'ALL') groupingType = 'Region';

  const summaryTableRows: UtilizationStatusUnitResult['summaryTableRows'] = [];

  if (groupingType === 'Vehicle') {
    for (const veh of filteredVehicles) {
      let vAktif = 0, vUnitRusak = 0, vGpsRusak = 0, vBelum = 0, vTotalDays = 0;
      for (let d = startDay; d <= endDay; d++) {
        const dayStr = d < 10 ? `0${d}` : `${d}`;
        const dateStr = `${year}-${monthNum}-${dayStr}`;
        if (dateStr > todayStr) continue;

        vTotalDays++;
        const rep = reportMap.get(`${dateStr}__${veh.id}`);
        if (rep && rep.submissionStatus === 'Sudah Dikirim') {
          if (rep.reportType === 'Unit Rusak') vUnitRusak++;
          else if (rep.reportType === 'GPS Rusak') vGpsRusak++;
          else vAktif++;
        } else {
          vBelum++;
        }
      }
      const vDenom = vTotalDays || 1;
      summaryTableRows.push({
        id: veh.id,
        label: veh.nopol,
        type: 'Vehicle',
        vehicleType: veh.vehicleType,
        mobilCount: veh.vehicleType === 'Car' ? 1 : 0,
        motorCount: veh.vehicleType === 'Motorcycle' ? 1 : 0,
        totalCount: 1,
        aktifCount: vAktif,
        unitRusakCount: vUnitRusak,
        gpsRusakCount: vGpsRusak,
        belumDikirimCount: vBelum,
        totalVehicleDays: vTotalDays,
        aktifPct: Math.round((vAktif / vDenom) * 1000) / 10,
        unitRusakPct: Math.round((vUnitRusak / vDenom) * 1000) / 10,
        gpsRusakPct: Math.round((vGpsRusak / vDenom) * 1000) / 10,
        belumDikirimPct: Math.round((vBelum / vDenom) * 1000) / 10,
      });
    }
  } else {
    // Geographic grouping
    const buckets = new Map<string, { label: string; vehicles: VehicleEntity[] }>();
    for (const veh of filteredVehicles) {
      const est = estates.find(e => e.id === veh.estateId);
      let key: string = veh.estateId;
      let label: string = veh.estateId;

      if (groupingType === 'PSM') {
        key = est?.psmId || 'PSM A';
        label = key;
      } else if (groupingType === 'Region') {
        key = est?.regionId || 'REGION';
        label = key;
      }

      let b = buckets.get(key);
      if (!b) {
        b = { label, vehicles: [] };
        buckets.set(key, b);
      }
      b.vehicles.push(veh);
    }

    for (const [key, b] of buckets.entries()) {
      let gAktif = 0, gUnitRusak = 0, gGpsRusak = 0, gBelum = 0, gTotalDays = 0;
      const gMobil = b.vehicles.filter(v => v.vehicleType === 'Car').length;
      const gMotor = b.vehicles.filter(v => v.vehicleType === 'Motorcycle').length;

      for (const veh of b.vehicles) {
        for (let d = startDay; d <= endDay; d++) {
          const dayStr = d < 10 ? `0${d}` : `${d}`;
          const dateStr = `${year}-${monthNum}-${dayStr}`;
          if (dateStr > todayStr) continue;

          gTotalDays++;
          const rep = reportMap.get(`${dateStr}__${veh.id}`);
          if (rep && rep.submissionStatus === 'Sudah Dikirim') {
            if (rep.reportType === 'Unit Rusak') gUnitRusak++;
            else if (rep.reportType === 'GPS Rusak') gGpsRusak++;
            else gAktif++;
          } else {
            gBelum++;
          }
        }
      }

      const gDenom = gTotalDays || 1;
      summaryTableRows.push({
        id: key,
        label: b.label,
        type: 'Geographic',
        mobilCount: gMobil,
        motorCount: gMotor,
        totalCount: b.vehicles.length,
        aktifCount: gAktif,
        unitRusakCount: gUnitRusak,
        gpsRusakCount: gGpsRusak,
        belumDikirimCount: gBelum,
        totalVehicleDays: gTotalDays,
        aktifPct: Math.round((gAktif / gDenom) * 1000) / 10,
        unitRusakPct: Math.round((gUnitRusak / gDenom) * 1000) / 10,
        gpsRusakPct: Math.round((gGpsRusak / gDenom) * 1000) / 10,
        belumDikirimPct: Math.round((gBelum / gDenom) * 1000) / 10,
      });
    }
  }

  return {
    inventory: { totalVehicles, mobilCount, motorCount },
    periodStatus: {
      totalVehicleDays,
      aktifCount,
      unitRusakCount,
      gpsRusakCount,
      belumDikirimCount,
      aktifPct,
      unitRusakPct,
      gpsRusakPct,
      belumDikirimPct
    },
    summaryTableRows,
    calendarDays
  };
}

// Selector for Progres Perbaikan Cases
export interface RepairCaseItem {
  id: string;
  category: 'Kendaraan' | 'GPS';
  vehicleId: string;
  nopol: string;
  estateId: string;
  startDate: string;
  lastStatus: string;
  lastUpdateDate: string;
  ageDays: number;
  isCompleted: boolean;
  history: Array<{ date: string; stage: string; note?: string }>;
}

export function selectUtilizationRepairs(filters: GlobalFilterState): {
  openCasesCount: number;
  affectedVehiclesCount: number;
  oldestOpenCaseAgeDays: number;
  priorOpenCasesCount: number;
  cases: RepairCaseItem[];
} {
  const filteredVehicles = getFilteredVehicles(filters);
  const vehicleSet = new Set(filteredVehicles.map(v => v.id));

  // Realistic repair case fixtures
  const allCases: RepairCaseItem[] = [
    {
      id: 'REP-VEH-01',
      category: 'Kendaraan',
      vehicleId: 'V-KULE-01',
      nopol: 'BM 8421 QA',
      estateId: 'Estate B',
      startDate: '2026-05-12',
      lastStatus: 'Menunggu Sparepart',
      lastUpdateDate: '2026-05-13',
      ageDays: 19,
      isCompleted: false,
      history: [
        { date: '2026-05-12', stage: 'Pelaporan Kerusakan', note: 'Mesin tidak dapat dinyalakan / overheat' },
        { date: '2026-05-12', stage: 'Pemeriksaan Bengkel', note: 'Kerusakan pada radiator dan gasket' },
        { date: '2026-05-13', stage: 'Menunggu Sparepart', note: 'Inden gasket kit resmi dari distributor' }
      ]
    },
    {
      id: 'REP-VEH-02',
      category: 'Kendaraan',
      vehicleId: 'V-LPYE-02',
      nopol: 'BM 2002 CB',
      estateId: 'Estate C',
      startDate: '2026-05-18',
      lastStatus: 'Dalam Perbaikan',
      lastUpdateDate: '2026-05-25',
      ageDays: 13,
      isCompleted: false,
      history: [
        { date: '2026-05-18', stage: 'Pelaporan Kerusakan', note: 'Rantai motor putus & shock belakang bocor' },
        { date: '2026-05-19', stage: 'Pemeriksaan Bengkel', note: 'Diperlukan pergantian set rantai dan per shock' },
        { date: '2026-05-22', stage: 'Barang Diterima', note: 'Sparepart diterima dari logistik central' },
        { date: '2026-05-25', stage: 'Dalam Perbaikan', note: 'Proses pemasangan di bengkel kebun' }
      ]
    },
    {
      id: 'REP-VEH-03',
      category: 'Kendaraan',
      vehicleId: 'V-NRME-01',
      nopol: 'BM 1003 DA',
      estateId: 'Estate D',
      startDate: '2026-04-28',
      lastStatus: 'Menunggu Kedatangan Barang',
      lastUpdateDate: '2026-05-10',
      ageDays: 33,
      isCompleted: false,
      history: [
        { date: '2026-04-28', stage: 'Pelaporan Kerusakan', note: 'Transmisi terputus / kendala gardan' },
        { date: '2026-04-30', stage: 'Pemeriksaan Bengkel', note: 'Perlu penggantian komponen gardan utama' },
        { date: '2026-05-10', stage: 'Menunggu Kedatangan Barang', note: 'Pengiriman dari Medan dalam perjalanan' }
      ]
    },
    {
      id: 'REP-VEH-04',
      category: 'Kendaraan',
      vehicleId: 'V-ADPE-02',
      nopol: 'BM 2000 AB',
      estateId: 'Estate A',
      startDate: '2026-05-02',
      lastStatus: 'Selesai',
      lastUpdateDate: '2026-05-08',
      ageDays: 6,
      isCompleted: true,
      history: [
        { date: '2026-05-02', stage: 'Pelaporan Kerusakan', note: 'Ban bocor halus & aki aus' },
        { date: '2026-05-04', stage: 'Perbaikan Internal / Eksternal', note: 'Pergantian aki dan tambal ban' },
        { date: '2026-05-08', stage: 'Selesai', note: 'Unit telah diuji dan kembali beroperasi normal' }
      ]
    },
    {
      id: 'REP-GPS-01',
      category: 'GPS',
      vehicleId: 'V-KULE-02',
      nopol: 'BM 9102 QB',
      estateId: 'Estate B',
      startDate: '2026-05-14',
      lastStatus: 'Sedang dalam pengiriman dari vendor ke estate',
      lastUpdateDate: '2026-05-22',
      ageDays: 17,
      isCompleted: false,
      history: [
        { date: '2026-05-14', stage: 'Koordinasi SRMD', note: 'Sudah dikoordinasikan dengan tim SRMD' },
        { date: '2026-05-17', stage: 'Perbaikan Vendor', note: 'Sedang dalam perbaikan vendor GPS' },
        { date: '2026-05-22', stage: 'Pengiriman Vendor', note: 'Sedang dalam pengiriman dari vendor ke estate' }
      ]
    },
    {
      id: 'REP-GPS-02',
      category: 'GPS',
      vehicleId: 'V-PBNE-01',
      nopol: 'BM 1004 AA',
      estateId: 'Estate E',
      startDate: '2026-05-20',
      lastStatus: 'Menunggu pemasangan',
      lastUpdateDate: '2026-05-26',
      ageDays: 11,
      isCompleted: false,
      history: [
        { date: '2026-05-20', stage: 'Koordinasi SRMD', note: 'Sinyal modul telemetri hilang total' },
        { date: '2026-05-24', stage: 'Penerimaan Modul', note: 'Modul pengganti tiba di kebun' },
        { date: '2026-05-26', stage: 'Menunggu Pemasangan', note: 'Menunggu pemasangan oleh teknisi IT kebun' }
      ]
    },
    {
      id: 'REP-GPS-03',
      category: 'GPS',
      vehicleId: 'V-PHLE-02',
      nopol: 'BM 2005 BB',
      estateId: 'Estate F',
      startDate: '2026-05-01',
      lastStatus: 'Penggantian selesai',
      lastUpdateDate: '2026-05-06',
      ageDays: 5,
      isCompleted: true,
      history: [
        { date: '2026-05-01', stage: 'Koordinasi SRMD', note: 'Kabel power GPS putus' },
        { date: '2026-05-04', stage: 'Perbaikan Wiring', note: 'Perbaikan wiring harness GPS' },
        { date: '2026-05-06', stage: 'Selesai', note: 'Penggantian selesai, sinyal normal' }
      ]
    }
  ];

  const matchedCases = allCases.filter(c => vehicleSet.has(c.vehicleId));
  const openCases = matchedCases.filter(c => !c.isCompleted);

  const openVehicles = new Set(openCases.map(c => c.vehicleId));
  const oldestAge = openCases.reduce((max, c) => Math.max(max, c.ageDays), 0);

  const selectedPeriodStart = filters.startDate || '2026-05-01';
  const priorOpen = openCases.filter(c => c.startDate < selectedPeriodStart).length;

  return {
    openCasesCount: openCases.length,
    affectedVehiclesCount: openVehicles.size,
    oldestOpenCaseAgeDays: oldestAge,
    priorOpenCasesCount: priorOpen,
    cases: matchedCases
  };
}

export interface UtilizationOperationalTimeResult {
  hasData: boolean;
  totalActiveVehicleDays: number;
  totalMovingHours: number;
  totalStoppedHours: number;
  avgMovingHours: number | null;
  avgStoppedHours: number | null;
  movingSharePct: number | null;
  stoppedSharePct: number | null;
  lowestMoving: { val: number | null; nopol: string; date: string; estateId: string };
  highestMoving: { val: number | null; nopol: string; date: string; estateId: string };
  comparisonBars: Array<{
    id: string;
    label: string;
    vehicleType?: 'Car' | 'Motorcycle';
    activeDays: number;
    avgMovingHours: number | null;
    avgStoppedHours: number | null;
    movingPct: number | null;
    stoppedPct: number | null;
    totalMovingHours: number;
    totalStoppedHours: number;
  }>;
  trendBars: Array<{
    date: string;
    label: string;
    activeDays: number;
    avgMovingHours: number | null;
    avgStoppedHours: number | null;
    movingPct: number | null;
    stoppedPct: number | null;
    totalMovingHours: number;
    totalStoppedHours: number;
  }>;
  summaryTableRows: Array<{
    id: string;
    label: string;
    type: 'Geographic' | 'Vehicle';
    vehicleType?: 'Car' | 'Motorcycle';
    activeDays: number;
    avgMovingHours: number | null;
    avgStoppedHours: number | null;
    movingPct: number | null;
    stoppedPct: number | null;
    totalMovingHours: number;
    totalStoppedHours: number;
  }>;
  dailyDetailRows: Array<{
    id: string;
    date: string;
    estateId: string;
    vehicleId: string;
    nopol: string;
    vehicleType: 'Car' | 'Motorcycle';
    movingHours: number;
    stoppedHours: number;
    movingPct: number;
    stoppedPct: number;
  }>;
}

export function selectUtilizationOperationalTime(filters: GlobalFilterState): UtilizationOperationalTimeResult {
  const filteredVehicles = getFilteredVehicles(filters);
  const estates = getFilteredEstates(filters);

  const monthInfo = normalizeMonth(filters.month);
  const year = filters.year || '2026';
  const monthNum = monthInfo.num;
  const daysInMonth = monthInfo.days;

  let startDay = 1;
  let endDay = daysInMonth;
  if (filters.startDate && filters.endDate) {
    const s = filters.startDate.split('-');
    const e = filters.endDate.split('-');
    if (s.length === 3 && e.length === 3 && s[0] === year && s[1] === monthNum) {
      startDay = parseInt(s[2], 10);
      endDay = parseInt(e[2], 10);
    }
  }

  const todayStr = '2026-05-31';

  // Build report map
  const reportMap = new Map<string, PatrolReportRecord>();
  for (const r of MOCK_PATROL_REPORTS) {
    reportMap.set(`${r.date}__${r.vehicleId}`, r);
  }

  // Build run map (moving time in minutes)
  const runMap = new Map<string, number>();
  for (const r of MOCK_PATROL_RUNS) {
    const key = `${r.date}__${r.vehicleId}`;
    const curr = runMap.get(key) || 0;
    runMap.set(key, curr + (r.movingTimeMinutes || 0));
  }

  // Collect ONLY eligible active daily records
  const activeRecords: Array<{
    date: string;
    vehicleId: string;
    nopol: string;
    estateId: string;
    vehicleType: 'Car' | 'Motorcycle';
    movingSeconds: number;
    stoppedSeconds: number;
    movingHours: number;
    stoppedHours: number;
    movingPct: number;
    stoppedPct: number;
  }> = [];

  for (let d = startDay; d <= endDay; d++) {
    const dayStr = d < 10 ? `0${d}` : `${d}`;
    const dateStr = `${year}-${monthNum}-${dayStr}`;
    if (dateStr > todayStr) continue;

    for (const veh of filteredVehicles) {
      const rep = reportMap.get(`${dateStr}__${veh.id}`);
      
      // ELIGIBILITY CHECK: Must be submitted report of type Normal or Urgent (i.e. Aktif)
      const isAktif = rep && rep.submissionStatus === 'Sudah Dikirim' && (rep.reportType === 'Normal' || rep.reportType === 'Urgent');
      if (!isAktif) {
        // EXCLUDE Unit Rusak, GPS Rusak, and Belum Dikirim entirely!
        continue;
      }

      const key = `${dateStr}__${veh.id}`;
      let movingMins = runMap.get(key);

      if (movingMins === undefined || movingMins < 900) {
        // Deterministic synthetic fallback moving time for active day (~15.2h to 18.8h)
        const hash = (veh.id.charCodeAt(0) * 17 + parseInt(dayStr, 10) * 31) % 216;
        movingMins = 912 + hash; // 912 mins (15.2h) to 1128 mins (18.8h)
      }

      let movingSec = movingMins * 60;
      if (movingSec < 0) movingSec = 0;
      if (movingSec > 86400) movingSec = 86400;

      const stoppedSec = 86400 - movingSec;

      const movingHours = Math.round((movingSec / 3600) * 10) / 10;
      // Guarantee movingHours + stoppedHours = 24.0
      const stoppedHours = Math.round((24.0 - movingHours) * 10) / 10;

      const movingPct = Math.round((movingSec / 86400) * 1000) / 10;
      // Guarantee movingPct + stoppedPct = 100.0
      const stoppedPct = Math.round((100.0 - movingPct) * 10) / 10;

      activeRecords.push({
        date: dateStr,
        vehicleId: veh.id,
        nopol: veh.nopol,
        estateId: veh.estateId,
        vehicleType: veh.vehicleType,
        movingSeconds: movingSec,
        stoppedSeconds: stoppedSec,
        movingHours,
        stoppedHours,
        movingPct,
        stoppedPct
      });
    }
  }

  const N = activeRecords.length;

  if (N === 0) {
    return {
      hasData: false,
      totalActiveVehicleDays: 0,
      totalMovingHours: 0,
      totalStoppedHours: 0,
      avgMovingHours: null,
      avgStoppedHours: null,
      movingSharePct: null,
      stoppedSharePct: null,
      lowestMoving: { val: null, nopol: '-', date: '-', estateId: '-' },
      highestMoving: { val: null, nopol: '-', date: '-', estateId: '-' },
      comparisonBars: [],
      trendBars: [],
      summaryTableRows: [],
      dailyDetailRows: []
    };
  }

  const totalMovingSec = activeRecords.reduce((sum, r) => sum + r.movingSeconds, 0);
  const totalStoppedSec = N * 86400 - totalMovingSec;

  const totalMovingHours = Math.round((totalMovingSec / 3600) * 10) / 10;
  const totalStoppedHours = Math.round((totalStoppedSec / 3600) * 10) / 10;

  const avgMovingHours = Math.round((totalMovingHours / N) * 10) / 10;
  const avgStoppedHours = Math.round((24.0 - avgMovingHours) * 10) / 10;

  const movingSharePct = Math.round((totalMovingSec / (N * 86400)) * 1000) / 10;
  const stoppedSharePct = Math.round((100.0 - movingSharePct) * 10) / 10;

  // Extrema
  let lowestMoving = { val: 999, nopol: '-', date: '-', estateId: '-' };
  let highestMoving = { val: -1, nopol: '-', date: '-', estateId: '-' };

  for (const r of activeRecords) {
    if (r.movingHours < lowestMoving.val) {
      lowestMoving = { val: r.movingHours, nopol: r.nopol, date: r.date, estateId: r.estateId };
    }
    if (r.movingHours > highestMoving.val) {
      highestMoving = { val: r.movingHours, nopol: r.nopol, date: r.date, estateId: r.estateId };
    }
  }
  if (lowestMoving.val === 999) lowestMoving.val = 0;
  if (highestMoving.val === -1) highestMoving.val = 0;

  // Grouping mode for comparison / summary table
  let groupingType: 'PSM' | 'Region' | 'Estate' | 'Vehicle' = 'PSM';
  if (filters.estate && filters.estate !== 'ALL') groupingType = 'Vehicle';
  else if (filters.region && filters.region !== 'ALL') groupingType = 'Estate';
  else if (filters.psm && filters.psm !== 'ALL') groupingType = 'Region';

  const summaryTableRows: UtilizationOperationalTimeResult['summaryTableRows'] = [];
  const comparisonBars: UtilizationOperationalTimeResult['comparisonBars'] = [];

  if (groupingType === 'Vehicle') {
    for (const veh of filteredVehicles) {
      const vehActive = activeRecords.filter(r => r.vehicleId === veh.id);
      const activeDays = vehActive.length;

      if (activeDays > 0) {
        const movSec = vehActive.reduce((s, r) => s + r.movingSeconds, 0);
        const stopSec = activeDays * 86400 - movSec;
        const totMovH = Math.round((movSec / 3600) * 10) / 10;
        const totStopH = Math.round((stopSec / 3600) * 10) / 10;
        const avgMovH = Math.round((totMovH / activeDays) * 10) / 10;
        const avgStopH = Math.round((24.0 - avgMovH) * 10) / 10;
        const movPct = Math.round((movSec / (activeDays * 86400)) * 1000) / 10;
        const stopPct = Math.round((100.0 - movPct) * 10) / 10;

        const rowItem = {
          id: veh.id,
          label: veh.nopol,
          type: 'Vehicle' as const,
          vehicleType: veh.vehicleType,
          activeDays,
          avgMovingHours: avgMovH,
          avgStoppedHours: avgStopH,
          movingPct: movPct,
          stoppedPct: stopPct,
          totalMovingHours: totMovH,
          totalStoppedHours: totStopH
        };
        summaryTableRows.push(rowItem);
        comparisonBars.push(rowItem);
      } else {
        const rowItem = {
          id: veh.id,
          label: veh.nopol,
          type: 'Vehicle' as const,
          vehicleType: veh.vehicleType,
          activeDays: 0,
          avgMovingHours: null,
          avgStoppedHours: null,
          movingPct: null,
          stoppedPct: null,
          totalMovingHours: 0,
          totalStoppedHours: 0
        };
        summaryTableRows.push(rowItem);
        comparisonBars.push(rowItem);
      }
    }
  } else {
    // Geographic grouping
    const buckets = new Map<string, { label: string; vehicles: VehicleEntity[] }>();
    for (const veh of filteredVehicles) {
      const est = estates.find(e => e.id === veh.estateId);
      let key = veh.estateId;
      let label = veh.estateId;
      if (groupingType === 'PSM') {
        key = est?.psmId || 'PSM A';
        label = key;
      } else if (groupingType === 'Region') {
        key = est?.regionId || 'REGION';
        label = key;
      }
      if (!buckets.has(key)) {
        buckets.set(key, { label, vehicles: [] });
      }
      buckets.get(key)!.vehicles.push(veh);
    }

    for (const [key, bucket] of buckets.entries()) {
      const vIds = new Set(bucket.vehicles.map(v => v.id));
      const groupActive = activeRecords.filter(r => vIds.has(r.vehicleId));
      const activeDays = groupActive.length;

      if (activeDays > 0) {
        const movSec = groupActive.reduce((s, r) => s + r.movingSeconds, 0);
        const stopSec = activeDays * 86400 - movSec;
        const totMovH = Math.round((movSec / 3600) * 10) / 10;
        const totStopH = Math.round((stopSec / 3600) * 10) / 10;
        const avgMovH = Math.round((totMovH / activeDays) * 10) / 10;
        const avgStopH = Math.round((24.0 - avgMovH) * 10) / 10;
        const movPct = Math.round((movSec / (activeDays * 86400)) * 1000) / 10;
        const stopPct = Math.round((100.0 - movPct) * 10) / 10;

        const rowItem = {
          id: key,
          label: bucket.label,
          type: 'Geographic' as const,
          activeDays,
          avgMovingHours: avgMovH,
          avgStoppedHours: avgStopH,
          movingPct: movPct,
          stoppedPct: stopPct,
          totalMovingHours: totMovH,
          totalStoppedHours: totStopH
        };
        summaryTableRows.push(rowItem);
        comparisonBars.push(rowItem);
      } else {
        const rowItem = {
          id: key,
          label: bucket.label,
          type: 'Geographic' as const,
          activeDays: 0,
          avgMovingHours: null,
          avgStoppedHours: null,
          movingPct: null,
          stoppedPct: null,
          totalMovingHours: 0,
          totalStoppedHours: 0
        };
        summaryTableRows.push(rowItem);
        comparisonBars.push(rowItem);
      }
    }
  }

  // Trend bars per date
  const trendBars: UtilizationOperationalTimeResult['trendBars'] = [];
  for (let d = startDay; d <= endDay; d++) {
    const dayStr = d < 10 ? `0${d}` : `${d}`;
    const dateStr = `${year}-${monthNum}-${dayStr}`;
    if (dateStr > todayStr) continue;

    const dateActive = activeRecords.filter(r => r.date === dateStr);
    const activeDays = dateActive.length;

    if (activeDays > 0) {
      const movSec = dateActive.reduce((s, r) => s + r.movingSeconds, 0);
      const stopSec = activeDays * 86400 - movSec;
      const totMovH = Math.round((movSec / 3600) * 10) / 10;
      const totStopH = Math.round((stopSec / 3600) * 10) / 10;
      const avgMovH = Math.round((totMovH / activeDays) * 10) / 10;
      const avgStopH = Math.round((24.0 - avgMovH) * 10) / 10;
      const movPct = Math.round((movSec / (activeDays * 86400)) * 1000) / 10;
      const stopPct = Math.round((100.0 - movPct) * 10) / 10;

      trendBars.push({
        date: dateStr,
        label: `${d} ${monthInfo.shortIndo}`,
        activeDays,
        avgMovingHours: avgMovH,
        avgStoppedHours: avgStopH,
        movingPct: movPct,
        stoppedPct: stopPct,
        totalMovingHours: totMovH,
        totalStoppedHours: totStopH
      });
    } else {
      trendBars.push({
        date: dateStr,
        label: `${d} ${monthInfo.shortIndo}`,
        activeDays: 0,
        avgMovingHours: null,
        avgStoppedHours: null,
        movingPct: null,
        stoppedPct: null,
        totalMovingHours: 0,
        totalStoppedHours: 0
      });
    }
  }

  // Daily Detail Rows sorted by date descending, then estateId, then nopol
  const dailyDetailRows: UtilizationOperationalTimeResult['dailyDetailRows'] = activeRecords
    .map(r => ({
      id: `${r.date}__${r.vehicleId}`,
      date: r.date,
      estateId: r.estateId,
      vehicleId: r.vehicleId,
      nopol: r.nopol,
      vehicleType: r.vehicleType,
      movingHours: r.movingHours,
      stoppedHours: r.stoppedHours,
      movingPct: r.movingPct,
      stoppedPct: r.stoppedPct
    }))
    .sort((a, b) => b.date.localeCompare(a.date) || a.estateId.localeCompare(b.estateId) || a.nopol.localeCompare(b.nopol));

  return {
    hasData: true,
    totalActiveVehicleDays: N,
    totalMovingHours,
    totalStoppedHours,
    avgMovingHours,
    avgStoppedHours,
    movingSharePct,
    stoppedSharePct,
    lowestMoving,
    highestMoving,
    comparisonBars,
    trendBars,
    summaryTableRows,
    dailyDetailRows
  };
}



