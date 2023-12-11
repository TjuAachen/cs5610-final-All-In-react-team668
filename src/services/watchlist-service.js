import axios from "axios";
import { updateUserNonAdmin } from "./user-service";
const WATCHLIST_API = process.env.REACT_APP_API_BASE + "/api/watchlists";
const WATCHLISTDEFAULT_API = process.env.REACT_APP_API_BASE + "/api/watchlistsdefault";

export const createWatchlist = async (obj) => {
  const response = await axios.post(WATCHLIST_API, obj.watchlist);
  // increase watchlistCount in user table
  console.log("create watchlist", response);
  updateUserNonAdmin({ _id: obj.watchlist.user, watchlistsCount: obj.cnt });
  return response.data;
};

export const findWatchlists = async (userId) => {
  const response = await axios.get(`${WATCHLIST_API}/${userId}`);
  // console.log("see watchlist response", response.data[0]);
  for (var i = 0; i <= response.data.length; i++) {
    let watchlistData = response.data[i];
    if (watchlistData) {
      localStorage.setItem(watchlistData._id, JSON.stringify(watchlistData));
    }
  }
  const watchlists = response.data;
  return watchlists;
};

export const deleteWatchlist = async (watchlistObj) => {
  console.log("in delete watchlist")
  const response = await axios.delete(`${WATCHLIST_API}`, {
    data: {
      watchlistObj,
    },
  });
  return response.data;
};

export const findWatchlistDetails = async (watchlistId) => {
  const response = await axios.get(`${WATCHLIST_API}/details/${watchlistId}`);
  return response.data;
};

export const findStocks = async (watchlistId) => {
  const response = await axios.get(`${WATCHLIST_API}/stocks/${watchlistId}`);
  return response.data;
};

export const updateWatchlist = async (watchlist) => {
  const response = await axios.put(`${WATCHLIST_API}/${watchlist._id}`, watchlist);
  return response.data;
};

export const findDefaultWatchlistByUser = async (userId) => {
  const response = await axios.get(`${WATCHLISTDEFAULT_API}/${userId}`);
  return response.data;
};

