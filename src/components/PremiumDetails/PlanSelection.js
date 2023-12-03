import React from "react";
import "./index.css";
import { useSelector } from "react-redux";

const PlanSelection = ({ setPlan, setShow, setNumber }) => {
  const { currentUser } = useSelector((state) => state.user);

  const handleSelect = (id) => {
    setPlan(true);
    setShow(true);
    const prices = [8.9, 6.9, 4.5];
    setNumber(id === 0 ? prices[0] : id === 1 ? 3 * prices[1] : 12 * prices[2]);
  };

  const planOptions = [
    { id: 0, label: 'Monthly', price: 8.9 },
    { id: 1, label: 'Quarterly', price: 6.9, note: 'Most popular' },
    { id: 2, label: 'Annual', price: 4.5, note: 'Best value' }
  ];

  return (
    <div className="premuim-plan-div">
      {currentUser && (
        <div className="premium-plan-card">
          <h3 className="plan-title">Choose your plan</h3>
          {planOptions.map(({ id, label, price, note }) => (
            <div key={id} className="plan-option">
              {note && <div className="plan-note">{note}</div>}
              <div className="plan-details">
                <span style={{"color" : "black", "font-weight" : "bold"}}>{label}</span>
                <h4>${price} / month</h4>
                <button className="select-btn" onClick={() => handleSelect(id)}>Select</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanSelection;
