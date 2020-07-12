import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';

// components
import MyButton from './MyButton';
import Info from './Info';

import {
	weightState,
	syllableNumberState,
	textLengthState,
	containCapitalsState,
	containConsonantDigraphsState,
	containRVowelsState,
} from '../atoms/SettingsAtoms';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			width: '30rem',
			padding: '1rem',
			minHeight: '10rem',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			outline: 'none',
			/*
			'&:focus': {
				boxShadow: `0px 2px 15px 5px rgba(0,0,0,0.2),
        0px 1px 15px 6px rgba(0,0,0,0.14),
        0px 1px 17px 6px rgba(0,0,0,0.12)`,
			},
			*/
		},
		buttons: {
			'& > *': {
				margin: theme.spacing(1),
			},
		},
	})
);

const choose = (choice: string[]): string =>
	choice[Math.floor(Math.random() * choice.length)];

const syllable = (v: string[], c: string[]): string =>
	choose(c) + choose(v) + choose(c);

const word = (v: string[], c: string[], sylNum: number): string => {
	let wordTmp: string = '';
	for (let i: number = 0; i < sylNum; i++) {
		wordTmp += syllable(v, c);
	}
	return wordTmp;
};

export default ({ elev }: { elev: number }) => {
	const classes = useStyles();

	const weight: number = useRecoilValue(weightState);
	const syllableNumber: number = useRecoilValue(syllableNumberState);
	const textLength: number = useRecoilValue(textLengthState);
	const containCapitals: boolean = useRecoilValue(containCapitalsState);

	const [vowels, setVowels] = useState<string[]>('aeiou'.split(''));
	const [consonants, setConsonants] = useState<string[]>(
		'bcdfghjklmnpqrstvwxyz'.split('')
	);
	const [text, setText] = useState<string>(
		[...Array(textLength)]
			.map(() => word(vowels, consonants, syllableNumber))
			.join(' ')
	);
	const [typing, setTyping] = useState<boolean>(false);
	const [position, setPosition] = useState<number>(0);
	const [typo, setTypo] = useState<number[]>(new Array(0));

	const handleKey = (e: React.KeyboardEvent<HTMLDivElement>): void => {
		if (typing) {
			let textSpans: HTMLCollection = document.querySelector('#textbox')!
				.children;
			if (e.key === text[position]) {
				if (vowels.filter((char: string) => char === e.key).length >= 2) {
					setVowels(vowels.join('').replace(e.key, '').split(''));
				} else if (
					consonants.filter((char: string) => char === e.key).length >= 2
				) {
					setConsonants(consonants.join('').replace(e.key, '').split(''));
				}

				let typed: Element = textSpans[position];

				typed.classList.add('typed-letters');

				let mark: string = choose('★♥♦'.split(''));
				typed.setAttribute('data-name', mark);

				typed.classList.remove('current-letter');

				if (position <= text.length - 2) {
					textSpans[position + 1].className = 'current-letter';
					setPosition(position + 1);
				} else {
					setTyping(false);
				}
			} else {
				if (typo.indexOf(position) === -1) {
					let typoedLetter: string = text[position].toLowerCase();

					if (~vowels.indexOf(typoedLetter)) {
						let chars: string[] = vowels.filter(
							(e: string) => ~e.indexOf(typoedLetter)
						);
						setVowels(
							vowels.concat(
								chars
									.map((e: string) =>
										new Array<string>(Math.floor(weight / chars.length)).fill(e)
									)
									.flat()
							)
						);
					} else if (~consonants.indexOf(typoedLetter)) {
						let chars: string[] = consonants.filter(
							(e: string) => ~e.indexOf(typoedLetter)
						);
						setConsonants(
							consonants.concat(
								chars
									.map((e: string) =>
										new Array<string>(Math.floor(weight / chars.length)).fill(e)
									)
									.flat()
							)
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
		let textSpans: HTMLCollection = document.querySelector('#textbox')!
			.children;
		for (const i of textSpans) {
			i.className = 'waiting-letters';
		}
		textSpans[0].className = 'current-letter';

		if (containCapitals) {
			setText(
				[...Array(textLength)]
					.map(() => word(vowels, consonants, syllableNumber))
					.map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
					.join(' ')
			);
		} else {
			setText(
				[...Array(textLength)]
					.map(() => word(vowels, consonants, syllableNumber))
					.join(' ')
			);
		}
		setPosition(0);
		setTypo(new Array(0));
	};

	return (
		<Card
			id='card'
			onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => handleKey(e)}
			tabIndex={0}
			className={classes.card}
			elevation={elev}
		>
			<Info
				typo={typo}
				position={position}
				letters={vowels.join('') + consonants.join('')}
			/>
			<Box id='textbox'>
				<span className='current-letter'>{text[0]}</span>
				{text
					.split('')
					.slice(1)
					.map((char: string) => (
						<span className='waiting-letters'>{char}</span>
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
