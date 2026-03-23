import { motion } from 'framer-motion'
import { useI18n } from '../../lib/i18n'

export function StreakCounter({ streak, large = false }: { streak: number; large?: boolean }) {
  const { t } = useI18n()
  return (
    <div className={`inline-flex items-center gap-2 rounded-lg border border-orange-400/30 bg-orange-500/10 px-3 py-2 ${large ? 'text-lg' : 'text-sm'}`}>
      <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}>🔥</motion.span>
      <span>{streak} {t('days')}</span>
    </div>
  )
}
