import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import TimerIcon from '@mui/icons-material/Timer';
import { Box, Button, Container, IconButton, Tooltip } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, startTimer, stopTimer, updateTaskTime } from '../../redux/slice/tasksSlice';
import TaskFormModal from '../TaskFormModal/TaskFormModal';
import { getFilteredTasksByUser } from './utils';
import styles from './Tasks.module.css';

function Tasks({ selectedCategory, setSelectedCategory }) {
  const [taskModelopen, setTaskModelOpen] = useState(false);

  const tasks = useSelector((state) => state.tasks.tasks);
  const user = useSelector((state) => state.auth.user);
  const selectedDate = useSelector((state) => state.dateRange.selectedDate);

  const dispatch = useDispatch();
  const timers = useRef({});

  const handleOpenModal = () => setTaskModelOpen(true);

  useEffect(() => {
    tasks.forEach((task) => {
      if (task.isRunning) {
        timers.current[task.id] = setInterval(() => {
          dispatch(updateTaskTime({ id: task.id, time: task.time + 1 }));
        }, 1000);
      } else {
        clearInterval(timers.current[task.id]);
      }
    });

    return () => {
      tasks.forEach((task) => {
        clearInterval(timers.current[task.id]);
      });
    };
  }, [tasks, dispatch]);

  const handleStartStop = (id, isRunning) => {
    if (isRunning) {
      dispatch(stopTimer(id));
    } else {
      dispatch(startTimer(id));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const filteredTasks = useMemo(() => getFilteredTasksByUser({
    tasks,
    user,
    selectedCategory,
    selectedDate,
  }), [tasks, user?.uid, selectedCategory, selectedDate]);

  return (
    <Container>
      <Box position="relative" paddingBottom={5}>
        {user && (
          <Tooltip title="Add task" placement="top">
            <IconButton onClick={handleOpenModal}>
              <AddCircleIcon fontSize="large" color="info" />
            </IconButton>
          </Tooltip>
        )}
        {filteredTasks.map((val) => (
          <div className={styles.task}>
            <div className={styles.task__desc}>
              <h1>{val.title}</h1>
              <p>{val.description}</p>
            </div>
            <div className={styles.task__nav}>
              <h2>{new Date(val.time * 1000).toISOString().substr(11, 8)}</h2>
              <Button onClick={() => handleStartStop(val.id, val.isRunning)}>
                {val.isRunning ? (
                  'Stop'
                ) : (
                  <>
                    <TimerIcon />
                    Start
                  </>
                )}
              </Button>
              <Button onClick={() => handleDelete(val.id)}>
                <DeleteIcon />
              </Button>
            </div>
          </div>
        ))}
        <TaskFormModal
          taskModelopen={taskModelopen}
          setTaskModelOpen={setTaskModelOpen}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDate={selectedDate}
        />
      </Box>
    </Container >
  );
}

export default Tasks;
