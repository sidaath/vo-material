import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  pane: {
    minHeight: '93vh',
    maxHeight: '93vh',
    overflowY: 'auto',
    background: '#f9f9f9',
  },

  paneRight: {
    marginLeft: 10,
  },
});
export default function AssignTaskDrafts() {
  const classes = useStyles();
  return (
    <Card className={`${classes.pane} ${classes.paneRight}`}>
      <Typography>ASSIGN LEFT</Typography>
    </Card>
  );
}
