import React, { useState, useEffect } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import PremiumFunction from "./PremiumFunction";
import PlanSelection from "./PlanSelection";
import Unsubscribe from "./Unsubscribe.js";
import { useNavigate } from "react-router";
import Payment from "./Payment";
import { findCurrentUserThunk } from "../../services/users/users-thunks";
// import { findCurrentUserSongsThunk } from "../../services/thunks/like-thunk.js";

const PremiumDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [plan, setPlan] = useState(currentUser && currentUser.isVip);
  const [payment, setPayment] = useState(currentUser && currentUser.isVip);
  const [show, setShow] = useState(false);
  const [number, setNumber] = useState(null);

  useEffect(() => {
    dispatch(findCurrentUserThunk());
    // dispatch(findCurrentUserSongsThunk());
  }, []);
  return (
    <div>
      <div className={`d-flex justify-content-center`}>
        <div className={`row premum-bg rounded-5 m-0`}>
          <div className={`col p-0 d-none d-md-block`}>
            <PremiumFunction />
          </div>
          
          <div
            className={`col-xxl-7 col-xl-6 p-0 col-lg-6 col-md-7 col-sm-10 col-10`}
          >
            {currentUser && !currentUser.isVip && (
              <PlanSelection
                setPlan={setPlan}
                setShow={setShow}
                setNumber={setNumber}
              />
            )}
            {currentUser && currentUser.isVip && (
              <Unsubscribe setPlan={setPlan} setPayment={setPayment} />
            )}
            {!currentUser && (
              <div
                className={`login-hint-div d-flex align-items-center justify-content-center row p-0 m-0 mt-5`}
              >
                <div
                  className={`d-flex justify-content-center mt-3 align-items-center col`}
                >
                  <h3 className={`fw-bold`}>
                    Please login to choose your plan
                  </h3>
                </div>
                <div className={`text-muted d-flex justify-content-center`}>
                  <button
                    className={`btn btn-light fw-bold`}
                    style={{ background: "#5AC53B" }}
                    onClick={() => navigate("/login")}
                  >
                    Log in
                  </button>
                  <button
                    className={`btn text-muted`}
                    onClick={() => navigate("/home")}
                  >
                    Browse more
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`d-flex justify-content-center`}>
        <div className={`row premum-bg rounded-5 m-0`}>
          <div className={`col p-0 d-none d-md-block`}></div>
          <div
            className={`col-xxl-7 col-xl-6 p-0 col-lg-6 col-md-7 col-sm-10 col-10`}
          >
            {currentUser && show && (
              <Payment
                number={number}
                setShow={setShow}
                setPlan={setPlan}
                // setWelcome={setWelcome}
                setPayment={setPayment}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumDetails;