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

export const containDigraphsState = atom<boolean>({
	key: 'containDigraphs',
	default: false,
});

export const autoRefreshState = atom<boolean>({
	key: 'autoRefresh',
	default: false,
});
