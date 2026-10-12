import type { Metadata } from 'next'
import './globals.css'
import 'leaflet/dist/leaflet.css'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'SmartTrack - Manajemen Patroli',
  description: 'Sistem pemantauan patroli keamanan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <div className="app-shell">
          <Sidebar />
          <div className="app-main">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}