import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AssignTasksAddTask from './AssignTasksAddTask';
import AssignTasksStats from './AssignTasksStats';

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
      <CardContent>
        <AssignTasksAddTask />
      </CardContent>

      <CardContent>
        <AssignTasksStats />
      </CardContent>
    </Card>
  );
}
