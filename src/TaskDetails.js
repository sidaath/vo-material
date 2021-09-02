import React from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  details: {
    height: '50vh',
    background: 'gray',
  },
});
export default function TaskDetails() {
  const classes = useStyles();
  return <Card className={classes.details}>Details</Card>;
}
