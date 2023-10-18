import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskCard from '../TaskCard';
import EmptyState from './EmptyState';

const TaskList = () => {
  const taskList = useSelector((state) => state.task.taskList);
  const filter = useSelector((state) => state.task.filterBy);

  const filteredList = useMemo(() => {
    return taskList
      .filter((task) => {
        if (filter === 'all') {
          return true;
        } else if (filter === 'pending') {
          return !task.completed;
        } else if (filter === 'completed') {
          return task.completed;
        }
      })
      .sort((a, b) => b.createDate - a.createDate);
  }, [taskList, filter]);

  return (
    <>
      {filteredList?.length > 0 ? (
        filteredList?.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default TaskList;
