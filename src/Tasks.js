import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import InspectTasksPane from './InspectTasksPane';
import MyTasksPane from './MyTasksPane';
import TaskReportsPane from './TaskReportsPane';

export const TaskDB = React.createContext();
export const EmployeeDB = React.createContext();

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

  //taskDB has all the tasks this person has to do.
  //task has -> id, title, description, inProgress(bool), overDue(bool), dueDate(null for now)
  const [taskDB, setTaskDB] = useState([]);

  //inspecting = task that should be displayed in the inspect pane -> with add comment and mark complete btn
  const [inspecting, setInspecting] = useState(taskDB[0]);

  //REPLACE WITH SERVER FETCH
  //get tasks from local storage the first time the app starts
  useEffect(() => {
    const tasksJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (tasksJSON != null) {
      setTaskDB(JSON.parse(tasksJSON));
    }
  }, []);

  //REPLACE WITH SERVER FETCH
  //write changes to taskDB to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskDB));
  }, [taskDB]);

  //add a task to taskDB
  function addTask(task) {
    setTaskDB([...taskDB, task]);
    console.log('TASKS.JS addt ', taskDB);
  }

  //when a task is changed (inProgress / overDue/ etc) -> write changes to taskDB
  function handleTaskChange(id, task) {
    const newTaskDB = [...taskDB];
    const index = newTaskDB.findIndex((task) => task.id === id);
    newTaskDB[index] = task;
    setTaskDB(newTaskDB);
  }

  function deleteTask(id) {
    setTaskDB(taskDB.filter((task) => task.id !== id));
  }

  //this is for TaskDB context.
  const taskDataContextValues = {
    taskDB,
    inspecting,
    setInspecting,
    deleteTask,
  };

  return (
    <TaskDB.Provider value={taskDataContextValues}>
      <Grid container className={classes.paneContainer}>
        <Grid item xs={3}>
          <MyTasksPane tasks={taskDB} handleTaskChange={handleTaskChange} />
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
