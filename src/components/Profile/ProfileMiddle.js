import React, { useState, useEffect } from "react";
import ProfileBanner from "./ProfileBanner";
import WatchList from "../WatchList";
import Comment from "../Comment";
// import LikeSongs from "../LikeSongs";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import {
  deleteComment as deleteCommentService,
  findComments as findCommentService,
} from "../../services/comment-service";

const ProfileMiddle = ({ isSelf, isLogin }) => {
  const { uid } = useParams();
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  //console.log("debug comments in profile", comments);
  const findComments = async (id) => {
    const data = await findCommentService(id);
    setComments(data);
  };

  useEffect(() => {
    if (!isSelf || !isLogin || !currentUser) return;
    findComments(currentUser._id);
  }, [uid]);

  return (
    <div className="d-flex flex-column">
      <ProfileBanner />
      {(isLogin || !isSelf) && (
        <WatchList isSelf={isSelf} setComments={setComments} />
      )}
      {/* {(isLogin || !isSelf) && <LikeSongs />} */}
      {isSelf && isLogin && (
        <Comment comments={comments} setComments={setComments} />
      )}
    </div>
  );
};

export default ProfileMiddle;