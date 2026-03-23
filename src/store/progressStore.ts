import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { lessonById } from '../data/worlds'
import { useUserStore } from './userStore'

interface ProgressState {
  completedLessons: string[]
  lessonStartTimes: Record<string, number>
  lastXpGain: number
  lastUnlockedBadge: string | null
  completeLesson: (lessonId: string, xpReward: number) => void
  startLesson: (lessonId: string) => void
  isCompleted: (lessonId: string) => boolean
  getWorldProgress: (worldId: string, total: number) => number
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      lessonStartTimes: {},
      lastXpGain: 0,
      lastUnlockedBadge: null,
      startLesson: (lessonId) =>
        set((state) => ({ lessonStartTimes: { ...state.lessonStartTimes, [lessonId]: Date.now() } })),
      completeLesson: (lessonId, xpReward) => {
        if (get().completedLessons.includes(lessonId)) return
        const userStore = useUserStore.getState()
        userStore.addXP(xpReward)
        userStore.checkStreak()

        let unlocked: string | null = null
        const meta = lessonById[lessonId]
        if (meta?.badgeOnComplete) {
          userStore.unlockBadge(meta.badgeOnComplete)
          unlocked = meta.badgeOnComplete
        }

        const start = get().lessonStartTimes[lessonId]
        if (start && Date.now() - start < 120000) {
          userStore.unlockBadge('speed_runner')
          unlocked = unlocked ?? 'speed_runner'
        }

        set((state) => ({
          completedLessons: [...state.completedLessons, lessonId],
          lastXpGain: xpReward,
          lastUnlockedBadge: unlocked,
        }))
      },
      isCompleted: (lessonId) => get().completedLessons.includes(lessonId),
      getWorldProgress: (worldId, total) => {
        const done = get().completedLessons.filter((id) => id.startsWith(worldId)).length
        return total === 0 ? 0 : done / total
      },
    }),
    { name: 'kubedex-progress' },
  ),
)
