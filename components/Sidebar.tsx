'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const [toggledSection, setToggledSection] = useState<string | null>(null)
  const [prevPathname, setPrevPathname] = useState(pathname)

  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setToggledSection(null)
  }

  const defaultOpenSection = (pathname.startsWith('/srmd-monitoring') || pathname.startsWith('/profiling') || pathname.startsWith('/map-viewer') || pathname.startsWith('/reports') || pathname.startsWith('/utilization'))
    ? 'Dashboard'
    : ((pathname.startsWith('/review-patrol') || pathname.startsWith('/hasil-laporan-patroli'))
    ? 'Laporan'
    : (pathname.startsWith('/super-admin') ? 'Super Admin' : 'Dashboard'))

  const openSection = toggledSection !== null
    ? (toggledSection === 'none' ? null : toggledSection)
    : defaultOpenSection

  const toggleSection = (section: string) => {
    setToggledSection(openSection === section ? 'none' : section)
  }

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-logo">
        <img src="/sinarmas-logo.png" alt="Sinarmas Agribusiness and Food" className="sidebar-logo-img" />
      </div>
      <nav className="nav">

        <div className={`nav-group ${openSection === 'Dashboard' ? 'open' : ''}`}>
          <button className="nav-toggle" type="button" onClick={() => toggleSection('Dashboard')}>
            <span className="nav-icon-wrap blue">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            </span>
            Dashboard
            <svg className="chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div className="nav-sub">
            <Link href="/srmd-monitoring/index.html" className={`nav-link ${pathname.startsWith('/srmd-monitoring') ? 'active' : ''}`}>
              <span className="sub-icon-wrap" style={{ color: '#1565c0' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span>
              SRMD Monitoring
            </Link>
            <Link href="/profiling/index.html" className={`nav-link ${pathname.startsWith('/profiling') ? 'active' : ''}`}>
              <span className="sub-icon-wrap"><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 20V10M12 20V4M6 20v-6"/></svg></span>
              Profiling
            </Link>
            {/* Hidden for now: Visualisasi Peta LPYE */}
            {/* <Link href="/map-viewer" className={`nav-link ${pathname.startsWith('/map-viewer') ? 'active' : ''}`}>
              <span className="sub-icon-wrap" style={{ color: '#ef6c00' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7l6-3 5.447 2.724A1 1 0 0121 7.618v10.764a1 1 0 01-1.447.894L15 17l-6 3z"/></svg></span>
              Visualisasi Peta LPYE
            </Link> */}
            <Link href="/reports" className={`nav-link ${pathname.startsWith('/reports') ? 'active' : ''}`}>
              <span className="sub-icon-wrap" style={{ color: '#1565d8' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>
              Analisis Patroli
            </Link>
            <Link href="/overview-patrol" className={`nav-link ${pathname.startsWith('/overview-patrol') ? 'active' : ''}`}>
              <span className="sub-icon-wrap" style={{ color: '#16a34a' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></span>
              Overview Patroli
            </Link>
            <Link href="/utilization" className={`nav-link ${pathname.startsWith('/utilization') ? 'active' : ''}`}>
              <span className="sub-icon-wrap" style={{ color: '#00838f' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
              Utilisasi Kendaraan & GPS
            </Link>
          </div>
        </div>

        <div className={`nav-group ${openSection === 'Input' ? 'open' : ''}`}>
          <button className="nav-toggle" type="button" onClick={() => toggleSection('Input')}>
            <span className="nav-icon-wrap green">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
            </span>
            Input Data
            <svg className="chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div className="nav-sub">
            <Link href="#" className="nav-link"><span className="sub-icon-wrap" style={{ color: '#7c4dff' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/></svg></span>Tag Rute</Link>
            <Link href="#" className="nav-link"><span className="sub-icon-wrap" style={{ color: '#00897b' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z"/></svg></span>Perangkat GPS & Kendaraan</Link>
            <Link href="#" className="nav-link"><span className="sub-icon-wrap" style={{ color: '#1565c0' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></span>Anggota Tim Patroli</Link>
            <Link href="#" className="nav-link"><span className="sub-icon-wrap" style={{ color: '#e53935' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg></span>Blok Rawan</Link>
            <Link href="#" className="nav-link"><span className="sub-icon-wrap" style={{ color: '#ef6c00' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></span>Rute Bank</Link>
            <Link href="#" className="nav-link"><span className="sub-icon-wrap" style={{ color: '#5e35b1' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>Jadwal</Link>
          </div>
        </div>

        <div className={`nav-group ${openSection === 'Laporan' ? 'open' : ''}`}>
          <button className="nav-toggle" type="button" onClick={() => toggleSection('Laporan')}>
            <span className="nav-icon-wrap orange">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
            </span>
            Laporan
            <svg className="chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div className="nav-sub">
            <Link href="/review-patrol" className={`nav-link ${pathname.startsWith('/review-patrol') ? 'active' : ''}`}>
              <span className="sub-icon-wrap" style={{ color: '#0097a7' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M9 15l2 2 4-4"/></svg></span>
              Tinjau Laporan Patroli
            </Link>
            <Link href="/hasil-laporan-patroli" className={`nav-link ${pathname.startsWith('/hasil-laporan-patroli') ? 'active' : ''}`}>
              <span className="sub-icon-wrap" style={{ color: '#43a047' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M9 15l2 2 4-4"/></svg></span>
              Hasil Laporan Patroli
            </Link>
          </div>
        </div>

        <div className={`nav-group ${openSection === 'Super Admin' ? 'open' : ''}`}>
          <button className="nav-toggle" type="button" onClick={() => toggleSection('Super Admin')}>
            <span className="nav-icon-wrap red">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </span>
            Super Admin
            <svg className="chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div className="nav-sub">
            <Link href="/super-admin/thresholds" className={`nav-link ${pathname.startsWith('/super-admin/thresholds') ? 'active' : ''}`}>
              <span className="sub-icon-wrap" style={{ color: '#e53935' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></span>
              Ambang Batas & Parameter
            </Link>
          </div>
        </div>

      </nav>
    </aside>
  )
}
