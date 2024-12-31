import React from 'react';
import ListFilter from '../components/ListFilter';

export default function CompletedScreen({ tasks, toggleTaskCompletion }) {
  return (
    <ListFilter tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} FilterStatus={'completed'}/>
  );
}
