import type { PageProps as InertiaPageProps } from '@inertiajs/core';
import type { LangObject } from './lang';

export interface PageProps extends InertiaPageProps {
    lang: LangObject;
}
