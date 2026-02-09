/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import { FiLogOut, FiUser } from "react-icons/fi";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Role-based profile route
  const profileRoute = user?.role === "patient"
    ? "/patient/profile"
    : user?.role === "admin"
      ? "/admin/dashboard"
      : `/${user?.role}/dashboard`;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center fw-bold text-primary">
          <div className="me-2">
            <FaHeart className="text-primary" />
          </div>
          HealthHub
        </Link>

        {/* CENTER: no global patient links; keep center empty for layout */}
        <ul className="navbar-nav mx-auto"></ul>

        <div className="d-flex align-items-center gap-2 ms-auto">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="btn btn-outline-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary text-white">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to={profileRoute} className="btn btn-outline-primary">
                <FiUser className="me-1" />
                {user?.name?.split(" ")[0] || "Profile"}
              </Link>
              <button onClick={handleLogout} className="btn btn-outline-danger">
                <FiLogOut className="me-1" /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
