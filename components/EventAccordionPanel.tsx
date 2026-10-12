'use client'
import { ChevronDown, Clock, Navigation, Zap } from 'lucide-react'
import EventList from './EventList'
import { COMMENT_OPTIONS, getStopEventFlag } from '@/lib/patrol-comment-options'
import {
  EventPanelProps,
  EVENT_CATEGORIES,
  EventCategory,
  PatrolEvent,
  isEventCommented,
} from './event-panel-types'
 
export type { EventCategory as EventTab } from './event-panel-types'
 
const SECTION_ICONS: Record<EventCategory, typeof Clock> = {
  stop: Clock,
  route: Navigation,
  speed: Zap,
}
 
function getSectionData(props: EventPanelProps, id: EventCategory) {
  const events: PatrolEvent[] =
    id === 'stop' ? props.stopEvents :
    id === 'route' ? props.outOfRouteEvents :
    props.speedEvents
 
  const onSelect =
    id === 'stop' ? props.onSelectStop :
    id === 'route' ? props.onSelectRoute :
    props.onSelectSpeed
 
  const onCommentChange =
    id === 'stop' ? props.onStopCommentChange :
    id === 'route' ? props.onRouteCommentChange :
    props.onSpeedCommentChange
 
  const tagClass = id === 'stop' ? 'stop' : id === 'route' ? 'route' : 'speed'
 
  return {
    events,
    commentTree: COMMENT_OPTIONS[id],
    onSelect,
    onCommentChange,
    tagClass,
    commented: events.filter((e) => isEventCommented(e, id)).length,
  }
}
 
export default function EventAccordionPanel(props: EventPanelProps) {
  const { activeCategory, onCategoryChange, readOnly = false } = props
 
  const handleToggle = (id: EventCategory) => {
    if (activeCategory === id) {
      onCategoryChange?.(null)
    } else {
      onCategoryChange?.(id)
    }
  }
 
  return (
    <div className="event-panel-accordion">
      {EVENT_CATEGORIES.map(({ id, label, hint, chipClass }) => {
        const isOpen = activeCategory === id
        const Icon = SECTION_ICONS[id]
        const { events, commentTree, onSelect, onCommentChange, tagClass, commented } =
          getSectionData(props, id)
 
        const flaggedNames = events
          .map((e) => getStopEventFlag(e, id))
          .filter(Boolean) as string[]
        const uniqueFlagged = Array.from(
          new Set(
            flaggedNames.map((f) => f.replace('Overtime ', '').split(' ')[0])
          )
        )
 
        return (
          <div
            key={id}
            className={`event-accordion-item ${chipClass} ${isOpen ? 'open' : ''} ${events.length > 0 ? 'has-events' : ''}`}
          >
            <button
              type="button"
              className={`event-accordion-header ${isOpen ? 'is-open' : ''}`}
              onClick={() => handleToggle(id)}
              aria-expanded={isOpen}
            >
              <span className={`event-accordion-chevron ${isOpen ? 'open' : ''}`}>
                <ChevronDown size={15} />
              </span>
              <span className="event-accordion-icon">
                <Icon size={15} />
              </span>
              <span className="event-accordion-text">
                {id === 'stop' && uniqueFlagged.length > 0 && (
                  <span className="event-accordion-overtime-highlight">
                    ⚠️ Overtime: {uniqueFlagged.join(', ')}
                  </span>
                )}
                <span className="event-accordion-label">{label}</span>
                <span className="event-accordion-hint">
                  {hint}
                  {events.length > 0 && (
                    <span className={`event-accordion-progress ${commented === events.length ? 'complete' : ''}`}>
                      · {commented}/{events.length} dikomentari
                    </span>
                  )}
                </span>
              </span>
              <span className={`event-accordion-count ${events.length > 0 ? 'has-items' : ''}`}>
                {events.length}
              </span>
            </button>

            {isOpen && (
              <div className="event-accordion-body">
                <div className="event-list-scroll">
                  <EventList
                    events={events}
                    categoryType={id}
                    commentTree={commentTree}
                    selectedId={props.selectedId}
                    tagClass={tagClass}
                    onSelect={onSelect}
                    onCommentChange={onCommentChange}
                    readOnly={readOnly}
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
