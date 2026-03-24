import { Link } from 'react-router-dom'
import { worlds } from '../data/worlds'
import { Gamepad2, Keyboard, Map, BookOpen, Trophy } from 'lucide-react'
import { useI18n, worldSubtitleLabel, worldTitleLabel } from '../lib/i18n'
import { motion } from 'framer-motion'

const terminalScript = [
  '$ docker run hello-world',
  'Hello from Docker!',
  '$ kubectl get pods',
  'No resources found in default namespace.',
  '$ oc login https://api.cluster.example.com:6443',
  'Login successful.',
]

function AnimatedTerminal() {
  return (
    <div className="panel h-[280px] overflow-hidden bg-[#000010]">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        <span className="h-2 w-2 rounded-full bg-yellow-500" />
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-slate-400">terminal</span>
      </div>
      <div className="space-y-2 p-4 font-mono text-sm text-slate-200">
        {terminalScript.map((line, idx) => (
          <motion.p key={line + idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.3 }}>
            {line}
          </motion.p>
        ))}
        <span className="animate-pulse">|</span>
      </div>
    </div>
  )
}

export function Landing() {
  const { t, language } = useI18n()
  const stats = language === 'en'
    ? ['500+ Learners', '5 Worlds', '40+ Lessons', '100% Free']
    : ['500+ Apprenants', '5 Mondes', '40+ Lecons', '100% Gratuit']
  const heroBadge = language === 'en' ? '✦ French Cloud Native Platform ✦' : '✦ Plateforme Cloud Native Francaise ✦'
  const titleLine1 = language === 'en' ? 'Master' : 'Maitrise'
  const featureTitle1 = language === 'en' ? 'Gamified Learning' : 'Apprentissage Gamifie'
  const lockLabel = language === 'en' ? 'LOCKED 🔒' : 'VERROUILLE 🔒'
  const newLabel = language === 'en' ? 'NEW 🔴' : 'NOUVEAU 🔴'
  const howItWorksTitle = language === 'en' ? 'How it works?' : 'Comment ca marche ?'
  const steps = language === 'en'
    ? ['Choose a world', 'Read theory', 'Practice', 'Earn rewards']
    : ['Choisis un monde', 'Lis la theorie', 'Pratique', 'Gagne des recompenses']
  return (
    <main className="mx-auto max-w-7xl space-y-12 px-4 py-10">
      <section className="relative overflow-hidden rounded-2xl border border-border p-8 md:p-10">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#1e1e2e 1px, transparent 1px), linear-gradient(90deg, #1e1e2e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute -top-30 -left-20 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-20 -bottom-30 h-60 w-60 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <motion.span initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              {heroBadge}
            </motion.span>
            <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="block">{titleLine1}</motion.span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="block bg-gradient-to-r from-cyan-300 to-cyan-500/70 bg-clip-text text-transparent">Docker &</motion.span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="block bg-gradient-to-r from-violet-300 to-violet-500/70 bg-clip-text text-transparent">Kubernetes</motion.span>
            </h1>
            <p className="mt-4 max-w-xl text-slate-300">{t('masterySubtitle')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link to="/dashboard" className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-black shadow-[0_0_24px_rgba(0,212,255,0.25)]">{t('startAdventure')} →</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link to="/world/world1" className="rounded-lg border border-cyan-400/30 px-5 py-3 text-cyan-200">{t('seeCurriculum')} ↓</Link>
              </motion.div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              {stats.map((s, i) => <span key={s}>{s}{i < stats.length - 1 ? ' ·' : ''}</span>)}
            </div>
          </div>
          <AnimatedTerminal />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-5">
        {worlds.map((world, i) => (
          <motion.div key={world.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="panel card-hover p-4">
            <div className="rounded-lg p-3 text-3xl" style={{ background: `${world.color}14` }}>{world.emoji}</div>
            <h3 className="mt-2 font-bold">{worldTitleLabel(world.id, world.title, language)}</h3>
            <p className="text-sm text-slate-400">{worldSubtitleLabel(world.id, world.subtitle, language)}</p>
            <div className="mt-3 text-xs text-slate-400">0 / {world.lessons.length} {t('lessons')}</div>
            <div className="mt-1 text-xs text-slate-500">{world.lessons.reduce((a, l) => a + l.xpReward, 0)} XP</div>
            {i > 0 ? <p className="mt-2 inline-block rounded bg-amber-500/20 px-2 py-1 text-xs text-amber-300">{lockLabel}</p> : null}
            {world.id === 'world5' ? <p className="mt-2 inline-block rounded bg-red-500/20 px-2 py-1 text-xs text-red-300">{newLabel}</p> : null}
          </motion.div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[{ icon: <Gamepad2 />, title: featureTitle1, text: t('featureGamification') }, { icon: <Keyboard />, title: t('integratedEditor'), text: t('featureEditor') }, { icon: <Map />, title: t('worldProgress'), text: t('featureProgress') }].map((f, i) => (
          <motion.article key={f.title} className="panel card-hover p-5" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="mb-3 inline-flex rounded-lg bg-cyan-500/10 p-2 text-cyan-300">{f.icon}</div>
            <h4 className="font-semibold">{f.title}</h4>
            <p className="text-sm text-slate-400">{f.text}</p>
          </motion.article>
        ))}
      </section>

      <section className="panel p-6">
        <h2 className="text-xl font-bold">{howItWorksTitle}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {[{ icon: <Map size={18} />, title: steps[0] }, { icon: <BookOpen size={18} />, title: steps[1] }, { icon: <Keyboard size={18} />, title: steps[2] }, { icon: <Trophy size={18} />, title: steps[3] }].map((s) => (
            <div key={s.title} className="rounded-lg border border-border p-3">
              <div className="mb-2 text-cyan-300">{s.icon}</div>
              <p className="text-sm font-semibold">{s.title}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
