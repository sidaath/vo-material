import { Button, Card, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  click: {
    minHeight: '100px',
    maxHeight: '100%',
    borderRadius: '5px',
  },
  card: {
    minHeight: '150px',
    maxHeight: '150px',
    marginTop: 10,
    background: '#E3E6F5',
  },

  inProgress: {
    background: '#81c784',
  },

  overDue: {
    background: '#ffb74d',
  },

  delete: {
    cursor: 'pointer',
  },

  addBtn: {
    right: 2,
  },
});

export default function EmployeeCardMini(props) {
  let classes = useStyles();
  const employee = props.employee;
  const assign = props.assign;
  const addEmployeeToTask = props.addEmployeeToTask;
  const setDisplayEmployee = props.setDisplayEmployee;

  function handleClick() {
    addEmployeeToTask(employee);
    setDisplayEmployee(null);
  }

  return (
    <Card className={classes.card}>
      <Typography>{employee.name}</Typography>
      {assign && (
        <Grid container justifyContent='flex-end'>
          <Button
            className={classes.addBtn}
            variant='contained'
            color='primary'
            onClick={handleClick}
          >
            Add
          </Button>
        </Grid>
      )}
    </Card>
  );
}
