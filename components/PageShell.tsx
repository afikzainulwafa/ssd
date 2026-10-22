import { ReactNode } from 'react'
import Topbar from './Topbar'

type PageShellProps = {
  title: string
  subtitle?: string
  icon?: ReactNode
  iconVariant?: 'default' | 'teal' | 'orange'
  topbarExtra?: ReactNode
  children: ReactNode
  fullBleed?: boolean
}

export default function PageShell({
  title,
  subtitle,
  icon,
  iconVariant,
  topbarExtra,
  children,
  fullBleed = false,
}: PageShellProps) {
  return (
    <div className="main">
      <Topbar title={title} subtitle={subtitle} icon={icon} iconVariant={iconVariant}>
        {topbarExtra}
      </Topbar>
      <div
        className={`content-scroll ${fullBleed ? 'full-bleed' : ''}`}
        style={fullBleed ? { padding: 0, overflow: 'hidden', height: 'calc(100vh - var(--topbar-h, 56px))', gap: 0 } : undefined}
      >
        {children}
      </div>
    </div>
  )
}
