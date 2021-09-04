import { Card, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  pane: {
    minHeight: '93vh',
    maxHeight: '93vh',
    overflowY: 'auto',
    background: '#f9f9f9',
  },
});
export default function AssignAddTaskDetails() {
  const classes = useStyles();

  return (
    <Card className={`${classes.pane}`}>
      <Typography>ASSIGN MIDDLE</Typography>
    </Card>
  );
}
