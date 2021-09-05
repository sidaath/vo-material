import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { Fragment, useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { v4 as uuidv4 } from 'uuid';
import { AssignDB } from './Assign';

import { format } from 'date-fns';
import AssignTasksModal from './AssignTasksModal';

const useStyles = makeStyles({
  top: {
    minHeight: '65vh',
  },
});

export default function AssignTasksAddTask() {
  console.log('ATAT');
  const classes = useStyles();

  const {
    employeeDB,
    assignedTasksDB,
    setAssignedTasksDB,
    draftsDB,
    setDraftsDB,
    resume,
    setResume,
  } = useContext(AssignDB);
  console.log('using context inside ATAT.JS');

  useEffect(() => {
    setTaskTitle(resume.title);
    setTaskDescription(resume.description);
    const draftedWorkers = resume.workers || [];
    let newAvailableEmployeesArray = availableEmployees;
    draftedWorkers.forEach((x) => {
      console.log('FOR EACH ', x);
      newAvailableEmployeesArray = newAvailableEmployeesArray.filter(
        (y) => y.id !== x.id
      );
      setWorkers(draftedWorkers);
      setIsWorkerAssigned(true);
      setAvailableEmployees(newAvailableEmployeesArray);
    });

    console.log('RESUME WORKERS ARE ', draftedWorkers);
  }, [resume]);

  const [availableEmployees, setAvailableEmployees] = useState(employeeDB);
  const [isWorkerAssigned, setIsWorkerAssigned] = useState(false);

  //temp array of employees - refreshed after saving draft / adding task
  const [workers, setWorkers] = useState([]);
  useEffect(() => {
    if (workers.length !== 0) {
      setIsWorkerAssigned(true);
    } else {
      setIsWorkerAssigned(false);
    }
    console.log('newest val for is worker there -> ', isWorkerAssigned);
  }, [workers]);

  //DO NOT CHANGE
  //these two are for the tasks title and description -> getting input
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
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
  //END OF DO NOT CHANGE

  //for the task deadline -> comes from mui datepicker
  const [selectedDate, handleDateChange] = useState(new Date());

  //what to do when clicking on ADD on an employee card, on the selecting employees for task bit
  function addEmployeeToTask(employee) {
    setWorkers([...workers, employee]);
    const newAvailableEmployees = availableEmployees.filter(
      (emp) => emp.id !== employee.id
    );
    setIsWorkerAssigned(true);
    setAvailableEmployees(newAvailableEmployees);
  }

  //what to do when clicking ADD TASK / SAVE DRAFT
  function handleOnClick() {
    console.log('has worker? begin ', isWorkerAssigned);
    const assignedTask = {
      id: uuidv4(),
      owner: 1,
      title: taskTitle,
      description: taskDescription,
      deadline: format(selectedDate, 'yyyy-MM-dd'),
      workers: workers,
    };

    if (isWorkerAssigned && taskDescription !== '' && taskTitle !== '') {
      setAssignedTasksDB([...assignedTasksDB, assignedTask]);
      console.log('saved to tasks');
    }

    if (!isWorkerAssigned || taskDescription === '' || taskTitle === '') {
      setDraftsDB([...draftsDB, assignedTask]);
      console.log('saved to drafts');
    }

    //reset input fields
    setTaskTitle('');
    setTaskDescription('');

    //after save draft / add task, temp array of assigned workers has to be reset.
    setWorkers([]);
    //after saving draft/ adding task, all employees are available for next task
    setAvailableEmployees(employeeDB);
    console.log('task = ', assignedTask);
    console.log('has worker? after refresh ', isWorkerAssigned);
  }

  //FOR MODAL -OPEN AND CLOSE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  let btnText = 'Save Draft';
  function setButtonText() {
    if (isWorkerAssigned && taskDescription !== '' && taskTitle !== '') {
      btnText = 'Add Task';
    }
    if (!isWorkerAssigned || taskDescription === '' || taskTitle === '') {
      btnText = 'Save Draft';
    }
  }
  setButtonText();

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
        <Grid container justifyContent='space-evenly'>
          <Grid item>
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
          </Grid>
          <Grid item>
            <Button onClick={handleOpen}>Add Employees</Button>
          </Grid>
          <Grid item>
            <Button variant='contained' color='primary' onClick={handleOnClick}>
              {btnText}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <AssignTasksModal
        open={open}
        setOpen={setOpen}
        employeeDB={availableEmployees}
        addEmployeeToTask={addEmployeeToTask}
      />
    </Card>
  );
}
