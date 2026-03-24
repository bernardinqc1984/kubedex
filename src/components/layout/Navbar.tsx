import { Link } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'
import { XPBar } from '../gamification/XPBar'
import { StreakCounter } from '../gamification/StreakCounter'
import { useLanguageStore } from '../../store/languageStore'
import { useI18n } from '../../lib/i18n'
import { useAuthStore } from '../../store/authStore'

export function Navbar() {
  const { xp, level, streak } = useUserStore()
  const { t } = useI18n()
  const { language, setLanguage } = useLanguageStore()
  const { isAuthenticated, logout } = useAuthStore()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-xl font-bold text-cyan-300">KubeDex</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/dashboard">{t('navDashboard')}</Link>
          <Link to="/leaderboard">{t('navLeaderboard')}</Link>
          <Link to="/profile">{t('navProfile')}</Link>
          <Link to="/advanced" className="inline-flex items-center gap-1">
            Advanced
            <span className="rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">NEW</span>
          </Link>
        </nav>
        {isAuthenticated ? (
          <button onClick={logout} className="rounded-md border border-border px-3 py-1 text-xs">{t('logout')}</button>
        ) : (
          <Link to="/profile" className="rounded-md border border-border px-3 py-1 text-xs">{t('login')}</Link>
        )}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'fr' | 'en')}
          className="rounded-md border border-border bg-slate-900 px-2 py-1 text-xs"
          aria-label="Language selector"
        >
          <option value="fr">FR</option>
          <option value="en">EN</option>
        </select>
        <div className="min-w-56"><XPBar xp={xp} level={level} compact /></div>
        <StreakCounter streak={streak} />
      </div>
    </header>
  )
}
