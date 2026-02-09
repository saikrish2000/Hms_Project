import React from "react";

const UrgentRequestCard = ({
  blood,
  hospital,
  time,
  units,
  status,
  onRespond,
}) => {
  return (
    <div className="urgent-card">
      <div className="urgent-card-left">
        <div className="blood-circle">{blood}</div>
        <div className="urgent-info">
          <h4>{hospital}</h4>
          <span className="time-text">{time}</span>
          <p className="units-text">{units}</p>
        </div>
      </div>

      <div className="urgent-card-right">
        <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
        {/* Button now uses the onRespond function passed from parent */}
        <button className="respond-btn" onClick={onRespond}>
          Respond
        </button>
      </div>
    </div>
  );
};

export default UrgentRequestCard;
