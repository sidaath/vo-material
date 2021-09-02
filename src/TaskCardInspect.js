import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TaskDetails from './TaskDetails';
import AddComment from './AddComment';

const useStyles = makeStyles({
  complete: {
    height: '5vh',
    marginTop: 10,
  },
});

export default function TaskCardInspect() {
  const classes = useStyles();
  return (
    <>
      <TaskDetails />
      <AddComment />
      <Grid container justifyContent='center' alignItems='center'>
        <Button
          className={classes.complete}
          variant='contained'
          color='primary'
        >
          {' '}
          Mark As Complete
        </Button>
      </Grid>
    </>
  );
}
