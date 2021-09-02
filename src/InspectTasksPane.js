import React from 'react';
import TaskCardInspect from './TaskCardInspect';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  pane: {
    minHeight: '93vh',
  },
  middlePane: {
    marginRight: 5,
    marginLeft: 5,
  },
});

export default function InspectTasksPane() {
  const classes = useStyles();
  return (
    <Card className={`${classes.pane} ${classes.middlePane}`}>
      <CardContent>
        <Typography>Inspect</Typography>{' '}
      </CardContent>
      <CardContent>
        <TaskCardInspect />
      </CardContent>
    </Card>
  );
}
