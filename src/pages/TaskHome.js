import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import {
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import TaskModal from '../components/TaskModal';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../slice/taskSlice';

const TaskHomeWrapper = styled('div')(({ theme }) => ({
  padding: '48px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '28px',
  width: '100%',
}));

const FilterSelect = styled(Select)(({ theme }) => ({
  width: 150,
  height: 35,
  backgroundColor: theme.palette.white.main,
  boxShadow: 'none',
}));

const TaskHome = () => {
  const taskList = useSelector((state) => state.task.taskList);

  const dispatch = useDispatch();
  const filterBy = useSelector((state) => state.task.filterBy);
  const [openModal, setOpenModal] = useState(false);
  const [filterByValue, setFilterByValue] = useState(filterBy);

  const handleFilter = (e) => {
    setFilterByValue(e.target.value);
    dispatch(changeFilter(e.target.value));
  };

  return (
    <TaskHomeWrapper>
      <Typography variant="h1" color={'tertiary.main'}>
        Task Tracker
      </Typography>
      {taskList.length > 0 && (
        <Stack
          direction={'row'}
          justifyContent={'flex-end'}
          alignItems={'center'}
          gap={2}
          width={'100%'}
        >
          <FilterSelect
            value={filterByValue}
            onChange={(e) => handleFilter(e)}
            MenuProps={{ disableScrollLock: true }}
          >
            <MenuItem value={'all'}>
              <Typography variant="label" color={'tertiary.main'}>
                All Tasks
              </Typography>
            </MenuItem>
            <MenuItem value={'pending'}>
              <Typography variant="label" color={'tertiary.main'}>
                Pending Tasks
              </Typography>
            </MenuItem>
            <MenuItem value={'completed'}>
              <Typography variant="label" color={'tertiary.main'}>
                Completed Tasks
              </Typography>
            </MenuItem>
          </FilterSelect>
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            Add Task
          </Button>
        </Stack>
      )}

      <TaskList />
      <TaskModal open={openModal} setOpen={setOpenModal} />
    </TaskHomeWrapper>
  );
};

export default TaskHome;
