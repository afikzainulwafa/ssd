'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { VULNERABLE_BLOCKS } from '@/lib/vulnerable-blocks'
import { getShiftFromFixTime, formatShiftLabel, type PatrolShift } from '@/lib/patrol-shift'
import type { GpsPosition } from '@/lib/supabase'
import {
  buildPlaybackPath,
  interpolatePlaybackPath,
  playbackPathSlice,
  type PlaybackPoint,
} from '@/lib/patrol-playback'

export type MapOverviewEvent = {
  id: number
  lat: number
  lng: number
  label: string
  shift?: PatrolShift
  commented: boolean
  commentCategory?: string
  commentDetail?: string
  comment?: string
  track?: [number, number][]
  width?: number
  height?: number
}

interface MapViewerProps {
  gpsData?: GpsPosition[]
  stopEvents?: MapOverviewEvent[]
  routeEvents?: MapOverviewEvent[]
  speedEvents?: MapOverviewEvent[]
  exceptionFilter?: 'all' | 'hide' | 'stop' | 'route' | 'speed'
  focusedEventId?: number | null
  selectedShift?: string
}

const LAT_OFFSET = -0.020131
const LNG_OFFSET = 0.064319
const LAT_MIN = 1.630, LAT_MAX = 1.690
const LNG_MIN = 99.895, LNG_MAX = 99.965
const MAX_JUMP = 0.008

const SHIFT_COLORS = { 1: '#ef4444', 2: '#3b30ea', 3: '#00e5c8' } as const
const SHIFT_WEIGHTS = { 1: 7, 2: 5, 3: 3 } as const
const BASELINE_WEIGHTS = { 1: 10, 2: 9, 3: 9 } as const
const BASELINE_OPACITY = 0.22
const PLAYBACK_DURATION_MS = 90_000
const BASELINE_URLS: Record<PatrolShift, string> = {
  1: '/LPYE_Tracks-shift-1.geojson',
  2: '/LPYE_Tracks-shift-2.geojson',
  3: '/LPYE_Tracks-shift-3.geojson',
}
const ROUTE_COLOR = '#f97316'
const SPEED_COLOR = '#ec4899'
const STOP_COLOR = '#f97316'

const DEFAULT_CENTER: [number, number] = [1.658, 99.927]
const DEFAULT_ZOOM = 14

function applyOffset(lat: number, lng: number): [number, number] {
  return [lat + LAT_OFFSET, lng + LNG_OFFSET]
}

function safeFitBounds(map: L.Map, bounds: L.LatLngBounds, padding: [number, number] = [40, 40]) {
  if (!bounds.isValid()) {
    map.setView(DEFAULT_CENTER, DEFAULT_ZOOM)
    return
  }
  map.invalidateSize()
  try {
    map.fitBounds(bounds, { padding, animate: true, maxZoom: 16 })
  } catch {
    map.setView(DEFAULT_CENTER, DEFAULT_ZOOM)
  }
}

function stopMarkerHtml(color: string, size: number, pulse = false) {
  const cls = pulse ? 'map-pulse-ring' : ''
  return `<div class="${cls}" style="background:white;border:3px solid ${color};border-radius:50%;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.35);">
    <div style="width:${size * 0.4}px;height:${size * 0.4}px;background:${color};border-radius:50%;"></div>
  </div>`
}

function blockStyle(blok: string): L.PathOptions {
  const isVuln = (VULNERABLE_BLOCKS as readonly string[]).includes(blok)
  return {
    color: '#ffffff',
    weight: 1.5,
    fillColor: isVuln ? '#e53935' : '#1565d8',
    fillOpacity: isVuln ? 0.28 : 0.12,
    pane: 'blocksPane',
  }
}

function blockLabelHtml(blok: string, isVuln: boolean) {
  const cls = isVuln ? 'block-label vulnerable' : 'block-label'
  return `<div class="${cls}">${blok}</div>`
}

function coordsToLatLngs(coords: number[][]): [number, number][] {
  return coords.map((c) => [c[1], c[0]] as [number, number])
}

function lineSetsFromFeature(feature: GeoJSON.Feature): [number, number][][] {
  const geom = feature.geometry
  if (!geom) return []
  if (geom.type === 'MultiLineString') {
    return (geom as GeoJSON.MultiLineString).coordinates
      .map((coords) => coordsToLatLngs(coords))
      .filter((lls) => lls.length >= 2)
  }
  if (geom.type === 'LineString') {
    const lls = coordsToLatLngs((geom as GeoJSON.LineString).coordinates)
    return lls.length >= 2 ? [lls] : []
  }
  return []
}

function addPolyline(
  map: L.Map,
  points: [number, number][],
  shift: PatrolShift,
  layers: L.Layer[],
  baseline = false
) {
  if (points.length < 2) return
  const line = L.polyline(points, {
    color: SHIFT_COLORS[shift],
    weight: baseline ? BASELINE_WEIGHTS[shift] : SHIFT_WEIGHTS[shift],
    opacity: baseline ? BASELINE_OPACITY : 0.92,
    dashArray: baseline ? '10 7' : undefined,
    pane: baseline ? 'baselinePane' : 'tracksPane',
    lineCap: 'round',
    lineJoin: 'round',
  })
  line.addTo(map)
  layers.push(line)
}

function popupHtml(label: string, shift?: PatrolShift) {
  const shiftLine = shift
    ? `<br/><span style="font-size:11px;color:#64748b">${formatShiftLabel(shift)}</span>`
    : ''
  return `<b>${label}</b>${shiftLine}`
}

function vehicleMarkerHtml(shift: PatrolShift) {
  const color = SHIFT_COLORS[shift]
  return `<div style="width:18px;height:18px;background:#fff;border:3px solid ${color};border-radius:50%;box-shadow:0 2px 10px rgba(0,0,0,0.45);"></div>`
}

function formatEyeCatchingPopup(type: 'stop' | 'route' | 'speed', ev: MapOverviewEvent): string {
  const parts = ev.label.split(' · ')
  const title = type === 'stop' ? '⚠️ EXCEPTION: BERHENTI' : type === 'route' ? '🗺️ EXCEPTION: KELUAR RUTE' : '⚡ EXCEPTION: SPEEDING'
  const accentColor = type === 'stop' ? '#ff9800' : type === 'route' ? '#f44336' : '#9c27b0'
  const shadowColor = type === 'stop' ? 'rgba(255, 152, 0, 0.2)' : type === 'route' ? 'rgba(244, 67, 54, 0.2)' : 'rgba(156, 39, 176, 0.2)'

  let detailsHtml = ''
  parts.forEach((p) => {
    if (p.includes('#')) {
      detailsHtml += `<div style="margin-bottom:4px;"><strong style="color:#475569;">Event:</strong> <span style="font-weight:700;color:${accentColor};">${p}</span></div>`
    } else if (p.includes('Shift')) {
      detailsHtml += `<div style="margin-bottom:4px;"><strong style="color:#475569;">Shift:</strong> <span style="font-weight:600;color:#1e293b;">${p}</span></div>`
    } else if (p.includes('-') && (p.includes(':') || p.match(/\d/))) {
      detailsHtml += `<div style="margin-bottom:4px;"><strong style="color:#475569;">Waktu:</strong> <span style="font-weight:600;color:#1e293b;">${p}</span></div>`
    } else if (p.match(/^\d+ (km|m)/) || p.includes('km/jam') || p.includes('km/h')) {
      detailsHtml += `<div style="margin-bottom:4px;"><strong style="color:#475569;">Detail:</strong> <span style="font-weight:700;color:#e53935;">${p}</span></div>`
    } else {
      detailsHtml += `<div style="margin-bottom:4px;"><strong style="color:#475569;">Detail:</strong> <span style="font-weight:600;color:#1e293b;">${p}</span></div>`
    }
  })

  let commentHtml = ''
  if (ev.commented) {
    const commentText = ev.commentDetail
      ? `${ev.commentCategory} - ${ev.commentDetail}`
      : ev.commentCategory || ev.comment || 'Sudah dikomentari'
    commentHtml = `
      <div style="margin-top:8px; padding-top:6px; border-top:1px dashed #e2e8f0;">
        <strong style="color:#475569;">Komentar PIC:</strong>
        <div style="font-weight:700; color:#2e7d32; margin-top:2px;">✓ ${commentText}</div>
      </div>
    `
  } else {
    commentHtml = `
      <div style="margin-top:8px; padding-top:6px; border-top:1px dashed #e2e8f0;">
        <strong style="color:#475569;">Komentar PIC:</strong>
        <div style="font-weight:700; color:#b71c1c; margin-top:2px;">⚠️ Belum dikomentari</div>
      </div>
    `
  }

  return `
    <div style="
      font-family: 'Inter', sans-serif;
      padding: 10px 12px;
      border-radius: 10px;
      background: white;
      box-shadow: 0 10px 25px ${shadowColor};
      border-left: 5px solid ${accentColor};
      min-width: 180px;
      font-size: 11px;
      line-height: 1.4;
    ">
      <div style="font-weight: 800; font-size: 12px; color: ${accentColor}; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.03em;">
        ${title}
      </div>
      <div>
        ${detailsHtml}
      </div>
      ${commentHtml}
    </div>
  `
}

function parseDemoTracks(json: { features?: GeoJSON.Feature[] }) {
  const byShift: Record<PatrolShift, [number, number][][]> = { 1: [], 2: [], 3: [] }
  ;(json.features || []).forEach((feature, i) => {
    const shift: PatrolShift = i < 4 ? 1 : i < 8 ? 2 : 3
    lineSetsFromFeature(feature).forEach((lls) => byShift[shift].push(lls))
  })
  return byShift
}

function parseGpsTracks(
  gpsData: { latitude?: number; longitude?: number; fix_time?: string; fixTime?: string }[]
) {
  interface Pt { lat: number; lng: number; shift: PatrolShift }
  const valid: Pt[] = []
  gpsData.forEach((r) => {
    const lat = Number(r.latitude) + LAT_OFFSET
    const lng = Number(r.longitude) + LNG_OFFSET
    if (isNaN(lat) || isNaN(lng)) return
    if (lat < LAT_MIN || lat > LAT_MAX || lng < LNG_MIN || lng > LNG_MAX) return
    valid.push({ lat, lng, shift: getShiftFromFixTime(r.fix_time || r.fixTime || '') })
  })
  const byShift: Record<PatrolShift, [number, number][][]> = { 1: [], 2: [], 3: [] }
  if (valid.length === 0) return byShift

  let cur: { shift: PatrolShift; points: [number, number][] } = {
    shift: valid[0].shift,
    points: [[valid[0].lat, valid[0].lng]],
  }
  for (let i = 1; i < valid.length; i++) {
    const prev = valid[i - 1]
    const curr = valid[i]
    const dist = Math.sqrt((curr.lat - prev.lat) ** 2 + (curr.lng - prev.lng) ** 2)
    if (curr.shift !== cur.shift || dist > MAX_JUMP) {
      if (cur.points.length >= 2) byShift[cur.shift].push(cur.points)
      cur = { shift: curr.shift, points: [[curr.lat, curr.lng]] }
    } else {
      cur.points.push([curr.lat, curr.lng])
    }
  }
  if (cur.points.length >= 2) byShift[cur.shift].push(cur.points)
  return byShift
}

type PlaybackStatus = 'idle' | 'playing' | 'paused'

export default function MapViewer({
  gpsData = [],
  stopEvents = [],
  routeEvents = [],
  speedEvents = [],
  exceptionFilter = 'all',
  focusedEventId,
  selectedShift = 'all',
}: MapViewerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const trackLayersRef = useRef<L.Layer[]>([])
  const baselineLayersRef = useRef<L.Layer[]>([])
  const blockLayersRef = useRef<L.Layer[]>([])
  const overviewLayersRef = useRef<L.Layer[]>([])
  const overviewFitKeyRef = useRef('')
  const estateBoundsRef = useRef<L.LatLngBounds | null>(null)
  const playbackPathRef = useRef<PlaybackPoint[]>([])
  const playbackMarkerRef = useRef<L.Marker | null>(null)
  const playbackTrailRef = useRef<L.Polyline | null>(null)
  const playbackRafRef = useRef<number | null>(null)
  const playbackProgressRef = useRef(0)
  const playbackElapsedRef = useRef(0)
  const playbackStatusRef = useRef<PlaybackStatus>('idle')

  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>('idle')
  const [playbackProgress, setPlaybackProgress] = useState(0)
  const [hasPlaybackPath, setHasPlaybackPath] = useState(false)

  const clearPlaybackLayers = useCallback(() => {
    const map = mapInstanceRef.current
    if (playbackRafRef.current != null) {
      cancelAnimationFrame(playbackRafRef.current)
      playbackRafRef.current = null
    }
    if (map && playbackMarkerRef.current) {
      map.removeLayer(playbackMarkerRef.current)
      playbackMarkerRef.current = null
    }
    if (map && playbackTrailRef.current) {
      map.removeLayer(playbackTrailRef.current)
      playbackTrailRef.current = null
    }
  }, [])

  const updatePlaybackVisual = useCallback((progress: number) => {
    const map = mapInstanceRef.current
    const path = playbackPathRef.current
    if (!map || path.length === 0) return

    const pt = interpolatePlaybackPath(path, progress)
    const trailPts = playbackPathSlice(path, progress)

    if (!playbackTrailRef.current) {
      playbackTrailRef.current = L.polyline(trailPts, {
        color: '#ffffff',
        weight: 5,
        opacity: 0.85,
        pane: 'playbackPane',
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map)
    } else {
      playbackTrailRef.current.setLatLngs(trailPts)
    }

    const size = 18
    if (!playbackMarkerRef.current) {
      playbackMarkerRef.current = L.marker([pt.lat, pt.lng], {
        icon: L.divIcon({
          html: vehicleMarkerHtml(pt.shift),
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
          className: 'playback-vehicle-marker',
        }),
        pane: 'playbackPane',
        zIndexOffset: 2000,
      }).addTo(map)
    } else {
      playbackMarkerRef.current.setLatLng([pt.lat, pt.lng])
      playbackMarkerRef.current.setIcon(
        L.divIcon({
          html: vehicleMarkerHtml(pt.shift),
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
          className: 'playback-vehicle-marker',
        })
      )
    }
  }, [])

  const stopPlayback = useCallback((resetVisual = false) => {
    if (playbackRafRef.current != null) {
      cancelAnimationFrame(playbackRafRef.current)
      playbackRafRef.current = null
    }
    playbackStatusRef.current = resetVisual ? 'idle' : 'paused'
    setPlaybackStatus(resetVisual ? 'idle' : 'paused')
    if (resetVisual) {
      playbackProgressRef.current = 0
      playbackElapsedRef.current = 0
      setPlaybackProgress(0)
      clearPlaybackLayers()
    }
  }, [clearPlaybackLayers])

  const runPlaybackFrame = useCallback((startMs: number) => {
    const path = playbackPathRef.current
    if (path.length < 2) return

    const tick = (now: number) => {
      if (playbackStatusRef.current !== 'playing') return
      const elapsed = playbackElapsedRef.current + (now - startMs)
      const progress = Math.min(1, elapsed / PLAYBACK_DURATION_MS)
      playbackProgressRef.current = progress
      setPlaybackProgress(progress)
      updatePlaybackVisual(progress)

      if (progress >= 1) {
        playbackStatusRef.current = 'idle'
        setPlaybackStatus('idle')
        playbackRafRef.current = null
        return
      }
      playbackRafRef.current = requestAnimationFrame(tick)
    }
    playbackRafRef.current = requestAnimationFrame(tick)
  }, [updatePlaybackVisual])

  const handlePlay = useCallback(() => {
    const path = playbackPathRef.current
    if (path.length < 2) return
    clearPlaybackLayers()
    playbackProgressRef.current = 0
    playbackElapsedRef.current = 0
    setPlaybackProgress(0)
    playbackStatusRef.current = 'playing'
    setPlaybackStatus('playing')
    updatePlaybackVisual(0)
    runPlaybackFrame(performance.now())
  }, [clearPlaybackLayers, runPlaybackFrame, updatePlaybackVisual])

  const handlePause = useCallback(() => {
    if (playbackStatusRef.current !== 'playing') return
    if (playbackRafRef.current != null) {
      cancelAnimationFrame(playbackRafRef.current)
      playbackRafRef.current = null
    }
    playbackElapsedRef.current = playbackProgressRef.current * PLAYBACK_DURATION_MS
    playbackStatusRef.current = 'paused'
    setPlaybackStatus('paused')
  }, [])

  const handleResume = useCallback(() => {
    if (playbackStatusRef.current !== 'paused' || playbackPathRef.current.length < 2) return
    playbackStatusRef.current = 'playing'
    setPlaybackStatus('playing')
    runPlaybackFrame(performance.now())
  }, [runPlaybackFrame])

  useEffect(() => {
    return () => {
      clearPlaybackLayers()
    }
  }, [clearPlaybackLayers])

  useEffect(() => {
    const container = mapRef.current
    if (!container || mapInstanceRef.current) return

    let cancelled = false
    let fitTimer: ReturnType<typeof setTimeout> | null = null

    const map = L.map(container, { zoomControl: true })
    mapInstanceRef.current = map

    map.createPane('blocksPane')
    const blocksPane = map.getPane('blocksPane')
    if (blocksPane) blocksPane.style.zIndex = '350'

    map.createPane('baselinePane')
    const baselinePane = map.getPane('baselinePane')
    if (baselinePane) baselinePane.style.zIndex = '420'

    map.createPane('tracksPane')
    const tracksPane = map.getPane('tracksPane')
    if (tracksPane) tracksPane.style.zIndex = '450'

    map.createPane('playbackPane')
    const playbackPane = map.getPane('playbackPane')
    if (playbackPane) playbackPane.style.zIndex = '520'

    map.createPane('eventsPane')
    const eventsPane = map.getPane('eventsPane')
    if (eventsPane) eventsPane.style.zIndex = '600'

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Esri',
    }).addTo(map)

    fetch('/LPYE_Selection.json')
      .then((r) => r.json())
      .then((json) => {
        if (cancelled || mapInstanceRef.current !== map) return
        const features = (json.data || json).features || []
        const bounds = L.latLngBounds([])
        const layers: L.Layer[] = []

        features.forEach((feature: GeoJSON.Feature) => {
          const blok = (feature.properties as { blok?: string })?.blok || ''
          const isVuln = (VULNERABLE_BLOCKS as readonly string[]).includes(blok)

          const layer = L.geoJSON(feature, {
            style: () => blockStyle(blok),
          })
          layer.addTo(map)
          layers.push(layer)

          const b = layer.getBounds()
          if (b.isValid()) bounds.extend(b)

          const center = b.getCenter()
          const label = L.marker(center, {
            icon: L.divIcon({
              className: 'block-label-marker',
              html: blockLabelHtml(blok, isVuln),
              iconSize: [1, 1],
              iconAnchor: [0, 0],
            }),
            interactive: false,
            pane: 'blocksPane',
            zIndexOffset: -100,
          })
          label.addTo(map)
          layers.push(label)
        })

        blockLayersRef.current = layers
        estateBoundsRef.current = bounds

        fitTimer = setTimeout(() => {
          if (cancelled || mapInstanceRef.current !== map) return
          safeFitBounds(map, bounds)
        }, 150)
      })
      .catch(() => {
        if (!cancelled && mapInstanceRef.current === map) {
          map.setView(DEFAULT_CENTER, DEFAULT_ZOOM)
        }
      })

    const LegendControl = L.Control.extend({
      onAdd() {
        const div = L.DomUtil.create('div', 'map-legend')
        div.innerHTML = `
          <div class="map-legend-item"><span class="map-swatch line shift1"></span><span>Aktual Shift 1</span></div>
          <div class="map-legend-item"><span class="map-swatch line shift2"></span><span>Aktual Shift 2</span></div>
          <div class="map-legend-item"><span class="map-swatch line shift3"></span><span>Aktual Shift 3</span></div>
          <div class="map-legend-item"><span class="map-swatch line baseline1"></span><span>Rute Shift 1</span></div>
          <div class="map-legend-item"><span class="map-swatch line baseline2"></span><span>Rute Shift 2</span></div>
          <div class="map-legend-item"><span class="map-swatch line baseline3"></span><span>Rute Shift 3</span></div>
          <div class="map-legend-divider"></div>
          <div class="map-legend-item"><span class="map-swatch dot stop"></span><span>Berhenti &gt; 30 min</span></div>
          <div class="map-legend-item"><span class="map-swatch line oor"></span><span>Keluar Rute</span></div>
          <div class="map-legend-item"><span class="map-swatch line spd"></span><span>Kecepatan &gt; 50 km/h</span></div>
          <div class="map-legend-divider"></div>
          <div class="map-legend-item"><span class="map-swatch fill vuln"></span><span>Blok Rawan</span></div>
        `
        return div
      },
    })
    const legend = new LegendControl({ position: 'bottomleft' })
    legend.addTo(map)

    map.whenReady(() => {
      if (!cancelled && mapInstanceRef.current === map) {
        map.invalidateSize()
      }
    })

    return () => {
      cancelled = true
      if (fitTimer) clearTimeout(fitTimer)
      legend.remove()
      baselineLayersRef.current.forEach((l) => map.removeLayer(l))
      blockLayersRef.current.forEach((l) => map.removeLayer(l))
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    // Clear old baseline layers
    baselineLayersRef.current.forEach((l) => map.removeLayer(l))
    baselineLayersRef.current = []

    const baselineLayers: L.Layer[] = []
    const shiftsToLoad = (selectedShift === 'all' ? [1, 2, 3] : [Number(selectedShift)]) as PatrolShift[]

    Promise.all(
      shiftsToLoad.map((shift) =>
        fetch(BASELINE_URLS[shift])
          .then((r) => r.json())
          .then((json) => ({ shift, features: (json.features || []) as GeoJSON.Feature[] }))
          .catch(() => null)
      )
    )
      .then((sets) => {
        if (!mapInstanceRef.current || mapInstanceRef.current !== map) return
        sets.forEach((set) => {
          if (!set) return
          const { shift, features } = set
          features.forEach((feature) => {
            lineSetsFromFeature(feature).forEach((lls) => {
              addPolyline(map, lls, shift, baselineLayers, true)
            })
          })
        })
        baselineLayersRef.current = baselineLayers
      })
      .catch(() => {})
  }, [selectedShift])

  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    stopPlayback(true)
    trackLayersRef.current.forEach((l) => map.removeLayer(l))
    trackLayersRef.current = []

    const drawOrder: PatrolShift[] = [3, 2, 1]
    const applyTracks = (byShift: Record<PatrolShift, [number, number][][]>) => {
      const m = mapInstanceRef.current
      if (!m) return
      const layers: L.Layer[] = []
      drawOrder.forEach((shift) => {
        if (selectedShift === 'all' || shift.toString() === selectedShift) {
          byShift[shift].forEach((pts) => addPolyline(m, pts, shift, layers))
        }
      })
      trackLayersRef.current = layers

      const filteredByShift = { ...byShift }
      if (selectedShift !== 'all') {
        const active = Number(selectedShift) as PatrolShift
        ;([1, 2, 3] as PatrolShift[]).forEach((s) => {
          if (s !== active) {
            filteredByShift[s] = []
          }
        })
      }

      const path = buildPlaybackPath(filteredByShift)
      playbackPathRef.current = path
      setHasPlaybackPath(path.length >= 2)
    }

    if (gpsData.length === 0) {
      fetch('/LPYE_Tracks-2.geojson')
        .then((r) => r.json())
        .then((json) => applyTracks(parseDemoTracks(json)))
      return
    }

    const byShift = parseGpsTracks(gpsData)
    if (
      byShift[1].length + byShift[2].length + byShift[3].length === 0
    ) return
    applyTracks(byShift)
  }, [gpsData, stopPlayback, selectedShift])

  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    overviewLayersRef.current.forEach((l) => map.removeLayer(l))
    overviewLayersRef.current = []

    const showStops = exceptionFilter === 'all' || exceptionFilter === 'stop'
    const showRoutes = exceptionFilter === 'all' || exceptionFilter === 'route'
    const showSpeed = exceptionFilter === 'all' || exceptionFilter === 'speed'

    if (exceptionFilter === 'hide') {
      overviewFitKeyRef.current = ''
      if (estateBoundsRef.current) {
        safeFitBounds(map, estateBoundsRef.current, [40, 40])
      }
      return
    }

    const bounds = L.latLngBounds([])
    const layers: L.Layer[] = []
    const hasFocus = focusedEventId != null

    // 1. Render Stop Exceptions
    if (showStops && stopEvents) {
      stopEvents.forEach((ev) => {
        const [lat, lng] = applyOffset(ev.lat, ev.lng)
        const isFocused = focusedEventId === ev.id && (exceptionFilter === 'stop' || exceptionFilter === 'all')
        const color = ev.commented ? '#66bb6a' : STOP_COLOR
        const size = isFocused ? 44 : ev.commented ? 28 : 34
        const icon = L.divIcon({
          html: stopMarkerHtml(color, size, isFocused),
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
          className: '',
        })
        const marker = L.marker([lat, lng], {
          icon,
          pane: 'eventsPane',
          zIndexOffset: isFocused ? 1000 : ev.commented ? 100 : 500,
        }).bindPopup(formatEyeCatchingPopup('stop', ev), {
          className: 'premium-popup'
        })

        marker.on('mouseover', () => { marker.openPopup() })
        marker.on('mouseout', () => { marker.closePopup() })

        marker.addTo(map)
        layers.push(marker)
        bounds.extend([lat, lng])
        if (isFocused) marker.openPopup()
      })
    }

    // 2. Render Route Exceptions
    if (showRoutes && routeEvents) {
      routeEvents.forEach((ev) => {
        const isFocused = focusedEventId === ev.id && (exceptionFilter === 'route' || exceptionFilter === 'all')
        const track: [number, number][] = (ev.track ?? [[ev.lat, ev.lng]]).map(
          (p) => applyOffset(p[0], p[1]) as [number, number]
        )
        track.forEach((p) => bounds.extend(p))

        const lineColor = isFocused ? '#ec4899' : ROUTE_COLOR
        const line = L.polyline(track, {
          color: lineColor,
          weight: isFocused ? 8 : hasFocus ? 4 : 6,
          opacity: isFocused ? 1 : hasFocus ? 0.45 : 0.92,
          smoothFactor: 0,
          lineCap: 'round',
          lineJoin: 'round',
          pane: 'eventsPane',
        }).bindPopup(formatEyeCatchingPopup('route', ev), {
          className: 'premium-popup'
        })

        line.on('mouseover', (e: L.LeafletMouseEvent) => { line.openPopup(e.latlng) })
        line.on('mouseout', () => { line.closePopup() })

        line.addTo(map)
        layers.push(line)

        if (isFocused) {
          const lats = track.map((p) => p[0])
          const lngs = track.map((p) => p[1])
          const box = L.rectangle(
            [[Math.min(...lats) - 0.002, Math.min(...lngs) - 0.002], [Math.max(...lats) + 0.002, Math.max(...lngs) + 0.002]],
            { color: '#ffffff', weight: 3, fillColor: '#ec4899', fillOpacity: 0.2, pane: 'eventsPane' }
          ).addTo(map)
          layers.push(box)
        }
      })
    }

    // 3. Render Speed Exceptions
    if (showSpeed && speedEvents) {
      speedEvents.forEach((ev) => {
        const isFocused = focusedEventId === ev.id && (exceptionFilter === 'speed' || exceptionFilter === 'all')
        const track: [number, number][] = (ev.track ?? [[ev.lat, ev.lng]]).map(
          (p) => applyOffset(p[0], p[1]) as [number, number]
        )
        track.forEach((p) => bounds.extend(p))

        const lineColor = isFocused ? '#ab47bc' : SPEED_COLOR
        const line = L.polyline(track, {
          color: lineColor,
          weight: isFocused ? 8 : hasFocus ? 4 : 6,
          opacity: isFocused ? 1 : hasFocus ? 0.45 : 0.92,
          smoothFactor: 0,
          lineCap: 'round',
          lineJoin: 'round',
          pane: 'eventsPane',
        }).bindPopup(formatEyeCatchingPopup('speed', ev), {
          className: 'premium-popup'
        })

        line.on('mouseover', (e: L.LeafletMouseEvent) => { line.openPopup(e.latlng) })
        line.on('mouseout', () => { line.closePopup() })

        line.addTo(map)
        layers.push(line)

        if (isFocused) {
          const lats = track.map((p) => p[0])
          const lngs = track.map((p) => p[1])
          const box = L.rectangle(
            [[Math.min(...lats) - 0.0015, Math.min(...lngs) - 0.0015], [Math.max(...lats) + 0.0015, Math.max(...lngs) + 0.0015]],
            { color: '#ffffff', weight: 3, fillColor: '#ab47bc', fillOpacity: 0.18, pane: 'eventsPane' }
          ).addTo(map)
          layers.push(box)
        }
      })
    }

    overviewLayersRef.current = layers
    map.invalidateSize()

    const fitKey = `${exceptionFilter}:${focusedEventId ?? 'all'}`
    if (fitKey !== overviewFitKeyRef.current) {
      overviewFitKeyRef.current = fitKey
      if (bounds.isValid()) {
        safeFitBounds(map, bounds, [50, 50])
      } else if (estateBoundsRef.current) {
        safeFitBounds(map, estateBoundsRef.current, [40, 40])
      }
    }
  }, [stopEvents, routeEvents, speedEvents, exceptionFilter, focusedEventId])

  const pctLabel = `${Math.round(playbackProgress * 100)}%`

  return (
    <div className="map-viewer-wrap">
      <div ref={mapRef} className="map-viewer-canvas" />
      {hasPlaybackPath && (
        <div className="map-playback-bar">
          <span className="map-playback-title">Playback Rute</span>
          <div className="map-playback-actions">
            <button
              type="button"
              className="map-playback-btn"
              onClick={handlePlay}
              disabled={playbackStatus === 'playing'}
              title="Putar dari awal (Shift 1 → 3)"
            >
              ▶ Play
            </button>
            <button
              type="button"
              className="map-playback-btn"
              onClick={handlePause}
              disabled={playbackStatus !== 'playing'}
              title="Jeda"
            >
              ⏸ Pause
            </button>
            <button
              type="button"
              className="map-playback-btn"
              onClick={handleResume}
              disabled={playbackStatus !== 'paused'}
              title="Lanjutkan"
            >
              ⏵ Resume
            </button>
          </div>
          <div className="map-playback-progress-wrap">
            <div className="map-playback-progress-track">
              <div
                className="map-playback-progress-fill"
                style={{ width: `${playbackProgress * 100}%` }}
              />
            </div>
            <span className="map-playback-pct">{pctLabel}</span>
          </div>
        </div>
      )}
    </div>
  )
}
