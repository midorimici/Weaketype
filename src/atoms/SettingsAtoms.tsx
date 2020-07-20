import { atom } from 'recoil';

const vowels = 'aeiou'.split('');
const consonants = 'bcdfghjklmnpqrstvwxyz'.split('');

export const choose = (choice: string[]): string =>
	choice[Math.floor(Math.random() * choice.length)];

const syllable = (v: string[], c: string[]): string => {
	let flag: string = choose(['0', '1', '2']);
	if (flag === '0') {
		return choose(c) + choose(v) + choose(c)
	} else if (flag === '1') {
		return choose(c) + choose(v)
	} else {
		return choose(v) + choose(c)
	}
}

export const word = (v: string[], c: string[], sylNum: number): string => {
	let wordTmp: string = '';
	for (let i: number = 0; i < sylNum; i++) {
		wordTmp += syllable(v, c);
	}
	return wordTmp;
};

let wgt, sbn, tlt, ccs, cds, ars = undefined

export const getCookieValue = (key: string): string =>
	document.cookie.split('; ').find(row => row.startsWith(key))!.split('=')[1];

if (~document.cookie.indexOf('wgt')) {
	wgt = Number(getCookieValue('wgt'));
	sbn = Number(getCookieValue('sbn'));
	tlt = Number(getCookieValue('tlt'));
	ccs = getCookieValue('ccs') === 'true' ? true : false;
	cds = getCookieValue('cds') === 'true' ? true : false;
	ars = getCookieValue('ars') === 'true' ? true : false;
}

const sbns = sbn === undefined ? 2 : sbn
const tlts = tlt === undefined ? 15 : tlt
const ccss = ccs === undefined ? false : ccs
const arss = ars === undefined ? false : ars

export const weightState = atom<number>({
	key: 'weight',
	default: wgt === undefined ? 20 : wgt,
});

export const syllableNumberState = atom<number>({
	key: 'syllableNumber',
	default: sbns
});

export const textLengthState = atom<number>({
	key: 'textltength',
	default: tlts
});

export const containCapitalsState = atom<boolean>({
	key: 'containCapitals',
	default: ccss
});

export const containDigraphsState = atom<boolean>({
	key: 'containDigraphs',
	default: cds === undefined ? false : cds,
});

export const autoRefreshState = atom<boolean>({
	key: 'autoRefresh',
	default: arss
});

export const textState = atom<string>({
	key: 'textState',
	default:
		(ccss
		?	[...Array(tlts)]
		.map(() => word(~document.cookie.indexOf('vwl')
			? getCookieValue('vwl').split(',')
			: vowels, 
			~document.cookie.indexOf('csn')
			? getCookieValue('csn').split(',')
			: consonants, sbns))
		.map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ')
		:	[...Array(tlts)]
		.map(() => word(~document.cookie.indexOf('vwl')
			? getCookieValue('vwl').split(',')
			: vowels, 
			~document.cookie.indexOf('csn')
			? getCookieValue('csn').split(',')
			: consonants, sbns))
			.join(' ')
		) + (arss ? ' ' : '')
});
