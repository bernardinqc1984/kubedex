import { badges } from '../data/badges'
import { worlds } from '../data/worlds'
import { XPBar } from '../components/gamification/XPBar'
import { LevelBadge } from '../components/gamification/LevelBadge'
import { useProgressStore } from '../store/progressStore'
import { useUserStore } from '../store/userStore'
import { badgeNameLabel, useI18n } from '../lib/i18n'
import { useAuthStore } from '../store/authStore'
import { useState, type FormEvent } from 'react'

export function Profile() {
  const { t, language } = useI18n()
  const { isAuthenticated, currentUser, login, register, logout } = useAuthStore()
  const user = useUserStore()
  const progress = useProgressStore()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const worldsDone = worlds.filter((w) => w.lessons.every((l) => progress.completedLessons.includes(l.id))).length
  const totalLessons = worlds.reduce((acc, w) => acc + w.lessons.length, 0)
  const globalProgress = Math.round((progress.completedLessons.length / totalLessons) * 100)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const result =
      mode === 'login'
        ? login(email.trim(), password)
        : register(email.trim(), username.trim() || 'KubeHero', password)
    const codeToKey = {
      register_success: 'authRegisterSuccess',
      login_success: 'authLoginSuccess',
      invalid_credentials: 'authInvalidCredentials',
      email_used: 'authEmailUsed',
    } as const
    setMessage(t(codeToKey[result.code]))
  }

  if (!isAuthenticated) {
    return (
      <main className="mx-auto max-w-md px-4 py-10">
        <section className="panel space-y-4 p-6">
          <h1 className="text-2xl font-bold">{t('profileTitle')}</h1>
          <p className="text-sm text-slate-300">{t('authSubtitle')}</p>
          <div className="flex gap-2">
            <button className={`rounded px-3 py-1 text-sm ${mode === 'login' ? 'bg-cyan-500 text-black' : 'bg-slate-800'}`} onClick={() => setMode('login')}>{t('login')}</button>
            <button className={`rounded px-3 py-1 text-sm ${mode === 'register' ? 'bg-cyan-500 text-black' : 'bg-slate-800'}`} onClick={() => setMode('register')}>{t('register')}</button>
          </div>
          <form onSubmit={onSubmit} className="space-y-3">
            {mode === 'register' ? (
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded border border-border bg-slate-900 px-3 py-2" placeholder={t('username')} />
            ) : null}
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded border border-border bg-slate-900 px-3 py-2" placeholder={t('email')} type="email" required />
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded border border-border bg-slate-900 px-3 py-2" placeholder={t('password')} type="password" required />
            <button type="submit" className="w-full rounded bg-cyan-400 px-4 py-2 font-semibold text-black">{mode === 'login' ? t('signIn') : t('createAccount')}</button>
          </form>
          {message ? <p className="text-sm text-slate-300">{message}</p> : null}
        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl space-y-4 px-4 py-8">
      <section className="panel p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 text-lg font-bold text-black">{user.username[0]}</div>
          <div><h1 className="text-2xl font-bold">{currentUser?.username ?? user.username}</h1><p className="text-xs text-slate-400">{currentUser?.email}</p><LevelBadge level={user.level} /></div>
        </div>
        <div className="mt-4"><XPBar xp={user.xp} level={user.level} /></div>
        <button className="mt-3 rounded border border-border px-3 py-1 text-xs" onClick={logout}>{t('logout')}</button>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="panel p-4">{t('completedLessons')}: {progress.completedLessons.length}</div>
        <div className="panel p-4">{t('completedWorlds')}: {worldsDone}</div>
        <div className="panel p-4">{t('globalProgress')}: {globalProgress}%</div>
      </section>
      <section className="panel p-5">
        <h2 className="mb-3 text-lg font-bold">{t('allBadges')}</h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {badges.map((b) => <div key={b.id} className={`rounded-lg border border-border p-3 text-center ${user.badges.includes(b.id) ? '' : 'opacity-40'}`}><div className="text-2xl">{b.emoji}</div><div className="text-xs">{badgeNameLabel(b.id, b.name, language)}</div></div>)}
        </div>
      </section>
    </main>
  )
}
