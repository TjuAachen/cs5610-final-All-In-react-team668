import React from "react";
import Premium from "./Premium";
import Follow from "../Follow";

const ProfileRight = ({ isSelf }) => {
  return (
    <>
      <Follow />
      {isSelf && <Premium />}

    </>
  );
};

export default ProfileRight;