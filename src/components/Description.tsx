import React from 'react';
import { Box, Card, CardContent, CardActions } from '@material-ui/core';

// components
import MyButton from './MyButton';
import PopUp from './PopUp';

// styles
import './PopUp.scss';

import { TranslationKey, useTranslation } from '../i18n';
import { usePopUpHandlers } from './hooks/usePopUpHandlers';

const cardContentMap: Record<number, TranslationKey[]> = {
  0: ['descriptionGuide/0-1', 'descriptionGuide/0-2', 'descriptionGuide/0-3'],
  1: ['descriptionGuide/1-1'],
  2: ['descriptionGuide/2-1', 'descriptionGuide/2-2'],
  3: ['descriptionGuide/3-1', 'descriptionGuide/3-2'],
  4: ['descriptionGuide/4-1'],
};

export default () => {
  const { t } = useTranslation();

  const { order, showPopUp, handleNext, handlePrevious } = usePopUpHandlers();

  return (
    <>
      <Box component="section" id="description" m={4} fontFamily="Meiryo" fontSize="1.2rem">
        <h2>{t('descriptionTitle')}</h2>
        <Box>
          <p>{t('description/1')}</p>
          <p>{t('description/2')}</p>
        </Box>
        <MyButton id="showpopup-btn" onClick={showPopUp} elev={true}>
          {t('description/seeGuides')}
        </MyButton>
      </Box>
      <PopUp onClick={handleNext} />
      <Card id="popup-card" hidden>
        <CardContent>
          {cardContentMap[order].map((p: TranslationKey, i: number) => (
            <p key={i}>{t(p)}</p>
          ))}
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <MyButton id="desc-prev-btn" onClick={handlePrevious} disabled={order === 0}>
            {t('prev')}
          </MyButton>
          <MyButton id="desc-next-btn" onClick={handleNext}>
            {t('next')}
          </MyButton>
        </CardActions>
      </Card>
    </>
  );
};
