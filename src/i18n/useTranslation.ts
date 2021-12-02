import { useRecoilValue } from 'recoil';
import { langState } from '../atoms/SettingsAtoms';
import data from './i18n.json';

export type TranslationKey = keyof typeof data;

export const useTranslation = (): { t: (key: TranslationKey) => string } => {
  const lang = useRecoilValue(langState);

  const t = (key: TranslationKey): string => {
    return data[key][lang];
  };

  return { t };
};
