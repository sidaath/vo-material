import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import React, { useContext, useState } from 'react';
import AssignAddTaskDetails from './AssignTaskMiddlePane';
import AssignEmployeesPane from './AssignEmployeesPane';
import AssignTaskDrafts from './AssignTaskDrafts';

import { employees } from './employees';
import { TaskManagementData } from './TaskManagement';

//to revert;
//1. get the two local storage vars
//2. put this under REPLACE WITH SERVER FETCH AND WRITE - ASSIGNED TASKS ARRAY
//  const [assignedTasksDB, setAssignedTasksDB] = useState([]);
//const [draftsDB, setDraftsDB] = useState([]);
//3. put this read from storage on first render
// useEffect(() => {
//   const assignedTasksDBJSON = localStorage.getItem(
//     LOCAL_STORAGE_ASSIGNED_TASKS_KEY
//   );
//   if (assignedTasksDBJSON !== null) {
//     setAssignedTasksDB(JSON.parse(assignedTasksDBJSON));
//   }

//   const draftsDBJSON = localStorage.getItem(LOCAL_STORAGE_DRAFTS_KEY);
//   if (draftsDBJSON !== null) {
//     setDraftsDB(JSON.parse(draftsDBJSON));
//   }
// }, []);

// //Writing to assigned tasks DB when theres a change to the array
// useEffect(() => {
//   console.log('writing AssignedTasksDB');
//   console.log(assignedTasksDB);
//   localStorage.setItem(
//     LOCAL_STORAGE_ASSIGNED_TASKS_KEY,
//     JSON.stringify(assignedTasksDB)
//   );
// }, [assignedTasksDB]);

// //Writing to drafts DB when theres a change to the array
// useEffect(() => {
//   console.log('writing draftsDB');
//   console.log(draftsDB);
//   localStorage.setItem(LOCAL_STORAGE_DRAFTS_KEY, JSON.stringify(draftsDB));
// }, [draftsDB]);

//Export AssignDB to be available throughout assign components
export const AssignDB = React.createContext();

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

  //REPLACE WITH SERVER FETCH and WRITE - ASSIGNED TASKS ARRAY

  //Read from storage on first render

  //get data context values
  const { assignedTasksDB, setAssignedTasksDB, draftsDB, setDraftsDB } =
    useContext(TaskManagementData);

  //need to see list of employees when adding a task as well
  const employeeDB = employees;

  //to resume editing a draft
  const [resume, setResume] = useState(false);

  //stuff that other components need access to
  const assignDBContextValues = {
    employeeDB,
    assignedTasksDB,
    setAssignedTasksDB,
    draftsDB,
    setDraftsDB,
    resume,
    setResume,
  };

  return (
    <AssignDB.Provider value={assignDBContextValues}>
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
    </AssignDB.Provider>
  );
}
