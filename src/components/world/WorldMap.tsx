import { Check, Lock, Sword, Star } from 'lucide-react'
import type { LessonMeta, WorldMeta } from '../../data/worlds'
import { useProgressStore } from '../../store/progressStore'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { canAccessLesson } from '../../lib/access'
import { motion } from 'framer-motion'

const isAvailable = (lesson: LessonMeta, completedLessons: string[], isAuthenticated: boolean) =>
  canAccessLesson(lesson, completedLessons, isAuthenticated)

export function WorldMap({ world }: { world: WorldMeta }) {
  const { completedLessons } = useProgressStore()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const navigate = useNavigate()

  return (
    <div
      className="panel relative h-[420px] overflow-hidden p-4"
      style={{
        background: `
          radial-gradient(ellipse at 15% 85%, ${world.color}10 0%, transparent 50%),
          radial-gradient(ellipse at 85% 15%, ${world.color}07 0%, transparent 50%),
          repeating-linear-gradient(0deg, transparent, transparent 39px, ${world.color}08 39px, ${world.color}08 40px),
          repeating-linear-gradient(90deg, transparent, transparent 39px, ${world.color}08 39px, ${world.color}08 40px)
        `,
      }}
    >
      {['⎈', '🐳', '📦', '⎈', '📦', '🐳'].map((p, i) => (
        <motion.span key={`${p}-${i}`} className="absolute text-xs opacity-10" style={{ left: `${10 + i * 13}%`, top: `${18 + (i % 3) * 22}%` }} animate={{ y: [0, -8, 0] }} transition={{ duration: 4 + i, repeat: Infinity }}>
          {p}
        </motion.span>
      ))}
      <svg className="absolute inset-0 h-full w-full opacity-60">
        {world.lessons.map((lesson) => {
          if (!lesson.prerequisite) return null
          const from = world.lessons.find((l) => l.id === lesson.prerequisite)
          if (!from) return null
          const isActive = completedLessons.includes(from.id)
          return (
            <motion.line
              key={lesson.id}
              x1={`${from.position.x}%`}
              y1={`${from.position.y}%`}
              x2={`${lesson.position.x}%`}
              y2={`${lesson.position.y}%`}
              stroke={isActive ? `${world.color}80` : '#1e1e2e'}
              strokeWidth="1"
              strokeDasharray="100"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
          )
        })}
      </svg>
      {world.lessons.map((lesson) => {
        const completed = completedLessons.includes(lesson.id)
        const available = isAvailable(lesson, completedLessons, isAuthenticated)
        const size = lesson.type === 'boss' ? 56 : 44
        return (
          <motion.button
            key={lesson.id}
            title={`${lesson.title} - ${lesson.xpReward} XP`}
            onClick={() => available && navigate(`/lesson/${lesson.id}`)}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              left: `${lesson.position.x}%`,
              top: `${lesson.position.y}%`,
              width: size,
              height: size,
              borderColor: completed ? '#22c55e' : available ? world.color : '#475569',
              opacity: available ? 1 : 0.45,
              background: completed ? '#14532d' : '#12121a',
              boxShadow: lesson.type === 'boss' ? `0 0 18px ${world.color}80` : available ? `0 0 12px ${world.color}40` : 'none',
            }}
            whileHover={{ scale: 1.06, rotate: lesson.type === 'boss' ? 4 : 0 }}
          >
            {completed ? <Check size={16} className="mx-auto" /> : available ? lesson.type === 'boss' ? <Sword size={16} className="mx-auto" /> : <Star size={16} className="mx-auto" /> : <Lock size={16} className="mx-auto" />}
          </motion.button>
        )
      })}
    </div>
  )
}
