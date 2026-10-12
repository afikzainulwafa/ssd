'use client'
import { ReactNode } from 'react'
import { Clock, Navigation, Zap } from 'lucide-react'
import EventList from './EventList'
import {
  EventPanelProps,
  EVENT_CATEGORIES,
  useEventCategoryState,
  EventCategory,
} from './event-panel-types'

const CHIP_ICONS: Record<EventCategory, typeof Clock> = {
  stop: Clock,
  route: Navigation,
  speed: Zap,
}

type EventChipsPanelProps = EventPanelProps & {
  children: ReactNode
}

export default function EventChipsPanel(props: EventChipsPanelProps) {
  const { children, activeCategory, onCategoryChange } = props
  const {
    category,
    counts,
    events,
    commentTree,
    onSelect,
    onCommentChange,
    tagClass,
    meta,
    commented,
  } = useEventCategoryState(props, 'stop')

  return (
    <div className="event-chips-layout">
      <div className="priority-chips-row">
        {EVENT_CATEGORIES.map(({ id, label, hint, chipClass }) => {
          const Icon = CHIP_ICONS[id]
          const isActive = category === id
          return (
            <button
              key={id}
              type="button"
              className={`priority-chip priority-box ${chipClass} ${isActive ? 'active' : ''}`}
              onClick={() => onCategoryChange?.(id)}
            >
              <div className="priority-left">
                <span className="priority-icon"><Icon size={14} /></span>
                <div className="priority-text">
                  <span className="priority-label">{label}</span>
                  <span className="priority-hint">{hint}</span>
                </div>
              </div>
              <span className="count">{counts[id]}</span>
            </button>
          )
        })}
      </div>

      <div className="grid-map event-chips-grid">
        {children}

        <div className="event-panel-list">
          <div className="event-tab-toolbar">
            <span className="event-tab-title">{meta?.label}</span>
            <span className="event-tab-progress">
              {commented}/{events.length} dikomentari
            </span>
          </div>
          <div className="event-list-scroll">
            <EventList
              events={events}
              categoryType={category}
              commentTree={commentTree}
              selectedId={props.selectedId}
              tagClass={tagClass}
              onSelect={onSelect}
              onCommentChange={onCommentChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
