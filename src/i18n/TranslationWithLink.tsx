import React from 'react';
import { useRecoilValue } from 'recoil';
import { langState } from '../atoms/SettingsAtoms';
import data from './i18n.json';

type Props = {
  k: keyof typeof data;
  href: string;
};

export const TranslationWithLink: React.FC<Props> = ({ k, href }) => {
  const lang = useRecoilValue(langState);
  const text = data[k][lang];
  const match = text.match(/^(.*)<>(.*)<\/>(.*)$/);
  if (match === null) {
    return <>{text}</>;
  }

  const contentBefore = match[1];
  const contentInside = match[2];
  const contentAfter = match[3];

  return (
    <>
      {contentBefore}
      <a href={href} target="_blank" rel="noopener noreferrer">
        {contentInside}
      </a>
      {contentAfter}
    </>
  );
};
