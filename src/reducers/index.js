import { combineReducers } from 'redux';
import taskReducer from '../slice/taskSlice';

const rootReducer = combineReducers({
  task: taskReducer,
});

export default rootReducer;
