import { ReactNode } from 'react'
import Topbar from './Topbar'

type PageShellProps = {
  title: string
  subtitle?: string
  icon?: ReactNode
  iconVariant?: 'default' | 'teal' | 'orange'
  topbarExtra?: ReactNode
  children: ReactNode
}

export default function PageShell({
  title,
  subtitle,
  icon,
  iconVariant,
  topbarExtra,
  children,
}: PageShellProps) {
  return (
    <div className="main">
      <Topbar title={title} subtitle={subtitle} icon={icon} iconVariant={iconVariant}>
        {topbarExtra}
      </Topbar>
      <div className="content-scroll">{children}</div>
    </div>
  )
}
