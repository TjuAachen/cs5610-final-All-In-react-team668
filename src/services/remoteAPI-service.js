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
    //console.log(response, "debugCompany")
    return response.data;
}

export const getHistoricalStockData = async (ticker) => {
    const param = ticker || 'APPL';
    const response = await axios.get(`${API_BASE}/api/remoteApi/historical-chart/${param}`);

    return response.data;
}

export const getStockHighlights = async (ticker) => {
    const param = ticker || 'APPL';
    const response = await axios.get(`${API_BASE}/api/remoteApi/highlights/${param}`);

    return response.data;
}

export const getCloudStock = async (keyword) => {
    try {
        console.log(keyword, "debug getCloudStock")
        const response = await axios.get(`${API_BASE}/api/remoteApi/cloud-stock/${keyword}`);
        const data = response.data;
        const results = [];
        //console.log(data, "debug getCloudStock")
        await Promise.all(data.map(async (stock) => {
          //  console.log(stock.assetType, "remoteApi")
            if (stock.assetType === 'Stock') {
                const stockResult = await getStockHighlights(stock.ticker);
                results.push(stockResult);
            }
        }));

        return results;
    } catch (error) {
        // Handle errors here
        console.error('Error in getCloudStock:', error);
        return [];
    }
};


export const getLatestChartData = async (ticker) => {
    let results;
    await axios.get(`${API_BASE}/api/remoteApi/summary/chart/${ticker}`).then((response) => {
        results = response.data;
    })

    return results;
}

export const updatePortfolioPriceByUser = async (uid) => {
    console.log("debug update portfolio price by user before")
    await axios.put(`${API_BASE}/api/remoteApi/portfolio/${uid}`).then((response) => {
        console.log("debug update portfolio price by user", response)
        return response;
    })
}