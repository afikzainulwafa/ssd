'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const [toggledSection, setToggledSection] = useState<string | null>(null)
  const [prevPathname, setPrevPathname] = useState(pathname)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [activeFlyout, setActiveFlyout] = useState<string | null>(null)
  const sidebarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('smarttrack_sidebar_collapsed')
      if (saved === 'true') {
        setIsCollapsed(true)
      }
    } catch {}
  }, [])

  // Close flyouts on path change
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setToggledSection(null)
    setActiveFlyout(null)
  }

  // Close flyout when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setActiveFlyout(null)
      }
    }
    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const defaultOpenSection = (pathname.startsWith('/srmd-monitoring') || pathname.startsWith('/profiling') || pathname.startsWith('/map-viewer') || pathname.startsWith('/reports') || pathname.startsWith('/utilization') || pathname.startsWith('/overview-patrol'))
    ? 'Dashboard'
    : ((pathname.startsWith('/review-patrol') || pathname.startsWith('/hasil-laporan-patroli'))
    ? 'Laporan'
    : (pathname.startsWith('/super-admin') ? 'Super Admin' : 'Dashboard'))

  const openSection = toggledSection !== null
    ? (toggledSection === 'none' ? null : toggledSection)
    : defaultOpenSection

  const toggleSection = (section: string) => {
    if (isCollapsed) {
      setActiveFlyout(prev => prev === section ? null : section)
    } else {
      setToggledSection(openSection === section ? 'none' : section)
    }
  }

  const toggleSidebarCollapse = () => {
    const next = !isCollapsed
    setIsCollapsed(next)
    setActiveFlyout(null)
    try {
      localStorage.setItem('smarttrack_sidebar_collapsed', String(next))
    } catch {}

    // Dispatch resize event so Leaflet map and other layout observers update seamlessly without remounting
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 260)
  }

  return (
    <aside ref={sidebarRef} className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} id="sidebar">
      <div className="sidebar-logo">
        <img
          src="/sinarmas-logo.png"
          alt="Sinarmas Agribusiness and Food"
          className="sidebar-logo-img"
          title="Sinarmas Agribusiness and Food"
        />
        <button
          type="button"
          onClick={toggleSidebarCollapse}
          className="sidebar-collapse-btn"
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
          title={isCollapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
        >
          {isCollapsed ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          )}
        </button>
      </div>

      <nav className="nav">

        {/* DASHBOARD GROUP */}
        <div
          className={`nav-group ${openSection === 'Dashboard' && !isCollapsed ? 'open' : ''}`}
          onMouseEnter={() => { if (isCollapsed) setActiveFlyout('Dashboard') }}
          onMouseLeave={() => { if (isCollapsed) setActiveFlyout(null) }}
        >
          <button
            className="nav-toggle"
            type="button"
            onClick={() => toggleSection('Dashboard')}
            title={isCollapsed ? 'Dashboard' : undefined}
            aria-expanded={openSection === 'Dashboard'}
          >
            <span className="nav-icon-wrap blue">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            </span>
            <span className="nav-text">Dashboard</span>
            <svg className="chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>

          {/* Regular Submenu */}
          {!isCollapsed && (
            <div className="nav-sub">
              <Link href="/srmd-monitoring/index.html" className={`nav-link ${pathname.startsWith('/srmd-monitoring') ? 'active' : ''}`}>
                <span className="sub-icon-wrap" style={{ color: '#1565c0' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span>
                SRMD Monitoring
              </Link>
              <Link href="/profiling/index.html" className={`nav-link ${pathname.startsWith('/profiling') ? 'active' : ''}`}>
                <span className="sub-icon-wrap"><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 20V10M12 20V4M6 20v-6"/></svg></span>
                Profiling
              </Link>
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
          )}

          {/* Collapsed Flyout Submenu */}
          {isCollapsed && activeFlyout === 'Dashboard' && (
            <div className="sidebar-flyout" style={{ top: '65px' }}>
              <div className="sidebar-flyout-title">Dashboard</div>
              <Link href="/srmd-monitoring/index.html" onClick={() => setActiveFlyout(null)} className={`nav-link ${pathname.startsWith('/srmd-monitoring') ? 'active' : ''}`}>
                <span className="sub-icon-wrap" style={{ color: '#1565c0' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span>
                SRMD Monitoring
              </Link>
              <Link href="/profiling/index.html" onClick={() => setActiveFlyout(null)} className={`nav-link ${pathname.startsWith('/profiling') ? 'active' : ''}`}>
                <span className="sub-icon-wrap"><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 20V10M12 20V4M6 20v-6"/></svg></span>
                Profiling
              </Link>
              <Link href="/reports" onClick={() => setActiveFlyout(null)} className={`nav-link ${pathname.startsWith('/reports') ? 'active' : ''}`}>
                <span className="sub-icon-wrap" style={{ color: '#1565d8' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>
                Analisis Patroli
              </Link>
              <Link href="/overview-patrol" onClick={() => setActiveFlyout(null)} className={`nav-link ${pathname.startsWith('/overview-patrol') ? 'active' : ''}`}>
                <span className="sub-icon-wrap" style={{ color: '#16a34a' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></span>
                Overview Patroli
              </Link>
              <Link href="/utilization" onClick={() => setActiveFlyout(null)} className={`nav-link ${pathname.startsWith('/utilization') ? 'active' : ''}`}>
                <span className="sub-icon-wrap" style={{ color: '#00838f' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
                Utilisasi Kendaraan & GPS
              </Link>
            </div>
          )}
        </div>

        {/* INPUT DATA GROUP */}
        <div
          className={`nav-group ${openSection === 'Input' && !isCollapsed ? 'open' : ''}`}
          onMouseEnter={() => { if (isCollapsed) setActiveFlyout('Input') }}
          onMouseLeave={() => { if (isCollapsed) setActiveFlyout(null) }}
        >
          <button
            className="nav-toggle"
            type="button"
            onClick={() => toggleSection('Input')}
            title={isCollapsed ? 'Input Data' : undefined}
            aria-expanded={openSection === 'Input'}
          >
            <span className="nav-icon-wrap green">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
            </span>
            <span className="nav-text">Input Data</span>
            <svg className="chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>

          {!isCollapsed && (
            <div className="nav-sub">
              <Link href="#" className="nav-link"><span className="sub-icon-wrap" style={{ color: '#7c4dff' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/></svg></span>Tag Rute</Link>
              <Link href="#" className="nav-link"><span className="sub-icon-wrap" style={{ color: '#00897b' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z"/></svg></span>Perangkat GPS & Kendaraan</Link>
              <Link href="#" className="nav-link"><span className="sub-icon-wrap" style={{ color: '#1565c0' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></span>Anggota Tim Patroli</Link>
              <Link href="#" className="nav-link"><span className="sub-icon-wrap" style={{ color: '#e53935' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg></span>Blok Rawan</Link>
              <Link href="#" className="nav-link"><span className="sub-icon-wrap" style={{ color: '#ef6c00' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></span>Rute Bank</Link>
              <Link href="#" className="nav-link"><span className="sub-icon-wrap" style={{ color: '#5e35b1' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>Jadwal</Link>
            </div>
          )}

          {isCollapsed && activeFlyout === 'Input' && (
            <div className="sidebar-flyout" style={{ top: '105px' }}>
              <div className="sidebar-flyout-title">Input Data</div>
              <Link href="#" onClick={() => setActiveFlyout(null)} className="nav-link"><span className="sub-icon-wrap" style={{ color: '#7c4dff' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/></svg></span>Tag Rute</Link>
              <Link href="#" onClick={() => setActiveFlyout(null)} className="nav-link"><span className="sub-icon-wrap" style={{ color: '#00897b' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z"/></svg></span>Perangkat GPS & Kendaraan</Link>
              <Link href="#" onClick={() => setActiveFlyout(null)} className="nav-link"><span className="sub-icon-wrap" style={{ color: '#1565c0' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></span>Anggota Tim Patroli</Link>
              <Link href="#" onClick={() => setActiveFlyout(null)} className="nav-link"><span className="sub-icon-wrap" style={{ color: '#e53935' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg></span>Blok Rawan</Link>
              <Link href="#" onClick={() => setActiveFlyout(null)} className="nav-link"><span className="sub-icon-wrap" style={{ color: '#ef6c00' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></span>Rute Bank</Link>
              <Link href="#" onClick={() => setActiveFlyout(null)} className="nav-link"><span className="sub-icon-wrap" style={{ color: '#5e35b1' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>Jadwal</Link>
            </div>
          )}
        </div>

        {/* LAPORAN GROUP */}
        <div
          className={`nav-group ${openSection === 'Laporan' && !isCollapsed ? 'open' : ''}`}
          onMouseEnter={() => { if (isCollapsed) setActiveFlyout('Laporan') }}
          onMouseLeave={() => { if (isCollapsed) setActiveFlyout(null) }}
        >
          <button
            className="nav-toggle"
            type="button"
            onClick={() => toggleSection('Laporan')}
            title={isCollapsed ? 'Laporan' : undefined}
            aria-expanded={openSection === 'Laporan'}
          >
            <span className="nav-icon-wrap orange">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
            </span>
            <span className="nav-text">Laporan</span>
            <svg className="chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>

          {!isCollapsed && (
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
          )}

          {isCollapsed && activeFlyout === 'Laporan' && (
            <div className="sidebar-flyout" style={{ top: '150px' }}>
              <div className="sidebar-flyout-title">Laporan</div>
              <Link href="/review-patrol" onClick={() => setActiveFlyout(null)} className={`nav-link ${pathname.startsWith('/review-patrol') ? 'active' : ''}`}>
                <span className="sub-icon-wrap" style={{ color: '#0097a7' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M9 15l2 2 4-4"/></svg></span>
                Tinjau Laporan Patroli
              </Link>
              <Link href="/hasil-laporan-patroli" onClick={() => setActiveFlyout(null)} className={`nav-link ${pathname.startsWith('/hasil-laporan-patroli') ? 'active' : ''}`}>
                <span className="sub-icon-wrap" style={{ color: '#43a047' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M9 15l2 2 4-4"/></svg></span>
                Hasil Laporan Patroli
              </Link>
            </div>
          )}
        </div>

        {/* SUPER ADMIN GROUP */}
        <div
          className={`nav-group ${openSection === 'Super Admin' && !isCollapsed ? 'open' : ''}`}
          onMouseEnter={() => { if (isCollapsed) setActiveFlyout('Super Admin') }}
          onMouseLeave={() => { if (isCollapsed) setActiveFlyout(null) }}
        >
          <button
            className="nav-toggle"
            type="button"
            onClick={() => toggleSection('Super Admin')}
            title={isCollapsed ? 'Super Admin' : undefined}
            aria-expanded={openSection === 'Super Admin'}
          >
            <span className="nav-icon-wrap red">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </span>
            <span className="nav-text">Super Admin</span>
            <svg className="chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>

          {!isCollapsed && (
            <div className="nav-sub">
              <Link href="/super-admin/thresholds" className={`nav-link ${pathname.startsWith('/super-admin/thresholds') ? 'active' : ''}`}>
                <span className="sub-icon-wrap" style={{ color: '#e53935' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></span>
                Ambang Batas & Parameter
              </Link>
            </div>
          )}

          {isCollapsed && activeFlyout === 'Super Admin' && (
            <div className="sidebar-flyout" style={{ top: '190px' }}>
              <div className="sidebar-flyout-title">Super Admin</div>
              <Link href="/super-admin/thresholds" onClick={() => setActiveFlyout(null)} className={`nav-link ${pathname.startsWith('/super-admin/thresholds') ? 'active' : ''}`}>
                <span className="sub-icon-wrap" style={{ color: '#e53935' }}><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></span>
                Ambang Batas & Parameter
              </Link>
            </div>
          )}
        </div>

      </nav>
    </aside>
  )
}

