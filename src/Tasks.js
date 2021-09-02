import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import InspectTasksPane from './InspectTasksPane';
import MyTasksPane from './MyTasksPane';
import TaskReportsPane from './TaskReportsPane';

export const TaskDB = React.createContext();

const useStyles = makeStyles({
  paneContainer: {
    marginTop: '1vh',
    marginBottom: '1vh',
    minHeight: '93vh',
    background: 'green',
    maxHeight: '93vh',
  },
});

const LOCAL_STORAGE_KEY = 'vo-material.tasks';

export default function Tasks() {
  const classes = useStyles();

  const [taskDB, setTaskDB] = useState([]);

  useEffect(() => {
    const tasksJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (tasksJSON != null) {
      setTaskDB(JSON.parse(tasksJSON));
    }
  }, []);
  const [inspecting, setInspecting] = useState(taskDB[0]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskDB));
  }, [taskDB]);

  // console.log('from TASKS.JS', taskDB[0]);

  function addTask(task) {
    setTaskDB([...taskDB, task]);
    console.log('TASKS.JS addt ', taskDB);
  }

  const taskDataContextValues = { taskDB, inspecting, setInspecting };

  return (
    <TaskDB.Provider value={taskDataContextValues}>
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
    </TaskDB.Provider>
  );
}
