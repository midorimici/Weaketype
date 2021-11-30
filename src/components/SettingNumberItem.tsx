import React from 'react';

// MUI
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

type Props = {
  title: string;
  label?: string;
  description: string;
  className: string;
  value: number;
  inputProps: { step: number; min: number; max: number };
  min: number;
  max: number;
  setFunc: (valOrUpdater: number) => void;
};

export default ({
  title,
  label = title,
  description,
  className,
  value,
  inputProps,
  min,
  max,
  setFunc,
}: Props) => {
  return (
    <Grid container justify="space-between">
      <Grid item xs={8}>
        <Typography variant="h5">{title}</Typography>
        <Typography className="indent" variant="body1" gutterBottom>
          {description}
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          className={className}
          label={label}
          type="number"
          variant="outlined"
          color="secondary"
          value={value}
          inputProps={inputProps}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            let val = Number(e.target.value);
            if (val < min) val = min;
            if (val > max) val = max;
            setFunc(val);
          }}
        />
      </Grid>
    </Grid>
  );
};
