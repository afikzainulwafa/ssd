import type { PatrolShift } from '@/lib/patrol-shift'

export type PlaybackPoint = { lat: number; lng: number; shift: PatrolShift }

export function buildPlaybackPath(byShift: Record<PatrolShift, [number, number][][]>): PlaybackPoint[] {
  const path: PlaybackPoint[] = []
  ;([1, 2, 3] as PatrolShift[]).forEach((shift) => {
    byShift[shift].forEach((segment) => {
      segment.forEach(([lat, lng], i) => {
        if (i === 0 && path.length > 0) {
          const last = path[path.length - 1]
          if (Math.abs(last.lat - lat) < 1e-8 && Math.abs(last.lng - lng) < 1e-8) return
        }
        path.push({ lat, lng, shift })
      })
    })
  })
  return path
}

export function interpolatePlaybackPath(path: PlaybackPoint[], progress: number): PlaybackPoint {
  if (path.length === 0) return { lat: 0, lng: 0, shift: 1 }
  if (path.length === 1 || progress <= 0) return path[0]
  if (progress >= 1) return path[path.length - 1]

  const scaled = progress * (path.length - 1)
  const idx = Math.floor(scaled)
  const t = scaled - idx
  const a = path[idx]
  const b = path[Math.min(idx + 1, path.length - 1)]
  return {
    lat: a.lat + (b.lat - a.lat) * t,
    lng: a.lng + (b.lng - a.lng) * t,
    shift: a.shift,
  }
}

export function playbackPathSlice(path: PlaybackPoint[], progress: number): [number, number][] {
  if (path.length < 2 || progress <= 0) {
    const p = path[0]
    return p ? [[p.lat, p.lng]] : []
  }
  const scaled = progress * (path.length - 1)
  const idx = Math.floor(scaled)
  const slice: [number, number][] = path.slice(0, idx + 1).map((p) => [p.lat, p.lng])
  const pt = interpolatePlaybackPath(path, progress)
  slice.push([pt.lat, pt.lng])
  return slice
}
