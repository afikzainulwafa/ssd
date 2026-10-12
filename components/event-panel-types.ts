import { COMMENT_OPTIONS, categoryNeedsSub } from '@/lib/patrol-comment-options'

export type EventCategory = 'stop' | 'route' | 'speed'

export type PatrolEvent = {
  id: number
  time: string
  comment: string
  commentCategory?: string
  commentDetail?: string
  lat: number
  lng: number
  duration?: string
  distance?: string
  /** Total jarak ditempuh selama kejadian speeding */
  speedKm?: string
  width?: number
  height?: number
  track?: [number, number][]
  blockPair?: string
}

export function isEventCommented(e: PatrolEvent, categoryType: EventCategory): boolean {
  if (!e.commentCategory) return false
  if (categoryNeedsSub(categoryType, e.commentCategory)) {
    return Boolean(e.commentDetail)
  }
  return true
}

export type EventPanelProps = {
  stopEvents: PatrolEvent[]
  outOfRouteEvents: PatrolEvent[]
  speedEvents: PatrolEvent[]
  selectedId: number | null
  activeCategory?: EventCategory | null
  onCategoryChange?: (cat: EventCategory | null) => void
  onSelectStop: (e: PatrolEvent) => void
  onSelectRoute: (e: PatrolEvent) => void
  onSelectSpeed: (e: PatrolEvent) => void
  onStopCommentChange: (id: number, category: string, detail: string) => void
  onRouteCommentChange: (id: number, category: string, detail: string) => void
  onSpeedCommentChange: (id: number, category: string, detail: string) => void
  readOnly?: boolean
}

export const EVENT_CATEGORIES: {
  id: EventCategory
  label: string
  short: string
  hint: string
  chipClass: 'tinggi' | 'sedang' | 'rendah'
}[] = [
  { id: 'stop', label: 'Berhenti > 30 min', short: 'Berhenti', hint: 'Durasi berhenti', chipClass: 'tinggi' },
  { id: 'route', label: 'Keluar Rute', short: 'Keluar Rute', hint: 'Keluar jalur rute', chipClass: 'sedang' },
  { id: 'speed', label: 'Kecepatan > 50 km/h', short: 'Kecepatan', hint: 'Melebihi batas', chipClass: 'rendah' },
]

export function useEventCategoryState(
  props: EventPanelProps,
  defaultCategory: EventCategory = 'stop'
) {
  const { activeCategory, onCategoryChange, stopEvents, outOfRouteEvents, speedEvents } = props

  // Caller manages activeCategory via props; helper resolves current data
  const category = activeCategory ?? defaultCategory

  const counts = {
    stop: stopEvents.length,
    route: outOfRouteEvents.length,
    speed: speedEvents.length,
  }

  const events =
    category === 'stop' ? stopEvents :
    category === 'route' ? outOfRouteEvents :
    speedEvents

  const commentTree = COMMENT_OPTIONS[category]

  const onSelect =
    category === 'stop' ? props.onSelectStop :
    category === 'route' ? props.onSelectRoute :
    props.onSelectSpeed

  const onCommentChange =
    category === 'stop' ? props.onStopCommentChange :
    category === 'route' ? props.onRouteCommentChange :
    props.onSpeedCommentChange

  const tagClass =
    category === 'stop' ? 'stop' :
    category === 'route' ? 'route' :
    'speed'

  const meta = EVENT_CATEGORIES.find(c => c.id === category)

  return {
    category,
    setCategory: onCategoryChange,
    counts,
    events,
    commentTree,
    onSelect,
    onCommentChange,
    tagClass,
    meta,
    commented: events.filter((e) => isEventCommented(e, category)).length,
  }
}
