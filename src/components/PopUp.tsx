import React from 'react';

// styles
import './PopUp.scss';

export default () => {
	return (
		<div id='popup' className='hide'>
			<div className='shadow' style={{ top: 0, left: 0 }}></div>
			<div className='shadow' style={{ top: 0 }}></div>
			<div className='shadow'></div>
			<div className='shadow' style={{ left: 0 }}></div>
			<div id='light'></div>
		</div>
	);
};
