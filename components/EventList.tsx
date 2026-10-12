import { PatrolEvent, EventCategory, isEventCommented } from './event-panel-types'
import { getSubOptions, getStopEventFlag } from '@/lib/patrol-comment-options'
import { getShiftFromTimeRange, formatShiftLabel } from '@/lib/patrol-shift'
 
type EventListProps = {
  events: PatrolEvent[]
  categoryType: EventCategory
  commentTree: Record<string, string[]>
  selectedId: number | null
  tagClass: string
  onSelect: (e: PatrolEvent) => void
  onCommentChange: (id: number, category: string, detail: string) => void
  readOnly?: boolean
}
 
export default function EventList({
  events,
  categoryType,
  commentTree,
  selectedId,
  tagClass,
  onSelect,
  onCommentChange,
  readOnly = false,
}: EventListProps) {
  if (events.length === 0) {
    return <div className="event-empty">Tidak ada kejadian pada kategori ini.</div>
  }
 
  const categories = Object.keys(commentTree)
 
  return (
    <>
      {events.map((e) => {
        const commented = isEventCommented(e, categoryType)
        const subOptions = e.commentCategory ? getSubOptions(categoryType, e.commentCategory) : []
        const showSub = subOptions.length > 0
        const shiftLabel = formatShiftLabel(getShiftFromTimeRange(e.time))
        const flagMessage = getStopEventFlag(e, categoryType)
 
        return (
          <div
            key={e.id}
            className={`event-row ${selectedId === e.id ? 'selected' : ''} ${commented ? 'is-commented' : 'needs-comment'}`}
            onClick={() => onSelect(e)}
          >
            <div className="event-row-top">
              <span className="event-row-no">#{e.id}</span>
              {e.blockPair && (
                <span className="event-row-block" title="Koridor antar blok">{e.blockPair}</span>
              )}
              {categoryType === 'speed' ? (
                <>
                  <span className={`event-tag ${tagClass}`}>{e.distance || '—'}</span>
                  {e.speedKm && <span className="event-tag speed-dist">{e.speedKm}</span>}
                </>
              ) : (
                <span className={`event-tag ${tagClass}`}>
                  {e.duration || e.distance || '—'}
                </span>
              )}
              {commented ? (
                <span className="event-row-done" title="Sudah dikomentari">✓</span>
              ) : (
                <span className="event-row-pending" title="Belum dikomentari">!</span>
              )}
              {flagMessage && (
                <span className="event-row-flag" title={`Durasi tidak wajar: ${flagMessage}`}>
                  ⚠️ {flagMessage}
                </span>
              )}
            </div>
 
            <div className="event-row-meta">
              <span className="event-row-shift">{shiftLabel}</span>
              <span className="event-row-time">{e.time}</span>
              {readOnly && (
                commented ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                    <span className="event-row-comment-readonly">
                      {e.commentDetail || e.commentCategory || e.comment}
                    </span>
                    {flagMessage && (
                      <span className="event-row-flag-inline" style={{ fontSize: '10px', fontWeight: 700, color: '#d84315', background: '#fbe9e7', padding: '2px 6px', borderRadius: '4px', width: 'fit-content' }}>
                        ⚠️ {flagMessage}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="event-row-comment-readonly muted">Belum ada komentar PIC</span>
                )
              )}
            </div>

            {!readOnly && (
              <div
                className={`event-comment-cascade ${showSub ? 'has-sub' : 'single'}`}
                onClick={(ev) => ev.stopPropagation()}
              >
                <select
                  value={e.commentCategory ?? ''}
                  onChange={(ev) => {
                    ev.stopPropagation()
                    const cat = ev.target.value
                    onCommentChange(e.id, cat, '')
                  }}
                  className="form-select form-select-sm"
                >
                  <option value="">Pilih alasan...</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {showSub && (
                  <select
                    value={e.commentDetail ?? ''}
                    onChange={(ev) => {
                      ev.stopPropagation()
                      onCommentChange(e.id, e.commentCategory ?? '', ev.target.value)
                    }}
                    className="form-select form-select-sm"
                  >
                    <option value="">Pilih detail...</option>
                    {subOptions.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
