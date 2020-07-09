import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';

// components
import MyButton from './MyButton';
import PopUp from './PopUp';

// styles
import './PopUp.scss';

const popUpMap: { [key: number]: string } = {
	0: 'onoff-btn',
	1: 'refresh-btn',
	2: 'info',
};

const cardContentMap: { [key: number]: string[] } = {
	0: [
		'ON ボタンを押すと、キーボード入力を受けつけるようになります。',
		'カードをクリックして浮かせるとタイピングを開始できます。',
		'テキストをすべて打ち終えると OFF になります。',
	],
	1: ['更新ボタンを押すとテキストが更新されます。'],
	2: [
		`この部分に、苦手なキー、打ち間違えた回数、
	現在のテキストにおけるタイピング正確率が表示されます。`,
		'更新ボタンを押すと、苦手なキーをもとに新たなテキストを生成します。',
	],
};

export default () => {
	const [order, setOrder] = useState<number>(0);

	const showPopUp = (): void => {
		document.getElementById('popup')!.hidden = false;
		document.getElementById('popup-card')!.hidden = false;
		setPositions(0);
	};

	const setPositions = (ord: number): void => {
		let targetRect: DOMRect = document
			.getElementById(popUpMap[ord])!
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
	};

	const handleClick = () => {
		if (order === 2) {
			setOrder(0);
			document.getElementById('popup-card')!.hidden = true;
			document.getElementById('popup')!.hidden = true;
			return;
		}
		setOrder(order + 1);
		setPositions(order + 1);
	};

	return (
		<>
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
			<PopUp onClick={handleClick} />
			<Card id='popup-card' hidden>
				{cardContentMap[order].map((p: string) => (
					<p>{p}</p>
				))}
			</Card>
		</>
	);
};
