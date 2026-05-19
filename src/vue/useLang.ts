import { usePage } from '@inertiajs/vue3'
import { Replaces } from '../types/lang'
import { PageProps } from '../types/page'

export function useLang() {
  const page = usePage<PageProps>()

  function trans(key: string, replaces: Replaces | string = {}): string {
    const raw = getValueFromKey(key)
    if (typeof raw !== 'string') return key

    let translated = raw

    if (typeof replaces === 'string') {
      translated += ' ' + replaces
    } else if (typeof replaces === 'object') {
      translated = replacePlaceholders(translated, replaces)
    }

    return translated
  }

  function __(key: string, replaces: Replaces | string = {}) {
    return trans(key, replaces)
  }

  function transChoice(key: string, count: number, replaces: Replaces = {}): string {
    const raw = getValueFromKey(key)
    if (typeof raw !== 'string') return key

    const translated = choosePluralLine(raw, count)

    return replacePlaceholders(translated, {
      ...replaces,
      count,
      value: replaces.value ?? count
    })
  }

  function trans_choice(key: string, count: number, replaces: Replaces = {}): string {
    return transChoice(key, count, replaces)
  }

  function replacePlaceholders(text: string, replaces: Replaces): string {
    return text.replace(/[{]([A-Za-z0-9_]+)[}]|:([A-Za-z0-9_]+)/g, (match, braceKey, colonKey) => {
      const key = braceKey ?? colonKey

      return Object.prototype.hasOwnProperty.call(replaces, key) ? String(replaces[key]) : match
    })
  }

  function choosePluralLine(text: string, count: number): string {
    const choices = text.split('|')

    if (choices.length === 1) return stripPluralCondition(choices[0])

    const explicitChoice = choices.find((choice) => matchesPluralCondition(choice, count))
    if (explicitChoice) return stripPluralCondition(explicitChoice)

    return stripPluralCondition(count === 1 ? choices[0] : choices[choices.length - 1])
  }

  function matchesPluralCondition(choice: string, count: number): boolean {
    const exactMatch = choice.match(/^\s*[{](-?\d+(?:\.\d+)?)[}]/)
    if (exactMatch) return count === Number(exactMatch[1])

    const intervalMatch = choice.match(
      /^\s*([\[\]])\s*(-?\d+(?:\.\d+)?|\*)\s*,\s*(-?\d+(?:\.\d+)?|\*)\s*([\[\]])/
    )
    if (!intervalMatch) return false

    const [, lowerBracket, lowerValue, upperValue, upperBracket] = intervalMatch
    const lower = lowerValue === '*' ? -Infinity : Number(lowerValue)
    const upper = upperValue === '*' ? Infinity : Number(upperValue)
    const aboveLower = lowerBracket === '[' ? count >= lower : count > lower
    const belowUpper = upperBracket === ']' ? count <= upper : count < upper

    return aboveLower && belowUpper
  }

  function stripPluralCondition(choice: string): string {
    return choice
      .replace(/^\s*[{]-?\d+(?:\.\d+)?[}]\s*/, '')
      .replace(/^\s*[\[\]]\s*(?:-?\d+(?:\.\d+)?|\*)\s*,\s*(?:-?\d+(?:\.\d+)?|\*)\s*[\[\]]\s*/, '')
  }

  function getValueFromKey(key: string): string | undefined {
    const langObj = page.props.lang

    // Direct lookup first — handles keys containing literal dots (e.g. sentences)
    if (typeof langObj === 'object' && langObj !== null && typeof langObj[key] === 'string') {
      return langObj[key] as string
    }

    // Fall back to dot-notation traversal for nested keys
    const segments = key.split('.')
    let current: any = langObj

    for (const segment of segments) {
      if (typeof current !== 'object' || current === null) return undefined
      current = current[segment]
    }

    return typeof current === 'string' ? current : undefined
  }

  return { trans, __, transChoice, trans_choice }
}
