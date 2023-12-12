import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import WatchlistDetailItem from "../../../components/watchlistDetailItem/index.js";
import CommentPanel from "../../../components/watchlistDetailItem/CommentPanel.js";
//import CommentPanel from "./CommentPanel";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { deleteAddedStock, addStock } from "../../../reducers/added-stock-count-reducer.js";
import "./watchlistDetail.css";

import {
  deleteStockWatchlist,
  createStockWatchlist,
  findStockNumberByUserId,
  findStocksByWatchlistId,
  updateStockWatchlist,
} from "../../../services/stockWatchlist-service.js";
import { findWatchlists } from "../../../services/watchlist-service.js";
import "./watchlistDetail.css";
import { STOCK_LIMITATION_FOR_REGULAR_USER } from "../../../constants/Constants.js";
import { findUser } from "../../../services/user-service.js";
import WatchlistBanner from "./watchlistBanner/watchlistBanner.js";
import { findCurrentUserStocksThunk } from "../../../services/thunks/add-stock-thunk.js";

// TODO : commentPanel
const WatchListDetail = () => {
  // addedStocks of current login user
  const {wid} = useParams();
  console.log(localStorage.getItem(wid), "debug watchlist detail")
  const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem(wid)));
  
  const { addedStocks } = useSelector((state) => state.addStock);
  const [stocks, setStocks] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const loginId = currentUser ? currentUser._id : null;
  const [watchlistsOption, setWatchlistsOption] = useState(null);
  const [stocksNumber, setStocksNumber] = useState(null);
  const [watchlistAuthor, setWatchlistAuthor] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(stocks,addedStocks, "debug watchlist addedStocks beginning")
  let showDelete;
  if (!currentUser || currentUser._id !== (watchlist? watchlist.user : "Unknown")) {
    showDelete = false;
  } else {
    showDelete = true;
  }

  //console.log(stocks, addedStocks, "debug watchlist addedStocks")

  const handleUnLikeClick = async (stock) => {
    if (!currentUser) return;
    // update state in addedStock reducer
    dispatch(deleteAddedStock(stock.ticker));
    if (currentUser._id === (watchlist? watchlist.user : "Unknown")) {
      // remove the stock from watchlist in UI
      setStocks((prev) =>
        prev.filter((s) => s.ticker !== stock.ticker)
      );
    }

    deleteStockWatchlist(currentUser._id, stock.ticker);
  };

  const handleAddToWatchlist = async (wid, stock, setLike) => {
    if (!currentUser) return;
   // console.log("stockNumber", addedStocks.length);
    console.log(
      "STOCK_LIMITATION_FOR_REGULAR_USE",
      STOCK_LIMITATION_FOR_REGULAR_USER
    );
    if ( 
      !currentUser.isVip &&
      addedStocks.length >= STOCK_LIMITATION_FOR_REGULAR_USER
    ) {
      // console.log("here");
      setShowUpgrade(true);
      return;
    }
    setLike(true);
    // update state in addedStock reducer
    dispatch(addStock(stock));
    createStockWatchlist(currentUser._id, stock.ticker, wid);
  };

  const handleMoveWatchlist = async (wid, stock) => {
    // remove stock from current watchlist
    console.log(stocks, stock,addedStocks, "debug watchlist addedStocks before")
    setStocks((prev) => prev.filter((s) => s.ticker !== stock.ticker));
    //console.log(stocks, stock,addedStocks, "debug watchlist addedStocks after")
    await updateStockWatchlist({
      userId: currentUser._id,
      ticker: stock.ticker,
      watchlistId: wid,
    });
  };

  const fetchLoginUserWatchlists = async (uid) => {
    let myWatchlists = await findWatchlists(uid);
    myWatchlists = myWatchlists.filter((p) => p._id !== (watchlist? watchlist._id : "Unknown"));
    setWatchlistsOption(myWatchlists);
    // find how many stocks current user likes
    const stockNumbersOfLoginUser = await findStockNumberByUserId(uid);
    setStocksNumber(stockNumbersOfLoginUser);
  };

  const fetchUserInfo = async (uid) => {
    let author = await findUser(uid);
   // console.log(author, "debug author in watchlist detail")
    setWatchlistAuthor(author)
  }

  const fetchStocksInWatchlist = async (wid) => {
    let tempStocks = await findStocksByWatchlistId(wid);
   // console.log(tempStocks, "debug watchlist detail")
    setStocks(tempStocks);
  };
  useEffect(() => {
    // fetch all stocks in current watchlist
    fetchStocksInWatchlist(wid);
    if (!watchlist) {
      return
    }
    if (watchlist.user._id) {
    fetchUserInfo(watchlist.user._id)}
    else if (watchlist){
      fetchUserInfo(watchlist.user)
    }
  }, [wid]);

  useEffect(() => {
    dispatch(findCurrentUserStocksThunk());
  }, [])

  useEffect(() => {
    if (currentUser) {
      fetchLoginUserWatchlists(currentUser._id);
    }
  }, [loginId]);
  return (
    <>
      <WatchlistBanner watchlistUser={watchlistAuthor} watchlist={watchlist}/>
      {stocks && (
        <div className={`mt-3 ms-3 me-3 position-relative`} style={{width: "100%"}}>
          <h4
            className={` position-absolute watchlist-rating d-none d-xl-flex`}
          >
            {Math.round(watchlist? watchlist.rating * 10 : 0) / 10}{" "}
            <AiFillStar size={30} className={`text-warning`} />
          </h4>
          <h4
            className={` position-absolute stock-num-pos d-none d-xl-flex`}
          >
            {stocks.length} stocks
          </h4>
          {showUpgrade && (
            <>
              <div
                className={`col  position-absolute upgrade-in-watchlist-div p-3 rounded-3 bg-primary fw-bold`}
              >
                Enjoy your Premium Journey!
                <div className={` upgrade-text`}>
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
          <div className={`row`} style={{width: "100%"}}>
            <div className={`col-7`}>
              <div className={`row`}>
                <div className={`col-2`}>
                  <h5 className={`fw-fold `}>Ticker</h5>
                </div>
                <div
                  className={`col-2 text-muted ps-0 d-none d-xl-flex`}
                >
                  <h5 className={`fw-fold  `}>Name</h5>
                </div>
                <div className={`col-2 text-muted ps-0 d-none d-xl-flex`}>
                  <h5 className={`fw-fold `}>Close Price</h5>
                </div>
                <div className={`col-2 text-muted ps-0 d-none d-xl-flex`}>
                  <h5 className={`fw-fold `}>Date</h5>
                </div>
               
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
                      key={item._id + wid}
                      stock={item.stockId}
                      isLike={
                        addedStocks.filter(
                          (val, id) => val === item.stockId.ticker
                        ).length > 0
                      }
                      isSelf={currentUser && currentUser._id === watchlist? watchlist.user : "unknown"}
                      watchlistsOption={watchlistsOption}
                      handleUnLikeClick={handleUnLikeClick}
                      handleAddToWatchlist={handleAddToWatchlist}
                      handleMoveWatchlist={handleMoveWatchlist}
                    />
                  ))}
              </div>
            </div>
            <div
              className={`col comment-panel-container me-3 rounded-3 p-0 `}
            >
              <CommentPanel
                pRating={watchlist? watchlist.rating : 0}
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

