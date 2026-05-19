import { usePage } from '@inertiajs/vue3'
import { createLang } from '../core/translator'
import type { PageProps } from '../types/page'

export function useLang() {
  const page = usePage<PageProps>()

  return createLang(() => page.props.lang)
}
