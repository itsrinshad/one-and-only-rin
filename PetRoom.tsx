import { Leo, type Look } from './Leo'
import { BACKGROUNDS } from './petCore'

export type Placed = { code: string; x: number; y: number }
// The room: a background, up to 14 placed items (emoji drawings) and the pet standing in front.
export function PetRoom({ background, items, emojiOf, nameOf, look, variant, mood = 'happy', petName = 'LEO', selected, onSelect, onPick, hidePet, fx = '' }: {
  background?: string; items: Placed[]; emojiOf: (c: string) => string; nameOf?: (c: string) => string; look?: Look; variant?: string; mood?: string; petName?: string
  selected?: number | null; onSelect?: (i: number) => void; onPick?: (x: number, y: number) => void; hidePet?: boolean; fx?: string
}) {
  const edit = !!onSelect
  return (
    <div className="pet-room" style={{ background: BACKGROUNDS[background ?? 'bg_day'] ?? BACKGROUNDS.bg_day }} role="img" aria-label={`${petName}'s room with ${items.length} item${items.length === 1 ? '' : 's'}`}
      onClick={e => { if (!onPick) return; const r = e.currentTarget.getBoundingClientRect(); onPick(Math.round((e.clientX - r.left) / r.width * 100), Math.round((e.clientY - r.top) / r.height * 100)) }}>
      {items.map((it, i) => edit
        ? <button key={i} className={'pet-it' + (selected === i ? ' sel' : '')} style={{ left: it.x + '%', top: it.y + '%' }} onClick={e => { e.stopPropagation(); onSelect!(i) }} aria-label={`${nameOf?.(it.code) ?? it.code}${selected === i ? ' (selected)' : ''}`}>{emojiOf(it.code)}</button>
        : <span key={i} className="pet-it" style={{ left: it.x + '%', top: it.y + '%' }} aria-hidden="true">{emojiOf(it.code)}</span>)}
      {!hidePet && <div className="pet-room-pet"><Leo emotion={mood} size={64} look={look} variant={variant} fx={fx} label={petName} /></div>}
    </div>
  )
}
