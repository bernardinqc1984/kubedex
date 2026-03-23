import { Link } from 'react-router-dom'
import { worlds } from '../data/worlds'
import { Gamepad2, Keyboard, TrendingUp } from 'lucide-react'

export function Landing() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-4 py-10">
      <section className="panel p-8 text-center">
        <h1 className="text-4xl font-bold md:text-6xl"><span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">Maitrise Docker & Kubernetes</span></h1>
        <p className="mt-3 text-slate-300">Apprends les technologies cloud-native de facon progressive et ludique.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/dashboard" className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-black">Commencer l aventure</Link>
          <Link to="/world/world1" className="rounded-lg border border-border px-4 py-2">Voir le curriculum</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-5">
        {worlds.map((world, i) => (
          <div key={world.id} className="panel p-4">
            <div className="text-2xl">{world.emoji}</div>
            <h3 className="mt-2 font-bold">{world.title}</h3>
            <p className="text-sm text-slate-400">{world.lessons.length} lecons</p>
            {i > 0 ? <p className="mt-2 text-xs text-amber-300">🔒 Bientot disponible</p> : null}
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[{ icon: <Gamepad2 />, title: 'Gamification', text: 'XP, badges, niveaux' }, { icon: <Keyboard />, title: 'Editeur integre', text: 'CLI / YAML dans le navigateur' }, { icon: <TrendingUp />, title: 'Progression visuelle', text: 'Carte RPG interactive' }].map((f) => (
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
