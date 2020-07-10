import React, { useState } from 'react';

// components
import Settings from './components/Settings';
import TextCard from './components/TextCard';
import Description from './components/Description';

// assets
import './App.scss';

export default () => {
	const [elev, setElev] = useState<boolean>(false);

	return (
		<div
			id='App'
			onClick={() =>
				setElev(document.activeElement === document.getElementById('card'))
			}
		>
			<Settings />
			<TextCard elev={elev ? 8 : 1} />
			<Description />
		</div>
	);
};
