import { VULNERABLE_BLOCKS } from './vulnerable-blocks'

/**
 * Statistik demo — selaras peta:
 * - 4 blok rawan (D-48, D-39, E-60, D-55), hanya 2 yang dicek patroli
 * - 10 berhenti / 10 ke luar rute / 10 kecepatan
 * - Cakupan baseline rendah (~69%) karena patroli tidak menutup seluruh jalur
 */
export const VULN_BLOCK_COUNT = VULNERABLE_BLOCKS.length

export const PATROL_DEMO_STATS = {
  movingPct: 74,
  stopPct: 26,
  nonRawanPct: 59,
  vulnAreaPct: 41,
  blokRawan: {
    uncheckedCount: 4,
    checked1xCount: 9,
    checked2xCount: 2,
    checkedGt2xCount: 3,
    totalCount: VULN_BLOCK_COUNT,
  },
  blokNonRawan: {
    uncheckedCount: 9,
    checked1xCount: 13,
    checked2xCount: 5,
    checkedGt2xCount: 3,
    totalCount: 30,
  },
  baselineDistance: 86,
  actualDistance: 72,
  outOfRoute: 13,
  inRoute: 59,
  baselineCovered: 51,
  baselineCoveredPct: 59,
} as const

export const PATROL_SHIFT_DETAILS = [
  {
    no: 1,
    movingTime: '06:20',
    stopTime: '01:40',
    avgSpeed: 22,
    maxSpeed: 48,
    baseline: 'Jalur Pringgaan',
    baselineDist: 32,
    actualDist: 30,
    outOfRoute: 8,
    inRoute: 22,
    pct: 69,
    vulnBlocksChecked: ['D-48', 'D-39'],
  },
  {
    no: 2,
    movingTime: '06:45',
    stopTime: '01:15',
    avgSpeed: 21,
    maxSpeed: 45,
    baseline: 'Jalur Poros',
    baselineDist: 28,
    actualDist: 26,
    outOfRoute: 3,
    inRoute: 23,
    pct: 82,
    vulnBlocksChecked: [] as string[],
  },
  {
    no: 3,
    movingTime: '05:30',
    stopTime: '03:15',
    avgSpeed: 19,
    maxSpeed: 42,
    baseline: 'Jalur Akses Masyarakat',
    baselineDist: 26,
    actualDist: 16,
    outOfRoute: 2,
    inRoute: 14,
    pct: 54,
    vulnBlocksChecked: [] as string[],
  },
] as const
