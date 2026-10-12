import { PatrolReportRecord, GlobalFilterState, VehicleEntity } from './types'
import { MOCK_PATROL_REPORTS, MOCK_VEHICLES, MOCK_ESTATES } from './mock-database'
import { getFilteredEstates, getFilteredVehicles } from './selectors'

export interface DamageTimelineEvent {
  id: string
  date: string // YYYY-MM-DD
  timestamp: string // YYYY-MM-DD HH:mm
  type: 'REPORTED' | 'REPAIR_NOTE' | 'ESCALATION_WARNING' | 'ESCALATION_LEVEL' | 'REMINDER_SENT' | 'RECOVERED'
  title: string
  description: string
  recipientEmail?: string
  recipientRole?: 'Manager' | 'RC' | 'VPA'
  isFutureScheduled?: boolean
}

export interface DamageIncident {
  id: string // e.g. 'INC-V-Estate-B-01-UNIT_RUSAK-2026-05-01'
  vehicleId: string
  nopol: string
  vehicleType: string
  estateId: string
  regionId: string
  psmId: string
  damageType: 'Unit Rusak' | 'GPS Rusak'
  startDate: string // YYYY-MM-DD (Day 1)
  endDate?: string // YYYY-MM-DD (if recovered)
  status: 'Belum Pulih' | 'Selesai'
  durationDays: number // Calendar days from startDate to current date (or endDate if recovered)
  escalationLevel: 'Normal' | 'Manager' | 'RC' | 'VPA'
  managerEmail: string
  rcEmail: string
  vpaEmail: string
  latestRepairNote: string
  latestUpdateDate: string
  hasPendingActionForUser: boolean // Depends on user role & escalation threshold
  relatedReports: PatrolReportRecord[]
  timeline: DamageTimelineEvent[]
}

// User Role type for escalation & comment obligations
export type UserRole = 'Manager' | 'RC' | 'VPA' | 'Admin'

/**
 * Calculates calendar days between two YYYY-MM-DD dates inclusive (startDate = Day 1)
 */
export function calculateDamageDays(startDateStr: string, currentDateStr: string = '2026-05-31'): number {
  const start = new Date(startDateStr)
  const current = new Date(currentDateStr)
  const diffTime = current.getTime() - start.getTime()
  if (diffTime < 0) return 1
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
}

/**
 * Helper to compute escalation level based on duration days (Calendar days, Day 1 = start date)
 * Day 4: Manager
 * Day 8: RC (CC Manager)
 * Day 15: VPA (CC RC & Manager)
 */
export function getEscalationLevel(durationDays: number): 'Normal' | 'Manager' | 'RC' | 'VPA' {
  if (durationDays >= 15) return 'VPA'
  if (durationDays >= 8) return 'RC'
  if (durationDays >= 4) return 'Manager'
  return 'Normal'
}

/**
 * Helper to check if user role has a pending action on an unrecovered incident based on escalation threshold
 */
export function isUserActionRequiredForIncident(incident: DamageIncident, userRole: UserRole): boolean {
  if (incident.status === 'Selesai') return false

  const level = incident.escalationLevel
  if (userRole === 'Admin') {
    return level !== 'Normal'
  }
  if (userRole === 'Manager') {
    return incident.durationDays >= 4 // Manager marker remains active after escalation levels up
  }
  if (userRole === 'RC') {
    return incident.durationDays >= 8
  }
  if (userRole === 'VPA') {
    return incident.durationDays >= 15
  }
  return false
}

/**
 * Builds timeline events for a damage incident based on its reports and escalation history
 */
function buildIncidentTimeline(
  vehicleId: string,
  estateId: string,
  regionId: string,
  psmId: string,
  damageType: 'Unit Rusak' | 'GPS Rusak',
  startDate: string,
  status: 'Belum Pulih' | 'Selesai',
  endDate?: string,
  relatedReports: PatrolReportRecord[] = [],
  asOfDate: string = '2026-05-31'
): { timeline: DamageTimelineEvent[]; latestNote: string; latestDate: string } {
  const timeline: DamageTimelineEvent[] = []
  const managerEmail = `manager.${estateId.toLowerCase().replace(/\s+/g, '')}@smarttrack.co.id`
  const rcEmail = `rc.${regionId.toLowerCase().replace(/\s+/g, '')}@smarttrack.co.id`
  const vpaEmail = `vpa.${psmId.toLowerCase().replace(/\s+/g, '')}@smarttrack.co.id`

  let latestNote = damageType === 'Unit Rusak' ? 'Dalam pemeriksaan mekanis' : 'Sinyal pelacakan terputus'
  let latestDate = startDate

  // 1. Initial Damage Report (Day 1)
  timeline.push({
    id: `tl-start-${startDate}`,
    date: startDate,
    timestamp: `${startDate} 07:30`,
    type: 'REPORTED',
    title: `Kejadian ${damageType} Dilaporkan Pertama Kali`,
    description: `Laporan patroli harian mencatat status ${damageType} pada unit ${vehicleId} di ${estateId}.`
  })

  // 2. Timeline from actual reports
  relatedReports.forEach((rep, idx) => {
    const note = rep.repairStatus || rep.gpsNote || rep.picComment
    if (note) {
      latestNote = note
      latestDate = rep.date
      timeline.push({
        id: `tl-rep-${rep.id}-${idx}`,
        date: rep.date,
        timestamp: `${rep.date} 16:00`,
        type: 'REPAIR_NOTE',
        title: `Pembaruan Catatan Perbaikan (${rep.date})`,
        description: `Catatan: "${note}". (Disampaikan oleh PIC Patroli)`
      })
    }
  })

  const daysSoFar = calculateDamageDays(startDate, status === 'Selesai' && endDate ? endDate : asOfDate)

  // Helper to add date by adding days
  const addDays = (baseDateStr: string, days: number): string => {
    const d = new Date(baseDateStr)
    d.setDate(d.getDate() + days)
    return d.toISOString().split('T')[0]
  }

  // Day 4: Manager Warning & Reminders (Day 4, Day 7)
  if (daysSoFar >= 4) {
    const day4Date = addDays(startDate, 3)
    timeline.push({
      id: `tl-esc-mgr-${day4Date}`,
      date: day4Date,
      timestamp: `${day4Date} 08:00`,
      type: 'ESCALATION_WARNING',
      title: 'Peringatan Hari ke-4: Eskalasi ke Estate Manager',
      description: `[Simulasi Email] Notifikasi Peringatan dikirim ke Manager (${managerEmail}) karena ${damageType} telah berlangsung 4 hari kalender tanpa konfirmasi pemulihan.`,
      recipientEmail: managerEmail,
      recipientRole: 'Manager'
    })
  }

  if (daysSoFar >= 7) {
    const day7Date = addDays(startDate, 6)
    timeline.push({
      id: `tl-rem-mgr-${day7Date}`,
      date: day7Date,
      timestamp: `${day7Date} 08:00`,
      type: 'REMINDER_SENT',
      title: 'Pengingat Berulang Hari ke-7 (Manager)',
      description: `[Simulasi Email] Pengingat ke-1 dikirim ke Manager (${managerEmail}). Kejadian belum pulih (Hari ke-7).`,
      recipientEmail: managerEmail,
      recipientRole: 'Manager'
    })
  }

  // Day 8: RC Escalation & Reminders (Day 8, Day 11, Day 14)
  if (daysSoFar >= 8) {
    const day8Date = addDays(startDate, 7)
    timeline.push({
      id: `tl-esc-rc-${day8Date}`,
      date: day8Date,
      timestamp: `${day8Date} 08:00`,
      type: 'ESCALATION_LEVEL',
      title: 'Eskalasi Level Tingkat 2: Regional Control (RC)',
      description: `[Simulasi Email] Surat Eskalasi Hari ke-8 dikirim ke RC (${rcEmail}) dengan CC Manager (${managerEmail}). Jadwal pengingat diperbarui untuk tingkat RC.`,
      recipientEmail: rcEmail,
      recipientRole: 'RC'
    })
  }

  if (daysSoFar >= 11) {
    const day11Date = addDays(startDate, 10)
    timeline.push({
      id: `tl-rem-rc-${day11Date}`,
      date: day11Date,
      timestamp: `${day11Date} 08:00`,
      type: 'REMINDER_SENT',
      title: 'Pengingat Berulang Hari ke-11 (RC)',
      description: `[Simulasi Email] Pengingat 3-harian dikirim ke RC (${rcEmail}) dengan CC Manager.`,
      recipientEmail: rcEmail,
      recipientRole: 'RC'
    })
  }

  if (daysSoFar >= 14) {
    const day14Date = addDays(startDate, 13)
    timeline.push({
      id: `tl-rem-rc-${day14Date}`,
      date: day14Date,
      timestamp: `${day14Date} 08:00`,
      type: 'REMINDER_SENT',
      title: 'Pengingat Berulang Hari ke-14 (RC)',
      description: `[Simulasi Email] Pengingat 3-harian dikirim ke RC (${rcEmail}) dengan CC Manager.`,
      recipientEmail: rcEmail,
      recipientRole: 'RC'
    })
  }

  // Day 15+: VPA Escalation & Reminders (Day 15, Day 18, Day 21...)
  if (daysSoFar >= 15) {
    const day15Date = addDays(startDate, 14)
    timeline.push({
      id: `tl-esc-vpa-${day15Date}`,
      date: day15Date,
      timestamp: `${day15Date} 08:00`,
      type: 'ESCALATION_LEVEL',
      title: 'Eskalasi Level Tertinggi: VP Agronomy (VPA)',
      description: `[Simulasi Email] Eskalasi Utama Hari ke-15 dikirim ke VPA (${vpaEmail}) dengan CC RC (${rcEmail}) & Manager (${managerEmail}).`,
      recipientEmail: vpaEmail,
      recipientRole: 'VPA'
    })

    // Add 3-day reminders up to daysSoFar
    let remDay = 18
    while (remDay <= daysSoFar) {
      const remDate = addDays(startDate, remDay - 1)
      timeline.push({
        id: `tl-rem-vpa-${remDate}`,
        date: remDate,
        timestamp: `${remDate} 08:00`,
        type: 'REMINDER_SENT',
        title: `Pengingat Berulang Hari ke-${remDay} (VPA)`,
        description: `[Simulasi Email] Pengingat rutin 3-harian dikirim ke VPA (${vpaEmail}) dengan CC RC & Manager.`,
        recipientEmail: vpaEmail,
        recipientRole: 'VPA'
      })
      remDay += 3
    }
  }

  // Future scheduled next reminder (if status === 'Belum Pulih')
  if (status === 'Belum Pulih') {
    let nextRemDay = 4
    if (daysSoFar >= 15) {
      nextRemDay = Math.ceil((daysSoFar + 1 - 15) / 3) * 3 + 15
    } else if (daysSoFar >= 8) {
      nextRemDay = Math.ceil((daysSoFar + 1 - 8) / 3) * 3 + 8
    } else if (daysSoFar >= 4) {
      nextRemDay = Math.ceil((daysSoFar + 1 - 4) / 3) * 3 + 4
    }
    const nextRemDate = addDays(startDate, nextRemDay - 1)
    const targetRole = nextRemDay >= 15 ? 'VPA' : (nextRemDay >= 8 ? 'RC' : 'Manager')
    const targetEmail = targetRole === 'VPA' ? vpaEmail : (targetRole === 'RC' ? rcEmail : managerEmail)

    timeline.push({
      id: `tl-sched-${nextRemDate}`,
      date: nextRemDate,
      timestamp: `${nextRemDate} 08:00`,
      type: 'REMINDER_SENT',
      title: `Terjadwal: Pengingat Hari ke-${nextRemDay} (${targetRole})`,
      description: `[Terjadwal] Pengingat otomatis berikutnya akan dikirim pada ${nextRemDate} jika belum ada laporan konfirmasi pemulihan.`,
      recipientEmail: targetEmail,
      recipientRole: targetRole,
      isFutureScheduled: true
    })
  }

  // Completion event if recovered
  if (status === 'Selesai' && endDate) {
    latestDate = endDate
    latestNote = `Kondisi unit telah dikonfirmasi kembali normal pada ${endDate}.`
    timeline.push({
      id: `tl-rec-${endDate}`,
      date: endDate,
      timestamp: `${endDate} 17:00`,
      type: 'RECOVERED',
      title: 'Konfirmasi Pemulihan & Penutupan Kejadian',
      description: `[Simulasi Email] Notifikasi Pemulihan Berhasil dikirim ke seluruh penerima eskalasi (${managerEmail}, ${rcEmail}, ${vpaEmail}). Pengingat otomatis dihentikan.`
    })
  }

  // Sort timeline with NEWEST ON TOP (past events descending, future scheduled at very top or appropriate)
  timeline.sort((a, b) => {
    if (a.isFutureScheduled && !b.isFutureScheduled) return -1
    if (!a.isFutureScheduled && b.isFutureScheduled) return 1
    return b.timestamp.localeCompare(a.timestamp)
  })

  return { timeline, latestNote, latestDate }
}

/**
 * Builds all damage incidents (both current period and historical/cross-period)
 */
export function buildAllDamageIncidents(
  filters: GlobalFilterState,
  userRole: UserRole = 'Admin',
  asOfDate: string = '2026-05-31'
): DamageIncident[] {
  const estateMap = new Map(MOCK_ESTATES.map(e => [e.id, e]))
  const vehicleMap = new Map(MOCK_VEHICLES.map(v => [v.id, v]))

  // Allowed scopes
  const allowedEstates = new Set(getFilteredEstates(filters).map(e => e.id))

  // Seed default rich mockup damage incidents (including cross-month historical incidents starting before May 2026)
  const mockIncidentsData: Array<{
    id: string
    vehicleId: string
    damageType: 'Unit Rusak' | 'GPS Rusak'
    startDate: string
    endDate?: string
    status: 'Belum Pulih' | 'Selesai'
    customNotes?: string
  }> = [
    // Incident 1: Cross-month unrecovered Unit Rusak (Start: 2026-04-18 -> 44 days unrecovered by end of May) -> Escalation VPA
    {
      id: 'INC-V-Estate-B-01-UNIT_RUSAK-2026-04-18',
      vehicleId: 'V-Estate B-01',
      damageType: 'Unit Rusak',
      startDate: '2026-04-18',
      status: 'Belum Pulih',
      customNotes: 'Kerusakan transmisi utama. Menunggu sparepart impor dari distributor pusat Surabaya.'
    },
    // Incident 2: Cross-month unrecovered GPS Rusak (Start: 2026-05-10 -> 22 days unrecovered) -> Escalation VPA
    {
      id: 'INC-V-Estate-B-02-GPS_RUSAK-2026-05-10',
      vehicleId: 'V-Estate B-02',
      damageType: 'GPS Rusak',
      startDate: '2026-05-10',
      status: 'Belum Pulih',
      customNotes: 'Perangkat GPS tidak dapat menangkap sinyal satelit. Tim IT regional dijadwalkan ganti modem GPS.'
    },
    // Incident 3: Unrecovered Unit Rusak (Start: 2026-05-24 -> 8 days unrecovered) -> Escalation RC
    {
      id: 'INC-V-Estate-C-01-UNIT_RUSAK-2026-05-24',
      vehicleId: 'V-Estate C-01',
      damageType: 'Unit Rusak',
      startDate: '2026-05-24',
      status: 'Belum Pulih',
      customNotes: 'Overheat mesin saat patroli blok rawan. Unit sedang dirombak radiator di workshop estate.'
    },
    // Incident 4: Unrecovered Unit Rusak (Start: 2026-05-28 -> 4 days unrecovered) -> Escalation Manager
    {
      id: 'INC-V-Estate-D-01-UNIT_RUSAK-2026-05-28',
      vehicleId: 'V-Estate D-01',
      damageType: 'Unit Rusak',
      startDate: '2026-05-28',
      status: 'Belum Pulih',
      customNotes: 'Kebocoran hidrolik rem belakang. Dalam pengerjaan tim mekanik internal.'
    },
    // Incident 5: Recovered Unit Rusak (Start: 2026-05-02, Recovered: 2026-05-09) -> Selesai
    {
      id: 'INC-V-Estate-A-01-UNIT_RUSAK-2026-05-02',
      vehicleId: 'V-Estate A-01',
      damageType: 'Unit Rusak',
      startDate: '2026-05-02',
      endDate: '2026-05-09',
      status: 'Selesai',
      customNotes: 'Penggantian aki dan alternator selesai. Unit telah lulus uji coba jalan.'
    },
    // Incident 6: Recovered GPS Rusak (Start: 2026-05-05, Recovered: 2026-05-12) -> Selesai
    {
      id: 'INC-V-Estate-A-02-GPS_RUSAK-2026-05-05',
      vehicleId: 'V-Estate A-02',
      damageType: 'GPS Rusak',
      startDate: '2026-05-05',
      endDate: '2026-05-12',
      status: 'Selesai',
      customNotes: 'Kabel power GPS kendor diservis ulang. Sinyal pelacakan kembali normal.'
    }
  ]

  const incidents: DamageIncident[] = []

  mockIncidentsData.forEach(item => {
    const veh = vehicleMap.get(item.vehicleId) || {
      id: item.vehicleId,
      nopol: 'BM 8421 QA',
      estateId: 'Estate B',
      vehicleType: 'Car',
      gpsId: 'GPS-01',
      effectiveStartDate: '2025-01-01',
      status: 'Active'
    }

    if (!allowedEstates.has(veh.estateId)) return

    const estate = estateMap.get(veh.estateId) || {
      id: veh.estateId,
      name: veh.estateId,
      regionId: 'Region A',
      psmId: 'PSM A'
    }

    // Filter related daily reports from MOCK_PATROL_REPORTS matching this vehicle & damage type
    const relatedReports = MOCK_PATROL_REPORTS.filter(r =>
      r.vehicleId === veh.id &&
      ((item.damageType === 'Unit Rusak' && r.reportType === 'Unit Rusak') ||
       (item.damageType === 'GPS Rusak' && r.reportType === 'GPS Rusak'))
    )

    const durationDays = calculateDamageDays(
      item.startDate,
      item.status === 'Selesai' && item.endDate ? item.endDate : asOfDate
    )

    const escalationLevel = getEscalationLevel(durationDays)

    const { timeline, latestNote, latestDate } = buildIncidentTimeline(
      veh.id,
      veh.estateId,
      estate.regionId,
      estate.psmId,
      item.damageType,
      item.startDate,
      item.status,
      item.endDate,
      relatedReports,
      asOfDate
    )

    const finalNote = item.customNotes || latestNote

    const incident: DamageIncident = {
      id: item.id,
      vehicleId: veh.id,
      nopol: veh.nopol,
      vehicleType: veh.vehicleType,
      estateId: veh.estateId,
      regionId: estate.regionId,
      psmId: estate.psmId,
      damageType: item.damageType,
      startDate: item.startDate,
      endDate: item.endDate,
      status: item.status,
      durationDays,
      escalationLevel,
      managerEmail: `manager.${veh.estateId.toLowerCase().replace(/\s+/g, '')}@smarttrack.co.id`,
      rcEmail: `rc.${estate.regionId.toLowerCase().replace(/\s+/g, '')}@smarttrack.co.id`,
      vpaEmail: `vpa.${estate.psmId.toLowerCase().replace(/\s+/g, '')}@smarttrack.co.id`,
      latestRepairNote: finalNote,
      latestUpdateDate: latestDate,
      hasPendingActionForUser: false,
      relatedReports,
      timeline
    }

    incident.hasPendingActionForUser = isUserActionRequiredForIncident(incident, userRole)

    incidents.push(incident)
  })

  // Sort incidents by: 1) Belum Pulih first, 2) Highest escalation level, 3) Longest duration
  const levelPriority: Record<string, number> = { VPA: 4, RC: 3, Manager: 2, Normal: 1 }

  incidents.sort((a, b) => {
    if (a.status === 'Belum Pulih' && b.status !== 'Belum Pulih') return -1
    if (a.status !== 'Belum Pulih' && b.status === 'Belum Pulih') return 1

    const prioA = levelPriority[a.escalationLevel] || 0
    const prioB = levelPriority[b.escalationLevel] || 0
    if (prioA !== prioB) return prioB - prioA

    return b.durationDays - a.durationDays
  })

  return incidents
}
