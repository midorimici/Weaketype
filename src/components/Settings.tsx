import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import logo from '../cog-solid.svg';

export default () => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<>
			<img
				onClick={() => setOpen(true)}
				id='setting-logo'
				src={logo}
				width='48'
				height='48'
				alt='setting'
			/>
			<Dialog open={open} onClose={() => setOpen(false)} fullWidth>
				<DialogTitle>
					<Typography variant='h4'>設定</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<Typography variant='h5'>重み</Typography>
						<Typography variant='body1'>
							打ち間違えたキーの文字がどれぐらい出現しやすくなるかを表します。
						</Typography>
					</DialogContentText>
					<TextField
						label='重み'
						type='number'
						variant='outlined'
						defaultValue={10}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
};
