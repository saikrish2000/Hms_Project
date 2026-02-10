import React from 'react';
 
const BloodBankCard = ({ name, status, distance, address, phone, inventory, onViewDetails }) => {
 
  // Default inventory fallback
  const defaultInventory = [
    { type: "A+", units: 15, level: "good" }, { type: "A-", units: 5, level: "low" },
    { type: "B+", units: 12, level: "good" }, { type: "B-", units: 8, level: "medium" },
    { type: "AB+", units: 6, level: "medium" }, { type: "AB-", units: 2, level: "low" },
    { type: "O+", units: 20, level: "good" }, { type: "O-", units: 10, level: "medium" }
  ];
 
  const data = inventory || defaultInventory;
 
  return (
    <div className="bank-card">
      <div className="bank-header">
        <h3>{name}</h3>
        <span className={`status-pill ${status === "Open" ? "open" : "closed"}`}>
          {status}
        </span>
      </div>
 
      <div className="bank-details">
        <p>📍 {distance}</p>
        <p className="address-text">{address}</p>
        <p>📞 {phone}</p>
      </div>
 
      <hr className="divider" />
     
      <h4>Blood Availability</h4>
 
      <div className="blood-grid">
        {data.map((item, index) => (
          <div key={index} className={`blood-item ${item.level}`}>
            <span className="b-type">{item.type}</span>
            <span className="b-units">{item.units} units</span>
          </div>
        ))}
      </div>
 
      {/* This button triggers the popup modal */}
      <button className="view-details-btn" onClick={onViewDetails}>
        View Details
      </button>
    </div>
  );
};
 
export default BloodBankCard;