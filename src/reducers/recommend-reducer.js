import {createSlice} from "@reduxjs/toolkit";
import {recommendWatchlistsThunk, recommendUsersThunk} from "../services/thunks/recommend-thunk"

const recommendSlice = createSlice({
    name: "recommend",
    initialState: { watchlists: [], users: [], error: null },
    reducers: {},
    extraReducers: {
        [recommendWatchlistsThunk.fulfilled]: (state, { payload }) => {
            state.watchlists = payload;
        },
        [recommendUsersThunk.fulfilled]: (state, { payload }) => {
            state.users = payload;
        },
    },
});

export default recommendSlice.reducer;