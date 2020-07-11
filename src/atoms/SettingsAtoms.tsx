import { atom } from 'recoil';

export const weightState = atom<number>({
	key: 'weight',
	default: 10,
});

export const syllableNumberState = atom<number>({
	key: 'syllableNumber',
	default: 2,
});

export const textLengthState = atom<number>({
	key: 'textLength',
	default: 15,
});

export const containCapitalsState = atom<boolean>({
	key: 'containCapitals',
	default: false,
});

export const containConsonantDigraphsState = atom<boolean>({
	key: 'containConsonantDigraphs',
	default: false,
});

export const containRVowelsState = atom<boolean>({
	key: 'containRVowels',
	default: false,
});
