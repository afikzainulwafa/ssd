/** Shift patrol — waktu lokal estate */
export type PatrolShift = 1 | 2 | 3

/** Shift 1: 07:00–15:00 · Shift 2: 15:00–23:00 · Shift 3: 23:00–07:00 (D+1) */
const SHIFT_1_START = 7 * 60
const SHIFT_1_END = 15 * 60
const SHIFT_2_END = 23 * 60

export function minutesFromTimeString(time: string): number {
  const part = time.trim().split(/\s*-\s*/)[0]?.trim() ?? time.trim()
  const [h, m] = part.split(':').map((v) => parseInt(v, 10))
  if (Number.isNaN(h) || Number.isNaN(m)) return 0
  return h * 60 + m
}

export function getShiftFromMinutes(mins: number): PatrolShift {
  if (mins >= SHIFT_1_START && mins < SHIFT_1_END) return 1
  if (mins >= SHIFT_1_END && mins < SHIFT_2_END) return 2
  return 3
}

/** Dari rentang waktu event, mis. "07:12 - 07:58" */
export function getShiftFromTimeRange(timeRange: string): PatrolShift {
  return getShiftFromMinutes(minutesFromTimeString(timeRange))
}

/** Dari timestamp GPS */
export function getShiftFromFixTime(fixTime: string): PatrolShift {
  try {
    const d = new Date(fixTime)
    return getShiftFromMinutes(d.getHours() * 60 + d.getMinutes())
  } catch {
    return 1
  }
}

export function formatShiftLabel(shift: PatrolShift): string {
  return `Shift ${shift}`
}

export function formatShiftShort(shift: PatrolShift): string {
  return `S${shift}`
}
