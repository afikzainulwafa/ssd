'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import {
  createDemoStopEvents,
  createDemoRouteEvents,
  createDemoSpeedEvents,
} from '@/lib/demo-patrol-events'
import { supabase, PatrolReport, PatrolResult, GpsPosition, PatrolIssue } from '@/lib/supabase'
import { PATROL_DEMO_STATS, PATROL_SHIFT_DETAILS } from '@/lib/patrol-demo-stats'
import VehicleTypeBadge from '@/components/VehicleTypeBadge'
import { formatVehicleType, getVehicleKind } from '@/lib/format-vehicle'
import {
  ESTATE_NAME,
  TEAM_ROWS,
  TEAM_OPTIONS,
  USE_DEMO_EVENTS,
  EMPTY_TEAM,
  DONUT_CX,
  DONUT_R,
  DONUT_STROKE,
  donutArc,
  donutOff,
  donutPctFromCount,
  toMapOverview,
  updateEventComment,
} from '@/lib/patrol-hasil-shared'
import { fetchSubmittedReport } from '@/lib/patrol-queries'
import EventAccordionPanel from '@/components/EventAccordionPanel'
import { EventCategory, PatrolEvent, isEventCommented } from '@/components/event-panel-types'
import {
  ArrowLeft, AlertTriangle, Plus, MapPin, Calendar,
  BarChart2, List, Users, MessageSquare,
  CheckCircle, ClipboardCheck, Trees, Save, Shield, Trash2,
  Bike, Radio, CheckSquare, Eye, EyeOff, Octagon, Navigation, Gauge,
} from 'lucide-react'

const MapViewer = dynamic(() => import('@/components/MapViewer'), { ssr: false })

export type PatrolHasilMode = 'edit' | 'view'

type PatrolHasilViewProps = {
  mode: PatrolHasilMode
  reportId: string
  backHref: string
}

function hydrateEvents(saved: PatrolEvent[] | undefined, fallback: () => PatrolEvent[]): PatrolEvent[] {
  if (saved && saved.length > 0) return saved
  return fallback()
}

const parseIssueDescription = (rawDesc: string) => {
  if (!rawDesc) return { status: 'Pelaporan Kerusakan', text: '' }
  try {
    if (rawDesc.startsWith('{') && rawDesc.endsWith('}')) {
      const parsed = JSON.parse(rawDesc)
      return {
        status: parsed.status || 'Pelaporan Kerusakan',
        text: parsed.text || ''
      }
    }
  } catch (e) {
    // ignore
  }
  return {
    status: 'Pelaporan Kerusakan',
    text: rawDesc
  }
}

export default function PatrolHasilView({ mode, reportId, backHref }: PatrolHasilViewProps) {
  const router = useRouter()
  const readOnly = mode === 'view'
  const TOTAL_ESTATE_BLOCKS = 48

  const [report, setReport] = useState<PatrolReport | null>(null)
  const [savedResult, setSavedResult] = useState<PatrolResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [gpsData, setGpsData] = useState<GpsPosition[]>([])
  const [activeEventTab, setActiveEventTab] = useState<EventCategory | null>(null)
  const [priorityLevel, setPriorityLevel] = useState<'normal' | 'urgent'>('normal')
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const [selectedShift, setSelectedShift] = useState<string>('all')
  const [mapExceptionFilter, setMapExceptionFilter] = useState<'all' | 'hide' | 'stop' | 'route' | 'speed'>('all')

  const [patrolSummary, setPatrolSummary] = useState('')
  const [actionPlan, setActionPlan] = useState('')
  const [teamAssignment, setTeamAssignment] = useState<any>({ ...EMPTY_TEAM })
  const [managerComment, setManagerComment] = useState('')
  const [rcComment, setRcComment] = useState('')
  const [srmdComment, setSrmdComment] = useState('')
  const [savingComment, setSavingComment] = useState(false)
  const [commentSaved, setCommentSaved] = useState(false)
  const [savedIssue, setSavedIssue] = useState<PatrolIssue | null>(null)

  const [currentUserRole, setCurrentUserRole] = useState<'manager' | 'rc' | 'srmd'>('manager')
  const [savingRcComment, setSavingRcComment] = useState(false)
  const [rcCommentSaved, setRcCommentSaved] = useState(false)
  const [savingSrmdComment, setSavingSrmdComment] = useState(false)
  const [srmdCommentSaved, setSrmdCommentSaved] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const roleParam = params.get('role')
      if (roleParam === 'rc') {
        setCurrentUserRole('rc')
      } else if (roleParam === 'srmd') {
        setCurrentUserRole('srmd')
      } else {
        setCurrentUserRole('manager')
      }
    }
  }, [])

  const [stopEvents, setStopEvents] = useState<PatrolEvent[]>([])
  const [outOfRouteEvents, setOutOfRouteEvents] = useState<PatrolEvent[]>([])
  const [speedEvents, setSpeedEvents] = useState<PatrolEvent[]>([])

  const getShiftFromTimeStr = (timeStr: string): number => {
    const startPart = timeStr.split(' ')[0] // "00:45"
    const [hourStr] = startPart.split(':')
    const hours = parseInt(hourStr, 10)
    if (hours >= 7 && hours < 15) return 1
    if (hours >= 15 && hours < 23) return 2
    return 3
  }

  const filteredStopEvents = useMemo(() => {
    return stopEvents.filter((e) => selectedShift === 'all' || getShiftFromTimeStr(e.time).toString() === selectedShift)
  }, [stopEvents, selectedShift])

  const filteredRouteEvents = useMemo(() => {
    return outOfRouteEvents.filter((e) => selectedShift === 'all' || getShiftFromTimeStr(e.time).toString() === selectedShift)
  }, [outOfRouteEvents, selectedShift])

  const filteredSpeedEvents = useMemo(() => {
    return speedEvents.filter((e) => selectedShift === 'all' || getShiftFromTimeStr(e.time).toString() === selectedShift)
  }, [speedEvents, selectedShift])

  const stats = useMemo(() => {
    if (readOnly && savedResult) {
      const inRoute = Math.max(0, savedResult.actual_distance - savedResult.out_of_route_km)
      return {
        ...PATROL_DEMO_STATS,
        baselineDistance: savedResult.baseline_distance,
        actualDistance: savedResult.actual_distance,
        outOfRoute: savedResult.out_of_route_km,
        inRoute,
        baselineCovered: savedResult.baseline_covered,
        baselineCoveredPct: savedResult.baseline_covered_pct,
      }
    }
    return PATROL_DEMO_STATS
  }, [readOnly, savedResult])

  const shifts = PATROL_SHIFT_DETAILS

  const rawanPasses = useMemo(() => {
    const br = stats.blokRawan
    return (br.checkedGt2xCount * 3) + (br.checked2xCount * 2) + (br.checked1xCount * 1)
  }, [stats.blokRawan])

  const nonRawanPasses = useMemo(() => {
    const bnr = (stats as any).blokNonRawan || {
      uncheckedCount: 9,
      checked1xCount: 13,
      checked2xCount: 5,
      checkedGt2xCount: 3,
      totalCount: 30
    }
    return (bnr.checkedGt2xCount * 3) + (bnr.checked2xCount * 2) + (bnr.checked1xCount * 1)
  }, [stats])

  const totalPasses = rawanPasses + nonRawanPasses
  const rawanPassPct = totalPasses > 0 ? Math.round((rawanPasses / totalPasses) * 100) : 0
  const nonRawanPassPct = totalPasses > 0 ? (100 - rawanPassPct) : 0

  const parseTimeToMinutes = (timeStr: string): number => {
    const [hStr, mStr] = timeStr.split(':')
    return parseInt(hStr || '0', 10) * 60 + parseInt(mStr || '0', 10)
  }

  const getShiftStopLimit = (shiftNo: number): number => {
    if (shiftNo === 1) return 120 // 2 jam = 120 menit
    if (shiftNo === 2) return 90  // 1 jam 30 menit = 90 menit
    if (shiftNo === 3) return 90  // 1 jam 30 menit = 90 menit
    return 0
  }

  const totalStopMinutes = useMemo(() => {
    return shifts.reduce((acc, s) => acc + parseTimeToMinutes(s.stopTime), 0)
  }, [shifts])

  const movingPct = useMemo(() => {
    return Math.round(((1440 - totalStopMinutes) / 1440) * 100)
  }, [totalStopMinutes])

  const stopPct = 100 - movingPct

  const formatMinutesToHoursMins = (totalMins: number): string => {
    const hrs = Math.floor(totalMins / 60)
    const mins = totalMins % 60
    return `${hrs}j ${mins}m`
  }

  const blockCoveragePct = useMemo(() => {
    const br = stats.blokRawan
    const bnr = (stats as any).blokNonRawan || { uncheckedCount: 9, totalCount: 30 }
    const totalRawanChecked = br.totalCount - br.uncheckedCount
    const totalNonRawanChecked = bnr.totalCount - bnr.uncheckedCount
    const totalBlocks = br.totalCount + bnr.totalCount
    const totalChecked = totalRawanChecked + totalNonRawanChecked
    return totalBlocks > 0 ? Math.round((totalChecked / totalBlocks) * 100) : 0
  }, [stats])

  const blokRawanArcs = useMemo(() => {
    const br = stats.blokRawan
    const total = br.totalCount
    const unchecked = donutPctFromCount(br.uncheckedCount, total)
    const checked1x = donutPctFromCount(br.checked1xCount, total)
    const checked2x = donutPctFromCount(br.checked2xCount, total)
    const checkedGt2x = donutPctFromCount(br.checkedGt2xCount, total)
    return { unchecked, checked1x, checked2x, checkedGt2x }
  }, [stats.blokRawan])

  const mapOverview = useMemo(() => {
    if (!activeEventTab) return null
    const events =
      activeEventTab === 'stop' ? filteredStopEvents :
      activeEventTab === 'route' ? filteredRouteEvents :
      filteredSpeedEvents
    return { type: activeEventTab, events: toMapOverview(activeEventTab, events) }
  }, [activeEventTab, filteredStopEvents, filteredRouteEvents, filteredSpeedEvents])

  const mapStopEvents = useMemo(() => toMapOverview('stop', filteredStopEvents), [filteredStopEvents])
  const mapRouteEvents = useMemo(() => toMapOverview('route', filteredRouteEvents), [filteredRouteEvents])
  const mapSpeedEvents = useMemo(() => toMapOverview('speed', filteredSpeedEvents), [filteredSpeedEvents])

  useEffect(() => {
    async function load() {
      if (readOnly) {
        const row = await fetchSubmittedReport(reportId)
        if (!row) {
          setLoading(false)
          return
        }
        const { report: reportData, result, issue } = row
        setReport(reportData)
        if (result) {
          setSavedResult(result)
          setPatrolSummary(result.patrol_summary ?? '')
          setActionPlan(result.action_plan ?? '')
          
          const parsedTeam = result.team_assignment ?? {}
          const kind = getVehicleKind(reportData?.type)
          const limit = kind === 'motor' ? 2 : 1
          const getAnggotaArray = (val: any, minLimit: number) => {
            if (Array.isArray(val)) {
              const arr = [...val]
              while (arr.length < minLimit) arr.push('')
              return arr
            }
            if (typeof val === 'string' && val) {
              const arr = [val]
              while (arr.length < minLimit) arr.push('')
              return arr
            }
            return Array(minLimit).fill('')
          }

          setTeamAssignment({
            manager: 'Budi Heru',
            pic: parsedTeam.pic ?? '',
            kanitpam: parsedTeam.kanitpam ?? '',
            danru_shift1: parsedTeam.danru_shift1 ?? '',
            danru_shift2: parsedTeam.danru_shift2 ?? '',
            danru_shift3: parsedTeam.danru_shift3 ?? '',
            driver_shift1: parsedTeam.driver_shift1 ?? '',
            driver_shift2: parsedTeam.driver_shift2 ?? '',
            driver_shift3: parsedTeam.driver_shift3 ?? '',
            anggota_shift1: getAnggotaArray(parsedTeam.anggota_shift1, limit),
            anggota_shift2: getAnggotaArray(parsedTeam.anggota_shift2, limit),
            anggota_shift3: getAnggotaArray(parsedTeam.anggota_shift3, limit),
            priority_level: parsedTeam.priority_level ?? 'normal',
            manager_comment: parsedTeam.manager_comment ?? '',
            manager_comment_at: parsedTeam.manager_comment_at ?? '',
            manager_comment_nik: parsedTeam.manager_comment_nik ?? '',
            manager_comment_name: parsedTeam.manager_comment_name ?? '',
            rc_comment: parsedTeam.rc_comment ?? '',
            rc_comment_at: parsedTeam.rc_comment_at ?? '',
            rc_comment_nik: parsedTeam.rc_comment_nik ?? '',
            rc_comment_name: parsedTeam.rc_comment_name ?? '',
            srmd_comment: parsedTeam.srmd_comment ?? '',
            srmd_comment_at: parsedTeam.srmd_comment_at ?? '',
            srmd_comment_nik: parsedTeam.srmd_comment_nik ?? '',
            srmd_comment_name: parsedTeam.srmd_comment_name ?? '',
          })

          setPriorityLevel(parsedTeam.priority_level ?? 'normal')
          setManagerComment(parsedTeam.manager_comment ?? '')
          setRcComment(parsedTeam.rc_comment ?? '')
          setSrmdComment(parsedTeam.srmd_comment ?? '')
          setStopEvents(hydrateEvents(result.stops, () => createDemoStopEvents(true)))
          setOutOfRouteEvents(hydrateEvents(result.out_of_route, () => createDemoRouteEvents(true)))
          setSpeedEvents(hydrateEvents(result.speed_violations, () => createDemoSpeedEvents(true)))
          await loadGps(reportData)
        } else if (issue) {
          setSavedIssue(issue)
        }
        setLoading(false)
        return
      }

      let reportData;
      if (reportId === 'mock-pending-3') {
        reportData = { id: 'mock-pending-3', date: '2026-02-15', estate: 'Estate B', type: 'Car' as const, nopol: 'BK 1212 CC', tracking_available: true }
      } else if (reportId === 'mock-pending-4') {
        reportData = { id: 'mock-pending-4', date: '2026-02-15', estate: 'Estate B', type: 'Motorcycle' as const, nopol: 'BK 5656 DD', tracking_available: true }
      } else if (reportId === 'mock-pending-5') {
        reportData = { id: 'mock-pending-5', date: '2026-02-16', estate: 'Estate B', type: 'Car' as const, nopol: 'BK 8989 EE', tracking_available: false }
      } else {
        const { data } = await supabase.from('patrol_reports').select('*').eq('id', reportId).single()
        reportData = data
      }

      if (!reportData) {
        setLoading(false)
        return
      }
      if (reportData.id === '307b9e87-548e-4a14-9cf8-03146a5b646d') {
        reportData.type = 'Car'
        reportData.nopol = 'BK 7788 XY'
      }
      setReport(reportData)
      
      const kind = getVehicleKind(reportData?.type)
      const limit = kind === 'motor' ? 2 : 1
      setTeamAssignment({
        manager: 'Budi Heru',
        pic: '',
        kanitpam: '',
        danru_shift1: '',
        danru_shift2: '',
        danru_shift3: '',
        driver_shift1: '',
        driver_shift2: '',
        driver_shift3: '',
        anggota_shift1: Array(limit).fill(''),
        anggota_shift2: Array(limit).fill(''),
        anggota_shift3: Array(limit).fill(''),
      })

      setStopEvents(createDemoStopEvents(false))
      setOutOfRouteEvents(createDemoRouteEvents(false))
      setSpeedEvents(createDemoSpeedEvents(false))

      await loadGps(reportData)
      setLoading(false)
    }

    async function loadGps(reportData: PatrolReport) {
      if (!reportData.tracking_available) return
      const reportDate = reportData.date?.slice(0, 10)
      const dateStart = `${reportDate}T00:00:00+00:00`
      const dateEnd = new Date(new Date(reportDate).getTime() + 86400000).toISOString().slice(0, 10) + 'T00:00:00+00:00'

      const { data } = await supabase.from('gps_positions')
        .select('*')
        .gte('fix_time', dateStart)
        .lt('fix_time', dateEnd)
        .order('fix_time', { ascending: true })

      if (!data) return
      setGpsData(data)
      if (USE_DEMO_EVENTS || readOnly) return

      const stopEvs: PatrolEvent[] = []
      let group: GpsPosition[] = []
      data.forEach((r: GpsPosition) => {
        if (r.speed < 2) {
          group.push(r)
        } else {
          if (group.length > 0) {
            const start = new Date(group[0].fix_time)
            const end = new Date(group[group.length - 1].fix_time)
            const durMin = (end.getTime() - start.getTime()) / 60000
            if (durMin >= 30) {
              const mid = group[Math.floor(group.length / 2)]
              const durStr = durMin >= 60 ? `${Math.floor(durMin / 60)} hours` : `${Math.floor(durMin)} min`
              stopEvs.push({
                id: stopEvs.length + 1,
                time: `${start.toTimeString().slice(0, 5)} - ${end.toTimeString().slice(0, 5)}`,
                duration: durStr,
                comment: 'Standby di pos',
                lat: mid.latitude - 0.016414,
                lng: mid.longitude + 0.066705,
              })
            }
            group = []
          }
        }
      })
      if (stopEvs.length > 0) setStopEvents(stopEvs)

      const speedEvs: PatrolEvent[] = []
      let speedGroup: GpsPosition[] = []
      data.forEach((r: GpsPosition) => {
        if (r.speed > 15) {
          speedGroup.push(r)
        } else {
          if (speedGroup.length >= 3) {
            const start = new Date(speedGroup[0].fix_time)
            const end = new Date(speedGroup[speedGroup.length - 1].fix_time)
            const mid = speedGroup[Math.floor(speedGroup.length / 2)]
            const track = speedGroup.map((x: GpsPosition) => [x.latitude - 0.016414, x.longitude + 0.066705] as [number, number])
            speedEvs.push({
              id: speedEvs.length + 1,
              time: `${start.toTimeString().slice(0, 5)} - ${end.toTimeString().slice(0, 5)}`,
              distance: `${(speedGroup.length * 0.3).toFixed(0)} km`,
              comment: '',
              lat: mid.latitude - 0.016414,
              lng: mid.longitude + 0.066705,
              track,
            })
          }
          speedGroup = []
        }
      })
      if (speedEvs.length > 0) setSpeedEvents(speedEvs)

      const medLat = 1.679553
      const medLng = 99.864516
      const outEvs: PatrolEvent[] = []
      let outGroup: GpsPosition[] = []
      data.forEach((r: GpsPosition) => {
        const dist = Math.sqrt((r.latitude - medLat) ** 2 + (r.longitude - medLng) ** 2)
        if (dist > 0.01 && r.speed > 2) {
          outGroup.push(r)
        } else {
          if (outGroup.length >= 5) {
            const start = new Date(outGroup[0].fix_time)
            const end = new Date(outGroup[outGroup.length - 1].fix_time)
            const mid = outGroup[Math.floor(outGroup.length / 2)]
            const track = outGroup.map((x: GpsPosition) => [x.latitude - 0.016414, x.longitude + 0.066705] as [number, number])
            const lats = track.map((p) => p[0])
            const lngs = track.map((p) => p[1])
            outEvs.push({
              id: outEvs.length + 1,
              time: `${start.toTimeString().slice(0, 5)} - ${end.toTimeString().slice(0, 5)}`,
              distance: `${(outGroup.length * 0.4).toFixed(0)} km`,
              comment: '',
              lat: mid.latitude - 0.016414,
              lng: mid.longitude + 0.066705,
              width: Math.max(...lngs) - Math.min(...lngs) + 0.005,
              height: Math.max(...lats) - Math.min(...lats) + 0.005,
              track,
            })
          }
          outGroup = []
        }
      })
      if (outEvs.length > 0) setOutOfRouteEvents(outEvs)
    }

    load()
  }, [reportId, readOnly])

  const handleSubmit = async () => {
    // Validate team assignment fields based on vehicle type
    const kind = getVehicleKind(report?.type)
    
    // Check global fields: Kanitpam and PIC
    if (!teamAssignment.kanitpam) {
      alert('Silakan pilih Kanitpam!')
      return
    }
    if (!teamAssignment.pic) {
      alert('Silakan pilih PIC!')
      return
    }

    if (kind === 'mobil') {
      for (const shiftNum of [1, 2, 3]) {
        const danru = teamAssignment[`danru_shift${shiftNum}` as keyof typeof teamAssignment]
        const driver = teamAssignment[`driver_shift${shiftNum}` as keyof typeof teamAssignment]
        const anggota = (teamAssignment[`anggota_shift${shiftNum}` as keyof typeof teamAssignment] as string[]) || []
        
        if (!danru) {
          alert(`Silakan pilih Danru untuk Shift ${shiftNum}!`)
          return
        }
        if (!driver) {
          alert(`Silakan pilih Driver untuk Shift ${shiftNum}! (Mobil wajib memiliki driver)`)
          return
        }
        const validMembers = anggota.filter(Boolean)
        if (validMembers.length === 0) {
          alert(`Silakan pilih minimal 1 Anggota untuk Shift ${shiftNum}!`)
          return
        }
      }
    } else {
      // motor
      for (const shiftNum of [1, 2, 3]) {
        const anggota = (teamAssignment[`anggota_shift${shiftNum}` as keyof typeof teamAssignment] as string[]) || []
        const validMembers = anggota.filter(Boolean)
        if (validMembers.length < 2) {
          alert(`Silakan pilih 2 Anggota untuk Shift ${shiftNum}! (Motor wajib memiliki 2 anggota)`)
          return
        }
      }
    }

    // Enforce PIC validation before submit
    const stopUncommented = stopEvents.some(e => !isEventCommented(e, 'stop'))
    const routeUncommented = outOfRouteEvents.some(e => !isEventCommented(e, 'route'))
    const speedUncommented = speedEvents.some(e => !isEventCommented(e, 'speed'))
    if (stopUncommented || routeUncommented || speedUncommented) {
      alert('Semua event exception (Berhenti, Keluar Rute, Kecepatan) wajib dikomentari sebelum mengirim!')
      return
    }

    const summaryWords = patrolSummary.trim().split(/\s+/).filter(Boolean).length
    if (summaryWords < 10) {
      alert('Ringkasan Patroli wajib diisi minimal 10 kata!')
      return
    }

    const actionWords = actionPlan.trim().split(/\s+/).filter(Boolean).length
    if (actionWords < 10) {
      alert('Rencana Tindakan wajib diisi minimal 10 kata!')
      return
    }

    if (reportId.startsWith('mock-pending-')) {
      setSuccess(true)
      setTimeout(() => router.push('/review-patrol'), 1500)
      return
    }

    setSubmitting(true)
    const assignmentPayload = {
      ...teamAssignment,
      priority_level: priorityLevel,
    }

    const { error } = await supabase.from('patrol_results').insert({
      report_id: reportId,
      stops: stopEvents,
      out_of_route: outOfRouteEvents,
      speed_violations: speedEvents,
      baseline_distance: stats.baselineDistance,
      actual_distance: stats.actualDistance,
      out_of_route_km: stats.outOfRoute,
      baseline_covered: stats.baselineCovered,
      baseline_covered_pct: stats.baselineCoveredPct,
      patrol_summary: patrolSummary,
      action_plan: actionPlan,
      team_assignment: assignmentPayload,
      submitted_at: new Date().toISOString(),
    })
    if (!error) {
      setSuccess(true)
      setTimeout(() => router.push('/review-patrol'), 1500)
    }
    setSubmitting(false)
  }

  const handleSaveManagerComment = async () => {
    setSavingComment(true)
    setCommentSaved(false)
    const now = new Date().toISOString()
    const newTeamAssignment = {
      ...teamAssignment,
      manager_comment: managerComment,
      manager_comment_at: now,
      manager_comment_nik: '1002345',
      manager_comment_name: teamAssignment.manager || 'Budi Heru',
    }

    if (reportId.startsWith('mock-uncommented-')) {
      setCommentSaved(true)
      setTeamAssignment(newTeamAssignment)
      setSavedResult((prev) => {
        const base = prev || {
          id: reportId,
          report_id: reportId,
          stops: [],
          out_of_route: [],
          speed_violations: [],
          baseline_distance: 0,
          actual_distance: 0,
          out_of_route_km: 0,
          baseline_covered: 0,
          baseline_covered_pct: 0,
          patrol_summary: 'Laporan Kendala',
          action_plan: 'Tindak Lanjut Kendala',
          submitted_at: now,
        } as any
        return {
          ...base,
          team_assignment: newTeamAssignment,
        }
      })
      setSavingComment(false)
      return
    }
    const { data, error } = await supabase.from('patrol_results').update({
      team_assignment: newTeamAssignment,
    }).eq('report_id', reportId).select()
    
    if (error) {
      console.error('Error saving manager comment:', error)
      setSavingComment(false)
      return
    }

    if (!data || data.length === 0) {
      const { error: insertError } = await supabase.from('patrol_results').insert({
        report_id: reportId,
        stops: [],
        out_of_route: [],
        speed_violations: [],
        baseline_distance: 0,
        actual_distance: 0,
        out_of_route_km: 0,
        baseline_covered: 0,
        baseline_covered_pct: 0,
        patrol_summary: 'Laporan Kendala',
        action_plan: 'Tindak Lanjut Kendala',
        team_assignment: newTeamAssignment,
        submitted_at: now,
      })
      if (insertError) {
        console.error('Error inserting comment results:', insertError)
        setSavingComment(false)
        return
      }
    }

    setCommentSaved(true)
    setTeamAssignment(newTeamAssignment)
    setSavedResult((prev) => {
      const base = prev || {
        id: reportId,
        report_id: reportId,
        stops: [],
        out_of_route: [],
        speed_violations: [],
        baseline_distance: 0,
        actual_distance: 0,
        out_of_route_km: 0,
        baseline_covered: 0,
        baseline_covered_pct: 0,
        patrol_summary: 'Laporan Kendala',
        action_plan: 'Tindak Lanjut Kendala',
        submitted_at: now,
      } as any
      return {
        ...base,
        team_assignment: newTeamAssignment,
      }
    })
    setSavingComment(false)
  }

  const handleSaveRcComment = async () => {
    setSavingRcComment(true)
    setRcCommentSaved(false)
    const now = new Date().toISOString()
    const newTeamAssignment = {
      ...teamAssignment,
      rc_comment: rcComment,
      rc_comment_at: now,
      rc_comment_nik: '2005432',
      rc_comment_name: teamAssignment.rc_comment_name || 'Dewi Anggraini',
    }

    if (reportId.startsWith('mock-')) {
      setRcCommentSaved(true)
      setTeamAssignment(newTeamAssignment)
      setSavedResult((prev: any) => {
        const base = prev || { id: reportId, report_id: reportId, team_assignment: newTeamAssignment }
        return { ...base, team_assignment: newTeamAssignment }
      })
      setSavingRcComment(false)
      return
    }

    const { data, error } = await supabase.from('patrol_results').update({
      team_assignment: newTeamAssignment,
    }).eq('report_id', reportId).select()

    if (!error) {
      setRcCommentSaved(true)
      setTeamAssignment(newTeamAssignment)
      setSavedResult((prev: any) => {
        const base = prev || { id: reportId, report_id: reportId, team_assignment: newTeamAssignment }
        return { ...base, team_assignment: newTeamAssignment }
      })
    }
    setSavingRcComment(false)
  }

  const handleSaveSrmdComment = async () => {
    setSavingSrmdComment(true)
    setSrmdCommentSaved(false)
    const now = new Date().toISOString()
    const newTeamAssignment = {
      ...teamAssignment,
      srmd_comment: srmdComment,
      srmd_comment_at: now,
      srmd_comment_nik: '3009876',
      srmd_comment_name: teamAssignment.srmd_comment_name || 'Hendra Wijaya',
    }

    if (reportId.startsWith('mock-')) {
      setSrmdCommentSaved(true)
      setTeamAssignment(newTeamAssignment)
      setSavedResult((prev: any) => {
        const base = prev || { id: reportId, report_id: reportId, team_assignment: newTeamAssignment }
        return { ...base, team_assignment: newTeamAssignment }
      })
      setSavingSrmdComment(false)
      return
    }

    const { data, error } = await supabase.from('patrol_results').update({
      team_assignment: newTeamAssignment,
    }).eq('report_id', reportId).select()

    if (!error) {
      setSrmdCommentSaved(true)
      setTeamAssignment(newTeamAssignment)
      setSavedResult((prev: any) => {
        const base = prev || { id: reportId, report_id: reportId, team_assignment: newTeamAssignment }
        return { ...base, team_assignment: newTeamAssignment }
      })
    }
    setSavingSrmdComment(false)
  }

  if (loading) return <div className="loading-state">Memuat...</div>
  if (!report) return <div className="loading-state error">Laporan tidak ditemukan</div>

  const toolbarTitle = readOnly ? 'Detail Laporan Disubmit' : 'Laporan Hasil Patroli'
  const toolbarSub = readOnly && (savedResult || savedIssue)
    ? `Disubmit ${new Date(savedResult?.submitted_at || savedIssue?.submitted_at || '').toLocaleDateString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric',
      })}`
    : 'Penjelasan hasil patroli harian dengan tracking GPS'

  if (!report.tracking_available) {
    return (
      <div className="page-panel">
        <div className="page-toolbar">
          <div className="page-toolbar-left">
            <button type="button" onClick={() => router.push(backHref)} className="btn btn-back">
              <ArrowLeft size={14} /> Kembali
            </button>
            <div>
              <h2 className="card-title">{toolbarTitle}</h2>
              <p className="page-sub">{toolbarSub}</p>
            </div>
          </div>
        </div>

        <div className="meta-row meta-row-toolbar">
          <div className="meta-cards-compact meta-cards-4">
            <div className="meta-card green">
              <span className="meta-icon"><Calendar size={16} /></span>
              <div>
                <span className="meta-label">Tanggal</span>
                <span className="meta-value">
                  {new Date(report.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
            <div className="meta-card orange">
              <span className="meta-icon"><Trees size={16} /></span>
              <div>
                <span className="meta-label">Estate</span>
                <span className="meta-value">{report.estate || ESTATE_NAME}</span>
              </div>
            </div>
            <div className="meta-card blue">
              <VehicleTypeBadge type={report.type} size="md" showLabel={false} />
              <div>
                <span className="meta-label">Tipe Kendaraan</span>
                <span className="meta-value">{formatVehicleType(report.type)}</span>
              </div>
            </div>
            <div className="meta-card purple">
              <span className="meta-icon"><MapPin size={16} /></span>
              <div>
                <span className="meta-label">Plat Nomor</span>
                <span className="meta-value">{report.nopol}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '20px' }}>
          <div className="card-accent red" />
          <div className="card-body">
            <div className="card-title-row" style={{ marginBottom: '16px' }}>
              <span className="card-title-icon" style={{ color: '#d32f2f', background: '#ffebee', borderColor: '#ffcdd2' }}>
                <AlertTriangle size={15} />
              </span>
              <h3 className="card-title-text">Detail Laporan Kendala</h3>
            </div>
            
            {(() => {
              const issueDetails = parseIssueDescription(savedIssue?.description || '')
              const isVehicleIssue = savedIssue?.issue_type === 'vehicle'
              const cols = isVehicleIssue ? '1fr 1fr 1fr' : '1fr 1fr'
              return (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        Jenis Kendala
                      </span>
                      <span style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '6px', fontWeight: 700, fontSize: '12px', background: '#ffebee', color: '#d32f2f', border: '1px solid #ffcdd2' }}>
                        {savedIssue?.issue_type === 'gps' ? 'GPS Rusak' : 'Unit/Kendaraan Rusak'}
                      </span>
                    </div>
                    {isVehicleIssue && (
                      <div>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                          Status Unit
                        </span>
                        <span style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '6px', fontWeight: 700, fontSize: '12px', background: '#e0f2f1', color: '#00695c', border: '1px solid #b2dfdb' }}>
                          {issueDetails.status}
                        </span>
                      </div>
                    )}
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        Tanggal Dilaporkan
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>
                        {savedIssue?.submitted_at
                          ? new Date(savedIssue.submitted_at).toLocaleDateString('id-ID', {
                              day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                            })
                          : '—'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Keterangan Kendala
                    </span>
                    <div className="form-readonly" style={{ padding: '12px', minHeight: '80px', whiteSpace: 'pre-wrap' }}>
                      {issueDetails.text || 'Tidak ada deskripsi kendala.'}
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
        </div>

        {/* EM RC SRMD Comments for Unit Rusak / Kendala */}
        {readOnly && (
          <div className="card manager-comment-card" style={{ marginBottom: '20px' }}>
            <div className="card-accent orange" />
            <div className="card-body">
              <div className="card-title-row">
                <span className="card-title-icon" style={{ color: '#ef6c00', background: '#fff3e0', borderColor: '#ffcc80' }}>
                  <ClipboardCheck size={15} />
                </span>
                <h3 className="card-title-text">Komentar EM Estate B</h3>
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: managerComment ? '#e8f5e9' : '#f5f5f5',
                    color: managerComment ? '#2e7d32' : '#757575',
                    border: `1px solid ${managerComment ? '#c8e6c9' : '#e0e0e0'}`,
                  }}
                >
                  {managerComment ? 'Sudah Dikomentari' : 'Belum Dikomentari'}
                </span>
              </div>
              <p className="manager-comment-hint">
                {currentUserRole === 'manager'
                  ? 'Tambahkan arahan dan tindak lanjut atas laporan kendala ini.'
                  : 'Kolom komentar khusus untuk Estate Manager (EM).'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <textarea
                  value={managerComment}
                  onChange={currentUserRole === 'manager' ? (e) => {
                    setManagerComment(e.target.value)
                    setCommentSaved(false)
                  } : undefined}
                  readOnly={currentUserRole !== 'manager'}
                  disabled={currentUserRole !== 'manager'}
                  placeholder={currentUserRole === 'manager' ? "Contoh: Harap segera lakukan penggantian unit atau servis berkala..." : "Akan diisi oleh EM..."}
                  className="form-textarea manager-comment-textarea"
                />
                {teamAssignment.manager_comment && (
                  <p style={{
                    alignSelf: 'flex-end',
                    margin: '6px 4px 0 0',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    fontStyle: 'italic',
                    textAlign: 'right',
                    lineHeight: 1.4,
                  }}>
                    {teamAssignment.manager_comment_name || 'Budi Heru'} (NIK: {teamAssignment.manager_comment_nik || '1002345'}) · {teamAssignment.manager_comment_at ? new Date(teamAssignment.manager_comment_at).toLocaleDateString('id-ID', {
                      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                    }) : ''}
                  </p>
                )}
              </div>
              {currentUserRole === 'manager' && (
                <div className="manager-comment-actions">
                  <button
                    type="button"
                    onClick={handleSaveManagerComment}
                    disabled={savingComment}
                    className="btn btn-primary"
                  >
                    <Save size={14} /> {savingComment ? 'Menyimpan...' : 'Simpan Komentar'}
                  </button>
                  {commentSaved && (
                    <span className="manager-comment-saved">
                      <CheckCircle size={14} /> Komentar tersimpan
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {readOnly && (
          <div className="card rc-comment-card" style={{ marginBottom: '20px' }}>
            <div className="card-accent purple" />
            <div className="card-body">
              <div className="card-title-row">
                <span className="card-title-icon" style={{ color: '#5e35b1', background: '#ede7f6', borderColor: '#d1c4e9' }}>
                  <Shield size={15} />
                </span>
                <h3 className="card-title-text">Komentar RC</h3>
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: rcComment ? '#e8f5e9' : '#f5f5f5',
                    color: rcComment ? '#2e7d32' : '#757575',
                    border: `1px solid ${rcComment ? '#c8e6c9' : '#e0e0e0'}`,
                  }}
                >
                  {rcComment ? 'Sudah Dikomentari' : 'Menunggu RC'}
                </span>
              </div>
              <p className="manager-comment-hint">
                {currentUserRole === 'rc'
                  ? 'Masukkan arahan dan evaluasi Anda sebagai RC.'
                  : 'Kolom komentar khusus untuk Regional Coordinator (RC).'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <textarea
                  value={rcComment}
                  onChange={currentUserRole === 'rc' ? (e) => {
                    setRcComment(e.target.value)
                    setRcCommentSaved(false)
                  } : undefined}
                  readOnly={currentUserRole !== 'rc'}
                  disabled={currentUserRole !== 'rc'}
                  placeholder={currentUserRole === 'rc' ? "Tulis komentar RC di sini..." : "Akan diisi oleh RC..."}
                  className="form-textarea manager-comment-textarea rc-comment-textarea"
                />
                {teamAssignment.rc_comment && (
                  <p style={{
                    alignSelf: 'flex-end',
                    margin: '6px 4px 0 0',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    fontStyle: 'italic',
                    textAlign: 'right',
                    lineHeight: 1.4,
                  }}>
                    {teamAssignment.rc_comment_name} (NIK: {teamAssignment.rc_comment_nik}) · {teamAssignment.rc_comment_at ? new Date(teamAssignment.rc_comment_at).toLocaleDateString('id-ID', {
                      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                    }) : ''}
                  </p>
                )}
              </div>
              {currentUserRole === 'rc' && (
                <div className="manager-comment-actions" style={{ marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={handleSaveRcComment}
                    disabled={savingRcComment}
                    className="btn btn-primary"
                  >
                    <Save size={14} /> {savingRcComment ? 'Menyimpan...' : 'Simpan Komentar'}
                  </button>
                  {rcCommentSaved && (
                    <span className="manager-comment-saved">
                      <CheckCircle size={14} /> Komentar tersimpan
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {readOnly && (
          <div className="card srmd-comment-card" style={{ marginBottom: '20px' }}>
            <div className="card-accent" style={{ background: '#00796b' }} />
            <div className="card-body">
              <div className="card-title-row">
                <span className="card-title-icon" style={{ color: '#00796b', background: '#e0f2f1', borderColor: '#b2dfdb' }}>
                  <Shield size={15} />
                </span>
                <h3 className="card-title-text">Komentar SRMD</h3>
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: srmdComment ? '#e8f5e9' : '#f5f5f5',
                    color: srmdComment ? '#2e7d32' : '#757575',
                    border: `1px solid ${srmdComment ? '#c8e6c9' : '#e0e0e0'}`,
                  }}
                >
                  {srmdComment ? 'Sudah Dikomentari' : 'Menunggu SRMD'}
                </span>
              </div>
              <p className="manager-comment-hint">
                {currentUserRole === 'srmd'
                  ? 'Masukkan arahan dan keputusan Anda sebagai SRMD.'
                  : 'Kolom komentar khusus untuk SRMD Manager.'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <textarea
                  value={srmdComment}
                  onChange={currentUserRole === 'srmd' ? (e) => {
                    setSrmdComment(e.target.value)
                    setSrmdCommentSaved(false)
                  } : undefined}
                  readOnly={currentUserRole !== 'srmd'}
                  disabled={currentUserRole !== 'srmd'}
                  placeholder={currentUserRole === 'srmd' ? "Tulis komentar SRMD di sini..." : "Akan diisi oleh SRMD..."}
                  className="form-textarea manager-comment-textarea srmd-comment-textarea"
                />
                {teamAssignment.srmd_comment && (
                  <p style={{
                    alignSelf: 'flex-end',
                    margin: '6px 4px 0 0',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    fontStyle: 'italic',
                    textAlign: 'right',
                    lineHeight: 1.4,
                  }}>
                    {teamAssignment.srmd_comment_name} (NIK: {teamAssignment.srmd_comment_nik}) · {teamAssignment.srmd_comment_at ? new Date(teamAssignment.srmd_comment_at).toLocaleDateString('id-ID', {
                      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                    }) : ''}
                  </p>
                )}
              </div>
              {currentUserRole === 'srmd' && (
                <div className="manager-comment-actions" style={{ marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={handleSaveSrmdComment}
                    disabled={savingSrmdComment}
                    className="btn btn-primary"
                  >
                    <Save size={14} /> {savingSrmdComment ? 'Menyimpan...' : 'Simpan Komentar'}
                  </button>
                  {srmdCommentSaved && (
                    <span className="manager-comment-saved">
                      <CheckCircle size={14} /> Komentar tersimpan
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="page-panel">
      <div className="page-toolbar">
        <div className="page-toolbar-left">
          <button type="button" onClick={() => router.push(backHref)} className="btn btn-back">
            <ArrowLeft size={14} /> Kembali
          </button>
          <div>
            <h2 className="card-title">{toolbarTitle}</h2>
            <p className="page-sub">{toolbarSub}</p>
          </div>
        </div>
        {!readOnly && (
          <div className="btn-group">
            <button type="button" onClick={() => router.push(`/review-patrol/${reportId}/kendala`)} className="btn btn-danger">
              <AlertTriangle size={14} /> INTERVENSI
            </button>
            <button type="button" onClick={handleSubmit} disabled={submitting} className="btn btn-primary">
              <Plus size={14} /> {submitting ? 'Menyimpan...' : 'KIRIM'}
            </button>
          </div>
        )}
        {readOnly && (
          <div className="page-toolbar-right" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Filter Shift:</span>
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="form-select"
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                background: '#eceff1',
                color: 'var(--text-dark)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                height: '34px',
                outline: 'none',
                width: '130px',
              }}
            >
              <option value="all">Semua Shift</option>
              <option value="1">Shift 1</option>
              <option value="2">Shift 2</option>
              <option value="3">Shift 3</option>
            </select>
          </div>
        )}
      </div>

      <div className="meta-row meta-row-toolbar">
        <div className="meta-cards-compact meta-cards-4">
          <div className="meta-card green">
            <span className="meta-icon"><Calendar size={16} /></span>
            <div>
              <span className="meta-label">Tanggal</span>
              <span className="meta-value">
                {new Date(report.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>
          <div className="meta-card orange">
            <span className="meta-icon"><Trees size={16} /></span>
            <div>
              <span className="meta-label">Estate</span>
              <span className="meta-value">{report.estate || ESTATE_NAME}</span>
            </div>
          </div>
          <div className="meta-card blue">
            <VehicleTypeBadge type={report.type} size="md" showLabel={false} />
            <div>
              <span className="meta-label">Tipe Kendaraan</span>
              <span className="meta-value">{formatVehicleType(report.type)}</span>
            </div>
          </div>
          <div className="meta-card purple">
            <span className="meta-icon"><MapPin size={16} /></span>
            <div>
              <span className="meta-label">Plat Nomor</span>
              <span className="meta-value">{report.nopol}</span>
            </div>
          </div>
        </div>

        {/* New Compact Stats Cards */}
        <div className="meta-cards-stats">
          <div className={`meta-stat-card green-stat ${totalStopMinutes > 360 ? 'warning-pulse' : ''}`}>
            {totalStopMinutes > 360 && (
              <div className="meta-stat-alert-tag eye-catching" title={`Total waktu berhenti melebihi standar! (${formatMinutesToHoursMins(totalStopMinutes)})`}>
                <AlertTriangle size={10} className="warning-icon-pulse" />
                <span>BERHENTI &gt; 6 JAM</span>
              </div>
            )}
            <span className="meta-stat-pct">{movingPct}%</span>
            <span className="meta-stat-label">Waktu Bergerak</span>
          </div>
          <div className="meta-stat-card orange-stat">
            <span className="meta-stat-pct">{rawanPassPct}%</span>
            <span className="meta-stat-label">Di Blok Rawan</span>
          </div>
          <div className="meta-stat-card blue-stat">
            <span className="meta-stat-pct">{stats.baselineCoveredPct}%</span>
            <span className="meta-stat-label">Baseline Tercover</span>
          </div>
        </div>
        <div className="priority-panel">
          <span className="priority-panel-label">Prioritas</span>
          {readOnly ? (
            <span className={`priority-badge-readonly ${priorityLevel === 'urgent' ? 'urgent' : 'normal'}`}>
              {priorityLevel === 'urgent' ? 'Urgent' : 'Normal'}
            </span>
          ) : (
            <div className="priority-segment" role="radiogroup" aria-label="Prioritas laporan">
              <label className={`priority-option ${priorityLevel === 'normal' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="priority"
                  value="normal"
                  checked={priorityLevel === 'normal'}
                  onChange={() => setPriorityLevel('normal')}
                />
                <span>Normal</span>
              </label>
              <label className={`priority-option urgent ${priorityLevel === 'urgent' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="priority"
                  value="urgent"
                  checked={priorityLevel === 'urgent'}
                  onChange={() => setPriorityLevel('urgent')}
                />
                <span>Urgent</span>
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="card map-section map-section-accordion">
        <div className="card-accent blue" />
        <div className="card-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="card-title-icon"><MapPin size={15} /></span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-dark)' }}>Visualisasi Peta & Exception</span>
          </div>

          <div className="grid-map">
            <div className="map-container" style={{ position: 'relative' }}>
              <MapViewer
                gpsData={gpsData}
                stopEvents={mapStopEvents}
                routeEvents={mapRouteEvents}
                speedEvents={mapSpeedEvents}
                exceptionFilter={mapExceptionFilter}
                focusedEventId={selectedEventId}
                selectedShift={selectedShift}
              />
              
              {/* Floating Exception Control Panel inside Map */}
              <div
                className="map-exception-floating-panel"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  zIndex: 1000,
                  display: 'flex',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  borderRadius: '8px',
                  padding: '4px',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                  gap: '4px'
                }}
              >
                {[
                  { val: 'all', label: 'Tampilkan Semua Exception', icon: (active: boolean) => <Eye size={15} style={{ color: active ? 'white' : '#37474f' }} /> },
                  { val: 'stop', label: 'Hanya Berhenti', icon: (active: boolean) => <Octagon size={14} style={{ color: active ? 'white' : '#e53935' }} /> },
                  { val: 'route', label: 'Hanya Keluar Rute', icon: (active: boolean) => <Navigation size={14} style={{ color: active ? 'white' : '#ec4899', transform: 'rotate(45deg)' }} /> },
                  { val: 'speed', label: 'Hanya Speeding', icon: (active: boolean) => <Gauge size={14} style={{ color: active ? 'white' : '#ab47bc' }} /> },
                  { val: 'hide', label: 'Sembunyikan Semua', icon: (active: boolean) => <EyeOff size={15} style={{ color: active ? 'white' : '#546e7a' }} /> }
                ].map((opt) => {
                  const active = mapExceptionFilter === opt.val
                  return (
                    <button
                      key={opt.val}
                      type="button"
                      title={opt.label}
                      onClick={() => setMapExceptionFilter(opt.val as any)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '30px',
                        height: '30px',
                        borderRadius: '6px',
                        border: 'none',
                        background: active ? 'var(--primary)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {opt.icon(active)}
                    </button>
                  )
                })}
              </div>
            </div>

            <EventAccordionPanel
              activeCategory={activeEventTab}
              onCategoryChange={(cat) => {
                setActiveEventTab(cat)
                setSelectedEventId(null)
              }}
              stopEvents={filteredStopEvents}
              outOfRouteEvents={filteredRouteEvents}
              speedEvents={filteredSpeedEvents}
              selectedId={selectedEventId}
              onSelectStop={(e) => setSelectedEventId(e.id)}
              onSelectRoute={(e) => setSelectedEventId(e.id)}
              onSelectSpeed={(e) => setSelectedEventId(e.id)}
              onStopCommentChange={(id, category, detail) =>
                setStopEvents((prev) => updateEventComment(prev, id, category, detail, 'stop'))
              }
              onRouteCommentChange={(id, category, detail) =>
                setOutOfRouteEvents((prev) => updateEventComment(prev, id, category, detail, 'route'))
              }
              onSpeedCommentChange={(id, category, detail) =>
                setSpeedEvents((prev) => updateEventComment(prev, id, category, detail, 'speed'))
              }
              readOnly={readOnly}
            />
          </div>
        </div>
      </div>

      <div className="grid-analysis">
        <div className="card analysis-card">
          <div className="card-accent purple" />
          <div className="card-body">
            <div className="card-title-row">
              <span className="card-title-icon" style={{ color: '#5e35b1', background: '#ede7f6', borderColor: '#d1c4e9' }}>
                <BarChart2 size={15} />
              </span>
              <h3 className="card-title-text">Analisis Patroli</h3>
            </div>
            <div className="donut-grid">
              <div className="donut-card green">
                <p className="donut-label" style={{ marginBottom: '4px' }}>Waktu Bergerak</p>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px', borderBottom: '1px dashed #c8e6c9', paddingBottom: '6px' }}>
                  <span>Total Durasi Patroli: <strong>24 Jam</strong></span>
                </div>
                <div className="donut-ring">
                  <svg viewBox="0 0 140 140" aria-hidden>
                    <circle cx={DONUT_CX} cy={DONUT_CX} r={DONUT_R} fill="none" stroke="#edf1f7" strokeWidth={DONUT_STROKE} />
                    <circle cx={DONUT_CX} cy={DONUT_CX} r={DONUT_R} fill="none" stroke="#43a047" strokeWidth={DONUT_STROKE}
                      strokeDasharray={donutArc(movingPct)} strokeLinecap="round" />
                    <circle cx={DONUT_CX} cy={DONUT_CX} r={DONUT_R} fill="none" stroke="#e53935" strokeWidth={DONUT_STROKE}
                      strokeDasharray={donutArc(stopPct)}
                      strokeDashoffset={donutOff(movingPct)} strokeLinecap="round" />
                  </svg>
                  <span className="donut-value green">{movingPct}%</span>
                </div>
                {totalStopMinutes > 360 && (
                  <div className="anomaly-alert-banner">
                    <AlertTriangle size={14} className="animate-pulse" />
                    <span>Total Berhenti &gt; 6 Jam! ({formatMinutesToHoursMins(totalStopMinutes)})</span>
                  </div>
                )}
                <div className="donut-legend" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '80px' }}>
                      <span className="legend-dot green" />
                      <span>Bergerak</span>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1, fontWeight: 700, color: 'var(--text-dark)' }}>{formatMinutesToHoursMins(1440 - totalStopMinutes)}</div>
                    <div style={{ textAlign: 'right', width: '50px' }}>({movingPct}%)</div>
                  </div>
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '80px' }}>
                      <span className="legend-dot red" />
                      <span>Berhenti</span>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1, fontWeight: 700, color: totalStopMinutes > 360 ? '#c62828' : 'var(--text-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      {formatMinutesToHoursMins(totalStopMinutes)}
                      {totalStopMinutes > 360 && (
                        <span title="Total berhenti melebihi 6 jam sehari!" style={{ display: 'inline-flex', alignItems: 'center' }}>
                          <AlertTriangle size={12} style={{ color: '#c62828' }} />
                        </span>
                      )}
                    </div>
                    <div style={{ textAlign: 'right', width: '50px' }}>({stopPct}%)</div>
                  </div>
                </div>
              </div>

              <div className="donut-card blue">
                <p className="donut-label" style={{ marginBottom: '4px' }}>Blok Rawan vs Non Rawan</p>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px', borderBottom: '1px dashed #bbdefb', paddingBottom: '6px' }}>
                  <span>Total Kunjungan: <strong>{totalPasses}x Lewat</strong></span>
                </div>
                <div className="donut-ring">
                  <svg viewBox="0 0 140 140" aria-hidden>
                    <circle cx={DONUT_CX} cy={DONUT_CX} r={DONUT_R} fill="none" stroke="#edf1f7" strokeWidth={DONUT_STROKE} />
                    {/* Circle 1: Blok Rawan (Blue - Positive Focus) */}
                    <circle cx={DONUT_CX} cy={DONUT_CX} r={DONUT_R} fill="none" stroke="#1565d8" strokeWidth={DONUT_STROKE}
                       strokeDasharray={donutArc(rawanPassPct)} strokeLinecap="round" />
                    {/* Circle 2: Blok Non Rawan (Red - Other Color) */}
                    <circle cx={DONUT_CX} cy={DONUT_CX} r={DONUT_R} fill="none" stroke="#ef5350" strokeWidth={DONUT_STROKE}
                       strokeDasharray={donutArc(nonRawanPassPct)}
                       strokeDashoffset={donutOff(rawanPassPct)} strokeLinecap="round" />
                  </svg>
                  <span className="donut-value blue">{rawanPassPct}%</span>
                </div>
                <div className="donut-legend" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100px' }}>
                      <span className="legend-dot blue" />
                      <span>Blok Rawan</span>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1, fontWeight: 700, color: 'var(--text-dark)' }}>{rawanPasses}x Lewat</div>
                    <div style={{ textAlign: 'right', width: '50px' }}>({rawanPassPct}%)</div>
                  </div>
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100px' }}>
                      <span className="legend-dot red" />
                      <span>Blok Non Rawan</span>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1, fontWeight: 700, color: 'var(--text-dark)' }}>{nonRawanPasses}x Lewat</div>
                    <div style={{ textAlign: 'right', width: '50px' }}>({nonRawanPassPct}%)</div>
                  </div>
                </div>
              </div>

              <div className="donut-card yellow">
                <p className="donut-label" style={{ marginBottom: '4px' }}>Blok Rawan Dilewati</p>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px', borderBottom: '1px dashed #ffe082', paddingBottom: '6px', gap: '12px' }}>
                  <span>Total Blok Rawan: <strong style={{ color: '#f57f17' }}>{stats.blokRawan.totalCount}</strong></span>
                  <span>Tidak Dilewati: <strong style={{ color: '#e53935' }}>{stats.blokRawan.uncheckedCount}</strong></span>
                </div>
                <div className="donut-ring">
                  <svg viewBox="0 0 140 140" aria-hidden>
                    <circle cx={DONUT_CX} cy={DONUT_CX} r={DONUT_R} fill="none" stroke="#edf1f7" strokeWidth={DONUT_STROKE} />
                    
                    {/* Circle 1: Dicek >2x (Green) */}
                    <circle cx={DONUT_CX} cy={DONUT_CX} r={DONUT_R} fill="none" stroke="#43a047" strokeWidth={DONUT_STROKE}
                      strokeDasharray={donutArc(blokRawanArcs.checkedGt2x)} strokeLinecap="round" />
                    
                    {/* Circle 2: Dicek 2x (Yellow) */}
                    <circle cx={DONUT_CX} cy={DONUT_CX} r={DONUT_R} fill="none" stroke="#fdd835" strokeWidth={DONUT_STROKE}
                      strokeDasharray={donutArc(blokRawanArcs.checked2x)}
                      strokeDashoffset={donutOff(blokRawanArcs.checkedGt2x)} strokeLinecap="round" />
                    
                    {/* Circle 3: Dicek 1x (Orange) */}
                    <circle cx={DONUT_CX} cy={DONUT_CX} r={DONUT_R} fill="none" stroke="#fb8c00" strokeWidth={DONUT_STROKE}
                      strokeDasharray={donutArc(blokRawanArcs.checked1x)}
                      strokeDashoffset={donutOff(blokRawanArcs.checkedGt2x + blokRawanArcs.checked2x)} strokeLinecap="round" />
                    
                    {/* Circle 4: Belum Dicek (Red) */}
                    <circle cx={DONUT_CX} cy={DONUT_CX} r={DONUT_R} fill="none" stroke="#e53935" strokeWidth={DONUT_STROKE}
                      strokeDasharray={donutArc(blokRawanArcs.unchecked)}
                      strokeDashoffset={donutOff(blokRawanArcs.checkedGt2x + blokRawanArcs.checked2x + blokRawanArcs.checked1x)} strokeLinecap="round" />

                    {/* SVG Segment Labels positioned dynamically with pill backgrounds */}
                    {(() => {
                      const segments = [
                        { val: blokRawanArcs.checkedGt2x },
                        { val: blokRawanArcs.checked2x },
                        { val: blokRawanArcs.checked1x },
                        { val: blokRawanArcs.unchecked }
                      ]
                      let cumulative = 0
                      return segments.map((seg, idx) => {
                        if (seg.val <= 0) return null
                        const startPct = cumulative
                        cumulative += seg.val
                        const midPct = startPct + seg.val / 2
                        
                        const angle = (midPct / 100) * 2 * Math.PI
                        const x = DONUT_CX + DONUT_R * Math.cos(angle)
                        const y = DONUT_CX + DONUT_R * Math.sin(angle)
                        
                        return (
                          <g key={idx}>
                            {/* Pill-shaped dark background badge for text */}
                            <rect
                              x={x - 14}
                              y={y - 8}
                              width={28}
                              height={16}
                              rx={8}
                              fill="#1e293b"
                              transform={`rotate(90 ${x} ${y})`}
                            />
                            <text
                              x={x}
                              y={y}
                              fill="#ffffff"
                              fontSize="9"
                              fontWeight="bold"
                              textAnchor="middle"
                              dominantBaseline="central"
                              transform={`rotate(90 ${x} ${y})`}
                            >
                              {Math.round(seg.val)}%
                            </text>
                          </g>
                        )
                      })
                    })()}
                  </svg>
                </div>
                <div className="donut-legend" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100px' }}>
                      <span className="legend-dot green" />
                      <span>Dicek &gt;2x</span>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1, fontWeight: 700, color: 'var(--text-dark)' }}>{stats.blokRawan.checkedGt2xCount} Blok</div>
                    <div style={{ textAlign: 'right', width: '50px' }}>({Math.round(blokRawanArcs.checkedGt2x)}%)</div>
                  </div>
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100px' }}>
                      <span className="legend-dot yellow" />
                      <span>Dicek 2x</span>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1, fontWeight: 700, color: 'var(--text-dark)' }}>{stats.blokRawan.checked2xCount} Blok</div>
                    <div style={{ textAlign: 'right', width: '50px' }}>({Math.round(blokRawanArcs.checked2x)}%)</div>
                  </div>
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100px' }}>
                      <span className="legend-dot orange" />
                      <span>Dicek 1x</span>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1, fontWeight: 700, color: 'var(--text-dark)' }}>{stats.blokRawan.checked1xCount} Blok</div>
                    <div style={{ textAlign: 'right', width: '50px' }}>({Math.round(blokRawanArcs.checked1x)}%)</div>
                  </div>
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100px' }}>
                      <span className="legend-dot red" />
                      <span>Belum Dicek</span>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1, fontWeight: 700, color: 'var(--text-dark)' }}>{stats.blokRawan.uncheckedCount} Blok</div>
                    <div style={{ textAlign: 'right', width: '50px' }}>({Math.round(blokRawanArcs.unchecked)}%)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card stats-card stats-card-tall">
          <div className="card-accent blue" />
          <div className="card-body">
            <div className="card-title-row">
              <span className="card-title-icon"><List size={15} /></span>
              <h3 className="card-title-text">Statistik</h3>
            </div>
            
            <div className="stats-groups-fill">
              {/* Group 1: Jarak Baseline */}
              <div className="stats-group-box blue-group">
                <div className="stats-group-header">
                  <span className="group-header-title">Jarak Baseline</span>
                  <span className="group-header-value">{stats.baselineDistance} km</span>
                </div>
                <div className="stats-group-divider" />
                <div className="stats-group-list">
                  <div className="stats-group-item">
                    <div className="item-label-wrap">
                      <span className="item-bullet blue-dot" />
                      <span className="item-label">Jarak Baseline Tercover</span>
                    </div>
                    <span className="item-value">{stats.baselineCovered} km</span>
                  </div>
                  <div className="stats-group-item">
                    <div className="item-label-wrap">
                      <span className="item-bullet yellow-dot" />
                      <span className="item-label">% Jarak Baseline Tercover</span>
                    </div>
                    <span className="item-value highlight-bg">{stats.baselineCoveredPct}%</span>
                  </div>
                </div>
              </div>

              {/* Group 2: Jarak Aktual */}
              <div className="stats-group-box purple-group">
                <div className="stats-group-header">
                  <span className="group-header-title">Jarak Aktual</span>
                  <span className="group-header-value">{stats.actualDistance} km</span>
                </div>
                <div className="stats-group-divider" />
                <div className="stats-group-list">
                  <div className="stats-group-item">
                    <div className="item-label-wrap">
                      <span className="item-bullet green-dot" />
                      <span className="item-label">Jarak Aktual Sesuai Baseline</span>
                    </div>
                    <span className="item-value">{stats.inRoute} km</span>
                  </div>
                  <div className="stats-group-item">
                    <div className="item-label-wrap">
                      <span className="item-bullet red-dot" />
                      <span className="item-label">Jarak Aktual Keluar Baseline</span>
                    </div>
                    <span className="item-value">{stats.outOfRoute} km</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="table-panel">
        <div className="table-head">
          <div className="table-title-wrap">
            <span className="table-title-icon" style={{ color: '#5e35b1', background: '#ede7f6', borderColor: '#d1c4e9' }}>
              <List size={14} />
            </span>
            <h3 className="table-title">Detail Patroli per Shift</h3>
          </div>
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                {['Shift', 'Waktu Bergerak', 'Waktu Berhenti', 'Kec. Rerata (km/j)', 'Kec. Maks (km/j)', 'Nama Rute', 'Target (km)', 'Aktual (km)', 'Keluar Jalur (km)', 'Dalam Jalur (km)', '% Tercover'].map((h) => (
                  <th key={h} className="text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift.no}>
                  <td className="text-left">
                    <span className={`shift-badge s${shift.no}`}>{shift.no}</span>
                  </td>
                  <td className="text-left">{shift.movingTime}</td>
                  <td className="text-left">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-start' }}>
                      <span>{shift.stopTime}</span>
                      {parseTimeToMinutes(shift.stopTime) > getShiftStopLimit(shift.no) && (
                        <span className="stop-warning-flag eye-catching" title={`Melebihi standar Shift ${shift.no} (${formatMinutesToHoursMins(getShiftStopLimit(shift.no))})`}>
                          <AlertTriangle size={11} className="warning-icon-pulse" />
                          <span>OVERTIME</span>
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-left">{shift.avgSpeed}</td>
                  <td className="text-left">{(shift as any).maxSpeed || 0}</td>
                  <td className="text-left">{shift.baseline}</td>
                  <td className="text-left">{shift.baselineDist}</td>
                  <td className="text-left">{shift.actualDist}</td>
                  <td className="cell-bad">{shift.outOfRoute}</td>
                  <td className="cell-good">{shift.inRoute}</td>
                  <td>
                    <span className={`pct-badge ${shift.pct >= 70 ? 'good' : shift.pct >= 60 ? 'warn' : 'bad'}`}>{shift.pct}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-accent blue" />
        <div className="card-body">
          <div className="card-title-row">
            <span className="card-title-icon"><Users size={15} /></span>
            <h3 className="card-title-text">Penugasan Tim</h3>
          </div>
          
          {/* Global Roles Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
            <div className="team-field">
              <p className="team-field-label">
                <span className="team-dot" style={{ background: '#2e7d32' }} /> Manajer
              </p>
              <div className="form-readonly">Budi Heru</div>
            </div>
            
            <div className="team-field">
              <p className="team-field-label">
                <span className="team-dot" style={{ background: '#7b1fa2' }} /> Kanitpam
              </p>
              {readOnly ? (
                <div className="form-readonly">{teamAssignment.kanitpam || '—'}</div>
              ) : (
                <select
                  value={teamAssignment.kanitpam}
                  onChange={(e) => setTeamAssignment((prev: any) => ({ ...prev, kanitpam: e.target.value }))}
                  className="form-select"
                >
                  <option value="">Pilih Kanitpam</option>
                  {(TEAM_OPTIONS.kanitpam ?? []).map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="team-field">
              <p className="team-field-label">
                <span className="team-dot" style={{ background: '#43a047' }} /> PIC
              </p>
              {readOnly ? (
                <div className="form-readonly">{teamAssignment.pic || '—'}</div>
              ) : (
                <select
                  value={teamAssignment.pic}
                  onChange={(e) => setTeamAssignment((prev: any) => ({ ...prev, pic: e.target.value }))}
                  className="form-select"
                >
                  <option value="">Pilih PIC</option>
                  {(TEAM_OPTIONS.pic ?? []).map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Shift Columns Layout */}
          {(() => {
            const kind = getVehicleKind(report?.type)
            return (
              <div className="team-shifts-layout">
                {[1, 2, 3].map((shiftNum) => {
                  const danruKey = `danru_shift${shiftNum}` as any
                  const driverKey = `driver_shift${shiftNum}` as any
                  const anggotaKey = `anggota_shift${shiftNum}` as any
                  
                  const danruVal = teamAssignment[danruKey] as string
                  const driverVal = teamAssignment[driverKey] as string
                  const anggotaVal = (teamAssignment[anggotaKey] as string[]) || []

                  const danruOptions = TEAM_OPTIONS[danruKey] || []
                  const driverOptions = TEAM_OPTIONS[driverKey] || []
                  const anggotaOptions = TEAM_OPTIONS[anggotaKey] || []

                  const handleDanruChange = (val: string) => {
                    setTeamAssignment((prev: any) => ({ ...prev, [danruKey]: val }))
                  }

                  const handleDriverChange = (val: string) => {
                    setTeamAssignment((prev: any) => ({ ...prev, [driverKey]: val }))
                  }

                  const handleAnggotaChange = (idx: number, val: string) => {
                    setTeamAssignment((prev: any) => {
                      const arr = [...anggotaVal]
                      arr[idx] = val
                      return { ...prev, [anggotaKey]: arr }
                    })
                  }

                  const addAnggota = () => {
                    if (anggotaVal.length < 10) {
                      setTeamAssignment((prev: any) => ({
                        ...prev,
                        [anggotaKey]: [...anggotaVal, ''],
                      }))
                    }
                  }

                  const removeAnggota = (idx: number) => {
                    setTeamAssignment((prev: any) => {
                      const arr = anggotaVal.filter((_, i) => i !== idx)
                      return { ...prev, [anggotaKey]: arr }
                    })
                  }

                  return (
                    <div key={shiftNum} className="shift-card">
                      <div className="shift-card-header">
                        <span className={`shift-number-badge s${shiftNum}`}>{shiftNum}</span>
                        <span>Shift {shiftNum}</span>
                      </div>

                      {kind === 'mobil' && (
                        <>
                          {/* Danru */}
                          <div className="shift-field-group">
                            <span className="shift-field-title">
                              <span className="shift-field-dot" style={{ background: '#00897b' }} /> Danru
                            </span>
                            {readOnly ? (
                              <div className="form-readonly">{danruVal || '—'}</div>
                            ) : (
                              <select
                                value={danruVal}
                                onChange={(e) => handleDanruChange(e.target.value)}
                                className="form-select"
                              >
                                <option value="">Pilih Danru</option>
                                {danruOptions.map((name) => (
                                  <option key={name} value={name}>{name}</option>
                                ))}
                              </select>
                            )}
                          </div>

                          {/* Driver */}
                          <div className="shift-field-group">
                            <span className="shift-field-title">
                              <span className="shift-field-dot" style={{ background: '#e53935' }} /> Driver
                            </span>
                            {readOnly ? (
                              <div className="form-readonly">{driverVal || '—'}</div>
                            ) : (
                              <select
                                value={driverVal}
                                onChange={(e) => handleDriverChange(e.target.value)}
                                className="form-select"
                              >
                                <option value="">Pilih Driver</option>
                                {driverOptions.map((name) => (
                                  <option key={name} value={name}>{name}</option>
                                ))}
                              </select>
                            )}
                          </div>
                        </>
                      )}

                      {/* Anggota */}
                      <div className="shift-field-group">
                        <span className="shift-field-title">
                          <span className="shift-field-dot" style={{ background: '#1565c0' }} /> Anggota
                        </span>
                        <div className="members-list">
                          {anggotaVal.map((member, idx) => (
                            <div key={idx} className="member-input-row">
                              {readOnly ? (
                                <div className="form-readonly" style={{ flex: 1 }}>{member || '—'}</div>
                              ) : (
                                <>
                                  <select
                                    value={member}
                                    onChange={(e) => handleAnggotaChange(idx, e.target.value)}
                                    className="form-select"
                                    style={{ flex: 1 }}
                                  >
                                    <option value="">Pilih Anggota</option>
                                    {anggotaOptions.map((name) => (
                                      <option key={name} value={name}>{name}</option>
                                    ))}
                                  </select>
                                  {kind === 'mobil' && (
                                    <button
                                      type="button"
                                      onClick={() => removeAnggota(idx)}
                                      className="btn-remove-member"
                                      title="Hapus Anggota"
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                          {anggotaVal.length === 0 && readOnly && (
                            <div className="form-readonly">—</div>
                          )}
                        </div>

                        {!readOnly && kind === 'mobil' && anggotaVal.length < 10 && (
                          <button
                            type="button"
                            onClick={addAnggota}
                            className="btn-add-member"
                          >
                            <Plus size={13} /> Tambah Anggota
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })()}
        </div>
      </div>

      <div className="grid-2">
        <div className="card summary-card">
          <div className="card-accent slate" />
          <div className="card-body">
            <div className="card-title-row">
              <span className="card-title-icon"><MessageSquare size={15} /></span>
              <h3 className="card-title-text">Ringkasan Patroli</h3>
            </div>
            {readOnly ? (
              <div className="form-readonly form-readonly-textarea">{patrolSummary || '—'}</div>
            ) : (
              <textarea
                value={patrolSummary}
                onChange={(e) => setPatrolSummary(e.target.value)}
                placeholder="Patroli berjalan dengan lancar, aman terkendali"
                className="form-textarea"
              />
            )}
          </div>
        </div>
        <div className="card summary-card">
          <div className="card-accent green" />
          <div className="card-body">
            <div className="card-title-row">
              <span className="card-title-icon" style={{ color: '#2e7d32', background: '#e8f5e9', borderColor: '#a5d6a7' }}>
                <MessageSquare size={15} />
              </span>
              <h3 className="card-title-text">Rencana Tindakan</h3>
            </div>
            {readOnly ? (
              <div className="form-readonly form-readonly-textarea">{actionPlan || '—'}</div>
            ) : (
              <textarea
                value={actionPlan}
                onChange={(e) => setActionPlan(e.target.value)}
                placeholder="Patroli harus lebih memperhatikan rute dan blok rawan"
                className="form-textarea"
              />
            )}
          </div>
        </div>
      </div>


      {readOnly && (
        <div className="card manager-comment-card">
          <div className="card-accent orange" />
          <div className="card-body">
            <div className="card-title-row">
              <span className="card-title-icon" style={{ color: '#ef6c00', background: '#fff3e0', borderColor: '#ffcc80' }}>
                <ClipboardCheck size={15} />
              </span>
              <h3 className="card-title-text">Komentar EM Estate B</h3>
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  background: managerComment ? '#e8f5e9' : '#f5f5f5',
                  color: managerComment ? '#2e7d32' : '#757575',
                  border: `1px solid ${managerComment ? '#c8e6c9' : '#e0e0e0'}`,
                }}
              >
                {managerComment ? 'Sudah Dikomentari' : 'Belum Dikomentari'}
              </span>
            </div>
            <p className="manager-comment-hint">
              {currentUserRole === 'manager'
                ? 'Tambahkan arahan dan tindak lanjut atas laporan patroli ini.'
                : 'Kolom komentar khusus untuk Estate Manager (EM).'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <textarea
                value={managerComment}
                onChange={currentUserRole === 'manager' ? (e) => {
                  setManagerComment(e.target.value)
                  setCommentSaved(false)
                } : undefined}
                readOnly={currentUserRole !== 'manager'}
                disabled={currentUserRole !== 'manager'}
                placeholder={currentUserRole === 'manager' ? "Contoh: Harap perhatikan titik rawan blok D-48 pada shift malam. Koordinasikan dengan Danru untuk penambahan frekuensi patroli di area tersebut..." : "Akan diisi oleh EM..."}
                className="form-textarea manager-comment-textarea"
              />
              {teamAssignment.manager_comment && (
                <p style={{
                  alignSelf: 'flex-end',
                  margin: '6px 4px 0 0',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                  textAlign: 'right',
                  lineHeight: 1.4,
                }}>
                  {teamAssignment.manager_comment_name || 'Budi Heru'} (NIK: {teamAssignment.manager_comment_nik || '1002345'}) · {teamAssignment.manager_comment_at ? new Date(teamAssignment.manager_comment_at).toLocaleDateString('id-ID', {
                    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                  }) : ''}
                </p>
              )}
            </div>
            {currentUserRole === 'manager' && (
              <div className="manager-comment-actions">
                <button
                  type="button"
                  onClick={handleSaveManagerComment}
                  disabled={savingComment}
                  className="btn btn-primary"
                >
                  <Save size={14} /> {savingComment ? 'Menyimpan...' : 'Simpan Komentar'}
                </button>
                {commentSaved && (
                  <span className="manager-comment-saved">
                    <CheckCircle size={14} /> Komentar tersimpan
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {readOnly && (
        <div className="card rc-comment-card">
          <div className="card-accent purple" />
          <div className="card-body">
            <div className="card-title-row">
              <span className="card-title-icon" style={{ color: '#5e35b1', background: '#ede7f6', borderColor: '#d1c4e9' }}>
                <Shield size={15} />
              </span>
              <h3 className="card-title-text">Komentar RC</h3>
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  background: rcComment ? '#e8f5e9' : '#f5f5f5',
                  color: rcComment ? '#2e7d32' : '#757575',
                  border: `1px solid ${rcComment ? '#c8e6c9' : '#e0e0e0'}`,
                }}
              >
                {rcComment ? 'Sudah Dikomentari' : 'Menunggu RC'}
              </span>
            </div>
            <p className="manager-comment-hint">
              {currentUserRole === 'rc'
                ? 'Masukkan arahan dan evaluasi Anda sebagai RC.'
                : 'Kolom komentar khusus untuk Regional Coordinator (RC).'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <textarea
                value={rcComment}
                onChange={currentUserRole === 'rc' ? (e) => {
                  setRcComment(e.target.value)
                  setRcCommentSaved(false)
                } : undefined}
                readOnly={currentUserRole !== 'rc'}
                disabled={currentUserRole !== 'rc'}
                placeholder={currentUserRole === 'rc' ? "Tulis komentar RC di sini..." : "Akan diisi oleh RC..."}
                className="form-textarea manager-comment-textarea rc-comment-textarea"
              />
              {teamAssignment.rc_comment && (
                <p style={{
                  alignSelf: 'flex-end',
                  margin: '6px 4px 0 0',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                  textAlign: 'right',
                  lineHeight: 1.4,
                }}>
                  {teamAssignment.rc_comment_name} (NIK: {teamAssignment.rc_comment_nik}) · {teamAssignment.rc_comment_at ? new Date(teamAssignment.rc_comment_at).toLocaleDateString('id-ID', {
                    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                  }) : ''}
                </p>
              )}
            </div>
            {currentUserRole === 'rc' && (
              <div className="manager-comment-actions" style={{ marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={handleSaveRcComment}
                  disabled={savingRcComment}
                  className="btn btn-primary"
                >
                  <Save size={14} /> {savingRcComment ? 'Menyimpan...' : 'Simpan Komentar'}
                </button>
                {rcCommentSaved && (
                  <span className="manager-comment-saved">
                    <CheckCircle size={14} /> Komentar tersimpan
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {readOnly && (
        <div className="card srmd-comment-card" style={{ marginTop: '16px' }}>
          <div className="card-accent" style={{ background: '#00796b' }} />
          <div className="card-body">
            <div className="card-title-row">
              <span className="card-title-icon" style={{ color: '#00796b', background: '#e0f2f1', borderColor: '#b2dfdb' }}>
                <Shield size={15} />
              </span>
              <h3 className="card-title-text">Komentar SRMD</h3>
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  background: srmdComment ? '#e8f5e9' : '#f5f5f5',
                  color: srmdComment ? '#2e7d32' : '#757575',
                  border: `1px solid ${srmdComment ? '#c8e6c9' : '#e0e0e0'}`,
                }}
              >
                {srmdComment ? 'Sudah Dikomentari' : 'Menunggu SRMD'}
              </span>
            </div>
            <p className="manager-comment-hint">
              {currentUserRole === 'srmd'
                ? 'Masukkan arahan dan keputusan Anda sebagai SRMD.'
                : 'Kolom komentar khusus untuk SRMD Manager.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <textarea
                value={srmdComment}
                onChange={currentUserRole === 'srmd' ? (e) => {
                  setSrmdComment(e.target.value)
                  setSrmdCommentSaved(false)
                } : undefined}
                readOnly={currentUserRole !== 'srmd'}
                disabled={currentUserRole !== 'srmd'}
                placeholder={currentUserRole === 'srmd' ? "Tulis komentar SRMD di sini..." : "Akan diisi oleh SRMD..."}
                className="form-textarea manager-comment-textarea rc-comment-textarea"
              />
              {teamAssignment.srmd_comment && (
                <p style={{
                  alignSelf: 'flex-end',
                  margin: '6px 4px 0 0',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                  textAlign: 'right',
                  lineHeight: 1.4,
                }}>
                  {teamAssignment.srmd_comment_name} (NIK: {teamAssignment.srmd_comment_nik}) · {teamAssignment.srmd_comment_at ? new Date(teamAssignment.srmd_comment_at).toLocaleDateString('id-ID', {
                    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                  }) : ''}
                </p>
              )}
            </div>
            {currentUserRole === 'srmd' && (
              <div className="manager-comment-actions" style={{ marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={handleSaveSrmdComment}
                  disabled={savingSrmdComment}
                  className="btn btn-primary"
                >
                  <Save size={14} /> {savingSrmdComment ? 'Menyimpan...' : 'Simpan Komentar'}
                </button>
                {srmdCommentSaved && (
                  <span className="manager-comment-saved">
                    <CheckCircle size={14} /> Komentar tersimpan
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {success && (
        <div className="alert-success">
          <CheckCircle size={16} /> Laporan berhasil disimpan! Kembali ke halaman utama...
        </div>
      )}
    </div>
  )
}
