import React from "react";
import { MdRemoveCircle } from "react-icons/md";
import "./index.css";
import imageSource from "../../images/stock-cover.jpg"

const WatchListItem = ({ watchlist, handleClick, deleteWatchlist, isSelf }) => {
  return (
    <div className={`ms-1 me-2 position-relative watchlist-item-div`}>
      <img
        src={imageSource}
        className={`rounded-3`}
        width={`180px`}
        height={`100px`}
        onClick={() => handleClick(watchlist._id)}
      />
      {isSelf && !watchlist.isDefault && (
        <MdRemoveCircle
          size={25}
          className={`position-absolute remove-icon p-0`}
          onClick={() => deleteWatchlist(watchlist)}
        />
      )}

      <p className={`text-black mt-2 mb-0 watchlist-name text-nowrap`}>
        {watchlist.watchListName}
      </p>
    </div>
  );
};

export default WatchListItem;