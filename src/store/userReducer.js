import { createSlice } from "@reduxjs/toolkit";

const initialState = { email: null, url: null, username: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.email = action.payload.email;
      state.url= action.payload.image || action.payload.url;
      state.username= action.payload.username;
    }
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
