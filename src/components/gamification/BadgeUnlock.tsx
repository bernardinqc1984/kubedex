import { AnimatePresence, motion } from 'framer-motion'
import { badgeById } from '../../data/badges'
import { useI18n } from '../../lib/i18n'

export function BadgeUnlock({ badgeId, onClose }: { badgeId: string | null; onClose: () => void }) {
  const { t } = useI18n()
  const badge = badgeId ? badgeById[badgeId] : null
  return (
    <AnimatePresence>
      {badge ? (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="w-full max-w-md rounded-xl border border-white/10 bg-surface p-6 text-center"
            initial={{ scale: 0.6, rotate: -6 }}
            animate={{ scale: 1, rotate: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl">{badge.emoji}</div>
            <h3 className="mt-3 text-xl font-bold">{t('badgeUnlocked')}</h3>
            <p className="text-slate-300">{badge.name}</p>
            <button className="mt-6 rounded-lg bg-cyan-500 px-4 py-2 font-medium text-black" onClick={onClose}>{t('continue')}</button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
