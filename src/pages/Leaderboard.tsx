import { useUserStore } from '../store/userStore'
import { useI18n } from '../lib/i18n'

const mock = [
  ['1', 'ClusterKing', 'Maitre du Cluster', 4200, 18, 32],
  ['2', 'YamlMage', 'Architecte', 2650, 14, 19],
  ['3', 'DockerWolf', 'Architecte', 2330, 11, 14],
  ['4', 'KubeFox', 'Ingenieur', 1290, 7, 6],
]

export function Leaderboard() {
  const { t } = useI18n()
  const user = useUserStore()
  const rows = [...mock, ['5', user.username, user.level, user.xp, user.badges.length, user.streak] as const]
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="panel overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/70 text-slate-300"><tr><th className="p-3">{t('rank')}</th><th>{t('user')}</th><th>{t('level')}</th><th>XP</th><th>{t('badges')}</th><th>Streak</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[1]} className={r[1] === user.username ? 'bg-cyan-500/10' : 'border-t border-border'}>
                <td className="p-3">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
