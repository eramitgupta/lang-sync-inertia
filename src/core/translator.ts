import type { LangObject, LangValue, Replaces } from '../types/lang'

export interface LangHelpers {
  trans: (key: string, replaces?: Replaces | string) => string
  __: (key: string, replaces?: Replaces | string) => string
  transChoice: (key: string, count: number, replaces?: Replaces) => string
  trans_choice: (key: string, count: number, replaces?: Replaces) => string
}

const placeholderPattern = /[{]([A-Za-z0-9_]+)[}]|:([A-Za-z0-9_]+)/g
const exactPluralPattern = /^\s*[{](-?\d+(?:\.\d+)?)[}]/
const intervalPluralPattern = /^\s*[[\]]\s*(-?\d+(?:\.\d+)?|\*)\s*,\s*(-?\d+(?:\.\d+)?|\*)\s*[[\]]/
const exactPluralPrefixPattern = /^\s*[{]-?\d+(?:\.\d+)?[}]\s*/
const intervalPluralPrefixPattern =
  /^\s*[[\]]\s*(?:-?\d+(?:\.\d+)?|\*)\s*,\s*(?:-?\d+(?:\.\d+)?|\*)\s*[[\]]\s*/

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

function replacePlaceholders(text: string, replaces: Replaces): string {
  return text.replace(placeholderPattern, (match, braceKey, colonKey) => {
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
  const exactMatch = choice.match(exactPluralPattern)
  if (exactMatch) return count === Number(exactMatch[1])

  const intervalMatch = choice.match(intervalPluralPattern)
  if (!intervalMatch) return false

  const [, lowerBracket, lowerValue, upperValue, upperBracket] = intervalMatch
  const lower = lowerValue === '*' ? -Infinity : Number(lowerValue)
  const upper = upperValue === '*' ? Infinity : Number(upperValue)
  const aboveLower = lowerBracket === '[' ? count >= lower : count > lower
  const belowUpper = upperBracket === ']' ? count <= upper : count < upper

  return aboveLower && belowUpper
}

function stripPluralCondition(choice: string): string {
  return choice.replace(exactPluralPrefixPattern, '').replace(intervalPluralPrefixPattern, '')
}

function getValueFromKey(lang: LangObject | undefined, key: string): string | undefined {
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
