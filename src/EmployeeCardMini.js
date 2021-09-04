import { Card, Typography } from '@material-ui/core';
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
});

export default function EmployeeCardMini(props) {
  const classes = useStyles();
  const employee = props.employee;
  return (
    <Card className={classes.card}>
      <Typography>{employee.name}</Typography>
    </Card>
  );
}
