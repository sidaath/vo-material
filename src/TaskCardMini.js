import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TaskDB } from './Tasks';

const useStyles = makeStyles({
  click: {
    minHeight: '150px',
    maxHeight: '150px',
    marginTop: '10px',
    borderRadius: '5px',
  },
  card: {
    minHeight: '150px',
    maxHeight: '150px',
    marginTop: 0,
  },
});

export default function TaskCardMini({ task }) {
  const { setInspecting } = useContext(TaskDB);
  const classes = useStyles();

  function handleClick() {
    setInspecting(task);
  }

  return (
    <CardActionArea className={classes.click} onClick={handleClick}>
      <Card className={classes.card}>
        <CardHeader title={task.title} />
        <CardContent>
          <Typography>{task.description}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
