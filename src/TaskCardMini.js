import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
  const classes = useStyles();

  return (
    <CardActionArea
      className={classes.click}
      onClick={() => {
        alert(task.id);
      }}
    >
      <Card className={classes.card}>
        <CardHeader title={task.title} />
        <CardContent>
          <Typography>{task.description}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
