import { useState, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import {
  vowelss,
  consonantss,
  vowelDigraphss,
  consonantDigraphss,
  choose,
  word,
} from '../../lib/lib';
import { getCookieValue, setCookie } from '../../lib/cookie';
import {
  weightState,
  syllableNumberState,
  textLengthState,
  containCapitalsState,
  containDigraphsState,
  autoRefreshState,
  textState,
} from '../../atoms/SettingsAtoms';

export const useTextHandlers = () => {
  const weight: number = useRecoilValue(weightState);
  const syllableNumber: number = useRecoilValue(syllableNumberState);
  const textLength: number = useRecoilValue(textLengthState);
  const containCapitals: boolean = useRecoilValue(containCapitalsState);
  const containDigraphs: boolean = useRecoilValue(containDigraphsState);
  const autoRefresh: boolean = useRecoilValue(autoRefreshState);

  const vowels = useRef(vowelss);
  const consonants = useRef(consonantss);
  const vowelDigraphs = useRef(vowelDigraphss);
  const consonantDigraphs = useRef(consonantDigraphss);

  const [text, setText] = useRecoilState(textState);
  const [typing, setTyping] = useState<boolean>(false);
  const position = useRef<number>(0);
  const [typo, setTypo] = useState<number[]>(new Array(0));
  const [badKeys, setBadKeys] = useState<string[]>(
    ~document.cookie.indexOf('bks') ? getCookieValue('bks').split(',') : []
  );
  const time = useRef<number>(0);
  const [timerID, setTimerID] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (!typing) {
      return;
    }

    // Start timer
    if (position.current === 0) {
      setTimerID(window.setInterval(() => updateSpeed(), 500));
    }

    let card = document.getElementById('card');
    if (document.activeElement !== card) {
      card!.focus();
    }
    let textSpans: Element[] = Array.from(document.getElementById('textbox')!.children)
      .map((word: Element) => Array.from(word.children))
      .flat();

    let currentLetter: string = text[position.current].toLowerCase();
    let prevLetter: string = position.current === 0 ? '' : text[position.current - 1].toLowerCase();
    let nextLetter: string =
      position.current === text.length - 1 ? '' : text[position.current + 1].toLowerCase();
    let prevTwoLetters: string = prevLetter + currentLetter;
    let nextTwoLetters: string = currentLetter + nextLetter;

    if (e.key === text[position.current]) {
      if (vowelDigraphs.current.filter((char: string) => char === prevTwoLetters).length >= 2) {
        vowelDigraphs.current.splice(vowelDigraphs.current.indexOf(prevTwoLetters), 1);
      } else if (
        vowelDigraphs.current.filter((char: string) => char === nextTwoLetters).length >= 2
      ) {
        vowelDigraphs.current.splice(vowelDigraphs.current.indexOf(nextTwoLetters), 1);
      } else if (
        consonantDigraphs.current.filter((char: string) => char === prevTwoLetters).length >= 2
      ) {
        consonantDigraphs.current.splice(consonantDigraphs.current.indexOf(prevTwoLetters), 1);
      } else if (
        consonantDigraphs.current.filter((char: string) => char === nextTwoLetters).length >= 2
      ) {
        consonantDigraphs.current.splice(consonantDigraphs.current.indexOf(nextTwoLetters), 1);
      } else if (vowels.current.filter((char: string) => char === currentLetter).length >= 2) {
        vowels.current = vowels.current.join('').replace(currentLetter, '').split('');
      } else if (consonants.current.filter((char: string) => char === currentLetter).length >= 2) {
        consonants.current = consonants.current.join('').replace(currentLetter, '').split('');
      }

      let typed: Element = textSpans[position.current];

      typed.classList.add('typed-letters');

      let mark: string = choose('★♥♦'.split(''));
      typed.setAttribute('data-name', mark);

      typed.classList.remove('current-letter');

      if (~badKeys.indexOf(currentLetter)) {
        let badKeysTmp: string[] = badKeys;
        badKeysTmp.splice(badKeysTmp.indexOf(currentLetter), 1);
        setBadKeys(badKeysTmp);
      }

      if (position.current <= text.length - 2) {
        textSpans[position.current + 1].className = 'current-letter';
        position.current++;
      } else {
        autoRefresh ? refresh() : setTyping(false);
        window.clearInterval(timerID);
        time.current = 0;
      }
    } else {
      if (~typo.indexOf(position.current)) {
        return;
      }

      if (~vowels.current.indexOf(currentLetter)) {
        if (containDigraphs) {
          if (~vowelDigraphs.current.indexOf(prevTwoLetters)) {
            vowelDigraphs.current = vowelDigraphs.current.concat(
              new Array<string>(Math.floor(weight / 2)).fill(prevTwoLetters)
            );
            vowels.current = vowels.current.concat(
              new Array<string>(Math.floor(weight / 2)).fill(currentLetter)
            );
          } else if (~vowelDigraphs.current.indexOf(nextTwoLetters)) {
            vowelDigraphs.current = vowelDigraphs.current.concat(
              new Array<string>(Math.floor(weight / 2)).fill(nextTwoLetters)
            );
            vowels.current = vowels.current.concat(
              new Array<string>(Math.floor(weight / 2)).fill(currentLetter)
            );
          } else {
            vowels.current = vowels.current.concat(
              new Array<string>(Math.floor(weight)).fill(currentLetter)
            );
          }
        } else {
          vowels.current = vowels.current.concat(
            new Array<string>(Math.floor(weight)).fill(currentLetter)
          );
        }
      } else if (~consonants.current.indexOf(currentLetter)) {
        if (containDigraphs) {
          if (~consonantDigraphs.current.indexOf(prevTwoLetters)) {
            consonantDigraphs.current = consonantDigraphs.current.concat(
              new Array<string>(Math.floor(weight / 2)).fill(prevTwoLetters)
            );
            consonants.current = consonants.current.concat(
              new Array<string>(Math.floor(weight / 2)).fill(currentLetter)
            );
          } else if (~consonantDigraphs.current.indexOf(nextTwoLetters)) {
            consonantDigraphs.current = consonantDigraphs.current.concat(
              new Array<string>(Math.floor(weight / 2)).fill(nextTwoLetters)
            );
            consonants.current = consonants.current.concat(
              new Array<string>(Math.floor(weight / 2)).fill(currentLetter)
            );
          } else {
            consonants.current = consonants.current.concat(
              new Array<string>(Math.floor(weight)).fill(currentLetter)
            );
          }
        } else {
          consonants.current = consonants.current.concat(
            new Array<string>(Math.floor(weight)).fill(currentLetter)
          );
        }
      }

      if (currentLetter !== ' ') {
        setBadKeys(badKeys.concat(new Array<string>(weight).fill(currentLetter)));
      }

      setTypo([...typo, position.current]);
      textSpans[position.current].classList.add('typo');

      document.getElementById('bad-keys')!.classList.remove('anim');
      void document.getElementById('bad-keys')!.offsetWidth;
      document.getElementById('bad-keys')!.classList.add('anim');
    }
  };

  const typingToggle = (): void => {
    setTyping(typing ? false : true);
    window.clearInterval(timerID);
  };

  const refresh = (): void => {
    let textSpans: Element[] = Array.from(document.getElementById('textbox')!.children)
      .map((word: Element) => Array.from(word.children))
      .flat();

    for (const i of textSpans) {
      i.className = 'waiting-letters';
    }
    textSpans[0].className = 'current-letter';

    let vowelsTmp: string[] = vowels.current;
    let consonantsTmp: string[] = consonants.current;

    if (containDigraphs) {
      vowelsTmp = vowels.current.concat(vowelDigraphs.current);
      consonantsTmp = consonants.current.concat(consonantDigraphs.current);
    }

    const words = [...Array(textLength)].map(() => word(vowelsTmp, consonantsTmp, syllableNumber));

    if (containCapitals) {
      setText(
        words.map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') +
          (autoRefresh ? ' ' : '')
      );
    } else {
      setText(words.join(' ') + (autoRefresh ? ' ' : ''));
    }
    position.current = 0;
    setTypo(new Array(0));
    setSpeed(0);
    window.clearInterval(timerID);

    setCookie('bks', badKeys);
    setCookie('vwl', vowels.current);
    setCookie('vwd', vowelDigraphs.current);
    setCookie('csn', consonants.current);
    setCookie('csd', consonantDigraphs.current);
  };

  const updateSpeed = (): void => {
    time.current += 500;
    const s = (position.current + 1) / (time.current / 1000);
    setSpeed(s);
  };

  return {
    text,
    typing,
    position: position.current,
    typo,
    badKeys,
    speed,
    handleKey,
    typingToggle,
    refresh,
  };
};
