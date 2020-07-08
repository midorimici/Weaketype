import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';

// components
import MyButton from './MyButton';
import Info from './Info';

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

const choose = (choice: string): string =>
	choice.charAt(Math.floor(Math.random() * choice.length));

const syllable = (v: string, c: string): string =>
	choose(c) + choose(v) + choose(c) + choose(c) + choose(v) + choose(c);

export default ({ elev }: { elev: number }) => {
	const classes = useStyles();

	const [vowels, setVowels] = useState<string>('aeiou');
	const [consonants, setConsonants] = useState<string>('bcdfghjklmnpqrstvwxyz');
	const [text, setText] = useState<string>(
		[...Array(15)].map(() => syllable(vowels, consonants)).join(' ')
	);
	const [typing, setTyping] = useState<boolean>(false);
	const [position, setPosition] = useState<number>(0);
	const [typo, setTypo] = useState<number[]>(new Array(0));

	const handleKey = (e: React.KeyboardEvent<HTMLDivElement>): void => {
		if (typing) {
			let textSpans: HTMLCollection = document.querySelector('#textbox')!
				.children;
			if (e.key === text[position]) {
				if ((vowels.match(new RegExp(e.key, 'g')) || []).length >= 2) {
					setVowels(vowels.replace(e.key, ''));
				} else if (
					(consonants.match(new RegExp(e.key, 'g')) || []).length >= 2
				) {
					setConsonants(consonants.replace(e.key, ''));
				}

				let typed: Element = textSpans[position];

				typed.classList.add('typed-letters');

				let mark: string = choose('★♥♦');
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
					let typoedLetter: string = text[position];

					if (~vowels.indexOf(typoedLetter)) {
						setVowels(vowels + typoedLetter.repeat(10));
					} else if (~consonants.indexOf(typoedLetter)) {
						setConsonants(consonants + typoedLetter.repeat(10));
					}

					setTypo([...typo, position]);
					textSpans[position].classList.add('typo');
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
		setText([...Array(15)].map(() => syllable(vowels, consonants)).join(' '));
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
			<Info typo={typo} position={position} letters={vowels + consonants} />
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
					Refresh
				</MyButton>
			</Box>
		</Card>
	);
};
