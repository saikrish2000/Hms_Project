import {
  FiPhoneCall,
  FiAlertTriangle,
  FiHeart,
  FiActivity,
} from "react-icons/fi";

const EmergencyDemo = () => {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-2 text-danger">
        <FiAlertTriangle className="me-2" />
        Emergency Services (Demo)
      </h1>

      <p className="text-muted mb-4">
        Quick access to emergency contacts and first-aid guidance. This is a
        demo-only informational page.
      </p>

      <div className="row g-4">
        {/* EMERGENCY CONTACTS */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Emergency Contacts</h5>

              <div className="list-group list-group-flush">
                <a
                  href="tel:102"
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  🚑 Ambulance
                  <span className="fw-bold text-danger">102</span>
                </a>

                <a
                  href="tel:100"
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  🚓 Police
                  <span className="fw-bold text-danger">100</span>
                </a>

                <a
                  href="tel:101"
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  🔥 Fire
                  <span className="fw-bold text-danger">101</span>
                </a>

                <a
                  href="tel:18002221222"
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  ☠️ Poison Control
                  <span className="fw-bold text-danger">+1-800-222-1222</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FIRST AID */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Quick First-Aid Tips</h5>

              <ol className="small text-muted ps-3">
                <li>Ensure the scene is safe before helping.</li>
                <li>Check responsiveness and breathing.</li>
                <li>Call emergency services immediately.</li>
                <li>Start CPR if trained and necessary.</li>
                <li>Apply pressure to control heavy bleeding.</li>
              </ol>

              <div className="alert alert-warning mt-3 small">
                ⚠️ This information is for guidance only. Always seek
                professional medical help.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="alert alert-secondary mt-4 small">
        This page is a demo and does not replace professional emergency
        services.
      </div>
    </div>
  );
};

export default EmergencyDemo;
