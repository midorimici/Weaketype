import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

// MUI
import {
	createMuiTheme,
	ThemeProvider,
	makeStyles,
	Theme,
	createStyles,
} from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

// components
import MyButton from './MyButton';
import SettingItem from './SettingItem';
import {
	weightState,
	syllableNumberState,
	textLengthState,
	containCapitalsState,
	containConsonantDigraphsState,
	containRVowelsState,
} from '../atoms/SettingsAtoms';

import logo from '../cog-solid.svg';

const theme = createMuiTheme({
	palette: {
		secondary: orange,
	},
});

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		textField: {
			marginBottom: '1rem',
		},
		button: {
			padding: '1rem',
		},
	})
);

export default () => {
	const classes = useStyles();

	const [open, setOpen] = useState<boolean>(false);
	const [weight, setWeight] = useRecoilState(weightState);
	const [syllableNumber, setSyllableNumber] = useRecoilState(
		syllableNumberState
	);
	const [textLength, setTextLength] = useRecoilState(textLengthState);

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
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				fullWidth
				disableBackdropClick
			>
				<DialogTitle>
					<Typography variant='h4'>設定</Typography>
				</DialogTitle>
				<ThemeProvider theme={theme}>
					<DialogContent>
						<SettingItem
							title='重み'
							description='打ち間違えたキーの文字がどれぐらい出現しやすくなるかを表します。'
							className={classes.textField}
							value={weight}
							inputProps={{
								step: 1,
								min: 0,
								max: 50,
							}}
							setFunc={setWeight}
						/>
						<SettingItem
							title='音節数'
							description='一単語あたりの音節数、母音の数です。'
							className={classes.textField}
							value={syllableNumber}
							inputProps={{
								step: 1,
								min: 1,
								max: 12,
							}}
							setFunc={setSyllableNumber}
						/>
						<SettingItem
							title='テキストの単語数'
							description='テキスト一回あたりの単語数です。'
							className={classes.textField}
							value={textLength}
							inputProps={{
								step: 1,
								min: 1,
								max: 16,
							}}
							setFunc={setTextLength}
						/>
					</DialogContent>
				</ThemeProvider>
				<DialogActions className={classes.button}>
					<MyButton id='close-settings' onClick={() => setOpen(false)}>
						決定
					</MyButton>
				</DialogActions>
			</Dialog>
		</>
	);
};
