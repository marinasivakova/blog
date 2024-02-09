/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { email: null, url: 'https://placehold.co/450', username: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      if (action.payload.email) {
        state.email = action.payload.email;
      }
      if (action.payload.image || action.payload.url) {
        state.url = action.payload.image || action.payload.url;
      }
      if (action.payload.username) {
        state.username = action.payload.username;
      }
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
