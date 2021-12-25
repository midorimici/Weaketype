export const vowles = 'aeiou';
export const consonants = 'bcdfghjklmnpqrstvwxyz';
export const vowelsAndSemivowels = ['a', 'e', 'i', 'o', 'u', 'y', 'w'] as const;
export const digraphs = [
  'bl',
  'br',
  'ch',
  'ck',
  'cl',
  'cr',
  'dj',
  'dr',
  'fl',
  'fr',
  'gh',
  'gl',
  'gr',
  'gn',
  'ng',
  'ph',
  'pl',
  'pr',
  'sc',
  'sh',
  'sk',
  'sl',
  'sm',
  'sn',
  'sp',
  'st',
  'th',
  'tr',
  'ts',
  'wh',
  'wr',
];

export const availableLanguages = ['en', 'ja'] as const;
export type Languages = typeof availableLanguages[number];
