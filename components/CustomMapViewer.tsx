'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface FeatureProperty {
  psm: string | null
  region: string | null
  pt: string | null
  estate: string | null
  divisi: string | null
  komplek: string | null
  blok: string | null
  thn_tanam: string | null
  keterangan: string | null
  nama_bl: string | null
  group_ast: string | null
  ket_ast: string | null
  edisi: string | null
  hectare: number | null
  [key: string]: any
}

interface MapGeoJsonFeature {
  type: 'Feature'
  geometry: any
  properties: FeatureProperty
}

interface GeoJsonData {
  type: 'FeatureCollection'
  features: MapGeoJsonFeature[]
}

type ColorMode = 'uniform' | 'divisi' | 'thn_tanam' | 'ket_ast' | 'keterangan'
type BasemapType = 'arcgis_sat' | 'arcgis_street' | 'osm'
type TabType = 'divisi' | 'thn_tanam' | 'ket_ast'

interface HighlightState {
  type: 'parent' | 'child'
  value: string
}

// Color palettes for dynamic color-coding
const DIVISI_COLORS: Record<string, string> = {
  'DIVISI 1': '#3b82f6', // blue
  'DIVISI 2': '#10b981', // emerald
  'DIVISI 3': '#f59e0b', // amber
  'DIVISI 4': '#ec4899', // pink
  'DIVISI 5': '#8b5cf6', // violet
  'DIVISI 6': '#06b6d4', // cyan
  'DIVISI 7': '#f97316', // orange
  'DIVISI 8': '#ef4444', // red
}

const KET_AST_COLORS: Record<string, string> = {
  'Areal Tertanam (Planted Area)': '#16a34a', // green
  'Jalan (Road)': '#475569', // slate/gray
  'Parit/Rawa/Sungai (Ditch/Swamp/River)': '#0284c7', // light blue
  'Areal Lain-Lain (Others)': '#ca8a04', // brown-yellow
  'Bangunan/Pabrik (Building/Mill)': '#db2777', // pink-purple
}

// Detailed sub-classification colors mapping all 29 unique child values
const KETERANGAN_COLORS: Record<string, string> = {
  // Areal Tertanam (Planted Area) -> Green
  'Areal Tanam': '#16a34a',

  // Jalan (Road) -> Slate/Gray shades
  'Jalan Bantu': '#475569',
  'Jalan CR': '#64748b',
  'Jalan MR': '#94a3b8',
  'Jalan Akses': '#334155',
  'Jalan Kontur': '#cbd5e1',
  'Jalan Emplasemen': '#1e293b',

  // Parit/Rawa/Sungai -> Blue/Cyan shades
  'Parit Peringgan': '#1d4ed8',
  'Parit Alam': '#2563eb',
  'Sungai': '#0284c7',
  'Parit 3x3': '#06b6d4',

  // Areal Lain-Lain (Others) -> Brown/Yellow shades
  'Jalur PLN': '#ca8a04',
  'Kuburan': '#78350f',
  'Enclave Masyarakat': '#b45309',
  'Quary': '#eab308',

  // Bangunan/Pabrik (Building/Mill) -> Red/Orange/Violet/Pink shades
  'Pos Satpam': '#ef4444',
  'Sekolah': '#ec4899',
  'Balai Karyawan': '#a855f7',
  'Emplasemen': '#db2777',
  'Gudang Central': '#f97316',
  'Kantor Divisi': '#f43f5e',
  'Lapangan Sepakbola': '#84cc16',
  'Lapangan Volly': '#10b981',
  'Masjid': '#8b5cf6',
  'Rumah Solar': '#f59e0b',
  'Tower BTS': '#6366f1',
  'Workshop': '#4f46e5',
  'Pos Polisi': '#dc2626',
  'Kantor Estate': '#e11d48',
}

// Function to generate green color gradient based on palm planting year
function getYearColor(yearStr: string | null): string {
  if (!yearStr) return '#64748b' // default slate
  const year = parseInt(yearStr, 10)
  if (isNaN(year)) return '#64748b'
  
  if (year >= 2020) return '#bbf7d0' // very young - light pastel green
  if (year >= 2015) return '#86efac' // young - light green
  if (year >= 2010) return '#4ade80' // prime young - bright green
  if (year >= 2005) return '#22c55e' // prime mature - solid green
  if (year >= 2000) return '#16a34a' // mature - medium green
  if (year >= 1995) return '#15803d' // old - dark green
  return '#14532d' // very old - deepest green
}

export default function CustomMapViewer() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const geoJsonGroupRef = useRef<L.FeatureGroup | null>(null)

  // Data states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rawData, setRawData] = useState<GeoJsonData | null>(null)

  // Interactive controls state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDivisi, setSelectedDivisi] = useState('all')
  const [selectedEstate, setSelectedEstate] = useState('all')
  const [selectedTahunTanam, setSelectedTahunTanam] = useState('all')
  const [colorMode, setColorMode] = useState<ColorMode>('keterangan') // Default to detailed child colors
  const [basemap, setBasemap] = useState<BasemapType>('arcgis_sat')
  
  // Selection states
  const [hoveredProperties, setHoveredProperties] = useState<FeatureProperty | null>(null)
  const [pinnedProperties, setPinnedProperties] = useState<FeatureProperty | null>(null)

  // Click legend highlight state
  const [highlightedType, setHighlightedType] = useState<HighlightState | null>(null)

  // Sidebar Tab state
  const [activeTab, setActiveTab] = useState<TabType>('ket_ast') // Default to classification

  // Sidebar accordion expansion state
  const [expandedParents, setExpandedParents] = useState<Record<string, boolean>>({
    'Bangunan/Pabrik (Building/Mill)': true, // Open buildings by default to show school/mosque/emplasemen
  })

  // Tile layers refs to toggle
  const tileLayersRef = useRef<Record<BasemapType, L.TileLayer | null>>({
    arcgis_sat: null,
    arcgis_street: null,
    osm: null,
  })

  // 1. Fetch raw map data
  useEffect(() => {
    fetch('/api/map-data')
      .then((res) => {
        if (!res.ok) throw new Error('Gagal mengambil data peta dari server.')
        return res.json()
      })
      .then((json) => {
        const geojson = json.data || json
        if (geojson && geojson.type === 'FeatureCollection') {
          setRawData(geojson)
        } else {
          throw new Error('Format berkas peta JSON tidak valid.')
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError(err.message || 'Terjadi kesalahan saat memuat peta.')
        setLoading(false)
      })
  }, [])

  // 2. Initialize Leaflet Map (Run once on client)
  useEffect(() => {
    const container = mapContainerRef.current
    if (!container || mapInstanceRef.current) return

    const map = L.map(container, {
      zoomControl: true,
      minZoom: 2,
      maxZoom: 18,
    })
    mapInstanceRef.current = map

    tileLayersRef.current.arcgis_sat = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { attribution: 'Esri, Maxar, Earthstar Geographics' }
    )
    tileLayersRef.current.arcgis_street = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      { attribution: 'Esri, DeLorme, HERE' }
    )
    tileLayersRef.current.osm = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: '&copy; OpenStreetMap contributors' }
    )

    tileLayersRef.current.arcgis_sat.addTo(map)

    const geoJsonGroup = L.featureGroup().addTo(map)
    geoJsonGroupRef.current = geoJsonGroup

    return () => {
      map.remove()
      mapInstanceRef.current = null
      geoJsonGroupRef.current = null
    }
  }, [])

  // 3. Basemap switcher effect
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    Object.values(tileLayersRef.current).forEach((layer) => {
      if (layer && map.hasLayer(layer)) {
        map.removeLayer(layer)
      }
    })

    const activeLayer = tileLayersRef.current[basemap]
    if (activeLayer) {
      activeLayer.addTo(map)
    }
  }, [basemap])

  // 4. Generate unique filter options from raw data
  const filterOptions = useMemo(() => {
    if (!rawData) return { divisi: [], estates: [], tahunTanam: [] }

    const divisiSet = new Set<string>()
    const estateSet = new Set<string>()
    const tahunTanamSet = new Set<string>()

    rawData.features.forEach((f) => {
      if (f.properties.divisi) divisiSet.add(f.properties.divisi)
      if (f.properties.estate) estateSet.add(f.properties.estate)
      if (f.properties.thn_tanam) tahunTanamSet.add(f.properties.thn_tanam)
    })

    return {
      divisi: Array.from(divisiSet).sort(),
      estates: Array.from(estateSet).sort(),
      tahunTanam: Array.from(tahunTanamSet).sort((a, b) => b.localeCompare(a)),
    }
  }, [rawData])

  // 5. Apply filters to compute active features
  const filteredFeatures = useMemo(() => {
    if (!rawData) return []

    return rawData.features.filter((feature) => {
      const p = feature.properties

      // Search match
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const blokMatch = p.blok?.toLowerCase().includes(query) || false
        const namaBlMatch = p.nama_bl?.toLowerCase().includes(query) || false
        const komplekMatch = p.komplek?.toLowerCase().includes(query) || false
        if (!blokMatch && !namaBlMatch && !komplekMatch) return false
      }

      // Divisi filter
      if (selectedDivisi !== 'all' && p.divisi !== selectedDivisi) return false

      // Estate filter
      if (selectedEstate !== 'all' && p.estate !== selectedEstate) return false

      // Tahun tanam filter
      if (selectedTahunTanam !== 'all' && p.thn_tanam !== selectedTahunTanam) return false

      return true
    })
  }, [rawData, searchQuery, selectedDivisi, selectedEstate, selectedTahunTanam])

  // Helper to color code polygons dynamically
  const getFeatureColor = (properties: FeatureProperty) => {
    switch (colorMode) {
      case 'divisi':
        const div = properties.divisi || ''
        return DIVISI_COLORS[div] || '#808080'
      case 'thn_tanam':
        return getYearColor(properties.thn_tanam)
      case 'ket_ast':
        const ket = properties.ket_ast || ''
        return KET_AST_COLORS[ket] || '#808080'
      case 'keterangan':
        const k = properties.keterangan || ''
        return KETERANGAN_COLORS[k] || '#808080'
      case 'uniform':
      default:
        return '#3b82f6'
    }
  }

  // Helper to check if a feature matches the current highlight
  const isFeatureHighlighted = (properties: FeatureProperty) => {
    if (!highlightedType) return true // If no highlight, draw all normally

    if (highlightedType.type === 'parent') {
      return properties.ket_ast === highlightedType.value
    } else {
      return properties.keterangan === highlightedType.value
    }
  }

  // 6. Draw Polygons on Map
  useEffect(() => {
    const map = mapInstanceRef.current
    const group = geoJsonGroupRef.current
    if (!map || !group || !rawData) return

    // Clear previous layers
    group.clearLayers()

    if (filteredFeatures.length === 0) return

    const geoJsonLayer = L.geoJSON(filteredFeatures as any, {
      style: (feature) => {
        const p = feature?.properties as FeatureProperty
        const color = getFeatureColor(p)
        const isPinned = pinnedProperties && pinnedProperties.blok === p.blok
        const matchesHighlight = isFeatureHighlighted(p)

        if (highlightedType) {
          // If highlight mode is active
          if (matchesHighlight) {
            return {
              color: '#f59e0b', // Highlight border
              weight: isPinned ? 4 : 2.5,
              opacity: 1,
              fillColor: color,
              fillOpacity: 0.8, // Make highlighted stand out strongly
            }
          } else {
            // Dim out non-matching polygons
            return {
              color: '#cbd5e1',
              weight: 0.5,
              opacity: 0.15,
              fillColor: '#64748b',
              fillOpacity: 0.03, // Barely visible
            }
          }
        }

        // Standard style
        return {
          color: isPinned ? '#f59e0b' : '#ffffff',
          weight: isPinned ? 3.5 : 1,
          opacity: 0.95,
          fillColor: color,
          fillOpacity: 0.35,
        }
      },
      onEachFeature: (feature, layer) => {
        const p = feature.properties as FeatureProperty

        layer.on({
          mouseover: (e) => {
            const l = e.target as L.Path
            setHoveredProperties(p)
            
            const isPinned = pinnedProperties && pinnedProperties.blok === p.blok
            const matchesHighlight = isFeatureHighlighted(p)

            if (highlightedType && !matchesHighlight) return // Ignore hover effect on dimmed polygons

            l.setStyle({
              color: '#f59e0b',
              weight: isPinned ? 4 : 2.5,
              fillOpacity: highlightedType ? 0.9 : 0.6,
            })
          },
          mouseout: (e) => {
            const l = e.target as L.Path
            setHoveredProperties(null)
            
            const isPinned = pinnedProperties && pinnedProperties.blok === p.blok
            const matchesHighlight = isFeatureHighlighted(p)

            if (highlightedType) {
              if (matchesHighlight) {
                l.setStyle({
                  color: '#f59e0b',
                  weight: isPinned ? 4 : 2.5,
                  fillOpacity: 0.8,
                })
              } else {
                l.setStyle({
                  color: '#cbd5e1',
                  weight: 0.5,
                  fillOpacity: 0.03,
                })
              }
            } else {
              l.setStyle({
                color: isPinned ? '#f59e0b' : '#ffffff',
                weight: isPinned ? 3.5 : 1,
                fillOpacity: 0.35,
              })
            }
          },
          click: (e) => {
            const matchesHighlight = isFeatureHighlighted(p)
            if (highlightedType && !matchesHighlight) return // Prevent clicking dimmed elements
            
            setPinnedProperties((prev) => {
              if (prev && prev.blok === p.blok) return null
              return p
            })
            L.DomEvent.stopPropagation(e)
          },
        })

        layer.bindTooltip(`<b>Blok ${p.blok || '-'}</b><br/>${p.keterangan || p.divisi || '-'}`, {
          direction: 'center',
          className: 'block-map-tooltip',
          permanent: false,
          sticky: true,
          opacity: 0.9,
        })
      },
    })

    group.addLayer(geoJsonLayer)

    // Fit map bounds to polygons if this is initial load, or if features changed
    const bounds = group.getBounds()
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [30, 30] })
    }
  }, [filteredFeatures, colorMode, pinnedProperties, rawData, highlightedType])

  // Deselect pin when clicking empty space on map
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    const handleMapClick = () => {
      setPinnedProperties(null)
    }

    map.on('click', handleMapClick)
    return () => {
      map.off('click', handleMapClick)
    }
  }, [])

  // 7. Calculate Aggregates for Sidebar Dashboard
  const stats = useMemo(() => {
    let totalArea = 0
    let totalBlocks = filteredFeatures.length

    filteredFeatures.forEach((f) => {
      totalArea += f.properties.hectare || 0
    })

    return {
      totalBlocks,
      totalArea: parseFloat(totalArea.toFixed(2)),
      avgHectare: totalBlocks > 0 ? parseFloat((totalArea / totalBlocks).toFixed(2)) : 0,
    }
  }, [filteredFeatures])

  // Toggle highlight logic
  const toggleHighlight = (type: 'parent' | 'child', value: string) => {
    setHighlightedType((prev) => {
      if (prev && prev.type === type && prev.value === value) {
        return null // Turn off if clicked same item
      }
      return { type, value }
    })
  }

  // Toggle parent accordion expand state
  const toggleParentExpand = (parentName: string) => {
    setExpandedParents((prev) => ({
      ...prev,
      [parentName]: !prev[parentName],
    }))
  }

  // Export active filtered features' classification summary to CSV
  const exportToCSV = () => {
    const aggStats: Record<string, { parent: string; count: number; area: number }> = {}
    
    filteredFeatures.forEach(f => {
      const p = f.properties
      const parent = p.ket_ast || 'Lain-lain'
      const child = p.keterangan || 'Lain-lain'
      const ha = p.hectare || 0
      
      if (!aggStats[child]) {
        aggStats[child] = {
          parent: parent,
          count: 0,
          area: 0
        }
      }
      aggStats[child].count += 1
      aggStats[child].area += ha
    })
    
    const rows = Object.entries(aggStats).map(([childName, val]) => ({
      child: childName,
      parent: val.parent,
      count: val.count,
      area: parseFloat(val.area.toFixed(4))
    })).sort((a, b) => b.area - a.area)
    
    let csvContent = '\uFEFF' // UTF-8 BOM
    csvContent += '"No","Kategori Induk (Parent)","Nama Atribut (Child)","Jumlah Blok","Total Luas (Ha)"\n'
    
    rows.forEach((row, i) => {
      csvContent += `${i + 1},"${row.parent.replace(/"/g, '""')}","${row.child.replace(/"/g, '""')}",${row.count},${row.area}\n`
    })
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    
    let filename = 'Rangkuman_Atribut_Peta_LPYE'
    if (selectedDivisi !== 'all') filename += `_${selectedDivisi.replace(/\s+/g, '_')}`
    if (selectedEstate !== 'all') filename += `_${selectedEstate.replace(/\s+/g, '_')}`
    if (selectedTahunTanam !== 'all') filename += `_Tanam_${selectedTahunTanam}`
    filename += '.csv'
    
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 8. Calculate Tabular Summaries with Nested Drilldowns
  const summaries = useMemo(() => {
    const divisiAgg: Record<string, { blocks: number; area: number }> = {}
    const tahunAgg: Record<string, { blocks: number; area: number }> = {}
    const ketAgg: Record<string, { blocks: number; area: number }> = {}

    let maxDivisiArea = 0
    let maxTahunArea = 0
    let maxKetArea = 0

    // First pass to aggregate parent counts
    filteredFeatures.forEach((f) => {
      const p = f.properties
      const ha = p.hectare || 0

      // Divisi
      const div = p.divisi || 'Tanpa Divisi'
      if (!divisiAgg[div]) divisiAgg[div] = { blocks: 0, area: 0 }
      divisiAgg[div].blocks += 1
      divisiAgg[div].area += ha

      // Tahun Tanam
      const thn = p.thn_tanam || 'Belum Ditanam'
      if (!tahunAgg[thn]) tahunAgg[thn] = { blocks: 0, area: 0 }
      tahunAgg[thn].blocks += 1
      tahunAgg[thn].area += ha

      // Classification Parent (ket_ast)
      const ket = p.ket_ast || 'Lain-lain'
      if (!ketAgg[ket]) ketAgg[ket] = { blocks: 0, area: 0 }
      ketAgg[ket].blocks += 1
      ketAgg[ket].area += ha
    })

    Object.values(divisiAgg).forEach((v) => { if (v.area > maxDivisiArea) maxDivisiArea = v.area })
    Object.values(tahunAgg).forEach((v) => { if (v.area > maxTahunArea) maxTahunArea = v.area })
    Object.values(ketAgg).forEach((v) => { if (v.area > maxKetArea) maxKetArea = v.area })

    // Generate divisi list
    const divisiList = Object.entries(divisiAgg)
      .map(([name, val]) => ({
        name,
        blocks: val.blocks,
        area: parseFloat(val.area.toFixed(2)),
        percent: maxDivisiArea > 0 ? (val.area / maxDivisiArea) * 100 : 0
      }))
      .sort((a, b) => b.area - a.area)

    // Generate tahun list
    const tahunList = Object.entries(tahunAgg)
      .map(([name, val]) => ({
        name,
        blocks: val.blocks,
        area: parseFloat(val.area.toFixed(2)),
        percent: maxTahunArea > 0 ? (val.area / maxTahunArea) * 100 : 0
      }))
      .sort((a, b) => b.name.localeCompare(a.name))

    // Generate nested parent/child classification list (DRILLDOWN ENGINE)
    const classificationList = Object.entries(ketAgg)
      .map(([parentName, val]) => {
        // Collect and aggregate children for this parent
        const childrenAgg: Record<string, { blocks: number; area: number }> = {}
        let maxChildArea = 0

        filteredFeatures.forEach((f) => {
          if (f.properties.ket_ast === parentName) {
            const childName = f.properties.keterangan || 'Lain-lain'
            if (!childrenAgg[childName]) childrenAgg[childName] = { blocks: 0, area: 0 }
            childrenAgg[childName].blocks += 1
            childrenAgg[childName].area += f.properties.hectare || 0
          }
        })

        Object.values(childrenAgg).forEach((c) => {
          if (c.area > maxChildArea) maxChildArea = c.area
        })

        const children = Object.entries(childrenAgg)
          .map(([childName, cVal]) => ({
            name: childName,
            blocks: cVal.blocks,
            area: parseFloat(cVal.area.toFixed(2)),
            percent: maxChildArea > 0 ? (cVal.area / maxChildArea) * 100 : 0,
          }))
          .sort((a, b) => b.area - a.area)

        return {
          name: parentName,
          blocks: val.blocks,
          area: parseFloat(val.area.toFixed(2)),
          percent: maxKetArea > 0 ? (val.area / maxKetArea) * 100 : 0,
          children,
        }
      })
      .sort((a, b) => b.area - a.area)

    return {
      divisiList,
      tahunList,
      classificationList,
    }
  }, [filteredFeatures])

  // Get active selected object attributes to show
  const activeDetailProperties = pinnedProperties || hoveredProperties

  return (
    <div className="map-dashboard-container">
      {/* Loading overlay */}
      {loading && (
        <div className="map-loading-overlay">
          <div className="map-spinner"></div>
          <div className="map-loading-text">Memuat Data Spasial Blok LPYE...</div>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="map-loading-overlay" style={{ color: 'var(--red)' }}>
          <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div className="map-loading-text" style={{ marginTop: '8px' }}>{error}</div>
        </div>
      )}

      {/* Map Section */}
      <div className="map-canvas-container">
        {/* Floating search and filter drawer on top of map */}
        <div className="map-floating-controls">
          {/* Search Card */}
          <div className="map-control-card">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input
              type="text"
              placeholder="Cari nama/kode blok..."
              className="map-control-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          {/* Filters Card */}
          <div className="map-control-card">
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>FILTER:</span>
            
            {/* Divisi Select */}
            <select
              className="map-control-select"
              value={selectedDivisi}
              onChange={(e) => setSelectedDivisi(e.target.value)}
            >
              <option value="all">Semua Divisi</option>
              {filterOptions.divisi.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            
            <div className="map-control-divider"></div>

            {/* Estate Select */}
            <select
              className="map-control-select"
              value={selectedEstate}
              onChange={(e) => setSelectedEstate(e.target.value)}
            >
              <option value="all">Semua Estate</option>
              {filterOptions.estates.map((es) => (
                <option key={es} value={es}>{es}</option>
              ))}
            </select>

            <div className="map-control-divider"></div>

            {/* Tahun Tanam Select */}
            <select
              className="map-control-select"
              value={selectedTahunTanam}
              onChange={(e) => setSelectedTahunTanam(e.target.value)}
            >
              <option value="all">Semua Tahun Tanam</option>
              {filterOptions.tahunTanam.map((yr) => (
                <option key={yr} value={yr}>Tanam {yr}</option>
              ))}
            </select>
          </div>

          {/* Color Mode / Layer Control Card */}
          <div className="map-control-card">
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>TEMA:</span>
            
            <select
              className="map-control-select"
              value={colorMode}
              onChange={(e) => setColorMode(e.target.value as ColorMode)}
            >
              <option value="uniform">Warna Seragam</option>
              <option value="divisi">Pewarnaan per Divisi</option>
              <option value="thn_tanam">Pewarnaan per Tahun Tanam</option>
              <option value="ket_ast">Pewarnaan per Kategori Aset</option>
              <option value="keterangan">Pewarnaan Detail Aset (Drilldown)</option>
            </select>

            <div className="map-control-divider"></div>

            <select
              className="map-control-select"
              value={basemap}
              onChange={(e) => setBasemap(e.target.value as BasemapType)}
            >
              <option value="arcgis_sat">ArcGIS Satelit</option>
              <option value="arcgis_street">ArcGIS Jalanan</option>
              <option value="osm">OpenStreetMap</option>
            </select>
          </div>
        </div>

        {/* Leaflet instance holder */}
        <div ref={mapContainerRef} className="map-canvas" />

        {/* Dynamic Legend floating in bottom-left */}
        <div className="leaflet-bottom leaflet-left" style={{ bottom: '24px', left: '12px', pointerEvents: 'auto' }}>
          {colorMode !== 'uniform' && (
            <div className="custom-map-legend" style={{ minWidth: '190px' }}>
              <div className="legend-title">
                Legenda: {
                  colorMode === 'divisi' ? 'Divisi Blok' : 
                  colorMode === 'thn_tanam' ? 'Tahun Tanam' : 
                  colorMode === 'ket_ast' ? 'Kategori Aset (Parent)' : 'Detail Aset (Child)'
                }
              </div>
              <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                {colorMode === 'divisi' &&
                  Object.entries(DIVISI_COLORS).map(([name, color]) => (
                    <div key={name} className="legend-item">
                      <div className="legend-color-box" style={{ backgroundColor: color }} />
                      <span>{name}</span>
                    </div>
                  ))
                }
                {colorMode === 'ket_ast' &&
                  Object.entries(KET_AST_COLORS).map(([name, color]) => {
                    const isHighlighted = highlightedType?.type === 'parent' && highlightedType.value === name
                    return (
                      <div
                        key={name}
                        className={`legend-item clickable ${isHighlighted ? 'highlight-active' : ''}`}
                        onClick={() => toggleHighlight('parent', name)}
                        title="Klik untuk menyoroti jenis aset ini di peta"
                        style={{ padding: '2px 4px', borderRadius: '3px' }}
                      >
                        <div className="legend-color-box" style={{ backgroundColor: color }} />
                        <span>{name}</span>
                        {isHighlighted && <span style={{ marginLeft: 'auto', fontSize: '9px' }}>📌</span>}
                      </div>
                    )
                  })
                }
                {colorMode === 'keterangan' &&
                  Object.entries(KETERANGAN_COLORS).map(([name, color]) => {
                    const isHighlighted = highlightedType?.type === 'child' && highlightedType.value === name
                    return (
                      <div
                        key={name}
                        className={`legend-item clickable ${isHighlighted ? 'highlight-active' : ''}`}
                        onClick={() => toggleHighlight('child', name)}
                        title="Klik untuk menyoroti detail aset ini di peta"
                        style={{ padding: '2px 4px', borderRadius: '3px' }}
                      >
                        <div className="legend-color-box" style={{ backgroundColor: color }} />
                        <span style={{ fontSize: '10px' }}>{name}</span>
                        {isHighlighted && <span style={{ marginLeft: 'auto', fontSize: '9px' }}>📌</span>}
                      </div>
                    )
                  })
                }
                {colorMode === 'thn_tanam' && (
                  <>
                    <div className="legend-item">
                      <div className="legend-color-box" style={{ backgroundColor: getYearColor('2022') }} />
                      <span>&gt;= 2020 (Sangat Muda)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color-box" style={{ backgroundColor: getYearColor('2017') }} />
                      <span>2015 - 2019 (Muda)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color-box" style={{ backgroundColor: getYearColor('2012') }} />
                      <span>2010 - 2014 (Dewasa Awal)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color-box" style={{ backgroundColor: getYearColor('2007') }} />
                      <span>2005 - 2009 (Produktif Maks)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color-box" style={{ backgroundColor: getYearColor('2002') }} />
                      <span>2000 - 2004 (Dewasa)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color-box" style={{ backgroundColor: getYearColor('1997') }} />
                      <span>1995 - 1999 (Tua)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color-box" style={{ backgroundColor: getYearColor('1990') }} />
                      <span>&lt; 1995 (Sangat Tua)</span>
                    </div>
                  </>
                )}
              </div>
              {(colorMode === 'ket_ast' || colorMode === 'keterangan') && (
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '4px', marginTop: '6px', textAlign: 'center' }}>
                  Tips: Klik elemen legenda untuk menyoroti peta
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Dashboard Summary Panel */}
      <div className="map-sidebar-panel">
        <div className="map-sidebar-header">
          <div>
            <h3 className="map-sidebar-title">Rangkuman Wilayah</h3>
            <div className="map-sidebar-subtitle">
              Menampilkan {stats.totalBlocks} blok terfilter
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <span style={{ fontSize: '10px', background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px', fontWeight: 600, color: 'var(--text-muted)' }}>
              LPYE
            </span>
            <button
              onClick={exportToCSV}
              type="button"
              style={{
                fontSize: '11px',
                background: '#16a34a',
                color: 'white',
                border: 'none',
                padding: '3px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
              title="Unduh tabel klasifikasi terfilter ke format Excel (CSV)"
            >
              📥 Export
            </button>
          </div>
        </div>

        <div className="map-sidebar-content">
          {/* Active Highlight Banner Alert */}
          {highlightedType && (
            <div className="map-highlight-banner">
              <div>
                <span>Menyoroti {highlightedType.type === 'parent' ? 'Kategori' : 'Detail'}: </span>
                <span style={{ textDecoration: 'underline' }}>{highlightedType.value}</span>
              </div>
              <button
                type="button"
                className="map-highlight-clear-btn"
                onClick={() => setHighlightedType(null)}
              >
                Clear
              </button>
            </div>
          )}

          {/* Real-time calculated aggregate cards */}
          <div className="map-stats-grid">
            <div className="map-stat-card full-width">
              <span className="map-stat-label">Total Area Hektare</span>
              <span className="map-stat-val">{stats.totalArea.toLocaleString('id-ID')} Ha</span>
            </div>
            <div className="map-stat-card">
              <span className="map-stat-label">Jumlah Blok</span>
              <span className="map-stat-val">{stats.totalBlocks}</span>
            </div>
            <div className="map-stat-card">
              <span className="map-stat-label">Rata-rata Blok</span>
              <span className="map-stat-val">{stats.avgHectare} Ha</span>
            </div>
          </div>

          {/* Active selection detailed table */}
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 600, color: 'var(--text)' }}>
              {pinnedProperties ? '📌 Pin Detail Blok' : '🔍 Sorot Detail Blok'}
            </h4>
            
            {activeDetailProperties ? (
              <div className={`map-details-card ${pinnedProperties ? 'active' : ''}`}>
                <div className="map-details-header">
                  <span>Blok: {activeDetailProperties.blok || '-'}</span>
                  {activeDetailProperties.keterangan && (
                    <span className={`map-details-badge ${activeDetailProperties.keterangan.includes('Rawan') ? 'vuln' : ''}`}>
                      {activeDetailProperties.keterangan}
                    </span>
                  )}
                </div>
                <div className="map-details-body">
                  <div className="map-details-grid">
                    <div className="map-details-item">
                      <span className="map-details-label">Nama Lengkap</span>
                      <span className="map-details-value" title={activeDetailProperties.nama_bl || ''}>
                        {activeDetailProperties.nama_bl || '-'}
                      </span>
                    </div>
                    <div className="map-details-item">
                      <span className="map-details-label">Estate</span>
                      <span className="map-details-value">{activeDetailProperties.estate || '-'}</span>
                    </div>
                    <div className="map-details-item">
                      <span className="map-details-label">Divisi</span>
                      <span className="map-details-value">{activeDetailProperties.divisi || '-'}</span>
                    </div>
                    <div className="map-details-item">
                      <span className="map-details-label">Luas Hektare</span>
                      <span className="map-details-value">
                        {activeDetailProperties.hectare ? `${activeDetailProperties.hectare.toFixed(4)} Ha` : '-'}
                      </span>
                    </div>
                    <div className="map-details-item">
                      <span className="map-details-label">Tahun Tanam</span>
                      <span className="map-details-value">
                        {activeDetailProperties.thn_tanam ? `Tanam ${activeDetailProperties.thn_tanam}` : 'Belum Tanam'}
                      </span>
                    </div>
                    <div className="map-details-item">
                      <span className="map-details-label">Komplek</span>
                      <span className="map-details-value" title={activeDetailProperties.komplek || ''}>
                        {activeDetailProperties.komplek || '-'}
                      </span>
                    </div>
                    <div className="map-details-item" style={{ gridColumn: 'span 2' }}>
                      <span className="map-details-label">Klasifikasi Aset (Detail)</span>
                      <span className="map-details-value" title={activeDetailProperties.keterangan || ''}>
                        {activeDetailProperties.keterangan || '-'}
                      </span>
                    </div>
                  </div>
                  {pinnedProperties && (
                    <button
                      type="button"
                      style={{
                        marginTop: '12px',
                        width: '100%',
                        background: '#f1f5f9',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                        padding: '4px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                      onClick={() => setPinnedProperties(null)}
                    >
                      Batal Semat (Unpin)
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="map-details-card">
                <div className="map-details-empty">
                  Dekatkan kursor atau klik salah satu blok pada peta untuk menampilkan semua atribut secara lengkap di sini.
                </div>
              </div>
            )}
          </div>

          {/* Aggregated progress bars lists tabs */}
          <div className="map-tabs-container">
            <div className="map-tabs-nav">
              <button
                type="button"
                className={`map-tab-btn ${activeTab === 'ket_ast' ? 'active' : ''}`}
                onClick={() => setActiveTab('ket_ast')}
              >
                Klasifikasi
              </button>
              <button
                type="button"
                className={`map-tab-btn ${activeTab === 'divisi' ? 'active' : ''}`}
                onClick={() => setActiveTab('divisi')}
              >
                Divisi
              </button>
              <button
                type="button"
                className={`map-tab-btn ${activeTab === 'thn_tanam' ? 'active' : ''}`}
                onClick={() => setActiveTab('thn_tanam')}
              >
                Tahun Tanam
              </button>
            </div>

            <div style={{ marginTop: '4px' }}>
              {/* Classification Tab Content (DRILLDOWN ACCORDION ENGINE) */}
              {activeTab === 'ket_ast' && (
                <div className="map-agg-list">
                  {summaries.classificationList.length > 0 ? (
                    summaries.classificationList.map((parent) => {
                      const isExpanded = !!expandedParents[parent.name]
                      const isParentHighlighted = highlightedType?.type === 'parent' && highlightedType.value === parent.name
                      
                      return (
                        <div
                          className={`map-agg-accordion ${isExpanded ? 'expanded' : ''} ${isParentHighlighted ? 'highlight-active' : ''}`}
                          key={parent.name}
                        >
                          {/* Accordion Trigger Header */}
                          <div className="map-agg-accordion-trigger">
                            <div className="map-agg-accordion-header-row">
                              {/* Parent name and highlight trigger */}
                              <div
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleHighlight('parent', parent.name)
                                }}
                                title="Klik teks/warna untuk menyorot seluruh kategori ini di peta"
                              >
                                <span
                                  className="legend-color-box"
                                  style={{
                                    backgroundColor: KET_AST_COLORS[parent.name] || '#64748b',
                                    width: '12px',
                                    height: '12px',
                                    flexShrink: 0
                                  }}
                                />
                                <span style={{ fontWeight: 600, fontSize: '11px', cursor: 'pointer' }}>
                                  {parent.name}
                                </span>
                              </div>

                              {/* Toggle expand chevron */}
                              <div
                                onClick={() => toggleParentExpand(parent.name)}
                                style={{ padding: '2px 6px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                title="Klik untuk expand/collapse detail sub-klasifikasi"
                              >
                                <svg
                                  className="map-agg-accordion-chevron"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                >
                                  <path d="M6 9l6 6 6-6" />
                                </svg>
                              </div>
                            </div>

                            {/* Header Aggregate values */}
                            <div
                              className="map-agg-header"
                              style={{ width: '100%', fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'normal', paddingLeft: '18px' }}
                              onClick={() => toggleParentExpand(parent.name)}
                            >
                              <span>{parent.blocks} blok</span>
                              <span>{parent.area.toLocaleString('id-ID')} Ha</span>
                            </div>

                            {/* Progress bar */}
                            <div className="map-progress-bg" style={{ marginTop: '6px', marginLeft: '18px', width: 'calc(100% - 18px)' }}>
                              <div
                                className="map-progress-bar"
                                style={{
                                  width: `${parent.percent}%`,
                                  backgroundColor: KET_AST_COLORS[parent.name] || '#64748b',
                                }}
                              />
                            </div>
                          </div>

                          {/* Accordion expanded children (Drilldown details) */}
                          <div className="map-agg-accordion-content">
                            {parent.children.map((child) => {
                              const isChildHighlighted = highlightedType?.type === 'child' && highlightedType.value === child.name
                              
                              return (
                                <div
                                  className={`map-drilldown-child-item clickable ${isChildHighlighted ? 'highlight-active-child' : ''}`}
                                  key={child.name}
                                  onClick={() => toggleHighlight('child', child.name)}
                                  title={`Klik untuk menyoroti sub-klasifikasi "${child.name}" di peta`}
                                >
                                  <div className="map-drilldown-child-header">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', maxWidth: '180px' }}>
                                      <span
                                        className="legend-color-box"
                                        style={{
                                          backgroundColor: KETERANGAN_COLORS[child.name] || '#94a3b8',
                                          width: '10px',
                                          height: '10px',
                                          borderRadius: '2px',
                                          flexShrink: 0
                                        }}
                                      />
                                      <span style={{ fontSize: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {child.name}
                                      </span>
                                    </div>
                                    <span className="map-drilldown-child-meta" style={{ flexShrink: 0 }}>
                                      {child.blocks} blok ({child.area.toLocaleString('id-ID')} Ha)
                                    </span>
                                  </div>
                                  <div className="map-progress-bg" style={{ height: '3px', marginLeft: '16px' }}>
                                    <div
                                      className="map-progress-bar"
                                      style={{
                                        width: `${child.percent}%`,
                                        backgroundColor: KETERANGAN_COLORS[child.name] || '#94a3b8',
                                      }}
                                    />
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '11px', padding: '12px 0' }}>
                      Tidak ada data klasifikasi.
                    </div>
                  )}
                </div>
              )}

              {/* Divisi Tab Content */}
              {activeTab === 'divisi' && (
                <div className="map-agg-list">
                  {summaries.divisiList.length > 0 ? (
                    summaries.divisiList.map((item) => (
                      <div className="map-agg-item" key={item.name}>
                        <div className="map-agg-header">
                          <span>{item.name}</span>
                          <span className="map-agg-meta">
                            {item.blocks} blok ({item.area.toLocaleString('id-ID')} Ha)
                          </span>
                        </div>
                        <div className="map-progress-bg">
                          <div
                            className="map-progress-bar"
                            style={{
                              width: `${item.percent}%`,
                              backgroundColor: DIVISI_COLORS[item.name] || '#64748b',
                            }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '11px', padding: '12px 0' }}>
                      Tidak ada data divisi.
                    </div>
                  )}
                </div>
              )}

              {/* Tahun Tanam Tab Content */}
              {activeTab === 'thn_tanam' && (
                <div className="map-agg-list">
                  {summaries.tahunList.length > 0 ? (
                    summaries.tahunList.map((item) => (
                      <div className="map-agg-item" key={item.name}>
                        <div className="map-agg-header">
                          <span>{item.name === 'Belum Ditanam' ? 'Belum Ditanam' : `Tahun ${item.name}`}</span>
                          <span className="map-agg-meta">
                            {item.blocks} blok ({item.area.toLocaleString('id-ID')} Ha)
                          </span>
                        </div>
                        <div className="map-progress-bg">
                          <div
                            className="map-progress-bar"
                            style={{
                              width: `${item.percent}%`,
                              backgroundColor: getYearColor(item.name),
                            }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '11px', padding: '12px 0' }}>
                      Tidak ada data tahun tanam.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
