import { createSlice, current } from '@reduxjs/toolkit';

const getInitialState = () => {
  const localTaskList = window.localStorage.getItem('taskList');
  if (Boolean(localTaskList)) {
    return JSON.parse(localTaskList);
  }
  window.localStorage.setItem('taskList', []);
  return [];
};

const initialState = {
  filterBy: 'all',
  taskList: getInitialState(),
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      state.taskList.push(action.payload);
      const taskList = window.localStorage.getItem('taskList');
      if (taskList) {
        const taskListArray = JSON.parse(taskList);
        taskListArray.push({ ...action.payload });
        window.localStorage.setItem('taskList', JSON.stringify(taskListArray));
      } else {
        window.localStorage.setItem(
          'taskList',
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    toggleTaskCompleted(state, action) {
      const task = state.find((task) => task.id === action.payload);
      task.completed = !task.completed;
    },
    updateTask(state, action) {
      const taskList = window.localStorage.getItem('taskList');
      if (taskList) {
        const taskListArray = JSON.parse(taskList);
        taskListArray.forEach((task) => {
          if (task.id === action.payload.id) {
            task.title = action.payload.title;
            task.description = action.payload.description;
            task.dueDate = action.payload.dueDate;
            task.completed = action.payload.completed;
          }
        });
        window.localStorage.setItem('taskList', JSON.stringify(taskListArray));
        state.taskList = [...taskListArray];
      }
    },
    deleteTask(state, action) {
      const filteredTaskList = state.taskList.filter(
        (task) => task.id !== action.payload
      );
      state.taskList = filteredTaskList;
      window.localStorage.setItem('taskList', JSON.stringify(filteredTaskList));
    },
    changeFilter(state, action) {
      state.filterBy = action.payload;
    },
  },
});

export const {
  addTask,
  toggleTaskCompleted,
  updateTask,
  deleteTask,
  changeFilter,
} = taskSlice.actions;
export default taskSlice.reducer;
