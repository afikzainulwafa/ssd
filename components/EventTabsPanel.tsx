'use client'
import { Clock, Navigation, Zap } from 'lucide-react'
import EventList from './EventList'
import { EventPanelProps, useEventCategoryState, EventCategory, EVENT_CATEGORIES } from './event-panel-types'

export type { EventCategory as EventTab } from './event-panel-types'

const TAB_ICONS: Record<EventCategory, typeof Clock> = {
  stop: Clock,
  route: Navigation,
  speed: Zap,
}

export default function EventTabsPanel(props: EventPanelProps) {
  const { activeCategory, onCategoryChange } = props
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
    <div className="event-panel-tabs">
      <div className="event-tabs">
        {EVENT_CATEGORIES.map(({ id, short }) => {
          const Icon = TAB_ICONS[id]
          return (
          <button
            key={id}
            type="button"
            className={`event-tab ${category === id ? 'active' : ''}`}
            onClick={() => onCategoryChange?.(id)}
          >
            <Icon size={12} />
            <span>{short}</span>
            <span className={`tab-count ${counts[id] > 0 ? 'has-items' : ''}`}>{counts[id]}</span>
          </button>
          )
        })}
      </div>

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
  )
}
