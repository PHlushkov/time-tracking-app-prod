import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'tasks',
  tasks: [ ],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    startTimer: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isRunning = true;
      }
    },
    stopTimer: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isRunning = false;
      }
    },
    updateTaskTime: (state, action) => {
      const { id, time } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.time = time;
      }
    },
    addTask: (state, action) => {
      state.tasks.push({
        ...action.payload,
        id: state.tasks.length + 1,
        time: 0,
        isRunning: false,
      });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { startTimer, stopTimer, updateTaskTime, addTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
