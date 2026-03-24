import { Link } from 'react-router-dom'
import { badges, badgeById } from '../data/badges'
import { worlds } from '../data/worlds'
import { XPBar } from '../components/gamification/XPBar'
import { LevelBadge } from '../components/gamification/LevelBadge'
import { StreakCounter } from '../components/gamification/StreakCounter'
import { useUserStore } from '../store/userStore'
import { useProgressStore } from '../store/progressStore'
import { badgeNameLabel, lessonTitleLabel, useI18n, worldTitleLabel } from '../lib/i18n'
import { useAuthStore } from '../store/authStore'
import { canAccessLesson } from '../lib/access'
import { Link2, Lock } from 'lucide-react'

export function Dashboard() {
  const { t, language } = useI18n()
  const user = useUserStore()
  const progress = useProgressStore()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const next = worlds[0].lessons.find(
    (l) =>
      !progress.completedLessons.includes(l.id) &&
      canAccessLesson(l, progress.completedLessons, isAuthenticated),
  ) ?? worlds[0].lessons[0]
  const noBadgeUnlocked = user.badges.length === 0

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-5">
      <section className="panel space-y-4 p-6 md:col-span-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 text-lg font-bold text-black">{user.username[0]}</div>
          <div><p>{user.username}</p><LevelBadge level={user.level} /></div>
        </div>
        <XPBar xp={user.xp} level={user.level} />
        <StreakCounter streak={user.streak} large />
        {next ? (
          <Link to={`/lesson/${next.id}`} className="inline-block rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-black">
            {t('continue')} · {lessonTitleLabel(next.id, next.title, language)} · ~{next.estimatedMinutes} min
          </Link>
        ) : null}
      </section>
      <section className="panel p-6 md:col-span-3">
        <h2 className="mb-5 flex items-center gap-3 text-lg font-bold text-cyan-300"><span>{t('badges')}</span><span className="h-px flex-1 bg-gradient-to-r from-cyan-400/30 to-transparent" /></h2>
        {noBadgeUnlocked ? (
          <div className="mb-4 rounded-lg border border-dashed border-border p-5 text-center">
            <div className="text-3xl">🏅</div>
            <p className="mt-1 font-semibold">Tes badges apparaitront ici</p>
            <p className="text-sm text-slate-400">Termine ta premiere lecon pour debloquer ton premier badge.</p>
            <Link to="/lesson/world1-l1" className="mt-3 inline-block rounded bg-cyan-500 px-3 py-1 text-sm font-semibold text-black">Commencer →</Link>
          </div>
        ) : null}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {badges.map((badge) => {
            const unlocked = user.badges.includes(badge.id)
            const badgeLabel = badgeNameLabel(badge.id, badge.name, language)
            return (
              <div key={badge.id} title={badge.description} className={`group relative rounded-lg border border-border p-3 text-center ${unlocked ? '' : 'opacity-45 grayscale'}`}>
                {!unlocked ? <Lock size={12} className="absolute top-2 right-2 text-slate-400" /> : null}
                <div className="text-2xl">{badge.emoji}</div><div className="text-xs">{badgeLabel}</div>
                <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden w-44 -translate-x-1/2 rounded border border-border bg-slate-950 p-2 text-left text-[11px] text-slate-300 group-hover:block">
                  <div className="font-semibold">{badgeLabel}</div>
                  <div className="text-slate-400">{badge.description}</div>
                  {!unlocked ? <div className="mt-1 text-amber-300">{badge.rarity} · Non obtenu</div> : null}
                </div>
              </div>
            )
          })}
        </div>
        <h3 className="mt-6 mb-3 flex items-center gap-3 text-sm font-semibold text-slate-300"><span>{t('worldProgress')}</span><span className="h-px flex-1 bg-gradient-to-r from-cyan-400/30 to-transparent" /></h3>
        <div className="mt-2 space-y-2">
          {worlds.map((w, i) => {
            const pct = Math.round(progress.getWorldProgress(w.id, w.lessons.length) * 100)
            const doneCount = progress.completedLessons.filter((id) => id.startsWith(w.id)).length
            const remaining = w.lessons.length - doneCount
            return (
              <Link key={w.id} to={`/world/${w.id}`} className="card-hover block rounded border border-border p-2">
                <div className="mb-1 flex justify-between text-xs"><span>{w.emoji} {worldTitleLabel(w.id, w.title, language)}</span><span>{pct}%</span></div>
                <div className="h-2 rounded bg-slate-800"><div className="h-2 rounded" style={{ width: `${pct}%`, background: i > 0 ? '#334155' : w.color }} /></div>
                <div className="mt-1 text-[11px] text-slate-400">{doneCount} / {w.lessons.length} lecons · {remaining} restantes</div>
                <div className="mt-1 flex gap-1">{Array.from({ length: Math.min(w.lessons.length, 8) }).map((_, idx) => <span key={idx} className={`h-1.5 w-1.5 rounded-full ${idx < doneCount ? 'bg-green-400' : 'bg-slate-600'}`} />)}</div>
              </Link>
            )
          })}
        </div>
        {user.badges.length > 0 ? <p className="mt-4 text-xs text-slate-500">{t('lastBadge')}: {badgeNameLabel(user.badges[user.badges.length - 1], badgeById[user.badges[user.badges.length - 1]]?.name ?? '', language)}</p> : <p className="mt-4 text-xs text-slate-500 inline-flex items-center gap-1"><Link2 size={12} /> {language === 'en' ? 'Start world 1 to earn your first badge' : 'Commence le monde 1 pour gagner ton premier badge'}</p>}
      </section>
    </main>
  )
}
