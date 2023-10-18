import React, { useState } from 'react';
import { Box, Stack, Button, Typography } from '@mui/material';
import TaskModal from '../TaskModal';

const EmptyState = ({ filterValue }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box backgroundColor="white" borderRadius={2} width={'100%'} marginTop={6}>
      <Box borderTopLeftRadius={3} borderTopRightRadius={3} height="40px" />
      <Stack
        justifyContent="center"
        alignItems="center"
        gap={3}
        borderRadius={3}
      >
        <Typography variant="h1" color={'tertiary.light'} textAlign={'center'}>
          {filterValue === 'all'
            ? 'You haven’t added any Tasks.'
            : filterValue === 'completed'
            ? 'You haven’t completed any Tasks.'
            : "You don't have any pending task"}
        </Typography>
        <Typography variant="h2" color={'tertiary.light'}>
          Welcome 👋🏼 Let’s get started.
        </Typography>
        <Button variant="contained" onClick={() => setOpenModal(!openModal)}>
          Add Your First Task
        </Button>
      </Stack>
      <TaskModal open={openModal} setOpen={setOpenModal} />
    </Box>
  );
};

export default EmptyState;
