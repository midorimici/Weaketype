import { vowles, consonants, vowelsAndSemivowels, digraphs } from './constants';

export const choose = (choice: string[]): string =>
  choice[Math.floor(Math.random() * choice.length)];

const syllable = (v: string[], c: string[]): string => {
  let flag: string = choose(['0', '1', '2']);
  if (flag === '0') {
    return choose(c) + choose(v) + choose(c);
  } else if (flag === '1') {
    return choose(c) + choose(v);
  } else {
    return choose(v) + choose(c);
  }
};

export const word = (v: string[], c: string[], sylNum: number): string => {
  let wordTmp: string = '';
  for (let i: number = 0; i < sylNum; i++) {
    wordTmp += syllable(v, c);
  }
  return wordTmp;
};

let wgt: number | null = null,
  sbn: number | null = null,
  tlt: number | null = null,
  ccs: boolean | null = null,
  cds: boolean | null = null,
  ars: boolean | null = null;

export const getCookieValue = (key: string): string =>
  document.cookie
    .split('; ')
    .find((row) => row.startsWith(key))!
    .split('=')[1];

export const vowelss: string[] = ~document.cookie.indexOf('vwl')
  ? getCookieValue('vwl').split(',')
  : vowles.split('');

export const consonantss: string[] = ~document.cookie.indexOf('csn')
  ? getCookieValue('csn').split(',')
  : consonants.split('');

let vowelDigraphss_: string[] = [];

// 二重音字母音
if (~document.cookie.indexOf('vwd')) {
  vowelDigraphss_ = getCookieValue('vwd').split(',');
} else {
  for (const char1 of vowelsAndSemivowels) {
    for (const char2 of vowelsAndSemivowels) {
      vowelDigraphss_.push(char1 + char2);
    }
  }

  vowelDigraphss_ = Array.from(new Set(vowelDigraphss_)).filter(
    (e: string) => e !== 'yy' && e !== 'ww'
  );
}

export let vowelDigraphss: string[] = vowelDigraphss_;

// 二重音字子音
export let consonantDigraphss: string[] = ~document.cookie.indexOf('csd')
  ? getCookieValue('csd').split(',')
  : digraphs;

if (~document.cookie.indexOf('wgt')) {
  wgt = Number(getCookieValue('wgt'));
  sbn = Number(getCookieValue('sbn'));
  tlt = Number(getCookieValue('tlt'));
  ccs = getCookieValue('ccs') === 'true' ? true : false;
  cds = getCookieValue('cds') === 'true' ? true : false;
  ars = getCookieValue('ars') === 'true' ? true : false;
}

export const wgts = wgt ?? 20;
export const sbns = sbn ?? 2;
export const tlts = tlt ?? 15;
export const ccss = ccs ?? false;
export const cdss = cds ?? false;
export const arss = ars ?? false;

let vowelsTmp: string[] = vowelss;
let consonantsTmp: string[] = consonantss;

if (cdss) {
  vowelsTmp = vowelss.concat(vowelDigraphss);
  consonantsTmp = consonantss.concat(consonantDigraphss);
}

export const defaultText =
  (ccss
    ? [...Array(tlts)]
        .map(() =>
          word(
            ~document.cookie.indexOf('vwl') ? vowelsTmp : vowelss,
            ~document.cookie.indexOf('csn') ? consonantsTmp : consonantss,
            sbns
          )
        )
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : [...Array(tlts)]
        .map(() =>
          word(
            ~document.cookie.indexOf('vwl') ? vowelsTmp : vowelss,
            ~document.cookie.indexOf('csn') ? consonantsTmp : consonantss,
            sbns
          )
        )
        .join(' ')) + (arss ? ' ' : '');
