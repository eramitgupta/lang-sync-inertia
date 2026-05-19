import { useLang } from './useLang'

export function lang(): ReturnType<typeof useLang> {
  return useLang()
}

export const reactLang = lang

export { useLang } from './useLang'
