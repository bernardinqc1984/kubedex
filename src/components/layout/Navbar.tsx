import { Link } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'
import { XPBar } from '../gamification/XPBar'
import { StreakCounter } from '../gamification/StreakCounter'
import { useLanguageStore } from '../../store/languageStore'
import { useI18n } from '../../lib/i18n'
import { useAuthStore } from '../../store/authStore'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const { xp, level, streak } = useUserStore()
  const { t } = useI18n()
  const { language, setLanguage } = useLanguageStore()
  const { isAuthenticated, logout } = useAuthStore()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-40 bg-bg/90 backdrop-blur transition-all ${scrolled ? 'border-b border-border shadow-lg' : ''}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="group inline-flex items-center gap-2 text-xl font-bold text-cyan-300">
          <span className="text-2xl transition-all group-hover:drop-shadow-[0_0_8px_#00d4ff]">⎈</span>
          <span>KubeDex</span>
        </Link>
        <button className="rounded border border-border p-2 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="toggle menu">
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
        <nav className="hidden items-center gap-4 text-sm md:flex">
          <Link to="/dashboard">{t('navDashboard')}</Link>
          <Link to="/leaderboard">{t('navLeaderboard')}</Link>
          <Link to="/profile">{t('navProfile')}</Link>
          <Link to="/advanced" className="inline-flex items-center gap-1">
            Advanced
            <span className="rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">NEW</span>
          </Link>
        </nav>
        <div title={`${xp} XP · Prochain niveau dans ${Math.max(0, (level === 'Apprenti' ? 500 : level === 'Ingenieur' ? 1500 : level === 'Architecte' ? 3000 : xp) - xp)} XP`} className="hidden max-w-[140px] md:block">
          <XPBar xp={xp} level={level} compact />
        </div>
        {isAuthenticated ? (
          <button onClick={logout} className="hidden rounded-md border border-border px-3 py-1 text-xs md:block">{t('logout')}</button>
        ) : (
          <Link to="/profile" className="hidden rounded-md border border-border px-3 py-1 text-xs md:block">{t('login')}</Link>
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
        <div className="hidden md:block"><StreakCounter streak={streak} /></div>
      </div>
      {open ? (
        <div className="border-t border-border p-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm">
            <Link to="/dashboard" onClick={() => setOpen(false)}>{t('navDashboard')}</Link>
            <Link to="/leaderboard" onClick={() => setOpen(false)}>{t('navLeaderboard')}</Link>
            <Link to="/profile" onClick={() => setOpen(false)}>{t('navProfile')}</Link>
            <Link to="/advanced" onClick={() => setOpen(false)}>Advanced</Link>
            <div className="pt-2"><XPBar xp={xp} level={level} compact /></div>
            <StreakCounter streak={streak} />
          </div>
        </div>
      ) : null}
      <div className="hidden">
        {/* keeps old import usage consistent in mobile fallback */}
        <XPBar xp={xp} level={level} compact />
      </div>
    </header>
  )
}
