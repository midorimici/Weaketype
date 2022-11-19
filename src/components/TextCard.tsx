import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Card } from '@material-ui/core';

// components
import MyButton from './MyButton';
import Info from './Info';

import { useTranslation } from '../i18n';
import { useTextHandlers } from './hooks/useTextHandlers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      minWidth: '30rem',
      maxWidth: '38rem',
      padding: '1rem',
      minHeight: '10rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      outline: 'none',
    },
    word: {
      overflowWrap: 'anywhere',
      wordBreak: 'break-all',
    },
    buttons: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
);

export default ({ elev }: { elev: number }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { text, typing, position, typo, badKeys, speed, handleKey, typingToggle, refresh } =
    useTextHandlers();

  return (
    <Card
      id="card"
      onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => handleKey(e)}
      tabIndex={0}
      className={classes.card}
      elevation={elev}
    >
      <Info typo={typo} position={position} letters={badKeys} speed={speed} />
      <Box id="textbox">
        <span key={0} className={classes.word}>
          {text
            .replace(' ', ' +')
            .split('+')[0]
            .split('')
            .map((char: string, i: number) => (
              <span key={i} className={i ? 'waiting-letters' : 'current-letter'}>
                {char}
              </span>
            ))}
        </span>
        {text
          .replace(/ /g, ' +')
          .split('+')
          .slice(1)
          .map((word: string, i: number) => (
            <span key={i + 1} className={classes.word}>
              {word.split('').map((char: string, j: number) => (
                <span key={j} className="waiting-letters">
                  {char}
                </span>
              ))}
            </span>
          ))}
      </Box>
      <Box className={classes.buttons}>
        <MyButton id="onoff-btn" onClick={typingToggle}>
          {typing ? 'OFF' : 'ON'}
        </MyButton>
        <MyButton id="refresh-btn" onClick={refresh}>
          {t('refresh')}
        </MyButton>
      </Box>
    </Card>
  );
};
