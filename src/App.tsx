import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import AdvancedPage from './pages/AdvancedPage'
import { Dashboard } from './pages/Dashboard'
import { Landing } from './pages/Landing'
import { Leaderboard } from './pages/Leaderboard'
import { LessonPage } from './pages/LessonPage'
import { Profile } from './pages/Profile'
import { WorldMapPage } from './pages/WorldMapPage'
import { AnimatePresence, motion } from 'framer-motion'

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/advanced" element={<AdvancedPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/world/:worldId" element={<WorldMapPage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  )
}
