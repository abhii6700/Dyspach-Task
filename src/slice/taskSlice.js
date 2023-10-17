import { createSlice } from '@reduxjs/toolkit';

const initialState = [{ task: 23 }];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      state.push({
        id: Math.random(),
        title: action.payload.title,
        description: action.payload.description,
        dueDate: action.payload.dueDate,
        taskCompleted: false,
      });
    },
    toggleTaskCompleted(state, action) {
      const task = state.find((task) => task.id === action.payload);
      task.completed = !task.completed;
    },
  },
});

export const { addTask, toggleTaskCompleted } = taskSlice.actions;
export default taskSlice.reducer;
