import React, { useState, useEffect } from 'react';
import './App.css';
import Assign from './Assign';
import Inspect from './Inspect';
import Reports from './Reports';
import TabBar from './TabBar';
import Tasks from './Tasks';

export const TaskManagementData = React.createContext();
const LOCAL_STORAGE_ASSIGNED_TASKS_KEY = 'vo-material.assigned_tasks_array';
const LOCAL_STORAGE_DRAFTS_KEY = 'vo-material.drafts_array';

function TaskManagement() {
  //REPLACE WITH SERVER FETCH and WRITE - ASSIGNED TASKS ARRAY
  const [assignedTasksDB, setAssignedTasksDB] = useState([]);
  const [draftsDB, setDraftsDB] = useState([]);
  const TaskManagementDataContextVals = {
    assignedTasksDB,
    setAssignedTasksDB,
    draftsDB,
    setDraftsDB,
  };

  //Read from storage on first render
  useEffect(() => {
    const assignedTasksDBJSON = localStorage.getItem(
      LOCAL_STORAGE_ASSIGNED_TASKS_KEY
    );
    if (assignedTasksDBJSON !== null) {
      setAssignedTasksDB(JSON.parse(assignedTasksDBJSON));
    }

    const draftsDBJSON = localStorage.getItem(LOCAL_STORAGE_DRAFTS_KEY);
    if (draftsDBJSON !== null) {
      setDraftsDB(JSON.parse(draftsDBJSON));
    }
  }, []);

  //Writing to assigned tasks DB when theres a change to the array
  useEffect(() => {
    console.log('writing AssignedTasksDB');
    console.log(assignedTasksDB);
    localStorage.setItem(
      LOCAL_STORAGE_ASSIGNED_TASKS_KEY,
      JSON.stringify(assignedTasksDB)
    );
  }, [assignedTasksDB]);

  //Writing to drafts DB when theres a change to the array
  useEffect(() => {
    console.log('writing draftsDB');
    console.log(draftsDB);
    localStorage.setItem(LOCAL_STORAGE_DRAFTS_KEY, JSON.stringify(draftsDB));
  }, [draftsDB]);

  const [display, setDisplay] = useState('tasks');

  useEffect(() => {}, [display]);

  function handleTabClick(event) {
    setDisplay(event.target.dataset.destination);
  }

  return (
    <>
      <TabBar handleTabClick={handleTabClick} />
      <TaskManagementData.Provider value={TaskManagementDataContextVals}>
        {display === 'tasks' && <Tasks />}
        {display === 'inspect' && <Inspect />}
        {display === 'assign' && <Assign />}
        {display === 'reports' && <Reports />}
      </TaskManagementData.Provider>
    </>
  );
}

export default TaskManagement;
