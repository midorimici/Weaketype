import { useRecoilValue } from 'recoil';
import { langState } from '../atoms/SettingsAtoms';
import data from './i18n.json';

export const useTranslation = (): { t: (key: keyof typeof data) => string } => {
  const lang = useRecoilValue(langState);

  const t = (key: keyof typeof data): string => {
    return data[key][lang];
  };

  return { t };
};
