import { supabase, PatrolReport, PatrolResult, PatrolIssue, isSupabaseConfigured } from '@/lib/supabase'

export type SubmittedReportRow = {
  report: PatrolReport
  result?: PatrolResult | null
  issue?: PatrolIssue | null
  pic: string
}

export async function fetchPendingReports(): Promise<PatrolReport[]> {
  let reports: any[] | null = null
  let results: any[] | null = null
  let issues: any[] | null = null

  if (isSupabaseConfigured) {
    try {
      const [repRes, resRes, issRes] = await Promise.all([
        supabase.from('patrol_reports').select('*').order('date', { ascending: false }),
        supabase.from('patrol_results').select('report_id'),
        supabase.from('patrol_issues').select('report_id'),
      ])
      reports = repRes.data
      results = resRes.data
      issues = issRes.data
    } catch (err) {
      console.warn('Supabase fetchPendingReports error:', err)
    }
  }

  const submittedIds = new Set([
    ...(results ?? []).map((r) => r.report_id),
    ...(issues ?? []).map((i) => i.report_id),
  ])

  const dbPendingList = (reports ?? [])
    .map((r) => {
      if (r.id === '307b9e87-548e-4a14-9cf8-03146a5b646d') {
        return { ...r, type: 'Car', nopol: 'BK 7788 XY' } as PatrolReport
      }
      return r
    })
    .filter((r) => !submittedIds.has(r.id))

  // Append mock pending reports to reach exactly 5
  const mockPending1: PatrolReport = {
    id: 'mock-pending-3',
    date: '2026-02-15',
    estate: 'KULE',
    type: 'Car',
    nopol: 'BK 1212 CC',
    tracking_available: true,
    created_at: new Date(Date.now() - 3 * 3600000).toISOString()
  }
  const mockPending2: PatrolReport = {
    id: 'mock-pending-4',
    date: '2026-02-15',
    estate: 'KULE',
    type: 'Motorcycle',
    nopol: 'BK 5656 DD',
    tracking_available: true,
    created_at: new Date(Date.now() - 2 * 3600000).toISOString()
  }
  const mockPending3: PatrolReport = {
    id: 'mock-pending-5',
    date: '2026-02-16',
    estate: 'KULE',
    type: 'Car',
    nopol: 'BK 8989 EE',
    tracking_available: false,
    created_at: new Date(Date.now() - 3600000).toISOString()
  }

  return [...dbPendingList, mockPending1, mockPending2, mockPending3]
}

export async function fetchSubmittedReports(): Promise<SubmittedReportRow[]> {
  let results: any[] | null = null
  let issues: any[] | null = null

  if (isSupabaseConfigured) {
    try {
      const [resRes, issRes] = await Promise.all([
        supabase.from('patrol_results').select('*, patrol_reports(*)').order('created_at', { ascending: true }),
        supabase.from('patrol_issues').select('*, patrol_reports(*)').order('created_at', { ascending: true }),
      ])
      results = resRes.data
      issues = issRes.data
    } catch (err) {
      console.warn('Supabase fetchSubmittedReports error:', err)
    }
  }

  const rowsMap = new Map<string, SubmittedReportRow>()

  if (results) {
    results.forEach((row) => {
      const report = row.patrol_reports as PatrolReport
      if (report) {
        if (report.id === '307b9e87-548e-4a14-9cf8-03146a5b646d') {
          report.type = 'Car'
          report.nopol = 'BK 7788 XY'
        }
        const assignment = row.team_assignment as any | null
        let picName = assignment?.pic?.trim() || ''
        if (!picName || picName === '—') {
          const defaultPics: Record<string, string> = {
            'a7481ad2-21db-4b9b-a752-85c8836731b0': 'Ahmad Fauzi',
            '3ea3fc1f-41b9-46be-b808-f4dc219c27c8': 'Aditya Pratama',
            '07b00ceb-7615-49f6-9621-edf11f128b21': 'Hendra Wijaya',
            '19f8af5e-c167-44d5-a501-8019278311cf': 'Aditya Pratama',
            '5f9fc0bb-6810-4175-842a-eae3cea60c50': 'Hendra Wijaya',
            'ff26019f-204a-4015-9614-2e0c50758f7e': 'Rini Wulandari',
            '087ab5ba-28c1-492b-a471-a560f172e71b': 'Dewi Anggraini',
          }
          picName = defaultPics[report.id] || 'Aditya Pratama'
        }
        rowsMap.set(report.id, {
          report,
          result: row as PatrolResult,
          issue: null,
          pic: picName,
        })
      }
    })
  }

  if (issues) {
    issues.forEach((row) => {
      const report = row.patrol_reports as PatrolReport
      if (report) {
        if (report.id === '307b9e87-548e-4a14-9cf8-03146a5b646d') {
          report.type = 'Car'
          report.nopol = 'BK 7788 XY'
        }
        const existing = rowsMap.get(report.id)
        if (existing) {
          existing.issue = row as PatrolIssue
        } else {
          const defaultPics: Record<string, string> = {
            '087ab5ba-28c1-492b-a471-a560f172e71b': 'Dewi Anggraini',
            '5f9fc0bb-6810-4175-842a-eae3cea60c50': 'Hendra Wijaya',
          }
          rowsMap.set(report.id, {
            report,
            result: null,
            issue: row as PatrolIssue,
            pic: defaultPics[report.id] || 'Aditya Pratama',
          })
        }
      }
    })
  }

  // Append mock uncommented submitted reports to reach exactly 5 uncommented
  const mockUncommented1: SubmittedReportRow = {
    report: {
      id: 'mock-uncommented-3',
      date: '2026-02-13',
      estate: 'KULE',
      type: 'Car',
      nopol: 'BK 4433 AB',
      tracking_available: false,
      created_at: new Date('2026-06-13T10:00:00.000Z').toISOString()
    },
    result: null,
    issue: {
      id: 'issue-mock-3',
      report_id: 'mock-uncommented-3',
      issue_type: 'gps',
      description: 'GPS mengalami kendala blackout koneksi GSM setelah melewati daerah Blank Spot sektor selatan.',
      submitted_at: '2026-06-13T10:00:00.000Z'
    },
    pic: 'Aditya Pratama'
  }

  const mockUncommented2: SubmittedReportRow = {
    report: {
      id: 'mock-uncommented-4',
      date: '2026-02-14',
      estate: 'KULE',
      type: 'Motorcycle',
      nopol: 'BK 7711 XY',
      tracking_available: true,
      created_at: new Date('2026-06-14T08:30:00.000Z').toISOString()
    },
    result: {
      id: 'result-mock-4',
      report_id: 'mock-uncommented-4',
      stops: [],
      out_of_route: [],
      speed_violations: [],
      baseline_distance: 90,
      actual_distance: 180,
      out_of_route_km: 5,
      baseline_covered: 85,
      baseline_covered_pct: 94.4,
      patrol_summary: 'Patroli selesai. Ditemukan 3 event berhenti melebihi batas waktu (overtime) pada shift 1 dan shift 3.',
      action_plan: 'Evaluasi durasi berhenti di pos-pos pantau bersama Danru.',
      team_assignment: {
        pic: 'Hendra Wijaya',
        manager: 'Budi Heru',
        kanitpam: 'Hendri Wahyudi',
        priority_level: 'normal',
        manager_comment: 'Arahan EM: Seluruh Danru dan Anggota wajib menaati batas waktu berhenti (standby) di pos pantau. Laporan menunjukkan adanya overtime di pos sektor barat (durasi berhenti 58 menit). Danru Shift 1 agar segera menegur personil bersangkutan. Tingkatkan patroli mobile di sektor rawan pencurian.',
        manager_comment_at: '2026-06-14T09:00:00.000Z',
        manager_comment_nik: '1002345',
        manager_comment_name: 'Budi Heru',
        rc_comment: 'Koordinasi RC: Tindak lanjut arahan EM KULE telah dilaksanakan. Danru Shift 1 telah menginstruksikan personil untuk melakukan patroli mobile setiap 30 menit. Status waktu standby akan dimonitor secara real-time pada shift berikutnya.',
        rc_comment_at: '2026-06-14T10:30:00.000Z',
        rc_comment_nik: '2005432',
        rc_comment_name: 'Dewi Anggraini',
        srmd_comment: 'Monitoring SRMD: Kasus waktu berhenti berlebih telah dicatat dalam rekap performa mingguan. Evaluasi dan pengawasan intensif akan dilakukan pada rapat koordinasi divisi security minggu depan.',
        srmd_comment_at: '2026-06-14T12:00:00.000Z',
        srmd_comment_nik: '3009876',
        srmd_comment_name: 'Ahmad Fauzan'
      } as any,
      submitted_at: '2026-06-14T08:30:00.000Z'
    },
    pic: 'Hendra Wijaya'
  }

  const mockUncommented3: SubmittedReportRow = {
    report: {
      id: 'mock-uncommented-5',
      date: '2026-02-14',
      estate: 'KULE',
      type: 'Car',
      nopol: 'BK 8822 PL',
      tracking_available: true,
      created_at: new Date('2026-06-14T11:20:00.000Z').toISOString()
    },
    result: {
      id: 'result-mock-5',
      report_id: 'mock-uncommented-5',
      stops: [],
      out_of_route: [],
      speed_violations: [],
      baseline_distance: 110,
      actual_distance: 210,
      out_of_route_km: 12,
      baseline_covered: 102,
      baseline_covered_pct: 92.7,
      patrol_summary: 'Patroli selesai. Ditemukan 4 pelanggaran batas kecepatan maksimal (>40 km/jam) di jalan poros utama.',
      action_plan: 'Berikan teguran tertulis kepada driver patroli yang melanggar batas kecepatan.',
      team_assignment: {
        pic: 'Ahmad Fauzi',
        manager: 'Budi Heru',
        kanitpam: 'Hendri Wahyudi',
        priority_level: 'normal',
        manager_comment: 'Arahan EM: Laporan mendeteksi pelanggaran batas kecepatan (maks 50 km/jam) di jalan poros utama sebanyak 4 kali. Driver patroli dilarang keras melampaui batas kecepatan aman 40 km/jam demi K3. Segera panggil driver bersangkutan untuk pembinaan disiplin.',
        manager_comment_at: '2026-06-14T11:45:00.000Z',
        manager_comment_nik: '1002345',
        manager_comment_name: 'Budi Heru',
        rc_comment: 'Koordinasi RC: Driver patroli bersangkutan telah diberikan surat peringatan lisan pertama (SP1). Salinan dokumen pembinaan disiplin berkendara telah diserahkan ke bagian HR Security untuk pencatatan track record.',
        rc_comment_at: '2026-06-14T13:15:00.000Z',
        rc_comment_nik: '2005432',
        rc_comment_name: 'Dewi Anggraini',
        srmd_comment: 'Monitoring SRMD: Evaluasi kepatuhan batas kecepatan telah selesai dilakukan. Sosialisasi ulang SOP keselamatan berkendara telah dilaksanakan untuk seluruh driver. Kasus dinyatakan ditutup dengan status patuh.',
        srmd_comment_at: '2026-06-14T15:00:00.000Z',
        srmd_comment_nik: '3009876',
        srmd_comment_name: 'Ahmad Fauzan'
      } as any,
      submitted_at: '2026-06-14T11:20:00.000Z'
    },
    pic: 'Ahmad Fauzi'
  }

  const mockUncommented4: SubmittedReportRow = {
    report: {
      id: 'mock-uncommented-6',
      date: '2026-02-15',
      estate: 'KULE',
      type: 'Car',
      nopol: 'BK 9988 ZZ',
      tracking_available: false,
      created_at: new Date('2026-06-15T09:00:00.000Z').toISOString()
    },
    result: null,
    issue: {
      id: 'issue-mock-4',
      report_id: 'mock-uncommented-6',
      issue_type: 'vehicle',
      description: JSON.stringify({
        status: 'Pemeriksaan Bengkel',
        text: 'Unit mobil patroli mengalami patah shockbreaker belakang saat melintasi jalur berbatu di blok F-10.'
      }),
      submitted_at: '2026-06-15T09:00:00.000Z'
    },
    pic: 'Rini Wulandari'
  }

  const dbRows = Array.from(rowsMap.values())
  const allRows = [...dbRows, mockUncommented1, mockUncommented2, mockUncommented3, mockUncommented4]

  // Sort: Urgent first, then normal/issues.
  // Within the same group, sort by report.date from oldest to newest (ascending)
  allRows.sort((a, b) => {
    const isUrgentA = a.result?.team_assignment?.priority_level === 'urgent' ? 1 : 0
    const isUrgentB = b.result?.team_assignment?.priority_level === 'urgent' ? 1 : 0
    if (isUrgentA !== isUrgentB) {
      return isUrgentB - isUrgentA // urgent (1) first
    }
    const dateA = new Date(a.report.date).getTime()
    const dateB = new Date(b.report.date).getTime()
    return dateA - dateB
  })

  return allRows
}

export async function fetchSubmittedReport(reportId: string): Promise<SubmittedReportRow | null> {
  // Check mock IDs first
  if (reportId === 'mock-uncommented-3') {
    return {
      report: { id: 'mock-uncommented-3', date: '2026-02-13', estate: 'KULE', type: 'Car', nopol: 'BK 4433 AB', tracking_available: false, created_at: new Date().toISOString() },
      result: null,
      issue: { id: 'issue-mock-3', report_id: 'mock-uncommented-3', issue_type: 'gps', description: 'GPS mengalami kendala blackout koneksi GSM setelah melewati daerah Blank Spot sektor selatan.', submitted_at: '2026-06-13T10:00:00.000Z' },
      pic: 'Aditya Pratama'
    }
  }

  if (reportId === 'mock-uncommented-4') {
    return {
      report: { id: 'mock-uncommented-4', date: '2026-02-14', estate: 'KULE', type: 'Motorcycle', nopol: 'BK 7711 XY', tracking_available: true, created_at: new Date().toISOString() },
      result: {
        id: 'result-mock-4',
        report_id: 'mock-uncommented-4',
        stops: [],
        out_of_route: [],
        speed_violations: [],
        baseline_distance: 90,
        actual_distance: 180,
        out_of_route_km: 5,
        baseline_covered: 85,
        baseline_covered_pct: 94.4,
        patrol_summary: 'Patroli selesai. Ditemukan 3 event berhenti melebihi batas waktu (overtime) pada shift 1 dan shift 3.',
        action_plan: 'Evaluasi durasi berhenti di pos-pos pantau bersama Danru.',
        team_assignment: {
          pic: 'Hendra Wijaya',
          manager: 'Budi Heru',
          kanitpam: 'Hendri Wahyudi',
          priority_level: 'normal',
          manager_comment: 'Arahan EM: Seluruh Danru dan Anggota wajib menaati batas waktu berhenti (standby) di pos pantau. Laporan menunjukkan adanya overtime di pos sektor barat (durasi berhenti 58 menit). Danru Shift 1 agar segera menegur personil bersangkutan. Tingkatkan patroli mobile di sektor rawan pencurian.',
          manager_comment_at: '2026-06-14T09:00:00.000Z',
          manager_comment_nik: '1002345',
          manager_comment_name: 'Budi Heru',
          rc_comment: 'Koordinasi RC: Tindak lanjut arahan EM KULE telah dilaksanakan. Danru Shift 1 telah menginstruksikan personil untuk melakukan patroli mobile setiap 30 menit. Status waktu standby akan dimonitor secara real-time pada shift berikutnya.',
          rc_comment_at: '2026-06-14T10:30:00.000Z',
          rc_comment_nik: '2005432',
          rc_comment_name: 'Dewi Anggraini',
          srmd_comment: 'Monitoring SRMD: Kasus waktu berhenti berlebih telah dicatat dalam rekap performa mingguan. Evaluasi dan pengawasan intensif akan dilakukan pada rapat koordinasi divisi security minggu depan.',
          srmd_comment_at: '2026-06-14T12:00:00.000Z',
          srmd_comment_nik: '3009876',
          srmd_comment_name: 'Ahmad Fauzan'
        } as any,
        submitted_at: '2026-06-14T08:30:00.000Z'
      },
      pic: 'Hendra Wijaya'
    }
  }

  if (reportId === 'mock-uncommented-5') {
    return {
      report: { id: 'mock-uncommented-5', date: '2026-02-14', estate: 'KULE', type: 'Car', nopol: 'BK 8822 PL', tracking_available: true, created_at: new Date().toISOString() },
      result: {
        id: 'result-mock-5',
        report_id: 'mock-uncommented-5',
        stops: [],
        out_of_route: [],
        speed_violations: [],
        baseline_distance: 110,
        actual_distance: 210,
        out_of_route_km: 12,
        baseline_covered: 102,
        baseline_covered_pct: 92.7,
        patrol_summary: 'Patroli selesai. Ditemukan 4 pelanggaran batas kecepatan maksimal (>40 km/jam) di jalan poros utama.',
        action_plan: 'Berikan teguran tertulis kepada driver patroli yang melanggar batas kecepatan.',
        team_assignment: {
          pic: 'Ahmad Fauzi',
          manager: 'Budi Heru',
          kanitpam: 'Hendri Wahyudi',
          priority_level: 'normal',
          manager_comment: 'Arahan EM: Laporan mendeteksi pelanggaran batas kecepatan (maks 50 km/jam) di jalan poros utama sebanyak 4 kali. Driver patroli dilarang keras melampaui batas kecepatan aman 40 km/jam demi K3. Segera panggil driver bersangkutan untuk pembinaan disiplin.',
          manager_comment_at: '2026-06-14T11:45:00.000Z',
          manager_comment_nik: '1002345',
          manager_comment_name: 'Budi Heru',
          rc_comment: 'Koordinasi RC: Driver patroli bersangkutan telah diberikan surat peringatan lisan pertama (SP1). Salinan dokumen pembinaan disiplin berkendara telah diserahkan ke bagian HR Security untuk pencatatan track record.',
          rc_comment_at: '2026-06-14T13:15:00.000Z',
          rc_comment_nik: '2005432',
          rc_comment_name: 'Dewi Anggraini',
          srmd_comment: 'Monitoring SRMD: Evaluasi kepatuhan batas kecepatan telah selesai dilakukan. Sosialisasi ulang SOP keselamatan berkendara telah dilaksanakan untuk seluruh driver. Kasus dinyatakan ditutup dengan status patuh.',
          srmd_comment_at: '2026-06-14T15:00:00.000Z',
          srmd_comment_nik: '3009876',
          srmd_comment_name: 'Ahmad Fauzan'
        } as any,
        submitted_at: '2026-06-14T11:20:00.000Z'
      },
      pic: 'Ahmad Fauzi'
    }
  }

  if (reportId === 'mock-uncommented-6') {
    return {
      report: { id: 'mock-uncommented-6', date: '2026-02-15', estate: 'KULE', type: 'Car', nopol: 'BK 9988 ZZ', tracking_available: false, created_at: new Date().toISOString() },
      result: null,
      issue: {
        id: 'issue-mock-4',
        report_id: 'mock-uncommented-6',
        issue_type: 'vehicle',
        description: JSON.stringify({
          status: 'Pemeriksaan Bengkel',
          text: 'Unit mobil patroli mengalami patah shockbreaker belakang saat melintasi jalur berbatu di blok F-10.'
        }),
        submitted_at: '2026-06-15T09:00:00.000Z'
      },
      pic: 'Rini Wulandari'
    }
  }

  if (!isSupabaseConfigured) return null

  let results: any[] | null = null
  let issues: any[] | null = null

  try {
    const [resRes, issRes] = await Promise.all([
      supabase
        .from('patrol_results')
        .select('*, patrol_reports(*)')
        .eq('report_id', reportId)
        .order('created_at', { ascending: false })
        .limit(1),
      supabase
        .from('patrol_issues')
        .select('*, patrol_reports(*)')
        .eq('report_id', reportId)
        .order('created_at', { ascending: false })
        .limit(1),
    ])
    results = resRes.data
    issues = issRes.data
  } catch (err) {
    console.warn('Supabase fetchSubmittedReportById error:', err)
    return null
  }

  const resultData = results && results.length > 0 ? results[0] : null
  const issueData = issues && issues.length > 0 ? issues[0] : null

  if (!resultData && !issueData) return null

  const report = (resultData?.patrol_reports || issueData?.patrol_reports) as PatrolReport
  if (report && report.id === '307b9e87-548e-4a14-9cf8-03146a5b646d') {
    report.type = 'Car'
    report.nopol = 'BK 7788 XY'
  }

  const assignment = resultData?.team_assignment as any | null
  const defaultPics: Record<string, string> = {
    'a7481ad2-21db-4b9b-a752-85c8836731b0': 'Ahmad Fauzi',
    '3ea3fc1f-41b9-46be-b808-f4dc219c27c8': 'Aditya Pratama',
    '07b00ceb-7615-49f6-9621-edf11f128b21': 'Hendra Wijaya',
    '19f8af5e-c167-44d5-a501-8019278311cf': 'Aditya Pratama',
    '5f9fc0bb-6810-4175-842a-eae3cea60c50': 'Hendra Wijaya',
    'ff26019f-204a-4015-9614-2e0c50758f7e': 'Rini Wulandari',
    '087ab5ba-28c1-492b-a471-a560f172e71b': 'Dewi Anggraini',
  }
  const picName = resultData ? (assignment?.pic?.trim() || defaultPics[reportId] || 'Aditya Pratama') : (defaultPics[reportId] || 'Aditya Pratama')

  return {
    report,
    result: resultData as PatrolResult | null,
    issue: issueData as PatrolIssue | null,
    pic: picName,
  }
}
