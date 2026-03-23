export const ok = (message: string) => ({ ok: true, message })
export const fail = (message: string) => ({ ok: false, message })

export const includesAll = (code: string, values: string[]) =>
  values.every((v) => code.toLowerCase().includes(v.toLowerCase()))
