import { Link } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'
import { XPBar } from '../gamification/XPBar'
import { StreakCounter } from '../gamification/StreakCounter'

export function Navbar() {
  const { xp, level, streak } = useUserStore()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-xl font-bold text-cyan-300">KubeDex</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/leaderboard">Classement</Link>
          <Link to="/profile">Profil</Link>
        </nav>
        <div className="min-w-56"><XPBar xp={xp} level={level} compact /></div>
        <StreakCounter streak={streak} />
      </div>
    </header>
  )
}
