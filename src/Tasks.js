import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import InspectTasksPane from './InspectTasksPane';
import MyTasksPane from './MyTasksPane';
import TaskReportsPane from './TaskReportsPane';

const useStyles = makeStyles({
  paneContainer: {
    marginTop: '1vh',
    marginBottom: '1vh',
    minHeight: '93vh',
    background: 'green',
    maxHeight: '93vh',
  },
});

export default function Tasks() {
  const classes = useStyles();

  const [taskDB, setTaskDB] = useState([
    { id: 1, title: 'task 1 test', description: 'test desc 1' },
  ]);
  useEffect(() => {}, [taskDB]);

  function addTask(task) {
    setTaskDB([...taskDB, task]);
  }

  return (
    <Grid container className={classes.paneContainer}>
      <Grid item xs={3}>
        <MyTasksPane tasks={taskDB} />
      </Grid>
      <Grid item xs={6}>
        <InspectTasksPane />
      </Grid>
      <Grid item xs={3}>
        <TaskReportsPane addTask={addTask} />
      </Grid>
    </Grid>
  );
}
