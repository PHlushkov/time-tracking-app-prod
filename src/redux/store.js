import { configureStore } from '@reduxjs/toolkit';
import dateRangeReducer from './slice/dateRangeSlice';
import tasksReducer from './slice/tasksSlice';
import categorySlice from './slice/categorySlice';
import authSlice from './slice/authSlice';

const store = configureStore({
  reducer: {
    dateRange: dateRangeReducer,
    tasks: tasksReducer,
    categories: categorySlice,
    auth: authSlice,
  },
});

export default store;
