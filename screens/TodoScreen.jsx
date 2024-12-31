import React from 'react';
import ListFilter from '../components/ListFilter';

export default function ToDoScreen({ tasks, toggleTaskCompletion }) {
  return (
    <ListFilter tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} FilterStatus={'not-started'}/>
  );
}
