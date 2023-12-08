import axios from "axios";
const STOCK_WATCHLIST_API = process.env.REACT_APP_API_BASE + "/api/stockWatchlist";

export const findStocksByWatchlistId = async (wid) => {
  const response = await axios.get(`${STOCK_WATCHLIST_API}/${wid}`);
  return response.data;
};

export const deleteStockWatchlist = async (userId, ticker) => {
  const response = await axios.delete(
    `${STOCK_WATCHLIST_API}/${userId}/${ticker}`
  );
  return response.data;
};

export const findStockNumberByUserId = async (userId) => {
  const response = await axios.get(`${STOCK_WATCHLIST_API}/stockNumber/${userId}`);
  return response.data;
};

export const createStockWatchlist = async (userId, ticker, watchlistId) => {
  const response = await axios.post(STOCK_WATCHLIST_API, {
    userId: userId,
    ticker: ticker,
    watchlistId: watchlistId,
  });
  return response.data;
};

export const findCurrentUserStocks = async () => {
  const response = await axios.get(`${STOCK_WATCHLIST_API}`);
  return response.data;
};

export const findLikedStocksByUser = async (uid) => {
  const response = await axios.get(`${STOCK_WATCHLIST_API}/user/${uid}`);
  return response.data;
};

export const updateStockWatchlist = async (obj) => {
  const response = await axios.put(`${STOCK_WATCHLIST_API}`, obj);
  return response.data;
};

