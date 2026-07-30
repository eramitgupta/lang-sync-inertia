import type { Replaces } from '../types/lang'
import { placeholderPattern } from '../constants/patterns'

export function replacePlaceholders(text: string, replaces: Replaces): string {
  return text.replace(
    placeholderPattern,
    (match: string, braceKey: string | undefined, colonKey: string | undefined) => {
      const key = braceKey ?? colonKey ?? ''

      return Object.prototype.hasOwnProperty.call(replaces, key) ? String(replaces[key]) : match
    }
  )
}
