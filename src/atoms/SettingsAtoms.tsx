import { atom } from 'recoil';
import type { Languages } from '../lib/constants';
import { wgts, sbns, tlts, ccss, cdss, arss, lggs, defaultText } from '../lib/lib';

export const weightState = atom<number>({
  key: 'weight',
  default: wgts,
});

export const syllableNumberState = atom<number>({
  key: 'syllableNumber',
  default: sbns,
});

export const textLengthState = atom<number>({
  key: 'textltength',
  default: tlts,
});

export const containCapitalsState = atom<boolean>({
  key: 'containCapitals',
  default: ccss,
});

export const containDigraphsState = atom<boolean>({
  key: 'containDigraphs',
  default: cdss,
});

export const autoRefreshState = atom<boolean>({
  key: 'autoRefresh',
  default: arss,
});

export const langState = atom<Languages>({
  key: 'language',
  default: lggs,
});

export const textState = atom<string>({
  key: 'textState',
  default: defaultText,
});
