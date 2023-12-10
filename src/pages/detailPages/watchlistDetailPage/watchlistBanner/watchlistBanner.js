import React, { useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateWatchlist as updateWatchlistService } from "../../services/watchlist-service.js";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import coverImg from "../../../images/stock-cover.jpg";

const defaultFile = "/images/watchlist-cover.jpeg";
const WatchlistBanner = ({ watchlistUser, watchlist, setWatchlist }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [watchlistName, setWatchlistName] = useState(watchlist.watchlistName);
  const [watchlistDesc, setWatchlistDesc] = useState(watchlist.description);
  const [edit, setEdit] = useState(false);
  const [url, setUrl] = useState(watchlist.img);
  const [avatarFile, setAvatarFile] = useState(null);

  const dispatch = useDispatch();


  const handleBackClick = () => {
    navigate(-1); // Navigate back on arrow click
  };
  return (
    <div className={`position-relative`}>
      <BsFillArrowLeftCircleFill
        onClick={handleBackClick}
        size={30}
        className={`position-absolute text-warning arrow-back-icon`}
      />
      <img
        src={coverImg}
        height={`250px`}
        width={`100%`}
      />
      <img
        src={coverImg}
        className={`rounded-3 position-absolute watchlist-cover-pos`}
        width={`200px`}
        height={`200px`}
  />
      <h5
        className={`position-absolute watchlist-cover-name-pos me-3 d-none d-xl-flex`}
        onClick={() =>
          navigate(
            `/profile${
              !currentUser || watchlist.user !== currentUser._id
                ? `/${watchlist.user}`
                : ``
            }`
          )
        }
      >
        {watchlistUser.name}
      </h5>

      {!edit && (
        <>
          <h1
            className={`text-white position-absolute watchlist-cover-text-pos-non-edit d-none d-md-block`}
          >
            {watchlistName}
          </h1>

          {currentUser && watchlist.user === currentUser._id && (
            <button
              className={`btn btn-dark border border-warning position-absolute watchlist-edit-pos rounded-pill ps-3 pe-3 d-none d-lg-block`}
              onClick={() => handleEdit()}
            >
              Edit
            </button>
          )}

          <h4
            className={`text-muted position-absolute watchlist-desc-pos-non-edit d-none d-lg-block`}
          >
            {watchlistDesc === "" || watchlistDesc === undefined
              ? "Add your description..."
              : watchlistDesc}
          </h4>
        </>
      )}

      {edit && (
        <>
          <div className={`position-absolute watchlist-cover-text-pos`}>
            <label htmlFor="watchlist-cover-text" className={`text-warning`}>
              Watchlist Name
            </label>
            <input
              className="form-control control-input me-2 watchlist-name-input d-none d-lg-block"
              id="watchlist-cover-text"
              name="watchlist-cover-text"
              type="text"
              placeholder="Type the watchlist name..."
              value={watchlistName}
              size={1}
              onChange={(e) => handleNameChange(e)}
            />
          </div>

          <button
            className={`btn btn-dark border border-danger position-absolute watchlist-confirm-pos rounded-pill ps-3 pe-3 d-none d-lg-block`}
            onClick={() => handleConfirm()}
          >
            Confirm
          </button>

          <button
            className={`btn btn-dark border border-warning position-absolute watchlist-cancel-pos rounded-pill ps-3 pe-3 d-none d-lg-block`}
            onClick={() => handleCancel()}
          >
            Cancel
          </button>

          <div className={`position-absolute watchlist-desc-pos`}>
            <label htmlFor="watchlist-cover-desc" className={`text-warning`}>
              Description
            </label>
            <textarea
              className="form-control control-input me-2 watchlist-desc-input d-none d-lg-block"
              id="watchlist-cover-desc"
              name="watchlist-cover-desc"
              type="text"
              placeholder="Add your description..."
              value={watchlistDesc}
              rows={2}
              onChange={(e) => handleDescChange(e)}
            />
          </div>

        </>
      )}
    </div>
  );
};

export default WatchlistBanner;