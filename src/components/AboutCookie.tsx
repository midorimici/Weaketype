import React, { useState } from 'react';

// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

// components
import MyButton from './MyButton';

import { useTranslation } from '../i18n';

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
          本サイトでは、サービスを利用するユーザの設定項目やタイプミス傾向を一定期間の間保存し、
          次回の訪問のさいに活用できるように、Cookie を使用しています。
          <br />
          これには個人を特定する情報は含まれません。
          <br />
          ユーザはブラウザの設定によって Cookie を無効にすることができます。
          <br />
          詳しくは
          <a
            href="https://policies.google.com/technologies/partner-sites?hl=ja"
            target="_blank"
            rel="noopener noreferrer"
          >
            こちら
          </a>
          をご確認ください。
        </DialogContent>
        <DialogActions>
          <MyButton id="close-about-cookie" onClick={() => setOpen(false)}>
            もどる
          </MyButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
