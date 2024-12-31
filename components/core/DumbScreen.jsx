import React from 'react';
import ListFilter from './ListFilter';

export default function DumbScreen({
  tasks,
  toggleTaskCompletion,
  FilterStatus,
}) {
  return (
    <ListFilter
      tasks={tasks}
      toggleTaskCompletion={toggleTaskCompletion}
      FilterStatus={FilterStatus}
    />
  );
}
