import React, { useState, useEffect } from 'react';
import './app.css';
import Assign from './Assign';
import Inspect from './Inspect';
import Reports from './Reports';
import TabBar from './TabBar';
import Tasks from './Tasks';

function TaskManagement() {
  const [display, setDisplay] = useState('tasks');

  useEffect(() => {}, [display]);

  function handleTabClick(event) {
    setDisplay(event.target.dataset.destination);
  }

  return (
    <>
      <TabBar handleTabClick={handleTabClick} />
      {display === 'tasks' && <Tasks />}
      {display === 'inspect' && <Inspect />}
      {display === 'assign' && <Assign />}
      {display === 'reports' && <Reports />}
    </>
  );
}

export default TaskManagement;
