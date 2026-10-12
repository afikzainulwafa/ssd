'use client'

import dynamic from 'next/dynamic'

// Dynamically import the Leaflet map viewer component with SSR disabled
const CustomMapViewer = dynamic(
  () => import('@/components/CustomMapViewer'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        minHeight: '450px',
        color: 'var(--text-muted)',
        background: 'var(--bg)',
        gap: '12px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid var(--primary-light)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s infinite linear'
        }} />
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}} />
        <span style={{ fontSize: '13px', fontWeight: 600 }}>Menyiapkan Modul Peta...</span>
      </div>
    )
  }
)

export default function MapViewerPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', overflow: 'hidden' }}>
      {/* Sleek dashboard top bar */}
      <header style={{
        height: 'var(--topbar-h, 56px)',
        minHeight: 'var(--topbar-h, 56px)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        justifyContent: 'space-between',
        zIndex: 5
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7l6-3 5.447 2.724A1 1 0 0121 7.618v10.764a1 1 0 01-1.447.894L15 17l-6 3z"/></svg>
          </span>
          <h1 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>
            Visualisasi Peta Blok (LPYE.json)
          </h1>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Lokasi: <b>Kebun LPYE</b>
        </div>
      </header>

      {/* Map component wrapper */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <CustomMapViewer />
      </div>
    </div>
  )
}
