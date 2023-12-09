import axios from "axios";
const PORTFOLIO_API = process.env.REACT_APP_API_BASE + "/api/portfolio";

export const createPortfolio = async (newPortfolio) => {
    const response = await axios.post(PORTFOLIO_API, newPortfolio);

    return response.data;
  };


  export const deletePortfolioByUserStock = async (uid, ticker) => {
    const response = await axios.delete(PORTFOLIO_API, {
      params: {
        user: uid,
        ticker: ticker
      },
    });

    return response.data;
  };

  export const findPortfolioByUser = async (userId) => {
    const response = await axios.get(PORTFOLIO_API, userId);

    return response.data;
  }

  export const updatePortfolio = async (newPortfolio) => {
    const response = await axios.put(PORTFOLIO_API, newPortfolio);
    
    return response.data;
  }