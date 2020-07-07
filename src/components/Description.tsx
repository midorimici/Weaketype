import React from 'react';
import Box from '@material-ui/core/Box';

export default () => {
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
		</Box>
	);
};
