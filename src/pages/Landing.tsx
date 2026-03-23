import { Link } from 'react-router-dom'
import { worlds } from '../data/worlds'
import { Gamepad2, Keyboard, TrendingUp } from 'lucide-react'
import { useI18n } from '../lib/i18n'

export function Landing() {
  const { t } = useI18n()
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-4 py-10">
      <section className="panel p-8 text-center">
        <h1 className="text-4xl font-bold md:text-6xl"><span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">{t('masteryTitle')}</span></h1>
        <p className="mt-3 text-slate-300">{t('masterySubtitle')}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/dashboard" className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-black">{t('startAdventure')}</Link>
          <Link to="/world/world1" className="rounded-lg border border-border px-4 py-2">{t('seeCurriculum')}</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-5">
        {worlds.map((world, i) => (
          <div key={world.id} className="panel p-4">
            <div className="text-2xl">{world.emoji}</div>
            <h3 className="mt-2 font-bold">{world.title}</h3>
            <p className="text-sm text-slate-400">{world.lessons.length} {t('lessons')}</p>
            {i > 0 ? <p className="mt-2 text-xs text-amber-300">🔒 {t('availableSoon')}</p> : null}
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[{ icon: <Gamepad2 />, title: 'Gamification', text: t('featureGamification') }, { icon: <Keyboard />, title: t('integratedEditor'), text: t('featureEditor') }, { icon: <TrendingUp />, title: t('worldProgress'), text: t('featureProgress') }].map((f) => (
          <article key={f.title} className="panel p-5">
            <div className="mb-3 text-cyan-300">{f.icon}</div>
            <h4 className="font-semibold">{f.title}</h4>
            <p className="text-sm text-slate-400">{f.text}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
