import axios from "axios";

const api = axios.create({
    withCredentials: true,
});

const API_BASE = process.env.REACT_APP_API_BASE;
  
  export const searchLocalWatchlists = async (name) => {
    const response = await api.post(`${API_BASE}/api/local-watchlists`, {
      watchlistName: name,
    });
    return response.data;
  };
  
  export const searchLocalStocks = async (name) => {
    const response = await api.post(`${API_BASE}/api/local-stocks`, {
      name: name,
    });
    return response.data;
  };

  