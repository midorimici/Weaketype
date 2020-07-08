import React from 'react';
import Box from '@material-ui/core/Box';

// components
import MyButton from './MyButton';

const popUpMap: { [key: number]: string } = {
	0: 'onoff-btn',
	1: 'refresh-btn',
	2: 'info',
};

export default () => {
	const showPopUp = (): void => {
		document.getElementById('popup')!.className = '';
		setPositions(0);
	};

	const setPositions = (order: number): void => {
		let targetRect: DOMRect = document
			.getElementById(popUpMap[order])!
			.getBoundingClientRect();
		let top: number = targetRect.top;
		let right: number = targetRect.right;
		let bottom: number = targetRect.bottom;
		let left: number = targetRect.left;

		let shadows = document.getElementsByClassName('shadow') as HTMLCollectionOf<
			HTMLElement
		>;
		let light: HTMLElement = document.getElementById('light')!;

		shadows[0].style.width = right + 'px';
		shadows[0].style.height = top + 'px';

		shadows[1].style.left = right + 'px';
		shadows[1].style.width = `${window.innerWidth - right}px`;
		shadows[1].style.height = bottom + 'px';

		shadows[2].style.top = bottom + 'px';
		shadows[2].style.left = left + 'px';
		shadows[2].style.width = `${window.innerWidth - left}px`;
		shadows[2].style.height = `${window.innerHeight - bottom}px`;

		shadows[3].style.top = top + 'px';
		shadows[3].style.width = left + 'px';
		shadows[3].style.height = `${window.innerHeight - top}px`;

		light.style.top = top + 'px';
		light.style.left = left + 'px';
		light.style.width = targetRect.width + 'px';
		light.style.height = targetRect.height + 'px';

		document.getElementById('popup')!.onclick = () => {
			if (order === 2) {
				document.getElementById('popup')!.className = 'hide';
				return;
			}
			setPositions(order + 1);
		};
	};

	return (
		<Box
			component='section'
			id='description'
			m={4}
			fontFamily='Meiryo'
			fontSize='1.2rem'
		>
			<h2>あなたの苦手なキーはどれ？</h2>
			<Box>
				<p>タイピング速度を上げるには、タイプミスを減らすのが効果的です。</p>
				<p>
					打ち間違いの多い苦手なキーを集中的に練習して、正確なタイピングを目指しましょう！
				</p>
			</Box>
			<MyButton id='showpopup-btn' onClick={showPopUp} elev={true}>
				説明を見る
			</MyButton>
		</Box>
	);
};
