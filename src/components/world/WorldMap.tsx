import { Check, Lock, Sword, Star } from 'lucide-react'
import type { LessonMeta, WorldMeta } from '../../data/worlds'
import { useProgressStore } from '../../store/progressStore'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { canAccessLesson } from '../../lib/access'

const isAvailable = (lesson: LessonMeta, completedLessons: string[], isAuthenticated: boolean) =>
  canAccessLesson(lesson, completedLessons, isAuthenticated)

export function WorldMap({ world }: { world: WorldMeta }) {
  const { completedLessons } = useProgressStore()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const navigate = useNavigate()

  return (
    <div className="panel relative h-[420px] overflow-hidden p-4">
      <svg className="absolute inset-0 h-full w-full opacity-60">
        {world.lessons.map((lesson) => {
          if (!lesson.prerequisite) return null
          const from = world.lessons.find((l) => l.id === lesson.prerequisite)
          if (!from) return null
          return <line key={lesson.id} x1={`${from.position.x}%`} y1={`${from.position.y}%`} x2={`${lesson.position.x}%`} y2={`${lesson.position.y}%`} stroke={world.color} strokeDasharray="5 5" />
        })}
      </svg>
      {world.lessons.map((lesson) => {
        const completed = completedLessons.includes(lesson.id)
        const available = isAvailable(lesson, completedLessons, isAuthenticated)
        const size = lesson.type === 'boss' ? 56 : 40
        return (
          <button
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
            }}
          >
            {completed ? <Check size={16} className="mx-auto" /> : available ? lesson.type === 'boss' ? <Sword size={16} className="mx-auto" /> : <Star size={16} className="mx-auto" /> : <Lock size={16} className="mx-auto" />}
          </button>
        )
      })}
    </div>
  )
}
