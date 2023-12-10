import React from "react";
import Premium from "./Premium";
import Follow from "../Follow";

const ProfileRight = ({ isSelf }) => {
  return (
    <div className="profile-right-container">
      <Follow />
      {isSelf && <Premium />}
    </div>
  );
};

export default ProfileRight;