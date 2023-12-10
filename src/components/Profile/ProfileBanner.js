import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import { updateUserNonAdminThunk } from "../../services/users/users-thunks";
import { findFolloweeIds } from "../../services/follow-service";
import { updateFolloweeThunk } from "../../services/thunks/followee-thunk";
import { updateProfile } from "../../reducers/profile-reducer";
import { MdAddAPhoto } from "react-icons/md";
import profileAvatar from "../../images/profile-avatar.jpeg";
// import FollowUserGuest from "./FollowUserGuest";
// import {
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
//   deleteObject,
// } from "firebase/storage";
// import storage, { removeImageFromFirebase } from "../../services/firebase.js";

// const defaultFile = "/images/profile-avatar.jpeg";

const ProfileBanner = () => {
  const { uid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasFollow, setHasFollow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  let { currentProfile } = useSelector((state) => state.profile);
  console.log("currentProfile", currentProfile);
  const { currentUser } = useSelector((state) => state.user);
  if (!currentProfile) {
    currentProfile = { email: null, img: null };
  }
  const [email, setEmail] = useState(currentUser ? currentUser.email : null);
  const [phone, setPhone] = useState(
    currentUser ? currentUser.cellphone : null
  );
  const [url, setUrl] = useState(currentUser ? currentUser.img : profileAvatar);

  const [avatarFile, setAvatarFile] = useState(null);

  const checkIsFollow = async (loginUser, targetUser) => {
    const res = await findFolloweeIds(loginUser);
    if (res.length === 0) return;
    const followeeList = res[0].followeeList;
    const index = followeeList.indexOf(targetUser);
    setHasFollow(index === -1 ? false : true);
  };

  const handleFollow = () => {
    if (!currentUser) {
      setShow(!show);
      return;
    }
    setHasFollow(!hasFollow);
    dispatch(
      updateFolloweeThunk({
        user: currentUser._id,
        followId: uid,
      })
    );
  };

  //   const handleUploadFirebase = (file) => {
  //     if (!file) {
  //       return;
  //     }
  //     removeImageFromFirebase(currentProfile.img, defaultFile);
  //     const storageRef = ref(
  //       storage,
  //       `/files/${file.name + currentUser._id + "profile"}`
  //     );
  //     // progress can be paused and resumed. It also exposes progress updates.
  //     // Receives the storage reference and the file to upload.
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const percent = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //       },
  //       (err) => console.log(err),
  //       () => {
  //         // download url
  //         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //           setUrl(url);
  //           dispatch(
  //             updateUserNonAdminThunk({
  //               ...currentUser,
  //               _id: currentUser._id,
  //               email: email === "" ? currentUser.email : email,
  //               cellphone: phone === "" ? currentUser.cellphone : phone,
  //               img: url,
  //             })
  //           );
  //         });
  //       }
  //     );
  //   };

  const handleSubmit = () => {
    let newEmail = email;
    let newPhone = phone;
    if (email === "") {
      setEmail(currentUser.email);
      newEmail = currentUser.email;
    }
    if (phone === "") {
      setPhone(currentUser.cellphone);
      newPhone = currentUser.cellphone;
    }
    const newProfile = {
      _id: currentUser._id,
      ...currentUser,
      email: newEmail,
      cellphone: newPhone,
      img: url,
    };
    dispatch(updateProfile(newProfile));
    // update profile into firebase
    // if (url !== currentProfile.img) {
    //   handleUploadFirebase(avatarFile);
    // } else {
    //   dispatch(updateUserNonAdminThunk(newProfile));
    // }

    setIsEdit(false);
  };

  const hiddenFileInput = React.useRef(null);

  const handleImgClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleImgChange = (event) => {
    event.preventDefault();
    if (event.target.files.length === 0) {
      return;
    }
    const newUrl = URL.createObjectURL(event.target.files[0]);
    setUrl(newUrl);
    setAvatarFile(event.target.files[0]);
  };

  const handleCancel = () => {
    setEmail(currentProfile.email);
    setIsEdit(false);
    setUrl(currentProfile.img);
    setPhone(currentProfile.cellphone);
  };

  useEffect(() => {
    if (!currentUser && !uid) return;
    checkIsFollow(
      currentUser ? currentUser._id : null,
      uid ? uid : currentUser._id
    );
  }, [uid]);

  return (
    <div className="banner-container">
      {currentProfile && (
        <div className="profile-section">
          {(uid || currentUser) && (
            <>
              <img
                src={profileAvatar}
                alt="Profile Avatar"
                className="avatar"
              />
              <h5 className="username">{currentProfile.userName}</h5>
            </>
          )}

          {currentUser && !uid && (
            <>
              {isEdit ? (
                <div className="edit-profile">
                  <div className="input-group email-input">
                    <label htmlFor="profile-email" className="label-email">
                      Email
                    </label>
                    <input
                      className="form-control"
                      id="profile-email"
                      name="email"
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-group phone-input">
                    <label htmlFor="profile-phone" className="label-phone">
                      Phone
                    </label>
                    <input
                      className="form-control"
                      id="profile-phone"
                      name="phone"
                      type="text"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="avatar-cover"></div>
                  <MdAddAPhoto
                    className="avatar-icon"
                    size={30}
                    onClick={handleImgClick}
                  />
                  <input
                    id="upload-banner"
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleImgChange}
                    className="file-upload"
                  />
                  <button
                    className="btn btn-save fw-bold"
                    onClick={() => handleSubmit()}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-cancel fw-bold"
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="view-profile">
                  <p className="email-text">{currentProfile.email}</p>
                  <p className="phone-text">{currentProfile.cellphone}</p>
                  <button
                    className="btn btn-edit fw-bold"
                    onClick={() => setIsEdit(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </>
          )}

          {/* {!uid && !currentUser && (
            <div className={``}>
              <FollowUserGuest />
            </div>
          )} */}

          {uid && !hasFollow && (
            <div className={``}>
              <button
                className="btn btn-follow"
                onClick={() => handleFollow()}
              >
                + Follow
              </button>
              {show && (
                <div
                  className={`profile-banner-toolkit-div position-absolute rounded-3`}
                >
                  <h5 className={`fw-bold m-2`}>Explore friends!</h5>
                  <div
                    className={`mt-3 mb-1 d-flex justify-content-center align-items-center`}
                  >
                    <button
                      className={`btn btn-light p-1`}
                      onClick={() => navigate("/login")}
                    >
                      Log in
                    </button>
                    <p
                      className={`text-muted mb-0 ms-3 not-now`}
                      onClick={() => setShow(false)}
                    >
                      Not Now
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          {uid && hasFollow && (
            <button
              className="btn btn-unfollow"
              onClick={() => handleFollow()}
            >
              + UnFollow
            </button>
          )}
        </div>
        // </div>
      )}

    </div>
  );
};

export default ProfileBanner;
