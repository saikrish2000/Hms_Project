import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const BloodbankDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Blood Bank Dashboard</h1>
        <button className="btn btn-outline-secondary" onClick={handleLogout}>
          <FiLogOut className="me-1" /> Logout
        </button>
      </div>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm border-0">
            <div className="card-body">
              <h3 className="fw-bold text-danger">150</h3>
              <p className="text-muted">O+ Units</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm border-0">
            <div className="card-body">
              <h3 className="fw-bold text-danger">120</h3>
              <p className="text-muted">A+ Units</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm border-0">
            <div className="card-body">
              <h3 className="fw-bold text-danger">85</h3>
              <p className="text-muted">B+ Units</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm border-0">
            <div className="card-body">
              <h3 className="fw-bold text-danger">45</h3>
              <p className="text-muted">AB+ Units</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-muted mt-4">
        Manage blood inventory and handle donation requests.
      </p>
    </div>
  );
};

export default BloodbankDashboard;
