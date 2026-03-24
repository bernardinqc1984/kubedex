import { useUserStore } from '../store/userStore'
import { levelLabel, useI18n } from '../lib/i18n'
import { motion } from 'framer-motion'

const mock = [
  ['1', 'k8s_wizard', 'Maitre du Cluster', 3850, 12, 45],
  ['2', 'docker_ninja', 'Architecte', 2340, 9, 22],
  ['3', 'cloud_native', 'Architecte', 1980, 7, 15],
  ['4', 'KubeFox', 'Ingenieur', 1290, 7, 6],
  ['5', 'pod_hunter', 'Ingenieur', 1110, 6, 5],
  ['6', 'yaml_runner', 'Ingenieur', 930, 5, 4],
  ['7', 'service_mesh', 'Apprenti', 500, 3, 2],
]

export function Leaderboard() {
  const { t, language } = useI18n()
  const user = useUserStore()
  const rows = [...mock, ['8', user.username, user.level, user.xp, user.badges.length, user.streak] as const]
  const translateMockLevel = (value: string) => {
    if (value === 'Apprenti' || value === 'Ingenieur' || value === 'Architecte' || value === 'Maitre du Cluster') {
      return levelLabel(value, language)
    }
    return value
  }
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {rows.slice(0, 3).map((r, idx) => (
          <div key={r[1]} className={`panel p-4 text-center ${idx === 0 ? 'md:order-2 md:scale-105' : idx === 1 ? 'md:order-1' : 'md:order-3'}`}>
            <div className="text-2xl">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</div>
            <div className="mx-auto mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 font-bold text-black">{String(r[1]).slice(0, 1).toUpperCase()}</div>
            <p className="mt-2 font-semibold">{r[1]}</p>
            <p className="text-xs text-slate-400">{r[3]} XP</p>
          </div>
        ))}
      </div>
      <div className="panel overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/70 text-slate-300"><tr><th className="p-3">{t('rank')}</th><th>{t('user')}</th><th>{t('level')}</th><th>XP</th><th>{t('badges')}</th><th>Streak</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <motion.tr key={r[1]} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={r[1] === user.username ? 'bg-cyan-500/10' : 'border-t border-border'}>
                <td className="p-3">{r[0]}</td><td>{r[1]}</td><td>{translateMockLevel(String(r[2]))}</td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5]}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
