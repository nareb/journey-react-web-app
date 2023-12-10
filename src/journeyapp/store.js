import userReducer from "./users/userReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    userReducer,
  },
});

export default store;
