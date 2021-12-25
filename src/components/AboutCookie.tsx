import React, { useState } from 'react';

// MUI
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

// components
import MyButton from './MyButton';

import { TranslationWithLink, useTranslation } from '../i18n';
import { Typography } from '@material-ui/core';

export default () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div id="cookie-letter" onClick={() => setOpen(true)}>
        <u>{t('aboutCookie')}</u>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t('aboutCookie')}</DialogTitle>
        <DialogContent>
          <Typography>{t('aboutCookieDescription/purpose')}</Typography>
          <Typography>{t('aboutCookieDescription/personalInfo')}</Typography>
          <Typography>{t('aboutCookieDescription/disable')}</Typography>
          <Typography>
            <TranslationWithLink
              k="aboutCookieDescription/details"
              href="https://policies.google.com/technologies/partner-sites"
            />
          </Typography>
        </DialogContent>
        <DialogActions>
          <MyButton id="close-about-cookie" onClick={() => setOpen(false)}>
            {t('goBack')}
          </MyButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
