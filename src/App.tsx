import React from 'react';

// components
import Description from './components/Description';
import TextCard from './components/TextCard';

//styles
import './App.scss';

export default () => {
	return (
		<div id='App'>
			<TextCard />
			<Description />
		</div>
	);
};
