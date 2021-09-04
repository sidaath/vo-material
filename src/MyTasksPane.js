//called from -> Tasks.js

import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TaskCardMini from './TaskCardMini';

const useStyles = makeStyles({
  pane: {
    minHeight: '93vh',
    maxHeight: '93vh',
    overflowY: 'auto',
    background: '#f9f9f9',
  },
});

export default function MyTasksPane(props) {
  const tasks = props.tasks;
  const handleTaskChange = props.handleTaskChange;

  const classes = useStyles();

  return (
    <Card className={classes.pane}>
      <CardContent>MyTasks</CardContent>
      <CardContent>
        {tasks.map((task) => {
          return (
            <TaskCardMini
              key={task.id}
              task={task}
              handleTaskChange={handleTaskChange}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
