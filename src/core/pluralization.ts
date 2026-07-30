import {
  exactPluralPattern,
  exactPluralPrefixPattern,
  intervalPluralPattern,
  intervalPluralPrefixPattern
} from '../constants/patterns'

export function choosePluralLine(text: string, count: number): string {
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
