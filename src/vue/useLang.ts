import { usePage } from '@inertiajs/vue3';
import { Replaces } from '../types/lang';
import { PageProps } from '../types/page';

export function useLang() {
    const page = usePage<PageProps>()

    function trans(key: string, replaces: Replaces | string = {}): string {
        const raw = getValueFromKey(key);
        if (typeof raw !== 'string') return key;

        let translated = raw;

        if (typeof replaces === 'string') {
            translated += ' ' + replaces;
        } else if (typeof replaces === 'object') {
            translated = replacePlaceholders(translated, replaces);
        }

        return translated;
    }

    function __(key: string, replaces: Replaces | string = {}) {
        return trans(key, replaces);
    }

    function replacePlaceholders(text: string, replaces: Replaces): string {
        return Object.entries(replaces).reduce(
            (acc, [key, val]) => acc.replaceAll(`{${key}}`, String(val)),
            text
        );
    }

    function getValueFromKey(key: string): string | undefined {
        const segments = key.split('.');
        let current: any = page.props.lang;

        for (const segment of segments) {
            if (typeof current !== 'object' || current === null)
                return undefined;
            current = current[segment];
        }

        return typeof current === 'string' ? current : undefined;
    }

    return { trans, __ };
}
