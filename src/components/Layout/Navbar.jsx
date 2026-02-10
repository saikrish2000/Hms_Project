import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiLogOut, FiUser } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        {/* LEFT: Brand */}
        <Link to="/" className="navbar-brand fw-bold text-primary">
          <span className="me-2">🏥</span>HealthHub
        </Link>

        {/* CENTER */}
        <ul className="navbar-nav mx-auto"></ul>

        {/* RIGHT */}
        <div className="d-flex align-items-center gap-2 ms-auto">
          {!isAuthenticated && (
            <>
              <Link to="/login" className="btn btn-outline-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary text-white">
                Register
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link
                to={
                  user?.role === "patient"
                    ? "/patient/profile"
                    : `/${user?.role}/dashboard`
                }
                className="btn btn-outline-primary"
              >
                Profile
              </Link>
              <button onClick={handleLogout} className="btn btn-outline-danger">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
