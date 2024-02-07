/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { articles: [], page: false };

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    updateClient: (state, action) => {
      state.articles = [...action.payload];
    },
    getPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { updateClient, getPage } = clientSlice.actions;

export default clientSlice.reducer;
