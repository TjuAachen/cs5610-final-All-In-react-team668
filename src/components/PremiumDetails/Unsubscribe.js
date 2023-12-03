import React from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserNonAdminThunk } from "../../services/users/users-thunks";

const Unsubscribe = ({ setPlan, setPayment }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleUnsubscribe = () => {
    setPlan(false);
    setPayment(false);
    dispatch(updateUserNonAdminThunk({ ...currentUser, isVip: false }));
  };

  return (
    <div className="unsubscribe-div">
      <div className="unsubscribe-card">
        <h1>Pro Subscription</h1>
        <p>Unlimited watchlist numbers </p>
        <p>Priority customer service</p>
        <button className="btn-unsubscribe" onClick={handleUnsubscribe}>
          CANCEL SUBSCRIPTION
        </button>
      </div>
    </div>
  );
};

export default Unsubscribe;
