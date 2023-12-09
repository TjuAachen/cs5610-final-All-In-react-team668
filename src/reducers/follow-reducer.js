import { createSlice } from "@reduxjs/toolkit";
import {
  findFolloweeThunk,
  updateFolloweeThunk,
  checkFolloweeThunk,
} from "../services/thunks/followee-thunk";

const followSlice = createSlice({
  name: "follow",
  initialState: { followeeList: [], checkFollowee: [], isSelf: false },
  reducers: {},
  extraReducers: {
    [findFolloweeThunk.fulfilled]: (state, { payload }) => {
      state.followeeList = payload;
    },
    [checkFolloweeThunk.fulfilled]: (state, { payload }) => {
      state.followeeList = payload.followeeList;
      state.checkFollowee = payload.checkFollowee;
      state.isSelf = payload.isSelf;
    },
    [updateFolloweeThunk.fulfilled]: (state, { payload }) => {
      if (state.isSelf) {
        state.followeeList = payload;
      }
    },
  },
});

export default followSlice.reducer;
