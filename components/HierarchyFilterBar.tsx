'use client'

import React, { useMemo, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { SRMD_HIERARCHY_DATA } from '@/lib/hierarchy-data'
import { Calendar, ChevronDown, Check, X } from 'lucide-react'

export interface HierarchyFilterState {
  psm: string
  region: string
  estate: string
  year?: string
  month?: string
  dateRange?: string
  unitType?: string
}

export type PeriodPreset = 'Bulan Ini' | 'Bulan Lalu' | '30 Hari Terakhir' | 'Rentang Kustom'

interface HierarchyFilterBarProps {
  filterState: HierarchyFilterState
  onChange: (newState: HierarchyFilterState) => void
  showUnitTypeFilter?: boolean
  useCompactPeriodDropdown?: boolean
  datePreset?: PeriodPreset
  customStartDate?: string
  customEndDate?: string
  onPeriodChange?: (preset: PeriodPreset, customStart?: string, customEnd?: string) => void
}

export function formatCustomDateRangeLabel(startDateStr?: string, endDateStr?: string): string {
  if (!startDateStr || !endDateStr) return 'Rentang Kustom'
  const start = new Date(startDateStr)
  const end = new Date(endDateStr)
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 'Rentang Kustom'

  const monthNamesIndo = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  const startDay = start.getDate()
  const startMonth = monthNamesIndo[start.getMonth()]
  const startYear = start.getFullYear()

  const endDay = end.getDate()
  const endMonth = monthNamesIndo[end.getMonth()]
  const endYear = end.getFullYear()

  if (startYear === endYear && startMonth === endMonth) {
    return `${startDay}–${endDay} ${startMonth} ${startYear}`
  } else if (startYear === endYear) {
    return `${startDay} ${startMonth}–${endDay} ${endMonth} ${startYear}`
  } else {
    return `${startDay} ${startMonth} ${startYear}–${endDay} ${endMonth} ${endYear}`
  }
}

export default function HierarchyFilterBar({
  filterState,
  onChange,
  showUnitTypeFilter = false,
  useCompactPeriodDropdown = false,
  datePreset = 'Bulan Ini',
  customStartDate = '2026-05-01',
  customEndDate = '2026-05-31',
  onPeriodChange
}: HierarchyFilterBarProps) {
  const [mounted, setMounted] = useState(false)
  const [isPeriodOpen, setIsPeriodOpen] = useState(false)
  const [showPopover, setShowPopover] = useState(false)
  const [tempStart, setTempStart] = useState(customStartDate)
  const [tempEnd, setTempEnd] = useState(customEndDate)
  const [buttonRect, setButtonRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setTempStart(customStartDate)
    setTempEnd(customEndDate)
  }, [customStartDate, customEndDate])

  // Update button bounds when opened
  const updateRect = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setButtonRect({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
      })
    }
  }

  const handleTogglePeriod = () => {
    updateRect()
    if (showPopover) {
      setShowPopover(false)
    } else {
      setIsPeriodOpen(!isPeriodOpen)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        dropdownRef.current && !dropdownRef.current.contains(target) &&
        buttonRef.current && !buttonRef.current.contains(target)
      ) {
        setIsPeriodOpen(false)
        setShowPopover(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPeriodOpen(false)
        setShowPopover(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Available PSMs
  const psmOptions = useMemo(() => {
    return SRMD_HIERARCHY_DATA.map(p => p.name)
  }, [])

  // Available Regions (cascading based on PSM)
  const regionOptions = useMemo(() => {
    if (filterState.psm === 'ALL' || !filterState.psm) {
      const allRegs = new Set<string>()
      SRMD_HIERARCHY_DATA.forEach(p => p.regions.forEach(r => allRegs.add(r.name)))
      return Array.from(allRegs)
    }
    const targetPsm = SRMD_HIERARCHY_DATA.find(p => p.name === filterState.psm)
    return targetPsm ? targetPsm.regions.map(r => r.name) : []
  }, [filterState.psm])

  // Available Estates (cascading based on PSM & Region)
  const estateOptions = useMemo(() => {
    const estatesSet = new Set<string>()

    SRMD_HIERARCHY_DATA.forEach(psm => {
      if (filterState.psm !== 'ALL' && filterState.psm && psm.name !== filterState.psm) return

      psm.regions.forEach(reg => {
        if (filterState.region !== 'ALL' && filterState.region && reg.name !== filterState.region) return

        reg.estates.forEach(e => estatesSet.add(e.id))
      })
    })

    return Array.from(estatesSet)
  }, [filterState.psm, filterState.region])

  // Handle PSM Change with cascade reset
  const handlePsmChange = (newPsm: string) => {
    let newRegion = filterState.region
    let newEstate = filterState.estate

    const validRegions = newPsm === 'ALL'
      ? new Set(SRMD_HIERARCHY_DATA.flatMap(p => p.regions.map(r => r.name)))
      : new Set(SRMD_HIERARCHY_DATA.find(p => p.name === newPsm)?.regions.map(r => r.name) || [])

    if (newRegion !== 'ALL' && !validRegions.has(newRegion)) {
      newRegion = 'ALL'
    }

    const validEstates = new Set<string>()
    SRMD_HIERARCHY_DATA.forEach(p => {
      if (newPsm !== 'ALL' && p.name !== newPsm) return
      p.regions.forEach(r => {
        if (newRegion !== 'ALL' && r.name !== newRegion) return
        r.estates.forEach(e => validEstates.add(e.id))
      })
    })

    if (newEstate !== 'ALL' && !validEstates.has(newEstate)) {
      newEstate = 'ALL'
    }

    onChange({
      ...filterState,
      psm: newPsm,
      region: newRegion,
      estate: newEstate
    })
  }

  // Handle Region Change with cascade reset
  const handleRegionChange = (newRegion: string) => {
    let newEstate = filterState.estate

    const validEstates = new Set<string>()
    SRMD_HIERARCHY_DATA.forEach(p => {
      if (filterState.psm !== 'ALL' && p.name !== filterState.psm) return
      p.regions.forEach(r => {
        if (newRegion !== 'ALL' && r.name !== newRegion) return
        r.estates.forEach(e => validEstates.add(e.id))
      })
    })

    if (newEstate !== 'ALL' && !validEstates.has(newEstate)) {
      newEstate = 'ALL'
    }

    onChange({
      ...filterState,
      region: newRegion,
      estate: newEstate
    })
  }

  const periodButtonLabel = useMemo(() => {
    if (datePreset === 'Rentang Kustom') {
      return formatCustomDateRangeLabel(customStartDate, customEndDate)
    }
    return datePreset
  }, [datePreset, customStartDate, customEndDate])

  const handleSelectPreset = (preset: PeriodPreset) => {
    if (preset === 'Rentang Kustom') {
      setShowPopover(true)
      setIsPeriodOpen(false)
    } else {
      setShowPopover(false)
      setIsPeriodOpen(false)
      if (onPeriodChange) {
        onPeriodChange(preset)
      }
    }
  }

  const handleApplyCustomDate = () => {
    if (onPeriodChange) {
      onPeriodChange('Rentang Kustom', tempStart, tempEnd)
    }
    setShowPopover(false)
  }

  return (
    <div className="filters flex items-center flex-wrap gap-2">
      {/* PSM Filter */}
      <select
        className="filter-select"
        aria-label="PSM"
        value={filterState.psm}
        onChange={(e) => handlePsmChange(e.target.value)}
      >
        <option value="ALL">Semua PSM</option>
        {psmOptions.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      {/* REGION Filter */}
      <select
        className="filter-select"
        aria-label="Region"
        value={filterState.region}
        onChange={(e) => handleRegionChange(e.target.value)}
      >
        <option value="ALL">Semua Region</option>
        {regionOptions.map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      {/* ESTATE Filter */}
      <select
        className="filter-select"
        aria-label="Estate"
        value={filterState.estate}
        onChange={(e) => onChange({ ...filterState, estate: e.target.value })}
      >
        <option value="ALL">ALL ESTATE</option>
        {estateOptions.map(e => (
          <option key={e} value={e}>{e}</option>
        ))}
      </select>

      {/* PERIOD FILTER: Compact Dropdown */}
      {useCompactPeriodDropdown && (
        <div className="relative inline-block text-left">
          <button
            ref={buttonRef}
            type="button"
            className="filter-select flex items-center justify-between gap-1.5 font-medium px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm shadow-sm"
            onClick={handleTogglePeriod}
            title={datePreset === 'Rentang Kustom' ? `Rentang: ${customStartDate} s/d ${customEndDate}` : periodButtonLabel}
          >
            <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{periodButtonLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* PORTAL OVERLAY FOR DROPDOWN & POPOVER (Renders above all stacking contexts) */}
          {mounted && (isPeriodOpen || showPopover) && buttonRect && createPortal(
            <div
              ref={dropdownRef}
              style={{
                position: 'absolute',
                top: `${buttonRect.top + 4}px`,
                left: `${buttonRect.left}px`,
                zIndex: 99999
              }}
            >
              {/* Preset Dropdown Options */}
              {isPeriodOpen && !showPopover && (
                <div className="w-52 rounded-md shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-1 text-sm">
                  {(['Bulan Ini', 'Bulan Lalu', '30 Hari Terakhir', 'Rentang Kustom'] as PeriodPreset[]).map(preset => (
                    <button
                      key={preset}
                      type="button"
                      className={`w-full text-left px-4 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        datePreset === preset ? 'font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20' : 'text-slate-700 dark:text-slate-300'
                      }`}
                      onClick={() => handleSelectPreset(preset)}
                    >
                      <span>{preset}</span>
                      {datePreset === preset && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    </button>
                  ))}
                </div>
              )}

              {/* Rentang Kustom Popover */}
              {showPopover && (
                <div className="w-72 rounded-lg shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-100 uppercase tracking-wider">Rentang Kustom</h4>
                    <button
                      type="button"
                      onClick={() => setShowPopover(false)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Tanggal Mulai</label>
                      <input
                        type="date"
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                        value={tempStart}
                        onChange={(e) => setTempStart(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Tanggal Akhir</label>
                      <input
                        type="date"
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                        value={tempEnd}
                        onChange={(e) => setTempEnd(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                      onClick={() => setShowPopover(false)}
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded shadow-sm"
                      onClick={handleApplyCustomDate}
                    >
                      Terapkan
                    </button>
                  </div>
                </div>
              )}
            </div>,
            document.body
          )}
        </div>
      )}

      {/* Optional Unit Type Filter for Utilization */}
      {showUnitTypeFilter && (
        <select
          className="filter-select"
          aria-label="Tipe Unit"
          value={filterState.unitType || 'ALL'}
          onChange={(e) => onChange({ ...filterState, unitType: e.target.value })}
        >
          <option value="ALL">Semua Unit</option>
          <option value="Car">Mobil Patroli</option>
          <option value="Motorcycle">Motor Patroli</option>
        </select>
      )}
    </div>
  )
}
