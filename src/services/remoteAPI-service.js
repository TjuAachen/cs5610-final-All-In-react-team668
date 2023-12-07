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

/*export const getStockAutocomplete = async (keyword) => {
    const param = keyword || 'APPL';
    const response = await axios.get(`${API_BASE}/api/remoteApi/autocomplete/${param}`);

    return response.data;
}*/

export const getStockNews = async (ticker) => {
    const param = ticker || 'APPL';
    const response = await axios.get(`${API_BASE}/api/remoteApi/news/${param}`);

    return response.data;
}

export const getStockSummary = async (ticker) => {
    const param = ticker || 'APPL';
    const response = await axios.get(`${API_BASE}/api/remoteApi/summary/${param}`);

    return response.data;
}

export const getStockDescription = async (ticker) => {
    const param = ticker || 'APPL';
    const response = await axios.get(`${API_BASE}/api/remoteApi/description/${param}`);

    return response.data;
}

export const getHistoricalStockData = async (ticker) => {
    const param = ticker || 'APPL';
    const response = await axios.get(`${API_BASE}/api/remoteApi/historical-chart/${param}`);

    return response.data;
}

export const getStockRecentData = async (ticker) => {
    const param = ticker || 'APPL';
    const response = await axios.get(`${API_BASE}/api/remoteApi/recent/${param}`);

    return response.data;
}

export const getCloudStock = async (keyword) => {
    const response = []
    await axios.get(`${API_BASE}/api/remoteApi/cloud-stock/${keyword}`).then((response) => {
        const data = response.data;
        data.forEach(async (stock) => {
            if (stock.assetType === 'stock') {
                const stockResult = await getStockSummary(stock.ticker);
                response.push(stockResult)   
            }
        })
    });


    return response;
}