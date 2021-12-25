import React from 'react';

// MUI
import { withStyles, Theme } from '@material-ui/core/styles';
import { Box, Tooltip } from '@material-ui/core';
import { useTranslation } from '../i18n';

const CustomTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    fontSize: '1.5rem',
  },
  arrow: {
    width: '.5rem',
  },
}))(Tooltip);

type Props = {
  typo: number[];
  position: number;
  letters: string[];
};

export default ({ typo, position, letters }: Props) => {
  const { t } = useTranslation();

  const accuracyRate = (
    100 *
    (1 -
      typo.length / (typo.slice(-1)[0] === position ? position + 1 : position === 0 ? 1 : position))
  ).toFixed(2);

  const badChars = (strs: string[]): string[] => {
    const charMap: { [key: string]: number } = {};
    let maxChars: string[] = [];

    for (let char of strs) {
      if (charMap[char]) {
        charMap[char]++;
      } else {
        charMap[char] = 1;
      }
    }

    for (let i: number = 0; i <= 2; i++) {
      maxChars.push(
        ...Object.keys(charMap).filter(
          (char: string) =>
            charMap[char] !== 1 &&
            charMap[char] ===
              Array.from(new Set(Object.values(charMap))).sort((a: number, b: number) => b - a)[i]
        )
      );
    }

    return maxChars;
  };

  return (
    <Box id="info" paddingTop="1rem" fontSize="1.5rem">
      <Box>
        {t('poorKeys')}
        <span id="bad-keys" className="anim">
          {badChars(letters).map((char: string, i: number) => (
            <CustomTooltip
              key={i}
              title={letters.filter((e: string) => e === char).length}
              arrow
              placement="top-start"
            >
              <span>{char}</span>
            </CustomTooltip>
          ))}
        </span>
      </Box>
      <span>{t('mistypedTimes') + typo.length}　</span>
      <span>
        {t('accuracyRate')}
        {accuracyRate}%
      </span>
    </Box>
  );
};
