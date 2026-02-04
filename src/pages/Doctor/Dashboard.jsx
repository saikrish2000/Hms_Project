import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Doctor Dashboard</h1>
        <button className="btn btn-outline-secondary" onClick={handleLogout}>
          <FiLogOut className="me-1" /> Logout
        </button>
      </div>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm border-0">
            <div className="card-body">
              <h3 className="fw-bold text-primary">12</h3>
              <p className="text-muted">Today's Appointments</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm border-0">
            <div className="card-body">
              <h3 className="fw-bold text-success">8</h3>
              <p className="text-muted">Completed</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm border-0">
            <div className="card-body">
              <h3 className="fw-bold text-warning">4</h3>
              <p className="text-muted">Pending</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm border-0">
            <div className="card-body">
              <h3 className="fw-bold text-info">24</h3>
              <p className="text-muted">Patient Records</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-muted mt-4">
        Manage your appointments and patient records from here.
      </p>
    </div>
  );
};

export default DoctorDashboard;
