import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';

// components
import MyButton from './MyButton';
import Info from './Info';

import {
	vowelss,
	consonantss,
	vowelDigraphss,
	consonantDigraphss,
	choose,
	word,
	weightState,
	syllableNumberState,
	textLengthState,
	containCapitalsState,
	containDigraphsState,
	autoRefreshState,
	textState,
} from '../atoms/SettingsAtoms';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			minWidth: '30rem',
			maxWidth: '38rem',
			padding: '1rem',
			minHeight: '10rem',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			outline: 'none',
		},
		word: {
			overflowWrap: 'anywhere',
		},
		buttons: {
			'& > *': {
				margin: theme.spacing(1),
			},
		},
	})
);

// cookie 取得
const getCookieValue = (key: string): string =>
	document.cookie
		.split('; ')
		.find((row) => row.startsWith(key))!
		.split('=')[1];

const maxAge: number = 60 * 60 * 24 * 100;

export default ({ elev }: { elev: number }) => {
	const classes = useStyles();

	const weight: number = useRecoilValue(weightState);
	const syllableNumber: number = useRecoilValue(syllableNumberState);
	const textLength: number = useRecoilValue(textLengthState);
	const containCapitals: boolean = useRecoilValue(containCapitalsState);
	const containDigraphs: boolean = useRecoilValue(containDigraphsState);
	const autoRefresh: boolean = useRecoilValue(autoRefreshState);

	const [vowels, setVowels] = useState<string[]>(vowelss);
	const [consonants, setConsonants] = useState<string[]>(consonantss);
	const [vowelDigraphs, setVowelDigraphs] = useState<string[]>(vowelDigraphss);
	const [consonantDigraphs, setConsonantDigraphs] = useState<string[]>(consonantDigraphss);

	const [text, setText] = useRecoilState(textState);
	const [typing, setTyping] = useState<boolean>(false);
	const [position, setPosition] = useState<number>(0);
	const [typo, setTypo] = useState<number[]>(new Array(0));
	const [badKeys, setBadKeys] = useState<string[]>(
		~document.cookie.indexOf('bks') ? getCookieValue('bks').split(',') : []
	);

	const handleKey = (e: React.KeyboardEvent<HTMLDivElement>): void => {
		if (typing) {
			let textSpans: Element[] = Array.from(
				document.getElementById('textbox')!.children
			)
				.map((word: Element) => Array.from(word.children))
				.flat();

			let currentLetter: string = text[position].toLowerCase();
			let prevLetter: string =
				position === 0 ? '' : text[position - 1].toLowerCase();
			let nextLetter: string =
				position === text.length - 1 ? '' : text[position + 1].toLowerCase();
			let prevTwoLetters: string = prevLetter + currentLetter;
			let nextTwoLetters: string = currentLetter + nextLetter;

			if (e.key === text[position]) {
				if (
					vowelDigraphs.filter((char: string) => char === prevTwoLetters)
						.length >= 2
				) {
					vowelDigraphs.splice(vowelDigraphs.indexOf(prevTwoLetters), 1);
				} else if (
					vowelDigraphs.filter((char: string) => char === nextTwoLetters)
						.length >= 2
				) {
					vowelDigraphs.splice(vowelDigraphs.indexOf(nextTwoLetters), 1);
				} else if (
					consonantDigraphs.filter((char: string) => char === prevTwoLetters)
						.length >= 2
				) {
					consonantDigraphs.splice(
						consonantDigraphs.indexOf(prevTwoLetters),
						1
					);
				} else if (
					consonantDigraphs.filter((char: string) => char === nextTwoLetters)
						.length >= 2
				) {
					consonantDigraphs.splice(
						consonantDigraphs.indexOf(nextTwoLetters),
						1
					);
				} else if (
					vowels.filter((char: string) => char === currentLetter).length >= 2
				) {
					setVowels(vowels.join('').replace(currentLetter, '').split(''));
				} else if (
					consonants.filter((char: string) => char === currentLetter).length >=
					2
				) {
					setConsonants(
						consonants.join('').replace(currentLetter, '').split('')
					);
				}

				let typed: Element = textSpans[position];

				typed.classList.add('typed-letters');

				let mark: string = choose('★♥♦'.split(''));
				typed.setAttribute('data-name', mark);

				typed.classList.remove('current-letter');

				if (~badKeys.indexOf(currentLetter)) {
					let badKeysTmp: string[] = badKeys;
					badKeysTmp.splice(badKeysTmp.indexOf(currentLetter), 1);
					setBadKeys(badKeysTmp);
				}

				if (position <= text.length - 2) {
					textSpans[position + 1].className = 'current-letter';
					setPosition(position + 1);
				} else {
					autoRefresh ? refresh() : setTyping(false);
				}
			} else {
				if (typo.indexOf(position) === -1) {
					if (~vowels.indexOf(currentLetter)) {
						if (containDigraphs) {
							if (~vowelDigraphs.indexOf(prevTwoLetters)) {
								setVowelDigraphs(vowelDigraphs.concat(
									new Array<string>(Math.floor(weight / 2)).fill(prevTwoLetters)
								));
								setVowels(
									vowels.concat(
										new Array<string>(Math.floor(weight / 2)).fill(
											currentLetter
										)
									)
								);
							} else if (~vowelDigraphs.indexOf(nextTwoLetters)) {
								setVowelDigraphs(vowelDigraphs.concat(
									new Array<string>(Math.floor(weight / 2)).fill(nextTwoLetters)
								));
								setVowels(
									vowels.concat(
										new Array<string>(Math.floor(weight / 2)).fill(
											currentLetter
										)
									)
								);
							} else {
								setVowels(
									vowels.concat(
										new Array<string>(Math.floor(weight)).fill(currentLetter)
									)
								);
							}
						} else {
							setVowels(
								vowels.concat(
									new Array<string>(Math.floor(weight)).fill(currentLetter)
								)
							);
						}
					} else if (~consonants.indexOf(currentLetter)) {
						if (containDigraphs) {
							if (~consonantDigraphs.indexOf(prevTwoLetters)) {
								setConsonantDigraphs(consonantDigraphs.concat(
									new Array<string>(Math.floor(weight / 2)).fill(prevTwoLetters)
								));
								setConsonants(
									consonants.concat(
										new Array<string>(Math.floor(weight / 2)).fill(
											currentLetter
										)
									)
								);
							} else if (~consonantDigraphs.indexOf(nextTwoLetters)) {
								setConsonantDigraphs(consonantDigraphs.concat(
									new Array<string>(Math.floor(weight / 2)).fill(nextTwoLetters)
								));
								setConsonants(
									consonants.concat(
										new Array<string>(Math.floor(weight / 2)).fill(
											currentLetter
										)
									)
								);
							} else {
								setConsonants(
									consonants.concat(
										new Array<string>(Math.floor(weight)).fill(currentLetter)
									)
								);
							}
						} else {
							setConsonants(
								consonants.concat(
									new Array<string>(Math.floor(weight)).fill(currentLetter)
								)
							);
						}
					}

					if (currentLetter !== ' ') {
						setBadKeys(
							badKeys.concat(new Array<string>(weight).fill(currentLetter))
						);
					}

					setTypo([...typo, position]);
					textSpans[position].classList.add('typo');

					document.getElementById('bad-keys')!.classList.remove('anim');
					void document.getElementById('bad-keys')!.offsetWidth;
					document.getElementById('bad-keys')!.classList.add('anim');
				}
			}
		}
	};

	const typingToggle = (): void => setTyping(typing ? false : true);

	const refresh = (): void => {
		let textSpans: Element[] = Array.from(
			document.getElementById('textbox')!.children
		)
			.map((word: Element) => Array.from(word.children))
			.flat();

		for (const i of textSpans) {
			i.className = 'waiting-letters';
		}
		textSpans[0].className = 'current-letter';

		let vowelsTmp: string[] = vowels;
		let consonantsTmp: string[] = consonants;

		if (containDigraphs) {
			vowelsTmp = vowels.concat(vowelDigraphs);
			consonantsTmp = consonants.concat(consonantDigraphs);
		}

		if (containCapitals) {
			setText(
				[...Array(textLength)]
					.map(() => word(vowelsTmp, consonantsTmp, syllableNumber))
					.map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
					.join(' ') + (autoRefresh ? ' ' : '')
			);
		} else {
			setText(
				[...Array(textLength)]
					.map(() => word(vowelsTmp, consonantsTmp, syllableNumber))
					.join(' ') + (autoRefresh ? ' ' : '')
			);
		}
		setPosition(0);
		setTypo(new Array(0));
		document.cookie = `bks=${badKeys}; max-age=${maxAge}; secure`;
		document.cookie = `vwl=${vowels}; max-age=${maxAge}; secure`;
		document.cookie = `vwd=${vowelDigraphs}; max-age=${maxAge}; secure`;
		document.cookie = `csn=${consonantsTmp}; max-age=${maxAge}; secure`;
		document.cookie = `csd=${consonantDigraphs}; max-age=${maxAge}; secure`;
	};

	return (
		<Card
			id='card'
			onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => handleKey(e)}
			tabIndex={0}
			className={classes.card}
			elevation={elev}
		>
			<Info typo={typo} position={position} letters={badKeys} />
			<Box id='textbox'>
				<span key={0} className={classes.word}>
					{text
						.replace(' ', ' +')
						.split('+')[0]
						.split('')
						.map((char: string, i: number) => (
							<span
								key={i}
								className={i ? 'waiting-letters' : 'current-letter'}
							>
								{char}
							</span>
						))}
				</span>
				{text
					.replace(/ /g, ' +')
					.split('+')
					.slice(1)
					.map((word: string, i: number) => (
						<span key={i + 1} className={classes.word}>
							{word.split('').map((char: string, j: number) => (
								<span key={j} className='waiting-letters'>
									{char}
								</span>
							))}
						</span>
					))}
			</Box>
			<Box className={classes.buttons}>
				<MyButton id='onoff-btn' onClick={typingToggle}>
					{typing ? 'OFF' : 'ON'}
				</MyButton>
				<MyButton id='refresh-btn' onClick={refresh}>
					更新
				</MyButton>
			</Box>
		</Card>
	);
};
