import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TaskManagementData } from './TaskManagement';
import SupervisorTaskCard from './SupervisorTaskCard';
import InspectRightCard from './InspectRightCard';

const useStyles = makeStyles({
  paneContainer: {
    marginTop: '1vh',
    marginBottom: '1vh',
    minHeight: '93vh',
    background: 'green',
    maxHeight: '93vh',
  },

  left: {
    minHeight: '93vh',
    maxHeight: '93vh',
    overflowY: 'auto',
    background: '#f9f9f9',
    marginRight: 5,
  },
});

export default function Inspect() {
  const classes = useStyles();

  const [showTask, setShowTask] = useState(null);
  console.log('SHOW TASK WHAT ', showTask);

  function cardClickFunction(task) {
    setShowTask(task);
  }

  const { assignedTasksDB } = useContext(TaskManagementData);
  console.log('INSPECT PAGE ', assignedTasksDB);
  return (
    <Grid container className={classes.paneContainer}>
      <Grid item xs={6}>
        <Card className={classes.left}>
          <CardHeader title='Assigned Tasks' />
          <CardContent>
            {assignedTasksDB.map((task) => {
              return (
                <SupervisorTaskCard
                  key={task.id}
                  task={task}
                  cardClickFunction={cardClickFunction}
                />
              );
            })}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        {showTask && <InspectRightCard showTask={showTask} />}
        {!showTask && <Typography>Select Task to show</Typography>}
      </Grid>
    </Grid>
  );
}
