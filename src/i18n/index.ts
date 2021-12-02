import type { TranslationKey } from './useTranslation';

export const availableLanguages = ['en', 'ja'] as const;
export type Languages = typeof availableLanguages[number];
export { useTranslation } from './useTranslation';
export type { TranslationKey };
export { TranslationWithLink } from './TranslationWithLink';
