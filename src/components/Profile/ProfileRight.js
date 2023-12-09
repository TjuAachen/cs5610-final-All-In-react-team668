import React from "react";
import Premium from "./Premium";
import Follow from "../Follow";

const ProfileRight = ({ isSelf }) => {
  return (
    <>
      {isSelf && <Premium />}
      <Follow />
    </>
  );
};

export default ProfileRight;