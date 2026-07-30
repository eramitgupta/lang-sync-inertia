import type { LangObject, LangValue } from '../types/lang'

export function getValueFromKey(lang: LangObject | undefined, key: string): string | undefined {
  if (typeof lang !== 'object' || lang === null) {
    return undefined
  }

  if (typeof lang[key] === 'string') {
    return lang[key] as string
  }

  const current = key.split('.').reduce<LangValue | undefined>((value, segment) => {
    if (typeof value !== 'object' || value === null) {
      return undefined
    }

    return value[segment] as LangValue | undefined
  }, lang)

  return typeof current === 'string' ? current : undefined
}
