import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./clientReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";

const store = configureStore({
  reducer: {
    client: clientReducer,
    user: userReducer,
    post: postReducer,
  },
});

export default store;
