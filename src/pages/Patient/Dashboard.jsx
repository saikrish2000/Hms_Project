import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Welcome, {user?.name}!</h1>
        <button className="btn btn-outline-secondary" onClick={handleLogout}>
          <FiLogOut className="me-1" /> Logout
        </button>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="card-title fw-bold">Dashboard Overview</h5>
              <p className="text-muted">
                This is your patient dashboard. Coming soon: appointment
                history, prescriptions, and health records.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-light">
            <div className="card-body">
              <h5 className="card-title fw-bold">Quick Stats</h5>
              <p className="mb-1">
                <strong>Appointments:</strong> 3
              </p>
              <p className="mb-0">
                <strong>Last Visit:</strong> Jan 15, 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
