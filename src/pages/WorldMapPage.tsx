import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { worlds } from '../data/worlds'
import { useProgressStore } from '../store/progressStore'
import { WorldMap } from '../components/world/WorldMap'
import { useI18n } from '../lib/i18n'

export function WorldMapPage() {
  const { t } = useI18n()
  const { worldId = 'world1' } = useParams()
  const world = useMemo(() => worlds.find((w) => w.id === worldId) ?? worlds[0], [worldId])
  const completedLessons = useProgressStore((s) => s.completedLessons)
  const progress = useProgressStore((s) => s.getWorldProgress(world.id, world.lessons.length))
  const world4 = worlds.find((w) => w.id === 'world4')
  const world4Done = world4 ? world4.lessons.every((lesson) => completedLessons.includes(lesson.id)) : false
  const locked = world.id !== 'world1' && world.id !== 'world5'
    ? true
    : world.id === 'world5'
      ? !world4Done
      : false

  return (
    <main className="mx-auto max-w-6xl space-y-4 px-4 py-8">
      <header className="panel p-5">
        <h1 className="text-2xl font-bold">{world.emoji} {world.title}</h1>
        <p className="text-slate-400">{world.subtitle}</p>
        <div className="mt-3 h-3 rounded bg-slate-800"><div className="h-3 rounded" style={{ width: `${Math.round(progress * 100)}%`, background: world.color }} /></div>
      </header>
      {locked ? <div className="panel p-8 text-center text-slate-400">{world.id === 'world5' ? 'Monde 5 verrouille: termine le monde 4 pour debloquer OpenShift.' : t('worldLocked')}</div> : <WorldMap world={world} />}
    </main>
  )
}
