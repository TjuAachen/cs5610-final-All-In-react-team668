import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
export const getDailyIndexBySymbol = async (symbol) => {
    const param = symbol;
    const response = await axios.get(`${API_BASE}/api/remoteApi/index/historical-chart/${param}`);
    return response.data;
};

export const getLatestIndexBySymbol = async (symbol) => {
    const param = symbol;
    const response = await axios.get(`${API_BASE}/api/remoteApi/index/quote/${param}`);
    return response.data;
}

