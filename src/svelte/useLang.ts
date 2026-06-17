import { page } from '@inertiajs/svelte'
import { createLang } from '../core/translator'
import type { PageProps } from '../types/page'

export function useLang() {
  return createLang(() => (page.props as Partial<PageProps>).lang)
}
