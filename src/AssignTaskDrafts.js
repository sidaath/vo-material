import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import { AssignDB } from './Assign';
import SupervisorTaskCard from './SupervisorTaskCard';

const useStyles = makeStyles({
  pane: {
    minHeight: '93vh',
    maxHeight: '93vh',
    overflowY: 'auto',
    background: '#f9f9f9',
  },

  paneRight: {
    marginLeft: 10,
  },
});

export default function AssignTaskDrafts() {
  const classes = useStyles();

  const { draftsDB, setResume } = useContext(AssignDB);
  console.log('REPORTS DRAFTS DB ', draftsDB);

  return (
    <Card className={`${classes.pane} ${classes.paneRight}`}>
      <CardContent>
        {draftsDB.map((draft) => {
          return (
            <SupervisorTaskCard
              key={draft.id}
              task={draft}
              cardClickFunction={setResume}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
