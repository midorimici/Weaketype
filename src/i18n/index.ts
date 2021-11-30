import { useRecoilValue } from 'recoil';
import { langState } from '../atoms/SettingsAtoms';
import data from './i18n.json';

export const availableLanguages = ['en', 'ja'] as const;
export type Languages = typeof availableLanguages[number];

export const useTranslation = (): { t: (key: keyof typeof data) => string } => {
  const lang = useRecoilValue(langState);

  const t = (key: keyof typeof data): string => {
    return data[key][lang];
  };

  return { t };
};
