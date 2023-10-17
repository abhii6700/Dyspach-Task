import { useSelector } from 'react-redux';
import './App.css';
import TaskHome from './pages/TaskHome';

function App() {
  const task = useSelector((store) => store.task);

  return (
    <>
      <TaskHome />
    </>
  );
}

export default App;
