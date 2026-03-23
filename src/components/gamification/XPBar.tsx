import { motion } from 'framer-motion'
import { levelThresholds } from '../../store/userStore'
import type { Level } from '../../store/userStore'

const nextTarget = (xp: number) => levelThresholds.find((t) => t > xp) ?? 3000
const currentTarget = (xp: number) => [...levelThresholds].reverse().find((t) => t <= xp) ?? 0

export function XPBar({ xp, level, compact = false }: { xp: number; level: Level; compact?: boolean }) {
  const min = currentTarget(xp)
  const max = nextTarget(xp)
  const percent = max === min ? 100 : ((xp - min) / (max - min)) * 100

  return (
    <div className={compact ? 'space-y-1' : 'space-y-2'}>
      <div className="flex justify-between text-xs text-slate-400">
        <span>{level}</span>
        <span>{xp} / {max} XP</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(0, Math.min(percent, 100))}%` }}
        />
      </div>
    </div>
  )
}
