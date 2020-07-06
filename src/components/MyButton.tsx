import React from 'react';
import {
	createMuiTheme,
	withStyles,
	Theme,
	ThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';

const styles = createMuiTheme({
	typography: {
		button: {
			textTransform: 'none',
		},
	},
});

const OrangeButton = withStyles((theme: Theme) => ({
	root: {
		backgroundColor: orange[500],
		'&:hover': {
			backgroundColor: orange[300],
		},
	},
}))(Button);

type Props = {
	children: any;
	onClick: () => void;
};

export default ({ children, onClick }: Props) => {
	return (
		<ThemeProvider theme={styles}>
			<OrangeButton
				onClick={onClick}
				variant='contained'
				color='primary'
				disableElevation
			>
				{children}
			</OrangeButton>
		</ThemeProvider>
	);
};
