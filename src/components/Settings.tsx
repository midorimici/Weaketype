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
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

// components
import MyButton from './MyButton';
import SettingNumberItem from './SettingNumberItem';
import SettingCheckboxItem from './SettingCheckboxItem';
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
	const [containCapitals, setContainCapitals] = useRecoilState(
		containCapitalsState
	);
	const [
		containConsonantDigraphs,
		setContainConsonantDigraphs,
	] = useRecoilState(containConsonantDigraphsState);
	const [containRVowels, setContainRVowels] = useRecoilState(
		containRVowelsState
	);

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
						<SettingNumberItem
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
						<SettingNumberItem
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
						<SettingNumberItem
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
						<SettingCheckboxItem
							title='大文字を含む'
							description='各単語の先頭を大文字にします。'
							checked={containCapitals}
							onChange={() => setContainCapitals(!containCapitals)}
						/>
						<SettingCheckboxItem
							title='二重音字子音を含む'
							description='子音２字でひとつの音を表すものを単語中に含めます。'
							checked={containConsonantDigraphs}
							onChange={() =>
								setContainConsonantDigraphs(!containConsonantDigraphs)
							}
						/>
						<SettingCheckboxItem
							title='Rつき母音を含む'
							description='Rが前後につく母音を単語中に含めます。'
							checked={containRVowels}
							onChange={() => setContainRVowels(!containRVowels)}
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
