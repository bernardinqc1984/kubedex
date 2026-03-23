import { Link } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'
import { XPBar } from '../gamification/XPBar'
import { StreakCounter } from '../gamification/StreakCounter'
import { useLanguageStore } from '../../store/languageStore'
import { useI18n } from '../../lib/i18n'

export function Navbar() {
  const { xp, level, streak } = useUserStore()
  const { t } = useI18n()
  const { language, setLanguage } = useLanguageStore()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-xl font-bold text-cyan-300">KubeDex</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/dashboard">{t('navDashboard')}</Link>
          <Link to="/leaderboard">{t('navLeaderboard')}</Link>
          <Link to="/profile">{t('navProfile')}</Link>
        </nav>
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
