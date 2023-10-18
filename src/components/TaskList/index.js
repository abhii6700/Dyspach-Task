import React, { useMemo } from 'react';
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
      .sort((a, b) => a.dueDate - b.dueDate);
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
