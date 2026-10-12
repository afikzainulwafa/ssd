'use client'

import { useState } from 'react'
import PageShell from '@/components/PageShell'
import {
  Shield,
  Clock,
  Compass,
  Gauge,
  Layers,
  MapPin,
  History,
  Save,
  RotateCcw,
  Info,
  Search,
  Check,
  AlertTriangle,
  Download,
  Calendar,
  Filter,
  ArrowRight,
  Settings
} from 'lucide-react'

// Interface definitions
interface Parameter {
  key: string
  label: string
  category: 'Waktu & Sinkronisasi' | 'Deteksi Kejadian Diam' | 'Kecepatan & Pelanggaran' | 'Koridor & Rute' | 'Konfigurasi Sektor Blok' | 'Batas Overtime Kegiatan'
  value: string | number
  defaultValue: string | number
  unit?: string
  description: string
  type: 'text' | 'number'
  impactText: string
}

interface ChangeLog {
  id: string
  timestamp: string
  adminName: string
  parameterKey: string
  parameterLabel: string
  category: string
  oldValue: string | number
  newValue: string | number
  reason: string
}

// Default system configurations
const DEFAULT_PARAMETERS: Parameter[] = [
  // 1. Waktu & Sinkronisasi
  {
    key: 'WINDOW_HARIAN',
    label: 'Rentang Waktu Analisis Harian',
    category: 'Waktu & Sinkronisasi',
    value: '07:00 - 07:00 (D+1)',
    defaultValue: '07:00 - 07:00 (D+1)',
    description: 'Siklus rentang waktu 24 jam yang digunakan sistem untuk mengonsolidasikan dan memproses kalkulasi kepatuhan patroli harian.',
    type: 'text',
    impactText: 'Menggeser pengelompokan data koordinat GPS untuk perhitungan shift patroli.'
  },
  {
    key: 'FETCH_GPS_CRON',
    label: 'Jadwal Pengambilan Data GPS (Cron)',
    category: 'Waktu & Sinkronisasi',
    value: '08:00 WIB Harian',
    defaultValue: '08:00 WIB Harian',
    description: 'Konfigurasi waktu penjadwalan otomatis (Cron) untuk sinkronisasi data koordinat dari perangkat keras GPS ke database utama.',
    type: 'text',
    impactText: 'Menentukan batas kesiapan penyajian data gps untuk tinjauan patroli di pagi hari.'
  },

  // 2. Deteksi Kejadian Diam
  {
    key: 'THRESHOLD_BERHENTI_DURASI',
    label: 'Durasi Minimum Deteksi Berhenti',
    category: 'Deteksi Kejadian Diam',
    value: 30,
    defaultValue: 30,
    unit: 'menit',
    description: 'Durasi minimum kendaraan berada dalam kondisi statis di luar koordinat pos untuk diklasifikasikan sebagai Kejadian Berhenti.',
    type: 'number',
    impactText: 'Pengurangan ambang batas akan memicu lebih banyak notifikasi Kejadian Berhenti (Stop Event).'
  },
  {
    key: 'THRESHOLD_BERHENTI_RADIUS',
    label: 'Radius Clustering Titik Berhenti',
    category: 'Deteksi Kejadian Diam',
    value: 50,
    defaultValue: 50,
    unit: 'meter',
    description: 'Radius toleransi spasial untuk meredam fluktuasi akurasi GPS (drift) saat mengidentifikasi posisi kendaraan yang sedang parkir.',
    type: 'number',
    impactText: 'Menghindari alarm palsu akibat lompatan akurasi koordinat GPS saat unit sedang berhenti.'
  },
  {
    key: 'MAX_STOP_ALLOWED',
    label: 'Batas Maksimal Berhenti Tanpa Izin',
    category: 'Deteksi Kejadian Diam',
    value: 15,
    defaultValue: 15,
    unit: 'menit',
    description: 'Batas durasi berhenti kumulatif yang ditoleransi di luar titik pos pengawasan sebelum memicu peringatan deviasi tugas.',
    type: 'number',
    impactText: 'Digunakan untuk mengukur tingkat kepatuhan dan keaktifan petugas di lapangan.'
  },

  // 3. Kecepatan & Pelanggaran
  {
    key: 'THRESHOLD_KECEPATAN',
    label: 'Batas Kecepatan Maksimal Sektoral',
    category: 'Kecepatan & Pelanggaran',
    value: 50,
    defaultValue: 50,
    unit: 'km/jam',
    description: 'Batas kecepatan sektoral maksimum yang diizinkan untuk operasional unit di jalan perkebunan kelapa sawit demi keselamatan kerja.',
    type: 'number',
    impactText: 'Laju kendaraan di atas batas ini akan secara otomatis dicatat sebagai Pelanggaran Kecepatan (Speeding).'
  },

  // 4. Koridor & Rute
  {
    key: 'THRESHOLD_KELUAR_RUTE',
    label: 'Jarak Toleransi Keluar Rute',
    category: 'Koridor & Rute',
    value: 1.0,
    defaultValue: 1.0,
    unit: 'km',
    description: 'Ambang toleransi jarak deviasi tegak lurus dari sumbu rute resmi sebelum unit dinyatakan keluar rute (Off-Route).',
    type: 'number',
    impactText: 'Mengantisipasi belokan darurat atau rintangan jalan agar tidak langsung memicu alarm keluar rute.'
  },

  // 5. Konfigurasi Sektor Blok
  {
    key: 'MIN_JARAK_LEWAT_BLOK',
    label: 'Jarak Lintasan Minimum di Blok',
    category: 'Konfigurasi Sektor Blok',
    value: 600,
    defaultValue: 600,
    unit: 'meter',
    description: 'Panjang lintasan minimum yang wajib ditempuh kendaraan di dalam batas blok untuk memvalidasi kunjungan.',
    type: 'number',
    impactText: 'Mencegah status "Telah Dikunjungi" terpicu jika unit hanya melintas cepat di perbatasan luar blok.'
  },
  {
    key: 'MIN_GAP_LEWAT_BLOK',
    label: 'Interval Kunjungan Ulang Blok',
    category: 'Konfigurasi Sektor Blok',
    value: 1,
    defaultValue: 1,
    unit: 'menit',
    description: 'Interval waktu minimum jeda kunjungan ulang ke blok yang sama agar dihitung sebagai sesi kunjungan terpisah.',
    type: 'number',
    impactText: 'Mengatur pemisahan putaran patroli pertama dengan patroli berikutnya pada blok yang sama.'
  },
  {
    key: 'BUFFER_TOTAL',
    label: 'Buffer Jangkauan Blok',
    category: 'Konfigurasi Sektor Blok',
    value: 25,
    defaultValue: 25,
    unit: 'meter',
    description: 'Radius toleransi spasial (buffer) di sekitar batas blok untuk memetakan cakupan wilayah pengawasan kendaraan.',
    type: 'number',
    impactText: 'Ambang batas penentu radius toleransi spasial untuk menghitung coverage kunjungan unit patroli pada blok.'
  },

  // 6. Batas Overtime Kegiatan
  {
    key: 'OVERTIME_CUCI',
    label: 'Batas Waktu Pengondisian Pencucian',
    category: 'Batas Overtime Kegiatan',
    value: 50,
    defaultValue: 50,
    unit: 'menit',
    description: 'Durasi maksimal penyimpangan diam yang ditoleransi untuk aktivitas pencucian unit kendaraan.',
    type: 'number',
    impactText: 'Pencucian kendaraan melebihi durasi ini akan ditandai sebagai Overtime Cuci.'
  },
  {
    key: 'OVERTIME_BBM',
    label: 'Batas Waktu Pengisian BBM',
    category: 'Batas Overtime Kegiatan',
    value: 35,
    defaultValue: 35,
    unit: 'menit',
    description: 'Durasi maksimal penyimpangan diam yang ditoleransi untuk aktivitas pengisian bahan bakar.',
    type: 'number',
    impactText: 'Pengisian BBM melebihi durasi ini akan ditandai sebagai Overtime BBM.'
  },
  {
    key: 'OVERTIME_KOORDINASI',
    label: 'Batas Waktu Koordinasi & Shift',
    category: 'Batas Overtime Kegiatan',
    value: 50,
    defaultValue: 50,
    unit: 'menit',
    description: 'Durasi maksimal penyimpangan diam yang ditoleransi untuk proses koordinasi serah terima shift.',
    type: 'number',
    impactText: 'Kegiatan koordinasi serah terima shift melebihi durasi ini akan ditandai sebagai Overtime Koordinasi.'
  },
  {
    key: 'OVERTIME_ISHOMA',
    label: 'Batas Waktu Ishoma',
    category: 'Batas Overtime Kegiatan',
    value: 65,
    defaultValue: 65,
    unit: 'menit',
    description: 'Durasi maksimal penyimpangan diam yang ditoleransi untuk aktivitas istirahat, sholat, dan makan.',
    type: 'number',
    impactText: 'Waktu Ishoma melebihi durasi ini akan ditandai sebagai Overtime Ishoma.'
  }
]

// Default initial mock change logs
const INITIAL_LOGS: ChangeLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-06-08T09:15:00.000Z',
    adminName: 'Budi Heru (Super Admin)',
    parameterKey: 'THRESHOLD_KECEPATAN',
    parameterLabel: 'Batas Kecepatan Maksimal Sektoral',
    category: 'Kecepatan & Pelanggaran',
    oldValue: 40,
    newValue: 50,
    reason: 'Penyesuaian batas kecepatan maksimal kendaraan di jalan poros utama berdasarkan hasil keputusan koordinasi dengan Divisi K3l.'
  },
  {
    id: 'log-2',
    timestamp: '2026-06-10T14:20:12.000Z',
    adminName: 'Budi Heru (Super Admin)',
    parameterKey: 'THRESHOLD_BERHENTI_DURASI',
    parameterLabel: 'Durasi Minimum Deteksi Berhenti',
    category: 'Pelacakan & Deteksi Diam',
    oldValue: 20,
    newValue: 30,
    reason: 'Meningkatkan threshold durasi diam untuk meminimalkan false alarm saat pengemudi berhenti untuk pengecekan ban berkala.'
  },
  {
    id: 'log-3',
    timestamp: '2026-06-12T11:05:43.000Z',
    adminName: 'Budi Heru (Super Admin)',
    parameterKey: 'BUFFER_AKURASI_GPS',
    parameterLabel: 'Margin Kesalahan Akurasi GPS',
    category: 'Koridor & Geofencing',
    oldValue: 3,
    newValue: 5,
    reason: 'Menyesuaikan margin akurasi perangkat keras GPS tipe baru (ST-400) yang memiliki margin error 5 meter di area tutupan tajuk sawit lebat.'
  },
  {
    id: 'log-4',
    timestamp: '2026-06-15T16:40:02.000Z',
    adminName: 'Budi Heru (Super Admin)',
    parameterKey: 'MIN_GAP_LEWAT_BLOK',
    parameterLabel: 'Interval Kunjungan Ulang Blok Rawan',
    category: 'Blok Rawan',
    oldValue: 5,
    newValue: 1,
    reason: 'Penurunan gap durasi agar patroli putaran cepat di sektor rawan pencurian TBS tetap tercatat secara berurutan.'
  }
]

function getSliderProps(key: string): { min: number; max: number; step: number } {
  switch (key) {
    case 'THRESHOLD_BERHENTI_DURASI':
      return { min: 5, max: 120, step: 5 }
    case 'THRESHOLD_BERHENTI_RADIUS':
      return { min: 10, max: 250, step: 5 }
    case 'MAX_STOP_ALLOWED':
      return { min: 5, max: 120, step: 5 }
    case 'THRESHOLD_KECEPATAN':
      return { min: 10, max: 120, step: 5 }
    case 'THRESHOLD_KELUAR_RUTE':
      return { min: 0.1, max: 5.0, step: 0.1 }
    case 'MIN_JARAK_LEWAT_BLOK':
      return { min: 100, max: 2000, step: 50 }
    case 'MIN_GAP_LEWAT_BLOK':
      return { min: 1, max: 30, step: 1 }
    case 'BUFFER_TOTAL':
      return { min: 5, max: 100, step: 5 }
    case 'OVERTIME_CUCI':
      return { min: 10, max: 120, step: 5 }
    case 'OVERTIME_BBM':
      return { min: 10, max: 120, step: 5 }
    case 'OVERTIME_KOORDINASI':
      return { min: 10, max: 120, step: 5 }
    case 'OVERTIME_ISHOMA':
      return { min: 15, max: 180, step: 5 }
    default:
      return { min: 0, max: 100, step: 1 }
  }
}

function initParams(): Parameter[] {
  if (typeof window === 'undefined') return DEFAULT_PARAMETERS
  const stored = localStorage.getItem('smarttrack_thresholds')
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Parameter[]
      const newKeys = DEFAULT_PARAMETERS.map(p => p.key)
      const storedKeys = parsed.map(p => p.key)
      const isMatch = newKeys.length === storedKeys.length && newKeys.every(k => storedKeys.includes(k))
      if (isMatch) return parsed
    } catch {
      // JSON parse error
    }
  }
  localStorage.setItem('smarttrack_thresholds', JSON.stringify(DEFAULT_PARAMETERS))
  return DEFAULT_PARAMETERS
}

function initLogs(): ChangeLog[] {
  if (typeof window === 'undefined') return INITIAL_LOGS
  const stored = localStorage.getItem('smarttrack_thresholds_logs')
  if (stored) return JSON.parse(stored) as ChangeLog[]
  localStorage.setItem('smarttrack_thresholds_logs', JSON.stringify(INITIAL_LOGS))
  return INITIAL_LOGS
}

export default function SuperAdminThresholdPage() {
  const [activeTab, setActiveTab] = useState<'config' | 'logs'>('config')

  // Parameter values — initialised lazily from localStorage
  const [params, setParams] = useState<Parameter[]>(initParams)
  // Modified parameters tracker
  const [editValues, setEditValues] = useState<{ [key: string]: string | number }>({})

  // Logs — initialised lazily from localStorage
  const [logs, setLogs] = useState<ChangeLog[]>(initLogs)

  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterDate, setFilterDate] = useState<string>('')

  // Modal states
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)
  const [changeReason, setChangeReason] = useState('')

  // Notification states
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'danger', text: string } | null>(null)

  // Derived: true if any editValue differs from its saved param value
  const isModified = Object.keys(editValues).some(key => {
    const original = params.find(p => p.key === key)
    return original !== undefined && String(original.value) !== String(editValues[key])
  })

  const showToast = (text: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage({ type, text })
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }

  // Handle single input edit
  const handleValueChange = (key: string, value: string) => {
    const originalParam = params.find(p => p.key === key)
    if (!originalParam) return

    let finalValue: string | number = value
    if (originalParam.type === 'number') {
      finalValue = value === '' ? '' : Number(value)
    }

    const newEditValues = { ...editValues, [key]: finalValue }
    setEditValues(newEditValues)
  }

  // Save the changes
  const handleConfirmSave = () => {
    if (!changeReason.trim()) return

    const updatedParams = params.map(param => {
      if (editValues[param.key] !== undefined && editValues[param.key] !== '') {
        return { ...param, value: editValues[param.key] }
      }
      return param
    })

    // Create log entries for each modified parameter
    const newLogs: ChangeLog[] = []
    const timestamp = new Date().toISOString()
    
    Object.keys(editValues).forEach(key => {
      const original = params.find(p => p.key === key)
      const newVal = editValues[key]

      if (original && String(original.value) !== String(newVal) && newVal !== '') {
        newLogs.push({
          id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          timestamp,
          adminName: 'Budi Heru (Super Admin)',
          parameterKey: key,
          parameterLabel: original.label,
          category: original.category,
          oldValue: original.value,
          newValue: newVal,
          reason: changeReason
        })
      }
    })

    if (newLogs.length > 0) {
      const allLogs = [...newLogs, ...logs]
      setLogs(allLogs)
      setParams(updatedParams)
      setEditValues({})
      setChangeReason('')
      setShowSaveModal(false)

      localStorage.setItem('smarttrack_thresholds', JSON.stringify(updatedParams))
      localStorage.setItem('smarttrack_thresholds_logs', JSON.stringify(allLogs))
      
      showToast(`Berhasil menyimpan ${newLogs.length} pembaruan parameter dan mencatatnya ke dalam log audit.`)
    } else {
      setShowSaveModal(false)
      setChangeReason('')
    }
  }

  // Reset all parameters to factory defaults
  const handleConfirmReset = () => {
    if (!changeReason.trim()) return

    const timestamp = new Date().toISOString()
    const newLogs: ChangeLog[] = []

    params.forEach(original => {
      if (String(original.value) !== String(original.defaultValue)) {
        newLogs.push({
          id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          timestamp,
          adminName: 'Budi Heru (Super Admin)',
          parameterKey: original.key,
          parameterLabel: original.label,
          category: original.category,
          oldValue: original.value,
          newValue: original.defaultValue,
          reason: `[RESET PABRIK] ${changeReason}`
        })
      }
    })

    const resetParams = params.map(p => ({ ...p, value: p.defaultValue }))
    const allLogs = [...newLogs, ...logs]

    setParams(resetParams)
    setEditValues({})
    setLogs(allLogs)
    setChangeReason('')
    setShowResetModal(false)

    localStorage.setItem('smarttrack_thresholds', JSON.stringify(resetParams))
    localStorage.setItem('smarttrack_thresholds_logs', JSON.stringify(allLogs))

    showToast(`Semua parameter dikembalikan ke setelan default. ${newLogs.length} entri dicatat ke log audit.`)
  }

  // Get current parameter value (either edited or original)
  const getParamValue = (key: string): string | number => {
    if (editValues[key] !== undefined) return editValues[key]
    const original = params.find(p => p.key === key)
    return original ? original.value : ''
  }

  // Check if parameter has been modified locally
  const isParamModified = (key: string): boolean => {
    const original = params.find(p => p.key === key)
    if (!original) return false
    return editValues[key] !== undefined && String(editValues[key]) !== String(original.value)
  }

  // Filter logs list
  const filteredLogs = logs.filter(log => {
    const searchString = `${log.parameterLabel} ${log.parameterKey} ${log.adminName} ${log.reason}`.toLowerCase()
    const matchesSearch = searchString.includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || log.category === filterCategory
    
    let matchesDate = true
    if (filterDate) {
      const logDate = new Date(log.timestamp).toISOString().split('T')[0]
      matchesDate = logDate === filterDate
    }

    return matchesSearch && matchesCategory && matchesDate
  })

  // Simulated CSV Export
  const handleExportCSV = () => {
    try {
      const headers = ['ID Log', 'Tanggal & Waktu', 'Admin', 'Key Parameter', 'Nama Parameter', 'Kategori', 'Nilai Lama', 'Nilai Baru', 'Alasan/Justifikasi']
      const rows = filteredLogs.map(l => [
        l.id,
        new Date(l.timestamp).toLocaleString('id-ID'),
        l.adminName,
        l.parameterKey,
        l.parameterLabel,
        l.category,
        l.oldValue,
        l.newValue,
        `"${l.reason.replace(/"/g, '""')}"`
      ])

      const csvContent = 'data:text/csv;charset=utf-8,' 
        + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
      
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', `smarttrack_audit_logs_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      showToast('Log audit berhasil diekspor sebagai file CSV.')
    } catch {
      showToast('Gagal melakukan ekspor data.', 'danger')
    }
  }

  // Group parameters by category
  const categories: Array<{
    name: Parameter['category']
    icon: React.ReactNode
    colorClass: string
    accentClass: string
  }> = [
    { name: 'Waktu & Sinkronisasi', icon: <Clock size={16} />, colorClass: 'blue', accentClass: 'blue' },
    { name: 'Deteksi Kejadian Diam', icon: <Compass size={16} />, colorClass: 'teal', accentClass: 'teal' },
    { name: 'Kecepatan & Pelanggaran', icon: <Gauge size={16} />, colorClass: 'red', accentClass: 'red' },
    { name: 'Koridor & Rute', icon: <Layers size={16} />, colorClass: 'purple', accentClass: 'purple' },
    { name: 'Konfigurasi Sektor Blok', icon: <MapPin size={16} />, colorClass: 'orange', accentClass: 'orange' },
    { name: 'Batas Overtime Kegiatan', icon: <History size={16} />, colorClass: 'slate', accentClass: 'slate' }
  ]

  // Calculate statistics for dashboard summary cards
  const totalActiveParams = params.length
  const totalModifiedParams = params.filter(p => String(p.value) !== String(p.defaultValue)).length
  const lastUpdated = logs.length > 0 ? new Date(logs[0].timestamp).toLocaleDateString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  }) : 'Belum ada data'
  const totalAuditLogsCount = logs.length

  return (
    <PageShell
      title="Manajemen Parameter & Ambang Batas"
      subtitle="Super Admin · Pengaturan Akurasi Algoritma & Log Audit Perubahan"
      iconVariant="default"
      icon={<Shield size={18} />}
    >
      <style>{`
        /* ── LAYOUT & FLEXBOX UTILITIES (NO TAILWIND REPLACEMENT) ── */
        .flex { display: flex; }
        .flex-col { display: flex; flex-direction: column; }
        .flex-row { display: flex; flex-direction: row; }
        .flex-wrap { display: flex; flex-wrap: wrap; }
        .items-center { align-items: center; }
        .items-start { align-items: flex-start; }
        .items-end { align-items: flex-end; }
        .justify-between { justify-content: space-between; }
        .justify-end { justify-content: flex-end; }
        .justify-center { justify-content: center; }
        .flex-1 { flex: 1 1 0%; }
        .flex-shrink-0 { flex-shrink: 0; }
        .min-w-0 { min-width: 0; }
        .w-full { width: 100%; }
        .w-28 { width: 112px; }
        .w-12 { width: 48px; }
        .h-2 { height: 8px; }
        .h-full { height: 100%; }

        /* Grid systems */
        .grid { display: grid; }
        .grid-cols-2 { display: grid; grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 1024px) {
          .grid-cols-2 { grid-template-columns: 1fr; }
        }

        /* Gaps */
        .gap-1 { gap: 4px; }
        .gap-1.5 { gap: 6px; }
        .gap-2 { gap: 8px; }
        .gap-2.5 { gap: 10px; }
        .gap-3 { gap: 12px; }
        .gap-4 { gap: 16px; }

        /* Padding utilities */
        .p-2 { padding: 8px; }
        .p-2.5 { padding: 10px; }
        .p-3 { padding: 12px; }
        .p-4 { padding: 16px; }
        .px-1.5 { padding-left: 6px; padding-right: 6px; }
        .px-2 { padding-left: 8px; padding-right: 8px; }
        .px-2.5 { padding-left: 10px; padding-right: 10px; }
        .px-4 { padding-left: 16px; padding-right: 16px; }
        .py-0.5 { padding-top: 2px; padding-bottom: 2px; }
        .py-1 { padding-top: 4px; padding-bottom: 4px; }
        .py-1.5 { padding-top: 6px; padding-bottom: 6px; }
        .py-2.5 { padding-top: 10px; padding-bottom: 10px; }
        .pt-2 { padding-top: 8px; }
        .pb-1 { padding-bottom: 4px; }

        /* Margin utilities */
        .mt-0.5 { margin-top: 2px; }
        .mt-1 { margin-top: 4px; }
        .mt-1.5 { margin-top: 6px; }
        .mt-2 { margin-top: 8px; }
        .mt-4 { margin-top: 16px; }
        .mb-1.5 { margin-bottom: 6px; }
        .mb-3 { margin-bottom: 12px; }
        .mb-4 { margin-bottom: 16px; }
        .ml-1 { margin-left: 4px; }
        .m-0 { margin: 0; }

        /* Borders & Border Radius */
        .border { border: 1px solid #dde4ef; }
        .border-t { border-top: 1px solid #dde4ef; }
        .border-b { border-bottom: 1px solid #dde4ef; }
        .border-l-2 { border-left: 2px solid; }
        .rounded { border-radius: 4px; }
        .rounded-md { border-radius: 6px; }
        .rounded-lg { border-radius: 8px; }
        .rounded-xl { border-radius: 12px; }
        .rounded-full { border-radius: 9999px; }

        /* Typography sizing & weights */
        .text-xs { font-size: 11px; }
        .text-sm { font-size: 13px; }
        .text-2xl { font-size: 24px; }
        .font-normal { font-weight: 400; }
        .font-medium { font-weight: 500; }
        .font-semibold { font-weight: 600; }
        .font-bold { font-weight: 700; }
        .font-extrabold { font-weight: 800; }
        .font-black { font-weight: 900; }
        .font-mono { font-family: monospace; }
        .leading-relaxed { line-height: 1.52; }

        /* Dynamic colors & backgrounds */
        .bg-white { background-color: #ffffff; }
        .bg-slate-50\/70 { background-color: rgba(248, 250, 252, 0.7); }
        .bg-slate-50\/50 { background-color: rgba(248, 250, 252, 0.5); }
        .bg-slate-50\/30 { background-color: rgba(248, 250, 252, 0.3); }
        .bg-slate-100 { background-color: #f1f5f9; }
        .bg-amber-50\/20 { background-color: rgba(255, 251, 235, 0.2); }
        .bg-amber-50\/40 { background-color: rgba(255, 251, 235, 0.4); }
        .bg-amber-100\/70 { background-color: rgba(254, 243, 199, 0.7); }
        .bg-emerald-50\/30 { background-color: rgba(236, 253, 245, 0.3); }
        .bg-red-50\/30 { background-color: rgba(254, 226, 226, 0.3); }

        .text-amber-800 { color: #92400e; }
        .text-amber-700 { color: #b45309; }
        .text-slate-500 { color: #64748b; }
        .text-slate-400 { color: #94a3b8; }
        .text-red-700 { color: #b91c1c; }
        .text-emerald-700 { color: #047857; }

        /* Custom Visual Buffer Bar components */
        .bg-blue-600 { background-color: #1d4ed8; }
        .bg-teal-500 { background-color: #14b8a6; }

        /* Toast & Modal layouts */
        .fixed { position: fixed; }
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .top-4 { top: 16px; }
        .right-4 { right: 16px; }
        .z-50 { z-index: 50; }
        .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
        .bg-emerald-50 { background-color: #ecfdf5; }
        .border-emerald-200 { border-color: #a7f3d0; }
        .text-emerald-800 { color: #065f46; }
        .bg-emerald-200 { background-color: #a7f3d0; }
        .text-emerald-700 { color: #047857; }
        .bg-red-50 { background-color: #fef2f2; }
        .border-red-200 { border-color: #fecaca; }
        .text-red-800 { color: #991b1b; }
        .bg-red-200 { background-color: #fecaca; }
        .text-red-700 { color: #b91c1c; }
        .max-w-lg { max-width: 32rem; }
        .overflow-hidden { overflow: hidden; }
        .bg-slate-900\/60 { background-color: rgba(15, 23, 42, 0.6); }
        .backdrop-blur-xs { backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px); }

        /* Glassmorphism stat cards */
        .glass-stat-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.04), 0 4px 12px 0 rgba(0, 0, 0, 0.02);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          position: relative;
          overflow: hidden;
        }
        .glass-stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.08), 0 8px 20px 0 rgba(0, 0, 0, 0.03);
          border-color: rgba(255, 255, 255, 0.8);
        }
        .glass-stat-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
        }
        .glass-stat-card:hover::after {
          opacity: 0.8;
        }

        /* Hover lift on parameters card */
        .param-category-card {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          border: 1px solid #dde4ef;
        }
        .param-category-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(26, 39, 68, 0.12);
          border-color: #cbd5e1;
        }

        /* Custom premium styling for parameter item row */
        .param-item-row {
          transition: all 0.25s ease;
        }
        .param-item-row:hover {
          background-color: rgba(248, 250, 252, 0.8);
          border-color: #cbd5e1;
        }
        .param-item-row.modified {
          border-color: #f59e0b;
          background-color: rgba(254, 243, 199, 0.15);
          box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.05);
        }
        .param-item-row.modified:hover {
          background-color: rgba(254, 243, 199, 0.25);
        }

        /* Range slider styling */
        .custom-range-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #e2e8f0;
          outline: none;
          transition: background 0.15s ease;
        }
        .custom-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #1565d8;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          transition: transform 0.1s ease, background-color 0.15s ease;
        }
        .custom-range-slider::-webkit-slider-thumb:hover {
          transform: scale(1.25);
        }
        .custom-range-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #1565d8;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          border: none;
          transition: transform 0.1s ease, background-color 0.15s ease;
        }
        .custom-range-slider::-moz-range-thumb:hover {
          transform: scale(1.25);
        }

        /* Custom categories themes thumb */
        .theme-blue::-webkit-slider-thumb { background: #1565c0; }
        .theme-blue::-moz-range-thumb { background: #1565c0; }
        .theme-teal::-webkit-slider-thumb { background: #00897b; }
        .theme-teal::-moz-range-thumb { background: #00897b; }
        .theme-red::-webkit-slider-thumb { background: #e53935; }
        .theme-red::-moz-range-thumb { background: #e53935; }
        .theme-purple::-webkit-slider-thumb { background: #5e35b1; }
        .theme-purple::-moz-range-thumb { background: #5e35b1; }
        .theme-orange::-webkit-slider-thumb { background: #ef6c00; }
        .theme-orange::-moz-range-thumb { background: #ef6c00; }
        .theme-slate::-webkit-slider-thumb { background: #78909c; }
        .theme-slate::-moz-range-thumb { background: #78909c; }

        /* Pulsing Save Button Glow when Modified */
        @keyframes save-pulse {
          0% {
            box-shadow: 0 3px 10px rgba(21, 101, 216, 0.3), 0 0 0 0 rgba(21, 101, 216, 0.45);
          }
          70% {
            box-shadow: 0 3px 10px rgba(21, 101, 216, 0.3), 0 0 0 8px rgba(21, 101, 216, 0);
          }
          100% {
            box-shadow: 0 3px 10px rgba(21, 101, 216, 0.3), 0 0 0 0 rgba(21, 101, 216, 0);
          }
        }
        .btn-primary-pulse {
          animation: save-pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }

        /* Audit log timeline */
        .log-row {
          transition: background-color 0.2s ease;
        }
        .log-row:hover {
          background-color: rgba(248, 250, 252, 1) !important;
        }

        /* ── KPI CARD PREMIUM STYLE (NO TAILWIND) ── */
        .kpi-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.9));
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 4px 20px rgba(13, 71, 161, 0.04);
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: 80px;
          flex: 1;
        }
        .kpi-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(13, 71, 161, 0.08);
          border-color: rgba(21, 101, 216, 0.3);
        }
        .kpi-card-glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          filter: blur(25px);
          opacity: 0.12;
          pointer-events: none;
        }
        .kpi-card-glow.blue { background-color: #3b82f6; }
        .kpi-card-glow.amber { background-color: #f59e0b; }
        .kpi-card-glow.purple { background-color: #8b5cf6; }
        .kpi-card-glow.red { background-color: #ef4444; }

        .kpi-icon-container {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3);
          transition: transform 0.3s ease;
        }
        .kpi-card:hover .kpi-icon-container {
          transform: scale(1.1) rotate(5deg);
        }
        .kpi-icon-container.blue { background: #e0f2fe; color: #0284c7; border: 1px solid #bae6fd; }
        .kpi-icon-container.amber { background: #fef3c7; color: #d97706; border: 1px solid #fde68a; }
        .kpi-icon-container.purple { background: #f3e8ff; color: #7c3aed; border: 1px solid #e9d5ff; }
        .kpi-icon-container.red { background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; }

        .kpi-value {
          font-size: 22px;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 2px;
        }
        .kpi-value.blue { color: #0369a1; }
        .kpi-value.amber { color: #b45309; }
        .kpi-value.purple { color: #6d28d9; }
        .kpi-value.red { color: #b91c1c; }

        .kpi-label {
          font-size: 11.5px;
          font-weight: 700;
          color: #334155;
        }
        .kpi-subtext {
          font-size: 9.5px;
          color: #64748b;
          margin-top: 1px;
        }

        /* ── PARAMETER TITLES STYLE ── */
        .param-title-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .param-title-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .param-item-row:hover .param-title-bullet {
          transform: scale(1.4);
        }
        .param-item-row.modified .param-title-bullet {
          background-color: #f59e0b !important;
          box-shadow: 0 0 8px #f59e0b;
        }

        .theme-bullet-blue { background-color: #3b82f6; }
        .theme-bullet-teal { background-color: #0d9488; }
        .theme-bullet-red { background-color: #ef4444; }
        .theme-bullet-purple { background-color: #8b5cf6; }
        .theme-bullet-orange { background-color: #f97316; }
        .theme-bullet-slate { background-color: #64748b; }

        .param-label-text {
          font-size: 12px;
          font-weight: 700;
          color: #1e293b;
        }
        .param-key-tag {
          font-family: monospace;
          font-size: 9px;
          font-weight: 700;
          color: #475569;
          background-color: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 0.02em;
        }
      `}</style>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border animate-slide-in ${
          toastMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${toastMessage.type === 'success' ? 'bg-emerald-200' : 'bg-red-200'}`}>
            <Check size={14} className={toastMessage.type === 'success' ? 'text-emerald-700' : 'text-red-700'} />
          </div>
          <p className="font-semibold text-xs m-0">{toastMessage.text}</p>
        </div>
      )}

      {/* KPI Dashboard Cards */}
      <div className="stat-row mb-4">
        <div className="kpi-card">
          <div className="kpi-card-glow blue" />
          <div className="kpi-icon-container blue"><Layers size={20} /></div>
          <div>
            <div className="kpi-value blue">{totalActiveParams}</div>
            <div className="kpi-label">Parameter Aktif</div>
            <div className="kpi-subtext">Skenario algoritma terpasang</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-glow amber" />
          <div className="kpi-icon-container amber"><RotateCcw size={20} /></div>
          <div>
            <div className="kpi-value amber">{totalModifiedParams}</div>
            <div className="kpi-label">Kustomisasi Aktif</div>
            <div className="kpi-subtext">Diubah dari default pabrik</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-glow purple" />
          <div className="kpi-icon-container purple"><Clock size={20} /></div>
          <div>
            <div className="kpi-value purple text-sm" style={{ fontSize: '12px', marginTop: '4px', marginBottom: '4px' }}>{lastUpdated}</div>
            <div className="kpi-label">Pembaruan Terakhir</div>
            <div className="kpi-subtext">Waktu modifikasi audit terakhir</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-glow red" />
          <div className="kpi-icon-container red"><History size={20} /></div>
          <div>
            <div className="kpi-value red">{totalAuditLogsCount}</div>
            <div className="kpi-label">Riwayat Log Audit</div>
            <div className="kpi-subtext">Total pelacakan audit trail</div>
          </div>
        </div>
      </div>

      {/* Main Tab Controls and Actions */}
      <div className="flex items-center justify-between border-b border-[#dde4ef] pb-1 mt-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 border-b-2 font-bold text-xs cursor-pointer transition-all ${
              activeTab === 'config' 
                ? 'border-[#1565d8] text-[#1565d8]' 
                : 'border-transparent text-[#5c6b88] hover:text-[#1a2744]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Settings size={14} /> Konfigurasi Parameter
            </span>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 border-b-2 font-bold text-xs cursor-pointer transition-all ${
              activeTab === 'logs' 
                ? 'border-[#1565d8] text-[#1565d8]' 
                : 'border-transparent text-[#5c6b88] hover:text-[#1a2744]'
            }`}
          >
            <span className="flex items-center gap-2">
              <History size={14} /> Log Audit Perubahan
            </span>
          </button>
        </div>

        <div className="flex gap-2 pb-1">
          {activeTab === 'config' ? (
            <>
              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="btn btn-back flex items-center gap-1.5 py-1.5 px-3 text-xs"
                title="Reset semua ke setelan awal"
              >
                <RotateCcw size={13} /> Reset ke Default
              </button>
              <button
                type="button"
                disabled={!isModified}
                onClick={() => setShowSaveModal(true)}
                className={`btn btn-primary flex items-center gap-1.5 py-1.5 px-3 text-xs ${
                  !isModified ? 'opacity-50 cursor-not-allowed shadow-none' : 'btn-primary-pulse'
                }`}
              >
                <Save size={13} /> Simpan Perubahan
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleExportCSV}
              className="btn btn-primary flex items-center gap-1.5 py-1.5 px-3 text-xs"
            >
              <Download size={13} /> Ekspor CSV
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Parameter Configurations */}
      {activeTab === 'config' && (
        <div className="grid grid-cols-2 gap-4 mt-2">
          {categories.map(cat => {
            const catParams = params.filter(p => p.category === cat.name)
            if (catParams.length === 0) return null

            return (
              <div className="card param-category-card" key={cat.name}>
                <div className={`card-accent ${cat.accentClass}`} />
                <div className="card-body p-4">
                  <div className="card-head mb-3">
                    <div className="card-head-left">
                      <span className={`card-icon ${cat.colorClass}`}>
                        {cat.icon}
                      </span>
                      <h4 className="card-title text-sm font-extrabold text-[#1a2744]">
                        {cat.name}
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {catParams.map(param => {
                      const modified = isParamModified(param.key)
                      const isComputed = false
                      const sliderProps = getSliderProps(param.key)
                      const currentValue = getParamValue(param.key)
                      
                      // Calculate deviation
                      let deviationText = null
                      if (param.type === 'number' && !isComputed) {
                        const numCurrent = Number(currentValue)
                        const numDefault = Number(param.defaultValue)
                        if (!isNaN(numCurrent) && !isNaN(numDefault)) {
                          const diff = numCurrent - numDefault
                          if (diff !== 0) {
                            const pct = Math.round((diff / numDefault) * 100)
                            const sign = diff > 0 ? '+' : ''
                            deviationText = `${sign}${diff.toLocaleString('id-ID')} (${sign}${pct}%)`
                          }
                        }
                      }
                      
                      return (
                        <div 
                          key={param.key} 
                          className={`p-4 rounded-xl border param-item-row ${
                            modified 
                              ? 'modified' 
                              : isComputed 
                                ? 'bg-slate-50/50 border-slate-200/80' 
                                : 'bg-white border-[#dde4ef]'
                          }`}
                        >
                          <div className="flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <div className="param-title-row">
                                  <span className={`param-title-bullet theme-bullet-${cat.colorClass}`} />
                                  <span className="param-label-text">{param.label}</span>
                                  <span className="param-key-tag">{param.key}</span>
                                  {modified && (
                                    <span className="text-[9px] font-extrabold text-amber-800 bg-amber-200 px-1.5 py-0.5 rounded-full border border-amber-300 shadow-sm">
                                      Modifikasi
                                    </span>
                                  )}
                                  {isComputed && (
                                    <span className="text-[9px] font-extrabold text-[#1565c0] bg-sky-50 px-1.5 py-0.5 rounded-full border border-sky-200" title="Dihitung otomatis berdasarkan Buffer Jalan + Margin GPS">
                                      Dihitung Otomatis
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-[#5c6b88] leading-relaxed mt-1.5 m-0">
                                  {param.description}
                                </p>
                              </div>

                              {/* Input control */}
                              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type={param.type === 'number' ? 'number' : 'text'}
                                    value={currentValue}
                                    disabled={isComputed}
                                    onChange={e => handleValueChange(param.key, e.target.value)}
                                    step={param.type === 'number' ? 'any' : undefined}
                                    className={`w-28 px-2.5 py-1.5 text-xs border rounded-lg font-extrabold text-right outline-none transition-all ${
                                      isComputed 
                                        ? 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed' 
                                        : modified 
                                          ? 'border-amber-400 bg-amber-50/20 text-[#1a2744] focus:ring-2 focus:ring-amber-300' 
                                          : 'border-[#border] bg-white text-[#1a2744] focus:border-[#1565d8] focus:ring-2 focus:ring-blue-100'
                                    }`}
                                  />
                                  {param.unit && (
                                    <span className="text-[10px] font-bold text-[#5c6b88] w-12 text-left flex-shrink-0">
                                      {param.unit}
                                    </span>
                                  )}
                                </div>
                                {modified && (
                                  <button
                                    type="button"
                                    onClick={() => handleValueChange(param.key, String(param.value))}
                                    className="text-[10px] text-amber-800 font-bold underline hover:text-amber-950 flex items-center gap-0.5 cursor-pointer mt-0.5 transition-colors"
                                  >
                                    Urungkan
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Range slider for numeric parameters */}
                            {param.type === 'number' && !isComputed && (
                              <div className="flex items-center gap-3 bg-slate-50/70 p-2 rounded-lg border border-slate-100/80">
                                <span className="text-[9px] text-[#5c6b88] font-bold min-w-8 text-right font-mono">{sliderProps.min}</span>
                                <input
                                  type="range"
                                  min={sliderProps.min}
                                  max={sliderProps.max}
                                  step={sliderProps.step}
                                  value={currentValue === '' ? sliderProps.min : Number(currentValue)}
                                  onChange={e => handleValueChange(param.key, e.target.value)}
                                  className={`custom-range-slider theme-${cat.colorClass} flex-1`}
                                />
                                <span className="text-[9px] text-[#5c6b88] font-bold min-w-8 text-left font-mono">{sliderProps.max}</span>
                                
                                {/* Deviation display */}
                                {deviationText && (
                                  <span className="text-[9px] font-extrabold text-amber-700 bg-amber-100/70 border border-amber-200/80 px-2 py-0.5 rounded ml-1 whitespace-nowrap">
                                    Selisih: {deviationText}
                                  </span>
                                )}
                              </div>
                            )}



                            {/* Technical Operational Impact tooltip info */}
                            <div className="flex items-start gap-1.5 pt-2 border-t border-[#e8ecf4] text-[10px] text-[#5c6b88]/95 bg-slate-50/30 p-2 rounded-lg">
                              <Info size={12} className="text-slate-400 mt-0.5 flex-shrink-0" />
                              <span><strong>Dampak Operasional:</strong> {param.impactText}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Tab 2: Change History Logs */}
      {activeTab === 'logs' && (
        <div className="table-panel">
          {/* Advanced filter header */}
          <div className="p-3 border-b border-[#dde4ef] bg-[#fafbfd] flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-2 items-center flex-1 min-w-0">
              {/* Search bar */}
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Cari parameter, admin, alasan..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 border border-[#dde4ef] rounded-md text-xs outline-none bg-white text-[#1a2744] focus:border-[#1565d8] focus:ring-1 focus:ring-[#1565d8]"
                />
                <Search size={13} className="absolute left-2.5 top-2.5 text-[#5c6b88]" />
              </div>

              {/* Category selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#5c6b88] font-bold"><Filter size={11} className="inline mr-1" /> Kategori:</span>
                <select
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                  className="px-2 py-1.5 border border-[#dde4ef] rounded-md text-xs bg-white text-[#1a2744] outline-none focus:border-[#1565d8]"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="Waktu & Sinkronisasi">Waktu & Sinkronisasi</option>
                  <option value="Deteksi Kejadian Diam">Deteksi Kejadian Diam</option>
                  <option value="Kecepatan & Pelanggaran">Kecepatan & Pelanggaran</option>
                  <option value="Koridor & Rute">Koridor & Rute</option>
                  <option value="Konfigurasi Sektor Blok">Konfigurasi Sektor Blok</option>
                  <option value="Batas Overtime Kegiatan">Batas Overtime Kegiatan</option>
                </select>
              </div>

              {/* Date selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#5c6b88] font-bold"><Calendar size={11} className="inline mr-1" /> Tanggal:</span>
                <input
                  type="date"
                  value={filterDate}
                  onChange={e => setFilterDate(e.target.value)}
                  className="px-2 py-1 border border-[#dde4ef] rounded-md text-xs bg-white text-[#1a2744] outline-none focus:border-[#1565d8]"
                />
                {filterDate && (
                  <button
                    onClick={() => setFilterDate('')}
                    className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                  >
                    Bersihkan
                  </button>
                )}
              </div>
            </div>

            <div className="text-[11px] font-bold text-[#5c6b88]">
              Menampilkan {filteredLogs.length} dari {logs.length} entri
            </div>
          </div>

          {/* Change log table */}
          <div className="table-scroll">
            {filteredLogs.length === 0 ? (
              <div className="loading-state py-8">Tidak ada riwayat log yang cocok dengan filter pencarian.</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="text-left" style={{ width: '130px' }}>Tanggal & Waktu</th>
                    <th className="text-left" style={{ width: '130px' }}>Administrator</th>
                    <th className="text-left" style={{ width: '180px' }}>Parameter</th>
                    <th className="text-left" style={{ width: '120px' }}>Kategori</th>
                    <th className="text-center" style={{ width: '120px' }}>Nilai Lama</th>
                    <th className="text-center" style={{ width: '120px' }}>Nilai Baru</th>
                    <th className="text-left">Alasan / Justifikasi Perubahan</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map(log => {
                    const isReset = log.reason.startsWith('[RESET PABRIK]')
                    return (
                      <tr key={log.id} className="log-row">
                        <td className="text-left">
                          {new Date(log.timestamp).toLocaleDateString('id-ID', {
                            day: '2-digit', month: 'short', year: 'numeric'
                          })}
                          <span className="block text-[10px] text-[#5c6b88] font-semibold mt-0.5">
                            {new Date(log.timestamp).toLocaleTimeString('id-ID', {
                              hour: '2-digit', minute: '2-digit', second: '2-digit'
                            })}
                          </span>
                        </td>
                        <td className="text-left font-bold text-slate-800">{log.adminName}</td>
                        <td className="text-left">
                          <span className="font-bold text-[#1a2744]">{log.parameterLabel}</span>
                          <span className="block text-[9px] font-mono text-[#5c6b88] mt-0.5">{log.parameterKey}</span>
                        </td>
                        <td className="text-left">
                          <span className="text-[10px] font-bold bg-[#e8ecf4] text-[#1a2744] px-2.5 py-1 rounded-full border border-[#dde4ef]">
                            {log.category}
                          </span>
                        </td>
                        <td className="text-center text-red-700 font-bold bg-red-50/30 rounded-l-md">{log.oldValue}</td>
                        <td className="text-center text-emerald-700 font-bold bg-emerald-50/30 rounded-r-md">
                          <div className="flex items-center justify-center gap-1.5">
                            <ArrowRight size={11} className="text-slate-400" />
                            <span>{log.newValue}</span>
                          </div>
                        </td>
                        <td className="text-left text-[#5c6b88] leading-relaxed font-medium">
                          <div className={`pl-2.5 border-l-2 italic text-xs py-0.5 bg-slate-50/50 rounded-r ${
                            isReset ? 'border-red-500' : 'border-blue-500'
                          }`}>
                            {log.reason}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Save Confirmation & Reason Prompt */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl border border-[#dde4ef] w-full max-w-lg overflow-hidden animate-zoom-in">
            <div className="bg-[#fafbfd] border-b border-[#dde4ef] p-4 flex items-center gap-2">
              <Shield className="text-[#1565d8]" size={20} />
              <h3 className="text-sm font-extrabold text-[#1a2744] m-0">Konfirmasi Penyimpanan Parameter</h3>
            </div>
            
            <div className="p-4">
              <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex gap-2.5">
                <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold m-0 mb-1">Aktivitas ini dilacak oleh Log Audit</p>
                  <p className="m-0 leading-relaxed text-[#5c6b88]">Sesuai regulasi sistem keamanan patroli SmartTrack, Anda wajib mengisi justifikasi perubahan parameter operasional sebelum menyimpan.</p>
                </div>
              </div>

              {/* Justification text input */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-[#1a2744] mb-1.5">
                  Justifikasi / Alasan Perubahan <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={changeReason}
                  onChange={e => setChangeReason(e.target.value)}
                  placeholder="Contoh: Menyesuaikan margin akurasi perangkat keras GPS tipe baru (ST-400) yang memiliki margin error 5 meter di area kebun lebat..."
                  className="w-full p-2.5 border border-[#dde4ef] rounded-md text-xs outline-none bg-white text-[#1a2744] focus:border-[#1565d8] focus:ring-1 focus:ring-[#1565d8] resize-none"
                />
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-[#dde4ef]">
                <button
                  type="button"
                  onClick={() => {
                    setShowSaveModal(false)
                    setChangeReason('')
                  }}
                  className="btn btn-back py-1.5 px-4 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={!changeReason.trim()}
                  onClick={handleConfirmSave}
                  className={`btn btn-primary py-1.5 px-4 text-xs font-semibold ${
                    !changeReason.trim() ? 'opacity-50 cursor-not-allowed shadow-none' : ''
                  }`}
                >
                  Konfirmasi & Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Reset to Defaults Prompt */}
      {showResetModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl border border-red-100 w-full max-w-lg overflow-hidden animate-zoom-in">
            <div className="bg-red-50 border-b border-red-100 p-4 flex items-center gap-2">
              <RotateCcw className="text-red-600" size={20} />
              <h3 className="text-sm font-extrabold text-red-950 m-0">Reset Parameter Ke Default Pabrik</h3>
            </div>
            
            <div className="p-4">
              <div className="mb-4 bg-red-50/50 border border-red-200 rounded-lg p-3 text-xs text-red-900 flex gap-2.5">
                <AlertTriangle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold m-0 mb-1">Peringatan: Tindakan Irreversibel</p>
                  <p className="m-0 leading-relaxed text-[#5c6b88]">Ini akan mengembalikan seluruh nilai parameter operasional ke setelan bawaan default pabrik secara instan. Tindakan ini juga akan dicatat di log audit.</p>
                </div>
              </div>

              {/* Justification text input */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-red-950 mb-1.5">
                  Justifikasi / Alasan Reset <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={changeReason}
                  onChange={e => setChangeReason(e.target.value)}
                  placeholder="Contoh: Mengembalikan pengaturan standar dikarenakan masa percobaan unit pemantauan baru telah selesai..."
                  className="w-full p-2.5 border border-red-200 rounded-md text-xs outline-none bg-white text-[#1a2744] focus:border-red-600 focus:ring-1 focus:ring-red-600 resize-none"
                />
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-red-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowResetModal(false)
                    setChangeReason('')
                  }}
                  className="btn btn-back py-1.5 px-4 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={!changeReason.trim()}
                  onClick={handleConfirmReset}
                  className={`btn btn-danger py-1.5 px-4 text-xs font-semibold ${
                    !changeReason.trim() ? 'opacity-50 cursor-not-allowed shadow-none' : ''
                  }`}
                >
                  Konfirmasi & Reset Semua
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  )
}
