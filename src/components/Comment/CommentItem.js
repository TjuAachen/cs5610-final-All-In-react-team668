import React, { useState } from "react";
import { useSelector } from "react-redux";
// import "./index.css";
import { AiOutlineEllipsis } from "react-icons/ai";
import { RiDeleteBinFill } from "react-icons/ri";
import StarRatings from "react-star-ratings";
import profileAvatar from "../../images/profile-avatar.jpeg";
import PremiumUserAvatar from "../../images/user-crown.png"

const CommentItem = ({ comment, handleDelete, visitWatchlist }) => {
  const [showMore, toggleShowMore] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className={`mt-2 border-width position-relative p-0`}>
      <div className={`row me-5`}>
        <div className={`col-1 d-flex justify-content-center ms-3`}>
          <img src={currentUser.isVip ? PremiumUserAvatar : profileAvatar} width={`50px`} height={`50px`} />
        </div>

        <div className={`text-white col`}>
          <div className={`row w-100 d-flex align-items-center`}>
            <div className={`text-black d-inline col-6`}>
              <div
                className={`fw-bold visit-playlist text-nowrap`}
                onClick={() => visitWatchlist(comment.watchlist)}
              >
                {comment.watchListName}
              </div>
              <div className={`text-muted visit-playlist text-nowrap`}>
                {comment.userName}
              </div>
            </div>
            <span className={`d-inline col`}>
              <StarRatings
                rating={comment.rating}
                starRatedColor="orange"
                starDimension="20px"
                starSpacing="5px"
                isSelectable={false}
                numberOfStars={5}
              />
            </span>
          </div>
          {showMore && (
            <>
              <p className={`mb-1`}>{comment.content}</p>
              <div
                className={`float-end text-warning mb-2`}
                onClick={() => toggleShowMore(false)}
              >
                Show Less
              </div>
            </>
          )}
          {!showMore && (
            <>
              <p className={`description text-black mb-1`}>{comment.content}</p>
              <div
                className={`float-end text-warning mb-2`}
                onClick={() => toggleShowMore(true)}
              >
                More
                <AiOutlineEllipsis size={20} className={`p-0`} />
              </div>
            </>
          )}
        </div>
        <hr className={"text-muted"} />
      </div>
      <RiDeleteBinFill
        size={25}
        className="comment-delete-icon"
        onClick={() => handleDelete(comment)}
      />
    </div>
  );
};

export default CommentItem;
