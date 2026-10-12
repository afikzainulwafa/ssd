import { PatrolEvent } from '@/components/event-panel-types'
import { ROUTE_CORRIDORS, SPEED_CORRIDORS } from '@/lib/demo-track-segments'

/**
 * Event demo — track out-of-route & speeding memakai koordinat penuh
 * dari LPYE_Tracks-2.geojson (lihat lib/demo-track-segments.ts).
 * Regenerate: node scripts/extract-demo-tracks.mjs
 */

const STOP_COORDS: [number, number][] = [
  [1.675131, 99.865681], [1.678774, 99.863573], [1.672500, 99.868200],
  [1.680200, 99.861100], [1.669800, 99.870500], [1.676900, 99.866800],
  [1.671200, 99.872300], [1.679500, 99.859900], [1.668400, 99.874100],
  [1.677800, 99.864200],
]

const STOP_TIMES = [
  '00:45 - 05:03', '05:06 - 06:41', '07:12 - 07:58', '08:20 - 09:05',
  '10:15 - 11:02', '12:30 - 13:18', '14:05 - 14:52', '16:10 - 17:05',
  '18:22 - 19:10', '20:45 - 21:30',
]

const ROUTE_TIMES = [
  '00:07 - 00:11', '00:14 - 00:22', '01:05 - 01:14', '02:18 - 02:28',
  '03:30 - 03:42', '04:55 - 05:08', '06:12 - 06:25', '07:40 - 07:55',
  '09:05 - 09:20', '10:30 - 10:48',
]

const SPEED_TIMES = [
  '06:42 - 06:43', '06:45 - 06:46', '07:10 - 07:12', '08:25 - 08:27',
  '09:40 - 09:42', '11:05 - 11:07', '13:20 - 13:22', '15:35 - 15:37',
  '17:50 - 17:52', '19:05 - 19:07',
]

function trackBounds(track: [number, number][]) {
  const lats = track.map((p) => p[0])
  const lngs = track.map((p) => p[1])
  const mid = track[Math.floor(track.length / 2)]
  return {
    lat: mid[0],
    lng: mid[1],
    width: Math.max(...lngs) - Math.min(...lngs) + 0.003,
    height: Math.max(...lats) - Math.min(...lats) + 0.003,
  }
}

const STOP_SUBS = ['di Pos', 'di Kantor Besar', 'di Workshop'] as const

const STOP_BLOCKS = ['D-48', 'D-39', 'E-60', 'D-55', 'D-45', 'D-47', 'D-53', 'D-51', 'D-40', 'D-38'] as const

const STOP_DURATIONS_SUBMITTED = [
  '18 menit', '22 menit', '15 menit', '35 menit', '25 menit',
  '20 menit', '58 menit', '42 menit', '28 menit', '30 menit',
]

export function createDemoStopEvents(isSubmitted = false): PatrolEvent[] {
  return STOP_COORDS.map((coord, i) => {
    let commentCategory = ''
    let commentDetail = ''
    let comment = ''

    if (isSubmitted) {
      const stopConfigs = [
        { cat: 'Standby', det: 'Pos', com: 'Standby di Pos' },
        { cat: 'Cek Area Rawan Pencurian', det: '', com: 'Cek Area Rawan Pencurian' },
        { cat: 'Cek Area Rawan Kebakaran', det: '', com: 'Cek Area Rawan Kebakaran' },
        { cat: 'Ishoma', det: '', com: 'Ishoma' },
        { cat: 'Cek Jalan Akses/Poros', det: '', com: 'Cek Jalan Akses/Poros' },
        { cat: 'Koordinasi & Pergantian Shift', det: '', com: 'Koordinasi & Pergantian Shift' },
        { cat: 'Pencucian Kendaraan', det: '', com: 'Pencucian Kendaraan' },
        { cat: 'Pengisian BBM', det: '', com: 'Pengisian BBM' },
        { cat: 'Standby', det: 'Kantor Besar', com: 'Standby di Kantor Besar' },
        { cat: 'Ishoma', det: '', com: 'Ishoma' }
      ]
      const cfg = stopConfigs[i % stopConfigs.length]
      commentCategory = cfg.cat
      commentDetail = cfg.det
      comment = cfg.com
    } else {
      commentCategory = i % 3 === 0 ? 'Standby' : i % 3 === 1 ? 'Istirahat' : ''
      commentDetail = i % 3 === 0 ? STOP_SUBS[i % 3] : ''
      comment = i % 3 === 0 ? STOP_SUBS[i % 3] : i % 3 === 1 ? 'Istirahat' : ''
    }

    return {
      id: i + 1,
      time: STOP_TIMES[i],
      duration: isSubmitted ? STOP_DURATIONS_SUBMITTED[i] : `${32 + i * 5} menit`,
      lat: coord[0],
      lng: coord[1],
      blockPair: STOP_BLOCKS[i],
      commentCategory,
      commentDetail,
      comment,
    }
  })
}

export function createDemoRouteEvents(isSubmitted = false): PatrolEvent[] {
  return ROUTE_CORRIDORS.map(({ pair, track }, i) => {
    const mid = trackBounds(track)
    let commentCategory = ''
    let commentDetail = ''
    let comment = ''

    if (isSubmitted) {
      const routeConfigs = [
        { cat: 'Jalan Tidak Bisa Dilalui', det: '', com: 'Jalan berlumpur akibat hujan deras, harus memutar lewat blok E-10' },
        { cat: 'Instruksi Mendadak', det: '', com: 'Instruksi mendadak cek laporan ternak warga masuk ke area blok C-12' },
        { cat: 'Melakukan Pengejaran', det: '', com: 'Melakukan pengejaran terduga pelaku pencurian TBS di perbatasan' },
        { cat: 'Mengantar ke Kantor Polisi', det: '', com: 'Mengantar terduga pelaku pencurian TBS ke Polsek terdekat' },
        { cat: 'Memantau Restan', det: '', com: 'Pengecekan buah restan di TPH untuk memastikan keamanan dari pencurian' },
        { cat: 'Mengawal Kegiatan Panen', det: '', com: 'Pengawalan kegiatan panen di blok rawan untuk mencegah penjarahan' },
        { cat: 'Mengawal Kegiatan Pupuk', det: '', com: 'Pengawalan pengangkutan pupuk ke gudang divisi' },
        { cat: 'Pemantauan Api', det: '', com: 'Memantau titik asap yang terdeteksi di perbatasan estate' },
        { cat: 'Mengantar Anggota ke Pos', det: '', com: 'Mengantar pergantian personil ke Pos Jaga Timur' },
        { cat: 'Menjemput Tim Patroli Polisi/TNI', det: '', com: 'Menjemput personil Bhabinkamtibmas untuk patroli bersama' }
      ]
      const cfg = routeConfigs[i % routeConfigs.length]
      commentCategory = cfg.cat
      commentDetail = cfg.det
      comment = cfg.com
    } else {
      commentCategory = i % 4 === 0 ? 'Mendadak' : i % 4 === 1 ? 'Operasional' : ''
      commentDetail = i % 4 === 1 ? 'Pengisian BBM' : ''
      comment = i % 4 === 0 ? 'Mendadak' : i % 4 === 1 ? 'Pengisian BBM' : ''
    }

    return {
      id: i + 1,
      time: ROUTE_TIMES[i],
      distance: `${(0.9 + i * 0.2).toFixed(1)} km`,
      lat: mid.lat,
      lng: mid.lng,
      width: mid.width,
      height: mid.height,
      track,
      blockPair: pair,
      commentCategory,
      commentDetail,
      comment,
    }
  })
}

export function createDemoSpeedEvents(isSubmitted = false): PatrolEvent[] {
  return SPEED_CORRIDORS.map(({ pair, track }, i) => {
    const mid = trackBounds(track)
    let commentCategory = ''
    let commentDetail = ''
    let comment = ''

    if (isSubmitted) {
      const speedConfigs = [
        { cat: 'Melakukan Pengejaran', det: '', com: 'Mengejar pengendara motor mencurigakan yang melintas tanpa izin' },
        { cat: 'Tugas Non-Patroli', det: 'Mengantar Tersangka Pencurian', com: 'Mengantar tersangka pencurian TBS ke Polsek dengan segera' },
        { cat: 'Melewati Jalan Raya', det: '', com: 'Melintasi jalan poros utama estate yang beraspal lebar dengan kecepatan aman' },
        { cat: 'Tugas Non-Patroli', det: 'Mengantar Tim Patroli', com: 'Respon cepat pengantaran bantuan personil keamanan ke area konflik' },
        { cat: 'Melakukan Pengejaran', det: '', com: 'Mengejar kendaraan pembawa buah sawit ilegal yang melarikan diri' },
        { cat: 'Melewati Jalan Raya', det: '', com: 'Melalui jalan trans-provinsi untuk berpindah ke divisi sebelah secara cepat' },
        { cat: 'Tugas Non-Patroli', det: 'Mengantar Tamu', com: 'Mengantar tamu manajemen melakukan inspeksi lapangan cepat' },
        { cat: 'Melakukan Pengejaran', det: '', com: 'Mengejar terduga pencuri sawit yang melarikan diri ke kawasan hutan' },
        { cat: 'Tugas Non-Patroli', det: 'Mengantar Karyawan', com: 'Mengantar karyawan cedera/sakit ke klinik pusat estate terdekat' },
        { cat: 'Melewati Jalan Raya', det: '', com: 'Melintasi jalan raya aspal penghubung antar divisi' }
      ]
      const cfg = speedConfigs[i % speedConfigs.length]
      commentCategory = cfg.cat
      commentDetail = cfg.det
      comment = cfg.com
    } else {
      commentCategory = i % 5 === 0 ? 'Darurat' : i % 5 === 2 ? 'Operasional' : ''
      commentDetail = i % 5 === 2 ? 'Mengejar target' : ''
      comment = i % 5 === 0 ? 'Darurat' : i % 5 === 2 ? 'Mengejar target' : ''
    }

    return {
      id: i + 1,
      time: SPEED_TIMES[i],
      distance: `${52 + i * 2} km/jam`,
      speedKm: `${(0.4 + i * 0.15).toFixed(1)} km`,
      lat: mid.lat,
      lng: mid.lng,
      track,
      width: mid.width,
      height: mid.height,
      blockPair: pair,
      commentCategory,
      commentDetail,
      comment,
    }
  })
}
