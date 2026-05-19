import { useLang } from './useLang'

export function lang(): ReturnType<typeof useLang> {
  return useLang()
}

export const vueLang = lang

export { useLang } from './useLang'
