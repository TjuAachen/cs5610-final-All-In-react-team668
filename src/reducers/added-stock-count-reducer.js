import { createSlice } from "@reduxjs/toolkit";
import { findCurrentUserStocksThunk } from "../services/thunks/add-stock-thunk";

const addedStocksSlice = createSlice({
  name: "addedStockCount",
  initialState: { addedStocks: [] },
  reducers: {
    updateAddedStock(state, action) {
      state.addedStocks = action.payload;
    },

    deleteAddedStock(state, action) {
      // delete the stock from addedStocks
      const ticker = action.payload;
      state.addedStocks = state.addedStocks.filter(
        (stock) => stock.ticker !== ticker
      );
    },

    addStock(state, action) {
      const { _id, ticker } = action.payload;
      state.addedStocks = [...state.addedStocks, action.payload];
    },
  },
  extraReducers: {
    [findCurrentUserStocksThunk.fulfilled]: (state, { payload }) => {
      state.addedStocks = payload;
    },
  },
});

export const { updateAddedStock, deleteAddedStock, addStock } =
addedStocksSlice.actions;
export default addedStocksSlice.reducer;