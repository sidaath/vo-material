import React, { useContext } from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TaskDB } from './Tasks';

const useStyles = makeStyles({
  details: {
    height: '50vh',
    background: '#f9f9f9',
  },
});
export default function TaskDetails() {
  let { inspecting } = useContext(TaskDB);
  if (inspecting === undefined) {
    inspecting = {
      id: null,
      title: 'Select Task To View',
      description: '',
    };
  }
  const classes = useStyles();
  return (
    <Card className={classes.details}>
      <CardHeader title={inspecting.title} />
      <CardContent>
        <Typography>{inspecting.description}</Typography>
      </CardContent>
    </Card>
  );
}
