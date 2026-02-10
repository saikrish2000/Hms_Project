/* eslint-disable no-unused-vars */
// Navbar.jsx (resolved)
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import { FiLogOut, FiUser, FiChevronDown, FiSettings, FiHelpCircle } from "react-icons/fi";
import NotificationBell from "../Common/NotificationBell";

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
                    ) : user?.role === "doctor" ? (
                        <div className="position-relative">
                            <button 
                                className="btn btn-outline-primary d-flex align-items-center gap-2"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                style={{
                                    borderRadius: "20px",
                                    padding: "8px 16px",
                                    minWidth: "180px"
                                }}
                            >
                                <FiUser size={18} />
                                <span>{user?.name || "Doctor"}</span>
                                <FiChevronDown size={16} className="ms-auto" />
                            </button>
                            {dropdownOpen && (
                                <div
                                    className="position-absolute bg-white shadow-sm rounded mt-2"
                                    style={{
                                        right: 0,
                                        zIndex: 1000,
                                        minWidth: "220px",
                                        borderRadius: "8px",
                                        overflow: "hidden"
                                    }}
                                >
                                    <div className="p-3 border-bottom">
                                        <div className="fw-semibold">{user?.name || "Dr. User"}</div>
                                        <div className="text-muted small">Doctor Account</div>
                                    </div>

                                    <button
                                        className="btn btn-link w-100 text-start d-flex align-items-center gap-2 p-3 border-0"
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            navigate('/doctor/profile');
                                        }}
                                    >
                                        <FiUser size={16} />
                                        Profile Settings
                                    </button>

                                    <button
                                        className="btn btn-link w-100 text-start d-flex align-items-center gap-2 p-3 border-0"
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            navigate('/settings');
                                        }}
                                    >
                                        <FiSettings size={16} />
                                        Preferences
                                    </button>

                                    <button
                                        className="btn btn-link w-100 text-start d-flex align-items-center gap-2 p-3 border-0"
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            navigate('/help');
                                        }}
                                    >
                                        <FiHelpCircle size={16} />
                                        Help & Support
                                    </button>

                                    <div className="border-top">
                                        <button
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                handleLogout();
                                            }}
                                            className="btn btn-link w-100 text-start text-danger d-flex align-items-center gap-2 p-3 border-0"
                                        >
                                            <FiLogOut size={16} />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
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
