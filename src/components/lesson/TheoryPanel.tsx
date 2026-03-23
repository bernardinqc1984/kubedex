import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { LessonMeta } from '../../data/worlds'

export function TheoryPanel({ lesson, theory }: { lesson: LessonMeta; theory: string }) {
  return (
    <aside className="panel h-full overflow-auto p-4">
      <div className="mb-3 text-sm text-slate-400">{lesson.id} - {lesson.type.toUpperCase()}</div>
      <h1 className="mb-4 text-2xl font-bold">{lesson.title}</h1>
      <article className="prose prose-invert max-w-none prose-headings:text-cyan-300">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{theory}</ReactMarkdown>
      </article>
    </aside>
  )
}
