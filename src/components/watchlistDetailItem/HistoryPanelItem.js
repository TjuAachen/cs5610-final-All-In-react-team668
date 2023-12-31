import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import profileAvatar from "../../images/profile-avatar.jpeg";
import PremiumUserAvatar from "../../images/user-crown.png"

const HistoryPanelItem = ({ comment }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className={`row w-100 p-0 m-0 pt-1`}>
      <div
        className={`col-2 p-0 comment-hover-color ms-2`}
        onClick={() =>
          navigate(
            `/profile${
              !currentUser || comment.user._id !== currentUser._id
                ? `/${comment.user._id}`
                : ``
            }`
          )
        }
      >
        <div className={`d-flex justify-content-start`}>
          <img
            src={profileAvatar}
            width={40}
            height={40}
            className={`rounded-circle`}
          />
        </div>
        <div className={`d-flex justify-content-center`}>
          <p className={`mb-0 ms-2 comment-user-name-div text-nowarp`}>
            {comment.user.userName}
          </p>
        </div>
      </div>
      <div className={`col p-0 ms-2 me-0`}>
        {showAll && <div>{comment.content}</div>}
        {!showAll && (
          <div
            className={`comment-content ${
              comment.user.isVip ? `text-warning` : `text-black`
            }`}
          >
            {comment.content}
          </div>
        )}
      </div>

      <div className={`col-2 d-flex align-items-start pe-0`}>
        {comment.rating} <AiFillStar className={`text-warning mt-1 ms-1`} />
      </div>
      <hr className={`mt-2`} />
    </div>
  );
};

export default HistoryPanelItem;