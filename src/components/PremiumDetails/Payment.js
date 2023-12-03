import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { updateUserNonAdminThunk } from "../../services/users/users-thunks";
import {
  RiSecurePaymentFill,
  RiMoneyPoundCircleFill,
  RiMoneyDollarCircleFill,
  RiMoneyCnyCircleFill,
} from "react-icons/ri";

const Payment = ({ number, setShow, setPlan, setPayment }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    setShow(false);
    setPayment(true);
    dispatch(updateUserNonAdminThunk({ ...currentUser, isVip: true }));
  };

  return (
    <div className="payment-div">
      <div className="payment-card">
        <h3 className="billing-title">Your Billing information</h3>
        <div className="payment-icons">
          <RiSecurePaymentFill size={50} className="icon-secure" />
          <RiMoneyPoundCircleFill size={50} className="icon-money" />
          <RiMoneyDollarCircleFill size={50} className="icon-money" />
          <RiMoneyCnyCircleFill size={50} className="icon-money" />
        </div>
        <div className="total-amount">
          <h4>Total: $ {Math.round(number * 100) / 100}</h4>
        </div>
        <div className="payment-buttons">
          <button className="btn-checkout" onClick={handleCheckout}>
            Checkout
          </button>
          <button className="btn-not-now" onClick={() => { setShow(false); setPlan(false); }}>
            Not now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
