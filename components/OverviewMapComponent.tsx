'use client'

import React, { useEffect, useRef, useState } from 'react'

let L: any = null
if (typeof window !== 'undefined') {
  L = require('leaflet')
}

export interface OverviewTrackPoint {
  time: string
  lat: number
  lng: number
  speed: number
}

export interface OverviewTrackVehicle {
  vehicleId: string
  nopol: string
  demoName: string // 'Mobil 1', 'Mobil 2', 'Motor 1'
  vehicleType: 'Car' | 'Motorcycle'
  color: string
  status: 'Normal' | 'Urgent' | 'GPS Rusak' | 'Unit Rusak'
  isVisible: boolean
  sourceDateLabel: string // e.g. 'Geometri 2 Sep 2026'
  segments: OverviewTrackPoint[][] // Cleaned polylines split across gaps
  allPoints: OverviewTrackPoint[]
  movingTimeFormatted: string
  stoppedTimeFormatted: string
  actualKmFormatted: string
  baselineCoverageFormatted: string
  speedingCount: number
  stopCount: number
  outRouteCount: number
  repairNote?: string
  gpsNote?: string
}

export interface TheftIncidentItem {
  id: string
  title: string
  time: string
  lat: number
  lng: number
  locationLabel: string
  summary: string
  followUp: string
}

export interface SpeedingEventItem {
  id: string
  vehicleId: string
  nopol: string
  eventNo: string
  startTime: string
  durationMins: number
  distanceKm: number
  maxSpeedKmH: number
  points: [number, number][]
  comment: string
}

export interface StopEventItem {
  id: string
  vehicleId: string
  nopol: string
  eventNo: string
  startTime: string
  endTime: string
  durationMins: number
  lat: number
  lng: number
  locationLabel: string
  comment: string
}

export interface OutRouteEventItem {
  id: string
  vehicleId: string
  nopol: string
  eventNo: string
  startTime: string
  durationMins: number
  distanceKm: number
  color: string
  points: [number, number][]
  reason: string
}

export interface BlockCoverageDetail {
  blockCode: string
  estateId: string
  isRawan: boolean
  totalFrequency: number
  vehicleContributions: Array<{ demoName: string; nopol: string; frequency: number; lastTime: string }>
}

interface OverviewMapComponentProps {
  estateId: string
  mapMode: 'status' | 'frequency' // 'Status Blok' | 'Frekuensi'
  blockCategoryFilter: 'Semua' | 'Rawan' | 'Non-Rawan'
  vehicles: OverviewTrackVehicle[]
  incidents: TheftIncidentItem[]
  speedingEvents: SpeedingEventItem[]
  stopEvents: StopEventItem[]
  outRouteEvents: OutRouteEventItem[]
  selectedVehicleId: string | null
  selectedBlockCode: string | null
  playbackRatio: number // 0.0 to 1.0
  showTracking: boolean
  showBaseline: boolean
  showBlocks: boolean
  showIncidents: boolean
  showSpeeding: boolean
  showStops: boolean
  showOutRoute: boolean
  onSelectVehicle: (vehicleId: string | null) => void
  onSelectBlock: (block: BlockCoverageDetail | null) => void
  onPausePlayback?: () => void
}

export default function OverviewMapComponent({
  estateId,
  mapMode,
  blockCategoryFilter,
  vehicles,
  incidents,
  speedingEvents,
  stopEvents,
  outRouteEvents,
  selectedVehicleId,
  selectedBlockCode,
  playbackRatio,
  showTracking,
  showBaseline,
  showBlocks,
  showIncidents,
  showSpeeding,
  showStops,
  showOutRoute,
  onSelectVehicle,
  onSelectBlock,
  onPausePlayback
}: OverviewMapComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const dynamicLayersRef = useRef<any[]>([])
  const initialFittedRef = useRef<boolean>(false)

  const [geoData, setGeoData] = useState<any | null>(null)

  // 1. Fetch Estate GeoJSON Block Inventory dynamically according to selected Estate!
  useEffect(() => {
    let isMounted = true
    const targetEstate = estateId && estateId !== 'ALL' ? estateId : 'Estate A'

    fetch(`/api/map-data?estate=${targetEstate}`)
      .then(res => res.json())
      .then(json => {
        if (!isMounted) return
        if (json.success && json.data) {
          setGeoData(json.data)
        } else {
          setGeoData(null)
        }
      })
      .catch(() => {
        if (isMounted) setGeoData(null)
      })

    return () => {
      isMounted = false
    }
  }, [estateId])

  // 2. Initialize Leaflet Map with ArcGIS Satellite Basemap
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return
    if (!L) return

    if (!mapRef.current) {
      const map = L.map(containerRef.current, {
        center: [2.302, 99.970],
        zoom: 13,
        zoomControl: true
      })

      // ArcGIS World Imagery Satellite Basemap
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution:
            'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          maxZoom: 19
        }
      ).addTo(map)

      mapRef.current = map
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Helper: Calculate mock vehicle frequency for a given block code
  const getBlockCoverageDetail = (blokCode: string, isRawan: boolean): BlockCoverageDetail => {
    const raw = (blokCode || '').toUpperCase().replace(/BLOK\s*/gi, '')
    let mob1Freq = 0
    let mob2Freq = 0
    let mot1Freq = 0

    // Deterministic frequency assignment based on block code
    if (raw.includes('48') || raw.includes('39') || raw.includes('60')) {
      mob1Freq = 2
      mot1Freq = 1
    } else if (raw.includes('55') || raw.includes('50') || raw.includes('52')) {
      mob2Freq = 1
      mot1Freq = 1
    } else if (raw.includes('37') || raw.includes('38') || raw.includes('51')) {
      mob1Freq = 1
    } else if (raw.includes('59') || raw.includes('58') || raw.includes('61')) {
      mob2Freq = 1
    } else {
      mob1Freq = 1
    }

    const vehicleContributions = []
    if (mob1Freq > 0) vehicleContributions.push({ demoName: 'Mobil 1', nopol: 'BM 1000 ADPE', frequency: mob1Freq, lastTime: '08:45 WIB' })
    if (mob2Freq > 0) vehicleContributions.push({ demoName: 'Mobil 2', nopol: 'BM 2000 ADPE', frequency: mob2Freq, lastTime: '11:20 WIB' })
    if (mot1Freq > 0) vehicleContributions.push({ demoName: 'Motor 1', nopol: 'BK 1001 JAR', frequency: mot1Freq, lastTime: '14:15 WIB' })

    const totalFrequency = mob1Freq + mob2Freq + mot1Freq

    return {
      blockCode: blokCode,
      estateId: estateId || 'Estate A',
      isRawan,
      totalFrequency,
      vehicleContributions
    }
  }

  // 3. Render Map Layers & Overlays
  useEffect(() => {
    const map = mapRef.current
    if (!map || !L) return

    // Clear previous dynamic layers
    dynamicLayersRef.current.forEach(layer => map.removeLayer(layer))
    dynamicLayersRef.current = []

    const bounds = L.latLngBounds([])

    // Always extend bounds with the 3 required Theft Incident locations
    incidents.forEach(inc => bounds.extend([inc.lat, inc.lng]))

    // A. RENDER ESTATE BLOCK POLYGONS & LABELS
    if (showBlocks && geoData && geoData.features) {
      const geoJsonLayer = L.geoJSON(geoData, {
        filter: (feature: any) => {
          const props = feature.properties || {}
          const rawBlok = (props.blok || props.nama_bl || props.blockCode || '').toUpperCase()
          const isRawan = props.isRawan ?? (rawBlok.includes('48') || rawBlok.includes('39') || rawBlok.includes('60') || rawBlok.includes('55') || rawBlok.includes('50') || rawBlok.includes('52'))

          if (blockCategoryFilter === 'Rawan' && !isRawan) return false
          if (blockCategoryFilter === 'Non-Rawan' && isRawan) return false
          return true
        },
        style: (feature: any) => {
          const props = feature.properties || {}
          const blokCode = (props.blok || props.nama_bl || props.blockCode || 'BLOK').toUpperCase()
          const isRawan = props.isRawan ?? (blokCode.includes('48') || blokCode.includes('39') || blokCode.includes('60') || blokCode.includes('55') || blokCode.includes('50') || blokCode.includes('52'))
          const isSelected = selectedBlockCode === blokCode

          if (mapMode === 'status') {
            // Status Blok Mode: Rawan (translucent red) vs Non-Rawan (translucent blue)
            if (isRawan) {
              return {
                fillColor: '#ef4444',
                fillOpacity: isSelected ? 0.45 : 0.22,
                color: '#dc2626',
                weight: isSelected ? 3 : 1.5
              }
            }
            return {
              fillColor: '#3b82f6',
              fillOpacity: isSelected ? 0.35 : 0.08,
              color: '#60a5fa',
              weight: isSelected ? 3 : 1.0
            }
          } else {
            // Frekuensi Mode: 0x (pale gray), 1x (light green), 2x (medium green), >2x (deep green)
            const detail = getBlockCoverageDetail(blokCode, isRawan)
            const freq = detail.totalFrequency

            let fillColor = '#f1f5f9'
            let fillOpacity = 0.25
            let strokeColor = '#cbd5e1'

            if (freq === 1) {
              fillColor = '#bbf7d0'
              fillOpacity = 0.50
              strokeColor = '#4ade80'
            } else if (freq === 2) {
              fillColor = '#4ade80'
              fillOpacity = 0.65
              strokeColor = '#16a34a'
            } else if (freq > 2) {
              fillColor = '#15803d'
              fillOpacity = 0.85
              strokeColor = '#14532d'
            }

            return {
              fillColor,
              fillOpacity: isSelected ? 0.90 : fillOpacity,
              color: isRawan ? '#dc2626' : strokeColor, // Rawan retains distinct red border
              weight: isRawan ? 2 : (isSelected ? 3 : 1),
              dashArray: isRawan ? '4, 4' : ''
            }
          }
        },
        onEachFeature: (feature: any, layer: any) => {
          const props = feature.properties || {}
          const blokCode = (props.blok || props.nama_bl || props.blockCode || 'BLOK').toUpperCase()
          const isRawan = props.isRawan ?? (blokCode.includes('48') || blokCode.includes('39') || blokCode.includes('60') || blokCode.includes('55') || blokCode.includes('50') || blokCode.includes('52'))
          const detail = getBlockCoverageDetail(blokCode, isRawan)

          // Polygon Plain Label (Centered inside polygon)
          try {
            const center = layer.getBounds().getCenter()
            const labelText = mapMode === 'frequency' ? `${blokCode} (${detail.totalFrequency}×)` : blokCode

            const labelMarker = L.marker(center, {
              icon: L.divIcon({
                className: '',
                html: `<div style="font-size:10px; font-weight:800; color:${isRawan ? '#fca5a5' : '#93c5fd'}; text-shadow:0 1px 3px #000; white-space:nowrap; pointer-events:none;">${labelText}</div>`,
                iconSize: [50, 14],
                iconAnchor: [25, 7]
              }),
              interactive: false
            })
            dynamicLayersRef.current.push(labelMarker)
            labelMarker.addTo(map)
          } catch {}

          // Click Block Handler -> Opens Block Detail Panel
          layer.on('click', () => {
            onSelectBlock(detail)
          })

          layer.bindTooltip(`
            <div style="font-family:sans-serif; font-size:11px; font-weight:700; color:#0f172a;">
              Blok ${blokCode} (${isRawan ? 'Rawan' : 'Non-Rawan'})<br/>
              Total Frekuensi Cakupan: <span style="color:#16a34a;">${detail.totalFrequency}×</span>
            </div>
          `, { sticky: true })

          try {
            const b = layer.getBounds()
            if (b.isValid()) bounds.extend(b)
          } catch {}
        }
      }).addTo(map)

      dynamicLayersRef.current.push(geoJsonLayer)
    }

    // B. RENDER BASELINE ROUTES
    if (showBaseline) {
      vehicles.forEach(veh => {
        if (!veh.isVisible || veh.allPoints.length === 0) return
        const baselinePts = veh.allPoints.map(p => [p.lat + 0.0006, p.lng + 0.0006])
        const baselinePoly = L.polyline(baselinePts, {
          color: '#cbd5e1',
          weight: 2,
          opacity: 0.45,
          dashArray: '6, 6'
        }).addTo(map)
        dynamicLayersRef.current.push(baselinePoly)
      })
    }

    // C. RENDER CLEANED VEHICLE TRACKS (POLYLINES SPLIT ACROSS GAPS)
    vehicles.forEach(veh => {
      if (!veh.isVisible || !showTracking || veh.segments.length === 0) return

      const isFocused = !selectedVehicleId || selectedVehicleId === veh.vehicleId
      const opacity = isFocused ? 0.95 : 0.20
      const weight = isFocused ? 4 : 2

      veh.segments.forEach(seg => {
        const segLatLngs = seg.map(p => [p.lat, p.lng])
        segLatLngs.forEach(pt => bounds.extend(pt))

        const polyline = L.polyline(segLatLngs, {
          color: veh.color,
          weight,
          opacity,
          smoothFactor: 1
        }).addTo(map)

        polyline.on('click', () => onSelectVehicle(veh.vehicleId))
        dynamicLayersRef.current.push(polyline)
      })

      // Start & End Markers
      if (veh.allPoints.length > 0) {
        const startPt = veh.allPoints[0]
        const startMarker = L.circleMarker([startPt.lat, startPt.lng], {
          radius: 6,
          fillColor: '#16a34a',
          color: '#ffffff',
          weight: 2,
          fillOpacity: 0.9
        }).addTo(map)
        startMarker.bindPopup(`<b>${veh.demoName} (${veh.nopol})</b><br/>Awal Patroli: ${startPt.time}<br/><span style="font-size:10px; color:#64748b;">${veh.sourceDateLabel}</span>`)
        dynamicLayersRef.current.push(startMarker)

        const endPt = veh.allPoints[veh.allPoints.length - 1]
        const endMarker = L.circleMarker([endPt.lat, endPt.lng], {
          radius: 6,
          fillColor: '#dc2626',
          color: '#ffffff',
          weight: 2,
          fillOpacity: 0.9
        }).addTo(map)
        endMarker.bindPopup(`<b>${veh.demoName} (${veh.nopol})</b><br/>Akhir Patroli: ${endPt.time}<br/><span style="font-size:10px; color:#64748b;">${veh.sourceDateLabel}</span>`)
        dynamicLayersRef.current.push(endMarker)

        // Playback Position Marker (No gap jump interpolation)
        const activeIdx = Math.min(
          veh.allPoints.length - 1,
          Math.floor(playbackRatio * (veh.allPoints.length - 1))
        )
        const currentPt = veh.allPoints[activeIdx]

        if (currentPt) {
          const iconHtml = `
            <div style="background:${veh.color}; color:#fff; font-size:11px; font-weight:800; padding:3px 8px; border-radius:12px; border:2px solid #fff; box-shadow:0 2px 8px rgba(0,0,0,0.5); display:inline-flex; align-items:center; gap:5px; white-space:nowrap;">
              <span>${veh.vehicleType === 'Car' ? '🚗' : '🏍️'}</span>
              <span>${veh.demoName}</span>
            </div>
          `
          const customIcon = L.divIcon({
            html: iconHtml,
            className: '',
            iconSize: [85, 24],
            iconAnchor: [42, 12]
          })

          const playMarker = L.marker([currentPt.lat, currentPt.lng], { icon: customIcon }).addTo(map)
          playMarker.bindPopup(`
            <div style="font-family:sans-serif; font-size:11px;">
              <b>${veh.demoName} (${veh.nopol})</b><br/>
              Waktu Track: ${currentPt.time}<br/>
              Kecepatan: ${currentPt.speed} km/h<br/>
              <span style="font-size:10px; color:#64748b;">${veh.sourceDateLabel}</span>
            </div>
          `)
          dynamicLayersRef.current.push(playMarker)
        }
      }
    })

    // D. RENDER SPEEDING EVENTS ("KECEPATAN >50 KM/JAM")
    if (showSpeeding && speedingEvents.length > 0) {
      speedingEvents.forEach(sp => {
        const veh = vehicles.find(v => v.vehicleId === sp.vehicleId)
        if (veh && !veh.isVisible) return

        const segLine = L.polyline(sp.points, {
          color: '#ec4899',
          weight: 6,
          opacity: 0.9,
          dashArray: '6, 6'
        }).addTo(map)

        const startPt = sp.points[0]
        const speedIcon = L.divIcon({
          className: '',
          html: `<div style="background:#ec4899; color:#ffffff; width:24px; height:24px; border-radius:50%; border:2px solid #ffffff; box-shadow:0 0 8px rgba(236,72,153,0.8); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold; cursor:pointer;" title="${sp.eventNo}">⚡</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })

        const speedMarker = L.marker(startPt, { icon: speedIcon }).addTo(map)
        const popupHtml = `
          <div style="font-family:sans-serif; padding:3px; font-size:11px; max-width:240px;">
            <b style="color:#be185d; font-size:12px;">⚡ ${sp.eventNo}</b><br/>
            <b>Kendaraan:</b> ${sp.nopol}<br/>
            <b>Waktu Mulai:</b> ${sp.startTime}<br/>
            <b>Kecepatan Maksimum:</b> <span style="color:#dc2626; font-weight:800;">${sp.maxSpeedKmH} km/h</span><br/>
            <b>Durasi & Jarak:</b> ${sp.durationMins} menit (${sp.distanceKm} km)<br/>
            <b>Catatan Pelanggaran:</b><br/>
            <span style="color:#475569; background:#fdf2f8; padding:3px 6px; border-radius:4px; display:inline-block; margin-top:2px;">${sp.comment}</span>
          </div>
        `
        segLine.bindPopup(popupHtml)
        speedMarker.bindPopup(popupHtml)

        speedMarker.on('click', () => {
          if (onPausePlayback) onPausePlayback()
        })
        dynamicLayersRef.current.push(segLine)
        dynamicLayersRef.current.push(speedMarker)
      })
    }

    // E. RENDER STOP EVENTS ("BERHENTI >30 MENIT")
    if (showStops && stopEvents.length > 0) {
      stopEvents.forEach(stop => {
        const veh = vehicles.find(v => v.vehicleId === stop.vehicleId)
        if (veh && !veh.isVisible) return

        const stopIcon = L.divIcon({
          className: '',
          html: `<div style="background:#f59e0b; color:#ffffff; width:24px; height:24px; border-radius:50%; border:2px solid #ffffff; box-shadow:0 0 8px rgba(245,158,11,0.8); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold; cursor:pointer;" title="${stop.eventNo}">🛑</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })

        const stopMarker = L.marker([stop.lat, stop.lng], { icon: stopIcon }).addTo(map)
        const popupHtml = `
          <div style="font-family:sans-serif; padding:3px; font-size:11px; max-width:240px;">
            <b style="color:#b45309; font-size:12px;">🛑 ${stop.eventNo}</b><br/>
            <b>Kendaraan:</b> ${stop.nopol}<br/>
            <b>Waktu:</b> ${stop.startTime} – ${stop.endTime}<br/>
            <b>Durasi Berhenti:</b> ${stop.durationMins} menit (&gt;30m)<br/>
            <b>Lokasi:</b> ${stop.locationLabel}<br/>
            <b>Catatan Pelanggaran:</b><br/>
            <span style="color:#475569; background:#fffbeb; padding:3px 6px; border-radius:4px; display:inline-block; margin-top:2px;">${stop.comment}</span>
          </div>
        `
        stopMarker.bindPopup(popupHtml)
        stopMarker.on('click', () => {
          if (onPausePlayback) onPausePlayback()
        })
        dynamicLayersRef.current.push(stopMarker)
      })
    }

    // F. RENDER OUT-OF-ROUTE EVENTS ("KELUAR RUTE")
    if (showOutRoute && outRouteEvents.length > 0) {
      outRouteEvents.forEach(or => {
        const veh = vehicles.find(v => v.vehicleId === or.vehicleId)
        if (veh && !veh.isVisible) return

        const segLine = L.polyline(or.points, {
          color: '#d97706',
          weight: 6,
          opacity: 0.9,
          dashArray: '8, 8'
        }).addTo(map)

        const startPt = or.points[0]
        const warnIcon = L.divIcon({
          className: '',
          html: `<div style="background:#d97706; color:#ffffff; width:22px; height:22px; border-radius:4px; border:2px solid #ffffff; box-shadow:0 0 6px rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:bold; cursor:pointer;" title="${or.eventNo}">⚠️</div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        })

        const warnMarker = L.marker(startPt, { icon: warnIcon }).addTo(map)
        const popupHtml = `
          <div style="font-family:sans-serif; padding:3px; font-size:11px; max-width:240px;">
            <b style="color:#d97706; font-size:12px;">⚠️ ${or.eventNo}</b><br/>
            <b>Kendaraan:</b> ${or.nopol}<br/>
            <b>Waktu Mulai:</b> ${or.startTime}<br/>
            <b>Durasi Out-Route:</b> ${or.durationMins} menit (${or.distanceKm} km)<br/>
            <b>Catatan Pelanggaran:</b><br/>
            <span style="color:#475569; background:#fff8f1; padding:3px 6px; border-radius:4px; display:inline-block; margin-top:2px;">${or.reason}</span>
          </div>
        `
        segLine.bindPopup(popupHtml)
        warnMarker.bindPopup(popupHtml)

        warnMarker.on('click', () => {
          if (onPausePlayback) onPausePlayback()
        })

        dynamicLayersRef.current.push(segLine)
        dynamicLayersRef.current.push(warnMarker)
      })
    }

    // G. RENDER EXACT 3 THEFT INCIDENTS ("INSIDEN PENCURIAN")
    if (showIncidents && incidents.length > 0) {
      incidents.forEach(inc => {
        const incidentIcon = L.divIcon({
          className: '',
          html: `<div style="background:#dc2626; color:#ffffff; width:28px; height:28px; border-radius:50%; border:2px solid #ffffff; box-shadow:0 0 12px rgba(220,38,38,0.95); display:flex; align-items:center; justify-content:center; font-size:15px; font-weight:bold; cursor:pointer;" title="${inc.title}">🚨</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        })

        const incMarker = L.marker([inc.lat, inc.lng], { icon: incidentIcon }).addTo(map)

        const popupHtml = `
          <div style="font-family:sans-serif; padding:4px; min-width:240px; max-width:280px;">
            <div style="background:#fef2f2; color:#991b1b; padding:4px 8px; border-radius:4px; font-weight:800; font-size:12px; border-left:4px solid #dc2626; margin-bottom:6px; display:flex; justify-content:space-between; align-items:center;">
              <span>🚨 ${inc.title}</span>
              <span style="font-size:10px; opacity:0.85;">${inc.time}</span>
            </div>
            <div style="font-size:11px; color:#1e293b; margin-bottom:3px;">
              <b>Lokasi:</b> ${inc.locationLabel}
            </div>
            <div style="font-size:11px; color:#334155; background:#f8fafc; padding:6px; border-radius:4px; border:1px solid #e2e8f0; margin-bottom:6px; line-height:1.4;">
              ${inc.summary}
            </div>
            <div style="font-size:10px; color:#0369a1; font-weight:700;">
              <b>Tindak Lanjut:</b> ${inc.followUp}
            </div>
          </div>
        `
        incMarker.bindPopup(popupHtml)
        incMarker.on('click', () => {
          if (onPausePlayback) onPausePlayback()
        })
        dynamicLayersRef.current.push(incMarker)
      })
    }

    // Initial fit bounds once to encompass tracks & incident coordinates
    if (bounds.isValid() && !initialFittedRef.current) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 })
      initialFittedRef.current = true
    }
  }, [
    estateId,
    mapMode,
    blockCategoryFilter,
    vehicles,
    incidents,
    speedingEvents,
    stopEvents,
    outRouteEvents,
    selectedVehicleId,
    selectedBlockCode,
    playbackRatio,
    showTracking,
    showBaseline,
    showBlocks,
    showIncidents,
    showSpeeding,
    showStops,
    showOutRoute,
    geoData
  ])

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '8px', minHeight: '540px', background: '#0f172a', position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '540px', borderRadius: '8px' }} />

      {/* COMPACT MAP OVERLAY LEGEND */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        zIndex: 1000,
        background: 'rgba(15, 23, 42, 0.88)',
        backdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '6px',
        padding: '8px 12px',
        color: '#f8fafc',
        fontSize: '0.72rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
      }}>
        <div style={{ fontWeight: 800, fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>
          Legenda Overview ({mapMode === 'status' ? 'Status Blok' : 'Frekuensi Cakupan'})
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: 12, height: 4, borderRadius: 2, background: '#2563eb', display: 'inline-block' }} />
          <span>Mobil 1</span>
          <span style={{ width: 12, height: 4, borderRadius: 2, background: '#d97706', display: 'inline-block', marginLeft: 4 }} />
          <span>Mobil 2</span>
          <span style={{ width: 12, height: 4, borderRadius: 2, background: '#16a34a', display: 'inline-block', marginLeft: 4 }} />
          <span>Motor 1</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', flexWrap: 'wrap' }}>
          {mapMode === 'status' ? (
            <>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(239, 68, 68, 0.4)', border: '1px solid #dc2626', display: 'inline-block' }} />
              <span>Blok Rawan</span>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(59, 130, 246, 0.2)', border: '1px solid #60a5fa', display: 'inline-block', marginLeft: 6 }} />
              <span>Non-Rawan</span>
            </>
          ) : (
            <>
              <span style={{ width: 10, height: 10, background: '#f1f5f9', border: '1px solid #cbd5e1', display: 'inline-block' }} />
              <span>0×</span>
              <span style={{ width: 10, height: 10, background: '#bbf7d0', border: '1px solid #4ade80', display: 'inline-block', marginLeft: 4 }} />
              <span>1×</span>
              <span style={{ width: 10, height: 10, background: '#4ade80', border: '1px solid #16a34a', display: 'inline-block', marginLeft: 4 }} />
              <span>2×</span>
              <span style={{ width: 10, height: 10, background: '#15803d', border: '1px solid #14532d', display: 'inline-block', marginLeft: 4 }} />
              <span>&gt;2×</span>
            </>
          )}
          <span style={{ marginLeft: 6 }}>⚡ &gt;50km/h</span>
          <span style={{ marginLeft: 6 }}>🛑 &gt;30m</span>
          <span style={{ marginLeft: 6 }}>⚠️ Out-Route</span>
          <span style={{ marginLeft: 6 }}>🚨 Pencurian</span>
        </div>
      </div>
    </div>
  )
}
