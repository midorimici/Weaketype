import React, { useState } from 'react';

// components
import TextCard from './components/TextCard';
import Description from './components/Description';

//styles
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
			<TextCard elev={elev ? 8 : 1} />
			<Description />
		</div>
	);
};
