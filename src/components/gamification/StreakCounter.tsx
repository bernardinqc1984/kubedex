import { motion } from 'framer-motion'

export function StreakCounter({ streak, large = false }: { streak: number; large?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-lg border border-orange-400/30 bg-orange-500/10 px-3 py-2 ${large ? 'text-lg' : 'text-sm'}`}>
      <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}>🔥</motion.span>
      <span>{streak} jours</span>
    </div>
  )
}
