import type { LangObject, Replaces } from '../types/lang'
import { getValueFromKey } from './lookup'
import { replacePlaceholders } from './placeholders'
import { choosePluralLine } from './pluralization'
import type { LangHelpers } from './types'

export type { LangHelpers } from './types'

export function createLang(getLang: () => LangObject | undefined): LangHelpers {
  function trans(key: string, replaces: Replaces | string = {}): string {
    const raw = getValueFromKey(getLang(), key)
    if (typeof raw !== 'string') return key

    if (typeof replaces === 'string') {
      return `${raw} ${replaces}`
    }

    return replacePlaceholders(raw, replaces)
  }

  function __(key: string, replaces: Replaces | string = {}): string {
    return trans(key, replaces)
  }

  function transChoice(key: string, count: number, replaces: Replaces = {}): string {
    const raw = getValueFromKey(getLang(), key)
    if (typeof raw !== 'string') return key

    return replacePlaceholders(choosePluralLine(raw, count), {
      ...replaces,
      count,
      value: replaces.value ?? count
    })
  }

  function trans_choice(key: string, count: number, replaces: Replaces = {}): string {
    return transChoice(key, count, replaces)
  }

  return { trans, __, transChoice, trans_choice }
}
