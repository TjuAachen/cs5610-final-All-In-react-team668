import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user-reducer.js";
import profileReducer from "../reducers/profile-reducer.js";
import recommendReducer from "../reducers/recommend-reducer.js";
import searchReducer from "../reducers/search-reducer.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    recommend: recommendReducer,
    search: searchReducer
  },
});

export default store;