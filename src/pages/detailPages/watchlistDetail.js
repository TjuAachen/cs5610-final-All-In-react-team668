import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import WatchlistDetailItem from "../../components/watchlistDetailItem";
import CommentPanel from "./CommentPanel";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteAddedStock, addStock } from "../../reducers/added-stock-count-reducer.js";

import {
  deleteStockWatchlist,
  createStockWatchlist,
  findStockNumberByUserId,
  findStocksByWatchlistId,
  updateStockWatchlist,
} from "../../services/stockWatchlist-service.js";
import { findWatchlists } from "../../services/watchlist-service.js";
import "./index.css";
import { STOCK_LIMITATION_FOR_REGULAR_USER } from "../../constants/Constants.js";

const WatchListDetail = ({ watchlist, setWatchlist }) => {
  // addedStocks of current login user
  const { addedStocks } = useSelector((state) => state.addedStock);
  const [stocks, setStocks] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const loginId = currentUser ? currentUser._id : null;
  const [watchlistsOption, setWatchlistsOption] = useState(null);
  const [stocksNumber, setStocksNumber] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let showDelete;
  if (!currentUser || currentUser._id !== watchlist.user) {
    showDelete = false;
  } else {
    showDelete = true;
  }

  const handleUnLikeClick = async (stock) => {
    if (!currentUser) return;
    // update state in addedStock reducer
    dispatch(deleteAddedStock(stock.ticker));
    if (currentUser._id === watchlist.user) {
      // remove the stock from watchlist in UI
      setStocks((prev) =>
        prev.filter((s) => s.stockId.ticker !== stock.ticker)
      );
    }

    deleteStockWatchlist(currentUser._id, stock._id);
  };

  const handleAddToWatchlist = async (wid, stockIdObj, setLike) => {
    if (!currentUser) return;
    const { _id } = stockIdObj;
    console.log("stockNumber", addedStocks.length);
    console.log(
      "STOCK_LIMITATION_FOR_REGULAR_USE",
      STOCK_LIMITATION_FOR_REGULAR_USER
    );
    if (
      !currentUser.isVip &&
      addedStocks.length >= STOCK_LIMITATION_FOR_REGULAR_USER
    ) {
      console.log("here");
      setShowUpgrade(true);
      return;
    }
    setLike(true);
    // update state in addedStock reducer
    dispatch(addStock(stockIdObj));
    createStockWatchlist(currentUser._id, _id, wid);
  };

  const handleMoveWatchlist = async (wid, ticker) => {
    // remove stock from current watchlist
    setStocks((prev) => prev.filter((s) => s.ticker !== ticker));
    await updateStockWatchlist({
      userId: currentUser._id,
      ticker: ticker,
      watchlistId: wid,
    });
  };

  const fetchLoginUserWatchlists = async (uid) => {
    let myWatchlists = await findWatchlists(uid);
    myWatchlists = myWatchlists.filter((p) => p._id !== watchlist._id);
    setWatchlistsOption(myWatchlists);
    // find how many stocks current user likes
    const stockNumbersOfLoginUser = await findStockNumberByUserId(uid);
    setStocksNumber(stockNumbersOfLoginUser);
  };

  const fetchStocksInWatchlist = async (wid) => {
    const stocks = await findStocksByWatchlistId(wid);
    setStocks(stocks);
  };
  useEffect(() => {
    // fetch all stocks in current watchlist
    fetchStocksInWatchlist([watchlist._id]);
  }, [watchlist._id]);

  useEffect(() => {
    if (currentUser) {
      fetchLoginUserWatchlists(currentUser._id);
    }
  }, [loginId]);
  return (
    <>
      {stocks && (
        <div className={`mt-3 ms-3 me-3 position-relative`}>
          <h4
            className={`text-white position-absolute watchlist-rating d-none d-xl-flex`}
          >
            {Math.round(watchlist.rating * 10) / 10}{" "}
            <AiFillStar size={30} className={`text-warning`} />
          </h4>
          <h4
            className={`text-white position-absolute stock-num-pos d-none d-xl-flex`}
          >
            {stocks.length} stocks
          </h4>
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
          )}
          <div className={`row`}>
            <div className={`col`}>
              <div className={`row`}>
                <div className={`col-2`}>
                  <h5 className={`fw-fold text-white`}>Ticker</h5>
                </div>
                <div
                  className={`${
                    currentUser && currentUser._id === watchlist.user
                      ? `col-2`
                      : `col-3`
                  } text-muted ps-0`}
                >
                  <h5 className={`fw-fold text-white`}>Name</h5>
                </div>
                <div className={`col-2 text-muted ps-0 d-none d-xl-flex`}>
                <h5 className={`fw-fold text-white`}>Close Price</h5>
                </div>
                <div className={`col-2 text-muted ps-0 d-none d-xl-flex`}>
                <h5 className={`fw-fold text-white`}>Date</h5>
                </div>
                <div className={`col`}></div>
              </div>

              <div className={`stock-container`}>
                {stocks.length === 0 && (
                  <div
                    className={`text-muted empty-stock-cotainer d-flex align-items-center justify-content-center`}
                  >
                    <h4 className={`p-0 m-0`}>
                      <a href={`/search`} className={`text-no-decoration`}>
                        Search
                      </a>{" "}
                      stocks and add to your watchlist
                    </h4>
                  </div>
                )}

                {(watchlistsOption || !currentUser) &&
                  ((currentUser && stocksNumber !== null) || !currentUser) &&
                  stocks.map((item, idx) => (
                    <WatchlistDetailItem
                      key={item._id + watchlist._id}
                      stock={item}
                      isLike={
                        addedStocks.filter(
                          (val, id) => val.ticker === item.ticker
                        ).length > 0
                      }
                      isSelf={currentUser && currentUser._id === watchlist.user}
                      watchlistsOption={watchlistsOption}
                      handleUnLikeClick={handleUnLikeClick}
                      handleAddToWatchlist={handleAddToWatchlist}
                      handleMoveWatchlist={handleMoveWatchlist}
                    />
                  ))}
              </div>
            </div>
            <div
              className={`col-4 comment-panel-container me-3 rounded-3 p-0 d-none d-lg-block`}
            >
              <CommentPanel
                pRating={watchlist.rating}
                setWatchlist={setWatchlist}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WatchListDetail;