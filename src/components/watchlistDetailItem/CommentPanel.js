import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import StarRatings from "react-star-ratings";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import HistoryPanelItem from "./HistoryPanelItem.js";
import { findCommentsByWatchlist, createComment } from "../../services/comment-service.js";
import { AiFillCheckCircle, AiOutlineClear } from "react-icons/ai";
import profileAvatar from "../../images/profile-avatar.jpeg";

const CommentPanel = ({ pRating, setWatchlist }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [submit, setSubmit] = useState(false);
  const [RatingError, setRatingError] = useState(false);
  const [contentEmptyHint, setContentEmptyHint] = useState(false);
  const { wid } = useParams();
  const navigate = useNavigate();
  const handleClear = () => {
    setContent("");
    setRating(0);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setRatingError(true);
      return;
    }
    if (content === "") {
      setContentEmptyHint(true);
      return;
    }
    setRatingError(false);
    setContentEmptyHint(false);
    const newAvgRating =
      ((pRating * comments.length + rating) * 1.0) / (comments.length + 1);

    setSubmit(true);
    setTimeout(() => {
      setSubmit(false);
    }, 2000);
    setWatchlist((p) => ({
      ...p,
      rating: newAvgRating,
    }));

    const newComment = {
      watchlist: wid,
      user: currentUser._id,
      content: content,
      rating: rating,
      newAvgRating: newAvgRating,
    };
    createComment(newComment);
    const newCommentDetails = {
      ...newComment,
      user: {
        _id: currentUser._id,
        userName: currentUser.userName,
        img: currentUser.img,
        isVip: currentUser.isVip,
      },
    };
    setComments([newCommentDetails, ...comments]);
  };

  const fetchComments = async (wid) => {
    const data = await findCommentsByWatchlist(wid);
    setComments(data);
  };
  useEffect(() => {
    fetchComments(wid);
  }, [wid]);

  return (
    <div className={`m-0 p-0`}>
      {currentUser && (
        <div className={`row w-100 m-0 mt-2`}>
          <div className="col-2">
            <img
              src={profileAvatar}
              width={50}
              height={50}
              className={`rounded-circle`}
            />
          </div>
          <div className={`col mt-2 d-flex align-items-center`}>
            <h5 className={` d-inline me-3 mb-0`}>Rating</h5>
            <StarRatings className="bg-warning"
              rating={rating}
              starRatedColor="yellow"
              starEmptyColor="white" 
              starHoverColor="yellow"
              changeRating={(newRating) => setRating(newRating)}
              starDimension="20px"
              starSpacing="3px"
              numberOfStars={5}
              name="rating"
            />
          </div>
        </div>
      )}

      <div className={`row w-100 p-0 m-0 mt-2`}>
        <div className="col p-2">
          {currentUser ? (
            <div>
              <label htmlFor="comment" className={`text-black`}>
                Comment
              </label>
              <textarea
                id="comment"
                type="text"
                required
                value={content}
                rows={2}
                placeholder="Leave your comments..."
                className="form-control border-0 comment-panel-div"
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          ) : (
            <div>
              <label htmlFor="comment" className={`h4`}>
                Comment
              </label>
              <textarea
                id="comment"
                type="text"
                readOnly
                rows={2}
                placeholder="Login in to edit your comments..."
                className="form-control comment-panel-div"
              ></textarea>
            </div>
          )}

          {currentUser && (
            <div className={`mt-1 row w-100`}>
              {RatingError && (
                <p className={`mb-0 text-primary`}>
                  Please rate this WatchList before submit!
                </p>
              )}
              {contentEmptyHint && (
                <p className={`mb-0 text-primary`}>
                  Please input your comment before submit!
                </p>
              )}
              <div
                className={`col d-flex align-items-center justify-content-center p-0`}
              >
                {submit && (
                  <>
                    <BsFillCheckCircleFill
                      size={25}
                      className={`text-primary`}
                    />
                    <h5 className={`fw-bold text-primary ms-1 p-0 mb-0`}>
                      Submitted
                    </h5>
                  </>
                )}
              </div>
              <div className={`col p-0`}>
                <button
                  className="rounded-pill btn btn-danger float-end mt-1 ps-3 pe-3 fw-bold d-none d-xl-block"
                  onClick={() => handleClear()}
                >
                  Clear
                </button>
                <AiOutlineClear
                  size={30}
                  className={`float-end mt-1 fw-bold d-block d-xl-none text-danger`}
                  onClick={() => handleClear()}
                />
                <button
                  className="rounded-pill btn btn-primary float-end mt-1 ps-3 pe-3 fw-bold d-none d-xl-block"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
                <AiFillCheckCircle
                  size={30}
                  className={`float-end mt-1 fw-bold d-block d-xl-none text-primary`}
                  onClick={() => handleSubmit()}
                />
              </div>
            </div>
          )}
          {!currentUser && (
            <div className={`mt-1 row w-100`}>
              <div
                className={`col d-flex align-items-center justify-content-center`}
              ></div>
              <div className={`col p-0`}>
                <button
                  className="rounded-pill btn btn-danger float-end mt-1 ps-3 pe-3 fw-bold"
                  onClick={() => navigate("/login")}
                >
                  Login To Comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`row w-100  m-0 p-0 mt-2`}>
        <div className={`h4 history-commen-title ps-1`}>
          History comments
        </div>

        <div className={`history-comment bg-white pt-2 ps-1`}>
          {comments.map((item, idx) => (
            <HistoryPanelItem key={item._id} comment={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentPanel;
