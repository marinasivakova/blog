import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import clientReducer from "./store/clientReducer";

import App from "./components/app/app";

const store = configureStore({
  reducer: {
    client: clientReducer,
  },
});

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
);
