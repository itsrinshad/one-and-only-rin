import { type ReactElement } from 'react'

// LEO's drawing. Pure SVG, no network, no AI. Used by the floating companion, the LEO space, the gallery and public profiles.
export type Look = { color?: string; outfit?: string; glasses?: string; accessory?: string; ability?: string }

const INK = '#4a210a', RED = '#7a1f12'
type Cfg = { l: string; r: string; mouth: string; brow?: string; extra?: string[]; anim?: string; wave?: boolean }
const CFG: Record<string, Cfg> = {
  normal: { l: 'open', r: 'open', mouth: 'smile' }, happy: { l: 'arc', r: 'arc', mouth: 'grin' },
  very_happy: { l: 'arc', r: 'arc', mouth: 'open', extra: ['blush'], anim: 'hop' }, laughing: { l: 'arc', r: 'arc', mouth: 'open', extra: ['joy'], anim: 'shake' },
  sad: { l: 'down', r: 'down', mouth: 'frown', brow: 'sad' }, crying: { l: 'down', r: 'down', mouth: 'frown', brow: 'sad', extra: ['tears'] },
  angry: { l: 'open', r: 'open', mouth: 'frown', brow: 'angry', extra: ['vein'] }, surprised: { l: 'wide', r: 'wide', mouth: 'o', brow: 'up' },
  shocked: { l: 'wide', r: 'wide', mouth: 'o', brow: 'up', extra: ['sweat'], anim: 'shake' }, confused: { l: 'open', r: 'open', mouth: 'wavy', brow: 'one', extra: ['q'] },
  thinking: { l: 'up', r: 'up', mouth: 'side', brow: 'one', extra: ['dots'] }, excited: { l: 'wide', r: 'wide', mouth: 'open', extra: ['spark'], anim: 'hop' },
  sleepy: { l: 'closed', r: 'closed', mouth: 'small', extra: ['zzz'] }, winking: { l: 'open', r: 'arc', mouth: 'grin' },
  shy: { l: 'down', r: 'down', mouth: 'smile2', extra: ['blush'] }, celebrating: { l: 'arc', r: 'arc', mouth: 'open', extra: ['spark'], anim: 'hop', wave: true },
  welcoming: { l: 'open', r: 'open', mouth: 'grin', wave: true }, disappointed: { l: 'down', r: 'down', mouth: 'flat', brow: 'sad' },
}
export const EMOTIONS = Object.keys(CFG)

function Eye({ x, k }: { x: number; k: string }) {
  const y = 56
  if (k === 'arc') return <path d={`M${x - 8} ${y + 4} Q${x} ${y - 9} ${x + 8} ${y + 4}`} fill="none" stroke={INK} strokeWidth="3.6" strokeLinecap="round" />
  if (k === 'closed') return <path d={`M${x - 8} ${y} Q${x} ${y + 6} ${x + 8} ${y}`} fill="none" stroke={INK} strokeWidth="3.6" strokeLinecap="round" />
  const w = k === 'wide'; const dy = k === 'down' ? 4 : k === 'up' ? -3 : 1
  return (<g className="leo-blink"><ellipse cx={x} cy={y} rx={w ? 10 : 8.5} ry={w ? 12.5 : 10.5} fill="#fff8ea" stroke={INK} strokeWidth="2.6" />
    <circle cx={x} cy={y + dy} r={w ? 3.6 : 5.2} fill={INK} /><circle cx={x + 1.6} cy={y + dy - 1.8} r="1.5" fill="#fff" /></g>)
}
const MOUTH: Record<string, ReactElement> = {
  smile: <path d="M51 80 Q60 86 69 80" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />,
  grin: <path d="M47 77 Q60 93 73 77" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />,
  open: <><path d="M46 76 Q60 99 74 76 Z" fill={RED} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" /><ellipse cx="60" cy="87" rx="6" ry="3.2" fill="#ff8a7a" /></>,
  frown: <path d="M51 87 Q60 79 69 87" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />,
  o: <ellipse cx="60" cy="84" rx="5.5" ry="7" fill={RED} stroke={INK} strokeWidth="2.4" />,
  wavy: <path d="M49 83 q5 -5 10 0 t10 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />,
  side: <path d="M54 83 Q60 80 69 85" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />,
  small: <path d="M55 83 Q60 86 65 83" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />,
  smile2: <path d="M53 81 Q60 87 67 81" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />,
  flat: <path d="M52 84 H68" stroke={INK} strokeWidth="3" strokeLinecap="round" />,
}
const BROW: Record<string, ReactElement> = {
  sad: <><path d="M36 47 L52 41" stroke={INK} strokeWidth="3" strokeLinecap="round" /><path d="M68 41 L84 47" stroke={INK} strokeWidth="3" strokeLinecap="round" /></>,
  angry: <><path d="M36 41 L52 47" stroke={INK} strokeWidth="3.4" strokeLinecap="round" /><path d="M68 47 L84 41" stroke={INK} strokeWidth="3.4" strokeLinecap="round" /></>,
  up: <><path d="M38 38 Q45 32 52 38" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" /><path d="M68 38 Q75 32 82 38" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" /></>,
  one: <><path d="M38 43 H52" stroke={INK} strokeWidth="3" strokeLinecap="round" /><path d="M68 36 Q75 30 82 37" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" /></>,
}
const EXTRA: Record<string, ReactElement> = {
  blush: <><circle cx="35" cy="72" r="5.5" fill="#ff6b6b" opacity=".5" /><circle cx="85" cy="72" r="5.5" fill="#ff6b6b" opacity=".5" /></>,
  tears: <><path d="M40 68 q-4 9 0 12 q4 -3 0 -12z" fill="#5bc8ff" /><path d="M80 68 q-4 9 0 12 q4 -3 0 -12z" fill="#5bc8ff" /></>,
  joy: <><path d="M32 62 q-6 6 -2 10 q5 -2 2 -10z" fill="#5bc8ff" /><path d="M88 62 q6 6 2 10 q-5 -2 -2 -10z" fill="#5bc8ff" /></>,
  sweat: <path d="M92 34 q-5 9 0 12 q5 -3 0 -12z" fill="#5bc8ff" />,
  vein: <path d="M84 30 l6 6 m0 -6 l-6 6" stroke="#e11d48" strokeWidth="2.6" strokeLinecap="round" />,
  q: <text x="88" y="34" fontSize="24" fontWeight="800" fill="#fff">?</text>,
  dots: <><circle cx="90" cy="30" r="2.6" fill="#fff" /><circle cx="98" cy="24" r="3.4" fill="#fff" /><circle cx="108" cy="16" r="4.4" fill="#fff" /></>,
  spark: <><text x="14" y="26" fontSize="16" fill="#ffe14d">✦</text><text x="96" y="20" fontSize="20" fill="#ffe14d">✦</text><text x="102" y="60" fontSize="12" fill="#fff">✦</text></>,
  zzz: <><text x="88" y="34" fontSize="16" fontWeight="800" fill="#cbd5ff">z</text><text x="98" y="22" fontSize="12" fontWeight="800" fill="#cbd5ff">z</text></>,
}

// ---- body colours (item code -> [body, shade]) ----
export const PALETTE: Record<string, [string, string]> = {
  color_orange: ['#f28c28', '#d9701a'], color_sky: ['#4aa8ff', '#2f7fd1'], color_mint: ['#34d399', '#1fa57a'], color_violet: ['#a78bfa', '#7c5ce0'],
  color_gold: ['#fbbf24', '#d99a0b'], color_midnight: ['#5b6b86', '#33405a'], color_rose: ['#fb7fb0', '#e0568a'], color_galaxy: ['#7c5cf0', '#3b2a9e'],
}
// ---- small drawings for outfits, glasses and accessories (item code -> SVG). Unknown codes are simply not drawn. ----
const STAR = 'M0 -7 L2 -2.4 L7 -2.2 L3.2 1.2 L4.4 6 L0 3.4 L-4.4 6 L-3.2 1.2 L-7 -2.2 L-2 -2.4 Z'
const HEART = 'M0 5 C-8 -1 -6 -8 -1 -5 Q0 -4 0 -3 Q0 -4 1 -5 C6 -8 8 -1 0 5 Z'
const OUTFIT_BACK: Record<string, ReactElement> = {
  outfit_cape: <path d="M34 98 Q60 108 86 98 L98 142 Q60 150 22 142 Z" fill="#dc2626" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />,
}
const OUTFIT: Record<string, ReactElement> = {
  outfit_tee: <><ellipse cx="60" cy="113" rx="23" ry="15" fill="#7c3aed" stroke={INK} strokeWidth="2.6" /><text x="60" y="119" fontSize="15" fontWeight="800" textAnchor="middle" fill="#fff">S</text></>,
  outfit_hoodie: <><ellipse cx="60" cy="113" rx="24" ry="15" fill="#475569" stroke={INK} strokeWidth="2.6" /><path d="M48 101 Q60 112 72 101" fill="none" stroke={INK} strokeWidth="2.6" /><path d="M55 108 v9 M65 108 v9" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" /></>,
  outfit_scarf: <><path d="M32 100 Q60 114 88 100 L88 108 Q60 122 32 108 Z" fill="#ef4444" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" /><path d="M78 110 l6 20 l-9 1 l-3 -17 z" fill="#ef4444" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" /><path d="M40 105 l5 6 M52 109 l5 6 M64 109 l5 6" stroke="#fff" strokeWidth="2" opacity=".6" /></>,
  outfit_cape: <><ellipse cx="60" cy="113" rx="19" ry="12" fill="#b91c1c" stroke={INK} strokeWidth="2.4" /><circle cx="60" cy="103" r="4" fill="#fbbf24" stroke={INK} strokeWidth="2" /></>,
  outfit_jacket: <><ellipse cx="60" cy="113" rx="24" ry="15" fill="#111827" stroke={INK} strokeWidth="2.6" /><path d="M60 100 V127" stroke="#fbbf24" strokeWidth="3" /><path d="M38 110 Q40 122 46 126 M82 110 Q80 122 74 126" fill="none" stroke="#fbbf24" strokeWidth="2.6" /></>,
  outfit_tux: <><ellipse cx="60" cy="113" rx="23" ry="15" fill="#0f172a" stroke={INK} strokeWidth="2.6" /><path d="M52 101 L60 118 L68 101 Z" fill="#fff" /><path d="M54 104 l6 4 l6 -4 l0 7 l-6 -3 l-6 3 z" fill="#dc2626" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" /></>,
  outfit_armor: <><ellipse cx="60" cy="113" rx="25" ry="16" fill="#cbd5e1" stroke={INK} strokeWidth="2.6" /><path d="M60 100 V129 M40 113 H80" stroke="#64748b" strokeWidth="2.4" /><circle cx="48" cy="108" r="2" fill="#475569" /><circle cx="72" cy="108" r="2" fill="#475569" /><circle cx="48" cy="120" r="2" fill="#475569" /><circle cx="72" cy="120" r="2" fill="#475569" /></>,
}
const GLASSES: Record<string, ReactElement> = {
  glasses_round: <g fill="rgba(180,230,255,.25)" stroke="#1f2937" strokeWidth="2.8"><circle cx="44" cy="56" r="13" /><circle cx="76" cy="56" r="13" /><path d="M57 56 H63 M31 54 L24 50 M89 54 L96 50" fill="none" strokeLinecap="round" /></g>,
  glasses_shades: <g><path d="M30 48 H58 V60 Q58 70 46 70 Q32 70 30 58 Z M62 48 H90 V58 Q88 70 74 70 Q62 70 62 60 Z" fill="#111827" stroke="#000" strokeWidth="2.4" strokeLinejoin="round" /><path d="M58 52 H62" stroke="#000" strokeWidth="3" /><path d="M34 52 l8 0 M66 52 l8 0" stroke="#94a3b8" strokeWidth="1.6" opacity=".6" /></g>,
  glasses_star: <g fill="#fde047" stroke="#b45309" strokeWidth="2"><path transform="translate(44 57) scale(1.7)" d={STAR} /><path transform="translate(76 57) scale(1.7)" d={STAR} /><path d="M56 56 H64" fill="none" strokeLinecap="round" /></g>,
  glasses_visor: <g><rect x="28" y="46" width="64" height="20" rx="10" fill="rgba(34,211,238,.55)" stroke="#0e7490" strokeWidth="2.8" /><path d="M36 52 H56" stroke="#fff" strokeWidth="2.4" opacity=".7" strokeLinecap="round" /></g>,
  glasses_heart: <g fill="#fb7185" stroke="#be123c" strokeWidth="2"><path transform="translate(44 56) scale(1.9)" d={HEART} /><path transform="translate(76 56) scale(1.9)" d={HEART} /><path d="M56 54 H64" fill="none" strokeLinecap="round" /></g>,
}
const ACC: Record<string, ReactElement> = {
  acc_cap: <g><path d="M24 42 Q60 -10 96 42 Q60 34 24 42 Z" fill="#2563eb" stroke={INK} strokeWidth="2.8" strokeLinejoin="round" /><path d="M70 36 Q100 36 108 44 Q92 46 66 42 Z" fill="#1d4ed8" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" /><circle cx="60" cy="14" r="3" fill="#fff" /></g>,
  acc_party: <g><path d="M44 30 L60 -8 L76 30 Z" fill="#f472b6" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" /><path d="M50 18 H70 M47 25 H73" stroke="#fde047" strokeWidth="3" /><circle cx="60" cy="-9" r="4.4" fill="#fde047" stroke={INK} strokeWidth="1.8" /></g>,
  acc_flower: <g transform="translate(92 26)"><circle cx="0" cy="-7" r="5" fill="#fde047" /><circle cx="7" cy="-2" r="5" fill="#fde047" /><circle cx="4" cy="6" r="5" fill="#fde047" /><circle cx="-4" cy="6" r="5" fill="#fde047" /><circle cx="-7" cy="-2" r="5" fill="#fde047" /><circle cx="0" cy="0" r="4.4" fill="#f97316" stroke={INK} strokeWidth="1.4" /></g>,
  acc_headphones: <g><path d="M22 62 Q22 14 60 14 Q98 14 98 62" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" /><rect x="12" y="54" width="14" height="24" rx="7" fill="#ef4444" stroke={INK} strokeWidth="2.4" /><rect x="94" y="54" width="14" height="24" rx="7" fill="#ef4444" stroke={INK} strokeWidth="2.4" /></g>,
  acc_crown: <g><path d="M34 28 L40 4 L52 18 L60 0 L68 18 L80 4 L86 28 Z" fill="#fbbf24" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" /><circle cx="60" cy="14" r="3" fill="#ef4444" /><circle cx="42" cy="20" r="2.2" fill="#22d3ee" /><circle cx="78" cy="20" r="2.2" fill="#22d3ee" /></g>,
  acc_halo: <ellipse cx="60" cy="10" rx="24" ry="7" fill="none" stroke="#fde047" strokeWidth="5" />,
  acc_medal: <g><path d="M52 98 L60 112 L68 98" fill="#2563eb" stroke={INK} strokeWidth="2" strokeLinejoin="round" /><circle cx="60" cy="118" r="7" fill="#fbbf24" stroke={INK} strokeWidth="2.2" /><path transform="translate(60 118) scale(.55)" d={STAR} fill="#b45309" /></g>,
  acc_bow: <g transform="translate(90 24) rotate(18)"><path d="M0 0 L-14 -9 L-14 9 Z M0 0 L14 -9 L14 9 Z" fill="#f472b6" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" /><circle r="4" fill="#ec4899" stroke={INK} strokeWidth="1.8" /></g>,
}
const CONF = ['#f472b6', '#fde047', '#22d3ee', '#a3e635', '#fb923c', '#a78bfa']

export function Leo({ emotion = 'normal', size = 80, talking = false, look, variant = 'boy', fx = '', label = 'LEO' }:
  { emotion?: string; size?: number; talking?: boolean; look?: Look; variant?: string; fx?: string; label?: string }) {
  const c = CFG[emotion] ?? CFG.normal
  const [OR, OR2] = PALETTE[look?.color ?? ''] ?? PALETTE[variant === 'girl' ? 'color_rose' : 'color_orange']
  const girl = variant === 'girl'
  const anim = fx === 'flip' ? 'leo-flip' : fx === 'dance' ? 'leo-dance' : c.anim === 'hop' ? 'leo-hop' : c.anim === 'shake' ? 'leo-shake' : 'leo-bob'
  const extra = girl && !(c.extra ?? []).includes('blush') ? [...(c.extra ?? []), 'blush'] : c.extra
  return (
    <svg className="leo-svg" viewBox="0 0 120 150" width={size} height={size * 1.25} role="img" aria-label={label}>
      <ellipse cx="60" cy="144" rx="24" ry="4" fill="rgba(0,0,0,.35)" />
      <g className={anim}>
        {look?.outfit && OUTFIT_BACK[look.outfit]}
        <path d="M48 104 L46 130 M72 104 L74 130" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="43" cy="134" rx="10" ry="5.5" fill={OR2} stroke={INK} strokeWidth="2.5" /><ellipse cx="77" cy="134" rx="10" ry="5.5" fill={OR2} stroke={INK} strokeWidth="2.5" />
        <path d="M21 76 Q8 82 7 99" fill="none" stroke={OR} strokeWidth="6" strokeLinecap="round" /><circle cx="7" cy="101" r="6.5" fill="#fff8ea" stroke={INK} strokeWidth="2.4" />
        {c.wave
          ? <g className="leo-wave"><path d="M99 76 Q116 66 113 50" fill="none" stroke={OR} strokeWidth="6" strokeLinecap="round" /><circle cx="113" cy="47" r="6.5" fill="#fff8ea" stroke={INK} strokeWidth="2.4" /></g>
          : <><path d="M99 76 Q112 82 113 99" fill="none" stroke={OR} strokeWidth="6" strokeLinecap="round" /><circle cx="113" cy="101" r="6.5" fill="#fff8ea" stroke={INK} strokeWidth="2.4" /></>}
        {look?.outfit && OUTFIT[look.outfit]}
        <circle cx="60" cy="62" r="42" fill={OR} stroke={INK} strokeWidth="3.6" />
        <path d="M94 48 A42 42 0 0 1 84 96" fill="none" stroke={OR2} strokeWidth="7" strokeLinecap="round" opacity=".7" />
        <path d="M28 44 Q36 26 58 22" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="5" strokeLinecap="round" />
        <Eye x={44} k={c.l} /><Eye x={76} k={c.r} />
        {girl && <g stroke={INK} strokeWidth="2.6" strokeLinecap="round"><path d="M33 50 l-5 -4 M36 45 l-3 -5" /><path d="M87 50 l5 -4 M84 45 l3 -5" /></g>}
        {look?.glasses && GLASSES[look.glasses]}
        {c.brow && BROW[c.brow]}
        <circle cx="60" cy="68" r="2.6" fill={INK} />
        <g className={talking ? 'leo-talk' : undefined}>{MOUTH[c.mouth]}</g>
        {extra?.map(e => <g key={e}>{EXTRA[e]}</g>)}
        {look?.accessory && ACC[look.accessory]}
        {look?.ability === 'ab_sparkle' && <g className="leo-float"><text x="8" y="30" fontSize="14" fill="#fde047">✦</text><text x="100" y="40" fontSize="11" fill="#fff">✦</text><text x="104" y="86" fontSize="12" fill="#fde047">✦</text></g>}
        {fx === 'confetti' && <g>{CONF.map((col, i) => <rect key={i} className="leo-conf" style={{ animationDelay: i * 60 + 'ms', ['--dx' as any]: (i - 2.5) * 14 + 'px' }} x={54 + i * 3} y="20" width="5" height="8" rx="1" fill={col} />)}</g>}
        {fx === 'hearts' && <g className="leo-float"><text x="92" y="28" fontSize="18">💛</text><text x="10" y="40" fontSize="13">💛</text></g>}
      </g>
    </svg>
  )
}

export const STORY: [string, string][] = [
  ['Every family has a beginning. Every legend has a first chapter.', 'welcoming'],
  ['SYMBIOTES started with an idea, a friendship and a shared passion for gaming.', 'happy'],
  ['The guild was founded by RIN and SHAHIL, alongside the founding members HEMANADH, SHAMMAS and SATHYA.', 'celebrating'],
  ['What started as a small group of players became something bigger: a family built on friendship, teamwork, loyalty and the desire to grow together.', 'very_happy'],
  ['The name SYMBIOTES represents connection. Different players, different personalities, but one united family.', 'thinking'],
  ['The goal was never just to collect players or win matches. It was to create a place where everyone could improve, compete, support each other and make unforgettable memories.', 'excited'],
  ['RIN (RINSHAD), the guild founder, also created the SYMBIOTES website to bring the family closer through technology.', 'winking'],
  ["Today, every new member becomes part of this continuing story. We don't just play together. We grow together.", 'happy'],
  ['WE ARE SYMBIOTES. 🧡', 'celebrating'],
]
