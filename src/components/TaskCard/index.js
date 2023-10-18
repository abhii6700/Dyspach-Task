import { IconButton, Stack, Typography, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { deleteTask, updateTask } from '../../slice/taskSlice';
import TaskModal from '../TaskModal';
import { Checkbox } from '@mui/material';

const TaskCardWrapper = styled('div')(({ theme }) => ({
  borderRadius: '12px',
  backgroundColor: 'white',
  boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px;',
  width: '100%',
}));

const TaskCard = ({ task = {} }) => {
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [completed, setCompleted] = useState(task.completed);

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast.success('Task Deleted Successfully');
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const toggleIsCompleted = () => {
    setCompleted(!completed);
    dispatch(
      updateTask({
        ...task,
        completed: !completed,
      })
    );
  };

  return (
    <TaskCardWrapper>
      <Stack
        padding={2}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack direction={'row'} gap={1} alignItems={'center'}>
          <Checkbox
            color="secondary"
            checked={completed}
            onChange={toggleIsCompleted}
          />
          <Stack direction={'column'} gap={1}>
            <Typography
              variant="body"
              color={'tertiary.main'}
              sx={{ textDecoration: `${completed && 'line-through'}` }}
            >
              {task.title}
            </Typography>
            <Typography variant="label" color={'tertiary.light'}>
              {task.description}
            </Typography>
            <Typography variant="subtitle" color={'tertiary.main'}>
              Due by: {moment(task.dueDate).format('ll')}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={'row'} alignItems={'center'} gap={1}>
          {!completed && (
            <IconButton onClick={handleUpdate} color="primary">
              <EditIcon />
            </IconButton>
          )}

          <IconButton onClick={handleDelete} color="danger">
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>

      <TaskModal
        type="update"
        open={updateModalOpen}
        task={task}
        setOpen={setUpdateModalOpen}
      />
    </TaskCardWrapper>
  );
};

export default React.memo(TaskCard);
