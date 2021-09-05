import { Button, Card, CardContent, Grid, TextField } from '@material-ui/core';
import React, { Fragment, useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { v4 as uuidv4 } from 'uuid';
import { EmployeeDB } from './Assign';

import { format } from 'date-fns';
import AssignTasksModal from './AssignTasksModal';

const useStyles = makeStyles({
  top: {
    minHeight: '65vh',
  },
});

const LOCAL_STORAGE_KEY = 'vo-material.assigned-tasks';
const LOCAL_STORAGE_KEY_drafts = 'vo-material.drafts';

export default function AssignTasksAddTask() {
  console.log('render MAIN');
  const classes = useStyles();

  const [isAssignedEmp, setIsAssignedEmp] = useState(false);

  //need employee list when selecting employees for a task
  const { employeeDB } = useContext(EmployeeDB);
  const [emps, setEmps] = useState(employeeDB);

  //these two are for the tasks title and description -> getting input
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  //for the task deadline -> comes from mui datepicker
  const [selectedDate, handleDateChange] = useState(new Date());

  //add a task and its employees to this
  const [assignedTasksDB, setAssignedTasksDB] = useState([]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(assignedTasksDB));
    console.log('use effect -> depend on assignedTasksDB');
  }, [assignedTasksDB]);

  //add drafts to this
  const [drafts, setDrafts] = useState([]);
  useEffect(() => {
    setAssignedEmployees([]);
    setEmps(employeeDB);
    localStorage.setItem(LOCAL_STORAGE_KEY_drafts, JSON.stringify(drafts));
    console.log('use effect -> depends on drafts, employeeDB');
  }, [drafts, employeeDB]);

  //while adding employees to a task, hold them in this
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  function addEmployeeToTask(employee) {
    setAssignedEmployees([...assignedEmployees, employee]);
    const availableEmployees = emps.filter((x) => x.id !== employee.id);
    setEmps(availableEmployees);
  }
  useEffect(() => {
    if (assignedEmployees.length !== 0) {
      setIsAssignedEmp(true);
      console.log('assigned emp is not empty');
    } else {
      console.log('assigned emp is EMPTY');
    }
  }, [assignedEmployees]);

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

  //what to do when clicking ADD TASK / SAVE DRAFT
  function handleOnClick() {
    const assignedTask = {
      id: uuidv4(),
      title: taskTitle,
      description: taskDescription,
      deadline: format(selectedDate, 'yyyy-MM-dd'),
      workers: assignedEmployees,
    };

    if (!isAssignedEmp || taskDescription === '' || taskTitle === '') {
      setDrafts([...drafts, assignedTask]);
    }

    if (isAssignedEmp && taskDescription !== '' && taskTitle !== '') {
      setAssignedTasksDB([...assignedTasksDB, assignedTask]);
    }

    //reset input fields
    setTaskTitle('');
    setTaskDescription('');
    setIsAssignedEmp(false);
    setAssignedEmployees([]);
  }

  //FOR MODAL -OPEN AND CLOSE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  //add task button
  let btnValue = 'SAVE DRAFT';
  function changeButtonText() {
    if (taskTitle !== '' && taskDescription !== '' && isAssignedEmp) {
      btnValue = 'Add Task';
      console.log('changed btn val');
    } else {
      btnValue = 'Save Draft';
      console.log('changed btn val');
    }
  }

  changeButtonText();

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
              {btnValue}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <AssignTasksModal
        setOpen={setOpen}
        employeeDB={emps}
        open={open}
        addEmployeeToTask={addEmployeeToTask}
      />
    </Card>
  );
}
