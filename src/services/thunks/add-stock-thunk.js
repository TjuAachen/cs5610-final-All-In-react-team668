import { createAsyncThunk } from "@reduxjs/toolkit";
import { findCurrentUserStocks } from "../stockWatchlist-service";

export const findCurrentUserStocksThunk = createAsyncThunk(
  "profile/findCurrentUserStocksThunk",
  async () => {
    const stocks = await findCurrentUserStocks();
    return stocks;
  }
);