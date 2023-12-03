import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user-reducer.js";
import profileReducer from "../reducers/profile-reducer.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});

export default store;