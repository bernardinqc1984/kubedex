import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Dashboard } from './pages/Dashboard'
import { Landing } from './pages/Landing'
import { Leaderboard } from './pages/Leaderboard'
import { LessonPage } from './pages/LessonPage'
import { Profile } from './pages/Profile'
import { WorldMapPage } from './pages/WorldMapPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/world/:worldId" element={<WorldMapPage />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
