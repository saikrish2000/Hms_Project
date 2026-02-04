import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Admin Dashboard</h1>
        <button className="btn btn-outline-secondary" onClick={handleLogout}>
          <FiLogOut className="me-1" /> Logout
        </button>
      </div>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm border-0">
            <div className="card-body">
              <h3 className="fw-bold text-primary">2,450</h3>
              <p className="text-muted">Total Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm border-0">
            <div className="card-body">
              <h3 className="fw-bold text-success">850</h3>
              <p className="text-muted">Doctors</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm border-0">
            <div className="card-body">
              <h3 className="fw-bold text-info">1,500</h3>
              <p className="text-muted">Patients</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow-sm border-0">
            <div className="card-body">
              <h3 className="fw-bold text-warning">5</h3>
              <p className="text-muted">Hospitals</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-muted mt-4">
        Manage system users, hospitals, and generate reports.
      </p>
    </div>
  );
};

export default AdminDashboard;
