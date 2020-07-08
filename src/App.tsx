import React from 'react';

// components
import TextCard from './components/TextCard';
import Description from './components/Description';
import PopUp from './components/PopUp';

//styles
import './App.scss';

export default () => {
	return (
		<div id='App'>
			<TextCard />
			<Description />
			<PopUp />
		</div>
	);
};
