import React from 'react';

// MUI
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

type Props = {
	title: string;
	description: string;
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default ({ title, description, checked, onChange }: Props) => {
	return (
		<Grid container justify='space-between'>
			<Grid item>
				<DialogContentText>
					<Typography variant='h5'>{title}</Typography>
					<Typography variant='body1'>{description}</Typography>
				</DialogContentText>
			</Grid>
			<Grid item>
				<Checkbox checked={checked} onChange={onChange} />
			</Grid>
		</Grid>
	);
};
