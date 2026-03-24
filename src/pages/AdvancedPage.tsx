import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { worlds } from '../data/worlds'
import { useProgressStore } from '../store/progressStore'
import { useI18n } from '../lib/i18n'

export default function AdvancedPage() {
  const { t, language } = useI18n()
  const completedLessons = useProgressStore((s) => s.completedLessons)
  const world5 = worlds.find((w) => w.id === 'world5')!
  const prereqWorlds = useMemo(() => worlds.filter((w) => ['world1', 'world2', 'world3', 'world4'].includes(w.id)), [])
  const worldTitlesEn: Record<string, string> = {
    world1: 'The Container Forge',
    world2: 'The Origins Cluster',
    world3: 'The Service Guardians',
    world4: "The Alchemist's Vault",
  }

  const status = prereqWorlds.map((world) => {
    const done = world.lessons.every((lesson) => completedLessons.includes(lesson.id))
    return { world, done }
  })
  const allRecommendedDone = status.every((s) => s.done)

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <section className="panel border-red-500/40 bg-gradient-to-br from-red-950/40 to-slate-900 p-6">
        <span className="inline-block rounded-full border border-red-500/50 bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-300">{t('advancedBadge')}</span>
        <h1 className="mt-3 text-4xl font-bold text-red-300">{t('advancedTitle')}</h1>
        <p className="mt-2 text-slate-300">{t('advancedSubtitle')}</p>
      </section>

      <section className="panel p-5">
        <h2 className="text-xl font-semibold">{t('advancedPrereqTitle')}</h2>
        <div className="mt-3 grid gap-2">
          {status.map(({ world, done }) => (
            <div key={world.id} className="flex items-center justify-between rounded border border-border px-3 py-2">
              <span>{world.emoji} {language === 'en' ? (worldTitlesEn[world.id] ?? world.title) : world.title}</span>
              <span>{done ? '✅' : '❌'}</span>
            </div>
          ))}
        </div>
        {!allRecommendedDone ? (
          <p className="mt-3 rounded border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
            {t('advancedWarning')}
          </p>
        ) : null}
      </section>

      <section className="panel p-5">
        <h2 className="text-xl font-semibold text-red-300">{t('advancedTrackTitle')}</h2>
        <ol className="mt-4 space-y-3 border-l border-red-500/40 pl-4">
          {world5.lessons.map((lesson) => (
            <li key={lesson.id} className="relative rounded border border-border bg-slate-900/60 p-3">
              <span className="absolute -left-[22px] top-4 h-3 w-3 rounded-full bg-red-500" />
              <p className="font-semibold">{lesson.title}</p>
              <p className="text-xs text-slate-400">{lesson.estimatedMinutes} min • {lesson.xpReward} XP</p>
            </li>
          ))}
        </ol>
        <Link to="/world/world5" className="mt-5 inline-block rounded-lg bg-red-500 px-4 py-2 font-semibold text-white">
          {t('advancedStart')} →
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="panel p-4"><h3 className="font-semibold text-red-300">{t('advancedReason1Title')}</h3><p className="mt-2 text-sm text-slate-300">{t('advancedReason1Text')}</p></article>
        <article className="panel p-4"><h3 className="font-semibold text-red-300">{t('advancedReason2Title')}</h3><p className="mt-2 text-sm text-slate-300">{t('advancedReason2Text')}</p></article>
        <article className="panel p-4"><h3 className="font-semibold text-red-300">{t('advancedReason3Title')}</h3><p className="mt-2 text-sm text-slate-300">{t('advancedReason3Text')}</p></article>
      </section>
    </main>
  )
}
