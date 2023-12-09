import axios from "axios";
const STOCK_API = process.env.REACT_APP_API_BASE + "/api/stocks";

export const findStocks = async (stockList) => {
  const response = await axios.get(`${STOCK_API}`, {
    params: {
      stocklist: stockList,
    },
  });
  return response.data;
};

export const insertStockIfNotExist = async (stock) => {
  const response = await axios.put(`${STOCK_API}`, stock);
  return response.data;
};