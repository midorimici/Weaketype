import React from 'react';

// MUI
import {
  createTheme,
  ThemeProvider,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

// components
import MyButton from './MyButton';
import SettingNumberItem from './SettingNumberItem';
import SettingCheckboxItem from './SettingCheckboxItem';

import logo from '../cog-solid.svg';
import { useTranslation } from '../i18n';
import { useSettingsHandlers } from './hooks/useSettingsHandlers';

const theme = createTheme({
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
  const { t } = useTranslation();

  const {
    open,
    setOpen,
    weight,
    setWeight,
    syllableNumber,
    setSyllableNumber,
    textLength,
    setTextLength,
    containCapitals,
    setContainCapitals,
    containDigraphs,
    setContainDigraphs,
    autoRefresh,
    setAutoRefresh,
    lang,
    handleLangChange,
    closeDialog,
  } = useSettingsHandlers();

  return (
    <>
      <img
        onClick={() => setOpen(true)}
        id="setting-icon"
        src={logo}
        width="48"
        height="48"
        alt="setting"
      />
      <Dialog open={open} onClose={closeDialog} fullWidth disableBackdropClick>
        <DialogTitle disableTypography>
          <Typography variant="h4">{t('settings')}</Typography>
        </DialogTitle>
        <ThemeProvider theme={theme}>
          <DialogContent>
            <SettingNumberItem
              title={t('weight')}
              description={t('weightDescription')}
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
              title={t('syllableNumber')}
              description={t('syllableNumberDescription')}
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
              title={t('textLength')}
              label={t('textLengthLabel')}
              description={t('textLengthDescription')}
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
              title={t('containCapitals')}
              description={t('containCapitalsDescription')}
              checked={containCapitals}
              onChange={() => setContainCapitals(!containCapitals)}
            />
            <SettingCheckboxItem
              title={t('containDigraphs')}
              description={t('containDigraphsDescription')}
              checked={containDigraphs}
              onChange={() => setContainDigraphs(!containDigraphs)}
            />
            <SettingCheckboxItem
              title={t('autoRefresh')}
              description={t('autoRefreshDescription')}
              checked={autoRefresh}
              onChange={() => setAutoRefresh(!autoRefresh)}
            />
            <Typography variant="h5">{t('language')}</Typography>
            <RadioGroup value={lang} onChange={handleLangChange}>
              <FormControlLabel value="en" control={<Radio />} label="English" />
              <FormControlLabel value="ja" control={<Radio />} label="日本語" />
            </RadioGroup>
          </DialogContent>
        </ThemeProvider>
        <DialogActions className={classes.button}>
          <MyButton id="close-settings" onClick={closeDialog}>
            {t('confirm')}
          </MyButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
