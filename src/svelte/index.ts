import { useLang } from './useLang'

export function lang(): ReturnType<typeof useLang> {
  return useLang()
}

export const svelteLang = lang

export { useLang } from './useLang'
