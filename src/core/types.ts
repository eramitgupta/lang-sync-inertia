import type { Replaces } from '../types/lang'

export interface LangHelpers {
  trans: (key: string, replaces?: Replaces | string) => string
  __: (key: string, replaces?: Replaces | string) => string
  transChoice: (key: string, count: number, replaces?: Replaces) => string
  trans_choice: (key: string, count: number, replaces?: Replaces) => string
}
