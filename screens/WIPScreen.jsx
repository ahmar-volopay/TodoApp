import React from 'react';
import ListFilter from '../components/ListFilter';

export default function WIPScreen({ tasks, toggleTaskCompletion }) {
  return (
    <ListFilter tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} FilterStatus={'in-progress'}/>
  );
}
