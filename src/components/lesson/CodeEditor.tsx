import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { yaml } from '@codemirror/lang-yaml'
import { javascript } from '@codemirror/lang-javascript'

export function CodeEditor({ value, onChange, mode }: { value: string; onChange: (value: string) => void; mode: 'yaml' | 'cli' | 'dockerfile' }) {
  return (
    <CodeMirror
      value={value}
      height="260px"
      theme={oneDark}
      extensions={mode === 'yaml' || mode === 'dockerfile' ? [yaml()] : [javascript()]}
      onChange={onChange}
      basicSetup={{ lineNumbers: true }}
    />
  )
}
