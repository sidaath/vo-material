import {
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DatePicker,
  MuiPickersUtilsProvider,
  useStaticState,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
  top: {
    minHeight: '65vh',
  },
});

export default function AssignTasksAddTask() {
  const classes = useStyles();

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const [selectedDate, handleDateChange] = useState(new Date());

  const [assignedTasksDB, setAssignedTasksDB] = useState();

  const [assignedEmployees, setAssignedEmployees] = useState([]);

  //get the value thats entered into task title.
  function getTaskTitle(event) {
    const title = event.target.value;
    setTaskTitle(title);
  }

  //get description of task from input
  function getTaskDescription(event) {
    const description = event.target.value;
    setTaskDescription(description);
  }

  function handleOnClick() {
    console.log('btn title', taskTitle);
    console.log('btn des ', taskDescription);
    console.log(selectedDate);
    alert(`title=${taskTitle} des=${taskDescription}`);

    const assignedTask = {
      id: uuidv4(),
      title: taskTitle,
      description: taskDescription,
      deadline: selectedDate,
      workers: assignedEmployees,
    };

    //reset input fields
    setTaskTitle('');
    setTaskDescription('');
  }

  //FOR MODAL
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Fragment>
            <DatePicker
              label='Pick Deadline'
              value={selectedDate}
              onChange={handleDateChange}
              clearable
              animateYearScrolling
            />
          </Fragment>
        </MuiPickersUtilsProvider>
      </CardContent>
      <CardContent>
        <Button variant='contained' color='primary' onClick={handleOnClick}>
          Add Task
        </Button>
      </CardContent>
      <Button onClick={handleOpen}>Add Employees</Button>
      <Modal open={open} onClose={handleClose}>
        <Card>
          <Typography>Hello this is a modal</Typography>
        </Card>
      </Modal>
    </Card>
  );
}
