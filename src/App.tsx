import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';

// components
import Settings from './components/Settings';
import TextCard from './components/TextCard';
import Description from './components/Description';
import AboutCookie from './components/AboutCookie';

// assets
import './App.scss';
import logo from './logo.svg';

export default () => {
	const [elev, setElev] = useState<boolean>(false);

	return (
		<RecoilRoot>
			<img id='logo' src={logo} width='300' alt='logo'/>
			<div
				id='App'
				onClick={() =>
					setElev(document.activeElement === document.getElementById('card'))
				}
			>
				<Settings />
				<TextCard elev={elev ? 8 : 1} />
				<Description />
				<footer>
					<a href='https://github.com/midorimici/Weaketype' target='_blank' rel='noopener noreferrer'>
						ソースコード
					</a>
					<br></br>
					© 2020 みどりみち
				</footer>
				<AboutCookie />
			</div>
		</RecoilRoot>
	);
};
