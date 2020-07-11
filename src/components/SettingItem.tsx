import React from 'react';

// MUI
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

type Props = {
	title: string;
	description: string;
	className: string;
	value: number;
	inputProps: { step: number; min: number; max: number };
	setFunc: (valOrUpdater: number) => void;
};

export default ({
	title,
	description,
	className,
	value,
	inputProps,
	setFunc,
}: Props) => {
	return (
		<>
			<DialogContentText>
				<Typography variant='h5'>{title}</Typography>
				<Typography variant='body1'>{description}</Typography>
			</DialogContentText>
			<TextField
				className={className}
				label={title}
				type='number'
				variant='outlined'
				color='secondary'
				value={value}
				inputProps={inputProps}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setFunc(Number(e.target.value))
				}
			/>
		</>
	);
};
