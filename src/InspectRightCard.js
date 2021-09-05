import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import AddComment from './AddComment';

const useStyles = makeStyles({
  right: {
    minHeight: '93vh',
    maxHeight: '93vh',
    overflowY: 'auto',
    background: '#f9f9f9',
    marginLeft: 5,
  },

  mainGrid: {
    minHeight: '50vh',
    maxHeight: '50vh',
  },

  comment: {
    width: '100%',
  },
});

export default function InspectRightCard(props) {
  const task = props.showTask;
  const classes = useStyles();
  return (
    <Card className={classes.right}>
      <CardContent>
        <Grid
          className={classes.mainGrid}
          container
          direction='column'
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item>
            <Typography>
              <h2>{task.title}</h2>
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              {' '}
              <h2>{task.description}</h2>
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              {' '}
              <h2>{task.deadline}</h2>
            </Typography>{' '}
          </Grid>
          <Grid item>
            <Grid container>
              {' '}
              {task.workers.map((worker) => {
                return <Avatar>{worker.id}</Avatar>;
              })}{' '}
            </Grid>
          </Grid>
          <Grid item className={classes.comment}>
            <AddComment />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
