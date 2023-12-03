import React from "react";
import "./index.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { RiVipDiamondFill } from "react-icons/ri";

const PremiumFunction = () => {
  const features = [
    "No limitation on Watchlist numbers",
    "Real-time stock price updates",
    "Make your comments more distinct",
    "Recommendation of top stocks",
    "Priority in customer support"
  ];

  return (
    <div className="premium-function-div">
      <div className="premium-function-card">
        <h3 className="premium-title">Upgrade to Premium</h3>
        <h5 className="premium-function-text">You can get a lot more out of it. Upgrading to premium. Get all features:</h5>
        <div className="feature-list">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
            <RiVipDiamondFill className="icon-vip" />

              <h5>{feature}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumFunction;
