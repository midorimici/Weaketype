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
	containDigraphsState,
	autoRefreshState,
	textState,
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

const maxAge: number = 60 * 60 * 24 * 100;

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
	const [containDigraphs, setContainDigraphs] = useRecoilState(
		containDigraphsState
	);
	const [autoRefresh, setAutoRefresh] = useRecoilState(autoRefreshState);
	const [text, setText] = useRecoilState(textState);

	const closeDialog = (): void => {
		setOpen(false);
		if (text.slice(-1)[0] === ' ') {
			setText(text.slice(0, -1));
		} else {
			setText(text + ' ');
		}
		document.cookie = `wgt=${weight}; max-age=${maxAge}; secure`;
		document.cookie = `sbn=${syllableNumber}; max-age=${maxAge}; secure`;
		document.cookie = `tlt=${textLength}; max-age=${maxAge}; secure`;
		document.cookie = `ccs=${containCapitals}; max-age=${maxAge}; secure`;
		document.cookie = `cds=${containDigraphs}; max-age=${maxAge}; secure`;
		document.cookie = `ars=${autoRefresh}; max-age=${maxAge}; secure`;
	};

	return (
		<>
			<img
				onClick={() => setOpen(true)}
				id='setting-icon'
				src={logo}
				width='48'
				height='48'
				alt='setting'
			/>
			<Dialog open={open} onClose={closeDialog} fullWidth disableBackdropClick>
				<DialogTitle disableTypography>
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
							min={0}
							max={50}
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
							min={1}
							max={12}
							setFunc={setSyllableNumber}
						/>
						<SettingNumberItem
							title='テキストの単語数'
							label='単語数'
							description='テキスト一回あたりの単語数です。'
							className={classes.textField}
							value={textLength}
							inputProps={{
								step: 1,
								min: 1,
								max: 16,
							}}
							min={1}
							max={16}
							setFunc={setTextLength}
						/>
						<SettingCheckboxItem
							title='大文字を含む'
							description='各単語の先頭を大文字にします。'
							checked={containCapitals}
							onChange={() => setContainCapitals(!containCapitals)}
						/>
						<SettingCheckboxItem
							title='二重音字を含む'
							description='２字でひとつの音を表すものを単語中に含めます。'
							checked={containDigraphs}
							onChange={() => setContainDigraphs(!containDigraphs)}
						/>
						<SettingCheckboxItem
							title='自動更新'
							description='テキストをすべて打ち終えると自動で次のテキストのタイピングを開始します。'
							checked={autoRefresh}
							onChange={() => setAutoRefresh(!autoRefresh)}
						/>
					</DialogContent>
				</ThemeProvider>
				<DialogActions className={classes.button}>
					<MyButton id='close-settings' onClick={closeDialog}>
						決定
					</MyButton>
				</DialogActions>
			</Dialog>
		</>
	);
};
