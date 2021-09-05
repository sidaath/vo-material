import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import React from 'react';
import AssignAddTaskDetails from './AssignTaskMiddlePane';
import AssignEmployeesPane from './AssignEmployeesPane';
import AssignTaskDrafts from './AssignTaskDrafts';

import { employees } from './employees';

//Export employeeDB to be available throughout assign components
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

export default function Assign() {
  const classes = useStyles();

  const employeeDB = employees;
  const employeeDBContextValues = { employeeDB };

  return (
    <EmployeeDB.Provider value={employeeDBContextValues}>
      <Grid container className={classes.paneContainer}>
        <Grid item xs={3}>
          <AssignEmployeesPane />
        </Grid>
        <Grid item xs={6}>
          <AssignAddTaskDetails />
        </Grid>
        <Grid item xs={3}>
          <AssignTaskDrafts />
        </Grid>
      </Grid>
    </EmployeeDB.Provider>
  );
}
