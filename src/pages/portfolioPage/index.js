import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { deletePortfolioByUserStock, findPortfolioByUser } from '../../services/portfolio-service';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { updatePortfolioPriceByUser } from '../../services/remoteAPI-service';
import { updatePortfolio } from '../../services/portfolio-service';

const PortfolioPage = () => {
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
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 seconds loading
                // Set loaded to true and update portfolio with data
                setLoaded(true);
                // update stocks in portfolio
                await updatePortfolioPriceByUser(currentUser._id);
                // Example portfolio data structure, modify as needed
                await findPortfolioByUser(currentUser._id).then((data) => setPortfolio(data));
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
        setPortfolio(portfolio.map(async (stock) => {
            if (stock.ticker === selectedStock.ticker) {
                stock.buyPrice = (stock.buyPrice * stock.shares + stock.currentPrice * quantity) / (stock.shares + quantity);
                stock.shares += quantity;
                await updatePortfolio(stock);
            }
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
            deletePortfolioByUserStock(selectedStock.user, selectedStock.ticker)
            setPortfolio(portfolio.filter((stock) => stock.ticker !== selectedStock.ticker));
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
            <div className='heading'>
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
                        portfolio.map((stock, index) => (
                            <div key={index} className="card text-center">
                                <div className="card-header" onClick={() => showDetails(stock)}>
                                    <span className="ticker-name">{stock.ticker} </span>
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
                                                    <td className="left">Avg. Cost/Share:</td>
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
                        ))
                    )}
                </div>
            )}

            {/* Modal for buy or sell */}
            {showModal && (
                <>
                    <div class="modal-header">
                        <p class="modal-title" id="modal-basic-title">{selectedStock.name}</p>
                        <button type="button" class="close" aria-label="Close" onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body modal-content">
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <label>Current Price: {selectedStock.currentPrice}</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-sm-12 quantity-label">
                                    <label for="quantity">Quantity: </label>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <input type='number' class="form-control" id="quantity" name="quantity"
                                        value={selectedStock.shares} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="container">
                            <div class="row justify-content-space-between">
                                <div class="col">
                                    <label htmlFor="total">Total :</label>
                                    <input
                                        type="number"
                                        id="total"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                                <div class="col align-left">
                                    <button type="button" class="btn btn-danger" onClick={handleSell}>Sell</button>
                                </div>
                                <div class="col align-right">
                                    <button type="button" class="btn btn-success" onClick={handleBuy}>Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default PortfolioPage;
