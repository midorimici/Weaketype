import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

// components
import MyButton from './MyButton';
import PopUp from './PopUp';

// styles
import './PopUp.scss';

import { TranslationKey, useTranslation } from '../i18n';

const popUpMap: { [key: number]: string } = {
  0: 'onoff-btn',
  1: 'refresh-btn',
  2: 'textbox',
  3: 'info',
  4: 'setting-icon',
};

const cardContentMap: Record<number, TranslationKey[]> = {
  0: ['descriptionGuide/0-1', 'descriptionGuide/0-2', 'descriptionGuide/0-3'],
  1: ['descriptionGuide/1-1'],
  2: ['descriptionGuide/2-1', 'descriptionGuide/2-2'],
  3: ['descriptionGuide/3-1', 'descriptionGuide/3-2'],
  4: ['descriptionGuide/4-1'],
};

export default () => {
  const { t } = useTranslation();
  const [order, setOrder] = useState<number>(0);

  const showPopUp = (): void => {
    document.getElementById('popup')!.hidden = false;
    document.getElementById('popup-card')!.hidden = false;
    setPositions(0);
  };

  const setPositions = (ord: number): void => {
    let targetRect: DOMRect = document.getElementById(popUpMap[ord])!.getBoundingClientRect();
    let top: number = targetRect.top;
    let right: number = targetRect.right;
    let bottom: number = targetRect.bottom;
    let left: number = targetRect.left;

    let shadows = document.getElementsByClassName('shadow') as HTMLCollectionOf<HTMLElement>;
    let light: HTMLElement = document.getElementById('light')!;

    shadows[0].style.width = right + 'px';
    shadows[0].style.height = top + 'px';

    shadows[1].style.left = right + 'px';
    shadows[1].style.width = `${window.innerWidth - right}px`;
    shadows[1].style.height = bottom + 'px';

    shadows[2].style.top = bottom + 'px';
    shadows[2].style.left = left + 'px';
    shadows[2].style.width = `${window.innerWidth - left}px`;
    shadows[2].style.height = `${window.innerHeight - bottom}px`;

    shadows[3].style.top = top + 'px';
    shadows[3].style.width = left + 'px';
    shadows[3].style.height = `${window.innerHeight - top}px`;

    light.style.top = top + 'px';
    light.style.left = left + 'px';
    light.style.width = targetRect.width + 'px';
    light.style.height = targetRect.height + 'px';
  };

  const handleNext = () => {
    if (order === 4) {
      setOrder(0);
      document.getElementById('popup-card')!.hidden = true;
      document.getElementById('popup')!.hidden = true;
      return;
    }
    setOrder(order + 1);
    setPositions(order + 1);
  };

  const handlePrevious = () => {
    setOrder(order - 1);
    setPositions(order - 1);
  };

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
