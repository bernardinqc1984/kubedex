import { Link } from 'react-router-dom'
import { badges, badgeById } from '../data/badges'
import { worlds } from '../data/worlds'
import { XPBar } from '../components/gamification/XPBar'
import { LevelBadge } from '../components/gamification/LevelBadge'
import { StreakCounter } from '../components/gamification/StreakCounter'
import { useUserStore } from '../store/userStore'
import { useProgressStore } from '../store/progressStore'
import { useI18n } from '../lib/i18n'
import { useAuthStore } from '../store/authStore'
import { canAccessLesson } from '../lib/access'

export function Dashboard() {
  const { t } = useI18n()
  const user = useUserStore()
  const progress = useProgressStore()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const next = worlds[0].lessons.find(
    (l) =>
      !progress.completedLessons.includes(l.id) &&
      canAccessLesson(l, progress.completedLessons, isAuthenticated),
  ) ?? worlds[0].lessons[0]

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-5">
      <section className="panel space-y-4 p-5 md:col-span-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 text-lg font-bold text-black">{user.username[0]}</div>
          <div><p>{user.username}</p><LevelBadge level={user.level} /></div>
        </div>
        <XPBar xp={user.xp} level={user.level} />
        <StreakCounter streak={user.streak} large />
        {next ? <Link to={`/lesson/${next.id}`} className="inline-block rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-black">{t('continue')}</Link> : null}
      </section>
      <section className="panel p-5 md:col-span-3">
        <h2 className="mb-3 text-lg font-bold">{t('badges')}</h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {badges.map((badge) => {
            const unlocked = user.badges.includes(badge.id)
            return (
              <div key={badge.id} title={badge.description} className={`rounded-lg border border-border p-3 text-center ${unlocked ? '' : 'opacity-40'}`}>
                <div className="text-2xl">{badge.emoji}</div><div className="text-xs">{badge.name}</div>
              </div>
            )
          })}
        </div>
        <h3 className="mt-6 text-sm font-semibold text-slate-300">{t('worldProgress')}</h3>
        <div className="mt-2 space-y-2">
          {worlds.map((w, i) => {
            const pct = Math.round(progress.getWorldProgress(w.id, w.lessons.length) * 100)
            return (
              <div key={w.id}>
                <div className="mb-1 flex justify-between text-xs"><span>{w.emoji} {w.title}</span><span>{pct}%</span></div>
                <div className="h-2 rounded bg-slate-800"><div className="h-2 rounded" style={{ width: `${pct}%`, background: i > 0 ? '#334155' : w.color }} /></div>
              </div>
            )
          })}
        </div>
        {user.badges.length > 0 ? <p className="mt-4 text-xs text-slate-500">{t('lastBadge')}: {badgeById[user.badges[user.badges.length - 1]]?.name}</p> : null}
      </section>
    </main>
  )
}
