import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  dateRange: [dayjs(), dayjs().add(5, 'day')],
  selectedDate: dayjs(),
};

const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setDateRange, setSelectedDate } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;
