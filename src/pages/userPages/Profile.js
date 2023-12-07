import React, { useEffect, useState } from "react";
import ProfileMiddle from "../../components/Profile/ProfileMiddle";
import ProfileRight from "../../components/Profile/ProfileRight";
import "./Profile_style.css";

import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { findProfileThunk } from "../../services/trunks/profile-thunk";
import { findCurrentUserThunk } from "../../services/users/users-thunks";
// import { findCurrentUserSongsThunk } from "../services/thunks/like-thunk";

const Profile = () => {
  const { uid } = useParams();
  console.log("uid", uid);
  const { currentUser } = useSelector((state) => state.user);
  console.log("currentUser", currentUser);
  const loginUser = JSON.parse(localStorage.getItem("currentUser"));

  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

  const fetchProfile = async (uid) => {
    const response = await dispatch(
      findProfileThunk(uid ? uid : loginUser._id)
    );
    setProfile(response.payload);
  };

  useEffect(() => {
    if (!loginUser && !uid) {
      setProfile({});
      return;
    }
    // fetch current login user
    if (loginUser) {
      dispatch(findCurrentUserThunk());
    }
    // fetch current profile
    fetchProfile(uid);
    // dispatch(findProfileSongsThunk(uid ? uid : loginUser._id));
    // dispatch(findCurrentUserSongsThunk());
  }, [uid]);

  return (
    <div className="profile-page">
      <div className="profile-content">
          {profile && (<ProfileMiddle
          className="profile-middle"
            isSelf={uid ? false : true}
            isLogin={loginUser ? true : false}
          />)}
          <ProfileRight 
          className="profile-right"
          isSelf={uid ? false : true} />
      </div>
    </div>
  );
};

export default Profile;