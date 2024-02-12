import { configureStore } from '@reduxjs/toolkit';
import clientReducer from 'store/clientReducer';
import userReducer from 'store/userReducer';
import postReducer from 'store/postReducer';

const store = configureStore({
  reducer: {
    client: clientReducer,
    user: userReducer,
    post: postReducer,
  },
});

export default store;
