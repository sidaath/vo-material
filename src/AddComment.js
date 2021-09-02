import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import React from 'react';

const useStyles = makeStyles({
  comment: {
    height: '10vh',
    background: 'gold',
    marginTop: 10,
  },
});
export default function AddComment() {
  const classes = useStyles();
  return <Card className={classes.comment}> Comments</Card>;
}
