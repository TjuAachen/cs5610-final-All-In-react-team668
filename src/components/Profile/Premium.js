import React from "react";
import "./index.css";
import { FaArrowCircleRight } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Premium = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log("in premium", currentUser);
  return (
    <div className="row-container">
      <FaArrowCircleRight
        className="label-text-color col-2 ps-0 pe-0"
        size={35}
        onClick={() => navigate("/premium")}
      />

      <div className="label-text-color">
          {currentUser && currentUser.isVip
            ? `Change your Billing Plan`
            : `Unlock Premium Features`}

      </div>
    </div>
  );
};

export default Premium;