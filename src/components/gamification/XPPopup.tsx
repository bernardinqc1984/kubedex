import { AnimatePresence, motion } from 'framer-motion'

export function XPPopup({ xp }: { xp: number }) {
  return (
    <AnimatePresence>
      {xp > 0 ? (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="fixed right-6 bottom-6 z-50 rounded-lg border border-cyan-400/40 bg-surface px-4 py-3 font-semibold text-cyan-300"
        >
          +{xp} XP
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
