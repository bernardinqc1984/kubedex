import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useUserStore } from './userStore'

interface AuthUser {
  email: string
  username: string
  password: string
}

interface AuthState {
  users: AuthUser[]
  currentUser: Omit<AuthUser, 'password'> | null
  isAuthenticated: boolean
  register: (email: string, username: string, password: string) => { ok: boolean; code: 'register_success' | 'email_used' }
  login: (email: string, password: string) => { ok: boolean; code: 'login_success' | 'invalid_credentials' }
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      isAuthenticated: false,
      register: (email, username, password) => {
        const exists = get().users.some((u) => u.email.toLowerCase() === email.toLowerCase())
        if (exists) return { ok: false, code: 'email_used' }

        const user = { email, username, password }
        set((state) => ({
          users: [...state.users, user],
          currentUser: { email, username },
          isAuthenticated: true,
        }))
        useUserStore.setState({ username })
        return { ok: true, code: 'register_success' }
      },
      login: (email, password) => {
        const user = get().users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
        )
        if (!user) return { ok: false, code: 'invalid_credentials' }

        set({
          currentUser: { email: user.email, username: user.username },
          isAuthenticated: true,
        })
        useUserStore.setState({ username: user.username })
        return { ok: true, code: 'login_success' }
      },
      logout: () => {
        set({ currentUser: null, isAuthenticated: false })
        useUserStore.setState({ username: 'KubeHero' })
      },
    }),
    { name: 'kubedex-auth' },
  ),
)
