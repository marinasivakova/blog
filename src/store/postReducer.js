/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tagList: [],
  description: null,
  body: null,
  title: null,
  liked: false,
  singularTag: '',
};

export const postSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatePost: (state, action) => {
      state.description = action.payload.description;
      state.body = action.payload.body;
      state.title = action.payload.title;
      state.tagList = [...action.payload.tagList];
    },
    updateTag: (state, action) => {
      if (Array.isArray(action.payload.tag)) {
        state.tagList.push(...action.payload.tag);
      } else {
        state.tagList.push(action.payload.tag);
      }
    },
    removeTag: (state, action) => {
      if (action.payload.tag) {
        state.tagList = state.tagList.filter(
          (tag) => tag !== action.payload.tag,
        );
      }
    },
    updateSingularTag: (state, action) => {
      if (action.payload.tag) {
        state.singularTag = action.payload.tag;
      }
    },
  },
});

export const {
  updatePost, updateTag, removeTag, updateSingularTag,
} = postSlice.actions;

export default postSlice.reducer;
