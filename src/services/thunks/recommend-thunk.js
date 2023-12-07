import * as service from "../recommend-service";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const recommendWatchlistsThunk = createAsyncThunk(
    "home/recommendWatchlists",
    async () => await service.recommendWatchlists()
);
export const recommendUsersThunk = createAsyncThunk(
    "home/recommendUsers",
    async () => await service.recommendUsers()
);