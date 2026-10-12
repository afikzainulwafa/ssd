import { PatrolEvent, EventCategory, isEventCommented } from './event-panel-types'
import { getSubOptions } from '@/lib/patrol-comment-options'

type EventTableListProps = {
  events: PatrolEvent[]
  categoryType: EventCategory
  commentTree: Record<string, string[]>
  selectedId: number | null
  tagClass: string
  valueHeader: string
  onSelect: (e: PatrolEvent) => void
  onCommentChange: (id: number, category: string, detail: string) => void
}

export default function EventTableList({
  events,
  categoryType,
  commentTree,
  selectedId,
  tagClass,
  valueHeader,
  onSelect,
  onCommentChange,
}: EventTableListProps) {
  if (events.length === 0) {
    return <div className="event-empty">Tidak ada kejadian pada kategori ini.</div>
  }

  const categories = Object.keys(commentTree)

  return (
    <table className="event-table sticky-head">
      <thead>
        <tr>
          <th>#</th>
          <th className="text-left">Waktu</th>
          <th>{valueHeader}</th>
          <th className="text-left">Komentar</th>
        </tr>
      </thead>
      <tbody>
        {events.map((e) => {
          const commented = isEventCommented(e, categoryType)
          const subOptions = e.commentCategory ? getSubOptions(categoryType, e.commentCategory) : []
          const showSub = subOptions.length > 0

          return (
            <tr
              key={e.id}
              className={`${selectedId === e.id ? 'selected' : ''} ${commented ? 'is-commented' : 'needs-comment'}`}
              onClick={() => onSelect(e)}
            >
              <td className="cell-no">#{e.id}</td>
              <td className="text-left cell-time">{e.time}</td>
              <td>
                <span className={`event-tag ${tagClass}`}>
                  {e.duration || e.distance || '—'}
                </span>
              </td>
              <td className="text-left cell-comment" onClick={(ev) => ev.stopPropagation()}>
                <div className={`event-comment-cascade ${showSub ? 'has-sub' : 'single'}`}>
                  <select
                    value={e.commentCategory ?? ''}
                    onChange={(ev) => {
                      ev.stopPropagation()
                      onCommentChange(e.id, ev.target.value, '')
                    }}
                    className="form-select form-select-sm event-table-select"
                  >
                    <option value="">Pilih...</option>
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
                      className="form-select form-select-sm event-table-select"
                    >
                      <option value="">Detail...</option>
                      {subOptions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  )}
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
