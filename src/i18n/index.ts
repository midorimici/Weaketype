export const availableLanguages = ['en', 'ja'] as const;
export type Languages = typeof availableLanguages[number];
export { useTranslation } from './useTranslation';
export { TranslationWithLink } from './TranslationWithLink';
