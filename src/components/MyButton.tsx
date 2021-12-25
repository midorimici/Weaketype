import React from 'react';
import { createTheme, withStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

const styles = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

const OrangeButton = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[300],
    },
  },
}))(Button);

type Props = {
  children: any;
  onClick: () => void;
  id: string;
  elev?: boolean;
  disabled?: boolean;
};

export default ({ children, onClick, id, elev = false, disabled = false }: Props) => {
  return (
    <ThemeProvider theme={styles}>
      <OrangeButton
        id={id}
        onClick={onClick}
        variant="contained"
        color="primary"
        disableElevation={!elev}
        disabled={disabled}
      >
        {children}
      </OrangeButton>
    </ThemeProvider>
  );
};
