'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase, PatrolReport } from '@/lib/supabase'
import PageShell from '@/components/PageShell'
import VehicleTypeBadge from '@/components/VehicleTypeBadge'
import { formatVehicleType } from '@/lib/format-vehicle'
import {
  ArrowLeft, Bike, MapPin, Calendar, FileText, Radio,
  Send, CheckCircle, AlertTriangle, Trees,
} from 'lucide-react'

const ESTATE_NAME = 'KULE'

export default function LaporanKendalaPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [report, setReport] = useState<PatrolReport | null>(null)
  const [issueType, setIssueType] = useState<'vehicle' | 'gps'>('vehicle')
  const [vehicleStatus, setVehicleStatus] = useState('Pelaporan Kerusakan')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (id === 'mock-pending-3') {
      setReport({
        id: 'mock-pending-3',
        date: '2026-02-15',
        estate: 'KULE',
        type: 'Car',
        nopol: 'BK 1212 CC',
        tracking_available: true,
        created_at: new Date().toISOString()
      })
      setLoading(false)
    } else if (id === 'mock-pending-4') {
      setReport({
        id: 'mock-pending-4',
        date: '2026-02-15',
        estate: 'KULE',
        type: 'Motorcycle',
        nopol: 'BK 5656 DD',
        tracking_available: true,
        created_at: new Date().toISOString()
      })
      setLoading(false)
    } else if (id === 'mock-pending-5') {
      setReport({
        id: 'mock-pending-5',
        date: '2026-02-16',
        estate: 'KULE',
        type: 'Car',
        nopol: 'BK 8989 EE',
        tracking_available: false,
        created_at: new Date().toISOString()
      })
      setLoading(false)
    } else {
      supabase.from('patrol_reports').select('*').eq('id', id).single()
        .then(({ data }) => {
          if (data) setReport(data)
          setLoading(false)
        })
    }
  }, [id])

  const handleSubmit = async () => {
    if (!description.trim()) {
      alert('Mohon isi keterangan kerusakan!')
      return
    }
    setSubmitting(true)
    const finalDescription = issueType === 'vehicle'
      ? JSON.stringify({ status: vehicleStatus, text: description })
      : description

    const { error } = await supabase.from('patrol_issues').insert({
      report_id: id,
      issue_type: issueType,
      description: finalDescription,
      submitted_at: new Date().toISOString(),
    })
    if (!error) {
      setSuccess(true)
      setTimeout(() => router.push('/review-patrol'), 1500)
    }
    setSubmitting(false)
  }

  if (loading) return <div className="loading-state">Memuat...</div>
  if (!report) return <div className="loading-state error">Laporan tidak ditemukan</div>

  return (
    <PageShell
      title="Tinjau Hasil Patroli"
      subtitle="Laporan Kendala · Form Kerusakan"
      iconVariant="orange"
      icon={<AlertTriangle size={18} />}
    >
      <div className="page-panel">
        <div className="page-toolbar">
          <div className="page-toolbar-left">
            <button type="button" onClick={() => router.push('/review-patrol')} className="btn btn-back">
              <ArrowLeft size={14} /> Kembali
            </button>
            <div>
              <h2 className="card-title">Laporan Kendala</h2>
              <p className="page-sub">Form laporan kerusakan unit patroli atau alat GPS</p>
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
                  {new Date(report.date).toLocaleDateString('id-ID', {
                    day: '2-digit', month: 'short', year: 'numeric',
                  })}
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

        <div className="card">
          <div className="card-accent orange" />
          <div className="card-body">
            <div className="card-title-row">
              <span className="card-title-icon" style={{ color: '#e65100', background: '#fff3e0', borderColor: '#ffcc80' }}>
                <FileText size={15} />
              </span>
              <h3 className="card-title-text">Detail Kerusakan</h3>
            </div>

            <label className="form-label">Jenis Kerusakan</label>
            <div className="grid-2" style={{ marginBottom: 16 }}>
              <button
                type="button"
                onClick={() => setIssueType('vehicle')}
                className={`radio-card ${issueType === 'vehicle' ? 'active' : ''}`}
              >
                <span className="radio-dot">
                  {issueType === 'vehicle' && <span className="radio-dot-inner" />}
                </span>
                <span className="radio-label">
                  <Bike size={16} /> Motor Patroli / Unit Rusak
                </span>
              </button>
              <button
                type="button"
                onClick={() => setIssueType('gps')}
                className={`radio-card ${issueType === 'gps' ? 'active' : ''}`}
              >
                <span className="radio-dot">
                  {issueType === 'gps' && <span className="radio-dot-inner" />}
                </span>
                <span className="radio-label">
                  <Radio size={16} /> Alat GPS / WiFi Rusak
                </span>
              </button>
            </div>

            {issueType === 'vehicle' && (
              <div style={{ marginBottom: 16 }}>
                <label className="form-label">Status Unit Rusak</label>
                <select
                  value={vehicleStatus}
                  onChange={(e) => setVehicleStatus(e.target.value)}
                  className="form-select"
                  style={{
                    width: '200px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'white',
                    color: 'var(--text-dark)',
                    fontSize: '13px',
                    fontWeight: 600,
                    outline: 'none',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <option value="Pelaporan Kerusakan">Pelaporan Kerusakan</option>
                  <option value="Pemeriksaan Bengkel">Pemeriksaan Bengkel</option>
                  <option value="Perbaikan Internal">Perbaikan Internal</option>
                  <option value="Perbaikan External">Perbaikan External</option>
                </select>
              </div>
            )}

            <label className="form-label">Keterangan</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tuliskan keterangan kerusakan secara detail..."
              className="form-textarea"
              style={{ marginBottom: 16 }}
            />

            {success && (
              <div className="alert-success" style={{ marginBottom: 12 }}>
                <CheckCircle size={16} /> Laporan berhasil dikirim! Kembali ke halaman utama...
              </div>
            )}

            <div className="btn-group" style={{ justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => router.push('/review-patrol')} className="btn btn-back">
                Batal
              </button>
              <button type="button" onClick={handleSubmit} disabled={submitting} className="btn btn-primary">
                <Send size={14} /> {submitting ? 'Mengirim...' : 'Kirim Laporan'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
