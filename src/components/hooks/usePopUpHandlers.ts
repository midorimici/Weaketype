import { useState } from 'react';

const popUpMap: Record<number, string> = {
  0: 'onoff-btn',
  1: 'refresh-btn',
  2: 'textbox',
  3: 'info',
  4: 'setting-icon',
};

export const usePopUpHandlers = () => {
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

  return { order, showPopUp, handleNext, handlePrevious };
};
