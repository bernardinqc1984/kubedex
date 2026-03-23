import { useEffect, useState } from 'react'

export function TerminalOutput({ output }: { output: string }) {
  const [text, setText] = useState('')

  useEffect(() => {
    let i = 0
    setText('')
    const timer = setInterval(() => {
      i += 1
      setText(output.slice(0, i))
      if (i >= output.length) clearInterval(timer)
    }, 8)
    return () => clearInterval(timer)
  }, [output])

  return (
    <div className="panel mt-3 overflow-hidden font-mono text-sm">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        <span className="h-2 w-2 rounded-full bg-yellow-500" />
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <span className="ml-1 text-slate-400">terminal</span>
      </div>
      <pre className="min-h-36 whitespace-pre-wrap p-3 text-slate-200">{text}<span className="animate-pulse">|</span></pre>
    </div>
  )
}
