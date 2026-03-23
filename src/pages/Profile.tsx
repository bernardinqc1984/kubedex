import { badges } from '../data/badges'
import { worlds } from '../data/worlds'
import { XPBar } from '../components/gamification/XPBar'
import { LevelBadge } from '../components/gamification/LevelBadge'
import { useProgressStore } from '../store/progressStore'
import { useUserStore } from '../store/userStore'

export function Profile() {
  const user = useUserStore()
  const progress = useProgressStore()
  const worldsDone = worlds.filter((w) => w.lessons.every((l) => progress.completedLessons.includes(l.id))).length
  const totalLessons = worlds.reduce((acc, w) => acc + w.lessons.length, 0)
  const globalProgress = Math.round((progress.completedLessons.length / totalLessons) * 100)

  return (
    <main className="mx-auto max-w-6xl space-y-4 px-4 py-8">
      <section className="panel p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 text-lg font-bold text-black">{user.username[0]}</div>
          <div><h1 className="text-2xl font-bold">{user.username}</h1><LevelBadge level={user.level} /></div>
        </div>
        <div className="mt-4"><XPBar xp={user.xp} level={user.level} /></div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="panel p-4">Lecons terminees: {progress.completedLessons.length}</div>
        <div className="panel p-4">Mondes completes: {worldsDone}</div>
        <div className="panel p-4">Progression globale: {globalProgress}%</div>
      </section>
      <section className="panel p-5">
        <h2 className="mb-3 text-lg font-bold">Tous les badges</h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {badges.map((b) => <div key={b.id} className={`rounded-lg border border-border p-3 text-center ${user.badges.includes(b.id) ? '' : 'opacity-40'}`}><div className="text-2xl">{b.emoji}</div><div className="text-xs">{b.name}</div></div>)}
        </div>
      </section>
    </main>
  )
}
