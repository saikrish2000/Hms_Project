// Navbar.jsx
import React from 'react';
import { FaHeart, FaStethoscope, FaTint, FaAmbulance, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg py-3 shadow-sm" style={{ backgroundColor: '#e9f7ef' }}>
      <div className="container">
        <a className="navbar-brand d-flex align-items-center fw-bold text-success fs-4" href="#">
          <div className="bg-primary rounded-3 p-2 me-2 shadow-sm d-flex align-items-center justify-content-center">
            <FaHeart className="text-white fs-5" />
          </div>
          Health<span className="text-dark">Hub</span>
        </a>
        
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav gap-3">
            <li className="nav-item d-flex align-items-center"><FaStethoscope className="me-2 text-muted"/> Find Doctors</li>
            <li className="nav-item d-flex align-items-center"><FaTint className="me-2 text-muted"/> Blood Donation</li>
            <li className="nav-item bg-success bg-opacity-10 rounded-pill px-3 py-1 d-flex align-items-center text-success fw-semibold">
              <FaHeart className="me-2"/> Organ Donation
            </li>
            <li className="nav-item d-flex align-items-center"><FaAmbulance className="me-2 text-muted"/> Emergency</li>
          </ul>
        </div>

        <div className="d-flex align-items-center gap-4">
          <a href="#" className="text-decoration-none text-dark fw-semibold d-flex align-items-center">
            <FaSignInAlt className="me-2" /> Login
          </a>
          <button className="btn btn-success rounded-3 px-4 py-2 fw-bold d-flex align-items-center shadow-sm">
            <FaUserPlus className="me-2" /> Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;