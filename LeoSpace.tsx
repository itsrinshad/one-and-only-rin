import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Leo } from './Leo'
import { PetRoom } from './PetRoom'
import { usePet } from './PetContext'
import { blip, getPetUi, needText, setPetUi } from './petCore'

const Bar = ({ label, v, c }: { label: string; v: number; c: string }) => (
  <div className="pet-bar" title={`${label}: ${v}/100`}><span>{label}</span><i role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={v}><b style={{ width: v + '%', background: c }} /></i></div>
)
const Sw = ({ on, set, label }: { on: boolean; set: (v: boolean) => void; label: string }) => (
  <label className="row flex items-center justify-between py-1.5 text-sm"><span>{label}</span>
    <input type="checkbox" role="switch" checked={on} onChange={e => set(e.target.checked)} aria-label={label} className="h-5 w-5" /></label>
)

// The member's own LEO space (Phase 2): meet LEO, care for it, rename it, and choose how it behaves.
export function LeoSpace() {
  const { status, error, active, settings, boot, mood, fx, items, inv, owns, itemMap, care, rename, setSettings, dailyGift, markSeen, deleteMyData, refresh, playFx, say, sayText, quiet, sound, calm, busy, unseen } = usePet()
  const [name, setName] = useState(''); const [msg, setMsg] = useState(''); const [feed, setFeed] = useState(false); const [confirm, setConfirm] = useState(false)
  const note = (t: string) => { setMsg(t); window.setTimeout(() => setMsg(''), 4000) }

  if (status === 'loading') return <div className="glass p-4 text-center" role="status">LEO is waking up… 💤</div>
  if (status === 'off') return <div className="glass p-4 text-center">LEO is resting for now. Check back later! 🌙</div>
  if (!settings || !boot || !active) return (
    <div className="glass p-4 text-center" role="alert">
      <p>{error || 'LEO is taking a nap and cannot be reached right now.'}</p>
      <button className="sym-btn mt-3" onClick={refresh}>Try again</button>
    </div>)

  const foods = items.filter(i => i.kind === 'food' && owns(i.code))
  const setCalm = (v: boolean) => { setPetUi({ calm: v }); document.documentElement.dataset.petcalm = v ? '1' : '0'; window.dispatchEvent(new Event('sym-petui')) }
  const doRename = async () => { const r = await rename(active.id, name); if (r.ok) { setName(''); note('Name saved 💛') } else note(r.error ?? 'Could not save that name.') }
  const daily = async () => { const r = await dailyGift(); note(r.ok ? 'LEO found a cake for you! 🍰' : r.reason === 'claimed' ? 'You already got today’s treat. Come back tomorrow! 🌅' : r.error ?? 'No treat right now.') }

  return (
    <div className="space-y-3">
      {status === 'offline' && <div className="pet-warn" role="alert">{error || 'LEO is offline.'} <button className="underline" onClick={refresh}>Retry</button></div>}
      <section className="glass p-3" aria-label={`${active.name} and its room`}>
        <PetRoom background={active.home?.background} items={active.home?.items ?? []} emojiOf={c => itemMap.get(c)?.emoji ?? '🎁'} nameOf={c => itemMap.get(c)?.name ?? c}
          look={active.appearance} variant={active.variant} mood={mood} petName={active.name} fx={fx} />
        <div className="flex items-center gap-2 mt-2"><b className="text-lg truncate">{active.name}</b><span className="text-xs text-gray-400">{needText(active)}</span></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2">
          <Bar label="Tummy" v={active.hunger} c="#f59e0b" /><Bar label="Energy" v={active.energy} c="#22d3ee" />
          <Bar label="Happy" v={active.happiness} c="#f472b6" /><Bar label="Curious" v={active.curiosity} c="#a78bfa" />
          <Bar label="Friendly" v={active.friendliness} c="#34d399" />
        </div>
        {!feed ? <div className="grid grid-cols-4 gap-1 mt-3">
          <button className="pet-act" disabled={busy} onClick={() => setFeed(true)}><span>🍪</span>Feed</button>
          <button className="pet-act" disabled={busy} onClick={() => care(active.id, 'play')}><span>🎮</span>Play</button>
          <button className="pet-act" disabled={busy} onClick={() => care(active.id, 'rest')}><span>😴</span>Rest</button>
          <button className="pet-act" disabled={busy} onClick={() => care(active.id, 'cuddle')}><span>🤗</span>Cuddle</button>
        </div> : <div className="mt-3">
          <div className="flex flex-wrap gap-1">{foods.map(f => { const q = inv.get(f.code)?.qty; return (
            <button key={f.code} className="pet-act !w-auto px-2" disabled={busy} title={f.description} onClick={async () => { await care(active.id, 'feed', f.code); setFeed(false) }}>
              <span>{f.emoji}</span>{f.name}{f.unlock.type !== 'free' && q != null ? ` ×${q}` : ''}</button>) })}</div>
          <button className="text-xs underline text-gray-400 mt-1" onClick={() => setFeed(false)}>Back</button>
        </div>}
        <button className="sym-btn w-full mt-2 !py-1.5" onClick={() => { playFx(); blip('pop', sound); if (!quiet) say('idle', {}, true); else sayText('…', 'normal', true) }}>👋 Say hi</button>
        {boot.config.daily_reward && <button className="sym-btn w-full mt-2 !py-1.5" onClick={daily}>🎁 Today’s treat (optional)</button>}
        <p className="text-xs text-gray-400 mt-2" role="status" aria-live="polite">{msg}</p>
      </section>

      {unseen.length > 0 && <section className="glass p-3"><b>New for you 🎉</b>
        <p className="text-sm mt-1">{unseen.map(u => `${u.emoji} ${u.name}`).join(', ')}</p>
        <button className="sym-btn mt-2 !py-1" onClick={markSeen}>Got it</button></section>}

      <section className="glass p-3" aria-label="Rename">
        <b>Name</b>
        <div className="flex gap-2 mt-2"><input className="sym-inp !mb-0" value={name} maxLength={20} placeholder={active.name} onChange={e => setName(e.target.value)} aria-label="New name for your pet" />
          <button className="sym-btn" disabled={busy || !name.trim()} onClick={doRename}>Save</button></div>
      </section>

      <section className="glass p-3" aria-label="Comfort settings">
        <b>LEO settings</b>
        <Sw label="Show LEO on every page" on={settings.widget_state !== 'hidden'} set={v => setSettings({ widget_state: v ? 'open' : 'hidden' })} />
        <Sw label="Quiet mode (less talking and pop-ups)" on={quiet} set={v => setSettings({ quiet: v })} />
        <Sw label="Sound effects" on={settings.sound} set={v => setSettings({ sound: v })} />
        <Sw label="Calm motion (fewer animations)" on={calm || getPetUi().calm} set={setCalm} />
      </section>

      <section className="glass p-3 text-sm" aria-label="Your data">
        <p className="text-gray-400">Your pet only uses care items and unlocks inside SYMBIOTES. It never changes glory, achievements or rankings.</p>
        {!confirm ? <button className="text-xs underline text-gray-400 mt-2" onClick={() => setConfirm(true)}>Delete my LEO data…</button>
          : <div className="mt-2" role="alertdialog" aria-label="Confirm delete"><p>This removes your pet, items and settings. A fresh LEO will appear next time. Continue?</p>
            <button className="sym-btn !py-1 mr-2" onClick={async () => { const r = await deleteMyData(); setConfirm(false); note(r.ok ? 'Your LEO data was removed. A fresh LEO is ready.' : r.error ?? 'Could not delete right now.') }}>Yes, delete</button>
            <button className="text-xs underline" onClick={() => setConfirm(false)}>Cancel</button></div>}
        <p className="mt-2"><Link to="/" className="underline text-xs">Back to home</Link></p>
      </section>
    </div>
  )
}

// small helper so the page title row can show the mascot too
export const LeoSpacePage = () => (
  <div><h1 className="text-xl font-bold mb-2 flex items-center gap-2"><Leo emotion="happy" size={28} /> LEO space</h1><LeoSpace /></div>
)
