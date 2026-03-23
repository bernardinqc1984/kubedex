import { Trophy } from 'lucide-react'
import type { Level } from '../../store/userStore'

const styles: Record<Level, string> = {
  Apprenti: 'bg-slate-700',
  Ingenieur: 'bg-cyan-500 text-black',
  Architecte: 'bg-violet-600',
  'Maitre du Cluster': 'bg-amber-500 text-black',
}

export function LevelBadge({ level }: { level: Level }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${styles[level]}`}>
      <Trophy size={14} /> {level}
    </span>
  )
}
