import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { lessonById, worlds } from '../data/worlds'
import { lessonContentById } from '../data/lessons'
import { TheoryPanel } from '../components/lesson/TheoryPanel'
import { CodeEditor } from '../components/lesson/CodeEditor'
import { TerminalOutput } from '../components/lesson/TerminalOutput'
import { useProgressStore } from '../store/progressStore'
import { XPPopup } from '../components/gamification/XPPopup'
import { BadgeUnlock } from '../components/gamification/BadgeUnlock'
import { useI18n } from '../lib/i18n'
import { useAuthStore } from '../store/authStore'
import { canAccessLesson } from '../lib/access'

export function LessonPage() {
  const { t } = useI18n()
  const { lessonId = 'world1-l1' } = useParams()
  const navigate = useNavigate()
  const lesson = lessonById[lessonId]
  const content = lessonContentById[lessonId]
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const { completeLesson, startLesson, completedLessons, lastXpGain, lastUnlockedBadge } = useProgressStore()
  const [code, setCode] = useState(content?.initialCode ?? '')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [output, setOutput] = useState('')
  const [showHints, setShowHints] = useState(0)
  const [showBadge, setShowBadge] = useState<string | null>(null)
  const [showXp, setShowXp] = useState(0)

  useEffect(() => {
    if (!lesson || !content) return
    setCode(content.initialCode)
    setError('')
    setSuccess(false)
    setOutput('')
    setShowHints(0)
    startLesson(lesson.id)
  }, [lessonId, lesson, content, startLesson])

  const nextId = useMemo(() => {
    const list = worlds[0].lessons
    const idx = list.findIndex((l) => l.id === lessonId)
    return idx >= 0 && idx < list.length - 1 ? list[idx + 1].id : null
  }, [lessonId])

  if (!lesson || !content) return <main className="p-6">{t('lessonNotFound')}</main>
  const allowed = canAccessLesson(lesson, completedLessons, isAuthenticated)
  if (!allowed) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="panel space-y-3 p-6 text-center">
          <h2 className="text-2xl font-bold">Test verrouille</h2>
          <p className="text-slate-300">Le premier test est accessible sans compte. Connecte-toi pour debloquer les autres.</p>
          <div className="flex justify-center gap-3">
            <Link to="/lesson/world1-l1" className="rounded-lg border border-border px-4 py-2">Aller au premier test</Link>
            <Link to="/profile" className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-black">Se connecter</Link>
          </div>
        </div>
      </main>
    )
  }

  const onValidate = () => {
    const result = content.validate(code)
    if (!result.ok) {
      setError(result.message)
      return
    }
    setError('')
    setSuccess(true)
    setOutput(content.simulatedOutput)
    if (!completedLessons.includes(lesson.id)) {
      completeLesson(lesson.id, lesson.xpReward)
      setShowXp(lastXpGain || lesson.xpReward)
      setTimeout(() => setShowXp(0), 1600)
      if (lastUnlockedBadge) setShowBadge(lastUnlockedBadge)
    }
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-4 px-4 py-6 lg:grid-cols-5">
      <div className="lg:col-span-2"><TheoryPanel lesson={lesson} theory={content.theory} /></div>
      <section className="panel space-y-3 p-4 lg:col-span-3">
        <div className="rounded-lg border border-border bg-bg p-3 text-sm">{content.exerciseInstructions}</div>
        <div className="space-y-2">
          {content.hints.slice(0, showHints).map((hint, idx) => <div key={hint} className="rounded border border-yellow-500/30 bg-yellow-500/10 p-2 text-sm">{idx + 1}. {hint}</div>)}
          {showHints < 3 ? <button className="text-sm text-yellow-300 underline" onClick={() => setShowHints((v) => v + 1)}>{t('showHint')}</button> : null}
        </div>
        <CodeEditor value={code} onChange={setCode} mode={content.exerciseType} />
        <button className="w-full rounded-lg bg-cyan-400 px-4 py-3 font-semibold text-black" onClick={onValidate}>{t('validate')}</button>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {success ? <p className="text-sm text-green-400">{content.successMessage}</p> : null}
        {output ? <TerminalOutput output={output} /> : null}
        <div className="flex justify-between">
          <Link to={`/lesson/${worlds[0].lessons[Math.max(0, worlds[0].lessons.findIndex((l) => l.id === lessonId) - 1)].id}`} className="text-sm text-slate-300">← {t('previous')}</Link>
          {nextId ? <button className="text-sm text-cyan-300" onClick={() => navigate(`/lesson/${nextId}`)}>{t('nextLesson')} →</button> : null}
        </div>
      </section>
      <XPPopup xp={showXp} />
      <BadgeUnlock badgeId={showBadge} onClose={() => setShowBadge(null)} />
    </main>
  )
}
