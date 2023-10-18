import React, { useRef } from 'react';
import { Box, Button, Modal, Stack, Typography, styled } from '@mui/material';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../../slice/taskSlice';
import moment from 'moment';

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  fontFamily: 'Montserrat',
  padding: '24px',
  borderRadius: '8px',
  outline: 'none',

  '@media (max-width:768px)': {
    width: 300,
  },
}));

const inputStyles = {
  padding: '12px 8px',
  borderRadius: '8px',
  margin: '8px 0 24px',
  width: '95%',
  border: 'none',
  fontFamily: 'Montserrat',
  fontWeight: 500,
  backgroundColor: '#ECF1F4',
  outline: 'none',
};

const TaskInput = styled('input')(({ theme }) => ({
  ...inputStyles,
}));

const TaskModal = ({
  open,
  setOpen = () => null,
  type = 'add',
  task = { task: '', description: '', dueDate: 0 },
}) => {
  const dispatch = useDispatch();

  const title = useRef(task.title);
  const description = useRef(task.description);
  const dueDate = useRef(task.dueDate);

  const handleClose = () => {
    setOpen(false);
  };

  const validateForm = () => {
    if (title.current.value.trim() === '') {
      toast.error('Please enter a Title');
      return false;
    } else if (description.current.value.trim() === '') {
      toast.error('Please enter a Description');
      return false;
    } else if (dueDate.current.value === '') {
      toast.error('Please enter a Due Date');
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (type === 'add') {
      dispatch(
        addTask({
          id: Math.random(),
          title: title.current.value,
          description: description.current.value,
          dueDate: dueDate.current.valueAsNumber,
          completed: false,
          createDate: new Date().valueOf(),
        })
      );
      toast.success('Task Added Successfully');
    } else if (type === 'update') {
      dispatch(
        updateTask({
          ...task,
          title: title.current.value,
          description: description.current.value,
          dueDate: dueDate.current.valueAsNumber,
        })
      );
      toast.success('Task Updated Successfully');
    }

    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} disableScrollLock={true}>
      <ModalContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="title">
            <Typography variant="label" color={'tertiary.main'}>
              Title
            </Typography>
            <TaskInput
              ref={title}
              type="text"
              defaultValue={task.title}
              id="title"
            />
          </label>

          <label htmlFor="title">
            <Typography variant="label" color={'tertiary.main'}>
              Description
            </Typography>
            <TaskInput
              ref={description}
              defaultValue={task.description}
              type="text"
              id="description"
            />
          </label>

          <label htmlFor="dueDate">
            <Typography variant="label" color={'tertiary.main'}>
              Due Date
            </Typography>
            <TaskInput
              ref={dueDate}
              defaultValue={
                Boolean(task.dueDate)
                  ? moment(task.dueDate).format('YYYY-MM-DD')
                  : ''
              }
              type="date"
              min={moment(new Date()).format('YYYY-MM-DD')}
              id="dueDate"
            />
          </label>
          <Stack
            direction={'row'}
            alignItems={'center'}
            width={'100%'}
            gap={3}
            marginTop={2}
          >
            <Button type="submit" variant="contained">
              {type !== 'add' ? 'Update' : 'Add'} Task
            </Button>
            <Button variant="outlined" onClick={handleClose} color="danger">
              Cancel
            </Button>
          </Stack>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
