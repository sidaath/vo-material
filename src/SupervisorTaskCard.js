import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
    overflow: 'auto',
    cursor: 'pointer',
  },
});

export default function SupervisorTaskCard(props) {
  const classes = useStyles();

  const blank = () => {};

  console.log('props inside SupTaskCard', props.task);
  const task = props.task;
  //id, owner, title, description, deadline, workers
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const workers = task.workers;

  const cardClickFunction = props.cardClickFunction || blank;
  console.log(cardClickFunction);

  if (title === '') {
    setTitle('No Title');
  }

  if (description === '') {
    setDescription('No Description');
  }

  const isWorkers = workers.length > 0;
  console.log('from supcard, isWorkers? ', isWorkers);

  function handleCardClick() {
    cardClickFunction(task);
  }

  return (
    <Card className={classes.card} onClick={handleCardClick}>
      <CardContent>
        <Typography>{title}</Typography>
      </CardContent>
      <CardContent>
        <Typography>Description</Typography>
        <Typography>{description}</Typography>
      </CardContent>
      {isWorkers && (
        <Grid container>
          {workers.map((worker) => {
            return <Avatar>{worker.id}</Avatar>;
          })}
        </Grid>
      )}
    </Card>
  );
}
