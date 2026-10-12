import { PatrolReport } from '@/lib/supabase'
import { Car, Bike, CheckCircle, XCircle, FileText, Radio } from 'lucide-react'

type PatrolOverviewStatsProps = {
  reports: PatrolReport[]
  anchorLabel: string
  anchorSub?: string
  gpsRusakCount?: number
  vehicleRusakCount?: number
}

export default function PatrolOverviewStats({
  reports,
  anchorLabel,
  anchorSub,
  gpsRusakCount,
  vehicleRusakCount,
}: PatrolOverviewStatsProps) {
  const total = reports.length
  const totalMobil = reports.filter((r) => r.type === 'Car').length
  const totalMotor = reports.filter((r) => r.type === 'Motorcycle').length
  const notAvailable = reports.filter((r) => !r.tracking_available).length
  const available = total - notAvailable

  return (
    <div className="stat-row stat-row-3">
      <div className="stat-card red stat-card-compact">
        <span className="stat-icon stat-icon-sm"><FileText size={18} /></span>
        <div className="stat-text">
          <span className="stat-label">{anchorLabel}</span>
          {anchorSub && <span className="stat-sub">{anchorSub}</span>}
        </div>
        <div className="stat-metrics-row">
          <div className="stat-metric-inline good" style={{ color: '#c62828' }}>
            <span className="split-icon split-icon-sm" style={{ background: '#ffebee', color: '#c62828', border: '1px solid #ef9a9a' }}><FileText size={13} /></span>
            <span className="stat-split-value" style={{ color: '#c62828' }}>{total}</span>
            <span className="stat-split-label">Total</span>
          </div>
        </div>
      </div>

      <div className="stat-card blue stat-card-compact">
        <span className="stat-icon stat-icon-sm"><Radio size={18} /></span>
        <div className="stat-text">
          <span className="stat-label">Pelacakan</span>
          <span className="stat-sub">dari {total} laporan</span>
        </div>
        <div className="stat-metrics-row">
          <div className="stat-metric-inline good">
            <span className="split-icon split-icon-sm"><CheckCircle size={13} /></span>
            <span className="stat-split-value">{available}</span>
            <span className="stat-split-label">Tersedia</span>
          </div>
          {gpsRusakCount !== undefined || vehicleRusakCount !== undefined ? (
            <>
              <span className="stat-metric-sep" aria-hidden />
              <div className="stat-metric-inline bad">
                <span className="split-icon split-icon-sm"><Radio size={13} style={{ color: '#c62828' }} /></span>
                <span className="stat-split-value">{gpsRusakCount || 0}</span>
                <span className="stat-split-label">GPS Rusak</span>
              </div>
              <span className="stat-metric-sep" aria-hidden />
              <div className="stat-metric-inline bad">
                <span className="split-icon split-icon-sm"><XCircle size={13} style={{ color: '#c62828' }} /></span>
                <span className="stat-split-value">{vehicleRusakCount || 0}</span>
                <span className="stat-split-label">Unit Rusak</span>
              </div>
            </>
          ) : (
            <>
              <span className="stat-metric-sep" aria-hidden />
              <div className="stat-metric-inline bad">
                <span className="split-icon split-icon-sm"><XCircle size={13} /></span>
                <span className="stat-split-value">{notAvailable}</span>
                <span className="stat-split-label">Tidak Tersedia</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="stat-card purple stat-card-compact">
        <span className="stat-icon stat-icon-sm"><Car size={18} /></span>
        <div className="stat-text">
          <span className="stat-label">Tipe Kendaraan</span>
          <span className="stat-sub">dari {total} laporan</span>
        </div>
        <div className="stat-metrics-row">
          <div className="stat-metric-inline mobil">
            <span className="split-icon split-icon-sm"><Car size={13} /></span>
            <span className="stat-split-value">{totalMobil}</span>
            <span className="stat-split-label">Mobil</span>
          </div>
          <span className="stat-metric-sep" aria-hidden />
          <div className="stat-metric-inline motor">
            <span className="split-icon split-icon-sm"><Bike size={13} /></span>
            <span className="stat-split-value">{totalMotor}</span>
            <span className="stat-split-label">Motor</span>
          </div>
        </div>
      </div>
    </div>
  )
}
