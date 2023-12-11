import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { deletePortfolioByPortfolioId, findPortfolioByUser } from '../../services/portfolio-service';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { updatePortfolioPriceByUser } from '../../services/remoteAPI-service';
import { updatePortfolio } from '../../services/portfolio-service';
import { findCurrentUserThunk } from '../../services/users/users-thunks';

const PortfolioPage = () => {
    const {uid} = useParams();
    const [loaded, setLoaded] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [portfolio, setPortfolio] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStock, setSelectedStock] = useState({});
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();

    // Simulating loading data
    useEffect(() => {
        // Simulating data load delay
        const fetchData = async () => {
            try {
                // Simulated API call or data loading process
                await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulate 2 seconds loading
                // Set loaded to true and update portfolio with data
                setLoaded(true);
                // update stocks in portfolio
                await updatePortfolioPriceByUser(uid);
                // Example portfolio data structure, modify as needed
                await findPortfolioByUser().then((data) => {
                    setPortfolio(data)
                    console.log("debug portfolio page", data)
                });
                
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchData();
    }, []);

    const showDetails = (stock) => {
        // Logic to show details of the selected stock
        navigate(`/details/${stock.ticker}`)
    };

    const openModal = (action, stock) => {
        // Logic to open modal for buy or sell action
        console.log(`Opening ${action} modal for stock:`, stock);
        setShowModal(true);
        setSelectedStock(stock);
        setQuantity(stock.shares)
    };

    const closeModal = () => {
        // Logic to close modal
        console.log('Closing modal');
        setShowModal(false);
    };

    const handleBuy = async () => {
        // Logic for buying or selling stock
        //console.log(`Action: Buy - Ticker: ${ticker}, Quantity: ${quantity}, Name: ${name}, Last Price: ${last}`);
        // Implement your buy or sell functionality here
        setPortfolio(portfolio.map((stock) => {
            if (stock._id === selectedStock._id) {
                stock.buyPrice = (stock.buyPrice * stock.shares + stock.currentPrice * quantity) / (stock.shares + quantity);
                console.log(stock.shares, quantity, "debug handle buy string")
                stock.shares += quantity;
                setSelectedStock(stock)
                updatePortfolio(stock);
            }
            return stock;
        }))
        

        closeModal(); // Close modal after action
    };

    const handleSell = async () => {
        // Logic for buying or selling stock
        //console.log(`Action: Buy - Ticker: ${ticker}, Quantity: ${quantity}, Name: ${name}, Last Price: ${last}`);
        // Implement your buy or sell functionality here
        if (quantity > selectedStock.shares) {
            alert('Input quantity exceeds available shares');
            return; // Exit the function early if input quantity is invalid
        }
        if (quantity == selectedStock.shares) {
            deletePortfolioByPortfolioId(selectedStock._id)
            setPortfolio(portfolio.filter((stock) => stock._id !== selectedStock._id));
            return;
        }
        // update return and shares
        setPortfolio(portfolio.map(async (stock) => {
            if (stock.ticker === selectedStock.ticker) {
                stock.shares -= quantity;
                stock.return += quantity * stock.currentPrice;
                await updatePortfolio(stock);
            }
        }))
        

        closeModal(); // Close modal after action
    };

    return (
        <>
            <div className='h1'>
                My Portfolio
            </div>
            {!loaded ? (
                <div className="spinner-div">
                    {/* Show circular progress while data is loading */}
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    {portfolio.length === 0 ? (
                        <div className="alert-div alert alert-warning">
                            Currently you don't have any stock
                        </div>
                    ) : (
                        portfolio.map((stock, index) => (stock && (
                            <div key={index} className="card text-center">
                                <div className="card-header" onClick={() => showDetails(stock)}>
                                    <span className="name text-muted">{stock.name}</span>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <table>
                                                {/* Populate table with stock data */}
                                                <tr>
                                                    <td className="left">Quantity:</td>
                                                    <td className="right">{stock.shares}</td>
                                                </tr>
                                                <tr>
                                                    <td className="left">Avg. Cost:</td>
                                                    <td className="right">{(stock.buyPrice).toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="left">Total Cost:</td>
                                                    <td className="right">{(stock.buyPrice * stock.shares).toFixed(2)}</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <table>
                                                {/* Populate table with more stock data */}
                                                <tr>
                                                    <td className="left">Change:</td>
                                                    {/* Add logic for change */}
                                                    <td className="right">{(stock.currentPrice - stock.buyPrice).toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="left">Current Price:</td>
                                                    <td className="right">{stock.currentPrice.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="left">Market Value:</td>
                                                    <td className="right">{(stock.currentPrice * stock.shares).toFixed(2)}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-muted text-right">
                                    <div className="btn btn-success" onClick={() => openModal('buy', stock)}>
                                        Buy
                                    </div>
                                    <div className="btn btn-danger" onClick={() => openModal('sell', stock)}>
                                        Sell
                                    </div>
                                </div>
                            </div>
                        )))
                    )}
                </div>
            )}

            {/* Modal for buy or sell */}
            {
            showModal && (<div className={`modal ${showModal ? 'portfolio-buy-window' : ''}`} id="content" tabIndex="-1" role="dialog">

              <div className="modal-body modal-content">
                
                  <div className="row">
                    <div className="d-flex justify-content-between">

                    <p className="modal-title" id="modal-basic-title" >{selectedStock.name}</p>
                    <button
                      type="button"
                      className="btn btn-close"
                      onClick={() => closeModal()}
                      style={{marginLeft: "10px"}}
                    >
                    </button>
                    </div>
                  </div>
                  <div className="row" style={{width: "100%"}}>
                    <div className="col-6 d-flex justify-content-end align-items-center">
                    Current Price:
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      {selectedStock.currentPrice}
                    </div>
                  </div>
                  <div className="row" style={{width: "100%"}}>
                    <div className="col-6  d-flex justify-content-end align-items-center">
                    Quantity:
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <input
                        type="number"
                        className="form-control"
                        required
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="row" style={{width: "100%"}}>
                    <div className="col-6 d-flex justify-content-end align-items-center">
                    Total:
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      {selectedStock.currentPrice * quantity}
                    </div>
                  </div>
                  <div className="row">

                    <div className="col align-left">
                      <button
                        type="button"
                        className="btn btn-success"
                        disabled={quantity < 1}
                        onClick={handleBuy}
                      >
                        Buy
                      </button>
                    </div>
                    <div className="col align-right">
                      <button
                        type="button"
                        className="btn btn-danger"
                        disabled={quantity < 1}
                        onClick={handleSell}
                      >
                        Sell
                      </button>
                    </div>
                  </div>
                </div>
              </div>


             
              )
          }
        </>
    );
};

export default PortfolioPage;
