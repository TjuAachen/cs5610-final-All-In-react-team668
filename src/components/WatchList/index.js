import React, { useState, useEffect } from "react";
import "./index.css";
import WatchListItem from "./WatchListItem";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { BiAddToQueue } from "react-icons/bi";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { findWatchlists as findWatchlistService, deleteWatchlist, createWatchlist } from "../../services/watchlist-service";
import { updateUserNonAdminThunk } from "../../services/users/users-thunks";
import { updateAddedStock } from "../../reducers/added-stock-count-reducer";

const WatchList = ({ isSelf, setComments }) => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [watchlists, setWatchlists] = useState([]);
  const [watchlistPerPage, setWatchlistPerPage] = useState(
    window.innerWidth > 1630
      ? 4
      : window.innerWidth > 750
      ? 3
      : window.innerWidth > 559
      ? 2
      : 1
  );
  const dispatch = useDispatch();
  

  const handleClick = (watchlist_id) => {
    navigate(`/details/watchlist/${watchlist_id}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  const addWatchlist = async () => {
    if (!currentUser.isVip && watchlists.length >= 3) {
      setShow(true);
      return;
    }
    const curWatchlist = watchlists.length;
    const newName = `My Watchlist ${curWatchlist + 1}`;
    const newWatchlist = {
      user: currentUser._id,
      watchListName: newName,
      description: "",
      songs: [],
      isDefault: false,
      img: "/images/watchlist-cover.jpeg",
      rating: 0,
    };
    //console.log("add watch list, waiting createWatchlist")
    const response = await createWatchlist({
      watchlist: newWatchlist,
      cnt: curWatchlist + 1,
    });
    localStorage.setItem(response._id, JSON.stringify(response))
    setWatchlists((prev) => [...prev, response]);
  };

  const findWatchlists = async (uid) => {
    const data = await findWatchlistService(uid);
    setWatchlists(data);
  };

  const deleteWatchlistById = async (watchlist) => {
    setWatchlists((prev) => prev.filter((p) => p._id !== watchlist._id));
    const updatedLikedObj = await deleteWatchlist(watchlist);
    // update likeSong
    dispatch(updateAddedStock(updatedLikedObj));
    // update watchlistcnt of user
    dispatch(
      updateUserNonAdminThunk({
        _id: watchlist.user,
        ...currentUser,
        watchlistsCount: watchlists.length - 1,
      })
    );
    // update comments of user
    console.log("debug commented watchlist", watchlist)
    setComments((prev) => prev.filter((p) => p.watchlist !== watchlist._id));
  };

  useEffect(() => {
    if (!currentUser && !uid) return;
    findWatchlists(uid ? uid : currentUser._id);
    setCurrentPage(1);
    // dispatch(findWatchlistsThunk(uid ? uid : currentUser._id));
  }, [uid]);

  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth > 750 ? 750 : window.innerWidth
  );

  const handleResize = () => {
    // setWindowWidth(window.innerWidth > 750 ? 750 : window.innerWidth);
    setWatchlistPerPage(
      window.innerWidth > 1630
        ? 4
        : window.innerWidth > 750
        ? 3
        : window.innerWidth > 559
        ? 2
        : 1
    );
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // let watchlistPerPage = Math.floor(windowWidth / 250);
  let indexOfLastWatchlist = currentPage * watchlistPerPage;
  let indexOfFirstWatchlist = indexOfLastWatchlist - watchlistPerPage;

  return (
    <div className="watchlist-container">
      <h4 className="watchlist-title">Watchlists</h4>
      {show && (
        <>
            <div className="upgrade-box">
            Enjoy your Premium Journey!
            <div className="upgrade-text">
              Upgrade your account to create more watchlists.
            </div>
            <div className="action-buttons">
              <button
                className="btn-custom not-now-btn"
                onClick={() => setShow(false)}
              >
                Not now
              </button>
              <button
                className="btn-custom not-now-btn"
                onClick={() => {
                  setShow(false);
                  navigate("/premium");
                }}
              >
                Upgrade
              </button>
            </div>
          </div>
        </>
      )}

      {(uid || currentUser) && watchlists && (
        <div className="watchlist-item-box">
          <Stack
            direction="row"
            sx={{ gap: { xl: "10px", lg: "20px", xs: "5px" } }}
            // flexWrap="wrap"
            justifyContent="start"
            className={`ms-0 me-0`}
          >
            {!uid && (
              <div className="add-icon">
                <BiAddToQueue
                  size={50}
                  className={`p-0`}
                  onClick={() => addWatchlist()}
                />
              </div>
            )}
            {watchlists.length > 0 &&
              watchlists
                .slice(indexOfFirstWatchlist, indexOfLastWatchlist)
                .map((item, idx) => (
                  <WatchListItem
                    key={idx + (currentPage - 1) * watchlistPerPage}
                    watchlist={item}
                    handleClick={handleClick}
                    deleteWatchlist={deleteWatchlistById}
                    isSelf={isSelf}
                  />
                ))}
            {watchlists.length === 0 && (
              <div
                className="no-watchlist"
              >
                <h5>No Watchlist yet...</h5>
              </div>
            )}
          </Stack>
          {watchlists.length > 0 && (
            <div className={`mt-3 me-3`}>
              <Pagination
                color="warning"
                shape="rounded"
                defaultPage={1}
                count={Math.ceil(watchlists.length / watchlistPerPage)}
                page={currentPage}
                onChange={paginate}
                size="large"
                className={`pagination-style float-end p-0`}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#333",
                  },
                  "& .Mui-selected": {
                    color: "white",
                  },
                  "& .MuiPaginationItem-root:not(.Mui-selected)": {
                    color: "#ccc",
                  },
                  "& .MuiPaginationItem-icon": {
                    color: "gold",
                  },
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WatchList;