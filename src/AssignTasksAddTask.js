import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TempAddTask from './TempAddTask';
import AddTaskCard from './AddTaskCard';

const useStyles = makeStyles({
  top: {
    minHeight: '65vh',
  },
});

export default function AssignTasksAddTask() {
  const classes = useStyles();

  const [taskTitle, setTaskTitle] = useState(null);
  const [taskDescription, setTaskDescription] = useState(null);

  //get the value thats entered into task title.
  function getTaskTitle(event) {
    const title = event.target.value;
    console.log(title);
    setTaskTitle(title);
  }

  //get description of task from input
  function getTaskDescription(event) {
    const description = event.target.value;
    console.log('deesc ', description);
    setTaskDescription(description);
  }

  function handleOnClick() {
    console.log('btn title', taskTitle);
    console.log('btn des ', taskDescription);
    alert(`title=${taskTitle} des=${taskDescription}`);

    //reset input fields
    setTaskTitle('');
    setTaskDescription('');
  }

  return (
    <Card className={classes.top}>
      <CardContent>
        <TextField
          value={taskTitle}
          variant='outlined'
          label='add a title'
          fullWidth
          onChange={getTaskTitle}
        />
      </CardContent>
      <CardContent>
        <TextField
          value={taskDescription}
          variant='outlined'
          label='more details, instructions etc..'
          fullWidth
          multiline
          rows={10}
          onChange={getTaskDescription}
        />
      </CardContent>
      <CardContent>
        <Button variant='contained' color='primary' onClick={handleOnClick}>
          Add Task
        </Button>
      </CardContent>
    </Card>
  );
}
