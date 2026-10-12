import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fznoqzxbgjcsqfyulilf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bm9xenhiZ2pjc3FmeXVsaWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4OTM2MjIsImV4cCI6MjA5NjQ2OTYyMn0.cQFWsPmzMW3IfLWIRbKuVAiTgJEIsjOWAJ31qiYLLcU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function seed() {
  console.log('Seeding database...')

  // 1. Truncate tables patrol_results and patrol_issues
  const { error: deleteResultsError } = await supabase.from('patrol_results').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (deleteResultsError) {
    console.error('Error truncating patrol_results:', deleteResultsError)
    return
  }
  console.log('Successfully cleared patrol_results.')

  const { error: deleteIssuesError } = await supabase.from('patrol_issues').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (deleteIssuesError) {
    console.error('Error truncating patrol_issues:', deleteIssuesError)
    return
  }
  console.log('Successfully cleared patrol_issues.')

  // 2. Insert into patrol_results
  const resultsToInsert = [
    {
      report_id: 'a7481ad2-21db-4b9b-a752-85c8836731b0', // 14 Feb 2026, Motorcycle, BK 1122 CD, tracking available
      stops: null,
      out_of_route: null,
      speed_violations: null,
      baseline_distance: 88,
      actual_distance: 300,
      out_of_route_km: 39,
      baseline_covered: 88,
      baseline_covered_pct: 100,
      patrol_summary: 'Patroli selesai dikerjakan untuk seluruh shift. Ditemukan 2 event overtime kendaraan (Pencucian & BBM) dan 3 rute keluar jalur yang perlu dievaluasi.',
      action_plan: 'Tingkatkan pengawasan waktu berhenti untuk aktivitas Pencucian dan Pengisian BBM agar tidak melebihi batas wajar. Dokumentasikan penyebab rute keluar jalur.',
      team_assignment: {
        pic: 'Ahmad Fauzi',
        manager: 'Budi Heru',
        kanitpam: 'Hendri Wahyudi',
        danru_shift1: 'Taufik',
        driver_shift1: 'Doni',
        anggota_shift1: ['Slamet', 'Joko'],
        danru_shift2: 'Herman',
        driver_shift2: 'Roni',
        anggota_shift2: ['Tono', 'Ari'],
        danru_shift3: 'Yudi',
        driver_shift3: 'Edi',
        anggota_shift3: ['Budi', 'Andi'],
        priority_level: 'normal',
        manager_comment: 'Secara keseluruhan laporan ini menunjukkan kinerja patroli yang cukup baik dengan cakupan 100% baseline. Namun demikian, saya mencatat adanya 2 pelanggaran overtime kendaraan yaitu Pencucian Kendaraan selama 58 menit (batas 50 menit) dan Pengisian BBM selama 42 menit (batas 35 menit). Harap Danru masing-masing shift mengingatkan anggota untuk lebih disiplin terhadap batas waktu kegiatan non-patroli. Selain itu, 3 rute keluar jalur perlu dievaluasi lebih lanjut, terutama pada titik-titik yang berdekatan dengan batas estate. Koordinasikan dengan Kanitpam untuk penyesuaian rute apabila diperlukan.',
        manager_comment_at: '2026-06-09T08:32:12.035Z',
        manager_comment_nik: '1002345',
        manager_comment_name: 'Budi Heru',
        rc_comment: 'Laporan diterima. Tindak lanjut arahan EM KULE terkait overtime kendaraan dan rute keluar jalur akan dipantau pada laporan patroli berikutnya. Pastikan Danru shift 2 dan shift 3 memahami protokol batas waktu berhenti.',
        rc_comment_at: '2026-06-09T10:15:00.000Z',
        rc_comment_nik: '2005432',
        rc_comment_name: 'Dewi Anggraini',
        srmd_comment: 'Catatan overtime dan rute keluar jalur telah dimasukkan ke dalam rekap evaluasi bulanan. Rekomendasi: adakan briefing khusus tentang SOP batas waktu berhenti kendaraan patroli agar tidak terulang di laporan berikutnya.',
        srmd_comment_at: '2026-06-09T12:00:00.000Z',
        srmd_comment_nik: '3009876',
        srmd_comment_name: 'Ahmad Fauzan'
      },
      submitted_at: '2026-06-09T08:32:12.035Z'
    },
    {
      report_id: '3ea3fc1f-41b9-46be-b808-f4dc219c27c8', // 14 Feb 2026, Car, BK 3344 EF, tracking available — URGENT, belum komentar
      stops: null,
      out_of_route: null,
      speed_violations: null,
      baseline_distance: 120,
      actual_distance: 280,
      out_of_route_km: 55,
      baseline_covered: 105,
      baseline_covered_pct: 87.5,
      patrol_summary: 'Terjadi insiden serius pada shift 2 — ditemukan pencurian TBS massal di blok D-48 dan D-55. Tim melakukan pengejaran namun pelaku berhasil melarikan diri. Rute shift 2 tidak dapat diselesaikan akibat pengalihan ke penanganan insiden.',
      action_plan: 'Segera koordinasi dengan Polsek dan perkuat penjagaan di blok D-48 & D-55. Ajukan permintaan penambahan personil untuk shift berikutnya.',
      team_assignment: {
        pic: 'Aditya Pratama',
        manager: 'Budi Heru',
        kanitpam: 'Hendri Wahyudi',
        danru_shift1: 'Taufik',
        driver_shift1: 'Doni',
        anggota_shift1: ['Yanto', 'Guntur'],
        danru_shift2: 'Herman',
        driver_shift2: 'Roni',
        anggota_shift2: ['Dani'],
        danru_shift3: 'Yudi',
        driver_shift3: 'Edi',
        anggota_shift3: ['Teguh', 'Indra'],
        priority_level: 'urgent'
      },
      submitted_at: '2026-06-11T09:15:00.000Z'
    },
    {
      report_id: '07b00ceb-7615-49f6-9621-edf11f128b21', // 13 Feb 2026, Car, BK 5678 XY, tracking available
      stops: null,
      out_of_route: null,
      speed_violations: null,
      baseline_distance: 150,
      actual_distance: 310,
      out_of_route_km: 12,
      baseline_covered: 145,
      baseline_covered_pct: 96.6,
      patrol_summary: 'Laporan patroli harian mencakup seluruh blok estate KULE. Seluruh rute diselesaikan dengan cakupan 96.6%, tidak ditemukan aktivitas mencurigakan.',
      action_plan: 'Lakukan patroli rutin sesuai jadwal yang telah ditentukan. Pertahankan konsistensi cakupan rute di atas 95%.',
      team_assignment: {
        pic: 'Hendra Wijaya',
        manager: 'Budi Heru',
        kanitpam: 'Hendri Wahyudi',
        danru_shift1: 'Taufik',
        driver_shift1: 'Doni',
        anggota_shift1: ['Rudi'],
        danru_shift2: 'Herman',
        driver_shift2: 'Roni',
        anggota_shift2: ['Toni'],
        danru_shift3: 'Yudi',
        driver_shift3: 'Edi',
        anggota_shift3: ['Dedi'],
        priority_level: 'normal',
        manager_comment: 'Kinerja patroli hari ini sangat memuaskan dengan cakupan rute mendekati sempurna. Apresiasi kepada seluruh tim atas kedisiplinan dan konsistensinya. Perlu diperhatikan bahwa pada laporan berikutnya, dokumentasi titik-titik cek area rawan pencurian harus lebih rinci agar dapat dijadikan acuan evaluasi. Pastikan semua Danru melakukan pengecekan langsung terhadap pos-pos rawan sesuai dengan jadwal yang telah disepakati.',
        manager_comment_at: '2026-06-10T15:00:00.000Z',
        manager_comment_nik: '1002345',
        manager_comment_name: 'Budi Heru'
      },
      submitted_at: '2026-06-10T10:20:00.000Z'
    },
    {
      report_id: '19f8af5e-c167-44d5-a501-8019278311cf', // 12 Feb 2026, Car, BK 3243 PL, tracking available
      stops: null,
      out_of_route: null,
      speed_violations: null,
      baseline_distance: 140,
      actual_distance: 290,
      out_of_route_km: 18,
      baseline_covered: 130,
      baseline_covered_pct: 92.8,
      patrol_summary: 'Patroli berjalan lancar. Tidak ditemukan aktivitas mencurigakan. Cakupan rute 92.8% dengan beberapa penyesuaian rute di area blok E-60 akibat perbaikan jalan.',
      action_plan: 'Koordinasi rutin dengan aparat setempat di perbatasan. Pantau perkembangan perbaikan jalan blok E-60 untuk normalisasi rute patroli.',
      team_assignment: {
        pic: 'Aditya Pratama',
        manager: 'Budi Heru',
        kanitpam: 'Hendri Wahyudi',
        danru_shift1: 'Taufik',
        driver_shift1: 'Doni',
        anggota_shift1: ['Tio'],
        danru_shift2: 'Herman',
        driver_shift2: 'Roni',
        anggota_shift2: ['Deni'],
        danru_shift3: 'Yudi',
        driver_shift3: 'Edi',
        anggota_shift3: ['Gery'],
        priority_level: 'normal',
        manager_comment: 'Rute diselesaikan dengan cakupan yang cukup baik meskipun ada hambatan di blok E-60. Saya menginstruksikan agar PIC berkoordinasi dengan bagian infrastruktur estate untuk memastikan jadwal perbaikan jalan. Selama masa perbaikan, harap rute alternatif didokumentasikan secara resmi dalam laporan berikutnya agar dapat dijadikan standar sementara.',
        manager_comment_at: '2026-06-09T18:00:00.000Z',
        manager_comment_nik: '1002345',
        manager_comment_name: 'Budi Heru',
        rc_comment: 'Laporan diterima dan diarsipkan. Koordinasi dengan infrastruktur estate sudah dikonfirmasi. Rute alternatif blok E-60 akan didokumentasikan secara formal dalam laporan mingguan.',
        rc_comment_at: '2026-06-10T09:30:00.000Z',
        rc_comment_nik: '2005432',
        rc_comment_name: 'Dewi Anggraini'
      },
      submitted_at: '2026-06-09T14:40:00.000Z'
    },
    {
      report_id: '5f9fc0bb-6810-4175-842a-eae3cea60c50', // BK 9012 AB GPS Rusak - resolved comments
      stops: null,
      out_of_route: null,
      speed_violations: null,
      baseline_distance: 0,
      actual_distance: 0,
      out_of_route_km: 0,
      baseline_covered: 0,
      baseline_covered_pct: 0,
      patrol_summary: 'Perangkat GPS tidak menyala dan tidak menangkap sinyal satelit setelah guncangan keras.',
      action_plan: 'Ganti unit GPS yang rusak dan verifikasi koneksi.',
      team_assignment: {
        pic: 'Hendra Wijaya',
        manager: 'Budi Heru',
        kanitpam: 'Hendri Wahyudi',
        priority_level: 'normal',
        manager_comment: 'Perangkat GPS yang rusak harus segera diganti dengan unit cadangan. Koordinasikan dengan IT Support Regional agar tracking kembali aktif sebelum shift malam.',
        manager_comment_at: '2026-06-14T09:12:00.000Z',
        manager_comment_nik: '1002345',
        manager_comment_name: 'Budi Heru',
        rc_comment: 'Disetujui. Unit cadangan GPS tipe C-200 telah dikirimkan hari ini. Harap laporkan setelah selesai instalasi.',
        rc_comment_at: '2026-06-14T11:45:00.000Z',
        rc_comment_nik: '2005432',
        rc_comment_name: 'Dewi Anggraini',
        srmd_comment: 'Monitoring status GPS BK 9012 AB ditandai sebagai perbaikan selesai. Pemantauan rute akan diaktifkan kembali mulai besok pagi.',
        srmd_comment_at: '2026-06-14T14:30:00.000Z',
        srmd_comment_nik: '3009876',
        srmd_comment_name: 'Ahmad Fauzan'
      },
      submitted_at: '2026-06-13T12:00:00.000Z'
    }
  ]

  const { error: insertResultsError } = await supabase.from('patrol_results').insert(resultsToInsert)
  if (insertResultsError) {
    console.error('Error inserting patrol_results:', insertResultsError)
    return
  }
  console.log('Successfully inserted patrol_results.')

  // 3. Insert into patrol_issues
  const issuesToInsert = [
    {
      report_id: '087ab5ba-28c1-492b-a471-a560f172e71b', // 15 Feb 2026, Motorcycle, BK 5566 GH, tracking unavailable
      issue_type: 'vehicle',
      description: 'Motor patroli mengalami kebocoran oli mesin parah sejak pagi hari.',
      submitted_at: '2026-06-15T08:00:00.000Z'
    },
    {
      report_id: '5f9fc0bb-6810-4175-842a-eae3cea60c50', // 13 Feb 2026, Car, BK 9012 AB, tracking unavailable
      issue_type: 'gps',
      description: 'Perangkat GPS tidak menyala dan tidak menangkap sinyal satelit setelah guncangan keras.',
      submitted_at: '2026-06-13T11:00:00.000Z'
    }
  ]

  const { error: insertIssuesError } = await supabase.from('patrol_issues').insert(issuesToInsert)
  if (insertIssuesError) {
    console.error('Error inserting patrol_issues:', insertIssuesError)
    return
  }
  console.log('Successfully inserted patrol_issues.')
  console.log('Seeding completed successfully!')
}

seed()
