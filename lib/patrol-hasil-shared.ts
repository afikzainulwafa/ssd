import { EventCategory, PatrolEvent, isEventCommented } from '@/components/event-panel-types'
import { categoryNeedsSub } from '@/lib/patrol-comment-options'
import type { MapOverviewEvent } from '@/components/MapViewer'
import { getShiftFromTimeRange, formatShiftLabel } from '@/lib/patrol-shift'

export const ESTATE_NAME = 'KULE'

export const DONUT_R = 52
export const DONUT_STROKE = 14
export const DONUT_CX = 70
export const DONUT_C = 2 * Math.PI * DONUT_R
export const donutArc = (pct: number) => `${(pct / 100) * DONUT_C} ${DONUT_C}`
export const donutOff = (pct: number) => -((pct / 100) * DONUT_C)
export const donutPctFromCount = (count: number, total: number) =>
  total > 0 ? (count / total) * 100 : 0

export const TEAM_ROWS = [
  [
    { key: 'manager', label: 'Manajer', dot: '#2e7d32', type: 'select' as const },
    { key: 'kanitpam', label: 'Kanitpam', dot: '#7b1fa2', type: 'select' as const },
    { key: 'pic', label: 'PIC', dot: '#43a047', type: 'select' as const },
  ],
  [
    { key: 'danru_shift1', label: 'Danru Shift 1', dot: '#00897b', type: 'select' as const },
    { key: 'danru_shift2', label: 'Danru Shift 2', dot: '#e53935', type: 'select' as const },
    { key: 'danru_shift3', label: 'Danru Shift 3', dot: '#8e24aa', type: 'select' as const },
  ],
  [
    { key: 'anggota_shift1', label: 'Anggota Shift 1', dot: '#1565c0', type: 'select' as const },
    { key: 'anggota_shift2', label: 'Anggota Shift 2', dot: '#f9a825', type: 'select' as const },
    { key: 'anggota_shift3', label: 'Anggota Shift 3', dot: '#6a1b9a', type: 'select' as const },
  ],
]

export const TEAM_OPTIONS: Record<string, string[]> = {
  manager: ['Budi Heru'],
  kanitpam: ['Budi Santoso', 'Hendra Wijaya', 'Agus Prasetyo'],
  danru_shift1: ['Rizki Fauzan', 'Dedi Kurniawan', 'Eko Susanto'],
  danru_shift2: ['Fajar Nugroho', 'Yusuf Hidayat', 'Bagas Prasetya'],
  danru_shift3: ['Wahyu Setiawan', 'Andi Firmansyah', 'Rendi Saputra'],
  anggota_shift1: ['Gilang Ramadan', 'Irfan Maulana', 'Taufik Hidayat', 'Arif Budiman'],
  anggota_shift2: ['Dimas Pratama', 'Reza Mahendra', 'Feri Kusuma', 'Yoga Santoso'],
  anggota_shift3: ['Hafiz Ramadhan', 'Novan Setiadi', 'Bayu Purnomo', 'Lutfi Hakim'],
  pic: ['Aditya Pratama', 'Hendra Wijaya', 'Ahmad Fauzi'],
  driver_shift1: ['Agus Setiawan', 'Bambang Tri', 'Cahyono'],
  driver_shift2: ['Dedi Hariyadi', 'Eko Prasetyo', 'Fajar Sidik'],
  driver_shift3: ['Guntur Bumi', 'Hari Mukti', 'Iwan Fals'],
}

export const USE_DEMO_EVENTS = true

export function toMapOverview(type: EventCategory, events: PatrolEvent[]): MapOverviewEvent[] {
  return events.map((e) => {
    const shift = getShiftFromTimeRange(e.time)
    const shiftPart = shift ? ` · ${formatShiftLabel(shift)}` : ''
    const speedKmPart = type === 'speed' && e.speedKm ? ` · ${e.speedKm}` : ''
    return {
      id: e.id,
      lat: e.lat,
      lng: e.lng,
      label: `${type === 'stop' ? 'Berhenti' : type === 'route' ? 'Keluar Rute' : 'Kecepatan'} #${e.id}${e.blockPair ? ` · ${e.blockPair}` : ''} · ${e.time}${shiftPart}${speedKmPart}`,
      shift,
      commented: isEventCommented(e, type),
      commentCategory: e.commentCategory,
      commentDetail: e.commentDetail,
      comment: e.comment,
      track: e.track,
      width: e.width,
      height: e.height,
    }
  })
}

export function updateEventComment(
  events: PatrolEvent[],
  id: number,
  category: string,
  detail: string,
  categoryType: EventCategory
): PatrolEvent[] {
  return events.map((e) => {
    if (e.id !== id) return e
    const needsSub = categoryNeedsSub(categoryType, category)
    const comment = needsSub ? detail : category
    return { ...e, commentCategory: category, commentDetail: detail, comment }
  })
}

export const EMPTY_TEAM = {
  manager: 'Budi Heru', pic: '', kanitpam: '',
  danru_shift1: '', danru_shift2: '', danru_shift3: '',
  driver_shift1: '', driver_shift2: '', driver_shift3: '',
  anggota_shift1: [] as string[],
  anggota_shift2: [] as string[],
  anggota_shift3: [] as string[],
}
