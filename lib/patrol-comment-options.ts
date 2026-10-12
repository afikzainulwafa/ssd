import { EventCategory } from '@/components/event-panel-types'
 
/** Kategori yang butuh sub-dropdown. Kosong = cukup pilih kategori saja. */
export const COMMENT_SUB_REQUIRED: Record<EventCategory, string[]> = {
  stop: ['Standby'],
  route: [],
  speed: ['Tugas Non-Patroli'],
}
 
export const COMMENT_OPTIONS: Record<EventCategory, Record<string, string[]>> = {
  stop: {
    Standby: [
      'Kantor Besar',
      'Pos',
      'Pondok',
      'Workshop',
      'Emplasmen',
      'TPH',
      'Areal Pemupukan',
      'Areal Bibitan',
      'Areal Airstrip'
    ],
    'Pengawalan Kerja Excavator': [],
    'Pengantaran ke Kantor Polisi': [],
    'Cek Area Rawan Pencurian': [],
    'Cek Area Rawan Kebakaran': [],
    'Cek Area Pringgan': [],
    'Cek Jalan Akses/Poros': [],
    'Cek Area Perbatasan': [],
    'Cek Area Panen': [],
    'Pengendapan / Pengintaian': [],
    'Koordinasi & Pergantian Shift': [],
    Ishoma: [],
    'Pencucian Kendaraan': [],
    'Pengisian BBM': [],
    'Cek Area Pemupukan': [],
  },
  route: {
    'Jalan Tidak Bisa Dilalui': [],
    'Instruksi Mendadak': [],
    'Melakukan Pengejaran': [],
    'Melakukan Penangkapan': [],
    'Mengantar ke Kantor Polisi': [],
    'Memantau Restan': [],
    'Mengawal Kegiatan Panen': [],
    'Mengawal Kegiatan Pupuk': [],
    'Pemantauan Api': [],
    'Mengantar Anggota ke Pos': [],
    'Menjemput Tim Patroli Polisi/TNI': [],
    'Mengawal Pengangkutan TBS ke PKS': [],
    'Keperluan Lain': [],
  },
  speed: {
    'Tugas Non-Patroli': [
      'Mengantar Tamu',
      'Mengantar Tersangka Pencurian',
      'Mengantar Karyawan',
      'Mengantar Tim Patroli'
    ],
    'Melewati Jalan Raya': [],
    'Melakukan Pengejaran': [],
  },
}
 
export function categoryNeedsSub(categoryType: EventCategory, category: string): boolean {
  return COMMENT_SUB_REQUIRED[categoryType].includes(category)
}
 
export function getSubOptions(categoryType: EventCategory, category: string): string[] {
  return COMMENT_OPTIONS[categoryType][category] ?? []
}

export function parseDurationToMinutes(durationStr?: string): number {
  if (!durationStr) return 0
  const normalized = durationStr.toLowerCase().trim()
  
  const regex = /(\d+)\s*(jam|hours|hour|j|h|menit|min|m)/gi
  let match
  let foundHour = false
  let foundMin = false
  let minutes = 0
  
  while ((match = regex.exec(normalized)) !== null) {
    const val = parseInt(match[1])
    const unit = match[2].toLowerCase()
    
    if (unit.startsWith('j') || unit.startsWith('h')) {
      minutes += val * 60
      foundHour = true
    } else if (unit.startsWith('m')) {
      minutes += val
      foundMin = true
    }
  }
  
  if (!foundHour && !foundMin) {
    const numberMatch = normalized.match(/(\d+)/)
    if (numberMatch) {
      return parseInt(numberMatch[1])
    }
  }
  
  return minutes
}

export function getStopEventFlag(e: { commentCategory?: string; comment?: string; duration?: string }, categoryType: EventCategory): string | null {
  if (categoryType !== 'stop') return null
  
  const comment = e.commentCategory || e.comment || ''
  const durationMin = parseDurationToMinutes(e.duration)
  
  // Retrieve custom threshold values from localStorage
  let limitCuci = 50
  let limitBbm = 35
  let limitKoordinasi = 50
  let limitIshoma = 65
  
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('smarttrack_thresholds')
      if (stored) {
        const params = JSON.parse(stored)
        const cuciParam = params.find((p: { key: string; value: string | number }) => p.key === 'OVERTIME_CUCI')
        const bbmParam = params.find((p: { key: string; value: string | number }) => p.key === 'OVERTIME_BBM')
        const koordinasiParam = params.find((p: { key: string; value: string | number }) => p.key === 'OVERTIME_KOORDINASI')
        const ishomaParam = params.find((p: { key: string; value: string | number }) => p.key === 'OVERTIME_ISHOMA')
        
        if (cuciParam) limitCuci = Number(cuciParam.value)
        if (bbmParam) limitBbm = Number(bbmParam.value)
        if (koordinasiParam) limitKoordinasi = Number(koordinasiParam.value)
        if (ishomaParam) limitIshoma = Number(ishomaParam.value)
      }
    } catch (err) {
      console.error('Failed to parse smarttrack_thresholds', err)
    }
  }
  
  if (comment === 'Pencucian Kendaraan' && durationMin > limitCuci) {
    return `Overtime Cuci (>${limitCuci}m)`
  }
  if (comment === 'Pengisian BBM' && durationMin > limitBbm) {
    return `Overtime BBM (>${limitBbm}m)`
  }
  if (comment === 'Koordinasi & Pergantian Shift' && durationMin > limitKoordinasi) {
    return `Overtime Koordinasi (>${limitKoordinasi}m)`
  }
  if (comment === 'Ishoma' && durationMin > limitIshoma) {
    return `Overtime Ishoma (>${limitIshoma}m)`
  }
  
  return null
}
