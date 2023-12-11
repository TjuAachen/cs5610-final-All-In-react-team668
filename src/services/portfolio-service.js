import axios from "axios";
const PORTFOLIO_API = process.env.REACT_APP_API_BASE + "/api/portfolio";

export const createPortfolio = async (newPortfolio) => {
    const response = await axios.post(PORTFOLIO_API, newPortfolio);

    return response.data;
  };


  export const deletePortfolioByUserStock = async (uid, ticker) => {
    console.log("debug delete portfolio before")
    const response = await axios.delete(PORTFOLIO_API, {
      params: {
        user: uid,
        ticker: ticker
      },
    });
    console.log("debug delete portfolio after")
    return response.data;
  };

  export const deletePortfolioByPortfolioId = async (pid) => {
    console.log("debug delete portfolio before")
    const response = await axios.delete(PORTFOLIO_API +`/${pid}`);
    console.log("debug delete portfolio after")
    return response.data;
  };

  export const findPortfolioByUser = async () => {
    console.log("debug find portfolio by user before")
    const response = await axios.get(PORTFOLIO_API);
    console.log("debug find portfolio by user", response)
    return response.data;
  }

  export const updatePortfolio = async (newPortfolio) => {
    const response = await axios.put(PORTFOLIO_API, newPortfolio);
    
    return response.data;
  }