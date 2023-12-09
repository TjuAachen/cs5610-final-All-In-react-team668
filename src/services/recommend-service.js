import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE = process.env.REACT_APP_API_BASE;

export const recommendWatchlists = async () => {
    const response = await axios.get(`${API_BASE}/api/home/topWatchlists`);
    return response.data;
}
export const recommendUsers = async () => {
    const response = await axios.get(`${API_BASE}/api/home/topusers`);
    return response.data;
}