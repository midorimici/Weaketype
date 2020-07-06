import React from 'react';
import Box from '@material-ui/core/Box';

type Props = {
	typo: number[];
	position: number;
	letters: string;
};

export default ({ typo, position, letters }: Props) => {
	const badChars = (str: string): string[] => {
		const charMap: { [key: string]: number } = {};
		let maxChars: string[] = [];

		for (let char of str) {
			if (charMap[char]) {
				charMap[char]++;
			} else {
				charMap[char] = 1;
			}
		}

		for (let i = 0; i <= 2; i++) {
			maxChars.push(
				...Object.keys(charMap).filter(
					(char) =>
						charMap[char] ===
						Array.from(new Set(Object.values(charMap))).sort(
							(a, b) => b - a
						)[i]
				)
			);
		}

		return maxChars;
	};

	return (
		<Box paddingTop='1rem' fontSize='1.5rem'>
			<span>ミスタイプ数：{typo.length}　</span>
			<span>
				正確率：
				{(
					100 *
					(1 -
						typo.length /
							(typo.slice(-1)[0] === position
								? position + 1
								: position === 0
								? 1
								: position))
				).toFixed(2)}
				%
			</span>
		</Box>
	);
};
