//called from -> MyTasksPane.js
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TaskDB } from './Tasks';
import { Delete } from '@material-ui/icons';

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

export default function TaskCardMini({ task, handleTaskChange }) {
  const { setInspecting, deleteTask } = useContext(TaskDB);
  const classes = useStyles();

  //sets the task thats displayed in the middle pane to the task that was just clicked
  function handleClick() {
    setInspecting(task);
  }

  //defined in Tasks.js
  //if a task attribute is changed, update the original taskDB array
  function handleBegin() {
    task.inProgress = true;
    handleTaskChange(task.id, task);
  }

  return (
    <Card
      className={`${classes.card} ${
        task.inProgress ? classes.inProgress : null
      } ${task.overDue ? classes.overDue : null}`}
    >
      <CardHeader
        title={task.title}
        action={
          <CardActions>
            <Delete
              className={classes.delete}
              onClick={() => deleteTask(task.id)}
            />
            {!task.inProgress && (
              <Button
                className={classes.conditionalBegin}
                variant='contained'
                color='primary'
                onClick={handleBegin}
              >
                {' '}
                Begin
              </Button>
            )}
          </CardActions>
        }
      />
      <CardActionArea className={classes.click} onClick={handleClick}>
        <CardContent>
          <Typography>{task.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
