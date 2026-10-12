'use client'
import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type TopbarProps = {
  title: string
  subtitle?: string
  icon?: ReactNode
  iconVariant?: 'default' | 'teal' | 'orange'
  children?: ReactNode
}

export default function Topbar({ title, subtitle, icon, iconVariant = 'default', children }: TopbarProps) {
  const pathname = usePathname()
  const iconClass = iconVariant === 'default' ? 'page-icon' : `page-icon ${iconVariant}`

  const [roleInfo, setRoleInfo] = useState({
    roleBadge: 'Admin',
    avatarText: 'KL',
    welcomeText: 'Selamat datang, Estate B'
  })

  useEffect(() => {
    const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '')
    let badge = 'Admin'
    let avatar = 'KL'
    let welcome = 'Selamat datang, Estate B'

    if (currentPath?.startsWith('/hasil-laporan-patroli')) {
      badge = 'EM'
      avatar = 'EM'
      welcome = 'Selamat datang, EM Estate B'
      
      const params = new URLSearchParams(window.location.search)
      const roleParam = params.get('role')
      if (roleParam === 'rc') {
        badge = 'RC'
        avatar = 'RC'
        welcome = 'Selamat datang, RC Security'
      } else if (roleParam === 'srmd') {
        badge = 'SRMD'
        avatar = 'SR'
        welcome = 'Selamat datang, SRMD Security'
      }
    } else if (currentPath?.startsWith('/review-patrol')) {
      badge = 'PIC'
      avatar = 'PK'
      welcome = 'Selamat datang, PIC Estate B'
    }

    setRoleInfo({
      roleBadge: badge,
      avatarText: avatar,
      welcomeText: welcome
    })
  }, [pathname])

  return (
    <header className="topbar">
      <div className="page-title-wrap">
        {icon && <div className={iconClass}>{icon}</div>}
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-sub">{subtitle}</p>}
        </div>
      </div>
      {children}
      <div className="topbar-right">
        <span className="admin-badge">{roleInfo.roleBadge}</span>
        <div className="user-pill">
          <div className="user-avatar">{roleInfo.avatarText}</div>
          {roleInfo.welcomeText}
        </div>
      </div>
    </header>
  )
}

