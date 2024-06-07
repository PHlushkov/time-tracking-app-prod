import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: ['Studies', 'Work', 'Something else...'],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.list.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.list = state.list.filter((category) => category !== action.payload);
    },
  },
});

export const { addCategory, removeCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
