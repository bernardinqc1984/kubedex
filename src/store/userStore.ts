import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Level = 'Apprenti' | 'Ingenieur' | 'Architecte' | 'Maitre du Cluster'

interface UserState {
  username: string
  xp: number
  streak: number
  lastActiveDate: string | null
  badges: string[]
  level: Level
  addXP: (amount: number) => void
  unlockBadge: (id: string) => void
  checkStreak: () => void
}

const getLevel = (xp: number): Level => {
  if (xp >= 3000) return 'Maitre du Cluster'
  if (xp >= 1500) return 'Architecte'
  if (xp >= 500) return 'Ingenieur'
  return 'Apprenti'
}

const dateDiffDays = (from: Date, to: Date) =>
  Math.floor((to.setHours(0, 0, 0, 0) - from.setHours(0, 0, 0, 0)) / 86400000)

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      username: 'KubeHero',
      xp: 0,
      streak: 0,
      lastActiveDate: null,
      badges: [],
      level: 'Apprenti',
      addXP: (amount) =>
        set((state) => {
          const xp = state.xp + amount
          return { xp, level: getLevel(xp) }
        }),
      unlockBadge: (id) =>
        set((state) => (state.badges.includes(id) ? state : { badges: [...state.badges, id] })),
      checkStreak: () => {
        const today = new Date()
        const last = get().lastActiveDate ? new Date(get().lastActiveDate as string) : null
        if (!last) {
          set({ streak: 1, lastActiveDate: today.toISOString() })
          return
        }
        const diff = dateDiffDays(last, today)
        const nextStreak = diff === 0 ? get().streak : diff === 1 ? get().streak + 1 : 1
        set({ streak: nextStreak, lastActiveDate: today.toISOString() })
        if (nextStreak >= 30) get().unlockBadge('streak_30')
        else if (nextStreak >= 7) get().unlockBadge('streak_7')
      },
    }),
    { name: 'kubedex-user' },
  ),
)

export const levelThresholds = [0, 500, 1500, 3000]
