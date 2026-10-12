'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { BlockCoverageMetricItem } from '@/lib/selectors'

let L: any = null
if (typeof window !== 'undefined') {
  L = require('leaflet')
}

export type MapMetricMode = 'Rata-rata' | 'Jumlah'
export type MapFilterType = 'Rawan' | 'Non-Rawan' | 'Semua'

interface CoverageBlockMapProps {
  estateId: string
  blocks: BlockCoverageMetricItem[]
  mapFilterType: MapFilterType
  mapMetricMode: MapMetricMode
  mapLegendFilter: string | null
  selectedBlockId: string | null
  searchQuery: string
  onSelectBlock: (blockId: string | null) => void
  onHoverBlock?: (block: BlockCoverageMetricItem | null) => void
}

function normCode(s: string): string {
  if (!s) return ''
  return s.toUpperCase().replace(/BLOK\s*/gi, '').replace(/[^A-Z0-9]/gi, '')
}

export function getBlockBucket(
  metricMode: MapMetricMode,
  block: BlockCoverageMetricItem
): string {
  if (metricMode === 'Rata-rata') {
    const val = block.avgPerDay
    if (val === 0) return '0'
    if (val > 0 && val < 1) return '>0–<1'
    if (val >= 1 && val <= 2) return '1–2'
    return '>2'
  } else {
    const val = block.validCoverageCount
    if (val === 0) return '0×'
    if (val === 1) return '1×'
    if (val === 2) return '2×'
    return '>2×'
  }
}

export default function CoverageBlockMap({
  estateId,
  blocks,
  mapFilterType,
  mapMetricMode,
  mapLegendFilter,
  selectedBlockId,
  searchQuery,
  onSelectBlock,
  onHoverBlock
}: CoverageBlockMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const geoJsonLayerRef = useRef<any>(null)
  const lastFittedEstateRef = useRef<string | null>(null)

  const [loading, setLoading] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)
  const [geoData, setGeoData] = useState<any | null>(null)
  const [currentZoom, setCurrentZoom] = useState<number>(14)

  // Block map lookup
  const blockMap = useMemo(() => {
    const map = new Map<string, BlockCoverageMetricItem>()
    blocks.forEach(b => {
      map.set(b.blockId, b)
      map.set(normCode(b.blockCode), b)
      map.set(`${b.estateId}_${normCode(b.blockCode)}`, b)
    })
    return map
  }, [blocks])

  // 1. Fetch GeoJSON for estate
  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setMapError(null)

    const targetEstate = (estateId && estateId !== 'ALL') ? estateId : 'KULE'

    fetch(`/api/map-data?estate=${targetEstate}`)
      .then(res => res.json())
      .then(json => {
        if (!isMounted) return
        if (json.success && json.data) {
          setGeoData(json.data)
          setMapError(null)
        } else {
          setGeoData(null)
          setMapError(json.error || `Peta GeoJSON tidak tersedia untuk estate ${targetEstate}`)
        }
        setLoading(false)
      })
      .catch(err => {
        if (!isMounted) return
        console.error(err)
        setGeoData(null)
        setMapError(`Gagal memuat peta untuk estate ${targetEstate}`)
        setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [estateId])

  // 2. Initialize Leaflet Map
  useEffect(() => {
    if (!L) return
    const container = mapContainerRef.current
    if (!container || mapInstanceRef.current) return

    const map = L.map(container, {
      zoomControl: true,
      minZoom: 2,
      maxZoom: 18,
    })
    mapInstanceRef.current = map

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { attribution: 'Esri, Maxar, Earthstar Geographics' }
    ).addTo(map)

    map.on('zoomend', () => {
      setCurrentZoom(map.getZoom())
    })

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Explicit Reset View Handler
  const handleResetView = () => {
    const map = mapInstanceRef.current
    const layer = geoJsonLayerRef.current
    if (map && layer) {
      try {
        const bounds = layer.getBounds()
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [20, 20], maxZoom: 16 })
        }
      } catch (e) {
        console.warn('Could not reset view bounds:', e)
      }
    }
  }

  // 3. Render / Update GeoJSON Layer (Without resetting zoom on interactions)
  useEffect(() => {
    if (!L) return
    const map = mapInstanceRef.current
    if (!map) return

    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current)
      geoJsonLayerRef.current = null
    }

    if (!geoData || !geoData.features) return

    const searchNorm = searchQuery.trim().toUpperCase()
    const targetEstate = (estateId && estateId !== 'ALL') ? estateId : 'KULE'

    const layer = L.geoJSON(geoData, {
      filter: (feature: any) => {
        const props = feature.properties || {}
        const rawBlok = props.blok || props.nama_bl || props.blockCode || ''
        const nCode = normCode(rawBlok)
        const estCode = (props.estate || targetEstate).toUpperCase()

        const matchedBlock = blockMap.get(`${estCode}_${nCode}`) || blockMap.get(nCode)

        if (matchedBlock) {
          if (mapFilterType === 'Rawan' && !matchedBlock.isRawan) return false
          if (mapFilterType === 'Non-Rawan' && matchedBlock.isRawan) return false
        } else {
          if (mapFilterType !== 'Semua') return false
        }

        if (searchNorm) {
          if (!rawBlok.toUpperCase().includes(searchNorm) && (!matchedBlock || !matchedBlock.blockCode.toUpperCase().includes(searchNorm))) {
            return false
          }
        }

        return true
      },
      style: (feature: any) => {
        if (!feature) return {}
        const props = feature.properties || {}
        const rawBlok = props.blok || props.nama_bl || ''
        const nCode = normCode(rawBlok)
        const estCode = (props.estate || targetEstate).toUpperCase()

        const matchedBlock = blockMap.get(`${estCode}_${nCode}`) || blockMap.get(nCode)

        if (!matchedBlock) {
          return {
            fillColor: '#64748b',
            fillOpacity: 0.25,
            color: '#475569',
            weight: 1
          }
        }

        // Polygon Fill Colors: Rawan = Coral/Red (#ef4444), Non-Rawan = Blue (#3b82f6)
        const fillColor = matchedBlock.isRawan ? '#ef4444' : '#3b82f6'
        const isSelected = matchedBlock.blockId === selectedBlockId
        const bucket = getBlockBucket(mapMetricMode, matchedBlock)
        const matchesLegend = !mapLegendFilter || bucket === mapLegendFilter

        const strokeColor = isSelected ? '#f59e0b' : (matchedBlock.isRawan ? '#dc2626' : '#1d4ed8')
        const strokeWidth = isSelected ? 4 : (matchedBlock.isRawan ? 2 : 1.2)
        const strokeDashArray = (matchedBlock.isRawan && !isSelected) ? '4 3' : undefined

        return {
          fillColor,
          fillOpacity: matchesLegend ? (isSelected ? 0.85 : 0.55) : 0.1,
          color: strokeColor,
          weight: strokeWidth,
          dashArray: strokeDashArray,
          opacity: matchesLegend ? 1 : 0.15
        }
      },
      onEachFeature: (feature: any, layerObj: any) => {
        const props = feature.properties || {}
        const rawBlok = props.blok || props.nama_bl || 'Blok'
        const nCode = normCode(rawBlok)
        const estCode = (props.estate || targetEstate).toUpperCase()

        const matchedBlock = blockMap.get(`${estCode}_${nCode}`) || blockMap.get(nCode)

        const isRawan = matchedBlock ? matchedBlock.isRawan : false
        const displayCode = matchedBlock ? matchedBlock.blockCode.replace(/Blok\s*/i, '') : rawBlok

        // Value text formatting
        let valText = '0×'
        if (matchedBlock) {
          if (mapMetricMode === 'Rata-rata') {
            const avg = matchedBlock.avgPerDay
            if (avg > 0 && avg < 0.01) {
              valText = '<0,01×/hari'
            } else {
              valText = `${avg.toFixed(2).replace('.', ',').replace(/,00$/, '').replace(/(,\d)0$/, '$1')}×/hari`
            }
          } else {
            valText = `${matchedBlock.validCoverageCount}×`
          }
        }

        // Plain Polygon Label directly inside polygon (No dark background box, no border, no shadow card)
        const showLabel = currentZoom >= 12
        if (showLabel) {
          const plainLabelHtml = `
            <div style="
              color: #ffffff;
              font-size: 11px;
              font-weight: 800;
              line-height: 1.15;
              text-align: center;
              text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 4px #000;
              pointer-events: none;
              white-space: nowrap;
            ">
              <div>${displayCode}</div>
              <div style="color: #fef08a; font-size: 10px;">${valText}</div>
            </div>
          `

          layerObj.bindTooltip(plainLabelHtml, {
            permanent: true,
            direction: 'center',
            className: 'custom-polygon-label'
          })
        }

        // Hover Popup for detailed block info
        const hoverTooltipContent = `
          <div style="font-family:sans-serif;padding:6px;font-size:12px;line-height:1.4;color:#0f172a;">
            <div style="font-weight:800;font-size:13px;color:#0f172a;border-bottom:1px solid #cbd5e1;padding-bottom:3px;margin-bottom:4px;">
              ${matchedBlock ? matchedBlock.blockCode : rawBlok} (${matchedBlock ? matchedBlock.estateName : estCode})
            </div>
            <div>Klasifikasi: <strong style="color:${isRawan ? '#dc2626' : '#2563eb'};">${isRawan ? '🔴 Area Rawan' : '🔵 Area Non-Rawan'}</strong></div>
            <div>Jumlah Coverage: <strong>${matchedBlock ? matchedBlock.validCoverageCount : 0}×</strong></div>
            <div>Rata-rata / Hari: <strong>${matchedBlock ? matchedBlock.avgPerDay.toString().replace('.', ',') : '0'}×/hari</strong></div>
            <div>Hari Tercakup: <strong>${matchedBlock ? matchedBlock.distinctDaysCount : 0} dari ${matchedBlock ? matchedBlock.totalReportingDays : 31} hari (${matchedBlock ? matchedBlock.hariTercakupPct.toString().replace('.', ',') : '0'}%)</strong></div>
          </div>
        `

        layerObj.on({
          mouseover: () => {
            if (onHoverBlock && matchedBlock) onHoverBlock(matchedBlock)
            layerObj.bindPopup(hoverTooltipContent, { offset: [0, -10], closeButton: false }).openPopup()
          },
          mouseout: () => {
            if (onHoverBlock) onHoverBlock(null)
            layerObj.closePopup()
          },
          click: () => {
            if (matchedBlock) {
              onSelectBlock(matchedBlock.blockId === selectedBlockId ? null : matchedBlock.blockId)
            }
          }
        })
      }
    }).addTo(map)

    geoJsonLayerRef.current = layer

    // Fit bounds ONLY on initial load or when changing estate scope (Prevents viewport reset loop!)
    if (lastFittedEstateRef.current !== targetEstate) {
      try {
        const bounds = layer.getBounds()
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [20, 20], maxZoom: 16 })
          lastFittedEstateRef.current = targetEstate
        }
      } catch (e) {
        console.warn('Could not fit bounds:', e)
      }
    }

    // Refresh map size to ensure container is fully sized without blank clipping
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize()
      }
    }, 100)
  }, [geoData, mapFilterType, mapMetricMode, mapLegendFilter, selectedBlockId, searchQuery, estateId, blockMap, onSelectBlock, onHoverBlock, currentZoom])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '520px', background: '#0f172a', borderRadius: '8px', overflow: 'hidden' }}>
      <style>{`
        .leaflet-tooltip.custom-polygon-label {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .leaflet-tooltip.custom-polygon-label::before {
          display: none !important;
        }
      `}</style>

      {/* Floating Control: Reset View Button */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        zIndex: 900
      }}>
        <button
          type="button"
          onClick={handleResetView}
          title="Reset tampilan peta ke cakupan estate"
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '0.4rem 0.75rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#1e293b',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          🎯 Reset View
        </button>
      </div>
      
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', minHeight: '520px' }} />

      {loading && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15,23,42,0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: '0.875rem',
          fontWeight: 600,
          zIndex: 1000
        }}>
          🔄 Memuat data peta {estateId}...
        </div>
      )}

      {mapError && !loading && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '80px',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#991b1b',
          padding: '0.65rem 0.85rem',
          borderRadius: '6px',
          fontSize: '0.8rem',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>⚠️ {mapError}</span>
          <span style={{ fontSize: '0.725rem', color: '#b91c1c', fontWeight: 600 }}>Data analitis tetap dihitung lengkap dari laporan.</span>
        </div>
      )}
    </div>
  )
}
