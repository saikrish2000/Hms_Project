// Navbar.jsx (resolved)
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

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
        <Link to="/" className="navbar-brand d-flex align-items-center fw-bold text-primary">
          <div className="me-2">
            <FaHeart className="text-primary" />
          </div>
          HealthHub
        </Link>

        {user?.role !== "bloodbank" && (
          <ul className="navbar-nav mx-auto d-flex flex-row gap-3 list-unstyled align-items-center mb-0">
            <li className="nav-item">
              <Link className="nav-link" to="/patient/find-doctor">
                Find Doctor
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/patient/blood-donation">
                Blood Bank
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/patient/organ-donation">
                Organ Donation
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-danger fw-semibold" to="/emergency">
                Emergency
              </Link>
            </li>
          </ul>
        )}

        <div className="d-flex align-items-center gap-2 ms-auto">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="btn btn-outline-primary me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary text-white">
                Register
              </Link>
            </>
          ) : user?.role === "bloodbank" ? (
            <button onClick={handleLogout} className="btn btn-outline-danger">
              <FiLogOut className="me-1" /> Logout
            </button>
          ) : (
            <>
              <Link
                to={user?.role === "patient" ? "/patient/profile" : `/${user?.role}/dashboard`}
                className="btn btn-outline-primary me-2"
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
