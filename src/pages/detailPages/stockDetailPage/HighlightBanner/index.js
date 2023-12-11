import React, { useEffect, useState } from 'react';
import { getStockHighlights } from '../../../../services/remoteAPI-service';
import { createPortfolio } from '../../../../services/portfolio-service';
import { useSelector, useDispatch } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { STOCK_LIMITATION_FOR_REGULAR_USER } from "../../../../constants/Constants";
import { findCurrentUserStocksThunk } from '../../../../services/thunks/add-stock-thunk';
import { deleteAddedStock, addStock } from "../../../../reducers/added-stock-count-reducer.js";
import { deleteStockWatchlist } from '../../../../services/stockWatchlist-service';
import { insertStockIfNotExist } from '../../../../services/stock-service.js';
import { createStockWatchlist } from '../../../../services/stockWatchlist-service';
import { findWatchlists } from '../../../../services/watchlist-service.js';
import { useNavigate } from 'react-router-dom';
import { findCurrentUserThunk } from "../../../../services/users/users-thunks.js";
import "./index.css"
import Dropdown from "react-bootstrap/Dropdown";


const HighlightBanner = ({ ticker, summary }) => {
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const iconSize = 25;
  const [show, setShow] = useState(false);
  const [highlights, setHighlights] = useState({});
  const [stock, setStock] = useState({})
  const [quantity, setQuantity] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { addedStocks } = useSelector((state) => state.addStock);
  const { currentUser } = useSelector((state) => state.user);
  const currentDate = new Date().toISOString().split('T')[0];
  const [watchlistsOption, setWatchlistsOption] = useState(null);
  const loginId = currentUser ? currentUser._id : null;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  // console.log(stock, "debug portfolio ordinary stock")
  const fetchHighlightData = async (ticker) => {
    const response = await getStockHighlights(ticker);
    setStock({
      ticker: ticker,
      stockName: response.name,
      openPrice: summary.open,
      closePrice: summary.close,
      lowPrice: summary.low,
      highPrice: summary.high,
      date: currentDate,
      volume: summary.volume
    })
    setHighlights(response);
  }

  const buyStock = async () => {
    const newPortfolio = { ticker: ticker, user: currentUser._id, name: stock.stockName, creationDate: currentDate, buyPrice: highlights.last, shares: quantity, currentPrice: highlights.last, return: 0 }
    //console.log(stock, "debug portfolio buy stock")
    await createPortfolio(newPortfolio);
    setShowModal(false);
  }

  const isAddedByUser = () => {
    addedStocks.forEach((item) => {
      if (item.ticker === ticker) {
        setLike(true);
      }
    })
  }
  const openModal = () => {
    // Logic to open modal for buy or sell action

    if (currentUser) {
      setShowModal(true);
    } else {
      setShow(true);
    }
    console.log(`Opening  modal for stock buy`, showModal);
    // setStock(stock);
    //setQuantity(stock.shares)
  };

  const closeModal = () => {
    // Logic to close modal
    console.log('Closing modal');
    setShowModal(false);
  };

  const fetchLoginUserWatchlists = async (uid) => {
    let myWatchlists = await findWatchlists(uid);
    setWatchlistsOption(myWatchlists);
  };

  useEffect(() => {
    let fecthDataBefore = async () => {
      await fetchHighlightData(ticker);
    }
    fecthDataBefore();

  }, [ticker]);

  useEffect(() => {
    dispatch(findCurrentUserStocksThunk());
    dispatch(findCurrentUserThunk());
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchData = async () => {
        await fetchLoginUserWatchlists(currentUser._id);
        isAddedByUser();
      }
      fetchData();
    }
  }, [loginId]);

  const stockDetailHandleUnLikeClick = async (stock) => {
    if (!currentUser) return;
    // update state in likedSong reducer
    dispatch(deleteAddedStock(stock.ticker));
    // get _id of the song with the passed apiSongId
    const stockToDelete = addedStocks.filter(
      (addedStock) => addedStock.ticker === stock.ticker
    );
    if (stockToDelete.length > 0) {
      deleteStockWatchlist(currentUser._id, stockToDelete[0].ticker);
    }
  };

  const stockDetailHandleAddToWatchlist = async (wid, stock, setLike) => {
    if (!currentUser) return;
    if (
      !currentUser.isVip &&
      addedStocks.length >= STOCK_LIMITATION_FOR_REGULAR_USER
    ) {
      setShowUpgrade(true);
      return;
    }
    setLike(true);

    // insert the song to db if not exist
    const insertedStock = await insertStockIfNotExist(stock);
    // update state in likedSong reduce
    if (insertedStock.length > 0) {
      dispatch(addStock(insertedStock[0]));
      // insert the song-playlist pair into db
      createStockWatchlist(currentUser._id, insertedStock[0].ticker, insertedStock[0]._id, wid);
    }
  };


  return (
    <>

      < div className="row highlights" >

        {/* Left panel */}
        < div className="col-6 align-left" >
          {showUpgrade && (
            <>
              <div
                className={`col text-white position-absolute upgrade-in-watchlist-div p-3 rounded-3 bg-primary fw-bold`}
              >
                Enjoy your Premium Journey!
                <div className={`text-white upgrade-text`}>
                  Upgrade your account to add more stocks.
                </div>
                <div
                  className={`mt-2 d-flex align-items-center justify-content-end`}
                >
                  <button
                    className={`btn not-now-btn`}
                    onClick={() => setShowUpgrade(false)}
                  >
                    Not now
                  </button>
                  <button
                    className={` login-btn rounded-pill`}
                    onClick={() => {
                      setShowUpgrade(false);
                      navigate("/premium");
                    }}
                  >
                    Upgrade
                  </button>
                </div>
              </div>

            </>
          )
          }
          <span>
            <div className="ticker">
              {ticker}
              <div
                className={`col-1`}
              >
                {like && (
                  <AiFillHeart
                    size={iconSize}
                    className={`text-danger`}
                    onClick={() => {
                      setLike(false);
                      stockDetailHandleUnLikeClick(stock);
                    }}
                  />
                )}
                {!like && (
                  <>
                    {!watchlistsOption && (
                      <>
                        <div className={`position-relative`}>
                          <div onClick={() => setShow(!show)}>
                            <AiOutlineHeart
                              size={iconSize}
                              className={`text-muted`}
                            />
                          </div>
                          {show && (
                            <div className={`like-toolkit-div position-absolute rounded-3`}>
                              <h5 className={`text-white fw-bold mt-2 p-1`}>
                                Enjoy your Investment!
                              </h5>
                              <div
                                className={`mt-2 mb-1 d-flex justify-content-center align-items-center`}
                              >
                                <button
                                  className={`btn btn-light p-1`}
                                  style={{ marginRight: "5px" }}
                                  onClick={() => navigate("/login")}
                                >
                                  Log in
                                </button>
                                <button
                                  className={`btn btn-light p-1`}
                                  style={{ marginLeft: "5px" }}
                                  onClick={() => setShow(false)}
                                >
                                  Not Now
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {watchlistsOption && (
                      <div className={`d-flex align-items-center`}>
                        <Dropdown id="watchlists">
                          <Dropdown.Toggle
                            variant="secondary"
                            id="dropdown-basic"
                            className={`bg-muted`}
                          >
                            <AiFillHeart size={iconSize} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {watchlistsOption.map((p) => (
                              <Dropdown.Item
                                onClick={() => {
                                  // setLike(true);
                                  stockDetailHandleAddToWatchlist(p._id, stock, setLike);
                                }}
                              >
                                Add to {p.watchListName}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </span>
          <p className="name text-muted">{highlights.name}</p>
          <p>{highlights.exchangeCode}</p>
          <button className="btn btn-success" onClick={() => openModal()}>Buy</button>

          {/* Modal */}
          {
            showModal && (<div className={`modal ${showModal ? 'portfolio-buy-window' : ''}`} id="content" tabIndex="-1" role="dialog">

              <div className="modal-body modal-content">
                
                  <div className="row">
                    <div className="d-flex justify-content-between">

                    <p className="modal-title" id="modal-basic-title" style={{marginLeft: "150px"}}>{highlights.ticker}</p>
                    <button
                      type="button"
                      className="btn btn-close"
                      onClick={() => closeModal()}
                      style={{marginLeft: "150px"}}
                    >
                    </button>
                    </div>
                  </div>
                  <div className="row" style={{width: "100%"}}>
                    <div className="col-6 d-flex justify-content-end align-items-center">
                    Current Price:
                    </div>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      {highlights.last}
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
                      {highlights.last * quantity}
                    </div>
                  </div>
                  <div className="row">

                    <div className="col align-center">
                      <button
                        type="button"
                        className="btn btn-success"
                        disabled={quantity < 1}
                        onClick={buyStock}
                      >
                        Buy
                      </button>
                    </div>

                  </div>
                </div>
              </div>


             
              )
          }
            </div >

        {/* Right panel */}
          < div className="col-6 align-right" >
            <p className={highlights.change > 0 ? 'high' : highlights.change < 0 ? 'low' : 'last'}>{highlights.last}</p>

            <div className={highlights.change > 0 ? 'high' : highlights.change < 0 ? 'low' : 'change'}>
              {highlights.change < 0 ? (
                <svg width="1rem" height="1rem" viewBox="0 0 16 16" fill="red" xmlns="http://www.w3.org/2000/svg">
                  {/* SVG path for downward arrow */}
                </svg>
              ) : (
                <svg width="1em" height="1em" viewBox="0 0 16 16" fill="green" xmlns="http://www.w3.org/2000/svg">
                  {/* SVG path for upward arrow */}
                </svg>
              )}
              {highlights.change ? highlights.change.toFixed(2) : "NA"} <span>({highlights.changePercent ? highlights.changePercent.toFixed(2) : "NA"}%)</span>
            </div>
            <p className='text-muted mt-2'>{highlights.currentTimestamp}</p>
          </div >
        </div >

        {/* Market status */}
        < div >
          {
            highlights.marketStatus ? (
              <p className='m_open market'>
                Market is Open
              </p>
            ) : (
              <p className='m_close market'>
                Market Closed on {highlights.lastTimestamp}
              </p>
            )
          }
        </div >


      </>
      );
};

      export default HighlightBanner;
