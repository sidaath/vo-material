import React from 'react';
import { Card, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  tabs: {
    minWidth: '24.5%',
    minHeigh: '100%',
    background: '#E3E6F5',
    cursor: 'pointer',
    '&:hover': {
      background: 'red',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    height: '5vh',
  },
});

export default function TabBar(props) {
  const classes = useStyles();

  const handleTabClick = props.handleTabClick;

  return (
    <Grid className={classes.grid} container justifyContent={'space-between'}>
      <Card
        className={classes.tabs}
        data-destination='tasks'
        onClick={handleTabClick}
      >
        My Tasks
      </Card>
      <Card
        className={classes.tabs}
        data-destination='inspect'
        onClick={handleTabClick}
      >
        Inspect
      </Card>
      <Card
        className={classes.tabs}
        data-destination='assign'
        onClick={handleTabClick}
      >
        Assign
      </Card>
      <Card
        className={classes.tabs}
        data-destination='reports'
        onClick={handleTabClick}
      >
        Reports
      </Card>
    </Grid>
  );
}
