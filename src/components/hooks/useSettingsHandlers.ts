import { useState } from 'react';
import { useRecoilState } from 'recoil';

import {
  weightState,
  syllableNumberState,
  textLengthState,
  containCapitalsState,
  containDigraphsState,
  autoRefreshState,
  langState,
  textState,
} from '../../atoms/SettingsAtoms';
import { availableLanguages, Languages } from '../../i18n';
import { setCookie } from '../../lib/cookie';

export const useSettingsHandlers = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [weight, setWeight] = useRecoilState(weightState);
  const [syllableNumber, setSyllableNumber] = useRecoilState(syllableNumberState);
  const [textLength, setTextLength] = useRecoilState(textLengthState);
  const [containCapitals, setContainCapitals] = useRecoilState(containCapitalsState);
  const [containDigraphs, setContainDigraphs] = useRecoilState(containDigraphsState);
  const [autoRefresh, setAutoRefresh] = useRecoilState(autoRefreshState);
  const [lang, setLang] = useRecoilState(langState);
  const [text, setText] = useRecoilState(textState);

  const handleLangChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as Languages;
    if (availableLanguages.includes(value)) {
      setLang(value);
    }
  };

  const closeDialog = (): void => {
    setOpen(false);
    if (!autoRefresh && text.slice(-1)[0] === ' ') {
      setText(text.slice(0, -1));
    } else if (autoRefresh && text.slice(-1)[0] !== ' ') {
      setText(text + ' ');
    }
    setCookie('wgt', weight);
    setCookie('sbn', syllableNumber);
    setCookie('tlt', textLength);
    setCookie('ccs', containCapitals);
    setCookie('cds', containDigraphs);
    setCookie('ars', autoRefresh);
  };

  return {
    open,
    setOpen,
    weight,
    setWeight,
    syllableNumber,
    setSyllableNumber,
    textLength,
    setTextLength,
    containCapitals,
    setContainCapitals,
    containDigraphs,
    setContainDigraphs,
    autoRefresh,
    setAutoRefresh,
    lang,
    handleLangChange,
    closeDialog,
  };
};
