import React from "react";

const EmergencyDemo = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Emergency Services (Demo)</h1>
      <p className="lead text-muted">
        This is a demo emergency page showing quick emergency contacts and
        guidance.
      </p>

      <div className="row g-4 mt-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-3">
            <h5 className="fw-bold">Emergency Contacts</h5>
            <ul className="list-unstyled mt-3">
              <li>
                Ambulance: <strong>102</strong>
              </li>
              <li>
                Police: <strong>100</strong>
              </li>
              <li>
                Fire: <strong>101</strong>
              </li>
              <li>
                Poison Control: <strong>+1-800-222-1222</strong>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-3">
            <h5 className="fw-bold">Quick First-Aid Tips</h5>
            <ol className="mt-3 small text-muted">
              <li>Check responsiveness and breathing.</li>
              <li>Call local emergency number immediately.</li>
              <li>Start CPR if trained and patient is unresponsive.</li>
              <li>Control severe bleeding with pressure.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyDemo;
